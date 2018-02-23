import React, {Component} from 'react';
import {connect} from 'react-redux';
import {searchResource} from "../../actions/resourceActions";
import styled from 'styled-components';

const Input = styled.input`

    border-color: transparent;
    border: none;
    border-bottom: 3px solid #474747;
    background-color: transparent;

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
                    <div style={{float: 'left'}}>
                        <Input type="text" value={this.state.searchValue} onChange={this.handleChange} placeholder="Search"/>
                    </div>
                    <div style={{float: 'right'}}>
                        <BootButton type="submit">Submit</BootButton>
                    </div>
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