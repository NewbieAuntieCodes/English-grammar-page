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
} from './SVOContent.styles';
import { RuleContainer, RuleCard, RuleTitle, RuleExplanation, ExamplePair, Verb, Arrow } from '../Tenses/PastTenseContent.styles';
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';
import styled from 'styled-components';

interface WhQuestionsContentProps {
    onBack: () => void;
    themeColor: string;
}

const FormulaText = styled(Verb)`
    font-size: 1em;
    padding: 8px 12px;
`;

const practiceData = [
    { words: [{ en: 'What is', cn: '什么是' }, { en: 'your', cn: '你的' }, { en: 'name?', cn: '名字？' }], correct: ['What is', 'your', 'name?'], chinese: '你叫什么名字？' },
    { words: [{ en: 'Where did', cn: '哪里' }, { en: 'he', cn: '他' }, { en: 'go?', cn: '去了？' }], correct: ['Where did', 'he', 'go?'], chinese: '他去哪儿了？' },
    { words: [{ en: 'Who', cn: '谁' }, { en: 'ate', cn: '吃了' }, { en: 'the cake?', cn: '蛋糕？' }], correct: ['Who', 'ate', 'the cake?'], chinese: '谁吃了蛋糕？' },
    { words: [{ en: 'When is', cn: '什么时候是' }, { en: 'your', cn: '你的' }, { en: 'birthday?', cn: '生日？' }], correct: ['When is', 'your', 'birthday?'], chinese: '你的生日是什么时候？' },
    { words: [{ en: 'Why', cn: '为什么' }, { en: 'are you', cn: '你' }, { en: 'late?', cn: '迟到了？' }], correct: ['Why', 'are you', 'late?'], chinese: '你为什么迟到了？' },
    { words: [{ en: 'How do you', cn: '你怎么' }, { en: 'spell', cn: '拼写' }, { en: 'that?', cn: '那个？' }], correct: ['How do you', 'spell', 'that?'], chinese: '那个单词你怎么拼写？' },
    { words: [{ en: 'What time', cn: '什么时间' }, { en: 'is', cn: '是' }, { en: 'it?', cn: '现在？' }], correct: ['What time', 'is', 'it?'], chinese: '现在几点了？' },
    { words: [{ en: 'How much', cn: '多少钱' }, { en: 'does it', cn: '它' }, { en: 'cost?', cn: '花费？' }], correct: ['How much', 'does it', 'cost?'], chinese: '这个多少钱？' },
];


export const WhQuestionsContent: React.FC<WhQuestionsContentProps> = ({ onBack, themeColor }) => {
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
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Lessons</BackButton>

            <LessonTitle>❓ 特殊疑问句 (Wh- Questions)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>特殊疑问句用于获取具体信息，而不是简单的“是”或“否”。它们以疑问词 (Wh- words) 开头，如 Who, What, Where, When, Why, How。这是获取信息、进行深入交流的核心句型！</p>
            </WhyLearnSection>
            
            <SectionTitle>📝 两种核心结构</SectionTitle>

            <RuleContainer>
                <RuleCard themeColor={themeColor}>
                    <RuleTitle>结构 1: 疑问词作主语</RuleTitle>
                    <RuleExplanation>当疑问词 Who, What, Which 是句子的主语时，语序不变，直接构成问句。</RuleExplanation>
                    <ExamplePair>
                        <FormulaText><strong>疑问词 (主语)</strong></FormulaText> <Arrow themeColor={themeColor}>+</Arrow> <FormulaText><strong>谓语 + ... ?</strong></FormulaText>
                    </ExamplePair>
                     <ExamplePair>
                        <Verb><strong>Who</strong> broke the window?</Verb>
                    </ExamplePair>
                </RuleCard>
                <RuleCard themeColor={themeColor}>
                    <RuleTitle>结构 2: 疑问词作其他成分</RuleTitle>
                    <RuleExplanation>当疑问词作宾语、状语等其他成分时，需要借助动词 (be, do/does/did, can 等) 并将其置于主语之前。</RuleExplanation>
                    <ExamplePair>
                        <FormulaText><strong>疑问词</strong></FormulaText> <Arrow themeColor={themeColor}>+</Arrow> <FormulaText><strong>助动词</strong></FormulaText><Arrow themeColor={themeColor}>+</Arrow> <FormulaText><strong>主语 + ... ?</strong></FormulaText>
                    </ExamplePair>
                    <ExamplePair>
                        <Verb><strong>What did</strong> you eat?</Verb>
                    </ExamplePair>
                </RuleCard>
            </RuleContainer>

            <ExamplesSection>
                <SectionTitle>📝 例子 (Examples)</SectionTitle>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>What</strong> is your favorite color?</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('What is your favorite color?'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>你最喜欢的颜色是什么？</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>Where</strong> do you live?</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Where do you live?'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>你住在哪里？</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>Why</strong> are you crying?</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Why are you crying?'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>你为什么哭？</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>

            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onBack}
                practiceData={practiceData}
                title="🎯 练习：构建特殊疑问句"
                subtitle="用下面的词块组成正确的问句"
                completionTitle="🎉 Awesome!"
                completionMessage="你已经掌握了特殊疑问句的构成！"
                nextButtonText="返回列表"
            />

        </LessonContainer>
    );
};