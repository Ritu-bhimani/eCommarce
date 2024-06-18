import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { baseURL } from '../../../utils/baseURL';
import { useNavigate, useParams } from 'react-router-dom';

const Subcategory = () => {
    const [getCategory, setGetCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [findSubCategory, setFindSubCategory] = useState([]);
    const navigate = useNavigate();
    const params = useParams();

    console.log(getCategory);
    const getData = async () => {
        const response = await fetch(`${baseURL}/categories/get-category/${params.id}`);
        const res = await response.json();
        setGetCategory(res.data);

        const scresponse = await fetch(`${baseURL}/subCategories/list-subCategories`);
        const subCategoryres = await scresponse.json();
        setSubCategory(subCategoryres.data);

        
    };
    useEffect(() => {
        getData()
        const findSubCat=subCategory.filter((item) => item.category_id === params.id)
        setFindSubCategory(findSubCat)
    }, [])
    console.log(findSubCategory, "findSubCategory");

    return (
        <div className='pt-5 mt-5 container'>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} className='mt-5 pt-5'>
                {
                    findSubCategory && findSubCategory?.length > 0 && findSubCategory?.map((item) => (
                        <Grid item xs={12} sm={6} md={4} className='mt-5 pt-5 ' onClick={() => navigate(`/subcategory/${item?._id}`)}>
                            <Card sx={{ maxWidth: 345 }} onClick={() => navigate('/')}>
                                {/* <CardMedia
                                    sx={{ height: 140 }}
                                    image={item?.image.url}
                                    title="green iguana"
                                /> */}
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item?.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item?.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }

            </Grid>
        </div>
    );
}
export default Subcategory