import { Button } from "@chakra-ui/react"
import { CanvasTools } from "types/index"

const Toolbar = ({
  toggleHandTool,
}: {
  toggleHandTool: (tool: CanvasTools) => void
}) => {
  return (
    <div>
      <Button onClick={() => toggleHandTool("drawing")}>Toggle Drawing</Button>
      <Button onClick={() => toggleHandTool("text")}>Add Text</Button>
    </div>
  )
}

export default Toolbar
