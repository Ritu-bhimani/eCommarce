import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { AddFacilities, DeleteFacilities, EditFacilities, isLoading } from '../../../redux/action/facilities.action';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { Spinner } from 'reactstrap';

function Facilities(props) {
    const [update, setUpdate] = useState(false)

    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()

    const facilitiesVal = useSelector(state => state.facilities);
    console.log(facilitiesVal);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm()
        setUpdate(false)
    };

    let facilitiesSchema = object({
        name: string().required(),
        description: string().required(),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },

        validationSchema: facilitiesSchema,

        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(EditFacilities(values))
            } else {
                const rNo = Math.floor(Math.random() * 1000)
                dispatch(AddFacilities({ ...values, id: rNo }))
            }

            resetForm()
            handleClose()
        },
    });

    const { handleBlur, handleChange, handleSubmit, values, errors, touched } = formik

    const handleDelete = (id) => {
        dispatch(DeleteFacilities(id))
    }

    const handleEdit = (data) => {
        formik.setValues(data);
        setOpen(true);
        setUpdate(true)
    }

    const columns = [
        { field: 'name', headerName: 'Facilities name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => (handleEdit(params.row))}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => (handleDelete(params.row.id))}>
                        <DeleteIcon />
                    </IconButton>

                </>
            ),

        }
    ];

    return (
        <>
            {
                facilitiesVal.isLoading ?
                    <Spinner >
                        Loading...
                    </Spinner> :
                    <>
                        <Button
                            style={
                                { marginBottom: '20px' }
                            }
                            variant="outlined"
                            onClick={handleClickOpen}>
                            Add facilities
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                        >
                            <DialogTitle>Facilities</DialogTitle>
                            <form onSubmit={handleSubmit}>
                                <DialogContent>
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        name="name"
                                        label="Facilities name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        error={errors.name && touched.name ? true : false}
                                        helperText={errors.name && touched.name ? errors.name : ''}
                                    />

                                    <TextField
                                        margin="dense"
                                        id="description"
                                        name="description"
                                        label="Facilities description"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description}
                                        error={errors.description && touched.description ? true : false}
                                        helperText={errors.description && touched.description ? errors.description : ''}
                                    />

                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                                    </DialogActions>
                                </DialogContent>
                            </form>
                        </Dialog>


                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={facilitiesVal.facilities}
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
            }
        </>
    );
}

export default Facilities;