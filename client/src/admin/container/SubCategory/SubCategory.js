// import React from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import { object, string } from "yup";
// import { useFormik } from "formik";
// import { DataGrid } from "@mui/x-data-grid";
// import { IconButton } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import { useState } from "react";
// import Box from "@mui/material/Box";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import { useDispatch, useSelector } from "react-redux";
// import { addSubCategory, deleteSubCategory, editSubCategory, fetchSubCategoryData } from '../../../reduxNew/slice/subcategorySlice';
// import axios from "axios";
// import { baseURL } from "../../../utils/baseURL";

// function Subcategory() {
//     const [open, setOpen] = React.useState(false);
//     const [data, setData] = React.useState([]);
//     const [update, setUpdate] = useState(null);
//     const [categoryData, setCategoryData] = useState([]);
//     const [subCategories, setSubCategories] = useState([]);

//     // const subCategories = useSelector((state) => state.categoryDetails.data);
//     // console.log(subCategories);

//     const dispatch = useDispatch();

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         formik.resetForm();
//         setUpdate(null);
//     };


//     const getData = async () => {
//         // dispatch(fetchSubCategoryData());
//         try {
//             const response = await axios.get(`${baseURL}/subCategories/list-subCategories`);
//             setSubCategories(response?.data?.data);
//         } catch (err) {
//             console.log(err);
//             throw err;
//         }
//     };

    
//     React.useEffect(() => {
//         getData();
//         // getCategory();
//     }, []);

//     const handleAdd = async (data) => {
//         dispatch(addSubCategory(data))
//     };

//     const handleUpdateData = async (data) => {
//         dispatch(editSubCategory(data))
//     };

//     const handleDelete = async (_id) => {
//         dispatch(deleteSubCategory(_id))
//     };

//     const handleEdit = (data) => {
//         formik.setValues(data);
//         setOpen(true);
//         setUpdate(data);
//     };

//     const columns = [
//         {
//             field: "categoryName", headerName: "Category", width: 150, valueGetter: (params) => {
//                 const categoryName = categoryData.find((v) =>console.log( v._id,params.row.category_id))
//                 {;}
//                 return categoryName ? categoryName.name : '';
//             }
//         },
//         { field: "name", headerName: "Name", width: 150 },
//         { field: "description", headerName: "Description", flex: 1 },
//         {
//             field: "Action",
//             headerName: "Action",
//             width: 130,
//             renderCell: (params) => (
//                 <>
//                     <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
//                         <EditIcon />
//                     </IconButton>
//                     <IconButton
//                         aria-label="delete"
//                         onClick={() => handleDelete(params.row._id)}
//                     >
//                         <DeleteIcon />
//                     </IconButton>
//                 </>
//             ),
//         },
//     ];

//     let subcategorySchema = object({
//         category_id: string().required("Please select a category"),
//         name: string().required("Please enter a name"),
//         description: string()
//             .required("Please enter a description")
//             .min(5, "Please enter at least 5 characters"),
//     });

//     const formik = useFormik({
//         initialValues: {
//             category_id: "",
//             name: "",
//             description: "",
//         },
//         validationSchema: subcategorySchema,
//         onSubmit: (values, { resetForm }) => {
//             if (update) {
//                 handleUpdateData(values);
//             } else {
//                 handleAdd(values);
//             }

//             resetForm();
//             handleClose();
//         },
//     });

//     const { handleSubmit, handleChange, handleBlur, errors, touched, values, setFieldValue } = formik;

//     const changeSelect = (event) => {
//         setFieldValue("category_id", event.target.value);
//     };

//     return (
//         <div>
//             <React.Fragment>
//                 <Button variant="outlined" onClick={handleClickOpen}>
//                     Add Subcategory
//                 </Button>
//                 <Dialog open={open} onClose={handleClose}>
//                     <DialogTitle>Subcategory</DialogTitle>
//                     <form onSubmit={handleSubmit}>
//                         <DialogContent>
//                             <Box sx={{ minWidth: 120 }}>
//                                 <FormControl fullWidth>
//                                     <InputLabel id="category-select-label">
//                                         SubCategory
//                                     </InputLabel>
//                                     <Select
//                                         labelId="category-select-label"
//                                         id="category_id"
//                                         value={values.category_id}
//                                         label="Category"
//                                         name="category_id"
//                                         onChange={changeSelect}
//                                         onBlur={handleBlur}
//                                         error={errors.category_id && touched.category_id ? true : false}
//                                         helperText={errors.category_id && touched.category_id ? errors.category_id : ""}
//                                     >
//                                         {categoryData.map(
//                                             (v) => ((
//                                                 <MenuItem key={v._id} value={v._id}>
//                                                     {v.name}
//                                                 </MenuItem>
//                                             ))
//                                         )}
//                                     </Select>
//                                 </FormControl>
//                             </Box>
//                             <TextField
//                                 margin="dense"
//                                 id="name"
//                                 name="name"
//                                 label="Subcategory Name"
//                                 type="text"
//                                 fullWidth
//                                 variant="standard"
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 value={values.name}
//                                 error={errors.name && touched.name ? true : false}
//                                 helperText={errors.name && touched.name ? errors.name : ""}
//                             />
//                             <TextField
//                                 margin="dense"
//                                 id="description"
//                                 name="description"
//                                 label="Subcategory Description"
//                                 type="text"
//                                 fullWidth
//                                 variant="standard"
//                                 onChange={handleChange}
//                                 onBlur={handleBlur}
//                                 value={values.description}
//                                 error={errors.description && touched.description ? true : false}
//                                 helperText={
//                                     errors.description && touched.description
//                                         ? errors.description
//                                         : ""
//                                 }
//                             />
//                             <DialogActions>
//                                 <Button onClick={handleClose}>Cancel</Button>
//                                 <Button type="submit">{update ? "Update" : "Add"}</Button>
//                             </DialogActions>
//                         </DialogContent>
//                     </form>
//                 </Dialog>
//             </React.Fragment>
//             <div style={{ height: 400, width: "100%" }}>
//                 <DataGrid
//                     rows={subCategories.map(category => ({ ...category, id: category._id }))}
//                     columns={columns}
//                     initialState={{
//                         pagination: {
//                             paginationModel: { page: 0, pageSize: 5 },
//                         },
//                     }}
//                     pageSizeOptions={[5, 10]}
//                     checkboxSelection
//                     getRowId={(row) => row.id}
//                 />
//             </div>
//         </div>
//     );
// }

// export default Subcategory;

import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { object, string } from "yup";
import { useFormik } from "formik";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch } from "react-redux";
import { addSubCategory, deleteSubCategory, editSubCategory } from '../../../reduxNew/slice/subcategorySlice';
import axios from "axios";
import { baseURL } from "../../../utils/baseURL";

function Subcategory() {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(null);
    const [categoryData, setCategoryData] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(null);
    };

    const getData = async () => {
        try {
            const response = await axios.get(`${baseURL}/subCategories/list-subCategories`);
            setSubCategories(response?.data?.data);
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const getCategory = async () => {
        try {
            const response = await axios.get(`${baseURL}/categories/list-categories`);
            setCategoryData(response?.data?.data);
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    useEffect(() => {
        getData();
        getCategory();
    }, []);

    const handleAdd = async (data) => {
        dispatch(addSubCategory(data));
    };

    const handleUpdateData = async (data) => {
        dispatch(editSubCategory(data));
    };

    const handleDelete = async (_id) => {
        dispatch(deleteSubCategory(_id));
    };

    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setUpdate(data);
    };

    const columns = [
        {
            field: "categoryName", headerName: "Category", width: 150, valueGetter: (params) => {
                const category = categoryData.find((v) => v._id === params.row.category_id);
                return category ? category.name : '';
            }
        },
        { field: "name", headerName: "Name", width: 150 },
        { field: "description", headerName: "Description", flex: 1 },
        {
            field: "Action",
            headerName: "Action",
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(params.row._id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    let subcategorySchema = object({
        category_id: string().required("Please select a category"),
        name: string().required("Please enter a name"),
        description: string()
            .required("Please enter a description")
            .min(5, "Please enter at least 5 characters"),
    });

    const formik = useFormik({
        initialValues: {
            category_id: "",
            name: "",
            description: "",
        },
        validationSchema: subcategorySchema,
        onSubmit: (values, { resetForm }) => {
            if (update) {
                handleUpdateData(values);
            } else {
                handleAdd(values);
            }

            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, errors, touched, values, setFieldValue } = formik;

    const changeSelect = (event) => {
        setFieldValue("category_id", event.target.value);
    };

    return (
        <div>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Subcategory
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Subcategory</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="category-select-label">
                                        Category
                                    </InputLabel>
                                    <Select
                                        labelId="category-select-label"
                                        id="category_id"
                                        value={values.category_id}
                                        label="Category"
                                        name="category_id"
                                        onChange={changeSelect}
                                        onBlur={handleBlur}
                                        error={errors.category_id && touched.category_id ? true : false}
                                    >
                                        {categoryData.map((v) => (
                                            <MenuItem key={v._id} value={v._id}>
                                                {v.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <TextField
                                margin="dense"
                                id="name"
                                name="name"
                                label="Subcategory Name"
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
                                label="Subcategory Description"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                                error={errors.description && touched.description ? true : false}
                                helperText={
                                    errors.description && touched.description
                                        ? errors.description
                                        : ""
                                }
                            />
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">{update ? "Update" : "Add"}</Button>
                            </DialogActions>
                        </DialogContent>
                    </form>
                </Dialog>
            </React.Fragment>
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={subCategories.map((category) => ({ ...category, id: category._id }))}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    getRowId={(row) => row.id}
                />
            </div>
        </div>
    );
}

export default Subcategory;
