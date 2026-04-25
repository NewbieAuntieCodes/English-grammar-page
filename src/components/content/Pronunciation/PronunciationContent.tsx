/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { cardDataConfig } from '../../../data/definitions';
import { PronunciationIcon } from '../../../data/icons';
import { ContentHeader, ContentIcon, ContentTitle, ContentSubtitle } from '../../../styles/shared';
import { LessonList, LessonItem, LessonTitleChinese, LessonTitleEnglish } from '../Structures/StructuresContent.styles';
import { EdPronunciationContent } from './EdPronunciationContent';

interface ContentProps {
    startLesson: (lessonType: string) => void;
}

type View = 'list' | 'ed-pronunciation';

export const PronunciationContent: React.FC<ContentProps> = ({ startLesson }) => {
    const [view, setView] = useState<View>('list');
    const themeColor = cardDataConfig.find(card => card.id === 'pronunciation')?.color || '#9b59b6';
    
    if (view === 'ed-pronunciation') {
        return <EdPronunciationContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('list')} />;
    }

    return (
        <>
            <ContentHeader>
                <ContentIcon><PronunciationIcon /></ContentIcon>
                <div>
                    <ContentTitle>发音练习</ContentTitle>
                    <ContentSubtitle>Pronunciation Practice</ContentSubtitle>
                </div>
            </ContentHeader>
            <LessonList>
                <LessonItem borderColor={themeColor} onClick={() => setView('ed-pronunciation')}>
                    <LessonTitleChinese>-ed 结尾的发音</LessonTitleChinese>
                    <LessonTitleEnglish>Pronunciation of -ed Endings</LessonTitleEnglish>
                </LessonItem>
            </LessonList>
        </>
    );
}