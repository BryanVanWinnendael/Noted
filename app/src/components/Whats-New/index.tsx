import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  Text,
  ModalOverlay,
  Grid,
  GridItem,
} from "@chakra-ui/react"
import useColors from "hooks/useColors"
import { useState } from "react"
import updates from "./updates.json"
import Page from "./Page"
import { IoIosArrowBack } from "react-icons/io"
import { IoIosArrowForward } from "react-icons/io"
import { utils } from "utils/index"
import { useWorkspace } from "contexts/WorkspaceContext"
import { APP_VERSION } from "utils/constants"

type Update = {
  title: string
  text: string
  list?: string[]
}

const Index = () => {
  const { getBackgroundColor, getTextColor, getAccentColor } = useColors()
  const { setNewVersion, setShowConfetti } = useWorkspace()
  const [isOpen, setIsOpen] = useState(true)
  const pages: Update[] = updates
  const [page, setPage] = useState(0)
  setShowConfetti(false)
  const bg_color = getBackgroundColor()
  const text_color = getTextColor()
  const accent_color = getAccentColor()

  const handleClose = () => {
    setShowConfetti(true)
    setIsOpen(false)
    setNewVersion(false)
    localStorage.setItem("version", APP_VERSION)
  }

  return (
    <Modal isOpen={isOpen} onClose={() => console.log()}>
      <ModalOverlay />
      <ModalContent bg={bg_color} w="full">
        <Flex p={2} px={5} w="full" gap={1} alignItems="center">
          <Text
            bg={`linear-gradient(to right, ${accent_color}, ${text_color}, ${text_color})`}
            backgroundClip="text"
            backgroundSize="200% auto"
            fontWeight={700}
            fontSize="4xl"
          >
            What's new
          </Text>
          <Text fontSize="3xl">✨</Text>
        </Flex>
        <ModalBody px={4}>
          {pages.map((update, index) => {
            if (index === page) return <Page key={index} {...update} />
          })}
          <Grid pt={2} w="full" templateColumns="repeat(2, 1fr)">
            {page > 0 && (
              <GridItem display="flex" justifyContent="flex-start" colStart={1}>
                <Button
                  _hover={{
                    bg: "transparent",
                    color: accent_color,
                  }}
                  m={0}
                  p={0}
                  color={text_color}
                  leftIcon={<IoIosArrowBack />}
                  bg="transparent"
                  onClick={() => page > 0 && setPage(page - 1)}
                >
                  Previous
                </Button>
              </GridItem>
            )}

            {page < pages.length - 1 && (
              <GridItem display="flex" justifyContent="flex-end" colStart={2}>
                <Button
                  m={0}
                  p={0}
                  _hover={{
                    bg: "transparent",
                    color: accent_color,
                  }}
                  color={text_color}
                  rightIcon={<IoIosArrowForward />}
                  bg="transparent"
                  onClick={() => page < pages.length - 1 && setPage(page + 1)}
                >
                  Next
                </Button>
              </GridItem>
            )}

            {page === pages.length - 1 && (
              <GridItem mt={4} w="full" rowStart={2} colSpan={2}>
                <Button
                  color={utils.getTextColor(accent_color)}
                  _hover={{ backgroundColor: accent_color, opacity: 0.8 }}
                  bg={accent_color}
                  w="full"
                  onClick={handleClose}
                >
                  Start writing Noted
                </Button>
              </GridItem>
            )}
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Index
