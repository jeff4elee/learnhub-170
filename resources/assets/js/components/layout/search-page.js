import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import SearchForm from '../form/search-form';
import ResourceList from './resource-list';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5%;
    justify-content: center;
`;


class SearchPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <Container>
                <SearchForm/>
                <ResourceList resourceIds={this.props.resources.searchIds}/>
            </Container>

        );
    }
}


function mapStateToProps(state) {
    return {
        resources: state.resources
    }
}

//connect allows you to reference the store
export default connect(mapStateToProps, null)(SearchPage);