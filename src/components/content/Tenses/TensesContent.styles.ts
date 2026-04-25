/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import styled from 'styled-components';

export const TenseTimeline = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
    margin-top: 20px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const TenseItem = styled.div<{ borderColor: string }>`
    background: white;
    border-radius: 12px;
    padding: 25px;
    border-left: 6px solid ${props => props.borderColor};
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0,0,0,0.06);

    &:hover {
        transform: translateY(-5px) translateX(5px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
`;

export const TenseTitleContainer = styled.div`
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 8px;
`;

export const TenseChinese = styled.div`
    font-size: 1.2em;
    font-weight: bold;
    color: #2d3748;

    @media (max-width: 768px) {
        font-size: 1.1em;
    }
`;

export const TenseEnglish = styled.div`
    font-size: 1.1em;
    color: #4a5568;

    @media (max-width: 768px) {
        font-size: 1em;
    }
`;

export const TenseDescription = styled.div`
    font-size: 0.95em;
    color: #718096;
    padding-left: 2px;

    @media (max-width: 768px) {
        font-size: 0.9em;
    }
`;