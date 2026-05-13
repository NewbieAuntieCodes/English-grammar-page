/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import styled from 'styled-components';
import { cardDataConfig } from '../../../data/definitions';
import { CommonStructureIcon } from '../../../data/icons';
import { ContentHeader, ContentIcon, ContentTitle, ContentSubtitle } from '../../../styles/shared';
import { LessonTitleChinese, LessonTitleEnglish } from '../Structures/StructuresContent.styles'; // Reuse styles
import { GerundsContent } from './GerundsContent';
import { ItIsAdjForSbContent } from './ItIsAdjForSbContent';
import { WithUsageContent } from './WithUsageContent';
import { InfinitivesContent } from './InfinitivesContent';
import { OfUsageContent } from './OfUsageContent';
import { ByUsageContent } from './ByUsageContent';
import { ForUsageContent } from './ForUsageContent';
import { MakeUsageContent } from './MakeUsageContent';
import { KeepUsageContent } from './KeepUsageContent';
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

type View = 'list' | 'gerunds' | 'it-is-adj' | 'of-usage' | 'with-usage' | 'infinitives' | 'by-usage' | 'for-usage' | 'make-usage' | 'keep-usage' | 'as-usage' | 'as-as-usage' | 'there-be' | 'ed-ing-adjectives' | 'what-how-exclamations' | 'so-that' | 'comparatives-superlatives' | 'one-of-usage';

const GroupedLessonList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 28px;
`;

const LessonGroup = styled.section`
    width: 100%;
`;

const LessonGroupHeader = styled.div`
    margin-bottom: 14px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e2e8f0;
`;

const LessonGroupTitle = styled.h3`
    font-size: 1.15em;
    font-weight: 800;
    color: #2d3748;
    margin: 0 0 4px;
`;

const LessonGroupSubtitle = styled.p`
    font-size: 0.95em;
    color: #718096;
    margin: 0;
`;

const LessonGrid = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
`;

const GroupLessonItem = styled.li<{ $borderColor: string }>`
    background: white;
    border-radius: 12px;
    padding: 20px;
    min-height: 112px;
    border-left: 5px solid ${props => props.$borderColor};
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0,0,0,0.06);

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
`;

const lessonGroups: Array<{
    title: string;
    subtitle: string;
    lessons: Array<{
        view: Exclude<View, 'list'>;
        titleChinese: string;
        titleEnglish: string;
    }>;
}> = [
    {
        title: '基础句型骨架',
        subtitle: '先掌握句子的基础框架，再往里面添加信息。',
        lessons: [
            { view: 'there-be', titleChinese: 'There be 句型', titleEnglish: 'Usage of "There is/are"' },
            { view: 'it-is-adj', titleChinese: 'It is adj./noun for sb. to do sth.', titleEnglish: 'Formal Subject "It"' },
            { view: 'one-of-usage', titleChinese: "'one of' 的用法", titleEnglish: 'Usage of "one of"' },
        ],
    },
    {
        title: '非谓语结构',
        subtitle: '解决 doing、to do 和分词形容词这类高频结构。',
        lessons: [
            { view: 'gerunds', titleChinese: '动词-ing的用法', titleEnglish: 'Usage of V-ing' },
            { view: 'infinitives', titleChinese: '不定式的用法', titleEnglish: 'Usage of Infinitives (to do)' },
            { view: 'ed-ing-adjectives', titleChinese: '形容词 -ed vs -ing', titleEnglish: 'Adjectives: -ed vs -ing' },
        ],
    },
    {
        title: '高频介词用法',
        subtitle: '把 of、with、by、for 这些最常用的小词分清楚。',
        lessons: [
            { view: 'of-usage', titleChinese: "介词 'of' 的用法", titleEnglish: 'Usage of Preposition "of"' },
            { view: 'with-usage', titleChinese: "介词 'with' 的用法", titleEnglish: 'Usage of Preposition "with"' },
            { view: 'by-usage', titleChinese: "介词 'by' 的用法", titleEnglish: 'Usage of Preposition "by"' },
            { view: 'for-usage', titleChinese: "介词 'for' 的用法", titleEnglish: 'Usage of Preposition "for"' },
        ],
    },
    {
        title: '高频动词结构',
        subtitle: '学习 make、keep 这类能带出复杂句意的动词结构。',
        lessons: [
            { view: 'make-usage', titleChinese: "'make' 的用法", titleEnglish: "Usage of 'make'" },
            { view: 'keep-usage', titleChinese: "'keep' 的用法", titleEnglish: "Usage of 'keep'" },
        ],
    },
    {
        title: '比较、结果与感叹',
        subtitle: '练习表达比较、目的、结果和强烈感受的常用结构。',
        lessons: [
            { view: 'as-usage', titleChinese: 'as 的用法', titleEnglish: 'Usage of "as"' },
            { view: 'as-as-usage', titleChinese: "同级比较 'as...as'", titleEnglish: 'Comparisons with "as...as"' },
            { view: 'comparatives-superlatives', titleChinese: '比较级和最高级', titleEnglish: 'Comparatives & Superlatives' },
            { view: 'what-how-exclamations', titleChinese: 'What 和 How 的感叹句', titleEnglish: 'Exclamations with "What & How"' },
            { view: 'so-that', titleChinese: 'so that / so...that... 的用法', titleEnglish: 'Expressing Purpose and Result' },
        ],
    },
];

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
        return <ByUsageContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('for-usage')} />;
    }

    if (view === 'for-usage') {
        return <ForUsageContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('make-usage')} />;
    }

    if (view === 'make-usage') {
        return <MakeUsageContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('keep-usage')} />;
    }

    if (view === 'keep-usage') {
        return <KeepUsageContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('as-usage')} />;
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
            <GroupedLessonList>
                {lessonGroups.map(group => (
                    <LessonGroup key={group.title}>
                        <LessonGroupHeader>
                            <LessonGroupTitle>{group.title}</LessonGroupTitle>
                            <LessonGroupSubtitle>{group.subtitle}</LessonGroupSubtitle>
                        </LessonGroupHeader>
                        <LessonGrid>
                            {group.lessons.map(lesson => (
                                <GroupLessonItem
                                    key={lesson.view}
                                    $borderColor={themeColor}
                                    onClick={() => setView(lesson.view)}
                                >
                                    <LessonTitleChinese>{lesson.titleChinese}</LessonTitleChinese>
                                    <LessonTitleEnglish>{lesson.titleEnglish}</LessonTitleEnglish>
                                </GroupLessonItem>
                            ))}
                        </LessonGrid>
                    </LessonGroup>
                ))}
            </GroupedLessonList>
        </>
    );
}
