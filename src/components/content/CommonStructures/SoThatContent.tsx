/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import {
    LessonContainer,
    LessonTitle,
    BackButton,
    WhyLearnSection,
    SectionTitle,
    ExamplesSection,
    ExampleItem,
    ExampleHeader,
    SpeakButton,
    ExampleEnglish,
    ExampleChinese,
} from '../Structures/SVOContent.styles';
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';
import { FillInTheBlankPractice } from '../../practice/FillInTheBlankPractice';
import { PracticeModeSwitcher, ModeButton } from '../../practice/SentenceBuilderPractice.styles';
import styled from 'styled-components';

interface SoThatContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const UsageType = styled.h3`
    font-size: 1.2em;
    font-weight: bold;
    color: #2d3748;
    margin-top: 20px;
    margin-bottom: 10px;
`;

const buildPracticeData = [
    { words: [{ en: 'I got up early', cn: '我起得很早' }, { en: 'so that', cn: '以便' }, { en: 'I could catch the train', cn: '我能赶上火车' }], correct: ['I got up early', 'so that', 'I could catch the train'], chinese: '我起得很早，以便能赶上火车。' },
    { words: [{ en: 'The box was', cn: '这个箱子' }, { en: 'so heavy that', cn: '太重以至于' }, { en: 'I couldn\'t lift it', cn: '我搬不动它' }], correct: ['The box was', 'so heavy that', 'I couldn\'t lift it'], chinese: '这个箱子太重了，以至于我搬不动它。' },
    { words: [{ en: 'She spoke quietly', cn: '她轻声说话' }, { en: 'so that', cn: '以便' }, { en: 'she wouldn\'t wake the baby', cn: '她不会吵醒宝宝' }], correct: ['She spoke quietly', 'so that', 'she wouldn\'t wake the baby'], chinese: '她轻声说话，以免吵醒宝宝。' },
    { words: [{ en: 'The weather was', cn: '天气' }, { en: 'so cold that', cn: '太冷以至于' }, { en: 'the river froze', cn: '河水结冰了' }], correct: ['The weather was', 'so cold that', 'the river froze'], chinese: '天气太冷了，以至于河水都结冰了。' },
    { words: [{ en: 'He is saving money', cn: '他在存钱' }, { en: 'so that', cn: '以便' }, { en: 'he can buy a car', cn: '他能买一辆车' }], correct: ['He is saving money', 'so that', 'he can buy a car'], chinese: '他正在存钱，以便能买一辆车。' },
];

const fillPracticeData = [
    { sentenceParts: ["He works hard ", " he can support his family."] as const, choices: [{text: "so that", isCorrect: true}, {text: "so", isCorrect: false}, {text: "that", isCorrect: false}], chineseHint: "他努力工作以便能养家。" },
    { sentenceParts: ["It was ", " dark that we couldn't see anything."] as const, choices: [{text: "so", isCorrect: true}, {text: "so that", isCorrect: false}, {text: "very", isCorrect: false}], chineseHint: "天太黑了，以至于我们什么也看不见。" },
    { sentenceParts: ["Please be quiet ", " I can concentrate."] as const, choices: [{text: "so that", isCorrect: true}, {text: "so", isCorrect: false}, {text: "that", isCorrect: false}], chineseHint: "请安静，以便我能集中精力。" },
    { sentenceParts: ["She was ", " happy that she started to cry."] as const, choices: [{text: "so", isCorrect: true}, {text: "so that", isCorrect: false}, {text: "very", isCorrect: false}], chineseHint: "她太高兴了，以至于哭了起来。" },
    { sentenceParts: ["He left early ", " he wouldn't miss the train."] as const, choices: [{text: "so that", isCorrect: true}, {text: "so", isCorrect: false}, {text: "that", isCorrect: false}], chineseHint: "他早早地离开，以免错过火车。" },
];

export const SoThatContent: React.FC<SoThatContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [practiceMode, setPracticeMode] = useState<'build' | 'fill'>('build');

    useEffect(() => {
        const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
        if ('speechSynthesis' in window) {
            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
        return () => { if ('speechSynthesis' in window) window.speechSynthesis.onvoiceschanged = null; };
    }, []);

    const handleSpeak = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            const usVoice = voices.find(voice => voice.lang === 'en-US');
            utterance.voice = usVoice || voices.find(voice => voice.lang.startsWith('en-')) || null;
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to List</BackButton>
            <LessonTitle>🎯 'so that' vs 'so...that...'</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>
                    "so that" 和 "so...that..." 是两个非常重要且容易混淆的状语从句。<strong>"so that" 用来表示【目的】</strong>（为了...），而 <strong>"so...that..." 用来表示【结果】</strong>（如此...以至于...）。学会区分它们，能让你的因果和目的表达更清晰、更准确。
                </p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. so that (表示目的)</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    结构：<strong>句子 + so that + 句子 (通常带 can/could/will/would)</strong><br/>
                    这个结构回答了“为了什么目的？” (For what purpose?)。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>He studied hard <strong>so that</strong> he could pass the exam.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He studied hard so that he could pass the exam.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他努力学习，以便能通过考试。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Speak clearly <strong>so that</strong> everyone can understand you.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Speak clearly so that everyone can understand you.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>请说清楚一点，这样大家都能听懂你。</ExampleChinese>
                </ExampleItem>
                
                <UsageType>2. so...that... (表示结果)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    结构：<strong>so + 形容词/副词 + that + 句子</strong><br/>
                    这个结构强调“程度如此之深，以至于产生了某种结果”。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>He was <strong>so tired that</strong> he fell asleep immediately.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He was so tired that he fell asleep immediately.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他太累了，以至于马上就睡着了。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>She ran <strong>so quickly that</strong> nobody could catch her.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('She ran so quickly that nobody could catch her.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>她跑得非常快，以至于没人能追上她。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <PracticeModeSwitcher>
                <ModeButton 
                    isActive={practiceMode === 'build'} 
                    onClick={() => setPracticeMode('build')}
                    themeColor={themeColor}
                >
                    组句练习
                </ModeButton>
                <ModeButton 
                    isActive={practiceMode === 'fill'} 
                    onClick={() => setPracticeMode('fill')}
                    themeColor={themeColor}
                >
                    选择题
                </ModeButton>
            </PracticeModeSwitcher>

            {practiceMode === 'build' ? (
                <SentenceBuilderPractice
                    themeColor={themeColor}
                    onCompleteAll={() => setPracticeMode('fill')}
                    practiceData={buildPracticeData}
                    title="🎯 练习：构建句子"
                    subtitle="用下面的词组成句子"
                    completionTitle="🎉 Good Job!"
                    completionMessage="你已完成组句练习！"
                    nextButtonText="开始选择题 →"
                />
            ) : (
                 <FillInTheBlankPractice
                    themeColor={themeColor}
                    onCompleteAll={onCompleteAll}
                    practiceData={fillPracticeData}
                    title="🎯 练习：选择题"
                    subtitle="选择正确的单词或短语"
                    completionTitle="🎉 Awesome!"
                    completionMessage="你已经掌握了这两个重要句型！"
                    nextButtonText="返回列表"
                />
            )}
        </LessonContainer>
    );
};
