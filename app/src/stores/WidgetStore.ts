import { create } from "zustand";
import { ToDo, WidgetName } from "types";
import dayjs, { Dayjs } from "dayjs";
import { CONNECTABLE_WIDGETS } from "utils/constants";

type WidgetStoreType = {
  widgetPanel: boolean;
  setWidgetPanel: (open: boolean) => void;
  selectedWidgets: WidgetName[];
  setSelectedWidgets: (widgets: WidgetName[]) => void;
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
  selectedDate: Dayjs | undefined;
  setSelectedDate: (date: Dayjs | undefined) => void;
  showDateViewer: boolean;
  setShowDateViewer: (show: boolean) => void;
  todos: ToDo[];
  setTodos: (todos: ToDo[]) => void;
  intervalId: NodeJS.Timer | undefined;
  setIntervalId: (id: NodeJS.Timer | undefined) => void;
  canConnect: () => boolean;
  getCompatibleWidget: (widget: WidgetName) => WidgetName | null;
  getTodos: () => void;
  getLayoutWidgets: () => void;
};

export const useWidgetStore = create<WidgetStoreType>((set, get) => ({
  widgetPanel: false,
  setWidgetPanel: (open) => set({ widgetPanel: open }),
  selectedWidgets: ["calendar", "todo"],
  setSelectedWidgets: (widgets) => {
    set({ selectedWidgets: widgets });
    localStorage.setItem("selectedWidgets", JSON.stringify(widgets));
  },
  isConnected: false,
  setIsConnected: (connected) => set({ isConnected: connected }),
  selectedDate: dayjs(),
  setSelectedDate: (date) => set({ selectedDate: date }),
  showDateViewer: false,
  setShowDateViewer: (show) => set({ showDateViewer: show }),
  todos: [],
  setTodos: (todos) => {
    set({ todos });
    localStorage.setItem("todos", JSON.stringify(todos));
  },
  intervalId: undefined,
  setIntervalId: (id) => set({ intervalId: id }),
  canConnect: () => {
    const { selectedWidgets } = get();
    for (let i = 0; i < CONNECTABLE_WIDGETS.length; i++) {
      const widgets = CONNECTABLE_WIDGETS[i];
      if (
        widgets.includes(selectedWidgets[0]) &&
        widgets.includes(selectedWidgets[1])
      ) {
        return true;
      }
    }
    return false;
  },
  getCompatibleWidget: (widget) => {
    const { selectedWidgets, canConnect } = get();
    if (!canConnect()) return null;
    return selectedWidgets[0] === widget
      ? selectedWidgets[1]
      : selectedWidgets[0];
  },
  getTodos: () => {
    const jsonList = localStorage.getItem("todos");
    if (!jsonList) return;
    const todos = JSON.parse(jsonList);
    set({ todos });
  },
  getLayoutWidgets: () => {
    const jsonList = localStorage.getItem("selectedWidgets");
    if (!jsonList) return;
    const widgets = JSON.parse(jsonList);
    set({ selectedWidgets: widgets });
  },
}));
