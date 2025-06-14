import { Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar"
import Footer from "./Components/Footer/Footer"
import Predict from "./Pages/Predict"
import AboutPage from "./Pages/Pageabout"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"  element={<AboutPage />} />
        <Route path="/predict" element={<Predict />} />
      </Routes>
      
      
    </>
  )
}

export default App;
