import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  adjustElementCoordinates,
  adjustmentRequired,
  drawElement,
  getMouseCoordinates,
  useHistory,
} from "./utils";
import { Box } from "@chakra-ui/react";
import { CanvasElement, CanvasTools } from "types/index";

interface CanvasProps {
  pdfRef: (ref: HTMLCanvasElement) => void;
  tool: CanvasTools;
}

const Canvas = ({ pdfRef, tool }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const copyCanvasRef = useRef<HTMLCanvasElement>(null);
  const [elements, setElements, undo, redo] = useHistory([]);
  const [action, setAction] = useState<string>("none");
  const [selectedElement, setSelectedElement] = useState<CanvasElement | null>(
    null,
  );
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const copyPdf = useCallback(() => {
    try {
      const canvas = canvasRef.current;
      const offScreenCanvas = copyCanvasRef.current;
      if (!canvas || !offScreenCanvas) return;
      offScreenCanvas.width = canvas.width | 400;
      offScreenCanvas.height = canvas.height | 400;
      const offScreenContext = offScreenCanvas.getContext("2d");
      if (!offScreenContext || !canvas.width || !canvas.height) return;
      offScreenContext.drawImage(canvas, 0, 0);
    } catch (error) {
      console.error("Error copying pdf", error);
    }
  }, []);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (action === "writing" || (action === "none" && tool === "none")) return;

    const { clientX, clientY, x, y } = getMouseCoordinates(event);
    const id = elements.length;
    let element: CanvasElement = {
      id,
      clientX: x,
      clientY: y,
      x: clientX,
      y: clientY,
      type: tool,
    };
    if (tool === "pencil")
      element = {
        id,
        clientX: x,
        clientY: y,
        x: clientX,
        y: clientY,
        type: tool,
      };
    if (tool === "text")
      element = { id, x, y, clientX, clientY, type: tool, text: "" };
    setElements((prevState: CanvasElement[]) => [...prevState, element]);
    setSelectedElement(element);
    setAction(tool === "text" ? "writing" : "drawing");
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (action === "drawing") {
      handleMouseMoveDrawing(event);
    } else if (action === "writing") {
      handleMouseMoveText();
    }
  };

  const handleMouseUp = () => {
    if (selectedElement) {
      if (selectedElement.type === "text") {
        setAction("writing");
        return;
      }

      const index = selectedElement.id;
      const { id, type } = elements[index];
      if (
        (action === "drawing" || action === "resizing") &&
        adjustmentRequired(type)
      ) {
        const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
        updateElement(id, x1, y1, x2, y2, type, "");
      }
    }

    if (action === "writing") return;

    setAction("none");
    setSelectedElement(null);
  };

  const handleMouseMoveDrawing = (
    event: React.MouseEvent<HTMLCanvasElement>,
  ) => {
    const { x: clientX, y: clientY } = getMouseCoordinates(event);

    const index = elements.length - 1;
    const { clientX: x, clientY: y } = elements[index];
    const offset = 10;
    updateElement(index, x, y, clientX, clientY + offset, tool, "");
  };

  const handleMouseMoveText = () => {
    if (!selectedElement) return;
  };

  const updateElement = (
    id: number,
    clientX: number,
    clientY: number,
    x: number,
    y: number,
    type: string,
    options: any,
  ) => {
    const elementsCopy = [...elements];
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (type === "text") {
      elementsCopy[id] = {
        id,
        clientX,
        clientY,
        x,
        y,
        type,
        text: options?.text,
      };
    } else if (type === "pencil") {
      const prevPoints = elementsCopy[id].points || [];
      elementsCopy[id].points = [...prevPoints, { x, y }];
    }
    setElements(elementsCopy, true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!selectedElement) return;
    const { id, clientX, clientY, x, y, type } = selectedElement;
    setAction("none");
    setSelectedElement(null);
    updateElement(id, clientX, clientY, x, y, type, {
      text: event.target.value,
    });
  };

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.save();
    const copyCanvas = copyCanvasRef.current;
    if (!copyCanvas) return;
    try {
      context.drawImage(copyCanvas, 0, 0);
      elements.forEach((element: CanvasElement) => {
        if (action === "writing" && selectedElement?.id === element.id) return;
        try {
          drawElement(context, element);
        } catch (error) {
          console.error("Error drawing element", error);
        }
      });
    } catch (error) {
      console.error("Error drawing canvas", error);
    }

    context.restore();
  }, [action, elements, selectedElement?.id]);

  useEffect(() => {
    if (canvasRef.current) {
      pdfRef(canvasRef.current);
      copyPdf();
    }
  }, [pdfRef, copyPdf]);

  useLayoutEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  useEffect(() => {
    const undoRedoFunction = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "z") {
        if (event.shiftKey) redo();
        else undo();
      }
    };

    document.addEventListener("keydown", undoRedoFunction);
    return () => {
      document.removeEventListener("keydown", undoRedoFunction);
    };
  }, [undo, redo]);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (action === "writing") {
      setTimeout(() => {
        textArea?.focus();
        if (textArea) textArea.value = selectedElement?.text ?? "";
      }, 0);
    }
  }, [action, selectedElement]);

  return (
    <Box w="100%" h="100%">
      {action === "writing" ? (
        <textarea
          ref={textAreaRef}
          onBlur={handleBlur}
          style={{
            position: "fixed",
            top: selectedElement ? selectedElement.clientY : 0,
            left: selectedElement ? selectedElement.clientX : 0,
            font: "24px sans-serif",
            margin: 0,
            padding: 0,
            border: 0,
            outline: 0,
            overflow: "hidden",
            whiteSpace: "pre",
            background: "transparent",
            zIndex: 2,
            color: "black",
          }}
        />
      ) : null}
      <canvas style={{ display: "none" }} ref={copyCanvasRef} />
      <canvas
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={canvasRef}
      />
    </Box>
  );
};

export default Canvas;
