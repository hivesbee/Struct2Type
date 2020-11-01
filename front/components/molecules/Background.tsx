import React from 'react'
import styled from 'styled-components'

import Gopher from '../atoms/Gopher'

const Background = (props) => (
  <>
    <Gopher />
    <CopyRight>
    gopher.svg was created by <Link href="https://twitter.com/tenntenn">Takuya Ueda</Link>.<br />
    The Go gopher was designed by <Link href="http://reneefrench.blogspot.com/">Renee French</Link>.
    </CopyRight>
  </>
)

export default Background

const CopyRight = styled.p`
  position: absolute;
  left: 30rem;
  bottom: 0;
  text-align: left;
  color: #000000;
  font-weight: bold;
  opacity: 0.1;
`

const Link = styled.a`
  &:link, &:visited, &:hover, &:active {
    color: #000000;
  }
`