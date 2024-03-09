import { useEffect, useState } from "react";
import { CanvasElement } from "types/index";

export const useHistory = (initialState: CanvasElement[]) => {
  const [index, setIndex] = useState<number>(0);
  const [history, setHistory] = useState<CanvasElement[][]>([initialState]);

  const setState = (action: CanvasElement[] | ((prevState: CanvasElement[]) => CanvasElement[]), overwrite = false) => {
    const newState = typeof action === "function" ? action(history[index]) : action;
    if (overwrite) {
      const historyCopy = [...history];
      historyCopy[index] = newState;
      setHistory(historyCopy);
    } else {
      const updatedState = [...history].slice(0, index + 1);
      setHistory([...updatedState, newState]);
      setIndex(prevState => prevState + 1);
    }
  };

  const undo = () => index > 0 && setIndex(prevState => prevState - 1);
  const redo = () => index < history.length - 1 && setIndex(prevState => prevState + 1);

  return [history[index], setState, undo, redo] as const;
};

export const getSvgPathFromStroke = (stroke: [number, number][]) => {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
};

export const drawElement = (roughCanvas: any, context: CanvasRenderingContext2D, element: CanvasElement) => {
  let textWidth = 0;
  let x = 0;
  switch (element.type) {
    case "text":
      context.font = "24px sans-serif";
      textWidth = context.measureText(element.text || "").width;
      x = (element.x || 0) - textWidth - 20; // Adjust x position
      context.fillText(element.text || "", x, element.y || 0);
      break;
    default:
      throw new Error(`Type not recognised: ${element.type}`);
  }
};

export const usePressedKeys = () => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setPressedKeys(prevKeys => new Set(prevKeys).add(event.key));
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setPressedKeys(prevKeys => {
        const updatedKeys = new Set(prevKeys);
        updatedKeys.delete(event.key);
        return updatedKeys;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return pressedKeys;
};

export const getMouseCoordinates = (event: React.MouseEvent<HTMLCanvasElement>) => {
  const canvas = event.currentTarget;
  const rect = canvas.getBoundingClientRect();

  const originalCanvasWidth = canvas.width;
  const widthCanvas = canvas.clientWidth;
  const scale = originalCanvasWidth / widthCanvas;

  const clientX = event.clientX;
  const clientY = event.clientY;

  const x = (clientX - rect.left) * scale + 25;
  const y = (clientY - rect.top) * scale + 26;

  return { clientX, clientY, x, y };
};