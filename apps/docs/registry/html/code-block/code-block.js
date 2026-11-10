;(function () {
  "use strict"

  var ROOT = ".np-code-block, [data-np-code-block]"
  var CONTENT = ".np-code-block-content, [data-np-code-block-content]"
  var LINE = ".np-code-block-line, [data-np-code-block-line]"
  var COPY = ".np-code-block-copy, [data-np-code-block-copy]"
  var WRAP = "[data-np-code-block-wrap-toggle]"

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
  }

  /** "1,3-5" -> { 1: true, 3: true, 4: true, 5: true } */
  function parseRanges(value) {
    var set = {}
    if (!value) return set
    value.split(",").forEach(function (part) {
      var bits = part.trim().split("-")
      var from = parseInt(bits[0], 10)
      var to = bits.length > 1 ? parseInt(bits[1], 10) : from
      if (isNaN(from) || isNaN(to)) return
      for (var n = from; n <= to; n++) set[n] = true
    })
    return set
  }

  /** Splits highlighted HTML into lines, closing and reopening open tags. */
  function splitLines(html) {
    var lines = []
    var open = []
    var current = ""
    var re = /(<\/?span[^>]*>)|(\n)|([^<\n]+|<)/g
    var match
    while ((match = re.exec(html))) {
      if (match[1]) {
        if (match[1].charAt(1) === "/") open.pop()
        else open.push(match[1])
        current += match[1]
      } else if (match[2]) {
        current += open
          .map(function () {
            return "</span>"
          })
          .join("")
        lines.push(current)
        current = open.join("")
      } else {
        current += match[3]
      }
    }
    lines.push(current)
    return lines
  }

  function languageOf(content, code) {
    var fromClass = /(?:^|\s)language-([\w-]+)/.exec(
      code.className + " " + content.className
    )
    return (
      content.getAttribute("data-language") ||
      (fromClass && fromClass[1]) ||
      ""
    ).toLowerCase()
  }

  /** The highlighted HTML for the code, or the escaped text. */
  function highlight(text, language) {
    var Prism = window.Prism
    if (Prism && language && Prism.languages[language]) {
      try {
        return Prism.highlight(text, Prism.languages[language], language)
      } catch (error) {
        console.error(error)
        /* fall through to plain text */
      }
    }
    return escapeHtml(text)
  }

  function render(content, code, text, language) {
    var added = parseRanges(content.getAttribute("data-added"))
    var removed = parseRanges(content.getAttribute("data-removed"))
    var marked = parseRanges(content.getAttribute("data-highlight"))

    code.innerHTML = splitLines(highlight(text, language))
      .map(function (html, index) {
        var n = index + 1
        var variant = added[n]
          ? "added"
          : removed[n]
            ? "removed"
            : marked[n]
              ? "highlighted"
              : ""
        return (
          '<span class="np-code-block-line"' +
          (variant ? ' data-variant="' + variant + '"' : "") +
          ">" +
          html +
          "</span>"
        )
      })
      .join("")
  }

  function setupContent(content) {
    if (content.__npCodeBlock) return
    content.__npCodeBlock = true

    var code = content.querySelector("code")
    if (!code) return

    // Lines written by hand: nothing to split.
    if (!code.querySelector(LINE)) {
      var text = code.textContent.replace(/^\n+/, "").replace(/\s+$/, "")
      var language = languageOf(content, code)

      render(content, code, text, language)

      // Load the language on demand, then render again.
      var Prism = window.Prism
      if (
        language &&
        Prism &&
        !Prism.languages[language] &&
        Prism.plugins &&
        Prism.plugins.autoloader
      ) {
        Prism.plugins.autoloader.loadLanguages(language, function () {
          render(content, code, text, language)
        })
      }
    }

    var lines = code.querySelectorAll(LINE).length
    var start = parseInt(content.getAttribute("data-start-line"), 10)
    if (isNaN(start)) start = 1
    content.style.setProperty("--np-code-block-start", String(start))
    content.style.setProperty(
      "--np-code-block-gutter",
      String(start + Math.max(lines, 1) - 1).length + "ch"
    )
  }

  function codeTextOf(root) {
    var content = root.querySelector(CONTENT)
    if (!content) return ""
    var lines = content.querySelectorAll(LINE)
    if (!lines.length) return content.textContent
    return Array.prototype.map
      .call(lines, function (line) {
        return line.textContent
      })
      .join("\n")
  }

  function writeClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text)
    }
    return new Promise(function (resolve, reject) {
      var area = document.createElement("textarea")
      area.value = text
      area.setAttribute("readonly", "")
      area.style.position = "fixed"
      area.style.opacity = "0"
      document.body.appendChild(area)
      area.select()
      var ok = false
      try {
        ok = document.execCommand("copy")
      } catch (error) {
        console.error(error)
        ok = false
      }
      document.body.removeChild(area)
      if (ok) {
        resolve()
      } else {
        reject(new Error("copy failed"))
      }
    })
  }

  function announcer(button) {
    var next = button.nextElementSibling
    if (
      next &&
      next.matches(".np-code-block-sr-only, [data-np-code-block-sr-only]")
    ) {
      return next
    }
    var span = document.createElement("span")
    span.className = "np-code-block-sr-only"
    span.setAttribute("role", "status")
    button.insertAdjacentElement("afterend", span)
    return span
  }

  function onCopy(button) {
    var root = button.closest(ROOT)
    var value = button.getAttribute("data-value")
    var text = value !== null ? value : root ? codeTextOf(root) : ""
    var status = announcer(button)

    writeClipboard(text).then(
      function () {
        button.setAttribute("data-copied", "")
        status.textContent = "Copied"
        clearTimeout(button.__npTimer)
        button.__npTimer = setTimeout(function () {
          button.removeAttribute("data-copied")
          status.textContent = ""
        }, 2000)
      },
      function () {}
    )
  }

  function onWrap(button) {
    var root = button.closest(ROOT)
    var content = root && root.querySelector(CONTENT)
    if (!content) return
    var on = !content.hasAttribute("data-wrap")
    if (on) content.setAttribute("data-wrap", "")
    else content.removeAttribute("data-wrap")
    button.setAttribute("aria-pressed", String(on))
  }

  function init(root) {
    if (!root) return
    var blocks = root.matches && root.matches(ROOT) ? [root] : []
    Array.prototype.push.apply(blocks, root.querySelectorAll(ROOT))
    blocks.forEach(function (block) {
      Array.prototype.forEach.call(
        block.querySelectorAll(CONTENT),
        setupContent
      )
      Array.prototype.forEach.call(
        block.querySelectorAll(WRAP),
        function (button) {
          var content = block.querySelector(CONTENT)
          if (content && !button.hasAttribute("aria-pressed")) {
            button.setAttribute(
              "aria-pressed",
              String(content.hasAttribute("data-wrap"))
            )
          }
        }
      )
    })
  }

  function initAll(scope) {
    init(scope || document)
  }

  // Buttons are handled by one listener, so blocks added later work too.
  document.addEventListener("click", function (event) {
    var target = event.target
    if (!target || !target.closest) return
    var copy = target.closest(COPY)
    if (copy) return onCopy(copy)
    var wrap = target.closest(WRAP)
    if (wrap) onWrap(wrap)
  })

  window.NepuiCodeBlock = { init: init, initAll: initAll }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initAll()
    })
  } else {
    initAll()
  }
})()

/**
 * nepui — Code Block (HTML behaviour)
 *
 * A small, dependency-free helper for `.np-code-block` / `[data-np-code-block]`.
 * It is optional: the CSS (code-block.css) styles the markup without it.
 * It does these things:
 *   - splits the code into lines, so line numbers, highlighted lines and
 *     diff lines work
 *   - highlights the code with Prism, when Prism is on the page
 *   - copies the code (the copy button)
 *   - toggles wrapping (the wrap button)
 *
 * Markup:
 *   <div class="np-code-block">
 *     <div class="np-code-block-header">
 *       <div class="np-code-block-title">index.js</div>
 *       <div class="np-code-block-actions">
 *         <button class="np-button np-button-ghost np-button-icon-xs np-code-block-copy" aria-label="Copy">…</button>
 *       </div>
 *     </div>
 *     <pre class="np-code-block-content" tabindex="0" dir="ltr"><code class="language-js">…</code></pre>
 *   </div>
 *
 * Attributes on the <pre>:
 *   data-line-numbers    show line numbers
 *   data-start-line      the number of the first line, default 1
 *   data-wrap            wrap long lines
 *   data-highlight       lines to highlight, like "2,4-6"
 *   data-added           lines to mark as added
 *   data-removed         lines to mark as removed
 *   data-language        the language, if the <code> has no language-* class
 *
 * Attributes on buttons:
 *   data-np-code-block-copy         copies the code of the nearest code block
 *   data-value                      copy this text instead
 *   data-np-code-block-wrap-toggle  toggles wrapping; the script sets aria-pressed
 *
 * Prism: load prism.js first. With Prism's autoloader plugin, languages that
 * are not loaded yet are fetched on demand. Prism only needs to highlight; its
 * theme CSS is not needed, since code-block.css colours the tokens.
 *
 * Write "<" as "&lt;" inside <code>. If you already wrote the lines as
 * .np-code-block-line elements, the script leaves them alone.
 *
 * For a block added later, call `NepuiCodeBlock.init(block)`.
 */
