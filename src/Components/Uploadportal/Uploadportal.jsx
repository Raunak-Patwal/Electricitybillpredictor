import React, { useState } from "react";

const UploadPortal = ({ onPredict }) => {
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (fileName) {
      onPredict(fileName);
      setFileName("");
      setPreview(null);
    }
  };

  const removeFile = () => {
    setFileName("");
    setPreview(null);
  };

  return (
    <div className="w-full md:w-2/3 bg-base-200 p-6 rounded-2xl shadow-2xl space-y-4 transition hover:scale-[1.01] duration-300">
      <h2 className="mb-2 text-xl font-bold">📤 Upload Usage File</h2>
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.csv,.xlsx"
        onChange={handleFileChange}
        className="w-full file-input file-input-bordered"
      />

      {preview && (
        <div className="space-y-3">
          <h3 className="text-sm text-blue-300">🖼️ Preview:</h3>
          <img
            src={preview}
            alt="Preview"
            className="max-w-full rounded-lg shadow"
          />
          <button
            onClick={removeFile}
            className="mt-2 btn btn-sm btn-warning"
          >
            ❌ Remove Selected File
          </button>
        </div>
      )}

      {fileName && (
        <button onClick={handleSubmit} className="mt-4 btn btn-primary">
          🚀 Predict Now
        </button>
      )}
    </div>
  );
};

export default UploadPortal;
