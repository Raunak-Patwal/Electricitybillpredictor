import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdDelete, MdImage } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

const Predict = () => {
  const [image, setImage] = useState(null);
  const [history, setHistory] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handlePredict = () => {
    if (!image) return;
    const newPrediction = {
      id: Date.now(),
      name: image.name,
      date: new Date().toLocaleString(),
    };
    setHistory([newPrediction, ...history]);
    setImage(null);
  };

  const deleteSingle = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen px-6 py-10 text-white bg-gradient-to-br from-gray-900 via-gray-800 to-black md:flex-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Sidebar */}
      <motion.div
        className="w-full p-6 mb-10 bg-gray-800 shadow-xl md:w-1/3 lg:w-1/4 rounded-xl md:mb-0 md:mr-6"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="mb-4 text-xl font-bold text-blue-400">Prediction History</h2>

        {history.length === 0 ? (
          <p className="text-gray-400">No predictions yet.</p>
        ) : (
          <ul className="space-y-4">
            {history.map((item) => (
              <motion.li
                key={item.id}
                className="flex items-center justify-between p-3 bg-gray-700 rounded-lg shadow"
                initial={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
              >
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </div>
                <button
                  className="text-red-400 hover:text-red-600"
                  onClick={() => deleteSingle(item.id)}
                >
                  <MdDelete size={20} />
                </button>
              </motion.li>
            ))}
            <motion.button
              onClick={clearHistory}
              className="w-full mt-2 text-sm text-center text-red-300 transition hover:text-red-500"
              whileHover={{ scale: 1.05 }}
            >
              <FaTrashAlt className="inline mr-1" />
              Clear All History
            </motion.button>
          </ul>
        )}
      </motion.div>

      {/* Upload + Preview */}
      <motion.div
        className="w-full p-6 bg-gray-800 shadow-2xl md:flex-1 rounded-xl"
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="mb-6 text-xl font-bold text-blue-400">Upload Image</h2>

        <label className="flex items-center justify-center w-full h-48 px-6 py-4 transition bg-gray-700 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:bg-gray-600">
          <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
          <div className="text-center">
            <MdImage className="w-10 h-10 mx-auto mb-2 text-blue-400" />
            <p className="text-sm text-gray-300">
              {image ? image.name : "Click to select an image"}
            </p>
          </div>
        </label>

        {image && (
          <motion.div
            className="relative mt-6 w-fit"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="object-cover w-48 h-48 border border-gray-600 rounded-xl"
            />
            <button
              onClick={() => setImage(null)}
              className="absolute p-1 text-white transition rounded-full top-1 right-1 bg-black/50 hover:bg-red-500"
            >
              <MdDelete />
            </button>
          </motion.div>
        )}

        <motion.div
          className="mt-8 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ y: -4, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <button
            onClick={handlePredict}
            className={`px-6 py-3 text-lg font-medium rounded-full shadow-md ${
              image
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            } transition duration-300`}
            disabled={!image}
          >
            Predict
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Predict;
