import { ToDo, WidgetName, WidgetTypeContext } from "types"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import dayjs, { Dayjs } from "dayjs"
import { CONNECTABLE_WIDGETS } from "utils/constants"

const WidgetContext = createContext<WidgetTypeContext>({} as WidgetTypeContext)

export function useWidget() {
  return useContext(WidgetContext)
}

type Props = {
  children: React.ReactNode
}

export const WidgetProvider: React.FC<Props> = ({ children }: Props) => {
  const [widgetPanel, setWidgetPanel] = useState<boolean>(false)
  const [selectedWidgets, setSelectedWidgets] = useState<WidgetName[]>([
    "calendar",
    "todo",
  ])
  const [isConnected, setIsConnected] = useState<boolean>(false)

  const [selectedDate, setSelectedDate] = useState<Dayjs | undefined>(dayjs())
  const [showDateViewer, setShowDateViewer] = useState(false)

  const [todos, setTodos] = useState<ToDo[]>([])

  const [intervalId, setIntervalId] = useState<NodeJS.Timer>()

  const canConnect = () => {
    for (let i = 0; i < CONNECTABLE_WIDGETS.length; i++) {
      const widgets = CONNECTABLE_WIDGETS[i]
      if (
        widgets.includes(selectedWidgets[0]) &&
        widgets.includes(selectedWidgets[1])
      )
        return true
    }
    return false
  }

  const getCompatibleWidget = (widget: WidgetName) => {
    if (!canConnect()) return null
    return selectedWidgets[0] === widget
      ? selectedWidgets[1]
      : selectedWidgets[0]
  }

  const getTodos = () => {
    const jsonList = localStorage.getItem("todos")
    if (!jsonList) return
    const todos = JSON.parse(jsonList)
    setTodos(todos)
  }

  const getLayoutWidgets = () => {
    const jsonList = localStorage.getItem("selectedWidgets")
    if (!jsonList) return
    const widgets = JSON.parse(jsonList)
    setSelectedWidgets(widgets)
  }

  const handleChangeWidgets = useCallback(() => {
    localStorage.setItem("selectedWidgets", JSON.stringify(selectedWidgets))
  }, [selectedWidgets])

  useEffect(() => {
    getTodos()
    getLayoutWidgets()
  }, [])

  useEffect(() => {
    handleChangeWidgets()
  }, [handleChangeWidgets])

  const value: WidgetTypeContext = {
    widgetPanel,
    setWidgetPanel,
    selectedWidgets,
    setSelectedWidgets,
    setIsConnected,
    isConnected,
    canConnect,
    setSelectedDate,
    selectedDate,
    getCompatibleWidget,
    setShowDateViewer,
    showDateViewer,
    setTodos,
    todos,
    setIntervalId,
    intervalId,
  }

  return (
    <WidgetContext.Provider value={value}>{children}</WidgetContext.Provider>
  )
}
