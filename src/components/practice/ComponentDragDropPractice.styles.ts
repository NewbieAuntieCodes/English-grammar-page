/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import styled, { css, keyframes } from 'styled-components';
import { 
    PracticeSection as BasePracticeSection,
    PracticeTitle,
    PracticeSubtitle,
    ProgressDots,
    ProgressDot,
    CompletionContainer,
    CompletionTitle,
    CompletionMessage,
    NextChapterButton,
    CorrectSticker,
    popIn,
} from './SentenceBuilderPractice.styles';

const hexToRgb = (hex: string) => {
    let c: any = hex.substring(1).split('');
    if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',');
};

const shake = keyframes`
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
`;

export {
    PracticeTitle,
    PracticeSubtitle,
    ProgressDots,
    ProgressDot,
    CompletionContainer,
    CompletionTitle,
    CompletionMessage,
    NextChapterButton,
    CorrectSticker,
    popIn,
};

export const PracticeSection = styled(BasePracticeSection)``;

export const SentenceHint = styled.p`
    text-align: center;
    font-size: 1.5em;
    color: #374151;
    margin-bottom: 10px;
    font-weight: 500;
`;

export const ChineseHint = styled.p`
    text-align: center;
    font-size: 1.1em;
    color: #6b7280;
    margin-bottom: 25px;
`;

export const DropArea = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin: 30px 0;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const DropZone = styled.div<{ status: 'default' | 'correct' | 'incorrect'; isOver: boolean, themeColor: string }>`
    background: #f9fafb;
    border: 2px dashed #d1d5db;
    border-radius: 12px;
    min-height: 100px;
    padding: 15px;
    transition: all 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    ${props => props.isOver && css`
        border-color: ${props.themeColor};
        background: rgba(${hexToRgb(props.themeColor)}, 0.1);
        transform: scale(1.02);
    `}

    ${({ status, themeColor }) => {
        if (status === 'correct') return css`
            border: 2px solid #10b981;
            background: #f0fdf4;
            animation: ${popIn} 0.3s ease;
        `;
        if (status === 'incorrect') return css`
            border: 2px solid #ef4444;
            background: #fef2f2;
            animation: ${shake} 0.6s ease;
        `;
    }}
`;

export const DropZoneTitle = styled.div`
    font-weight: bold;
    color: #6b7280;
    text-align: center;
    margin-bottom: 10px;
    user-select: none;
`;

export const DraggableContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 20px;
    min-height: 60px;
    padding: 15px;
    background: white;
    border-radius: 12px;
    border: 1px solid #e5e7eb;
`;

export const DraggableItem = styled.div.attrs({
    'aria-grabbed': false,
    role: 'button',
    tabIndex: 0,
})`
    background: #3B82F6;
    color: white;
    padding: 12px 25px;
    border-radius: 25px;
    cursor: grab;
    font-weight: 500;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
    transition: all 0.2s ease;
    user-select: none;

    &:active {
        cursor: grabbing;
        transform: scale(1.05);
        box-shadow: 0 6px 10px rgba(0,0,0,0.1);
    }
`;

export const CheckButton = styled.button<{ themeColor: string }>`
    display: block;
    margin: 30px auto 0;
    background: ${props => props.themeColor};
    color: white;
    border: none;
    padding: 12px 40px;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
    font-size: 1.1em;

    &:hover {
        transform: scale(1.05);
    }

    &:disabled {
        background: #d1d5db;
        cursor: not-allowed;
        transform: none;
    }
`;
