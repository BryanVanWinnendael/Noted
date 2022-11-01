import { useColorModeValue, Text, Box } from "@chakra-ui/react"
import { Map } from "immutable"
// #CCCCFF

type Props = {
  children: any
}

const Code = ({children, ...props}: Props) => {
  const bg_color = useColorModeValue("rgb(229, 231, 235)", "#242b38")

  return (
    <Box bg={bg_color} className="bg-gray-200 rounded-md p-2">
      {children}
    </Box>
  )
}

const HeadingOne = ({children, ...props}: Props) => {
  const text_color = useColorModeValue("#2a2a2a", "#f6f6f6")

  return (
    <Text color={text_color} className="text-5xl text-h_white font-semibold">
      {children}
    </Text>
  )
}

const HeadingTwo = ({children, ...props}: Props) => {
  const text_color = useColorModeValue("#2a2a2a", "#f6f6f6")

  return (
    <Text color={text_color} className="text-4xl text-h_white font-semibold">
      {children}
    </Text>
  )
}

const HeadingThree = ({children, ...props}: Props) => {
  const text_color = useColorModeValue("#2a2a2a", "#f6f6f6")

  return (
    <Text color={text_color} className="text-3xl text-h_white font-semibold">
      {children}
    </Text>
  )
}

const HeadingFour = ({children, ...props}: Props) => {
  const text_color = useColorModeValue("#2a2a2a", "#f6f6f6")

  return (
    <Text color={text_color} className="text-2xl text-h_white font-semibold">
      {children}
    </Text>
  )
}

const HeadingFive = ({children, ...props}: Props) => {
  const text_color = useColorModeValue("#2a2a2a", "#f6f6f6")

  return (
    <Text color={text_color} className="text-xl text-h_white font-semibold">
      {children}
    </Text>
  )
}

const HeadingSix = ({children, ...props}: Props) => {
  const text_color = useColorModeValue("#2a2a2a", "#f6f6f6")

  return (
    <Text color={text_color} className="text-lg text-h_white font-semibold">
      {children}
    </Text>
  )
}

const Blockquote = ({children, ...props}: Props) => {
  const text_color = useColorModeValue("text-gray-600", "text-gray-400")
  return (
    <blockquote className={`border-solid border-l-2 border-CornflowerBlue pl-2 ml-5z ${text_color}`}>
      {children}
    </blockquote>
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
