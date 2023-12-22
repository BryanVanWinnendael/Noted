import { Box, Flex, useColorModeValue, Input, Text, Kbd } from '@chakra-ui/react'
import { utils } from 'utils'
import { COMMANDS } from 'components/commandPalette/commands'
import { getStyle } from 'styling'
import { CommandCallback, CommandsList } from 'types'
import { useFile } from 'contexts/FileContext'
import { useCommands } from 'contexts/CommandContext'
import { ChangeEvent, useState } from 'react'
import debounce from 'lodash.debounce'
import { useSettings } from 'contexts/SettingsContext'
import { useEditor } from 'contexts/EditorContext'

const Index = () => {
  const fileContext = useFile()
  const settingsContext = useSettings()
  const editorContext = useEditor()
  const { setCommandsOpen } = useCommands()
  const bg_color_chakra = useColorModeValue("#ffff", "#1a202c")
  const [commands, setCommands] = useState<CommandsList[]>(COMMANDS)
  const bg_color = getStyle()?.backgroundColor || bg_color_chakra

  const handleCommand = (command: CommandCallback) => {
    command({fileContext, settingsContext, editorContext})
    setCommandsOpen(false)
  }

  const handleSearch = debounce((event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase()
    if (query === "") {
      setCommands(COMMANDS)
    } else {
      const filtered = COMMANDS.filter(command => command.name.toLocaleLowerCase().includes(query))
      setCommands(filtered)
    }
  }, 100)

  return (
    <Box>
      <Input onChange={handleSearch} pt={2} px={2} mb={5} variant='unstyled' placeholder="Type command" />
      <Flex maxHeight={300} direction="column" gap={2} overflowY="auto">
        {
          commands.map((command, index) => {
            return (
              <Flex
                justify="space-between"
                key={index}
                onClick={() => handleCommand(command.callback)}
                _hover={{ bg: utils.getDarkerColor("0.03", bg_color), color: utils.getTextColor(utils.getDarkerColor("0.1", bg_color)) }}
                color={utils.getTextColor(bg_color)}
                className={`flex px-2 py-2 text-sm cursor-pointer text-gray-700 rounded`}
              >
                <Text w="100%">{command.name}</Text>
                {command.shortcut && <Box color={utils.getMutedTextColor(utils.getTextColor(bg_color))} className={`w-full flex justify-end mr-5`}>
                  <Kbd>{command.shortcut.split(" ")[0]}</Kbd> 
                  <Text>{command.shortcut.split(" ")[1]}</Text>
                  <Kbd>{command.shortcut.split(" ")[2]}</Kbd> 
                </Box>}
              </Flex>
            )
          })
        }
      </Flex>
    </Box>
  )
}

export default Index