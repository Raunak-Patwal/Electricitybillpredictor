import React, { useEffect } from "react";
import Lottie from "lottie-react";
import AOS from "aos";
import "aos/dist/aos.css";
import energyAnimation from "../assets/energy.json";
import Footer from "../Components/Footer/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <div className="min-h-screen px-4 py-16 text-white bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {/* Tagline */}
        <p className="mb-4 text-sm tracking-widest text-center text-blue-300 uppercase">
          Smart. Predictive. Insightful.
        </p>

        {/* Title */}
        <h1 className="mb-4 text-4xl font-extrabold tracking-wide text-center text-blue-400">
          Why This Model Matters
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto mb-12 text-lg text-center text-gray-400">
          This model isn't just about numbers — it's about empowering your daily
          decisions through smart electricity insights.
        </p>

        {/* Main Content */}
        <div className="flex flex-col-reverse items-center justify-between gap-12 mx-auto md:flex-row max-w-7xl">
          {/* Left Section - Animation */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <Lottie animationData={energyAnimation} loop={true} />
          </motion.div>

          {/* Right Section - Cards */}
          <div className="w-full space-y-6 md:w-1/2">
            {[
              {
                title: "🔍 Electricity Consumption Analysis",
                desc: "This model analyzes your past energy usage to predict future bills, helping you track costs and consumption patterns smartly.",
              },
              {
                title: "📊 Budget Planning",
                desc: "Anticipate high-consumption periods and plan your budget accordingly. Stay ahead of your electricity usage with intelligent predictions.",
              },
              {
                title: "⚙️ Adaptable Use-Cases",
                desc: "Whether you live alone or with a family, this model adapts to your lifestyle and electricity usage patterns for more accurate results.",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                className="p-6 bg-gray-800 shadow-2xl rounded-2xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 25px rgba(96, 165, 250, 0.4)",
                }}
              >
                <h2 className="mb-2 text-xl font-semibold text-blue-400">
                  {card.title}
                </h2>
                <p className="text-gray-300">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Button with Zoom-in + Float */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
          whileHover={{
            scale: 1.05,
            y: -5,
            transition: { yoyo: Infinity, duration: 0.4 },
          }}
        >
          <Link to="/predict">
            <motion.button
              className="px-6 py-3 text-lg font-medium text-white transition bg-blue-600 rounded-full shadow-lg cursor-pointer hover:bg-blue-500"
              whileTap={{ scale: 0.95 }}
            >
              Try the Predictor Now
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Footer stays at bottom */}
      <Footer />
    </>
  );
};

export default About;
