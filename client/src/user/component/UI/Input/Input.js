import React from 'react';
import { InputBox, SpanError } from './input.styled';

function Input({ errorText, ...res }) {
    return (
        <>
            <InputBox {...res} />

            <SpanError >
                {errorText}
            </SpanError>
        </>
    );
}

export default Input;