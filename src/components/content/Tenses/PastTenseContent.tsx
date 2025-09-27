/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    LessonContainer,
    BackButton,
    LessonTitle,
    WhyLearnSection,
    SectionTitle,
    ExamplesSection,
    ExampleItem,
    ExampleHeader,
    SpeakButton,
    ExampleEnglish,
    ExampleChinese,
} from '../PartsOfSpeech/PartsOfSpeechLesson.styles';
import {
    RuleContainer,
    RuleCard,
    RuleTitle,
    RuleExplanation,
    ExamplePair,
    Verb,
    Arrow,
    SpellingRulesSection,
    SpellingTable,
    TableHeader,
    TableRow,
    TableCell,
    StorySelector,
    StoryButton,
} from './PastTenseContent.styles';
import { StoryPractice } from '../../practice/StoryPractice';
import { pastTenseStories } from '../../../data/pastTenseStories';

interface PastTenseContentProps {
    onBack: () => void;
    themeColor: string;
}

export const PastTenseContent: React.FC<PastTenseContentProps> = ({ onBack, themeColor }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [activeExample, setActiveExample] = useState<string | null>(null);
    const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(0);
    const practiceRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
        if ('speechSynthesis' in window) {
            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
        return () => { if ('speechSynthesis' in window) window.speechSynthesis.onvoiceschanged = null; };
    }, []);

    const handleSpeak = useCallback((text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            const usVoice = voices.find(voice => voice.lang === 'en-US');
            utterance.voice = usVoice || voices.find(voice => voice.lang.startsWith('en-')) || null;
            utterance.rate = 0.9;
            utterance.pitch = 1.1;
            window.speechSynthesis.speak(utterance);
        }
    }, [voices]);

    const handleStorySelect = (index: number) => {
        setActiveStoryIndex(index);
        setTimeout(() => {
            practiceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const handlePracticeComplete = () => {
        setActiveStoryIndex(null);
        window.scrollTo({ top: practiceRef.current?.offsetTop, behavior: 'smooth' });
    };

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Tenses</BackButton>
            <LessonTitle>🕰️ Simple Past Tense (一般过去时)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>一般过去时是英语中最常用的时态之一！我们用它来谈论在过去某个特定时间点【已经完成】的动作或存在的状态。讲故事、说经历都离不开它。</p>
            </WhyLearnSection>

            <SectionTitle>🛠️ 如何构成一般过去时？</SectionTitle>
            <RuleContainer>
                <RuleCard themeColor={themeColor}>
                    <RuleTitle>1. 规则动词 (Regular Verbs)</RuleTitle>
                    <RuleExplanation>绝大多数动词都是规则的。我们只需要在动词原形后面加上 <strong>-ed</strong>。</RuleExplanation>
                    <ExamplePair><Verb>walk</Verb> <Arrow themeColor={themeColor}>→</Arrow> <Verb>walked</Verb></ExamplePair>
                    <ExamplePair><Verb>play</Verb> <Arrow themeColor={themeColor}>→</Arrow> <Verb>played</Verb></ExamplePair>
                    <ExamplePair><Verb>look</Verb> <Arrow themeColor={themeColor}>→</Arrow> <Verb>looked</Verb></ExamplePair>
                </RuleCard>
                <RuleCard themeColor={themeColor}>
                    <RuleTitle>2. 不规则动词 (Irregular Verbs)</RuleTitle>
                    <RuleExplanation>有些动词不按常理出牌！它们有自己独特的过去式形态，需要我们特殊记忆。</RuleExplanation>
                    <ExamplePair><Verb>go</Verb> <Arrow themeColor={themeColor}>→</Arrow> <Verb>went</Verb></ExamplePair>
                    <ExamplePair><Verb>eat</Verb> <Arrow themeColor={themeColor}>→</Arrow> <Verb>ate</Verb></ExamplePair>
                    <ExamplePair><Verb>see</Verb> <Arrow themeColor={themeColor}>→</Arrow> <Verb>saw</Verb></ExamplePair>
                </RuleCard>
            </RuleContainer>

            <SpellingRulesSection>
                <SectionTitle>✍️ 规则动词 "+ed" 的拼写技巧</SectionTitle>
                <SpellingTable>
                    <TableRow>
                        <TableHeader themeColor={themeColor}>规则</TableHeader>
                        <TableHeader themeColor={themeColor}>例子 (Example)</TableHeader>
                        <TableHeader themeColor={themeColor}>变化后 (Result)</TableHeader>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>以 -e 结尾</strong>: 直接 +d</TableCell>
                        <TableCell>like, move</TableCell>
                        <TableCell>liked, moved</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>辅音 + y 结尾</strong>: 变 y 为 i, 再 +ed</TableCell>
                        <TableCell>study, carry</TableCell>
                        <TableCell>studied, carried</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>重读闭音节结尾</strong>: 双写末尾辅音, 再 +ed</TableCell>
                        <TableCell>stop, plan</TableCell>
                        <TableCell>stopped, planned</TableCell>
                    </TableRow>
                </SpellingTable>
            </SpellingRulesSection>
            
            <ExamplesSection>
                <SectionTitle>📝 Examples</SectionTitle>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex1'} onClick={() => setActiveExample(p => p === 'ex1' ? null : 'ex1')}>
                    <ExampleHeader>
                        <ExampleEnglish>She <strong>worked</strong> hard yesterday.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('She worked hard yesterday.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>她昨天努力工作了。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex2'} onClick={() => setActiveExample(p => p === 'ex2' ? null : 'ex2')}>
                    <ExampleHeader>
                        <ExampleEnglish>We <strong>went</strong> to the park last Sunday.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('We went to the park last Sunday.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我们上周日去了公园。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <SectionTitle>📚 互动故事练习 (Interactive Stories)</SectionTitle>
            
            <StorySelector>
                {pastTenseStories.map((story, index) => (
                    <StoryButton 
                        key={index} 
                        themeColor={themeColor} 
                        isActive={activeStoryIndex === index}
                        onClick={() => handleStorySelect(index)}
                    >
                        {story.title.split('：')[0]}
                    </StoryButton>
                ))}
            </StorySelector>

            <div ref={practiceRef}>
                {activeStoryIndex !== null && (
                     <StoryPractice
                        key={activeStoryIndex}
                        themeColor={themeColor}
                        onCompleteAll={handlePracticeComplete}
                        storyData={pastTenseStories[activeStoryIndex].storyData}
                        title={pastTenseStories[activeStoryIndex].title}
                        subtitle={pastTenseStories[activeStoryIndex].description}
                        completionTitle="🎉 故事完成！"
                        completionMessage="你已经通过讲故事的方式，完美掌握了一般过去时！"
                        nextButtonText="返回故事列表"
                    />
                )}
            </div>
        </LessonContainer>
    );
};