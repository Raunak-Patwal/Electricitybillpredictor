import React from "react";

const Sidebar = ({ history, onDelete, onClear }) => {
  return (
    <div className="w-full p-5 shadow-2xl md:w-1/3 bg-base-200 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">📂 Prediction History</h2>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="text-white btn btn-sm btn-error"
          >
            Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="text-sm text-gray-400">No predictions yet.</p>
      ) : (
        <ul className="space-y-3">
          {history.map((item, index) => (
            <li
              key={index}
              className="flex items-start justify-between p-4 transition shadow-inner bg-base-100 rounded-xl hover:shadow-md"
            >
              <div>
                <p className="text-sm font-semibold truncate">📄 {item.file}</p>
                <p className="text-xs text-gray-400">{item.time}</p>
              </div>
              <button
                onClick={() => onDelete(index)}
                className="ml-2 text-white btn btn-xs btn-circle btn-error"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
