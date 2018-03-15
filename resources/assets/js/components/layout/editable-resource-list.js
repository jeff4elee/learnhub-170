import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {deleteResource} from "../../actions/resourceActions";
import ResourceCard from "../content/resource-card";
import FaX from "react-icons/lib/fa/times-circle";
import Modal from 'react-modal';

const NotificationModal = styled(Modal)`
    position: absolute;
    float: left;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 85%;
    height: 25%;
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-content:center;

    background-color: #239b88;
    // background-color: #F5F5F5;
    // background-color: red;

    // border: 2px solid transparent;
    border-radius: 5px;

    outline: none;
    text-align: center;

    color: white;
    // color: #474747;

    font-weight: bold;
    font-size: 20px;

`;

const Button = styled.button`
    border: none;
    border: 2px solid transparent;
    // border-radius: 5px;
    background-color: #239b88;
    // color: #AD2109;
    color: white;
    // width: 80%;
    padding: 0;
    margin: 0;
`;

const ResourcesContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const EditableCardLayout = styled.div`
    display: flex;
`;

const TrashBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 2.5%;
    color: #AD2109;
`;

class EditableResourceList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIsOpen: false,
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    openModal(id) {
        let newState = {
            modalIsOpen: true,
            id: id
        };

        

        this.setState(newState);
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    deleteResource(id){
        this.props.deleteResource(id).then(()=>{this.closeModal();});
        // this.closeModal();
    }
    render(){

        const resources = this.props.resources.byId;
        
        let resourcesList = [];
        if(this.props.resourceIds) {
            resourcesList = this.props.resourceIds.map(id =>
                <EditableCardLayout key={id}>
                    <ResourceCard analytics={this.props.analytics} resource={resources[id]}/>
                    <TrashBox><FaX size={28} onClick={() => this.openModal(id)}/></TrashBox>
                </EditableCardLayout>
            );
        }
        return (
            <div>
                <ResourcesContainer>
                    {resourcesList}
                </ResourcesContainer>

                <NotificationModal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    ariaHideApp={false}>
                        
                    <p>Do you want to delete this resource?</p>
                    {/*<Button style={{backgroundColor: "red", borderColor:"red"}} onClick={() => this.deleteResource(this.state.id)}>Yes, delete this resource</Button>*/}
                    <Button style={{backgroundColor: "#AD2109"}} onClick={() => this.deleteResource(this.state.id)}>Yes, delete this resource</Button>
                    {/*<Button onClick={() => this.deleteResource()}>Yes, delete this resource</Button>*/}
                    {/*<Button onClick={() => this.closeModal()}>No, leave it</Button>*/}
                    <Button style={{color: "white"}} onClick={() => this.closeModal()}>No, leave it</Button>
                </NotificationModal>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        resources: state.resources,
    }
}

function mapDispatchToProps(dispatch){
    return{
        deleteResource: (resource_id) => dispatch(deleteResource(resource_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditableResourceList);