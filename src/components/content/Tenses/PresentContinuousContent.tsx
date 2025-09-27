/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { LessonContainer, BackButton, LessonTitle, WhyLearnSection, SectionTitle, FormulaSection, FormulaTitle, FormulaParts, PlusSign, SVOFormulaPart } from '../Structures/SVOContent.styles';
import { SpellingRulesSection, SpellingTable, TableHeader, TableRow, TableCell, StorySelector, StoryButton } from './PastTenseContent.styles';
import { presentContinuousStories, PresentContinuousStory } from '../../../data/presentContinuousStories';
import { StoryPractice } from '../../practice/StoryPractice';

interface PresentContinuousContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

export const PresentContinuousContent: React.FC<PresentContinuousContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [selectedStory, setSelectedStory] = useState<PresentContinuousStory>(presentContinuousStories[0]);
    
    const handleExplainPart = (part: 'be' | 'verb-ing') => {
        const explanations = {
            'be': "be 动词: 根据主语的人称和数来变化。\n\n- I am\n- He/She/It is\n- We/You/They are",
            'verb-ing': "现在分词 (Verb-ing): 在动词原形后加上 -ing。\n\n也叫 'v-ing' 形式。注意一些拼写变化，比如 double a consonant or drop an 'e'。"
        };
        alert(explanations[part]);
    };

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Tenses List</BackButton>
            <LessonTitle>🏃 现在进行时 (Present Continuous)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>现在进行时用来描述【现在正在发生】的动作。如果你想说 “我正在吃饭” 或 “天正在下雨”，就必须用这个时态。它让你的描述充满动感！</p>
            </WhyLearnSection>

            <FormulaSection themeColor={themeColor}>
                <FormulaTitle themeColor={themeColor}>现在进行时结构</FormulaTitle>
                <FormulaParts>
                     <SVOFormulaPart themeColor={themeColor}>
                        <div className="svo-part-english">Subject</div>
                        <div className="svo-part-chinese">主语</div>
                    </SVOFormulaPart>
                    <PlusSign themeColor={themeColor}>+</PlusSign>
                    <SVOFormulaPart themeColor={themeColor} onClick={() => handleExplainPart('be')}>
                        <div className="svo-part-english">am / is / are</div>
                        <div className="svo-part-chinese">be 动词</div>
                    </SVOFormulaPart>
                    <PlusSign themeColor={themeColor}>+</PlusSign>
                    <SVOFormulaPart themeColor={themeColor} onClick={() => handleExplainPart('verb-ing')}>
                        <div className="svo-part-english">Verb-ing</div>
                        <div className="svo-part-chinese">动词-ing形式</div>
                    </SVOFormulaPart>
                </FormulaParts>
            </FormulaSection>

            <SpellingRulesSection>
                <SectionTitle>✍️ 动词-ing 拼写变化</SectionTitle>
                 <SpellingTable>
                    <TableRow>
                        <TableHeader themeColor={themeColor}>规则</TableHeader>
                        <TableHeader themeColor={themeColor}>例子</TableHeader>
                        <TableHeader themeColor={themeColor}>说明</TableHeader>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>直接 + ing</strong></TableCell>
                        <TableCell>go → going<br/>read → reading</TableCell>
                        <TableCell>大多数动词</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>以 e 结尾, 去 e, + ing</strong></TableCell>
                        <TableCell>come → coming<br/>write → writing</TableCell>
                        <TableCell>动词以不发音的 e 结尾</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>重读闭音节, 双写末尾辅音, + ing</strong></TableCell>
                        <TableCell>run → running<br/>sit → sitting</TableCell>
                        <TableCell>末尾为“辅音+元音+辅音”</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell><strong>以 ie 结尾, 变 ie 为 y, + ing</strong></TableCell>
                        <TableCell>lie → lying<br/>die → dying</TableCell>
                        <TableCell>这是一个特殊的规则</TableCell>
                    </TableRow>
                </SpellingTable>
            </SpellingRulesSection>
            
            <StorySelector>
                {presentContinuousStories.map((story) => (
                    <StoryButton 
                        key={story.title} 
                        isActive={selectedStory.title === story.title}
                        onClick={() => setSelectedStory(story)}
                        themeColor={themeColor}
                    >
                        {story.title}
                    </StoryButton>
                ))}
            </StorySelector>

            <StoryPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                storyData={selectedStory.storyData}
                title="🎯 练习：完成小故事"
                subtitle="选择正确的现在进行时形式"
                completionTitle="🎉 Fantastic!"
                completionMessage="你已经掌握了现在进行时的用法！"
                nextButtonText="完成时态学习"
            />
        </LessonContainer>
    );
};
