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

import One from './ProductLocation/One';
import Two from './ProductLocation/Two';
import Three from './ProductLocation/Three';
import Four from './ProductLocation/Four';
import Five from './ProductLocation/Five';
import Six from './ProductLocation/Six';
import Seven from './ProductLocation/Seven';
import Eight from './ProductLocation/Eight';
import Nine from './ProductLocation/Nine';
import Ten from './ProductLocation/Ten';
import Eleven from './ProductLocation/Eleven';
import Twelve from './ProductLocation/Twelve';
import Thirteen from './ProductLocation/Thirteen';
import Fourteen from './ProductLocation/Fourteen';
import Fifteen from './ProductLocation/Fifteen';
import Sixteen from './ProductLocation/Sixteen';
import Seventeen from './ProductLocation/Seventeen';
import Eighteen from './ProductLocation/Eighteen';
import Nineteen from './ProductLocation/Nineteen';
import Twenty from './ProductLocation/Twenty';
import TwentyOne from './ProductLocation/TwentyOne';
import TwentyTwo from './ProductLocation/TwentyTwo';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="category" element={<ProtectedRoute element={<Category />} />} />
      <Route path="AboutUs" element={<ProtectedRoute element={<AboutUs />} />} />
      <Route path="history" element={<ProtectedRoute element={<History />} />} />
      <Route path="devinfo" element={<ProtectedRoute element={<DevInfo />} />} />
      <Route path="Barcodescan" element={<ProtectedRoute element={<Barcodescan />} />} />
      <Route path="home" element={<ProtectedRoute element={<Home />} />} />
      <Route path="profile" element={<ProtectedRoute element={<Profile />} />} />
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

      <Route path="1" element={<ProtectedRoute element={<One />} />} />
      <Route path="2" element={<ProtectedRoute element={<Two />} />} />
      <Route path="3" element={<ProtectedRoute element={<Three />} />} />
      <Route path="4" element={<ProtectedRoute element={<Four />} />} />
      <Route path="5" element={<ProtectedRoute element={<Five />} />} />
      <Route path="6" element={<ProtectedRoute element={<Six />} />} />
      <Route path="7" element={<ProtectedRoute element={<Seven />} />} />
      <Route path="8" element={<ProtectedRoute element={<Eight />} />} />
      <Route path="9" element={<ProtectedRoute element={<Nine />} />} />
      <Route path="10" element={<ProtectedRoute element={<Ten />} />} />
      <Route path="11" element={<ProtectedRoute element={<Eleven />} />} />
      <Route path="12" element={<ProtectedRoute element={<Twelve />} />} />
      <Route path="13" element={<ProtectedRoute element={<Thirteen />} />} />
      <Route path="14" element={<ProtectedRoute element={<Fourteen />} />} />
      <Route path="15" element={<ProtectedRoute element={<Fifteen />} />} />
      <Route path="16" element={<ProtectedRoute element={<Sixteen />} />} />
      <Route path="17" element={<ProtectedRoute element={<Seventeen />} />} />
      <Route path="18" element={<ProtectedRoute element={<Eighteen />} />} />
      <Route path="19" element={<ProtectedRoute element={<Nineteen />} />} />
      <Route path="20" element={<ProtectedRoute element={<Twenty />} />} />
      <Route path="21" element={<ProtectedRoute element={<TwentyOne />} />} />
      <Route path="22" element={<ProtectedRoute element={<TwentyTwo />} />} />
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
