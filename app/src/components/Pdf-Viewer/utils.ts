import { useEffect, useState } from "react"
import { CanvasElement } from "types/index"
import getStroke from "perfect-freehand"

export const useHistory = (initialState: CanvasElement[]) => {
  const [index, setIndex] = useState<number>(0)
  const [history, setHistory] = useState<CanvasElement[][]>([initialState])

  const setState = (
    action: CanvasElement[] | ((prevState: CanvasElement[]) => CanvasElement[]),
    overwrite = false,
  ) => {
    const newState =
      typeof action === "function" ? action(history[index]) : action
    if (overwrite) {
      const historyCopy = [...history]
      historyCopy[index] = newState
      setHistory(historyCopy)
    } else {
      const updatedState = [...history].slice(0, index + 1)
      setHistory([...updatedState, newState])
      setIndex((prevState) => prevState + 1)
    }
  }

  const undo = () => index > 0 && setIndex((prevState) => prevState - 1)
  const redo = () =>
    index < history.length - 1 && setIndex((prevState) => prevState + 1)

  return [history[index], setState, undo, redo] as const
}

export const getSvgPathFromStroke = (stroke: [number, number][]) => {
  if (!stroke.length) return ""

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length]
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
      return acc
    },
    ["M", ...stroke[0], "Q"],
  )

  d.push("Z")
  return d.join(" ")
}

export const drawElement = (
  context: CanvasRenderingContext2D,
  element: CanvasElement,
) => {
  let x = 0
  let y = 0
  let stroke = ""
  let points = []

  switch (element.type) {
    case "pencil":
      if (!element.points) return
      points = element.points || []
      stroke = getSvgPathFromStroke(
        getStroke(points, {
          size: 5,
          thinning: 0.7,
        }) as [number, number][],
      )
      context.fill(new Path2D(stroke))
      break
    case "text":
      context.font = "24px sans-serif"
      x = element.x || 0 // Adjust x position
      y = element.y + 20 || 0
      context.fillText(element.text || "", x, y)
      break
    default:
      return
  }
}

export const usePressedKeys = () => {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setPressedKeys((prevKeys) => new Set(prevKeys).add(event.key))
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      setPressedKeys((prevKeys) => {
        const updatedKeys = new Set(prevKeys)
        updatedKeys.delete(event.key)
        return updatedKeys
      })
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  return pressedKeys
}

export const getMouseCoordinates = (
  event: React.MouseEvent<HTMLCanvasElement>,
) => {
  // returns
  // clientX and clientY: coordinates of the viewport
  // x and y: coordinates of the canvas
  const canvas = event.currentTarget
  const rect = canvas.getBoundingClientRect()

  const originalCanvasWidth = canvas.width
  const widthCanvas = canvas.clientWidth
  const scale = originalCanvasWidth / widthCanvas

  const clientX = event.clientX
  const clientY = event.clientY

  const x = (clientX - rect.left) * scale
  const y = (clientY - rect.top) * scale

  return { clientX, clientY, x, y }
}

export const adjustmentRequired = (type: string) =>
  ["line", "rectangle"].includes(type)

export const adjustElementCoordinates = (element: CanvasElement) => {
  const { type, x, y, clientX, clientY } = element
  const x1 = clientX
  const y1 = clientY
  const x2 = x
  const y2 = y
  if (type === "rectangle") {
    const minX = Math.min(x1, x2)
    const maxX = Math.max(x1, x2)
    const minY = Math.min(y1, y2)
    const maxY = Math.max(y1, y2)
    return { x1: minX, y1: minY, x2: maxX, y2: maxY }
  } else {
    if (x1 < x2 || (x1 === x2 && y1 < y2)) {
      return { x1, y1, x2, y2 }
    } else {
      return { x1: x2, y1: y2, x2: x1, y2: y1 }
    }
  }
}
