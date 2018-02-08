import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`

`;

const ResourceContainer = styled.div`
    width: 33%;
    margin: auto;
`;

const ResourceBody = styled.div`
    flex-direction: column;
    display: flex;
    padding-left: 20px;
    padding-right: 20px;
`;

const ActionButton = styled.button`
    background-color: #239b88;
    color: white;
    padding: 12px;
    margin-top: 12px;
    margin-left: 12px;
    margin-right: 12px;
    font-weight: bold;
    font-size: 20px;
`;

class Resource extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <ResourceContainer>
                    <h1><b>HTML Best Practices</b></h1>
                    <div>
                        <b>Links To: </b>
                        <a href="https://github.com/hail2u/html-best-practices" target="_blank"> https://github.com/hail2u/html-best-practices </a>
                    </div>
                    <ResourceBody>
                        <img src="http://via.placeholder.com/300x250"/>
                        <ActionButton> Add to Tasks </ActionButton>
                        <ActionButton> Rate </ActionButton>
                        <ActionButton> Comment </ActionButton>
                        <ActionButton> Report </ActionButton>
                    </ResourceBody>

                </ResourceContainer>
            </Container>
        )
    }
}

export default Resource;