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

interface AsUsageContentProps {
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
    { words: [{ en: 'She works', cn: '她工作' }, { en: 'as a doctor', cn: '作为一名医生' }], correct: ['She works', 'as a doctor'], chinese: '她是一名医生。' },
    { words: [{ en: 'As it was raining,', cn: '因为下雨了，' }, { en: 'we stayed', cn: '我们待在' }, { en: 'indoors', cn: '室内' }], correct: ['As it was raining,', 'we stayed', 'indoors'], chinese: '因为下雨了，我们待在室内。' },
    { words: [{ en: 'He arrived', cn: '他到达' }, { en: 'just as', cn: '正当' }, { en: 'I was leaving', cn: '我正要离开时' }], correct: ['He arrived', 'just as', 'I was leaving'], chinese: '我正要离开时，他到了。' },
    { words: [{ en: 'Please do', cn: '请做' }, { en: 'as I say', cn: '照我说的' }], correct: ['Please do', 'as I say'], chinese: '请照我说的做。' },
    { words: [{ en: 'He used his coat', cn: '他用他的外套' }, { en: 'as a blanket', cn: '作为毯子' }], correct: ['He used his coat', 'as a blanket'], chinese: '他把外套当作毯子用。' },
    { words: [{ en: 'As he grew older,', cn: '随着他长大，' }, { en: 'he became', cn: '他变得' }, { en: 'wiser', cn: '更聪明' }], correct: ['As he grew older,', 'he became', 'wiser'], chinese: '随着年龄的增长，他变得更聪明了。' },
    { words: [{ en: 'I can\'t run', cn: '我不能跑' }, { en: 'as fast', cn: '那么快' }, { en: 'as you', cn: '像你一样' }], correct: ['I can\'t run', 'as fast', 'as you'], chinese: '我跑得没你快。' },
    { words: [{ en: 'As you know,', cn: '如你所知，' }, { en: 'the meeting is', cn: '会议' }, { en: 'cancelled', cn: '取消了' }], correct: ['As you know,', 'the meeting is', 'cancelled'], chinese: '如你所知，会议取消了。' },
];

export const AsUsageContent: React.FC<AsUsageContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>🤝 介词/连词 'as' 的用法</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"as" 是一个极其多功能的词。它可以表示“作为”（身份）、“当...时候”（时间）、“因为”（原因）和“像...一样”（方式/比较）。掌握它的不同用法能让你更灵活地组织句子。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. 表示身份“作为” (In the role of)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>He works <strong>as a teacher</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He works as a teacher.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他以教师的身份工作。</ExampleChinese>
                </ExampleItem>

                <UsageType>2. 表示时间“当...时候” (Time)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>As</strong> I was leaving, the phone rang.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('As I was leaving, the phone rang.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我正要离开时，电话响了。</ExampleChinese>
                </ExampleItem>
                
                <UsageType>3. 表示原因“因为” (Reason)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>As</strong> it was getting late, we went home.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('As it was getting late, we went home.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>因为天色已晚，我们就回家了。</ExampleChinese>
                </ExampleItem>

                <UsageType>4. 表示方式/比较“像...一样” (Manner/Comparison)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Do <strong>as</strong> I tell you.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Do as I tell you.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>照我告诉你的去做。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：使用 'as' 构建句子"
                subtitle="用下面的词组成句子"
                completionTitle="🎉 Perfect!"
                completionMessage="你已经掌握了 'as' 的用法！"
                nextButtonText="学习下一个句型 →"
            />
        </LessonContainer>
    );
};