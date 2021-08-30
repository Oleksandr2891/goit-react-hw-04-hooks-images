import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
html {
  box-sizing: border-box;
  width: 100vw;
  /* overflow-x: hidden; */
}

*,
*::after,
*::before {
  box-sizing: inherit;
}

body {
  margin: 0;
  font-family: -apple - system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen - Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans - serif;
  color: #212121;
  background-color: #fff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1,
h2,
h3,
p {
  margin-top: 0;
  margin-bottom: 0;
}

ul,
ol {
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
}

img {
  display: block;
  max-width: 100%;
  height: auto;

}

.list {
  list-style: none;
}


.App {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
}

`;
