/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { LessonContainer, BackButton, LessonTitle, WhyLearnSection, SectionTitle, ExamplesSection, ExampleItem, ExampleHeader, SpeakButton, ExampleEnglish, ExampleChinese } from '../Structures/SVOContent.styles';
import { RuleContainer, RuleCard, RuleTitle, RuleExplanation, ExamplePair, Verb, Arrow, StorySelector, StoryButton } from './PastTenseContent.styles';
import { futureTenseStories } from '../../../data/futureTenseStories';
import { StoryPractice } from '../../practice/StoryPractice';

interface FutureTenseContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

export const FutureTenseContent: React.FC<FutureTenseContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [storyIndex, setStoryIndex] = useState(0);

    useEffect(() => {
        const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
        if ('speechSynthesis' in window) {
            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
        return () => {
            if ('speechSynthesis' in window) window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    const handleStoryComplete = () => {
        if (storyIndex < futureTenseStories.length - 1) {
            setStoryIndex(prev => prev + 1);
        } else {
            onCompleteAll();
        }
    };

    const handleSpeak = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            const usVoice = voices.find(voice => voice.lang === 'en-US');
            utterance.voice = usVoice || voices.find(voice => voice.lang.startsWith('en-')) || null;
            utterance.rate = 0.9;
            utterance.pitch = 1.1;
            window.speechSynthesis.speak(utterance);
        }
    };

    const isLastStory = storyIndex >= futureTenseStories.length - 1;

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Tenses List</BackButton>
            <LessonTitle>🚀 一般将来时 (Simple Future Tense)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>将来时用来谈论【未来】的计划、意图、预测和承诺。英语中最常用 "will" 和 "be going to" 来表达将来，它们有细微的差别。</p>
            </WhyLearnSection>

            <SectionTitle>📝 两种核心结构</SectionTitle>

            <RuleContainer>
                <RuleCard themeColor={themeColor}>
                    <RuleTitle>be going to</RuleTitle>
                    <RuleExplanation>
                        用于表示【事先计划好】的意图或【有迹象表明】要发生的事。<br/>
                        <strong>注意:</strong> 'be' 动词需要根据主语变化 (am/is/are)。
                    </RuleExplanation>
                    <ExamplePair>
                        <Verb>I + study</Verb><Arrow themeColor={themeColor}>→</Arrow><Verb>I <strong>am going to</strong> study</Verb>
                    </ExamplePair>
                    <ExamplePair>
                        <Verb>He + watch</Verb><Arrow themeColor={themeColor}>→</Arrow><Verb>He <strong>is going to</strong> watch</Verb>
                    </ExamplePair>
                    <ExamplePair>
                        <Verb>They + travel</Verb><Arrow themeColor={themeColor}>→</Arrow><Verb>They <strong>are going to</strong> travel</Verb>
                    </ExamplePair>
                </RuleCard>
                <RuleCard themeColor={themeColor}>
                    <RuleTitle>will</RuleTitle>
                    <RuleExplanation>
                        用于表示【临时决定】、【预测】、【承诺】或【提议】。<br/>
                        <strong>注意:</strong> 'will' 不随主语变化，常缩写为 <strong>'ll</strong>。
                    </RuleExplanation>
                    <ExamplePair>
                        <Verb>I + help</Verb><Arrow themeColor={themeColor}>→</Arrow><Verb>I <strong>will</strong> help (I'll help)</Verb>
                    </ExamplePair>
                     <ExamplePair>
                        <Verb>She + call</Verb><Arrow themeColor={themeColor}>→</Arrow><Verb>She <strong>will</strong> call (She'll call)</Verb>
                    </ExamplePair>
                     <ExamplePair>
                        <Verb>We + win</Verb><Arrow themeColor={themeColor}>→</Arrow><Verb>We <strong>will</strong> win (We'll win)</Verb>
                    </ExamplePair>
                </RuleCard>
            </RuleContainer>
            
            <ExamplesSection>
                <SectionTitle>📝 例子 (Examples)</SectionTitle>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>We <strong>are going to</strong> travel to Japan next year.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('We are going to travel to Japan next year.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我们明年要去日本旅行。(be going to: 预先计划)</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Look at the dark clouds! It<strong>'s going to</strong> rain.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("Look at the dark clouds! It's going to rain."); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>看那乌云！快要下雨了。(be going to: 有迹象的预测)</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I think he <strong>will</strong> win the game.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I think he will win the game.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我认为他会赢得比赛。(will: 个人观点的预测)</ExampleChinese>
                </ExampleItem>
                 <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Don't worry, I <strong>will</strong> help you.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("Don't worry, I will help you."); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>别担心，我会帮你的。(will: 承诺)</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <StorySelector>
                {futureTenseStories.map((story, index) => (
                    <StoryButton 
                        key={story.title} 
                        isActive={storyIndex === index}
                        onClick={() => setStoryIndex(index)}
                        themeColor={themeColor}
                    >
                        {story.title}
                    </StoryButton>
                ))}
            </StorySelector>

            <StoryPractice
                themeColor={themeColor}
                onCompleteAll={handleStoryComplete}
                storyData={futureTenseStories[storyIndex].storyData}
                title={`🎯 练习：${futureTenseStories[storyIndex].title}`}
                subtitle="选择正确的将来时形式"
                completionTitle="🎉 Story Complete!"
                completionMessage="你已经完成了这个故事！"
                nextButtonText={isLastStory ? "完成所有时态学习" : "下一个故事 →"}
            />
        </LessonContainer>
    );
};