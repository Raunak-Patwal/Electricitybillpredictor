import React, { useState,useEffect} from "react";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import PredictionDetails from "../Components/PredictionDetails/PredictionDetails";

const initialState = {
  Temperature: 30,
  Humidity: 50,
  Wind_Speed: 5,
  Rain: 0,
  Public_Holiday: 0,
  Weekly_Holiday: 0,
  Festival: 0,
  Low_Development: 1,
  Medium_Development: 0,
  High_Development: 0,
  year: 2025,
  month: 6,
  day: 16,
  Time_in_hours: 14,
  RED_Low: false,
  RED_Medium: false,
};

const Predict = () => {
  const [formData, setFormData] = useState(initialState);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
  const storedHistory = localStorage.getItem("prediction-history");
  if (storedHistory) {
    setHistory(JSON.parse(storedHistory));
  }
}, []);

useEffect(() => {
  localStorage.setItem("prediction-history", JSON.stringify(history));
}, [history]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (
      name === "Low_Development" ||
      name === "Medium_Development" ||
      name === "High_Development"
    ) {
      setFormData((prev) => ({
        ...prev,
        Low_Development: 0,
        Medium_Development: 0,
        High_Development: 0,
        [name]: checked ? 1 : 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://electricity-11.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": "my-secret-key",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(data));

      const predictionValue =
        data.predicted_value ?? data.prediction ?? data.result ?? data.value ?? "No result";

      const newPrediction = {
        id: Date.now(),
        name: `Prediction ${history.length + 1}`,
        result: predictionValue,
        date: new Date().toLocaleString(),
        input: formData,
        output: data,
      };

      setHistory([newPrediction, ...history]);
      setPrediction(predictionValue);
      setTimeout(() => setPrediction(null), 5000);
    } catch (err) {
      console.error("Prediction error:", err);
      alert("❌ Prediction failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteSingle = (id) => setHistory((prev) => prev.filter((item) => item.id !== id));
  const clearHistory = () => setHistory([]);

  return (
    <motion.div
      className="flex flex-col min-h-screen px-6 py-10 text-white bg-gradient-to-br from-slate-900 via-gray-800 to-black md:flex-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Sidebar History */}
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
                className="flex flex-col justify-between p-3 bg-gray-700 rounded-lg shadow cursor-pointer hover:bg-gray-600"
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedItem(item)}
              >
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.date}</p>
                    <p className="text-xs font-semibold text-green-400">⚡ {item.result}</p>
                  </div>
                  <button
                    className="text-red-400 hover:text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSingle(item.id);
                    }}
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
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

      
      <motion.div
        className="w-full p-6 bg-gray-800 shadow-2xl md:flex-1 rounded-xl"
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="mb-6 text-xl font-bold text-blue-400">Enter Prediction Data</h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[
            ["Temperature", "°C", "Air temperature"],
            ["Humidity", "%", "Humidity"],
            ["Wind_Speed", "km/h", "Wind speed"],
            ["Rain", "mm", "Rainfall"],
            ["year", "", "Year"],
            ["month", "", "Month"],
            ["day", "", "Day"],
            ["Time_in_hours", "hr", "Hour (0–23)"],
          ].map(([key, unit, tooltip]) => (
            <div key={key} className="p-3 bg-gray-700 rounded-lg shadow-md">
              <label className="text-sm font-semibold text-blue-300 capitalize">
                {key.replace(/_/g, " ")}{" "}
                <span className="text-xs text-gray-400">({unit})</span>
              </label>
              <input
                type="number"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-sm text-gray-900 bg-gray-100 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={tooltip}
              />
            </div>
          ))}

          {[
            ["Public_Holiday", "Public Holiday"],
            ["Weekly_Holiday", "Weekly Holiday"],
            ["Festival", "Festival"],
            ["Low_Development", "Low Development"],
            ["Medium_Development", "Medium Development"],
            ["High_Development", "High Development"],
            ["RED_Low", "Red Low"],
            ["RED_Medium", "Red Medium"],
          ].map(([key, label]) => (
            <div key={key} className="flex items-center p-3 space-x-3 bg-gray-700 rounded-lg shadow-md">
              <input
                type="checkbox"
                name={key}
                checked={formData[key]}
                onChange={handleChange}
                className={`toggle duration-300 ${
                  key.includes("RED") ? "toggle-error" : "toggle-info"
                }`}
              />
              <label className="text-sm font-semibold text-white">{label}</label>
            </div>
          ))}
        </div>

        <motion.div
          className="mt-8 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ y: -4, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <button
            onClick={handlePredict}
            disabled={loading}
            className={`px-6 py-3 text-lg font-medium rounded-full shadow-md transition duration-300 ${
              loading
                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-500"
            }`}
          >
            {loading ? "⏳ Predicting..." : " Predict Now"}
          </button>
        </motion.div>

        {prediction && (
          <motion.div
            className="p-4 mt-6 text-green-400 bg-gray-900 border border-green-600 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <h4 className="mb-1 text-lg font-bold"> Prediction Result</h4>
            <p>{prediction}</p>
          </motion.div>
        )}
      </motion.div>

      {selectedItem && (
        <PredictionDetails item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </motion.div>
  );
};

export default Predict;
