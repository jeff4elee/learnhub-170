import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import SearchForm from '../form/search-form';
import SubjectList from './subject-list';
import ResourceList from './resource-list';
import {fetchPopular} from '../../actions/subjectActions';
import ReactGA from 'react-ga';

// ReactGA.pageview(window.location.pathname + window.location.search);

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2%;
    justify-content: center;
`;

const SubtitleText = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-left: 2.5%;
    margin-top: 2.5%;
    color: #474747;
`;

const SearchOptions = styled.div`
    display: flex;
    flex-direction: row;
    margin: 2%;
    justify-content: center;
`;

const Option = styled.div`
    margin: 0% 2.5%;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
`;

const StyledBreak = styled.hr`
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #aaa;
    margin: auto;
    margin-top: 3%;
    margin-bottom: 3%;
    padding: 0;
    width: 99%;
`;

const EmptyDisplay = styled.div`
    text-align: center;
    margin: 5%;
`;

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topicSearch: true,
            resourceSearch: false,
        };
        this.toggleToTopicSearch = this.toggleToTopicSearch.bind(this);
        this.toggleToResourceSearch = this.toggleToResourceSearch.bind(this);
    }

    toggleToTopicSearch() {
        this.setState({
            topicSearch: true,
            resourceSearch: false,
        })
    }

    toggleToResourceSearch() {
        this.setState({
            topicSearch: false,
            resourceSearch: true,
        })
    }

    componentWillMount() {
        this.props.fetchPopular();
    }

    render() {

        const byId = this.props.subjects.byId;

        function sort(arr) {
            return arr.concat().sort(function (p1, p2) {
                return byId[p2].subscribers - byId[p1].subscribers;
            });
        }

        // const topSubjects = sort(this.props.subjects.allIds).slice(0, 5);
        const subscribedSubjects = sort(this.props.subjects.allIds.filter(id => byId[id].subscribed));

        return (

            <Container>
                <SearchForm/>
                {/*<SubtitleText> Search Results By </SubtitleText>*/}
                <SearchOptions>
                    <b style={{color: "#474747"}}>Search results by: </b>
                    <Option style={this.state.topicSearch === true ? {
                        color: "#239b88",
                        borderBottom: "1px solid #aaa"
                    } : {color: "#636B6F"}}
                            onClick={() => this.toggleToTopicSearch()}>Topic</Option>

                    <Option style={this.state.resourceSearch === true ? {
                        color: "#239b88",
                        borderBottom: "1px solid #aaa"
                    } : {color: "#636B6F"}}
                            onClick={() => this.toggleToResourceSearch()}>Resource</Option>
                </SearchOptions>

                {this.state.topicSearch === true &&
                <SubjectList analytics={false} subjectIds={this.props.subjects.searchIds}/>
                }
                {this.state.topicSearch === true && this.props.subjects.emptySearch &&
                <EmptyDisplay>No matching subjects...</EmptyDisplay>
                }

                {this.state.resourceSearch === true &&
                <ResourceList analytics={false} resourceIds={this.props.resources.searchIds}/>
                }

                {this.state.resourceSearch === true && this.props.resources.emptySearch &&
                <EmptyDisplay>No matching resources...</EmptyDisplay>
                }

                <StyledBreak/>
                <SubtitleText> My Topic Subscriptions </SubtitleText>
                <SubjectList analytics={false} subjectIds={subscribedSubjects}/>
            </Container>

        );
    }
}

function mapStateToProps(state) {
    return {
        subjects: state.subjects,
        resources: state.resources
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPopular: () => dispatch(fetchPopular())
    }
}

//connect allows you to reference the store
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);