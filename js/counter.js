(function() {
	"use strict";
	var t = [].indexOf || function(t) {
			for (var e = 0, n = this.length; n > e; e++)
				if (e in this && this[e] === t) return e;
			return -1
		},
		e = [].slice;
	! function(t, e) {
		return "function" == typeof define && define.amd ? define("waypoints", ["jquery"], function(n) {
			return e(n, t)
		}) : e(t.jQuery, t)
	}(this, function(n, o) {
		var r, i, l, s, c, u, a, f, h, d, p, v, y, m, g, w;
		return r = n(o), f = t.call(o, "ontouchstart") >= 0, s = {
			horizontal: {},
			vertical: {}
		}, c = 1, a = {}, u = "waypoints-context-id", p = "resize.waypoints", v = "scroll.waypoints", y = 1, m = "waypoints-waypoint-ids", g = "waypoint", w = "waypoints", i = function() {
			function t(t) {
				var e = this;
				this.$element = t, this.element = t[0], this.didResize = !1, this.didScroll = !1, this.id = "context" + c++, this.oldScroll = {
					x: t.scrollLeft(),
					y: t.scrollTop()
				}, this.waypoints = {
					horizontal: {},
					vertical: {}
				}, t.data(u, this.id), a[this.id] = this, t.bind(v, function() {
					var t;
					return e.didScroll || f ? void 0 : (e.didScroll = !0, t = function() {
						return e.doScroll(), e.didScroll = !1
					}, o.setTimeout(t, n[w].settings.scrollThrottle))
				}), t.bind(p, function() {
					var t;
					return e.didResize ? void 0 : (e.didResize = !0, t = function() {
						return n[w]("refresh"), e.didResize = !1
					}, o.setTimeout(t, n[w].settings.resizeThrottle))
				})
			}
			return t.prototype.doScroll = function() {
				var t, e = this;
				return t = {
					horizontal: {
						newScroll: this.$element.scrollLeft(),
						oldScroll: this.oldScroll.x,
						forward: "right",
						backward: "left"
					},
					vertical: {
						newScroll: this.$element.scrollTop(),
						oldScroll: this.oldScroll.y,
						forward: "down",
						backward: "up"
					}
				}, !f || t.vertical.oldScroll && t.vertical.newScroll || n[w]("refresh"), n.each(t, function(t, o) {
					var r, i, l;
					return l = [], i = o.newScroll > o.oldScroll, r = i ? o.forward : o.backward, n.each(e.waypoints[t], function(t, e) {
						var n, r;
						return o.oldScroll < (n = e.offset) && n <= o.newScroll ? l.push(e) : o.newScroll < (r = e.offset) && r <= o.oldScroll ? l.push(e) : void 0
					}), l.sort(function(t, e) {
						return t.offset - e.offset
					}), i || l.reverse(), n.each(l, function(t, e) {
						return e.options.continuous || t === l.length - 1 ? e.trigger([r]) : void 0
					})
				}), this.oldScroll = {
					x: t.horizontal.newScroll,
					y: t.vertical.newScroll
				}
			}, t.prototype.refresh = function() {
				var t, e, o, r = this;
				return o = n.isWindow(this.element), e = this.$element.offset(), this.doScroll(), t = {
					horizontal: {
						contextOffset: o ? 0 : e.left,
						contextScroll: o ? 0 : this.oldScroll.x,
						contextDimension: this.$element.width(),
						oldScroll: this.oldScroll.x,
						forward: "right",
						backward: "left",
						offsetProp: "left"
					},
					vertical: {
						contextOffset: o ? 0 : e.top,
						contextScroll: o ? 0 : this.oldScroll.y,
						contextDimension: o ? n[w]("viewportHeight") : this.$element.height(),
						oldScroll: this.oldScroll.y,
						forward: "down",
						backward: "up",
						offsetProp: "top"
					}
				}, n.each(t, function(t, e) {
					return n.each(r.waypoints[t], function(t, o) {
						var r, i, l, s, c;
						return r = o.options.offset, l = o.offset, i = n.isWindow(o.element) ? 0 : o.$element.offset()[e.offsetProp], n.isFunction(r) ? r = r.apply(o.element) : "string" == typeof r && (r = parseFloat(r), o.options.offset.indexOf("%") > -1 && (r = Math.ceil(e.contextDimension * r / 100))), o.offset = i - e.contextOffset + e.contextScroll - r, o.options.onlyOnScroll && null != l || !o.enabled ? void 0 : null !== l && l < (s = e.oldScroll) && s <= o.offset ? o.trigger([e.backward]) : null !== l && l > (c = e.oldScroll) && c >= o.offset ? o.trigger([e.forward]) : null === l && e.oldScroll >= o.offset ? o.trigger([e.forward]) : void 0
					})
				})
			}, t.prototype.checkEmpty = function() {
				return n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical) ? (this.$element.unbind([p, v].join(" ")), delete a[this.id]) : void 0
			}, t
		}(), l = function() {
			function t(t, e, o) {
				var r, i;
				o = n.extend({}, n.fn[g].defaults, o), "bottom-in-view" === o.offset && (o.offset = function() {
					var t;
					return t = n[w]("viewportHeight"), n.isWindow(e.element) || (t = e.$element.height()), t - n(this).outerHeight()
				}), this.$element = t, this.element = t[0], this.axis = o.horizontal ? "horizontal" : "vertical", this.callback = o.handler, this.context = e, this.enabled = o.enabled, this.id = "waypoints" + y++, this.offset = null, this.options = o, e.waypoints[this.axis][this.id] = this, s[this.axis][this.id] = this, r = null != (i = t.data(m)) ? i : [], r.push(this.id), t.data(m, r)
			}
			return t.prototype.trigger = function(t) {
				return this.enabled ? (null != this.callback && this.callback.apply(this.element, t), this.options.triggerOnce ? this.destroy() : void 0) : void 0
			}, t.prototype.disable = function() {
				return this.enabled = !1
			}, t.prototype.enable = function() {
				return this.context.refresh(), this.enabled = !0
			}, t.prototype.destroy = function() {
				return delete s[this.axis][this.id], delete this.context.waypoints[this.axis][this.id], this.context.checkEmpty()
			}, t.getWaypointsByElement = function(t) {
				var e, o;
				return (o = n(t).data(m)) ? (e = n.extend({}, s.horizontal, s.vertical), n.map(o, function(t) {
					return e[t]
				})) : []
			}, t
		}(), d = {
			init: function(t, e) {
				var o;
				return null == e && (e = {}), null == (o = e.handler) && (e.handler = t), this.each(function() {
					var t, o, r, s;
					return t = n(this), r = null != (s = e.context) ? s : n.fn[g].defaults.context, n.isWindow(r) || (r = t.closest(r)), r = n(r), o = a[r.data(u)], o || (o = new i(r)), new l(t, o, e)
				}), n[w]("refresh"), this
			},
			disable: function() {
				return d._invoke(this, "disable")
			},
			enable: function() {
				return d._invoke(this, "enable")
			},
			destroy: function() {
				return d._invoke(this, "destroy")
			},
			prev: function(t, e) {
				return d._traverse.call(this, t, e, function(t, e, n) {
					return e > 0 ? t.push(n[e - 1]) : void 0
				})
			},
			next: function(t, e) {
				return d._traverse.call(this, t, e, function(t, e, n) {
					return e < n.length - 1 ? t.push(n[e + 1]) : void 0
				})
			},
			_traverse: function(t, e, r) {
				var i, l;
				return null == t && (t = "vertical"), null == e && (e = o), l = h.aggregate(e), i = [], this.each(function() {
					var e;
					return e = n.inArray(this, l[t]), r(i, e, l[t])
				}), this.pushStack(i)
			},
			_invoke: function(t, e) {
				return t.each(function() {
					var t;
					return t = l.getWaypointsByElement(this), n.each(t, function(t, n) {
						return n[e](), !0
					})
				}), this
			}
		}, n.fn[g] = function() {
			var t, o;
			return o = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [], d[o] ? d[o].apply(this, t) : n.isFunction(o) ? d.init.apply(this, arguments) : n.isPlainObject(o) ? d.init.apply(this, [null, o]) : n.error(o ? "The " + o + " method does not exist in jQuery Waypoints." : "jQuery Waypoints needs a callback function or handler option.")
		}, n.fn[g].defaults = {
			context: o,
			continuous: !0,
			enabled: !0,
			horizontal: !1,
			offset: 0,
			triggerOnce: !1
		}, h = {
			refresh: function() {
				return n.each(a, function(t, e) {
					return e.refresh()
				})
			},
			viewportHeight: function() {
				var t;
				return null != (t = o.innerHeight) ? t : r.height()
			},
			aggregate: function(t) {
				var e, o, r;
				return e = s, t && (e = null != (r = a[n(t).data(u)]) ? r.waypoints : void 0), e ? (o = {
					horizontal: [],
					vertical: []
				}, n.each(o, function(t, r) {
					return n.each(e[t], function(t, e) {
						return r.push(e)
					}), r.sort(function(t, e) {
						return t.offset - e.offset
					}), o[t] = n.map(r, function(t) {
						return t.element
					}), o[t] = n.unique(o[t])
				}), o) : []
			},
			above: function(t) {
				return null == t && (t = o), h._filter(t, "vertical", function(t, e) {
					return e.offset <= t.oldScroll.y
				})
			},
			below: function(t) {
				return null == t && (t = o), h._filter(t, "vertical", function(t, e) {
					return e.offset > t.oldScroll.y
				})
			},
			left: function(t) {
				return null == t && (t = o), h._filter(t, "horizontal", function(t, e) {
					return e.offset <= t.oldScroll.x
				})
			},
			right: function(t) {
				return null == t && (t = o), h._filter(t, "horizontal", function(t, e) {
					return e.offset > t.oldScroll.x
				})
			},
			enable: function() {
				return h._invoke("enable")
			},
			disable: function() {
				return h._invoke("disable")
			},
			destroy: function() {
				return h._invoke("destroy")
			},
			extendFn: function(t, e) {
				return d[t] = e
			},
			_invoke: function(t) {
				var e;
				return e = n.extend({}, s.vertical, s.horizontal), n.each(e, function(e, n) {
					return n[t](), !0
				})
			},
			_filter: function(t, e, o) {
				var r, i;
				return (r = a[n(t).data(u)]) ? (i = [], n.each(r.waypoints[e], function(t, e) {
					return o(r, e) ? i.push(e) : void 0
				}), i.sort(function(t, e) {
					return t.offset - e.offset
				}), n.map(i, function(t) {
					return t.element
				})) : []
			}
		}, n[w] = function() {
			var t, n;
			return n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [], h[n] ? h[n].apply(null, t) : h.aggregate.call(null, n)
		}, n[w].settings = {
			resizeThrottle: 100,
			scrollThrottle: 30
		}, r.load(function() {
			return n[w]("refresh")
		})
	})
}).call(this),
	function(t) {
		"use strict";
		t.fn.countTo = function(e) {
			e = t.extend({}, t.fn.countTo.defaults, e || {});
			var n = Math.ceil(e.speed / e.refreshInterval),
				o = (e.to - e.from) / n;
			return t(this).each(function() {
				function r() {
					s += o, l++, t(i).html(s.toFixed(e.decimals)), "function" == typeof e.onUpdate && e.onUpdate.call(i, s), l >= n && (clearInterval(c), s = e.to, "function" == typeof e.onComplete && e.onComplete.call(i, s))
				}
				var i = this,
					l = 0,
					s = e.from,
					c = setInterval(r, e.refreshInterval)
			})
		}, t.fn.countTo.defaults = {
			from: 0,
			to: 100,
			speed: 1e3,
			refreshInterval: 100,
			decimals: 0,
			onUpdate: null,
			onComplete: null
		}
	}(jQuery), jQuery(function(t) {
		t("#counters").waypoint(function() {
			t(".quantity-counter1").countTo({
				from: 0,
				to: 30,
				speed: 2e3,
				refreshInterval: 50,
				onComplete: function() {
					console.debug(this)
				}
			}), t(".quantity-counter2").countTo({
				from: 0,
				to: 2,
				speed: 2e3,
				refreshInterval: 50,
				onComplete: function() {
					console.debug(this)
				}
			}), t(".quantity-counter3").countTo({
				from: 0,
				to: 100,
				speed: 2e3,
				refreshInterval: 50,
				onComplete: function() {
					console.debug(this)
				}
			}), t(".quantity-counter4").countTo({
				from: 0,
				to: 114,
				speed: 2e3,
				refreshInterval: 50,
				onComplete: function() {
					console.debug(this)
				}
			})
		}, {
			offset: "100%",
			triggerOnce: !0
		})
	});