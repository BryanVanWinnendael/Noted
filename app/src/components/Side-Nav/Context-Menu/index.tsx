import { Divider, MenuList } from "@chakra-ui/react"
import { useSettings } from "contexts/SettingsContext"
import useColors from "hooks/useColors"
import { utils } from "utils/index"
import Delete from "./Delete"
import Rename from "./Rename"
import { ContextMenu } from "types/index"
import AddFile from "./AddFile"
import AddFolder from "./AddFolder"
import OpenFIleInTab from "./OpenFileInTab"
import SplitFile from "./SplitFile"
import AddExcalidraw from "./AddExcalidraw"

const Index = ({ path, name, type }: ContextMenu) => {
  const { getBackgroundColor, getBorderColor } = useColors()
  const { glassBackground, glassEnabled } = useSettings()

  const bg_color = getBackgroundColor()
  const bg_color_lighter = utils.getLighterColor("0.02", bg_color)

  const border_color = getBorderColor()

  const isGlassEnabled = glassEnabled && glassBackground.contextMenu

  return (
    <MenuList
      w="fit-content"
      className="glass"
      border="1px"
      borderColor={border_color}
      bg={
        isGlassEnabled
          ? utils.getGlassBackground(bg_color_lighter)
          : bg_color_lighter
      }
      rounded="md"
      shadow="none"
      zIndex={999999999999}
      p={1}
    >
      <AddFile path={path} name={name} type={type} />
      <AddExcalidraw path={path} name={name} type={type} />
      <AddFolder path={path} name={name} type={type} />
      <Divider />

      {type === "file" && (
        <>
          <OpenFIleInTab path={path} name={name} type={type} />
          <SplitFile path={path} name={name} type={type} />
          <Divider />
        </>
      )}

      <Rename path={path} name={name} type={type} />
      <Delete path={path} name={name} type={type} />
    </MenuList>
  )
}

export default Index
