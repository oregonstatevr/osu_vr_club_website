import React from 'react'
import {withRouter} from 'react-router-dom'
import UserCard from 'components/UserCard'
import styled from 'styled-components'
import Repo from 'components/Repo'

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
`

class Info extends React.Component {
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
                    {
                        this.state.repos.map((repo, key)=>{
                            return <Repo key={key} repo={repo} />
                        })
                    }
                <Title>Members</Title>
                <Members>
                    {users.map((user, key)=>{
                        return <UserCard key={key} user={user}/>
                    })}
                </Members>
            </React.Fragment>
        )
    }

}

export default withRouter(Info)