import React, {Component} from 'react';
import {connect} from 'react-redux';
import Footer from './footer';
import Header from './header';
import Home from "../content/home";
import ResourceForm from "../form/resource-form";
import SearchPage from "./search-page";
import Menu from "../menu";
import TaskBoard from "../task/task-board";
import LoginPage from "../auth/login-page";
import RegistrationPage from "../auth/registration-page";
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import SubjectBoard from "../content/subject-board";
import Resource from "../content/resource";
import styled from 'styled-components';
import { resumeSession } from "../../actions/userActions";
import { resetStore } from "../../actions/exampleActions";
import history from '../../history';

const Container = styled.div`
    height:100%;
    overflow:hidden;
    position:relative;
`;

const Body = styled.div`
    overflow:scroll;
    height:90%;
    padding-bottom:60px;
    position:relative;
`;

class Master extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.props.resumeSession().then(() => {
        }).catch((err) => {
            this.props.resetStore();
            history.push('/');
        });
    }

    render() {

        return (
            <div style={{ fontFamily: 'Helvetica' }}>
                <Header/>
                {this.props.user !== null ?
                    <Container>
                        <Body>
                            <Switch>
                                <Route exact path='/' component={Home}/>
                                <Route exact path='/task-board' component={TaskBoard}/>
                                <Route exact path='/resource-form' component={ResourceForm}/>
                                <Route exact path='/search' component={SearchPage}/>
                                <Route exact path='/menu' component={Menu}/>
                                <Route path='/subject/:id' component={SubjectBoard}/>
                                <Route path='/resource/:id' component={Resource}/>

                                {/* both /roster and /roster/:number begin with /roster */}
                                {/*<Route path='/roster' component={Roster}/>*/}
                                {/*<Route path='/schedule' component={Schedule}/>*/}
                            </Switch>
                        </Body>
                        <Footer/>
                    </Container>
                    :
                    <Switch>
                        <Route exact path='/' component={LoginPage}/>
                        <Route exact path='/register' component={RegistrationPage}/>
                    </Switch>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        resumeSession: () => dispatch(resumeSession()),
        resetStore: () => dispatch(resetStore())
    }
}

//connect allows you to reference the store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Master));
