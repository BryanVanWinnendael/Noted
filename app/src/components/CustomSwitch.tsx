import { Switch } from "@chakra-ui/react";
import useColors from "hooks/useColors";

const CustomSwitch = ({
  isChecked,
  onChange,
  id,
  disabled,
}: {
  isChecked: boolean;
  onChange: () => void;
  id: string;
  disabled?: boolean;
}) => {
  const { accentColor } = useColors();

  return (
    <Switch
      sx={{
        ".css-p27qcy[aria-checked=true], .css-p27qcy[data-checked]": {
          backgroundColor: accentColor,
        },
      }}
      isChecked={isChecked}
      onChange={onChange}
      id={id}
      disabled={disabled}
    />
  );
};

export default CustomSwitch;
