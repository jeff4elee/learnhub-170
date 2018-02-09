import React, {Component} from 'react';
import {connect} from 'react-redux';
import Footer from './footer';
import Header from './header';
import Home from "./home";
import ResourceForm from "./resource-form";
import SearchForm from "./search-form";
import Menu from "./menu";
import TaskBoard from "./task-board";
import {Switch, Route} from 'react-router-dom';
import SubjectBoard from "./subject-board";
import Resource from "./resource";
import styled from 'styled-components';
import MetaTags from 'react-meta-tags';

const Container = styled.div`
`;


class Master extends Component {
    constructor(props){
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
        // console.log(this.state);
    }

    render(){

        return (
            <div width={this.state.width} height={this.state.height}>
                <Header/>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/task-board' component={TaskBoard}/>
                    <Route exact path='/resource-form' component={ResourceForm}/>
                    <Route exact path='/search-form' component={SearchForm}/>
                    <Route exact path='/menu' component={Menu}/>
                    <Route path='/subject/:number' component={SubjectBoard}/>
                    <Route path='/resource/:number' component={Resource}/>
                    {/* both /roster and /roster/:number begin with /roster */}
                    {/*<Route path='/roster' component={Roster}/>*/}
                    {/*<Route path='/schedule' component={Schedule}/>*/}
                </Switch>
                <Footer width={this.state.width} height={this.state.height}/>
            </div>
        )
    }
}

//connect allows you to reference the store
export default Master;