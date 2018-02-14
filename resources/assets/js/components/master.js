import React, {Component} from 'react';
import {connect} from 'react-redux';
import Footer from './footer';
import Header from './header';
import Home from "./home";
import ResourceForm from "./resource-form";
import SearchForm from "./search-form";
import Menu from "./menu";
import TaskBoard from "./task-board";
import LoginPage from "./login-page";
import RegistrationPage from "./registration-page";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import SubjectBoard from "./subject-board";
import Resource from "./resource";
import styled from 'styled-components';

const Container = styled.div`
    height:100%;
`;

const FlexSwitch = styled(Switch)`
    overflow:scroll;
    height:90%;
    padding-bottom:60px;
    position:relative;
`;

class Master extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Container>
                <Header/>
                {this.props.user !== null ?
                    <div>
                        <FlexSwitch>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/task-board' component={TaskBoard}/>
                            <Route exact path='/resource-form' component={ResourceForm}/>
                            <Route exact path='/search-form' component={SearchForm}/>
                            <Route exact path='/menu' component={Menu}/>
                            <Route path='/subject/:id' component={SubjectBoard}/>
                            <Route path='/resource/:id' component={Resource}/>

                            {/* both /roster and /roster/:number begin with /roster */}
                            {/*<Route path='/roster' component={Roster}/>*/}
                            {/*<Route path='/schedule' component={Schedule}/>*/}
                        </FlexSwitch>
                        <Footer/>
                    </div>
                    :
                    <Switch>
                        <Route exact path='/' component={LoginPage}/>
                        <Route exact path='/register' component={RegistrationPage}/>
                    </Switch>
                }
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user
    };
}

//connect allows you to reference the store
export default withRouter(connect(mapStateToProps, null)(Master));