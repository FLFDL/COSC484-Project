const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const requireAuth = require('../middleware/requireAuth')

const fs = require('fs')
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

// store uploads in /uploads with a unique filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    // userId-timestamp.extension, e.g. 65a4f-1717000000000.jpg
    // makes filenames unique and traceable
    const ext = path.extname(file.originalname)
    const safeName = `${req.session.userId}-${Date.now()}${ext}`
    cb(null, safeName)
  }
})

// only accept image files
// removed gif since we only have free tier of cloudinary atm
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp']
  if (allowed.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('only jpg, png, and webp images are allowed'), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5mb max
})

// POST /api/upload — accepts a single image, returns the URL to use in a post
// react form should send FormData with field name "image"
router.post('/', requireAuth,   upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'no file uploaded' })
    }

    // upload to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path,
      {
        folder: 
        `users/${req.session.userId}/posts`,
        overwrite: true,
        resource_type: 'image'
      }
    )

    // delete temp file
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('failed to delete temp file: ', err)
      }
    })

    // return cloudinary url
    res.json({
      message: 'upload successful',
      imageUrl: result.secure_url,
      publicId: result.public_id
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({error: 'upload failed'})
    
  }

})

// multer error handler — friendly messages instead of stack traces
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'image must be under 5mb' })
    }
    return res.status(400).json({ error: err.message })
  }
  if (err) {
    return res.status(400).json({ error: err.message })
  }
  next()
})

module.exports = router
