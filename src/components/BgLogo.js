import React from 'react'

import './BgLogo.css'
import gopher from '@/img/gopher.svg'

const BgLogo = (props) => (
  <>
    <img src={gopher} className="BgLogo-gopher" alt="gopher" />
    <p className="BgLogo-copyright">
    gopher.svg was created by <a href="https://twitter.com/tenntenn">>Takuya Ueda</a>.<br />
    The Go gopher was designed by <a href="http://reneefrench.blogspot.com/">Renee French</a>.
    </p>
  </>
)

export default BgLogo