import React from 'react';
import styled from 'styled-components';
import FaHome from 'react-icons/lib/fa/home';
import FaStar from 'react-icons/lib/fa/star';
import PlusCircle from 'react-icons/lib/fa/plus-circle';
import FaSearch from 'react-icons/lib/fa/search';
import FaList from 'react-icons/lib/fa/list';
import { NavLink } from 'react-router-dom'

const StyledHeader = styled.header`
    position: fixed;
    left: 0;
    width: 100%;
    height: 60px;
    position: fixed;
    background-color: blue; //#ccd3e0;
`;

const FooterList = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: center;
    align-content: center;
`;

const StyledLink = styled(NavLink)`
    color: white;
`;

const FooterItem = styled.li`
    align-self: center;
    color: white;
    border-left: thin solid #b2b5ba;
    border-right: thin solid #b2b5ba;
    display: block;
    padding: 0px 40px 0px 40px;
    line-height: 60px;
    margin: 0;
`;

const HeaderItem = styled.h1`
    font-family: Helvetica;
    font-size: 100px;    
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