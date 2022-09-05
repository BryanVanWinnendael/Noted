const { ipcRenderer, contextBridge } = require("electron")

contextBridge.exposeInMainWorld('myApp', { 
  getIpcRenderer:() => {return ipcRenderer},
}) 
  
window.addEventListener('DOMContentLoaded', () => {
    
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
})


