import { WorkspaceType } from "types"
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Center,
  IconButton,
} from "@chakra-ui/react"
import { useWorkspace } from "contexts/WorkspaceContext"
import { useCallback, useEffect, useMemo, useState } from "react"
import { utils } from "utils"
import { MdOutlineCreateNewFolder } from "react-icons/md"
import { TbFilePlus } from "react-icons/tb"
import useColors from "hooks/useColors"
import { useSettings } from "contexts/SettingsContext"
import CompactNavbar from "components/Nav-Bar/CompactNavbar"

const Index = ({ workspace }: { workspace: WorkspaceType }) => {
  const { getSecondaryBackgroundColor, getTextColor, getIconColor } =
    useColors()
  const [filterdWorkspace, setFilterdWorkspace] =
    useState<WorkspaceType>(workspace)
  const { openFile, activeFile } = useWorkspace()
  const { compactMode } = useSettings()

  const secondary_background_color = getSecondaryBackgroundColor()
  const bg_color = utils.getLighterColor("0.02", secondary_background_color)

  const text_color = getTextColor()

  const icon_color = getIconColor()

  const makeTree = (folder: WorkspaceType[]) => {
    if (!folder) {
      return <></>
    }

    return folder.map((item) => {
      if (item.type === "folder" && item.items) {
        return (
          <AccordionItem key={item.name} border="none" w="full">
            <AccordionButton
              color={text_color}
              _hover={{ bg: utils.getDarkerColor("0.03", bg_color) }}
              rounded="md"
              w="full"
              h="fit-content"
              p={1}
              pl={2}
            >
              <AccordionIcon color={icon_color} />
              <Text
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                fontSize="sm"
              >
                {item.name}
              </Text>
            </AccordionButton>
            <AccordionPanel pb={1} w="full">
              {makeTree(item.items)}
            </AccordionPanel>
          </AccordionItem>
        )
      } else {
        return (
          <Box
            color={text_color}
            key={item.name}
            onClick={() => openFile(item.path)}
            cursor="pointer"
            _hover={{ bg: utils.getDarkerColor("0.03", bg_color) }}
            p={1}
            pl={2}
            bg={
              activeFile && activeFile.path === item.path
                ? utils.getDarkerColor("0.03", bg_color)
                : "none"
            }
            rounded="md"
          >
            <Text
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              fontSize="sm"
              ml="20px"
            >
              {item.name.split(".noted")[0]}
            </Text>
          </Box>
        )
      }
    })
  }

  const filterFilesWithNoted = useCallback(
    (items: WorkspaceType[] | undefined): WorkspaceType[] | undefined => {
      if (!items) {
        return undefined
      }

      return items
        .filter(
          (item) =>
            (item.type === "file" && item.name.includes(".noted")) ||
            item.type === "folder",
        )
        .map((item) => {
          if (item.type === "folder" && item.items) {
            return { ...item, items: filterFilesWithNoted(item.items) }
          }
          return item
        })
    },
    [],
  )

  const memoizedFilteredWorkspace = useMemo(() => {
    return { ...workspace, items: filterFilesWithNoted(workspace.items) }
  }, [workspace, filterFilesWithNoted])

  useEffect(() => {
    setFilterdWorkspace(memoizedFilteredWorkspace)
  }, [memoizedFilteredWorkspace])

  return (
    <Box
      w="full"
      h="full"
    > 
      {compactMode && <CompactNavbar />}
      <Center p={1}>
        <IconButton
          _hover={{ bg: utils.getDarkerColor("0.03", bg_color) }}
          color={icon_color}
          bg="none"
          w={7}
          h={7}
          aria-label="create file"
          icon={<TbFilePlus />}
        />
        <IconButton
          _hover={{ bg: utils.getDarkerColor("0.03", bg_color) }}
          color={icon_color}
          bg="none"
          w={7}
          h={7}
          aria-label="create folder"
          icon={<MdOutlineCreateNewFolder />}
        />
      </Center>
      <Text pl={4} fontWeight="bold" fontSize="sm" color={text_color}>
        {workspace.name}
      </Text>
      {filterdWorkspace.items && (
        <Accordion allowMultiple defaultIndex={[0]} w="full" px={2}>
          {makeTree(filterdWorkspace.items)}
        </Accordion>
      )}
    </Box>
  )
}

export default Index
