const {versions, ping, setTitle, openFile} = electronAPI
const infoDom = document.querySelector('#info')
infoDom.innerText = `本应用正在使用 Chrome (v${versions.chrome}), Node.js (v${versions.node}), 和 Electron (v${versions.electron})`

const pingFunc = async ()=> {
  const res = await ping()
  infoDom.innerText += ' 接收到主应用消息：' + res.data
}
pingFunc()

const setBtn = document.querySelector('#set-btn')
const titleInput = document.querySelector('#title-txt')
setBtn.addEventListener('click', ()=> {
  const title = titleInput.value.trim()
  if (title) setTitle(title)
})

const openBtn = document.querySelector('#open-btn')
const filePathEle = document.querySelector('#filePath')
openBtn.addEventListener('click', async ()=> {
  const filePath = await openFile()
  filePathEle.innerText = filePath
})
