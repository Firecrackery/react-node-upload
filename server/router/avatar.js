const express = require("express")
const router = express.Router()
const fs = require("fs")
const Path = require("path")
const port = 8899
const host = "localhost"
const serverURL = `${host}:${port}`
function getRealUrl(filename) {
  let str = Path.join(serverURL, filename)
  // window的路径分割符 Path.sep 为反双斜杠 \\  此处要改为 单斜杠 /
  let url = str.split(Path.sep).join("/")
  url = "http://" + url
  return url
}
router.post("/upload", (req, res) => {
  console.log(req.body, req.files)
  let allUrl = []
  // 可能有多张图片
  let arr = req.files
  for (let i = 0; i < arr.length; i++) {
    // 修改图片文件名
    let now = Date.now()
    let filename = arr[i].originalname
    if (arr[i].originalname.includes(".")) {
      let nameArr = arr[i].originalname.split(".")
      filename = `${nameArr[0]}_${now}.${nameArr[1]}`
    }
    filename = arr[i].destination + filename
    console.log("默认名1：", arr[i].path)
    console.log("改名：", filename)
    fs.renameSync(arr[i].path, filename)
    console.log("改名成功：", i)
    let url = getRealUrl(filename)
    allUrl.push({
      id: arr[i].fieldname,
      url,
    })
  }
  res.json({
    mes: "ok",
    code: "000000",
    data: "",
  })
})
module.exports = router
