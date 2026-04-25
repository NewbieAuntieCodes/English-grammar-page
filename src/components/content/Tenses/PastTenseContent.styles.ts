/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import styled, { css } from 'styled-components';

// --- Rule Section ---
export const RuleContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;
    margin: 30px 0;

    @media (max-width: 860px) {
        grid-template-columns: 1fr;
    }
`;

export const RuleCard = styled.div<{ themeColor: string }>`
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 15px;
    padding: 25px;
    border-top: 5px solid ${props => props.themeColor};
`;

export const RuleTitle = styled.h3`
    font-size: 1.3em;
    font-weight: bold;
    color: #2d3748;
    margin-bottom: 10px;
`;

export const RuleExplanation = styled.p`
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 20px;
`;

export const ExamplePair = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
`;

export const Verb = styled.span`
    background: #fff;
    border: 1px solid #dee2e6;
    padding: 8px 15px;
    border-radius: 8px;
    font-weight: 500;
    font-size: 1.05em;
    color: #495057;
`;

export const Arrow = styled.span<{ themeColor: string }>`
    font-size: 1.5em;
    color: ${props => props.themeColor};
    font-weight: bold;
`;

// --- Spelling Rules Section ---
export const SpellingRulesSection = styled.div`
    margin: 30px 0;
`;

export const SpellingTable = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr 2fr;
    background: #fff;
    border-radius: 15px;
    overflow: hidden;
    border: 1px solid #e9ecef;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const TableHeader = styled.div<{ themeColor: string }>`
    background: rgba(${props => props.themeColor.substring(1).match(/.{1,2}/g)?.map(v => parseInt(v, 16)).join(',')}, 0.1);
    color: ${props => props.themeColor};
    font-weight: bold;
    padding: 15px;
    text-align: center;
    border-bottom: 1px solid #e9ecef;
`;

export const TableCell = styled.div`
    padding: 15px;
    border-bottom: 1px solid #e9ecef;
    color: #4a5568;
    display: flex;
    align-items: center;
    justify-content: center;

    &:last-child {
        border-bottom: none;
    }

    @media (max-width: 768px) {
        border-right: none;
        justify-content: flex-start;
        &:not(:last-child) {
            border-bottom: 1px solid #e9ecef;
        }
    }
`;

export const TableRow = styled.div`
    display: contents;
    
    &:last-child ${TableCell} {
        border-bottom: none;
    }

    @media (max-width: 768px) {
        display: block;
        border-bottom: 2px solid #ced4da;
        &:last-child {
            border-bottom: none;
        }
    }
`;

// --- Story Selector Styles ---
export const StorySelector = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
    margin: 20px 0;
`;

export const StoryButton = styled.button<{ isActive: boolean, themeColor: string }>`
    padding: 12px 25px;
    border: 2px solid ${props => props.isActive ? props.themeColor : '#e0e0e0'};
    background: ${props => props.isActive ? props.themeColor : 'white'};
    color: ${props => props.isActive ? 'white' : '#4a5568'};
    border-radius: 25px;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
`;
