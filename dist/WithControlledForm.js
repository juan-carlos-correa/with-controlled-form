"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithControlledForm = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _Validators = require("./Validators");

var WithControlledForm = function WithControlledForm(FormComponent) {
  var _temp;

  var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var formValidations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _temp =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(WithFormMethodsHOC, _Component);

    function WithFormMethodsHOC(props) {
      var _this;

      (0, _classCallCheck2.default)(this, WithFormMethodsHOC);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(WithFormMethodsHOC).call(this, props));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_stateToErrors", function (state) {
        var errors = {};
        var keys = Object.keys(state);

        for (var i = 0; i < keys.length; i += 1) {
          errors[keys[i]] = [];
        }

        return errors;
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "_validateForm", function (values) {
        var result = _Validators.Validators.validate(values, formValidations);

        _this.setState({
          errors: result.errors
        });

        return result.isValid;
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "isFormClean", function () {
        var values = _this.state.values;
        var isValue = Object.values(values).filter(function (val) {
          return val.length > 0;
        });
        return isValue.length === 0;
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "cleanForm", function () {
        var newValues = {};
        var values = _this.state.values;

        for (var val in values) {
          newValues[val] = '';
        }

        _this.setState({
          values: newValues,
          errors: _this._stateToErrors(newValues)
        });
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleChange", function (e) {
        var _e$target = e.target,
            name = _e$target.name,
            value = _e$target.value;
        var values = _this.state.values;
        values[name] = value;

        _this.setState({
          values: values
        });
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleCheckboxChange", function (e) {
        var _e$target2 = e.target,
            name = _e$target2.name,
            checked = _e$target2.checked;
        var values = _this.state.values;
        values[name] = checked;

        _this.setState({
          values: values
        });
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleBlur", function (e) {
        e.preventDefault();
        var errors = _this.state.errors;
        var _e$target3 = e.target,
            name = _e$target3.name,
            value = _e$target3.value;
        var validations = formValidations[name];

        var result = _Validators.Validators.validateOne(value, validations);

        errors[name] = !result.isValid ? result.errors[0] : [];

        _this.setState({
          errors: errors
        });
      });
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleSubmit", function (e) {
        e.preventDefault();
        var values = _this.state.values;
        var handleSubmit = _this.props.handleSubmit;

        if (_this._validateForm(values)) {
          handleSubmit(values);
        }
      });
      _this.state = {
        values: (0, _objectSpread2.default)({}, state),
        errors: _this._stateToErrors(state)
      };
      return _this;
    }

    (0, _createClass2.default)(WithFormMethodsHOC, [{
      key: "render",
      value: function render() {
        return _react.default.createElement(FormComponent, (0, _extends2.default)({}, this.props, this.state, {
          cleanForm: this.cleanForm,
          isFormClean: this.isFormClean,
          handleChange: this.handleChange,
          handleCheckboxChange: this.handleCheckboxChange,
          handleBlur: this.handleBlur,
          handleSubmit: this.handleSubmit
        }));
      }
    }]);
    return WithFormMethodsHOC;
  }(_react.Component), _temp;
};

exports.WithControlledForm = WithControlledForm;