import React from 'react';
import styled from 'styled-components';
import FaHome from 'react-icons/lib/fa/home';
import FaStar from 'react-icons/lib/fa/star';
import PlusCircle from 'react-icons/lib/fa/plus-circle';
import FaSearch from 'react-icons/lib/fa/search';
import FaList from 'react-icons/lib/fa/list';
import { NavLink } from 'react-router-dom'

const StyledFooter = styled.footer`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    position: fixed;
    background-color: #ccd3e0;
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

export default class Footer extends React.Component {
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
            <StyledFooter>
                <FooterList>
                    <FooterItem>
                        <StyledLink exact activeStyle={{ color: "#424b72" }} to='/'>
                            <FaHome size={40}/>
                        </StyledLink>
                    </FooterItem>

                    <FooterItem><FaStar size={40}/></FooterItem>

                    <FooterItem>
                        <StyledLink activeStyle={{ color: "#424b72" }} to='/resource-form'>
                            <PlusCircle size={40}/>
                        </StyledLink>
                    </FooterItem>

                    <FooterItem><FaSearch size={40}/></FooterItem>
                    <FooterItem><FaList size={40}/></FooterItem>
                </FooterList>
            </StyledFooter>
        );
    }
}