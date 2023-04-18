import { createGlobalStyle } from "styled-components";
import { motion } from "framer-motion";
const GlobalStyles = createGlobalStyle`

  :root {
    --color-main-background: #fff;
    --color-secondary: #edf0f2;
    --color-accent: #ceff1a;
    --font-heading: 'Alegreya Sans', Arial, Helvetica, sans-serif;
    --font-body: 'Poppins', Arial, Helvetica, sans-serif;
  }

  /* Reset styles */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Set default font family, size, and line height */
  body {
    font-family: var(--font-body);
    font-size: 1em;
    line-height: 1.5;
  }

  /* Set background color for entire page */
  body {
    background-color: var(--color-main-background);
  }

  /* Headings */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font-heading);
    font-weight: bold;
    line-height: 1.2;
  }

  h1 {
    font-size: 2.5em;
  }

  h2 {
    font-size: 2em;
  }


  /* Links */
  a {
    color: black;
    text-decoration: none;
  }

  a:hover {
    color: #444444;
  }

  /* Buttons */
  button {
    background-color:#10355f;
    color: white;
    cursor: pointer;
    font-size: 1em;
    font-weight: 100;
    padding: 10px;
    transition: all 0.3s ease;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px black solid;
    width:150px;
    border-radius:5px;

    &:hover {
        background-color:transparent;
        color:#10355f;
        transition:0.5s;
    }
  }

  /* Navigation */
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
  }

  nav ul {
    display: flex;
    list-style: none;
  }

  nav li {
    margin-right: 24px;
  }

  nav a {
    color: #333;
    font-size: 1.2em;
    font-weight: bold;
  }

`;

export default GlobalStyles;
