import React from 'react'
import styled from 'styled-components'

const AppHeader = (props) => (
  <Header>
    <h1>Struct 2 Type</h1>
    <p>Convert your golang struct to TS type.</p>
  </Header>
)

export default AppHeader

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: calc(10px + 2vmin);
  color: white;
`