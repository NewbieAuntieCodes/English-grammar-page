/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { cardDataConfig } from '../../../data/definitions';
import { PartsIcon, MultiPosIcon } from '../../../data/icons';
import { ContentHeader, ContentIcon, ContentTitle, ContentSubtitle } from '../../../styles/shared';
import { 
    PartsOfSpeechGrid, 
    PartItem, 
    PartChinese, 
    PartDescription,
    WordFormsHeader,
    WordFormsGrid,
    WordFormItem,
    WordFormChinese,
    WordFormDescription
} from './PartsOfSpeechContent.styles';
import { NounsContent } from './NounsContent';
import { VerbsContent } from './VerbsContent';
import { AdjectivesContent } from './AdjectivesContent';
import { AdverbsContent } from './AdverbsContent';
import { PrepositionsContent } from './PrepositionsContent';
import { ConjunctionsContent } from './ConjunctionsContent';
import { PronounsContent } from './PronounsContent';
import { ArticlesContent } from './ArticlesContent';

// Imports from MultiPos
import { FastContent } from '../MultiPos/FastContent';
import { HappyContent } from '../MultiPos/HappyContent';
import { GoodWellContent } from '../MultiPos/GoodWellContent';
import { WorkContent } from '../MultiPos/WorkContent';
import { SlowContent } from '../MultiPos/SlowContent';
import { AccessContent } from '../MultiPos/AccessContent';
import { ValueContent } from '../MultiPos/ValueContent';
import { AvailableContent } from '../MultiPos/AvailableContent';


interface ContentProps {
    startLesson: (lessonType: string) => void;
}

const partsOfSpeechData = [
    { name: '名词 (Nouns)', description: '人, 地点, 事物, 概念', lesson: 'nouns' },
    { name: '动词 (Verbs)', description: '表示动作或状态', lesson: 'verbs' },
    { name: '形容词 (Adjectives)', description: '描述名词', lesson: 'adjectives' },
    { name: '副词 (Adverbs)', description: '描述动词、形容词', lesson: 'adverbs' },
    { name: '介词 (Prepositions)', description: '表示关系', lesson: 'prepositions' },
    { name: '连词 (Conjunctions)', description: '连接词或句子', lesson: 'conjunctions' },
    { name: '代词 (Pronouns)', description: '代替名词', lesson: 'pronouns' },
    { name: '冠词 (Articles)', description: 'a, an, the', lesson: 'articles' },
];

const wordFormsData = [
    { name: 'Fast', description: 'Adjective & Adverb', lesson: 'fast' },
    { name: 'Happy / Happily', description: 'Adjective vs. Adverb', lesson: 'happy' },
    { name: 'Good / Well', description: 'Adjective vs. Adverb', lesson: 'good-well' },
    { name: 'Work', description: 'Noun vs. Verb', lesson: 'work' },
    { name: 'Slow / Slowly', description: 'Adjective vs. Adverb', lesson: 'slow' },
    { name: 'Access / Accessible', description: 'Noun/Verb vs. Adjective', lesson: 'access' },
    { name: 'Value', description: 'Noun vs. Verb', lesson: 'value' },
    { name: 'Available', description: 'Adjective', lesson: 'available' },
];

type View = 'list' | 'nouns' | 'verbs' | 'adjectives' | 'adverbs' | 'prepositions' | 'conjunctions' | 'pronouns' | 'articles' | 'fast' | 'happy' | 'good-well' | 'work' | 'slow' | 'access' | 'value' | 'available';

export const PartsOfSpeechContent: React.FC<ContentProps> = ({ startLesson }) => {
    const [view, setView] = useState<View>('list');
    const themeColor = cardDataConfig.find(card => card.id === 'parts')?.color || '#4ecdc4';
    const multiPosThemeColor = cardDataConfig.find(card => card.id === 'multi-pos')?.color || '#1abc9c';

    const handleItemClick = (lesson: string) => {
        const lessonView = lesson as View;
        if (['nouns', 'verbs', 'adjectives', 'adverbs', 'prepositions', 'conjunctions', 'pronouns', 'articles', 'fast', 'happy', 'good-well', 'work', 'slow', 'access', 'value', 'available'].includes(lessonView)) {
            setView(lessonView);
        } else {
            startLesson(lesson);
        }
    };

    if (view === 'nouns') {
        return <NounsContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('verbs')} />;
    }
    if (view === 'verbs') {
        return <VerbsContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('adjectives')} />;
    }
    if (view === 'adjectives') {
        return <AdjectivesContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('adverbs')} />;
    }
    if (view === 'adverbs') {
        return <AdverbsContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('prepositions')} />;
    }
    if (view === 'prepositions') {
        return <PrepositionsContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('conjunctions')} />;
    }
    if (view === 'conjunctions') {
        return <ConjunctionsContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('pronouns')} />;
    }
    if (view === 'pronouns') {
        return <PronounsContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('articles')} />;
    }
    if (view === 'articles') {
        return <ArticlesContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('list')} />;
    }

    // Word Forms Navigation
    if (view === 'fast') {
        return <FastContent onBack={() => setView('list')} themeColor={multiPosThemeColor} onCompleteAll={() => setView('happy')} />;
    }
    if (view === 'happy') {
        return <HappyContent onBack={() => setView('list')} themeColor={multiPosThemeColor} onCompleteAll={() => setView('good-well')} />;
    }
    if (view === 'good-well') {
        return <GoodWellContent onBack={() => setView('list')} themeColor={multiPosThemeColor} onCompleteAll={() => setView('work')} />;
    }
    if (view === 'work') {
        return <WorkContent onBack={() => setView('list')} themeColor={multiPosThemeColor} onCompleteAll={() => setView('slow')} />;
    }
    if (view === 'slow') {
        return <SlowContent onBack={() => setView('list')} themeColor={multiPosThemeColor} onCompleteAll={() => setView('access')} />;
    }
    if (view === 'access') {
        return <AccessContent onBack={() => setView('list')} themeColor={multiPosThemeColor} onCompleteAll={() => setView('value')} />;
    }
    if (view === 'value') {
        return <ValueContent onBack={() => setView('list')} themeColor={multiPosThemeColor} onCompleteAll={() => setView('available')} />;
    }
    if (view === 'available') {
        return <AvailableContent onBack={() => setView('list')} themeColor={multiPosThemeColor} onCompleteAll={() => setView('list')} />;
    }

    return (
        <>
            <ContentHeader>
                <ContentIcon><PartsIcon /></ContentIcon>
                <div>
                    <ContentTitle>词性学习</ContentTitle>
                    <ContentSubtitle>Parts of Speech</ContentSubtitle>
                </div>
            </ContentHeader>
            <PartsOfSpeechGrid>
                {partsOfSpeechData.map(part => (
                    <PartItem key={part.lesson} onClick={() => handleItemClick(part.lesson)} borderColor={themeColor}>
                        <PartChinese>{part.name}</PartChinese>
                        <PartDescription>{part.description}</PartDescription>
                    </PartItem>
                ))}
            </PartsOfSpeechGrid>

            <WordFormsHeader>
                <ContentIcon><MultiPosIcon /></ContentIcon>
                <div>
                    <ContentTitle>词性练习</ContentTitle>
                    <ContentSubtitle>Word Forms</ContentSubtitle>
                </div>
            </WordFormsHeader>

            <WordFormsGrid>
                {wordFormsData.map(part => (
                    <WordFormItem key={part.lesson} onClick={() => handleItemClick(part.lesson)} borderColor={multiPosThemeColor}>
                        <WordFormChinese>{part.name}</WordFormChinese>
                        <WordFormDescription>{part.description}</WordFormDescription>
                    </WordFormItem>
                ))}
            </WordFormsGrid>
        </>
    );
};