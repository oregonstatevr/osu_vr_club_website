import React from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components';
import Repo from './repo'
import UserCard from './usercard'
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter 
} from 'react-router-dom';

const users = [
    {
        photo: "stock_user.jpg",
        name: "John Doe",
        tags: ["abc", "QwErrtytgthtjfefet"]
    },
    {
        photo: "stock_user.jpg",
        name: "Jane Doe",
        tags: ["abcAdwadefregergerger", "QwErrtytgthtjfefet"]
    }
]

const Members = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    &>div{
        margin: 5px;
    }
`

const Title = styled.div`
    font-family: sans-serif;
    font-weight: bold;
    margin: 5px;
`

const Repos = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const MapParent = styled.div`
    display:block;
    width: 300px;
    height: 300px;
`
const Marker = styled.div`
    display: block;
`

const mapProps = {
    center: {
      lat: 44.563689,
      lng: -123.2785985
    },
    zoom: 11
};

class Page extends React.Component {
    constructor(){
        super();
        this.state = {
            repos: []
        }
    }
    componentDidMount(){
        // https://api.github.com/orgs/osuvr/repos
        fetch("https://api.github.com/orgs/osuvr/repos")
        .then(response=>{
            const repos = response.json();
            repos.then(repos => {this.setState({repos: repos})})
            .catch(error=>console.error(error))
        })
        .catch(error=>console.error(error))

    }
    render(){
        return(
            <React.Fragment>       
                {this.state.repos.length > 0 && <Title>Projects</Title>}
                <Repos>
                    {
                        this.state.repos.map((repo, key)=>{
                            return <Repo key={key} repo={repo} />
                        })
                    }
                </Repos>
                <Title>Members</Title>
                <Members>
                    {users.map((user, key)=>{
                        return <UserCard key={key} user={user}/>
                    })}
                </Members>
                <Title>Location</Title>
                <MapParent>

                </MapParent>
            </React.Fragment>
        )
    }

}

export default withRouter(Page)