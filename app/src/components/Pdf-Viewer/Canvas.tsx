import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { drawElement, getMouseCoordinates, useHistory } from "./utils";
import rough from "roughjs/bundled/rough.esm";
import { Box } from "@chakra-ui/react";
import { CanvasElement } from "types/index";

interface CanvasProps {
  pdfRef: (ref: HTMLCanvasElement) => void;
  tool: string;
}

const Canvas = ({ pdfRef, tool }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const copyCanvasRef = useRef<HTMLCanvasElement>(null);
  const [elements, setElements, undo, redo] = useHistory([]);
  const [action, setAction] = useState<string>("none");
  const [selectedElement, setSelectedElement] = useState<CanvasElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [lastX, setLastX] = useState<number | null>(null);
  const [lastY, setLastY] = useState<number | null>(null);

  const copyPdf = useCallback(() => {
    const canvas = canvasRef.current;
    const offScreenCanvas = copyCanvasRef.current;
    if (!canvas || !offScreenCanvas) return;
    offScreenCanvas.width = canvas.width;
    offScreenCanvas.height = canvas.height;
    const offScreenContext = offScreenCanvas.getContext("2d");
    if (!offScreenContext) return;
    offScreenContext.drawImage(canvas, 0, 0);
  },[])

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool === "drawing") return handleDrawing(event);
    if (action === "writing") return;
    if (tool === "text") return handleText(event);
   
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    switch (tool) {
      case "text":
        return handleMouseMoveText();
      case "drawing":
        return handleMouseMoveDrawing(event);
      default:
        return;
    }
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setLastX(null);
    setLastY(null);
    const { clientX, clientY } = getMouseCoordinates(event);
    if (selectedElement) {
      if (
        selectedElement.type === "text" &&
        clientX === selectedElement.clientX &&
        clientY === selectedElement.clientY
      ) {
        setAction("writing");
        return;
      }
    }

    if (action === "writing") return;

    setAction("none");
    setSelectedElement(null);
  };

  const handleText = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { clientX, clientY, x, y } = getMouseCoordinates(event);
    const id = elements.length;
    const element: CanvasElement = { id, clientX, clientY, x, y, type: tool };
    setElements((prevState: CanvasElement[]) => [...prevState, element]);
    setSelectedElement(element);
    setAction(tool === "text" ? "writing" : "drawing");
  }

  const handleDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const x = (offsetX / canvas.clientWidth) * canvas.width;
    const y = (offsetY / canvas.clientHeight) * canvas.height;

    setLastX(x);
    setLastY(y);

    const context = canvas.getContext("2d")!;
    context.beginPath();
    context.moveTo(x, y);
  };

  const handleMouseMoveDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!tool || lastX === null || lastY === null) return;

    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    const x = (offsetX / canvas.clientWidth) * canvas.width;
    const y = (offsetY / canvas.clientHeight) * canvas.height;

    const context = canvas.getContext("2d")!;
    context.lineTo(x, y);
    context.stroke();

    setLastX(x);
    setLastY(y);
  };

  const handleMouseMoveText = () => {
    if (!selectedElement) return;
  };

  const updateElement = (id: number, clientX: number, clientY: number, x: number, y: number, type: string, options: any) => {
    const elementsCopy = [...elements];
    const canvas = canvasRef.current;
    if (!canvas) return;

    elementsCopy[id] = {
      id,
      clientX,
      clientY,
      x,
      y,
      type,
      text: options?.text,
    };
    setElements(elementsCopy, true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!selectedElement) return;
    const { id, clientX, clientY, x, y, type } = selectedElement;
    setAction("none");
    setSelectedElement(null);
    updateElement(id, clientX, clientY, x, y, type, { text: event.target.value });
  };

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const roughCanvas = rough.canvas(canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.save();
    const copyCanvas = copyCanvasRef.current;
    if (!copyCanvas) return;

    context.drawImage(copyCanvas, 0, 0);
    elements.forEach((element: CanvasElement) => {
      if (action === "writing" && selectedElement?.id === element.id) return;
      try {
        drawElement(roughCanvas, context, element);
      } catch (error) {
        console.error("Error drawing element", error);
      }
     
    });
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
        if (textArea) textArea.value = selectedElement?.text ?? '';
      }, 0);
    }
  }, [action, selectedElement]);

  return (
    <Box
      w="100%"
      h="100%"
    >
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
