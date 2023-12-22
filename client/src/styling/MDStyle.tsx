import { useColorModeValue, Text, Box } from "@chakra-ui/react"
import { getStyle } from "styling"
import { Map } from "immutable"
import { utils } from "utils"
import { useSettings } from "contexts/SettingsContext"

type Props = {
  children: any
}

const Code = ({children, ...props}: Props) => {
  const bg_color_chakra = useColorModeValue("rgb(229, 231, 235)", "#242b38")
  const bg_color = getStyle()?.secondaryBackgroundColor || bg_color_chakra
  console.log(children)


  return (
    <Box bg={bg_color} className="bg-gray-200 rounded-md p-2">
      {children}
    </Box>
  )
}

const HeadingOne = ({children, ...props}: Props) => {
  const { headerColors } = useSettings()

  const custom_colors  = headerColors
  const text_color_chakra = useColorModeValue("#2a2a2a", "#f6f6f6")
  let text_color: string = text_color_chakra

  if (custom_colors) {
    text_color = custom_colors.h1
  } else {
    text_color = getStyle()?.textColor || text_color_chakra
  }

  return (
    <Text color={text_color} className="text-5xl text-h_white font-semibold">
      {children}
    </Text>
  )
}

const HeadingTwo = ({children, ...props}: Props) => {
  const { headerColors } = useSettings()
  
  const custom_colors  = headerColors
  const text_color_chakra = useColorModeValue("#2a2a2a", "#f6f6f6")
  let text_color: string = text_color_chakra

  if (custom_colors) {
    text_color = custom_colors.h2
  } else {
    text_color = getStyle()?.textColor || text_color_chakra
  }

  return (
    <Text color={text_color} className="text-4xl text-h_white font-semibold">
      {children}
    </Text>
  )
}

const HeadingThree = ({children, ...props}: Props) => {
  const { headerColors } = useSettings()
  
  const custom_colors  = headerColors
  const text_color_chakra = useColorModeValue("#2a2a2a", "#f6f6f6")
  let text_color: string = text_color_chakra

  if (custom_colors) {
    text_color = custom_colors.h3
  } else {
    text_color = getStyle()?.textColor || text_color_chakra
  }

  return (
    <Text color={text_color} className="text-3xl text-h_white font-semibold">
      {children}
    </Text>
  )
}

const HeadingFour = ({children, ...props}: Props) => {
  const { headerColors } = useSettings()
  
  const custom_colors  = headerColors
  const text_color_chakra = useColorModeValue("#2a2a2a", "#f6f6f6")
  let text_color: string = text_color_chakra

  if (custom_colors) {
    text_color = custom_colors.h4
  } else {
    text_color = getStyle()?.textColor || text_color_chakra
  }

  return (
    <Text color={text_color} className="text-2xl text-h_white font-semibold">
      {children}
    </Text>
  )
}

const HeadingFive = ({children, ...props}: Props) => {
  const { headerColors } = useSettings()
  
  const custom_colors  = headerColors
  const text_color_chakra = useColorModeValue("#2a2a2a", "#f6f6f6")
  let text_color: string = text_color_chakra

  if (custom_colors) {
    text_color = custom_colors.h5
  } else {
    text_color = getStyle()?.textColor || text_color_chakra
  }

  return (
    <Text color={text_color} className="text-xl text-h_white font-semibold">
      {children}
    </Text>
  )
}

const HeadingSix = ({children, ...props}: Props) => {
  const { headerColors } = useSettings()
  
  const custom_colors  = headerColors
  const text_color_chakra = useColorModeValue("#2a2a2a", "#f6f6f6")
  let text_color: string = text_color_chakra

  if (custom_colors) {
    text_color = custom_colors.h6
  } else {
    text_color = getStyle()?.textColor || text_color_chakra
  }

  return (
    <Text color={text_color} className="text-lg text-h_white font-semibold">
      {children}
    </Text>
  )
}

const Blockquote = ({children, ...props}: Props) => {
  const bg_color_chakra = useColorModeValue("white", "#1A202C")
  const bg_color = getStyle()?.backgroundColor || bg_color_chakra 
  
  const text_color = utils.getMutedTextColor(utils.getTextColor(bg_color))
  const accent_color = getStyle()?.accentColor || "#6488ea"

  return (
    <Box color={text_color} borderLeft={`1px solid`} borderColor={accent_color}>
      <blockquote className={`pl-2 ml-5z`}>
        {children}
      </blockquote>
    </Box>
  )
}

export const blockRenderMap = Map({
    "header-one": {
        element: "h1",
        wrapper: <HeadingOne children={undefined}/>
    },
    "header-two": {
        element: "h2",
        wrapper: <HeadingTwo children={undefined}/>
    },
    "header-three": {
        element: "h3",
        wrapper: <HeadingThree children={undefined}/>
    },
    "header-four": {
        element: "h4",
        wrapper: <HeadingFour children={undefined}/>
    },
    "header-five": {
        element: "h5",
        wrapper: <HeadingFive children={undefined}/>
    },
    "header-six": {
        element: "h6",
        wrapper: <HeadingSix children={undefined}/>
    },
    "code-block": {
        element: "code-block",
        wrapper: <Code children={undefined} />,
    },
    "blockquote": {
        element: "blockquote",
        wrapper: <Blockquote children={undefined} />,
    }
    
})
