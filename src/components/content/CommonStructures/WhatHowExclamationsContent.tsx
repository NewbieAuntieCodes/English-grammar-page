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
import styled from 'styled-components';

interface WhatHowExclamationsContentProps {
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

const practiceData = [
    { words: [{ en: 'What a', cn: '多么' }, { en: 'beautiful', cn: '美丽的' }, { en: 'garden!', cn: '花园！' }], correct: ['What a', 'beautiful', 'garden!'], chinese: '多么美丽的花园啊！' },
    { words: [{ en: 'How fast', cn: '多么快' }, { en: 'he', cn: '他' }, { en: 'runs!', cn: '跑得！' }], correct: ['How fast', 'he', 'runs!'], chinese: '他跑得真快啊！' },
    { words: [{ en: 'What an', cn: '多么一本' }, { en: 'interesting book', cn: '有趣的书' }, { en: 'this is!', cn: '这是！' }], correct: ['What an', 'interesting book', 'this is!'], chinese: '这是一本多么有趣的书啊！' },
    { words: [{ en: 'How cold', cn: '多么冷' }, { en: 'it is', cn: '天气' }, { en: 'today!', cn: '今天！' }], correct: ['How cold', 'it is', 'today!'], chinese: '今天天气真冷啊！' },
    { words: [{ en: 'What a', cn: '多么一顿' }, { en: 'delicious', cn: '美味的' }, { en: 'meal!', cn: '餐！' }], correct: ['What a', 'delicious', 'meal!'], chinese: '多么美味的一餐啊！' },
    { words: [{ en: 'How well', cn: '多么好' }, { en: 'she', cn: '她' }, { en: 'sings!', cn: '唱得！' }], correct: ['How well', 'she', 'sings!'], chinese: '她唱得多好啊！' },
    { words: [{ en: 'What a surprise', cn: '多么惊喜' }, { en: 'to see', cn: '见到' }, { en: 'you here!', cn: '你在这里！' }], correct: ['What a surprise', 'to see', 'you here!'], chinese: '在这里见到你真是个惊喜！' },
    { words: [{ en: 'How quickly', cn: '多么快' }, { en: 'time', cn: '时间' }, { en: 'flies!', cn: '飞逝！' }], correct: ['How quickly', 'time', 'flies!'], chinese: '时间过得真快啊！' },
];

export const WhatHowExclamationsContent: React.FC<WhatHowExclamationsContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

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
            <LessonTitle>😲 What & How 感叹句</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>
                    感叹句是用来表达强烈情感（如惊讶、赞美、喜悦）的句子。学会使用 "What" 和 "How" 开头的感叹句，能让你的英语表达更富有感情色彩，听起来更生动！
                </p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要结构</SectionTitle>

                <UsageType>1. What 感叹句 (强调名词)</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    结构：<strong>What + a/an + (形容词) + 单数可数名词!</strong> 或 <strong>What + (形容词) + 复数/不可数名词!</strong><br/>
                    这个结构的核心是强调“一个多么...的【名词】啊！”
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>What a beautiful day!</strong></ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('What a beautiful day!'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>多美好的一天啊！ (强调的是 a day)</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>What beautiful flowers!</strong></ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('What beautiful flowers!'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>多美的花儿啊！(强调的是 flowers, 复数名词前不用 a/an)</ExampleChinese>
                </ExampleItem>
                
                <UsageType>2. How 感叹句 (强调形容词/副词)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    结构：<strong>How + 形容词/副词 + (主语 + 谓语)!</strong><br/>
                    这个结构的核心是强调“多么地...啊！”
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>How beautiful</strong> the flower is!</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('How beautiful the flower is!'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这朵花多美啊！(强调的是 beautiful)</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>How fast</strong> he runs!</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('How fast he runs!'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他跑得多快啊！(强调的是 fast)</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：构建感叹句"
                subtitle="用下面的词组成感叹句"
                completionTitle="🎉 Fantastic!"
                completionMessage="你已经掌握了感叹句的用法！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};