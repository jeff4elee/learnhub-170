import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchFeed} from "../../actions/resourceActions";
import styled from 'styled-components';
import ResourceList from '../layout/resource-list';

const SubHeader = styled.h2`
    font-size: 20px;
    font-weight: bold;
    color: #474747;
    width: 90%;
    text-align: left;
    padding-left: 5.5%;
    padding-right: 5.5%;
    margin-top: 6%;
`;

class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (this.props.resources.feedUrl === null) {
            this.props.fetchFeed();
        }
    }

    render() {

        const resources = this.props.resources;

        let resourceIds = resources.feedIds;
        let display = <div> There's nothing here </div>;

        if (resourceIds.length > 0) {
            display = <ResourceList resourceIds={resourceIds}/>;
        }

        return (
            <div>
                <SubHeader>Resource Feed</SubHeader>
                {display}
            </div>
        )
    }
}

function mapStateToProps(state) {
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