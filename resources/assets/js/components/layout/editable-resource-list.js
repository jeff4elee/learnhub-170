import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import ResourceCard from "../content/resource-card";
import FaTrash from "react-icons/lib/fa/trash";
import FaX from "react-icons/lib/fa/times-circle";

const ResourcesContainer = styled.div`
    display: flex;
    flex-direction: column;
    
    
`;

const EditableCardLayout = styled.div`
    display: flex;


    // margin: 0;
`;

const TrashBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 2.5%;
    color: #AD2109;
    
    // padding-left: 5%;
`;

class EditableResourceList extends Component {
    constructor(props) {
        super(props);
    }

    render(){

        const resources = this.props.resources.byId;
        
        let resourcesList = [];
        if(this.props.resourceIds) {
            resourcesList = this.props.resourceIds.map(id =>
                <EditableCardLayout key={id}>
                    <ResourceCard analytics={this.props.analytics} resource={resources[id]}/>
                    <TrashBox><FaX size={28}/></TrashBox>
                </EditableCardLayout>
            );
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

export default connect(mapStateToProps, null)(EditableResourceList);