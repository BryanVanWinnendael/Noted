import { DEFAULT_TRANSLATE_LANGUAGE } from "utils/constants";
import { Box, Flex, Select, Text } from "@chakra-ui/react";
import { useSettings } from "contexts/SettingsContext";
import { utils } from "utils";
import useColors from "hooks/useColors";
import { useEffect, useState } from "react";
import languages from "utils/languages.json";

const TranslateSeting = () => {
  const { getSecondaryBackgroundColor, getMutedTextColor } = useColors();
  const [language, setLanguage] = useState<string>(DEFAULT_TRANSLATE_LANGUAGE);
  const [languagesList, setLanguagesList] = useState<string[]>([]);
  const { translateLanguage, saveSettings } = useSettings();

  const secondary_background_color = getSecondaryBackgroundColor();
  const bg_color = utils.getLighterColor("0.02", secondary_background_color);
  const muted_text_color = getMutedTextColor();

  const changeLanguage = (e: any) => {
    const chosenLanguage = e.target.value || DEFAULT_TRANSLATE_LANGUAGE;
    setLanguage(chosenLanguage);
    saveSettings("translate_language", chosenLanguage);
  };

  const getLanguages = () => {
    const lang = Object.keys(languages.translation).map((lang) => lang);
    setLanguagesList(lang);
  };

  useEffect(() => {
    if (translateLanguage) setLanguage(translateLanguage);
    getLanguages();
  }, [translateLanguage]);

  return (
    <Flex justifyContent="space-between" alignItems="center" mr={5} mt={2}>
      <Box>
        <Text fontWeight="semibold">Language</Text>
        <Text color={muted_text_color}>
          Choose the language when translating text to
        </Text>
      </Box>
      <Select
        onChange={changeLanguage}
        maxH="200px"
        value={language}
        width="auto"
        css={{ "& > *": { background: `${bg_color} !important` } }}
        placeholder={DEFAULT_TRANSLATE_LANGUAGE + " (default)"}
        h="30px"
      >
        {languagesList &&
          languagesList.map((lang: string, index: number) => (
            <option key={index} value={lang}>
              {lang}
            </option>
          ))}
      </Select>
    </Flex>
  );
};

export default TranslateSeting;
