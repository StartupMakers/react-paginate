'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCreateFragment = require('react-addons-create-fragment');

var _reactAddonsCreateFragment2 = _interopRequireDefault(_reactAddonsCreateFragment);

var _PageView = require('./PageView');

var _PageView2 = _interopRequireDefault(_PageView);

var PaginationListView = (function (_Component) {
  _inherits(PaginationListView, _Component);

  function PaginationListView() {
    _classCallCheck(this, PaginationListView);

    _get(Object.getPrototypeOf(PaginationListView.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(PaginationListView, [{
    key: 'renderPageView',
    value: function renderPageView(index) {
      var _props = this.props;
      var pageUrlTemplate = _props.pageUrlTemplate;
      var pageClassName = _props.pageClassName;
      var pageLinkClassName = _props.pageLinkClassName;
      var activeClassName = _props.activeClassName;
      var onPageSelected = _props.onPageSelected;
      var selected = _props.selected;

      var page = index + 1;
      var url = pageUrlTemplate.replace(':pageNum', page);

      return _react2['default'].createElement(_PageView2['default'], {
        onClick: onPageSelected.bind(null, index),
        selected: selected === index,
        pageClassName: pageClassName,
        pageLinkClassName: pageLinkClassName,
        activeClassName: activeClassName,
        page: page,
        href: url });
    }
  }, {
    key: 'render',
    value: function render() {
      var items = {};

      if (this.props.pageNum <= this.props.pageRangeDisplayed) {

        for (var index = 0; index < this.props.pageNum; index++) {

          items['key' + index] = this.renderPageView(index);
        }
      } else {

        var leftSide = this.props.pageRangeDisplayed / 2;
        var rightSide = this.props.pageRangeDisplayed - leftSide;

        if (this.props.selected > this.props.pageNum - this.props.pageRangeDisplayed / 2) {
          rightSide = this.props.pageNum - this.props.selected;
          leftSide = this.props.pageRangeDisplayed - rightSide;
        } else if (this.props.selected < this.props.pageRangeDisplayed / 2) {
          leftSide = this.props.selected;
          rightSide = this.props.pageRangeDisplayed - leftSide;
        }

        for (var index = 0; index < this.props.pageNum; index++) {

          var page = index + 1;

          if (page <= this.props.marginPagesDisplayed) {
            items['key' + index] = this.renderPageView(index);
            continue;
          }

          if (page > this.props.pageNum - this.props.marginPagesDisplayed) {
            items['key' + index] = this.renderPageView(index);
            continue;
          }

          if (index >= this.props.selected - leftSide && index <= this.props.selected + rightSide) {
            items['key' + index] = this.renderPageView(index);
            continue;
          }

          var keys = Object.keys(items);
          var breakLabelKey = keys[keys.length - 1];
          var breakLabelValue = items[breakLabelKey];

          if (breakLabelValue !== this.props.breakLabel) {
            items['key' + index] = this.props.breakLabel;
          }
        }
      }

      return _react2['default'].createElement(
        'ul',
        { className: this.props.subContainerClassName },
        (0, _reactAddonsCreateFragment2['default'])(items)
      );
    }
  }]);

  return PaginationListView;
})(_react.Component);

exports['default'] = PaginationListView;
;
module.exports = exports['default'];