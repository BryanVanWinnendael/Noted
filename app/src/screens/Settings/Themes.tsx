import { Box, Text } from "@chakra-ui/react";
import ThemeCard from "components/CustomTheme/ThemeCard";
import { useSettingsStore } from "stores/SettingsStore";
import { AnimatePresence, motion } from "framer-motion";
import useColors from "hooks/useColors";

const Themes = () => {
  const { mutedTextColor } = useColors();
  const { customThemes } = useSettingsStore();

  const themes = Object.keys(customThemes);

  return (
    <Box>
      <Text fontSize="3xl">Custom themes</Text>
      <Text color={mutedTextColor}>Manage your custom themes here</Text>
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
