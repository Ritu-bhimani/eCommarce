import React from 'react';
import Header from '../user/component/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from '../user/container/Home/Home';
import Shop from '../user/container/Shop/Shop';
import ShopDetails from '../user/container/ShopDetails/ShopDetails';
import Cart from '../user/container/Cart/Cart';
import Chackout from '../user/container/Chackout/Chackout';
import Testimonial from '../user/container/Testimonial/Testimonial';
import Page from '../user/container/Page/Page';
import Contact from '../user/container/Contact/Contact';
import Footer from '../user/component/Footer/Footer';
import PrivateRoutes from './PrivateRoutes';
import Review from '../user/container/Review/Review';
import Counter from '../admin/container/Counter/Counter';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function UserRoutes(props) {

  const theme = useContext(ThemeContext)

  return (
    <div className={theme.theme}>
      <Header />

      <Routes>

        <Route exact path='/' element={<Home />} />
        <Route element={<PrivateRoutes />} >
          <Route exact path='/Shop' element={<Shop />} />
          <Route exact path='/Shop/:id' element={<ShopDetails />} />
          <Route exact path='/cart/:id' element={<Cart />} />
          <Route exact path="/ShopDetails" element={<ShopDetails />} />
          <Route exact path="/Chackout" element={<Chackout />} />
        </Route>
        <Route exact path="/Cart" element={<Cart />} />
        <Route exact path="/Testimonial" element={<Testimonial />} />
        <Route exact path="/Page" element={<Page />} />
        <Route exact path="/Contact" element={<Contact />} />
        <Route exact path="/Review" element={<Review />} />
        <Route exact path="/Counter" element={<Counter />} />

      </Routes>

      <Footer />
    </div>
  );
}

export default UserRoutes;