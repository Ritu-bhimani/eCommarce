import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { number, object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import axios from 'axios';
import { addCategory } from '../../../reduxNew/slice/categorySlice';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';



export default function FormDialog() {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(null);
    const [data, setData] = React.useState([]);
    const [categoryData, setCategoryData] = React.useState([]);
    const [subCategoryData, setSubCategoryData] = React.useState([]);

    const handleSelectChange = (event) => {
        setFieldValue(event.target.name, event.target.value);
    };

    const products = useSelector(state => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        getData();
        dispatch(addCategory(data));
        getCategoryData();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
        setUpdate(false)
        formik.resetForm()
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/products/list-products");
            setData(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getCategoryData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/categories/list-categories");
            setCategoryData(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getSubCategoryData = async (category_id) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/subCategories/get-category/${category_id}`);
            setSubCategoryData(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const addProduct = async (data) => {
        console.log(data);
        try {
         await axios.post(`http://localhost:8000/api/v1/products/add-products`,data);

        } catch (error) {
            console.error(error);
        }
        getData();
        
    };
    const editProduct = async (data) => {
        
        try {
             await axios.put(`http://localhost:8000/api/v1/products/edit-products/${data?._id}`,data);

        } catch (error) {
            console.error(error);
        }
        getData();
    };

    const handleDelete = async (data) => {
        try {
            await fetch(`http://localhost:8000/api/v1/products/delete-products/${data._id}`, {
                method: "DELETE",
            });
        } catch (error) {
            console.error(error);
        }
        getData();
    };
    let productSchema = object({
        category: string().required("Category is required"),
        subcategory: string().required("Subcategory is required"),
        name: string().required("Product name is required"),
        price: number().required("Price is required"),
        description: string().required("Description is required").min(10, "Please enter a description of at least 10 characters"),
    });

    const formik = useFormik({
        initialValues: {
            category: "",
            subcategory: "",
            name: '',
            price: '',
            description: '',
        },
        validationSchema: productSchema,
        enableReinitialize:true,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                editProduct(values);
            } else {
                addProduct(values);
            }
            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, touched, errors, values, setFieldValue } = formik;

   

    const handleEdit = (data) => {
        formik.setFieldValue('_id',data?._id)
        formik.setFieldValue('category',data?.category?._id)
        formik.setFieldValue('subcategory',data?.subcategory?._id)
        formik.setFieldValue('name',data?.name)
        formik.setFieldValue('price',data?.price)
        formik.setFieldValue('description',data?.description)
        getSubCategoryData(data?.category?._id)
        setOpen(true);
        setUpdate(true);
    };

    const columns = [
        {
            field: "category",
            headerName: "Category",
            width: 150,
            renderCell: (params) => (
                <>
                    {params?.row?.category?.name}
                </>
            ),
        },
        {
            field: 'subcategory',
            headerName: 'SubCategory name',
            flex: 1,
            renderCell: (params) => (
                <>
                    {params?.row?.subcategory?.name}
                </>
            ),
        },
        { field: 'name', headerName: 'Product name', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 1 },
        { field: 'price', headerName: 'Price', flex: 1 },
        {
            field: 'action',
            headerName: 'Action',
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        }
    ];

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Product
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Product</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: '100%' }}>
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                fullWidth
                                name='category'
                                labelId="category-label"
                                id="category-select"
                                value={values.category}
                                onChange={(e) => {
                                    handleSelectChange(e);
                                    getSubCategoryData(e.target.value);
                                }}
                            >
                                {categoryData.map(item => (
                                    <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: '100%' }}>
                            <InputLabel id="subcategory-label">Sub Category</InputLabel>
                            <Select
                                fullWidth
                                name='subcategory'
                                labelId="subcategory-label"
                                id="subcategory-select"
                                value={values.subcategory}
                                onChange={handleSelectChange}
                            >
                                {subCategoryData.map(item => (
                                    <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Product Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            error={errors.name && touched.name ? true : false}
                            helperText={errors.name && touched.name ? errors.name : ""}
                        />
                        <TextField
                            margin="dense"
                            id="price"
                            name="price"
                            label="Price"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.price}
                            error={errors.price && touched.price ? true : false}
                            helperText={errors.price && touched.price ? errors.price : ""}
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            name="description"
                            label="Description"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                            error={errors.description && touched.description ? true : false}
                            helperText={errors.description && touched.description ? errors.description : ""}
                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Save</Button>
                        </DialogActions>
                    </DialogContent>
                </form>
            </Dialog>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    getRowId={row => row._id}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        </>
    );
}
