"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = exports.$slideToggle = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _now = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/date/now"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));

var _symbol = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/symbol"));

var _vue = _interopRequireDefault(require("vue"));

var eventType = 'touchstart' in window ? 'touchstart' : 'click';

var _exec = (0, _symbol["default"])('_exec');

var $slideToggle = {
  bind: function bind(el, binding) {
    el[_exec] = function (binding) {
      var data = binding.value;
      var ele = data.ele,
          _data$d = data.d,
          d = _data$d === void 0 ? 150 : _data$d,
          fx = data.fx;
      if (!data || typeof ele !== 'string') return false;
      var dom = document.querySelector(ele);
      return (
        /*#__PURE__*/
        (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee() {
          var target;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!startMove.timer) {
                    _context.next = 2;
                    break;
                  }

                  return _context.abrupt("return");

                case 2:
                  dom.style.overflow = 'hidden';

                  if (dom.offsetHeight) {
                    _context.next = 11;
                    break;
                  }

                  dom.style.display = 'block';
                  target = dom.offsetHeight;
                  dom.style.height = 0;
                  _context.next = 9;
                  return startMove(dom, target, d, fx);

                case 9:
                  _context.next = 14;
                  break;

                case 11:
                  _context.next = 13;
                  return startMove(dom, 0, d, fx);

                case 13:
                  dom.style.display = '';

                case 14:
                  dom.style.height = '';
                  dom.style.overflow = '';

                case 16:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))
      );
    };

    _vue["default"].prototype.$nextTick(function () {
      el.callback = el[_exec](binding);
      el.addEventListener(eventType, el.callback);
    });
  },
  update: function update(el, binding) {
    _vue["default"].prototype.$nextTick(function () {
      el.removeEventListener(eventType, el.callback);
      el.callback = el[_exec](binding);
      el.addEventListener(eventType, el.callback);
    });
  },
  unbind: function unbind(el) {
    delete el[_exec];
    el.removeEventListener(eventType, el.callback);
  }
};
exports.$slideToggle = $slideToggle;

function startMove(ele) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 150;
  var fx = arguments.length > 3 ? arguments[3] : undefined;
  var start = (0, _now["default"])();
  var t, b, c, d, fn;
  b = ele.offsetHeight;
  c = target - b;
  d = duration;
  var p = new _promise["default"](function (resolve) {
    return fn = resolve;
  });

  if (!d) {
    ele.style.height = target + 'px';
    return fn();
  }

  if (typeof fx !== 'function') fx = function fx(t, b, c, d) {
    return c / d * t + b;
  };

  var _move = function _move() {
    startMove.timer = window.requestAnimationFrame(_move);
    t = (0, _now["default"])() - start;

    if (t >= d) {
      t = d;
      window.cancelAnimationFrame(startMove.timer);
      startMove.timer = null;
      fn();
    }

    var curt = fx(t, b, c, d);
    ele.style.height = curt + 'px';
  };

  _move();

  return p;
}

var _default = {
  install: function install(Vue) {
    Vue.directive('st', $slideToggle);
  }
};
exports["default"] = _default;