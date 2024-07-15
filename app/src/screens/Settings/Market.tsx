import { MyWindow, Theme } from "types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ThemeCard from "components/CustomTheme/ThemeCard";
import { Center, Spinner, Box, Text, Flex } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import useColors from "hooks/useColors";
import { GetMarket } from "lib/actions/market/get";

declare let window: MyWindow;

const invoke = window.electron.invoke;

const Market = () => {
  const { accentColor, mutedTextColor } = useColors();
  const [loading, setLoading] = useState<boolean>(true);
  const [themes, setThemes] = useState<{ [key: string]: Theme }>({});

  const handleLink = () => {
    invoke("openBrowser", import.meta.env.VITE_CLIENT_URL);
  };

  useEffect(() => {
    setLoading(true);
    const getMarket = async () => {
      const res = await GetMarket();
      if (res) setThemes(res);
      setLoading(false);
    };

    getMarket();
  }, []);

  return (
    <Box>
      <Text fontSize="3xl">Market</Text>
      <Text color={mutedTextColor}>Download custom themes</Text>
      <Flex gap={1}>
        <Text color={mutedTextColor}>
          or request your own theme to be uploaded
        </Text>
        <Text onClick={handleLink} cursor="pointer" color={accentColor}>
          here <ExternalLinkIcon mx="2px" />
        </Text>
      </Flex>

      {!loading ? (
        Object.keys(themes).length > 0 ? (
          Object.keys(themes).map((theme: string) => {
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
                  colors={themes[theme]}
                  deletable={false}
                />
              </motion.li>
            );
          })
        ) : (
          "No themes"
        )
      ) : (
        <Center h="full" mt={5}>
          <Spinner color={accentColor} />
        </Center>
      )}
    </Box>
  );
};

export default Market;
