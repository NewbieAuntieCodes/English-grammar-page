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


interface ContentProps {
    startLesson: (lessonType: string) => void;
}

type View = 'list' | 'fast' | 'happy';

export const MultiPosContent: React.FC<ContentProps> = ({ startLesson }) => {
    const [view, setView] = useState<View>('list');
    const themeColor = cardDataConfig.find(card => card.id === 'multi-pos')?.color || '#1abc9c';
    
    if (view === 'fast') {
        return <FastContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('happy')} />;
    }

    if (view === 'happy') {
        return <HappyContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('list')} />;
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
                {/* Add more words here in the future */}
            </LessonList>
        </>
    );
}