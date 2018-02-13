import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import ResourceCard from "./resource-card";
import {fetchResources} from "../actions/resourceActions"

const ResourcesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

class SubjectBoard extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.props.fetchResources(this.props.match.params.id);
    }

    render(){

        const resources = this.props.resources;
        const resourcesList = resources.allIds.map(id => <ResourceCard key={id} resource={resources.byId[id]}/>);

        return (
            <ResourcesContainer>
                {resourcesList}
            </ResourcesContainer>
        )
    }
}

function mapStateToProps(state){
    return {
        resources: state.resources
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchResources: (subjectId) => dispatch(fetchResources(subjectId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectBoard);