import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchFeed} from "../../actions/resourceActions";
import styled from 'styled-components';
import ResourceList from '../layout/resource-list';

class Home extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        if(this.props.resources.feedUrl === null){
        this.props.fetchFeed();
        }
    }

    render(){

        const resources = this.props.resources;

        let resourceIds = resources.feedIds;
        
        return (
                <ResourceList resourceIds={resourceIds}/>
        )
    }
}

function mapStateToProps(state){
    return {
        resources: state.resources
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchFeed: () => dispatch(fetchFeed()),
    }
}

//connect allows you to reference the store
export default connect(mapStateToProps, mapDispatchToProps)(Home);