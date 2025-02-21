import React from "react";
import PropTypes from "prop-types";
import { AutoComplete, Form, Input } from "antd";

const TextFieldGroup = ({
  label,
  error,
  onSelect,
  onSearch,
  onChange,
  formItemLayout,
  help,
  options,
  inputRef,
  value,
}) => (
  <Form.Item
    label={label}
    validateStatus={error ? "error" : ""}
    help={error ? error : help}
    {...formItemLayout}
  >
    <AutoComplete
      options={options.map((o) => ({ label: o, value: o }))}
      width={200}
      onSelect={onSelect}
      onSearch={onSearch}
      onChange={onChange}
      ref={inputRef}
      value={value}
    />
  </Form.Item>
);

TextFieldGroup.propTypes = {
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

TextFieldGroup.defaultProps = {
  text: "text",
  disabled: false,
  readOnly: false,
  autoComplete: "on",
};

export default TextFieldGroup;
