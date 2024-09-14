<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
</head>
<body>

<header>
    <div class="container">
        <h1>Image Rotation Web Application </h1>
        <h1>https://rotate-image-py63.vercel.app/</h1
    </div>
</header>

<div class="container">
    <h2>Table of Contents</h2>
    <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#technologies">Technologies</a></li>
        <li><a href="#installation-and-setup">Installation and Setup</a></li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#project-structure">Project Structure</a></li>
        <li><a href="#bonus-features">Bonus Features</a></li>
    </ul>

  <h2>Features</h2>
    <ul>
        <li>Upload an image via a file input form.</li>
        <li>Send the image to the backend for processing.</li>
        <li>Rotate the uploaded image 90 degrees on the server side.</li>
        <li>Display both the original and rotated images on the frontend.</li>
    </ul>

  <h2 id="technologies">Technologies</h2>
    <h3>Frontend:</h3>
    <ul>
        <li><strong>React.js</strong> (JavaScript framework for building the user interface)</li>
        <li><strong>Fetch API</strong> (for sending image data to the backend)</li>
        <li><strong>HTML/CSS</strong> (for form design and image display)</li>
    </ul>

  <h3>Backend:</h3>
    <ul>
        <li><strong>Node.js</strong> (for building the server)</li>
        <li><strong>Express.js</strong> (to create API endpoints)</li>
        <li><strong>Multer</strong> (to handle file uploads)</li>
        <li><strong>Sharp</strong> (for image processing: rotating the image)</li>
        <li><strong>CORS</strong> (to handle Cross-Origin Resource Sharing)</li>
        <li><strong>Jimp</strong> (for image processing)</li>
    </ul>

  <h2 id="installation-and-setup">Installation and Setup</h2>

  <h3>Backend Setup</h3>
    <ol>
        <li><strong>Clone the Repository:</strong>
            <pre><code>git clone https://github.com/Samsadprince134/RotateImage
cd image-rotation-app/server</code></pre>
        </li>
        <li><strong>Install Backend Dependencies:</strong>
            <pre><code>npm install express multer sharp cors jimp</code></pre>
            <ul>
                <li><strong>express</strong>: Web framework for Node.js.</li>
                <li><strong>multer</strong>: Middleware for handling file uploads.</li>
                <li><strong>sharp</strong>: High-performance image processing library.</li>
                <li><strong>cors</strong>: Middleware to enable Cross-Origin Resource Sharing.</li>
                <li><strong>jimp</strong>: Image manipulation library .</li>
            </ul>
        </li>
        <li><strong>Start the Backend Server:</strong>
            <pre><code>npm start</code></pre>
            The backend will run on <code>http://localhost:5000</code>.
        </li>
    </ol>

  <h3>Frontend Setup</h3>
    <ol>
        <li><strong>Navigate to the Frontend Directory:</strong>
            <pre><code>cd ../client</code></pre>
        </li>
        <li><strong>Install Frontend Dependencies:</strong>
            <pre><code>npm install</code></pre>
        </li>
        <li><strong>Start the React Development Server:</strong>
            <pre><code>npm start</code></pre>
            The frontend will be available at <code>http://localhost:3000</code>.
        </li>
    </ol>

   <h2 id="usage">Usage</h2>
    <ol>
        <li>Upload an image via the file input on the frontend.</li>
        <li>The image is sent to the backend via the <code>/api/upload</code> endpoint.</li>
        <li>The backend processes the image using <strong>Sharp</strong> and rotates it 90 degrees.</li>
        <li>The rotated image is returned and displayed alongside the original image.</li>
    </ol>

  <h2 id="project-structure">Project Structure</h2>
    <pre><code>image-rotation-app/
│
├── backend/
│   ├── server.js              # Node.js backend
│   ├── package.json           # Backend dependencies
│   ├── uploads/               # Temporary storage for uploaded images
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js             # Main React component
│   ├── package.json           # Frontend dependencies
│
└── README.md                  # Instructions and setup guide
</code></pre>

  <h2 id="bonus-features">Bonus Features</h2>
    <ul>
        <li><strong>File Type Validation:</strong> Ensures only valid image formats (e.g., JPEG, PNG) can be uploaded.</li>
        <li><strong>Error Handling:</strong> Displays error messages for invalid file uploads or server errors.</li>
        <li><strong>Basic Styling:</strong> Simple UI for a better user experience.</li>
    </ul>
</div>



</body>
</html>
