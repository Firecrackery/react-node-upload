import React, { useState } from "react"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, message, Upload } from "antd"
import axios from "axios"
const api = "/api"
const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener("load", () => callback(reader.result))
  reader.readAsDataURL(img)
}
const beforeUpload = file => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!")
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!")
  }
  return false
}

const Home = () => {
  const [imageUrl, setImageUrl] = useState()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState()
  const handleChange = info => {
    let url = URL.createObjectURL(info.file)
    setFile(info.file)
    setImageUrl(url)
    if (info.file.status === "uploading") {
      setLoading(true)
      return
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, url => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }
  const handleUpload = () => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("c", 1)
    formData.append("d", 2)
    axios({
      url: "/api/upload",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <>
      <Upload
        name="file"
        data={{ a: 1, b: 2 }}
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
      <Button onClick={handleUpload} type="primary">
        点击上传
      </Button>
    </>
  )
}

export default Home
