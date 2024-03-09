import React, { useRef, useEffect, useState, useCallback } from "react"
import { Box, Flex } from "@chakra-ui/react"
import useColors from "hooks/useColors"
import { utils } from "utils/index"
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs"
import Toolbar from "./Toolbar"
import Canvas from "./Canvas"
import { CanvasTools } from "types/index"

const Index = ({ splitted, path }: { splitted?: boolean; path: string }) => {
  const { getTextColor, getBorderColor, getBackgroundColor } = useColors()
  const canvasRefs = useRef<Array<HTMLCanvasElement | null>>([])
  const [pdfDoc, setPdfDoc] = useState<any | null>(null)
  const [tool, setTool] = useState<CanvasTools>("none")
  const boxRef = useRef<HTMLDivElement>(null)

  const [zoom, setZoom] = useState<number>(1)
  const divRef = useRef<HTMLDivElement>(null)
  const [canvasWidth, setCanvasWidth] = useState<string>("100%")

  const text_color = getTextColor()
  const border_color = getBorderColor()
  const bg_color = getBackgroundColor()
  const lighter_bg_color =
    utils.getTextColor(bg_color) === "#fff"
      ? utils.getLighterColor("0.02", bg_color)
      : utils.getDarkerColor("0.02", bg_color)

  useEffect(() => {
    const fetchPdf = async () => {
      const pdfjs = await import("pdfjs-dist")
      pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker
      const loadingTask = pdfjs.getDocument(path)
      const doc = await loadingTask.promise
      setPdfDoc(doc)
    }

    fetchPdf()
  }, [path])

  useEffect(() => {
    const renderPages = async () => {
      if (!pdfDoc) return

      for (let i = 0; i < pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i + 1)
        const viewport = page.getViewport({ scale: 1 })
        const canvas = canvasRefs.current[i]

        if (!canvas) continue

        const context = canvas.getContext("2d")!

        // Calculate the scale factor to fit the page to the canvas
        const containerWidth = canvas.parentElement?.clientWidth || 0
        const containerHeight = canvas.parentElement?.clientHeight || 0
        const scale = Math.min(
          containerWidth / viewport.width,
          containerHeight / viewport.height,
        )

        canvas.width = viewport.width * scale
        canvas.height = viewport.height * scale

        const scaledViewport = page.getViewport({ scale })

        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
        }

        await page.render(renderContext).promise
      }
    }

    renderPages()
  }, [pdfDoc])

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const deltaY = event.deltaY;
    const scaleIncrement = 0.1; // Adjust this value to control the zoom speed
    
    if (event.ctrlKey) {
      // Zoom in/out
      const currentScale = zoom;
        
      const newScale =
        deltaY > 0
          ? currentScale - scaleIncrement
          : currentScale + scaleIncrement;
      setZoom(newScale);
      getWidth()
    }
  };

  const getWidth = useCallback(() => {
    if (!divRef.current) return "100%"
    let width = divRef.current.clientWidth
    width = width * zoom
    setCanvasWidth(`${width}px`)
  },[zoom])

  useEffect(() => {
    const handleResize = () => {
      if (divRef.current) {
        getWidth()
      }
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [divRef, getWidth, zoom])

  const toggleHandTool = (newTool: CanvasTools) => {
    if (newTool === tool) return setTool("none")
    setTool(newTool)
  }

  return (
    <Flex
      ref={divRef}
      ml={splitted ? 2 : 0}
      color={text_color}
      w="full"
      h="full"
      border="1px"
      borderColor={border_color}
      rounded="md"
      bg={lighter_bg_color}
      mb={2}
      justifyContent="center"
      direction="column"
    >
      <Toolbar
        toggleHandTool={toggleHandTool}
      />
      
      <Flex
        w="full"
        h="full"
        color={text_color}
        overflowY="scroll"
        overflowX="scroll"
        direction="column"
        onWheel={handleWheel}
        gap={2}
        ref={boxRef}
      >
        {pdfDoc &&
          Array.from({ length: pdfDoc.numPages }, (_, i) => {
            // (ref: HTMLCanvasElement) => (canvasRefs.current[i] = ref)
            return (
              <Box width={canvasWidth} key={i}>
              {/* <canvas
              key={i}
             
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp} 
            /> */}
                <Canvas tool={tool} pdfRef={(ref: HTMLCanvasElement) => canvasRefs.current[i] = ref}/>
              </Box>
            )
           
          })}
         
      </Flex>
    </Flex>
  )
}

export default Index
