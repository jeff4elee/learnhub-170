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

const ResourceBody = styled.div`
    flex-direction: column;
    display: flex;
    padding-left: 20px;
    padding-right: 20px;
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
                    <div><b>Links To: </b> https://github.com/hail2u/html-best-practices</div>
                    <ResourceBody>
                        <img src="http://via.placeholder.com/300x250"/>
                    </ResourceBody>
                </ResourceContainer>
            </Container>
        )
    }
}

export default Resource;