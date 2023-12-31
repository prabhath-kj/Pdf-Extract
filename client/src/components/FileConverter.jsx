import React, { useEffect, useMemo, useState } from "react";
import ExtractButton from "./ExtractButton";
import { EyeIcon, CloudArrowDownIcon } from "@heroicons/react/24/solid";
import Loader from "./Loader";

var pdfjsLib = window["pdfjs-dist/build/pdf"];
pdfjsLib.GlobalWorkerOptions.workerSrc = "/js/pdf.worker.js";

function FileConverter({ pdfUrl, fileName }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);

  // Cleanup loading state when imageUrls change
  useEffect(() => {
    setLoading(false);
  }, [imageUrls]);

  // Handle opening the image modal
  const handleClickOpen = (url, index) => {
    setSelectedImage({ url, index });
    setOpen(true);
  };

  // Handle closing the image modal
  const handleClose = () => {
    setSelectedImage(null);
    setOpen(false);
  };

  // Upload PDF URL and trigger rendering
  const UrlUploader = (url) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        let reader = new FileReader();
        reader.onload = (e) => {
          const data = atob(e.target.result.replace(/.*base64,/, ""));
          renderPage(data);
        };
        reader.readAsDataURL(blob);
      });
  };

  // Render PDF pages to images
  useMemo(() => {
    UrlUploader(pdfUrl);
  }, [pdfUrl]);

  const renderPage = async (data) => {
    setLoading(true);
    const imagesList = [];
    const canvas = document.createElement("canvas");
    canvas.setAttribute("class", "canv");
    const pdf = await pdfjsLib.getDocument({ data }).promise;

    for (let i = 1; i <= pdf.numPages; i++) {
      var page = await pdf.getPage(i);
      var viewport = page.getViewport({ scale: 1.5 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      var render_context = {
        canvasContext: canvas.getContext("2d"),
        viewport: viewport,
      };
      await page.render(render_context).promise;
      let img = canvas.toDataURL("image/png");
      imagesList.push(img);
    }

    setNumOfPages(pdf.numPages);
    setImageUrls(imagesList); // Clear previous images and set new ones
  };

  // Download image on button click
  const downloadImage = (url, index) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}_${index + 1}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    handleClose();
  };

  // Handle checkbox change
  const handleCheckboxChange = (index) => {
    const isSelected = selectedPages.includes(index);
    if (isSelected) {
      setSelectedPages((prevSelected) =>
        prevSelected.filter((page) => page !== index)
      );
    } else {
      setSelectedPages((prevSelected) => [...prevSelected, index]);
    }
  };

  return (
    <div className="px-2 py-4 text-center  ">
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          {imageUrls.length > 0 && (
            <>
              <h4 className="text-3xl mb-4 text-black font-semibold">
                Select Pages For Extracting - {numOfPages}
              </h4>
              <div className="flex flex-wrap gap-4 justify-center">
                {imageUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative w-44 h-56 px-2 py-2 opacity-100  bg-blue-300 hover:bg-blue-400 shadow-lg  rounded"
                  >
                    <img
                      src={url}
                      alt={`Page ${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <div className="absolute top-1 right-1 space-x-1">
                      {/* View button */}
                      <button
                        onClick={() => handleClickOpen(url, index)}
                        className="btn-bg p-2"
                      >
                        <EyeIcon
                          className={`px-1 py-1 w-7 h-7 text-black  bg-slate-300 rounded-full hover:text-gray-700`}
                        />
                      </button>
                      {/* Download button */}
                      <button
                        onClick={() => downloadImage(url, index)}
                        className="btn-bg p-2 rounded-full"
                      >
                        <CloudArrowDownIcon
                          className={`px-1 py-1 w-7 h-7 text-black  bg-slate-300 rounded-full hover:text-gray-700`}
                        />
                      </button>
                    </div>
                    <div className="absolute top-1 left-1 space-x-2  rounded-full">
                      {/* Check box */}
                      <input
                        type="checkbox"
                        checked={selectedPages.includes(index + 1)}
                        className="w-5 h-5 text-black  text-center px-2 py-2 rounded-full"
                        onChange={() => handleCheckboxChange(index + 1)}
                      />
                    </div>
                    {/* {Page Number} */}
                    <h4 className="text-center font-bold text-sm py-1">
                      {index + 1}
                    </h4>
                  </div>
                ))}
              </div>
              {/* Checkbox for ImageTopIcon */}
              <div className="mt-4">
                {/* Extract button */}
                {selectedPages.length > 0 && (
                  <ExtractButton
                    selectedPages={selectedPages}
                    fileName={fileName}
                  />
                )}
              </div>
            </>
          )}
        </>
      )}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
          {/* Blurred background overlay */}
          <div className="fixed inset-0 bg-gray-400 bg-opacity-50 backdrop-blur-lg"></div>

          {/* Modal */}
          <div className="bg-white  rounded-lg  w-[500px] h-[550px] overflow-y-hidden relative">
            <img
              src={selectedImage?.url}
              alt={selectedImage?.url}
              className="w-full h-96 object-contain"
            />
            <div className="flex flex-col lg:flex-row justify-end space-y-4 lg:space-y-0 lg:space-x-4 m-2">
              {/* Cancel button */}
              <button
                onClick={handleClose}
                className="text-white bg-gray-500 px-4 py-2 rounded"
              >
                Cancel
              </button>
              {/* Download button */}
              <button
                onClick={() =>
                  downloadImage(selectedImage.url, selectedImage.index)
                }
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileConverter;
