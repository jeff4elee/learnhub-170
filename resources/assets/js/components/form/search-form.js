import React, {Component} from 'react';
import {connect} from 'react-redux';
import {search} from "../../actions/subjectActions";
import styled from 'styled-components';
import FaSearch from 'react-icons/lib/fa/search';

const Input = styled.input`

    border-color: transparent;
    border: none;
    border-bottom: 3px solid #474747;
    background-color: transparent;
    padding-left: 5px;

    &:focus {
        border-bottom: 3px solid #239b88;
        outline: none;
        color: #239b88;
    }
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    // margin: 5%;
    justify-content: space-evenly;
    width: 100%;
`;


const BootButton = styled.button`
    background-color: #239b88;
    color: white;
    display: inline-flex;
    font-weight: bold;
    padding: 4% 20%;
    margin-left: 5%;

    justify-content: center;
    border: none;
    border-radius: 2px;
    outline: none;
    letter-spacing: 1px;

    &:hover {
        background-color: #166357;
    }

`;

const SearchButton = styled.button`
    color: white;
    background-color: #239b88;
    border: none;
    border-radius: 0 5px 5px 0;
    border-color: #239b88;
    text-align: center;
    line-height: 2.5em;
`;


const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: row;
`;

const Search = styled.input`
    flex-grow: 1;


    border-color: transparent;
    border: none;
    border: 2px solid #239b88;
    border-radius: 5px 0 0 5px;    
    padding-left: 2%;

    &:focus {
        outline: none;
    }
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
                    {/*<input type="submit" value="Submit"/>*/}
                    <SearchButton type="submit">

                            <FaSearch size={20}/>
                    </SearchButton>
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