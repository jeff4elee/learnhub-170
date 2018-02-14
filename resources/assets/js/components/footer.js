import React from 'react';
import styled from 'styled-components';
import FaHome from 'react-icons/lib/fa/home';
import FaStar from 'react-icons/lib/fa/star';
import PlusCircle from 'react-icons/lib/fa/plus-circle';
import FaSearch from 'react-icons/lib/fa/search';
import FaList from 'react-icons/lib/fa/list';
import { NavLink } from 'react-router-dom'

const StyledFooter = styled.footer`
    bottom: 0;
    left: 0;
    height: 6%;
    width: 100%;
    background-color: #F5F5F5;
    position: fixed;
`;

const FooterList = styled.ul`
    margin-left: -40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const StyledLink = styled(NavLink)`
    color: black;
`;

const FooterItem = styled.li`
    align-self: center;
    color: black;
    border-left: thin solid #b2b5ba;
    border-right: thin solid #b2b5ba;
    display: block;
    padding: 0% 4.78% 0% 4.78%;
    line-height: 60px;
    margin: 0;
`;

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StyledFooter>
                <FooterList>

                    <FooterItem>
                        <StyledLink exact activeStyle={{ color: "#239B88" }} to='/'>
                            <FaHome size={40}/>
                        </StyledLink>
                    </FooterItem>

                    <FooterItem>
                        <StyledLink activeStyle={{ color: "#239B88" }} to='/task-board'>
                            <FaStar size={40}/>
                        </StyledLink>
                    </FooterItem>

                    <FooterItem>
                        <StyledLink activeStyle={{ color: "#239B88" }} to='/resource-form'>
                            <PlusCircle size={40}/>
                        </StyledLink>
                    </FooterItem>

                    <FooterItem>
                        <StyledLink activeStyle={{ color: "#239B88" }} to='/search-form'>
                            <FaSearch size={40}/>
                        </StyledLink>
                    </FooterItem>

                    <FooterItem>
                        <StyledLink activeStyle={{ color: "#239B88" }} to='/menu'>
                            <FaList size={40}/>
                        </StyledLink>
                    </FooterItem>

                </FooterList>
            </StyledFooter>
        );
    }
}