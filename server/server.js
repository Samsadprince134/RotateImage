const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const {Jimp} = require("jimp");

const app = express();
const cors = require("cors");

// Enable CORS for all origins or specify the frontend origin
app.use(
  cors({
    origin: "*", // Replace with your frontend URL
  })
);

const upload = multer({ dest: "uploads/" });

app.use(express.static(path.join(__dirname, "public")));

app.post("/api/upload", upload.single("image"), async (req, res) => {
  const filePath = req.file ? req.file.path : null;

  try {
    if (!filePath) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // Initialize Jimp and Sharp with the image file
    const image2 = await Jimp.read(filePath);
    const image = sharp(filePath);

    const { width, height } = image2;
    console.log("Image dimensions:", width, height);

    // Get metadata of the image (to check dimensions)
    const metadata = await image.metadata();

    // Determine if the image is a vertical rectangle
    const isVerticalRectangle = width > height;
    console.log("Metadata dimensions:", metadata.height, metadata.width);

    let processedImage;

    if (isVerticalRectangle) {
      // Rotate the image by 90 degrees if it's a vertical rectangle
      console.log("Rotating image");
      processedImage = await image.rotate(90).toBuffer();
    } else {
      // Otherwise, just get the image buffer without rotation
      console.log("No rotation needed");
      processedImage = await image.toBuffer();
    }

    // Send the processed image
    res.set("Content-Type", "image/jpeg");
    res.send(processedImage);

  } catch (error) {
    console.error("Error processing image:", error.message);
    res.status(500).json({ message: "Error processing the image." });
  } finally {
    // Clean up the original file after processing
    if (filePath) {
      setTimeout(async () => {
        try {
          await unlinkAsync(filePath);
        } catch (err) {
          console.error("Error removing file:", err);
        }
      }, 1000); // Increased delay to ensure all operations are complete
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
