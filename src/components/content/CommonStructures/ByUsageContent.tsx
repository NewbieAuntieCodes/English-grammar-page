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

interface ByUsageContentProps {
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
    { words: [{ en: 'The cake', cn: '蛋糕' }, { en: 'was made', cn: '被制作' }, { en: 'by my mother', cn: '由我妈妈' }], correct: ['The cake', 'was made', 'by my mother'], chinese: '这个蛋糕是我妈妈做的。' },
    { words: [{ en: 'I go to school', cn: '我上学' }, { en: 'by bus', cn: '乘公交车' }], correct: ['I go to school', 'by bus'], chinese: '我乘公交车上学。' },
    { words: [{ en: 'You can pay', cn: '你可以支付' }, { en: 'by credit card', cn: '用信用卡' }], correct: ['You can pay', 'by credit card'], chinese: '你可以用信用卡支付。' },
    { words: [{ en: 'Please finish', cn: '请完成' }, { en: 'the report', cn: '报告' }, { en: 'by Friday', cn: '在周五前' }], correct: ['Please finish', 'the report', 'by Friday'], chinese: '请在周五前完成报告。' },
    { words: [{ en: 'The house', cn: '房子' }, { en: 'is', cn: '是' }, { en: 'by the river', cn: '在河边' }], correct: ['The house', 'is', 'by the river'], chinese: '房子在河边。' },
    { words: [{ en: 'He learned English', cn: '他学英语' }, { en: 'by watching movies', cn: '通过看电影' }], correct: ['He learned English', 'by watching movies'], chinese: '他通过看电影学会了英语。' },
    { words: [{ en: 'The window', cn: '窗户' }, { en: 'was broken', cn: '被打破了' }, { en: 'by the children', cn: '被孩子们' }], correct: ['The window', 'was broken', 'by the children'], chinese: '窗户被孩子们打破了。' },
    { words: [{ en: 'You must arrive', cn: '你必须到达' }, { en: 'by 10 AM', cn: '在上午10点前' }], correct: ['You must arrive', 'by 10 AM'], chinese: '你必须在上午10点前到达。' },
];

export const ByUsageContent: React.FC<ByUsageContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>🤝 介词 'by' 的用法</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"by" 是一个功能强大的介词。它最常见的用法是引出被动语态中的动作执行者，还可以表示方式、途径、在...旁边或截止时间。掌握它对于理解和使用更复杂的句子至关重要！</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. 表示方式、方法 (Method/Means)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I go to work <strong>by subway</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I go to work by subway.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我乘地铁上班。(交通方式)</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>You can pay <strong>by cash</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('You can pay by cash.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>你可以用现金支付。(支付方式)</ExampleChinese>
                </ExampleItem>
                
                <UsageType>2. 引出被动语态的动作执行者 (Agent in Passive)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The novel was written <strong>by him</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The novel was written by him.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这本小说是他写的。</ExampleChinese>
                </ExampleItem>

                <UsageType>3. 表示截止时间 (Deadline)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Please finish it <strong>by Monday</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Please finish it by Monday.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>请在周一前完成它。</ExampleChinese>
                </ExampleItem>

                <UsageType>4. 表示位置“在...旁边” (Proximity)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>He lives in a house <strong>by the sea</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He lives in a house by the sea.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他住在一所海边的房子里。</ExampleChinese>
                </ExampleItem>

            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：使用 'by' 构建句子"
                subtitle="用下面的词组成句子"
                completionTitle="🎉 Perfect!"
                completionMessage="你已经掌握了 'by' 的用法！"
                nextButtonText="学习 'for' 的用法 →"
            />
        </LessonContainer>
    );
};
