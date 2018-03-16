import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchFeed} from "../../actions/resourceActions";
import {fetchPopular} from "../../actions/subjectActions";
import styled from 'styled-components';
import ResourceList from '../layout/resource-list';
import SubjectList from '../layout/subject-list';

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


const EmptyDisplay = styled.div`
    text-align: center;
    margin: 5%;
`;

class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (this.props.resources.feedUrl === null) {
            this.props.fetchFeed();
            this.props.fetchPopular();
        }
    }

    render() {

        const resources = this.props.resources;

        let resourceIds = resources.feedIds;
        let display = <EmptyDisplay> You're not subscribed to any non-empty topics! </EmptyDisplay>;

        const byId = this.props.subjects.byId;

        function sort(arr) {
            return arr.concat().sort(function(p1, p2) { return byId[p2].subscribers - byId[p1].subscribers; });
        }

        const topSubjects = sort(this.props.subjects.allIds).slice(0, 5);

        return (
            <div>
                <SubHeader>Resource Feed</SubHeader>
                {resourceIds.length === 0 ? display : <ResourceList resourceIds={resourceIds}/>}
                <SubHeader>Suggested Topics</SubHeader>
                <SubjectList analytics={false} subjectIds={topSubjects}/>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        resources: state.resources,
        subjects: state.subjects
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchFeed: () => dispatch(fetchFeed()),
        fetchPopular: () => dispatch(fetchPopular())
    }
}

//connect allows you to reference the store
export default connect(mapStateToProps, mapDispatchToProps)(Home);