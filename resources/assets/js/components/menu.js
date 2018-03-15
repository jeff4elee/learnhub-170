import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchOwnedResources} from '../actions/resourceActions';
import styled from 'styled-components';
import {logoutUser} from "../actions/userActions";
import history from '../history';
import EditableResourceList from './layout/editable-resource-list';


const Layout = styled.div`
    display: flex;
    flex-direction: column;
    margin: 4%;
    margin-top: 0;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 2%;
    justify-content: center;
`;

const BootButton = styled.button`
    background-color: #239b88;
    color: white;
    display: inline-flex;
    font-weight: bold;
    font-size: 120%;
    padding: 2% 5%;
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

class Menu extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount() {
        if (!this.props.resources.fetchedOwn) {
            this.props.fetchOwnedResources();
        }
    }

    handleLogout() {
        this.props.logoutUser().then(() => {
            history.push("/");
        })
    }

    render() {

        const ownedResources = this.props.resources.myIds;

        return (
            <Layout>
                <h3 style={{color: "#474747"}}><b> My Resources </b></h3>
                <EditableResourceList resourceIds={ownedResources}/>

                <br/>

                <ButtonContainer>
                    <BootButton onClick={() => {
                        this.handleLogout()
                    }}> Logout </BootButton>
                </ButtonContainer>
            </Layout>


        );
    }
}

function mapStateToProps(state) {
    return {
        resources: state.resources
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: () => dispatch(logoutUser()),
        fetchOwnedResources: () => dispatch(fetchOwnedResources())
    }
}


//connect allows you to reference the store
export default connect(mapStateToProps, mapDispatchToProps)(Menu);