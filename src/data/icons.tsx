
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import styled from 'styled-components';

// --- Styled Components for Icons ---

const IconWrapper = styled.div`
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
`;

const StyledPartsIcon = styled(IconWrapper)`
    background: #4ecdc4;
`;

const StyledClausesIcon = styled(IconWrapper)`
    background: #fff;
`;

// --- Icon Components ---

export const StructureIcon: React.FC = () => (
    <span role="img" aria-label="Structure Icon" style={{ fontSize: '48px' }}>🏗️</span>
);

export const QuestionsIcon: React.FC = () => (
    <span role="img" aria-label="Questions Icon" style={{ fontSize: '48px' }}>❓</span>
);

export const PartsIcon: React.FC = () => (
    <StyledPartsIcon>
        <span style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', fontFamily: `'Arial Rounded MT Bold', sans-serif` }}>abc</span>
    </StyledPartsIcon>
);

export const ClausesIcon: React.FC = () => (
    <StyledClausesIcon>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 15C7.16667 15 8.4 9.4 12 12C15.6 14.6 16.8333 19 20 19" stroke="#0097a7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </StyledClausesIcon>
);

export const TensesIcon: React.FC = () => (
    <span role="img" aria-label="Tenses Icon" style={{ fontSize: '48px' }}>⏰</span>
);

export const ComponentsIcon: React.FC = () => (
    <span role="img" aria-label="Sentence Components Icon" style={{ fontSize: '48px' }}>🧩</span>
);

export const CommonStructureIcon: React.FC = () => (
    <span role="img" aria-label="Common Structure Icon" style={{ fontSize: '48px' }}>🧱</span>
);

export const MultiPosIcon: React.FC = () => (
    <span role="img" aria-label="Multi POS Icon" style={{ fontSize: '48px' }}>🔄</span>
);

export const VocabularyIcon: React.FC = () => (
    <span role="img" aria-label="Vocabulary Icon" style={{ fontSize: '48px' }}>📖</span>
);

export const PronunciationIcon: React.FC = () => (
    <span role="img" aria-label="Pronunciation Icon" style={{ fontSize: '48px' }}>🗣️</span>
);
