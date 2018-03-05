import React, {Component} from 'react';
import {connect} from 'react-redux';
import Footer from '../layout/footer';
import {sendExampleAction, resetStore} from '../../actions/exampleActions';
import SubjectCard from "./subject-card";
import {Switch, Router, Route} from 'react-router-dom';
import {fetchAllSubjects} from "../../actions/subjectActions";
import styled from 'styled-components';

const SubjectsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

class Home extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.fetchAllSubjects();
    }

    componentDidMount() {
    }

    render(){

        const subjects = this.props.subjects;

        let subjectIds = subjects.allIds;

        if(subjectIds.length > 0) {
            
            //display subscribed subjects first
            subjectIds.sort(function (a, b) {
                if (subjects.byId[a].subscribed) {
                    return -1;
                } else if (subjects.byId[b].subscribed) {
                    return 1;
                }
                return 0;

            });
        }
        
        const subjectsList = subjectIds.map(id => <SubjectCard key={id} subject={subjects.byId[id]}/>);

        return (
            <div>
                <SubjectsContainer>
                    {subjectsList}
                </SubjectsContainer>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        subjects: state.subjects
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchAllSubjects: () => dispatch(fetchAllSubjects()),
    }
}

//connect allows you to reference the store
export default connect(mapStateToProps, mapDispatchToProps)(Home);