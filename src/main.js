const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('node:path')
const createWindow = ()=> {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  // 主进程接收渲染进程消息
  ipcMain.on('set-title', (ev, title)=> {
    const webContents = ev.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  })
  mainWindow.loadFile(path.join(__dirname, 'index.html'))

  // 打开开发者工具
  // mainWindow.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(()=> {
  ipcMain.handle('ping', ()=> ({code: '0', data: 'pong', msg: 'success'}))
  ipcMain.handle('dialog:openFile', async ()=> {
    const {canceled, filePaths} = await dialog.showOpenDialog()
    if (!canceled) {
      return filePaths[0]
    }
  })
  createWindow()

  app.on('activate', ()=> {
    // 在 macOS 系统内, 如果没有已开启的应用窗口
    // 点击托盘图标时通常会重新创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', ()=> {
  if (process.platform !== 'darwin') app.quit()
})
