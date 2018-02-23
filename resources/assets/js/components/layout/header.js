import React from 'react';
import styled from 'styled-components';
import FaArrowLeft from 'react-icons/lib/fa/arrow-left';
import {NavLink} from 'react-router-dom'
import history from '../../history';

const HeaderSection = styled.div`
`;

const StyledHeader = styled.div`
    box-shadow: 0 4px 8px -2px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: row;
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

const HeaderLeft = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 2.2%;
    width: 20%;
`;

const HeaderCenter = styled.h1`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Helvetica;
    font-size: 36px;    
    color: #239b88;
    letter-spacing: -3px;
    font-weight: 600;
    margin: 0;
    padding: 0;
    width: 60%;
`;

const HeaderRight = styled.h1`
    flex: 1
    display: flex;
    width: 20%;
`;

const BackButton = styled(FaArrowLeft)`
    left: 5px;
`;

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StyledHeader>
                <HeaderLeft>
                    {
                        this.props.hasBack && <BackButton size={30} onClick={() => history.goBack()}/>
                    }
                </HeaderLeft>
                <HeaderCenter>
                    Resource Hub
                </HeaderCenter>
                <HeaderRight>

                </HeaderRight>
            </StyledHeader>
        );
    }
}