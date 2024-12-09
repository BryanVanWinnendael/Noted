import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import useColors from "hooks/useColors";
import SignIn from "components/Auth/SignIn";
import { useWorkspaceStore } from "stores/WorkspaceStore";
import { MyWindow } from "types/index";
import DeleteSharedSite from "components/Editor/DeleteSharedSite";

declare let window: MyWindow;

const invoke = window.electron.invoke;

const Notes = () => {
  const { user, handleSignOutUser, notes, platform } = useWorkspaceStore();
  const { textColor, mutedTextColor, accentColor } = useColors();

  const handleVisit = (id: string) => {
    const link = import.meta.env.VITE_CLIENT_URL + "notes/" + id;
    invoke("openBrowser", link);
  };

  return (
    <Box color={textColor}>
      <Text fontSize="3xl" mb={4}>
        Notes
      </Text>
      <Stack mr={5} gap={3}>
        <Flex alignItems="center" justify="space-between">
          {user ? (
            <>
              <Text fontWeight="semibold">Signed in as</Text>
              <Box>
                <Text fontWeight="semibold">{user.email}</Text>
              </Box>
            </>
          ) : (
            <>
              <Box>
                <Text fontWeight="semibold">Sign in</Text>
                <Text color={mutedTextColor}>Sign in with email or google</Text>
              </Box>
              <SignIn />
            </>
          )}
        </Flex>
        {user && (
          <Stack>
            <Flex alignItems="center" justify="space-between">
              <Text fontWeight="semibold"></Text>
              <Button onClick={handleSignOutUser} colorScheme="red">
                Sign out
              </Button>
            </Flex>
            {notes.length > 0 ? (
              <Stack>
                <Text mt={5} fontSize="xl" fontWeight="semibold">
                  Your shared notes
                </Text>
                <Stack>
                  {notes.map((note) => {
                    const filename =
                      platform === "win32"
                        ? note.path.split("\\").pop()?.split(".noted")[0] ||
                          "Untitled"
                        : note.path.split("/").pop()?.split(".noted")[0] ||
                          "Untitled";
                    return (
                      <Flex
                        key={note.id}
                        justifyContent="space-between"
                        p={2}
                        mr={5}
                      >
                        <Flex alignItems="center">
                          <Text color={textColor} fontWeight="semibold">
                            {filename}
                          </Text>
                          <DeleteSharedSite id={note.id} />
                        </Flex>

                        <Button
                          color={textColor}
                          _hover={{
                            backgroundColor: accentColor,
                            opacity: 0.8,
                          }}
                          h={8}
                          bg={accentColor}
                          onClick={() => handleVisit(note.id)}
                        >
                          visist
                        </Button>
                      </Flex>
                    );
                  })}
                </Stack>
              </Stack>
            ) : (
              <Text mt={5} fontSize="xl">
                No notes found
              </Text>
            )}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default Notes;
