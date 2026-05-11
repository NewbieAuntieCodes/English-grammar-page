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

interface SlowContentProps {
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
    { words: [{ en: 'It is a', cn: '这是一辆' }, { en: 'slow', cn: '慢' }, { en: 'train', cn: '火车' }], correct: ['It is a', 'slow', 'train'], chinese: '这是一辆慢车。' },
    { words: [{ en: 'He talks', cn: '他说话' }, { en: 'very', cn: '非常' }, { en: 'slowly', cn: '慢' }], correct: ['He talks', 'very', 'slowly'], chinese: '他说话非常慢。' },
    { words: [{ en: 'The traffic', cn: '交通' }, { en: 'is', cn: '是' }, { en: 'slow', cn: '缓慢的' }, { en: 'today', cn: '今天' }], correct: ['The traffic', 'is', 'slow', 'today'], chinese: '今天的交通很缓慢。' },
    { words: [{ en: 'Please speak', cn: '请说话' }, { en: 'slowly', cn: '慢一点' }], correct: ['Please speak', 'slowly'], chinese: '请慢慢说。' },
    { words: [{ en: 'That was a', cn: '那是一个' }, { en: 'slow', cn: '缓慢的' }, { en: 'process', cn: '过程' }], correct: ['That was a', 'slow', 'process'], chinese: '那是一个缓慢的过程。' },
    { words: [{ en: 'The turtle', cn: '乌龟' }, { en: 'walks', cn: '走路' }, { en: 'slowly', cn: '慢慢地' }], correct: ['The turtle', 'walks', 'slowly'], chinese: '乌龟走得很慢。' },
    { words: [{ en: 'He is a', cn: '他是个' }, { en: 'slow', cn: '慢' }, { en: 'worker', cn: '工人' }], correct: ['He is a', 'slow', 'worker'], chinese: '他是个慢性子的工人。' },
    { words: [{ en: 'She reads', cn: '她读书' }, { en: 'slowly', cn: '慢慢地' }], correct: ['She reads', 'slowly'], chinese: '她读得很慢。' }
];

export const SlowContent: React.FC<SlowContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>🔄 "Slow" vs "Slowly"</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>和 "Happy/Happily" 类似，"Slow" 和 "Slowly" 也是一对基础的形容词和副词。 "Slow" 用来描述事物本身是“慢的”，而 "Slowly" 则用来描述动作是“慢慢地”进行。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. 形容词 (Adjective): slow</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    "Slow" 用来修饰名词，说明某人或某物是“慢的”。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>This is a <strong>slow</strong> computer.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('This is a slow computer.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这是一台很慢的电脑。(什么样的 computer? {'->'} slow computer)</ExampleChinese>
                </ExampleItem>

                <UsageType>2. 副词 (Adverb): slowly</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    "Slowly" 用来修饰动词，说明动作是“慢慢地”进行。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Please speak more <strong>slowly</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Please speak more slowly.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>请说得更慢一些。(说得怎么样? {'->'} slowly)</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：使用 'slow' 和 'slowly'"
                subtitle="用下面的词组成句子，注意使用正确的词形"
                completionTitle="🎉 Excellent!"
                completionMessage="你已经掌握了 'slow' 和 'slowly' 的用法！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};
