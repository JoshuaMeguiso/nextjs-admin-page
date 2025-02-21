import React from "react";
import PropTypes from "prop-types";
import { Form, Input, InputNumber } from "antd";

const NumberFieldGroup = ({
  label,
  error,
  name,
  type,
  value,
  onChange,
  placeholder,
  disabled,
  inputRef,
  formItemLayout,
  readOnly,
  autoComplete,
  onPressEnter,
  help,
  onBlur,
  step,
}) => (
  <Form.Item
    label={label}
    validateStatus={error ? "error" : ""}
    help={error ? error : help}
    {...formItemLayout}
  >
    <InputNumber
      formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
      step={step}
      disabled={disabled}
      type={type}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      value={value}
      ref={inputRef}
      readOnly={readOnly}
      autoComplete={autoComplete}
      onPressEnter={onPressEnter ? onPressEnter : (e) => e.preventDefault()}
      onBlur={onBlur}
    />
  </Form.Item>
);

NumberFieldGroup.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  autoComplete: PropTypes.string,
};

NumberFieldGroup.defaultProps = {
  text: "text",
  disabled: false,
  readOnly: false,
  autoComplete: "on",
};

export default NumberFieldGroup;
