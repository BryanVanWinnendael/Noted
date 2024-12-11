import { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverBody,
  Input,
  VStack,
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
  const { accentColor, backgroundColor } = useColors();
  const [color, setColor] = useState(givenColor);
  const [hexInput, setHexInput] = useState(givenColor);

  const changeColor = (newColor: string) => {
    setColor(newColor);
    setHexInput(newColor);
    onChange(keyType, newColor);
  };

  const handleHexInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setHexInput(value);

    // Validate hex input (allow 3 or 6 character hex codes with optional #)
    if (/^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value)) {
      const formattedValue = value.startsWith("#") ? value : `#${value}`;
      setColor(formattedValue);
      onChange(keyType, formattedValue);
    }
  };

  useEffect(() => {
    setColor(givenColor);
    setHexInput(givenColor);
  }, [givenColor]);

  return (
    <Popover
      placement="auto"
      modifiers={[
        {
          name: "preventOverflow",
          options: {
            boundary: "viewport",
          },
        },
        {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
      ]}
    >
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
          <VStack spacing={2} align="stretch">
            <HexColorPicker color={color} onChange={changeColor} />
            <Input
              value={hexInput}
              onChange={handleHexInputChange}
              placeholder="Enter hex color"
              size="sm"
              border="1px"
              borderColor={accentColor}
              backgroundColor={backgroundColor}
              borderRadius="md"
            />
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
