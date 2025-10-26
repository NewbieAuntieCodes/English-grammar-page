/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { cardDataConfig } from '../../../data/definitions';
import { VocabularyIcon } from '../../../data/icons';
import { ContentHeader, ContentIcon, ContentTitle, ContentSubtitle } from '../../../styles/shared';
import { LessonList, LessonItem, LessonTitleChinese, LessonTitleEnglish } from '../Structures/StructuresContent.styles'; // Reuse styles
import { AffectEffectContent } from './AffectEffectContent';

interface ContentProps {
    startLesson: (lessonType: string) => void;
}

type View = 'list' | 'affect-effect';

export const VocabularyContent: React.FC<ContentProps> = ({ startLesson }) => {
    const [view, setView] = useState<View>('list');
    const themeColor = cardDataConfig.find(card => card.id === 'vocabulary')?.color || '#3498db';
    
    if (view === 'affect-effect') {
        return <AffectEffectContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('list')} />;
    }

    return (
        <>
            <ContentHeader>
                <ContentIcon><VocabularyIcon /></ContentIcon>
                <div>
                    <ContentTitle>词汇练习</ContentTitle>
                    <ContentSubtitle>Vocabulary Practice</ContentSubtitle>
                </div>
            </ContentHeader>
            <LessonList>
                <LessonItem borderColor={themeColor} onClick={() => setView('affect-effect')}>
                    <LessonTitleChinese>Affect vs. Effect</LessonTitleChinese>
                    <LessonTitleEnglish>Commonly Confused Words</LessonTitleEnglish>
                </LessonItem>
            </LessonList>
        </>
    );
}