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

interface ValueContentProps {
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
    { words: [{ en: 'I', cn: '我' }, { en: 'value', cn: '珍视' }, { en: 'your opinion', cn: '你的意见' }], correct: ['I', 'value', 'your opinion'], chinese: '我珍视你的意见。' },
    { words: [{ en: 'The', cn: '这个' }, { en: 'value', cn: '价值' }, { en: 'of this diamond', cn: '钻石的' }, { en: 'is very high', cn: '非常高' }], correct: ['The', 'value', 'of this diamond', 'is very high'], chinese: '这颗钻石的价值非常高。' },
    { words: [{ en: 'We', cn: '我们' }, { en: 'value', cn: '重视' }, { en: 'honesty', cn: '诚实' }, { en: 'above all', cn: '高于一切' }], correct: ['We', 'value', 'honesty', 'above all'], chinese: '我们把诚实看得高于一切。' },
    { words: [{ en: 'What is the', cn: '是什么' }, { en: 'value', cn: '价值' }, { en: 'of friendship?', cn: '友谊的' }], correct: ['What is the', 'value', 'of friendship?'], chinese: '友谊的价值是什么？' },
    { words: [{ en: 'She', cn: '她' }, { en: 'values', cn: '珍惜' }, { en: 'her time', cn: '她的时间' }, { en: 'with her family', cn: '和家人一起的' }], correct: ['She', 'values', 'her time', 'with her family'], chinese: '她珍惜和家人在一起的时光。' },
    { words: [{ en: 'This old book', cn: '这本旧书' }, { en: 'has great', cn: '有巨大的' }, { en: 'historical value', cn: '历史价值' }], correct: ['This old book', 'has great', 'historical value'], chinese: '这本旧书有很高的历史价值。' },
    { words: [{ en: 'Companies should', cn: '公司应该' }, { en: 'value', cn: '重视' }, { en: 'their employees', cn: '他们的员工' }], correct: ['Companies should', 'value', 'their employees'], chinese: '公司应该重视他们的员工。' },
    { words: [{ en: 'He learned the', cn: '他学到了' }, { en: 'value', cn: '价值' }, { en: 'of hard work', cn: '努力工作的' }], correct: ['He learned the', 'value', 'of hard work'], chinese: '他学到了努力工作的价值。' }
];

export const ValueContent: React.FC<ValueContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>🔄 "Value" 的多种用法</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"Value" 是一个核心词汇。作为名词，它表示“价值”或“重要性”；作为动词，它表示“重视”或“珍视”。理解这两种用法对于更准确地表达观点和情感非常重要。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. 作名词 (Noun)</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    当 "value" 表示一个事物时，它是名词。意思是“价值”、“价格”、“重要性”或“价值观”。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The <strong>value</strong> of this painting is high.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The value of this painting is high.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这幅画的价值很高。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Honesty is an important family <strong>value</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("Honesty is an important family value."); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>诚实是一项重要的家庭价值观。</ExampleChinese>
                </ExampleItem>

                <UsageType>2. 作动词 (Verb)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    当 "value" 表示一个动作时，它是动词。意思是“重视”、“珍视”或“估价”。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I <strong>value</strong> your friendship.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I value your friendship.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我珍视我们的友谊。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>She <strong>values</strong> her privacy.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("She values her privacy."); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>她很重视她的隐私。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：使用 'value'"
                subtitle="用下面的词组成句子，判断 'value' 是动词还是名词"
                completionTitle="🎉 Fantastic!"
                completionMessage="你已经掌握了 'value' 的用法！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};
