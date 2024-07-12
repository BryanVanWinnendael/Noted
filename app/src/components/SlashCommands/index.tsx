import { Flex, Text } from "@chakra-ui/react";
import { useSettings } from "contexts/SettingsContext";
import { useSlash } from "contexts/SlashContext";
import { motion } from "framer-motion";
import useColors from "hooks/useColors";
import { useEffect, useRef, useState } from "react";
import Rewriter from "./Rewriter";
import Translater from "./Translater";
import { BsTranslate } from "react-icons/bs";
import { MdOutlineWrapText } from "react-icons/md";

type openType = "rewriter" | "translator" | false;

const SlashCommands = () => {
  const { position, setSlashOpen } = useSlash();
  const boxRef = useRef<HTMLDivElement>(null);
  const topP = position.y + 25;
  const LeftP = position.x;
  const { backgroundColor, borderColor, textColor, iconColor, backgroundColorDarker, getGlassBackground } =
    useColors();
  const { glassBackground, glassEnabled } = useSettings();
  const [open, setOpen] = useState<openType>(false);

  const isGlassEnabled = glassEnabled && glassBackground.navBar;

  const renderText = () => {
    return (
      <>
        <Flex
          onClick={() => setOpen("rewriter")}
          cursor="pointer"
          px={4}
          p={2}
          alignItems="center"
          _hover={{ bg: backgroundColorDarker }}
          rounded="md"
          w="full"
          bg="transparent"
          gap={1}
        >
          <MdOutlineWrapText color={iconColor} />
          <Text color={textColor}>Rewrite text</Text>
        </Flex>
        <Flex
          onClick={() => setOpen("translator")}
          cursor="pointer"
          px={4}
          p={2}
          alignItems="center"
          _hover={{ bg: backgroundColorDarker }}
          rounded="md"
          w="full"
          bg="transparent"
          gap={1}
        >
          <BsTranslate color={iconColor} />
          <Text color={textColor}>Translate text</Text>
        </Flex>
      </>
    );
  };

  const renderBox = () => {
    switch (open) {
      case "rewriter":
        return <Rewriter />;
      case "translator":
        return <Translater />;
      default:
        return renderText();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setSlashOpen(false);
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSlashOpen]);

  return (
    <motion.div
      ref={boxRef}
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.8 }}
      transition={{ duration: 0.1 }}
      className="glass flex flex-col justify-between p-2"
      style={{
        position: "fixed",
        top: topP,
        left: LeftP,
        backgroundColor: isGlassEnabled
          ? getGlassBackground(backgroundColor)
          : backgroundColor,
        borderRadius: "8px",
        border: `1px solid ${borderColor}`,
        zIndex: 1000,
      }}
    >
      {renderBox()}
    </motion.div>
  );
};

export default SlashCommands;
