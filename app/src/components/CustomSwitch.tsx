import { Switch } from "@chakra-ui/react"
import useColors from "hooks/useColors"

const CustomSwitch = ({
  isChecked,
  onChange,
  id,
}: {
  isChecked: boolean
  onChange: () => void
  id: string
}) => {
  const { getAccentColor } = useColors()
  const accent_color = getAccentColor()

  return (
    <Switch
      sx={{
        ".css-p27qcy[aria-checked=true], .css-p27qcy[data-checked]": {
          backgroundColor: accent_color,
        },
      }}
      isChecked={isChecked}
      onChange={onChange}
      id={id}
    />
  )
}

export default CustomSwitch
