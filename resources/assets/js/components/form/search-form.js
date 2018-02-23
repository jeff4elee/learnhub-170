import React, {Component} from 'react';
import {connect} from 'react-redux';
import {searchResource} from "../../actions/resourceActions";
import styled from 'styled-components';

const FormContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 5%;
    justify-content: center;
`;

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {searchValue: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({searchValue: event.target.value});
    }

    handleSubmit(event) {
        this.props.searchResource(this.state.searchValue);
        event.preventDefault();
    }

    render() {
        return (

            <FormContainer>
                <form onSubmit={this.handleSubmit}>
                        Search:
                        <input type="text" value={this.state.searchValue} onChange={this.handleChange}/>
                    <input type="submit" value="Submit"/>
                </form>
            </FormContainer>

        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        searchResource: searchTerm => dispatch(searchResource(searchTerm)),
    }
}

//connect allows you to reference the store
export default connect(null, mapDispatchToProps)(SearchForm);