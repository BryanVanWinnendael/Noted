import { useColorModeValue } from "@chakra-ui/react"
import { MentionData } from "@draft-js-plugins/mention"

type Props = {
  mention: MentionData
}

export const MentionSuggestionsBlock:React.FC<Props> = ({mention, ...parentProps}:Props) => {
  const bg_hover = useColorModeValue("hover:bg-gray-200", "hover:bg-darkModeHover")
  
  return (
    <div {...parentProps} className={`flex p-2 items-center ${bg_hover} cursor-pointer`}>
      <img
        alt=""
        src={mention.avatar}
        className="h-6 rounded-full mr-2"
      />
      <p>{mention.name}</p>
    </div>
  )
}

export const mentions: MentionData[] = [
  {
    name: "js",
    avatar: "https://www.svgrepo.com/show/355081/js.svg",
  },
  {
    name: "html",
    avatar: "https://www.svgrepo.com/show/353884/html-5.svg",
  },
  {
    name: "css",
    avatar: "https://www.svgrepo.com/show/373535/css.svg",
  },
  {
    name: "ts",
    avatar: "https://www.svgrepo.com/show/349540/typescript.svg",
  },
  {
    name: "jsx",
    avatar: "https://www.svgrepo.com/show/354259/react.svg",
  },
  {
    name: "java",
    avatar: "https://www.svgrepo.com/show/184143/java.svg",
  },
]