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


interface ContentProps {
    startLesson: (lessonType: string) => void;
}

type View = 'list' | 'fast';

export const MultiPosContent: React.FC<ContentProps> = ({ startLesson }) => {
    const [view, setView] = useState<View>('list');
    const themeColor = cardDataConfig.find(card => card.id === 'multi-pos')?.color || '#1abc9c';
    
    if (view === 'fast') {
        return <FastContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('list')} />;
    }

    return (
        <>
            <ContentHeader>
                <ContentIcon><MultiPosIcon /></ContentIcon>
                <div>
                    <ContentTitle>一词多义</ContentTitle>
                    <ContentSubtitle>Multi-functional Words</ContentSubtitle>
                </div>
            </ContentHeader>
            <LessonList>
                <LessonItem borderColor={themeColor} onClick={() => setView('fast')}>
                    <LessonTitleChinese>Fast</LessonTitleChinese>
                    <LessonTitleEnglish>Adjective & Adverb</LessonTitleEnglish>
                </LessonItem>
                {/* Add more words here in the future */}
            </LessonList>
        </>
    );
}