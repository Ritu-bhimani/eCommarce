import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import OwlCarousel from 'react-owl-carousel';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Tab, Tabs } from '@mui/material';
import { baseURL } from '../../../utils/baseURL';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryData } from '../../../reduxNew/slice/categorySlice';
import { ThemeContext } from '../../../context/ThemeContext';
import { fetchSubCategoryData } from '../../../reduxNew/slice/subcategorySlice';

const Category = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [getCategory, setGetCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [findSubCategory, setFindSubCategory] = useState([]);
    const [value, setValue] = React.useState(0);

    console.log(findSubCategory);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const category = useSelector((state) => state?.categoryDetails?.data)
    const subCategoryList = useSelector((state) => state?.subcategoryDetails?.data)
    console.log(subCategoryList, "subCategoryList");

    const categoryOption = {
        autoplay: false,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        nav: true,
        navText: [
            '<div class="owl-prev"><i class="bi bi-arrow-left"></i></div>',
            '<div class="owl-next"><i class="bi bi-arrow-right"></i></div>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 3
            },
            768: {
                items: 4
            },
            992: {
                items: 5
            },
            1200: {
                items: 6
            }
        }
    }

    const showSubcategory = async (id) => {
        console.log(id, "id");
        const response = await fetch(`${baseURL}/categories/get-category/${id}`);
        const res = await response.json();
        setGetCategory(res.data);

        dispatch(fetchSubCategoryData())

        // const scresponse = await fetch(`${baseURL}/subCategories/list-subCategories`);
        // const subCategoryres = await scresponse.json();
        // setSubCategory(subCategoryres.data);

        const findSubCat = subCategoryList.filter((item) => item.category_id === id)
        setFindSubCategory(findSubCat)
    }
    useEffect(() => {
        dispatch(fetchCategoryData())
    }, [])

    return (
        <div className='pt-5 mt-5 '>

            <Card className='mt-5 pt-3 px-3 category'>
                <div className="d-flex" >
                    {/* <OwlCarousel {...categoryOption} className="owl-carousel " > */}
                    {
                        category && category?.length > 0 && category?.map((item) => (
                            <div className="position-relative category-item d-flex justify-content-center flex-column align-items-center" style={{ width: "140px" }}>
                                <div onMouseEnter={() => showSubcategory(item._id)} className=" d-flex justify-content-center ">
                                    <img src="img/vegetable-item-6.jpg" className="img-fluid w-50 rounded" alt />
                                </div>
                                <p className='text-capitalize'>{item.name}</p>

                                {
                                    findSubCategory?.map((v) => (
                                        <div className='subcategory-item' >
                                            <p className='text-capitalize'>{v.name}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                    {/* </OwlCarousel> */}
                </div>
            </Card>
            {/* <div className='d-flex'>
                <div className=" mx-auto d-flex">
                    <NavLink  className="nav-item nav-link active"></NavLink>
                    <div className="nav-item dropdown">
                        <NavLink to='/category' className="nav-link dropdown-toggle" data-bs-toggle="dropdown"> Category</NavLink>
                        <div className="dropdown-menu m-0 bg-secondary rounded-0">
                            {
                                findSubCategory?.map((v) => (
                                    <NavLink to='/Cart' className="dropdown-item">{v.name}</NavLink>
                                ))}
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <NavLink to='/subcategory' className="nav-link dropdown-toggle" data-bs-toggle="dropdown"> Subcategory</NavLink>
                        <div className="dropdown-menu m-0 bg-secondary rounded-0">
                            {
                                findSubCategory?.map((v) => (
                                    <NavLink to='/Cart' className="dropdown-item">{v.name}</NavLink>
                                ))}
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <NavLink to='/product' className="nav-link dropdown-toggle" data-bs-toggle="dropdown"> Product</NavLink>
                        <div className="dropdown-menu m-0 bg-secondary rounded-0">
                            {
                                findSubCategory?.map((v) => (
                                    <NavLink to='/Cart' className="dropdown-item">{v.name}</NavLink>
                                ))}
                        </div>
                    </div>
                </div>

            </div> */}
        </div>
    );
}
export default Category