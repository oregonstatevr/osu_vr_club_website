import styled, {css} from 'styled-components'
import React from 'react'

const StyledRepo = styled.div`
    display: flex;
    flex-direction: column;
    height: 300px;
    min-width: 200px;
    width: 200px;
    box-shadow: 0px 0px 10px #dadada;
    font-family: sans-serif;
    margin: 5px;
    padding: 5px;
`

const FullName = styled.div`
    display: flex;
    font-family: sans-serif;
    font-weight: bold;
    align-self: center;
    justify-content: center;
`
const Tag = styled.div`
    display: flex;
    border-radius: 5px;
    flex-direction: column;
    background: #FF0;
    padding: 5px;
    align-items: center;
    justify-content: center;
    margin: 2px; 5px;
    box-shadow: 0px 0px 5px #dadada;
    margin-top: auto;
`

const Repo = ({repo})=>{
    return (
        <StyledRepo>
            <a href={repo.clone_url} target="_blank"><FullName> <i className="fas fa-link"></i> {repo.full_name}</FullName></a>
            {repo.language && <Tag>{repo.language}</Tag>}
        </StyledRepo>
    )
}

export default Repo