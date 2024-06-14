import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { addReview, deleteReview, getReview, updateReview } from '../../../redux/action/review.action';
import { ThemeContext } from '../../../context/ThemeContext';
import { useContext } from 'react';

function Review(props) {

    const [update, setUpdate] = useState(false);

    const dispatch = useDispatch()

    const reviewVal = useSelector(state => state.reviews)
    console.log(reviewVal);

    const themeContext = useContext(ThemeContext);
    console.log(themeContext);

    let reviewSchema = object({
        name: string().required(),
        email: string().email().required(),
        reviews: string().required(),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            reviews: '',
        },

        validationSchema: reviewSchema,

        onSubmit: (values, { resetForm }) => {
            if (update) {
                dispatch(updateReview(values))
            } else {
                dispatch(addReview(values))
            }

            resetForm()
        },
    });

    useEffect((v) => {

        dispatch(getReview())
    }, [])

    const { handleSubmit, handleChange, handleBlur, touched, errors, values } = formik

    const columns = [
        { field: 'name', headerName: 'Name', width: 70 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'reviews', headerName: 'Reviews', width: 130 },
        { field: 'rating', headerName: 'Rating', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => (handleDelete(params.row.id))}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => (handleEdit(params.row))}>
                        <EditIcon />
                    </IconButton>
                </>
            )
        },
    ];

    const handleDelete = (id) => {
        dispatch(deleteReview(id))
    }

    const handleEdit = (data) => {
        setUpdate(true)
        formik.setValues(data)
    }

    return (
        <div>
            <div className="container-fluid py-5 mt-5">
                <div className="container py-5">
                    <div className="row g-4 mb-5"></div>
                    <form onSubmit={handleSubmit}>
                        <h4 className="mb-5 fw-bold">Leave a Reply</h4>
                        <div className="row g-4">
                            <div className="col-lg-6" >
                                <div className="border-bottom rounded">
                                    <input
                                        type="text"
                                        className={`form-control border-0 me-4 ${themeContext.theme}`}
                                        placeholder="Your Name *"
                                        name='name'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                    />
                                    {errors.name && touched.name ? <span style={{ color: 'red' }}>{errors.name}</span> : null}
                                </div>
                            </div>
                            <div className="col-lg-6" >
                                <div className="border-bottom rounded">
                                    <input
                                        type="email"
                                        className={`form-control border-0 ${themeContext.theme}`}
                                        placeholder="Your Email *"
                                        name='email'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}

                                    />
                                    {errors.email && touched.email ? <span style={{ color: 'red' }}>{errors.email}</span> : null}
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="border-bottom rounded my-4">
                                    <textarea
                                        name='reviews'
                                        id className={`form-control border-0 ${themeContext.theme}`}
                                        cols={30}
                                        rows={8}
                                        placeholder="Your Review *"
                                        spellCheck="false"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.reviews}
                                    />
                                    {errors.reviews && touched.reviews ? <span style={{ color: 'red' }}>{errors.reviews}</span> : null}
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="d-flex justify-content-between py-3 mb-5">
                                    <div className="d-flex align-items-center">
                                        <p className="mb-0 me-3">Please rate:</p>
                                        <div className="d-flex align-items-center" style={{ fontSize: 12 }}>
                                            <i className="fa fa-star text-muted" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn border border-secondary text-primary rounded-pill px-4 py-3"> Post Comment</button>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={reviewVal.reviews}
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
                </div>
            </div>
        </div >
    );
}

export default Review;