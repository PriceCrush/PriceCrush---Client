import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    :root {
        --custom-orange: #FF5C00;
    }
    html {
        font-size: 62.5%;
    }
`;

export default GlobalStyle;
