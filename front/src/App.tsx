import Navbar from './comps/Navbar';
import Main from './comps/Main';
import 'bootstrap/dist/css/bootstrap.css';
import * as Icon from 'react-bootstrap-icons';
import { Link, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import SavedCars from './comps/SavedCars';
import { useEffect, useState } from 'react';

//get Save Cars

function App() {

  const [savedCars, setSavedCars] = useState([]);

  return (

    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='saved-cars' element={<SavedCars />} />
        </Routes>
      </Router>
    </>

  );
}

//                   



export default App