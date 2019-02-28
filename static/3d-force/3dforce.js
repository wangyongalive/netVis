// Version 1.12.6 force-graph - https://github.com/vasturiano/force-graph
!function (t, e) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.ForceGraph = e()
}("undefined" != typeof self ? self : this, function () {
  "use strict";

  function t(e) {
    return (t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
          return typeof t
        }
        : function (t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
    )(e)
  }

  function e(t, e, n) {
    return e in t ? Object.defineProperty(t, e, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = n,
      t
  }

  function n(t) {
    for (var n = 1; n < arguments.length; n++) {
      var r = null != arguments[n] ? arguments[n] : {}
        , i = Object.keys(r);
      "function" == typeof Object.getOwnPropertySymbols && (i = i.concat(Object.getOwnPropertySymbols(r).filter(function (t) {
        return Object.getOwnPropertyDescriptor(r, t).enumerable
      }))),
        i.forEach(function (n) {
          e(t, n, r[n])
        })
    }
    return t
  }

  function r(t, e) {
    return (r = Object.setPrototypeOf || function (t, e) {
        return t.__proto__ = e,
          t
      }
    )(t, e)
  }

  function i(t, e, n) {
    return (i = function () {
        if ("undefined" == typeof Reflect || !Reflect.construct)
          return !1;
        if (Reflect.construct.sham)
          return !1;
        if ("function" == typeof Proxy)
          return !0;
        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], function () {
          })),
            !0
        } catch (t) {
          return !1
        }
      }() ? Reflect.construct : function (t, e, n) {
        var i = [null];
        i.push.apply(i, e);
        var a = new (Function.bind.apply(t, i));
        return n && r(a, n.prototype),
          a
      }
    ).apply(null, arguments)
  }

  function a(t, e) {
    return function (t) {
      if (Array.isArray(t))
        return t
    }(t) || function (t, e) {
      var n = []
        , r = !0
        , i = !1
        , a = void 0;
      try {
        for (var o, f = t[Symbol.iterator](); !(r = (o = f.next()).done) && (n.push(o.value),
        !e || n.length !== e); r = !0)
          ;
      } catch (t) {
        i = !0,
          a = t
      } finally {
        try {
          r || null == f.return || f.return()
        } finally {
          if (i)
            throw a
        }
      }
      return n
    }(t, e) || function () {
      throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }()
  }

  function o(t) {
    return function (t) {
      if (Array.isArray(t)) {
        for (var e = 0, n = new Array(t.length); e < t.length; e++)
          n[e] = t[e];
        return n
      }
    }(t) || function (t) {
      if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t))
        return Array.from(t)
    }(t) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance")
    }()
  }

  !function (t, e) {
    void 0 === e && (e = {});
    var n = e.insertAt;
    if (t && "undefined" != typeof document) {
      var r = document.head || document.getElementsByTagName("head")[0]
        , i = document.createElement("style");
      i.type = "text/css",
        "top" === n && r.firstChild ? r.insertBefore(i, r.firstChild) : r.appendChild(i),
        i.styleSheet ? i.styleSheet.cssText = t : i.appendChild(document.createTextNode(t))
    }
  }(".graph-tooltip {\n  position: absolute;\n  transform: translate(-50%, 25px);\n  font-family: Sans-serif;\n  font-size: 16px;\n  padding: 4px;\n  border-radius: 3px;\n  color: #eee;\n  background: rgba(0,0,0,0.65);\n  visibility: hidden; /* by default */\n}\n\n.grabbable {\n  cursor: move;\n  cursor: grab;\n  cursor: -moz-grab;\n  cursor: -webkit-grab;\n}\n\n.grabbable:active {\n  cursor: grabbing;\n  cursor: -moz-grabbing;\n  cursor: -webkit-grabbing;\n}\n");
  var f = "http://www.w3.org/1999/xhtml"
    , c = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: f,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };

  function u(t) {
    var e = t += ""
      , n = e.indexOf(":");
    return n >= 0 && "xmlns" !== (e = t.slice(0, n)) && (t = t.slice(n + 1)),
      c.hasOwnProperty(e) ? {
        space: c[e],
        local: t
      } : t
  }

  function s(t) {
    var e = u(t);
    return (e.local ? function (t) {
          return function () {
            return this.ownerDocument.createElementNS(t.space, t.local)
          }
        }
        : function (t) {
          return function () {
            var e = this.ownerDocument
              , n = this.namespaceURI;
            return n === f && e.documentElement.namespaceURI === f ? e.createElement(t) : e.createElementNS(n, t)
          }
        }
    )(e)
  }

  function l() {
  }

  function h(t) {
    return null == t ? l : function () {
      return this.querySelector(t)
    }
  }

  function d() {
    return []
  }

  function p(t) {
    return null == t ? d : function () {
      return this.querySelectorAll(t)
    }
  }

  var b = function (t) {
    return function () {
      return this.matches(t)
    }
  };
  if ("undefined" != typeof document) {
    var y = document.documentElement;
    if (!y.matches) {
      var v = y.webkitMatchesSelector || y.msMatchesSelector || y.mozMatchesSelector || y.oMatchesSelector;
      b = function (t) {
        return function () {
          return v.call(this, t)
        }
      }
    }
  }
  var g = b;

  function _(t) {
    return new Array(t.length)
  }

  function m(t, e) {
    this.ownerDocument = t.ownerDocument,
      this.namespaceURI = t.namespaceURI,
      this._next = null,
      this._parent = t,
      this.__data__ = e
  }

  m.prototype = {
    constructor: m,
    appendChild: function (t) {
      return this._parent.insertBefore(t, this._next)
    },
    insertBefore: function (t, e) {
      return this._parent.insertBefore(t, e)
    },
    querySelector: function (t) {
      return this._parent.querySelector(t)
    },
    querySelectorAll: function (t) {
      return this._parent.querySelectorAll(t)
    }
  };
  var x = "$";

  function w(t, e, n, r, i, a) {
    for (var o, f = 0, c = e.length, u = a.length; f < u; ++f)
      (o = e[f]) ? (o.__data__ = a[f],
        r[f] = o) : n[f] = new m(t, a[f]);
    for (; f < c; ++f)
      (o = e[f]) && (i[f] = o)
  }

  function k(t, e, n, r, i, a, o) {
    var f, c, u, s = {}, l = e.length, h = a.length, d = new Array(l);
    for (f = 0; f < l; ++f)
      (c = e[f]) && (d[f] = u = x + o.call(c, c.__data__, f, e),
        u in s ? i[f] = c : s[u] = c);
    for (f = 0; f < h; ++f)
      (c = s[u = x + o.call(t, a[f], f, a)]) ? (r[f] = c,
        c.__data__ = a[f],
        s[u] = null) : n[f] = new m(t, a[f]);
    for (f = 0; f < l; ++f)
      (c = e[f]) && s[d[f]] === c && (i[f] = c)
  }

  function z(t, e) {
    return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN
  }

  function M(t) {
    return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView
  }

  function A(t, e) {
    return t.style.getPropertyValue(e) || M(t).getComputedStyle(t, null).getPropertyValue(e)
  }

  function N(t) {
    return t.trim().split(/^|\s+/)
  }

  function E(t) {
    return t.classList || new S(t)
  }

  function S(t) {
    this._node = t,
      this._names = N(t.getAttribute("class") || "")
  }

  function T(t, e) {
    for (var n = E(t), r = -1, i = e.length; ++r < i;)
      n.add(e[r])
  }

  function C(t, e) {
    for (var n = E(t), r = -1, i = e.length; ++r < i;)
      n.remove(e[r])
  }

  function O() {
    this.textContent = ""
  }

  function P() {
    this.innerHTML = ""
  }

  function j() {
    this.nextSibling && this.parentNode.appendChild(this)
  }

  function I() {
    this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild)
  }

  function D() {
    return null
  }

  function U() {
    var t = this.parentNode;
    t && t.removeChild(this)
  }

  function L() {
    return this.parentNode.insertBefore(this.cloneNode(!1), this.nextSibling)
  }

  function q() {
    return this.parentNode.insertBefore(this.cloneNode(!0), this.nextSibling)
  }

  S.prototype = {
    add: function (t) {
      this._names.indexOf(t) < 0 && (this._names.push(t),
        this._node.setAttribute("class", this._names.join(" ")))
    },
    remove: function (t) {
      var e = this._names.indexOf(t);
      e >= 0 && (this._names.splice(e, 1),
        this._node.setAttribute("class", this._names.join(" ")))
    },
    contains: function (t) {
      return this._names.indexOf(t) >= 0
    }
  };
  var R = {}
    , F = null;
  "undefined" != typeof document && ("onmouseenter" in document.documentElement || (R = {
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  }));

  function B(t, e, n) {
    return t = V(t, e, n),
      function (e) {
        var n = e.relatedTarget;
        n && (n === this || 8 & n.compareDocumentPosition(this)) || t.call(this, e)
      }
  }

  function V(t, e, n) {
    return function (r) {
      var i = F;
      F = r;
      try {
        t.call(this, this.__data__, e, n)
      } finally {
        F = i
      }
    }
  }

  function X(t) {
    return function () {
      var e = this.__on;
      if (e) {
        for (var n, r = 0, i = -1, a = e.length; r < a; ++r)
          n = e[r],
            t.type && n.type !== t.type || n.name !== t.name ? e[++i] = n : this.removeEventListener(n.type, n.listener, n.capture);
        ++i ? e.length = i : delete this.__on
      }
    }
  }

  function G(t, e, n) {
    var r = R.hasOwnProperty(t.type) ? B : V;
    return function (i, a, o) {
      var f, c = this.__on, u = r(e, a, o);
      if (c)
        for (var s = 0, l = c.length; s < l; ++s)
          if ((f = c[s]).type === t.type && f.name === t.name)
            return this.removeEventListener(f.type, f.listener, f.capture),
              this.addEventListener(f.type, f.listener = u, f.capture = n),
              void (f.value = e);
      this.addEventListener(t.type, u, n),
        f = {
          type: t.type,
          name: t.name,
          value: e,
          listener: u,
          capture: n
        },
        c ? c.push(f) : this.__on = [f]
    }
  }

  function Y(t, e, n, r) {
    var i = F;
    t.sourceEvent = F,
      F = t;
    try {
      return e.apply(n, r)
    } finally {
      F = i
    }
  }

  function $(t, e, n) {
    var r = M(t)
      , i = r.CustomEvent;
    "function" == typeof i ? i = new i(e, n) : (i = r.document.createEvent("Event"),
      n ? (i.initEvent(e, n.bubbles, n.cancelable),
        i.detail = n.detail) : i.initEvent(e, !1, !1)),
      t.dispatchEvent(i)
  }

  var H = [null];

  function W(t, e) {
    this._groups = t,
      this._parents = e
  }

  function Q() {
    return new W([[document.documentElement]], H)
  }

  function Z(t) {
    return "string" == typeof t ? new W([[document.querySelector(t)]], [document.documentElement]) : new W([[t]], H)
  }

  function J() {
    for (var t, e = F; t = e.sourceEvent;)
      e = t;
    return e
  }

  function K(t, e) {
    var n = t.ownerSVGElement || t;
    if (n.createSVGPoint) {
      var r = n.createSVGPoint();
      return r.x = e.clientX,
        r.y = e.clientY,
        [(r = r.matrixTransform(t.getScreenCTM().inverse())).x, r.y]
    }
    var i = t.getBoundingClientRect();
    return [e.clientX - i.left - t.clientLeft, e.clientY - i.top - t.clientTop]
  }

  function tt(t) {
    var e = J();
    return e.changedTouches && (e = e.changedTouches[0]),
      K(t, e)
  }

  function et(t, e, n) {
    arguments.length < 3 && (n = e,
      e = J().changedTouches);
    for (var r, i = 0, a = e ? e.length : 0; i < a; ++i)
      if ((r = e[i]).identifier === n)
        return K(t, r);
    return null
  }

  W.prototype = Q.prototype = {
    constructor: W,
    select: function (t) {
      "function" != typeof t && (t = h(t));
      for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
        for (var a, o, f = e[i], c = f.length, u = r[i] = new Array(c), s = 0; s < c; ++s)
          (a = f[s]) && (o = t.call(a, a.__data__, s, f)) && ("__data__" in a && (o.__data__ = a.__data__),
            u[s] = o);
      return new W(r, this._parents)
    },
    selectAll: function (t) {
      "function" != typeof t && (t = p(t));
      for (var e = this._groups, n = e.length, r = [], i = [], a = 0; a < n; ++a)
        for (var o, f = e[a], c = f.length, u = 0; u < c; ++u)
          (o = f[u]) && (r.push(t.call(o, o.__data__, u, f)),
            i.push(o));
      return new W(r, i)
    },
    filter: function (t) {
      "function" != typeof t && (t = g(t));
      for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
        for (var a, o = e[i], f = o.length, c = r[i] = [], u = 0; u < f; ++u)
          (a = o[u]) && t.call(a, a.__data__, u, o) && c.push(a);
      return new W(r, this._parents)
    },
    data: function (t, e) {
      if (!t)
        return p = new Array(this.size()),
          s = -1,
          this.each(function (t) {
            p[++s] = t
          }),
          p;
      var n, r = e ? k : w, i = this._parents, a = this._groups;
      "function" != typeof t && (n = t,
          t = function () {
            return n
          }
      );
      for (var o = a.length, f = new Array(o), c = new Array(o), u = new Array(o), s = 0; s < o; ++s) {
        var l = i[s]
          , h = a[s]
          , d = h.length
          , p = t.call(l, l && l.__data__, s, i)
          , b = p.length
          , y = c[s] = new Array(b)
          , v = f[s] = new Array(b);
        r(l, h, y, v, u[s] = new Array(d), p, e);
        for (var g, _, m = 0, x = 0; m < b; ++m)
          if (g = y[m]) {
            for (m >= x && (x = m + 1); !(_ = v[x]) && ++x < b;)
              ;
            g._next = _ || null
          }
      }
      return (f = new W(f, i))._enter = c,
        f._exit = u,
        f
    },
    enter: function () {
      return new W(this._enter || this._groups.map(_), this._parents)
    },
    exit: function () {
      return new W(this._exit || this._groups.map(_), this._parents)
    },
    merge: function (t) {
      for (var e = this._groups, n = t._groups, r = e.length, i = n.length, a = Math.min(r, i), o = new Array(r), f = 0; f < a; ++f)
        for (var c, u = e[f], s = n[f], l = u.length, h = o[f] = new Array(l), d = 0; d < l; ++d)
          (c = u[d] || s[d]) && (h[d] = c);
      for (; f < r; ++f)
        o[f] = e[f];
      return new W(o, this._parents)
    },
    order: function () {
      for (var t = this._groups, e = -1, n = t.length; ++e < n;)
        for (var r, i = t[e], a = i.length - 1, o = i[a]; --a >= 0;)
          (r = i[a]) && (o && o !== r.nextSibling && o.parentNode.insertBefore(r, o),
            o = r);
      return this
    },
    sort: function (t) {
      function e(e, n) {
        return e && n ? t(e.__data__, n.__data__) : !e - !n
      }

      t || (t = z);
      for (var n = this._groups, r = n.length, i = new Array(r), a = 0; a < r; ++a) {
        for (var o, f = n[a], c = f.length, u = i[a] = new Array(c), s = 0; s < c; ++s)
          (o = f[s]) && (u[s] = o);
        u.sort(e)
      }
      return new W(i, this._parents).order()
    },
    call: function () {
      var t = arguments[0];
      return arguments[0] = this,
        t.apply(null, arguments),
        this
    },
    nodes: function () {
      var t = new Array(this.size())
        , e = -1;
      return this.each(function () {
        t[++e] = this
      }),
        t
    },
    node: function () {
      for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
        for (var r = t[e], i = 0, a = r.length; i < a; ++i) {
          var o = r[i];
          if (o)
            return o
        }
      return null
    },
    size: function () {
      var t = 0;
      return this.each(function () {
        ++t
      }),
        t
    },
    empty: function () {
      return !this.node()
    },
    each: function (t) {
      for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
        for (var i, a = e[n], o = 0, f = a.length; o < f; ++o)
          (i = a[o]) && t.call(i, i.__data__, o, a);
      return this
    },
    attr: function (t, e) {
      var n = u(t);
      if (arguments.length < 2) {
        var r = this.node();
        return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n)
      }
      return this.each((null == e ? n.local ? function (t) {
            return function () {
              this.removeAttributeNS(t.space, t.local)
            }
          }
          : function (t) {
            return function () {
              this.removeAttribute(t)
            }
          }
          : "function" == typeof e ? n.local ? function (t, e) {
              return function () {
                var n = e.apply(this, arguments);
                null == n ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n)
              }
            }
            : function (t, e) {
              return function () {
                var n = e.apply(this, arguments);
                null == n ? this.removeAttribute(t) : this.setAttribute(t, n)
              }
            }
            : n.local ? function (t, e) {
                return function () {
                  this.setAttributeNS(t.space, t.local, e)
                }
              }
              : function (t, e) {
                return function () {
                  this.setAttribute(t, e)
                }
              }
      )(n, e))
    },
    style: function (t, e, n) {
      return arguments.length > 1 ? this.each((null == e ? function (t) {
            return function () {
              this.style.removeProperty(t)
            }
          }
          : "function" == typeof e ? function (t, e, n) {
              return function () {
                var r = e.apply(this, arguments);
                null == r ? this.style.removeProperty(t) : this.style.setProperty(t, r, n)
              }
            }
            : function (t, e, n) {
              return function () {
                this.style.setProperty(t, e, n)
              }
            }
      )(t, e, null == n ? "" : n)) : A(this.node(), t)
    },
    property: function (t, e) {
      return arguments.length > 1 ? this.each((null == e ? function (t) {
            return function () {
              delete this[t]
            }
          }
          : "function" == typeof e ? function (t, e) {
              return function () {
                var n = e.apply(this, arguments);
                null == n ? delete this[t] : this[t] = n
              }
            }
            : function (t, e) {
              return function () {
                this[t] = e
              }
            }
      )(t, e)) : this.node()[t]
    },
    classed: function (t, e) {
      var n = N(t + "");
      if (arguments.length < 2) {
        for (var r = E(this.node()), i = -1, a = n.length; ++i < a;)
          if (!r.contains(n[i]))
            return !1;
        return !0
      }
      return this.each(("function" == typeof e ? function (t, e) {
            return function () {
              (e.apply(this, arguments) ? T : C)(this, t)
            }
          }
          : e ? function (t) {
              return function () {
                T(this, t)
              }
            }
            : function (t) {
              return function () {
                C(this, t)
              }
            }
      )(n, e))
    },
    text: function (t) {
      return arguments.length ? this.each(null == t ? O : ("function" == typeof t ? function (t) {
            return function () {
              var e = t.apply(this, arguments);
              this.textContent = null == e ? "" : e
            }
          }
          : function (t) {
            return function () {
              this.textContent = t
            }
          }
      )(t)) : this.node().textContent
    },
    html: function (t) {
      return arguments.length ? this.each(null == t ? P : ("function" == typeof t ? function (t) {
            return function () {
              var e = t.apply(this, arguments);
              this.innerHTML = null == e ? "" : e
            }
          }
          : function (t) {
            return function () {
              this.innerHTML = t
            }
          }
      )(t)) : this.node().innerHTML
    },
    raise: function () {
      return this.each(j)
    },
    lower: function () {
      return this.each(I)
    },
    append: function (t) {
      var e = "function" == typeof t ? t : s(t);
      return this.select(function () {
        return this.appendChild(e.apply(this, arguments))
      })
    },
    insert: function (t, e) {
      var n = "function" == typeof t ? t : s(t)
        , r = null == e ? D : "function" == typeof e ? e : h(e);
      return this.select(function () {
        return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null)
      })
    },
    remove: function () {
      return this.each(U)
    },
    clone: function (t) {
      return this.select(t ? q : L)
    },
    datum: function (t) {
      return arguments.length ? this.property("__data__", t) : this.node().__data__
    },
    on: function (t, e, n) {
      var r, i, a = function (t) {
        return t.trim().split(/^|\s+/).map(function (t) {
          var e = ""
            , n = t.indexOf(".");
          return n >= 0 && (e = t.slice(n + 1),
            t = t.slice(0, n)),
            {
              type: t,
              name: e
            }
        })
      }(t + ""), o = a.length;
      if (!(arguments.length < 2)) {
        for (f = e ? G : X,
             null == n && (n = !1),
               r = 0; r < o; ++r)
          this.each(f(a[r], e, n));
        return this
      }
      var f = this.node().__on;
      if (f)
        for (var c, u = 0, s = f.length; u < s; ++u)
          for (r = 0,
                 c = f[u]; r < o; ++r)
            if ((i = a[r]).type === c.type && i.name === c.name)
              return c.value
    },
    dispatch: function (t, e) {
      return this.each(("function" == typeof e ? function (t, e) {
            return function () {
              return $(this, t, e.apply(this, arguments))
            }
          }
          : function (t, e) {
            return function () {
              return $(this, t, e)
            }
          }
      )(t, e))
    }
  };
  var nt = {
    value: function () {
    }
  };

  function rt() {
    for (var t, e = 0, n = arguments.length, r = {}; e < n; ++e) {
      if (!(t = arguments[e] + "") || t in r)
        throw new Error("illegal type: " + t);
      r[t] = []
    }
    return new it(r)
  }

  function it(t) {
    this._ = t
  }

  function at(t, e) {
    for (var n, r = 0, i = t.length; r < i; ++r)
      if ((n = t[r]).name === e)
        return n.value
  }

  function ot(t, e, n) {
    for (var r = 0, i = t.length; r < i; ++r)
      if (t[r].name === e) {
        t[r] = nt,
          t = t.slice(0, r).concat(t.slice(r + 1));
        break
      }
    return null != n && t.push({
      name: e,
      value: n
    }),
      t
  }

  function ft() {
    F.stopImmediatePropagation()
  }

  function ct() {
    F.preventDefault(),
      F.stopImmediatePropagation()
  }

  function ut(t) {
    var e = t.document.documentElement
      , n = Z(t).on("dragstart.drag", ct, !0);
    "onselectstart" in e ? n.on("selectstart.drag", ct, !0) : (e.__noselect = e.style.MozUserSelect,
      e.style.MozUserSelect = "none")
  }

  function st(t, e) {
    var n = t.document.documentElement
      , r = Z(t).on("dragstart.drag", null);
    e && (r.on("click.drag", ct, !0),
      setTimeout(function () {
        r.on("click.drag", null)
      }, 0)),
      "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect,
        delete n.__noselect)
  }

  function lt(t) {
    return function () {
      return t
    }
  }

  function ht(t, e, n, r, i, a, o, f, c, u) {
    this.target = t,
      this.type = e,
      this.subject = n,
      this.identifier = r,
      this.active = i,
      this.x = a,
      this.y = o,
      this.dx = f,
      this.dy = c,
      this._ = u
  }

  function dt() {
    return !F.button
  }

  function pt() {
    return this.parentNode
  }

  function bt(t) {
    return null == t ? {
      x: F.x,
      y: F.y
    } : t
  }

  function yt() {
    return "ontouchstart" in this
  }

  function vt(t, e, n) {
    t.prototype = e.prototype = n,
      n.constructor = t
  }

  function gt(t, e) {
    var n = Object.create(t.prototype);
    for (var r in e)
      n[r] = e[r];
    return n
  }

  function _t() {
  }

  it.prototype = rt.prototype = {
    constructor: it,
    on: function (t, e) {
      var n, r, i = this._, a = (r = i,
        (t + "").trim().split(/^|\s+/).map(function (t) {
          var e = ""
            , n = t.indexOf(".");
          if (n >= 0 && (e = t.slice(n + 1),
            t = t.slice(0, n)),
          t && !r.hasOwnProperty(t))
            throw new Error("unknown type: " + t);
          return {
            type: t,
            name: e
          }
        })), o = -1, f = a.length;
      if (!(arguments.length < 2)) {
        if (null != e && "function" != typeof e)
          throw new Error("invalid callback: " + e);
        for (; ++o < f;)
          if (n = (t = a[o]).type)
            i[n] = ot(i[n], t.name, e);
          else if (null == e)
            for (n in i)
              i[n] = ot(i[n], t.name, null);
        return this
      }
      for (; ++o < f;)
        if ((n = (t = a[o]).type) && (n = at(i[n], t.name)))
          return n
    },
    copy: function () {
      var t = {}
        , e = this._;
      for (var n in e)
        t[n] = e[n].slice();
      return new it(t)
    },
    call: function (t, e) {
      if ((n = arguments.length - 2) > 0)
        for (var n, r, i = new Array(n), a = 0; a < n; ++a)
          i[a] = arguments[a + 2];
      if (!this._.hasOwnProperty(t))
        throw new Error("unknown type: " + t);
      for (a = 0,
             n = (r = this._[t]).length; a < n; ++a)
        r[a].value.apply(e, i)
    },
    apply: function (t, e, n) {
      if (!this._.hasOwnProperty(t))
        throw new Error("unknown type: " + t);
      for (var r = this._[t], i = 0, a = r.length; i < a; ++i)
        r[i].value.apply(e, n)
    }
  },
    ht.prototype.on = function () {
      var t = this._.on.apply(this._, arguments);
      return t === this._ ? this : t
    }
  ;
  var mt = "\\s*([+-]?\\d+)\\s*"
    , xt = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*"
    , wt = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*"
    , kt = /^#([0-9a-f]{3})$/
    , zt = /^#([0-9a-f]{6})$/
    , Mt = new RegExp("^rgb\\(" + [mt, mt, mt] + "\\)$")
    , At = new RegExp("^rgb\\(" + [wt, wt, wt] + "\\)$")
    , Nt = new RegExp("^rgba\\(" + [mt, mt, mt, xt] + "\\)$")
    , Et = new RegExp("^rgba\\(" + [wt, wt, wt, xt] + "\\)$")
    , St = new RegExp("^hsl\\(" + [xt, wt, wt] + "\\)$")
    , Tt = new RegExp("^hsla\\(" + [xt, wt, wt, xt] + "\\)$")
    , Ct = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  };

  function Ot(t) {
    var e;
    return t = (t + "").trim().toLowerCase(),
      (e = kt.exec(t)) ? new Ut((e = parseInt(e[1], 16)) >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | 240 & e, (15 & e) << 4 | 15 & e, 1) : (e = zt.exec(t)) ? Pt(parseInt(e[1], 16)) : (e = Mt.exec(t)) ? new Ut(e[1], e[2], e[3], 1) : (e = At.exec(t)) ? new Ut(255 * e[1] / 100, 255 * e[2] / 100, 255 * e[3] / 100, 1) : (e = Nt.exec(t)) ? jt(e[1], e[2], e[3], e[4]) : (e = Et.exec(t)) ? jt(255 * e[1] / 100, 255 * e[2] / 100, 255 * e[3] / 100, e[4]) : (e = St.exec(t)) ? qt(e[1], e[2] / 100, e[3] / 100, 1) : (e = Tt.exec(t)) ? qt(e[1], e[2] / 100, e[3] / 100, e[4]) : Ct.hasOwnProperty(t) ? Pt(Ct[t]) : "transparent" === t ? new Ut(NaN, NaN, NaN, 0) : null
  }

  function Pt(t) {
    return new Ut(t >> 16 & 255, t >> 8 & 255, 255 & t, 1)
  }

  function jt(t, e, n, r) {
    return r <= 0 && (t = e = n = NaN),
      new Ut(t, e, n, r)
  }

  function It(t) {
    return t instanceof _t || (t = Ot(t)),
      t ? new Ut((t = t.rgb()).r, t.g, t.b, t.opacity) : new Ut
  }

  function Dt(t, e, n, r) {
    return 1 === arguments.length ? It(t) : new Ut(t, e, n, null == r ? 1 : r)
  }

  function Ut(t, e, n, r) {
    this.r = +t,
      this.g = +e,
      this.b = +n,
      this.opacity = +r
  }

  function Lt(t) {
    return ((t = Math.max(0, Math.min(255, Math.round(t) || 0))) < 16 ? "0" : "") + t.toString(16)
  }

  function qt(t, e, n, r) {
    return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN),
      new Rt(t, e, n, r)
  }

  function Rt(t, e, n, r) {
    this.h = +t,
      this.s = +e,
      this.l = +n,
      this.opacity = +r
  }

  function Ft(t, e, n) {
    return 255 * (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e)
  }

  vt(_t, Ot, {
    displayable: function () {
      return this.rgb().displayable()
    },
    hex: function () {
      return this.rgb().hex()
    },
    toString: function () {
      return this.rgb() + ""
    }
  }),
    vt(Ut, Dt, gt(_t, {
      brighter: function (t) {
        return t = null == t ? 1 / .7 : Math.pow(1 / .7, t),
          new Ut(this.r * t, this.g * t, this.b * t, this.opacity)
      },
      darker: function (t) {
        return t = null == t ? .7 : Math.pow(.7, t),
          new Ut(this.r * t, this.g * t, this.b * t, this.opacity)
      },
      rgb: function () {
        return this
      },
      displayable: function () {
        return 0 <= this.r && this.r <= 255 && 0 <= this.g && this.g <= 255 && 0 <= this.b && this.b <= 255 && 0 <= this.opacity && this.opacity <= 1
      },
      hex: function () {
        return "#" + Lt(this.r) + Lt(this.g) + Lt(this.b)
      },
      toString: function () {
        var t = this.opacity;
        return (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (1 === t ? ")" : ", " + t + ")")
      }
    })),
    vt(Rt, function (t, e, n, r) {
      return 1 === arguments.length ? function (t) {
        if (t instanceof Rt)
          return new Rt(t.h, t.s, t.l, t.opacity);
        if (t instanceof _t || (t = Ot(t)),
          !t)
          return new Rt;
        if (t instanceof Rt)
          return t;
        var e = (t = t.rgb()).r / 255
          , n = t.g / 255
          , r = t.b / 255
          , i = Math.min(e, n, r)
          , a = Math.max(e, n, r)
          , o = NaN
          , f = a - i
          , c = (a + i) / 2;
        return f ? (o = e === a ? (n - r) / f + 6 * (n < r) : n === a ? (r - e) / f + 2 : (e - n) / f + 4,
          f /= c < .5 ? a + i : 2 - a - i,
          o *= 60) : f = c > 0 && c < 1 ? 0 : o,
          new Rt(o, f, c, t.opacity)
      }(t) : new Rt(t, e, n, null == r ? 1 : r)
    }, gt(_t, {
      brighter: function (t) {
        return t = null == t ? 1 / .7 : Math.pow(1 / .7, t),
          new Rt(this.h, this.s, this.l * t, this.opacity)
      },
      darker: function (t) {
        return t = null == t ? .7 : Math.pow(.7, t),
          new Rt(this.h, this.s, this.l * t, this.opacity)
      },
      rgb: function () {
        var t = this.h % 360 + 360 * (this.h < 0)
          , e = isNaN(t) || isNaN(this.s) ? 0 : this.s
          , n = this.l
          , r = n + (n < .5 ? n : 1 - n) * e
          , i = 2 * n - r;
        return new Ut(Ft(t >= 240 ? t - 240 : t + 120, i, r), Ft(t, i, r), Ft(t < 120 ? t + 240 : t - 120, i, r), this.opacity)
      },
      displayable: function () {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
      }
    }));
  var Bt = Math.PI / 180
    , Vt = 180 / Math.PI
    , Xt = .96422
    , Gt = 1
    , Yt = .82521
    , $t = 4 / 29
    , Ht = 6 / 29
    , Wt = 3 * Ht * Ht
    , Qt = Ht * Ht * Ht;

  function Zt(t) {
    if (t instanceof Jt)
      return new Jt(t.l, t.a, t.b, t.opacity);
    if (t instanceof re) {
      if (isNaN(t.h))
        return new Jt(t.l, 0, 0, t.opacity);
      var e = t.h * Bt;
      return new Jt(t.l, Math.cos(e) * t.c, Math.sin(e) * t.c, t.opacity)
    }
    t instanceof Ut || (t = It(t));
    var n, r, i = ne(t.r), a = ne(t.g), o = ne(t.b), f = Kt((.2225045 * i + .7168786 * a + .0606169 * o) / Gt);
    return i === a && a === o ? n = r = f : (n = Kt((.4360747 * i + .3850649 * a + .1430804 * o) / Xt),
      r = Kt((.0139322 * i + .0971045 * a + .7141733 * o) / Yt)),
      new Jt(116 * f - 16, 500 * (n - f), 200 * (f - r), t.opacity)
  }

  function Jt(t, e, n, r) {
    this.l = +t,
      this.a = +e,
      this.b = +n,
      this.opacity = +r
  }

  function Kt(t) {
    return t > Qt ? Math.pow(t, 1 / 3) : t / Wt + $t
  }

  function te(t) {
    return t > Ht ? t * t * t : Wt * (t - $t)
  }

  function ee(t) {
    return 255 * (t <= .0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - .055)
  }

  function ne(t) {
    return (t /= 255) <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)
  }

  function re(t, e, n, r) {
    this.h = +t,
      this.c = +e,
      this.l = +n,
      this.opacity = +r
  }

  vt(Jt, function (t, e, n, r) {
    return 1 === arguments.length ? Zt(t) : new Jt(t, e, n, null == r ? 1 : r)
  }, gt(_t, {
    brighter: function (t) {
      return new Jt(this.l + 18 * (null == t ? 1 : t), this.a, this.b, this.opacity)
    },
    darker: function (t) {
      return new Jt(this.l - 18 * (null == t ? 1 : t), this.a, this.b, this.opacity)
    },
    rgb: function () {
      var t = (this.l + 16) / 116
        , e = isNaN(this.a) ? t : t + this.a / 500
        , n = isNaN(this.b) ? t : t - this.b / 200;
      return new Ut(ee(3.1338561 * (e = Xt * te(e)) - 1.6168667 * (t = Gt * te(t)) - .4906146 * (n = Yt * te(n))), ee(-.9787684 * e + 1.9161415 * t + .033454 * n), ee(.0719453 * e - .2289914 * t + 1.4052427 * n), this.opacity)
    }
  })),
    vt(re, function (t, e, n, r) {
      return 1 === arguments.length ? function (t) {
        if (t instanceof re)
          return new re(t.h, t.c, t.l, t.opacity);
        if (t instanceof Jt || (t = Zt(t)),
        0 === t.a && 0 === t.b)
          return new re(NaN, 0, t.l, t.opacity);
        var e = Math.atan2(t.b, t.a) * Vt;
        return new re(e < 0 ? e + 360 : e, Math.sqrt(t.a * t.a + t.b * t.b), t.l, t.opacity)
      }(t) : new re(t, e, n, null == r ? 1 : r)
    }, gt(_t, {
      brighter: function (t) {
        return new re(this.h, this.c, this.l + 18 * (null == t ? 1 : t), this.opacity)
      },
      darker: function (t) {
        return new re(this.h, this.c, this.l - 18 * (null == t ? 1 : t), this.opacity)
      },
      rgb: function () {
        return Zt(this).rgb()
      }
    }));
  var ie = -.14861
    , ae = 1.78277
    , oe = -.29227
    , fe = -.90649
    , ce = 1.97294
    , ue = ce * fe
    , se = ce * ae
    , le = ae * oe - fe * ie;

  function he(t, e, n, r) {
    return 1 === arguments.length ? function (t) {
      if (t instanceof de)
        return new de(t.h, t.s, t.l, t.opacity);
      t instanceof Ut || (t = It(t));
      var e = t.r / 255
        , n = t.g / 255
        , r = t.b / 255
        , i = (le * r + ue * e - se * n) / (le + ue - se)
        , a = r - i
        , o = (ce * (n - i) - oe * a) / fe
        , f = Math.sqrt(o * o + a * a) / (ce * i * (1 - i))
        , c = f ? Math.atan2(o, a) * Vt - 120 : NaN;
      return new de(c < 0 ? c + 360 : c, f, i, t.opacity)
    }(t) : new de(t, e, n, null == r ? 1 : r)
  }

  function de(t, e, n, r) {
    this.h = +t,
      this.s = +e,
      this.l = +n,
      this.opacity = +r
  }

  function pe(t) {
    return function () {
      return t
    }
  }

  function be(t, e) {
    return function (n) {
      return t + n * e
    }
  }

  function ye(t) {
    return 1 == (t = +t) ? ve : function (e, n) {
      return n - e ? function (t, e, n) {
        return t = Math.pow(t, n),
          e = Math.pow(e, n) - t,
          n = 1 / n,
          function (r) {
            return Math.pow(t + r * e, n)
          }
      }(e, n, t) : pe(isNaN(e) ? n : e)
    }
  }

  function ve(t, e) {
    var n = e - t;
    return n ? be(t, n) : pe(isNaN(t) ? e : t)
  }

  vt(de, he, gt(_t, {
    brighter: function (t) {
      return t = null == t ? 1 / .7 : Math.pow(1 / .7, t),
        new de(this.h, this.s, this.l * t, this.opacity)
    },
    darker: function (t) {
      return t = null == t ? .7 : Math.pow(.7, t),
        new de(this.h, this.s, this.l * t, this.opacity)
    },
    rgb: function () {
      var t = isNaN(this.h) ? 0 : (this.h + 120) * Bt
        , e = +this.l
        , n = isNaN(this.s) ? 0 : this.s * e * (1 - e)
        , r = Math.cos(t)
        , i = Math.sin(t);
      return new Ut(255 * (e + n * (ie * r + ae * i)), 255 * (e + n * (oe * r + fe * i)), 255 * (e + n * (ce * r)), this.opacity)
    }
  }));
  var ge = function t(e) {
    var n = ye(e);

    function r(t, e) {
      var r = n((t = Dt(t)).r, (e = Dt(e)).r)
        , i = n(t.g, e.g)
        , a = n(t.b, e.b)
        , o = ve(t.opacity, e.opacity);
      return function (e) {
        return t.r = r(e),
          t.g = i(e),
          t.b = a(e),
          t.opacity = o(e),
        t + ""
      }
    }

    return r.gamma = t,
      r
  }(1);
  var _e, me = (_e = function (t) {
      var e = t.length - 1;
      return function (n) {
        var r = n <= 0 ? n = 0 : n >= 1 ? (n = 1,
        e - 1) : Math.floor(n * e)
          , i = t[r]
          , a = t[r + 1]
          , o = r > 0 ? t[r - 1] : 2 * i - a
          , f = r < e - 1 ? t[r + 2] : 2 * a - i;
        return function (t, e, n, r, i) {
          var a = t * t
            , o = a * t;
          return ((1 - 3 * t + 3 * a - o) * e + (4 - 6 * a + 3 * o) * n + (1 + 3 * t + 3 * a - 3 * o) * r + o * i) / 6
        }((n - r / e) * e, o, i, a, f)
      }
    }
      ,
      function (t) {
        var e, n, r = t.length, i = new Array(r), a = new Array(r), o = new Array(r);
        for (e = 0; e < r; ++e)
          n = Dt(t[e]),
            i[e] = n.r || 0,
            a[e] = n.g || 0,
            o[e] = n.b || 0;
        return i = _e(i),
          a = _e(a),
          o = _e(o),
          n.opacity = 1,
          function (t) {
            return n.r = i(t),
              n.g = a(t),
              n.b = o(t),
            n + ""
          }
      }
  );

  function xe(t, e) {
    return e -= t = +t,
      function (n) {
        return t + e * n
      }
  }

  var we = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g
    , ke = new RegExp(we.source, "g");
  var ze, Me, Ae, Ne, Ee = 180 / Math.PI, Se = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
  };

  function Te(t, e, n, r, i, a) {
    var o, f, c;
    return (o = Math.sqrt(t * t + e * e)) && (t /= o,
      e /= o),
    (c = t * n + e * r) && (n -= t * c,
      r -= e * c),
    (f = Math.sqrt(n * n + r * r)) && (n /= f,
      r /= f,
      c /= f),
    t * r < e * n && (t = -t,
      e = -e,
      c = -c,
      o = -o),
      {
        translateX: i,
        translateY: a,
        rotate: Math.atan2(e, t) * Ee,
        skewX: Math.atan(c) * Ee,
        scaleX: o,
        scaleY: f
      }
  }

  function Ce(t, e, n, r) {
    function i(t) {
      return t.length ? t.pop() + " " : ""
    }

    return function (a, o) {
      var f = []
        , c = [];
      return a = t(a),
        o = t(o),
        function (t, r, i, a, o, f) {
          if (t !== i || r !== a) {
            var c = o.push("translate(", null, e, null, n);
            f.push({
              i: c - 4,
              x: xe(t, i)
            }, {
              i: c - 2,
              x: xe(r, a)
            })
          } else
            (i || a) && o.push("translate(" + i + e + a + n)
        }(a.translateX, a.translateY, o.translateX, o.translateY, f, c),
        function (t, e, n, a) {
          t !== e ? (t - e > 180 ? e += 360 : e - t > 180 && (t += 360),
            a.push({
              i: n.push(i(n) + "rotate(", null, r) - 2,
              x: xe(t, e)
            })) : e && n.push(i(n) + "rotate(" + e + r)
        }(a.rotate, o.rotate, f, c),
        function (t, e, n, a) {
          t !== e ? a.push({
            i: n.push(i(n) + "skewX(", null, r) - 2,
            x: xe(t, e)
          }) : e && n.push(i(n) + "skewX(" + e + r)
        }(a.skewX, o.skewX, f, c),
        function (t, e, n, r, a, o) {
          if (t !== n || e !== r) {
            var f = a.push(i(a) + "scale(", null, ",", null, ")");
            o.push({
              i: f - 4,
              x: xe(t, n)
            }, {
              i: f - 2,
              x: xe(e, r)
            })
          } else
            1 === n && 1 === r || a.push(i(a) + "scale(" + n + "," + r + ")")
        }(a.scaleX, a.scaleY, o.scaleX, o.scaleY, f, c),
        a = o = null,
        function (t) {
          for (var e, n = -1, r = c.length; ++n < r;)
            f[(e = c[n]).i] = e.x(t);
          return f.join("")
        }
    }
  }

  var Oe = Ce(function (t) {
    return "none" === t ? Se : (ze || (ze = document.createElement("DIV"),
      Me = document.documentElement,
      Ae = document.defaultView),
      ze.style.transform = t,
      t = Ae.getComputedStyle(Me.appendChild(ze), null).getPropertyValue("transform"),
      Me.removeChild(ze),
      Te(+(t = t.slice(7, -1).split(","))[0], +t[1], +t[2], +t[3], +t[4], +t[5]))
  }, "px, ", "px)", "deg)")
    , Pe = Ce(function (t) {
    return null == t ? Se : (Ne || (Ne = document.createElementNS("http://www.w3.org/2000/svg", "g")),
      Ne.setAttribute("transform", t),
      (t = Ne.transform.baseVal.consolidate()) ? Te((t = t.matrix).a, t.b, t.c, t.d, t.e, t.f) : Se)
  }, ", ", ")", ")")
    , je = Math.SQRT2
    , Ie = 2
    , De = 4
    , Ue = 1e-12;

  function Le(t) {
    return ((t = Math.exp(t)) + 1 / t) / 2
  }

  function qe(t, e) {
    var n, r, i = t[0], a = t[1], o = t[2], f = e[0], c = e[1], u = e[2], s = f - i, l = c - a, h = s * s + l * l;
    if (h < Ue)
      r = Math.log(u / o) / je,
        n = function (t) {
          return [i + t * s, a + t * l, o * Math.exp(je * t * r)]
        }
      ;
    else {
      var d = Math.sqrt(h)
        , p = (u * u - o * o + De * h) / (2 * o * Ie * d)
        , b = (u * u - o * o - De * h) / (2 * u * Ie * d)
        , y = Math.log(Math.sqrt(p * p + 1) - p)
        , v = Math.log(Math.sqrt(b * b + 1) - b);
      r = (v - y) / je,
        n = function (t) {
          var e, n = t * r, f = Le(y), c = o / (Ie * d) * (f * (e = je * n + y,
          ((e = Math.exp(2 * e)) - 1) / (e + 1)) - function (t) {
            return ((t = Math.exp(t)) - 1 / t) / 2
          }(y));
          return [i + c * s, a + c * l, o * f / Le(je * n + y)]
        }
    }
    return n.duration = 1e3 * r,
      n
  }

  function Re(t) {
    return function e(n) {
      function r(e, r) {
        var i = t((e = he(e)).h, (r = he(r)).h)
          , a = ve(e.s, r.s)
          , o = ve(e.l, r.l)
          , f = ve(e.opacity, r.opacity);
        return function (t) {
          return e.h = i(t),
            e.s = a(t),
            e.l = o(Math.pow(t, n)),
            e.opacity = f(t),
          e + ""
        }
      }

      return n = +n,
        r.gamma = e,
        r
    }(1)
  }

  Re(function (t, e) {
    var n = e - t;
    return n ? be(t, n > 180 || n < -180 ? n - 360 * Math.round(n / 360) : n) : pe(isNaN(t) ? e : t)
  });
  var Fe, Be, Ve = Re(ve), Xe = 0, Ge = 0, Ye = 0, $e = 1e3, He = 0, We = 0, Qe = 0,
    Ze = "object" == typeof performance && performance.now ? performance : Date,
    Je = "object" == typeof window && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (t) {
      setTimeout(t, 17)
    }
  ;

  function Ke() {
    return We || (Je(tn),
      We = Ze.now() + Qe)
  }

  function tn() {
    We = 0
  }

  function en() {
    this._call = this._time = this._next = null
  }

  function nn(t, e, n) {
    var r = new en;
    return r.restart(t, e, n),
      r
  }

  function rn() {
    We = (He = Ze.now()) + Qe,
      Xe = Ge = 0;
    try {
      !function () {
        Ke(),
          ++Xe;
        for (var t, e = Fe; e;)
          (t = We - e._time) >= 0 && e._call.call(null, t),
            e = e._next;
        --Xe
      }()
    } finally {
      Xe = 0,
        function () {
          var t, e, n = Fe, r = 1 / 0;
          for (; n;)
            n._call ? (r > n._time && (r = n._time),
              t = n,
              n = n._next) : (e = n._next,
              n._next = null,
              n = t ? t._next = e : Fe = e);
          Be = t,
            on(r)
        }(),
        We = 0
    }
  }

  function an() {
    var t = Ze.now()
      , e = t - He;
    e > $e && (Qe -= e,
      He = t)
  }

  function on(t) {
    Xe || (Ge && (Ge = clearTimeout(Ge)),
      t - We > 24 ? (t < 1 / 0 && (Ge = setTimeout(rn, t - Ze.now() - Qe)),
      Ye && (Ye = clearInterval(Ye))) : (Ye || (He = Ze.now(),
        Ye = setInterval(an, $e)),
        Xe = 1,
        Je(rn)))
  }

  function fn(t, e, n) {
    var r = new en;
    return e = null == e ? 0 : +e,
      r.restart(function (n) {
        r.stop(),
          t(n + e)
      }, e, n),
      r
  }

  en.prototype = nn.prototype = {
    constructor: en,
    restart: function (t, e, n) {
      if ("function" != typeof t)
        throw new TypeError("callback is not a function");
      n = (null == n ? Ke() : +n) + (null == e ? 0 : +e),
      this._next || Be === this || (Be ? Be._next = this : Fe = this,
        Be = this),
        this._call = t,
        this._time = n,
        on()
    },
    stop: function () {
      this._call && (this._call = null,
        this._time = 1 / 0,
        on())
    }
  };
  var cn = rt("start", "end", "interrupt")
    , un = []
    , sn = 0
    , ln = 1
    , hn = 2
    , dn = 3
    , pn = 4
    , bn = 5
    , yn = 6;

  function vn(t, e, n, r, i, a) {
    var o = t.__transition;
    if (o) {
      if (n in o)
        return
    } else
      t.__transition = {};
    !function (t, e, n) {
      var r, i = t.__transition;

      function a(c) {
        var u, s, l, h;
        if (n.state !== ln)
          return f();
        for (u in i)
          if ((h = i[u]).name === n.name) {
            if (h.state === dn)
              return fn(a);
            h.state === pn ? (h.state = yn,
              h.timer.stop(),
              h.on.call("interrupt", t, t.__data__, h.index, h.group),
              delete i[u]) : +u < e && (h.state = yn,
              h.timer.stop(),
              delete i[u])
          }
        if (fn(function () {
          n.state === dn && (n.state = pn,
            n.timer.restart(o, n.delay, n.time),
            o(c))
        }),
          n.state = hn,
          n.on.call("start", t, t.__data__, n.index, n.group),
        n.state === hn) {
          for (n.state = dn,
                 r = new Array(l = n.tween.length),
                 u = 0,
                 s = -1; u < l; ++u)
            (h = n.tween[u].value.call(t, t.__data__, n.index, n.group)) && (r[++s] = h);
          r.length = s + 1
        }
      }

      function o(e) {
        for (var i = e < n.duration ? n.ease.call(null, e / n.duration) : (n.timer.restart(f),
          n.state = bn,
          1), a = -1, o = r.length; ++a < o;)
          r[a].call(null, i);
        n.state === bn && (n.on.call("end", t, t.__data__, n.index, n.group),
          f())
      }

      function f() {
        for (var r in n.state = yn,
          n.timer.stop(),
          delete i[e],
          i)
          return;
        delete t.__transition
      }

      i[e] = n,
        n.timer = nn(function (t) {
          n.state = ln,
            n.timer.restart(a, n.delay, n.time),
          n.delay <= t && a(t - n.delay)
        }, 0, n.time)
    }(t, n, {
      name: e,
      index: r,
      group: i,
      on: cn,
      tween: un,
      time: a.time,
      delay: a.delay,
      duration: a.duration,
      ease: a.ease,
      timer: null,
      state: sn
    })
  }

  function gn(t, e) {
    var n = mn(t, e);
    if (n.state > sn)
      throw new Error("too late; already scheduled");
    return n
  }

  function _n(t, e) {
    var n = mn(t, e);
    if (n.state > hn)
      throw new Error("too late; already started");
    return n
  }

  function mn(t, e) {
    var n = t.__transition;
    if (!n || !(n = n[e]))
      throw new Error("transition not found");
    return n
  }

  function xn(t, e) {
    var n, r, i, a = t.__transition, o = !0;
    if (a) {
      for (i in e = null == e ? null : e + "",
        a)
        (n = a[i]).name === e ? (r = n.state > hn && n.state < bn,
          n.state = yn,
          n.timer.stop(),
        r && n.on.call("interrupt", t, t.__data__, n.index, n.group),
          delete a[i]) : o = !1;
      o && delete t.__transition
    }
  }

  function wn(t, e, n) {
    var r = t._id;
    return t.each(function () {
      var t = _n(this, r);
      (t.value || (t.value = {}))[e] = n.apply(this, arguments)
    }),
      function (t) {
        return mn(t, r).value[e]
      }
  }

  function kn(t, e) {
    var n;
    return ("number" == typeof e ? xe : e instanceof Ot ? ge : (n = Ot(e)) ? (e = n,
        ge) : function (t, e) {
        var n, r, i, a = we.lastIndex = ke.lastIndex = 0, o = -1, f = [], c = [];
        for (t += "",
               e += ""; (n = we.exec(t)) && (r = ke.exec(e));)
          (i = r.index) > a && (i = e.slice(a, i),
            f[o] ? f[o] += i : f[++o] = i),
            (n = n[0]) === (r = r[0]) ? f[o] ? f[o] += r : f[++o] = r : (f[++o] = null,
              c.push({
                i: o,
                x: xe(n, r)
              })),
            a = ke.lastIndex;
        return a < e.length && (i = e.slice(a),
          f[o] ? f[o] += i : f[++o] = i),
          f.length < 2 ? c[0] ? function (t) {
            return function (e) {
              return t(e) + ""
            }
          }(c[0].x) : function (t) {
            return function () {
              return t
            }
          }(e) : (e = c.length,
              function (t) {
                for (var n, r = 0; r < e; ++r)
                  f[(n = c[r]).i] = n.x(t);
                return f.join("")
              }
          )
      }
    )(t, e)
  }

  var zn = Q.prototype.constructor;
  var Mn = 0;

  function An(t, e, n, r) {
    this._groups = t,
      this._parents = e,
      this._name = n,
      this._id = r
  }

  function Nn() {
    return ++Mn
  }

  var En = Q.prototype;
  An.prototype = function (t) {
    return Q().transition(t)
  }
    .prototype = {
    constructor: An,
    select: function (t) {
      var e = this._name
        , n = this._id;
      "function" != typeof t && (t = h(t));
      for (var r = this._groups, i = r.length, a = new Array(i), o = 0; o < i; ++o)
        for (var f, c, u = r[o], s = u.length, l = a[o] = new Array(s), d = 0; d < s; ++d)
          (f = u[d]) && (c = t.call(f, f.__data__, d, u)) && ("__data__" in f && (c.__data__ = f.__data__),
            l[d] = c,
            vn(l[d], e, n, d, l, mn(f, n)));
      return new An(a, this._parents, e, n)
    },
    selectAll: function (t) {
      var e = this._name
        , n = this._id;
      "function" != typeof t && (t = p(t));
      for (var r = this._groups, i = r.length, a = [], o = [], f = 0; f < i; ++f)
        for (var c, u = r[f], s = u.length, l = 0; l < s; ++l)
          if (c = u[l]) {
            for (var h, d = t.call(c, c.__data__, l, u), b = mn(c, n), y = 0, v = d.length; y < v; ++y)
              (h = d[y]) && vn(h, e, n, y, d, b);
            a.push(d),
              o.push(c)
          }
      return new An(a, o, e, n)
    },
    filter: function (t) {
      "function" != typeof t && (t = g(t));
      for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
        for (var a, o = e[i], f = o.length, c = r[i] = [], u = 0; u < f; ++u)
          (a = o[u]) && t.call(a, a.__data__, u, o) && c.push(a);
      return new An(r, this._parents, this._name, this._id)
    },
    merge: function (t) {
      if (t._id !== this._id)
        throw new Error;
      for (var e = this._groups, n = t._groups, r = e.length, i = n.length, a = Math.min(r, i), o = new Array(r), f = 0; f < a; ++f)
        for (var c, u = e[f], s = n[f], l = u.length, h = o[f] = new Array(l), d = 0; d < l; ++d)
          (c = u[d] || s[d]) && (h[d] = c);
      for (; f < r; ++f)
        o[f] = e[f];
      return new An(o, this._parents, this._name, this._id)
    },
    selection: function () {
      return new zn(this._groups, this._parents)
    },
    transition: function () {
      for (var t = this._name, e = this._id, n = Nn(), r = this._groups, i = r.length, a = 0; a < i; ++a)
        for (var o, f = r[a], c = f.length, u = 0; u < c; ++u)
          if (o = f[u]) {
            var s = mn(o, e);
            vn(o, t, n, u, f, {
              time: s.time + s.delay + s.duration,
              delay: 0,
              duration: s.duration,
              ease: s.ease
            })
          }
      return new An(r, this._parents, t, n)
    },
    call: En.call,
    nodes: En.nodes,
    node: En.node,
    size: En.size,
    empty: En.empty,
    each: En.each,
    on: function (t, e) {
      var n = this._id;
      return arguments.length < 2 ? mn(this.node(), n).on.on(t) : this.each(function (t, e, n) {
        var r, i, a = function (t) {
          return (t + "").trim().split(/^|\s+/).every(function (t) {
            var e = t.indexOf(".");
            return e >= 0 && (t = t.slice(0, e)),
            !t || "start" === t
          })
        }(e) ? gn : _n;
        return function () {
          var o = a(this, t)
            , f = o.on;
          f !== r && (i = (r = f).copy()).on(e, n),
            o.on = i
        }
      }(n, t, e))
    },
    attr: function (t, e) {
      var n = u(t)
        , r = "transform" === n ? Pe : kn;
      return this.attrTween(t, "function" == typeof e ? (n.local ? function (t, e, n) {
            var r, i, a;
            return function () {
              var o, f = n(this);
              if (null != f)
                return (o = this.getAttributeNS(t.space, t.local)) === f ? null : o === r && f === i ? a : a = e(r = o, i = f);
              this.removeAttributeNS(t.space, t.local)
            }
          }
          : function (t, e, n) {
            var r, i, a;
            return function () {
              var o, f = n(this);
              if (null != f)
                return (o = this.getAttribute(t)) === f ? null : o === r && f === i ? a : a = e(r = o, i = f);
              this.removeAttribute(t)
            }
          }
      )(n, r, wn(this, "attr." + t, e)) : null == e ? (n.local ? function (t) {
            return function () {
              this.removeAttributeNS(t.space, t.local)
            }
          }
          : function (t) {
            return function () {
              this.removeAttribute(t)
            }
          }
      )(n) : (n.local ? function (t, e, n) {
            var r, i;
            return function () {
              var a = this.getAttributeNS(t.space, t.local);
              return a === n ? null : a === r ? i : i = e(r = a, n)
            }
          }
          : function (t, e, n) {
            var r, i;
            return function () {
              var a = this.getAttribute(t);
              return a === n ? null : a === r ? i : i = e(r = a, n)
            }
          }
      )(n, r, e + ""))
    },
    attrTween: function (t, e) {
      var n = "attr." + t;
      if (arguments.length < 2)
        return (n = this.tween(n)) && n._value;
      if (null == e)
        return this.tween(n, null);
      if ("function" != typeof e)
        throw new Error;
      var r = u(t);
      return this.tween(n, (r.local ? function (t, e) {
            function n() {
              var n = this
                , r = e.apply(n, arguments);
              return r && function (e) {
                n.setAttributeNS(t.space, t.local, r(e))
              }
            }

            return n._value = e,
              n
          }
          : function (t, e) {
            function n() {
              var n = this
                , r = e.apply(n, arguments);
              return r && function (e) {
                n.setAttribute(t, r(e))
              }
            }

            return n._value = e,
              n
          }
      )(r, e))
    },
    style: function (t, e, n) {
      var r = "transform" == (t += "") ? Oe : kn;
      return null == e ? this.styleTween(t, function (t, e) {
        var n, r, i;
        return function () {
          var a = A(this, t)
            , o = (this.style.removeProperty(t),
            A(this, t));
          return a === o ? null : a === n && o === r ? i : i = e(n = a, r = o)
        }
      }(t, r)).on("end.style." + t, function (t) {
        return function () {
          this.style.removeProperty(t)
        }
      }(t)) : this.styleTween(t, "function" == typeof e ? function (t, e, n) {
        var r, i, a;
        return function () {
          var o = A(this, t)
            , f = n(this);
          return null == f && (this.style.removeProperty(t),
            f = A(this, t)),
            o === f ? null : o === r && f === i ? a : a = e(r = o, i = f)
        }
      }(t, r, wn(this, "style." + t, e)) : function (t, e, n) {
        var r, i;
        return function () {
          var a = A(this, t);
          return a === n ? null : a === r ? i : i = e(r = a, n)
        }
      }(t, r, e + ""), n)
    },
    styleTween: function (t, e, n) {
      var r = "style." + (t += "");
      if (arguments.length < 2)
        return (r = this.tween(r)) && r._value;
      if (null == e)
        return this.tween(r, null);
      if ("function" != typeof e)
        throw new Error;
      return this.tween(r, function (t, e, n) {
        function r() {
          var r = this
            , i = e.apply(r, arguments);
          return i && function (e) {
            r.style.setProperty(t, i(e), n)
          }
        }

        return r._value = e,
          r
      }(t, e, null == n ? "" : n))
    },
    text: function (t) {
      return this.tween("text", "function" == typeof t ? function (t) {
        return function () {
          var e = t(this);
          this.textContent = null == e ? "" : e
        }
      }(wn(this, "text", t)) : function (t) {
        return function () {
          this.textContent = t
        }
      }(null == t ? "" : t + ""))
    },
    remove: function () {
      return this.on("end.remove", (t = this._id,
          function () {
            var e = this.parentNode;
            for (var n in this.__transition)
              if (+n !== t)
                return;
            e && e.removeChild(this)
          }
      ));
      var t
    },
    tween: function (t, e) {
      var n = this._id;
      if (t += "",
      arguments.length < 2) {
        for (var r, i = mn(this.node(), n).tween, a = 0, o = i.length; a < o; ++a)
          if ((r = i[a]).name === t)
            return r.value;
        return null
      }
      return this.each((null == e ? function (t, e) {
            var n, r;
            return function () {
              var i = _n(this, t)
                , a = i.tween;
              if (a !== n)
                for (var o = 0, f = (r = n = a).length; o < f; ++o)
                  if (r[o].name === e) {
                    (r = r.slice()).splice(o, 1);
                    break
                  }
              i.tween = r
            }
          }
          : function (t, e, n) {
            var r, i;
            if ("function" != typeof n)
              throw new Error;
            return function () {
              var a = _n(this, t)
                , o = a.tween;
              if (o !== r) {
                i = (r = o).slice();
                for (var f = {
                  name: e,
                  value: n
                }, c = 0, u = i.length; c < u; ++c)
                  if (i[c].name === e) {
                    i[c] = f;
                    break
                  }
                c === u && i.push(f)
              }
              a.tween = i
            }
          }
      )(n, t, e))
    },
    delay: function (t) {
      var e = this._id;
      return arguments.length ? this.each(("function" == typeof t ? function (t, e) {
            return function () {
              gn(this, t).delay = +e.apply(this, arguments)
            }
          }
          : function (t, e) {
            return e = +e,
              function () {
                gn(this, t).delay = e
              }
          }
      )(e, t)) : mn(this.node(), e).delay
    },
    duration: function (t) {
      var e = this._id;
      return arguments.length ? this.each(("function" == typeof t ? function (t, e) {
            return function () {
              _n(this, t).duration = +e.apply(this, arguments)
            }
          }
          : function (t, e) {
            return e = +e,
              function () {
                _n(this, t).duration = e
              }
          }
      )(e, t)) : mn(this.node(), e).duration
    },
    ease: function (t) {
      var e = this._id;
      return arguments.length ? this.each(function (t, e) {
        if ("function" != typeof e)
          throw new Error;
        return function () {
          _n(this, t).ease = e
        }
      }(e, t)) : mn(this.node(), e).ease
    }
  };
  Math.PI,
    Math.PI;
  var Sn = {
    time: null,
    delay: 0,
    duration: 250,
    ease: function (t) {
      return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2
    }
  };

  function Tn(t, e) {
    for (var n; !(n = t.__transition) || !(n = n[e]);)
      if (!(t = t.parentNode))
        return Sn.time = Ke(),
          Sn;
    return n
  }

  function Cn(t) {
    return function () {
      return t
    }
  }

  function On(t, e, n) {
    this.target = t,
      this.type = e,
      this.transform = n
  }

  function Pn(t, e, n) {
    this.k = t,
      this.x = e,
      this.y = n
  }

  Q.prototype.interrupt = function (t) {
    return this.each(function () {
      xn(this, t)
    })
  }
    ,
    Q.prototype.transition = function (t) {
      var e, n;
      t instanceof An ? (e = t._id,
        t = t._name) : (e = Nn(),
        (n = Sn).time = Ke(),
        t = null == t ? null : t + "");
      for (var r = this._groups, i = r.length, a = 0; a < i; ++a)
        for (var o, f = r[a], c = f.length, u = 0; u < c; ++u)
          (o = f[u]) && vn(o, t, e, u, f, n || Tn(o, e));
      return new An(r, this._parents, t, e)
    }
    ,
    Pn.prototype = {
      constructor: Pn,
      scale: function (t) {
        return 1 === t ? this : new Pn(this.k * t, this.x, this.y)
      },
      translate: function (t, e) {
        return 0 === t & 0 === e ? this : new Pn(this.k, this.x + this.k * t, this.y + this.k * e)
      },
      apply: function (t) {
        return [t[0] * this.k + this.x, t[1] * this.k + this.y]
      },
      applyX: function (t) {
        return t * this.k + this.x
      },
      applyY: function (t) {
        return t * this.k + this.y
      },
      invert: function (t) {
        return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k]
      },
      invertX: function (t) {
        return (t - this.x) / this.k
      },
      invertY: function (t) {
        return (t - this.y) / this.k
      },
      rescaleX: function (t) {
        return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t))
      },
      rescaleY: function (t) {
        return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t))
      },
      toString: function () {
        return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")"
      }
    };
  var jn = new Pn(1, 0, 0);

  function In(t) {
    return t.__zoom || jn
  }

  function Dn() {
    F.stopImmediatePropagation()
  }

  function Un() {
    F.preventDefault(),
      F.stopImmediatePropagation()
  }

  function Ln() {
    return !F.button
  }

  function qn() {
    var t, e, n = this;
    return n instanceof SVGElement ? (t = (n = n.ownerSVGElement || n).width.baseVal.value,
      e = n.height.baseVal.value) : (t = n.clientWidth,
      e = n.clientHeight),
      [[0, 0], [t, e]]
  }

  function Rn() {
    return this.__zoom || jn
  }

  function Fn() {
    return -F.deltaY * (F.deltaMode ? 120 : 1) / 500
  }

  function Bn() {
    return "ontouchstart" in this
  }

  function Vn(t, e, n) {
    var r = t.invertX(e[0][0]) - n[0][0]
      , i = t.invertX(e[1][0]) - n[1][0]
      , a = t.invertY(e[0][1]) - n[0][1]
      , o = t.invertY(e[1][1]) - n[1][1];
    return t.translate(i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i), o > a ? (a + o) / 2 : Math.min(0, a) || Math.max(0, o))
  }

  In.prototype = Pn.prototype;
  var Xn = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

  function Gn(t) {
    return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t
  }

  function Yn(t, e) {
    return t(e = {
      exports: {}
    }, e.exports),
      e.exports
  }

  var $n = "Expected a function"
    , Hn = NaN
    , Wn = "[object Symbol]"
    , Qn = /^\s+|\s+$/g
    , Zn = /^[-+]0x[0-9a-f]+$/i
    , Jn = /^0b[01]+$/i
    , Kn = /^0o[0-7]+$/i
    , tr = parseInt
    , er = "object" == typeof Xn && Xn && Xn.Object === Object && Xn
    , nr = "object" == typeof self && self && self.Object === Object && self
    , rr = er || nr || Function("return this")()
    , ir = Object.prototype.toString
    , ar = Math.max
    , or = Math.min
    , fr = function () {
    return rr.Date.now()
  };

  function cr(t, e, n) {
    var r, i, a, o, f, c, u = 0, s = !1, l = !1, h = !0;
    if ("function" != typeof t)
      throw new TypeError($n);

    function d(e) {
      var n = r
        , a = i;
      return r = i = void 0,
        u = e,
        o = t.apply(a, n)
    }

    function p(t) {
      var n = t - c;
      return void 0 === c || n >= e || n < 0 || l && t - u >= a
    }

    function b() {
      var t = fr();
      if (p(t))
        return y(t);
      f = setTimeout(b, function (t) {
        var n = e - (t - c);
        return l ? or(n, a - (t - u)) : n
      }(t))
    }

    function y(t) {
      return f = void 0,
        h && r ? d(t) : (r = i = void 0,
          o)
    }

    function v() {
      var t = fr()
        , n = p(t);
      if (r = arguments,
        i = this,
        c = t,
        n) {
        if (void 0 === f)
          return function (t) {
            return u = t,
              f = setTimeout(b, e),
              s ? d(t) : o
          }(c);
        if (l)
          return f = setTimeout(b, e),
            d(c)
      }
      return void 0 === f && (f = setTimeout(b, e)),
        o
    }

    return e = sr(e) || 0,
    ur(n) && (s = !!n.leading,
      a = (l = "maxWait" in n) ? ar(sr(n.maxWait) || 0, e) : a,
      h = "trailing" in n ? !!n.trailing : h),
      v.cancel = function () {
        void 0 !== f && clearTimeout(f),
          u = 0,
          r = c = i = f = void 0
      }
      ,
      v.flush = function () {
        return void 0 === f ? o : y(fr())
      }
      ,
      v
  }

  function ur(t) {
    var e = typeof t;
    return !!t && ("object" == e || "function" == e)
  }

  function sr(t) {
    if ("number" == typeof t)
      return t;
    if (function (t) {
      return "symbol" == typeof t || function (t) {
        return !!t && "object" == typeof t
      }(t) && ir.call(t) == Wn
    }(t))
      return Hn;
    if (ur(t)) {
      var e = "function" == typeof t.valueOf ? t.valueOf() : t;
      t = ur(e) ? e + "" : e
    }
    if ("string" != typeof t)
      return 0 === t ? t : +t;
    t = t.replace(Qn, "");
    var n = Jn.test(t);
    return n || Kn.test(t) ? tr(t.slice(2), n ? 2 : 8) : Zn.test(t) ? Hn : +t
  }

  var lr = function (t, e, n) {
    var r = !0
      , i = !0;
    if ("function" != typeof t)
      throw new TypeError($n);
    return ur(n) && (r = "leading" in n ? !!n.leading : r,
      i = "trailing" in n ? !!n.trailing : i),
      cr(t, e, {
        leading: r,
        maxWait: e,
        trailing: i
      })
  }
    , hr = Yn(function (t, e) {
    var n = function () {
      this._tweens = {},
        this._tweensAddedDuringUpdate = {}
    };
    n.prototype = {
      getAll: function () {
        return Object.keys(this._tweens).map(function (t) {
          return this._tweens[t]
        }
          .bind(this))
      },
      removeAll: function () {
        this._tweens = {}
      },
      add: function (t) {
        this._tweens[t.getId()] = t,
          this._tweensAddedDuringUpdate[t.getId()] = t
      },
      remove: function (t) {
        delete this._tweens[t.getId()],
          delete this._tweensAddedDuringUpdate[t.getId()]
      },
      update: function (t, e) {
        var n = Object.keys(this._tweens);
        if (0 === n.length)
          return !1;
        for (t = void 0 !== t ? t : i.now(); n.length > 0;) {
          this._tweensAddedDuringUpdate = {};
          for (var r = 0; r < n.length; r++) {
            var a = this._tweens[n[r]];
            a && !1 === a.update(t) && (a._isPlaying = !1,
            e || delete this._tweens[n[r]])
          }
          n = Object.keys(this._tweensAddedDuringUpdate)
        }
        return !0
      }
    };
    var r, i = new n;
    i.Group = n,
      i._nextId = 0,
      i.nextId = function () {
        return i._nextId++
      }
      ,
      "undefined" == typeof window && "undefined" != typeof process ? i.now = function () {
          var t = process.hrtime();
          return 1e3 * t[0] + t[1] / 1e6
        }
        : "undefined" != typeof window && void 0 !== window.performance && void 0 !== window.performance.now ? i.now = window.performance.now.bind(window.performance) : void 0 !== Date.now ? i.now = Date.now : i.now = function () {
          return (new Date).getTime()
        }
      ,
      i.Tween = function (t, e) {
        this._object = t,
          this._valuesStart = {},
          this._valuesEnd = {},
          this._valuesStartRepeat = {},
          this._duration = 1e3,
          this._repeat = 0,
          this._repeatDelayTime = void 0,
          this._yoyo = !1,
          this._isPlaying = !1,
          this._reversed = !1,
          this._delayTime = 0,
          this._startTime = null,
          this._easingFunction = i.Easing.Linear.None,
          this._interpolationFunction = i.Interpolation.Linear,
          this._chainedTweens = [],
          this._onStartCallback = null,
          this._onStartCallbackFired = !1,
          this._onUpdateCallback = null,
          this._onCompleteCallback = null,
          this._onStopCallback = null,
          this._group = e || i,
          this._id = i.nextId()
      }
      ,
      i.Tween.prototype = {
        getId: function () {
          return this._id
        },
        isPlaying: function () {
          return this._isPlaying
        },
        to: function (t, e) {
          return this._valuesEnd = t,
          void 0 !== e && (this._duration = e),
            this
        },
        start: function (t) {
          for (var e in this._group.add(this),
            this._isPlaying = !0,
            this._onStartCallbackFired = !1,
            this._startTime = void 0 !== t ? "string" == typeof t ? i.now() + parseFloat(t) : t : i.now(),
            this._startTime += this._delayTime,
            this._valuesEnd) {
            if (this._valuesEnd[e] instanceof Array) {
              if (0 === this._valuesEnd[e].length)
                continue;
              this._valuesEnd[e] = [this._object[e]].concat(this._valuesEnd[e])
            }
            void 0 !== this._object[e] && (this._valuesStart[e] = this._object[e],
            this._valuesStart[e] instanceof Array == !1 && (this._valuesStart[e] *= 1),
              this._valuesStartRepeat[e] = this._valuesStart[e] || 0)
          }
          return this
        },
        stop: function () {
          return this._isPlaying ? (this._group.remove(this),
            this._isPlaying = !1,
          null !== this._onStopCallback && this._onStopCallback(this._object),
            this.stopChainedTweens(),
            this) : this
        },
        end: function () {
          return this.update(this._startTime + this._duration),
            this
        },
        stopChainedTweens: function () {
          for (var t = 0, e = this._chainedTweens.length; t < e; t++)
            this._chainedTweens[t].stop()
        },
        group: function (t) {
          return this._group = t,
            this
        },
        delay: function (t) {
          return this._delayTime = t,
            this
        },
        repeat: function (t) {
          return this._repeat = t,
            this
        },
        repeatDelay: function (t) {
          return this._repeatDelayTime = t,
            this
        },
        yoyo: function (t) {
          return this._yoyo = t,
            this
        },
        easing: function (t) {
          return this._easingFunction = t,
            this
        },
        interpolation: function (t) {
          return this._interpolationFunction = t,
            this
        },
        chain: function () {
          return this._chainedTweens = arguments,
            this
        },
        onStart: function (t) {
          return this._onStartCallback = t,
            this
        },
        onUpdate: function (t) {
          return this._onUpdateCallback = t,
            this
        },
        onComplete: function (t) {
          return this._onCompleteCallback = t,
            this
        },
        onStop: function (t) {
          return this._onStopCallback = t,
            this
        },
        update: function (t) {
          var e, n, r;
          if (t < this._startTime)
            return !0;
          for (e in !1 === this._onStartCallbackFired && (null !== this._onStartCallback && this._onStartCallback(this._object),
            this._onStartCallbackFired = !0),
            n = (t - this._startTime) / this._duration,
            n = 0 === this._duration || n > 1 ? 1 : n,
            r = this._easingFunction(n),
            this._valuesEnd)
            if (void 0 !== this._valuesStart[e]) {
              var i = this._valuesStart[e] || 0
                , a = this._valuesEnd[e];
              a instanceof Array ? this._object[e] = this._interpolationFunction(a, r) : ("string" == typeof a && (a = "+" === a.charAt(0) || "-" === a.charAt(0) ? i + parseFloat(a) : parseFloat(a)),
              "number" == typeof a && (this._object[e] = i + (a - i) * r))
            }
          if (null !== this._onUpdateCallback && this._onUpdateCallback(this._object),
          1 === n) {
            if (this._repeat > 0) {
              for (e in isFinite(this._repeat) && this._repeat--,
                this._valuesStartRepeat) {
                if ("string" == typeof this._valuesEnd[e] && (this._valuesStartRepeat[e] = this._valuesStartRepeat[e] + parseFloat(this._valuesEnd[e])),
                  this._yoyo) {
                  var o = this._valuesStartRepeat[e];
                  this._valuesStartRepeat[e] = this._valuesEnd[e],
                    this._valuesEnd[e] = o
                }
                this._valuesStart[e] = this._valuesStartRepeat[e]
              }
              return this._yoyo && (this._reversed = !this._reversed),
                void 0 !== this._repeatDelayTime ? this._startTime = t + this._repeatDelayTime : this._startTime = t + this._delayTime,
                !0
            }
            null !== this._onCompleteCallback && this._onCompleteCallback(this._object);
            for (var f = 0, c = this._chainedTweens.length; f < c; f++)
              this._chainedTweens[f].start(this._startTime + this._duration);
            return !1
          }
          return !0
        }
      },
      i.Easing = {
        Linear: {
          None: function (t) {
            return t
          }
        },
        Quadratic: {
          In: function (t) {
            return t * t
          },
          Out: function (t) {
            return t * (2 - t)
          },
          InOut: function (t) {
            return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
          }
        },
        Cubic: {
          In: function (t) {
            return t * t * t
          },
          Out: function (t) {
            return --t * t * t + 1
          },
          InOut: function (t) {
            return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
          }
        },
        Quartic: {
          In: function (t) {
            return t * t * t * t
          },
          Out: function (t) {
            return 1 - --t * t * t * t
          },
          InOut: function (t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
          }
        },
        Quintic: {
          In: function (t) {
            return t * t * t * t * t
          },
          Out: function (t) {
            return --t * t * t * t * t + 1
          },
          InOut: function (t) {
            return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
          }
        },
        Sinusoidal: {
          In: function (t) {
            return 1 - Math.cos(t * Math.PI / 2)
          },
          Out: function (t) {
            return Math.sin(t * Math.PI / 2)
          },
          InOut: function (t) {
            return .5 * (1 - Math.cos(Math.PI * t))
          }
        },
        Exponential: {
          In: function (t) {
            return 0 === t ? 0 : Math.pow(1024, t - 1)
          },
          Out: function (t) {
            return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
          },
          InOut: function (t) {
            return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
          }
        },
        Circular: {
          In: function (t) {
            return 1 - Math.sqrt(1 - t * t)
          },
          Out: function (t) {
            return Math.sqrt(1 - --t * t)
          },
          InOut: function (t) {
            return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
          }
        },
        Elastic: {
          In: function (t) {
            return 0 === t ? 0 : 1 === t ? 1 : -Math.pow(2, 10 * (t - 1)) * Math.sin(5 * (t - 1.1) * Math.PI)
          },
          Out: function (t) {
            return 0 === t ? 0 : 1 === t ? 1 : Math.pow(2, -10 * t) * Math.sin(5 * (t - .1) * Math.PI) + 1
          },
          InOut: function (t) {
            return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? -.5 * Math.pow(2, 10 * (t - 1)) * Math.sin(5 * (t - 1.1) * Math.PI) : .5 * Math.pow(2, -10 * (t - 1)) * Math.sin(5 * (t - 1.1) * Math.PI) + 1
          }
        },
        Back: {
          In: function (t) {
            var e = 1.70158;
            return t * t * ((e + 1) * t - e)
          },
          Out: function (t) {
            var e = 1.70158;
            return --t * t * ((e + 1) * t + e) + 1
          },
          InOut: function (t) {
            var e = 2.5949095;
            return (t *= 2) < 1 ? t * t * ((e + 1) * t - e) * .5 : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2)
          }
        },
        Bounce: {
          In: function (t) {
            return 1 - i.Easing.Bounce.Out(1 - t)
          },
          Out: function (t) {
            return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
          },
          InOut: function (t) {
            return t < .5 ? .5 * i.Easing.Bounce.In(2 * t) : .5 * i.Easing.Bounce.Out(2 * t - 1) + .5
          }
        }
      },
      i.Interpolation = {
        Linear: function (t, e) {
          var n = t.length - 1
            , r = n * e
            , a = Math.floor(r)
            , o = i.Interpolation.Utils.Linear;
          return e < 0 ? o(t[0], t[1], r) : e > 1 ? o(t[n], t[n - 1], n - r) : o(t[a], t[a + 1 > n ? n : a + 1], r - a)
        },
        Bezier: function (t, e) {
          for (var n = 0, r = t.length - 1, a = Math.pow, o = i.Interpolation.Utils.Bernstein, f = 0; f <= r; f++)
            n += a(1 - e, r - f) * a(e, f) * t[f] * o(r, f);
          return n
        },
        CatmullRom: function (t, e) {
          var n = t.length - 1
            , r = n * e
            , a = Math.floor(r)
            , o = i.Interpolation.Utils.CatmullRom;
          return t[0] === t[n] ? (e < 0 && (a = Math.floor(r = n * (1 + e))),
            o(t[(a - 1 + n) % n], t[a], t[(a + 1) % n], t[(a + 2) % n], r - a)) : e < 0 ? t[0] - (o(t[0], t[0], t[1], t[1], -r) - t[0]) : e > 1 ? t[n] - (o(t[n], t[n], t[n - 1], t[n - 1], r - n) - t[n]) : o(t[a ? a - 1 : 0], t[a], t[n < a + 1 ? n : a + 1], t[n < a + 2 ? n : a + 2], r - a)
        },
        Utils: {
          Linear: function (t, e, n) {
            return (e - t) * n + t
          },
          Bernstein: function (t, e) {
            var n = i.Interpolation.Utils.Factorial;
            return n(t) / n(e) / n(t - e)
          },
          Factorial: (r = [1],
              function (t) {
                var e = 1;
                if (r[t])
                  return r[t];
                for (var n = t; n > 1; n--)
                  e *= n;
                return r[t] = e,
                  e
              }
          ),
          CatmullRom: function (t, e, n, r, i) {
            var a = .5 * (n - t)
              , o = .5 * (r - e)
              , f = i * i;
            return (2 * e - 2 * n + a + o) * (i * f) + (-3 * e + 3 * n - 2 * a - o) * f + a * i + e
          }
        }
      },
      t.exports = i
  })
    , dr = Yn(function (t, e) {
    "undefined" != typeof self && self,
      t.exports = function (t) {
        var e = {};

        function n(r) {
          if (e[r])
            return e[r].exports;
          var i = e[r] = {
            i: r,
            l: !1,
            exports: {}
          };
          return t[r].call(i.exports, i, i.exports, n),
            i.l = !0,
            i.exports
        }

        return n.m = t,
          n.c = e,
          n.d = function (t, e, r) {
            n.o(t, e) || Object.defineProperty(t, e, {
              configurable: !1,
              enumerable: !0,
              get: r
            })
          }
          ,
          n.n = function (t) {
            var e = t && t.__esModule ? function () {
                return t.default
              }
              : function () {
                return t
              }
            ;
            return n.d(e, "a", e),
              e
          }
          ,
          n.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
          }
          ,
          n.p = "",
          n(n.s = 0)
      }([function (t, e, n) {
        var r, i, a, o;
        o = function (t, e, n) {
          Object.defineProperty(e, "__esModule", {
            value: !0
          }),
            e.default = function (t) {
              var e = t.stateInit
                , n = void 0 === e ? function () {
                  return {}
                }
                : e
                , r = t.props
                , f = void 0 === r ? {} : r
                , c = t.methods
                , u = void 0 === c ? {} : c
                , s = t.aliases
                , l = void 0 === s ? {} : s
                , h = t.init
                , d = void 0 === h ? function () {
                }
                : h
                , p = t.update
                , b = void 0 === p ? function () {
                }
                : p
                , y = Object.keys(f).map(function (t) {
                return new o(t, f[t])
              });
              return function () {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                  , e = Object.assign({}, n instanceof Function ? n(t) : n, {
                  initialised: !1
                });

                function r(e) {
                  return o(e, t),
                    f(),
                    r
                }

                var o = function (t, n) {
                  d.call(r, t, e, n),
                    e.initialised = !0
                }
                  , f = (0,
                  i.default)(function () {
                  e.initialised && b.call(r, e)
                }, 1);
                return y.forEach(function (t) {
                  r[t.name] = function (t) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
                      , i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function (t, e) {
                      }
                    ;
                    return function (a) {
                      return arguments.length ? (e[t] = a,
                        i.call(r, a, e),
                      n && f(),
                        r) : e[t]
                    }
                  }(t.name, t.triggerUpdate, t.onChange)
                }),
                  Object.keys(u).forEach(function (t) {
                    r[t] = function () {
                      for (var n, i = arguments.length, a = Array(i), o = 0; o < i; o++)
                        a[o] = arguments[o];
                      return (n = u[t]).call.apply(n, [r, e].concat(a))
                    }
                  }),
                  Object.entries(l).forEach(function (t) {
                    var e = a(t, 2)
                      , n = e[0]
                      , i = e[1];
                    return r[n] = r[i]
                  }),
                  r.resetProps = function () {
                    return y.forEach(function (t) {
                      r[t.name](t.defaultVal)
                    }),
                      r
                  }
                  ,
                  r.resetProps(),
                  e._rerender = f,
                  r
              }
            }
          ;
          var r, i = (r = n) && r.__esModule ? r : {
            default: r
          }, a = function (t, e) {
            if (Array.isArray(t))
              return t;
            if (Symbol.iterator in Object(t))
              return function (t, e) {
                var n = []
                  , r = !0
                  , i = !1
                  , a = void 0;
                try {
                  for (var o, f = t[Symbol.iterator](); !(r = (o = f.next()).done) && (n.push(o.value),
                  !e || n.length !== e); r = !0)
                    ;
                } catch (t) {
                  i = !0,
                    a = t
                } finally {
                  try {
                    !r && f.return && f.return()
                  } finally {
                    if (i)
                      throw a
                  }
                }
                return n
              }(t, e);
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
          }, o = function t(e, n) {
            var r = n.default
              , i = void 0 === r ? null : r
              , a = n.triggerUpdate
              , o = void 0 === a || a
              , f = n.onChange
              , c = void 0 === f ? function (t, e) {
              }
              : f;
            !function (t, e) {
              if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
            }(this, t),
              this.name = e,
              this.defaultVal = i,
              this.triggerUpdate = o,
              this.onChange = c
          };
          t.exports = e.default
        }
          ,
          i = [t, e, n(1)],
        void 0 === (a = "function" == typeof (r = o) ? r.apply(e, i) : r) || (t.exports = a)
      }
        , function (t, e) {
          t.exports = function (t, e, n) {
            var r, i, a, o, f;

            function c() {
              var u = Date.now() - o;
              u < e && u >= 0 ? r = setTimeout(c, e - u) : (r = null,
              n || (f = t.apply(a, i),
                a = i = null))
            }

            null == e && (e = 100);
            var u = function () {
              a = this,
                i = arguments,
                o = Date.now();
              var u = n && !r;
              return r || (r = setTimeout(c, e)),
              u && (f = t.apply(a, i),
                a = i = null),
                f
            };
            return u.clear = function () {
              r && (clearTimeout(r),
                r = null)
            }
              ,
              u.flush = function () {
                r && (f = t.apply(a, i),
                  a = i = null,
                  clearTimeout(r),
                  r = null)
              }
              ,
              u
          }
        }
      ])
  })
    , pr = Gn(dr)
    , br = (dr.Kapsule,
    Yn(function (t, e) {
      t.exports = function (t) {
        function e(r) {
          if (n[r])
            return n[r].exports;
          var i = n[r] = {
            i: r,
            l: !1,
            exports: {}
          };
          return t[r].call(i.exports, i, i.exports, e),
            i.l = !0,
            i.exports
        }

        var n = {};
        return e.m = t,
          e.c = n,
          e.d = function (t, n, r) {
            e.o(t, n) || Object.defineProperty(t, n, {
              configurable: !1,
              enumerable: !0,
              get: r
            })
          }
          ,
          e.n = function (t) {
            var n = t && t.__esModule ? function () {
                return t.default
              }
              : function () {
                return t
              }
            ;
            return e.d(n, "a", n),
              n
          }
          ,
          e.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
          }
          ,
          e.p = "",
          e(e.s = 0)
      }([function (t, e, n) {
        var r, i, a;
        i = [t, e],
        void 0 !== (a = "function" == typeof (r = function (t, e) {
            Object.defineProperty(e, "__esModule", {
              value: !0
            }),
              e.default = function (t) {
                return t instanceof Function ? t : "string" == typeof t ? function (e) {
                    return e[t]
                  }
                  : function (e) {
                    return t
                  }
              }
              ,
              t.exports = e.default
          }
        ) ? r.apply(e, i) : r) && (t.exports = a)
      }
      ])
    }))
    , yr = Gn(br)
    , vr = (br.accessorFn,
    Yn(function (t, e) {
      var n, r;
      t.exports = (n = function () {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1,
              r.configurable = !0,
            "value" in r && (r.writable = !0),
              Object.defineProperty(t, r.key, r)
          }
        }

        return function (e, n, r) {
          return n && t(e.prototype, n),
          r && t(e, r),
            e
        }
      }(),
        r = function (t, e) {
          return 123 * t % Math.pow(2, e)
        }
        ,
        function () {
          function t() {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 6;
            !function (t, e) {
              if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function")
            }(this, t),
              this.csBits = e,
              this.registry = ["__reserved for background__"]
          }

          return n(t, [{
            key: "register",
            value: function (t) {
              if (this.registry.length >= Math.pow(2, 24 - this.csBits))
                return null;
              var e, n = this.registry.length, i = r(n, this.csBits), a = (e = n + (i << 24 - this.csBits),
              "#" + Math.min(e, Math.pow(2, 24)).toString(16).padStart(6, "0"));
              return this.registry.push(t),
                a
            }
          }, {
            key: "lookup",
            value: function (t) {
              var e = function (t, e) {
                if (Array.isArray(t))
                  return t;
                if (Symbol.iterator in Object(t))
                  return function (t, e) {
                    var n = []
                      , r = !0
                      , i = !1
                      , a = void 0;
                    try {
                      for (var o, f = t[Symbol.iterator](); !(r = (o = f.next()).done) && (n.push(o.value),
                      !e || n.length !== e); r = !0)
                        ;
                    } catch (t) {
                      i = !0,
                        a = t
                    } finally {
                      try {
                        !r && f.return && f.return()
                      } finally {
                        if (i)
                          throw a
                      }
                    }
                    return n
                  }(t, e);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
              }(t, 3)
                , n = e[0]
                , i = e[1]
                , a = e[2]
                , o = (n << 16) + (i << 8) + a;
              if (!o)
                return null;
              var f = o & Math.pow(2, 24 - this.csBits) - 1
                , c = o >> 24 - this.csBits & Math.pow(2, this.csBits) - 1;
              return r(f, this.csBits) !== c || f >= this.registry.length ? null : this.registry[f]
            }
          }]),
            t
        }())
    }));

  function gr(t, e, n) {
    var r;

    function i() {
      var i, a, o = r.length, f = 0, c = 0, u = 0;
      for (i = 0; i < o; ++i)
        f += (a = r[i]).x || 0,
          c += a.y || 0,
          u += a.z || 0;
      for (f = f / o - t,
             c = c / o - e,
             u = u / o - n,
             i = 0; i < o; ++i)
        a = r[i],
        f && (a.x -= f),
        c && (a.y -= c),
        u && (a.z -= u)
    }

    return null == t && (t = 0),
    null == e && (e = 0),
    null == n && (n = 0),
      i.initialize = function (t) {
        r = t
      }
      ,
      i.x = function (e) {
        return arguments.length ? (t = +e,
          i) : t
      }
      ,
      i.y = function (t) {
        return arguments.length ? (e = +t,
          i) : e
      }
      ,
      i.z = function (t) {
        return arguments.length ? (n = +t,
          i) : n
      }
      ,
      i
  }

  function _r(t, e, n) {
    if (isNaN(e))
      return t;
    var r, i, a, o, f, c, u = t._root, s = {
      data: n
    }, l = t._x0, h = t._x1;
    if (!u)
      return t._root = s,
        t;
    for (; u.length;)
      if ((o = e >= (i = (l + h) / 2)) ? l = i : h = i,
        r = u,
        !(u = u[f = +o]))
        return r[f] = s,
          t;
    if (e === (a = +t._x.call(null, u.data)))
      return s.next = u,
        r ? r[f] = s : t._root = s,
        t;
    do {
      r = r ? r[f] = new Array(2) : t._root = new Array(2),
        (o = e >= (i = (l + h) / 2)) ? l = i : h = i
    } while ((f = +o) == (c = +(a >= i)));
    return r[c] = u,
      r[f] = s,
      t
  }

  function mr(t, e, n) {
    this.node = t,
      this.x0 = e,
      this.x1 = n
  }

  function xr(t) {
    return t[0]
  }

  function wr(t, e) {
    var n = new kr(null == e ? xr : e, NaN, NaN);
    return null == t ? n : n.addAll(t)
  }

  function kr(t, e, n) {
    this._x = t,
      this._x0 = e,
      this._x1 = n,
      this._root = void 0
  }

  function zr(t) {
    for (var e = {
      data: t.data
    }, n = e; t = t.next;)
      n = n.next = {
        data: t.data
      };
    return e
  }

  var Mr = wr.prototype = kr.prototype;

  function Ar(t, e, n, r) {
    if (isNaN(e) || isNaN(n))
      return t;
    var i, a, o, f, c, u, s, l, h, d = t._root, p = {
      data: r
    }, b = t._x0, y = t._y0, v = t._x1, g = t._y1;
    if (!d)
      return t._root = p,
        t;
    for (; d.length;)
      if ((u = e >= (a = (b + v) / 2)) ? b = a : v = a,
        (s = n >= (o = (y + g) / 2)) ? y = o : g = o,
        i = d,
        !(d = d[l = s << 1 | u]))
        return i[l] = p,
          t;
    if (f = +t._x.call(null, d.data),
      c = +t._y.call(null, d.data),
    e === f && n === c)
      return p.next = d,
        i ? i[l] = p : t._root = p,
        t;
    do {
      i = i ? i[l] = new Array(4) : t._root = new Array(4),
        (u = e >= (a = (b + v) / 2)) ? b = a : v = a,
        (s = n >= (o = (y + g) / 2)) ? y = o : g = o
    } while ((l = s << 1 | u) == (h = (c >= o) << 1 | f >= a));
    return i[h] = d,
      i[l] = p,
      t
  }

  function Nr(t, e, n, r, i) {
    this.node = t,
      this.x0 = e,
      this.y0 = n,
      this.x1 = r,
      this.y1 = i
  }

  function Er(t) {
    return t[0]
  }

  function Sr(t) {
    return t[1]
  }

  function Tr(t, e, n) {
    var r = new Cr(null == e ? Er : e, null == n ? Sr : n, NaN, NaN, NaN, NaN);
    return null == t ? r : r.addAll(t)
  }

  function Cr(t, e, n, r, i, a) {
    this._x = t,
      this._y = e,
      this._x0 = n,
      this._y0 = r,
      this._x1 = i,
      this._y1 = a,
      this._root = void 0
  }

  function Or(t) {
    for (var e = {
      data: t.data
    }, n = e; t = t.next;)
      n = n.next = {
        data: t.data
      };
    return e
  }

  Mr.copy = function () {
    var t, e, n = new kr(this._x, this._x0, this._x1), r = this._root;
    if (!r)
      return n;
    if (!r.length)
      return n._root = zr(r),
        n;
    for (t = [{
      source: r,
      target: n._root = new Array(2)
    }]; r = t.pop();)
      for (var i = 0; i < 2; ++i)
        (e = r.source[i]) && (e.length ? t.push({
          source: e,
          target: r.target[i] = new Array(2)
        }) : r.target[i] = zr(e));
    return n
  }
    ,
    Mr.add = function (t) {
      var e = +this._x.call(null, t);
      return _r(this.cover(e), e, t)
    }
    ,
    Mr.addAll = function (t) {
      var e, n, r = t.length, i = new Array(r), a = 1 / 0, o = -1 / 0;
      for (e = 0; e < r; ++e)
        isNaN(n = +this._x.call(null, t[e])) || (i[e] = n,
        n < a && (a = n),
        n > o && (o = n));
      for (o < a && (a = this._x0,
        o = this._x1),
             this.cover(a).cover(o),
             e = 0; e < r; ++e)
        _r(this, i[e], t[e]);
      return this
    }
    ,
    Mr.cover = function (t) {
      if (isNaN(t = +t))
        return this;
      var e = this._x0
        , n = this._x1;
      if (isNaN(e))
        n = (e = Math.floor(t)) + 1;
      else {
        if (!(e > t || t > n))
          return this;
        var r, i, a = n - e, o = this._root;
        switch (i = +(t < (e + n) / 2)) {
          case 0:
            do {
              (r = new Array(2))[i] = o,
                o = r
            } while (t > (n = e + (a *= 2)));
            break;
          case 1:
            do {
              (r = new Array(2))[i] = o,
                o = r
            } while ((e = n - (a *= 2)) > t)
        }
        this._root && this._root.length && (this._root = o)
      }
      return this._x0 = e,
        this._x1 = n,
        this
    }
    ,
    Mr.data = function () {
      var t = [];
      return this.visit(function (e) {
        if (!e.length)
          do {
            t.push(e.data)
          } while (e = e.next)
      }),
        t
    }
    ,
    Mr.extent = function (t) {
      return arguments.length ? this.cover(+t[0][0]).cover(+t[1][0]) : isNaN(this._x0) ? void 0 : [[this._x0], [this._x1]]
    }
    ,
    Mr.find = function (t, e) {
      var n, r, i, a, o, f = this._x0, c = this._x1, u = [], s = this._root;
      for (s && u.push(new mr(s, f, c)),
             null == e ? e = 1 / 0 : (f = t - e,
               c = t + e); a = u.pop();)
        if (!(!(s = a.node) || (r = a.x0) > c || (i = a.x1) < f))
          if (s.length) {
            var l = (r + i) / 2;
            u.push(new mr(s[1], l, i), new mr(s[0], r, l)),
            (o = +(t >= l)) && (a = u[u.length - 1],
              u[u.length - 1] = u[u.length - 1 - o],
              u[u.length - 1 - o] = a)
          } else {
            var h = Math.abs(t - +this._x.call(null, s.data));
            h < e && (e = h,
              f = t - h,
              c = t + h,
              n = s.data)
          }
      return n
    }
    ,
    Mr.remove = function (t) {
      if (isNaN(a = +this._x.call(null, t)))
        return this;
      var e, n, r, i, a, o, f, c, u, s = this._root, l = this._x0, h = this._x1;
      if (!s)
        return this;
      if (s.length)
        for (; ;) {
          if ((f = a >= (o = (l + h) / 2)) ? l = o : h = o,
            e = s,
            !(s = s[c = +f]))
            return this;
          if (!s.length)
            break;
          e[c + 1 & 1] && (n = e,
            u = c)
        }
      for (; s.data !== t;)
        if (r = s,
          !(s = s.next))
          return this;
      return (i = s.next) && delete s.next,
        r ? (i ? r.next = i : delete r.next,
          this) : e ? (i ? e[c] = i : delete e[c],
        (s = e[0] || e[1]) && s === (e[1] || e[0]) && !s.length && (n ? n[u] = s : this._root = s),
          this) : (this._root = i,
          this)
    }
    ,
    Mr.removeAll = function (t) {
      for (var e = 0, n = t.length; e < n; ++e)
        this.remove(t[e]);
      return this
    }
    ,
    Mr.root = function () {
      return this._root
    }
    ,
    Mr.size = function () {
      var t = 0;
      return this.visit(function (e) {
        if (!e.length)
          do {
            ++t
          } while (e = e.next)
      }),
        t
    }
    ,
    Mr.visit = function (t) {
      var e, n, r, i, a = [], o = this._root;
      for (o && a.push(new mr(o, this._x0, this._x1)); e = a.pop();)
        if (!t(o = e.node, r = e.x0, i = e.x1) && o.length) {
          var f = (r + i) / 2;
          (n = o[1]) && a.push(new mr(n, f, i)),
          (n = o[0]) && a.push(new mr(n, r, f))
        }
      return this
    }
    ,
    Mr.visitAfter = function (t) {
      var e, n = [], r = [];
      for (this._root && n.push(new mr(this._root, this._x0, this._x1)); e = n.pop();) {
        var i = e.node;
        if (i.length) {
          var a, o = e.x0, f = e.x1, c = (o + f) / 2;
          (a = i[0]) && n.push(new mr(a, o, c)),
          (a = i[1]) && n.push(new mr(a, c, f))
        }
        r.push(e)
      }
      for (; e = r.pop();)
        t(e.node, e.x0, e.x1);
      return this
    }
    ,
    Mr.x = function (t) {
      return arguments.length ? (this._x = t,
        this) : this._x
    }
  ;
  var Pr = Tr.prototype = Cr.prototype;

  function jr(t, e, n, r, i) {
    if (isNaN(e) || isNaN(n) || isNaN(r))
      return t;
    var a, o, f, c, u, s, l, h, d, p, b, y, v = t._root, g = {
      data: i
    }, _ = t._x0, m = t._y0, x = t._z0, w = t._x1, k = t._y1, z = t._z1;
    if (!v)
      return t._root = g,
        t;
    for (; v.length;)
      if ((h = e >= (o = (_ + w) / 2)) ? _ = o : w = o,
        (d = n >= (f = (m + k) / 2)) ? m = f : k = f,
        (p = r >= (c = (x + z) / 2)) ? x = c : z = c,
        a = v,
        !(v = v[b = p << 2 | d << 1 | h]))
        return a[b] = g,
          t;
    if (u = +t._x.call(null, v.data),
      s = +t._y.call(null, v.data),
      l = +t._z.call(null, v.data),
    e === u && n === s && r === l)
      return g.next = v,
        a ? a[b] = g : t._root = g,
        t;
    do {
      a = a ? a[b] = new Array(8) : t._root = new Array(8),
        (h = e >= (o = (_ + w) / 2)) ? _ = o : w = o,
        (d = n >= (f = (m + k) / 2)) ? m = f : k = f,
        (p = r >= (c = (x + z) / 2)) ? x = c : z = c
    } while ((b = p << 2 | d << 1 | h) == (y = (l >= c) << 2 | (s >= f) << 1 | u >= o));
    return a[y] = v,
      a[b] = g,
      t
  }

  function Ir(t, e, n, r, i, a, o) {
    this.node = t,
      this.x0 = e,
      this.y0 = n,
      this.z0 = r,
      this.x1 = i,
      this.y1 = a,
      this.z1 = o
  }

  function Dr(t) {
    return t[0]
  }

  function Ur(t) {
    return t[1]
  }

  function Lr(t) {
    return t[2]
  }

  function qr(t, e, n, r) {
    var i = new Rr(null == e ? Dr : e, null == n ? Ur : n, null == r ? Lr : r, NaN, NaN, NaN, NaN, NaN, NaN);
    return null == t ? i : i.addAll(t)
  }

  function Rr(t, e, n, r, i, a, o, f, c) {
    this._x = t,
      this._y = e,
      this._z = n,
      this._x0 = r,
      this._y0 = i,
      this._z0 = a,
      this._x1 = o,
      this._y1 = f,
      this._z1 = c,
      this._root = void 0
  }

  function Fr(t) {
    for (var e = {
      data: t.data
    }, n = e; t = t.next;)
      n = n.next = {
        data: t.data
      };
    return e
  }

  Pr.copy = function () {
    var t, e, n = new Cr(this._x, this._y, this._x0, this._y0, this._x1, this._y1), r = this._root;
    if (!r)
      return n;
    if (!r.length)
      return n._root = Or(r),
        n;
    for (t = [{
      source: r,
      target: n._root = new Array(4)
    }]; r = t.pop();)
      for (var i = 0; i < 4; ++i)
        (e = r.source[i]) && (e.length ? t.push({
          source: e,
          target: r.target[i] = new Array(4)
        }) : r.target[i] = Or(e));
    return n
  }
    ,
    Pr.add = function (t) {
      var e = +this._x.call(null, t)
        , n = +this._y.call(null, t);
      return Ar(this.cover(e, n), e, n, t)
    }
    ,
    Pr.addAll = function (t) {
      var e, n, r, i, a = t.length, o = new Array(a), f = new Array(a), c = 1 / 0, u = 1 / 0, s = -1 / 0, l = -1 / 0;
      for (n = 0; n < a; ++n)
        isNaN(r = +this._x.call(null, e = t[n])) || isNaN(i = +this._y.call(null, e)) || (o[n] = r,
          f[n] = i,
        r < c && (c = r),
        r > s && (s = r),
        i < u && (u = i),
        i > l && (l = i));
      for (s < c && (c = this._x0,
        s = this._x1),
           l < u && (u = this._y0,
             l = this._y1),
             this.cover(c, u).cover(s, l),
             n = 0; n < a; ++n)
        Ar(this, o[n], f[n], t[n]);
      return this
    }
    ,
    Pr.cover = function (t, e) {
      if (isNaN(t = +t) || isNaN(e = +e))
        return this;
      var n = this._x0
        , r = this._y0
        , i = this._x1
        , a = this._y1;
      if (isNaN(n))
        i = (n = Math.floor(t)) + 1,
          a = (r = Math.floor(e)) + 1;
      else {
        if (!(n > t || t > i || r > e || e > a))
          return this;
        var o, f, c = i - n, u = this._root;
        switch (f = (e < (r + a) / 2) << 1 | t < (n + i) / 2) {
          case 0:
            do {
              (o = new Array(4))[f] = u,
                u = o
            } while (a = r + (c *= 2),
            t > (i = n + c) || e > a);
            break;
          case 1:
            do {
              (o = new Array(4))[f] = u,
                u = o
            } while (a = r + (c *= 2),
            (n = i - c) > t || e > a);
            break;
          case 2:
            do {
              (o = new Array(4))[f] = u,
                u = o
            } while (r = a - (c *= 2),
            t > (i = n + c) || r > e);
            break;
          case 3:
            do {
              (o = new Array(4))[f] = u,
                u = o
            } while (r = a - (c *= 2),
            (n = i - c) > t || r > e)
        }
        this._root && this._root.length && (this._root = u)
      }
      return this._x0 = n,
        this._y0 = r,
        this._x1 = i,
        this._y1 = a,
        this
    }
    ,
    Pr.data = function () {
      var t = [];
      return this.visit(function (e) {
        if (!e.length)
          do {
            t.push(e.data)
          } while (e = e.next)
      }),
        t
    }
    ,
    Pr.extent = function (t) {
      return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0], [this._x1, this._y1]]
    }
    ,
    Pr.find = function (t, e, n) {
      var r, i, a, o, f, c, u, s = this._x0, l = this._y0, h = this._x1, d = this._y1, p = [], b = this._root;
      for (b && p.push(new Nr(b, s, l, h, d)),
             null == n ? n = 1 / 0 : (s = t - n,
               l = e - n,
               h = t + n,
               d = e + n,
               n *= n); c = p.pop();)
        if (!(!(b = c.node) || (i = c.x0) > h || (a = c.y0) > d || (o = c.x1) < s || (f = c.y1) < l))
          if (b.length) {
            var y = (i + o) / 2
              , v = (a + f) / 2;
            p.push(new Nr(b[3], y, v, o, f), new Nr(b[2], i, v, y, f), new Nr(b[1], y, a, o, v), new Nr(b[0], i, a, y, v)),
            (u = (e >= v) << 1 | t >= y) && (c = p[p.length - 1],
              p[p.length - 1] = p[p.length - 1 - u],
              p[p.length - 1 - u] = c)
          } else {
            var g = t - +this._x.call(null, b.data)
              , _ = e - +this._y.call(null, b.data)
              , m = g * g + _ * _;
            if (m < n) {
              var x = Math.sqrt(n = m);
              s = t - x,
                l = e - x,
                h = t + x,
                d = e + x,
                r = b.data
            }
          }
      return r
    }
    ,
    Pr.remove = function (t) {
      if (isNaN(a = +this._x.call(null, t)) || isNaN(o = +this._y.call(null, t)))
        return this;
      var e, n, r, i, a, o, f, c, u, s, l, h, d = this._root, p = this._x0, b = this._y0, y = this._x1, v = this._y1;
      if (!d)
        return this;
      if (d.length)
        for (; ;) {
          if ((u = a >= (f = (p + y) / 2)) ? p = f : y = f,
            (s = o >= (c = (b + v) / 2)) ? b = c : v = c,
            e = d,
            !(d = d[l = s << 1 | u]))
            return this;
          if (!d.length)
            break;
          (e[l + 1 & 3] || e[l + 2 & 3] || e[l + 3 & 3]) && (n = e,
            h = l)
        }
      for (; d.data !== t;)
        if (r = d,
          !(d = d.next))
          return this;
      return (i = d.next) && delete d.next,
        r ? (i ? r.next = i : delete r.next,
          this) : e ? (i ? e[l] = i : delete e[l],
        (d = e[0] || e[1] || e[2] || e[3]) && d === (e[3] || e[2] || e[1] || e[0]) && !d.length && (n ? n[h] = d : this._root = d),
          this) : (this._root = i,
          this)
    }
    ,
    Pr.removeAll = function (t) {
      for (var e = 0, n = t.length; e < n; ++e)
        this.remove(t[e]);
      return this
    }
    ,
    Pr.root = function () {
      return this._root
    }
    ,
    Pr.size = function () {
      var t = 0;
      return this.visit(function (e) {
        if (!e.length)
          do {
            ++t
          } while (e = e.next)
      }),
        t
    }
    ,
    Pr.visit = function (t) {
      var e, n, r, i, a, o, f = [], c = this._root;
      for (c && f.push(new Nr(c, this._x0, this._y0, this._x1, this._y1)); e = f.pop();)
        if (!t(c = e.node, r = e.x0, i = e.y0, a = e.x1, o = e.y1) && c.length) {
          var u = (r + a) / 2
            , s = (i + o) / 2;
          (n = c[3]) && f.push(new Nr(n, u, s, a, o)),
          (n = c[2]) && f.push(new Nr(n, r, s, u, o)),
          (n = c[1]) && f.push(new Nr(n, u, i, a, s)),
          (n = c[0]) && f.push(new Nr(n, r, i, u, s))
        }
      return this
    }
    ,
    Pr.visitAfter = function (t) {
      var e, n = [], r = [];
      for (this._root && n.push(new Nr(this._root, this._x0, this._y0, this._x1, this._y1)); e = n.pop();) {
        var i = e.node;
        if (i.length) {
          var a, o = e.x0, f = e.y0, c = e.x1, u = e.y1, s = (o + c) / 2, l = (f + u) / 2;
          (a = i[0]) && n.push(new Nr(a, o, f, s, l)),
          (a = i[1]) && n.push(new Nr(a, s, f, c, l)),
          (a = i[2]) && n.push(new Nr(a, o, l, s, u)),
          (a = i[3]) && n.push(new Nr(a, s, l, c, u))
        }
        r.push(e)
      }
      for (; e = r.pop();)
        t(e.node, e.x0, e.y0, e.x1, e.y1);
      return this
    }
    ,
    Pr.x = function (t) {
      return arguments.length ? (this._x = t,
        this) : this._x
    }
    ,
    Pr.y = function (t) {
      return arguments.length ? (this._y = t,
        this) : this._y
    }
  ;
  var Br = qr.prototype = Rr.prototype;

  function Vr(t) {
    return function () {
      return t
    }
  }

  function Xr() {
    return 1e-6 * (Math.random() - .5)
  }

  function Gr(t) {
    return t.index
  }

  function Yr(t, e) {
    var n = t.get(e);
    if (!n)
      throw new Error("missing: " + e);
    return n
  }

  function $r(t) {
    var e, n, r, i, a, o, f = Gr, c = function (t) {
      return 1 / Math.min(a[t.source.index], a[t.target.index])
    }, u = Vr(30), s = 1;

    function l(r) {
      for (var a = 0, f = t.length; a < s; ++a)
        for (var c, u, l, h, d, p = 0, b = 0, y = 0, v = 0; p < f; ++p)
          u = (c = t[p]).source,
            b = (l = c.target).x + l.vx - u.x - u.vx || Xr(),
          i > 1 && (y = l.y + l.vy - u.y - u.vy || Xr()),
          i > 2 && (v = l.z + l.vz - u.z - u.vz || Xr()),
            b *= h = ((h = Math.sqrt(b * b + y * y + v * v)) - n[p]) / h * r * e[p],
            y *= h,
            v *= h,
            l.vx -= b * (d = o[p]),
          i > 1 && (l.vy -= y * d),
          i > 2 && (l.vz -= v * d),
            u.vx += b * (d = 1 - d),
          i > 1 && (u.vy += y * d),
          i > 2 && (u.vz += v * d)
    }

    function h() {
      if (r) {
        var i, c, u = r.length, s = t.length, l = new Map(r.map((t, e) => [f(t, e, r), t]));
        for (i = 0,
               a = new Array(u); i < s; ++i)
          (c = t[i]).index = i,
          "object" != typeof c.source && (c.source = Yr(l, c.source)),
          "object" != typeof c.target && (c.target = Yr(l, c.target)),
            a[c.source.index] = (a[c.source.index] || 0) + 1,
            a[c.target.index] = (a[c.target.index] || 0) + 1;
        for (i = 0,
               o = new Array(s); i < s; ++i)
          c = t[i],
            o[i] = a[c.source.index] / (a[c.source.index] + a[c.target.index]);
        e = new Array(s),
          d(),
          n = new Array(s),
          p()
      }
    }

    function d() {
      if (r)
        for (var n = 0, i = t.length; n < i; ++n)
          e[n] = +c(t[n], n, t)
    }

    function p() {
      if (r)
        for (var e = 0, i = t.length; e < i; ++e)
          n[e] = +u(t[e], e, t)
    }

    return null == t && (t = []),
      l.initialize = function (t, e) {
        r = t,
          i = e,
          h()
      }
      ,
      l.links = function (e) {
        return arguments.length ? (t = e,
          h(),
          l) : t
      }
      ,
      l.id = function (t) {
        return arguments.length ? (f = t,
          l) : f
      }
      ,
      l.iterations = function (t) {
        return arguments.length ? (s = +t,
          l) : s
      }
      ,
      l.strength = function (t) {
        return arguments.length ? (c = "function" == typeof t ? t : Vr(+t),
          d(),
          l) : c
      }
      ,
      l.distance = function (t) {
        return arguments.length ? (u = "function" == typeof t ? t : Vr(+t),
          p(),
          l) : u
      }
      ,
      l
  }

  Br.copy = function () {
    var t, e, n = new Rr(this._x, this._y, this._z, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1),
      r = this._root;
    if (!r)
      return n;
    if (!r.length)
      return n._root = Fr(r),
        n;
    for (t = [{
      source: r,
      target: n._root = new Array(8)
    }]; r = t.pop();)
      for (var i = 0; i < 8; ++i)
        (e = r.source[i]) && (e.length ? t.push({
          source: e,
          target: r.target[i] = new Array(8)
        }) : r.target[i] = Fr(e));
    return n
  }
    ,
    Br.add = function (t) {
      var e = +this._x.call(null, t)
        , n = +this._y.call(null, t)
        , r = +this._z.call(null, t);
      return jr(this.cover(e, n, r), e, n, r, t)
    }
    ,
    Br.addAll = function (t) {
      var e, n, r, i, a, o = t.length, f = new Array(o), c = new Array(o), u = new Array(o), s = 1 / 0, l = 1 / 0,
        h = 1 / 0, d = -1 / 0, p = -1 / 0, b = -1 / 0;
      for (n = 0; n < o; ++n)
        isNaN(r = +this._x.call(null, e = t[n])) || isNaN(i = +this._y.call(null, e)) || isNaN(a = +this._z.call(null, e)) || (f[n] = r,
          c[n] = i,
          u[n] = a,
        r < s && (s = r),
        r > d && (d = r),
        i < l && (l = i),
        i > p && (p = i),
        a < h && (h = a),
        a > b && (b = a));
      for (d < s && (s = this._x0,
        d = this._x1),
           p < l && (l = this._y0,
             p = this._y1),
           b < h && (h = this._z0,
             b = this._z1),
             this.cover(s, l, h).cover(d, p, b),
             n = 0; n < o; ++n)
        jr(this, f[n], c[n], u[n], t[n]);
      return this
    }
    ,
    Br.cover = function (t, e, n) {
      if (isNaN(t = +t) || isNaN(e = +e) || isNaN(n = +n))
        return this;
      var r = this._x0
        , i = this._y0
        , a = this._z0
        , o = this._x1
        , f = this._y1
        , c = this._z1;
      if (isNaN(r))
        o = (r = Math.floor(t)) + 1,
          f = (i = Math.floor(e)) + 1,
          c = (a = Math.floor(n)) + 1;
      else {
        if (!(r > t || t > o || i > e || e > f || a > n || n > c))
          return this;
        var u, s, l = o - r, h = this._root;
        switch (s = (n < (a + c) / 2) << 2 | (e < (i + f) / 2) << 1 | t < (r + o) / 2) {
          case 0:
            do {
              (u = new Array(8))[s] = h,
                h = u
            } while (f = i + (l *= 2),
              c = a + l,
            t > (o = r + l) || e > f || n > c);
            break;
          case 1:
            do {
              (u = new Array(8))[s] = h,
                h = u
            } while (f = i + (l *= 2),
              c = a + l,
            (r = o - l) > t || e > f || n > c);
            break;
          case 2:
            do {
              (u = new Array(8))[s] = h,
                h = u
            } while (i = f - (l *= 2),
              c = a + l,
            t > (o = r + l) || i > e || n > c);
            break;
          case 3:
            do {
              (u = new Array(8))[s] = h,
                h = u
            } while (i = f - (l *= 2),
              c = a + l,
            (r = o - l) > t || i > e || n > c);
            break;
          case 4:
            do {
              (u = new Array(8))[s] = h,
                h = u
            } while (f = i + (l *= 2),
              a = c - l,
            t > (o = r + l) || e > f || a > n);
            break;
          case 5:
            do {
              (u = new Array(8))[s] = h,
                h = u
            } while (f = i + (l *= 2),
              a = c - l,
            (r = o - l) > t || e > f || a > n);
            break;
          case 6:
            do {
              (u = new Array(8))[s] = h,
                h = u
            } while (i = f - (l *= 2),
              a = c - l,
            t > (o = r + l) || i > e || a > n);
            break;
          case 7:
            do {
              (u = new Array(8))[s] = h,
                h = u
            } while (i = f - (l *= 2),
              a = c - l,
            (r = o - l) > t || i > e || a > n)
        }
        this._root && this._root.length && (this._root = h)
      }
      return this._x0 = r,
        this._y0 = i,
        this._z0 = a,
        this._x1 = o,
        this._y1 = f,
        this._z1 = c,
        this
    }
    ,
    Br.data = function () {
      var t = [];
      return this.visit(function (e) {
        if (!e.length)
          do {
            t.push(e.data)
          } while (e = e.next)
      }),
        t
    }
    ,
    Br.extent = function (t) {
      return arguments.length ? this.cover(+t[0][0], +t[0][1], +t[0][2]).cover(+t[1][0], +t[1][1], +t[1][2]) : isNaN(this._x0) ? void 0 : [[this._x0, this._y0, this._z0], [this._x1, this._y1, this._z1]]
    }
    ,
    Br.find = function (t, e, n, r) {
      var i, a, o, f, c, u, s, l, h, d = this._x0, p = this._y0, b = this._z0, y = this._x1, v = this._y1, g = this._z1,
        _ = [], m = this._root;
      for (m && _.push(new Ir(m, d, p, b, y, v, g)),
             null == r ? r = 1 / 0 : (d = t - r,
               p = e - r,
               b = n - r,
               y = t + r,
               v = e + r,
               g = n + r,
               r *= r); l = _.pop();)
        if (!(!(m = l.node) || (a = l.x0) > y || (o = l.y0) > v || (f = l.z0) > g || (c = l.x1) < d || (u = l.y1) < p || (s = l.z1) < b))
          if (m.length) {
            var x = (a + c) / 2
              , w = (o + u) / 2
              , k = (f + s) / 2;
            _.push(new Ir(m[7], x, w, k, c, u, s), new Ir(m[6], a, w, k, x, u, s), new Ir(m[5], x, o, k, c, w, s), new Ir(m[4], a, o, k, x, w, s), new Ir(m[3], x, w, f, c, u, k), new Ir(m[2], a, w, f, x, u, k), new Ir(m[1], x, o, f, c, w, k), new Ir(m[0], a, o, f, x, w, k)),
            (h = (n >= k) << 2 | (e >= w) << 1 | t >= x) && (l = _[_.length - 1],
              _[_.length - 1] = _[_.length - 1 - h],
              _[_.length - 1 - h] = l)
          } else {
            var z = t - +this._x.call(null, m.data)
              , M = e - +this._y.call(null, m.data)
              , A = n - +this._z.call(null, m.data)
              , N = z * z + M * M + A * A;
            if (N < r) {
              var E = Math.sqrt(r = N);
              d = t - E,
                p = e - E,
                b = n - E,
                y = t + E,
                v = e + E,
                g = n + E,
                i = m.data
            }
          }
      return i
    }
    ,
    Br.remove = function (t) {
      if (isNaN(a = +this._x.call(null, t)) || isNaN(o = +this._y.call(null, t)) || isNaN(f = +this._z.call(null, t)))
        return this;
      var e, n, r, i, a, o, f, c, u, s, l, h, d, p, b, y = this._root, v = this._x0, g = this._y0, _ = this._z0,
        m = this._x1, x = this._y1, w = this._z1;
      if (!y)
        return this;
      if (y.length)
        for (; ;) {
          if ((l = a >= (c = (v + m) / 2)) ? v = c : m = c,
            (h = o >= (u = (g + x) / 2)) ? g = u : x = u,
            (d = f >= (s = (_ + w) / 2)) ? _ = s : w = s,
            e = y,
            !(y = y[p = d << 2 | h << 1 | l]))
            return this;
          if (!y.length)
            break;
          (e[p + 1 & 7] || e[p + 2 & 7] || e[p + 3 & 7] || e[p + 4 & 7] || e[p + 5 & 7] || e[p + 6 & 7] || e[p + 7 & 7]) && (n = e,
            b = p)
        }
      for (; y.data !== t;)
        if (r = y,
          !(y = y.next))
          return this;
      return (i = y.next) && delete y.next,
        r ? (i ? r.next = i : delete r.next,
          this) : e ? (i ? e[p] = i : delete e[p],
        (y = e[0] || e[1] || e[2] || e[3] || e[4] || e[5] || e[6] || e[7]) && y === (e[7] || e[6] || e[5] || e[4] || e[3] || e[2] || e[1] || e[0]) && !y.length && (n ? n[b] = y : this._root = y),
          this) : (this._root = i,
          this)
    }
    ,
    Br.removeAll = function (t) {
      for (var e = 0, n = t.length; e < n; ++e)
        this.remove(t[e]);
      return this
    }
    ,
    Br.root = function () {
      return this._root
    }
    ,
    Br.size = function () {
      var t = 0;
      return this.visit(function (e) {
        if (!e.length)
          do {
            ++t
          } while (e = e.next)
      }),
        t
    }
    ,
    Br.visit = function (t) {
      var e, n, r, i, a, o, f, c, u = [], s = this._root;
      for (s && u.push(new Ir(s, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1)); e = u.pop();)
        if (!t(s = e.node, r = e.x0, i = e.y0, a = e.z0, o = e.x1, f = e.y1, c = e.z1) && s.length) {
          var l = (r + o) / 2
            , h = (i + f) / 2
            , d = (a + c) / 2;
          (n = s[7]) && u.push(new Ir(n, l, h, d, o, f, c)),
          (n = s[6]) && u.push(new Ir(n, r, h, d, l, f, c)),
          (n = s[5]) && u.push(new Ir(n, l, i, d, o, h, c)),
          (n = s[4]) && u.push(new Ir(n, r, i, d, l, h, c)),
          (n = s[3]) && u.push(new Ir(n, l, h, a, o, f, d)),
          (n = s[2]) && u.push(new Ir(n, r, h, a, l, f, d)),
          (n = s[1]) && u.push(new Ir(n, l, i, a, o, h, d)),
          (n = s[0]) && u.push(new Ir(n, r, i, a, l, h, d))
        }
      return this
    }
    ,
    Br.visitAfter = function (t) {
      var e, n = [], r = [];
      for (this._root && n.push(new Ir(this._root, this._x0, this._y0, this._z0, this._x1, this._y1, this._z1)); e = n.pop();) {
        var i = e.node;
        if (i.length) {
          var a, o = e.x0, f = e.y0, c = e.z0, u = e.x1, s = e.y1, l = e.z1, h = (o + u) / 2, d = (f + s) / 2,
            p = (c + l) / 2;
          (a = i[0]) && n.push(new Ir(a, o, f, c, h, d, p)),
          (a = i[1]) && n.push(new Ir(a, h, f, c, u, d, p)),
          (a = i[2]) && n.push(new Ir(a, o, d, c, h, s, p)),
          (a = i[3]) && n.push(new Ir(a, h, d, c, u, s, p)),
          (a = i[4]) && n.push(new Ir(a, o, f, p, h, d, l)),
          (a = i[5]) && n.push(new Ir(a, h, f, p, u, d, l)),
          (a = i[6]) && n.push(new Ir(a, o, d, p, h, s, l)),
          (a = i[7]) && n.push(new Ir(a, h, d, p, u, s, l))
        }
        r.push(e)
      }
      for (; e = r.pop();)
        t(e.node, e.x0, e.y0, e.z0, e.x1, e.y1, e.z1);
      return this
    }
    ,
    Br.x = function (t) {
      return arguments.length ? (this._x = t,
        this) : this._x
    }
    ,
    Br.y = function (t) {
      return arguments.length ? (this._y = t,
        this) : this._y
    }
    ,
    Br.z = function (t) {
      return arguments.length ? (this._z = t,
        this) : this._z
    }
  ;
  var Hr = 3;

  function Wr(t) {
    return t.x
  }

  function Qr(t) {
    return t.y
  }

  function Zr(t) {
    return t.z
  }

  var Jr = 10
    , Kr = Math.PI * (3 - Math.sqrt(5))
    , ti = Math.PI / 24;

  function ei(t, e) {
    e = e || 2;
    var n, r = Math.min(Hr, Math.max(1, Math.round(e))), i = 1, a = .001, o = 1 - Math.pow(a, 1 / 300), f = 0, c = .6,
      u = new Map, s = nn(h), l = rt("tick", "end");

    function h() {
      d(),
        l.call("tick", n),
      i < a && (s.stop(),
        l.call("end", n))
    }

    function d(e) {
      var a, s, l = t.length;
      void 0 === e && (e = 1);
      for (var h = 0; h < e; ++h)
        for (i += (f - i) * o,
               u.forEach(function (t) {
                 t(i)
               }),
               a = 0; a < l; ++a)
          null == (s = t[a]).fx ? s.x += s.vx *= c : (s.x = s.fx,
            s.vx = 0),
          r > 1 && (null == s.fy ? s.y += s.vy *= c : (s.y = s.fy,
            s.vy = 0)),
          r > 2 && (null == s.fz ? s.z += s.vz *= c : (s.z = s.fz,
            s.vz = 0));
      return n
    }

    function p() {
      for (var e, n = 0, i = t.length; n < i; ++n) {
        if ((e = t[n]).index = n,
        isNaN(e.fx) || (e.x = e.fx),
        isNaN(e.fy) || (e.y = e.fy),
        isNaN(e.fz) || (e.z = e.fz),
        isNaN(e.x) || r > 1 && isNaN(e.y) || r > 2 && isNaN(e.z)) {
          var a = Jr * (r > 2 ? Math.cbrt(n) : r > 1 ? Math.sqrt(n) : n)
            , o = n * Kr
            , f = n * ti;
          e.x = a * (r > 1 ? Math.cos(o) : 1),
          r > 1 && (e.y = a * Math.sin(o)),
          r > 2 && (e.z = a * Math.sin(f))
        }
        (isNaN(e.vx) || r > 1 && isNaN(e.vy) || r > 2 && isNaN(e.vz)) && (e.vx = 0,
        r > 1 && (e.vy = 0),
        r > 2 && (e.vz = 0))
      }
    }

    function b(e) {
      return e.initialize && e.initialize(t, r),
        e
    }

    return null == t && (t = []),
      p(),
      n = {
        tick: d,
        restart: function () {
          return s.restart(h),
            n
        },
        stop: function () {
          return s.stop(),
            n
        },
        numDimensions: function (t) {
          return arguments.length ? (r = Math.min(Hr, Math.max(1, Math.round(t))),
            u.forEach(b),
            n) : r
        },
        nodes: function (e) {
          return arguments.length ? (t = e,
            p(),
            u.forEach(b),
            n) : t
        },
        alpha: function (t) {
          return arguments.length ? (i = +t,
            n) : i
        },
        alphaMin: function (t) {
          return arguments.length ? (a = +t,
            n) : a
        },
        alphaDecay: function (t) {
          return arguments.length ? (o = +t,
            n) : +o
        },
        alphaTarget: function (t) {
          return arguments.length ? (f = +t,
            n) : f
        },
        velocityDecay: function (t) {
          return arguments.length ? (c = 1 - t,
            n) : 1 - c
        },
        force: function (t, e) {
          return arguments.length > 1 ? (null == e ? u.delete(t) : u.set(t, b(e)),
            n) : u.get(t)
        },
        find: function () {
          var e, n, i, a, o, f, c = Array.prototype.slice.call(arguments), u = c.shift() || 0,
            s = (r > 1 ? c.shift() : null) || 0, l = (r > 2 ? c.shift() : null) || 0, h = c.shift() || 1 / 0, d = 0,
            p = t.length;
          for (h *= h,
                 d = 0; d < p; ++d)
            (a = (e = u - (o = t[d]).x) * e + (n = s - (o.y || 0)) * n + (i = l - (o.z || 0)) * i) < h && (f = o,
              h = a);
          return f
        },
        on: function (t, e) {
          return arguments.length > 1 ? (l.on(t, e),
            n) : l.on(t)
        }
      }
  }

  function ni() {
    var t, e, n, r, i, a = Vr(-30), o = 1, f = 1 / 0, c = .81;

    function u(i) {
      var a, o = t.length,
        f = (1 === e ? wr(t, Wr) : 2 === e ? Tr(t, Wr, Qr) : 3 === e ? qr(t, Wr, Qr, Zr) : null).visitAfter(l);
      for (r = i,
             a = 0; a < o; ++a)
        n = t[a],
          f.visit(h)
    }

    function s() {
      if (t) {
        var e, n, r = t.length;
        for (i = new Array(r),
               e = 0; e < r; ++e)
          n = t[e],
            i[n.index] = +a(n, e, t)
      }
    }

    function l(t) {
      var n, r, a, o, f, c, u = 0, s = 0;
      if (t.length) {
        for (a = o = f = c = 0; c < 4; ++c)
          (n = t[c]) && (r = Math.abs(n.value)) && (u += n.value,
            s += r,
            a += r * (n.x || 0),
            o += r * (n.y || 0),
            f += r * (n.z || 0));
        t.x = a / s,
        e > 1 && (t.y = o / s),
        e > 2 && (t.z = f / s)
      } else {
        (n = t).x = n.data.x,
        e > 1 && (n.y = n.data.y),
        e > 2 && (n.z = n.data.z);
        do {
          u += i[n.data.index]
        } while (n = n.next)
      }
      t.value = u
    }

    function h(t, a, u, s, l) {
      if (!t.value)
        return !0;
      var h = [u, s, l][e - 1]
        , d = t.x - n.x
        , p = e > 1 ? t.y - n.y : 0
        , b = e > 2 ? t.z - n.z : 0
        , y = h - a
        , v = d * d + p * p + b * b;
      if (y * y / c < v)
        return v < f && (0 === d && (v += (d = Xr()) * d),
        e > 1 && 0 === p && (v += (p = Xr()) * p),
        e > 2 && 0 === b && (v += (b = Xr()) * b),
        v < o && (v = Math.sqrt(o * v)),
          n.vx += d * t.value * r / v,
        e > 1 && (n.vy += p * t.value * r / v),
        e > 2 && (n.vz += b * t.value * r / v)),
          !0;
      if (!(t.length || v >= f)) {
        (t.data !== n || t.next) && (0 === d && (v += (d = Xr()) * d),
        e > 1 && 0 === p && (v += (p = Xr()) * p),
        e > 2 && 0 === b && (v += (b = Xr()) * b),
        v < o && (v = Math.sqrt(o * v)));
        do {
          t.data !== n && (y = i[t.data.index] * r / v,
            n.vx += d * y,
          e > 1 && (n.vy += p * y),
          e > 2 && (n.vz += b * y))
        } while (t = t.next)
      }
    }

    return u.initialize = function (n, r) {
      t = n,
        e = r,
        s()
    }
      ,
      u.strength = function (t) {
        return arguments.length ? (a = "function" == typeof t ? t : Vr(+t),
          s(),
          u) : a
      }
      ,
      u.distanceMin = function (t) {
        return arguments.length ? (o = t * t,
          u) : Math.sqrt(o)
      }
      ,
      u.distanceMax = function (t) {
        return arguments.length ? (f = t * t,
          u) : Math.sqrt(f)
      }
      ,
      u.theta = function (t) {
        return arguments.length ? (c = t * t,
          u) : Math.sqrt(c)
      }
      ,
      u
  }

  var ri = Yn(function (t) {
    var e, n, r, i, a, o, f, c, u, s, l, h, d, p, b;
    e = Math.abs,
      n = Math.cos,
      r = Math.sin,
      i = Math.acos,
      a = Math.atan2,
      o = Math.sqrt,
      f = Math.pow,
      c = function (t) {
        return t < 0 ? -f(-t, 1 / 3) : f(t, 1 / 3)
      }
      ,
      u = Math.PI,
      s = 2 * u,
      l = u / 2,
      h = Number.MAX_SAFE_INTEGER || 9007199254740991,
      d = Number.MIN_SAFE_INTEGER || -9007199254740991,
      p = {
        x: 0,
        y: 0,
        z: 0
      },
      b = {
        Tvalues: [-.06405689286260563, .06405689286260563, -.1911188674736163, .1911188674736163, -.3150426796961634, .3150426796961634, -.4337935076260451, .4337935076260451, -.5454214713888396, .5454214713888396, -.6480936519369755, .6480936519369755, -.7401241915785544, .7401241915785544, -.820001985973903, .820001985973903, -.8864155270044011, .8864155270044011, -.9382745520027328, .9382745520027328, -.9747285559713095, .9747285559713095, -.9951872199970213, .9951872199970213],
        Cvalues: [.12793819534675216, .12793819534675216, .1258374563468283, .1258374563468283, .12167047292780339, .12167047292780339, .1155056680537256, .1155056680537256, .10744427011596563, .10744427011596563, .09761865210411388, .09761865210411388, .08619016153195327, .08619016153195327, .0733464814110803, .0733464814110803, .05929858491543678, .05929858491543678, .04427743881741981, .04427743881741981, .028531388628933663, .028531388628933663, .0123412297999872, .0123412297999872],
        arcfn: function (t, e) {
          var n = e(t)
            , r = n.x * n.x + n.y * n.y;
          return void 0 !== n.z && (r += n.z * n.z),
            o(r)
        },
        compute: function (t, e, n) {
          if (0 === t)
            return e[0];
          let r = e.length - 1;
          if (1 === t)
            return e[r];
          var i = e
            , a = 1 - t;
          if (0 === r)
            return e[0];
          if (1 === r)
            return h = {
              x: a * i[0].x + t * i[1].x,
              y: a * i[0].y + t * i[1].y
            },
            n && (h.z = a * i[0].z + t * i[1].z),
              h;
          if (r < 4) {
            var o, f, c, u = a * a, s = t * t, l = 0;
            2 === r ? (i = [i[0], i[1], i[2], p],
              o = u,
              f = a * t * 2,
              c = s) : 3 === r && (o = u * a,
              f = u * t * 3,
              c = a * s * 3,
              l = t * s);
            var h = {
              x: o * i[0].x + f * i[1].x + c * i[2].x + l * i[3].x,
              y: o * i[0].y + f * i[1].y + c * i[2].y + l * i[3].y
            };
            return n && (h.z = o * i[0].z + f * i[1].z + c * i[2].z + l * i[3].z),
              h
          }
          for (var d = JSON.parse(JSON.stringify(e)); d.length > 1;) {
            for (var b = 0; b < d.length - 1; b++)
              d[b] = {
                x: d[b].x + (d[b + 1].x - d[b].x) * t,
                y: d[b].y + (d[b + 1].y - d[b].y) * t
              },
              void 0 !== d[b].z && (d[b] = d[b].z + (d[b + 1].z - d[b].z) * t);
            d.splice(d.length - 1, 1)
          }
          return d[0]
        },
        derive: function (t, e) {
          for (var n = [], r = t, i = r.length, a = i - 1; i > 1; i--,
            a--) {
            for (var o, f = [], c = 0; c < a; c++)
              o = {
                x: a * (r[c + 1].x - r[c].x),
                y: a * (r[c + 1].y - r[c].y)
              },
              e && (o.z = a * (r[c + 1].z - r[c].z)),
                f.push(o);
            n.push(f),
              r = f
          }
          return n
        },
        between: function (t, e, n) {
          return e <= t && t <= n || b.approximately(t, e) || b.approximately(t, n)
        },
        approximately: function (t, n, r) {
          return e(t - n) <= (r || 1e-6)
        },
        length: function (t) {
          var e, n, r = 0, i = b.Tvalues.length;
          for (e = 0; e < i; e++)
            n = .5 * b.Tvalues[e] + .5,
              r += b.Cvalues[e] * b.arcfn(n, t);
          return .5 * r
        },
        map: function (t, e, n, r, i) {
          return r + (i - r) * ((t - e) / (n - e))
        },
        lerp: function (t, e, n) {
          var r = {
            x: e.x + t * (n.x - e.x),
            y: e.y + t * (n.y - e.y)
          };
          return e.z && n.z && (r.z = e.z + t * (n.z - e.z)),
            r
        },
        pointToString: function (t) {
          var e = t.x + "/" + t.y;
          return void 0 !== t.z && (e += "/" + t.z),
            e
        },
        pointsToString: function (t) {
          return "[" + t.map(b.pointToString).join(", ") + "]"
        },
        copy: function (t) {
          return JSON.parse(JSON.stringify(t))
        },
        angle: function (t, e, n) {
          var r = e.x - t.x
            , i = e.y - t.y
            , o = n.x - t.x
            , f = n.y - t.y;
          return a(r * f - i * o, r * o + i * f)
        },
        round: function (t, e) {
          var n = "" + t
            , r = n.indexOf(".");
          return parseFloat(n.substring(0, r + 1 + e))
        },
        dist: function (t, e) {
          var n = t.x - e.x
            , r = t.y - e.y;
          return o(n * n + r * r)
        },
        closest: function (t, e) {
          var n, r, i = f(2, 63);
          return t.forEach(function (t, a) {
            (r = b.dist(e, t)) < i && (i = r,
              n = a)
          }),
            {
              mdist: i,
              mpos: n
            }
        },
        abcratio: function (t, n) {
          if (2 !== n && 3 !== n)
            return !1;
          if (void 0 === t)
            t = .5;
          else if (0 === t || 1 === t)
            return t;
          var r = f(t, n) + f(1 - t, n);
          return e((r - 1) / r)
        },
        projectionratio: function (t, e) {
          if (2 !== e && 3 !== e)
            return !1;
          if (void 0 === t)
            t = .5;
          else if (0 === t || 1 === t)
            return t;
          var n = f(1 - t, e);
          return n / (f(t, e) + n)
        },
        lli8: function (t, e, n, r, i, a, o, f) {
          var c = (t - n) * (a - f) - (e - r) * (i - o);
          return 0 != c && {
            x: ((t * r - e * n) * (i - o) - (t - n) * (i * f - a * o)) / c,
            y: ((t * r - e * n) * (a - f) - (e - r) * (i * f - a * o)) / c
          }
        },
        lli4: function (t, e, n, r) {
          var i = t.x
            , a = t.y
            , o = e.x
            , f = e.y
            , c = n.x
            , u = n.y
            , s = r.x
            , l = r.y;
          return b.lli8(i, a, o, f, c, u, s, l)
        },
        lli: function (t, e) {
          return b.lli4(t, t.c, e, e.c)
        },
        makeline: function (t, e) {
          var n = ui
            , r = t.x
            , i = t.y
            , a = e.x
            , o = e.y
            , f = (a - r) / 3
            , c = (o - i) / 3;
          return new n(r, i, r + f, i + c, r + 2 * f, i + 2 * c, a, o)
        },
        findbbox: function (t) {
          var e = h
            , n = h
            , r = d
            , i = d;
          return t.forEach(function (t) {
            var a = t.bbox();
            e > a.x.min && (e = a.x.min),
            n > a.y.min && (n = a.y.min),
            r < a.x.max && (r = a.x.max),
            i < a.y.max && (i = a.y.max)
          }),
            {
              x: {
                min: e,
                mid: (e + r) / 2,
                max: r,
                size: r - e
              },
              y: {
                min: n,
                mid: (n + i) / 2,
                max: i,
                size: i - n
              }
            }
        },
        shapeintersections: function (t, e, n, r, i) {
          if (!b.bboxoverlap(e, r))
            return [];
          var a = []
            , o = [t.startcap, t.forward, t.back, t.endcap]
            , f = [n.startcap, n.forward, n.back, n.endcap];
          return o.forEach(function (e) {
            e.virtual || f.forEach(function (r) {
              if (!r.virtual) {
                var o = e.intersects(r, i);
                o.length > 0 && (o.c1 = e,
                  o.c2 = r,
                  o.s1 = t,
                  o.s2 = n,
                  a.push(o))
              }
            })
          }),
            a
        },
        makeshape: function (t, e, n) {
          var r = e.points.length
            , i = t.points.length
            , a = b.makeline(e.points[r - 1], t.points[0])
            , o = b.makeline(t.points[i - 1], e.points[0])
            , f = {
            startcap: a,
            forward: t,
            back: e,
            endcap: o,
            bbox: b.findbbox([a, t, e, o])
          }
            , c = b;
          return f.intersections = function (t) {
            return c.shapeintersections(f, f.bbox, t, t.bbox, n)
          }
            ,
            f
        },
        getminmax: function (t, e, n) {
          if (!n)
            return {
              min: 0,
              max: 0
            };
          var r, i, a = h, o = d;
          -1 === n.indexOf(0) && (n = [0].concat(n)),
          -1 === n.indexOf(1) && n.push(1);
          for (var f = 0, c = n.length; f < c; f++)
            r = n[f],
            (i = t.get(r))[e] < a && (a = i[e]),
            i[e] > o && (o = i[e]);
          return {
            min: a,
            mid: (a + o) / 2,
            max: o,
            size: o - a
          }
        },
        align: function (t, e) {
          var i = e.p1.x
            , o = e.p1.y
            , f = -a(e.p2.y - o, e.p2.x - i);
          return t.map(function (t) {
            return {
              x: (t.x - i) * n(f) - (t.y - o) * r(f),
              y: (t.x - i) * r(f) + (t.y - o) * n(f)
            }
          })
        },
        roots: function (t, e) {
          e = e || {
            p1: {
              x: 0,
              y: 0
            },
            p2: {
              x: 1,
              y: 0
            }
          };
          var r = t.length - 1
            , a = b.align(t, e)
            , f = function (t) {
            return 0 <= t && t <= 1
          };
          if (2 === r) {
            if (0 !== (y = (v = a[0].y) - 2 * (g = a[1].y) + (_ = a[2].y))) {
              var u = -o(g * g - v * _)
                , l = -v + g;
              return [-(u + l) / y, -(-u + l) / y].filter(f)
            }
            return g !== _ && 0 === y ? [(2 * g - _) / (2 * g - 2 * _)].filter(f) : []
          }
          var h = a[0].y
            , d = a[1].y
            , p = a[2].y
            , y = 3 * d - h - 3 * p + a[3].y
            , v = 3 * h - 6 * d + 3 * p
            , g = -3 * h + 3 * d
            , _ = h;
          if (b.approximately(y, 0)) {
            if (b.approximately(v, 0))
              return b.approximately(g, 0) ? [] : [-_ / g].filter(f);
            var m = 2 * v;
            return [((x = o(g * g - 4 * v * _)) - g) / m, (-g - x) / m].filter(f)
          }
          var x, w, k = (a = (3 * (g /= y) - (v /= y) * v) / 3) / 3,
            z = (x = (2 * v * v * v - 9 * v * g + 27 * (_ /= y)) / 27) / 2, M = z * z + k * k * k;
          if (M < 0) {
            var A = -a / 3
              , N = o(A * A * A)
              , E = -x / (2 * N)
              , S = i(E < -1 ? -1 : E > 1 ? 1 : E)
              , T = 2 * c(N);
            return [T * n(S / 3) - v / 3, T * n((S + s) / 3) - v / 3, T * n((S + 2 * s) / 3) - v / 3].filter(f)
          }
          if (0 === M)
            return [2 * (w = z < 0 ? c(-z) : -c(z)) - v / 3, -w - v / 3].filter(f);
          var C = o(M);
          return [(w = c(-z + C)) - c(z + C) - v / 3].filter(f)
        },
        droots: function (t) {
          if (3 === t.length) {
            var e = t[0]
              , n = t[1]
              , r = t[2]
              , i = e - 2 * n + r;
            if (0 !== i) {
              var a = -o(n * n - e * r)
                , f = -e + n;
              return [-(a + f) / i, -(-a + f) / i]
            }
            return n !== r && 0 === i ? [(2 * n - r) / (2 * (n - r))] : []
          }
          if (2 === t.length)
            return (e = t[0]) !== (n = t[1]) ? [e / (e - n)] : []
        },
        curvature: function (t, e, n) {
          var r, i, a = b.derive(e), c = a[0], u = a[1], s = b.compute(t, c), l = b.compute(t, u);
          return n ? (r = o(f(s.y * l.z - l.y * s.z, 2) + f(s.z * l.x - l.z * s.x, 2) + f(s.x * l.y - l.x * s.y, 2)),
            i = f(s.x * s.x + s.y * s.y + s.z * s.z, 2 / 3)) : (r = s.x * l.y - s.y * l.x,
            i = f(s.x * s.x + s.y * s.y, 2 / 3)),
            0 === r || 0 === i ? {
              k: 0,
              r: 0
            } : {
              k: r / i,
              r: i / r
            }
        },
        inflections: function (t) {
          if (t.length < 4)
            return [];
          var e = b.align(t, {
            p1: t[0],
            p2: t.slice(-1)[0]
          })
            , n = e[2].x * e[1].y
            , r = e[3].x * e[1].y
            , i = e[1].x * e[2].y
            , a = 18 * (-3 * n + 2 * r + 3 * i - (l = e[3].x * e[2].y))
            , o = 18 * (3 * n - r - 3 * i)
            , f = 18 * (i - n);
          if (b.approximately(a, 0)) {
            if (!b.approximately(o, 0)) {
              var c = -f / o;
              if (0 <= c && c <= 1)
                return [c]
            }
            return []
          }
          var u = o * o - 4 * a * f
            , s = Math.sqrt(u)
            , l = 2 * a;
          return b.approximately(l, 0) ? [] : [(s - o) / l, -(o + s) / l].filter(function (t) {
            return 0 <= t && t <= 1
          })
        },
        bboxoverlap: function (t, n) {
          var r, i, a, o, f, c = ["x", "y"], u = c.length;
          for (r = 0; r < u; r++)
            if (a = t[i = c[r]].mid,
              o = n[i].mid,
              f = (t[i].size + n[i].size) / 2,
            e(a - o) >= f)
              return !1;
          return !0
        },
        expandbox: function (t, e) {
          e.x.min < t.x.min && (t.x.min = e.x.min),
          e.y.min < t.y.min && (t.y.min = e.y.min),
          e.z && e.z.min < t.z.min && (t.z.min = e.z.min),
          e.x.max > t.x.max && (t.x.max = e.x.max),
          e.y.max > t.y.max && (t.y.max = e.y.max),
          e.z && e.z.max > t.z.max && (t.z.max = e.z.max),
            t.x.mid = (t.x.min + t.x.max) / 2,
            t.y.mid = (t.y.min + t.y.max) / 2,
          t.z && (t.z.mid = (t.z.min + t.z.max) / 2),
            t.x.size = t.x.max - t.x.min,
            t.y.size = t.y.max - t.y.min,
          t.z && (t.z.size = t.z.max - t.z.min)
        },
        pairiteration: function (t, e, n) {
          var r = t.bbox()
            , i = e.bbox()
            , a = 1e5
            , o = n || .5;
          if (r.x.size + r.y.size < o && i.x.size + i.y.size < o)
            return [(a * (t._t1 + t._t2) / 2 | 0) / a + "/" + (a * (e._t1 + e._t2) / 2 | 0) / a];
          var f = t.split(.5)
            , c = e.split(.5)
            , u = [{
            left: f.left,
            right: c.left
          }, {
            left: f.left,
            right: c.right
          }, {
            left: f.right,
            right: c.right
          }, {
            left: f.right,
            right: c.left
          }];
          u = u.filter(function (t) {
            return b.bboxoverlap(t.left.bbox(), t.right.bbox())
          });
          var s = [];
          return 0 === u.length ? s : (u.forEach(function (t) {
            s = s.concat(b.pairiteration(t.left, t.right, o))
          }),
            s = s.filter(function (t, e) {
              return s.indexOf(t) === e
            }))
        },
        getccenter: function (t, e, i) {
          var o, f = e.x - t.x, c = e.y - t.y, u = i.x - e.x, h = i.y - e.y, d = f * n(l) - c * r(l),
            p = f * r(l) + c * n(l), y = u * n(l) - h * r(l), v = u * r(l) + h * n(l), g = (t.x + e.x) / 2,
            _ = (t.y + e.y) / 2, m = (e.x + i.x) / 2, x = (e.y + i.y) / 2, w = g + d, k = _ + p, z = m + y, M = x + v,
            A = b.lli8(g, _, w, k, m, x, z, M), N = b.dist(A, t), E = a(t.y - A.y, t.x - A.x),
            S = a(e.y - A.y, e.x - A.x), T = a(i.y - A.y, i.x - A.x);
          return E < T ? ((E > S || S > T) && (E += s),
          E > T && (o = T,
            T = E,
            E = o)) : T < S && S < E ? (o = T,
            T = E,
            E = o) : T += s,
            A.s = E,
            A.e = T,
            A.r = N,
            A
        },
        numberSort: function (t, e) {
          return t - e
        }
      },
      t.exports = b
  })
    , ii = Yn(function (t) {
    var e, n;
    e = ri,
      (n = function (t) {
          this.curves = [],
            this._3d = !1,
          t && (this.curves = t,
            this._3d = this.curves[0]._3d)
        }
      ).prototype = {
        valueOf: function () {
          return this.toString()
        },
        toString: function () {
          return "[" + this.curves.map(function (t) {
            return e.pointsToString(t.points)
          }).join(", ") + "]"
        },
        addCurve: function (t) {
          this.curves.push(t),
            this._3d = this._3d || t._3d
        },
        length: function () {
          return this.curves.map(function (t) {
            return t.length()
          }).reduce(function (t, e) {
            return t + e
          })
        },
        curve: function (t) {
          return this.curves[t]
        },
        bbox: function () {
          for (var t = this.curves, n = t[0].bbox(), r = 1; r < t.length; r++)
            e.expandbox(n, t[r].bbox());
          return n
        },
        offset: function (t) {
          var e = [];
          return this.curves.forEach(function (n) {
            e = e.concat(n.offset(t))
          }),
            new n(e)
        }
      },
      t.exports = n
  });
  var ai = function (t) {
    var e, n, r, i, a, o,
      f = (t = t.replace(/,/g, " ").replace(/-/g, " - ").replace(/-\s+/g, "-").replace(/([a-zA-Z])/g, " $1 ")).replace(/([a-zA-Z])\s?/g, "|$1").split("|"),
      c = f.length, u = [], s = 0, l = 0, h = 0, d = 0, p = 0, b = 0, y = 0, v = 0, g = "";
    for (e = 1; e < c; e++)
      if (i = (r = (n = f[e]).substring(0, 1)).toLowerCase(),
        a = (u = (u = n.replace(r, "").trim().split(" ")).filter(function (t) {
          return "" !== t
        }).map(parseFloat)).length,
      "m" === i) {
        if (g += "M ",
          "m" === r ? (h += u[0],
            d += u[1]) : (h = u[0],
            d = u[1]),
          s = h,
          l = d,
          g += h + " " + d + " ",
        a > 2)
          for (o = 0; o < a; o += 2)
            "m" === r ? (h += u[o],
              d += u[o + 1]) : (h = u[o],
              d = u[o + 1]),
              g += ["L", h, d, ""].join(" ")
      } else if ("l" === i)
        for (o = 0; o < a; o += 2)
          "l" === r ? (h += u[o],
            d += u[o + 1]) : (h = u[o],
            d = u[o + 1]),
            g += ["L", h, d, ""].join(" ");
      else if ("h" === i)
        for (o = 0; o < a; o++)
          "h" === r ? h += u[o] : h = u[o],
            g += ["L", h, d, ""].join(" ");
      else if ("v" === i)
        for (o = 0; o < a; o++)
          "v" === r ? d += u[o] : d = u[o],
            g += ["L", h, d, ""].join(" ");
      else if ("q" === i)
        for (o = 0; o < a; o += 4)
          "q" === r ? (p = h + u[o],
            b = d + u[o + 1],
            h += u[o + 2],
            d += u[o + 3]) : (p = u[o],
            b = u[o + 1],
            h = u[o + 2],
            d = u[o + 3]),
            g += ["Q", p, b, h, d, ""].join(" ");
      else if ("t" === i)
        for (o = 0; o < a; o += 2)
          p = h + (h - p),
            b = d + (d - b),
            "t" === r ? (h += u[o],
              d += u[o + 1]) : (h = u[o],
              d = u[o + 1]),
            g += ["Q", p, b, h, d, ""].join(" ");
      else if ("c" === i)
        for (o = 0; o < a; o += 6)
          "c" === r ? (p = h + u[o],
            b = d + u[o + 1],
            y = h + u[o + 2],
            v = d + u[o + 3],
            h += u[o + 4],
            d += u[o + 5]) : (p = u[o],
            b = u[o + 1],
            y = u[o + 2],
            v = u[o + 3],
            h = u[o + 4],
            d = u[o + 5]),
            g += ["C", p, b, y, v, h, d, ""].join(" ");
      else if ("s" === i)
        for (o = 0; o < a; o += 4)
          p = h + (h - y),
            b = d + (d - v),
            "s" === r ? (y = h + u[o],
              v = d + u[o + 1],
              h += u[o + 2],
              d += u[o + 3]) : (y = u[o],
              v = u[o + 1],
              h = u[o + 2],
              d = u[o + 3]),
            g += ["C", p, b, y, v, h, d, ""].join(" ");
      else
        "z" === i && (g += "Z ",
          h = s,
          d = l);
    return g.trim()
  }
    , oi = {
    x: !1,
    y: !1
  };

  function fi(t, e, n) {
    if ("Z" !== e) {
      if ("M" !== e) {
        var r = [!1, oi.x, oi.y].concat(n)
          , i = new (t.bind.apply(t, r))
          , a = n.slice(-2);
        return oi = {
          x: a[0],
          y: a[1]
        },
          i
      }
      oi = {
        x: n[0],
        y: n[1]
      }
    }
  }

  var ci = function (t, e) {
    for (var n, r, i = ai(e).split(" "), a = new RegExp("[MLCQZ]", ""), o = [], f = {
      C: 6,
      Q: 4,
      L: 2,
      M: 2
    }; i.length;)
      n = i.splice(0, 1)[0],
      a.test(n) && (r = fi(t, n, i.splice(0, f[n]).map(parseFloat))) && o.push(r);
    return new t.PolyBezier(o)
  }
    , ui = Yn(function (t) {
    !function () {
      var e = Math.abs
        , n = Math.min
        , r = Math.max
        , i = Math.cos
        , a = Math.sin
        , o = Math.acos
        , f = Math.sqrt
        , c = Math.PI
        , u = {
        x: 0,
        y: 0,
        z: 0
      }
        , s = ri
        , l = ii
        , h = function (t) {
        var n = t && t.forEach ? t : [].slice.call(arguments)
          , r = !1;
        if ("object" == typeof n[0]) {
          r = n.length;
          var i = [];
          n.forEach(function (t) {
            ["x", "y", "z"].forEach(function (e) {
              void 0 !== t[e] && i.push(t[e])
            })
          }),
            n = i
        }
        var a = !1
          , o = n.length;
        if (r) {
          if (r > 4) {
            if (1 !== arguments.length)
              throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");
            a = !0
          }
        } else if (6 !== o && 8 !== o && 9 !== o && 12 !== o && 1 !== arguments.length)
          throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves");
        var f = !a && (9 === o || 12 === o) || t && t[0] && void 0 !== t[0].z;
        this._3d = f;
        for (var c = [], u = 0, l = f ? 3 : 2; u < o; u += l) {
          var h = {
            x: n[u],
            y: n[u + 1]
          };
          f && (h.z = n[u + 2]),
            c.push(h)
        }
        this.order = c.length - 1,
          this.points = c;
        var d = ["x", "y"];
        f && d.push("z"),
          this.dims = d,
          this.dimlen = d.length,
          function (t) {
            for (var n = t.order, r = t.points, i = s.align(r, {
              p1: r[0],
              p2: r[n]
            }), a = 0; a < i.length; a++)
              if (e(i[a].y) > 1e-4)
                return void (t._linear = !1);
            t._linear = !0
          }(this),
          this._t1 = 0,
          this._t2 = 1,
          this.update()
      }
        , d = ci;

      function p(t, e, n, r, i) {
        void 0 === i && (i = .5);
        var a = s.projectionratio(i, t)
          , o = 1 - a
          , f = {
          x: a * e.x + o * r.x,
          y: a * e.y + o * r.y
        }
          , c = s.abcratio(i, t);
        return {
          A: {
            x: n.x + (n.x - f.x) / c,
            y: n.y + (n.y - f.y) / c
          },
          B: n,
          C: f
        }
      }

      h.SVGtoBeziers = function (t) {
        return d(h, t)
      }
        ,
        h.quadraticFromPoints = function (t, e, n, r) {
          if (void 0 === r && (r = .5),
          0 === r)
            return new h(e, e, n);
          if (1 === r)
            return new h(t, e, e);
          var i = p(2, t, e, n, r);
          return new h(t, i.A, n)
        }
        ,
        h.cubicFromPoints = function (t, e, n, r, i) {
          void 0 === r && (r = .5);
          var a = p(3, t, e, n, r);
          void 0 === i && (i = s.dist(e, a.C));
          var o = i * (1 - r) / r
            , f = s.dist(t, n)
            , c = (n.x - t.x) / f
            , u = (n.y - t.y) / f
            , l = i * c
            , d = i * u
            , b = o * c
            , y = o * u
            , v = e.x - l
            , g = e.y - d
            , _ = e.x + b
            , m = e.y + y
            , x = a.A
            , w = x.x + (v - x.x) / (1 - r)
            , k = x.y + (g - x.y) / (1 - r)
            , z = x.x + (_ - x.x) / r
            , M = x.y + (m - x.y) / r
            , A = {
            x: t.x + (w - t.x) / r,
            y: t.y + (k - t.y) / r
          }
            , N = {
            x: n.x + (z - n.x) / (1 - r),
            y: n.y + (M - n.y) / (1 - r)
          };
          return new h(t, A, N, n)
        }
      ;
      var b = function () {
        return s
      };
      h.getUtils = b,
        h.PolyBezier = l,
        h.prototype = {
          getUtils: b,
          valueOf: function () {
            return this.toString()
          },
          toString: function () {
            return s.pointsToString(this.points)
          },
          toSVG: function (t) {
            if (this._3d)
              return !1;
            for (var e = this.points, n = ["M", e[0].x, e[0].y, 2 === this.order ? "Q" : "C"], r = 1, i = e.length; r < i; r++)
              n.push(e[r].x),
                n.push(e[r].y);
            return n.join(" ")
          },
          update: function () {
            this._lut = [],
              this.dpoints = s.derive(this.points, this._3d),
              this.computedirection()
          },
          computedirection: function () {
            var t = this.points
              , e = s.angle(t[0], t[this.order], t[1]);
            this.clockwise = e > 0
          },
          length: function () {
            return s.length(this.derivative.bind(this))
          },
          _lut: [],
          getLUT: function (t) {
            if (t = t || 100,
            this._lut.length === t)
              return this._lut;
            this._lut = [],
              t--;
            for (var e = 0; e <= t; e++)
              this._lut.push(this.compute(e / t));
            return this._lut
          },
          on: function (t, e) {
            e = e || 5;
            for (var n, r = this.getLUT(), i = [], a = 0, o = 0; o < r.length; o++)
              n = r[o],
              s.dist(n, t) < e && (i.push(n),
                a += o / r.length);
            return !!i.length && a / i.length
          },
          project: function (t) {
            var e = this.getLUT()
              , n = e.length - 1
              , r = s.closest(e, t)
              , i = r.mdist
              , a = r.mpos;
            if (0 === a || a === n) {
              var o = a / n
                , f = this.compute(o);
              return f.t = o,
                f.d = i,
                f
            }
            var c, u, l, h = (a + 1) / n, d = .1 / n;
            for (i += 1,
                   c = o = (a - 1) / n; o < h + d; o += d)
              u = this.compute(o),
              (l = s.dist(t, u)) < i && (i = l,
                c = o);
            return (u = this.compute(c)).t = c,
              u.d = i,
              u
          },
          get: function (t) {
            return this.compute(t)
          },
          point: function (t) {
            return this.points[t]
          },
          compute: function (t) {
            return s.compute(t, this.points, this._3d)
          },
          raise: function () {
            for (var t, e, n = this.points, r = [n[0]], i = n.length, a = 1; a < i; a++)
              t = n[a],
                e = n[a - 1],
                r[a] = {
                  x: (i - a) / i * t.x + a / i * e.x,
                  y: (i - a) / i * t.y + a / i * e.y
                };
            return r[i] = n[i - 1],
              new h(r)
          },
          derivative: function (t) {
            var e, n, r = 1 - t, i = 0, a = this.dpoints[0];
            2 === this.order && (a = [a[0], a[1], u],
              e = r,
              n = t),
            3 === this.order && (e = r * r,
              n = r * t * 2,
              i = t * t);
            var o = {
              x: e * a[0].x + n * a[1].x + i * a[2].x,
              y: e * a[0].y + n * a[1].y + i * a[2].y
            };
            return this._3d && (o.z = e * a[0].z + n * a[1].z + i * a[2].z),
              o
          },
          curvature: function (t) {
            return s.curvature(t, this.points, this._3d)
          },
          inflections: function () {
            return s.inflections(this.points)
          },
          normal: function (t) {
            return this._3d ? this.__normal3(t) : this.__normal2(t)
          },
          __normal2: function (t) {
            var e = this.derivative(t)
              , n = f(e.x * e.x + e.y * e.y);
            return {
              x: -e.y / n,
              y: e.x / n
            }
          },
          __normal3: function (t) {
            var e = this.derivative(t)
              , n = this.derivative(t + .01)
              , r = f(e.x * e.x + e.y * e.y + e.z * e.z)
              , i = f(n.x * n.x + n.y * n.y + n.z * n.z);
            e.x /= r,
              e.y /= r,
              e.z /= r,
              n.x /= i,
              n.y /= i,
              n.z /= i;
            var a = {
              x: n.y * e.z - n.z * e.y,
              y: n.z * e.x - n.x * e.z,
              z: n.x * e.y - n.y * e.x
            }
              , o = f(a.x * a.x + a.y * a.y + a.z * a.z);
            a.x /= o,
              a.y /= o,
              a.z /= o;
            var c = [a.x * a.x, a.x * a.y - a.z, a.x * a.z + a.y, a.x * a.y + a.z, a.y * a.y, a.y * a.z - a.x, a.x * a.z - a.y, a.y * a.z + a.x, a.z * a.z];
            return {
              x: c[0] * e.x + c[1] * e.y + c[2] * e.z,
              y: c[3] * e.x + c[4] * e.y + c[5] * e.z,
              z: c[6] * e.x + c[7] * e.y + c[8] * e.z
            }
          },
          hull: function (t) {
            var e, n = this.points, r = [], i = [], a = 0, o = 0, f = 0;
            for (i[a++] = n[0],
                   i[a++] = n[1],
                   i[a++] = n[2],
                 3 === this.order && (i[a++] = n[3]); n.length > 1;) {
              for (r = [],
                     o = 0,
                     f = n.length - 1; o < f; o++)
                e = s.lerp(t, n[o], n[o + 1]),
                  i[a++] = e,
                  r.push(e);
              n = r
            }
            return i
          },
          split: function (t, e) {
            if (0 === t && e)
              return this.split(e).left;
            if (1 === e)
              return this.split(t).right;
            var n = this.hull(t)
              , r = {
              left: 2 === this.order ? new h([n[0], n[3], n[5]]) : new h([n[0], n[4], n[7], n[9]]),
              right: 2 === this.order ? new h([n[5], n[4], n[2]]) : new h([n[9], n[8], n[6], n[3]]),
              span: n
            };
            return r.left._t1 = s.map(0, 0, 1, this._t1, this._t2),
              r.left._t2 = s.map(t, 0, 1, this._t1, this._t2),
              r.right._t1 = s.map(t, 0, 1, this._t1, this._t2),
              r.right._t2 = s.map(1, 0, 1, this._t1, this._t2),
              e ? (e = s.map(e, t, 1, 0, 1),
                r.right.split(e).left) : r
          },
          extrema: function () {
            var t, e, n = this.dims, r = {}, i = [];
            return n.forEach(function (n) {
              e = function (t) {
                return t[n]
              }
                ,
                t = this.dpoints[0].map(e),
                r[n] = s.droots(t),
              3 === this.order && (t = this.dpoints[1].map(e),
                r[n] = r[n].concat(s.droots(t))),
                r[n] = r[n].filter(function (t) {
                  return t >= 0 && t <= 1
                }),
                i = i.concat(r[n].sort(s.numberSort))
            }
              .bind(this)),
              i = i.sort(s.numberSort).filter(function (t, e) {
                return i.indexOf(t) === e
              }),
              r.values = i,
              r
          },
          bbox: function () {
            var t = this.extrema()
              , e = {};
            return this.dims.forEach(function (n) {
              e[n] = s.getminmax(this, n, t[n])
            }
              .bind(this)),
              e
          },
          overlaps: function (t) {
            var e = this.bbox()
              , n = t.bbox();
            return s.bboxoverlap(e, n)
          },
          offset: function (t, e) {
            if (void 0 !== e) {
              var n = this.get(t)
                , r = this.normal(t)
                , i = {
                c: n,
                n: r,
                x: n.x + r.x * e,
                y: n.y + r.y * e
              };
              return this._3d && (i.z = n.z + r.z * e),
                i
            }
            if (this._linear) {
              var a = this.normal(0)
                , o = this.points.map(function (e) {
                var n = {
                  x: e.x + t * a.x,
                  y: e.y + t * a.y
                };
                return e.z && r.z && (n.z = e.z + t * a.z),
                  n
              });
              return [new h(o)]
            }
            return this.reduce().map(function (e) {
              return e.scale(t)
            })
          },
          simple: function () {
            if (3 === this.order) {
              var t = s.angle(this.points[0], this.points[3], this.points[1])
                , n = s.angle(this.points[0], this.points[3], this.points[2]);
              if (t > 0 && n < 0 || t < 0 && n > 0)
                return !1
            }
            var r = this.normal(0)
              , i = this.normal(1)
              , a = r.x * i.x + r.y * i.y;
            return this._3d && (a += r.z * i.z),
            e(o(a)) < c / 3
          },
          reduce: function () {
            var t, n, r = 0, i = 0, a = [], o = [], f = this.extrema().values;
            for (-1 === f.indexOf(0) && (f = [0].concat(f)),
                 -1 === f.indexOf(1) && f.push(1),
                   r = f[0],
                   t = 1; t < f.length; t++)
              i = f[t],
                (n = this.split(r, i))._t1 = r,
                n._t2 = i,
                a.push(n),
                r = i;
            return a.forEach(function (t) {
              for (r = 0,
                     i = 0; i <= 1;)
                for (i = r + .01; i <= 1.01; i += .01)
                  if (!(n = t.split(r, i)).simple()) {
                    if (e(r - (i -= .01)) < .01)
                      return [];
                    (n = t.split(r, i))._t1 = s.map(r, 0, 1, t._t1, t._t2),
                      n._t2 = s.map(i, 0, 1, t._t1, t._t2),
                      o.push(n),
                      r = i;
                    break
                  }
              r < 1 && ((n = t.split(r, 1))._t1 = s.map(r, 0, 1, t._t1, t._t2),
                n._t2 = t._t2,
                o.push(n))
            }),
              o
          },
          scale: function (t) {
            var e = this.order
              , n = !1;
            if ("function" == typeof t && (n = t),
            n && 2 === e)
              return this.raise().scale(n);
            var r = this.clockwise
              , i = n ? n(0) : t
              , a = n ? n(1) : t
              , o = [this.offset(0, 10), this.offset(1, 10)]
              , c = s.lli4(o[0], o[0].c, o[1], o[1].c);
            if (!c)
              throw new Error("cannot scale this curve. Try reducing it first.");
            var u = this.points
              , l = [];
            return [0, 1].forEach(function (t) {
              var n = l[t * e] = s.copy(u[t * e]);
              n.x += (t ? a : i) * o[t].n.x,
                n.y += (t ? a : i) * o[t].n.y
            }
              .bind(this)),
              n ? ([0, 1].forEach(function (i) {
                if (2 !== this.order || !i) {
                  var a = u[i + 1]
                    , o = {
                    x: a.x - c.x,
                    y: a.y - c.y
                  }
                    , s = n ? n((i + 1) / e) : t;
                  n && !r && (s = -s);
                  var h = f(o.x * o.x + o.y * o.y);
                  o.x /= h,
                    o.y /= h,
                    l[i + 1] = {
                      x: a.x + s * o.x,
                      y: a.y + s * o.y
                    }
                }
              }
                .bind(this)),
                new h(l)) : ([0, 1].forEach(function (t) {
                if (2 !== this.order || !t) {
                  var n = l[t * e]
                    , r = this.derivative(t)
                    , i = {
                    x: n.x + r.x,
                    y: n.y + r.y
                  };
                  l[t + 1] = s.lli4(n, i, c, u[t + 1])
                }
              }
                .bind(this)),
                new h(l))
          },
          outline: function (t, e, n, r) {
            e = void 0 === e ? t : e;
            var i, a = this.reduce(), o = a.length, f = [], c = [], u = 0, h = this.length(),
              d = void 0 !== n && void 0 !== r;

            function p(t, e, n, r, i) {
              return function (a) {
                var o = r / n
                  , f = (r + i) / n
                  , c = e - t;
                return s.map(a, 0, 1, t + o * c, t + f * c)
              }
            }

            a.forEach(function (i) {
              w = i.length(),
                d ? (f.push(i.scale(p(t, n, h, u, w))),
                  c.push(i.scale(p(-e, -r, h, u, w)))) : (f.push(i.scale(t)),
                  c.push(i.scale(-e))),
                u += w
            }),
              c = c.map(function (t) {
                return (i = t.points)[3] ? t.points = [i[3], i[2], i[1], i[0]] : t.points = [i[2], i[1], i[0]],
                  t
              }).reverse();
            var b = f[0].points[0]
              , y = f[o - 1].points[f[o - 1].points.length - 1]
              , v = c[o - 1].points[c[o - 1].points.length - 1]
              , g = c[0].points[0]
              , _ = s.makeline(v, b)
              , m = s.makeline(y, g)
              , x = [_].concat(f).concat([m]).concat(c)
              , w = x.length;
            return new l(x)
          },
          outlineshapes: function (t, e, n) {
            e = e || t;
            for (var r = this.outline(t, e).curves, i = [], a = 1, o = r.length; a < o / 2; a++) {
              var f = s.makeshape(r[a], r[o - a], n);
              f.startcap.virtual = a > 1,
                f.endcap.virtual = a < o / 2 - 1,
                i.push(f)
            }
            return i
          },
          intersects: function (t, e) {
            return t ? t.p1 && t.p2 ? this.lineIntersects(t) : (t instanceof h && (t = t.reduce()),
              this.curveintersects(this.reduce(), t, e)) : this.selfintersects(e)
          },
          lineIntersects: function (t) {
            var e = n(t.p1.x, t.p2.x)
              , i = n(t.p1.y, t.p2.y)
              , a = r(t.p1.x, t.p2.x)
              , o = r(t.p1.y, t.p2.y)
              , f = this;
            return s.roots(this.points, t).filter(function (t) {
              var n = f.get(t);
              return s.between(n.x, e, a) && s.between(n.y, i, o)
            })
          },
          selfintersects: function (t) {
            var e, n, r, i, a = this.reduce(), o = a.length - 2, f = [];
            for (e = 0; e < o; e++)
              r = a.slice(e, e + 1),
                i = a.slice(e + 2),
                n = this.curveintersects(r, i, t),
                f = f.concat(n);
            return f
          },
          curveintersects: function (t, e, n) {
            var r = [];
            t.forEach(function (t) {
              e.forEach(function (e) {
                t.overlaps(e) && r.push({
                  left: t,
                  right: e
                })
              })
            });
            var i = [];
            return r.forEach(function (t) {
              var e = s.pairiteration(t.left, t.right, n);
              e.length > 0 && (i = i.concat(e))
            }),
              i
          },
          arcs: function (t) {
            t = t || .5;
            return this._iterate(t, [])
          },
          _error: function (t, n, r, i) {
            var a = (i - r) / 4
              , o = this.get(r + a)
              , f = this.get(i - a)
              , c = s.dist(t, n)
              , u = s.dist(t, o)
              , l = s.dist(t, f);
            return e(u - c) + e(l - c)
          },
          _iterate: function (t, e) {
            var n, r = 0, o = 1;
            do {
              n = 0,
                o = 1;
              var f, c, u, l, h, d = this.get(r), p = !1, b = !1, y = o, v = 1;
              do {
                if (b = p,
                  l = u,
                  y = (r + o) / 2,
                  f = this.get(y),
                  c = this.get(o),
                  (u = s.getccenter(d, f, c)).interval = {
                    start: r,
                    end: o
                  },
                  p = this._error(u, d, r, o) <= t,
                (h = b && !p) || (v = o),
                  p) {
                  if (o >= 1) {
                    if (u.interval.end = v = 1,
                      l = u,
                    o > 1) {
                      var g = {
                        x: u.x + u.r * i(u.e),
                        y: u.y + u.r * a(u.e)
                      };
                      u.e += s.angle({
                        x: u.x,
                        y: u.y
                      }, g, this.get(1))
                    }
                    break
                  }
                  o += (o - r) / 2
                } else
                  o = y
              } while (!h && n++ < 100);
              if (n >= 100)
                break;
              l = l || u,
                e.push(l),
                r = v
            } while (o < 1);
            return e
          }
        },
        t.exports = h
    }()
  })
    , si = ui
    , li = Yn(function (t, e) {
    "undefined" != typeof self && self,
      t.exports = function (t) {
        var e = {};

        function n(r) {
          if (e[r])
            return e[r].exports;
          var i = e[r] = {
            i: r,
            l: !1,
            exports: {}
          };
          return t[r].call(i.exports, i, i.exports, n),
            i.l = !0,
            i.exports
        }

        return n.m = t,
          n.c = e,
          n.d = function (t, e, r) {
            n.o(t, e) || Object.defineProperty(t, e, {
              configurable: !1,
              enumerable: !0,
              get: r
            })
          }
          ,
          n.n = function (t) {
            var e = t && t.__esModule ? function () {
                return t.default
              }
              : function () {
                return t
              }
            ;
            return n.d(e, "a", e),
              e
          }
          ,
          n.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
          }
          ,
          n.p = "",
          n(n.s = 0)
      }([function (t, e, n) {
        var r, i, a;
        i = [t, e],
        void 0 === (a = "function" == typeof (r = function (t, e) {
            Object.defineProperty(e, "__esModule", {
              value: !0
            }),
              e.default = function (t, e) {
                var n = !(2 < arguments.length && void 0 !== arguments[2]) || arguments[2]
                  , r = 3 < arguments.length && void 0 !== arguments[3] && arguments[3]
                  , i = (e instanceof Array ? e : [e]).map(function (t) {
                  return {
                    keyAccessor: t,
                    isProp: !(t instanceof Function)
                  }
                })
                  , a = t.reduce(function (t, e) {
                  var r = t
                    , a = e;
                  return i.forEach(function (t, e) {
                    var o = t.keyAccessor
                      , f = void 0;
                    if (t.isProp) {
                      var c = a
                        , u = c[o]
                        , s = function (t, e) {
                        var n = {};
                        for (var r in t)
                          0 <= e.indexOf(r) || Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
                        return n
                      }(c, [o]);
                      f = u,
                        a = s
                    } else
                      f = o(a);
                    e + 1 < i.length ? (r.hasOwnProperty(f) || (r[f] = {}),
                      r = r[f]) : n ? (r.hasOwnProperty(f) || (r[f] = []),
                      r[f].push(a)) : r[f] = a
                  }),
                    t
                }, {});
                n instanceof Function && function t(e) {
                  var r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 1;
                  r === i.length ? Object.keys(e).forEach(function (t) {
                    return e[t] = n(e[t])
                  }) : Object.values(e).forEach(function (e) {
                    return t(e, r + 1)
                  })
                }(a);
                var o = a;
                return r && (o = [],
                  function t(e) {
                    var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : [];
                    n.length === i.length ? o.push({
                      keys: n,
                      vals: e
                    }) : Object.entries(e).forEach(function (e) {
                      var r = function (t, e) {
                        if (Array.isArray(t))
                          return t;
                        if (Symbol.iterator in Object(t))
                          return function (t, e) {
                            var n = []
                              , r = !0
                              , i = !1
                              , a = void 0;
                            try {
                              for (var o, f = t[Symbol.iterator](); !(r = (o = f.next()).done) && (n.push(o.value),
                              !e || n.length !== e); r = !0)
                                ;
                            } catch (t) {
                              i = !0,
                                a = t
                            } finally {
                              try {
                                !r && f.return && f.return()
                              } finally {
                                if (i)
                                  throw a
                              }
                            }
                            return n
                          }(t, e);
                        throw new TypeError("Invalid attempt to destructure non-iterable instance")
                      }(e, 2)
                        , i = r[0]
                        , a = r[1];
                      return t(a, [].concat(function (t) {
                        if (Array.isArray(t)) {
                          for (var e = 0, n = Array(t.length); e < t.length; e++)
                            n[e] = t[e];
                          return n
                        }
                        return Array.from(t)
                      }(n), [i]))
                    })
                  }(a)),
                  o
              }
              ,
              t.exports = e.default
          }
        ) ? r.apply(e, i) : r) || (t.exports = a)
      }
      ])
  })
    , hi = Gn(li);
  li.indexBy;

  function di(t) {
    for (var e = t.length / 6 | 0, n = new Array(e), r = 0; r < e;)
      n[r] = "#" + t.slice(6 * r, 6 * ++r);
    return n
  }

  di("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"),
    di("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666"),
    di("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666");
  var pi = di("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");

  function bi(t) {
    return me(t[t.length - 1])
  }

  di("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2"),
    di("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc"),
    di("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999"),
    di("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3"),
    di("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f"),
    bi(new Array(3).concat("d8b365f5f5f55ab4ac", "a6611adfc27d80cdc1018571", "a6611adfc27df5f5f580cdc1018571", "8c510ad8b365f6e8c3c7eae55ab4ac01665e", "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e", "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e", "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e", "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30", "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(di)),
    bi(new Array(3).concat("af8dc3f7f7f77fbf7b", "7b3294c2a5cfa6dba0008837", "7b3294c2a5cff7f7f7a6dba0008837", "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837", "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837", "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837", "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837", "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b", "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(di)),
    bi(new Array(3).concat("e9a3c9f7f7f7a1d76a", "d01c8bf1b6dab8e1864dac26", "d01c8bf1b6daf7f7f7b8e1864dac26", "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221", "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221", "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221", "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221", "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419", "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(di)),
    bi(new Array(3).concat("998ec3f7f7f7f1a340", "5e3c99b2abd2fdb863e66101", "5e3c99b2abd2f7f7f7fdb863e66101", "542788998ec3d8daebfee0b6f1a340b35806", "542788998ec3d8daebf7f7f7fee0b6f1a340b35806", "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806", "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806", "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08", "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(di)),
    bi(new Array(3).concat("ef8a62f7f7f767a9cf", "ca0020f4a58292c5de0571b0", "ca0020f4a582f7f7f792c5de0571b0", "b2182bef8a62fddbc7d1e5f067a9cf2166ac", "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac", "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac", "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac", "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061", "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(di)),
    bi(new Array(3).concat("ef8a62ffffff999999", "ca0020f4a582bababa404040", "ca0020f4a582ffffffbababa404040", "b2182bef8a62fddbc7e0e0e09999994d4d4d", "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d", "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d", "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d", "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a", "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(di)),
    bi(new Array(3).concat("fc8d59ffffbf91bfdb", "d7191cfdae61abd9e92c7bb6", "d7191cfdae61ffffbfabd9e92c7bb6", "d73027fc8d59fee090e0f3f891bfdb4575b4", "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4", "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4", "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4", "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695", "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(di)),
    bi(new Array(3).concat("fc8d59ffffbf91cf60", "d7191cfdae61a6d96a1a9641", "d7191cfdae61ffffbfa6d96a1a9641", "d73027fc8d59fee08bd9ef8b91cf601a9850", "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850", "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850", "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850", "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837", "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(di)),
    bi(new Array(3).concat("fc8d59ffffbf99d594", "d7191cfdae61abdda42b83ba", "d7191cfdae61ffffbfabdda42b83ba", "d53e4ffc8d59fee08be6f59899d5943288bd", "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd", "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd", "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd", "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2", "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(di)),
    bi(new Array(3).concat("e5f5f999d8c92ca25f", "edf8fbb2e2e266c2a4238b45", "edf8fbb2e2e266c2a42ca25f006d2c", "edf8fbccece699d8c966c2a42ca25f006d2c", "edf8fbccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(di)),
    bi(new Array(3).concat("e0ecf49ebcda8856a7", "edf8fbb3cde38c96c688419d", "edf8fbb3cde38c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(di)),
    bi(new Array(3).concat("e0f3dba8ddb543a2ca", "f0f9e8bae4bc7bccc42b8cbe", "f0f9e8bae4bc7bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(di)),
    bi(new Array(3).concat("fee8c8fdbb84e34a33", "fef0d9fdcc8afc8d59d7301f", "fef0d9fdcc8afc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(di)),
    bi(new Array(3).concat("ece2f0a6bddb1c9099", "f6eff7bdc9e167a9cf02818a", "f6eff7bdc9e167a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(di)),
    bi(new Array(3).concat("ece7f2a6bddb2b8cbe", "f1eef6bdc9e174a9cf0570b0", "f1eef6bdc9e174a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(di)),
    bi(new Array(3).concat("e7e1efc994c7dd1c77", "f1eef6d7b5d8df65b0ce1256", "f1eef6d7b5d8df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(di)),
    bi(new Array(3).concat("fde0ddfa9fb5c51b8a", "feebe2fbb4b9f768a1ae017e", "feebe2fbb4b9f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(di)),
    bi(new Array(3).concat("edf8b17fcdbb2c7fb8", "ffffcca1dab441b6c4225ea8", "ffffcca1dab441b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(di)),
    bi(new Array(3).concat("f7fcb9addd8e31a354", "ffffccc2e69978c679238443", "ffffccc2e69978c67931a354006837", "ffffccd9f0a3addd8e78c67931a354006837", "ffffccd9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(di)),
    bi(new Array(3).concat("fff7bcfec44fd95f0e", "ffffd4fed98efe9929cc4c02", "ffffd4fed98efe9929d95f0e993404", "ffffd4fee391fec44ffe9929d95f0e993404", "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(di)),
    bi(new Array(3).concat("ffeda0feb24cf03b20", "ffffb2fecc5cfd8d3ce31a1c", "ffffb2fecc5cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(di)),
    bi(new Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(di)),
    bi(new Array(3).concat("e5f5e0a1d99b31a354", "edf8e9bae4b374c476238b45", "edf8e9bae4b374c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(di)),
    bi(new Array(3).concat("f0f0f0bdbdbd636363", "f7f7f7cccccc969696525252", "f7f7f7cccccc969696636363252525", "f7f7f7d9d9d9bdbdbd969696636363252525", "f7f7f7d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(di)),
    bi(new Array(3).concat("efedf5bcbddc756bb1", "f2f0f7cbc9e29e9ac86a51a3", "f2f0f7cbc9e29e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(di)),
    bi(new Array(3).concat("fee0d2fc9272de2d26", "fee5d9fcae91fb6a4acb181d", "fee5d9fcae91fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(di)),
    bi(new Array(3).concat("fee6cefdae6be6550d", "feeddefdbe85fd8d3cd94701", "feeddefdbe85fd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(di)),
    Ve(he(300, .5, 0), he(-240, .5, 1));
  Ve(he(-100, .75, .35), he(80, 1.5, .8)),
    Ve(he(260, .75, .35), he(80, 1.5, .8)),
    he(),
    Dt(),
    Math.PI,
    Math.PI;

  function yi(t) {
    var e = t.length;
    return function (n) {
      return t[Math.max(0, Math.min(e - 1, Math.floor(n * e)))]
    }
  }

  yi(di("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
  yi(di("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")),
    yi(di("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")),
    yi(di("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));

  function vi(t, e, n) {
    if (e && "string" == typeof n) {
      var r = pi
        , i = t.filter(function (t) {
        return !t[n]
      })
        , a = {};
      i.forEach(function (t) {
        a[e(t)] = null
      }),
        Object.keys(a).forEach(function (t, e) {
          a[t] = e
        }),
        i.forEach(function (t) {
          t[n] = r[a[e(t)] % r.length]
        })
    }
  }

  var gi = pr({
    props: {
      graphData: {
        default: {
          nodes: [],
          links: []
        },
        onChange: function (t, e) {
          e.engineRunning = !1
        }
      },
      dagMode: {},
      dagLevelDistance: {},
      nodeRelSize: {
        default: 4,
        triggerUpdate: !1
      },
      nodeId: {
        default: "id"
      },
      nodeVal: {
        default: "val",
        triggerUpdate: !1
      },
      nodeColor: {
        default: "color",
        triggerUpdate: !1
      },
      nodeAutoColorBy: {},
      nodeCanvasObject: {
        triggerUpdate: !1
      },
      linkSource: {
        default: "source"
      },
      linkTarget: {
        default: "target"
      },
      linkVisibility: {
        default: !0,
        triggerUpdate: !1
      },
      linkColor: {
        default: "color",
        triggerUpdate: !1
      },
      linkAutoColorBy: {},
      linkWidth: {
        default: 1,
        triggerUpdate: !1
      },
      linkCurvature: {
        default: 0,
        triggerUpdate: !1
      },
      linkDirectionalArrowLength: {
        default: 0,
        triggerUpdate: !1
      },
      linkDirectionalArrowColor: {
        triggerUpdate: !1
      },
      linkDirectionalArrowRelPos: {
        default: .5,
        triggerUpdate: !1
      },
      linkDirectionalParticles: {
        default: 0
      },
      linkDirectionalParticleSpeed: {
        default: .01,
        triggerUpdate: !1
      },
      linkDirectionalParticleWidth: {
        default: 4,
        triggerUpdate: !1
      },
      linkDirectionalParticleColor: {
        triggerUpdate: !1
      },
      globalScale: {
        default: 1,
        triggerUpdate: !1
      },
      d3AlphaDecay: {
        default: .0228,
        triggerUpdate: !1,
        onChange: function (t, e) {
          e.forceLayout.alphaDecay(t)
        }
      },
      d3AlphaTarget: {
        default: 0,
        triggerUpdate: !1,
        onChange: function (t, e) {
          e.forceLayout.alphaTarget(t)
        }
      },
      d3VelocityDecay: {
        default: .4,
        triggerUpdate: !1,
        onChange: function (t, e) {
          e.forceLayout.velocityDecay(t)
        }
      },
      warmupTicks: {
        default: 0,
        triggerUpdate: !1
      },
      cooldownTicks: {
        default: 1 / 0,
        triggerUpdate: !1
      },
      cooldownTime: {
        default: 15e3,
        triggerUpdate: !1
      },
      onLoading: {
        default: function () {
        },
        triggerUpdate: !1
      },
      onFinishLoading: {
        default: function () {
        },
        triggerUpdate: !1
      },
      onEngineTick: {
        default: function () {
        },
        triggerUpdate: !1
      },
      onEngineStop: {
        default: function () {
        },
        triggerUpdate: !1
      },
      isShadow: {
        default: !1,
        triggerUpdate: !1
      }
    },
    methods: {
      d3Force: function (t, e, n) {
        return void 0 === n ? t.forceLayout.force(e) : (t.forceLayout.force(e, n),
          this)
      },
      resetCountdown: function (t) {
        return t.cntTicks = 0,
          t.startTickTime = new Date,
          t.engineRunning = !0,
          this
      },
      tickFrame: function (t) {
        var e, n, r, f, c, u;
        return t.engineRunning && (++t.cntTicks > t.cooldownTicks || new Date - t.startTickTime > t.cooldownTime ? (t.engineRunning = !1,
          t.onEngineStop()) : (t.forceLayout.tick(),
          t.onEngineTick())),
          function () {
            var e = yr(t.linkVisibility)
              , n = yr(t.linkColor)
              , r = yr(t.linkWidth)
              , i = yr(t.linkCurvature)
              , o = t.ctx
              , f = 2 * t.isShadow;
            o.save();
            var c = t.graphData.links.filter(e)
              , u = hi(c, [n, r]);
            Object.entries(u).forEach(function (e) {
              var n = a(e, 2)
                , r = n[0]
                , c = n[1]
                , u = r && "undefined" !== r ? r : "rgba(0,0,0,0.15)";
              Object.entries(c).forEach(function (e) {
                var n = a(e, 2)
                  , r = n[0]
                  , c = n[1]
                  , s = (r || 1) / t.globalScale + f;
                o.beginPath(),
                  c.forEach(function (t) {
                    var e = t.source
                      , n = t.target;
                    if (e.hasOwnProperty("x") && n.hasOwnProperty("x")) {
                      var r = i(t);
                      if (o.moveTo(e.x, e.y),
                        !r)
                        return o.lineTo(n.x, n.y),
                          void (t.__controlPoints = null);
                      var a = Math.sqrt(Math.pow(n.x - e.x, 2) + Math.pow(n.y - e.y, 2));
                      if (a > 0) {
                        var f = Math.atan2(n.y - e.y, n.x - e.x)
                          , c = a * r
                          , u = {
                          x: (e.x + n.x) / 2 + c * Math.cos(f - Math.PI / 2),
                          y: (e.y + n.y) / 2 + c * Math.sin(f - Math.PI / 2)
                        };
                        o.quadraticCurveTo(u.x, u.y, n.x, n.y),
                          t.__controlPoints = [u.x, u.y]
                      } else {
                        var s = 70 * r
                          , l = [n.x, n.y - s, n.x + s, n.y];
                        o.bezierCurveTo.apply(o, l.concat([n.x, n.y])),
                          t.__controlPoints = l
                      }
                    }
                  }),
                  o.strokeStyle = u,
                  o.lineWidth = s,
                  o.stroke()
              })
            }),
              o.restore()
          }(),
          e = yr(t.linkDirectionalArrowLength),
          n = yr(t.linkDirectionalArrowRelPos),
          r = yr(t.linkVisibility),
          f = yr(t.linkDirectionalArrowColor || t.linkColor),
          c = yr(t.nodeVal),
          (u = t.ctx).save(),
          t.graphData.links.filter(r).forEach(function (r) {
            var a = e(r);
            if (a && !(a < 0)) {
              var s = r.source
                , l = r.target;
              if (s.hasOwnProperty("x") && l.hasOwnProperty("x")) {
                var h = Math.sqrt(Math.max(0, c(s) || 1)) * t.nodeRelSize
                  , d = Math.sqrt(Math.max(0, c(l) || 1)) * t.nodeRelSize
                  , p = Math.min(1, Math.max(0, n(r)))
                  , b = f(r) || "rgba(0,0,0,0.28)"
                  , y = a / 1.6 / 2
                  , v = r.__controlPoints && i(si, [s.x, s.y].concat(o(r.__controlPoints), [l.x, l.y]))
                  , g = v ? function (t) {
                    return v.get(t)
                  }
                  : function (t) {
                    return {
                      x: s.x + (l.x - s.x) * t || 0,
                      y: s.y + (l.y - s.y) * t || 0
                    }
                  }
                  , _ = v ? v.length() : Math.sqrt(Math.pow(l.x - s.x, 2) + Math.pow(l.y - s.y, 2))
                  , m = h + a + (_ - h - d - a) * p
                  , x = g(m / _)
                  , w = g((m - a) / _)
                  , k = g((m - .8 * a) / _)
                  , z = Math.atan2(x.y - w.y, x.x - w.x) - Math.PI / 2;
                u.beginPath(),
                  u.moveTo(x.x, x.y),
                  u.lineTo(w.x + y * Math.cos(z), w.y + y * Math.sin(z)),
                  u.lineTo(k.x, k.y),
                  u.lineTo(w.x - y * Math.cos(z), w.y - y * Math.sin(z)),
                  u.fillStyle = b,
                  u.fill()
              }
            }
          }),
          u.restore(),
          function () {
            var e = yr(t.linkDirectionalParticles)
              , n = yr(t.linkDirectionalParticleSpeed)
              , r = yr(t.linkDirectionalParticleWidth)
              , a = yr(t.linkVisibility)
              , f = yr(t.linkDirectionalParticleColor || t.linkColor)
              , c = t.ctx;
            c.save(),
              t.graphData.links.filter(a).forEach(function (a) {
                if (e(a)) {
                  var u = a.source
                    , s = a.target;
                  if (u.hasOwnProperty("x") && s.hasOwnProperty("x")) {
                    var l = n(a)
                      , h = a.__photons || []
                      , d = Math.max(0, r(a) / 2) / Math.sqrt(t.globalScale)
                      , p = f(a) || "rgba(0,0,0,0.28)";
                    c.fillStyle = p;
                    var b = a.__controlPoints ? i(si, [u.x, u.y].concat(o(a.__controlPoints), [s.x, s.y])) : null;
                    h.forEach(function (t, e) {
                      var n = t.__progressRatio = ((t.__progressRatio || e / h.length) + l) % 1
                        , r = b ? b.get(n) : {
                        x: u.x + (s.x - u.x) * n || 0,
                        y: u.y + (s.y - u.y) * n || 0
                      };
                      c.beginPath(),
                        c.arc(r.x, r.y, d, 0, 2 * Math.PI, !1),
                        c.fill()
                    })
                  }
                }
              }),
              c.restore()
          }(),
          function () {
            var e = yr(t.nodeVal)
              , n = yr(t.nodeColor)
              , r = t.ctx
              , i = t.isShadow / t.globalScale;
            r.save(),
              t.graphData.nodes.forEach(function (a) {
                if (t.nodeCanvasObject)
                  t.nodeCanvasObject(a, t.ctx, t.globalScale);
                else {
                  var o = Math.sqrt(Math.max(0, e(a) || 1)) * t.nodeRelSize + i;
                  r.beginPath(),
                    r.arc(a.x, a.y, o, 0, 2 * Math.PI, !1),
                    r.fillStyle = n(a) || "rgba(31, 120, 180, 0.92)",
                    r.fill()
                }
              }),
              r.restore()
          }(),
          this
      }
    },
    stateInit: function () {
      return {
        forceLayout: ei().force("link", $r()).force("charge", ni()).force("center", gr()).force("dagRadial", null).stop(),
        engineRunning: !1
      }
    },
    init: function (t, e) {
      e.ctx = t
    },
    update: function (e) {
      e.engineRunning = !1,
        e.onLoading(),
      null !== e.nodeAutoColorBy && vi(e.graphData.nodes, yr(e.nodeAutoColorBy), e.nodeColor),
      null !== e.linkAutoColorBy && vi(e.graphData.links, yr(e.linkAutoColorBy), e.linkColor),
        e.graphData.links.forEach(function (t) {
          t.source = t[e.linkSource],
            t.target = t[e.linkTarget]
        });
      var n = yr(e.linkDirectionalParticles);
      e.graphData.links.forEach(function (t) {
        var e = Math.round(Math.abs(n(t)));
        e && (t.__photons = o(Array(e)).map(function () {
          return {}
        }))
      }),
        e.forceLayout.stop().alpha(1).nodes(e.graphData.nodes);
      var r = e.forceLayout.force("link");
      r && r.id(function (t) {
        return t[e.nodeId]
      }).links(e.graphData.links);
      var i, a, f, c, u, s = e.dagMode && (i = e.graphData,
          a = function (t) {
            return t[e.nodeId]
          }
          ,
          f = i.nodes,
          c = i.links,
          u = {},
          f.forEach(function (t) {
            return u[a(t)] = {
              data: t,
              out: [],
              depth: -1
            }
          }),
          c.forEach(function (e) {
            var n = e.source
              , r = e.target
              , i = s(n)
              , o = s(r);
            if (!u.hasOwnProperty(i))
              throw "Missing source node with id: ".concat(i);
            if (!u.hasOwnProperty(o))
              throw "Missing target node with id: ".concat(o);
            var f = u[i]
              , c = u[o];

            function s(e) {
              return "object" === t(e) ? a(e) : e
            }

            f.out.push(c)
          }),
          function t(e) {
            for (var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], r = n.length, i = 0, f = e.length; i < f; i++) {
              var c = e[i];
              if (-1 !== n.indexOf(c))
                throw "Invalid DAG structure! Found cycle from node ".concat(a(n[n.length - 1].data), " to ").concat(a(c.data));
              r > c.depth && (c.depth = r,
                t(c.out, [].concat(o(n), [c])))
            }
          }(Object.values(u)),
          Object.keys(u).forEach(function (t) {
            return u[t] = u[t].depth
          }),
          u), l = Math.max.apply(Math, o(Object.values(s || []))),
        h = e.dagLevelDistance || e.graphData.nodes.length / (l || 1) * 2 * (-1 !== ["radialin", "radialout"].indexOf(e.dagMode) ? .7 : 1);
      if (e.dagMode) {
        var d = function (t, n) {
          return function (r) {
            return t ? (s[r[e.nodeId]] - l / 2) * h * (n ? -1 : 1) : void 0
          }
        }
          , p = d(-1 !== ["lr", "rl"].indexOf(e.dagMode), "rl" === e.dagMode)
          , b = d(-1 !== ["td", "bu"].indexOf(e.dagMode), "bu" === e.dagMode);
        e.graphData.nodes.forEach(function (t) {
          t.fx = p(t),
            t.fy = b(t)
        })
      }
      e.forceLayout.force("dagRadial", -1 !== ["radialin", "radialout"].indexOf(e.dagMode) ? function (t, e, n, r) {
        var i, a, o, f, c = Vr(.1);

        function u(t) {
          for (var c = 0, u = i.length; c < u; ++c) {
            var s = i[c]
              , l = s.x - e || 1e-6
              , h = (s.y || 0) - n || 1e-6
              , d = (s.z || 0) - r || 1e-6
              , p = Math.sqrt(l * l + h * h + d * d)
              , b = (f[c] - p) * o[c] * t / p;
            s.vx += l * b,
            a > 1 && (s.vy += h * b),
            a > 2 && (s.vz += d * b)
          }
        }

        function s() {
          if (i) {
            var e, n = i.length;
            for (o = new Array(n),
                   f = new Array(n),
                   e = 0; e < n; ++e)
              f[e] = +t(i[e], e, i),
                o[e] = isNaN(f[e]) ? 0 : +c(i[e], e, i)
          }
        }

        return "function" != typeof t && (t = Vr(+t)),
        null == e && (e = 0),
        null == n && (n = 0),
        null == r && (r = 0),
          u.initialize = function (t, e) {
            i = t,
              a = e,
              s()
          }
          ,
          u.strength = function (t) {
            return arguments.length ? (c = "function" == typeof t ? t : Vr(+t),
              s(),
              u) : c
          }
          ,
          u.radius = function (e) {
            return arguments.length ? (t = "function" == typeof e ? e : Vr(+e),
              s(),
              u) : t
          }
          ,
          u.x = function (t) {
            return arguments.length ? (e = +t,
              u) : e
          }
          ,
          u.y = function (t) {
            return arguments.length ? (n = +t,
              u) : n
          }
          ,
          u.z = function (t) {
            return arguments.length ? (r = +t,
              u) : r
          }
          ,
          u
      }(function (t) {
        var n = s[t[e.nodeId]];
        return ("radialin" === e.dagMode ? l - n : n) * h
      }).strength(1) : null);
      for (var y = 0; y < e.warmupTicks; y++)
        e.forceLayout.tick();
      this.resetCountdown(),
        e.onFinishLoading()
    }
  });

  function _i(t, e) {
    var n = t instanceof Array ? t : [t]
      , r = new e;
    return {
      linkProp: function (t) {
        return {
          default: r[t](),
          onChange: function (e, r) {
            n.forEach(function (n) {
              return r[n][t](e)
            })
          },
          triggerUpdate: !1
        }
      },
      linkMethod: function (t) {
        return function (e) {
          for (var r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
            i[a - 1] = arguments[a];
          var o = [];
          return n.forEach(function (n) {
            var r = e[n]
              , a = r[t].apply(r, i);
            a !== r && o.push(a)
          }),
            o.length ? o[0] : this
        }
      }
    }
  }

  var mi = _i("forceGraph", gi)
    , xi = _i(["forceGraph", "shadowGraph"], gi)
    ,
    wi = Object.assign.apply(Object, o(["nodeColor", "nodeAutoColorBy", "nodeCanvasObject", "linkColor", "linkAutoColorBy", "linkWidth", "linkDirectionalArrowLength", "linkDirectionalArrowColor", "linkDirectionalArrowRelPos", "linkDirectionalParticles", "linkDirectionalParticleSpeed", "linkDirectionalParticleWidth", "linkDirectionalParticleColor", "dagMode", "dagLevelDistance", "d3AlphaDecay", "d3VelocityDecay", "warmupTicks", "cooldownTicks", "cooldownTime", "onEngineTick", "onEngineStop"].map(function (t) {
      return e({}, t, mi.linkProp(t))
    })).concat(o(["nodeRelSize", "nodeId", "nodeVal", "linkSource", "linkTarget", "linkVisibility", "linkCurvature"].map(function (t) {
      return e({}, t, xi.linkProp(t))
    }))))
    , ki = Object.assign.apply(Object, o(["d3Force"].map(function (t) {
      return e({}, t, mi.linkMethod(t))
    })));

  function zi(t) {
    if (t.canvas) {
      var e = t.canvas.width
        , n = t.canvas.height;
      300 === e && 150 === n && (e = n = 0);
      var r = window.devicePixelRatio;
      e /= r,
        n /= r,
        [t.canvas, t.shadowCanvas].forEach(function (i) {
          i.style.width = "".concat(t.width, "px"),
            i.style.height = "".concat(t.height, "px"),
            i.width = t.width * r,
            i.height = t.height * r,
          e || n || i.getContext("2d").scale(r, r)
        });
      var i = In(t.canvas).k;
      t.zoom.translateBy(t.zoom.__baseElem, (t.width - e) / 2 / i, (t.height - n) / 2 / i)
    }
  }

  function Mi(t) {
    var e = window.devicePixelRatio;
    t.setTransform(e, 0, 0, e, 0, 0)
  }

  function Ai(t, e, n) {
    t.save(),
      Mi(t),
      t.clearRect(0, 0, e, n),
      t.restore()
  }

  return pr({
    props: n({
      width: {
        default: window.innerWidth,
        onChange: function (t, e) {
          return zi(e)
        },
        triggerUpdate: !1
      },
      height: {
        default: window.innerHeight,
        onChange: function (t, e) {
          return zi(e)
        },
        triggerUpdate: !1
      },
      graphData: {
        default: {
          nodes: [],
          links: []
        },
        onChange: function (t, e) {
          (t.nodes.length || t.links.length) && console.info("force-graph loading", t.nodes.length + " nodes", t.links.length + " links"),
            [{
              type: "Node",
              objs: t.nodes
            }, {
              type: "Link",
              objs: t.links
            }].forEach(function (t) {
              var n = t.type;
              t.objs.filter(function (t) {
                return !t.hasOwnProperty("__indexColor")
              }).forEach(function (t) {
                t.__indexColor = e.colorTracker.register({
                  type: n,
                  d: t
                })
              })
            }),
            e.forceGraph.graphData(t),
            e.shadowGraph.graphData(t)
        },
        triggerUpdate: !1
      },
      backgroundColor: {
        onChange: function (t, e) {
          e.canvas && t && (e.canvas.style.background = t)
        },
        triggerUpdate: !1
      },
      nodeLabel: {
        default: "name",
        triggerUpdate: !1
      },
      linkLabel: {
        default: "name",
        triggerUpdate: !1
      },
      linkHoverPrecision: {
        default: 4,
        triggerUpdate: !1
      },
      enableNodeDrag: {
        default: !0,
        triggerUpdate: !1
      },
      enableZoomPanInteraction: {
        default: !0,
        triggerUpdate: !1
      },
      enablePointerInteraction: {
        default: !0,
        onChange: function (t, e) {
          e.hoverObj = null
        },
        triggerUpdate: !1
      },
      onNodeDrag: {
        default: function () {
        },
        triggerUpdate: !1
      },
      onNodeDragEnd: {
        default: function () {
        },
        triggerUpdate: !1
      },
      onNodeClick: {
        default: function () {
        },
        triggerUpdate: !1
      },
      onNodeHover: {
        default: function () {
        },
        triggerUpdate: !1
      },
      onLinkClick: {
        default: function () {
        },
        triggerUpdate: !1
      },
      onLinkHover: {
        default: function () {
        },
        triggerUpdate: !1
      }
    }, wi),
    aliases: {
      stopAnimation: "pauseAnimation"
    },
    methods: n({
      centerAt: function (t, e, n, r) {
        if (!t.canvas)
          return null;
        if (void 0 !== e || void 0 !== n) {
          var i = Object.assign({}, void 0 !== e ? {
            x: e
          } : {}, void 0 !== n ? {
            y: n
          } : {});
          return r ? new hr.Tween(a()).to(i, r).easing(hr.Easing.Quadratic.Out).onUpdate(o).start() : o(i),
            this
        }
        return a();

        function a() {
          var e = In(t.canvas);
          return {
            x: (t.width / 2 - e.x) / e.k,
            y: (t.height / 2 - e.y) / e.k
          }
        }

        function o(e) {
          var n = e.x
            , r = e.y;
          t.zoom.translateTo(t.zoom.__baseElem, void 0 === n ? a().x : n, void 0 === r ? a().y : r)
        }
      },
      zoom: function (t, e, n) {
        return t.canvas ? void 0 !== e ? (n ? new hr.Tween({
          k: r()
        }).to({
          k: e
        }, n).easing(hr.Easing.Quadratic.Out).onUpdate(function (t) {
          return i(t.k)
        }).start() : i(e),
          this) : r() : null;

        function r() {
          return In(t.canvas).k
        }

        function i(e) {
          t.zoom.scaleTo(t.zoom.__baseElem, e)
        }
      },
      pauseAnimation: function (t) {
        return t.animationFrameRequestId && (cancelAnimationFrame(t.animationFrameRequestId),
          t.animationFrameRequestId = null),
          this
      },
      resumeAnimation: function (t) {
        return t.animationFrameRequestId || this._animationCycle(),
          this
      }
    }, ki),
    stateInit: function () {
      return {
        lastSetZoom: 1,
        forceGraph: new gi,
        shadowGraph: (new gi).cooldownTicks(0).nodeColor("__indexColor").linkColor("__indexColor").isShadow(!0),
        colorTracker: new vr
      }
    },
    init: function (t, e) {
      t.innerHTML = "";
      var n = document.createElement("div");
      n.style.position = "relative",
        t.appendChild(n),
        e.canvas = document.createElement("canvas"),
      e.backgroundColor && (e.canvas.style.background = e.backgroundColor),
        n.appendChild(e.canvas),
        e.shadowCanvas = document.createElement("canvas");
      var r = e.canvas.getContext("2d")
        , i = e.shadowCanvas.getContext("2d");
      Z(e.canvas).call(function () {
        var t, e, n, r, i = dt, a = pt, o = bt, f = yt, c = {}, u = rt("start", "drag", "end"), s = 0, l = 0;

        function h(t) {
          t.on("mousedown.drag", d).filter(f).on("touchstart.drag", y).on("touchmove.drag", v).on("touchend.drag touchcancel.drag", g).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
        }

        function d() {
          if (!r && i.apply(this, arguments)) {
            var o = _("mouse", a.apply(this, arguments), tt, this, arguments);
            o && (Z(F.view).on("mousemove.drag", p, !0).on("mouseup.drag", b, !0),
              ut(F.view),
              ft(),
              n = !1,
              t = F.clientX,
              e = F.clientY,
              o("start"))
          }
        }

        function p() {
          if (ct(),
            !n) {
            var r = F.clientX - t
              , i = F.clientY - e;
            n = r * r + i * i > l
          }
          c.mouse("drag")
        }

        function b() {
          Z(F.view).on("mousemove.drag mouseup.drag", null),
            st(F.view, n),
            ct(),
            c.mouse("end")
        }

        function y() {
          if (i.apply(this, arguments)) {
            var t, e, n = F.changedTouches, r = a.apply(this, arguments), o = n.length;
            for (t = 0; t < o; ++t)
              (e = _(n[t].identifier, r, et, this, arguments)) && (ft(),
                e("start"))
          }
        }

        function v() {
          var t, e, n = F.changedTouches, r = n.length;
          for (t = 0; t < r; ++t)
            (e = c[n[t].identifier]) && (ct(),
              e("drag"))
        }

        function g() {
          var t, e, n = F.changedTouches, i = n.length;
          for (r && clearTimeout(r),
                 r = setTimeout(function () {
                   r = null
                 }, 500),
                 t = 0; t < i; ++t)
            (e = c[n[t].identifier]) && (ft(),
              e("end"))
        }

        function _(t, e, n, r, i) {
          var a, f, l, d = n(e, t), p = u.copy();
          if (Y(new ht(h, "beforestart", a, t, s, d[0], d[1], 0, 0, p), function () {
            return null != (F.subject = a = o.apply(r, i)) && (f = a.x - d[0] || 0,
              l = a.y - d[1] || 0,
              !0)
          }))
            return function o(u) {
              var b, y = d;
              switch (u) {
                case "start":
                  c[t] = o,
                    b = s++;
                  break;
                case "end":
                  delete c[t],
                    --s;
                case "drag":
                  d = n(e, t),
                    b = s
              }
              Y(new ht(h, u, a, t, b, d[0] + f, d[1] + l, d[0] - y[0], d[1] - y[1], p), p.apply, p, [u, r, i])
            }
        }

        return h.filter = function (t) {
          return arguments.length ? (i = "function" == typeof t ? t : lt(!!t),
            h) : i
        }
          ,
          h.container = function (t) {
            return arguments.length ? (a = "function" == typeof t ? t : lt(t),
              h) : a
          }
          ,
          h.subject = function (t) {
            return arguments.length ? (o = "function" == typeof t ? t : lt(t),
              h) : o
          }
          ,
          h.touchable = function (t) {
            return arguments.length ? (f = "function" == typeof t ? t : lt(!!t),
              h) : f
          }
          ,
          h.on = function () {
            var t = u.on.apply(u, arguments);
            return t === u ? h : t
          }
          ,
          h.clickDistance = function (t) {
            return arguments.length ? (l = (t = +t) * t,
              h) : Math.sqrt(l)
          }
          ,
          h
      }().subject(function () {
        if (!e.enableNodeDrag)
          return null;
        var t = e.hoverObj;
        return t && "Node" === t.type ? t.d : null
      }).on("start", function () {
        var t = F.subject;
        t.__initialDragPos = {
          x: t.x,
          y: t.y,
          fx: t.fx,
          fy: t.fy
        },
        F.active || (e.forceGraph.d3AlphaTarget(.3),
          t.fx = t.x,
          t.fy = t.y),
          e.canvas.classList.add("grabbable")
      }).on("drag", function () {
        var t = F.subject
          , n = t.__initialDragPos
          , r = F
          , i = In(e.canvas).k;
        ["x", "y"].forEach(function (e) {
          return t["f".concat(e)] = t[e] = n[e] + (r[e] - n[e]) / i
        }),
          e.forceGraph.resetCountdown(),
          e.onNodeDrag(t)
      }).on("end", function () {
        var t = F.subject
          , n = t.__initialDragPos;
        void 0 === n.fx && (t.fx = void 0),
        void 0 === n.fy && (t.fy = void 0),
          delete t.__initialDragPos,
          e.forceGraph.d3AlphaTarget(0).resetCountdown(),
          e.canvas.classList.remove("grabbable"),
          e.onNodeDragEnd(t)
      })),
        e.zoom = function () {
          var t, e, n = Ln, r = qn, i = Vn, a = Fn, o = Bn, f = [0, 1 / 0], c = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]],
            u = 250, s = qe, l = [], h = rt("start", "zoom", "end"), d = 500, p = 150, b = 0;

          function y(t) {
            t.property("__zoom", Rn).on("wheel.zoom", k).on("mousedown.zoom", z).on("dblclick.zoom", M).filter(o).on("touchstart.zoom", A).on("touchmove.zoom", N).on("touchend.zoom touchcancel.zoom", E).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
          }

          function v(t, e) {
            return (e = Math.max(f[0], Math.min(f[1], e))) === t.k ? t : new Pn(e, t.x, t.y)
          }

          function g(t, e, n) {
            var r = e[0] - n[0] * t.k
              , i = e[1] - n[1] * t.k;
            return r === t.x && i === t.y ? t : new Pn(t.k, r, i)
          }

          function _(t) {
            return [(+t[0][0] + +t[1][0]) / 2, (+t[0][1] + +t[1][1]) / 2]
          }

          function m(t, e, n) {
            t.on("start.zoom", function () {
              x(this, arguments).start()
            }).on("interrupt.zoom end.zoom", function () {
              x(this, arguments).end()
            }).tween("zoom", function () {
              var t = arguments
                , i = x(this, t)
                , a = r.apply(this, t)
                , o = n || _(a)
                , f = Math.max(a[1][0] - a[0][0], a[1][1] - a[0][1])
                , c = this.__zoom
                , u = "function" == typeof e ? e.apply(this, t) : e
                , l = s(c.invert(o).concat(f / c.k), u.invert(o).concat(f / u.k));
              return function (t) {
                if (1 === t)
                  t = u;
                else {
                  var e = l(t)
                    , n = f / e[2];
                  t = new Pn(n, o[0] - e[0] * n, o[1] - e[1] * n)
                }
                i.zoom(null, t)
              }
            })
          }

          function x(t, e) {
            for (var n, r = 0, i = l.length; r < i; ++r)
              if ((n = l[r]).that === t)
                return n;
            return new w(t, e)
          }

          function w(t, e) {
            this.that = t,
              this.args = e,
              this.index = -1,
              this.active = 0,
              this.extent = r.apply(t, e)
          }

          function k() {
            if (n.apply(this, arguments)) {
              var t = x(this, arguments)
                , e = this.__zoom
                , r = Math.max(f[0], Math.min(f[1], e.k * Math.pow(2, a.apply(this, arguments))))
                , o = tt(this);
              if (t.wheel)
                t.mouse[0][0] === o[0] && t.mouse[0][1] === o[1] || (t.mouse[1] = e.invert(t.mouse[0] = o)),
                  clearTimeout(t.wheel);
              else {
                if (e.k === r)
                  return;
                t.mouse = [o, e.invert(o)],
                  xn(this),
                  t.start()
              }
              Un(),
                t.wheel = setTimeout(function () {
                  t.wheel = null,
                    t.end()
                }, p),
                t.zoom("mouse", i(g(v(e, r), t.mouse[0], t.mouse[1]), t.extent, c))
            }
          }

          function z() {
            if (!e && n.apply(this, arguments)) {
              var t = x(this, arguments)
                , r = Z(F.view).on("mousemove.zoom", function () {
                if (Un(),
                  !t.moved) {
                  var e = F.clientX - o
                    , n = F.clientY - f;
                  t.moved = e * e + n * n > b
                }
                t.zoom("mouse", i(g(t.that.__zoom, t.mouse[0] = tt(t.that), t.mouse[1]), t.extent, c))
              }, !0).on("mouseup.zoom", function () {
                r.on("mousemove.zoom mouseup.zoom", null),
                  st(F.view, t.moved),
                  Un(),
                  t.end()
              }, !0)
                , a = tt(this)
                , o = F.clientX
                , f = F.clientY;
              ut(F.view),
                Dn(),
                t.mouse = [a, this.__zoom.invert(a)],
                xn(this),
                t.start()
            }
          }

          function M() {
            if (n.apply(this, arguments)) {
              var t = this.__zoom
                , e = tt(this)
                , a = t.invert(e)
                , o = t.k * (F.shiftKey ? .5 : 2)
                , f = i(g(v(t, o), e, a), r.apply(this, arguments), c);
              Un(),
                u > 0 ? Z(this).transition().duration(u).call(m, f, e) : Z(this).call(y.transform, f)
            }
          }

          function A() {
            if (n.apply(this, arguments)) {
              var e, r, i, a, o = x(this, arguments), f = F.changedTouches, c = f.length;
              for (Dn(),
                     r = 0; r < c; ++r)
                a = [a = et(this, f, (i = f[r]).identifier), this.__zoom.invert(a), i.identifier],
                  o.touch0 ? o.touch1 || (o.touch1 = a) : (o.touch0 = a,
                    e = !0);
              if (t && (t = clearTimeout(t),
                !o.touch1))
                return o.end(),
                  void ((a = Z(this).on("dblclick.zoom")) && a.apply(this, arguments));
              e && (t = setTimeout(function () {
                t = null
              }, d),
                xn(this),
                o.start())
            }
          }

          function N() {
            var e, n, r, a, o = x(this, arguments), f = F.changedTouches, u = f.length;
            for (Un(),
                 t && (t = clearTimeout(t)),
                   e = 0; e < u; ++e)
              r = et(this, f, (n = f[e]).identifier),
                o.touch0 && o.touch0[2] === n.identifier ? o.touch0[0] = r : o.touch1 && o.touch1[2] === n.identifier && (o.touch1[0] = r);
            if (n = o.that.__zoom,
              o.touch1) {
              var s = o.touch0[0]
                , l = o.touch0[1]
                , h = o.touch1[0]
                , d = o.touch1[1]
                , p = (p = h[0] - s[0]) * p + (p = h[1] - s[1]) * p
                , b = (b = d[0] - l[0]) * b + (b = d[1] - l[1]) * b;
              n = v(n, Math.sqrt(p / b)),
                r = [(s[0] + h[0]) / 2, (s[1] + h[1]) / 2],
                a = [(l[0] + d[0]) / 2, (l[1] + d[1]) / 2]
            } else {
              if (!o.touch0)
                return;
              r = o.touch0[0],
                a = o.touch0[1]
            }
            o.zoom("touch", i(g(n, r, a), o.extent, c))
          }

          function E() {
            var t, n, r = x(this, arguments), i = F.changedTouches, a = i.length;
            for (Dn(),
                 e && clearTimeout(e),
                   e = setTimeout(function () {
                     e = null
                   }, d),
                   t = 0; t < a; ++t)
              n = i[t],
                r.touch0 && r.touch0[2] === n.identifier ? delete r.touch0 : r.touch1 && r.touch1[2] === n.identifier && delete r.touch1;
            r.touch1 && !r.touch0 && (r.touch0 = r.touch1,
              delete r.touch1),
              r.touch0 ? r.touch0[1] = this.__zoom.invert(r.touch0[0]) : r.end()
          }

          return y.transform = function (t, e) {
            var n = t.selection ? t.selection() : t;
            n.property("__zoom", Rn),
              t !== n ? m(t, e) : n.interrupt().each(function () {
                x(this, arguments).start().zoom(null, "function" == typeof e ? e.apply(this, arguments) : e).end()
              })
          }
            ,
            y.scaleBy = function (t, e) {
              y.scaleTo(t, function () {
                return this.__zoom.k * ("function" == typeof e ? e.apply(this, arguments) : e)
              })
            }
            ,
            y.scaleTo = function (t, e) {
              y.transform(t, function () {
                var t = r.apply(this, arguments)
                  , n = this.__zoom
                  , a = _(t)
                  , o = n.invert(a)
                  , f = "function" == typeof e ? e.apply(this, arguments) : e;
                return i(g(v(n, f), a, o), t, c)
              })
            }
            ,
            y.translateBy = function (t, e, n) {
              y.transform(t, function () {
                return i(this.__zoom.translate("function" == typeof e ? e.apply(this, arguments) : e, "function" == typeof n ? n.apply(this, arguments) : n), r.apply(this, arguments), c)
              })
            }
            ,
            y.translateTo = function (t, e, n) {
              y.transform(t, function () {
                var t = r.apply(this, arguments)
                  , a = this.__zoom
                  , o = _(t);
                return i(jn.translate(o[0], o[1]).scale(a.k).translate("function" == typeof e ? -e.apply(this, arguments) : -e, "function" == typeof n ? -n.apply(this, arguments) : -n), t, c)
              })
            }
            ,
            w.prototype = {
              start: function () {
                return 1 == ++this.active && (this.index = l.push(this) - 1,
                  this.emit("start")),
                  this
              },
              zoom: function (t, e) {
                return this.mouse && "mouse" !== t && (this.mouse[1] = e.invert(this.mouse[0])),
                this.touch0 && "touch" !== t && (this.touch0[1] = e.invert(this.touch0[0])),
                this.touch1 && "touch" !== t && (this.touch1[1] = e.invert(this.touch1[0])),
                  this.that.__zoom = e,
                  this.emit("zoom"),
                  this
              },
              end: function () {
                return 0 == --this.active && (l.splice(this.index, 1),
                  this.index = -1,
                  this.emit("end")),
                  this
              },
              emit: function (t) {
                Y(new On(y, t, this.that.__zoom), h.apply, h, [t, this.that, this.args])
              }
            },
            y.wheelDelta = function (t) {
              return arguments.length ? (a = "function" == typeof t ? t : Cn(+t),
                y) : a
            }
            ,
            y.filter = function (t) {
              return arguments.length ? (n = "function" == typeof t ? t : Cn(!!t),
                y) : n
            }
            ,
            y.touchable = function (t) {
              return arguments.length ? (o = "function" == typeof t ? t : Cn(!!t),
                y) : o
            }
            ,
            y.extent = function (t) {
              return arguments.length ? (r = "function" == typeof t ? t : Cn([[+t[0][0], +t[0][1]], [+t[1][0], +t[1][1]]]),
                y) : r
            }
            ,
            y.scaleExtent = function (t) {
              return arguments.length ? (f[0] = +t[0],
                f[1] = +t[1],
                y) : [f[0], f[1]]
            }
            ,
            y.translateExtent = function (t) {
              return arguments.length ? (c[0][0] = +t[0][0],
                c[1][0] = +t[1][0],
                c[0][1] = +t[0][1],
                c[1][1] = +t[1][1],
                y) : [[c[0][0], c[0][1]], [c[1][0], c[1][1]]]
            }
            ,
            y.constrain = function (t) {
              return arguments.length ? (i = t,
                y) : i
            }
            ,
            y.duration = function (t) {
              return arguments.length ? (u = +t,
                y) : u
            }
            ,
            y.interpolate = function (t) {
              return arguments.length ? (s = t,
                y) : s
            }
            ,
            y.on = function () {
              var t = h.on.apply(h, arguments);
              return t === h ? y : t
            }
            ,
            y.clickDistance = function (t) {
              return arguments.length ? (b = (t = +t) * t,
                y) : Math.sqrt(b)
            }
            ,
            y
        }(),
        e.zoom(e.zoom.__baseElem = Z(e.canvas)),
        e.zoom.filter(function () {
          return !!e.enableZoomPanInteraction && !F.button
        }).scaleExtent([.01, 1e3]).on("zoom", function () {
          var t = In(this);
          [r, i].forEach(function (e) {
            Mi(e),
              e.translate(t.x, t.y),
              e.scale(t.k, t.k)
          })
        }),
        zi(e),
        e.forceGraph.onFinishLoading(function () {
          In(e.canvas).k === e.lastSetZoom && e.zoom.scaleTo(e.zoom.__baseElem, e.lastSetZoom = 4 / Math.cbrt(e.graphData.nodes.length))
        });
      var a = document.createElement("div");
      a.classList.add("graph-tooltip"),
        n.appendChild(a);
      var o = {
        x: -1e12,
        y: -1e12
      };
      e.canvas.addEventListener("mousemove", function (t) {
        var e, r, i, f = (e = n.getBoundingClientRect(),
          r = window.pageXOffset || document.documentElement.scrollLeft,
          i = window.pageYOffset || document.documentElement.scrollTop,
          {
            top: e.top + i,
            left: e.left + r
          });
        o.x = t.pageX - f.left,
          o.y = t.pageY - f.top,
          a.style.top = "".concat(o.y, "px"),
          a.style.left = "".concat(o.x, "px")
      }, !1),
        n.addEventListener("click", function (t) {
          e.hoverObj && e["on".concat(e.hoverObj.type, "Click")](e.hoverObj.d)
        }, !1),
        e.forceGraph(r),
        e.shadowGraph(i);
      var f = lr(function () {
        Ai(i, e.width, e.height),
          e.shadowGraph.linkWidth(function (t) {
            return yr(e.linkWidth)(t) + e.linkHoverPrecision
          });
        var t = In(e.canvas);
        e.shadowGraph.globalScale(t.k).tickFrame()
      }, 800);
      (this._animationCycle = function t() {
          if (e.enablePointerInteraction) {
            var n = window.devicePixelRatio
              , c = i.getImageData(o.x * n, o.y * n, 1, 1)
              , u = c ? e.colorTracker.lookup(c.data) : null;
            if (u !== e.hoverObj) {
              var s = e.hoverObj
                , l = s ? s.type : null
                , h = u ? u.type : null;
              l && l !== h && e["on".concat(l, "Hover")](null, s.d),
              h && e["on".concat(h, "Hover")](u.d, l === h ? s.d : null);
              var d = u && yr(e["".concat(u.type.toLowerCase(), "Label")])(u.d) || "";
              a.style.visibility = d ? "visible" : "hidden",
                a.innerHTML = d,
                e.hoverObj = u
            }
            f()
          }
          Ai(r, e.width, e.height);
          var p = In(e.canvas);
          e.forceGraph.globalScale(p.k).tickFrame(),
            hr.update(),
            e.animationFrameRequestId = requestAnimationFrame(t)
        }
      )()
    },
    update: function (t) {
    }
  })
});
