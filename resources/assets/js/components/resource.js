import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`

`;

const ResourceContainer = styled.div`
    padding-top: 10px;
    width: 33%;
    margin: auto;
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
                </ResourceContainer>
            </Container>
        )
    }
}

export default Resource;