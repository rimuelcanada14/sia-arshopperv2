// App.js
import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

import Login from './Login/Login';
import Signup from './Signup/Signup';
import Profile from './profile/Profile';
import ProfileInfo from './profile/ProfileInfo';
import ProfileHealth from './profile/ProfileHealth';
import Category from './Category/Categories';
import Home from './Home/Home';
import Beverages from './Category/Beverages';
import AboutUs from './AboutUs/AboutUs';
import History from './AboutUs/History';
import Wayfinding from './Wayfinding/Wayfinding';
import Barcodescan from './Barcodescan/Barcodescan';
import DevInfo from './AboutUs/DevInfo';
import JunkFoods from './Category/JunkFoods';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="category" element={<ProtectedRoute element={<Category />} />} />
      <Route path="AboutUs" element={<ProtectedRoute element={<AboutUs />} />} />
      <Route path="history" element={<ProtectedRoute element={<History />} />} />
      <Route path="devinfo" element={<ProtectedRoute element={<DevInfo />} />} />
      <Route path="wayfinding" element={<ProtectedRoute element={<Wayfinding />} />} />
      <Route path="Barcodescan" element={<ProtectedRoute element={<Barcodescan />} />} />
      <Route path="home" element={<ProtectedRoute element={<Home />} />} />
      <Route path="profile" element={<ProtectedRoute element={<Profile />} />} />
      <Route path="profile-info" element={<ProtectedRoute element={<ProfileInfo />} />} />
      <Route path="profile-health" element={<ProtectedRoute element={<ProfileHealth />} />} />
      <Route path="beverages" element={<ProtectedRoute element={<Beverages />} />} />
      <Route path="junkfoods" element={<ProtectedRoute element={<JunkFoods />} />} />
    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
