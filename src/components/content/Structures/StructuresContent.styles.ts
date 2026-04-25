/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import styled from 'styled-components';

export const LessonList = styled.ul`
    list-style: none;
`;

export const LessonItem = styled.li<{ borderColor: string }>`
    background: white;
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 20px;
    border-left: 5px solid ${props => props.borderColor};
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0,0,0,0.06);

    &:hover {
        transform: translateX(10px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
`;

export const LessonTitleChinese = styled.div`
    font-size: 1.2em;
    font-weight: bold;
    color: #2d3748;
    margin-bottom: 5px;

    @media (max-width: 768px) {
        font-size: 1.1em;
    }
`;

export const LessonTitleEnglish = styled.div`
    font-size: 1em;
    color: #718096;

    @media (max-width: 768px) {
        font-size: 0.9em;
    }
`;