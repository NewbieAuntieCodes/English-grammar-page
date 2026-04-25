/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import styled, { keyframes, css } from 'styled-components';

// --- Helper function to convert hex to RGB string ---
const hexToRgb = (hex: string) => {
    let c: any = hex.substring(1).split('');
    if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',');
};

// --- Animations ---
export const popIn = keyframes`
    0% { transform: scale(0.8); opacity: 0; }
    60% { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(1); }
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


// --- Practice Section ---

export const PracticeSection = styled.div<{ themeColor: string }>`
    background-color: #FFF5F5;
    border-radius: 20px;
    padding: 30px 40px;
    margin: 30px 0;
    min-height: 380px;
    border: 1px solid #FEE2E2;
`;

// FIX: Added optional themeColor prop to allow for theming in other components that reuse this style.
export const PracticeTitle = styled.h4<{ themeColor?: string }>`
    font-size: 1.3em;
    font-weight: bold;
    color: ${props => props.themeColor || '#E11D48'};
    margin-bottom: 5px;
    text-align: center;
`;

export const PracticeSubtitle = styled.div`
    color: #4B5563;
    font-size: 0.9em;
    margin-bottom: 25px;
    text-align: center;
`;

export const PracticeModeSwitcher = styled.div`
    display: flex;
    justify-content: center;
    background-color: #F3F4F6;
    border-radius: 9999px;
    padding: 6px;
    margin-bottom: 30px;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
`;

export const ModeButton = styled.button<{ isActive: boolean, themeColor: string }>`
    padding: 10px 24px;
    border: none;
    border-radius: 9999px;
    cursor: pointer;
    font-size: 0.9em;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    white-space: nowrap;
    
    ${props => props.isActive
        ? css`
            background-color: ${props.themeColor};
            color: white;
            box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.1);
        `
        : css`
            background-color: transparent;
            color: #6B7280;
            &:hover {
                background-color: #E5E7EB;
            }
        `
    }
`;


export const ChineseHint = styled.div`
    color: #1F2937;
    margin-bottom: 30px;
    font-size: 1.5em;
    text-align: center;
    font-weight: 500;
`;

export const WordBank = styled.div`
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 12px;
    padding: 20px;
    margin: 20px 0;
    min-height: 85px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    justify-content: center;
`;

const BaseWord = styled.div`
    background: #3B82F6;
    color: white;
    padding: 10px 22px;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1.3;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
`;

export const WordItem = styled(BaseWord)``;

export const WordEnglish = styled.span`
    font-weight: 500;
    font-size: 1em;
`;

export const SentenceBuilder = styled(WordBank)<{ themeColor: string; isShaking?: boolean; }>`
    border: 2px solid #F43F5E;
    min-height: 85px;
    box-shadow: 0 0 10px rgba(244, 63, 94, 0.2);
    ${props => props.isShaking && css`
        animation: ${shake} 0.82s cubic-bezier(.36,.07,.19,.97) both;
    `}
`;

export const BuilderPlaceholder = styled.span`
    color: #9ca3af;
    font-style: italic;
`;

export const BuilderWord = styled(BaseWord)<{ themeColor: string }>`
     background: #3B82F6;
`;

export const Feedback = styled.div<{ type: 'incorrect' }>`
    margin-top: 20px;
    padding: 15px;
    border-radius: 10px;
    font-weight: 500;
    text-align: center;
    border: 1px solid;
    animation: ${popIn} 0.5s ease-out forwards;
    background-color: #fee2e2;
    color: #991b1b;
    border-color: #ef4444;
`;

export const ProgressDots = styled.div`
    display: flex;
    justify-content: center;
    gap: 12px;
    margin: 30px auto 0;
    padding: 10px 0;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
    max-width: 100%;
`;

export const ProgressDot = styled.button<{ isActive: boolean; themeColor: string }>`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #D1D5DB;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    flex-shrink: 0;

    &:hover {
        background: #B0B5BB;
    }

    ${props => props.isActive && css`
        background: #F43F5E;
        transform: scale(1.3);
        cursor: default;
        
        &:hover {
            background: #F43F5E;
        }
    `}
`;

// --- Completion Section ---
export const CompletionContainer = styled.div`
    text-align: center;
    padding: 40px 20px;
    animation: ${popIn} 0.5s ease-out;
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

    &:hover {
        transform: scale(1.05) translateY(-2px);
        box-shadow: 0 8px 20px rgba(${props => hexToRgb(props.themeColor)}, 0.5);
    }
`;

// --- Correct Answer Sticker ---

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