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

interface OfUsageContentProps {
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
    { words: [{ en: 'The roof', cn: '屋顶' }, { en: 'of the house', cn: '房子的' }, { en: 'is red', cn: '是红色的' }], correct: ['The roof', 'of the house', 'is red'], chinese: '房子的屋顶是红色的。' },
    { words: [{ en: 'He is a man', cn: '他是个男人' }, { en: 'of his word', cn: '信守诺言的' }], correct: ['He is a man', 'of his word'], chinese: '他是一个信守诺言的人。' },
    { words: [{ en: 'I would like', cn: '我想要' }, { en: 'a glass', cn: '一杯' }, { en: 'of water', cn: '水' }], correct: ['I would like', 'a glass', 'of water'], chinese: '我想要一杯水。' },
    { words: [{ en: 'She is a member', cn: '她是成员' }, { en: 'of our team', cn: '我们团队的' }], correct: ['She is a member', 'of our team'], chinese: '她是我们团队的一员。' },
    { words: [{ en: 'The end', cn: '结局' }, { en: 'of the movie', cn: '电影的' }, { en: 'was sad', cn: '是悲伤的' }], correct: ['The end', 'of the movie', 'was sad'], chinese: '电影的结局是悲伤的。' },
    { words: [{ en: 'This ring is made', cn: '这个戒指制成' }, { en: 'of gold', cn: '金的' }], correct: ['This ring is made', 'of gold'], chinese: '这个戒指是金子做的。' },
    { words: [{ en: 'Most', cn: '大多数' }, { en: 'of the students', cn: '学生' }, { en: 'passed the exam', cn: '通过了考试' }], correct: ['Most', 'of the students', 'passed the exam'], chinese: '大多数学生通过了考试。' },
    { words: [{ en: 'Some', cn: '一些' }, { en: 'of the books', cn: '书本' }, { en: 'are interesting', cn: '很有趣' }], correct: ['Some', 'of the books', 'are interesting'], chinese: '有些书很有趣。' },
];

export const OfUsageContent: React.FC<OfUsageContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>🤝 介词 'of' 的用法</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"of" 是英语中使用最频繁的介词之一。它主要用来表示所属关系（...的），但也有很多其他用法，比如表示部分、材料、内容等。掌握它对构建名词短语至关重要！</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. 表示所属 (Possession)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The color <strong>of the sky</strong> is blue.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The color of the sky is blue.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>天空的颜色是蓝色的。</ExampleChinese>
                </ExampleItem>

                <UsageType>2. 表示部分 (Part of a whole)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>One <strong>of my friends</strong> is a doctor.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('One of my friends is a doctor.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我的朋友中有一位是医生。</ExampleChinese>
                </ExampleItem>

                <UsageType>3. 表示材料或内容 (Material or Content)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>This table is made <strong>of wood</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('This table is made of wood.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这张桌子是木头做的。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I want a cup <strong>of tea</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I want a cup of tea.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我想要一杯茶。</ExampleChinese>
                </ExampleItem>

                <UsageType>4. 表示特征 (Characteristic)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>She is a woman <strong>of courage</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('She is a woman of courage.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>她是一位有勇气的女性。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：使用 'of' 构建句子"
                subtitle="用下面的词组成句子"
                completionTitle="🎉 Perfect!"
                completionMessage="你已经掌握了 'of' 的用法！"
                nextButtonText="学习 'with' 的用法 →"
            />
        </LessonContainer>
    );
};