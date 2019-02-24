'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contextKey = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var contextKey = exports.contextKey = '_ReactSizesConfig_';

exports.default = _defineProperty({}, contextKey, _propTypes2.default.shape({
  fallbackWidth: _propTypes2.default.number,
  fallbackHeight: _propTypes2.default.number,
  throttle: _propTypes2.default.number
}));