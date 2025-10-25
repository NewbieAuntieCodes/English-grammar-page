/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { GlobalStyle } from '../../styles/GlobalStyle';
import { cardDataConfig } from '../../data/definitions';
import { StructureIcon, PartsIcon, ClausesIcon, TensesIcon, ComponentsIcon, CommonStructureIcon, MultiPosIcon } from '../../data/icons';
import { FloatingCard } from '../FloatingCard';
import { ExpandedContent } from '../ExpandedContent';
import { StructuresContent } from '../content/Structures/StructuresContent';
import { PartsOfSpeechContent } from '../content/PartsOfSpeech/PartsOfSpeechContent';
import { ClausesContent } from '../content/Clauses/ClausesContent';
import { TensesContent } from '../content/Tenses/TensesContent';
import { AppContainer, Header, CardsContainer } from './App.styles';
import { SentenceComponentsContent } from '../content/SentenceComponents/SentenceComponentsContent';
import { CommonStructuresContent } from '../content/CommonStructures/CommonStructuresContent';
import { MultiPosContent } from '../content/MultiPos/MultiPosContent';

// --- Icon Map ---
const iconMap: { [key: string]: React.ReactNode } = {
    structures: <StructureIcon />,
    'common-structures': <CommonStructureIcon />,
    parts: <PartsIcon />,
    'multi-pos': <MultiPosIcon />,
    clauses: <ClausesIcon />,
    tenses: <TensesIcon />,
    components: <ComponentsIcon />,
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

// --- Content Component Map ---
const contentComponents: { [key: string]: React.ReactNode } = {
    structures: <StructuresContent startLesson={startLesson} />,
    'common-structures': <CommonStructuresContent startLesson={startLesson} />,
    parts: <PartsOfSpeechContent startLesson={startLesson} />,
    'multi-pos': <MultiPosContent startLesson={startLesson} />,
    clauses: <ClausesContent startLesson={startLesson} />,
    tenses: <TensesContent startLesson={startLesson} />,
    components: <SentenceComponentsContent startLesson={startLesson} />,
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
    return (
        <>
            <GlobalStyle />
            <GrammarApp />
        </>
    );
};

export default GrammarIsland;