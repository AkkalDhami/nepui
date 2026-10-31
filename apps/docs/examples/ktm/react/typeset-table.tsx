"use client"

import "@/registry/react/tokens.css"
import "@/registry/react/typeset.css"

export default function TypesetTable() {
  return (
    <div className="np-typeset" style={{ width: "100%", maxWidth: "28rem" }}>
      <p>This table is wider than its container, so it scrolls sideways.</p>
      <div className="np-typeset-scroll">
        <table>
          <thead>
            <tr>
              <th>Preset</th>
              <th>Size</th>
              <th>Leading</th>
              <th>Flow</th>
              <th>Best for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>np-typeset-chat</td>
              <td>1em</td>
              <td>1.6</td>
              <td>1em</td>
              <td>Chat bubbles</td>
            </tr>
            <tr>
              <td>np-typeset-docs</td>
              <td>15px</td>
              <td>1.75</td>
              <td>1.5em</td>
              <td>Documentation</td>
            </tr>
            <tr>
              <td>np-typeset-reading</td>
              <td>18px</td>
              <td>1.9</td>
              <td>2em</td>
              <td>Long articles</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
