import React from "react"
import { Paper } from "react-md"
import { css } from "react-emotion"

const AuthLayout = ({ children }) => (
  <div className={layoutCss}>
    <Paper zDepth={3} className={cardCss}>
      {children}
    </Paper>
  </div>
)

export default AuthLayout

const layoutCss = css`
  width: 100%;
  height: 100%;
  background-color: mediumorchid;
  display: flex;
  justify-content: center;
  align-items: center;
`

const cardCss = css`
  min-width: 40rem;
  background: #fff;
`
