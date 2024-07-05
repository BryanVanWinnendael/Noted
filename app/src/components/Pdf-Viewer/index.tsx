import React, { useRef, useEffect, useState, useCallback } from "react";
import { Box, Flex } from "@chakra-ui/react";
import useColors from "hooks/useColors";
import { utils } from "utils/index";
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs";
import Toolbar from "./Toolbar";
import Canvas from "./Canvas";
import { CanvasTools } from "types/index";
import { PDFDocumentProxy } from "pdfjs-dist";
import { useWorkspace } from "contexts/WorkspaceContext";
import jsPDF from "jspdf";

const Index = ({ splitted, path }: { splitted?: boolean; path: string }) => {
  const { savePdfFile } = useWorkspace();
  const { getTextColor, getBorderColor, getBackgroundColor } = useColors();
  const canvasRefs = useRef<Array<HTMLCanvasElement | null>>([]);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [tool, setTool] = useState<CanvasTools>("none");
  const boxRef = useRef<HTMLDivElement>(null);
  const [originalSize, setOriginalSize] = useState<{ w: number; h: number }>({
    w: 0,
    h: 0,
  });
  const [saving, setSaving] = useState<boolean>(false);

  const [zoom, setZoom] = useState<number>(1);
  const divRef = useRef<HTMLDivElement>(null);
  const [canvasWidth, setCanvasWidth] = useState<string>("100%");

  const text_color = getTextColor();
  const border_color = getBorderColor();
  const bg_color = getBackgroundColor();
  const lighter_bg_color =
    utils.getTextColor(bg_color) === "#fff"
      ? utils.getLighterColor("0.02", bg_color)
      : utils.getDarkerColor("0.02", bg_color);

  const handleSave = useCallback(async () => {
    if (!pdfDoc) return;
    setSaving(true);
    const isHorizontal = originalSize.w > originalSize.h;

    const doc = new jsPDF({
      format: [originalSize.w, originalSize.h],
      orientation: isHorizontal ? "landscape" : "portrait",
    });

    let currentPage = 0;

    const renderNextPage = () => {
      if (currentPage >= pdfDoc.numPages) {
        doc.deletePage(1);
        const buffer = doc.output("arraybuffer");
        savePdfFile(buffer, path);
        setSaving(false);
        return;
      }

      const canvas = canvasRefs.current[currentPage];
      if (!canvas) {
        currentPage++;
        renderNextPage();
        return;
      }

      const imgData = canvas.toDataURL("image/png");
      const page = doc.addPage();
      page.addImage(imgData, "SVG", 0, 0, originalSize.w, originalSize.h);

      currentPage++;
      setTimeout(renderNextPage, 0); // Asynchronous rendering using setTimeout
    };

    renderNextPage();
  }, [originalSize.h, originalSize.w, path, pdfDoc, savePdfFile]);

  useEffect(() => {
    const fetchPdf = async () => {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
      const loadingTask = pdfjs.getDocument(path);
      const doc = await loadingTask.promise;
      setPdfDoc(doc);
    };
    fetchPdf();
  }, [path]);

  useEffect(() => {
    const renderPages = async () => {
      if (!pdfDoc) return;
      const openedFile = {
        path,
        data: null,
      };
      utils.saveToRecentOpened(openedFile, splitted);
      for (let i = 0; i < pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i + 1);
        const viewport = page.getViewport({ scale: 1 });

        // Calculate the scale factor for the canvas
        const containerWidth = divRef.current?.clientWidth || 0;
        const containerHeight = divRef.current?.clientHeight || 0;
        const scaleWidth = containerWidth / viewport.width;
        const scaleHeight = containerHeight / viewport.height;
        const scale = Math.min(scaleWidth, scaleHeight);

        // Set canvas dimensions based on the scaled viewport
        const canvas = canvasRefs.current[i];
        if (!canvas) continue;
        canvas.width = viewport.width * scale;
        canvas.height = viewport.height * scale;

        const w = viewport.width || 400 * scale;
        const h = viewport.height || 400 * scale;
        setOriginalSize({ w, h });

        const context = canvas.getContext("2d")!;

        const scaledViewport = page.getViewport({ scale });

        const renderContext = {
          canvasContext: context,
          viewport: scaledViewport,
        };

        await page.render(renderContext).promise;
      }
    };
    try {
      renderPages();
    } catch (error) {
      console.error("Error rendering pages", error);
    }
  }, [pdfDoc, path, splitted]);

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const deltaY = event.deltaY;
    const scaleIncrement = 0.1; // Value to control the zoom speed

    if (event.ctrlKey) {
      // Zoom in/out
      const currentScale = zoom;

      const newScale =
        deltaY > 0
          ? currentScale - scaleIncrement
          : currentScale + scaleIncrement;
      setZoom(newScale);
      getWidth();
    }
  };

  const toggleHandTool = (newTool: CanvasTools) => {
    if (newTool === tool) return setTool("none");
    setTool(newTool);
  };

  const getCursor = () => {
    if (tool === "pencil") return "cursor-pencil";
    else if (tool === "text") return "cursor-text";
    return "auto";
  };

  const getWidth = useCallback(() => {
    if (!divRef.current) return "100%";
    let width = divRef.current.clientWidth;
    width = width * zoom;
    setCanvasWidth(`${width}px`);
  }, [zoom]);

  useEffect(() => {
    const handleResize = () => {
      if (divRef.current) {
        getWidth();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [divRef, getWidth, zoom]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === "S") {
        event.preventDefault();
        handleSave();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSave]);

  return (
    <Flex
      ref={divRef}
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
        tool={tool}
        toggleHandTool={toggleHandTool}
        handleSave={handleSave}
        saving={saving}
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
        className={getCursor()}
      >
        {pdfDoc &&
          Array.from({ length: pdfDoc.numPages }, (_, i) => {
            return (
              <Box width={canvasWidth} key={i}>
                <Canvas
                  tool={tool}
                  pdfRef={(ref: HTMLCanvasElement) =>
                    (canvasRefs.current[i] = ref)
                  }
                />
              </Box>
            );
          })}
      </Flex>
    </Flex>
  );
};

export default Index;
