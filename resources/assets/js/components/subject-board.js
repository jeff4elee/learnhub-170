import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import ResourceCard from "./resource-card";

const ResourcesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

class SubjectBoard extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <ResourcesContainer>
                <ResourceCard/>
                <ResourceCard/>
            </ResourcesContainer>
        )
    }
}

export default SubjectBoard;