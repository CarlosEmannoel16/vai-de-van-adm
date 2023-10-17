import { Input, Tooltip, Whisper } from "rsuite";

export const InputText = ({
  placeholder,
  size = "lg",
  message,
  defaultValue = "",
  onChange,
}) => {
  return (
    <Whisper trigger="focus" speaker={<Tooltip>{message}</Tooltip>}>
      <Input
        style={{ width: "100%" }}
        size={size}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </Whisper>
  );
};
