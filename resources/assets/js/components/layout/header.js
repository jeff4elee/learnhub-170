import React from 'react';
import styled from 'styled-components';
import FaArrowLeft from 'react-icons/lib/fa/arrow-left';
import { NavLink } from 'react-router-dom'
import history from '../../history';

const StyledHeader = styled.div`
    box-shadow: 0 4px 8px -2px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: #F5F5F5;
`;

const StyledLink = styled(NavLink)`
    color: white;
`;

const HeaderItem = styled.h1`
    font-family: Helvetica;
    font-size: 40px;    
    color: #239b88;
    margin-top: 0;
    letter-spacing: -3px;
    font-weight: 600;
    padding: 0;
    margin: 0;
`;


export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StyledHeader>
                <FaArrowLeft onClick={() => history.goBack()}/>
                <HeaderItem>
                    BigBub
                </HeaderItem>
            </StyledHeader>
        );
    }
}