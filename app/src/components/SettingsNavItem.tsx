import { Box } from '@chakra-ui/react';
import useColors from 'hooks/useColors';

const SettingsNavItem = ({ label, view, setView }: { label: string, view: string, setView: (view: string) => void }) => {
  const { secondaryBackgroundColorDarker, accentColor, textColor, getTransparent} =
  useColors();

  return (
    <Box
      mb={1}
      p={1}
      pl={2}
      rounded="md"
      color={
        view === label
          ? accentColor
          : textColor
      }
      bg={
        view === label
          ? getTransparent(0.2, accentColor)
          : ""
      }
      onClick={() => {
        setView(label);
      }}
      cursor="pointer"
      _hover={{
        bg: secondaryBackgroundColorDarker,
      }}
    >
      {label} 
    </Box>
  )
}

export default SettingsNavItem