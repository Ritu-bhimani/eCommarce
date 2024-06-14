import { Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../../redux/slice/counter.slice';

function Counter(props) {

    const countVal = useSelector(state => state.count_slice)
    console.log(countVal);

    const dispatch = useDispatch()

    const handleInc = () => {
        dispatch(increment())
    }

    const handleDec = () => {
        dispatch(decrement())
    }

    return (
        <div style={{ marginTop: "200px" }}>

            <Button onClick={handleInc}>+</Button>
            {countVal.count}
            <Button onClick={handleDec}>-</Button>
        </div>
    );
}

export default Counter;