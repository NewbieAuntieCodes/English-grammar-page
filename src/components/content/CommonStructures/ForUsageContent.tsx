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

interface ForUsageContentProps {
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
    { words: [{ en: 'This gift', cn: '这份礼物' }, { en: 'is for', cn: '是给' }, { en: 'you', cn: '你' }], correct: ['This gift', 'is for', 'you'], chinese: '这份礼物是给你的。' },
    { words: [{ en: 'I studied', cn: '我学习了' }, { en: 'for two hours', cn: '两个小时' }], correct: ['I studied', 'for two hours'], chinese: '我学习了两个小时。' },
    { words: [{ en: 'She bought', cn: '她买了' }, { en: 'a cake', cn: '一个蛋糕' }, { en: 'for her mother', cn: '给她妈妈' }], correct: ['She bought', 'a cake', 'for her mother'], chinese: '她给妈妈买了一个蛋糕。' },
    { words: [{ en: 'Thank you', cn: '谢谢你' }, { en: 'for your help', cn: '因为你的帮助' }], correct: ['Thank you', 'for your help'], chinese: '谢谢你的帮助。' },
    { words: [{ en: 'This tool', cn: '这个工具' }, { en: 'is used for', cn: '被用来' }, { en: 'cutting paper', cn: '剪纸' }], correct: ['This tool', 'is used for', 'cutting paper'], chinese: '这个工具是用来剪纸的。' },
    { words: [{ en: 'They left', cn: '他们出发' }, { en: 'for Beijing', cn: '去北京' }], correct: ['They left', 'for Beijing'], chinese: '他们动身去北京了。' },
    { words: [{ en: 'I paid', cn: '我付了' }, { en: 'ten dollars', cn: '十美元' }, { en: 'for this book', cn: '买这本书' }], correct: ['I paid', 'ten dollars', 'for this book'], chinese: '我花十美元买了这本书。' },
    { words: [{ en: 'Are you', cn: '你是' }, { en: 'for or against', cn: '支持还是反对' }, { en: 'the plan?', cn: '这个计划？' }], correct: ['Are you', 'for or against', 'the plan?'], chinese: '你支持还是反对这个计划？' },
];

export const ForUsageContent: React.FC<ForUsageContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>🎯 介词 'for' 的用法</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"for" 是英语里最常见的介词之一。它常用来表示“为了、给、持续多久、因为、支持”等意思。学会它，可以帮你把原因、对象、目的和时间说得更清楚。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. 表示目的 (Purpose)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I use this app <strong>for learning English</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I use this app for learning English.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我用这个应用来学习英语。</ExampleChinese>
                </ExampleItem>

                <UsageType>2. 表示对象或受益者 (Recipient/Benefit)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>This gift is <strong>for you</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('This gift is for you.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这份礼物是给你的。</ExampleChinese>
                </ExampleItem>

                <UsageType>3. 表示持续时间 (Duration)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>We waited <strong>for two hours</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('We waited for two hours.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我们等了两个小时。</ExampleChinese>
                </ExampleItem>

                <UsageType>4. 表示原因 (Reason)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Thank you <strong>for your help</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Thank you for your help.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>谢谢你的帮助。</ExampleChinese>
                </ExampleItem>

                <UsageType>5. 表示价格、交换或支持 (Exchange/Support)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I bought this book <strong>for ten dollars</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I bought this book for ten dollars.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我花十美元买了这本书。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Are you <strong>for the plan</strong>?</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Are you for the plan?'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>你支持这个计划吗？</ExampleChinese>
                </ExampleItem>

            </ExamplesSection>

            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：使用 'for' 构建句子"
                subtitle="用下面的词组成句子"
                completionTitle="🎉 Perfect!"
                completionMessage="你已经掌握了 'for' 的常见用法！"
                nextButtonText="学习 'make' 的用法 →"
            />
        </LessonContainer>
    );
};
