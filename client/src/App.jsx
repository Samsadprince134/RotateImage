import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [rotatedImage, setRotatedImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [alreadyRotated, setAlreadyRotated] = useState(false);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

  // useEffect(() => {
  //   // Load the file from local storage if available
  //   const storedFile = localStorage.getItem("selectedFile");
  //   if (storedFile) {
  //     setSelectedFile(storedFile);
  //   }
  // }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setError(null);

    if (!file) {
      setError("No file selected.");
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError("Invalid file type. Please upload a JPEG or PNG image.");
      toast.error("Please upload JPEG or PNG file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(`File size exceeds limit. Please upload an image smaller than ${MAX_FILE_SIZE / (1024 * 1024)}MB.`);
      toast.error("Please upload under 5 MB images");
      return;
    }

   // Convert file to base64 string and store in local storage
    const reader = new FileReader();
    reader.onloadend = () => {
     // localStorage.setItem("selectedFile", reader.result);
      setSelectedFile(reader.result);
    };
   reader.readAsDataURL(file);
  //setSelectedFile(file)
    setRotatedImage(null);
    setAlreadyRotated(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select a valid image first.");
      toast.error("Upload Image First");
      return;
    }

    if (alreadyRotated) {
      setError("This image has already been rotated.");
      toast.error("Already Rotated");
      return;
    }

    setLoading(true);
    setProgress(0);

    const formData = new FormData();
    // Convert base64 to blob
    const response = await fetch(selectedFile);
    const blob = await response.blob();
    formData.append("image", blob);

    setTimeout(async () => {
      try {
        const uploadResponse = await fetch("https://rotateimage-uagq.onrender.com/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image.");
        }

        const data = await uploadResponse.blob();
        setRotatedImage(URL.createObjectURL(data));
        toast.success("Image Rotated Successfully!!");
        setAlreadyRotated(true);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
     }, 500);

    let progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="flex flex-col items-center  min-h-screen p-6 bg-[radial-gradient(circle_farthest-corner_at_10%_20%,_rgba(38,51,97,1)_0%,_rgba(65,143,222,1)_79%)]">
    <div className="w-full bg-yellow-400 rounded-2xl p-2">

  
      <h1 className=" text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-black to-gray-950  ">
  Upload and Rotate Image
</h1>
  </div>


      <form
        className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md transition-transform transform mt-8"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-4">Select an image to upload</label>
          <div className="relative">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label className="block w-full text-sm text-gray-300 border border-gray-600 rounded-lg p-3 bg-gray-900 hover:bg-gray-600 transition-all duration-300 ease-in-out text-center cursor-pointer">
              Choose File
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload and Rotate"}
        </button>

        {error && <p className="text-red-400 mt-4">{error}</p>}
      </form>

      {loading && (
        <div className="w-full max-w-md mt-6">
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
              <div
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500 ease-in-out"
              ></div>
            </div>
            <p className="text-gray-300 text-center">{progress}%</p>
          </div>
        </div>
      )}

      <div className="flex rounded-2xl p-4 justify-center items-center flex-col md:flex-row mt-10 space-y-6 md:space-y-0 md:space-x-12 ">
        {selectedFile && (
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-3 text-gray-300">Original Image</h2>
            <img
            
              src={selectedFile}
              alt="Original"
              className=" cursor-pointer w-64 h-64 object-contain rounded-lg  transition-all duration-500 transform hover:scale-110 hover:rotate-3"
            />
          </div>
        )}

        {rotatedImage && (
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-3 text-gray-300">Rotated Image</h2>
            <img
              src={rotatedImage}
              alt="Rotated"
              className=" cursor-pointer w-64 h-64 object-contain rounded-lg  transition-all duration-500 transform hover:scale-110 hover:rotate-3"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
