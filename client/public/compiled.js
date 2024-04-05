"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var cursor = document.getElementById("cursor");
var amount = 20;
var sineDots = Math.floor(amount * 0.3);
var width = 26;
var idleTimeout = 150;
var lastFrame = 0;
var mousePosition = {
  x: 0,
  y: 0
};
var dots = [];
var timeoutID;
var idle = false;
var hoverButton;
var hoverTL;
var HoverButton = /*#__PURE__*/_createClass(function HoverButton(id) {
  var _this = this;
  _classCallCheck(this, HoverButton);
  _defineProperty(this, "onMouseEnter", function () {
    _this.hoverInAnim();
  });
  _defineProperty(this, "hoverInAnim", function () {
    if (!_this.hovered) {
      _this.hovered = true;
      _this.animatingHover = true;
      _this.forceOut = false;
      TweenMax.fromTo(_this.bg, _this.timing, {
        x: "-112%"
      }, {
        x: "-12%",
        ease: Power3.easeOut,
        onComplete: function onComplete() {
          _this.animatingHover = false;
          if (_this.forceOut) {
            _this.foceOut = false;
            _this.hoverOutAnim();
          }
        }
      });
    }
  });
  _defineProperty(this, "onMouseLeave", function () {
    if (!_this.animatingHover) {
      _this.hoverOutAnim();
    } else {
      _this.forceOut = true;
    }
  });
  _defineProperty(this, "hoverOutAnim", function () {
    _this.hovered = false;
    TweenMax.to(_this.bg, _this.timing, {
      x: "100%",
      ease: Power3.easeOut,
      onComplete: function onComplete() {}
    });
  });
  this.hovered = false;
  this.animatingHover = false;
  this.forceOut = false;
  this.timing = 0.65;
  this.el = document.getElementById(id);
  this.bg = this.el.getElementsByClassName("bg")[0];
  this.el.addEventListener("mouseenter", this.onMouseEnter);
  this.el.addEventListener("mouseleave", this.onMouseLeave);
});
var Dot = /*#__PURE__*/function () {
  function Dot() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    _classCallCheck(this, Dot);
    this.index = index;
    this.anglespeed = 0.05;
    this.x = 0;
    this.y = 0;
    this.scale = 1 - 0.05 * index;
    this.range = width / 2 - width / 2 * this.scale + 2;
    this.limit = width * 0.75 * this.scale;
    this.element = document.createElement("span");
    TweenMax.set(this.element, {
      scale: this.scale
    });
    cursor.appendChild(this.element);
  }
  return _createClass(Dot, [{
    key: "lock",
    value: function lock() {
      this.lockX = this.x;
      this.lockY = this.y;
      this.angleX = Math.PI * 2 * Math.random();
      this.angleY = Math.PI * 2 * Math.random();
    }
  }, {
    key: "draw",
    value: function draw(delta) {
      if (!idle || this.index <= sineDots) {
        TweenMax.set(this.element, {
          x: this.x,
          y: this.y
        });
      } else {
        this.angleX += this.anglespeed;
        this.angleY += this.anglespeed;
        this.y = this.lockY + Math.sin(this.angleY) * this.range;
        this.x = this.lockX + Math.sin(this.angleX) * this.range;
        TweenMax.set(this.element, {
          x: this.x,
          y: this.y
        });
      }
    }
  }]);
}();
var Circle = /*#__PURE__*/_createClass(function Circle(id) {
  _classCallCheck(this, Circle);
  var el = document.getElementById(id);
  var parent = el.parentElement;
  parent.removeChild(el);
  var chars = el.innerText.split("");
  chars.push(" ");
  for (var i = 0; i < chars.length; i++) {
    var span = document.createElement("span");
    span.innerText = chars[i];
    span.className = "char".concat(i + 1);
    parent.appendChild(span);
  }
});
function init() {
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("touchmove", onTouchMove);
  hoverButton = new HoverButton("button");
  // eslint-disable-next-line no-new
  new Circle("circle-content");
  lastFrame += new Date();
  buildDots();
  render();
}

/*function limit(value, min, max) {
    return Math.min(Math.max(min, value), max);
}*/

function startIdleTimer() {
  timeoutID = setTimeout(goInactive, idleTimeout);
  idle = false;
}
function resetIdleTimer() {
  clearTimeout(timeoutID);
  startIdleTimer();
}
function goInactive() {
  idle = true;
  var _iterator = _createForOfIteratorHelper(dots),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var dot = _step.value;
      dot.lock();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
function buildDots() {
  for (var i = 0; i < amount; i++) {
    var dot = new Dot(i);
    dots.push(dot);
  }
}
var onMouseMove = function onMouseMove(event) {
  mousePosition.x = event.clientX - width / 2;
  mousePosition.y = event.clientY - width / 2;
  resetIdleTimer();
};
var onTouchMove = function onTouchMove() {
  mousePosition.x = event.touches[0].clientX - width / 2;
  mousePosition.y = event.touches[0].clientY - width / 2;
  resetIdleTimer();
};
var render = function render(timestamp) {
  var delta = timestamp - lastFrame;
  positionCursor(delta);
  lastFrame = timestamp;
  requestAnimationFrame(render);
};
var positionCursor = function positionCursor(delta) {
  var x = mousePosition.x;
  var y = mousePosition.y;
  dots.forEach(function (dot, index, dots) {
    var nextDot = dots[index + 1] || dots[0];
    dot.x = x;
    dot.y = y;
    dot.draw(delta);
    if (!idle || index <= sineDots) {
      var dx = (nextDot.x - dot.x) * 0.35;
      var dy = (nextDot.y - dot.y) * 0.35;
      x += dx;
      y += dy;
    }
  });
};
init();
