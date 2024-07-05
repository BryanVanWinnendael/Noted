import { Box, Text } from "@chakra-ui/react";
import ThemeCard from "components/Custom-Theme/ThemeCard";
import { useSettings } from "contexts/SettingsContext";
import { AnimatePresence, motion } from "framer-motion";
import useColors from "hooks/useColors";

const Themes = () => {
  const { getMutedTextColor } = useColors();
  const { customThemes } = useSettings();

  const themes = Object.keys(customThemes);

  const muted_text_color = getMutedTextColor();

  return (
    <Box>
      <Text fontSize="3xl">Custom themes</Text>
      <Text color={muted_text_color}>Manage your custom themes here</Text>
      <AnimatePresence mode={"popLayout"}>
        {themes.length > 0
          ? themes.map((theme) => {
              return (
                <motion.li
                  className="list-motion"
                  key={theme}
                  layout
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring" }}
                >
                  <ThemeCard
                    name={theme}
                    colors={customThemes[theme]}
                    deletable={true}
                  />
                </motion.li>
              );
            })
          : "No themes"}
      </AnimatePresence>
    </Box>
  );
};

export default Themes;
