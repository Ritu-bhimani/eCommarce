import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { bestSellerContext } from '../../../context/bestSellerContext';

export default function BestSeller() {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()

    const BestSellerContext = useContext(bestSellerContext);
    console.log(BestSellerContext);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        BestSellerContext.getBestSeller()
    }, [])

    let bestSellerSchema = object({
        name: string().required(),
        rating: number().required()
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            rating: '',
        },
        validationSchema: bestSellerSchema,

        onSubmit: values => {
            BestSellerContext.addBestSeller(values)
        }
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik

    const handleEdit = () => {

    };

    const handleDelete = (id) => {
        BestSellerContext.deleteBestSeller(id)
    };


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'rating', headerName: 'Rating', width: 130 },
        {
            field: 'Action',
            headerName: 'Action',
            width: 130,
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

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>BestSeller</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>

                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Name"
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
                            id="rating"
                            name="rating"
                            label="Rating"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.rating}
                            error={errors.rating && touched.rating ? true : false}
                            helperText={errors.rating && touched.rating ? errors.rating : ''}
                        />

                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Add</Button>
                        </DialogActions>

                    </DialogContent>
                </form>

            </Dialog>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={BestSellerContext.bestSeller}
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
