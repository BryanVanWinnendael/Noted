import { useEffect, useState } from "react"
import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Center,
  SimpleGrid,
  Input,
} from "@chakra-ui/react"
import { utils } from "utils"
import useColors from "hooks/useColors"

const COLORS = [
  "#9e9e9e",
  "#f44336",
  "#616161",
  "#4caf50",
  "#2196f3",
  "#1565c0",
  "#ffeb3b",
  "#ff9800",
  "#9c27b0",
  "#e91e63",
]

const ColorPicker = ({
  keyType,
  onChange,
  givenColor,
}: {
  keyType: any
  onChange: (key: any, color: string) => void
  givenColor: string
}) => {
  const { getAccentColor, getSecondaryBackgroundColor } = useColors()
  const [color, setColor] = useState(givenColor)

  const accent_color = getAccentColor()

  const bg_color = getSecondaryBackgroundColor()

  const getTextColor = (clr1: string, clr2: string) => {
    const contrast_level = utils.contrast(clr1, clr2)
    return contrast_level > 4.5 ? "#fff" : "#000"
  }

  const changeColor = (color: string) => {
    setColor(color)
    onChange(keyType, color)
  }

  useEffect(() => {
    setColor(givenColor)
  }, [givenColor])

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          border="1px"
          borderColor={accent_color}
          aria-label={color}
          background={color}
          height="22px"
          width="22px"
          padding={0}
          minWidth="unset"
          borderRadius={3}
        ></Button>
      </PopoverTrigger>
      <PopoverContent width="170px" border={0}>
        <PopoverArrow bg={color} />
        <PopoverCloseButton color={getTextColor(color, "#fff")} />
        <PopoverHeader
          height="100px"
          backgroundColor={color}
          borderTopLeftRadius={5}
          borderTopRightRadius={5}
          color={getTextColor(color, "#fff")}
        >
          <Center height="100%">{color}</Center>
        </PopoverHeader>
        <PopoverBody height="120px" backgroundColor={bg_color}>
          <SimpleGrid columns={5} spacing={2}>
            {COLORS.map((c) => (
              <Button
                key={c}
                aria-label={c}
                background={c}
                height="22px"
                width="22px"
                padding={0}
                minWidth="unset"
                borderRadius={3}
                _hover={{ background: c }}
                onClick={() => {
                  changeColor(c)
                }}
              ></Button>
            ))}
          </SimpleGrid>
          <Input
            borderRadius={3}
            marginTop={3}
            color={getTextColor(bg_color, "#fff")}
            placeholder="#ffffff"
            size="sm"
            value={color}
            onChange={(e) => {
              changeColor(e.target.value)
            }}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default ColorPicker
