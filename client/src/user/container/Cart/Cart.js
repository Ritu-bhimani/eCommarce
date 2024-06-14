import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../redux/action/products.action';
import { decrementqnt, deleteData, incrementqnt } from '../../../redux/slice/cart.slice';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { getCoupon } from '../../../redux/slice/coupon.slice';
import { useState } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { useContext } from 'react';
import Button from '../../component/UI/Button/Button';

function Cart(props) {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart);
    const product = useSelector(state => state.products);
    const coupon = useSelector(state => state.coupon)
    const [discount, setDiscount] = useState(0)

    const themeContext = useContext(ThemeContext);
    console.log(themeContext);

    useEffect(() => {
        dispatch(getProducts())
        dispatch(getCoupon())

        // handleShipping()
    }, [])

    const cartData = cart.cart.map((v) => {

        const productData = product.products.find((v1) => v1.id === v.p_id)
        return { ...productData, quantity: v.quantity }
    })

    const cartQuantity = cartData.reduce((acc, v) => v.quantity * v.price + acc, 0);

    const discountVal = (((cartQuantity * discount) / 100).toFixed(2))
    const Total = (cartQuantity - discountVal);
    const shipping = cartQuantity <= 50 ? 100 : 0;
    const totalAmount = (Total + shipping);


    const handleCoupon = (data) => {
        let flag = 0;
        let discount = 0;

        coupon.coupon.map((v) => {
            if (v.coupon === data.coupon) {

                const currentDate = new Date()
                const expiryDate = new Date(v.expiry)

                if (currentDate <= expiryDate) {
                    flag = 1
                    discount = v.persantage
                    setDiscount(discount)
                } else {
                    flag = 2
                }
            }
        })

        if (flag === 0) {
            formik.setFieldError('coupon', "Invalid Coupon.")
        } else if (flag === 1) {
            formik.setFieldError('coupon', `Coupon applied successfully. You got ${discount}% discount`);
        } else if (flag === 2) {
            formik.setFieldError('coupon', "Coupon is expired.")
        }



    }

    const handleInc = (productId) => {
        dispatch(incrementqnt(productId));
    };

    const handleDec = (productId) => {
        dispatch(decrementqnt(productId));
    };

    const handleDelete = (id) => {
        dispatch(deleteData(id))
    }

    let couponSchema = object({
        coupon: string().required("Please enter coupon."),
    });

    const formik = useFormik({
        initialValues: {
            coupon: ''
        },
        validationSchema: couponSchema,
        onSubmit: values => {
            handleCoupon(values)
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

    return (
        <div>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Cart</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Cart</li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Cart Page Start */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Products</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            {
                                cartData.map((v) => (

                                    <tr>
                                        <th scope="row">
                                            <div className="d-flex align-items-center">
                                                <img src={v.image} className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80, borderRadius: 0 }} alt />
                                            </div>
                                        </th>
                                        <td>
                                            <p className="mb-0 mt-4">{v.name}</p>
                                        </td>
                                        <td>
                                            <p className="mb-0 mt-4">$ {v.price}</p>
                                        </td>
                                        <td>
                                            <div className="input-group quantity mt-4" style={{ width: 100 }}>
                                                <div className="input-group-btn">
                                                    <button onClick={() => handleDec(v.id)} className="btn btn-sm btn-minus rounded-circle border">
                                                        <i className="fa fa-minus" />
                                                    </button>
                                                </div>
                                                {/* <span defaultValue={1} >{v.quantity}</span> */}
                                                <span className={`form-control form-control-sm text-center border-0 ${themeContext.theme}`}  >
                                                    {v.quantity}
                                                </span>
                                                <div className="input-group-btn">
                                                    <button onClick={() => handleInc(v.id)} className="btn btn-sm btn-plus rounded-circle border">
                                                        <i className="fa fa-plus" />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="mb-0 mt-4">{(v.price * v.quantity).toFixed(2)}</p>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelete(v.id)} className="btn btn-md rounded-circle border mt-4">
                                                <i className="fa fa-times text-danger" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                    <div className="mt-5">
                        <form onSubmit={handleSubmit}>
                            <input
                                name='coupon'
                                type="text"
                                className={`border-0 border-bottom rounded me-5 py-3 mb-4 ${themeContext.theme}`}
                                placeholder="Coupon Code"
                                value={values.coupon}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Button
                                btnDisabled = {true}
                                type="submit">
                                Apply Coupon
                            </Button>
                            {
                                errors.coupon && touched.coupon ? <span style={{ display: "block", color: "red" }}>{errors.coupon}</span> : null
                            }
                        </form>
                    </div>
                    <div className="row g-4 justify-content-end">
                        <div className="col-8" />
                        <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                            <div className="rounded">
                                <div className="p-4">
                                    <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="mb-0 me-4">Subtotal:</h5>
                                        <p className="mb-0">${cartQuantity}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h5 className="mb-0 me-4">Shipping</h5>
                                        <div className>
                                            <p className="mb-0">{shipping}</p>
                                        </div>
                                    </div>
                                    <p className="mb-0 text-end">Shipping to Ukraine.</p>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="mb-0 me-4">Discount:</h5>
                                        <p className="mb-0">${discountVal}</p>
                                    </div>
                                </div>
                                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                    <h5 className="mb-0 ps-4 me-4">Total</h5>
                                    <p className="mb-0 pe-4">${totalAmount}</p>
                                </div>
                                <Button
                                    btnType="primary"
                                >
                                    Proceed Checkout
                                </Button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Cart Page End */}
        </div>

    );
}

export default Cart;