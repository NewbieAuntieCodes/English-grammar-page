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

interface MakeUsageContentProps {
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
    { words: [{ en: 'My mother', cn: '我妈妈' }, { en: 'made', cn: '做了' }, { en: 'a delicious cake', cn: '一个美味的蛋糕' }], correct: ['My mother', 'made', 'a delicious cake'], chinese: '我妈妈做了一个美味的蛋糕。' },
    { words: [{ en: 'The sad movie', cn: '悲伤的电影' }, { en: 'made her', cn: '让她' }, { en: 'cry', cn: '哭' }], correct: ['The sad movie', 'made her', 'cry'], chinese: '这部悲伤的电影让她哭了。' },
    { words: [{ en: 'Your story', cn: '你的故事' }, { en: 'made me', cn: '让我' }, { en: 'sad', cn: '伤心' }], correct: ['Your story', 'made me', 'sad'], chinese: '你的故事让我感到伤心。' },
    { words: [{ en: 'They', cn: '他们' }, { en: 'made him', cn: '让他成为' }, { en: 'the class monitor', cn: '班长' }], correct: ['They', 'made him', 'the class monitor'], chinese: '他们让他当了班长。' },
    { words: [{ en: "Don't", cn: '不要' }, { en: 'make a noise', cn: '制造噪音' }], correct: ["Don't", 'make a noise'], chinese: '不要制造噪音。' },
    { words: [{ en: 'What', cn: '什么' }, { en: 'made you', cn: '让你' }, { en: 'change your mind?', cn: '改变主意？' }], correct: ['What', 'made you', 'change your mind?'], chinese: '是什么让你改变了主意？' },
    { words: [{ en: 'Exercise can', cn: '锻炼可以' }, { en: 'make you', cn: '让你' }, { en: 'strong', cn: '强壮' }], correct: ['Exercise can', 'make you', 'strong'], chinese: '锻炼可以让你强壮。' },
    { words: [{ en: 'The internet', cn: '互联网' }, { en: 'makes it', cn: '使它' }, { en: 'easy', cn: '容易' }, { en: 'to find info', cn: '找信息' }], correct: ['The internet', 'makes it', 'easy', 'to find info'], chinese: '互联网让查找信息变得容易。' },
    { words: [{ en: 'Heavy rain', cn: '大雨' }, { en: 'made it', cn: '使它' }, { en: 'dangerous', cn: '危险的' }, { en: 'to drive', cn: '开车' }], correct: ['Heavy rain', 'made it', 'dangerous', 'to drive'], chinese: '大雨使开车变得危险。' },
    { words: [{ en: 'This app', cn: '这个应用' }, { en: 'makes it', cn: '使它' }, { en: 'fun', cn: '有趣的' }, { en: 'to learn math', cn: '学数学' }], correct: ['This app', 'makes it', 'fun', 'to learn math'], chinese: '这个应用使学数学变得有趣。' },
];

export const MakeUsageContent: React.FC<MakeUsageContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>📖 'make' 的用法</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"make" 是英语中最核心的动词之一，意为“制作、使得、让”。它的用法非常多样，特别是在 "make sb do sth" 和 "make it + adj + to do" 的结构中，是表达因果和改变状态的关键。掌握它能极大提升你的造句能力。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要结构</SectionTitle>
                
                <UsageType>1. make + 名词 (制作；引起)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>She <strong>made a cake</strong> for my birthday.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('She made a cake for my birthday.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>她为我的生日做了一个蛋糕。</ExampleChinese>
                </ExampleItem>

                <UsageType>2. make + 宾语 + 形容词 (使...变得...)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The news <strong>made him happy</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The news made him happy.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这个消息让他很高兴。</ExampleChinese>
                </ExampleItem>
                
                <UsageType>3. make + 宾语 + 动词原形 (让某人做某事)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    这是使役动词的用法，表示让某人做某事。主动句里常用 <code>make sb do</code>，<code>do</code> 前不加 <code>to</code>。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>My parents <strong>made me clean</strong> my room.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('My parents made me clean my room.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我父母让我打扫我的房间。</ExampleChinese>
                </ExampleItem>

                <UsageType>4. make + 宾语 + 名词 (使...成为...)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>They <strong>made him the team captain</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('They made him the team captain.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他们让他成为了队长。</ExampleChinese>
                </ExampleItem>

                <UsageType>5. make it + adj. + to do (使做某事变得...)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    这是一个高级句型。使用 'it' 作为形式宾语，真正的宾语是后面的不定式短语 (to do)。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Modern technology <strong>makes it easy to keep</strong> in touch.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Modern technology makes it easy to keep in touch.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>现代科技让保持联系变得容易。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The noise <strong>makes it hard to sleep</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The noise makes it hard to sleep.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>噪音让人难以入睡。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习: 'make' 的用法"
                subtitle="用下面的词组成句子"
                completionTitle="🎉 Great!"
                completionMessage="你已经掌握了 'make' 的用法！"
                nextButtonText="学习下一个句型 →"
            />
        </LessonContainer>
    );
};
