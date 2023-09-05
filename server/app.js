/*
 * @Author: firecrackery
 * @Date: 2023-09-05
 */
const express = require("express")
const app = express()
const acatar = require("./router/avatar")
const port = 8899
const host = "localhost"
const serverURL = `${host}:${port}`
const imgFolder = "./tmp/"

// 在 Express 4.16 版本之前，你需要安装并使用 body-parser 模块来解析 JSON 和 URL 编码的数据。
// 但是，在 Express 4.16 及更高版本中，这些功能已经内置在 Express 中，因此你不再需要使用 body-parser 模块。
// 如果你在一些教程中看到使用了 body-parser 模块，请注意检查你所使用的 Express 版本，以确定是否需要安装并使用这个模块。
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 读取静态资源
app.use(express.static("./"))
// 引入multer中间件，用于处理上传的文件数据
const multer = require("multer")
// 通过配置multer的dest属性， 将文件储存在项目下的tmp文件中
app.use(multer({ dest: imgFolder }).any())

app.use(acatar)

app.listen(port, () => {
  console.log(`Server is running at http://${serverURL}`)
})
