import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addCoupon, deleteCoupon, editCoupon, getCoupon } from "../../../redux/slice/coupon.slice";

function Coupon(props) {

    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = useState(false);

    const dispatch = useDispatch();

    const coupon = useSelector(state => state.coupon);
    console.log(coupon);

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

        dispatch(deleteCoupon(id))
    };

    useEffect(() => {
        dispatch(getCoupon())
    }, [])

    const columns = [
        { field: "coupon", headerName: "Coupon", width: 70 },
        { field: "persantage", headerName: "Per", width: 130 },
        { field: "expiry", headerName: "Expiry", width: 130 },
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
        coupon: string().required(),
        persantage: number().required().positive().integer(),
        expiry: date().required(),
    });

    const formik = useFormik({
        initialValues: {
            coupon: "",
            persantage: "",
            expiry: "",
        },
        validationSchema: couponSchema,
        onSubmit: (values, { resetForm }) => {

            if (update) {
                dispatch(editCoupon(values))
            } else {
                dispatch(addCoupon(values))
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
                Coupon
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Coupon</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            name="coupon"
                            label="Coupon Code"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.coupon}
                            error={touched.coupon && errors.coupon ? true : false}
                            helperText={
                                touched.coupon && errors.coupon ? errors.coupon : ""
                            }
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            name="persantage"
                            label="persantage"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.persantage}
                            error={touched.persantage && errors.persantage ? true : false}
                            helperText={touched.persantage && errors.persantage ? errors.persantage : ""}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            name="expiry"
                            label="expiry"
                            type="date"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.expiry}
                            error={touched.expiry && errors.expiry ? true : false}
                            helperText={
                                touched.expiry && errors.expiry ? errors.expiry : ""
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
                    rows={coupon.coupon}
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

export default Coupon;