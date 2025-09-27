/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import styled from 'styled-components';

export const AppContainer = styled.div`
    padding: 20px;
`;

export const Header = styled.header`
    text-align: center;
    margin-bottom: 50px;
    h1 {
        color: #2d3748;
        font-size: 3em;
        text-shadow: none;
        margin-bottom: 20px;

        @media (max-width: 768px) {
            font-size: 2.2em;
            margin-bottom: 30px;
        }
    }
`;

export const CardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 20px;
        padding: 10px;
    }
`;