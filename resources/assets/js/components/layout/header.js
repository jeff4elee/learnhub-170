import React from 'react';
import styled from 'styled-components';
import FaArrowLeft from 'react-icons/lib/fa/arrow-left';
import {NavLink, Route, Switch} from 'react-router-dom'
import history from '../../history';

const HeaderSection = styled.div`
`;

const StyledHeader = styled.div`
    box-shadow: 0 4px 8px -2px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
`;

const HeaderCenter = styled.h1`
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

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

`;

const HeaderRight = styled.h1`
    display: flex;
    width: 20%;
`;

const BackButton = styled(FaArrowLeft)`
    margin-left: 2.2%;
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

                <ImageContainer>
                    <img style={{maxHeight:"85%", width:"auto"}} src="images/RH_Logo_Crop.png"/>
                </ImageContainer>

                    {/*<img style={{maxHeight:"85%", width:"auto"}} src="images/RH_Logo.png"/>*/}
                
                <HeaderLeft style={{visibility: "hidden"}}>
                    {
                        this.props.hasBack && <BackButton size={30} onClick={() => history.goBack()}/>
                    }
                </HeaderLeft>
            </StyledHeader>
        );
    }
}