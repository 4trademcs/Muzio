import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Season2 from "./pages/season2.jsx";
import PlayfulIntro from "./components/intro/PlayfulIntro.jsx";
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlayfulIntro />} />
        <Route path="/season2" element={<Season2 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
