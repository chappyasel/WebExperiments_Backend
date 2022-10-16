import express = require('express')
const assets = express.Router()
import util = require('#util')
import AWS = require('aws-sdk')
import multer = require('multer')
import fs = require('fs')

import keys = require('@shared/auth/keys')
AWS.config.update(keys.AWS_CONFIG.remote)
const s3 = new AWS.S3()

const storage = multer.diskStorage({
  destination: 'resume/',
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storage })

assets.post(
  '/upload',
  upload.single('file'),
  util.wrap(async (req: any, res: any) => {
    // Multer middleware adds file(in case of single file) or
    // files(multiple files) object to the request object.
    // req.file is the file
    uploadFile(req.file.path, req.file.filename, res)
  })
)

assets.get(
  '/:file',
  util.wrap(async (req: any, res: any) => {
    let file = util.require.param(req, 'file')
    retrieveFile(file, res)
  })
)

function uploadFile(source: any, targetName: any, res: any) {
  console.log('Preparing to upload...')
  fs.readFile(source, (err, filedata) => {
    if (err) {
      console.log({ err: err })
      return
    }
    const put = {
      Bucket: 'web-experiments',
      Key: targetName,
      Body: filedata,
    }
    s3.putObject(put, (err, data) => {
      if (err) {
        console.log('Could nor upload the file. Error :', err)
        return res.send({ success: false })
      }
      console.log('Successfully uploaded the file')
      return res.send({ success: true })
    })
  })
}

function retrieveFile(filename: any, res: any) {
  const getParams = {
    Bucket: 'sample-bucket-name',
    Key: filename,
  }

  s3.getObject(getParams, (err, data) => {
    if (err) {
      return res.status(400).send({ success: false, err: err })
    } else {
      return res.send(data.Body)
    }
  })
}

export = assets
