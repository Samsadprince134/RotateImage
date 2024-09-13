const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const { Jimp } = require("jimp");
const cors = require("cors");

const app = express();

// Enable CORS for all origins or specify the frontend origin
app.use(cors({
  origin: 'https://rotate-image-py63.vercel.app', // Your Vercel frontend
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));

// Use multer's memory storage to store images in memory as buffers
const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/upload", upload.single("image"), async (req, res) => {
  const fileBuffer = req.file ? req.file.buffer : null;

  try {
    if (!fileBuffer) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Initialize Jimp with the image buffer
    const image2 = await Jimp.read(fileBuffer);
    const image = sharp(fileBuffer);

    const { width, height } = image2.bitmap; // Get dimensions from Jimp
    console.log("Image dimensions:", width, height);

    // Get metadata of the image (to check dimensions)
    const metadata = await image.metadata();

    // Determine if the image is a vertical rectangle
    const isVerticalRectangle = width > height;
    console.log("Metadata dimensions:", metadata.height, metadata.width);

    let processedImage;

    if (1) {
      // Rotate the image by 90 degrees if it's a vertical rectangle
      console.log("Rotating image");
      processedImage = await image.rotate(90).toBuffer();
    } else {
      // Otherwise, just get the image buffer without rotation
      console.log("No rotation needed");
      processedImage = await image.toBuffer();
    }

    // Send the processed image back to the client
    res.set("Content-Type", "image/jpeg");
    res.send(processedImage);

  } catch (error) {
    console.error("Error processing image:", error.message);
    res.status(500).json({ message: "Error processing the image." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
