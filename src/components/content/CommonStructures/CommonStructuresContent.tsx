/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { cardDataConfig } from '../../../data/definitions';
import { CommonStructureIcon } from '../../../data/icons';
import { ContentHeader, ContentIcon, ContentTitle, ContentSubtitle } from '../../../styles/shared';
import { LessonList, LessonItem, LessonTitleChinese, LessonTitleEnglish } from '../Structures/StructuresContent.styles'; // Reuse styles
import { GerundAsSubjectContent } from './GerundAsSubjectContent';
import { ItIsAdjForSbContent } from './ItIsAdjForSbContent';


interface ContentProps {
    startLesson: (lessonType: string) => void;
}

type View = 'list' | 'gerund-subject' | 'it-is-adj';

export const CommonStructuresContent: React.FC<ContentProps> = ({ startLesson }) => {
    const [view, setView] = useState<View>('list');
    const themeColor = cardDataConfig.find(card => card.id === 'common-structures')?.color || '#5e72e4';
    
    if (view === 'gerund-subject') {
        return <GerundAsSubjectContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('it-is-adj')} />;
    }

    if (view === 'it-is-adj') {
        return <ItIsAdjForSbContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('list')} />;
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
                <LessonItem borderColor={themeColor} onClick={() => setView('gerund-subject')}>
                    <LessonTitleChinese>动名词做主语</LessonTitleChinese>
                    <LessonTitleEnglish>Gerund as Subject (V-ing...)</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('it-is-adj')}>
                    <LessonTitleChinese>It is adj for sb. to do sth.</LessonTitleChinese>
                    <LessonTitleEnglish>Formal Subject "It"</LessonTitleEnglish>
                </LessonItem>
            </LessonList>
        </>
    );
}