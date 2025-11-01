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
import { AvailableAccessibleContent } from './AvailableAccessibleContent';
import { BalanceAndContent } from './BalanceAndContent';
import { HelpUsageContent } from './HelpUsageContent';
import { PityUsageContent } from './PityUsageContent';
import { IncorporateCooperateCorporateContent } from './IncorporateCooperateCorporateContent';

interface ContentProps {
    startLesson: (lessonType: string) => void;
}

type View = 'list' | 'affect-effect' | 'available-accessible' | 'balance-and' | 'help-usage' | 'pity-usage' | 'incorporate-cooperate-corporate';

export const VocabularyContent: React.FC<ContentProps> = ({ startLesson }) => {
    const [view, setView] = useState<View>('list');
    const themeColor = cardDataConfig.find(card => card.id === 'vocabulary')?.color || '#3498db';
    
    if (view === 'affect-effect') {
        return <AffectEffectContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('available-accessible')} />;
    }

    if (view === 'available-accessible') {
        return <AvailableAccessibleContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('balance-and')} />;
    }

    if (view === 'balance-and') {
        return <BalanceAndContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('help-usage')} />;
    }

    if (view === 'help-usage') {
        return <HelpUsageContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('pity-usage')} />;
    }

    if (view === 'pity-usage') {
        return <PityUsageContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('incorporate-cooperate-corporate')} />;
    }

    if (view === 'incorporate-cooperate-corporate') {
        return <IncorporateCooperateCorporateContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('list')} />;
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
                <LessonItem borderColor={themeColor} onClick={() => setView('available-accessible')}>
                    <LessonTitleChinese>Available vs. Accessible</LessonTitleChinese>
                    <LessonTitleEnglish>Commonly Confused Adjectives</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('balance-and')}>
                    <LessonTitleChinese>'balance ... and ...' 的用法</LessonTitleChinese>
                    <LessonTitleEnglish>Phrase: 'balance ... and ...'</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('help-usage')}>
                    <LessonTitleChinese>'help' 的用法</LessonTitleChinese>
                    <LessonTitleEnglish>Usage of 'help'</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('pity-usage')}>
                    <LessonTitleChinese>'pity' 的用法</LessonTitleChinese>
                    <LessonTitleEnglish>Usage of 'pity'</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('incorporate-cooperate-corporate')}>
                    <LessonTitleChinese>Incorporate / Cooperate / Corporate</LessonTitleChinese>
                    <LessonTitleEnglish>Commonly Confused Words</LessonTitleEnglish>
                </LessonItem>
            </LessonList>
        </>
    );
}