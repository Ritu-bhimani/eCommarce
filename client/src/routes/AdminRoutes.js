import React from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import Product from '../admin/container/Product/Product';
import Layout from '../admin/component/Layout/Layout';
import Reviews from '../admin/container/Reviews/Reviews';
import Category from '../admin/container/Category/Category';
import SubCategory from '../admin/container/SubCategory/SubCategory';
import Facilities from '../admin/container/Facilities/Facilities';
import Coupan from '../admin/container/Coupan/Coupan';
import BestSeller from '../admin/container/BestSeller/BestSeller';
import Contact from '../admin/container/Contact/Contact';

function AdminRoutes(props) {
    return (

        <Layout >
            <Routes >
                <Route exact path='/Product' element={<Product />} />
                <Route exact path='/Reviews' element={<Reviews />} />
                <Route exact path='/Category' element={<Category />} />
                <Route exact path='/SubCategory' element={<SubCategory />} />
                <Route exact path='/Facilities' element={<Facilities />} />
                <Route exact path='/Coupan' element={<Coupan />} />
                <Route exact path='/Contact' element={<Contact />} />
                <Route exact path='/BestSeller' element={<BestSeller />} />
            </Routes>
        </Layout>

    );
}

export default AdminRoutes;