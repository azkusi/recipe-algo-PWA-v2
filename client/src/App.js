import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes, BrowserRouter} from 'react-router-dom';

// import * as recipe1 from './recipe1.json';
// import * as recipe2 from './recipe2.json';
// import * as recipe3 from './recipe3.json';
// import * as recipe4 from './recipe4.json';

// import Tester from './testFunctions/tester';
import Landing from './pages/landing';
import Demo from './pages/demo';
import ChefAlgo from './pages/chefAlgo';
import { useEffect } from 'react';

function App() {
  useEffect(()=>{

  })


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path='/demo' element={<Demo/>}/>
          <Route path='/actual' element={<ChefAlgo/>}/>
        </Routes>
      </BrowserRouter>
      
      

      {/* <Tester/> */}
    </div>
  );
}

export default App;
