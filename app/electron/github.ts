import { ipcMain } from "electron";
import simpleGit from "simple-git";

class Github {
  win: Electron.BrowserWindow | null;

  constructor(win: Electron.BrowserWindow) {
    this.win = win;
  }

  handle() {
    ipcMain.handle(
      "github:push",
      async (_event, params: { workspacePath: string }) => {
        const { workspacePath } = params;
        const git = simpleGit(workspacePath);
        try {
          await git.add(".");
          await git.commit("Noted push");
          await git.push("origin", "main");
          return true;
        } catch (error) {
          return false;
        }
      },
    );

    ipcMain.handle(
      "github:add-repo",
      async (_event, params: { workspacePath: string; link: string }) => {
        const { workspacePath, link } = params;
        const git = simpleGit(workspacePath);

        try {
          const isRepo = await git.checkIsRepo();
          if (!isRepo) {
            await git.init();
            await git.addRemote("origin", link);
            await git.branch(["-M", "main"]);
            return { success: true, message: "Remote repository added." };
          }

          await git.remote(["set-url", "origin", link]); // Update the existing remote URL
          await git.branch(["-M", "main"]);

          return { success: true, message: "Remote repository added." };
        } catch (error) {
          console.log(error);
          throw new Error("Failed to add existing repository");
        }
      },
    );
  }
}

export default Github;
