const infoDom = document.querySelector('#info')
infoDom.innerText = `本应用正在使用 Chrome (v${versions.chrome}), Node.js (v${versions.node}), 和 Electron (v${versions.electron})`

const pingFunc = async ()=> {
  const res = await versions.ping()
  infoDom.innerText += ' 接收到主应用消息：' + res.data
}
pingFunc()
