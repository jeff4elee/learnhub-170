import React, {Component} from 'react';
import {connect} from 'react-redux';
import {search} from "../../actions/subjectActions";
import styled from 'styled-components';

const FormContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0%;
    justify-content: center;
`;

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: row;
`;

const Search = styled.input`
    flex-grow: 1;
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
        if(this.state.searchValue.length !== 0) {
            this.props.search(this.state.searchValue);
        }
        event.preventDefault();
    }

    render() {
        return (

            <FormContainer>
                <Form onSubmit={this.handleSubmit}>
                        <Search type="text" placeholder="Search" value={this.state.searchValue} onChange={this.handleChange}/>
                    <input type="submit" value="Submit"/>
                </Form>
            </FormContainer>

        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        search: searchTerm => dispatch(search(searchTerm)),
    }
}

//connect allows you to reference the store
export default connect(null, mapDispatchToProps)(SearchForm);