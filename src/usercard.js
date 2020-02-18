import styled, {css} from 'styled-components'
import React from 'react'

const StyledUserCard = styled.div`
    display: flex;
    flex-direction: column;
    height: 300px;
    width: 200px;
    box-shadow: 0px 0px 10px #dadada;
    font-family: sans-serif;
    &>div{
        padding: 10px;
    }
`

const Main = styled.div`
    display: flex;
    flex-basis: 50%;
    ${
        props => css`
            background-image: url(${props.photo});
        `
    };
    background-repeat: no-repeat, repeat;
    background-position: center;
    background-size: cover;
`

const Details = styled.div`
    display: flex;
    flex-basis: 50%;
    flex-direction: column;

    & .tag-names{
        display: flex;
        width: 100%;
        height: 30px;
        flex-wrap: wrap;
    }
`

const Name = styled.div`
    display: flex;
    padding: 5px;
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


const UserCard = ({user})=>{
    return (
        <StyledUserCard>
            <Main photo={user.photo}>
            </Main>
            <Details>
                <Name>
                    {user.name}
                </Name>
                <div className="tag-names">
                    {
                        user.tags.map((element, key)=>{
                            return (
                                <Tag key={key}>
                                    {element}
                                </Tag>
                            )
                        })
                    }
                </div>
            </Details>
        </StyledUserCard>
    )
}

export default UserCard