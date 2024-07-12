import { ListItem, Stack, Text, UnorderedList } from "@chakra-ui/react";
import useColors from "hooks/useColors";

type Update = {
  title: string;
  text: string;
  list?: string[];
};

const Page = (update: Update) => {
  const { textColor } = useColors();

  return (
    <Stack color={textColor}>
      <Text fontWeight={700} fontSize="xl">
        {update.title}
      </Text>
      <Text>{update.text}</Text>
      {update.list && (
        <UnorderedList px={5}>
          {update.list.map((item, index) => (
            <ListItem key={index}>{item}</ListItem>
          ))}
        </UnorderedList>
      )}
    </Stack>
  );
};

export default Page;
