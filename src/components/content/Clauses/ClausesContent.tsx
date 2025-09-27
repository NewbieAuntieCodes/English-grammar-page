/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { cardDataConfig } from '../../../data/definitions';
import { ClausesIcon } from '../../../data/icons';
import { ContentHeader, ContentIcon, ContentTitle, ContentSubtitle } from '../../../styles/shared';
import {
    IntroClauseStep,
    ClauseProgression,
    ClauseStep,
    ClauseTitleContainer,
    LessonTitleChinese,
    LessonTitleEnglish,
    ClauseDescription
} from './ClausesContent.styles';
import { WhatIsAClauseContent } from './WhatIsAClauseContent';
import { ObjectClausesContent } from './ObjectClausesContent';
import { AttributiveClausesContent } from './AttributiveClausesContent';
import { AdverbialClausesContent } from './AdverbialClausesContent';
import { SubjectClausesContent } from './SubjectClausesContent';


interface ContentProps {
    startLesson: (lessonType: string) => void;
}

type View = 'list' | 'what-is-a-clause' | 'object-clauses' | 'attributive-clauses' | 'adverbial-clauses' | 'subject-clauses';


export const ClausesContent: React.FC<ContentProps> = ({ startLesson }) => {
    const [view, setView] = useState<View>('list');
    const themeColor = cardDataConfig.find(card => card.id === 'clauses')?.color || '#48dbfb';
    
    if (view === 'what-is-a-clause') {
        return <WhatIsAClauseContent onBack={() => setView('list')} themeColor={themeColor} onComplete={() => setView('object-clauses')} />;
    }

    if (view === 'object-clauses') {
        return <ObjectClausesContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('attributive-clauses')} />;
    }

    if (view === 'attributive-clauses') {
        return <AttributiveClausesContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('adverbial-clauses')} />;
    }

    if (view === 'adverbial-clauses') {
        return <AdverbialClausesContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('subject-clauses')} />;
    }

    if (view === 'subject-clauses') {
        return <SubjectClausesContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('list')} />;
    }

    return (
        <>
            <ContentHeader>
                <ContentIcon><ClausesIcon /></ContentIcon>
                <div>
                    <ContentTitle>从句</ContentTitle>
                    <ContentSubtitle>Clauses</ContentSubtitle>
                </div>
            </ContentHeader>
            <ClauseProgression>
                <IntroClauseStep onClick={() => setView('what-is-a-clause')} color={themeColor}>
                    <ClauseTitleContainer>
                        <LessonTitleChinese>什么是从句？</LessonTitleChinese>
                        <LessonTitleEnglish>What is a Clause?</LessonTitleEnglish>
                    </ClauseTitleContainer>
                    <ClauseDescription>- 点击了解从句的基本概念</ClauseDescription>
                </IntroClauseStep>
                <ClauseStep onClick={() => setView('object-clauses')} color={themeColor}>
                    <ClauseTitleContainer>
                        <LessonTitleChinese>宾语从句</LessonTitleChinese>
                        <LessonTitleEnglish>Object Clauses</LessonTitleEnglish>
                    </ClauseTitleContainer>
                    <ClauseDescription>- 作宾语的从句</ClauseDescription>
                </ClauseStep>
                <ClauseStep onClick={() => setView('attributive-clauses')} color={themeColor}>
                    <ClauseTitleContainer>
                        <LessonTitleChinese>定语从句</LessonTitleChinese>
                        <LessonTitleEnglish>Attributive Clauses</LessonTitleEnglish>
                    </ClauseTitleContainer>
                    <ClauseDescription>- 修饰名词的从句</ClauseDescription>
                </ClauseStep>
                <ClauseStep onClick={() => setView('adverbial-clauses')} color={themeColor}>
                    <ClauseTitleContainer>
                        <LessonTitleChinese>状语从句</LessonTitleChinese>
                        <LessonTitleEnglish>Adverbial Clauses</LessonTitleEnglish>
                    </ClauseTitleContainer>
                    <ClauseDescription>- 作状语的从句</ClauseDescription>
                </ClauseStep>
                <ClauseStep onClick={() => setView('subject-clauses')} color={themeColor}>
                    <ClauseTitleContainer>
                        <LessonTitleChinese>主语从句</LessonTitleChinese>
                        <LessonTitleEnglish>Subject Clauses</LessonTitleEnglish>
                    </ClauseTitleContainer>
                    <ClauseDescription>- 作主语的从句</ClauseDescription>
                </ClauseStep>
            </ClauseProgression>
        </>
    );
}