import { SelectPicker } from "rsuite";

export const Select = ({
  data,
  size = "lg",
  placeholder,
  onChange,
  defaultValue,
  value,
}) => {
  return (
    <SelectPicker
      defaultValue={defaultValue}
      size={size}
      value={value}
      placeholder={placeholder}
      data={data}
      style={{ width: "100%" }}
      onChange={onChange}
    />
  );
};
