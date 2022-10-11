import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes, BrowserRouter, Link} from 'react-router-dom';

// import * as recipe1 from './recipe1.json';
// import * as recipe2 from './recipe2.json';
// import * as recipe3 from './recipe3.json';
// import * as recipe4 from './recipe4.json';

// import Tester from './testFunctions/tester';
import Landing from './pages/landing';
import Demo from './pages/demo';
import ChefAlgo from './pages/chefAlgo';
import ChefTestimonials from './pages/ChefTestimonials';
import HowItWorks from './pages/HowItWorks';

import { useEffect } from 'react';

function App() {
  useEffect(()=>{

  })


  return (
    <div className="App">
      {/* <h3>
        <Link to="/">
          Home
        </Link>
      </h3> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path='/demo' element={<Demo/>}/>
          <Route path='/actual' element={<ChefAlgo/>}/>
          <Route path='/how-it-works' element={<HowItWorks/>}/>
          <Route path='/chef-testimonials' element={<ChefTestimonials/>}/>
        </Routes>
      </BrowserRouter>
      
      

      {/* <Tester/> */}
    </div>
  );
}

export default App;
