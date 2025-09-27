/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { TensesIcon } from '../../../data/icons';
import { cardDataConfig } from '../../../data/definitions';
import { ContentHeader, ContentIcon, ContentTitle, ContentSubtitle } from '../../../styles/shared';
import {
    TenseTimeline,
    TenseItem,
    TenseTitleContainer,
    TenseChinese,
    TenseEnglish,
    TenseDescription
} from './TensesContent.styles';
import { PastTenseContent } from './PastTenseContent';
import { PresentContinuousContent } from './PresentContinuousContent';

interface ContentProps {
    startLesson: (lessonType: string) => void;
}

type View = 'list' | 'past-tense' | 'present-continuous' | 'past-continuous' | 'future-tense';

export const TensesContent: React.FC<ContentProps> = ({ startLesson }) => {
    const [view, setView] = useState<View>('list');
    const themeColor = cardDataConfig.find(card => card.id === 'tenses')?.color || '#f093fb';

    if (view === 'past-tense') {
        // FIX: Added onCompleteAll to navigate to the next lesson.
        return <PastTenseContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('present-continuous')} />;
    }

    if (view === 'present-continuous') {
        // FIX: Added onCompleteAll to navigate back to the list as it's the last implemented lesson.
        return <PresentContinuousContent onBack={() => setView('list')} themeColor={themeColor} onCompleteAll={() => setView('list')} />;
    }

    // Placeholder for other lessons, you can add them here later.
    // if (view === 'past-continuous') { ... }

    return (
        <>
            <ContentHeader>
                <ContentIcon><TensesIcon /></ContentIcon>
                <div>
                    <ContentTitle>基础时态学习</ContentTitle>
                    <ContentSubtitle>Basic Tenses</ContentSubtitle>
                </div>
            </ContentHeader>
            <TenseTimeline>
                <TenseItem onClick={() => setView('past-tense')}>
                    <TenseTitleContainer>
                        <TenseChinese>一般过去时</TenseChinese>
                        <TenseEnglish>Simple Past Tense</TenseEnglish>
                    </TenseTitleContainer>
                    <TenseDescription>表示过去发生的事情</TenseDescription>
                </TenseItem>
                <TenseItem onClick={() => setView('present-continuous')}>
                    <TenseTitleContainer>
                        <TenseChinese>现在进行时</TenseChinese>
                        <TenseEnglish>Present Continuous</TenseEnglish>
                    </TenseTitleContainer>
                    <TenseDescription>正在进行的动作</TenseDescription>
                </TenseItem>
                <TenseItem onClick={() => startLesson('past-continuous')}>
                    <TenseTitleContainer>
                        <TenseChinese>过去进行时</TenseChinese>
                        <TenseEnglish>Past Continuous</TenseEnglish>
                    </TenseTitleContainer>
                    <TenseDescription>过去正在进行的动作</TenseDescription>
                </TenseItem>
                <TenseItem onClick={() => startLesson('future-tense')}>
                    <TenseTitleContainer>
                        <TenseChinese>将来时</TenseChinese>
                        <TenseEnglish>Future Tense</TenseEnglish>
                    </TenseTitleContainer>
                    <TenseDescription>表示将来的事情</TenseDescription>
                </TenseItem>
            </TenseTimeline>
        </>
    );
};
