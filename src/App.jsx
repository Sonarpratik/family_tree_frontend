import { useState } from 'react'
import './App.css'
import { RouterProvider } from "react-router-dom";
import router from './Router';
function App() {

  return (
    <div className="body-width">
    {/* {loading && <LoadingHV />} */}
    <RouterProvider router={router} />
  </div>
  )
}

export default App
