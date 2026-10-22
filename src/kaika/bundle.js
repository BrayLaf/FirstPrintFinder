/* @ds-bundle: {"namespace":"Kaika","components":[{"name":"Avatar","sourcePath":"components/display/Avatar/Avatar.jsx"},{"name":"Badge","sourcePath":"components/display/Badge/Badge.jsx"},{"name":"Button","sourcePath":"components/actions/Button/Button.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card/Card.jsx"},{"name":"Input","sourcePath":"components/forms/Input/Input.jsx"},{"name":"KaikaMark","sourcePath":"components/brand/KaikaMark/KaikaMark.jsx"},{"name":"Menu","sourcePath":"components/navigation/Menu/Menu.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs/Tabs.jsx"},{"name":"Tooltip","sourcePath":"components/overlays/Tooltip/Tooltip.jsx"}],"sourceHashes":{"components/display/Avatar/Avatar.jsx":"35cf06004db6","components/display/Avatar/Avatar.d.ts":"8ccdce068d16","components/display/Avatar/Avatar.prompt.md":"1a31b18a8c2b","components/display/Badge/Badge.jsx":"91b11207f860","components/display/Badge/Badge.d.ts":"00e41b470fc5","components/display/Badge/Badge.prompt.md":"11948a8f91e9","components/actions/Button/Button.jsx":"aeb0c075c95b","components/actions/Button/Button.d.ts":"2854906652f1","components/actions/Button/Button.prompt.md":"fd68b229d0f4","components/surfaces/Card/Card.jsx":"bbd8e7a521a8","components/surfaces/Card/Card.d.ts":"c648caa06c68","components/surfaces/Card/Card.prompt.md":"0d58e106969a","components/forms/Input/Input.jsx":"9d47d2563a00","components/forms/Input/Input.d.ts":"d0e4244fbb90","components/forms/Input/Input.prompt.md":"a30c91acab97","components/brand/KaikaMark/KaikaMark.jsx":"54e35981be64","components/brand/KaikaMark/KaikaMark.d.ts":"29448a8f9a82","components/brand/KaikaMark/KaikaMark.prompt.md":"5a306ee83c7b","components/navigation/Menu/Menu.jsx":"be373d9d9be8","components/navigation/Menu/Menu.d.ts":"bd0797f7ebb2","components/navigation/Menu/Menu.prompt.md":"39032c4d0d68","components/navigation/Tabs/Tabs.jsx":"426dcfad732b","components/navigation/Tabs/Tabs.d.ts":"7c1c4330a09c","components/navigation/Tabs/Tabs.prompt.md":"56c3c50afe65","components/overlays/Tooltip/Tooltip.jsx":"2c859a80df70","components/overlays/Tooltip/Tooltip.d.ts":"45c0bb0b6668","components/overlays/Tooltip/Tooltip.prompt.md":"d8dd527d1d99"},"inlinedExternals":[],"builtBy":"cc-design-sync"} */
"use strict";
var Kaika = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // <define:import.meta.env>
  var init_define_import_meta_env = __esm({
    "<define:import.meta.env>"() {
    }
  });

  // shim:react-shim
  var require_react_shim = __commonJS({
    "shim:react-shim"(exports, module) {
      init_define_import_meta_env();
      var R = window.React;
      function np(p2, k) {
        var o = {};
        for (var x in p2) if (x !== "children") o[x] = p2[x];
        if (k !== void 0) o.key = k;
        return o;
      }
      function jsx(t, p2, k) {
        var c = p2 && p2.children;
        return c === void 0 ? R.createElement(t, np(p2, k)) : R.createElement(t, np(p2, k), c);
      }
      function jsxs(t, p2, k) {
        return R.createElement.apply(R, [t, np(p2, k)].concat(p2.children));
      }
      module.exports = R;
      module.exports.jsx = jsx;
      module.exports.jsxs = jsxs;
      module.exports.jsxDEV = function(t, p2, k, s) {
        return (s ? jsxs : jsx)(t, p2, k);
      };
      module.exports.Fragment = R.Fragment;
    }
  });

  // dist/index.es.js
  var index_es_exports = {};
  __export(index_es_exports, {
    Avatar: () => vt,
    Badge: () => yt,
    Button: () => tt,
    Card: () => nt,
    CardContent: () => lt,
    CardDescription: () => it,
    CardFooter: () => ct,
    CardHeader: () => st,
    CardTitle: () => at,
    Input: () => rt,
    KaikaMark: () => Tt,
    Menu: () => zt,
    MenuContent: () => St,
    MenuItem: () => It,
    MenuLabel: () => Et,
    MenuSeparator: () => Rt,
    MenuTrigger: () => Mt,
    Tab: () => Nt,
    TabList: () => kt,
    TabPanel: () => At,
    Tabs: () => Ct,
    Tooltip: () => wt
  });
  init_define_import_meta_env();
  var import_jsx_runtime = __toESM(require_react_shim(), 1);
  var import_react = __toESM(require_react_shim(), 1);
  function le(e) {
    var t, r, o = "";
    if (typeof e == "string" || typeof e == "number") o += e;
    else if (typeof e == "object") if (Array.isArray(e)) {
      var a = e.length;
      for (t = 0; t < a; t++) e[t] && (r = le(e[t])) && (o && (o += " "), o += r);
    } else for (r in e) e[r] && (o && (o += " "), o += r);
    return o;
  }
  function xe() {
    for (var e, t, r = 0, o = "", a = arguments.length; r < a; r++) (e = arguments[r]) && (t = le(e)) && (o && (o += " "), o += t);
    return o;
  }
  var Z = "-";
  var ye = (e) => {
    const t = we(e), {
      conflictingClassGroups: r,
      conflictingClassGroupModifiers: o
    } = e;
    return {
      getClassGroupId: (i) => {
        const s = i.split(Z);
        return s[0] === "" && s.length !== 1 && s.shift(), ce(s, t) || ve(i);
      },
      getConflictingClassGroupIds: (i, s) => {
        const l = r[i] || [];
        return s && o[i] ? [...l, ...o[i]] : l;
      }
    };
  };
  var ce = (e, t) => {
    var i;
    if (e.length === 0)
      return t.classGroupId;
    const r = e[0], o = t.nextPart.get(r), a = o ? ce(e.slice(1), o) : void 0;
    if (a)
      return a;
    if (t.validators.length === 0)
      return;
    const n = e.join(Z);
    return (i = t.validators.find(({
      validator: s
    }) => s(n))) == null ? void 0 : i.classGroupId;
  };
  var ne = /^\[(.+)\]$/;
  var ve = (e) => {
    if (ne.test(e)) {
      const t = ne.exec(e)[1], r = t == null ? void 0 : t.substring(0, t.indexOf(":"));
      if (r)
        return "arbitrary.." + r;
    }
  };
  var we = (e) => {
    const {
      theme: t,
      prefix: r
    } = e, o = {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    };
    return ke(Object.entries(e.classGroups), r).forEach(([n, i]) => {
      H(i, o, n, t);
    }), o;
  };
  var H = (e, t, r, o) => {
    e.forEach((a) => {
      if (typeof a == "string") {
        const n = a === "" ? t : se(t, a);
        n.classGroupId = r;
        return;
      }
      if (typeof a == "function") {
        if (Ce(a)) {
          H(a(o), t, r, o);
          return;
        }
        t.validators.push({
          validator: a,
          classGroupId: r
        });
        return;
      }
      Object.entries(a).forEach(([n, i]) => {
        H(i, se(t, n), r, o);
      });
    });
  };
  var se = (e, t) => {
    let r = e;
    return t.split(Z).forEach((o) => {
      r.nextPart.has(o) || r.nextPart.set(o, {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
      }), r = r.nextPart.get(o);
    }), r;
  };
  var Ce = (e) => e.isThemeGetter;
  var ke = (e, t) => t ? e.map(([r, o]) => {
    const a = o.map((n) => typeof n == "string" ? t + n : typeof n == "object" ? Object.fromEntries(Object.entries(n).map(([i, s]) => [t + i, s])) : n);
    return [r, a];
  }) : e;
  var Ne = (e) => {
    if (e < 1)
      return {
        get: () => {
        },
        set: () => {
        }
      };
    let t = 0, r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
    const a = (n, i) => {
      r.set(n, i), t++, t > e && (t = 0, o = r, r = /* @__PURE__ */ new Map());
    };
    return {
      get(n) {
        let i = r.get(n);
        if (i !== void 0)
          return i;
        if ((i = o.get(n)) !== void 0)
          return a(n, i), i;
      },
      set(n, i) {
        r.has(n) ? r.set(n, i) : a(n, i);
      }
    };
  };
  var de = "!";
  var Ae = (e) => {
    const {
      separator: t,
      experimentalParseClassName: r
    } = e, o = t.length === 1, a = t[0], n = t.length, i = (s) => {
      const l = [];
      let d = 0, c = 0, f;
      for (let g = 0; g < s.length; g++) {
        let y = s[g];
        if (d === 0) {
          if (y === a && (o || s.slice(g, g + n) === t)) {
            l.push(s.slice(c, g)), c = g + n;
            continue;
          }
          if (y === "/") {
            f = g;
            continue;
          }
        }
        y === "[" ? d++ : y === "]" && d--;
      }
      const v = l.length === 0 ? s : s.substring(c), w = v.startsWith(de), k = w ? v.substring(1) : v, x = f && f > c ? f - c : void 0;
      return {
        modifiers: l,
        hasImportantModifier: w,
        baseClassName: k,
        maybePostfixModifierPosition: x
      };
    };
    return r ? (s) => r({
      className: s,
      parseClassName: i
    }) : i;
  };
  var ze = (e) => {
    if (e.length <= 1)
      return e;
    const t = [];
    let r = [];
    return e.forEach((o) => {
      o[0] === "[" ? (t.push(...r.sort(), o), r = []) : r.push(o);
    }), t.push(...r.sort()), t;
  };
  var Me = (e) => ({
    cache: Ne(e.cacheSize),
    parseClassName: Ae(e),
    ...ye(e)
  });
  var Se = /\s+/;
  var Ie = (e, t) => {
    const {
      parseClassName: r,
      getClassGroupId: o,
      getConflictingClassGroupIds: a
    } = t, n = [], i = e.trim().split(Se);
    let s = "";
    for (let l = i.length - 1; l >= 0; l -= 1) {
      const d = i[l], {
        modifiers: c,
        hasImportantModifier: f,
        baseClassName: v,
        maybePostfixModifierPosition: w
      } = r(d);
      let k = !!w, x = o(k ? v.substring(0, w) : v);
      if (!x) {
        if (!k) {
          s = d + (s.length > 0 ? " " + s : s);
          continue;
        }
        if (x = o(v), !x) {
          s = d + (s.length > 0 ? " " + s : s);
          continue;
        }
        k = false;
      }
      const g = ze(c).join(":"), y = f ? g + de : g, C = y + x;
      if (n.includes(C))
        continue;
      n.push(C);
      const G = a(x, k);
      for (let R = 0; R < G.length; ++R) {
        const L = G[R];
        n.push(y + L);
      }
      s = d + (s.length > 0 ? " " + s : s);
    }
    return s;
  };
  function Re() {
    let e = 0, t, r, o = "";
    for (; e < arguments.length; )
      (t = arguments[e++]) && (r = ue(t)) && (o && (o += " "), o += r);
    return o;
  }
  var ue = (e) => {
    if (typeof e == "string")
      return e;
    let t, r = "";
    for (let o = 0; o < e.length; o++)
      e[o] && (t = ue(e[o])) && (r && (r += " "), r += t);
    return r;
  };
  function Ee(e, ...t) {
    let r, o, a, n = i;
    function i(l) {
      const d = t.reduce((c, f) => f(c), e());
      return r = Me(d), o = r.cache.get, a = r.cache.set, n = s, s(l);
    }
    function s(l) {
      const d = o(l);
      if (d)
        return d;
      const c = Ie(l, r);
      return a(l, c), c;
    }
    return function() {
      return n(Re.apply(null, arguments));
    };
  }
  var b = (e) => {
    const t = (r) => r[e] || [];
    return t.isThemeGetter = true, t;
  };
  var pe = /^\[(?:([a-z-]+):)?(.+)\]$/i;
  var Te = /^\d+\/\d+$/;
  var Ge = /* @__PURE__ */ new Set(["px", "full", "screen"]);
  var $e = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
  var Pe = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
  var je = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
  var Le = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
  var Oe = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
  var z = (e) => E(e) || Ge.has(e) || Te.test(e);
  var M = (e) => T(e, "length", qe);
  var E = (e) => !!e && !Number.isNaN(Number(e));
  var V = (e) => T(e, "number", E);
  var P = (e) => !!e && Number.isInteger(Number(e));
  var Ue = (e) => e.endsWith("%") && E(e.slice(0, -1));
  var u = (e) => pe.test(e);
  var S = (e) => $e.test(e);
  var Fe = /* @__PURE__ */ new Set(["length", "size", "percentage"]);
  var Be = (e) => T(e, Fe, fe);
  var De = (e) => T(e, "position", fe);
  var We = /* @__PURE__ */ new Set(["image", "url"]);
  var Ke = (e) => T(e, We, He);
  var _e = (e) => T(e, "", Ve);
  var j = () => true;
  var T = (e, t, r) => {
    const o = pe.exec(e);
    return o ? o[1] ? typeof t == "string" ? o[1] === t : t.has(o[1]) : r(o[2]) : false;
  };
  var qe = (e) => (
    // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
    // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
    // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
    Pe.test(e) && !je.test(e)
  );
  var fe = () => false;
  var Ve = (e) => Le.test(e);
  var He = (e) => Oe.test(e);
  var Ze = () => {
    const e = b("colors"), t = b("spacing"), r = b("blur"), o = b("brightness"), a = b("borderColor"), n = b("borderRadius"), i = b("borderSpacing"), s = b("borderWidth"), l = b("contrast"), d = b("grayscale"), c = b("hueRotate"), f = b("invert"), v = b("gap"), w = b("gradientColorStops"), k = b("gradientColorStopPositions"), x = b("inset"), g = b("margin"), y = b("opacity"), C = b("padding"), G = b("saturate"), R = b("scale"), L = b("sepia"), X = b("skew"), Q = b("space"), Y = b("translate"), W = () => ["auto", "contain", "none"], K = () => ["auto", "hidden", "clip", "visible", "scroll"], _ = () => ["auto", u, t], m = () => [u, t], ee = () => ["", z, M], O = () => ["auto", E, u], te = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], U = () => ["solid", "dashed", "dotted", "double", "none"], re = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], q = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], $ = () => ["", "0", u], oe = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], A = () => [E, u];
    return {
      cacheSize: 500,
      separator: ":",
      theme: {
        colors: [j],
        spacing: [z, M],
        blur: ["none", "", S, u],
        brightness: A(),
        borderColor: [e],
        borderRadius: ["none", "", "full", S, u],
        borderSpacing: m(),
        borderWidth: ee(),
        contrast: A(),
        grayscale: $(),
        hueRotate: A(),
        invert: $(),
        gap: m(),
        gradientColorStops: [e],
        gradientColorStopPositions: [Ue, M],
        inset: _(),
        margin: _(),
        opacity: A(),
        padding: m(),
        saturate: A(),
        scale: A(),
        sepia: $(),
        skew: A(),
        space: m(),
        translate: m()
      },
      classGroups: {
        // Layout
        /**
         * Aspect Ratio
         * @see https://tailwindcss.com/docs/aspect-ratio
         */
        aspect: [{
          aspect: ["auto", "square", "video", u]
        }],
        /**
         * Container
         * @see https://tailwindcss.com/docs/container
         */
        container: ["container"],
        /**
         * Columns
         * @see https://tailwindcss.com/docs/columns
         */
        columns: [{
          columns: [S]
        }],
        /**
         * Break After
         * @see https://tailwindcss.com/docs/break-after
         */
        "break-after": [{
          "break-after": oe()
        }],
        /**
         * Break Before
         * @see https://tailwindcss.com/docs/break-before
         */
        "break-before": [{
          "break-before": oe()
        }],
        /**
         * Break Inside
         * @see https://tailwindcss.com/docs/break-inside
         */
        "break-inside": [{
          "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
        }],
        /**
         * Box Decoration Break
         * @see https://tailwindcss.com/docs/box-decoration-break
         */
        "box-decoration": [{
          "box-decoration": ["slice", "clone"]
        }],
        /**
         * Box Sizing
         * @see https://tailwindcss.com/docs/box-sizing
         */
        box: [{
          box: ["border", "content"]
        }],
        /**
         * Display
         * @see https://tailwindcss.com/docs/display
         */
        display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
        /**
         * Floats
         * @see https://tailwindcss.com/docs/float
         */
        float: [{
          float: ["right", "left", "none", "start", "end"]
        }],
        /**
         * Clear
         * @see https://tailwindcss.com/docs/clear
         */
        clear: [{
          clear: ["left", "right", "both", "none", "start", "end"]
        }],
        /**
         * Isolation
         * @see https://tailwindcss.com/docs/isolation
         */
        isolation: ["isolate", "isolation-auto"],
        /**
         * Object Fit
         * @see https://tailwindcss.com/docs/object-fit
         */
        "object-fit": [{
          object: ["contain", "cover", "fill", "none", "scale-down"]
        }],
        /**
         * Object Position
         * @see https://tailwindcss.com/docs/object-position
         */
        "object-position": [{
          object: [...te(), u]
        }],
        /**
         * Overflow
         * @see https://tailwindcss.com/docs/overflow
         */
        overflow: [{
          overflow: K()
        }],
        /**
         * Overflow X
         * @see https://tailwindcss.com/docs/overflow
         */
        "overflow-x": [{
          "overflow-x": K()
        }],
        /**
         * Overflow Y
         * @see https://tailwindcss.com/docs/overflow
         */
        "overflow-y": [{
          "overflow-y": K()
        }],
        /**
         * Overscroll Behavior
         * @see https://tailwindcss.com/docs/overscroll-behavior
         */
        overscroll: [{
          overscroll: W()
        }],
        /**
         * Overscroll Behavior X
         * @see https://tailwindcss.com/docs/overscroll-behavior
         */
        "overscroll-x": [{
          "overscroll-x": W()
        }],
        /**
         * Overscroll Behavior Y
         * @see https://tailwindcss.com/docs/overscroll-behavior
         */
        "overscroll-y": [{
          "overscroll-y": W()
        }],
        /**
         * Position
         * @see https://tailwindcss.com/docs/position
         */
        position: ["static", "fixed", "absolute", "relative", "sticky"],
        /**
         * Top / Right / Bottom / Left
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        inset: [{
          inset: [x]
        }],
        /**
         * Right / Left
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        "inset-x": [{
          "inset-x": [x]
        }],
        /**
         * Top / Bottom
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        "inset-y": [{
          "inset-y": [x]
        }],
        /**
         * Start
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        start: [{
          start: [x]
        }],
        /**
         * End
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        end: [{
          end: [x]
        }],
        /**
         * Top
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        top: [{
          top: [x]
        }],
        /**
         * Right
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        right: [{
          right: [x]
        }],
        /**
         * Bottom
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        bottom: [{
          bottom: [x]
        }],
        /**
         * Left
         * @see https://tailwindcss.com/docs/top-right-bottom-left
         */
        left: [{
          left: [x]
        }],
        /**
         * Visibility
         * @see https://tailwindcss.com/docs/visibility
         */
        visibility: ["visible", "invisible", "collapse"],
        /**
         * Z-Index
         * @see https://tailwindcss.com/docs/z-index
         */
        z: [{
          z: ["auto", P, u]
        }],
        // Flexbox and Grid
        /**
         * Flex Basis
         * @see https://tailwindcss.com/docs/flex-basis
         */
        basis: [{
          basis: _()
        }],
        /**
         * Flex Direction
         * @see https://tailwindcss.com/docs/flex-direction
         */
        "flex-direction": [{
          flex: ["row", "row-reverse", "col", "col-reverse"]
        }],
        /**
         * Flex Wrap
         * @see https://tailwindcss.com/docs/flex-wrap
         */
        "flex-wrap": [{
          flex: ["wrap", "wrap-reverse", "nowrap"]
        }],
        /**
         * Flex
         * @see https://tailwindcss.com/docs/flex
         */
        flex: [{
          flex: ["1", "auto", "initial", "none", u]
        }],
        /**
         * Flex Grow
         * @see https://tailwindcss.com/docs/flex-grow
         */
        grow: [{
          grow: $()
        }],
        /**
         * Flex Shrink
         * @see https://tailwindcss.com/docs/flex-shrink
         */
        shrink: [{
          shrink: $()
        }],
        /**
         * Order
         * @see https://tailwindcss.com/docs/order
         */
        order: [{
          order: ["first", "last", "none", P, u]
        }],
        /**
         * Grid Template Columns
         * @see https://tailwindcss.com/docs/grid-template-columns
         */
        "grid-cols": [{
          "grid-cols": [j]
        }],
        /**
         * Grid Column Start / End
         * @see https://tailwindcss.com/docs/grid-column
         */
        "col-start-end": [{
          col: ["auto", {
            span: ["full", P, u]
          }, u]
        }],
        /**
         * Grid Column Start
         * @see https://tailwindcss.com/docs/grid-column
         */
        "col-start": [{
          "col-start": O()
        }],
        /**
         * Grid Column End
         * @see https://tailwindcss.com/docs/grid-column
         */
        "col-end": [{
          "col-end": O()
        }],
        /**
         * Grid Template Rows
         * @see https://tailwindcss.com/docs/grid-template-rows
         */
        "grid-rows": [{
          "grid-rows": [j]
        }],
        /**
         * Grid Row Start / End
         * @see https://tailwindcss.com/docs/grid-row
         */
        "row-start-end": [{
          row: ["auto", {
            span: [P, u]
          }, u]
        }],
        /**
         * Grid Row Start
         * @see https://tailwindcss.com/docs/grid-row
         */
        "row-start": [{
          "row-start": O()
        }],
        /**
         * Grid Row End
         * @see https://tailwindcss.com/docs/grid-row
         */
        "row-end": [{
          "row-end": O()
        }],
        /**
         * Grid Auto Flow
         * @see https://tailwindcss.com/docs/grid-auto-flow
         */
        "grid-flow": [{
          "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
        }],
        /**
         * Grid Auto Columns
         * @see https://tailwindcss.com/docs/grid-auto-columns
         */
        "auto-cols": [{
          "auto-cols": ["auto", "min", "max", "fr", u]
        }],
        /**
         * Grid Auto Rows
         * @see https://tailwindcss.com/docs/grid-auto-rows
         */
        "auto-rows": [{
          "auto-rows": ["auto", "min", "max", "fr", u]
        }],
        /**
         * Gap
         * @see https://tailwindcss.com/docs/gap
         */
        gap: [{
          gap: [v]
        }],
        /**
         * Gap X
         * @see https://tailwindcss.com/docs/gap
         */
        "gap-x": [{
          "gap-x": [v]
        }],
        /**
         * Gap Y
         * @see https://tailwindcss.com/docs/gap
         */
        "gap-y": [{
          "gap-y": [v]
        }],
        /**
         * Justify Content
         * @see https://tailwindcss.com/docs/justify-content
         */
        "justify-content": [{
          justify: ["normal", ...q()]
        }],
        /**
         * Justify Items
         * @see https://tailwindcss.com/docs/justify-items
         */
        "justify-items": [{
          "justify-items": ["start", "end", "center", "stretch"]
        }],
        /**
         * Justify Self
         * @see https://tailwindcss.com/docs/justify-self
         */
        "justify-self": [{
          "justify-self": ["auto", "start", "end", "center", "stretch"]
        }],
        /**
         * Align Content
         * @see https://tailwindcss.com/docs/align-content
         */
        "align-content": [{
          content: ["normal", ...q(), "baseline"]
        }],
        /**
         * Align Items
         * @see https://tailwindcss.com/docs/align-items
         */
        "align-items": [{
          items: ["start", "end", "center", "baseline", "stretch"]
        }],
        /**
         * Align Self
         * @see https://tailwindcss.com/docs/align-self
         */
        "align-self": [{
          self: ["auto", "start", "end", "center", "stretch", "baseline"]
        }],
        /**
         * Place Content
         * @see https://tailwindcss.com/docs/place-content
         */
        "place-content": [{
          "place-content": [...q(), "baseline"]
        }],
        /**
         * Place Items
         * @see https://tailwindcss.com/docs/place-items
         */
        "place-items": [{
          "place-items": ["start", "end", "center", "baseline", "stretch"]
        }],
        /**
         * Place Self
         * @see https://tailwindcss.com/docs/place-self
         */
        "place-self": [{
          "place-self": ["auto", "start", "end", "center", "stretch"]
        }],
        // Spacing
        /**
         * Padding
         * @see https://tailwindcss.com/docs/padding
         */
        p: [{
          p: [C]
        }],
        /**
         * Padding X
         * @see https://tailwindcss.com/docs/padding
         */
        px: [{
          px: [C]
        }],
        /**
         * Padding Y
         * @see https://tailwindcss.com/docs/padding
         */
        py: [{
          py: [C]
        }],
        /**
         * Padding Start
         * @see https://tailwindcss.com/docs/padding
         */
        ps: [{
          ps: [C]
        }],
        /**
         * Padding End
         * @see https://tailwindcss.com/docs/padding
         */
        pe: [{
          pe: [C]
        }],
        /**
         * Padding Top
         * @see https://tailwindcss.com/docs/padding
         */
        pt: [{
          pt: [C]
        }],
        /**
         * Padding Right
         * @see https://tailwindcss.com/docs/padding
         */
        pr: [{
          pr: [C]
        }],
        /**
         * Padding Bottom
         * @see https://tailwindcss.com/docs/padding
         */
        pb: [{
          pb: [C]
        }],
        /**
         * Padding Left
         * @see https://tailwindcss.com/docs/padding
         */
        pl: [{
          pl: [C]
        }],
        /**
         * Margin
         * @see https://tailwindcss.com/docs/margin
         */
        m: [{
          m: [g]
        }],
        /**
         * Margin X
         * @see https://tailwindcss.com/docs/margin
         */
        mx: [{
          mx: [g]
        }],
        /**
         * Margin Y
         * @see https://tailwindcss.com/docs/margin
         */
        my: [{
          my: [g]
        }],
        /**
         * Margin Start
         * @see https://tailwindcss.com/docs/margin
         */
        ms: [{
          ms: [g]
        }],
        /**
         * Margin End
         * @see https://tailwindcss.com/docs/margin
         */
        me: [{
          me: [g]
        }],
        /**
         * Margin Top
         * @see https://tailwindcss.com/docs/margin
         */
        mt: [{
          mt: [g]
        }],
        /**
         * Margin Right
         * @see https://tailwindcss.com/docs/margin
         */
        mr: [{
          mr: [g]
        }],
        /**
         * Margin Bottom
         * @see https://tailwindcss.com/docs/margin
         */
        mb: [{
          mb: [g]
        }],
        /**
         * Margin Left
         * @see https://tailwindcss.com/docs/margin
         */
        ml: [{
          ml: [g]
        }],
        /**
         * Space Between X
         * @see https://tailwindcss.com/docs/space
         */
        "space-x": [{
          "space-x": [Q]
        }],
        /**
         * Space Between X Reverse
         * @see https://tailwindcss.com/docs/space
         */
        "space-x-reverse": ["space-x-reverse"],
        /**
         * Space Between Y
         * @see https://tailwindcss.com/docs/space
         */
        "space-y": [{
          "space-y": [Q]
        }],
        /**
         * Space Between Y Reverse
         * @see https://tailwindcss.com/docs/space
         */
        "space-y-reverse": ["space-y-reverse"],
        // Sizing
        /**
         * Width
         * @see https://tailwindcss.com/docs/width
         */
        w: [{
          w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", u, t]
        }],
        /**
         * Min-Width
         * @see https://tailwindcss.com/docs/min-width
         */
        "min-w": [{
          "min-w": [u, t, "min", "max", "fit"]
        }],
        /**
         * Max-Width
         * @see https://tailwindcss.com/docs/max-width
         */
        "max-w": [{
          "max-w": [u, t, "none", "full", "min", "max", "fit", "prose", {
            screen: [S]
          }, S]
        }],
        /**
         * Height
         * @see https://tailwindcss.com/docs/height
         */
        h: [{
          h: [u, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
        }],
        /**
         * Min-Height
         * @see https://tailwindcss.com/docs/min-height
         */
        "min-h": [{
          "min-h": [u, t, "min", "max", "fit", "svh", "lvh", "dvh"]
        }],
        /**
         * Max-Height
         * @see https://tailwindcss.com/docs/max-height
         */
        "max-h": [{
          "max-h": [u, t, "min", "max", "fit", "svh", "lvh", "dvh"]
        }],
        /**
         * Size
         * @see https://tailwindcss.com/docs/size
         */
        size: [{
          size: [u, t, "auto", "min", "max", "fit"]
        }],
        // Typography
        /**
         * Font Size
         * @see https://tailwindcss.com/docs/font-size
         */
        "font-size": [{
          text: ["base", S, M]
        }],
        /**
         * Font Smoothing
         * @see https://tailwindcss.com/docs/font-smoothing
         */
        "font-smoothing": ["antialiased", "subpixel-antialiased"],
        /**
         * Font Style
         * @see https://tailwindcss.com/docs/font-style
         */
        "font-style": ["italic", "not-italic"],
        /**
         * Font Weight
         * @see https://tailwindcss.com/docs/font-weight
         */
        "font-weight": [{
          font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", V]
        }],
        /**
         * Font Family
         * @see https://tailwindcss.com/docs/font-family
         */
        "font-family": [{
          font: [j]
        }],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-normal": ["normal-nums"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-ordinal": ["ordinal"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-slashed-zero": ["slashed-zero"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-figure": ["lining-nums", "oldstyle-nums"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-spacing": ["proportional-nums", "tabular-nums"],
        /**
         * Font Variant Numeric
         * @see https://tailwindcss.com/docs/font-variant-numeric
         */
        "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
        /**
         * Letter Spacing
         * @see https://tailwindcss.com/docs/letter-spacing
         */
        tracking: [{
          tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", u]
        }],
        /**
         * Line Clamp
         * @see https://tailwindcss.com/docs/line-clamp
         */
        "line-clamp": [{
          "line-clamp": ["none", E, V]
        }],
        /**
         * Line Height
         * @see https://tailwindcss.com/docs/line-height
         */
        leading: [{
          leading: ["none", "tight", "snug", "normal", "relaxed", "loose", z, u]
        }],
        /**
         * List Style Image
         * @see https://tailwindcss.com/docs/list-style-image
         */
        "list-image": [{
          "list-image": ["none", u]
        }],
        /**
         * List Style Type
         * @see https://tailwindcss.com/docs/list-style-type
         */
        "list-style-type": [{
          list: ["none", "disc", "decimal", u]
        }],
        /**
         * List Style Position
         * @see https://tailwindcss.com/docs/list-style-position
         */
        "list-style-position": [{
          list: ["inside", "outside"]
        }],
        /**
         * Placeholder Color
         * @deprecated since Tailwind CSS v3.0.0
         * @see https://tailwindcss.com/docs/placeholder-color
         */
        "placeholder-color": [{
          placeholder: [e]
        }],
        /**
         * Placeholder Opacity
         * @see https://tailwindcss.com/docs/placeholder-opacity
         */
        "placeholder-opacity": [{
          "placeholder-opacity": [y]
        }],
        /**
         * Text Alignment
         * @see https://tailwindcss.com/docs/text-align
         */
        "text-alignment": [{
          text: ["left", "center", "right", "justify", "start", "end"]
        }],
        /**
         * Text Color
         * @see https://tailwindcss.com/docs/text-color
         */
        "text-color": [{
          text: [e]
        }],
        /**
         * Text Opacity
         * @see https://tailwindcss.com/docs/text-opacity
         */
        "text-opacity": [{
          "text-opacity": [y]
        }],
        /**
         * Text Decoration
         * @see https://tailwindcss.com/docs/text-decoration
         */
        "text-decoration": ["underline", "overline", "line-through", "no-underline"],
        /**
         * Text Decoration Style
         * @see https://tailwindcss.com/docs/text-decoration-style
         */
        "text-decoration-style": [{
          decoration: [...U(), "wavy"]
        }],
        /**
         * Text Decoration Thickness
         * @see https://tailwindcss.com/docs/text-decoration-thickness
         */
        "text-decoration-thickness": [{
          decoration: ["auto", "from-font", z, M]
        }],
        /**
         * Text Underline Offset
         * @see https://tailwindcss.com/docs/text-underline-offset
         */
        "underline-offset": [{
          "underline-offset": ["auto", z, u]
        }],
        /**
         * Text Decoration Color
         * @see https://tailwindcss.com/docs/text-decoration-color
         */
        "text-decoration-color": [{
          decoration: [e]
        }],
        /**
         * Text Transform
         * @see https://tailwindcss.com/docs/text-transform
         */
        "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
        /**
         * Text Overflow
         * @see https://tailwindcss.com/docs/text-overflow
         */
        "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
        /**
         * Text Wrap
         * @see https://tailwindcss.com/docs/text-wrap
         */
        "text-wrap": [{
          text: ["wrap", "nowrap", "balance", "pretty"]
        }],
        /**
         * Text Indent
         * @see https://tailwindcss.com/docs/text-indent
         */
        indent: [{
          indent: m()
        }],
        /**
         * Vertical Alignment
         * @see https://tailwindcss.com/docs/vertical-align
         */
        "vertical-align": [{
          align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", u]
        }],
        /**
         * Whitespace
         * @see https://tailwindcss.com/docs/whitespace
         */
        whitespace: [{
          whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
        }],
        /**
         * Word Break
         * @see https://tailwindcss.com/docs/word-break
         */
        break: [{
          break: ["normal", "words", "all", "keep"]
        }],
        /**
         * Hyphens
         * @see https://tailwindcss.com/docs/hyphens
         */
        hyphens: [{
          hyphens: ["none", "manual", "auto"]
        }],
        /**
         * Content
         * @see https://tailwindcss.com/docs/content
         */
        content: [{
          content: ["none", u]
        }],
        // Backgrounds
        /**
         * Background Attachment
         * @see https://tailwindcss.com/docs/background-attachment
         */
        "bg-attachment": [{
          bg: ["fixed", "local", "scroll"]
        }],
        /**
         * Background Clip
         * @see https://tailwindcss.com/docs/background-clip
         */
        "bg-clip": [{
          "bg-clip": ["border", "padding", "content", "text"]
        }],
        /**
         * Background Opacity
         * @deprecated since Tailwind CSS v3.0.0
         * @see https://tailwindcss.com/docs/background-opacity
         */
        "bg-opacity": [{
          "bg-opacity": [y]
        }],
        /**
         * Background Origin
         * @see https://tailwindcss.com/docs/background-origin
         */
        "bg-origin": [{
          "bg-origin": ["border", "padding", "content"]
        }],
        /**
         * Background Position
         * @see https://tailwindcss.com/docs/background-position
         */
        "bg-position": [{
          bg: [...te(), De]
        }],
        /**
         * Background Repeat
         * @see https://tailwindcss.com/docs/background-repeat
         */
        "bg-repeat": [{
          bg: ["no-repeat", {
            repeat: ["", "x", "y", "round", "space"]
          }]
        }],
        /**
         * Background Size
         * @see https://tailwindcss.com/docs/background-size
         */
        "bg-size": [{
          bg: ["auto", "cover", "contain", Be]
        }],
        /**
         * Background Image
         * @see https://tailwindcss.com/docs/background-image
         */
        "bg-image": [{
          bg: ["none", {
            "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Ke]
        }],
        /**
         * Background Color
         * @see https://tailwindcss.com/docs/background-color
         */
        "bg-color": [{
          bg: [e]
        }],
        /**
         * Gradient Color Stops From Position
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-from-pos": [{
          from: [k]
        }],
        /**
         * Gradient Color Stops Via Position
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-via-pos": [{
          via: [k]
        }],
        /**
         * Gradient Color Stops To Position
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-to-pos": [{
          to: [k]
        }],
        /**
         * Gradient Color Stops From
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-from": [{
          from: [w]
        }],
        /**
         * Gradient Color Stops Via
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-via": [{
          via: [w]
        }],
        /**
         * Gradient Color Stops To
         * @see https://tailwindcss.com/docs/gradient-color-stops
         */
        "gradient-to": [{
          to: [w]
        }],
        // Borders
        /**
         * Border Radius
         * @see https://tailwindcss.com/docs/border-radius
         */
        rounded: [{
          rounded: [n]
        }],
        /**
         * Border Radius Start
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-s": [{
          "rounded-s": [n]
        }],
        /**
         * Border Radius End
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-e": [{
          "rounded-e": [n]
        }],
        /**
         * Border Radius Top
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-t": [{
          "rounded-t": [n]
        }],
        /**
         * Border Radius Right
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-r": [{
          "rounded-r": [n]
        }],
        /**
         * Border Radius Bottom
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-b": [{
          "rounded-b": [n]
        }],
        /**
         * Border Radius Left
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-l": [{
          "rounded-l": [n]
        }],
        /**
         * Border Radius Start Start
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-ss": [{
          "rounded-ss": [n]
        }],
        /**
         * Border Radius Start End
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-se": [{
          "rounded-se": [n]
        }],
        /**
         * Border Radius End End
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-ee": [{
          "rounded-ee": [n]
        }],
        /**
         * Border Radius End Start
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-es": [{
          "rounded-es": [n]
        }],
        /**
         * Border Radius Top Left
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-tl": [{
          "rounded-tl": [n]
        }],
        /**
         * Border Radius Top Right
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-tr": [{
          "rounded-tr": [n]
        }],
        /**
         * Border Radius Bottom Right
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-br": [{
          "rounded-br": [n]
        }],
        /**
         * Border Radius Bottom Left
         * @see https://tailwindcss.com/docs/border-radius
         */
        "rounded-bl": [{
          "rounded-bl": [n]
        }],
        /**
         * Border Width
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w": [{
          border: [s]
        }],
        /**
         * Border Width X
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-x": [{
          "border-x": [s]
        }],
        /**
         * Border Width Y
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-y": [{
          "border-y": [s]
        }],
        /**
         * Border Width Start
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-s": [{
          "border-s": [s]
        }],
        /**
         * Border Width End
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-e": [{
          "border-e": [s]
        }],
        /**
         * Border Width Top
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-t": [{
          "border-t": [s]
        }],
        /**
         * Border Width Right
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-r": [{
          "border-r": [s]
        }],
        /**
         * Border Width Bottom
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-b": [{
          "border-b": [s]
        }],
        /**
         * Border Width Left
         * @see https://tailwindcss.com/docs/border-width
         */
        "border-w-l": [{
          "border-l": [s]
        }],
        /**
         * Border Opacity
         * @see https://tailwindcss.com/docs/border-opacity
         */
        "border-opacity": [{
          "border-opacity": [y]
        }],
        /**
         * Border Style
         * @see https://tailwindcss.com/docs/border-style
         */
        "border-style": [{
          border: [...U(), "hidden"]
        }],
        /**
         * Divide Width X
         * @see https://tailwindcss.com/docs/divide-width
         */
        "divide-x": [{
          "divide-x": [s]
        }],
        /**
         * Divide Width X Reverse
         * @see https://tailwindcss.com/docs/divide-width
         */
        "divide-x-reverse": ["divide-x-reverse"],
        /**
         * Divide Width Y
         * @see https://tailwindcss.com/docs/divide-width
         */
        "divide-y": [{
          "divide-y": [s]
        }],
        /**
         * Divide Width Y Reverse
         * @see https://tailwindcss.com/docs/divide-width
         */
        "divide-y-reverse": ["divide-y-reverse"],
        /**
         * Divide Opacity
         * @see https://tailwindcss.com/docs/divide-opacity
         */
        "divide-opacity": [{
          "divide-opacity": [y]
        }],
        /**
         * Divide Style
         * @see https://tailwindcss.com/docs/divide-style
         */
        "divide-style": [{
          divide: U()
        }],
        /**
         * Border Color
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color": [{
          border: [a]
        }],
        /**
         * Border Color X
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-x": [{
          "border-x": [a]
        }],
        /**
         * Border Color Y
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-y": [{
          "border-y": [a]
        }],
        /**
         * Border Color S
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-s": [{
          "border-s": [a]
        }],
        /**
         * Border Color E
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-e": [{
          "border-e": [a]
        }],
        /**
         * Border Color Top
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-t": [{
          "border-t": [a]
        }],
        /**
         * Border Color Right
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-r": [{
          "border-r": [a]
        }],
        /**
         * Border Color Bottom
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-b": [{
          "border-b": [a]
        }],
        /**
         * Border Color Left
         * @see https://tailwindcss.com/docs/border-color
         */
        "border-color-l": [{
          "border-l": [a]
        }],
        /**
         * Divide Color
         * @see https://tailwindcss.com/docs/divide-color
         */
        "divide-color": [{
          divide: [a]
        }],
        /**
         * Outline Style
         * @see https://tailwindcss.com/docs/outline-style
         */
        "outline-style": [{
          outline: ["", ...U()]
        }],
        /**
         * Outline Offset
         * @see https://tailwindcss.com/docs/outline-offset
         */
        "outline-offset": [{
          "outline-offset": [z, u]
        }],
        /**
         * Outline Width
         * @see https://tailwindcss.com/docs/outline-width
         */
        "outline-w": [{
          outline: [z, M]
        }],
        /**
         * Outline Color
         * @see https://tailwindcss.com/docs/outline-color
         */
        "outline-color": [{
          outline: [e]
        }],
        /**
         * Ring Width
         * @see https://tailwindcss.com/docs/ring-width
         */
        "ring-w": [{
          ring: ee()
        }],
        /**
         * Ring Width Inset
         * @see https://tailwindcss.com/docs/ring-width
         */
        "ring-w-inset": ["ring-inset"],
        /**
         * Ring Color
         * @see https://tailwindcss.com/docs/ring-color
         */
        "ring-color": [{
          ring: [e]
        }],
        /**
         * Ring Opacity
         * @see https://tailwindcss.com/docs/ring-opacity
         */
        "ring-opacity": [{
          "ring-opacity": [y]
        }],
        /**
         * Ring Offset Width
         * @see https://tailwindcss.com/docs/ring-offset-width
         */
        "ring-offset-w": [{
          "ring-offset": [z, M]
        }],
        /**
         * Ring Offset Color
         * @see https://tailwindcss.com/docs/ring-offset-color
         */
        "ring-offset-color": [{
          "ring-offset": [e]
        }],
        // Effects
        /**
         * Box Shadow
         * @see https://tailwindcss.com/docs/box-shadow
         */
        shadow: [{
          shadow: ["", "inner", "none", S, _e]
        }],
        /**
         * Box Shadow Color
         * @see https://tailwindcss.com/docs/box-shadow-color
         */
        "shadow-color": [{
          shadow: [j]
        }],
        /**
         * Opacity
         * @see https://tailwindcss.com/docs/opacity
         */
        opacity: [{
          opacity: [y]
        }],
        /**
         * Mix Blend Mode
         * @see https://tailwindcss.com/docs/mix-blend-mode
         */
        "mix-blend": [{
          "mix-blend": [...re(), "plus-lighter", "plus-darker"]
        }],
        /**
         * Background Blend Mode
         * @see https://tailwindcss.com/docs/background-blend-mode
         */
        "bg-blend": [{
          "bg-blend": re()
        }],
        // Filters
        /**
         * Filter
         * @deprecated since Tailwind CSS v3.0.0
         * @see https://tailwindcss.com/docs/filter
         */
        filter: [{
          filter: ["", "none"]
        }],
        /**
         * Blur
         * @see https://tailwindcss.com/docs/blur
         */
        blur: [{
          blur: [r]
        }],
        /**
         * Brightness
         * @see https://tailwindcss.com/docs/brightness
         */
        brightness: [{
          brightness: [o]
        }],
        /**
         * Contrast
         * @see https://tailwindcss.com/docs/contrast
         */
        contrast: [{
          contrast: [l]
        }],
        /**
         * Drop Shadow
         * @see https://tailwindcss.com/docs/drop-shadow
         */
        "drop-shadow": [{
          "drop-shadow": ["", "none", S, u]
        }],
        /**
         * Grayscale
         * @see https://tailwindcss.com/docs/grayscale
         */
        grayscale: [{
          grayscale: [d]
        }],
        /**
         * Hue Rotate
         * @see https://tailwindcss.com/docs/hue-rotate
         */
        "hue-rotate": [{
          "hue-rotate": [c]
        }],
        /**
         * Invert
         * @see https://tailwindcss.com/docs/invert
         */
        invert: [{
          invert: [f]
        }],
        /**
         * Saturate
         * @see https://tailwindcss.com/docs/saturate
         */
        saturate: [{
          saturate: [G]
        }],
        /**
         * Sepia
         * @see https://tailwindcss.com/docs/sepia
         */
        sepia: [{
          sepia: [L]
        }],
        /**
         * Backdrop Filter
         * @deprecated since Tailwind CSS v3.0.0
         * @see https://tailwindcss.com/docs/backdrop-filter
         */
        "backdrop-filter": [{
          "backdrop-filter": ["", "none"]
        }],
        /**
         * Backdrop Blur
         * @see https://tailwindcss.com/docs/backdrop-blur
         */
        "backdrop-blur": [{
          "backdrop-blur": [r]
        }],
        /**
         * Backdrop Brightness
         * @see https://tailwindcss.com/docs/backdrop-brightness
         */
        "backdrop-brightness": [{
          "backdrop-brightness": [o]
        }],
        /**
         * Backdrop Contrast
         * @see https://tailwindcss.com/docs/backdrop-contrast
         */
        "backdrop-contrast": [{
          "backdrop-contrast": [l]
        }],
        /**
         * Backdrop Grayscale
         * @see https://tailwindcss.com/docs/backdrop-grayscale
         */
        "backdrop-grayscale": [{
          "backdrop-grayscale": [d]
        }],
        /**
         * Backdrop Hue Rotate
         * @see https://tailwindcss.com/docs/backdrop-hue-rotate
         */
        "backdrop-hue-rotate": [{
          "backdrop-hue-rotate": [c]
        }],
        /**
         * Backdrop Invert
         * @see https://tailwindcss.com/docs/backdrop-invert
         */
        "backdrop-invert": [{
          "backdrop-invert": [f]
        }],
        /**
         * Backdrop Opacity
         * @see https://tailwindcss.com/docs/backdrop-opacity
         */
        "backdrop-opacity": [{
          "backdrop-opacity": [y]
        }],
        /**
         * Backdrop Saturate
         * @see https://tailwindcss.com/docs/backdrop-saturate
         */
        "backdrop-saturate": [{
          "backdrop-saturate": [G]
        }],
        /**
         * Backdrop Sepia
         * @see https://tailwindcss.com/docs/backdrop-sepia
         */
        "backdrop-sepia": [{
          "backdrop-sepia": [L]
        }],
        // Tables
        /**
         * Border Collapse
         * @see https://tailwindcss.com/docs/border-collapse
         */
        "border-collapse": [{
          border: ["collapse", "separate"]
        }],
        /**
         * Border Spacing
         * @see https://tailwindcss.com/docs/border-spacing
         */
        "border-spacing": [{
          "border-spacing": [i]
        }],
        /**
         * Border Spacing X
         * @see https://tailwindcss.com/docs/border-spacing
         */
        "border-spacing-x": [{
          "border-spacing-x": [i]
        }],
        /**
         * Border Spacing Y
         * @see https://tailwindcss.com/docs/border-spacing
         */
        "border-spacing-y": [{
          "border-spacing-y": [i]
        }],
        /**
         * Table Layout
         * @see https://tailwindcss.com/docs/table-layout
         */
        "table-layout": [{
          table: ["auto", "fixed"]
        }],
        /**
         * Caption Side
         * @see https://tailwindcss.com/docs/caption-side
         */
        caption: [{
          caption: ["top", "bottom"]
        }],
        // Transitions and Animation
        /**
         * Tranisition Property
         * @see https://tailwindcss.com/docs/transition-property
         */
        transition: [{
          transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", u]
        }],
        /**
         * Transition Duration
         * @see https://tailwindcss.com/docs/transition-duration
         */
        duration: [{
          duration: A()
        }],
        /**
         * Transition Timing Function
         * @see https://tailwindcss.com/docs/transition-timing-function
         */
        ease: [{
          ease: ["linear", "in", "out", "in-out", u]
        }],
        /**
         * Transition Delay
         * @see https://tailwindcss.com/docs/transition-delay
         */
        delay: [{
          delay: A()
        }],
        /**
         * Animation
         * @see https://tailwindcss.com/docs/animation
         */
        animate: [{
          animate: ["none", "spin", "ping", "pulse", "bounce", u]
        }],
        // Transforms
        /**
         * Transform
         * @see https://tailwindcss.com/docs/transform
         */
        transform: [{
          transform: ["", "gpu", "none"]
        }],
        /**
         * Scale
         * @see https://tailwindcss.com/docs/scale
         */
        scale: [{
          scale: [R]
        }],
        /**
         * Scale X
         * @see https://tailwindcss.com/docs/scale
         */
        "scale-x": [{
          "scale-x": [R]
        }],
        /**
         * Scale Y
         * @see https://tailwindcss.com/docs/scale
         */
        "scale-y": [{
          "scale-y": [R]
        }],
        /**
         * Rotate
         * @see https://tailwindcss.com/docs/rotate
         */
        rotate: [{
          rotate: [P, u]
        }],
        /**
         * Translate X
         * @see https://tailwindcss.com/docs/translate
         */
        "translate-x": [{
          "translate-x": [Y]
        }],
        /**
         * Translate Y
         * @see https://tailwindcss.com/docs/translate
         */
        "translate-y": [{
          "translate-y": [Y]
        }],
        /**
         * Skew X
         * @see https://tailwindcss.com/docs/skew
         */
        "skew-x": [{
          "skew-x": [X]
        }],
        /**
         * Skew Y
         * @see https://tailwindcss.com/docs/skew
         */
        "skew-y": [{
          "skew-y": [X]
        }],
        /**
         * Transform Origin
         * @see https://tailwindcss.com/docs/transform-origin
         */
        "transform-origin": [{
          origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", u]
        }],
        // Interactivity
        /**
         * Accent Color
         * @see https://tailwindcss.com/docs/accent-color
         */
        accent: [{
          accent: ["auto", e]
        }],
        /**
         * Appearance
         * @see https://tailwindcss.com/docs/appearance
         */
        appearance: [{
          appearance: ["none", "auto"]
        }],
        /**
         * Cursor
         * @see https://tailwindcss.com/docs/cursor
         */
        cursor: [{
          cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", u]
        }],
        /**
         * Caret Color
         * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
         */
        "caret-color": [{
          caret: [e]
        }],
        /**
         * Pointer Events
         * @see https://tailwindcss.com/docs/pointer-events
         */
        "pointer-events": [{
          "pointer-events": ["none", "auto"]
        }],
        /**
         * Resize
         * @see https://tailwindcss.com/docs/resize
         */
        resize: [{
          resize: ["none", "y", "x", ""]
        }],
        /**
         * Scroll Behavior
         * @see https://tailwindcss.com/docs/scroll-behavior
         */
        "scroll-behavior": [{
          scroll: ["auto", "smooth"]
        }],
        /**
         * Scroll Margin
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-m": [{
          "scroll-m": m()
        }],
        /**
         * Scroll Margin X
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-mx": [{
          "scroll-mx": m()
        }],
        /**
         * Scroll Margin Y
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-my": [{
          "scroll-my": m()
        }],
        /**
         * Scroll Margin Start
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-ms": [{
          "scroll-ms": m()
        }],
        /**
         * Scroll Margin End
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-me": [{
          "scroll-me": m()
        }],
        /**
         * Scroll Margin Top
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-mt": [{
          "scroll-mt": m()
        }],
        /**
         * Scroll Margin Right
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-mr": [{
          "scroll-mr": m()
        }],
        /**
         * Scroll Margin Bottom
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-mb": [{
          "scroll-mb": m()
        }],
        /**
         * Scroll Margin Left
         * @see https://tailwindcss.com/docs/scroll-margin
         */
        "scroll-ml": [{
          "scroll-ml": m()
        }],
        /**
         * Scroll Padding
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-p": [{
          "scroll-p": m()
        }],
        /**
         * Scroll Padding X
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-px": [{
          "scroll-px": m()
        }],
        /**
         * Scroll Padding Y
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-py": [{
          "scroll-py": m()
        }],
        /**
         * Scroll Padding Start
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-ps": [{
          "scroll-ps": m()
        }],
        /**
         * Scroll Padding End
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pe": [{
          "scroll-pe": m()
        }],
        /**
         * Scroll Padding Top
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pt": [{
          "scroll-pt": m()
        }],
        /**
         * Scroll Padding Right
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pr": [{
          "scroll-pr": m()
        }],
        /**
         * Scroll Padding Bottom
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pb": [{
          "scroll-pb": m()
        }],
        /**
         * Scroll Padding Left
         * @see https://tailwindcss.com/docs/scroll-padding
         */
        "scroll-pl": [{
          "scroll-pl": m()
        }],
        /**
         * Scroll Snap Align
         * @see https://tailwindcss.com/docs/scroll-snap-align
         */
        "snap-align": [{
          snap: ["start", "end", "center", "align-none"]
        }],
        /**
         * Scroll Snap Stop
         * @see https://tailwindcss.com/docs/scroll-snap-stop
         */
        "snap-stop": [{
          snap: ["normal", "always"]
        }],
        /**
         * Scroll Snap Type
         * @see https://tailwindcss.com/docs/scroll-snap-type
         */
        "snap-type": [{
          snap: ["none", "x", "y", "both"]
        }],
        /**
         * Scroll Snap Type Strictness
         * @see https://tailwindcss.com/docs/scroll-snap-type
         */
        "snap-strictness": [{
          snap: ["mandatory", "proximity"]
        }],
        /**
         * Touch Action
         * @see https://tailwindcss.com/docs/touch-action
         */
        touch: [{
          touch: ["auto", "none", "manipulation"]
        }],
        /**
         * Touch Action X
         * @see https://tailwindcss.com/docs/touch-action
         */
        "touch-x": [{
          "touch-pan": ["x", "left", "right"]
        }],
        /**
         * Touch Action Y
         * @see https://tailwindcss.com/docs/touch-action
         */
        "touch-y": [{
          "touch-pan": ["y", "up", "down"]
        }],
        /**
         * Touch Action Pinch Zoom
         * @see https://tailwindcss.com/docs/touch-action
         */
        "touch-pz": ["touch-pinch-zoom"],
        /**
         * User Select
         * @see https://tailwindcss.com/docs/user-select
         */
        select: [{
          select: ["none", "text", "all", "auto"]
        }],
        /**
         * Will Change
         * @see https://tailwindcss.com/docs/will-change
         */
        "will-change": [{
          "will-change": ["auto", "scroll", "contents", "transform", u]
        }],
        // SVG
        /**
         * Fill
         * @see https://tailwindcss.com/docs/fill
         */
        fill: [{
          fill: [e, "none"]
        }],
        /**
         * Stroke Width
         * @see https://tailwindcss.com/docs/stroke-width
         */
        "stroke-w": [{
          stroke: [z, M, V]
        }],
        /**
         * Stroke
         * @see https://tailwindcss.com/docs/stroke
         */
        stroke: [{
          stroke: [e, "none"]
        }],
        // Accessibility
        /**
         * Screen Readers
         * @see https://tailwindcss.com/docs/screen-readers
         */
        sr: ["sr-only", "not-sr-only"],
        /**
         * Forced Color Adjust
         * @see https://tailwindcss.com/docs/forced-color-adjust
         */
        "forced-color-adjust": [{
          "forced-color-adjust": ["auto", "none"]
        }]
      },
      conflictingClassGroups: {
        overflow: ["overflow-x", "overflow-y"],
        overscroll: ["overscroll-x", "overscroll-y"],
        inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
        "inset-x": ["right", "left"],
        "inset-y": ["top", "bottom"],
        flex: ["basis", "grow", "shrink"],
        gap: ["gap-x", "gap-y"],
        p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
        px: ["pr", "pl"],
        py: ["pt", "pb"],
        m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
        mx: ["mr", "ml"],
        my: ["mt", "mb"],
        size: ["w", "h"],
        "font-size": ["leading"],
        "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
        "fvn-ordinal": ["fvn-normal"],
        "fvn-slashed-zero": ["fvn-normal"],
        "fvn-figure": ["fvn-normal"],
        "fvn-spacing": ["fvn-normal"],
        "fvn-fraction": ["fvn-normal"],
        "line-clamp": ["display", "overflow"],
        rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
        "rounded-s": ["rounded-ss", "rounded-es"],
        "rounded-e": ["rounded-se", "rounded-ee"],
        "rounded-t": ["rounded-tl", "rounded-tr"],
        "rounded-r": ["rounded-tr", "rounded-br"],
        "rounded-b": ["rounded-br", "rounded-bl"],
        "rounded-l": ["rounded-tl", "rounded-bl"],
        "border-spacing": ["border-spacing-x", "border-spacing-y"],
        "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
        "border-w-x": ["border-w-r", "border-w-l"],
        "border-w-y": ["border-w-t", "border-w-b"],
        "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
        "border-color-x": ["border-color-r", "border-color-l"],
        "border-color-y": ["border-color-t", "border-color-b"],
        "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
        "scroll-mx": ["scroll-mr", "scroll-ml"],
        "scroll-my": ["scroll-mt", "scroll-mb"],
        "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
        "scroll-px": ["scroll-pr", "scroll-pl"],
        "scroll-py": ["scroll-pt", "scroll-pb"],
        touch: ["touch-x", "touch-y", "touch-pz"],
        "touch-x": ["touch"],
        "touch-y": ["touch"],
        "touch-pz": ["touch"]
      },
      conflictingClassGroupModifiers: {
        "font-size": ["leading"]
      }
    };
  };
  var Je = /* @__PURE__ */ Ee(Ze);
  function h(...e) {
    return Je(xe(e));
  }
  var Xe = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded font-sans font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-base ease-bloom select-none disabled:pointer-events-none disabled:opacity-50 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";
  var Qe = {
    primary: "bg-accent text-accent-fg hover:bg-accent-hover active:bg-accent-press shadow-sm",
    secondary: "bg-surface-raised text-fg border border-strong hover:border-accent hover:text-fg-accent",
    ghost: "bg-transparent text-fg-secondary hover:bg-accent-subtle hover:text-fg",
    danger: "bg-danger text-fg-inverse hover:opacity-90 active:opacity-100 shadow-sm"
  };
  var Ye = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base"
  };
  var et = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  };
  var tt = (0, import_react.forwardRef)(
    ({
      variant: e = "primary",
      size: t = "md",
      iconOnly: r = false,
      leading: o,
      trailing: a,
      className: n,
      type: i = "button",
      children: s,
      ...l
    }, d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        ref: d,
        type: i,
        className: h(
          Xe,
          Qe[e],
          r ? et[t] : Ye[t],
          n
        ),
        ...l,
        children: [
          o,
          s,
          a
        ]
      }
    )
  );
  tt.displayName = "Button";
  var rt = (0, import_react.forwardRef)(
    ({ label: e, hint: t, invalid: r = false, leading: o, trailing: a, className: n, id: i, ...s }, l) => {
      const d = (0, import_react.useId)(), c = i ?? d, f = t ? `${c}-hint` : void 0;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-2", children: [
        e && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "label",
          {
            htmlFor: c,
            className: "font-sans text-sm font-medium text-fg-secondary",
            children: e
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            className: h(
              "group flex h-10 items-center gap-2 rounded border bg-surface px-3",
              "transition-[border-color,box-shadow] duration-base ease-bloom",
              "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-canvas",
              r ? "border-danger focus-within:border-danger" : "border-strong focus-within:border-accent"
            ),
            children: [
              o && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex shrink-0 items-center text-fg-muted", children: o }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  ref: l,
                  id: c,
                  "aria-invalid": r || void 0,
                  "aria-describedby": f,
                  className: h(
                    "min-w-0 flex-1 bg-transparent font-sans text-sm text-fg",
                    "placeholder:text-fg-muted focus:outline-none",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    n
                  ),
                  ...s
                }
              ),
              a && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex shrink-0 items-center text-fg-muted", children: a })
            ]
          }
        ),
        t && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "p",
          {
            id: f,
            className: h(
              "font-sans text-xs",
              r ? "text-danger" : "text-fg-muted"
            ),
            children: t
          }
        )
      ] });
    }
  );
  rt.displayName = "Input";
  var ot = {
    surface: "bg-surface border border-hairline",
    raised: "bg-surface-raised border border-hairline shadow-md",
    outline: "bg-transparent border border-strong"
  };
  var nt = (0, import_react.forwardRef)(
    ({ variant: e = "surface", glow: t = false, interactive: r = false, className: o, children: a, ...n }, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref: i,
        className: h(
          "relative overflow-hidden rounded-lg",
          ot[e],
          t && "bg-glow-sage",
          r && "cursor-pointer transition-[border-color,box-shadow,transform] duration-base ease-bloom hover:-translate-y-0.5 hover:border-accent hover:shadow-lg",
          o
        ),
        ...n,
        children: a
      }
    )
  );
  nt.displayName = "Card";
  var st = (0, import_react.forwardRef)(
    ({ className: e, ...t }, r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref: r,
        className: h("flex flex-col gap-1 p-5 pb-3", e),
        ...t
      }
    )
  );
  st.displayName = "CardHeader";
  var at = (0, import_react.forwardRef)(({ className: e, ...t }, r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "h3",
    {
      ref: r,
      className: h("font-serif text-lg font-normal text-fg", e),
      ...t
    }
  ));
  at.displayName = "CardTitle";
  var it = (0, import_react.forwardRef)(({ className: e, ...t }, r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "p",
    {
      ref: r,
      className: h("font-sans text-sm text-fg-secondary", e),
      ...t
    }
  ));
  it.displayName = "CardDescription";
  var lt = (0, import_react.forwardRef)(
    ({ className: e, ...t }, r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: r, className: h("p-5 pt-0", e), ...t })
  );
  lt.displayName = "CardContent";
  var ct = (0, import_react.forwardRef)(
    ({ className: e, ...t }, r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref: r,
        className: h(
          "flex items-center gap-3 border-t border-hairline p-5 py-3",
          e
        ),
        ...t
      }
    )
  );
  ct.displayName = "CardFooter";
  var dt = {
    neutral: { chip: "bg-surface-raised text-fg-secondary border border-hairline", dot: "bg-fg-muted" },
    accent: { chip: "bg-accent-subtle text-fg-accent border border-accent", dot: "bg-accent" },
    positive: { chip: "bg-positive-subtle text-positive", dot: "bg-positive" },
    warning: { chip: "bg-warning-subtle text-warning", dot: "bg-warning" },
    danger: { chip: "bg-danger-subtle text-danger", dot: "bg-danger" },
    info: { chip: "bg-info-subtle text-info", dot: "bg-info" }
  };
  var ut = {
    sm: "h-5 px-2 text-[0.6875rem] gap-1",
    md: "h-6 px-2.5 text-xs gap-1.5"
  };
  function yt({
    variant: e = "neutral",
    size: t = "md",
    dot: r = false,
    className: o,
    children: a,
    ...n
  }) {
    const i = dt[e];
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "span",
      {
        className: h(
          "inline-flex items-center rounded-full font-sans font-medium leading-none",
          i.chip,
          ut[t],
          o
        ),
        ...n,
        children: [
          r && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: h("h-1.5 w-1.5 rounded-full", i.dot) }),
          a
        ]
      }
    );
  }
  var pt = {
    xs: "h-6 w-6 text-[0.625rem]",
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-lg"
  };
  var ft = {
    online: "bg-positive",
    away: "bg-warning",
    offline: "bg-fg-muted"
  };
  var bt = {
    xs: "h-1.5 w-1.5",
    sm: "h-2 w-2",
    md: "h-2.5 w-2.5",
    lg: "h-3.5 w-3.5"
  };
  function gt(e) {
    const t = e.trim().split(/\s+/).filter(Boolean);
    return t.length === 0 ? "?" : t.length === 1 ? t[0].slice(0, 2).toUpperCase() : (t[0][0] + t[t.length - 1][0]).toUpperCase();
  }
  function vt({
    src: e,
    name: t,
    size: r = "md",
    status: o,
    square: a = false,
    className: n
  }) {
    const [i, s] = (0, import_react.useState)(false), l = e && !i;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: h("relative inline-flex shrink-0", n), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "span",
        {
          className: h(
            "inline-flex select-none items-center justify-center overflow-hidden",
            "bg-accent-subtle font-sans font-medium text-fg-accent",
            a ? "rounded-md" : "rounded-full",
            pt[r]
          ),
          title: t,
          children: l ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "img",
            {
              src: e,
              alt: t,
              onError: () => s(true),
              className: "h-full w-full object-cover"
            }
          ) : gt(t)
        }
      ),
      o && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "span",
        {
          className: h(
            "absolute bottom-0 right-0 rounded-full ring-2 ring-canvas",
            ft[o],
            bt[r]
          ),
          "aria-label": o
        }
      )
    ] });
  }
  var mt = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2"
  };
  function wt({
    content: e,
    placement: t = "top",
    delay: r = 150,
    defaultOpen: o = false,
    children: a
  }) {
    const [n, i] = (0, import_react.useState)(o), s = (0, import_react.useId)(), l = (0, import_react.useRef)(void 0), d = () => {
      window.clearTimeout(l.current), l.current = window.setTimeout(() => i(true), r);
    }, c = () => {
      window.clearTimeout(l.current), i(false);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "span",
      {
        className: "relative inline-flex",
        onMouseEnter: d,
        onMouseLeave: c,
        onFocusCapture: d,
        onBlurCapture: c,
        onKeyDown: (f) => f.key === "Escape" && c(),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-describedby": n ? s : void 0, className: "inline-flex", children: a }),
          n && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "span",
            {
              role: "tooltip",
              id: s,
              className: h(
                "pointer-events-none absolute z-50 w-max max-w-xs animate-fade-in",
                "rounded-md border border-strong bg-surface-raised px-2.5 py-1.5",
                "font-sans text-xs text-fg shadow-lg",
                mt[t]
              ),
              children: e
            }
          )
        ]
      }
    );
  }
  var be = (0, import_react.createContext)(null);
  function ge(e) {
    const t = (0, import_react.useContext)(be);
    if (!t) throw new Error(`<${e}> must be used inside <Tabs>`);
    return t;
  }
  function Ct({
    value: e,
    defaultValue: t,
    onValueChange: r,
    className: o,
    children: a,
    ...n
  }) {
    const [i, s] = (0, import_react.useState)(t), l = e ?? i, d = (0, import_react.useId)(), c = (f) => {
      e === void 0 && s(f), r == null || r(f);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(be.Provider, { value: { value: l, setValue: c, baseId: d }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: h("flex flex-col gap-4", o), ...n, children: a }) });
  }
  function kt({
    className: e,
    children: t,
    ...r
  }) {
    const o = (0, import_react.useRef)(null);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref: o,
        role: "tablist",
        onKeyDown: (n) => {
          var c, f, v;
          if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(n.key)) return;
          const s = Array.from(
            ((c = o.current) == null ? void 0 : c.querySelectorAll(
              '[role="tab"]:not([disabled])'
            )) ?? []
          ), l = s.findIndex((w) => w === document.activeElement);
          if (l === -1) return;
          n.preventDefault();
          let d = l;
          n.key === "ArrowRight" && (d = (l + 1) % s.length), n.key === "ArrowLeft" && (d = (l - 1 + s.length) % s.length), n.key === "Home" && (d = 0), n.key === "End" && (d = s.length - 1), (f = s[d]) == null || f.focus(), (v = s[d]) == null || v.click();
        },
        className: h(
          "inline-flex items-center gap-1 border-b border-hairline",
          e
        ),
        ...r,
        children: t
      }
    );
  }
  function Nt({ value: e, disabled: t, className: r, children: o, ...a }) {
    const { value: n, setValue: i, baseId: s } = ge("Tab"), l = n === e;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        role: "tab",
        type: "button",
        id: `${s}-tab-${e}`,
        "aria-selected": l,
        "aria-controls": `${s}-panel-${e}`,
        tabIndex: l ? 0 : -1,
        disabled: t,
        onClick: () => i(e),
        className: h(
          "relative -mb-px h-9 px-3 font-sans text-sm font-medium",
          "transition-colors duration-base ease-bloom",
          "border-b-2 disabled:cursor-not-allowed disabled:opacity-50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
          l ? "border-accent text-fg" : "border-transparent text-fg-muted hover:text-fg-secondary",
          r
        ),
        ...a,
        children: o
      }
    );
  }
  function At({
    value: e,
    className: t,
    children: r,
    ...o
  }) {
    const { value: a, baseId: n } = ge("TabPanel");
    return a !== e ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        role: "tabpanel",
        id: `${n}-panel-${e}`,
        "aria-labelledby": `${n}-tab-${e}`,
        tabIndex: 0,
        className: h("animate-fade-in focus-visible:outline-none", t),
        ...o,
        children: r
      }
    );
  }
  var me = (0, import_react.createContext)(null);
  function J(e) {
    const t = (0, import_react.useContext)(me);
    if (!t) throw new Error(`<${e}> must be used inside <Menu>`);
    return t;
  }
  function zt({ children: e, className: t, defaultOpen: r = false }) {
    const [o, a] = (0, import_react.useState)(r), n = (0, import_react.useRef)(null), i = (0, import_react.useRef)(null);
    return (0, import_react.useEffect)(() => {
      if (!o) return;
      const s = (l) => {
        var c, f;
        const d = l.target;
        !((c = i.current) != null && c.contains(d)) && !((f = n.current) != null && f.contains(d)) && a(false);
      };
      return document.addEventListener("pointerdown", s), () => document.removeEventListener("pointerdown", s);
    }, [o]), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(me.Provider, { value: { open: o, setOpen: a, triggerRef: n, menuRef: i }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: h("relative inline-block text-left", t), children: e }) });
  }
  function Mt({
    children: e,
    onClick: t,
    ...r
  }) {
    const { open: o, setOpen: a, triggerRef: n, menuRef: i } = J("MenuTrigger");
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        ref: n,
        type: "button",
        "aria-haspopup": "menu",
        "aria-expanded": o,
        onClick: (s) => {
          t == null || t(s), a(!o);
        },
        onKeyDown: (s) => {
          (s.key === "ArrowDown" || s.key === "Enter") && (s.preventDefault(), a(true), requestAnimationFrame(() => {
            var l, d;
            (d = (l = i.current) == null ? void 0 : l.querySelector('[role="menuitem"]:not([disabled])')) == null || d.focus();
          }));
        },
        ...r,
        children: e
      }
    );
  }
  function St({
    align: e = "start",
    className: t,
    children: r,
    ...o
  }) {
    const { open: a, setOpen: n, triggerRef: i, menuRef: s } = J("MenuContent");
    if (!a) return null;
    const l = () => {
      var c;
      return Array.from(
        ((c = s.current) == null ? void 0 : c.querySelectorAll(
          '[role="menuitem"]:not([disabled])'
        )) ?? []
      );
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        ref: s,
        role: "menu",
        onKeyDown: (c) => {
          var w, k, x, g, y;
          const f = l(), v = f.findIndex((C) => C === document.activeElement);
          c.key === "ArrowDown" ? (c.preventDefault(), (w = f[(v + 1) % f.length]) == null || w.focus()) : c.key === "ArrowUp" ? (c.preventDefault(), (k = f[(v - 1 + f.length) % f.length]) == null || k.focus()) : c.key === "Home" ? (c.preventDefault(), (x = f[0]) == null || x.focus()) : c.key === "End" ? (c.preventDefault(), (g = f[f.length - 1]) == null || g.focus()) : c.key === "Escape" && (c.preventDefault(), n(false), (y = i.current) == null || y.focus());
        },
        className: h(
          "absolute z-50 mt-2 min-w-[12rem] animate-fade-up",
          "rounded-lg border border-strong bg-surface-raised p-1 shadow-lg",
          e === "end" ? "right-0" : "left-0",
          t
        ),
        ...o,
        children: r
      }
    );
  }
  function It({
    destructive: e = false,
    icon: t,
    className: r,
    onClick: o,
    children: a,
    ...n
  }) {
    const { setOpen: i, triggerRef: s } = J("MenuItem");
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        role: "menuitem",
        type: "button",
        tabIndex: -1,
        onClick: (l) => {
          var d;
          o == null || o(l), i(false), (d = s.current) == null || d.focus();
        },
        className: h(
          "flex w-full items-center gap-2.5 rounded px-2.5 py-2 text-left",
          "font-sans text-sm transition-colors duration-fast ease-bloom",
          "focus:outline-none disabled:pointer-events-none disabled:opacity-50",
          e ? "text-danger hover:bg-danger-subtle focus:bg-danger-subtle" : "text-fg-secondary hover:bg-accent-subtle hover:text-fg focus:bg-accent-subtle focus:text-fg",
          r
        ),
        ...n,
        children: [
          t && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex shrink-0 items-center", children: t }),
          a
        ]
      }
    );
  }
  function Rt() {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        role: "separator",
        className: "my-1 h-px bg-[color:var(--color-border)]"
      }
    );
  }
  function Et({
    className: e,
    ...t
  }) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        className: h(
          "px-2.5 py-1.5 font-sans text-xs font-medium uppercase tracking-label text-fg-muted",
          e
        ),
        ...t
      }
    );
  }
  function Tt({
    size: e = 40,
    mono: t = false,
    className: r,
    title: o = "Kaika"
  }) {
    const a = (0, import_react.useId)().replace(/:/g, ""), n = `sage-${a}`, i = `bud-${a}`;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "svg",
      {
        width: e,
        height: e,
        viewBox: "0 0 140 140",
        fill: "none",
        role: "img",
        "aria-label": o,
        className: r,
        children: [
          !t && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: n, gradientUnits: "userSpaceOnUse", x1: "70", y1: "120", x2: "70", y2: "22", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0%", stopColor: "#3F6249" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "50%", stopColor: "#7FA888" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "100%", stopColor: "#CDE0C0" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: i, gradientUnits: "userSpaceOnUse", x1: "0", y1: "55", x2: "0", y2: "42", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0%", stopColor: "#9CC5A2" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "100%", stopColor: "#D9EACA" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { transform: "translate(70, 115)", fill: t ? "currentColor" : void 0, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { transform: "rotate(-30)", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "path",
              {
                d: "M 0 0 C -6.5 -14, -8.5 -42, 0 -58 C 8.5 -42, 6.5 -14, 0 0 Z",
                fill: t ? void 0 : `url(#${n})`,
                opacity: "0.94"
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { transform: "rotate(30)", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "path",
              {
                d: "M 0 0 C -6.5 -14, -8.5 -42, 0 -58 C 8.5 -42, 6.5 -14, 0 0 Z",
                fill: t ? void 0 : `url(#${n})`,
                opacity: "0.94"
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "path",
              {
                d: "M 0 0 C -9.5 -24, -10.5 -62, 0 -82 C 10.5 -62, 9.5 -24, 0 0 Z",
                fill: t ? void 0 : `url(#${n})`
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "32", cy: "-68", r: "4", fill: t ? void 0 : `url(#${i})` })
          ] })
        ]
      }
    );
  }
  return __toCommonJS(index_es_exports);
})();
window.Kaika=Kaika.__dsMainNs?Object.assign({},Kaika,Kaika.__dsMainNs,{__dsMainNs:undefined}):Kaika;
