
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string, mixed } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addCategory, deleteCategory, editCategory, fetchCategoryData } from '../../../reduxNew/slice/categorySlice';
import { baseURL } from '../../../utils/baseURL';

function Category(props) {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(null);
    const dispatch = useDispatch();
    const categoryList = useSelector((state) => state?.categoryDetails?.data);
    // const {data,isLoading} = useSelector((state) => state?.categoryDetails);
    const isLoading = useSelector((state) => state?.categoryDetails?.isLoading);
    console.log(isLoading);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(null);
    };


    const handleAdd = async (formData) => {
        try {
            const response = await axios.post(`${baseURL}/categories/add-categories`, formData);
            console.log(response.data);
            return response.data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    let categorySchema = object({
        name: string().required("Please enter name"),
        description: string().required("Please enter description").min(5, "Please enter minimum 5 characters"),
        image: mixed().required("image upload required")
            .test(
                "size",
                "Unsupported size",
                (value) => {
                    if (value?.size) {
                        return value?.size <= 1024 * 1024 * 2
                    }
                    return true
                }
            )
            .test(
                "fileFormat",
                "Unsupported Format",
                (value) => {
                    if (value?.type) {
                        return ["image/jpg", "image/jpeg", "image/png", "image/avif", "application/pdf"]?.includes(value?.type)
                    }
                    return true
                }
            ),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            image: null,
        },

        validationSchema: categorySchema,

        onSubmit: (values, { resetForm }) => {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('image', values.image);

            console.log(values);

            if (update) {
                handleUpdateData(values);
                // handleUpdateData(formData, values?._id);
            } else {
                handleAdd(formData);
            }

            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, setFieldValue, errors, touched, values } = formik;

    const handleUpdateData = async (values) => {
        dispatch(editCategory(values));
        // dispatch(editCategory({ formData, id }));
    };

    const handleDelete = async (data) => {
        dispatch(deleteCategory(data?._id));
    };

    const handleEdit = (data) => {
        // formik.setValues(data);
        console.log(data);
        setFieldValue("_id", data?._id)
        setFieldValue("name", data.name)
        setFieldValue("description", data.description)
        setFieldValue("image", data.image)
        console.log(data.image.url, "data");
        setOpen(true);
        setUpdate(data);
    };

    const columns = [
        {
            field: 'image',
            headerName: 'Image',
            width: 150,
            renderCell: (params) => (
                <img
                    src={params.row.image.url}
                    alt={params.row.name}
                    style={{ width: '40px', height: '40px' }}
                />
            ),
        },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'description', headerName: 'Description', flex: 1 },
        {
            field: 'Action',
            headerName: 'Action',
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => (handleEdit(params.row))}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => (handleDelete(params.row))}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        }
    ];

    useEffect(() => {
        dispatch(fetchCategoryData());
    }, [dispatch]);

    console.log(values);
    return (
        <div>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen} style={{ marginBottom: "10px" }}>
                    Add Category
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Category</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                id="name"
                                name="name"
                                label="Category Name"
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
                                id="description"
                                name="description"
                                label="Category Description"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                                error={errors.description && touched.description ? true : false}
                                helperText={errors.description && touched.description ? errors.description : ""}
                            />

                            <input
                                id="image"
                                name="image"
                                type="file"
                                onChange={(event) => {
                                    setFieldValue("image", event.currentTarget.files[0]);
                                }}
                            />
                            {errors.image && touched.image && (
                                <div style={{ color: 'red' }}>{errors.image}</div>
                            )}
                            {values?.image &&
                                <img
                                    src={values?.image?.url ? values?.image?.url : URL.createObjectURL(values?.image)}
                                    alt={values?.name}
                                    style={{ width: '40px', height: '40px' }}
                                />
                            }
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                            </DialogActions>
                        </DialogContent>
                    </form>
                </Dialog>
            </React.Fragment>

            <div style={{ height: 400, width: '100%' }}>
                {isLoading === true ?
                    <div className='d-flex justify-content-center align-items-center'>

                        <CircularProgress />
                    </div>
                    :
                    <DataGrid
                        rows={categoryList}
                        columns={columns}
                        getRowId={(row) => row._id}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                    />}

            </div>
        </div>
    );
}

export default Category;

