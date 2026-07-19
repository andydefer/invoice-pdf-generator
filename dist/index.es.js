import { jsx as v, jsxs as N } from "react/jsx-runtime";
import P, { createContext as be, useContext as pe, useState as _, forwardRef as ve, useRef as ee, useImperativeHandle as Me, useEffect as Re } from "react";
import Q from "html2canvas";
import Z from "jspdf";
const J = {
  format: "a4",
  orientation: "portrait",
  scale: 2,
  margin: 40
}, te = be(void 0);
function He({
  children: l,
  initialConfig: s = J
}) {
  const [a, c] = _({
    ...J,
    ...s
  }), [u, i] = _(!1), [w, g] = _(null), e = (r) => {
    c((t) => ({ ...t, ...r }));
  };
  return /* @__PURE__ */ v(
    te.Provider,
    {
      value: {
        config: a,
        setConfig: e,
        loading: u,
        setLoading: i,
        error: w,
        setError: g
      },
      children: l
    }
  );
}
function re() {
  const l = pe(te);
  if (!l)
    throw new Error("usePDFContext must be used within a PDFProvider");
  return l;
}
let H = class {
  async generatePage(s, a = {}) {
    const {
      scale: c = 2,
      backgroundColor: u = "#ffffff",
      margin: i = 10,
      format: w = "a4",
      orientation: g = "portrait"
    } = a, e = document.createElement("div");
    e.style.position = "absolute", e.style.left = "-9999px", e.style.top = "0", e.style.width = "794px", e.style.background = "#ffffff", e.style.padding = "40px", e.appendChild(s.cloneNode(!0)), document.body.appendChild(e);
    try {
      await new Promise((b) => setTimeout(b, 200));
      const r = await Q(e, {
        scale: c,
        backgroundColor: u,
        logging: !1,
        useCORS: !0,
        allowTaint: !0,
        width: 794,
        height: e.scrollHeight,
        windowWidth: 794,
        windowHeight: e.scrollHeight
      });
      document.body.removeChild(e);
      const t = new Z({
        orientation: g,
        unit: "mm",
        format: w
      }), n = t.internal.pageSize.getWidth(), o = t.internal.pageSize.getHeight(), f = n - i * 2, d = o - i * 2, h = r.toDataURL("image/png"), m = f, M = r.height * m / r.width;
      if (M > d) {
        const b = d / M, C = m * b, y = i + (f - C) / 2;
        t.addImage(h, "PNG", y, i, C, d);
      } else {
        const b = i + (d - M) / 2;
        t.addImage(h, "PNG", i, b, m, M);
      }
      return t;
    } catch (r) {
      throw document.body.removeChild(e), new Error(`PDF generation failed: ${r}`);
    }
  }
  async generateMultiplePages(s, a = {}) {
    const {
      filename: c = "document.pdf",
      format: u = "a4",
      orientation: i = "portrait",
      scale: w = 2,
      margin: g = 10,
      backgroundColor: e = "#ffffff"
    } = a, r = new Z({
      orientation: i,
      unit: "mm",
      format: u
    }), t = r.internal.pageSize.getWidth(), n = r.internal.pageSize.getHeight(), o = t - g * 2, f = n - g * 2;
    for (let d = 0; d < s.length; d++) {
      const h = document.createElement("div");
      h.style.position = "absolute", h.style.left = "-9999px", h.style.top = "0", h.style.width = "794px", h.style.background = "#ffffff", h.style.padding = "40px", h.appendChild(s[d].cloneNode(!0)), document.body.appendChild(h);
      try {
        await new Promise((y) => setTimeout(y, 200));
        const m = await Q(h, {
          scale: w,
          backgroundColor: e,
          logging: !1,
          useCORS: !0,
          allowTaint: !0,
          width: 794,
          height: h.scrollHeight,
          windowWidth: 794,
          windowHeight: h.scrollHeight
        });
        document.body.removeChild(h), d > 0 && r.addPage();
        const M = m.toDataURL("image/png"), b = o, C = m.height * b / m.width;
        if (C > f) {
          const y = f / C, p = b * y, x = g + (o - p) / 2;
          r.addImage(M, "PNG", x, g, p, f);
        } else {
          const y = g + (f - C) / 2;
          r.addImage(M, "PNG", g, y, b, C);
        }
      } catch (m) {
        throw document.body.removeChild(h), m;
      }
    }
    return r.save(c), r;
  }
  async toBase64(s, a = {}) {
    const {
      scale: c = 2,
      backgroundColor: u = "#ffffff"
    } = a, i = document.createElement("div");
    i.innerHTML = s, i.style.position = "absolute", i.style.left = "-9999px", i.style.top = "0", i.style.width = "794px", i.style.background = "#ffffff", i.style.padding = "40px", document.body.appendChild(i);
    try {
      await new Promise((g) => setTimeout(g, 300));
      const w = await Q(i, {
        scale: c,
        backgroundColor: u,
        logging: !1,
        useCORS: !0,
        allowTaint: !0,
        width: 794,
        height: i.scrollHeight,
        windowWidth: 794,
        windowHeight: i.scrollHeight
      });
      return document.body.removeChild(i), w.toDataURL("image/png");
    } catch (w) {
      throw document.body.removeChild(i), new Error(`Base64 conversion failed: ${w}`);
    }
  }
};
const Pe = ve(
  ({
    children: l,
    format: s = "a4",
    orientation: a = "portrait",
    scale: c = 2,
    margin: u = 40,
    border: i = !0,
    borderColor: w = "#e5e7eb",
    borderWidth: g = 2,
    borderRadius: e = 12,
    className: r = "",
    style: t = {},
    onGenerate: n,
    onDownload: o
  }, f) => {
    const d = ee(null), { setLoading: h, setError: m } = re(), M = async (y = "document.pdf") => {
      try {
        h(!0), m(null);
        const p = d.current;
        if (!p)
          throw new Error("Container not found");
        const x = new H(), S = p.querySelectorAll('[style*="page-break-after: always"]');
        let I = null;
        if (S.length > 0) {
          const D = [];
          S.forEach((k) => {
            D.push(k);
          }), I = await x.generateMultiplePages(D, {
            filename: y,
            format: s,
            orientation: a,
            scale: c,
            margin: 10
          });
        } else
          I = await x.generatePage(p, {
            filename: y,
            format: s,
            orientation: a,
            scale: c,
            margin: 10
          });
        return o && o(I), h(!1), I;
      } catch (p) {
        throw m(p instanceof Error ? p.message : "Unknown error"), h(!1), p;
      }
    }, b = async () => {
      try {
        h(!0), m(null);
        const y = d.current;
        if (!y)
          throw new Error("Container not found");
        const p = new H(), x = y.outerHTML, S = await p.toBase64(x, {
          scale: c
        });
        return n && n(S), h(!1), S;
      } catch (y) {
        throw m(y instanceof Error ? y.message : "Unknown error"), h(!1), y;
      }
    };
    Me(f, () => ({
      generatePDF: M,
      generateBase64: b
    }));
    const C = i ? {
      border: `${g}px solid ${w}`,
      borderRadius: `${e}px`
    } : {};
    return /* @__PURE__ */ v(
      "div",
      {
        ref: d,
        className: `pdf-container ${r}`,
        style: {
          backgroundColor: "#ffffff",
          width: "794px",
          padding: `${u}px`,
          margin: "0 auto",
          ...C,
          ...t
        },
        children: l
      }
    );
  }
);
Pe.displayName = "PDFGenerator";
function T({
  children: l,
  direction: s = "row",
  gap: a = 4,
  align: c = "stretch",
  justify: u = "start",
  wrap: i = !1,
  className: w = "",
  style: g = {}
}) {
  const e = `gap-${a}`, r = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch"
  }[c], t = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly"
  }[u];
  return /* @__PURE__ */ v(
    "div",
    {
      className: `flex ${s === "row" ? "flex-row" : "flex-col"} ${e} ${r} ${t} ${i ? "flex-wrap" : ""} ${w}`,
      style: g,
      children: l
    }
  );
}
function _e({
  children: l,
  columns: s = 2,
  gap: a = 4,
  className: c = "",
  style: u = {}
}) {
  const i = `grid-cols-${s}`, w = `gap-${a}`;
  return /* @__PURE__ */ v(
    "div",
    {
      className: `grid ${i} ${w} ${c}`,
      style: u,
      children: l
    }
  );
}
function xe({
  children: l,
  padding: s = 4,
  margin: a = 0,
  border: c = !1,
  rounded: u = !1,
  shadow: i = "none",
  className: w = "",
  style: g = {}
}) {
  const e = `p-${s}`, r = a > 0 ? `m-${a}` : "", t = c ? "border border-gray-200" : "", n = u ? "rounded-lg" : "", o = i !== "none" ? `shadow-${i}` : "";
  return /* @__PURE__ */ v(
    "div",
    {
      className: `${e} ${r} ${t} ${n} ${o} ${w}`,
      style: g,
      children: l
    }
  );
}
function $({
  children: l,
  variant: s = "body",
  color: a = "primary",
  align: c = "left",
  bold: u = !1,
  truncate: i = !1,
  className: w = "",
  style: g = {}
}) {
  const e = {
    h1: "text-4xl font-bold",
    h2: "text-3xl font-bold",
    h3: "text-2xl font-bold",
    h4: "text-xl font-bold",
    h5: "text-lg font-bold",
    body: "text-base",
    small: "text-sm"
  }[s], r = {
    primary: "text-gray-900",
    secondary: "text-gray-700",
    muted: "text-gray-500",
    danger: "text-red-600",
    success: "text-green-600",
    warning: "text-yellow-600"
  }[a], t = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify"
  }[c];
  return /* @__PURE__ */ v(
    "div",
    {
      className: `${e} ${r} ${t} ${u ? "font-bold" : ""} ${i ? "truncate" : ""} ${w}`,
      style: g,
      children: l
    }
  );
}
function Qe({
  children: l,
  level: s = 1,
  color: a = "primary",
  className: c = "",
  style: u = {}
}) {
  const i = {
    1: "text-4xl font-bold",
    2: "text-3xl font-bold",
    3: "text-2xl font-bold",
    4: "text-xl font-bold",
    5: "text-lg font-bold",
    6: "text-base font-bold"
  }[s], w = {
    primary: "text-gray-900",
    secondary: "text-gray-700",
    muted: "text-gray-500"
  }[a], g = `h${s}`;
  return P.createElement(
    g,
    { className: `${i} ${w} ${c}`, style: u },
    l
  );
}
function je({
  src: l,
  alt: s = "",
  width: a,
  height: c,
  fit: u = "contain",
  rounded: i = !1,
  fallback: w,
  className: g = "",
  style: e = {}
}) {
  const r = {
    contain: "object-contain",
    cover: "object-cover",
    fill: "object-fill",
    none: "object-none"
  }[u], t = i === "full" ? "rounded-full" : i ? "rounded-lg" : "", [n, o] = P.useState(!1), f = () => {
    w && !n && o(!0);
  };
  return /* @__PURE__ */ v(
    "img",
    {
      src: n && w ? w : l,
      alt: s,
      width: a,
      height: c,
      className: `${r} ${t} ${g}`,
      style: e,
      onError: f
    }
  );
}
function Ge({
  columns: l,
  data: s,
  bordered: a = !1,
  striped: c = !1,
  hoverable: u = !1,
  className: i = "",
  style: w = {}
}) {
  const g = a ? "border border-gray-200" : "", e = c ? "even:bg-gray-50" : "", r = u ? "hover:bg-gray-50" : "";
  return /* @__PURE__ */ N(
    "table",
    {
      className: `w-full ${g} ${i}`,
      style: w,
      children: [
        /* @__PURE__ */ v("thead", { children: /* @__PURE__ */ v("tr", { className: "bg-gray-100", children: l.map((t) => /* @__PURE__ */ v(
          "th",
          {
            style: { width: t.width },
            className: `px-4 py-2 text-left text-sm font-semibold text-gray-700 ${t.align === "right" ? "text-right" : t.align === "center" ? "text-center" : ""}`,
            children: t.label
          },
          t.key
        )) }) }),
        /* @__PURE__ */ v("tbody", { children: s.map((t, n) => /* @__PURE__ */ v("tr", { className: `${e} ${r}`, children: l.map((o) => /* @__PURE__ */ v(
          "td",
          {
            className: `px-4 py-2 text-sm ${o.align === "right" ? "text-right" : o.align === "center" ? "text-center" : ""}`,
            children: t[o.key]
          },
          o.key
        )) }, n)) })
      ]
    }
  );
}
function We({
  children: l,
  className: s = "",
  style: a = {}
}) {
  return /* @__PURE__ */ v("tr", { className: s, style: a, children: l });
}
function Ye({
  children: l,
  align: s = "left",
  className: a = "",
  style: c = {}
}) {
  const u = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  }[s];
  return /* @__PURE__ */ v(
    "td",
    {
      className: `px-4 py-2 ${u} ${a}`,
      style: c,
      children: l
    }
  );
}
function Ve({
  children: l,
  variant: s = "default",
  size: a = "md",
  rounded: c = !0,
  className: u = "",
  style: i = {}
}) {
  const w = {
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
    default: "bg-gray-100 text-gray-800"
  }[s], g = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  }[a];
  return /* @__PURE__ */ v(
    "span",
    {
      className: `inline-block ${w} ${g} ${c ? "rounded-full" : "rounded"} ${u}`,
      style: i,
      children: l
    }
  );
}
function Xe({
  variant: l = "solid",
  size: s = 2,
  color: a = "gray-300",
  className: c = "",
  style: u = {}
}) {
  const i = {
    solid: "border-solid",
    dashed: "border-dashed",
    dotted: "border-dotted"
  }[l], w = `border-${a}`;
  return /* @__PURE__ */ v(
    "hr",
    {
      className: `border-${s} ${i} ${w} ${c}`,
      style: u
    }
  );
}
function Ke({
  subtotal: l,
  discount: s = 0,
  tax: a = 0,
  shipping: c = 0,
  total: u,
  currency: i = "€",
  className: w = "",
  style: g = {}
}) {
  const e = (l - s) * (a / 100);
  return /* @__PURE__ */ v(
    xe,
    {
      className: `bg-gray-50 p-4 rounded-lg ${w}`,
      style: g,
      children: /* @__PURE__ */ N(T, { direction: "column", gap: 2, children: [
        /* @__PURE__ */ N(T, { direction: "row", justify: "between", children: [
          /* @__PURE__ */ v($, { variant: "body", color: "muted", children: "Subtotal" }),
          /* @__PURE__ */ N($, { variant: "body", children: [
            l.toFixed(2),
            " ",
            i
          ] })
        ] }),
        s > 0 && /* @__PURE__ */ N(T, { direction: "row", justify: "between", children: [
          /* @__PURE__ */ v($, { variant: "body", color: "muted", children: "Discount" }),
          /* @__PURE__ */ N($, { variant: "body", color: "danger", children: [
            "-",
            s.toFixed(2),
            " ",
            i
          ] })
        ] }),
        a > 0 && /* @__PURE__ */ N(T, { direction: "row", justify: "between", children: [
          /* @__PURE__ */ N($, { variant: "body", color: "muted", children: [
            "Tax (",
            a,
            "%)"
          ] }),
          /* @__PURE__ */ N($, { variant: "body", children: [
            e.toFixed(2),
            " ",
            i
          ] })
        ] }),
        c > 0 && /* @__PURE__ */ N(T, { direction: "row", justify: "between", children: [
          /* @__PURE__ */ v($, { variant: "body", color: "muted", children: "Shipping" }),
          /* @__PURE__ */ N($, { variant: "body", children: [
            c.toFixed(2),
            " ",
            i
          ] })
        ] }),
        /* @__PURE__ */ v("div", { className: "border-t-2 border-gray-300 pt-2 mt-2", children: /* @__PURE__ */ N(T, { direction: "row", justify: "between", children: [
          /* @__PURE__ */ v($, { variant: "h5", bold: !0, children: "Total" }),
          /* @__PURE__ */ N($, { variant: "h5", bold: !0, children: [
            u.toFixed(2),
            " ",
            i
          ] })
        ] }) })
      ] })
    }
  );
}
var Ne = Object.defineProperty, U = Object.getOwnPropertySymbols, ne = Object.prototype.hasOwnProperty, oe = Object.prototype.propertyIsEnumerable, q = (l, s, a) => s in l ? Ne(l, s, { enumerable: !0, configurable: !0, writable: !0, value: a }) : l[s] = a, j = (l, s) => {
  for (var a in s || (s = {}))
    ne.call(s, a) && q(l, a, s[a]);
  if (U)
    for (var a of U(s))
      oe.call(s, a) && q(l, a, s[a]);
  return l;
}, G = (l, s) => {
  var a = {};
  for (var c in l)
    ne.call(l, c) && s.indexOf(c) < 0 && (a[c] = l[c]);
  if (l != null && U)
    for (var c of U(l))
      s.indexOf(c) < 0 && oe.call(l, c) && (a[c] = l[c]);
  return a;
};
/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */
var O;
((l) => {
  const s = class E {
    /*-- Constructor (low level) and fields --*/
    // Creates a new QR Code with the given version number,
    // error correction level, data codeword bytes, and mask number.
    // This is a low-level API that most users should not use directly.
    // A mid-level API is the encodeSegments() function.
    constructor(e, r, t, n) {
      if (this.version = e, this.errorCorrectionLevel = r, this.modules = [], this.isFunction = [], e < E.MIN_VERSION || e > E.MAX_VERSION)
        throw new RangeError("Version value out of range");
      if (n < -1 || n > 7)
        throw new RangeError("Mask value out of range");
      this.size = e * 4 + 17;
      let o = [];
      for (let d = 0; d < this.size; d++)
        o.push(!1);
      for (let d = 0; d < this.size; d++)
        this.modules.push(o.slice()), this.isFunction.push(o.slice());
      this.drawFunctionPatterns();
      const f = this.addEccAndInterleave(t);
      if (this.drawCodewords(f), n == -1) {
        let d = 1e9;
        for (let h = 0; h < 8; h++) {
          this.applyMask(h), this.drawFormatBits(h);
          const m = this.getPenaltyScore();
          m < d && (n = h, d = m), this.applyMask(h);
        }
      }
      u(0 <= n && n <= 7), this.mask = n, this.applyMask(n), this.drawFormatBits(n), this.isFunction = [];
    }
    /*-- Static factory functions (high level) --*/
    // Returns a QR Code representing the given Unicode text string at the given error correction level.
    // As a conservative upper bound, this function is guaranteed to succeed for strings that have 738 or fewer
    // Unicode code points (not UTF-16 code units) if the low error correction level is used. The smallest possible
    // QR Code version is automatically chosen for the output. The ECC level of the result may be higher than the
    // ecl argument if it can be done without increasing the version.
    static encodeText(e, r) {
      const t = l.QrSegment.makeSegments(e);
      return E.encodeSegments(t, r);
    }
    // Returns a QR Code representing the given binary data at the given error correction level.
    // This function always encodes using the binary segment mode, not any text mode. The maximum number of
    // bytes allowed is 2953. The smallest possible QR Code version is automatically chosen for the output.
    // The ECC level of the result may be higher than the ecl argument if it can be done without increasing the version.
    static encodeBinary(e, r) {
      const t = l.QrSegment.makeBytes(e);
      return E.encodeSegments([t], r);
    }
    /*-- Static factory functions (mid level) --*/
    // Returns a QR Code representing the given segments with the given encoding parameters.
    // The smallest possible QR Code version within the given range is automatically
    // chosen for the output. Iff boostEcl is true, then the ECC level of the result
    // may be higher than the ecl argument if it can be done without increasing the
    // version. The mask number is either between 0 to 7 (inclusive) to force that
    // mask, or -1 to automatically choose an appropriate mask (which may be slow).
    // This function allows the user to create a custom sequence of segments that switches
    // between modes (such as alphanumeric and byte) to encode text in less space.
    // This is a mid-level API; the high-level API is encodeText() and encodeBinary().
    static encodeSegments(e, r, t = 1, n = 40, o = -1, f = !0) {
      if (!(E.MIN_VERSION <= t && t <= n && n <= E.MAX_VERSION) || o < -1 || o > 7)
        throw new RangeError("Invalid value");
      let d, h;
      for (d = t; ; d++) {
        const C = E.getNumDataCodewords(d, r) * 8, y = w.getTotalBits(e, d);
        if (y <= C) {
          h = y;
          break;
        }
        if (d >= n)
          throw new RangeError("Data too long");
      }
      for (const C of [E.Ecc.MEDIUM, E.Ecc.QUARTILE, E.Ecc.HIGH])
        f && h <= E.getNumDataCodewords(d, C) * 8 && (r = C);
      let m = [];
      for (const C of e) {
        a(C.mode.modeBits, 4, m), a(C.numChars, C.mode.numCharCountBits(d), m);
        for (const y of C.getData())
          m.push(y);
      }
      u(m.length == h);
      const M = E.getNumDataCodewords(d, r) * 8;
      u(m.length <= M), a(0, Math.min(4, M - m.length), m), a(0, (8 - m.length % 8) % 8, m), u(m.length % 8 == 0);
      for (let C = 236; m.length < M; C ^= 253)
        a(C, 8, m);
      let b = [];
      for (; b.length * 8 < m.length; )
        b.push(0);
      return m.forEach((C, y) => b[y >>> 3] |= C << 7 - (y & 7)), new E(d, r, b, o);
    }
    /*-- Accessor methods --*/
    // Returns the color of the module (pixel) at the given coordinates, which is false
    // for light or true for dark. The top left corner has the coordinates (x=0, y=0).
    // If the given coordinates are out of bounds, then false (light) is returned.
    getModule(e, r) {
      return 0 <= e && e < this.size && 0 <= r && r < this.size && this.modules[r][e];
    }
    // Modified to expose modules for easy access
    getModules() {
      return this.modules;
    }
    /*-- Private helper methods for constructor: Drawing function modules --*/
    // Reads this object's version field, and draws and marks all function modules.
    drawFunctionPatterns() {
      for (let t = 0; t < this.size; t++)
        this.setFunctionModule(6, t, t % 2 == 0), this.setFunctionModule(t, 6, t % 2 == 0);
      this.drawFinderPattern(3, 3), this.drawFinderPattern(this.size - 4, 3), this.drawFinderPattern(3, this.size - 4);
      const e = this.getAlignmentPatternPositions(), r = e.length;
      for (let t = 0; t < r; t++)
        for (let n = 0; n < r; n++)
          t == 0 && n == 0 || t == 0 && n == r - 1 || t == r - 1 && n == 0 || this.drawAlignmentPattern(e[t], e[n]);
      this.drawFormatBits(0), this.drawVersion();
    }
    // Draws two copies of the format bits (with its own error correction code)
    // based on the given mask and this object's error correction level field.
    drawFormatBits(e) {
      const r = this.errorCorrectionLevel.formatBits << 3 | e;
      let t = r;
      for (let o = 0; o < 10; o++)
        t = t << 1 ^ (t >>> 9) * 1335;
      const n = (r << 10 | t) ^ 21522;
      u(n >>> 15 == 0);
      for (let o = 0; o <= 5; o++)
        this.setFunctionModule(8, o, c(n, o));
      this.setFunctionModule(8, 7, c(n, 6)), this.setFunctionModule(8, 8, c(n, 7)), this.setFunctionModule(7, 8, c(n, 8));
      for (let o = 9; o < 15; o++)
        this.setFunctionModule(14 - o, 8, c(n, o));
      for (let o = 0; o < 8; o++)
        this.setFunctionModule(this.size - 1 - o, 8, c(n, o));
      for (let o = 8; o < 15; o++)
        this.setFunctionModule(8, this.size - 15 + o, c(n, o));
      this.setFunctionModule(8, this.size - 8, !0);
    }
    // Draws two copies of the version bits (with its own error correction code),
    // based on this object's version field, iff 7 <= version <= 40.
    drawVersion() {
      if (this.version < 7)
        return;
      let e = this.version;
      for (let t = 0; t < 12; t++)
        e = e << 1 ^ (e >>> 11) * 7973;
      const r = this.version << 12 | e;
      u(r >>> 18 == 0);
      for (let t = 0; t < 18; t++) {
        const n = c(r, t), o = this.size - 11 + t % 3, f = Math.floor(t / 3);
        this.setFunctionModule(o, f, n), this.setFunctionModule(f, o, n);
      }
    }
    // Draws a 9*9 finder pattern including the border separator,
    // with the center module at (x, y). Modules can be out of bounds.
    drawFinderPattern(e, r) {
      for (let t = -4; t <= 4; t++)
        for (let n = -4; n <= 4; n++) {
          const o = Math.max(Math.abs(n), Math.abs(t)), f = e + n, d = r + t;
          0 <= f && f < this.size && 0 <= d && d < this.size && this.setFunctionModule(f, d, o != 2 && o != 4);
        }
    }
    // Draws a 5*5 alignment pattern, with the center module
    // at (x, y). All modules must be in bounds.
    drawAlignmentPattern(e, r) {
      for (let t = -2; t <= 2; t++)
        for (let n = -2; n <= 2; n++)
          this.setFunctionModule(e + n, r + t, Math.max(Math.abs(n), Math.abs(t)) != 1);
    }
    // Sets the color of a module and marks it as a function module.
    // Only used by the constructor. Coordinates must be in bounds.
    setFunctionModule(e, r, t) {
      this.modules[r][e] = t, this.isFunction[r][e] = !0;
    }
    /*-- Private helper methods for constructor: Codewords and masking --*/
    // Returns a new byte string representing the given data with the appropriate error correction
    // codewords appended to it, based on this object's version and error correction level.
    addEccAndInterleave(e) {
      const r = this.version, t = this.errorCorrectionLevel;
      if (e.length != E.getNumDataCodewords(r, t))
        throw new RangeError("Invalid argument");
      const n = E.NUM_ERROR_CORRECTION_BLOCKS[t.ordinal][r], o = E.ECC_CODEWORDS_PER_BLOCK[t.ordinal][r], f = Math.floor(E.getNumRawDataModules(r) / 8), d = n - f % n, h = Math.floor(f / n);
      let m = [];
      const M = E.reedSolomonComputeDivisor(o);
      for (let C = 0, y = 0; C < n; C++) {
        let p = e.slice(y, y + h - o + (C < d ? 0 : 1));
        y += p.length;
        const x = E.reedSolomonComputeRemainder(p, M);
        C < d && p.push(0), m.push(p.concat(x));
      }
      let b = [];
      for (let C = 0; C < m[0].length; C++)
        m.forEach((y, p) => {
          (C != h - o || p >= d) && b.push(y[C]);
        });
      return u(b.length == f), b;
    }
    // Draws the given sequence of 8-bit codewords (data and error correction) onto the entire
    // data area of this QR Code. Function modules need to be marked off before this is called.
    drawCodewords(e) {
      if (e.length != Math.floor(E.getNumRawDataModules(this.version) / 8))
        throw new RangeError("Invalid argument");
      let r = 0;
      for (let t = this.size - 1; t >= 1; t -= 2) {
        t == 6 && (t = 5);
        for (let n = 0; n < this.size; n++)
          for (let o = 0; o < 2; o++) {
            const f = t - o, h = (t + 1 & 2) == 0 ? this.size - 1 - n : n;
            !this.isFunction[h][f] && r < e.length * 8 && (this.modules[h][f] = c(e[r >>> 3], 7 - (r & 7)), r++);
          }
      }
      u(r == e.length * 8);
    }
    // XORs the codeword modules in this QR Code with the given mask pattern.
    // The function modules must be marked and the codeword bits must be drawn
    // before masking. Due to the arithmetic of XOR, calling applyMask() with
    // the same mask value a second time will undo the mask. A final well-formed
    // QR Code needs exactly one (not zero, two, etc.) mask applied.
    applyMask(e) {
      if (e < 0 || e > 7)
        throw new RangeError("Mask value out of range");
      for (let r = 0; r < this.size; r++)
        for (let t = 0; t < this.size; t++) {
          let n;
          switch (e) {
            case 0:
              n = (t + r) % 2 == 0;
              break;
            case 1:
              n = r % 2 == 0;
              break;
            case 2:
              n = t % 3 == 0;
              break;
            case 3:
              n = (t + r) % 3 == 0;
              break;
            case 4:
              n = (Math.floor(t / 3) + Math.floor(r / 2)) % 2 == 0;
              break;
            case 5:
              n = t * r % 2 + t * r % 3 == 0;
              break;
            case 6:
              n = (t * r % 2 + t * r % 3) % 2 == 0;
              break;
            case 7:
              n = ((t + r) % 2 + t * r % 3) % 2 == 0;
              break;
            default:
              throw new Error("Unreachable");
          }
          !this.isFunction[r][t] && n && (this.modules[r][t] = !this.modules[r][t]);
        }
    }
    // Calculates and returns the penalty score based on state of this QR Code's current modules.
    // This is used by the automatic mask choice algorithm to find the mask pattern that yields the lowest score.
    getPenaltyScore() {
      let e = 0;
      for (let o = 0; o < this.size; o++) {
        let f = !1, d = 0, h = [0, 0, 0, 0, 0, 0, 0];
        for (let m = 0; m < this.size; m++)
          this.modules[o][m] == f ? (d++, d == 5 ? e += E.PENALTY_N1 : d > 5 && e++) : (this.finderPenaltyAddHistory(d, h), f || (e += this.finderPenaltyCountPatterns(h) * E.PENALTY_N3), f = this.modules[o][m], d = 1);
        e += this.finderPenaltyTerminateAndCount(f, d, h) * E.PENALTY_N3;
      }
      for (let o = 0; o < this.size; o++) {
        let f = !1, d = 0, h = [0, 0, 0, 0, 0, 0, 0];
        for (let m = 0; m < this.size; m++)
          this.modules[m][o] == f ? (d++, d == 5 ? e += E.PENALTY_N1 : d > 5 && e++) : (this.finderPenaltyAddHistory(d, h), f || (e += this.finderPenaltyCountPatterns(h) * E.PENALTY_N3), f = this.modules[m][o], d = 1);
        e += this.finderPenaltyTerminateAndCount(f, d, h) * E.PENALTY_N3;
      }
      for (let o = 0; o < this.size - 1; o++)
        for (let f = 0; f < this.size - 1; f++) {
          const d = this.modules[o][f];
          d == this.modules[o][f + 1] && d == this.modules[o + 1][f] && d == this.modules[o + 1][f + 1] && (e += E.PENALTY_N2);
        }
      let r = 0;
      for (const o of this.modules)
        r = o.reduce((f, d) => f + (d ? 1 : 0), r);
      const t = this.size * this.size, n = Math.ceil(Math.abs(r * 20 - t * 10) / t) - 1;
      return u(0 <= n && n <= 9), e += n * E.PENALTY_N4, u(0 <= e && e <= 2568888), e;
    }
    /*-- Private helper functions --*/
    // Returns an ascending list of positions of alignment patterns for this version number.
    // Each position is in the range [0,177), and are used on both the x and y axes.
    // This could be implemented as lookup table of 40 variable-length lists of integers.
    getAlignmentPatternPositions() {
      if (this.version == 1)
        return [];
      {
        const e = Math.floor(this.version / 7) + 2, r = this.version == 32 ? 26 : Math.ceil((this.version * 4 + 4) / (e * 2 - 2)) * 2;
        let t = [6];
        for (let n = this.size - 7; t.length < e; n -= r)
          t.splice(1, 0, n);
        return t;
      }
    }
    // Returns the number of data bits that can be stored in a QR Code of the given version number, after
    // all function modules are excluded. This includes remainder bits, so it might not be a multiple of 8.
    // The result is in the range [208, 29648]. This could be implemented as a 40-entry lookup table.
    static getNumRawDataModules(e) {
      if (e < E.MIN_VERSION || e > E.MAX_VERSION)
        throw new RangeError("Version number out of range");
      let r = (16 * e + 128) * e + 64;
      if (e >= 2) {
        const t = Math.floor(e / 7) + 2;
        r -= (25 * t - 10) * t - 55, e >= 7 && (r -= 36);
      }
      return u(208 <= r && r <= 29648), r;
    }
    // Returns the number of 8-bit data (i.e. not error correction) codewords contained in any
    // QR Code of the given version number and error correction level, with remainder bits discarded.
    // This stateless pure function could be implemented as a (40*4)-cell lookup table.
    static getNumDataCodewords(e, r) {
      return Math.floor(E.getNumRawDataModules(e) / 8) - E.ECC_CODEWORDS_PER_BLOCK[r.ordinal][e] * E.NUM_ERROR_CORRECTION_BLOCKS[r.ordinal][e];
    }
    // Returns a Reed-Solomon ECC generator polynomial for the given degree. This could be
    // implemented as a lookup table over all possible parameter values, instead of as an algorithm.
    static reedSolomonComputeDivisor(e) {
      if (e < 1 || e > 255)
        throw new RangeError("Degree out of range");
      let r = [];
      for (let n = 0; n < e - 1; n++)
        r.push(0);
      r.push(1);
      let t = 1;
      for (let n = 0; n < e; n++) {
        for (let o = 0; o < r.length; o++)
          r[o] = E.reedSolomonMultiply(r[o], t), o + 1 < r.length && (r[o] ^= r[o + 1]);
        t = E.reedSolomonMultiply(t, 2);
      }
      return r;
    }
    // Returns the Reed-Solomon error correction codeword for the given data and divisor polynomials.
    static reedSolomonComputeRemainder(e, r) {
      let t = r.map((n) => 0);
      for (const n of e) {
        const o = n ^ t.shift();
        t.push(0), r.forEach((f, d) => t[d] ^= E.reedSolomonMultiply(f, o));
      }
      return t;
    }
    // Returns the product of the two given field elements modulo GF(2^8/0x11D). The arguments and result
    // are unsigned 8-bit integers. This could be implemented as a lookup table of 256*256 entries of uint8.
    static reedSolomonMultiply(e, r) {
      if (e >>> 8 || r >>> 8)
        throw new RangeError("Byte out of range");
      let t = 0;
      for (let n = 7; n >= 0; n--)
        t = t << 1 ^ (t >>> 7) * 285, t ^= (r >>> n & 1) * e;
      return u(t >>> 8 == 0), t;
    }
    // Can only be called immediately after a light run is added, and
    // returns either 0, 1, or 2. A helper function for getPenaltyScore().
    finderPenaltyCountPatterns(e) {
      const r = e[1];
      u(r <= this.size * 3);
      const t = r > 0 && e[2] == r && e[3] == r * 3 && e[4] == r && e[5] == r;
      return (t && e[0] >= r * 4 && e[6] >= r ? 1 : 0) + (t && e[6] >= r * 4 && e[0] >= r ? 1 : 0);
    }
    // Must be called at the end of a line (row or column) of modules. A helper function for getPenaltyScore().
    finderPenaltyTerminateAndCount(e, r, t) {
      return e && (this.finderPenaltyAddHistory(r, t), r = 0), r += this.size, this.finderPenaltyAddHistory(r, t), this.finderPenaltyCountPatterns(t);
    }
    // Pushes the given value to the front and drops the last value. A helper function for getPenaltyScore().
    finderPenaltyAddHistory(e, r) {
      r[0] == 0 && (e += this.size), r.pop(), r.unshift(e);
    }
  };
  s.MIN_VERSION = 1, s.MAX_VERSION = 40, s.PENALTY_N1 = 3, s.PENALTY_N2 = 3, s.PENALTY_N3 = 40, s.PENALTY_N4 = 10, s.ECC_CODEWORDS_PER_BLOCK = [
    // Version: (note that index 0 is for padding, and is set to an illegal value)
    //0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40    Error correction level
    [-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    // Low
    [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
    // Medium
    [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    // Quartile
    [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
    // High
  ], s.NUM_ERROR_CORRECTION_BLOCKS = [
    // Version: (note that index 0 is for padding, and is set to an illegal value)
    //0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40    Error correction level
    [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
    // Low
    [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
    // Medium
    [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],
    // Quartile
    [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81]
    // High
  ], l.QrCode = s;
  function a(g, e, r) {
    if (e < 0 || e > 31 || g >>> e)
      throw new RangeError("Value out of range");
    for (let t = e - 1; t >= 0; t--)
      r.push(g >>> t & 1);
  }
  function c(g, e) {
    return (g >>> e & 1) != 0;
  }
  function u(g) {
    if (!g)
      throw new Error("Assertion error");
  }
  const i = class R {
    /*-- Constructor (low level) and fields --*/
    // Creates a new QR Code segment with the given attributes and data.
    // The character count (numChars) must agree with the mode and the bit buffer length,
    // but the constraint isn't checked. The given bit buffer is cloned and stored.
    constructor(e, r, t) {
      if (this.mode = e, this.numChars = r, this.bitData = t, r < 0)
        throw new RangeError("Invalid argument");
      this.bitData = t.slice();
    }
    /*-- Static factory functions (mid level) --*/
    // Returns a segment representing the given binary data encoded in
    // byte mode. All input byte arrays are acceptable. Any text string
    // can be converted to UTF-8 bytes and encoded as a byte mode segment.
    static makeBytes(e) {
      let r = [];
      for (const t of e)
        a(t, 8, r);
      return new R(R.Mode.BYTE, e.length, r);
    }
    // Returns a segment representing the given string of decimal digits encoded in numeric mode.
    static makeNumeric(e) {
      if (!R.isNumeric(e))
        throw new RangeError("String contains non-numeric characters");
      let r = [];
      for (let t = 0; t < e.length; ) {
        const n = Math.min(e.length - t, 3);
        a(parseInt(e.substring(t, t + n), 10), n * 3 + 1, r), t += n;
      }
      return new R(R.Mode.NUMERIC, e.length, r);
    }
    // Returns a segment representing the given text string encoded in alphanumeric mode.
    // The characters allowed are: 0 to 9, A to Z (uppercase only), space,
    // dollar, percent, asterisk, plus, hyphen, period, slash, colon.
    static makeAlphanumeric(e) {
      if (!R.isAlphanumeric(e))
        throw new RangeError("String contains unencodable characters in alphanumeric mode");
      let r = [], t;
      for (t = 0; t + 2 <= e.length; t += 2) {
        let n = R.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t)) * 45;
        n += R.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t + 1)), a(n, 11, r);
      }
      return t < e.length && a(R.ALPHANUMERIC_CHARSET.indexOf(e.charAt(t)), 6, r), new R(R.Mode.ALPHANUMERIC, e.length, r);
    }
    // Returns a new mutable list of zero or more segments to represent the given Unicode text string.
    // The result may use various segment modes and switch modes to optimize the length of the bit stream.
    static makeSegments(e) {
      return e == "" ? [] : R.isNumeric(e) ? [R.makeNumeric(e)] : R.isAlphanumeric(e) ? [R.makeAlphanumeric(e)] : [R.makeBytes(R.toUtf8ByteArray(e))];
    }
    // Returns a segment representing an Extended Channel Interpretation
    // (ECI) designator with the given assignment value.
    static makeEci(e) {
      let r = [];
      if (e < 0)
        throw new RangeError("ECI assignment value out of range");
      if (e < 128)
        a(e, 8, r);
      else if (e < 16384)
        a(2, 2, r), a(e, 14, r);
      else if (e < 1e6)
        a(6, 3, r), a(e, 21, r);
      else
        throw new RangeError("ECI assignment value out of range");
      return new R(R.Mode.ECI, 0, r);
    }
    // Tests whether the given string can be encoded as a segment in numeric mode.
    // A string is encodable iff each character is in the range 0 to 9.
    static isNumeric(e) {
      return R.NUMERIC_REGEX.test(e);
    }
    // Tests whether the given string can be encoded as a segment in alphanumeric mode.
    // A string is encodable iff each character is in the following set: 0 to 9, A to Z
    // (uppercase only), space, dollar, percent, asterisk, plus, hyphen, period, slash, colon.
    static isAlphanumeric(e) {
      return R.ALPHANUMERIC_REGEX.test(e);
    }
    /*-- Methods --*/
    // Returns a new copy of the data bits of this segment.
    getData() {
      return this.bitData.slice();
    }
    // (Package-private) Calculates and returns the number of bits needed to encode the given segments at
    // the given version. The result is infinity if a segment has too many characters to fit its length field.
    static getTotalBits(e, r) {
      let t = 0;
      for (const n of e) {
        const o = n.mode.numCharCountBits(r);
        if (n.numChars >= 1 << o)
          return 1 / 0;
        t += 4 + o + n.bitData.length;
      }
      return t;
    }
    // Returns a new array of bytes representing the given string encoded in UTF-8.
    static toUtf8ByteArray(e) {
      e = encodeURI(e);
      let r = [];
      for (let t = 0; t < e.length; t++)
        e.charAt(t) != "%" ? r.push(e.charCodeAt(t)) : (r.push(parseInt(e.substring(t + 1, t + 3), 16)), t += 2);
      return r;
    }
  };
  i.NUMERIC_REGEX = /^[0-9]*$/, i.ALPHANUMERIC_REGEX = /^[A-Z0-9 $%*+.\/:-]*$/, i.ALPHANUMERIC_CHARSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";
  let w = i;
  l.QrSegment = i;
})(O || (O = {}));
((l) => {
  ((s) => {
    const a = class {
      // The QR Code can tolerate about 30% erroneous codewords
      /*-- Constructor and fields --*/
      constructor(u, i) {
        this.ordinal = u, this.formatBits = i;
      }
    };
    a.LOW = new a(0, 1), a.MEDIUM = new a(1, 0), a.QUARTILE = new a(2, 3), a.HIGH = new a(3, 2), s.Ecc = a;
  })(l.QrCode || (l.QrCode = {}));
})(O || (O = {}));
((l) => {
  ((s) => {
    const a = class {
      /*-- Constructor and fields --*/
      constructor(u, i) {
        this.modeBits = u, this.numBitsCharCount = i;
      }
      /*-- Method --*/
      // (Package-private) Returns the bit width of the character count field for a segment in
      // this mode in a QR Code at the given version number. The result is in the range [0, 16].
      numCharCountBits(u) {
        return this.numBitsCharCount[Math.floor((u + 7) / 17)];
      }
    };
    a.NUMERIC = new a(1, [10, 12, 14]), a.ALPHANUMERIC = new a(2, [9, 11, 13]), a.BYTE = new a(4, [8, 16, 16]), a.KANJI = new a(8, [8, 10, 12]), a.ECI = new a(7, [0, 0, 0]), s.Mode = a;
  })(l.QrSegment || (l.QrSegment = {}));
})(O || (O = {}));
var B = O;
/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */
var Ae = {
  L: B.QrCode.Ecc.LOW,
  M: B.QrCode.Ecc.MEDIUM,
  Q: B.QrCode.Ecc.QUARTILE,
  H: B.QrCode.Ecc.HIGH
}, ae = 128, se = "L", ie = "#FFFFFF", le = "#000000", ce = !1, de = 1, Se = 4, Ie = 0, $e = 0.1;
function fe(l, s = 0) {
  const a = [];
  return l.forEach(function(c, u) {
    let i = null;
    c.forEach(function(w, g) {
      if (!w && i !== null) {
        a.push(
          `M${i + s} ${u + s}h${g - i}v1H${i + s}z`
        ), i = null;
        return;
      }
      if (g === c.length - 1) {
        if (!w)
          return;
        i === null ? a.push(`M${g + s},${u + s} h1v1H${g + s}z`) : a.push(
          `M${i + s},${u + s} h${g + 1 - i}v1H${i + s}z`
        );
        return;
      }
      w && i === null && (i = g);
    });
  }), a.join("");
}
function ue(l, s) {
  return l.slice().map((a, c) => c < s.y || c >= s.y + s.h ? a : a.map((u, i) => i < s.x || i >= s.x + s.w ? u : !1));
}
function Le(l, s, a, c) {
  if (c == null)
    return null;
  const u = l.length + a * 2, i = Math.floor(s * $e), w = u / s, g = (c.width || i) * w, e = (c.height || i) * w, r = c.x == null ? l.length / 2 - g / 2 : c.x * w, t = c.y == null ? l.length / 2 - e / 2 : c.y * w, n = c.opacity == null ? 1 : c.opacity;
  let o = null;
  if (c.excavate) {
    let d = Math.floor(r), h = Math.floor(t), m = Math.ceil(g + r - d), M = Math.ceil(e + t - h);
    o = { x: d, y: h, w: m, h: M };
  }
  const f = c.crossOrigin;
  return { x: r, y: t, h: e, w: g, excavation: o, opacity: n, crossOrigin: f };
}
function Fe(l, s) {
  return s != null ? Math.max(Math.floor(s), 0) : l ? Se : Ie;
}
function he({
  value: l,
  level: s,
  minVersion: a,
  includeMargin: c,
  marginSize: u,
  imageSettings: i,
  size: w,
  boostLevel: g
}) {
  let e = P.useMemo(() => {
    const d = (Array.isArray(l) ? l : [l]).reduce((h, m) => (h.push(...B.QrSegment.makeSegments(m)), h), []);
    return B.QrCode.encodeSegments(
      d,
      Ae[s],
      a,
      void 0,
      void 0,
      g
    );
  }, [l, s, a, g]);
  const { cells: r, margin: t, numCells: n, calculatedImageSettings: o } = P.useMemo(() => {
    let f = e.getModules();
    const d = Fe(c, u), h = f.length + d * 2, m = Le(
      f,
      w,
      d,
      i
    );
    return {
      cells: f,
      margin: d,
      numCells: h,
      calculatedImageSettings: m
    };
  }, [e, w, i, c, u]);
  return {
    qrcode: e,
    margin: t,
    cells: r,
    numCells: n,
    calculatedImageSettings: o
  };
}
var Oe = function() {
  try {
    new Path2D().addPath(new Path2D());
  } catch {
    return !1;
  }
  return !0;
}(), De = P.forwardRef(
  function(s, a) {
    const c = s, {
      value: u,
      size: i = ae,
      level: w = se,
      bgColor: g = ie,
      fgColor: e = le,
      includeMargin: r = ce,
      minVersion: t = de,
      boostLevel: n,
      marginSize: o,
      imageSettings: f
    } = c, h = G(c, [
      "value",
      "size",
      "level",
      "bgColor",
      "fgColor",
      "includeMargin",
      "minVersion",
      "boostLevel",
      "marginSize",
      "imageSettings"
    ]), { style: m } = h, M = G(h, ["style"]), b = f == null ? void 0 : f.src, C = P.useRef(null), y = P.useRef(null), p = P.useCallback(
      (F) => {
        C.current = F, typeof a == "function" ? a(F) : a && (a.current = F);
      },
      [a]
    ), [x, S] = P.useState(!1), { margin: I, cells: D, numCells: k, calculatedImageSettings: A } = he({
      value: u,
      level: w,
      minVersion: t,
      boostLevel: n,
      includeMargin: r,
      marginSize: o,
      imageSettings: f,
      size: i
    });
    P.useEffect(() => {
      if (C.current != null) {
        const F = C.current, L = F.getContext("2d");
        if (!L)
          return;
        let Y = D;
        const z = y.current, V = A != null && z !== null && z.complete && z.naturalHeight !== 0 && z.naturalWidth !== 0;
        V && A.excavation != null && (Y = ue(
          D,
          A.excavation
        ));
        const X = window.devicePixelRatio || 1;
        F.height = F.width = i * X;
        const K = i / k * X;
        L.scale(K, K), L.fillStyle = g, L.fillRect(0, 0, k, k), L.fillStyle = e, Oe ? L.fill(new Path2D(fe(Y, I))) : D.forEach(function(we, Ce) {
          we.forEach(function(ye, Ee) {
            ye && L.fillRect(Ee + I, Ce + I, 1, 1);
          });
        }), A && (L.globalAlpha = A.opacity), V && L.drawImage(
          z,
          A.x + I,
          A.y + I,
          A.w,
          A.h
        );
      }
    }), P.useEffect(() => {
      S(!1);
    }, [b]);
    const me = j({ height: i, width: i }, m);
    let W = null;
    return b != null && (W = /* @__PURE__ */ P.createElement(
      "img",
      {
        src: b,
        key: b,
        style: { display: "none" },
        onLoad: () => {
          S(!0);
        },
        ref: y,
        crossOrigin: A == null ? void 0 : A.crossOrigin
      }
    )), /* @__PURE__ */ P.createElement(P.Fragment, null, /* @__PURE__ */ P.createElement(
      "canvas",
      j({
        style: me,
        height: i,
        width: i,
        ref: p,
        role: "img"
      }, M)
    ), W);
  }
);
De.displayName = "QRCodeCanvas";
var ge = P.forwardRef(
  function(s, a) {
    const c = s, {
      value: u,
      size: i = ae,
      level: w = se,
      bgColor: g = ie,
      fgColor: e = le,
      includeMargin: r = ce,
      minVersion: t = de,
      boostLevel: n,
      title: o,
      marginSize: f,
      imageSettings: d
    } = c, h = G(c, [
      "value",
      "size",
      "level",
      "bgColor",
      "fgColor",
      "includeMargin",
      "minVersion",
      "boostLevel",
      "title",
      "marginSize",
      "imageSettings"
    ]), { margin: m, cells: M, numCells: b, calculatedImageSettings: C } = he({
      value: u,
      level: w,
      minVersion: t,
      boostLevel: n,
      includeMargin: r,
      marginSize: f,
      imageSettings: d,
      size: i
    });
    let y = M, p = null;
    d != null && C != null && (C.excavation != null && (y = ue(
      M,
      C.excavation
    )), p = /* @__PURE__ */ P.createElement(
      "image",
      {
        href: d.src,
        height: C.h,
        width: C.w,
        x: C.x + m,
        y: C.y + m,
        preserveAspectRatio: "none",
        opacity: C.opacity,
        crossOrigin: C.crossOrigin
      }
    ));
    const x = fe(y, m);
    return /* @__PURE__ */ P.createElement(
      "svg",
      j({
        height: i,
        width: i,
        viewBox: `0 0 ${b} ${b}`,
        ref: a,
        role: "img"
      }, h),
      !!o && /* @__PURE__ */ P.createElement("title", null, o),
      /* @__PURE__ */ P.createElement(
        "path",
        {
          fill: g,
          d: `M0,0 h${b}v${b}H0z`,
          shapeRendering: "crispEdges"
        }
      ),
      /* @__PURE__ */ P.createElement("path", { fill: e, d: x, shapeRendering: "crispEdges" }),
      p
    );
  }
);
ge.displayName = "QRCodeSVG";
function qe({
  value: l,
  size: s = 128,
  bgColor: a = "#ffffff",
  fgColor: c = "#000000",
  level: u = "M",
  includeMargin: i = !1,
  imageSettings: w,
  className: g = "",
  style: e = {}
}) {
  return /* @__PURE__ */ v(
    "div",
    {
      className: g,
      style: {
        display: "inline-block",
        ...e
      },
      children: /* @__PURE__ */ v(
        ge,
        {
          value: l,
          size: s,
          bgColor: a,
          fgColor: c,
          level: u,
          includeMargin: i,
          imageSettings: w
        }
      )
    }
  );
}
function et({
  value: l,
  format: s = "CODE128",
  width: a = 2,
  height: c = 100,
  displayValue: u = !0,
  fontSize: i = 16,
  font: w = "monospace",
  textAlign: g = "center",
  textPosition: e = "bottom",
  textMargin: r = 2,
  margin: t = 10,
  marginTop: n,
  marginBottom: o,
  marginLeft: f,
  marginRight: d,
  background: h = "#ffffff",
  lineColor: m = "#000000",
  className: M = "",
  style: b = {}
}) {
  const C = ee(null);
  return Re(() => {
    (async () => {
      if (C.current)
        try {
          C.current.innerHTML = "";
          const p = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          C.current.appendChild(p);
          const x = (await import("./JsBarcode-ImX-0ZxL.js").then((S) => S.J)).default;
          x(p, l, {
            format: s,
            width: a,
            height: c,
            displayValue: u,
            fontSize: i,
            font: w,
            textAlign: g,
            textPosition: e,
            textMargin: r,
            margin: t,
            marginTop: n,
            marginBottom: o,
            marginLeft: f,
            marginRight: d,
            background: h,
            lineColor: m
          });
        } catch (p) {
          console.error("Barcode generation failed:", p);
        }
    })();
  }, [
    l,
    s,
    a,
    c,
    u,
    i,
    w,
    g,
    e,
    r,
    t,
    n,
    o,
    f,
    d,
    h,
    m
  ]), /* @__PURE__ */ v(
    "div",
    {
      ref: C,
      className: M,
      style: {
        display: "inline-block",
        ...b
      }
    }
  );
}
function tt({
  children: l,
  className: s = "",
  style: a = {}
}) {
  return /* @__PURE__ */ v(
    "div",
    {
      className: s,
      style: {
        width: "100%",
        padding: "40px",
        backgroundColor: "#ffffff",
        pageBreakAfter: "always",
        breakAfter: "page",
        ...a
      },
      children: l
    }
  );
}
function rt() {
  const { config: l, setConfig: s, loading: a, setLoading: c, error: u, setError: i } = re();
  return {
    generate: async (t, n) => {
      try {
        c(!0), i(null);
        const o = new H(), f = t.outerHTML, d = await o.toBase64(f, {
          scale: (n == null ? void 0 : n.scale) || l.scale,
          backgroundColor: (n == null ? void 0 : n.backgroundColor) || "#ffffff"
        });
        return c(!1), d;
      } catch (o) {
        const f = o instanceof Error ? o.message : "Unknown error";
        throw i(f), c(!1), o;
      }
    },
    download: async (t, n) => {
      try {
        c(!0), i(null);
        const o = new H(), f = Array.isArray(t) ? t : [t];
        f.length === 1 ? await o.generatePage(f[0], {
          filename: (n == null ? void 0 : n.filename) || "document.pdf",
          format: (n == null ? void 0 : n.format) || l.format,
          orientation: (n == null ? void 0 : n.orientation) || l.orientation,
          scale: (n == null ? void 0 : n.scale) || l.scale,
          margin: (n == null ? void 0 : n.margin) || l.margin,
          backgroundColor: (n == null ? void 0 : n.backgroundColor) || "#ffffff"
        }) : await o.generateMultiplePages(f, {
          filename: (n == null ? void 0 : n.filename) || "document.pdf",
          format: (n == null ? void 0 : n.format) || l.format,
          orientation: (n == null ? void 0 : n.orientation) || l.orientation,
          scale: (n == null ? void 0 : n.scale) || l.scale,
          margin: (n == null ? void 0 : n.margin) || l.margin,
          backgroundColor: (n == null ? void 0 : n.backgroundColor) || "#ffffff"
        }), c(!1);
      } catch (o) {
        const f = o instanceof Error ? o.message : "Unknown error";
        throw i(f), c(!1), o;
      }
    },
    preview: (t, n) => {
      const o = document.getElementById(n);
      if (!o)
        throw new Error(`Container #${n} not found`);
      o.innerHTML = t.outerHTML;
    },
    config: l,
    updateConfig: (t) => {
      s(t);
    },
    loading: a,
    error: u,
    setError: i
  };
}
export {
  Ve as Badge,
  et as Barcode,
  xe as Box,
  Xe as Divider,
  T as Flex,
  _e as Grid,
  Qe as Heading,
  je as Image,
  Pe as PDFGenerator,
  He as PDFProvider,
  tt as Page,
  qe as QRCode,
  Ge as Table,
  Ye as TableCell,
  We as TableRow,
  $ as Text,
  Ke as TotalBox,
  rt as usePDF,
  re as usePDFContext
};
