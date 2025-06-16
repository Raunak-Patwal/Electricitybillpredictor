import React, { useState } from "react";

const initialState = {
  Temperature: "",
  Humidity: "",
  Wind_Speed: "",
  Rain: "",
  Public_Holiday: 0,
  Weekly_Holiday: 0,
  Festival: 0,
  Low_Development: "",
  Medium_Development: "",
  High_Development: "",
  year: "",
  month: "",
  day: "",
  Time_in_hours: "",
  RED_Low: false,
  RED_Medium: false,
};

const FeatureForm = ({ onPredict }) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    const parsedData = {
      ...formData,
      Temperature: parseFloat(formData.Temperature),
      Humidity: parseFloat(formData.Humidity),
      Wind_Speed: parseFloat(formData.Wind_Speed),
      Rain: parseFloat(formData.Rain),
      Low_Development: parseFloat(formData.Low_Development),
      Medium_Development: parseFloat(formData.Medium_Development),
      High_Development: parseFloat(formData.High_Development),
      Public_Holiday: parseInt(formData.Public_Holiday),
      Weekly_Holiday: parseInt(formData.Weekly_Holiday),
      Festival: parseInt(formData.Festival),
      year: parseInt(formData.year),
      month: parseInt(formData.month),
      day: parseInt(formData.day),
      Time_in_hours: parseInt(formData.Time_in_hours),
      RED_Low: !!formData.RED_Low,
      RED_Medium: !!formData.RED_Medium,
    };
    onPredict(parsedData);
  };

  return (
    <div className="w-full bg-gray-900 text-white p-6 rounded-2xl shadow-2xl space-y-6 transition hover:scale-[1.01] duration-300">
      <h2 className="text-xl font-bold text-blue-400">🔢 Enter Prediction Inputs</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Object.entries(formData).map(([key, value]) => (
          typeof value === "boolean" ? (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={key}
                checked={value}
                onChange={handleChange}
                className="checkbox checkbox-primary"
              />
              <span className="text-sm capitalize">{key.replace(/_/g, " ")}</span>
            </label>
          ) : (
            <div key={key} className="flex flex-col">
              <label className="mb-1 text-sm text-gray-300 capitalize">
                {key.replace(/_/g, " ")}
              </label>
              <input
                type="number"
                name={key}
                value={value}
                onChange={handleChange}
                className="text-white bg-gray-800 border-gray-700 input input-sm input-bordered focus:border-blue-500"
              />
            </div>
          )
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="mt-4 text-lg btn btn-primary btn-wide"
        >
          Predict Now
        </button>
      </div>
    </div>
  );
};

export default FeatureForm;

