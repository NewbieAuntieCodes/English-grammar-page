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
    background: linear-gradient(to bottom, rgba(${props => hexToRgb(props.themeColor)}, 0.12), rgba(${props => hexToRgb(props.themeColor)}, 0.03));
    border-radius: 15px;
    padding: 30px;
    margin: 30px 0;
    min-height: 380px;
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
    margin-bottom: 20px;
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
    background: #d1d5db;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    flex-shrink: 0;

    &:hover {
        background: #B0B5BB;
    }

    ${props => props.isActive && css`
        background: ${props.themeColor};
        transform: scale(1.3);
        cursor: default;

        &:hover {
             background: ${props.themeColor};
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

// --- Word Selector Specific Styles ---

export const InstructionText = styled.p<{ themeColor: string }>`
    text-align: center;
    font-size: 1.1em;
    color: #4a5568;
    margin-bottom: 20px;
    font-weight: 500;

    strong {
        color: ${props => props.themeColor};
        font-weight: bold;
    }
`;

export const SentenceDisplay = styled.div<{ themeColor: string }>`
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 30px;
    text-align: center;
    font-size: 1.5em;
    line-height: 1.8;
    transition: border-color 0.3s ease;
    margin-top: 20px;

    @media (max-width: 768px) {
        font-size: 1.2em;
        padding: 20px;
    }
`;

export const ChineseHint = styled.p<{ themeColor: string }>`
    text-align: center;
    font-size: 1.2em;
    color: ${props => props.themeColor};
    margin-top: 15px;
    font-weight: 500;
`;

export const WordSpan = styled.span<{ status: 'default' | 'correct' | 'incorrect'; themeColor: string }>`
    cursor: pointer;
    padding: 4px 8px;
    margin: 0 2px;
    border-radius: 6px;
    transition: all 0.2s ease;
    user-select: none;
    display: inline-block;

    &:hover {
        background-color: rgba(${props => hexToRgb(props.themeColor)}, 0.1);
    }

    ${({ status, themeColor }) => {
        switch (status) {
            case 'correct':
                return css`
                    background-color: #d1fae5;
                    color: #065f46;
                    cursor: default;
                    pointer-events: none;
                `;
            case 'incorrect':
                return css`
                    background-color: #fee2e2;
                    color: #991b1b;
                    animation: ${shake} 0.5s ease;
                `;
            default:
                return css``;
        }
    }}
`;

export const FeedbackMessage = styled.div`
    margin-top: 20px;
    padding: 15px;
    border-radius: 10px;
    font-weight: 500;
    text-align: center;
    border: 1px solid #ef4444;
    animation: ${popIn} 0.5s ease-out forwards;
    background-color: #fee2e2;
    color: #991b1b;
`;