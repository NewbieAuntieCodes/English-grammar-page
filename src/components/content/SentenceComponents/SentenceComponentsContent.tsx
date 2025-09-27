/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { ComponentsIcon } from '../../../data/icons';
import { ContentHeader, ContentIcon, ContentTitle, ContentSubtitle } from '../../../styles/shared';
import { PartsOfSpeechGrid, PartItem, PartChinese, PartDescription } from '../PartsOfSpeech/PartsOfSpeechContent.styles';
import { cardDataConfig } from '../../../data/definitions';
import { SubjectContent } from './SubjectContent';
import { PredicateContent } from './PredicateContent';
import { ObjectContent } from './ObjectContent';
import { AttributiveContent } from './AttributiveContent';
import { AdverbialContent } from './AdverbialContent';
import { ComplementContent } from './ComplementContent';

interface ContentProps {
    startLesson: (lessonType: string) => void;
}

const componentsData = [
    { name: '主语 (Subject)', description: '句子的主角', lesson: 'subject' },
    { name: '谓语 (Predicate)', description: '说明主语的动作或状态', lesson: 'predicate' },
    { name: '宾语 (Object)', description: '动作的接受者', lesson: 'object' },
    { name: '定语 (Attributive)', description: '修饰名词或代词', lesson: 'attributive' },
    { name: '状语 (Adverbial)', description: '修饰动词、形容词、副词或全句', lesson: 'adverbial' },
    { name: '补语 (Complement)', description: '补充说明主语或宾语', lesson: 'complement' },
];

type View = 'list' | 'subject' | 'predicate' | 'object' | 'attributive' | 'adverbial' | 'complement';

export const SentenceComponentsContent: React.FC<ContentProps> = ({ startLesson }) => {
    const [view, setView] = useState<View>('list');
    const themeColor = cardDataConfig.find(card => card.id === 'components')?.color || '#feca57';

    const handleItemClick = (lesson: string) => {
        const lessonView = lesson as View;
        if (['subject', 'predicate', 'object', 'attributive', 'adverbial', 'complement'].includes(lessonView)) {
            setView(lessonView);
        } else {
            startLesson(lesson);
        }
    };
    
    if (view === 'subject') {
        return <SubjectContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('predicate')} />;
    }
    if (view === 'predicate') {
        return <PredicateContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('object')} />;
    }
    if (view === 'object') {
        return <ObjectContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('attributive')} />;
    }
    if (view === 'attributive') {
        return <AttributiveContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('adverbial')} />;
    }
    if (view === 'adverbial') {
        return <AdverbialContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('complement')} />;
    }
    if (view === 'complement') {
        return <ComplementContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('list')} />;
    }

    return (
        <>
            <ContentHeader>
                <ContentIcon><ComponentsIcon /></ContentIcon>
                <div>
                    <ContentTitle>句子成分</ContentTitle>
                    <ContentSubtitle>Sentence Components</ContentSubtitle>
                </div>
            </ContentHeader>
            <PartsOfSpeechGrid>
                {componentsData.map(part => (
                    <PartItem key={part.lesson} onClick={() => handleItemClick(part.lesson)} borderColor={themeColor}>
                        <PartChinese>{part.name}</PartChinese>
                        <PartDescription>{part.description}</PartDescription>
                    </PartItem>
                ))}
            </PartsOfSpeechGrid>
        </>
    );
};