import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .wrap {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
    background-color: #f3f3f3;
    font-size: 14px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`

export default GlobalStyles
