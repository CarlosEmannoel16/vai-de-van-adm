import { SelectPicker } from "rsuite";

export const Select = ({ data, size = "lg", placeholder }) => {
  return (
    <SelectPicker
      size={size}
      placeholder={placeholder}
      data={data}
      style={{ width: "100%" }}
    />
  );
};
