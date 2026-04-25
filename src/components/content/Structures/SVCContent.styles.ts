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
const slideDown = keyframes`
    from { opacity: 0; max-height: 0; padding-top: 0; padding-bottom: 0; margin-top: 0; }
    to { opacity: 1; max-height: 100px; padding-top: 15px; padding-bottom: 15px; margin-top: 10px; }
`;

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

// --- Main Container & General Elements ---
export const LessonContainer = styled.div`
    padding: 10px;
`;

export const BackButton = styled.button<{ themeColor: string }>`
    background: white;
    color: ${props => props.themeColor};
    border: 2px solid ${props => props.themeColor};
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    margin-bottom: 25px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9em;
    font-weight: bold;

    &:hover {
        background: ${props => props.themeColor};
        color: white;
        transform: scale(1.05);
    }
`;

export const LessonTitle = styled.h2`
    font-size: 1.8em;
    font-weight: bold;
    color: #2d3748;
    margin-bottom: 25px;
`;

export const SectionTitle = styled.h4`
    color: #2d3748;
    margin-bottom: 10px;
    font-size: 1.2em;
`;

// --- Informational Sections ---

export const WhyLearnSection = styled.div<{ themeColor: string }>`
    background: linear-gradient(135deg, rgba(${props => hexToRgb(props.themeColor)}, 0.1), rgba(${props => hexToRgb(props.themeColor)}, 0.03));
    border-radius: 15px;
    padding: 20px;
    margin: 25px 0;
    border-left: 5px solid ${props => props.themeColor};

    p {
        color: #4a5568;
        line-height: 1.6;
    }
`;

export const FormulaSection = styled.div<{ themeColor: string }>`
    background: linear-gradient(135deg, rgba(${props => hexToRgb(props.themeColor)}, 0.08), rgba(${props => hexToRgb(props.themeColor)}, 0.02));
    border-radius: 15px;
    padding: 30px;
    margin: 30px 0;
    text-align: center;
`;

export const FormulaTitle = styled.div<{ themeColor: string }>`
    font-size: 1.5em;
    font-weight: bold;
    color: ${props => props.themeColor};
    margin-bottom: 25px;
`;

export const FormulaParts = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
`;

export const FormulaPart = styled.div<{ themeColor: string }>`
    background: white;
    padding: 15px 20px;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 100px;
    border-top: 4px solid ${props => props.themeColor};

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.12);
    }
`;

export const PartEnglish = styled.div`
    font-weight: bold;
    color: #2d3748;
    margin-bottom: 5px;
    font-size: 1.1em;
`;

export const PartChinese = styled.div`
    color: #718096;
    font-size: 0.9em;
`;

export const PlusSign = styled.div<{ themeColor: string }>`
    font-size: 1.8em;
    color: ${props => props.themeColor};
    font-weight: bold;
`;

// --- Examples Section ---

export const ExamplesSection = styled.div`
    margin: 30px 0;
`;

export const ExampleItem = styled.div<{ themeColor: string }>`
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 15px;
    border-left: 5px solid ${props => props.themeColor};
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;

    &:hover {
        background: #f1f3f4;
        transform: translateX(5px);
    }
`;

export const ExampleHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-bottom: 5px;
`;

export const SpeakButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5em;
    padding: 5px;
    border-radius: 50%;
    transition: background-color 0.2s ease, transform 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: #4a5568;

    &:hover {
        background-color: #e9ecef;
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.95);
    }
`;

export const ExampleEnglish = styled.div`
    font-size: 1.2em;
    font-weight: bold;
    color: #2d3748;
`;

export const ExampleChinese = styled.div`
    color: #6b7280;
    font-size: 1em;
`;

export const ExampleBreakdown = styled.div<{ show: boolean; themeColor: string }>`
    background: linear-gradient(135deg, rgba(${props => hexToRgb(props.themeColor)}, 0.1), rgba(${props => hexToRgb(props.themeColor)}, 0.05));
    padding: 0 15px;
    margin-top: 0;
    border-radius: 8px;
    font-size: 0.9em;
    color: ${props => props.themeColor};
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: all 0.3s ease;
    
    strong {
      color: ${props => props.themeColor};
    }

    ${props => props.show && css`
        animation: ${slideDown} 0.3s ease forwards;
    `}
`;

export const BreakdownPart = styled.div`
    & + & {
        margin-top: 5px;
    }
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

export const WordBank = styled.div`
    background: white;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 20px;
    margin: 20px 0;
    min-height: 80px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
`;

const BaseWord = styled.div`
    background: #1E88E5;
    color: white;
    padding: 10px 18px;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    user-select: none;
`;

export const WordItem = styled(BaseWord)``;

export const SentenceBuilder = styled(WordBank)<{ themeColor: string; isShaking?: boolean; }>`
    border-color: ${props => props.themeColor};
    min-height: 80px;
    ${props => props.isShaking && css`
        animation: ${shake} 0.82s cubic-bezier(.36,.07,.19,.97) both;
    `}
`;

export const BuilderPlaceholder = styled.span`
    color: #9ca3af;
    font-style: italic;
`;

export const BuilderWord = styled(BaseWord)<{ themeColor: string }>`
    background: ${props => props.themeColor};
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
    gap: 10px;
    margin-top: 30px;
`;

export const ProgressDot = styled.div<{ isActive: boolean; themeColor: string }>`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #d1d5db;
    transition: all 0.3s ease;
    ${props => props.isActive && css`
        background: ${props.themeColor};
        transform: scale(1.3);
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