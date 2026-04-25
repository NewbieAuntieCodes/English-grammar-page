/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import styled from 'styled-components';

export const ClauseProgression = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 20px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const ClauseStep = styled.div<{ color: string }>`
    background: white;
    border-radius: 15px;
    padding: 25px 25px 25px 40px;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0,0,0,0.06);
    position: relative;

    &:before {
        content: '';
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        height: calc(100% - 30px);
        width: 10px;
        border: 3px solid ${props => props.color};
        border-right: none;
        border-radius: 10px 0 0 10px;
    }

    &:hover {
        transform: translateX(10px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
`;

export const IntroClauseStep = styled(ClauseStep)`
    grid-column: 1 / -1;
    background: #f0f7ff;
`;

export const ClauseTitleContainer = styled.div`
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 8px;
`;

export const LessonTitleChinese = styled.div`
    font-size: 1.3em;
    font-weight: bold;
    color: #2d3748;

    @media (max-width: 768px) {
        font-size: 1.1em;
    }
`;

export const LessonTitleEnglish = styled.div`
    font-size: 1.3em;
    color: #4a5568;

    @media (max-width: 768px) {
        font-size: 1.1em;
    }
`;

export const ClauseDescription = styled.div`
    font-size: 1em;
    color: #718096;
    font-style: italic;
    padding-left: 5px;

    @media (max-width: 768px) {
        font-size: 0.9em;
    }
`;