const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  versions: {
    chrome: process.versions.chrome,
    electron: process.versions.electron,
    node: process.versions.node,
  },
  ping: ()=> ipcRenderer.invoke('ping'),
  setTitle: (title)=> ipcRenderer.send('set-title', title), // 渲染进程发送消息给主进程
  openFile: ()=> ipcRenderer.invoke('dialog:openFile'), // 双向通信
  onUpdateCounter: (callback)=> ipcRenderer.on('update-counter', (_event, value)=> callback(value)), // 接收主进程消息
  counterValue: (value)=> ipcRenderer.send('counter-value', value)
})

// 所有的 Node.js API接口 都可以在 preload 进程中被调用.
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }
  console.log(process)
  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
