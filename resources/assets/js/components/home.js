import React, {Component} from 'react';
import {connect} from 'react-redux';
import Footer from './footer';
import {sendExampleAction, resetStore} from '../actions/exampleActions';
import SubjectCard from "./subject-card";
import {Switch, Router, Route} from 'react-router-dom';
import styled from 'styled-components';

const SubjectsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

class Home extends Component {
    constructor(props){
        super(props);

        this.dispatchExampleAction = this.dispatchExampleAction.bind(this);
    }

    dispatchExampleAction(){
        this.props.sendExampleAction();
    }

    componentWillMount(){
        this.props.resetStore();
    }

    componentDidMount() {
    }


    render(){

        const example = this.props.example;
        const exampleList = example.allIds.map(id => <div key={id}> Dispatched: {example.byId[id]} </div>);

        return (
            <div>
                {/*<button onClick={() => this.dispatchExampleAction()}>CLICK</button>*/}
                {/*{exampleList}*/}

                <SubjectsContainer>
                    <SubjectCard/>
                    <SubjectCard/>
                    <SubjectCard/>
                    <SubjectCard/>
                    <SubjectCard/>
                </SubjectsContainer>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        example: state.example
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendExampleAction: () => dispatch(sendExampleAction()),
        resetStore: () => dispatch(resetStore())
    }
}


//connect allows you to reference the store
export default connect(mapStateToProps, mapDispatchToProps)(Home);