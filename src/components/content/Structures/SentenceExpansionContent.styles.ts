/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import styled, { keyframes, css } from 'styled-components';

const hexToRgb = (hex: string) => {
    let c: any = hex.substring(1).split('');
    if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',');
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ExampleSwitcher = styled.div`
    display: flex;
    justify-content: center;
    background-color: #f0f2f5;
    border-radius: 25px;
    padding: 5px;
    margin: 20px auto 30px;
    max-width: 500px;
`;

export const SwitcherButton = styled.button<{ isActive: boolean, themeColor: string }>`
    flex: 1;
    padding: 12px 20px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    
    ${props => props.isActive
        ? css`
            background-color: ${props.themeColor};
            color: white;
            box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
        `
        : css`
            background-color: transparent;
            color: #718096;
            &:hover {
                background-color: #e2e8f0;
            }
        `
    }
`;

export const ExpansionContainer = styled.div`
    margin: 30px 0;
    position: relative;
    padding-left: 30px; 

    &::before {
        content: '';
        position: absolute;
        left: 10px;
        top: 20px;
        bottom: 20px;
        width: 4px;
        background: linear-gradient(to bottom, #ffdde1, #ee9ca7);
        border-radius: 2px;
    }
`;

export const ExpansionStep = styled.div`
    background: #fff;
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 25px;
    position: relative;
    box-shadow: 0 5px 20px rgba(0,0,0,0.05);
    animation: ${fadeIn} 0.5s ease-out forwards;
    border: 1px solid #f0f2f5;

    &::before {
        content: attr(data-step);
        position: absolute;
        left: -30px;
        top: 25px;
        transform: translateX(-50%);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #ff6b6b;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2em;
        border: 4px solid white;
        box-shadow: 0 0 10px rgba(255, 107, 107, 0.5);
    }
`;

export const StepHeader = styled.div`
    font-size: 1.3em;
    font-weight: bold;
    color: #2d3748;
    margin-bottom: 5px;
`;

export const StepExplanation = styled.div`
    font-size: 1em;
    color: #718096;
    margin-bottom: 20px;
    font-style: italic;
`;

export const SentenceBlock = styled.div`
    background: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    font-size: 1.2em;
    color: #4a5568;
    line-height: 1.6;

    strong {
        font-weight: bold;
        color: #ff6b6b;
        background: rgba(255, 107, 107, 0.1);
        padding: 3px 6px;
        border-radius: 5px;
    }
`;

export const RuleSection = styled.div<{ themeColor: string }>`
    background: linear-gradient(135deg, rgba(${props => hexToRgb(props.themeColor)}, 0.1), rgba(${props => hexToRgb(props.themeColor)}, 0.03));
    border-radius: 15px;
    padding: 25px;
    margin: 40px 0 30px 0;
    border-left: 5px solid ${props => props.themeColor};
    animation: ${fadeIn} 0.5s ease-out forwards;
`;

export const RuleTitle = styled.h3`
    font-size: 1.4em;
    font-weight: bold;
    color: #2d3748;
    margin-bottom: 10px;
`;

export const RuleExplanation = styled.p`
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 25px;
`;

export const RuleDiagram = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
    margin-bottom: 25px;
`;

export const RuleBox = styled.div`
    background: white;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    border: 1px solid #e2e8f0;
    flex: 1;
    min-width: 150px;

    h4 {
        font-size: 1.1em;
        color: #2d3748;
        margin-bottom: 8px;
    }

    span {
        font-size: 0.85em;
        color: #718096;
        font-style: italic;
    }
`;

export const RuleArrow = styled.div`
    font-size: 2em;
    color: #cbd5e0;
    font-weight: bold;
    
    @media (max-width: 600px) {
        display: none;
    }
`;


export const RuleExample = styled.div`
    background: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    margin-top: 10px;

    p {
        font-weight: bold;
        color: #4a5568;
        margin-bottom: 15px;
    }

    div {
        font-size: 1.1em;
        color: #2d3748;
        line-height: 1.5;

        & + div {
            margin-top: 15px;
        }
    }
`;

export const CorrectOrder = styled.span`
    font-weight: bold;
    background: rgba(255, 107, 107, 0.1);
    color: #c53030;
    padding: 2px 6px;
    border-radius: 4px;
    border-bottom: 2px solid rgba(255, 107, 107, 0.3);
`;

export const OrderBreakdown = styled.span`
    font-size: 0.85em;
    color: #a0aec0;
    font-style: italic;
    margin-left: 10px;
`;