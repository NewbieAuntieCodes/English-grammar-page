/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { ContentHeader, ContentIcon, ContentTitle, ContentSubtitle } from '../../../styles/shared';
import { StructureIcon } from '../../../data/icons';
import { LessonList, LessonItem, LessonTitleChinese, LessonTitleEnglish } from './StructuresContent.styles';
import { SVOCNounContent } from './SVOCNounContent';
import { SVOCAdjectiveContent } from './SVOCAdjectiveContent';
import { BackButton } from './SVOContent.styles';


interface SVOCContentProps {
    onBack: () => void;
    themeColor: string;
}

export const SVOCContent: React.FC<SVOCContentProps> = ({ onBack, themeColor }) => {
    const [view, setView] = useState<'menu' | 'noun' | 'adjective'>('menu');

    if (view === 'noun') {
        return <SVOCNounContent 
            onBack={() => setView('menu')} 
            themeColor={themeColor} 
            onCompleteAll={() => setView('adjective')}
        />;
    }
    
    if (view === 'adjective') {
        return <SVOCAdjectiveContent
            onBack={() => setView('menu')}
            themeColor={themeColor}
            onCompleteAll={onBack}
        />;
    }

    return (
        <>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Main List</BackButton>
            <ContentHeader>
                <ContentIcon><StructureIcon /></ContentIcon>
                <div>
                    <ContentTitle>主语 + 谓语 + 宾语 + 宾补</ContentTitle>
                    <ContentSubtitle>Subject + Verb + Object + Complement</ContentSubtitle>
                </div>
            </ContentHeader>
            <LessonList>
                <LessonItem borderColor={themeColor} onClick={() => setView('noun')}>
                    <LessonTitleChinese>类型一：宾补是名词</LessonTitleChinese>
                    <LessonTitleEnglish>Type 1: Noun as Complement</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('adjective')}>
                    <LessonTitleChinese>类型二：宾补是形容词</LessonTitleChinese>
                    <LessonTitleEnglish>Type 2: Adjective as Complement</LessonTitleEnglish>
                </LessonItem>
            </LessonList>
        </>
    );
};
