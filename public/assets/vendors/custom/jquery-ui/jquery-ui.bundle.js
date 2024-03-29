! function(t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function(t) {
    function e(t) {
        for (var e = t.css("visibility");
            "inherit" === e;) t = t.parent(), e = t.css("visibility");
        return "hidden" !== e
    }
    t.ui = t.ui || {}, t.ui.version = "1.12.1";
    var i = 0,
        s = Array.prototype.slice;
    t.cleanData = function(e) {
            return function(i) {
                var s, o, n;
                for (n = 0; null != (o = i[n]); n++) try {
                    (s = t._data(o, "events")) && s.remove && t(o).triggerHandler("remove")
                } catch (t) {}
                e(i)
            }
        }(t.cleanData), t.widget = function(e, i, s) {
            var o, n, r, h = {},
                a = e.split(".")[0],
                l = a + "-" + (e = e.split(".")[1]);
            return s || (s = i, i = t.Widget), t.isArray(s) && (s = t.extend.apply(null, [{}].concat(s))), t.expr[":"][l.toLowerCase()] = function(e) {
                return !!t.data(e, l)
            }, t[a] = t[a] || {}, o = t[a][e], n = t[a][e] = function(t, e) {
                return this._createWidget ? void(arguments.length && this._createWidget(t, e)) : new n(t, e)
            }, t.extend(n, o, {
                version: s.version,
                _proto: t.extend({}, s),
                _childConstructors: []
            }), r = new i, r.options = t.widget.extend({}, r.options), t.each(s, function(e, s) {
                return t.isFunction(s) ? void(h[e] = function() {
                    function t() {
                        return i.prototype[e].apply(this, arguments)
                    }

                    function o(t) {
                        return i.prototype[e].apply(this, t)
                    }
                    return function() {
                        var e, i = this._super,
                            n = this._superApply;
                        return this._super = t, this._superApply = o, e = s.apply(this, arguments), this._super = i, this._superApply = n, e
                    }
                }()) : void(h[e] = s)
            }), n.prototype = t.widget.extend(r, {
                widgetEventPrefix: o ? r.widgetEventPrefix || e : e
            }, h, {
                constructor: n,
                namespace: a,
                widgetName: e,
                widgetFullName: l
            }), o ? (t.each(o._childConstructors, function(e, i) {
                var s = i.prototype;
                t.widget(s.namespace + "." + s.widgetName, n, i._proto)
            }), delete o._childConstructors) : i._childConstructors.push(n), t.widget.bridge(e, n), n
        }, t.widget.extend = function(e) {
            for (var i, o, n = s.call(arguments, 1), r = 0, h = n.length; h > r; r++)
                for (i in n[r]) o = n[r][i], n[r].hasOwnProperty(i) && void 0 !== o && (e[i] = t.isPlainObject(o) ? t.isPlainObject(e[i]) ? t.widget.extend({}, e[i], o) : t.widget.extend({}, o) : o);
            return e
        }, t.widget.bridge = function(e, i) {
            var o = i.prototype.widgetFullName || e;
            t.fn[e] = function(n) {
                var r = "string" == typeof n,
                    h = s.call(arguments, 1),
                    a = this;
                return r ? this.length || "instance" !== n ? this.each(function() {
                    var i, s = t.data(this, o);
                    return "instance" === n ? (a = s, !1) : s ? t.isFunction(s[n]) && "_" !== n.charAt(0) ? (i = s[n].apply(s, h)) !== s && void 0 !== i ? (a = i && i.jquery ? a.pushStack(i.get()) : i, !1) : void 0 : t.error("no such method '" + n + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; attempted to call method '" + n + "'")
                }) : a = void 0 : (h.length && (n = t.widget.extend.apply(null, [n].concat(h))), this.each(function() {
                    var e = t.data(this, o);
                    e ? (e.option(n || {}), e._init && e._init()) : t.data(this, o, new i(n, this))
                })), a
            }
        }, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                classes: {},
                disabled: !1,
                create: null
            },
            _createWidget: function(e, s) {
                s = t(s || this.defaultElement || this)[0], this.element = t(s), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = t(), this.hoverable = t(), this.focusable = t(), this.classesElementLookup = {}, s !== this && (t.data(s, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function(t) {
                        t.target === s && this.destroy()
                    }
                }), this.document = t(s.style ? s.ownerDocument : s.document || s), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger("create", null, this._getCreateEventData()), this._init()
            },
            _getCreateOptions: function() {
                return {}
            },
            _getCreateEventData: t.noop,
            _create: t.noop,
            _init: t.noop,
            destroy: function() {
                var e = this;
                this._destroy(), t.each(this.classesElementLookup, function(t, i) {
                    e._removeClass(i, t)
                }), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), this.bindings.off(this.eventNamespace)
            },
            _destroy: t.noop,
            widget: function() {
                return this.element
            },
            option: function(e, i) {
                var s, o, n, r = e;
                if (0 === arguments.length) return t.widget.extend({}, this.options);
                if ("string" == typeof e)
                    if (r = {}, s = e.split("."), e = s.shift(), s.length) {
                        for (o = r[e] = t.widget.extend({}, this.options[e]), n = 0; s.length - 1 > n; n++) o[s[n]] = o[s[n]] || {}, o = o[s[n]];
                        if (e = s.pop(), 1 === arguments.length) return void 0 === o[e] ? null : o[e];
                        o[e] = i
                    } else {
                        if (1 === arguments.length) return void 0 === this.options[e] ? null : this.options[e];
                        r[e] = i
                    } return this._setOptions(r), this
            },
            _setOptions: function(t) {
                var e;
                for (e in t) this._setOption(e, t[e]);
                return this
            },
            _setOption: function(t, e) {
                return "classes" === t && this._setOptionClasses(e), this.options[t] = e, "disabled" === t && this._setOptionDisabled(e), this
            },
            _setOptionClasses: function(e) {
                var i, s, o;
                for (i in e) o = this.classesElementLookup[i], e[i] !== this.options.classes[i] && o && o.length && (s = t(o.get()), this._removeClass(o, i), s.addClass(this._classes({
                    element: s,
                    keys: i,
                    classes: e,
                    add: !0
                })))
            },
            _setOptionDisabled: function(t) {
                this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!t), t && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"))
            },
            enable: function() {
                return this._setOptions({
                    disabled: !1
                })
            },
            disable: function() {
                return this._setOptions({
                    disabled: !0
                })
            },
            _classes: function(e) {
                function i(i, n) {
                    var r, h;
                    for (h = 0; i.length > h; h++) r = o.classesElementLookup[i[h]] || t(), r = t(e.add ? t.unique(r.get().concat(e.element.get())) : r.not(e.element).get()), o.classesElementLookup[i[h]] = r, s.push(i[h]), n && e.classes[i[h]] && s.push(e.classes[i[h]])
                }
                var s = [],
                    o = this;
                return e = t.extend({
                    element: this.element,
                    classes: this.options.classes || {}
                }, e), this._on(e.element, {
                    remove: "_untrackClassesElement"
                }), e.keys && i(e.keys.match(/\S+/g) || [], !0), e.extra && i(e.extra.match(/\S+/g) || []), s.join(" ")
            },
            _untrackClassesElement: function(e) {
                var i = this;
                t.each(i.classesElementLookup, function(s, o) {
                    -1 !== t.inArray(e.target, o) && (i.classesElementLookup[s] = t(o.not(e.target).get()))
                })
            },
            _removeClass: function(t, e, i) {
                return this._toggleClass(t, e, i, !1)
            },
            _addClass: function(t, e, i) {
                return this._toggleClass(t, e, i, !0)
            },
            _toggleClass: function(t, e, i, s) {
                s = "boolean" == typeof s ? s : i;
                var o = "string" == typeof t || null === t,
                    n = {
                        extra: o ? e : i,
                        keys: o ? t : e,
                        element: o ? this.element : t,
                        add: s
                    };
                return n.element.toggleClass(this._classes(n), s), this
            },
            _on: function(e, i, s) {
                var o, n = this;
                "boolean" != typeof e && (s = i, i = e, e = !1), s ? (i = o = t(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, o = this.widget()), t.each(s, function(s, r) {
                    function h() {
                        return e || !0 !== n.options.disabled && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof r ? n[r] : r).apply(n, arguments) : void 0
                    }
                    "string" != typeof r && (h.guid = r.guid = r.guid || h.guid || t.guid++);
                    var a = s.match(/^([\w:-]*)\s*(.*)$/),
                        l = a[1] + n.eventNamespace,
                        c = a[2];
                    c ? o.on(l, c, h) : i.on(l, h)
                })
            },
            _off: function(e, i) {
                i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.off(i).off(i), this.bindings = t(this.bindings.not(e).get()), this.focusable = t(this.focusable.not(e).get()), this.hoverable = t(this.hoverable.not(e).get())
            },
            _delay: function(t, e) {
                var i = this;
                return setTimeout(function() {
                    return ("string" == typeof t ? i[t] : t).apply(i, arguments)
                }, e || 0)
            },
            _hoverable: function(e) {
                this.hoverable = this.hoverable.add(e), this._on(e, {
                    mouseenter: function(e) {
                        this._addClass(t(e.currentTarget), null, "ui-state-hover")
                    },
                    mouseleave: function(e) {
                        this._removeClass(t(e.currentTarget), null, "ui-state-hover")
                    }
                })
            },
            _focusable: function(e) {
                this.focusable = this.focusable.add(e), this._on(e, {
                    focusin: function(e) {
                        this._addClass(t(e.currentTarget), null, "ui-state-focus")
                    },
                    focusout: function(e) {
                        this._removeClass(t(e.currentTarget), null, "ui-state-focus")
                    }
                })
            },
            _trigger: function(e, i, s) {
                var o, n, r = this.options[e];
                if (s = s || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], n = i.originalEvent)
                    for (o in n) o in i || (i[o] = n[o]);
                return this.element.trigger(i, s), !(t.isFunction(r) && !1 === r.apply(this.element[0], [i].concat(s)) || i.isDefaultPrevented())
            }
        }, t.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function(e, i) {
            t.Widget.prototype["_" + e] = function(s, o, n) {
                "string" == typeof o && (o = {
                    effect: o
                });
                var r, h = o ? !0 === o || "number" == typeof o ? i : o.effect || i : e;
                "number" == typeof(o = o || {}) && (o = {
                    duration: o
                }), r = !t.isEmptyObject(o), o.complete = n, o.delay && s.delay(o.delay), r && t.effects && t.effects.effect[h] ? s[e](o) : h !== e && s[h] ? s[h](o.duration, o.easing, n) : s.queue(function(i) {
                    t(this)[e](), n && n.call(s[0]), i()
                })
            }
        }), t.widget,
        function() {
            function e(t, e, i) {
                return [parseFloat(t[0]) * (p.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (p.test(t[1]) ? i / 100 : 1)]
            }

            function i(e, i) {
                return parseInt(t.css(e, i), 10) || 0
            }

            function s(e) {
                var i = e[0];
                return 9 === i.nodeType ? {
                    width: e.width(),
                    height: e.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                } : t.isWindow(i) ? {
                    width: e.width(),
                    height: e.height(),
                    offset: {
                        top: e.scrollTop(),
                        left: e.scrollLeft()
                    }
                } : i.preventDefault ? {
                    width: 0,
                    height: 0,
                    offset: {
                        top: i.pageY,
                        left: i.pageX
                    }
                } : {
                    width: e.outerWidth(),
                    height: e.outerHeight(),
                    offset: e.offset()
                }
            }
            var o, n = Math.max,
                r = Math.abs,
                h = /left|center|right/,
                a = /top|center|bottom/,
                l = /[\+\-]\d+(\.[\d]+)?%?/,
                c = /^\w+/,
                p = /%$/,
                f = t.fn.position;
            t.position = {
                scrollbarWidth: function() {
                    if (void 0 !== o) return o;
                    var e, i, s = t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                        n = s.children()[0];
                    return t("body").append(s), e = n.offsetWidth, s.css("overflow", "scroll"), i = n.offsetWidth, e === i && (i = s[0].clientWidth), s.remove(), o = e - i
                },
                getScrollInfo: function(e) {
                    var i = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"),
                        s = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"),
                        o = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth;
                    return {
                        width: "scroll" === s || "auto" === s && e.height < e.element[0].scrollHeight ? t.position.scrollbarWidth() : 0,
                        height: o ? t.position.scrollbarWidth() : 0
                    }
                },
                getWithinInfo: function(e) {
                    var i = t(e || window),
                        s = t.isWindow(i[0]),
                        o = !!i[0] && 9 === i[0].nodeType;
                    return {
                        element: i,
                        isWindow: s,
                        isDocument: o,
                        offset: !s && !o ? t(e).offset() : {
                            left: 0,
                            top: 0
                        },
                        scrollLeft: i.scrollLeft(),
                        scrollTop: i.scrollTop(),
                        width: i.outerWidth(),
                        height: i.outerHeight()
                    }
                }
            }, t.fn.position = function(o) {
                if (!o || !o.of) return f.apply(this, arguments);
                o = t.extend({}, o);
                var p, d, u, g, m, v, _ = t(o.of),
                    b = t.position.getWithinInfo(o.within),
                    w = t.position.getScrollInfo(b),
                    P = (o.collision || "flip").split(" "),
                    y = {};
                return v = s(_), _[0].preventDefault && (o.at = "left top"), d = v.width, u = v.height, g = v.offset, m = t.extend({}, g), t.each(["my", "at"], function() {
                    var t, e, i = (o[this] || "").split(" ");
                    1 === i.length && (i = h.test(i[0]) ? i.concat(["center"]) : a.test(i[0]) ? ["center"].concat(i) : ["center", "center"]), i[0] = h.test(i[0]) ? i[0] : "center", i[1] = a.test(i[1]) ? i[1] : "center", t = l.exec(i[0]), e = l.exec(i[1]), y[this] = [t ? t[0] : 0, e ? e[0] : 0], o[this] = [c.exec(i[0])[0], c.exec(i[1])[0]]
                }), 1 === P.length && (P[1] = P[0]), "right" === o.at[0] ? m.left += d : "center" === o.at[0] && (m.left += d / 2), "bottom" === o.at[1] ? m.top += u : "center" === o.at[1] && (m.top += u / 2), p = e(y.at, d, u), m.left += p[0], m.top += p[1], this.each(function() {
                    var s, h, a = t(this),
                        l = a.outerWidth(),
                        c = a.outerHeight(),
                        f = i(this, "marginLeft"),
                        v = i(this, "marginTop"),
                        C = l + f + i(this, "marginRight") + w.width,
                        z = c + v + i(this, "marginBottom") + w.height,
                        x = t.extend({}, m),
                        H = e(y.my, a.outerWidth(), a.outerHeight());
                    "right" === o.my[0] ? x.left -= l : "center" === o.my[0] && (x.left -= l / 2), "bottom" === o.my[1] ? x.top -= c : "center" === o.my[1] && (x.top -= c / 2), x.left += H[0], x.top += H[1], s = {
                        marginLeft: f,
                        marginTop: v
                    }, t.each(["left", "top"], function(e, i) {
                        t.ui.position[P[e]] && t.ui.position[P[e]][i](x, {
                            targetWidth: d,
                            targetHeight: u,
                            elemWidth: l,
                            elemHeight: c,
                            collisionPosition: s,
                            collisionWidth: C,
                            collisionHeight: z,
                            offset: [p[0] + H[0], p[1] + H[1]],
                            my: o.my,
                            at: o.at,
                            within: b,
                            elem: a
                        })
                    }), o.using && (h = function(t) {
                        var e = g.left - x.left,
                            i = e + d - l,
                            s = g.top - x.top,
                            h = s + u - c,
                            p = {
                                target: {
                                    element: _,
                                    left: g.left,
                                    top: g.top,
                                    width: d,
                                    height: u
                                },
                                element: {
                                    element: a,
                                    left: x.left,
                                    top: x.top,
                                    width: l,
                                    height: c
                                },
                                horizontal: 0 > i ? "left" : e > 0 ? "right" : "center",
                                vertical: 0 > h ? "top" : s > 0 ? "bottom" : "middle"
                            };
                        l > d && d > r(e + i) && (p.horizontal = "center"), c > u && u > r(s + h) && (p.vertical = "middle"), p.important = n(r(e), r(i)) > n(r(s), r(h)) ? "horizontal" : "vertical", o.using.call(this, t, p)
                    }), a.offset(t.extend(x, {
                        using: h
                    }))
                })
            }, t.ui.position = {
                fit: {
                    left: function(t, e) {
                        var i, s = e.within,
                            o = s.isWindow ? s.scrollLeft : s.offset.left,
                            r = s.width,
                            h = t.left - e.collisionPosition.marginLeft,
                            a = o - h,
                            l = h + e.collisionWidth - r - o;
                        e.collisionWidth > r ? a > 0 && 0 >= l ? (i = t.left + a + e.collisionWidth - r - o, t.left += a - i) : t.left = l > 0 && 0 >= a ? o : a > l ? o + r - e.collisionWidth : o : a > 0 ? t.left += a : l > 0 ? t.left -= l : t.left = n(t.left - h, t.left)
                    },
                    top: function(t, e) {
                        var i, s = e.within,
                            o = s.isWindow ? s.scrollTop : s.offset.top,
                            r = e.within.height,
                            h = t.top - e.collisionPosition.marginTop,
                            a = o - h,
                            l = h + e.collisionHeight - r - o;
                        e.collisionHeight > r ? a > 0 && 0 >= l ? (i = t.top + a + e.collisionHeight - r - o, t.top += a - i) : t.top = l > 0 && 0 >= a ? o : a > l ? o + r - e.collisionHeight : o : a > 0 ? t.top += a : l > 0 ? t.top -= l : t.top = n(t.top - h, t.top)
                    }
                },
                flip: {
                    left: function(t, e) {
                        var i, s, o = e.within,
                            n = o.offset.left + o.scrollLeft,
                            h = o.width,
                            a = o.isWindow ? o.scrollLeft : o.offset.left,
                            l = t.left - e.collisionPosition.marginLeft,
                            c = l - a,
                            p = l + e.collisionWidth - h - a,
                            f = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0,
                            d = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0,
                            u = -2 * e.offset[0];
                        0 > c ? (0 > (i = t.left + f + d + u + e.collisionWidth - h - n) || r(c) > i) && (t.left += f + d + u) : p > 0 && ((s = t.left - e.collisionPosition.marginLeft + f + d + u - a) > 0 || p > r(s)) && (t.left += f + d + u)
                    },
                    top: function(t, e) {
                        var i, s, o = e.within,
                            n = o.offset.top + o.scrollTop,
                            h = o.height,
                            a = o.isWindow ? o.scrollTop : o.offset.top,
                            l = t.top - e.collisionPosition.marginTop,
                            c = l - a,
                            p = l + e.collisionHeight - h - a,
                            f = "top" === e.my[1] ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
                            d = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0,
                            u = -2 * e.offset[1];
                        0 > c ? (0 > (s = t.top + f + d + u + e.collisionHeight - h - n) || r(c) > s) && (t.top += f + d + u) : p > 0 && ((i = t.top - e.collisionPosition.marginTop + f + d + u - a) > 0 || p > r(i)) && (t.top += f + d + u)
                    }
                },
                flipfit: {
                    left: function() {
                        t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments)
                    },
                    top: function() {
                        t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments)
                    }
                }
            }
        }(), t.ui.position, t.extend(t.expr[":"], {
            data: t.expr.createPseudo ? t.expr.createPseudo(function(e) {
                return function(i) {
                    return !!t.data(i, e)
                }
            }) : function(e, i, s) {
                return !!t.data(e, s[3])
            }
        }), t.fn.extend({
            disableSelection: function() {
                var t = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
                return function() {
                    return this.on(t + ".ui-disableSelection", function(t) {
                        t.preventDefault()
                    })
                }
            }(),
            enableSelection: function() {
                return this.off(".ui-disableSelection")
            }
        }), t.ui.focusable = function(i, s) {
            var o, n, r, h, a, l = i.nodeName.toLowerCase();
            return "area" === l ? (o = i.parentNode, n = o.name, !(!i.href || !n || "map" !== o.nodeName.toLowerCase()) && ((r = t("img[usemap='#" + n + "']")).length > 0 && r.is(":visible"))) : (/^(input|select|textarea|button|object)$/.test(l) ? (h = !i.disabled) && (a = t(i).closest("fieldset")[0]) && (h = !a.disabled) : h = "a" === l ? i.href || s : s, h && t(i).is(":visible") && e(t(i)))
        }, t.extend(t.expr[":"], {
            focusable: function(e) {
                return t.ui.focusable(e, null != t.attr(e, "tabindex"))
            }
        }), t.ui.focusable, t.fn.form = function() {
            return "string" == typeof this[0].form ? this.closest("form") : t(this[0].form)
        }, t.ui.formResetMixin = {
            _formResetHandler: function() {
                var e = t(this);
                setTimeout(function() {
                    var i = e.data("ui-form-reset-instances");
                    t.each(i, function() {
                        this.refresh()
                    })
                })
            },
            _bindFormResetHandler: function() {
                if (this.form = this.element.form(), this.form.length) {
                    var t = this.form.data("ui-form-reset-instances") || [];
                    t.length || this.form.on("reset.ui-form-reset", this._formResetHandler), t.push(this), this.form.data("ui-form-reset-instances", t)
                }
            },
            _unbindFormResetHandler: function() {
                if (this.form.length) {
                    var e = this.form.data("ui-form-reset-instances");
                    e.splice(t.inArray(this, e), 1), e.length ? this.form.data("ui-form-reset-instances", e) : this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")
                }
            }
        }, "1.7" === t.fn.jquery.substring(0, 3) && (t.each(["Width", "Height"], function(e, i) {
            function s(e, i, s, n) {
                return t.each(o, function() {
                    i -= parseFloat(t.css(e, "padding" + this)) || 0, s && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0), n && (i -= parseFloat(t.css(e, "margin" + this)) || 0)
                }), i
            }
            var o = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
                n = i.toLowerCase(),
                r = {
                    innerWidth: t.fn.innerWidth,
                    innerHeight: t.fn.innerHeight,
                    outerWidth: t.fn.outerWidth,
                    outerHeight: t.fn.outerHeight
                };
            t.fn["inner" + i] = function(e) {
                return void 0 === e ? r["inner" + i].call(this) : this.each(function() {
                    t(this).css(n, s(this, e) + "px")
                })
            }, t.fn["outer" + i] = function(e, o) {
                return "number" != typeof e ? r["outer" + i].call(this, e) : this.each(function() {
                    t(this).css(n, s(this, e, !0, o) + "px")
                })
            }
        }), t.fn.addBack = function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }), t.ui.keyCode = {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }, t.ui.escapeSelector = function() {
            var t = /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;
            return function(e) {
                return e.replace(t, "\\$1")
            }
        }(), t.fn.labels = function() {
            var e, i, s, o, n;
            return this[0].labels && this[0].labels.length ? this.pushStack(this[0].labels) : (o = this.eq(0).parents("label"), (s = this.attr("id")) && (e = this.eq(0).parents().last(), n = e.add(e.length ? e.siblings() : this.siblings()), i = "label[for='" + t.ui.escapeSelector(s) + "']", o = o.add(n.find(i).addBack(i))), this.pushStack(o))
        }, t.fn.scrollParent = function(e) {
            var i = this.css("position"),
                s = "absolute" === i,
                o = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                n = this.parents().filter(function() {
                    var e = t(this);
                    return (!s || "static" !== e.css("position")) && o.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"))
                }).eq(0);
            return "fixed" !== i && n.length ? n : t(this[0].ownerDocument || document)
        }, t.extend(t.expr[":"], {
            tabbable: function(e) {
                var i = t.attr(e, "tabindex"),
                    s = null != i;
                return (!s || i >= 0) && t.ui.focusable(e, s)
            }
        }), t.fn.extend({
            uniqueId: function() {
                var t = 0;
                return function() {
                    return this.each(function() {
                        this.id || (this.id = "ui-id-" + ++t)
                    })
                }
            }(),
            removeUniqueId: function() {
                return this.each(function() {
                    /^ui-id-\d+$/.test(this.id) && t(this).removeAttr("id")
                })
            }
        }), t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    var o = !1;
    t(document).on("mouseup", function() {
        o = !1
    }), t.widget("ui.mouse", {
        version: "1.12.1",
        options: {
            cancel: "input, textarea, button, select, option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var e = this;
            this.element.on("mousedown." + this.widgetName, function(t) {
                return e._mouseDown(t)
            }).on("click." + this.widgetName, function(i) {
                return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
            }), this.started = !1
        },
        _mouseDestroy: function() {
            this.element.off("." + this.widgetName), this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(e) {
            if (!o) {
                this._mouseMoved = !1, this._mouseStarted && this._mouseUp(e), this._mouseDownEvent = e;
                var i = this,
                    s = 1 === e.which,
                    n = !("string" != typeof this.options.cancel || !e.target.nodeName) && t(e.target).closest(this.options.cancel).length;
                return !(s && !n && this._mouseCapture(e)) || (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    i.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = !1 !== this._mouseStart(e), !this._mouseStarted) ? (e.preventDefault(), !0) : (!0 === t.data(e.target, this.widgetName + ".preventClickEvent") && t.removeData(e.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(t) {
                    return i._mouseMove(t)
                }, this._mouseUpDelegate = function(t) {
                    return i._mouseUp(t)
                }, this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate), e.preventDefault(), o = !0, !0))
            }
        },
        _mouseMove: function(e) {
            if (this._mouseMoved) {
                if (t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button) return this._mouseUp(e);
                if (!e.which)
                    if (e.originalEvent.altKey || e.originalEvent.ctrlKey || e.originalEvent.metaKey || e.originalEvent.shiftKey) this.ignoreMissingWhich = !0;
                    else if (!this.ignoreMissingWhich) return this._mouseUp(e)
            }
            return (e.which || e.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, e), this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
        },
        _mouseUp: function(e) {
            this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer), this.ignoreMissingWhich = !1, o = !1, e.preventDefault()
        },
        _mouseDistanceMet: function(t) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    }), t.ui.plugin = {
        add: function(e, i, s) {
            var o, n = t.ui[e].prototype;
            for (o in s) n.plugins[o] = n.plugins[o] || [], n.plugins[o].push([i, s[o]])
        },
        call: function(t, e, i, s) {
            var o, n = t.plugins[e];
            if (n && (s || t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType))
                for (o = 0; n.length > o; o++) t.options[n[o][0]] && n[o][1].apply(t.element, i)
        }
    }, t.ui.safeActiveElement = function(t) {
        var e;
        try {
            e = t.activeElement
        } catch (i) {
            e = t.body
        }
        return e || (e = t.body), e.nodeName || (e = t.body), e
    }, t.ui.safeBlur = function(e) {
        e && "body" !== e.nodeName.toLowerCase() && t(e).trigger("blur")
    }, t.widget("ui.draggable", t.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            "original" === this.options.helper && this._setPositionRelative(), this.options.addClasses && this._addClass("ui-draggable"), this._setHandleClassName(), this._mouseInit()
        },
        _setOption: function(t, e) {
            this._super(t, e), "handle" === t && (this._removeHandleClassName(), this._setHandleClassName())
        },
        _destroy: function() {
            return (this.helper || this.element).is(".ui-draggable-dragging") ? void(this.destroyOnClear = !0) : (this._removeHandleClassName(), void this._mouseDestroy())
        },
        _mouseCapture: function(e) {
            var i = this.options;
            return !(this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0) && (this.handle = this._getHandle(e), !!this.handle && (this._blurActiveElement(e), this._blockFrames(!0 === i.iframeFix ? "iframe" : i.iframeFix), !0))
        },
        _blockFrames: function(e) {
            this.iframeBlocks = this.document.find(e).map(function() {
                var e = t(this);
                return t("<div>").css("position", "absolute").appendTo(e.parent()).outerWidth(e.outerWidth()).outerHeight(e.outerHeight()).offset(e.offset())[0]
            })
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
        },
        _blurActiveElement: function(e) {
            var i = t.ui.safeActiveElement(this.document[0]);
            t(e.target).closest(i).length || t.ui.safeBlur(i)
        },
        _mouseStart: function(e) {
            var i = this.options;
            return this.helper = this._createHelper(e), this._addClass(this.helper, "ui-draggable-dragging"), this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function() {
                return "fixed" === t(this).css("position")
            }).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(e), this.originalPosition = this.position = this._generatePosition(e, !1), this.originalPageX = e.pageX, this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), !1 === this._trigger("start", e) ? (this._clear(), !1) : (this._cacheHelperProportions(), t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0), t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0)
        },
        _refreshOffsets: function(t) {
            this.offset = {
                top: this.positionAbs.top - this.margins.top,
                left: this.positionAbs.left - this.margins.left,
                scroll: !1,
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }, this.offset.click = {
                left: t.pageX - this.offset.left,
                top: t.pageY - this.offset.top
            }
        },
        _mouseDrag: function(e, i) {
            if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(e, !0), this.positionAbs = this._convertPositionTo("absolute"), !i) {
                var s = this._uiHash();
                if (!1 === this._trigger("drag", e, s)) return this._mouseUp(new t.Event("mouseup", e)), !1;
                this.position = s.position
            }
            return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1
        },
        _mouseStop: function(e) {
            var i = this,
                s = !1;
            return t.ui.ddmanager && !this.options.dropBehaviour && (s = t.ui.ddmanager.drop(this, e)), this.dropped && (s = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !s || "valid" === this.options.revert && s || !0 === this.options.revert || t.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                !1 !== i._trigger("stop", e) && i._clear()
            }) : !1 !== this._trigger("stop", e) && this._clear(), !1
        },
        _mouseUp: function(e) {
            return this._unblockFrames(), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), this.handleElement.is(e.target) && this.element.trigger("focus"), t.ui.mouse.prototype._mouseUp.call(this, e)
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new t.Event("mouseup", {
                target: this.element[0]
            })) : this._clear(), this
        },
        _getHandle: function(e) {
            return !this.options.handle || !!t(e.target).closest(this.element.find(this.options.handle)).length
        },
        _setHandleClassName: function() {
            this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element, this._addClass(this.handleElement, "ui-draggable-handle")
        },
        _removeHandleClassName: function() {
            this._removeClass(this.handleElement, "ui-draggable-handle")
        },
        _createHelper: function(e) {
            var i = this.options,
                s = t.isFunction(i.helper),
                o = s ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
            return o.parents("body").length || o.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo), s && o[0] === this.element[0] && this._setPositionRelative(), o[0] === this.element[0] || /(fixed|absolute)/.test(o.css("position")) || o.css("position", "absolute"), o
        },
        _setPositionRelative: function() {
            /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
        },
        _adjustOffsetFromHelper: function(e) {
            "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                left: +e[0],
                top: +e[1] || 0
            }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
        },
        _isRootNode: function(t) {
            return /(html|body)/i.test(t.tagName) || t === this.document[0]
        },
        _getParentOffset: function() {
            var e = this.offsetParent.offset(),
                i = this.document[0];
            return "absolute" === this.cssPosition && this.scrollParent[0] !== i && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (e = {
                top: 0,
                left: 0
            }), {
                top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" !== this.cssPosition) return {
                top: 0,
                left: 0
            };
            var t = this.element.position(),
                e = this._isRootNode(this.scrollParent[0]);
            return {
                top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + (e ? 0 : this.scrollParent.scrollTop()),
                left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + (e ? 0 : this.scrollParent.scrollLeft())
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var e, i, s, o = this.options,
                n = this.document[0];
            return this.relativeContainer = null, o.containment ? "window" === o.containment ? void(this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || n.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : "document" === o.containment ? void(this.containment = [0, 0, t(n).width() - this.helperProportions.width - this.margins.left, (t(n).height() || n.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : o.containment.constructor === Array ? void(this.containment = o.containment) : ("parent" === o.containment && (o.containment = this.helper[0].parentNode), i = t(o.containment), void((s = i[0]) && (e = /(scroll|auto)/.test(i.css("overflow")), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = i))) : void(this.containment = null)
        },
        _convertPositionTo: function(t, e) {
            e || (e = this.position);
            var i = "absolute" === t ? 1 : -1,
                s = this._isRootNode(this.scrollParent[0]);
            return {
                top: e.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : s ? 0 : this.offset.scroll.top) * i,
                left: e.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : s ? 0 : this.offset.scroll.left) * i
            }
        },
        _generatePosition: function(t, e) {
            var i, s, o, n, r = this.options,
                h = this._isRootNode(this.scrollParent[0]),
                a = t.pageX,
                l = t.pageY;
            return h && this.offset.scroll || (this.offset.scroll = {
                top: this.scrollParent.scrollTop(),
                left: this.scrollParent.scrollLeft()
            }), e && (this.containment && (this.relativeContainer ? (s = this.relativeContainer.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, t.pageX - this.offset.click.left < i[0] && (a = i[0] + this.offset.click.left), t.pageY - this.offset.click.top < i[1] && (l = i[1] + this.offset.click.top), t.pageX - this.offset.click.left > i[2] && (a = i[2] + this.offset.click.left), t.pageY - this.offset.click.top > i[3] && (l = i[3] + this.offset.click.top)), r.grid && (o = r.grid[1] ? this.originalPageY + Math.round((l - this.originalPageY) / r.grid[1]) * r.grid[1] : this.originalPageY, l = i ? o - this.offset.click.top >= i[1] || o - this.offset.click.top > i[3] ? o : o - this.offset.click.top >= i[1] ? o - r.grid[1] : o + r.grid[1] : o, n = r.grid[0] ? this.originalPageX + Math.round((a - this.originalPageX) / r.grid[0]) * r.grid[0] : this.originalPageX, a = i ? n - this.offset.click.left >= i[0] || n - this.offset.click.left > i[2] ? n : n - this.offset.click.left >= i[0] ? n - r.grid[0] : n + r.grid[0] : n), "y" === r.axis && (a = this.originalPageX), "x" === r.axis && (l = this.originalPageY)), {
                top: l - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : h ? 0 : this.offset.scroll.top),
                left: a - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : h ? 0 : this.offset.scroll.left)
            }
        },
        _clear: function() {
            this._removeClass(this.helper, "ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1, this.destroyOnClear && this.destroy()
        },
        _trigger: function(e, i, s) {
            return s = s || this._uiHash(), t.ui.plugin.call(this, e, [i, s, this], !0), /^(drag|start|stop)/.test(e) && (this.positionAbs = this._convertPositionTo("absolute"), s.offset = this.positionAbs), t.Widget.prototype._trigger.call(this, e, i, s)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }), t.ui.plugin.add("draggable", "connectToSortable", {
        start: function(e, i, s) {
            var o = t.extend({}, i, {
                item: s.element
            });
            s.sortables = [], t(s.options.connectToSortable).each(function() {
                var i = t(this).sortable("instance");
                i && !i.options.disabled && (s.sortables.push(i), i.refreshPositions(), i._trigger("activate", e, o))
            })
        },
        stop: function(e, i, s) {
            var o = t.extend({}, i, {
                item: s.element
            });
            s.cancelHelperRemoval = !1, t.each(s.sortables, function() {
                var t = this;
                t.isOver ? (t.isOver = 0, s.cancelHelperRemoval = !0, t.cancelHelperRemoval = !1, t._storedCSS = {
                    position: t.placeholder.css("position"),
                    top: t.placeholder.css("top"),
                    left: t.placeholder.css("left")
                }, t._mouseStop(e), t.options.helper = t.options._helper) : (t.cancelHelperRemoval = !0, t._trigger("deactivate", e, o))
            })
        },
        drag: function(e, i, s) {
            t.each(s.sortables, function() {
                var o = !1,
                    n = this;
                n.positionAbs = s.positionAbs, n.helperProportions = s.helperProportions, n.offset.click = s.offset.click, n._intersectsWith(n.containerCache) && (o = !0, t.each(s.sortables, function() {
                    return this.positionAbs = s.positionAbs, this.helperProportions = s.helperProportions, this.offset.click = s.offset.click, this !== n && this._intersectsWith(this.containerCache) && t.contains(n.element[0], this.element[0]) && (o = !1), o
                })), o ? (n.isOver || (n.isOver = 1, s._parent = i.helper.parent(), n.currentItem = i.helper.appendTo(n.element).data("ui-sortable-item", !0), n.options._helper = n.options.helper, n.options.helper = function() {
                    return i.helper[0]
                }, e.target = n.currentItem[0], n._mouseCapture(e, !0), n._mouseStart(e, !0, !0), n.offset.click.top = s.offset.click.top, n.offset.click.left = s.offset.click.left, n.offset.parent.left -= s.offset.parent.left - n.offset.parent.left, n.offset.parent.top -= s.offset.parent.top - n.offset.parent.top, s._trigger("toSortable", e), s.dropped = n.element, t.each(s.sortables, function() {
                    this.refreshPositions()
                }), s.currentItem = s.element, n.fromOutside = s), n.currentItem && (n._mouseDrag(e), i.position = n.position)) : n.isOver && (n.isOver = 0, n.cancelHelperRemoval = !0, n.options._revert = n.options.revert, n.options.revert = !1, n._trigger("out", e, n._uiHash(n)), n._mouseStop(e, !0), n.options.revert = n.options._revert, n.options.helper = n.options._helper, n.placeholder && n.placeholder.remove(), i.helper.appendTo(s._parent), s._refreshOffsets(e), i.position = s._generatePosition(e, !0), s._trigger("fromSortable", e), s.dropped = !1, t.each(s.sortables, function() {
                    this.refreshPositions()
                }))
            })
        }
    }), t.ui.plugin.add("draggable", "cursor", {
        start: function(e, i, s) {
            var o = t("body"),
                n = s.options;
            o.css("cursor") && (n._cursor = o.css("cursor")), o.css("cursor", n.cursor)
        },
        stop: function(e, i, s) {
            var o = s.options;
            o._cursor && t("body").css("cursor", o._cursor)
        }
    }), t.ui.plugin.add("draggable", "opacity", {
        start: function(e, i, s) {
            var o = t(i.helper),
                n = s.options;
            o.css("opacity") && (n._opacity = o.css("opacity")), o.css("opacity", n.opacity)
        },
        stop: function(e, i, s) {
            var o = s.options;
            o._opacity && t(i.helper).css("opacity", o._opacity)
        }
    }), t.ui.plugin.add("draggable", "scroll", {
        start: function(t, e, i) {
            i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1)), i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset())
        },
        drag: function(e, i, s) {
            var o = s.options,
                n = !1,
                r = s.scrollParentNotHidden[0],
                h = s.document[0];
            r !== h && "HTML" !== r.tagName ? (o.axis && "x" === o.axis || (s.overflowOffset.top + r.offsetHeight - e.pageY < o.scrollSensitivity ? r.scrollTop = n = r.scrollTop + o.scrollSpeed : e.pageY - s.overflowOffset.top < o.scrollSensitivity && (r.scrollTop = n = r.scrollTop - o.scrollSpeed)), o.axis && "y" === o.axis || (s.overflowOffset.left + r.offsetWidth - e.pageX < o.scrollSensitivity ? r.scrollLeft = n = r.scrollLeft + o.scrollSpeed : e.pageX - s.overflowOffset.left < o.scrollSensitivity && (r.scrollLeft = n = r.scrollLeft - o.scrollSpeed))) : (o.axis && "x" === o.axis || (e.pageY - t(h).scrollTop() < o.scrollSensitivity ? n = t(h).scrollTop(t(h).scrollTop() - o.scrollSpeed) : t(window).height() - (e.pageY - t(h).scrollTop()) < o.scrollSensitivity && (n = t(h).scrollTop(t(h).scrollTop() + o.scrollSpeed))), o.axis && "y" === o.axis || (e.pageX - t(h).scrollLeft() < o.scrollSensitivity ? n = t(h).scrollLeft(t(h).scrollLeft() - o.scrollSpeed) : t(window).width() - (e.pageX - t(h).scrollLeft()) < o.scrollSensitivity && (n = t(h).scrollLeft(t(h).scrollLeft() + o.scrollSpeed)))), !1 !== n && t.ui.ddmanager && !o.dropBehaviour && t.ui.ddmanager.prepareOffsets(s, e)
        }
    }), t.ui.plugin.add("draggable", "snap", {
        start: function(e, i, s) {
            var o = s.options;
            s.snapElements = [], t(o.snap.constructor !== String ? o.snap.items || ":data(ui-draggable)" : o.snap).each(function() {
                var e = t(this),
                    i = e.offset();
                this !== s.element[0] && s.snapElements.push({
                    item: this,
                    width: e.outerWidth(),
                    height: e.outerHeight(),
                    top: i.top,
                    left: i.left
                })
            })
        },
        drag: function(e, i, s) {
            var o, n, r, h, a, l, c, p, f, d, u = s.options,
                g = u.snapTolerance,
                m = i.offset.left,
                v = m + s.helperProportions.width,
                _ = i.offset.top,
                b = _ + s.helperProportions.height;
            for (f = s.snapElements.length - 1; f >= 0; f--) a = s.snapElements[f].left - s.margins.left, l = a + s.snapElements[f].width, c = s.snapElements[f].top - s.margins.top, p = c + s.snapElements[f].height, a - g > v || m > l + g || c - g > b || _ > p + g || !t.contains(s.snapElements[f].item.ownerDocument, s.snapElements[f].item) ? (s.snapElements[f].snapping && s.options.snap.release && s.options.snap.release.call(s.element, e, t.extend(s._uiHash(), {
                snapItem: s.snapElements[f].item
            })), s.snapElements[f].snapping = !1) : ("inner" !== u.snapMode && (o = g >= Math.abs(c - b), n = g >= Math.abs(p - _), r = g >= Math.abs(a - v), h = g >= Math.abs(l - m), o && (i.position.top = s._convertPositionTo("relative", {
                top: c - s.helperProportions.height,
                left: 0
            }).top), n && (i.position.top = s._convertPositionTo("relative", {
                top: p,
                left: 0
            }).top), r && (i.position.left = s._convertPositionTo("relative", {
                top: 0,
                left: a - s.helperProportions.width
            }).left), h && (i.position.left = s._convertPositionTo("relative", {
                top: 0,
                left: l
            }).left)), d = o || n || r || h, "outer" !== u.snapMode && (o = g >= Math.abs(c - _), n = g >= Math.abs(p - b), r = g >= Math.abs(a - m), h = g >= Math.abs(l - v), o && (i.position.top = s._convertPositionTo("relative", {
                top: c,
                left: 0
            }).top), n && (i.position.top = s._convertPositionTo("relative", {
                top: p - s.helperProportions.height,
                left: 0
            }).top), r && (i.position.left = s._convertPositionTo("relative", {
                top: 0,
                left: a
            }).left), h && (i.position.left = s._convertPositionTo("relative", {
                top: 0,
                left: l - s.helperProportions.width
            }).left)), !s.snapElements[f].snapping && (o || n || r || h || d) && s.options.snap.snap && s.options.snap.snap.call(s.element, e, t.extend(s._uiHash(), {
                snapItem: s.snapElements[f].item
            })), s.snapElements[f].snapping = o || n || r || h || d)
        }
    }), t.ui.plugin.add("draggable", "stack", {
        start: function(e, i, s) {
            var o, n = s.options,
                r = t.makeArray(t(n.stack)).sort(function(e, i) {
                    return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0)
                });
            r.length && (o = parseInt(t(r[0]).css("zIndex"), 10) || 0, t(r).each(function(e) {
                t(this).css("zIndex", o + e)
            }), this.css("zIndex", o + r.length))
        }
    }), t.ui.plugin.add("draggable", "zIndex", {
        start: function(e, i, s) {
            var o = t(i.helper),
                n = s.options;
            o.css("zIndex") && (n._zIndex = o.css("zIndex")), o.css("zIndex", n.zIndex)
        },
        stop: function(e, i, s) {
            var o = s.options;
            o._zIndex && t(i.helper).css("zIndex", o._zIndex)
        }
    }), t.ui.draggable, t.widget("ui.droppable", {
        version: "1.12.1",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            addClasses: !0,
            greedy: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function() {
            var e, i = this.options,
                s = i.accept;
            this.isover = !1, this.isout = !0, this.accept = t.isFunction(s) ? s : function(t) {
                return t.is(s)
            }, this.proportions = function() {
                return arguments.length ? void(e = arguments[0]) : e || (e = {
                    width: this.element[0].offsetWidth,
                    height: this.element[0].offsetHeight
                })
            }, this._addToManager(i.scope), i.addClasses && this._addClass("ui-droppable")
        },
        _addToManager: function(e) {
            t.ui.ddmanager.droppables[e] = t.ui.ddmanager.droppables[e] || [], t.ui.ddmanager.droppables[e].push(this)
        },
        _splice: function(t) {
            for (var e = 0; t.length > e; e++) t[e] === this && t.splice(e, 1)
        },
        _destroy: function() {
            var e = t.ui.ddmanager.droppables[this.options.scope];
            this._splice(e)
        },
        _setOption: function(e, i) {
            if ("accept" === e) this.accept = t.isFunction(i) ? i : function(t) {
                return t.is(i)
            };
            else if ("scope" === e) {
                var s = t.ui.ddmanager.droppables[this.options.scope];
                this._splice(s), this._addToManager(i)
            }
            this._super(e, i)
        },
        _activate: function(e) {
            var i = t.ui.ddmanager.current;
            this._addActiveClass(), i && this._trigger("activate", e, this.ui(i))
        },
        _deactivate: function(e) {
            var i = t.ui.ddmanager.current;
            this._removeActiveClass(), i && this._trigger("deactivate", e, this.ui(i))
        },
        _over: function(e) {
            var i = t.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._addHoverClass(), this._trigger("over", e, this.ui(i)))
        },
        _out: function(e) {
            var i = t.ui.ddmanager.current;
            i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._removeHoverClass(), this._trigger("out", e, this.ui(i)))
        },
        _drop: function(e, i) {
            var s = i || t.ui.ddmanager.current,
                o = !1;
            return !(!s || (s.currentItem || s.element)[0] === this.element[0]) && (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                var i = t(this).droppable("instance");
                return i.options.greedy && !i.options.disabled && i.options.scope === s.options.scope && i.accept.call(i.element[0], s.currentItem || s.element) && n(s, t.extend(i, {
                    offset: i.element.offset()
                }), i.options.tolerance, e) ? (o = !0, !1) : void 0
            }), !o && (!!this.accept.call(this.element[0], s.currentItem || s.element) && (this._removeActiveClass(), this._removeHoverClass(), this._trigger("drop", e, this.ui(s)), this.element)))
        },
        ui: function(t) {
            return {
                draggable: t.currentItem || t.element,
                helper: t.helper,
                position: t.position,
                offset: t.positionAbs
            }
        },
        _addHoverClass: function() {
            this._addClass("ui-droppable-hover")
        },
        _removeHoverClass: function() {
            this._removeClass("ui-droppable-hover")
        },
        _addActiveClass: function() {
            this._addClass("ui-droppable-active")
        },
        _removeActiveClass: function() {
            this._removeClass("ui-droppable-active")
        }
    });
    var n = t.ui.intersect = function() {
        function t(t, e, i) {
            return t >= e && e + i > t
        }
        return function(e, i, s, o) {
            if (!i.offset) return !1;
            var n = (e.positionAbs || e.position.absolute).left + e.margins.left,
                r = (e.positionAbs || e.position.absolute).top + e.margins.top,
                h = n + e.helperProportions.width,
                a = r + e.helperProportions.height,
                l = i.offset.left,
                c = i.offset.top,
                p = l + i.proportions().width,
                f = c + i.proportions().height;
            switch (s) {
                case "fit":
                    return n >= l && p >= h && r >= c && f >= a;
                case "intersect":
                    return n + e.helperProportions.width / 2 > l && p > h - e.helperProportions.width / 2 && r + e.helperProportions.height / 2 > c && f > a - e.helperProportions.height / 2;
                case "pointer":
                    return t(o.pageY, c, i.proportions().height) && t(o.pageX, l, i.proportions().width);
                case "touch":
                    return (r >= c && f >= r || a >= c && f >= a || c > r && a > f) && (n >= l && p >= n || h >= l && p >= h || l > n && h > p);
                default:
                    return !1
            }
        }
    }();
    t.ui.ddmanager = {
        current: null,
        droppables: {
            default: []
        },
        prepareOffsets: function(e, i) {
            var s, o, n = t.ui.ddmanager.droppables[e.options.scope] || [],
                r = i ? i.type : null,
                h = (e.currentItem || e.element).find(":data(ui-droppable)").addBack();
            t: for (s = 0; n.length > s; s++)
                if (!(n[s].options.disabled || e && !n[s].accept.call(n[s].element[0], e.currentItem || e.element))) {
                    for (o = 0; h.length > o; o++)
                        if (h[o] === n[s].element[0]) {
                            n[s].proportions().height = 0;
                            continue t
                        } n[s].visible = "none" !== n[s].element.css("display"), n[s].visible && ("mousedown" === r && n[s]._activate.call(n[s], i), n[s].offset = n[s].element.offset(), n[s].proportions({
                        width: n[s].element[0].offsetWidth,
                        height: n[s].element[0].offsetHeight
                    }))
                }
        },
        drop: function(e, i) {
            var s = !1;
            return t.each((t.ui.ddmanager.droppables[e.options.scope] || []).slice(), function() {
                this.options && (!this.options.disabled && this.visible && n(e, this, this.options.tolerance, i) && (s = this._drop.call(this, i) || s), !this.options.disabled && this.visible && this.accept.call(this.element[0], e.currentItem || e.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
            }), s
        },
        dragStart: function(e, i) {
            e.element.parentsUntil("body").on("scroll.droppable", function() {
                e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
            })
        },
        drag: function(e, i) {
            e.options.refreshPositions && t.ui.ddmanager.prepareOffsets(e, i), t.each(t.ui.ddmanager.droppables[e.options.scope] || [], function() {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var s, o, r, h = n(e, this, this.options.tolerance, i),
                        a = !h && this.isover ? "isout" : h && !this.isover ? "isover" : null;
                    a && (this.options.greedy && (o = this.options.scope, (r = this.element.parents(":data(ui-droppable)").filter(function() {
                        return t(this).droppable("instance").options.scope === o
                    })).length && (s = t(r[0]).droppable("instance"), s.greedyChild = "isover" === a)), s && "isover" === a && (s.isover = !1, s.isout = !0, s._out.call(s, i)), this[a] = !0, this["isout" === a ? "isover" : "isout"] = !1, this["isover" === a ? "_over" : "_out"].call(this, i), s && "isout" === a && (s.isout = !1, s.isover = !0, s._over.call(s, i)))
                }
            })
        },
        dragStop: function(e, i) {
            e.element.parentsUntil("body").off("scroll.droppable"), e.options.refreshPositions || t.ui.ddmanager.prepareOffsets(e, i)
        }
    }, !1 !== t.uiBackCompat && t.widget("ui.droppable", t.ui.droppable, {
        options: {
            hoverClass: !1,
            activeClass: !1
        },
        _addActiveClass: function() {
            this._super(), this.options.activeClass && this.element.addClass(this.options.activeClass)
        },
        _removeActiveClass: function() {
            this._super(), this.options.activeClass && this.element.removeClass(this.options.activeClass)
        },
        _addHoverClass: function() {
            this._super(), this.options.hoverClass && this.element.addClass(this.options.hoverClass)
        },
        _removeHoverClass: function() {
            this._super(), this.options.hoverClass && this.element.removeClass(this.options.hoverClass)
        }
    }), t.ui.droppable, t.widget("ui.resizable", t.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            classes: {
                "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"
            },
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _num: function(t) {
            return parseFloat(t) || 0
        },
        _isNumber: function(t) {
            return !isNaN(parseFloat(t))
        },
        _hasScroll: function(e, i) {
            if ("hidden" === t(e).css("overflow")) return !1;
            var s = i && "left" === i ? "scrollLeft" : "scrollTop",
                o = !1;
            return e[s] > 0 || (e[s] = 1, o = e[s] > 0, e[s] = 0, o)
        },
        _create: function() {
            var e, i = this.options,
                s = this;
            this._addClass("ui-resizable"), t.extend(this, {
                _aspectRatio: !!i.aspectRatio,
                aspectRatio: i.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: i.helper || i.ghost || i.animate ? i.helper || "ui-resizable-helper" : null
            }), this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(t("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                position: this.element.css("position"),
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                top: this.element.css("top"),
                left: this.element.css("left")
            })), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, e = {
                marginTop: this.originalElement.css("marginTop"),
                marginRight: this.originalElement.css("marginRight"),
                marginBottom: this.originalElement.css("marginBottom"),
                marginLeft: this.originalElement.css("marginLeft")
            }, this.element.css(e), this.originalElement.css("margin", 0), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block"
            })), this.originalElement.css(e), this._proportionallyResize()), this._setupHandles(), i.autoHide && t(this.element).on("mouseenter", function() {
                i.disabled || (s._removeClass("ui-resizable-autohide"), s._handles.show())
            }).on("mouseleave", function() {
                i.disabled || s.resizing || (s._addClass("ui-resizable-autohide"), s._handles.hide())
            }), this._mouseInit()
        },
        _destroy: function() {
            this._mouseDestroy();
            var e, i = function(e) {
                t(e).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove()
            };
            return this.elementIsWrapper && (i(this.element), e = this.element, this.originalElement.css({
                position: e.css("position"),
                width: e.outerWidth(),
                height: e.outerHeight(),
                top: e.css("top"),
                left: e.css("left")
            }).insertAfter(e), e.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
        },
        _setOption: function(t, e) {
            switch (this._super(t, e), t) {
                case "handles":
                    this._removeHandles(), this._setupHandles()
            }
        },
        _setupHandles: function() {
            var e, i, s, o, n, r = this.options,
                h = this;
            if (this.handles = r.handles || (t(".ui-resizable-handle", this.element).length ? {
                    n: ".ui-resizable-n",
                    e: ".ui-resizable-e",
                    s: ".ui-resizable-s",
                    w: ".ui-resizable-w",
                    se: ".ui-resizable-se",
                    sw: ".ui-resizable-sw",
                    ne: ".ui-resizable-ne",
                    nw: ".ui-resizable-nw"
                } : "e,s,se"), this._handles = t(), this.handles.constructor === String)
                for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), s = this.handles.split(","), this.handles = {}, i = 0; s.length > i; i++) e = t.trim(s[i]), o = "ui-resizable-" + e, n = t("<div>"), this._addClass(n, "ui-resizable-handle " + o), n.css({
                    zIndex: r.zIndex
                }), this.handles[e] = ".ui-resizable-" + e, this.element.append(n);
            this._renderAxis = function(e) {
                var i, s, o, n;
                e = e || this.element;
                for (i in this.handles) this.handles[i].constructor === String ? this.handles[i] = this.element.children(this.handles[i]).first().show() : (this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = t(this.handles[i]), this._on(this.handles[i], {
                    mousedown: h._mouseDown
                })), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (s = t(this.handles[i], this.element), n = /sw|ne|nw|se|n|s/.test(i) ? s.outerHeight() : s.outerWidth(), o = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), e.css(o, n), this._proportionallyResize()), this._handles = this._handles.add(this.handles[i])
            }, this._renderAxis(this.element), this._handles = this._handles.add(this.element.find(".ui-resizable-handle")), this._handles.disableSelection(), this._handles.on("mouseover", function() {
                h.resizing || (this.className && (n = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), h.axis = n && n[1] ? n[1] : "se")
            }), r.autoHide && (this._handles.hide(), this._addClass("ui-resizable-autohide"))
        },
        _removeHandles: function() {
            this._handles.remove()
        },
        _mouseCapture: function(e) {
            var i, s, o = !1;
            for (i in this.handles)((s = t(this.handles[i])[0]) === e.target || t.contains(s, e.target)) && (o = !0);
            return !this.options.disabled && o
        },
        _mouseStart: function(e) {
            var i, s, o, n = this.options,
                r = this.element;
            return this.resizing = !0, this._renderProxy(), i = this._num(this.helper.css("left")), s = this._num(this.helper.css("top")), n.containment && (i += t(n.containment).scrollLeft() || 0, s += t(n.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                left: i,
                top: s
            }, this.size = this._helper ? {
                width: this.helper.width(),
                height: this.helper.height()
            } : {
                width: r.width(),
                height: r.height()
            }, this.originalSize = this._helper ? {
                width: r.outerWidth(),
                height: r.outerHeight()
            } : {
                width: r.width(),
                height: r.height()
            }, this.sizeDiff = {
                width: r.outerWidth() - r.width(),
                height: r.outerHeight() - r.height()
            }, this.originalPosition = {
                left: i,
                top: s
            }, this.originalMousePosition = {
                left: e.pageX,
                top: e.pageY
            }, this.aspectRatio = "number" == typeof n.aspectRatio ? n.aspectRatio : this.originalSize.width / this.originalSize.height || 1, o = t(".ui-resizable-" + this.axis).css("cursor"), t("body").css("cursor", "auto" === o ? this.axis + "-resize" : o), this._addClass("ui-resizable-resizing"), this._propagate("start", e), !0
        },
        _mouseDrag: function(e) {
            var i, s, o = this.originalMousePosition,
                n = this.axis,
                r = e.pageX - o.left || 0,
                h = e.pageY - o.top || 0,
                a = this._change[n];
            return this._updatePrevProperties(), !!a && (i = a.apply(this, [e, r, h]), this._updateVirtualBoundaries(e.shiftKey), (this._aspectRatio || e.shiftKey) && (i = this._updateRatio(i, e)), i = this._respectSize(i, e), this._updateCache(i), this._propagate("resize", e), s = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), t.isEmptyObject(s) || (this._updatePrevProperties(), this._trigger("resize", e, this.ui()), this._applyChanges()), !1)
        },
        _mouseStop: function(e) {
            this.resizing = !1;
            var i, s, o, n, r, h, a, l = this.options,
                c = this;
            return this._helper && (i = this._proportionallyResizeElements, s = i.length && /textarea/i.test(i[0].nodeName), o = s && this._hasScroll(i[0], "left") ? 0 : c.sizeDiff.height, n = s ? 0 : c.sizeDiff.width, r = {
                width: c.helper.width() - n,
                height: c.helper.height() - o
            }, h = parseFloat(c.element.css("left")) + (c.position.left - c.originalPosition.left) || null, a = parseFloat(c.element.css("top")) + (c.position.top - c.originalPosition.top) || null, l.animate || this.element.css(t.extend(r, {
                top: a,
                left: h
            })), c.helper.height(c.size.height), c.helper.width(c.size.width), this._helper && !l.animate && this._proportionallyResize()), t("body").css("cursor", "auto"), this._removeClass("ui-resizable-resizing"), this._propagate("stop", e), this._helper && this.helper.remove(), !1
        },
        _updatePrevProperties: function() {
            this.prevPosition = {
                top: this.position.top,
                left: this.position.left
            }, this.prevSize = {
                width: this.size.width,
                height: this.size.height
            }
        },
        _applyChanges: function() {
            var t = {};
            return this.position.top !== this.prevPosition.top && (t.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (t.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (t.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (t.height = this.size.height + "px"), this.helper.css(t), t
        },
        _updateVirtualBoundaries: function(t) {
            var e, i, s, o, n, r = this.options;
            n = {
                minWidth: this._isNumber(r.minWidth) ? r.minWidth : 0,
                maxWidth: this._isNumber(r.maxWidth) ? r.maxWidth : 1 / 0,
                minHeight: this._isNumber(r.minHeight) ? r.minHeight : 0,
                maxHeight: this._isNumber(r.maxHeight) ? r.maxHeight : 1 / 0
            }, (this._aspectRatio || t) && (e = n.minHeight * this.aspectRatio, s = n.minWidth / this.aspectRatio, i = n.maxHeight * this.aspectRatio, o = n.maxWidth / this.aspectRatio, e > n.minWidth && (n.minWidth = e), s > n.minHeight && (n.minHeight = s), n.maxWidth > i && (n.maxWidth = i), n.maxHeight > o && (n.maxHeight = o)), this._vBoundaries = n
        },
        _updateCache: function(t) {
            this.offset = this.helper.offset(), this._isNumber(t.left) && (this.position.left = t.left), this._isNumber(t.top) && (this.position.top = t.top), this._isNumber(t.height) && (this.size.height = t.height), this._isNumber(t.width) && (this.size.width = t.width)
        },
        _updateRatio: function(t) {
            var e = this.position,
                i = this.size,
                s = this.axis;
            return this._isNumber(t.height) ? t.width = t.height * this.aspectRatio : this._isNumber(t.width) && (t.height = t.width / this.aspectRatio), "sw" === s && (t.left = e.left + (i.width - t.width), t.top = null), "nw" === s && (t.top = e.top + (i.height - t.height), t.left = e.left + (i.width - t.width)), t
        },
        _respectSize: function(t) {
            var e = this._vBoundaries,
                i = this.axis,
                s = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width,
                o = this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height,
                n = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width,
                r = this._isNumber(t.height) && e.minHeight && e.minHeight > t.height,
                h = this.originalPosition.left + this.originalSize.width,
                a = this.originalPosition.top + this.originalSize.height,
                l = /sw|nw|w/.test(i),
                c = /nw|ne|n/.test(i);
            return n && (t.width = e.minWidth), r && (t.height = e.minHeight), s && (t.width = e.maxWidth), o && (t.height = e.maxHeight), n && l && (t.left = h - e.minWidth), s && l && (t.left = h - e.maxWidth), r && c && (t.top = a - e.minHeight), o && c && (t.top = a - e.maxHeight), t.width || t.height || t.left || !t.top ? t.width || t.height || t.top || !t.left || (t.left = null) : t.top = null, t
        },
        _getPaddingPlusBorderDimensions: function(t) {
            for (var e = 0, i = [], s = [t.css("borderTopWidth"), t.css("borderRightWidth"), t.css("borderBottomWidth"), t.css("borderLeftWidth")], o = [t.css("paddingTop"), t.css("paddingRight"), t.css("paddingBottom"), t.css("paddingLeft")]; 4 > e; e++) i[e] = parseFloat(s[e]) || 0, i[e] += parseFloat(o[e]) || 0;
            return {
                height: i[0] + i[2],
                width: i[1] + i[3]
            }
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length)
                for (var t, e = 0, i = this.helper || this.element; this._proportionallyResizeElements.length > e; e++) t = this._proportionallyResizeElements[e], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(t)), t.css({
                    height: i.height() - this.outerDimensions.height || 0,
                    width: i.width() - this.outerDimensions.width || 0
                })
        },
        _renderProxy: function() {
            var e = this.element,
                i = this.options;
            this.elementOffset = e.offset(), this._helper ? (this.helper = this.helper || t("<div style='overflow:hidden;'></div>"), this._addClass(this.helper, this._helper), this.helper.css({
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++i.zIndex
            }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
        },
        _change: {
            e: function(t, e) {
                return {
                    width: this.originalSize.width + e
                }
            },
            w: function(t, e) {
                var i = this.originalSize;
                return {
                    left: this.originalPosition.left + e,
                    width: i.width - e
                }
            },
            n: function(t, e, i) {
                var s = this.originalSize;
                return {
                    top: this.originalPosition.top + i,
                    height: s.height - i
                }
            },
            s: function(t, e, i) {
                return {
                    height: this.originalSize.height + i
                }
            },
            se: function(e, i, s) {
                return t.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
            },
            sw: function(e, i, s) {
                return t.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
            },
            ne: function(e, i, s) {
                return t.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [e, i, s]))
            },
            nw: function(e, i, s) {
                return t.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [e, i, s]))
            }
        },
        _propagate: function(e, i) {
            t.ui.plugin.call(this, e, [i, this.ui()]), "resize" !== e && this._trigger(e, i, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    }), t.ui.plugin.add("resizable", "animate", {
        stop: function(e) {
            var i = t(this).resizable("instance"),
                s = i.options,
                o = i._proportionallyResizeElements,
                n = o.length && /textarea/i.test(o[0].nodeName),
                r = n && i._hasScroll(o[0], "left") ? 0 : i.sizeDiff.height,
                h = n ? 0 : i.sizeDiff.width,
                a = {
                    width: i.size.width - h,
                    height: i.size.height - r
                },
                l = parseFloat(i.element.css("left")) + (i.position.left - i.originalPosition.left) || null,
                c = parseFloat(i.element.css("top")) + (i.position.top - i.originalPosition.top) || null;
            i.element.animate(t.extend(a, c && l ? {
                top: c,
                left: l
            } : {}), {
                duration: s.animateDuration,
                easing: s.animateEasing,
                step: function() {
                    var s = {
                        width: parseFloat(i.element.css("width")),
                        height: parseFloat(i.element.css("height")),
                        top: parseFloat(i.element.css("top")),
                        left: parseFloat(i.element.css("left"))
                    };
                    o && o.length && t(o[0]).css({
                        width: s.width,
                        height: s.height
                    }), i._updateCache(s), i._propagate("resize", e)
                }
            })
        }
    }), t.ui.plugin.add("resizable", "containment", {
        start: function() {
            var e, i, s, o, n, r, h, a = t(this).resizable("instance"),
                l = a.options,
                c = a.element,
                p = l.containment,
                f = p instanceof t ? p.get(0) : /parent/.test(p) ? c.parent().get(0) : p;
            f && (a.containerElement = t(f), /document/.test(p) || p === document ? (a.containerOffset = {
                left: 0,
                top: 0
            }, a.containerPosition = {
                left: 0,
                top: 0
            }, a.parentData = {
                element: t(document),
                left: 0,
                top: 0,
                width: t(document).width(),
                height: t(document).height() || document.body.parentNode.scrollHeight
            }) : (e = t(f), i = [], t(["Top", "Right", "Left", "Bottom"]).each(function(t, s) {
                i[t] = a._num(e.css("padding" + s))
            }), a.containerOffset = e.offset(), a.containerPosition = e.position(), a.containerSize = {
                height: e.innerHeight() - i[3],
                width: e.innerWidth() - i[1]
            }, s = a.containerOffset, o = a.containerSize.height, n = a.containerSize.width, r = a._hasScroll(f, "left") ? f.scrollWidth : n, h = a._hasScroll(f) ? f.scrollHeight : o, a.parentData = {
                element: f,
                left: s.left,
                top: s.top,
                width: r,
                height: h
            }))
        },
        resize: function(e) {
            var i, s, o, n, r = t(this).resizable("instance"),
                h = r.options,
                a = r.containerOffset,
                l = r.position,
                c = r._aspectRatio || e.shiftKey,
                p = {
                    top: 0,
                    left: 0
                },
                f = r.containerElement,
                d = !0;
            f[0] !== document && /static/.test(f.css("position")) && (p = a), l.left < (r._helper ? a.left : 0) && (r.size.width = r.size.width + (r._helper ? r.position.left - a.left : r.position.left - p.left), c && (r.size.height = r.size.width / r.aspectRatio, d = !1), r.position.left = h.helper ? a.left : 0), l.top < (r._helper ? a.top : 0) && (r.size.height = r.size.height + (r._helper ? r.position.top - a.top : r.position.top), c && (r.size.width = r.size.height * r.aspectRatio, d = !1), r.position.top = r._helper ? a.top : 0), o = r.containerElement.get(0) === r.element.parent().get(0), n = /relative|absolute/.test(r.containerElement.css("position")), o && n ? (r.offset.left = r.parentData.left + r.position.left, r.offset.top = r.parentData.top + r.position.top) : (r.offset.left = r.element.offset().left, r.offset.top = r.element.offset().top), i = Math.abs(r.sizeDiff.width + (r._helper ? r.offset.left - p.left : r.offset.left - a.left)), s = Math.abs(r.sizeDiff.height + (r._helper ? r.offset.top - p.top : r.offset.top - a.top)), i + r.size.width >= r.parentData.width && (r.size.width = r.parentData.width - i, c && (r.size.height = r.size.width / r.aspectRatio, d = !1)), s + r.size.height >= r.parentData.height && (r.size.height = r.parentData.height - s, c && (r.size.width = r.size.height * r.aspectRatio, d = !1)), d || (r.position.left = r.prevPosition.left, r.position.top = r.prevPosition.top, r.size.width = r.prevSize.width, r.size.height = r.prevSize.height)
        },
        stop: function() {
            var e = t(this).resizable("instance"),
                i = e.options,
                s = e.containerOffset,
                o = e.containerPosition,
                n = e.containerElement,
                r = t(e.helper),
                h = r.offset(),
                a = r.outerWidth() - e.sizeDiff.width,
                l = r.outerHeight() - e.sizeDiff.height;
            e._helper && !i.animate && /relative/.test(n.css("position")) && t(this).css({
                left: h.left - o.left - s.left,
                width: a,
                height: l
            }), e._helper && !i.animate && /static/.test(n.css("position")) && t(this).css({
                left: h.left - o.left - s.left,
                width: a,
                height: l
            })
        }
    }), t.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var e = t(this).resizable("instance").options;
            t(e.alsoResize).each(function() {
                var e = t(this);
                e.data("ui-resizable-alsoresize", {
                    width: parseFloat(e.width()),
                    height: parseFloat(e.height()),
                    left: parseFloat(e.css("left")),
                    top: parseFloat(e.css("top"))
                })
            })
        },
        resize: function(e, i) {
            var s = t(this).resizable("instance"),
                o = s.options,
                n = s.originalSize,
                r = s.originalPosition,
                h = {
                    height: s.size.height - n.height || 0,
                    width: s.size.width - n.width || 0,
                    top: s.position.top - r.top || 0,
                    left: s.position.left - r.left || 0
                };
            t(o.alsoResize).each(function() {
                var e = t(this),
                    s = t(this).data("ui-resizable-alsoresize"),
                    o = {},
                    n = e.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                t.each(n, function(t, e) {
                    var i = (s[e] || 0) + (h[e] || 0);
                    i && i >= 0 && (o[e] = i || null)
                }), e.css(o)
            })
        },
        stop: function() {
            t(this).removeData("ui-resizable-alsoresize")
        }
    }), t.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var e = t(this).resizable("instance"),
                i = e.size;
            e.ghost = e.originalElement.clone(), e.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: i.height,
                width: i.width,
                margin: 0,
                left: 0,
                top: 0
            }), e._addClass(e.ghost, "ui-resizable-ghost"), !1 !== t.uiBackCompat && "string" == typeof e.options.ghost && e.ghost.addClass(this.options.ghost), e.ghost.appendTo(e.helper)
        },
        resize: function() {
            var e = t(this).resizable("instance");
            e.ghost && e.ghost.css({
                position: "relative",
                height: e.size.height,
                width: e.size.width
            })
        },
        stop: function() {
            var e = t(this).resizable("instance");
            e.ghost && e.helper && e.helper.get(0).removeChild(e.ghost.get(0))
        }
    }), t.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var e, i = t(this).resizable("instance"),
                s = i.options,
                o = i.size,
                n = i.originalSize,
                r = i.originalPosition,
                h = i.axis,
                a = "number" == typeof s.grid ? [s.grid, s.grid] : s.grid,
                l = a[0] || 1,
                c = a[1] || 1,
                p = Math.round((o.width - n.width) / l) * l,
                f = Math.round((o.height - n.height) / c) * c,
                d = n.width + p,
                u = n.height + f,
                g = s.maxWidth && d > s.maxWidth,
                m = s.maxHeight && u > s.maxHeight,
                v = s.minWidth && s.minWidth > d,
                _ = s.minHeight && s.minHeight > u;
            s.grid = a, v && (d += l), _ && (u += c), g && (d -= l), m && (u -= c), /^(se|s|e)$/.test(h) ? (i.size.width = d, i.size.height = u) : /^(ne)$/.test(h) ? (i.size.width = d, i.size.height = u, i.position.top = r.top - f) : /^(sw)$/.test(h) ? (i.size.width = d, i.size.height = u, i.position.left = r.left - p) : ((0 >= u - c || 0 >= d - l) && (e = i._getPaddingPlusBorderDimensions(this)), u - c > 0 ? (i.size.height = u, i.position.top = r.top - f) : (u = c - e.height, i.size.height = u, i.position.top = r.top + n.height - u), d - l > 0 ? (i.size.width = d, i.position.left = r.left - p) : (d = l - e.width, i.size.width = d, i.position.left = r.left + n.width - d))
        }
    }), t.ui.resizable, t.widget("ui.selectable", t.ui.mouse, {
        version: "1.12.1",
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch",
            selected: null,
            selecting: null,
            start: null,
            stop: null,
            unselected: null,
            unselecting: null
        },
        _create: function() {
            var e = this;
            this._addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
                e.elementPos = t(e.element[0]).offset(), e.selectees = t(e.options.filter, e.element[0]), e._addClass(e.selectees, "ui-selectee"), e.selectees.each(function() {
                    var i = t(this),
                        s = i.offset(),
                        o = {
                            left: s.left - e.elementPos.left,
                            top: s.top - e.elementPos.top
                        };
                    t.data(this, "selectable-item", {
                        element: this,
                        $element: i,
                        left: o.left,
                        top: o.top,
                        right: o.left + i.outerWidth(),
                        bottom: o.top + i.outerHeight(),
                        startselected: !1,
                        selected: i.hasClass("ui-selected"),
                        selecting: i.hasClass("ui-selecting"),
                        unselecting: i.hasClass("ui-unselecting")
                    })
                })
            }, this.refresh(), this._mouseInit(), this.helper = t("<div>"), this._addClass(this.helper, "ui-selectable-helper")
        },
        _destroy: function() {
            this.selectees.removeData("selectable-item"), this._mouseDestroy()
        },
        _mouseStart: function(e) {
            var i = this,
                s = this.options;
            this.opos = [e.pageX, e.pageY], this.elementPos = t(this.element[0]).offset(), this.options.disabled || (this.selectees = t(s.filter, this.element[0]), this._trigger("start", e), t(s.appendTo).append(this.helper), this.helper.css({
                left: e.pageX,
                top: e.pageY,
                width: 0,
                height: 0
            }), s.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                var s = t.data(this, "selectable-item");
                s.startselected = !0, e.metaKey || e.ctrlKey || (i._removeClass(s.$element, "ui-selected"), s.selected = !1, i._addClass(s.$element, "ui-unselecting"), s.unselecting = !0, i._trigger("unselecting", e, {
                    unselecting: s.element
                }))
            }), t(e.target).parents().addBack().each(function() {
                var s, o = t.data(this, "selectable-item");
                return o ? (s = !e.metaKey && !e.ctrlKey || !o.$element.hasClass("ui-selected"), i._removeClass(o.$element, s ? "ui-unselecting" : "ui-selected")._addClass(o.$element, s ? "ui-selecting" : "ui-unselecting"), o.unselecting = !s, o.selecting = s, o.selected = s, s ? i._trigger("selecting", e, {
                    selecting: o.element
                }) : i._trigger("unselecting", e, {
                    unselecting: o.element
                }), !1) : void 0
            }))
        },
        _mouseDrag: function(e) {
            if (this.dragged = !0, !this.options.disabled) {
                var i, s = this,
                    o = this.options,
                    n = this.opos[0],
                    r = this.opos[1],
                    h = e.pageX,
                    a = e.pageY;
                return n > h && (i = h, h = n, n = i), r > a && (i = a, a = r, r = i), this.helper.css({
                    left: n,
                    top: r,
                    width: h - n,
                    height: a - r
                }), this.selectees.each(function() {
                    var i = t.data(this, "selectable-item"),
                        l = !1,
                        c = {};
                    i && i.element !== s.element[0] && (c.left = i.left + s.elementPos.left, c.right = i.right + s.elementPos.left, c.top = i.top + s.elementPos.top, c.bottom = i.bottom + s.elementPos.top, "touch" === o.tolerance ? l = !(c.left > h || n > c.right || c.top > a || r > c.bottom) : "fit" === o.tolerance && (l = c.left > n && h > c.right && c.top > r && a > c.bottom), l ? (i.selected && (s._removeClass(i.$element, "ui-selected"), i.selected = !1), i.unselecting && (s._removeClass(i.$element, "ui-unselecting"), i.unselecting = !1), i.selecting || (s._addClass(i.$element, "ui-selecting"), i.selecting = !0, s._trigger("selecting", e, {
                        selecting: i.element
                    }))) : (i.selecting && ((e.metaKey || e.ctrlKey) && i.startselected ? (s._removeClass(i.$element, "ui-selecting"), i.selecting = !1, s._addClass(i.$element, "ui-selected"), i.selected = !0) : (s._removeClass(i.$element, "ui-selecting"), i.selecting = !1, i.startselected && (s._addClass(i.$element, "ui-unselecting"), i.unselecting = !0), s._trigger("unselecting", e, {
                        unselecting: i.element
                    }))), i.selected && (e.metaKey || e.ctrlKey || i.startselected || (s._removeClass(i.$element, "ui-selected"), i.selected = !1, s._addClass(i.$element, "ui-unselecting"), i.unselecting = !0, s._trigger("unselecting", e, {
                        unselecting: i.element
                    })))))
                }), !1
            }
        },
        _mouseStop: function(e) {
            var i = this;
            return this.dragged = !1, t(".ui-unselecting", this.element[0]).each(function() {
                var s = t.data(this, "selectable-item");
                i._removeClass(s.$element, "ui-unselecting"), s.unselecting = !1, s.startselected = !1, i._trigger("unselected", e, {
                    unselected: s.element
                })
            }), t(".ui-selecting", this.element[0]).each(function() {
                var s = t.data(this, "selectable-item");
                i._removeClass(s.$element, "ui-selecting")._addClass(s.$element, "ui-selected"), s.selecting = !1, s.selected = !0, s.startselected = !0, i._trigger("selected", e, {
                    selected: s.element
                })
            }), this._trigger("stop", e), this.helper.remove(), !1
        }
    }), t.widget("ui.sortable", t.ui.mouse, {
        version: "1.12.1",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _isOverAxis: function(t, e, i) {
            return t >= e && e + i > t
        },
        _isFloating: function(t) {
            return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"))
        },
        _create: function() {
            this.containerCache = {}, this._addClass("ui-sortable"), this.refresh(), this.offset = this.element.offset(), this._mouseInit(), this._setHandleClassName(), this.ready = !0
        },
        _setOption: function(t, e) {
            this._super(t, e), "handle" === t && this._setHandleClassName()
        },
        _setHandleClassName: function() {
            var e = this;
            this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle"), t.each(this.items, function() {
                e._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle")
            })
        },
        _destroy: function() {
            this._mouseDestroy();
            for (var t = this.items.length - 1; t >= 0; t--) this.items[t].item.removeData(this.widgetName + "-item");
            return this
        },
        _mouseCapture: function(e, i) {
            var s = null,
                o = !1,
                n = this;
            return !this.reverting && (!this.options.disabled && "static" !== this.options.type && (this._refreshItems(e), t(e.target).parents().each(function() {
                return t.data(this, n.widgetName + "-item") === n ? (s = t(this), !1) : void 0
            }), t.data(e.target, n.widgetName + "-item") === n && (s = t(e.target)), !!s && (!(this.options.handle && !i && (t(this.options.handle, s).find("*").addBack().each(function() {
                this === e.target && (o = !0)
            }), !o)) && (this.currentItem = s, this._removeCurrentsFromItems(), !0))))
        },
        _mouseStart: function(e, i, s) {
            var o, n, r = this.options;
            if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, t.extend(this.offset, {
                    click: {
                        left: e.pageX - this.offset.left,
                        top: e.pageY - this.offset.top
                    },
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, r.cursorAt && this._adjustOffsetFromHelper(r.cursorAt), this.domPosition = {
                    prev: this.currentItem.prev()[0],
                    parent: this.currentItem.parent()[0]
                }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), r.containment && this._setContainment(), r.cursor && "auto" !== r.cursor && (n = this.document.find("body"), this.storedCursor = n.css("cursor"), n.css("cursor", r.cursor), this.storedStylesheet = t("<style>*{ cursor: " + r.cursor + " !important; }</style>").appendTo(n)), r.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", r.opacity)), r.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", r.zIndex)), this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !s)
                for (o = this.containers.length - 1; o >= 0; o--) this.containers[o]._trigger("activate", e, this._uiHash(this));
            return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !r.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.dragging = !0, this._addClass(this.helper, "ui-sortable-helper"), this._mouseDrag(e), !0
        },
        _mouseDrag: function(e) {
            var i, s, o, n, r = this.options,
                h = !1;
            for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < r.scrollSensitivity ? this.scrollParent[0].scrollTop = h = this.scrollParent[0].scrollTop + r.scrollSpeed : e.pageY - this.overflowOffset.top < r.scrollSensitivity && (this.scrollParent[0].scrollTop = h = this.scrollParent[0].scrollTop - r.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < r.scrollSensitivity ? this.scrollParent[0].scrollLeft = h = this.scrollParent[0].scrollLeft + r.scrollSpeed : e.pageX - this.overflowOffset.left < r.scrollSensitivity && (this.scrollParent[0].scrollLeft = h = this.scrollParent[0].scrollLeft - r.scrollSpeed)) : (e.pageY - this.document.scrollTop() < r.scrollSensitivity ? h = this.document.scrollTop(this.document.scrollTop() - r.scrollSpeed) : this.window.height() - (e.pageY - this.document.scrollTop()) < r.scrollSensitivity && (h = this.document.scrollTop(this.document.scrollTop() + r.scrollSpeed)), e.pageX - this.document.scrollLeft() < r.scrollSensitivity ? h = this.document.scrollLeft(this.document.scrollLeft() - r.scrollSpeed) : this.window.width() - (e.pageX - this.document.scrollLeft()) < r.scrollSensitivity && (h = this.document.scrollLeft(this.document.scrollLeft() + r.scrollSpeed))), !1 !== h && t.ui.ddmanager && !r.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--)
                if (s = this.items[i], o = s.item[0], (n = this._intersectsWithPointer(s)) && s.instance === this.currentContainer && o !== this.currentItem[0] && this.placeholder[1 === n ? "next" : "prev"]()[0] !== o && !t.contains(this.placeholder[0], o) && ("semi-dynamic" !== this.options.type || !t.contains(this.element[0], o))) {
                    if (this.direction = 1 === n ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(s)) break;
                    this._rearrange(e, s), this._trigger("change", e, this._uiHash());
                    break
                } return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
        },
        _mouseStop: function(e, i) {
            if (e) {
                if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
                    var s = this,
                        o = this.placeholder.offset(),
                        n = this.options.axis,
                        r = {};
                    n && "x" !== n || (r.left = o.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft)), n && "y" !== n || (r.top = o.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, t(this.helper).animate(r, parseInt(this.options.revert, 10) || 500, function() {
                        s._clear(e)
                    })
                } else this._clear(e, i);
                return !1
            }
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp(new t.Event("mouseup", {
                    target: null
                })), "original" === this.options.helper ? (this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper")) : this.currentItem.show();
                for (var e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("deactivate", null, this._uiHash(this)), this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this
        },
        serialize: function(e) {
            var i = this._getItemsAsjQuery(e && e.connected),
                s = [];
            return e = e || {}, t(i).each(function() {
                var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
                i && s.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]))
            }), !s.length && e.key && s.push(e.key + "="), s.join("&")
        },
        toArray: function(e) {
            var i = this._getItemsAsjQuery(e && e.connected),
                s = [];
            return e = e || {}, i.each(function() {
                s.push(t(e.item || this).attr(e.attribute || "id") || "")
            }), s
        },
        _intersectsWith: function(t) {
            var e = this.positionAbs.left,
                i = e + this.helperProportions.width,
                s = this.positionAbs.top,
                o = s + this.helperProportions.height,
                n = t.left,
                r = n + t.width,
                h = t.top,
                a = h + t.height,
                l = this.offset.click.top,
                c = this.offset.click.left,
                p = "x" === this.options.axis || s + l > h && a > s + l,
                f = "y" === this.options.axis || e + c > n && r > e + c,
                d = p && f;
            return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? d : e + this.helperProportions.width / 2 > n && r > i - this.helperProportions.width / 2 && s + this.helperProportions.height / 2 > h && a > o - this.helperProportions.height / 2
        },
        _intersectsWithPointer: function(t) {
            var e, i, s = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top, t.height),
                o = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left, t.width);
            return !!(s && o) && (e = this._getDragVerticalDirection(), i = this._getDragHorizontalDirection(), this.floating ? "right" === i || "down" === e ? 2 : 1 : e && ("down" === e ? 2 : 1))
        },
        _intersectsWithSides: function(t) {
            var e = this._isOverAxis(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
                i = this._isOverAxis(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
                s = this._getDragVerticalDirection(),
                o = this._getDragHorizontalDirection();
            return this.floating && o ? "right" === o && i || "left" === o && !i : s && ("down" === s && e || "up" === s && !e)
        },
        _getDragVerticalDirection: function() {
            var t = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 !== t && (t > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function() {
            var t = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 !== t && (t > 0 ? "right" : "left")
        },
        refresh: function(t) {
            return this._refreshItems(t), this._setHandleClassName(), this.refreshPositions(), this
        },
        _connectWith: function() {
            var t = this.options;
            return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith
        },
        _getItemsAsjQuery: function(e) {
            var i, s, o, n, r = [],
                h = [],
                a = this._connectWith();
            if (a && e)
                for (i = a.length - 1; i >= 0; i--)
                    for (o = t(a[i], this.document[0]), s = o.length - 1; s >= 0; s--)(n = t.data(o[s], this.widgetFullName)) && n !== this && !n.options.disabled && h.push([t.isFunction(n.options.items) ? n.options.items.call(n.element) : t(n.options.items, n.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), n]);
            for (h.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                    options: this.options,
                    item: this.currentItem
                }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), i = h.length - 1; i >= 0; i--) h[i][0].each(function() {
                r.push(this)
            });
            return t(r)
        },
        _removeCurrentsFromItems: function() {
            var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = t.grep(this.items, function(t) {
                for (var i = 0; e.length > i; i++)
                    if (e[i] === t.item[0]) return !1;
                return !0
            })
        },
        _refreshItems: function(e) {
            this.items = [], this.containers = [this];
            var i, s, o, n, r, h, a, l, c = this.items,
                p = [
                    [t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {
                        item: this.currentItem
                    }) : t(this.options.items, this.element), this]
                ],
                f = this._connectWith();
            if (f && this.ready)
                for (i = f.length - 1; i >= 0; i--)
                    for (o = t(f[i], this.document[0]), s = o.length - 1; s >= 0; s--)(n = t.data(o[s], this.widgetFullName)) && n !== this && !n.options.disabled && (p.push([t.isFunction(n.options.items) ? n.options.items.call(n.element[0], e, {
                        item: this.currentItem
                    }) : t(n.options.items, n.element), n]), this.containers.push(n));
            for (i = p.length - 1; i >= 0; i--)
                for (r = p[i][1], h = p[i][0], s = 0, l = h.length; l > s; s++)(a = t(h[s])).data(this.widgetName + "-item", r), c.push({
                    item: a,
                    instance: r,
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0
                })
        },
        refreshPositions: function(e) {
            this.floating = !!this.items.length && ("x" === this.options.axis || this._isFloating(this.items[0].item)), this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            var i, s, o, n;
            for (i = this.items.length - 1; i >= 0; i--)(s = this.items[i]).instance !== this.currentContainer && this.currentContainer && s.item[0] !== this.currentItem[0] || (o = this.options.toleranceElement ? t(this.options.toleranceElement, s.item) : s.item, e || (s.width = o.outerWidth(), s.height = o.outerHeight()), n = o.offset(), s.left = n.left, s.top = n.top);
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
            else
                for (i = this.containers.length - 1; i >= 0; i--) n = this.containers[i].element.offset(), this.containers[i].containerCache.left = n.left, this.containers[i].containerCache.top = n.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
            return this
        },
        _createPlaceholder: function(e) {
            var i, s = (e = e || this).options;
            s.placeholder && s.placeholder.constructor !== String || (i = s.placeholder, s.placeholder = {
                element: function() {
                    var s = e.currentItem[0].nodeName.toLowerCase(),
                        o = t("<" + s + ">", e.document[0]);
                    return e._addClass(o, "ui-sortable-placeholder", i || e.currentItem[0].className)._removeClass(o, "ui-sortable-helper"), "tbody" === s ? e._createTrPlaceholder(e.currentItem.find("tr").eq(0), t("<tr>", e.document[0]).appendTo(o)) : "tr" === s ? e._createTrPlaceholder(e.currentItem, o) : "img" === s && o.attr("src", e.currentItem.attr("src")), i || o.css("visibility", "hidden"), o
                },
                update: function(t, o) {
                    (!i || s.forcePlaceholderSize) && (o.height() || o.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), o.width() || o.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)))
                }
            }), e.placeholder = t(s.placeholder.element.call(e.element, e.currentItem)), e.currentItem.after(e.placeholder), s.placeholder.update(e, e.placeholder)
        },
        _createTrPlaceholder: function(e, i) {
            var s = this;
            e.children().each(function() {
                t("<td>&#160;</td>", s.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(i)
            })
        },
        _contactContainers: function(e) {
            var i, s, o, n, r, h, a, l, c, p, f = null,
                d = null;
            for (i = this.containers.length - 1; i >= 0; i--)
                if (!t.contains(this.currentItem[0], this.containers[i].element[0]))
                    if (this._intersectsWith(this.containers[i].containerCache)) {
                        if (f && t.contains(this.containers[i].element[0], f.element[0])) continue;
                        f = this.containers[i], d = i
                    } else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", e, this._uiHash(this)), this.containers[i].containerCache.over = 0);
            if (f)
                if (1 === this.containers.length) this.containers[d].containerCache.over || (this.containers[d]._trigger("over", e, this._uiHash(this)), this.containers[d].containerCache.over = 1);
                else {
                    for (o = 1e4, n = null, r = (c = f.floating || this._isFloating(this.currentItem)) ? "left" : "top", h = c ? "width" : "height", p = c ? "pageX" : "pageY", s = this.items.length - 1; s >= 0; s--) t.contains(this.containers[d].element[0], this.items[s].item[0]) && this.items[s].item[0] !== this.currentItem[0] && (a = this.items[s].item.offset()[r], l = !1, e[p] - a > this.items[s][h] / 2 && (l = !0), o > Math.abs(e[p] - a) && (o = Math.abs(e[p] - a), n = this.items[s], this.direction = l ? "up" : "down"));
                    if (!n && !this.options.dropOnEmpty) return;
                    if (this.currentContainer === this.containers[d]) return void(this.currentContainer.containerCache.over || (this.containers[d]._trigger("over", e, this._uiHash()), this.currentContainer.containerCache.over = 1));
                    n ? this._rearrange(e, n, null, !0) : this._rearrange(e, null, this.containers[d].element, !0), this._trigger("change", e, this._uiHash()), this.containers[d]._trigger("change", e, this._uiHash(this)), this.currentContainer = this.containers[d], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[d]._trigger("over", e, this._uiHash(this)), this.containers[d].containerCache.over = 1
                }
        },
        _createHelper: function(e) {
            var i = this.options,
                s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
            return s.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(s[0]), s[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }), (!s[0].style.width || i.forceHelperSize) && s.width(this.currentItem.width()), (!s[0].style.height || i.forceHelperSize) && s.height(this.currentItem.height()), s
        },
        _adjustOffsetFromHelper: function(e) {
            "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                left: +e[0],
                top: +e[1] || 0
            }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var e = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                top: 0,
                left: 0
            }), {
                top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var t = this.currentItem.position();
                return {
                    top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var e, i, s, o = this.options;
            "parent" === o.containment && (o.containment = this.helper[0].parentNode), ("document" === o.containment || "window" === o.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === o.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === o.containment ? this.document.height() || document.body.parentNode.scrollHeight : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(o.containment) || (e = t(o.containment)[0], i = t(o.containment).offset(), s = "hidden" !== t(e).css("overflow"), this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (s ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (s ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
        },
        _convertPositionTo: function(e, i) {
            i || (i = this.position);
            var s = "absolute" === e ? 1 : -1,
                o = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                n = /(html|body)/i.test(o[0].tagName);
            return {
                top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : n ? 0 : o.scrollTop()) * s,
                left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : n ? 0 : o.scrollLeft()) * s
            }
        },
        _generatePosition: function(e) {
            var i, s, o = this.options,
                n = e.pageX,
                r = e.pageY,
                h = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                a = /(html|body)/i.test(h[0].tagName);
            return "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (n = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (r = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (n = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (r = this.containment[3] + this.offset.click.top)), o.grid && (i = this.originalPageY + Math.round((r - this.originalPageY) / o.grid[1]) * o.grid[1], r = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - o.grid[1] : i + o.grid[1] : i, s = this.originalPageX + Math.round((n - this.originalPageX) / o.grid[0]) * o.grid[0], n = this.containment ? s - this.offset.click.left >= this.containment[0] && s - this.offset.click.left <= this.containment[2] ? s : s - this.offset.click.left >= this.containment[0] ? s - o.grid[0] : s + o.grid[0] : s)), {
                top: r - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : a ? 0 : h.scrollTop()),
                left: n - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : a ? 0 : h.scrollLeft())
            }
        },
        _rearrange: function(t, e, i, s) {
            i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
            var o = this.counter;
            this._delay(function() {
                o === this.counter && this.refreshPositions(!s)
            })
        },
        _clear: function(t, e) {
            function i(t, e, i) {
                return function(s) {
                    i._trigger(t, s, e._uiHash(e))
                }
            }
            this.reverting = !1;
            var s, o = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                for (s in this._storedCSS)("auto" === this._storedCSS[s] || "static" === this._storedCSS[s]) && (this._storedCSS[s] = "");
                this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper")
            } else this.currentItem.show();
            for (this.fromOutside && !e && o.push(function(t) {
                    this._trigger("receive", t, this._uiHash(this.fromOutside))
                }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || o.push(function(t) {
                    this._trigger("update", t, this._uiHash())
                }), this !== this.currentContainer && (e || (o.push(function(t) {
                    this._trigger("remove", t, this._uiHash())
                }), o.push(function(t) {
                    return function(e) {
                        t._trigger("receive", e, this._uiHash(this))
                    }
                }.call(this, this.currentContainer)), o.push(function(t) {
                    return function(e) {
                        t._trigger("update", e, this._uiHash(this))
                    }
                }.call(this, this.currentContainer)))), s = this.containers.length - 1; s >= 0; s--) e || o.push(i("deactivate", this, this.containers[s])), this.containers[s].containerCache.over && (o.push(i("out", this, this.containers[s])), this.containers[s].containerCache.over = 0);
            if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !e) {
                for (s = 0; o.length > s; s++) o[s].call(this, t);
                this._trigger("stop", t, this._uiHash())
            }
            return this.fromOutside = !1, !this.cancelHelperRemoval
        },
        _trigger: function() {
            !1 === t.Widget.prototype._trigger.apply(this, arguments) && this.cancel()
        },
        _uiHash: function(e) {
            var i = e || this;
            return {
                helper: i.helper,
                placeholder: i.placeholder || t([]),
                position: i.position,
                originalPosition: i.originalPosition,
                offset: i.positionAbs,
                item: i.currentItem,
                sender: e ? e.element : null
            }
        }
    })
});