/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { cardDataConfig } from '../../../data/definitions';
import { MultiPosIcon } from '../../../data/icons';
import { ContentHeader, ContentIcon, ContentTitle, ContentSubtitle } from '../../../styles/shared';
import { LessonList, LessonItem, LessonTitleChinese, LessonTitleEnglish } from '../Structures/StructuresContent.styles'; // Reuse styles
import { FastContent } from './FastContent';
import { HappyContent } from './HappyContent';
import { GoodWellContent } from './GoodWellContent';
import { WorkContent } from './WorkContent';
import { SlowContent } from './SlowContent';


interface ContentProps {
    startLesson: (lessonType: string) => void;
}

type View = 'list' | 'fast' | 'happy' | 'good-well' | 'work' | 'slow';

export const MultiPosContent: React.FC<ContentProps> = ({ startLesson }) => {
    const [view, setView] = useState<View>('list');
    const themeColor = cardDataConfig.find(card => card.id === 'multi-pos')?.color || '#1abc9c';
    
    if (view === 'fast') {
        return <FastContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('happy')} />;
    }

    if (view === 'happy') {
        return <HappyContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('good-well')} />;
    }

    if (view === 'good-well') {
        return <GoodWellContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('work')} />;
    }

    if (view === 'work') {
        return <WorkContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('slow')} />;
    }

    if (view === 'slow') {
        return <SlowContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('list')} />;
    }

    return (
        <>
            <ContentHeader>
                <ContentIcon><MultiPosIcon /></ContentIcon>
                <div>
                    <ContentTitle>词性练习</ContentTitle>
                    <ContentSubtitle>Word Forms</ContentSubtitle>
                </div>
            </ContentHeader>
            <LessonList>
                <LessonItem borderColor={themeColor} onClick={() => setView('fast')}>
                    <LessonTitleChinese>Fast</LessonTitleChinese>
                    <LessonTitleEnglish>Adjective & Adverb</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('happy')}>
                    <LessonTitleChinese>Happy / Happily</LessonTitleChinese>
                    <LessonTitleEnglish>Adjective vs. Adverb</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('good-well')}>
                    <LessonTitleChinese>Good / Well</LessonTitleChinese>
                    <LessonTitleEnglish>Adjective vs. Adverb</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('work')}>
                    <LessonTitleChinese>Work</LessonTitleChinese>
                    <LessonTitleEnglish>Noun vs. Verb</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('slow')}>
                    <LessonTitleChinese>Slow / Slowly</LessonTitleChinese>
                    <LessonTitleEnglish>Adjective vs. Adverb</LessonTitleEnglish>
                </LessonItem>
            </LessonList>
        </>
    );
}