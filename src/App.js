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
import ProfileLiked from './profile/ProfileLiked';
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
import IceCream from './Category/IceCream';
import FrozenGoods from './Category/FrozenGoods';
import Pastry from './Category/Pastry';
import Water from './Category/Water';
import Condiments from './Category/Condiments';
import NoodlesPasta from './Category/NoodlesPasta';
import InstantNoodles from './Category/InstantNoodles';
import PowderedJuice from './Category/PowederedJuice';
import OilSection from './Category/OilSection';
import BreadSpread from './Category/BreadSpread';
import CannedGoods from './Category/CannedGoods';
import Nibbles from './Category/Nibbles';
import CoffeeMilk from './Category/CoffeeMilk';
import Biscuits from './Category/Biscuits';
import Candies from './Category/Candies';
import Chocolates from './Category/Chocolates';
import LiquorWines from './Category/LiquorWines';
import PartyUtensils from './Category/PartyUtensils';
import Toiletries from './Category/Toiletries';
import DiswashingLaundry from './Category/DiswashingLaundry';
import LocationRenderer from './components/LocationRenderer';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="product-location" element={<LocationRenderer />} />
      <Route path="category" element={<ProtectedRoute element={<Category />} />} />
      <Route path="AboutUs" element={<ProtectedRoute element={<AboutUs />} />} />
      <Route path="history" element={<ProtectedRoute element={<History />} />} />
      <Route path="devinfo" element={<ProtectedRoute element={<DevInfo />} />} />
      <Route path="wayfinding" element={<ProtectedRoute element={<Wayfinding />} />} />
      <Route path="Barcodescan" element={<ProtectedRoute element={<Barcodescan />} />} />
      <Route path="home" element={<ProtectedRoute element={<Home />} />} />
      <Route path="profile" element={<ProtectedRoute element={<Profile />} />} />
      {/* <Route path="product-location" element={<ProtectedRoute element={<LocationRenderer />} />} /> */}
      <Route path="profile-info" element={<ProtectedRoute element={<ProfileInfo />} />} />
      <Route path="profile-liked" element={<ProtectedRoute element={<ProfileLiked />} />} />
      <Route path="profile-health" element={<ProtectedRoute element={<ProfileHealth />} />} />
      <Route path="beverages" element={<ProtectedRoute element={<Beverages />} />} />
      <Route path="junkfoods" element={<ProtectedRoute element={<JunkFoods />} />} />
      <Route path="icecream" element={<ProtectedRoute element={<IceCream />} />} />
      <Route path="frozengoods" element={<ProtectedRoute element={<FrozenGoods />} />} />
      <Route path="pastry" element={<ProtectedRoute element={<Pastry />} />} />
      <Route path="water" element={<ProtectedRoute element={<Water />} />} />
      <Route path="condiments" element={<ProtectedRoute element={<Condiments />} />} />
      <Route path="noodlespasta" element={<ProtectedRoute element={<NoodlesPasta />} />} />
      <Route path="instantnoodles" element={<ProtectedRoute element={<InstantNoodles />} />} />
      <Route path="powderedjuice" element={<ProtectedRoute element={<PowderedJuice />} />} />
      <Route path="oilsection" element={<ProtectedRoute element={<OilSection />} />} />
      <Route path="breadspread" element={<ProtectedRoute element={<BreadSpread />} />} />
      <Route path="cannedgoods" element={<ProtectedRoute element={<CannedGoods />} />} />
      <Route path="nibbles" element={<ProtectedRoute element={<Nibbles />} />} />
      <Route path="coffeemilk" element={<ProtectedRoute element={<CoffeeMilk />} />} />
      <Route path="biscuits" element={<ProtectedRoute element={<Biscuits />} />} />
      <Route path="candies" element={<ProtectedRoute element={<Candies />} />} />
      <Route path="chocolates" element={<ProtectedRoute element={<Chocolates/>} />} />
      <Route path="liquorwines" element={<ProtectedRoute element={<LiquorWines />} />} />
      <Route path="partyutensils" element={<ProtectedRoute element={<PartyUtensils />} />} />
      <Route path="toiletries" element={<ProtectedRoute element={<Toiletries />} />} />
      <Route path="diswashinglaundry" element={<ProtectedRoute element={<DiswashingLaundry />} />} />
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
