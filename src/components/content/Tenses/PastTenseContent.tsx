/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { LessonContainer, BackButton, LessonTitle, WhyLearnSection, SectionTitle } from '../Structures/SVOContent.styles';
import { RuleContainer, RuleCard, RuleTitle, RuleExplanation, ExamplePair, Verb, Arrow, SpellingRulesSection, SpellingTable, TableHeader, TableRow, TableCell, StorySelector, StoryButton } from './PastTenseContent.styles';
import { pastTenseStories, PastTenseStory } from '../../../data/pastTenseStories';
import { StoryPractice } from '../../practice/StoryPractice';

interface PastTenseContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

export const PastTenseContent: React.FC<PastTenseContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedStory, setSelectedStory] = useState<PastTenseStory>(pastTenseStories[0]);

    React.useEffect(() => {
        const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
        if ('speechSynthesis' in window) {
            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
        return () => {
            if ('speechSynthesis' in window) window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Tenses List</BackButton>
            <LessonTitle>🕰️ 一般过去时 (Simple Past Tense)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>一般过去时是英语中最常用的时态之一，用来谈论【过去发生并已结束】的动作或状态。比如讲故事、说昨天做了什么，都需要用到它！</p>
            </WhyLearnSection>

            <SectionTitle>📝 核心规则：动词变形</SectionTitle>

            <RuleContainer>
                <RuleCard themeColor={themeColor}>
                    <RuleTitle>规则动词 (Regular Verbs)</RuleTitle>
                    <RuleExplanation>大部分动词都是规则的，只需要在动词原形后面加上 <strong>-ed</strong>。</RuleExplanation>
                    <ExamplePair>
                        <Verb>work</Verb> <Arrow themeColor={themeColor}>→</Arrow> <Verb>work<strong>ed</strong></Verb>
                    </ExamplePair>
                    <ExamplePair>
                        <Verb>play</Verb> <Arrow themeColor={themeColor}>→</Arrow> <Verb>play<strong>ed</strong></Verb>
                    </ExamplePair>
                </RuleCard>
                <RuleCard themeColor={themeColor}>
                    <RuleTitle>不规则动词 (Irregular Verbs)</RuleTitle>
                    <RuleExplanation>一些常用动词有特殊的过去式形式，需要单独记忆。</RuleExplanation>
                    <ExamplePair>
                        <Verb>go</Verb> <Arrow themeColor={themeColor}>→</Arrow> <Verb>went</Verb>
                    </ExamplePair>
                    <ExamplePair>
                        <Verb>eat</Verb> <Arrow themeColor={themeColor}>→</Arrow> <Verb>ate</Verb>
                    </ExamplePair>
                </RuleCard>
            </RuleContainer>
            
            <SpellingRulesSection>
                <SectionTitle>✍️ 规则动词拼写变化</SectionTitle>
                 <SpellingTable>
                    <TableRow>
                        <TableHeader themeColor={themeColor}>规则</TableHeader>
                        <TableHeader themeColor={themeColor}>例子</TableHeader>
                        <TableHeader themeColor={themeColor}>说明</TableHeader>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>直接 + ed</strong></TableCell>
                        <TableCell>work → worked<br/>want → wanted</TableCell>
                        <TableCell>大多数动词</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>以 e 结尾, + d</strong></TableCell>
                        <TableCell>like → liked<br/>live → lived</TableCell>
                        <TableCell>动词以不发音的 e 结尾</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>辅音 + y, 变 y 为 i, + ed</strong></TableCell>
                        <TableCell>study → studied<br/>carry → carried</TableCell>
                        <TableCell>注意 play → played (元音+y)</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>重读闭音节, 双写末尾辅音, + ed</strong></TableCell>
                        <TableCell>stop → stopped<br/>plan → planned</TableCell>
                        <TableCell>末尾为“辅音+元音+辅音”</TableCell>
                    </TableRow>
                </SpellingTable>
            </SpellingRulesSection>
            
            <StorySelector>
                {pastTenseStories.map((story) => (
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
                subtitle="选择正确的动词过去式形式"
                completionTitle="🎉 Great Job!"
                completionMessage="你已经掌握了一般过去时的基本用法！"
                nextButtonText="学习现在进行时 →"
            />
        </LessonContainer>
    );
};
