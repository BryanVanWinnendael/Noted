const { ipcRenderer, contextBridge } = require("electron")

contextBridge.exposeInMainWorld("myApp", {
  invoke: ipcRenderer.invoke,
  send: ipcRenderer.send,
})

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    sendMessage(channel, ...args) {
      ipcRenderer.send(channel, ...args)
    },
    on(channel, func) {
      const subscription = (_event, ...args) => func(...args)
      ipcRenderer.on(channel, subscription)

      return () => {
        ipcRenderer.removeListener(channel, subscription)
      }
    },
    once(channel, func) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args))
    },
  },
})

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
