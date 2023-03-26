import React from 'react';
import  styled  from 'styled-components';

interface textProps{
    text : string;
}

const ButtonBox = styled.button`

    
`

const Button = ({text, onClick}) => {
    return (<ButtonBox onClick={onClick} >{text}</ButtonBox>);
};

export default Button;