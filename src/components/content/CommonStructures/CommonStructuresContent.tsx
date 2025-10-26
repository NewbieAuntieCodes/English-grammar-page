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
import { InfinitivesContent } from './InfinitivesContent';
import { OfUsageContent } from './OfUsageContent';
import { ByUsageContent } from './ByUsageContent';
import { AsAsUsageContent } from './AsAsUsageContent';


interface ContentProps {
    startLesson: (lessonType: string) => void;
}

type View = 'list' | 'gerunds' | 'it-is-adj' | 'of-usage' | 'with-usage' | 'infinitives' | 'by-usage' | 'as-as-usage';

export const CommonStructuresContent: React.FC<ContentProps> = ({ startLesson }) => {
    const [view, setView] = useState<View>('list');
    const themeColor = cardDataConfig.find(card => card.id === 'common-structures')?.color || '#5e72e4';
    
    if (view === 'gerunds') {
        return <GerundsContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('infinitives')} />;
    }

    if (view === 'infinitives') {
        return <InfinitivesContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('it-is-adj')} />;
    }

    if (view === 'it-is-adj') {
        return <ItIsAdjForSbContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('of-usage')} />;
    }

    if (view === 'of-usage') {
        return <OfUsageContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('with-usage')} />;
    }

    if (view === 'with-usage') {
        return <WithUsageContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('by-usage')} />;
    }

    if (view === 'by-usage') {
        return <ByUsageContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('as-as-usage')} />;
    }

    if (view === 'as-as-usage') {
        return <AsAsUsageContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('list')} />;
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
                <LessonItem borderColor={themeColor} onClick={() => setView('infinitives')}>
                    <LessonTitleChinese>不定式的用法</LessonTitleChinese>
                    <LessonTitleEnglish>Usage of Infinitives (to do)</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('it-is-adj')}>
                    <LessonTitleChinese>It is adj./noun for sb. to do sth.</LessonTitleChinese>
                    <LessonTitleEnglish>Formal Subject "It"</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('of-usage')}>
                    <LessonTitleChinese>介词 'of' 的用法</LessonTitleChinese>
                    <LessonTitleEnglish>Usage of Preposition "of"</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('with-usage')}>
                    <LessonTitleChinese>介词 'with' 的用法</LessonTitleChinese>
                    <LessonTitleEnglish>Usage of Preposition "with"</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('by-usage')}>
                    <LessonTitleChinese>介词 'by' 的用法</LessonTitleChinese>
                    <LessonTitleEnglish>Usage of Preposition "by"</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('as-as-usage')}>
                    <LessonTitleChinese>同级比较 'as...as'</LessonTitleChinese>
                    <LessonTitleEnglish>Comparisons with "as...as"</LessonTitleEnglish>
                </LessonItem>
            </LessonList>
        </>
    );
}