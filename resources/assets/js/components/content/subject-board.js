import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import ResourceCard from "./resource-card";
import {fetchSubject} from "../../actions/subjectActions"

const ResourcesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TitleContainer = styled.div`
    width = 90%;
    text-align = left;
    padding-left: 5%;
`;

const Title = styled.h2`
    font-size: 30px;
    font-weight: bold;
    color: #474747;
`;

const SubHeader = styled.div`
    display: flex;

    width = 90%;
    text-align = left;

    padding-left: 5%;
    padding-right: 5%;

    padding-bottom: 0;

    justify-content: space-between;
    font-weight: bold;
`;

class SubjectBoard extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.props.fetchSubject(this.props.match.params.id);
    }

    render(){
        const subject = this.props.subjects.byId[this.props.match.params.id];
        const resources = this.props.resources;


        let resourcesList = [];

        if(subject.resources) {
            resourcesList = subject.resources.map(id => <ResourceCard key={id} resource={resources.byId[id]}/>);
        }

        return (
            <div>
                <TitleContainer>
                    <Title>
                        {subject.title}
                    </Title>
                </TitleContainer>

                <SubHeader>
                    <div>
                        Resource
                    </div>

                    <div>
                        Rating
                    </div>
                </SubHeader>

                <ResourcesContainer>
                    {resourcesList}
                </ResourcesContainer>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        resources: state.resources,
        subjects: state.subjects
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchSubject: (subjectId) => dispatch(fetchSubject(subjectId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectBoard);