import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { object, string, number, date } from "yup";
import { useFormik } from "formik";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect } from "react";
import { useContext } from "react";
import { ContactContext } from "../../../context/contactContext";
import { DataGrid } from "@mui/x-data-grid";

function Contact(props) {

    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = useState(false);

    const contactContext = useContext(ContactContext)
    console.log(contactContext);

    useEffect(() => {

    }, [])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = (data) => {
        setOpen(true);
        formik.setValues(data);
        setUpdate(true)
    };

    const handleDelete = (id) => {

    };

    const columns = [
        { field: "address", headerName: "Address", width: 70 },
        { field: "email", headerName: "Email", width: 130 },
        { field: "phone", headerName: "Phone", width: 130 },
        {
            field: "Action",
            headerName: "Action",
            width: 150,
            renderCell: ({ row }) => (
                <>
                    <IconButton onClick={() => handleEdit(row)} variant="contained">
                        <EditIcon />
                    </IconButton>

                    <IconButton onClick={() => handleDelete(row.id)} variant="contained">
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    let couponSchema = object({
        address: string().required(),
        email: string().email().required(),
        phone: number().min(10, "Please enter valid mobile number").required(),
    });

    const formik = useFormik({
        initialValues: {
            address: "",
            email: "",
            phone: "",
        },
        validationSchema: couponSchema,
        onSubmit: (values, { resetForm }) => {

            if (update) {

            } else {
                contactContext.addContact(values)
            }
            resetForm();
            handleClose();
        },
    });

    const { handleBlur, handleChange, handleSubmit, values, touched, errors } =
        formik;
    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Contact
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Contact</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="address"
                            name="address"
                            label="Enter address"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                            error={touched.address && errors.address ? true : false}
                            helperText={
                                touched.address && errors.address ? errors.address : ""
                            }
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            name="email"
                            label="email"
                            type="email"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            error={touched.email && errors.email ? true : false}
                            helperText={touched.email && errors.email ? errors.email : ""}
                        />
                        <TextField
                            margin="dense"
                            id="phone"
                            name="phone"
                            label="phone"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                            error={touched.phone && errors.phone ? true : false}
                            helperText={
                                touched.phone && errors.phone ? errors.phone : ""
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>

            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={contactContext.contact}
                    columns={columns}
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

export default Contact;