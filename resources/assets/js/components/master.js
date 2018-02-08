import React, {Component} from 'react';
import {connect} from 'react-redux';
import Footer from './footer';
import Home from "./home";
import ResourceForm from "./resource-form";
import {Switch, Route} from 'react-router-dom';
import SubjectBoard from "./subject-board";
import Resource from "./resource";
import styled from 'styled-components';

const Container = styled.div`
    margin: 0;
    padding: 0;
`;

class Master extends Component {
    constructor(props){
        super(props);
    }

    render(){

        return (
            <Container>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/resource-form' component={ResourceForm}/>
                    <Route path='/subject/:number' component={SubjectBoard}/>
                    <Route path='/resource/:number' component={Resource}/>
                    {/* both /roster and /roster/:number begin with /roster */}
                    {/*<Route path='/roster' component={Roster}/>*/}
                    {/*<Route path='/schedule' component={Schedule}/>*/}
                </Switch>
                <Footer/>
            </Container>
        )
    }
}

//connect allows you to reference the store
export default Master;