import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import useColors from "hooks/useColors";
import SignIn from "components/Auth/SignIn";
import { useWorkspace } from "contexts/WorkspaceContext";

const Notes = () => {
  const { user, handleSignOutUser } = useWorkspace();
  const { getTextColor, getMutedTextColor } = useColors();

  const text_color = getTextColor();
  const muted_text_color = getMutedTextColor();
 
  console.log(user)

  return (
    <Box color={text_color}>
      <Text fontSize="3xl" mb={4}>
        Notes
      </Text>
      <Stack mr={5} gap={3}>
      <Flex alignItems="center" justify="space-between">
        {user ? 
        <>
          <Text fontWeight="semibold">Signed in as</Text>
          <Box>
            <Text fontWeight="semibold">{user.email}</Text>
          </Box>
          </>
          :
          <>
          <Box>
            <Text fontWeight="semibold">Sign in</Text>
            <Text color={muted_text_color}>
              Sign in with email or google
            </Text>
          </Box>
          <SignIn />
        </>
        }
        </Flex>
        {user && 
          <Flex alignItems="center" justify="space-between">
            <Text fontWeight="semibold"></Text>
            <Button onClick={handleSignOutUser} colorScheme="red" >
              Sign out
            </Button>
          </Flex>
        }
      </Stack>
    </Box>
  );
};

export default Notes;
