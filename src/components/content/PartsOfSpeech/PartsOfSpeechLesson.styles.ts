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

// --- Verb Types Explanation ---
export const VerbTypeContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin: 30px 0;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const VerbTypeCard = styled.div`
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 15px;
    padding: 25px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const VerbTypeHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const VerbTypeIcon = styled.span`
    font-size: 1.8em;
`;

export const VerbTypeTitle = styled.h3`
    font-size: 1.3em;
    color: #2d3748;
    font-weight: bold;
`;

export const VerbTypeConcept = styled.p`
    color: #4a5568;
    line-height: 1.6;
    font-size: 0.95em;
    
    strong {
        font-weight: bold;
        color: #1e88e5;
    }
`;

export const VerbTypeExampleList = styled.ul`
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
`;

export const VerbTypeExampleItem = styled.li`
    background: #e3f2fd;
    color: #1565c0;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.85em;
    font-weight: 500;
`;

export const VerbTypeSentence = styled.div`
    background: #fff;
    border: 1px solid #dee2e6;
    padding: 15px;
    border-radius: 10px;
    font-size: 1em;
    color: #495057;
    margin-top: auto; /* Pushes to the bottom */

    strong {
        font-weight: bold;
        color: #d9480f;
        background: #fff4e6;
        padding: 2px 6px;
        border-radius: 4px;
    }
`;

// --- Examples Section ---

export const ExamplesSection = styled.div`
    margin: 30px 0;
`;

export const ExampleItem = styled.div<{ themeColor: string, isExpanded: boolean }>`
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 15px;
    border-left: 5px solid ${props => props.themeColor};
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;

    strong {
      font-weight: bold;
      color: ${props => props.themeColor};
      background: rgba(${props => hexToRgb(props.themeColor)}, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
    }

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
    font-weight: 500;
    color: #2d3748;
`;

export const ExampleChinese = styled.div`
    color: #6b7280;
    font-size: 1em;
`;

// --- Practice Section (DEPRECATED - MOVED TO SentenceBuilderPractice) ---
// Note: Some styles here might still be used by CompletionContainer etc.
// The main interactive part styles are removed.

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
    pointer-events: none;

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

    animation: ${stickerPopIn} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards,
               ${stickerFadeOut} 0.5s cubic-bezier(0.55, 0.055, 0.675, 0.19) 1s forwards;
    
    @media (max-width: 768px) {
        font-size: 1.5em;
        padding: 12px 24px;
        top: 15%;
    }
`;