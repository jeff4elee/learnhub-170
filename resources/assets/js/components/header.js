import React from 'react';
import styled from 'styled-components';
import FaHome from 'react-icons/lib/fa/home';
import FaStar from 'react-icons/lib/fa/star';
import PlusCircle from 'react-icons/lib/fa/plus-circle';
import FaSearch from 'react-icons/lib/fa/search';
import FaList from 'react-icons/lib/fa/list';
import { NavLink } from 'react-router-dom'

const StyledHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: fixed;
    left: 0;
    width: 100%;
    height: 60px;
    position: fixed;
    background-color: #ccd3e0;
`;

const StyledLink = styled(NavLink)`
    color: white;
`;

const HeaderItem = styled.h1`
    font-family: Helvetica;
    font-size: 50px;    
    color: #239b88;
    margin-top: 0;
    letter-spacing: -3px;
    font-weight: 600;
`;

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <StyledHeader>
                <HeaderItem>
                    BigBub
                </HeaderItem>
            </StyledHeader>
        );
    }
}