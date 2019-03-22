import _extends from "@babel/runtime/helpers/esm/extends";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React, { Component } from 'react';
import Validators from './Validators';

var WithControlledForm = function WithControlledForm(FormComponent) {
  var _temp;

  var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var formValidations = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _temp =
  /*#__PURE__*/
  function (_Component) {
    _inherits(WithFormMethodsHOC, _Component);

    function WithFormMethodsHOC(props) {
      var _this;

      _classCallCheck(this, WithFormMethodsHOC);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(WithFormMethodsHOC).call(this, props));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_stateToErrors", function (state) {
        var errors = {};
        var keys = Object.keys(state);

        for (var i = 0; i < keys.length; i += 1) {
          errors[keys[i]] = '';
        }

        return errors;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_validateForm", function (values) {
        var errors = _this.state.errors;
        var isFormValid = true;

        for (var name in values) {
          var validations = formValidations[name];
          var value = values[name];
          var result = Validators().validate(values, value, validations);

          if (!result.isValid) {
            isFormValid = false;
            errors[name] = result.errors[0];
          } else {
            errors[name] = '';
          }
        }

        _this.setState({
          errors: errors
        });

        return isFormValid;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isFormClean", function () {
        var values = _this.state.values;
        var isValue = Object.values(values).filter(function (val) {
          return val.length > 0;
        });
        return isValue.length === 0;
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "cleanForm", function () {
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

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (e) {
        var _e$target = e.target,
            name = _e$target.name,
            value = _e$target.value,
            type = _e$target.type,
            checked = _e$target.checked;
        var values = _this.state.values;
        var valueToAssign = value;

        if (type === 'checkbox') {
          valueToAssign = checked;
        }

        values[name] = valueToAssign;

        _this.setState({
          values: values
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleBlur", function (e) {
        e.preventDefault();
        var _this$state = _this.state,
            errors = _this$state.errors,
            values = _this$state.values;
        var _e$target2 = e.target,
            name = _e$target2.name,
            value = _e$target2.value;
        var validations = formValidations[name];
        var result = Validators().validate(values, value, validations);
        errors[name] = !result.isValid ? result.errors[0] : '';

        _this.setState({
          errors: errors
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleFocus", function (e) {
        var name = e.target.name;
        var errors = _this.state.errors;

        if (!!errors[name].length) {
          _this.setState({
            errors: _objectSpread({}, _this.state.errors, _defineProperty({}, name, ''))
          });
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSubmit", function (e) {
        e.preventDefault();
        var values = _this.state.values;
        var handleSubmit = _this.props.handleSubmit;

        if (_this._validateForm(values)) {
          handleSubmit(values);
        }
      });

      _this.state = {
        values: _objectSpread({}, state),
        errors: _this._stateToErrors(state)
      };
      return _this;
    }

    _createClass(WithFormMethodsHOC, [{
      key: "render",
      value: function render() {
        return React.createElement(FormComponent, _extends({}, this.props, this.state, {
          cleanForm: this.cleanForm,
          isFormClean: this.isFormClean,
          handleChange: this.handleChange,
          handleBlur: this.handleBlur,
          handleFocus: this.handleFocus,
          handleSubmit: this.handleSubmit
        }));
      }
    }]);

    return WithFormMethodsHOC;
  }(Component), _temp;
};

export default WithControlledForm;