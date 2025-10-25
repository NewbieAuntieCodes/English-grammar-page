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

interface HappyContentProps {
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
    { words: [{ en: 'She is a', cn: '她是个' }, { en: 'happy', cn: '快乐的' }, { en: 'girl', cn: '女孩' }], correct: ['She is a', 'happy', 'girl'], chinese: '她是一个快乐的女孩。' },
    { words: [{ en: 'The dog', cn: '小狗' }, { en: 'wags its tail', cn: '摇着尾巴' }, { en: 'happily', cn: '开心地' }], correct: ['The dog', 'wags its tail', 'happily'], chinese: '小狗开心地摇着尾巴。' },
    { words: [{ en: 'They lived', cn: '他们生活' }, { en: 'happily', cn: '幸福地' }, { en: 'ever after', cn: '从此以后' }], correct: ['They lived', 'happily', 'ever after'], chinese: '他们从此幸福地生活在一起。' },
    { words: [{ en: 'He has a', cn: '他有' }, { en: 'happy', cn: '幸福的' }, { en: 'smile', cn: '微笑' }], correct: ['He has a', 'happy', 'smile'], chinese: '他脸上挂着幸福的微笑。' },
    { words: [{ en: 'The birds', cn: '鸟儿' }, { en: 'are singing', cn: '在歌唱' }, { en: 'happily', cn: '快乐地' }], correct: ['The birds', 'are singing', 'happily'], chinese: '鸟儿在快乐地歌唱。' },
    { words: [{ en: 'I feel', cn: '我感觉' }, { en: 'happy', cn: '开心' }, { en: 'today', cn: '今天' }], correct: ['I feel', 'happy', 'today'], chinese: '我今天感觉很开心。' },
    { words: [{ en: 'It was a', cn: '那是个' }, { en: 'happy', cn: '快乐的' }, { en: 'moment', cn: '时刻' }], correct: ['It was a', 'happy', 'moment'], chinese: '那是一个快乐的时刻。' },
    { words: [{ en: 'He', cn: '他' }, { en: 'happily', cn: '开心地' }, { en: 'accepted', cn: '接受了' }, { en: 'the gift', cn: '礼物' }], correct: ['He', 'happily', 'accepted', 'the gift'], chinese: '他开心地接受了礼物。' }
];

export const HappyContent: React.FC<HappyContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>🔄 "Happy" vs "Happily"</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>这是形容词 (adjective) 和副词 (adverb) 的经典例子。"happy" 用来描述人或事物本身的状态，而 "happily" 用来描述动作发生的方式。学会区分它们，能让你的句子更准确。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. 形容词 (Adjective): happy</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    "happy" 用来修饰名词或代词，说明某人/某物的状态是“快乐的”。它回答了“什么样的？”或“感觉怎么样？”这类问题。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>She is a <strong>happy</strong> child.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('She is a happy child.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>她是一个快乐的孩子。(什么样的 child? {'->'} happy child)</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I feel <strong>happy</strong> today.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I feel happy today.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我今天感觉很开心。(我感觉怎么样? {'->'} happy)</ExampleChinese>
                </ExampleItem>

                <UsageType>2. 副词 (Adverb): happily</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    "happily" 通常由形容词 "happy" 变 y 为 i 再加 -ly 构成。它用来修饰动词，说明动作是“快乐地”发生。它回答了“动作怎么样？”这个问题。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The children played <strong>happily</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The children played happily.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>孩子们快乐地玩耍。(玩得怎么样? {'->'} 玩得 happily)</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>She smiled <strong>happily</strong> at me.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("She smiled happily at me."); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>她开心地对我微笑。(微笑得怎么样? {'->'} 微笑得 happily)</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：使用 'happy' 和 'happily'"
                subtitle="用下面的词组成句子，注意使用正确的词形"
                completionTitle="🎉 Excellent!"
                completionMessage="你已经掌握了 'happy' 和 'happily' 的用法！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};