import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import Login from './Login/Login';
import Signup from './Signup/Signup';
import Category from './Category/Categories';
import Home from './Home/Home';
import Beverages from './Category/Beverages';

const router =createBrowserRouter(
  createRoutesFromElements(
    <Route path = "/"  >
      <Route index element={<Login />}></Route>
      <Route path = "signup" element={<Signup />}></Route>
      <Route path = "category" element={<Category />}></Route>
      <Route path = "Home" element={<Home/>}></Route>
      <Route path = "beverages" element={<Beverages />}></Route>

    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;