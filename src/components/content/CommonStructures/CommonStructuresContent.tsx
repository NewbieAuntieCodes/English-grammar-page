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
import { MakeUsageContent } from './MakeUsageContent';
import { AsUsageContent } from './AsUsageContent';
import { AsAsUsageContent } from './AsAsUsageContent';
import { ThereBeContent } from './ThereBeContent';
import { EdIngAdjectivesContent } from './EdIngAdjectivesContent';
import { WhatHowExclamationsContent } from './WhatHowExclamationsContent';
import { SoThatContent } from './SoThatContent';
import { ComparativesSuperlativesContent } from './ComparativesSuperlativesContent';
import { OneOfUsageContent } from './OneOfUsageContent';


interface ContentProps {
    startLesson: (lessonType: string) => void;
}

type View = 'list' | 'gerunds' | 'it-is-adj' | 'of-usage' | 'with-usage' | 'infinitives' | 'by-usage' | 'make-usage' | 'as-usage' | 'as-as-usage' | 'there-be' | 'ed-ing-adjectives' | 'what-how-exclamations' | 'so-that' | 'comparatives-superlatives' | 'one-of-usage';

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
        return <ItIsAdjForSbContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('there-be')} />;
    }

    if (view === 'there-be') {
        return <ThereBeContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('ed-ing-adjectives')} />;
    }

    if (view === 'ed-ing-adjectives') {
        return <EdIngAdjectivesContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('of-usage')} />;
    }

    if (view === 'of-usage') {
        return <OfUsageContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('with-usage')} />;
    }

    if (view === 'with-usage') {
        return <WithUsageContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('by-usage')} />;
    }

    if (view === 'by-usage') {
        return <ByUsageContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('make-usage')} />;
    }

    if (view === 'make-usage') {
        return <MakeUsageContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('as-usage')} />;
    }

    if (view === 'as-usage') {
        return <AsUsageContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('as-as-usage')} />;
    }

    if (view === 'as-as-usage') {
        return <AsAsUsageContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('comparatives-superlatives')} />;
    }

    if (view === 'comparatives-superlatives') {
        return <ComparativesSuperlativesContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('what-how-exclamations')} />;
    }

    if (view === 'what-how-exclamations') {
        return <WhatHowExclamationsContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('so-that')} />;
    }

    if (view === 'so-that') {
        return <SoThatContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('one-of-usage')} />;
    }

    if (view === 'one-of-usage') {
        return <OneOfUsageContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('list')} />;
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
                    <LessonTitleChinese>动词-ing的用法</LessonTitleChinese>
                    <LessonTitleEnglish>Usage of V-ing</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('infinitives')}>
                    <LessonTitleChinese>不定式的用法</LessonTitleChinese>
                    <LessonTitleEnglish>Usage of Infinitives (to do)</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('it-is-adj')}>
                    <LessonTitleChinese>It is adj./noun for sb. to do sth.</LessonTitleChinese>
                    <LessonTitleEnglish>Formal Subject "It"</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('there-be')}>
                    <LessonTitleChinese>There be 句型</LessonTitleChinese>
                    <LessonTitleEnglish>Usage of "There is/are"</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('ed-ing-adjectives')}>
                    <LessonTitleChinese>形容词 -ed vs -ing</LessonTitleChinese>
                    <LessonTitleEnglish>Adjectives: -ed vs -ing</LessonTitleEnglish>
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
                <LessonItem borderColor={themeColor} onClick={() => setView('make-usage')}>
                    <LessonTitleChinese>'make' 的用法</LessonTitleChinese>
                    <LessonTitleEnglish>Usage of 'make'</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('as-usage')}>
                    <LessonTitleChinese>as 的用法</LessonTitleChinese>
                    <LessonTitleEnglish>Usage of "as"</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('as-as-usage')}>
                    <LessonTitleChinese>同级比较 'as...as'</LessonTitleChinese>
                    <LessonTitleEnglish>Comparisons with "as...as"</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('comparatives-superlatives')}>
                    <LessonTitleChinese>比较级和最高级</LessonTitleChinese>
                    <LessonTitleEnglish>Comparatives & Superlatives</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('what-how-exclamations')}>
                    <LessonTitleChinese>What 和 How 的感叹句</LessonTitleChinese>
                    <LessonTitleEnglish>Exclamations with "What & How"</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('so-that')}>
                    <LessonTitleChinese>so that / so...that... 的用法</LessonTitleChinese>
                    <LessonTitleEnglish>Expressing Purpose and Result</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('one-of-usage')}>
                    <LessonTitleChinese>'one of' 的用法</LessonTitleChinese>
                    <LessonTitleEnglish>Usage of "one of"</LessonTitleEnglish>
                </LessonItem>
            </LessonList>
        </>
    );
}