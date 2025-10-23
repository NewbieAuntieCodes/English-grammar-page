/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { cardDataConfig } from '../../../data/definitions';
import { StructureIcon } from '../../../data/icons';
import { ContentHeader, ContentIcon, ContentTitle, ContentSubtitle } from '../../../styles/shared';
import { 
    LessonList, 
    LessonItem, 
    LessonTitleChinese, 
    LessonTitleEnglish 
} from './StructuresContent.styles';
import { SVOContent } from './SVOContent';
import { SVCContent } from './SVCContent';
import { SVOCContent } from './SVOCContent';
import { SentenceExpansionContent } from './SentenceExpansionContent';

interface ContentProps {
    startLesson: (lessonType: string) => void;
}

type View = 'list' | 'svo' | 'svc' | 'svoc' | 'expansion';

export const StructuresContent: React.FC<ContentProps> = ({ startLesson }) => {
    const [view, setView] = useState<View>('list');

    const themeColor = cardDataConfig.find(card => card.id === 'structures')?.color || '#ff6b6b';

    if (view === 'svo') {
        return <SVOContent 
            onBack={() => setView('list')} 
            themeColor={themeColor} 
            onCompleteAll={() => setView('svc')}
        />;
    }

    if (view === 'svc') {
        return <SVCContent
            onBack={() => setView('list')}
            themeColor={themeColor}
            onCompleteAll={() => setView('svoc')}
        />;
    }

    if (view === 'svoc') {
        return <SVOCContent
            onBack={() => setView('list')}
            themeColor={themeColor}
        />;
    }

    if (view === 'expansion') {
        return <SentenceExpansionContent
            onBack={() => setView('list')}
            themeColor={themeColor}
        />;
    }

    return (
        <>
            <ContentHeader>
                <ContentIcon><StructureIcon /></ContentIcon>
                <div>
                    <ContentTitle>基础句型结构</ContentTitle>
                    <ContentSubtitle>Basic Sentence Structures</ContentSubtitle>
                </div>
            </ContentHeader>
            <LessonList>
                <LessonItem borderColor={themeColor} onClick={() => setView('svo')}>
                    <LessonTitleChinese>主语 + 谓语 + 宾语</LessonTitleChinese>
                    <LessonTitleEnglish>Subject + Verb + Object (SVO)</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('svc')}>
                    <LessonTitleChinese>主语 + 系动词 + 表语</LessonTitleChinese>
                    <LessonTitleEnglish>Subject + Verb + Complement (SVC)</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('svoc')}>
                    <LessonTitleChinese>主语 + 谓语 + 宾语 + 宾补</LessonTitleChinese>
                    <LessonTitleEnglish>Subject + Verb + Object + Complement (SVOC)</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('expansion')}>
                    <LessonTitleChinese>简单句扩展练习</LessonTitleChinese>
                    <LessonTitleEnglish>Simple Sentence Expansion</LessonTitleEnglish>
                </LessonItem>
            </LessonList>
        </>
    );
};