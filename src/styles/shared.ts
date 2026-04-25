/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import styled from 'styled-components';

// --- Shared Modal Header Components ---
export const ContentHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 3px solid #f1f3f4;

    @media (max-width: 768px) {
        margin-bottom: 20px;
        padding-bottom: 15px;
    }
`;

export const ContentIcon = styled.div`
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    @media (max-width: 768px) {
        margin-right: 15px;
        transform: scale(0.9);
    }
`;

export const ContentTitle = styled.div`
    font-size: 2.2em;
    font-weight: bold;
    color: #2d3748;
    margin-bottom: 5px;

    @media (max-width: 768px) {
        font-size: 1.8em;
    }
`;

export const ContentSubtitle = styled.div`
    font-size: 1.3em;
    color: #718096;
    font-style: italic;

    @media (max-width: 768px) {
        font-size: 1.1em;
    }
`;