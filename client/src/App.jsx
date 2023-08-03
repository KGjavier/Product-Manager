import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import React from 'react';
import Home from './render/Home';
import DisplayOne from './render/DisplayOne';
import UpdateForm from './render/UpdateForm';
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/:id" element={<DisplayOne />} />
          <Route path="/edit/:id" element={<UpdateForm/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
