/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { cardDataConfig } from '../../../data/definitions';
import { CommonStructureIcon } from '../../../data/icons';
import { ContentHeader, ContentIcon, ContentTitle, ContentSubtitle } from '../../../styles/shared';
import { LessonList, LessonItem, LessonTitleChinese, LessonTitleEnglish } from '../Structures/StructuresContent.styles'; // Reuse styles
import { GerundsContent } from './GerundsContent';
import { ItIsAdjForSbContent } from './ItIsAdjForSbContent';
import { WithUsageContent } from './WithUsageContent';


interface ContentProps {
    startLesson: (lessonType: string) => void;
}

type View = 'list' | 'gerunds' | 'it-is-adj' | 'with-usage';

export const CommonStructuresContent: React.FC<ContentProps> = ({ startLesson }) => {
    const [view, setView] = useState<View>('list');
    const themeColor = cardDataConfig.find(card => card.id === 'common-structures')?.color || '#5e72e4';
    
    if (view === 'gerunds') {
        return <GerundsContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('it-is-adj')} />;
    }

    if (view === 'it-is-adj') {
        return <ItIsAdjForSbContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('with-usage')} />;
    }

    if (view === 'with-usage') {
        return <WithUsageContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('list')} />;
    }

    return (
        <>
            <ContentHeader>
                <ContentIcon><CommonStructureIcon /></ContentIcon>
                <div>
                    <ContentTitle>常见句子结构</ContentTitle>
                    <ContentSubtitle>Common Sentence Structures</ContentSubtitle>
                </div>
            </ContentHeader>
            <LessonList>
                <LessonItem borderColor={themeColor} onClick={() => setView('gerunds')}>
                    <LessonTitleChinese>动名词的用法</LessonTitleChinese>
                    <LessonTitleEnglish>Usage of Gerunds (V-ing)</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('it-is-adj')}>
                    <LessonTitleChinese>It is adj./noun for sb. to do sth.</LessonTitleChinese>
                    <LessonTitleEnglish>Formal Subject "It"</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('with-usage')}>
                    <LessonTitleChinese>介词 'with' 的用法</LessonTitleChinese>
                    <LessonTitleEnglish>Usage of Preposition "with"</LessonTitleEnglish>
                </LessonItem>
            </LessonList>
        </>
    );
}