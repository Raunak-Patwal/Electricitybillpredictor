// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-700">
      <div className="px-4 py-10 text-center text-gray-400">
        <p className="mb-2 text-lg font-semibold tracking-wide text-blue-400">
           Electricity Bill Predictor
        </p>
        <p className="text-sm text-gray-500">
          Made with ❤️ for smarter and greener energy use.
        </p>
        <p className="mt-4 text-xs text-gray-600">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
