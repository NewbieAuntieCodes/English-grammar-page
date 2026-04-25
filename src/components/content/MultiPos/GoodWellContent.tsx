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

interface GoodWellContentProps {
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
    { words: [{ en: 'He is a', cn: '他是个' }, { en: 'good', cn: '好的' }, { en: 'student', cn: '学生' }], correct: ['He is a', 'good', 'student'], chinese: '他是个好学生。' },
    { words: [{ en: 'She plays', cn: '她弹' }, { en: 'the piano', cn: '钢琴' }, { en: 'well', cn: '很好' }], correct: ['She plays', 'the piano', 'well'], chinese: '她钢琴弹得很好。' },
    { words: [{ en: 'That is a', cn: '那是个' }, { en: 'good', cn: '好的' }, { en: 'idea', cn: '主意' }], correct: ['That is a', 'good', 'idea'], chinese: '那是个好主意。' },
    { words: [{ en: 'He speaks', cn: '他说' }, { en: 'English', cn: '英语' }, { en: 'well', cn: '流利' }], correct: ['He speaks', 'English', 'well'], chinese: '他英语说得很流利。' },
    { words: [{ en: 'I hope', cn: '我希望' }, { en: 'you are', cn: '你' }, { en: 'well', cn: '身体好' }], correct: ['I hope', 'you are', 'well'], chinese: '我希望你身体健康。' },
    { words: [{ en: 'It was a', cn: '那是一部' }, { en: 'good movie', cn: '好电影' }], correct: ['It was a', 'good movie'], chinese: '那是一部好电影。' },
    { words: [{ en: 'They did not', cn: '他们没' }, { en: 'behave', cn: '表现' }, { en: 'well', cn: '好' }], correct: ['They did not', 'behave', 'well'], chinese: '他们表现不好。' },
    { words: [{ en: 'This is a', cn: '这是一本' }, { en: 'good', cn: '好的' }, { en: 'book', cn: '书' }], correct: ['This is a', 'good', 'book'], chinese: '这是一本好书。' }
];

export const GoodWellContent: React.FC<GoodWellContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>🔄 "Good" vs "Well"</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"Good" 和 "Well" 是最常被混淆的一对词。"Good" 是形容词，用来描述事物；"Well" 是副词，用来描述动作。记住这个基本区别，你的英语就能更上一层楼。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. 形容词 (Adjective): good</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    "Good" 用来修饰名词，说明某人或某物是“好的”。它回答了“什么样的？”这个问题。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>He is a <strong>good</strong> driver.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He is a good driver.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他是一个好司机。(什么样的 driver? {'->'} good driver)</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>This cake tastes <strong>good</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('This cake tastes good.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这个蛋糕尝起来很好。(蛋糕怎么样? {'->'} good) (注意: taste是感官系动词，后面跟形容词)</ExampleChinese>
                </ExampleItem>

                <UsageType>2. 副词 (Adverb): well</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    "Well" 用来修饰动词，说明动作做得“好”。它回答了“动作怎么样？”这个问题。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>He drives <strong>well</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He drives well.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他车开得很好。(开得怎么样? {'->'} well)</ExampleChinese>
                </ExampleItem>
                
                <UsageType>3. 特殊用法: well 作形容词</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    当谈论健康状况时，"well" 可以作为形容词，意思是“健康的”。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I don't feel <strong>well</strong> today.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("I don't feel well today."); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我今天感觉不太舒服。(我感觉怎么样? {'->'} well)</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：使用 'good' 和 'well'"
                subtitle="用下面的词组成句子，注意使用正确的词形"
                completionTitle="🎉 Well Done!"
                completionMessage="你已经掌握了 'good' 和 'well' 的用法！"
                nextButtonText="下一个练习 →"
            />
        </LessonContainer>
    );
};