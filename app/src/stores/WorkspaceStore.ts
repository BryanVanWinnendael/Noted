import { create } from "zustand";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "lib/firebase";
import { GetUserNotes } from "lib/actions/notes/get";
import { CreatePublicNote } from "lib/actions/notes/create";
import { DeletePublicNote } from "lib/actions/notes/delete";
import { Login } from "lib/actions/auth/login";
import { OutputData } from "@editorjs/editorjs";
import { APP_VERSION } from "utils/constants";
import {
  WorkspaceType,
  Tab,
  Platforms,
  UserNote,
  NoteStyle,
  MyWindow,
} from "types";

declare let window: MyWindow;
const invoke = window.electron.invoke;

interface WorkspaceStore {
  workspace: WorkspaceType | undefined;
  workspaceState: "opening" | "opened" | "closed";
  tabs: Tab;
  activeTab: number;
  showSidebar: boolean;
  showOpenFileInTab: boolean;
  showOpenNewFile: boolean;
  activeFolder: string | undefined;
  showSwitcher: boolean;
  backgrounds: string[];
  newVersion: boolean;
  showConfetti: boolean;
  platform: Platforms;
  recentWorkspaces: string[];
  user: User | undefined;
  notes: UserNote[];
  showCmdPalette: boolean;

  // Methods
  setWorkspace: (workspace: WorkspaceType | undefined) => void;
  setTabs: (tabs: Tab) => void;
  setActiveTab: (tabIndex: number) => void;
  setShowSidebar: (show: boolean) => void;
  setShowOpenFileInTab: (show: boolean) => void;
  setShowOpenNewFile: (show: boolean) => void;
  setActiveFolder: (folder: string | undefined) => void;
  setShowSwitcher: (show: boolean) => void;
  setBackgrounds: (backgrounds: string[]) => void;
  setNewVersion: (newVersion: boolean) => void;
  setShowConfetti: (show: boolean) => void;
  setPlatform: (platform: Platforms) => void;
  setRecentWorkspaces: (workspaces: string[]) => void;
  setUser: (user: User | undefined) => void;
  setNotes: (notes: UserNote[]) => void;
  setShowCmdPalette: (show: boolean) => void;

  resetWorkspace: () => void;
  reconstructTabs: (tabs: Tab) => Tab;
  getFile: (filePath: string) => Promise<any>;
  readFile: (filePath: string) => Promise<any>;
  addRecentOpenedWorkspace: (workspacePath: string) => void;
  openWorkspace: () => Promise<void>;
  closeWorkspace: () => void;
  openFileInNewTab: (filePath: string) => Promise<void>;
  handleChangeTab: (index: number) => void;
  addTab: () => void;
  removeTab: (index: number) => Promise<void>;
  openFile: (filePath: string) => Promise<void>;
  saveFile: (data: any, path: string) => Promise<void>;
  savePdfFile: (data: any, path: string) => Promise<void>;
  importBackground: () => Promise<void>;
  getImportedBackground: () => Promise<void>;
  deleteImportedBackground: (backgroundPath: string) => Promise<void>;
  refreshWorkspace: () => Promise<void>;
  makeNewFile: (fileName: string, folderPath: string) => Promise<boolean>;
  makeNewFolder: (folderName: string, folderPath: string) => Promise<boolean>;
  resetActiveTab: () => void;
  deleteFile: (filePath: string) => Promise<boolean>;
  deleteFolder: (folderPath: string) => Promise<boolean>;
  rename: (oldPath: string, newPath: string, type: string) => Promise<boolean>;
  split: (filePath: string) => Promise<void>;
  checkVersion: () => void;
  openWorkspaceFile: () => Promise<void>;
  getUserNotes: () => Promise<boolean>;
  deletePublicNote: (id: string) => Promise<boolean>;
  createPublicNote: (
    data: OutputData,
    path: string,
    style: NoteStyle,
  ) => Promise<boolean>;
  handleSignOutUser: () => void;
  initUser: () => void;
  initPlatform: () => Promise<void>;
  initWorkspaceFolders: () => Promise<void>;
  initWorkspace: () => void;
  resetWorkspaceSettings: () => Promise<void>;
  openRecentWorkspace: (workspacePath: string) => void;
}

// Zustand store implementation
export const useWorkspaceStore = create<WorkspaceStore>((set, get) => ({
  // State
  workspace: undefined,
  workspaceState: "opening",
  tabs: {} as Tab,
  activeTab: 0,
  showSidebar: true,
  showOpenFileInTab: false,
  showOpenNewFile: false,
  activeFolder: undefined,
  showSwitcher: false,
  backgrounds: [],
  newVersion: false,
  showConfetti: false,
  platform: "win32",
  recentWorkspaces: [],
  user: undefined,
  notes: [],
  showCmdPalette: false,

  // Setters
  setWorkspace: (workspace: WorkspaceType | undefined) => set({ workspace }),
  setTabs: (tabs: Tab) => set({ tabs }),
  setActiveTab: (tabIndex: number) => set({ activeTab: tabIndex }),
  setShowSidebar: (show: boolean) => set({ showSidebar: show }),
  setShowOpenFileInTab: (show: boolean) => set({ showOpenFileInTab: show }),
  setShowOpenNewFile: (show: boolean) => set({ showOpenNewFile: show }),
  setActiveFolder: (folder: string | undefined) =>
    set({ activeFolder: folder }),
  setShowSwitcher: (show: boolean) => set({ showSwitcher: show }),
  setBackgrounds: (backgrounds: string[]) => set({ backgrounds }),
  setNewVersion: (newVersion: boolean) => set({ newVersion }),
  setShowConfetti: (show: boolean) => set({ showConfetti: show }),
  setPlatform: (platform: Platforms) => set({ platform }),
  setRecentWorkspaces: (workspaces: string[]) =>
    set({ recentWorkspaces: workspaces }),
  setUser: (user: User | undefined) => set({ user }),
  setNotes: (notes: UserNote[]) => set({ notes }),
  setShowCmdPalette: (show: boolean) => set({ showCmdPalette: show }),

  // Methods
  resetWorkspace: () => {
    set({
      workspace: undefined,
      tabs: {} as Tab,
      activeTab: 0,
      showSidebar: true,
      showOpenNewFile: false,
      showOpenFileInTab: false,
      activeFolder: undefined,
      showSwitcher: false,
      workspaceState: "closed",
    });
    localStorage.setItem("active_file", "");
    localStorage.setItem("splitted_active_file", "");
    localStorage.setItem("active_tab", "0");
    localStorage.setItem("open_files", JSON.stringify([]));
  },
  reconstructTabs: (tabs: Tab) => {
    const newTabs: Tab = {};
    Object.keys(tabs).forEach((key: any, index) => {
      newTabs[index] = tabs[key];
    });
    return newTabs;
  },
  getFile: async (filePath) => {
    try {
      const openedFile = await invoke("file:open", {
        file_path: filePath,
      });
      const json_content = openedFile["fileContent"];
      let content = "";
      if (json_content) {
        content = JSON.parse(json_content);
      }

      return content;
    } catch (err) {
      return undefined;
    }
  },
  readFile: async (filePath) => {
    const { getFile } = get();
    const extension = filePath.split(".").pop();
    if (extension === "noted" || extension === "excalidraw") {
      return getFile(filePath);
    }
    return undefined;
  },
  addRecentOpenedWorkspace: (workspacePath) => {
    const recentWorkspaces = JSON.parse(
      localStorage.getItem("recent_workspaces") || "[]",
    );
    if (!recentWorkspaces.includes(workspacePath)) {
      if (recentWorkspaces.length >= 5) {
        recentWorkspaces.pop();
      }
      recentWorkspaces.unshift(workspacePath);
      localStorage.setItem(
        "recent_workspaces",
        JSON.stringify(recentWorkspaces),
      );
      set({ recentWorkspaces });
    } else {
      return set({ recentWorkspaces });
    }
  },
  openWorkspace: async () => {
    try {
      const openedWorkspace: WorkspaceType = await invoke("folder:open-dialog");
      if (!openedWorkspace) return;

      localStorage.setItem("workspace_path", openedWorkspace.path);

      get().resetWorkspace();
      set({ workspace: openedWorkspace, workspaceState: "opened" });
      get().addRecentOpenedWorkspace(openedWorkspace.path);
    } catch (err) {
      console.log(err);
    }
  },
  closeWorkspace: () => {
    localStorage.removeItem("workspace_path");
    get().resetWorkspace();
    localStorage.clear();
  },
  openFileInNewTab: async (filePath) => {
    const { tabs } = get();
    const newTabs = { ...tabs };
    const newTabId = Object.keys(tabs).length;
    newTabs[newTabId] = { path: filePath };
    set({ tabs: newTabs, activeTab: newTabId });
  },
  handleChangeTab: (index) => {
    const { tabs, setActiveTab } = get();
    const path = tabs[index].path;
    localStorage.setItem("active_file", path);
    setActiveTab(index);
  },
  addTab: () => {
    const { tabs } = get();
    const newTabs = { ...tabs };
    const newTabId = Object.keys(tabs).length;
    newTabs[newTabId] = { path: "New Tab" };
    set({ tabs: newTabs, activeTab: newTabId });
  },
  removeTab: async (index) => {
    const { tabs, reconstructTabs } = get();

    const newTabs = { ...tabs };
    delete newTabs[index];

    const reconstructed_tabs = reconstructTabs(newTabs);
    const newActiveTab =
      index === 0 ? 0 : Object.keys(reconstructed_tabs).length - 1;

    set({ tabs: reconstructed_tabs, activeTab: newActiveTab });
    const path = reconstructed_tabs[newActiveTab].path;
    localStorage.setItem("active_file", path);
  },
  openFile: async (filePath) => {
    localStorage.setItem("active_file", filePath);
    const { tabs, activeTab } = get();
    const newTabs = { ...tabs };
    const active_tab_index = activeTab | 0;
    newTabs[active_tab_index] = {
      path: filePath,
    };
    set({ tabs: newTabs });
  },
  saveFile: async (data, path) => {
    try {
      await invoke("file:save", {
        file_path: path,
        file_content: JSON.stringify(data),
      });
    } catch (err) {
      console.log(err);
    }
  },
  savePdfFile: async (data, path) => {
    try {
      await invoke("file:save-pdf", {
        file_path: path,
        file_content: data,
      });
    } catch (err) {
      console.log(err);
    }
  },
  refreshWorkspace: async () => {
    try {
      const workspacePath = localStorage.getItem("workspace_path");
      const openedWorkspace: WorkspaceType = await invoke("folder:open", {
        folder_path: workspacePath,
      });
      set({ workspace: openedWorkspace });
    } catch (err) {
      console.log(err);
    }
  },
  importBackground: async () => {
    const workspacePath = localStorage.getItem("workspace_path");
    if (!workspacePath) return;
    const newBackgroundPath = await invoke("file:import-background", {
      workspace_path: workspacePath,
    });

    if (newBackgroundPath) {
      const backgrounds = [...get().backgrounds, newBackgroundPath];
      set({ backgrounds });
    }
  },
  getImportedBackground: async () => {
    const workspacePath = localStorage.getItem("workspace_path");
    if (!workspacePath) return;
    const backgroundPaths = await invoke("file:get-imported-background", {
      workspace_path: workspacePath,
    });

    if (backgroundPaths) {
      set({ backgrounds: backgroundPaths });
    }
  },
  deleteImportedBackground: async (backgroundPath) => {
    const workspacePath = localStorage.getItem("workspace_path");
    if (!workspacePath) return;
    await invoke("file:delete-imported-background", {
      workspace_path: workspacePath,
      background_path: backgroundPath,
    });
    const { backgrounds } = get();

    const newBackgrounds = backgrounds.filter(
      (background) => background !== backgroundPath,
    );
    set({ backgrounds: newBackgrounds });
  },
  makeNewFile: async (fileName, folderPath) => {
    try {
      let new_folder_path = "";
      const workspacePath = localStorage.getItem("workspace_path");

      const { platform, openFile, refreshWorkspace } = get();

      if (!folderPath) new_folder_path = workspacePath || "";
      else new_folder_path = folderPath;

      await invoke("file:new", {
        folder: new_folder_path,
        file_name: fileName,
      });

      refreshWorkspace();
      if (platform === "win32") {
        openFile(`${new_folder_path}\\${fileName}`);
      } else {
        openFile(`${new_folder_path}/${fileName}`);
      }

      return true;
    } catch (err) {
      return false;
    }
  },
  makeNewFolder: async (folderName, folderPath) => {
    try {
      let new_folder_path = "";
      const workspacePath = localStorage.getItem("workspace_path");

      if (!folderPath) new_folder_path = workspacePath || "";
      else new_folder_path = folderPath;

      const { refreshWorkspace, setActiveFolder } = get();

      await invoke("folder:new", {
        folder: new_folder_path,
        folder_name: folderName,
      });

      refreshWorkspace();
      setActiveFolder(`${new_folder_path}\\${folderName}`);
      return true;
    } catch (err) {
      return false;
    }
  },
  resetActiveTab: () => {
    const { tabs, activeTab } = get();

    const active_tab = tabs[activeTab];
    active_tab["path"] = "New Tab";
    const newTabs = { ...tabs };
    newTabs[activeTab] = active_tab;
    set({ tabs: newTabs });
  },
  deleteFile: async (filePath) => {
    try {
      const { refreshWorkspace, resetActiveTab } = get();
      await invoke("file:delete", {
        file_path: filePath,
      });
      refreshWorkspace();
      const activeFile = localStorage.getItem("active_file");
      if (activeFile === filePath) {
        localStorage.setItem("active_file", "");
        resetActiveTab();
      }
      return true;
    } catch (err) {
      return false;
    }
  },
  deleteFolder: async (folderPath) => {
    try {
      const { refreshWorkspace, resetActiveTab, activeFolder } = get();
      await invoke("folder:delete", {
        folder_path: folderPath,
      });
      refreshWorkspace();
      if (activeFolder === folderPath) set({ activeFolder: undefined });
      const active_file = localStorage.getItem("active_file");
      if (active_file?.includes(folderPath)) {
        localStorage.setItem("active_file", "");
        resetActiveTab();
      }

      return true;
    } catch (err) {
      return false;
    }
  },
  rename: async (oldPath, newPath, type) => {
    const { refreshWorkspace, openFile, setActiveFolder, activeFolder } = get();
    if (type === "file") {
      try {
        await invoke("file:rename", {
          old_path: oldPath,
          new_path: newPath,
        });
        refreshWorkspace();
        const activeFile = localStorage.getItem("active_file");
        if (activeFile === oldPath) {
          openFile(newPath);
        }
        return true;
      } catch (err) {
        return false;
      }
    } else {
      try {
        await invoke("folder:rename", {
          old_path: oldPath,
          new_path: newPath,
        });
        refreshWorkspace();
        if (activeFolder === oldPath) {
          setActiveFolder(newPath);
        }

        return true;
      } catch (err) {
        return false;
      }
    }
  },
  split: async (filePath) => {
    try {
      localStorage.setItem("splitted_active_file", filePath);
      const { tabs, activeTab } = get();

      const newTabs = { ...tabs };
      const tab = newTabs[activeTab];

      tab.splittedPath = filePath;
      newTabs[activeTab] = tab;
      set({ tabs: newTabs });
    } catch (error) {
      console.log(error);
    }
  },
  checkVersion: () => {
    const version = localStorage.getItem("version");
    if (!version) {
      localStorage.setItem("version", APP_VERSION);
    } else {
      if (version !== APP_VERSION) {
        set({ newVersion: true });
      }
    }
  },
  openWorkspaceFile: async () => {
    // Used to open home file of the workspace
    const workspacePath = localStorage.getItem("workspace_path");
    const openedFile = await invoke("file:open-workspace-file", {
      workspace_path: workspacePath,
    });

    const { openFile } = get();
    openFile(openedFile["filePath"]);
  },
  getUserNotes: async () => {
    const notes = await GetUserNotes();
    if (!notes) return false;

    const tempNotes: UserNote[] = [];
    for (const note of notes) {
      note.data = JSON.parse(note.data);
      tempNotes.push(note);
    }

    set({ notes: tempNotes });
    return true;
  },
  deletePublicNote: async (id) => {
    const res = await DeletePublicNote(id);
    if (!res) return false;

    const { notes } = get();
    const newNotes = notes.filter((note) => note.id !== id);
    set({ notes: newNotes });

    return true;
  },
  createPublicNote: async (data, path, style) => {
    const { id } = await CreatePublicNote(data, path, style);
    if (!id) return false;

    const { user, notes } = get();
    const tempNote: UserNote = {
      data: JSON.stringify(data),
      path,
      user_email: user?.email || "",
      id,
      style,
    };
    set({ notes: [...notes, tempNote] });

    return true;
  },
  handleSignOutUser: () => {
    const { setUser } = get();
    signOut(auth);
    setUser(undefined);
  },
  initUser: () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        const res = await Login(idToken);
        if (!res) return;

        set({ user });

        const sessToken = res.session;
        if (sessToken) localStorage.setItem("token", sessToken);

        const { getUserNotes } = get();
        getUserNotes();
      }
    });
  },
  initPlatform: async () => {
    const platform = await invoke("platform:get");
    set({ platform });
  },
  initWorkspaceFolders: async () => {
    // Used for the sidebar
    try {
      const workspacePath = localStorage.getItem("workspace_path");

      if (!workspacePath) return;
      const openedWorkspace: WorkspaceType = await invoke("folder:open", {
        folder_path: workspacePath,
      });
      set({ workspace: openedWorkspace });
    } catch (err) {
      console.log(err);
    }
  },
  initWorkspace: () => {
    const { initWorkspaceFolders, checkVersion, initPlatform, initUser } =
      get();

    localStorage.setItem("open_files", JSON.stringify([])); // Used for the file switcher
    initWorkspaceFolders();
    checkVersion();
    initPlatform();
    initUser();
    set({ workspaceState: "opened" });
  },
  resetWorkspaceSettings: async () => {
    const workspacePath = localStorage.getItem("workspace_path");

    await invoke("workspace:reset", {
      workspace_path: workspacePath,
    });

    set({ workspaceState: "opening" });
  },
  openRecentWorkspace: (workspacePath) => {
    localStorage.setItem("workspace_path", workspacePath);
    set({ workspaceState: "opening" });
  },
}));
