import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import ResourceCard from "../content/resource-card";

const ResourcesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

class ResourceList extends Component {
    constructor(props) {
        super(props);
    }

    render(){

        const resources = this.props.resources.byId;
        
        let resourcesList = [];
        if(this.props.resourceIds) {
            resourcesList = this.props.resourceIds.map(id => <ResourceCard analytics={this.props.analytics} key={id} resource={resources[id]}/>);
        }
        return (
            <ResourcesContainer>
                {resourcesList}
            </ResourcesContainer>
        )
    }
}

function mapStateToProps(state){
    return {
        resources: state.resources,
    }
}

export default connect(mapStateToProps, null)(ResourceList);