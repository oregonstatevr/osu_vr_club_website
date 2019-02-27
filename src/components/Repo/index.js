import styled, {css} from 'styled-components'
import React from 'react'

const StyledRepo = styled.div`
    display: flex;

`

const FullName = styled.div`
    display: flex;
`
const Tag = styled.div`
    display: flex;
    border-radius: 5px;
    background: #FF0;
    padding: 5px;
    align-items: center;
    justify-content: center;
    margin: 2px; 5px;
    box-shadow: 0px 0px 5px #dadada;
`

const Repo = ({repo})=>{
    return (
        <StyledRepo>
            <FullName>{repo.full_name}</FullName>
            {repo.language && <Tag>{repo.language}</Tag>}
        </StyledRepo>
    )
}

export default Repo