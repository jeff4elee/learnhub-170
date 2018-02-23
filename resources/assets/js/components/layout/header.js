import React from 'react';
import styled from 'styled-components';
import FaArrowLeft from 'react-icons/lib/fa/arrow-left';
import { NavLink } from 'react-router-dom'
import history from '../../history';

const StyledHeader = styled.div`
    box-shadow: 0 4px 8px -2px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    background-color: #F5F5F5;
    padding-left: 3%
`;

const StyledLink = styled(NavLink)`
    color: white;
`;

const HeaderItem = styled.h1`
    font-family: Helvetica;
    font-size: 40px;    
    color: #239b88;
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
                <div style={{}}>
                    <FaArrowLeft size={30} onClick={() => history.goBack()}/>
                </div>
                <HeaderItem>
                    BigBub
                </HeaderItem>

                {/*Used for flexbox centering*/}
                <div style={{visibility: 'hidden'}}>
                    <FaArrowLeft size={30}/>
                </div>
            </StyledHeader>
        );
    }
}