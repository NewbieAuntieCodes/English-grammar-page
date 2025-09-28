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

const popIn = keyframes`
    0% { transform: scale(0.95); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
`;

const stickerPopIn = keyframes`
    0% { transform: translateX(-50%) scale(0) rotate(-180deg); opacity: 0; }
    60% { transform: translateX(-50%) scale(1.1) rotate(10deg); opacity: 1; }
    100% { transform: translateX(-50%) scale(1) rotate(5deg); opacity: 1; }
`;

const stickerFadeOut = keyframes`
    from {
        transform: translateX(-50%) scale(1) rotate(5deg);
        opacity: 1;
    }
    to {
        transform: translateX(-50%) scale(0.5) rotate(-10deg);
        opacity: 0;
    }
`;

const shake = keyframes`
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
`;

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

export const PracticeSection = styled.div<{ themeColor: string }>`
    background: linear-gradient(to bottom, rgba(${props => hexToRgb(props.themeColor)}, 0.12), rgba(${props => hexToRgb(props.themeColor)}, 0.03));
    border-radius: 15px;
    padding: 30px;
    margin: 30px 0;
    min-height: 420px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const PracticeHeader = styled.div`
    margin-bottom: 25px;
`;

export const PracticeTitle = styled.h4<{ themeColor: string }>`
    font-size: 1.3em;
    font-weight: bold;
    color: ${props => props.themeColor};
    margin-bottom: 5px;
`;

export const PracticeSubtitle = styled.div`
    color: #6b7280;
    font-size: 0.9em;
`;

export const StoryPanel = styled.div`
    background: #fff;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    padding: 25px;
    font-size: 1.3em;
    line-height: 1.7;
    color: #34495e;
    min-height: 150px;
    animation: ${fadeIn} 0.5s ease;

    @media (max-width: 768px) {
        font-size: 1.1em;
    }
`;

export const PromptText = styled.span`
    color: #7f8c8d;
    font-style: italic;
`;

export const ChoicesContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
    min-height: 60px; /* Reserve space */

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 15px;
    }
`;

export const ChoiceButton = styled.button<{ themeColor: string; isShaking: boolean }>`
    background: white;
    color: ${props => props.themeColor};
    border: 2px solid ${props => props.themeColor};
    padding: 15px 30px;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.1em;
    font-weight: bold;
    min-width: 200px;
    animation: ${popIn} 0.5s ease forwards;

    &:hover {
        background: ${props => props.themeColor};
        color: white;
        transform: scale(1.05);
    }

    &:disabled {
        background-color: #f1f3f4;
        border-color: #dee2e6;
        color: #adb5bd;
        cursor: not-allowed;
        transform: none;
    }

    ${props => props.isShaking && css`
        animation: ${shake} 0.6s ease;
        background-color: #fee2e2;
        border-color: #ef4444;
        color: #991b1b;
    `}
`;

export const ProgressContainer = styled.div`
    margin-top: 30px;
`;

export const ProgressBarOuter = styled.div`
    background: #e9ecef;
    border-radius: 10px;
    height: 12px;
    overflow: hidden;
`;

export const ProgressBarInner = styled.div<{ themeColor: string; progress: number }>`
    background: ${props => props.themeColor};
    height: 100%;
    width: ${props => props.progress}%;
    border-radius: 10px;
    transition: width 0.5s ease;
`;

export const CompletionContainer = styled.div`
    text-align: center;
    padding: 40px 20px;
    animation: ${popIn} 0.5s ease-out;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const CompletionTitle = styled.h3`
    font-size: 2em;
    font-weight: bold;
    color: #2d3748;
    margin-bottom: 10px;
`;

export const CompletionMessage = styled.p`
    font-size: 1.1em;
    color: #4a5568;
    margin-bottom: 30px;
`;

export const NextChapterButton = styled.button<{ themeColor: string }>`
    background: ${props => props.themeColor};
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
    font-size: 1.1em;
    box-shadow: 0 5px 15px rgba(${props => hexToRgb(props.themeColor)}, 0.4);
    align-self: center;

    &:hover {
        transform: scale(1.05) translateY(-2px);
    }
`;

export const CorrectSticker = styled.div<{ themeColor: string }>`
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%) rotate(5deg);
    z-index: 1000;
    pointer-events: none; /* Crucial for non-blocking UI */

    background: ${props => props.themeColor};
    color: white;
    padding: 15px 30px;
    border-radius: 12px;
    font-size: 2em;
    font-weight: bold;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 0 0 5px rgba(255, 255, 255, 0.3);
    
    display: flex;
    align-items: center;
    gap: 10px;

    /* Animation sequence: Pop in, wait, fade out */
    animation: ${stickerPopIn} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards,
               ${stickerFadeOut} 0.5s cubic-bezier(0.55, 0.055, 0.675, 0.19) 1.5s forwards;
    
    @media (max-width: 768px) {
        font-size: 1.5em;
        padding: 12px 24px;
        top: 15%;
    }
`;

export const BlankPlaceholder = styled.span`
    display: inline-block;
    background: #e9ecef;
    color: #adb5bd;
    padding: 2px 15px;
    border-radius: 6px;
    font-style: italic;
    font-weight: bold;
    user-select: none;
`;
