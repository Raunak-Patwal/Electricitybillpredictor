import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <div className="sticky top-0 z-50 border-b border-gray-700 shadow-md backdrop-blur-md bg-black/40">
      <div className="px-4 mx-auto text-white navbar max-w-7xl">
        
        {/* Left: Dropdown */}
        <motion.div
          className="navbar-start"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-outline btn-info btn-sm md:btn-md">
              Menu
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] p-2 mt-2 shadow bg-base-100 rounded-box w-44 text-black"
            >
              <li><Link to="/">Home</Link></li>
              <li><Link to="/predict">Predict</Link></li>
            </ul>
          </div>
        </motion.div>

        {/* Center: Title */}
        <motion.div
          className="navbar-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Link
            to="/"
            className="text-xl font-bold text-blue-400 transition duration-300 hover:text-white"
          >
            Electricity Bill Predictor
          </Link>
        </motion.div>

        {/* Right: Empty for now */}
        <div className="navbar-end"></div>
      </div>
    </div>
  );
}

export default Navbar;
