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
import { FillInTheBlankPractice } from '../../practice/FillInTheBlankPractice';
import styled from 'styled-components';

interface AffectEffectContentProps {
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

const TipSection = styled(WhyLearnSection)`
    background: linear-gradient(135deg, rgba(254, 249, 195, 1), rgba(253, 230, 138, 0.2));
    border-left-color: #FBBF24;
    p, h4, strong {
        color: #92400E;
    }
`;

const practiceData = [
    { sentenceParts: ["The weather will ", " our plans for the picnic."] as const, choices: [{text: "affect", isCorrect: true}, {text: "effect", isCorrect: false}], chineseHint: "天气会影响我们的野餐计划。" },
    { sentenceParts: ["The new law had a positive ", " on the economy."] as const, choices: [{text: "effect", isCorrect: true}, {text: "affect", isCorrect: false}], chineseHint: "新法律对经济产生了积极的影响。" },
    { sentenceParts: ["Lack of sleep can ", " your ability to think clearly."] as const, choices: [{text: "affect", isCorrect: true}, {text: "effect", isCorrect: false}], chineseHint: "睡眠不足会影响你清晰思考的能力。" },
    { sentenceParts: ["What is the main ", " of this medicine?"] as const, choices: [{text: "effect", isCorrect: true}, {text: "affect", isCorrect: false}], chineseHint: "这种药的主要效果是什么？" },
    { sentenceParts: ["His speech did not seem to ", " the audience."] as const, choices: [{text: "affect", isCorrect: true}, {text: "effect", isCorrect: false}], chineseHint: "他的演讲似乎没有影响到观众。" },
    { sentenceParts: ["The cause and ", " of climate change are complex."] as const, choices: [{text: "effect", isCorrect: true}, {text: "affect", isCorrect: false}], chineseHint: "气候变化的前因后果是复杂的。" },
    { sentenceParts: ["Pollution can negatively ", " the environment."] as const, choices: [{text: "affect", isCorrect: true}, {text: "effect", isCorrect: false}], chineseHint: "污染会对环境产生负面影响。" },
    { sentenceParts: ["The special ", "s in the movie were amazing."] as const, choices: [{text: "effect", isCorrect: true}, {text: "affect", isCorrect: false}], chineseHint: "电影中的特效非常惊人。" },
];

export const AffectEffectContent: React.FC<AffectEffectContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>📖 Affect vs. Effect</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"Affect" 和 "Effect" 是英语中最容易混淆的词之一。它们的发音相似，意思也相关，但词性不同。学会区分它们能让你的写作和口语更加精确。</p>
            </WhyLearnSection>
            
            <TipSection themeColor={themeColor}>
                <SectionTitle>💡 记忆技巧 (RAVEN)</SectionTitle>
                <p>
                    <strong>R</strong>emember: <strong>A</strong>ffect is a <strong>V</strong>erb, <strong>E</strong>ffect is a <strong>N</strong>oun.
                    <br/>
                    记住：<strong>A</strong>ffect 是<strong>动</strong>词 (Verb)，<strong>E</strong>ffect 是<strong>名</strong>词 (Noun)。
                </p>
            </TipSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. Affect (动词 - Verb)</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    意思是“影响”或“对...产生作用”。它是一个动作。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The rain will <strong>affect</strong> our plans.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The rain will affect our plans.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这场雨将会影响我们的计划。</ExampleChinese>
                </ExampleItem>

                <UsageType>2. Effect (名词 - Noun)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    意思是“效果”、“结果”或“影响”。它是一个事物。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The medicine had an immediate <strong>effect</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The medicine had an immediate effect.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这种药有立竿见影的效果。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <FillInTheBlankPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：Affect 还是 Effect？"
                subtitle="选择正确的单词填入句子"
                completionTitle="🎉 Fantastic!"
                completionMessage="你已经掌握了 'Affect' 和 'Effect' 的区别！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};