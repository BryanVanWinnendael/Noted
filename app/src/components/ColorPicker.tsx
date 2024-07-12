import { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import useColors from "hooks/useColors";
import { HexColorPicker } from "react-colorful";

const ColorPicker = ({
  keyType,
  onChange,
  givenColor,
}: {
  keyType: any;
  onChange: (key: any, color: string) => void;
  givenColor: string;
}) => {
  const { accentColor } = useColors();
  const [color, setColor] = useState(givenColor);

  const changeColor = (color: string) => {
    setColor(color);
    onChange(keyType, color);
  };

  useEffect(() => {
    setColor(givenColor);
  }, [givenColor]);

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          border="1px"
          borderColor={accentColor}
          aria-label={color}
          background={color}
          height="22px"
          width="22px"
          padding={0}
          minWidth="unset"
          borderRadius={3}
        ></Button>
      </PopoverTrigger>
      <PopoverContent width="170px" border={0} bg="transparent">
        <PopoverBody bg="transparent">
          <HexColorPicker color={color} onChange={changeColor} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
