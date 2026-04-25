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
    to { opacity: 1; max-height: 450px; padding-top: 20px; padding-bottom: 20px; margin-top: 15px; }
`;

export const popIn = keyframes`
    0% { transform: scale(0.95); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
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

export const ExampleSwitcher = styled.div`
    display: flex;
    justify-content: flex-start;
    background-color: #f0f2f5;
    border-radius: 25px;
    padding: 5px;
    margin: 0 auto 20px;
    max-width: 90%;
    overflow-x: auto;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const SwitcherButton = styled.button<{ isActive: boolean, themeColor: string }>`
    flex: 1;
    padding: 10px 15px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.95em;
    font-weight: bold;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    white-space: nowrap;
    
    ${props => props.isActive
        ? css`
            background-color: ${props.themeColor};
            color: white;
            box-shadow: 0 4px 10px rgba(${hexToRgb(props.themeColor)}, 0.25);
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

    strong {
      color: ${props => props.themeColor};
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
    font-weight: bold;
    color: #2d3748;
`;

export const ExampleChinese = styled.div`
    color: #6b7280;
    font-size: 1em;
`;

export const ExampleBreakdown = styled.div<{ show: boolean; themeColor: string }>`
    background: rgba(${props => hexToRgb(props.themeColor)}, 0.04);
    padding: 0 20px;
    margin-top: 0;
    border-radius: 10px;
    font-size: 0.95em;
    color: #2d3748;
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: all 0.3s ease;
    
    strong {
      color: ${props => props.themeColor};
    }

    ${props => props.show && css`
        animation: ${slideDown} 0.4s ease-out forwards;
    `}
`;

export const BreakdownPart = styled.div`
    line-height: 1.8;
    & + & {
        margin-top: 8px;
    }
`;

export const AnalysisGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 15px;
    }
`;

export const AnalysisColumn = styled.div<{ themeColor: string }>`
    h4 {
        font-size: 1.05em;
        font-weight: bold;
        color: ${props => props.themeColor};
        margin-bottom: 10px;
        padding-bottom: 5px;
        border-bottom: 2px solid rgba(${props => hexToRgb(props.themeColor)}, 0.2);
    }
`;

// --- New Styles for SVO Formula Section ---

export const SVOFormulaPart = styled.div<{ themeColor: string }>`
    background: white;
    padding: 20px 15px;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    cursor: pointer;
    transition: all 0.3s ease;
    width: 220px;
    border-top: 4px solid ${props => props.themeColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.12);
    }
`;

export const SVOPartEnglish = styled.div`
    font-weight: bold;
    color: #2d3748;
    font-size: 1.2em;
`;

export const SVOPartChinese = styled.div`
    color: #718096;
    font-size: 0.9em;
`;

export const SVOPartDivider = styled.div`
    width: 80%;
    height: 1px;
    background-color: #e2e8f0;
    margin: 8px 0;
`;

export const SVOPartOfSpeechInfo = styled.div`
    text-align: center;
    background-color: #f7fafc;
    width: 100%;
    padding: 8px;
    border-radius: 8px;
    border: 1px solid #edf2f7;
`;

export const SVOPartOfSpeechText = styled.div`
    font-size: 0.9em;
    color: #4a5568;
    font-weight: 500;
    line-height: 1.3;
`;

export const SVOPartOfSpeechTextEng = styled.div`
    font-size: 0.8em;
    color: #a0aec0;
    font-style: italic;
`;
