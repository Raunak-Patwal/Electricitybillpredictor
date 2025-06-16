import React from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const PredictionDetails = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="relative w-full max-w-3xl p-6 mx-4 bg-gray-900 shadow-lg rounded-xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <button
          onClick={onClose}
          className="absolute text-gray-400 top-4 right-4 hover:text-red-500"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="mb-4 text-2xl font-bold text-blue-400">
          📊 Prediction Details
        </h2>

        <div className="mb-4">
          <p>
            <strong className="text-green-400">Result:</strong>{" "}
            <span className="text-white">{item.result}</span>
          </p>
          <p>
            <strong className="text-green-400">Date:</strong>{" "}
            <span className="text-white">{item.date}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-blue-300">
              🔢 Input Data
            </h3>
            <div className="p-3 space-y-1 overflow-y-auto bg-gray-800 rounded-lg max-h-64">
              {Object.entries(item?.input || {}).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between text-sm text-gray-300"
                >
                  <span className="font-medium">{key}</span>
                  <span>{String(value)}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold text-blue-300">
               Bill
            </h3>
            <div className="p-3 space-y-1 overflow-y-auto bg-gray-800 rounded-lg max-h-64">
              {Object.entries(item?.output || {}).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between text-sm text-gray-300"
                >
                  <span className="font-medium">{key}</span>
                  <span>{JSON.stringify(value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="mt-6 text-center"
          whileHover={{ scale: 1.05 }}
        >
          <button
            onClick={onClose}
            className="px-6 py-2 font-semibold text-white transition bg-red-600 rounded-md hover:bg-red-500"
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PredictionDetails;
