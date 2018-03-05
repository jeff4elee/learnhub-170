import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import SubjectCard from "../content/subject-card";

const SubjectsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

class SubjectList extends Component {
    constructor(props) {
        super(props);
    }

    render(){

        const subjects = this.props.subjects.byId;
        
        let subjectsList = [];
        if(this.props.subjectIds) {
            subjectsList = this.props.subjectIds.map(id => <SubjectCard key={id} subject={subjects[id]}/>);
        }
        return (
            <SubjectsContainer>
                {subjectsList}
            </SubjectsContainer>
        )
    }
}

function mapStateToProps(state){
    return {
        subjects: state.subjects,
    }
}

export default connect(mapStateToProps, null)(SubjectList);