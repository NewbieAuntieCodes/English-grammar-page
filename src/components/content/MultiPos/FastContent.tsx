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

interface FastContentProps {
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
    { words: [{ en: 'He is a', cn: '他是个' }, { en: 'fast', cn: '快的' }, { en: 'runner', cn: '跑者' }], correct: ['He is a', 'fast', 'runner'], chinese: '他是一个跑得很快的人。' },
    { words: [{ en: 'He', cn: '他' }, { en: 'runs', cn: '跑得' }, { en: 'fast', cn: '快' }], correct: ['He', 'runs', 'fast'], chinese: '他跑得很快。' },
    { words: [{ en: 'This is a', cn: '这是一辆' }, { en: 'fast car', cn: '快车' }], correct: ['This is a', 'fast car'], chinese: '这是一辆快车。' },
    { words: [{ en: 'Time goes', cn: '时间过得' }, { en: 'so fast', cn: '如此快' }], correct: ['Time goes', 'so fast'], chinese: '时间过得真快。' },
    { words: [{ en: 'She', cn: '她' }, { en: 'is a', cn: '是个' }, { en: 'fast learner', cn: '学得快的人' }], correct: ['She', 'is a', 'fast learner'], chinese: '她学东西很快。' },
    { words: [{ en: 'Don\'t talk', cn: '别说得' }, { en: 'so fast', cn: '那么快' }], correct: ['Don\'t talk', 'so fast'], chinese: '别说那么快。' },
];

export const FastContent: React.FC<FastContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>🔄 "Fast" 的多种用法</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"Fast" 是一个常见的例子，它可以作形容词也可以作副词，但形式完全一样。很多初学者会误用 "fastly"（这是一个不存在的词！）。学会区分 "fast" 的用法很重要。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. 作形容词 (Adjective)</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    当 "fast" 用来修饰一个名词（人或事物）时，它是形容词，意思是“快的”。它回答了“什么样的？”这个问题。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>He is a <strong>fast</strong> runner.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He is a fast runner.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他是一个跑得很快的人。(什么样的 runner? -> fast runner)</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>This is a <strong>fast</strong> car.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('This is a fast car.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这是一辆快车。(什么样的 car? -> fast car)</ExampleChinese>
                </ExampleItem>

                <UsageType>2. 作副词 (Adverb)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    当 "fast" 用来修饰一个动词（动作）时，它是副词，意思是“快地”。它回答了“动作怎么样？”这个问题。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>He runs <strong>fast</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He runs fast.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他跑得很快。(跑得怎么样? -> 跑得 fast)</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Don't talk so <strong>fast</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("Don't talk so fast."); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>别说那么快。(说得怎么样? -> 说得 fast)</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：使用 'fast'"
                subtitle="用下面的词组成句子，注意 'fast' 的位置"
                completionTitle="🎉 Excellent!"
                completionMessage="你已经掌握了 'fast' 的用法！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};
