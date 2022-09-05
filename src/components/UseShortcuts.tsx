import { useFile } from '../contexts/FileContext'
import { FileTypeContext } from '../types/index'
import { getDefaultKeyBinding, KeyBindingUtil } from 'draft-js'


const UseShortcuts = () => {
  const { SaveFile, OpenFile, NewFile } = useFile() as FileTypeContext

  const HandleKeys = (command: string) =>  {
    if (command === 'save-file') {
      SaveFile()
      return 'handled'
    }
    else if (command === 'open-file') {
      OpenFile()
      return 'handled'
    }
    else if (command === 'new-file') {
      NewFile()
      return 'handled'
    }
    return 'not-handled'
  }

  const KeyCommands = (e: any): string | null => {
    const { hasCommandModifier } = KeyBindingUtil
  
    if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
      return 'save-file'
    }
    else if(e.keyCode === 79 && hasCommandModifier(e)) { 
      return 'open-file'
    }
    else if(e.keyCode === 78 && hasCommandModifier(e)) { 
      return 'new-file'
    }
    return getDefaultKeyBinding(e)
  }

  return { KeyCommands, HandleKeys }
}

export default UseShortcuts




