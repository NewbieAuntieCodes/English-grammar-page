
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { GlobalStyle } from '../../styles/GlobalStyle';
import { cardDataConfig } from '../../data/definitions';
import { StructureIcon, PartsIcon, ClausesIcon, TensesIcon, ComponentsIcon, CommonStructureIcon, VocabularyIcon, PronunciationIcon, QuestionsIcon, BridgeIcon } from '../../data/icons';
import { FloatingCard } from '../FloatingCard';
import { ExpandedContent } from '../ExpandedContent';
import { StructuresContent } from '../content/Structures/StructuresContent';
import { QuestionsContent } from '../content/Questions/QuestionsContent';
import { PartsOfSpeechContent } from '../content/PartsOfSpeech/PartsOfSpeechContent';
import { ClausesContent } from '../content/Clauses/ClausesContent';
import { TensesContent } from '../content/Tenses/TensesContent';
import { AppContainer, Header, CardsContainer } from './App.styles';
import { SentenceComponentsContent } from '../content/SentenceComponents/SentenceComponentsContent';
import { CommonStructuresContent } from '../content/CommonStructures/CommonStructuresContent';
import { VocabularyContent } from '../content/Vocabulary/VocabularyContent';
import { PronunciationContent } from '../content/Pronunciation/PronunciationContent';
import { PosComponentsBridgeContent } from '../content/Bridge/PosComponentsBridgeContent';
import ContentPreview from '../ContentPreview';

// --- Icon Map ---
const iconMap: { [key: string]: React.ReactNode } = {
    structures: <StructureIcon />,
    questions: <QuestionsIcon />,
    'pos-components-bridge': <BridgeIcon />,
    'common-structures': <CommonStructureIcon />,
    parts: <PartsIcon />,
    clauses: <ClausesIcon />,
    tenses: <TensesIcon />,
    components: <ComponentsIcon />,
    vocabulary: <VocabularyIcon />,
    pronunciation: <PronunciationIcon />,
};

// --- Augment cardData with component icons ---
const cardData = cardDataConfig.map(card => ({
    ...card,
    icon: iconMap[card.id],
}));


// --- Lesson Starter Function ---
const startLesson = (lessonType: string) => {
    alert(`🎓 开始学习: ${lessonType}\n\n这里将会打开 ${lessonType} 的详细互动课程!`);
};

// --- Main App Component ---
const GrammarApp = () => {
    const [activeContent, setActiveContent] = useState<string | null>(null);

    const openContent = (contentId: string) => setActiveContent(contentId);
    const closeContent = () => setActiveContent(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') closeContent();
        };

        if (activeContent) {
            window.scrollTo(0, 0); // Scroll to top on content change
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeContent]);

    const activeCard = activeContent ? cardData.find(card => card.id === activeContent) : null;
    const contentComponents: { [key: string]: React.ReactNode } = {
        structures: <StructuresContent startLesson={startLesson} />,
        questions: <QuestionsContent startLesson={startLesson} />,
        'pos-components-bridge': <PosComponentsBridgeContent onBack={closeContent} themeColor={cardDataConfig.find(card => card.id === 'pos-components-bridge')?.color || '#20b486'} />,
        'common-structures': <CommonStructuresContent startLesson={startLesson} />,
        parts: <PartsOfSpeechContent startLesson={startLesson} />,
        clauses: <ClausesContent startLesson={startLesson} />,
        tenses: <TensesContent startLesson={startLesson} />,
        components: <SentenceComponentsContent startLesson={startLesson} />,
        vocabulary: <VocabularyContent startLesson={startLesson} />,
        pronunciation: <PronunciationContent startLesson={startLesson} />,
    };

    return (
        <AppContainer>
            {!activeCard ? (
                <>
                    <Header>
                        <h1>🎓 语法互动练习</h1>
                    </Header>
                    <CardsContainer>
                        {cardData.map((card, index) => (
                            <FloatingCard
                                key={card.id}
                                id={card.id}
                                icon={card.icon}
                                title={card.title}
                                subtitle={card.subtitle}
                                color={card.color}
                                animationDelay={`-${index * 1.5}s`}
                                onClick={openContent}
                            />
                        ))}
                    </CardsContainer>
                </>
            ) : (
                <ExpandedContent
                    key={activeCard.id}
                    id={activeCard.id}
                    activeContent={activeContent}
                    onClose={closeContent}
                    color={activeCard.color}
                >
                    {contentComponents[activeCard.id]}
                </ExpandedContent>
            )}
        </AppContainer>
    );
};

// --- Encapsulating Wrapper Component for Integration ---
const GrammarIsland = () => {
    const showContentPreview = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('content-preview');

    return (
        <>
            <GlobalStyle />
            {showContentPreview ? <ContentPreview /> : <GrammarApp />}
        </>
    );
};

export default GrammarIsland;
