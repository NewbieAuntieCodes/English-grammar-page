
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { cardDataConfig } from '../../../data/definitions';
import { QuestionsIcon } from '../../../data/icons';
import { ContentHeader, ContentIcon, ContentTitle, ContentSubtitle } from '../../../styles/shared';
import { 
    LessonList, 
    LessonItem, 
    LessonTitleChinese, 
    LessonTitleEnglish 
} from '../Structures/StructuresContent.styles';
import { ModalVerbsContent } from './ModalVerbsContent';
import { YesNoQuestionsContent } from './YesNoQuestionsContent';
import { WhQuestionsContent } from './WhQuestionsContent';
import { OtherQuestionsContent } from './OtherQuestionsContent';

interface ContentProps {
    startLesson: (lessonType: string) => void;
}

type View = 'list' | 'modal-verbs' | 'yes-no-questions' | 'wh-questions' | 'other-questions';

export const QuestionsContent: React.FC<ContentProps> = ({ startLesson }) => {
    const [view, setView] = useState<View>('list');

    const themeColor = cardDataConfig.find(card => card.id === 'questions')?.color || '#ff4757';

    if (view === 'modal-verbs') {
        return <ModalVerbsContent
            onBack={() => setView('list')}
            themeColor={themeColor}
        />;
    }

    if (view === 'yes-no-questions') {
        return <YesNoQuestionsContent
            onBack={() => setView('list')}
            themeColor={themeColor}
        />;
    }

    if (view === 'wh-questions') {
        return <WhQuestionsContent
            onBack={() => setView('list')}
            themeColor={themeColor}
        />;
    }

    if (view === 'other-questions') {
        return <OtherQuestionsContent
            onBack={() => setView('list')}
            themeColor={themeColor}
        />;
    }

    return (
        <>
            <ContentHeader>
                <ContentIcon><QuestionsIcon /></ContentIcon>
                <div>
                    <ContentTitle>疑问句学习</ContentTitle>
                    <ContentSubtitle>Questions</ContentSubtitle>
                </div>
            </ContentHeader>
            <LessonList>
                <LessonItem borderColor={themeColor} onClick={() => setView('modal-verbs')}>
                    <LessonTitleChinese>情态动词</LessonTitleChinese>
                    <LessonTitleEnglish>Modal Verbs</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('yes-no-questions')}>
                    <LessonTitleChinese>一般疑问句</LessonTitleChinese>
                    <LessonTitleEnglish>Yes/No Questions</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('wh-questions')}>
                    <LessonTitleChinese>特殊疑问句</LessonTitleChinese>
                    <LessonTitleEnglish>Wh- Questions</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('other-questions')}>
                    <LessonTitleChinese>其他常见疑问句</LessonTitleChinese>
                    <LessonTitleEnglish>Other Common Questions</LessonTitleEnglish>
                </LessonItem>
            </LessonList>
        </>
    );
};
