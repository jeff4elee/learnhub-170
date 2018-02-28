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

const HeaderLeft = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 2.2%;
`;

const HeaderCenter = styled.h1`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Helvetica;
    font-size: 40px;    
    color: #239b88;
    letter-spacing: -3px;
    font-weight: 600;
    margin: 0;
    padding: 0;
`;

const HeaderRight = styled.h1`
    flex: 1
    display: flex;
    width: 33.4%;
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
                <div style={{}}>
                    <FaArrowLeft size={30} onClick={() => history.goBack()}/>
                </div>
                <HeaderCenter>
                    BigBub
                </HeaderCenter>

                {/*Used for flexbox centering*/}
                <div style={{visibility: 'hidden'}}>
                    <FaArrowLeft size={30}/>
                </div>
            </StyledHeader>
        );
    }
}