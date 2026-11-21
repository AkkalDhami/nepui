;(function () {
  var ROOT = ".np-file-input, [data-np-file-input]"
  var IGNORED = { ".DS_Store": 1, "Thumbs.db": 1, "desktop.ini": 1 }
  var MAX_FOLDER_FILES = 1000
  var guarded = false
  var internalDrag = false

  function hasFiles(event) {
    return (
      Array.prototype.indexOf.call(
        (event.dataTransfer && event.dataTransfer.types) || [],
        "Files"
      ) !== -1
    )
  }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + " B"
    var units = ["KB", "MB", "GB", "TB"],
      size = bytes / 1024,
      i = 0
    while (size >= 1024 && i < units.length - 1) {
      size /= 1024
      i++
    }
    return (
      (size >= 10 || size % 1 === 0 ? Math.round(size) : size.toFixed(1)) +
      " " +
      units[i]
    )
  }

  function parseAccept(value) {
    return (value || "")
      .split(",")
      .map(function (s) {
        return s.trim().toLowerCase()
      })
      .filter(Boolean)
  }

  function mimeMatches(type, pattern) {
    return pattern.slice(-2) === "/*"
      ? type.indexOf(pattern.slice(0, -1)) === 0
      : type === pattern
  }

  function matchesAccept(file, patterns) {
    if (!patterns.length) return true
    var name = file.name.toLowerCase(),
      type = file.type.toLowerCase()
    return patterns.some(function (p) {
      return p.charAt(0) === "."
        ? name.slice(-p.length) === p
        : mimeMatches(type, p)
    })
  }

  // Keep a dropped file out of the browser's own handling.
  function guardPage() {
    if (guarded) return
    guarded = true
    ;["dragover", "drop"].forEach(function (name) {
      window.addEventListener(name, function (event) {
        var target = event.target
        var native =
          target instanceof Element && target.closest('input[type="file"]')
        if (hasFiles(event) && !native) event.preventDefault()
      })
    })
    window.addEventListener("dragstart", function () {
      internalDrag = true
    })
    window.addEventListener("dragend", function () {
      internalDrag = false
    })
  }

  function walk(entry, parent, out) {
    if (out.length >= MAX_FOLDER_FILES) return Promise.resolve()
    if (entry.isFile) {
      if (IGNORED[entry.name] || entry.name.indexOf("._") === 0)
        return Promise.resolve()
      return new Promise(function (resolve) {
        entry.file(function (file) {
          out.push(file)
          try {
            file._npPath = parent + entry.name
          } catch {
            // Ignore errors.
          }
          resolve()
        }, resolve)
      })
    }
    if (!entry.isDirectory) return Promise.resolve()
    var reader = entry.createReader()
    function next() {
      return new Promise(function (resolve) {
        reader.readEntries(resolve, function () {
          resolve([])
        })
      }).then(function (batch) {
        if (!batch.length) return
        return batch
          .reduce(function (chain, child) {
            return chain.then(function () {
              return walk(child, parent + entry.name + "/", out)
            })
          }, Promise.resolve())
          .then(next)
      })
    }
    return next()
  }

  function collect(dataTransfer, directory) {
    var items = Array.prototype.slice.call(dataTransfer.items || [])
    if (
      directory &&
      items.length &&
      typeof items[0].webkitGetAsEntry === "function"
    ) {
      var entries = items
        .map(function (item) {
          return item.webkitGetAsEntry()
        })
        .filter(Boolean)
      var out = []
      return entries
        .reduce(function (chain, entry) {
          return chain.then(function () {
            return walk(entry, "", out)
          })
        }, Promise.resolve())
        .then(function () {
          return out
        })
    }
    return Promise.resolve(Array.prototype.slice.call(dataTransfer.files))
  }

  function init(root) {
    if (root.hasAttribute("data-np-file-input-ready")) return
    var input = root.querySelector(
      ".np-file-input-native, [data-np-file-input-native]"
    )
    if (!input) return
    root.setAttribute("data-np-file-input-ready", "")
    guardPage()

    var list = root.querySelector(
      ".np-file-input-list, [data-np-file-input-list]"
    )
    var template = list && list.querySelector("template")
    var rejectionsEl = root.querySelector(
      ".np-file-input-rejections, [data-np-file-input-rejections]"
    )
    var live = root.querySelector(
      ".np-file-input-live, [data-np-file-input-live]"
    )
    var zones = root.querySelectorAll(
      ".np-file-input-dropzone, [data-np-file-input-dropzone]"
    )
    var directory = input.hasAttribute("webkitdirectory")
    var multiple = input.multiple || directory
    var patterns = parseAccept(input.getAttribute("accept"))
    var maxFiles =
      root.dataset.maxFiles !== undefined
        ? Number(root.dataset.maxFiles)
        : undefined
    var maxSize =
      root.dataset.maxSize !== undefined
        ? Number(root.dataset.maxSize)
        : undefined
    var minSize =
      root.dataset.minSize !== undefined
        ? Number(root.dataset.minSize)
        : undefined
    var files = []
    var urls = []
    var active = 0

    function pathOf(file) {
      return file._npPath || file.webkitRelativePath || file.name
    }

    function syncNative() {
      try {
        var transfer = new DataTransfer()
        files.forEach(function (file) {
          transfer.items.add(file)
        })
        input.files = transfer.files
      } catch {
        // Ignore errors.
      }
    }

    function reasonText(reason) {
      if (reason === "file-type") return "is not an accepted file type"
      if (reason === "file-too-large")
        return "is larger than " + formatSize(maxSize)
      if (reason === "file-too-small")
        return "is smaller than " + formatSize(minSize)
      if (reason === "too-many-files") return "was left out (too many files)"
      return "was rejected (" + reason + ")"
    }

    function announce(added, removed, rejected) {
      if (!live) return
      var parts = []
      if (added.length)
        parts.push(
          added.length === 1
            ? "Added " + added[0].name + "."
            : "Added " + added.length + " files."
        )
      else if (removed.length)
        parts.push(
          removed.length === 1
            ? "Removed " + removed[0].name + "."
            : "Removed " + removed.length + " files."
        )
      if (rejected.length)
        parts.push(
          rejected.length === 1
            ? rejected[0].file.name + " was rejected."
            : rejected.length + " files were rejected."
        )
      live.textContent = ""
      live.textContent = parts.join(" ")
    }

    function renderRejections(rejected) {
      if (!rejectionsEl) return
      rejectionsEl.textContent = ""
      rejected.forEach(function (item) {
        var li = document.createElement("li")
        var b = document.createElement("b")
        b.textContent = item.file.name
        li.appendChild(b)
        li.appendChild(
          document.createTextNode(" " + reasonText(item.reasons[0]))
        )
        rejectionsEl.appendChild(li)
      })
      rejectionsEl.hidden = rejected.length === 0
    }

    function render() {
      if (!list || !template) return
      urls.forEach(function (url) {
        URL.revokeObjectURL(url)
      })
      urls = []
      Array.prototype.slice.call(list.children).forEach(function (child) {
        if (child.tagName === "LI") list.removeChild(child)
      })
      active = Math.min(active, Math.max(0, files.length - 1))
      files.forEach(function (file, index) {
        var li = template.content.firstElementChild.cloneNode(true)
        li.setAttribute("tabindex", index === active ? "0" : "-1")
        li._npFile = file
        var name = li.querySelector("[data-file-name]")
        if (name) {
          name.textContent = pathOf(file)
          name.title = pathOf(file)
        }
        var size = li.querySelector("[data-file-size]")
        if (size) size.textContent = formatSize(file.size)
        var preview = li.querySelector("[data-file-preview]")
        if (preview && file.type.indexOf("image/") === 0) {
          var url = URL.createObjectURL(file)
          urls.push(url)
          var img = document.createElement("img")
          img.src = url
          img.alt = ""
          preview.textContent = ""
          preview.appendChild(img)
        }
        var remove = li.querySelector("[data-file-remove]")
        if (remove) {
          remove.setAttribute("aria-label", "Remove " + file.name)
          remove.setAttribute("tabindex", "-1")
          remove.addEventListener("click", function () {
            removeFile(file)
          })
        }
        list.appendChild(li)
      })
    }

    function commit(reason, added, removed, rejected) {
      syncNative()
      render()
      renderRejections(rejected)
      announce(added, removed, rejected)
      if (added.length || removed.length) {
        root.dispatchEvent(
          new CustomEvent("np-file-input:change", {
            bubbles: true,
            detail: {
              files: files.slice(),
              added: added,
              removed: removed,
              rejected: rejected,
              reason: reason,
            },
          })
        )
      }
      if (rejected.length) {
        root.dispatchEvent(
          new CustomEvent("np-file-input:reject", {
            bubbles: true,
            detail: { rejected: rejected, reason: reason },
          })
        )
      }
    }

    function add(incoming, reason) {
      if (input.disabled || !incoming.length) return
      var capacity = multiple
        ? maxFiles === undefined
          ? Infinity
          : Math.max(0, maxFiles - files.length)
        : 1
      var accepted = [],
        rejected = []
      incoming.forEach(function (file) {
        var reasons = []
        if (!matchesAccept(file, patterns)) reasons.push("file-type")
        if (maxSize !== undefined && file.size > maxSize)
          reasons.push("file-too-large")
        if (minSize !== undefined && file.size < minSize)
          reasons.push("file-too-small")
        if (!reasons.length && accepted.length >= capacity)
          reasons.push("too-many-files")
        if (reasons.length) rejected.push({ file: file, reasons: reasons })
        else accepted.push(file)
      })
      var removed = []
      if (accepted.length) {
        if (multiple) files = files.concat(accepted)
        else {
          removed = files.filter(function (f) {
            return f !== accepted[0]
          })
          files = [accepted[0]]
        }
      }
      commit(reason, accepted, removed, rejected)
    }

    function removeFile(file) {
      var index = files.indexOf(file)
      if (index === -1 || input.disabled) return
      files = files.filter(function (f) {
        return f !== file
      })
      active = Math.min(index, Math.max(0, files.length - 1))
      commit("remove-press", [], [file], [])
      var items = list ? list.querySelectorAll("li") : []
      if (items.length) items[active].focus()
      else {
        var trigger = root.querySelector(
          ".np-file-input-trigger, [data-np-file-input-trigger]"
        )
        if (trigger) trigger.focus()
      }
    }

    // Native picker
    input.addEventListener("change", function () {
      add(Array.prototype.slice.call(input.files || []), "picker")
      syncNative()
    })

    // Keyboard on the list: one Tab stop, arrows move, Delete removes.
    if (list) {
      list.addEventListener("focusin", function (event) {
        var li = event.target.closest && event.target.closest("li")
        if (li && li === event.target)
          active = Array.prototype.indexOf.call(list.querySelectorAll("li"), li)
      })
      list.addEventListener("keydown", function (event) {
        var li = event.target
        if (!(li instanceof Element) || li.tagName !== "LI" || !li._npFile)
          return
        var items = list.querySelectorAll("li")
        var index = Array.prototype.indexOf.call(items, li),
          last = items.length - 1,
          to = -1
        if (event.key === "ArrowDown" || event.key === "ArrowRight")
          to = Math.min(index + 1, last)
        else if (event.key === "ArrowUp" || event.key === "ArrowLeft")
          to = Math.max(index - 1, 0)
        else if (event.key === "Home") to = 0
        else if (event.key === "End") to = last
        else if (event.key === "Delete" || event.key === "Backspace") {
          event.preventDefault()
          removeFile(li._npFile)
          return
        }
        if (to < 0) return
        event.preventDefault()
        items[index].setAttribute("tabindex", "-1")
        items[to].setAttribute("tabindex", "0")
        items[to].focus()
        active = to
      })
    }

    // Drop zones
    Array.prototype.forEach.call(zones, function (zone) {
      var target =
        zone.getAttribute("data-target") === "document" ? document : zone
      var depth = 0

      function reset() {
        depth = 0
        zone.removeAttribute("data-dragging")
        zone.removeAttribute("data-drag-accept")
        zone.removeAttribute("data-drag-reject")
        root.removeAttribute("data-dragging")
      }

      function judge(event) {
        var items = Array.prototype.filter.call(
          (event.dataTransfer && event.dataTransfer.items) || [],
          function (i) {
            return i.kind === "file"
          }
        )
        if (!items.length) return "accept"
        var onlyMime =
          patterns.length &&
          !patterns.some(function (p) {
            return p.charAt(0) === "."
          })
        if (onlyMime) {
          for (var i = 0; i < items.length; i++) {
            var type = items[i].type.toLowerCase()
            if (
              type &&
              !patterns.some(function (p) {
                return mimeMatches(type, p)
              })
            )
              return "reject"
          }
        }
        var capacity = multiple
          ? maxFiles === undefined
            ? Infinity
            : Math.max(0, maxFiles - files.length)
          : 1
        if (multiple && items.length > capacity) return "reject"
        return "accept"
      }

      target.addEventListener("dragenter", function (event) {
        if (input.disabled || internalDrag || !hasFiles(event)) return
        event.preventDefault()
        if (++depth === 1) {
          zone.setAttribute("data-dragging", "")
          root.setAttribute("data-dragging", "")
          zone.setAttribute(
            judge(event) === "reject" ? "data-drag-reject" : "data-drag-accept",
            ""
          )
        }
      })
      target.addEventListener("dragover", function (event) {
        if (input.disabled || internalDrag || !hasFiles(event)) return
        event.preventDefault()
        event.dataTransfer.dropEffect = "copy"
      })
      target.addEventListener("dragleave", function (event) {
        if (!hasFiles(event)) return
        depth = Math.max(0, depth - 1)
        if (!depth) reset()
      })
      target.addEventListener("drop", function (event) {
        if (input.disabled || internalDrag || !hasFiles(event)) {
          reset()
          return
        }
        event.preventDefault()
        event.stopPropagation() // a drop on a zone never reaches a page-wide zone
        reset()
        collect(event.dataTransfer, directory).then(function (dropped) {
          add(dropped, "drop")
        })
      })

      // Paste: inside the zone, and in an optional paste target.
      function onPaste(event) {
        if (input.disabled || event._npHandled) return
        var pasted = Array.prototype.slice.call(
          (event.clipboardData && event.clipboardData.files) || []
        )
        if (!pasted.length) return // text pastes keep their normal behavior
        event._npHandled = true
        event.preventDefault()
        add(pasted, "paste")
      }
      zone.addEventListener("paste", onPaste)
      var pasteTarget = zone.getAttribute("data-paste-target")
      if (pasteTarget === "document")
        document.addEventListener("paste", onPaste)
      else if (pasteTarget) {
        var el = document.querySelector(pasteTarget)
        if (el) el.addEventListener("paste", onPaste)
      }
    })

    // Form reset
    if (input.form) {
      input.form.addEventListener("reset", function () {
        var removed = files.slice()
        files = []
        commit("reset", [], removed, [])
        setTimeout(syncNative, 0)
      })
    }

    root._npFileInput = {
      getFiles: function () {
        return files.slice()
      },
      addFiles: function (list) {
        add(Array.prototype.slice.call(list), "imperative")
      },
      clear: function () {
        var removed = files.slice()
        files = []
        commit("imperative", [], removed, [])
      },
      open: function () {
        input.click()
      },
    }
  }

  function initAll() {
    Array.prototype.forEach.call(document.querySelectorAll(ROOT), init)
  }

  window.NepuiFileInput = { init: init, initAll: initAll }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", initAll)
  else initAll()
  // Roots added later (docs previews, frameworks) are enhanced too.
  new MutationObserver(initAll).observe(document.documentElement, {
    childList: true,
    subtree: true,
  })
})()
