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

interface RatherThanInsteadOfContentProps {
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
    p, h4, strong, code {
        color: #92400E;
    }
    code {
        background: #FEF3C7;
        padding: 2px 5px;
        border-radius: 4px;
        font-family: monospace;
    }
`;

const insteadOfPracticeData = [
    { sentenceParts: ["I'll have tea ", " coffee, please."] as const, choices: [{text: "instead of", isCorrect: true}, {text: "rather than", isCorrect: false}], chineseHint: "请给我茶，不要咖啡。" },
    { sentenceParts: ["", " watching TV, you should read a book."] as const, choices: [{text: "Instead of", isCorrect: true}, {text: "Rather than", isCorrect: false}], chineseHint: "你应该读本书，而不是看电视。" },
    { sentenceParts: ["We went to the beach ", " the mountains."] as const, choices: [{text: "instead of", isCorrect: true}, {text: "rather than", isCorrect: false}], chineseHint: "我们去了海滩，而不是山区。" },
    { sentenceParts: ["He bought a new one ", " getting the old one repaired."] as const, choices: [{text: "instead of", isCorrect: true}, {text: "rather than", isCorrect: false}], chineseHint: "他买了个新的，而不是修理旧的。" }
];

const ratherThanPracticeData = [
    { sentenceParts: ["He chose to go by train ", " fly."] as const, choices: [{text: "rather than", isCorrect: true}, {text: "instead of", isCorrect: false}], chineseHint: "他选择乘火车去，而不是坐飞机。" },
    { sentenceParts: ["She prefers to write ", " type her essays."] as const, choices: [{text: "rather than", isCorrect: true}, {text: "instead of", isCorrect: false}], chineseHint: "她更喜欢手写论文，而不是打字。" },
    { sentenceParts: ["Why not use your savings ", " borrowing money?"] as const, choices: [{text: "rather than", isCorrect: true}, {text: "instead of", isCorrect: false}], chineseHint: "为什么不用你的存款，而非要借钱呢？" },
    { sentenceParts: ["I'd prefer to go in May ", " in August."] as const, choices: [{text: "rather than", isCorrect: true}, {text: "instead of", isCorrect: false}], chineseHint: "我宁愿五月去，也不愿八月去。" },
];

const mixedPracticeData = [
    { sentenceParts: ["I'll have tea ", " coffee, please."] as const, choices: [{text: "instead of", isCorrect: true}, {text: "rather than", isCorrect: false}], chineseHint: "请给我茶，不要咖啡。" },
    { sentenceParts: ["He chose to go by train ", " fly."] as const, choices: [{text: "rather than", isCorrect: true}, {text: "instead of", isCorrect: false}], chineseHint: "他选择乘火车去，而不是坐飞机。" },
    { sentenceParts: ["", " watching TV, you should read a book."] as const, choices: [{text: "Instead of", isCorrect: true}, {text: "Rather than", isCorrect: false}], chineseHint: "你应该读本书，而不是看电视。" },
    { sentenceParts: ["She prefers to write ", " type her essays."] as const, choices: [{text: "rather than", isCorrect: true}, {text: "instead of", isCorrect: false}], chineseHint: "她更喜欢手写论文，而不是打字。" },
    { sentenceParts: ["Why not use your savings ", " borrowing money?"] as const, choices: [{text: "rather than", isCorrect: true}, {text: "instead of", isCorrect: false}], chineseHint: "为什么不用你的存款，而非要借钱呢？" },
    { sentenceParts: ["We went to the beach ", " the mountains."] as const, choices: [{text: "instead of", isCorrect: true}, {text: "rather than", isCorrect: false}], chineseHint: "我们去了海滩，而不是山区。" },
    { sentenceParts: ["I'd prefer to go in May ", " in August."] as const, choices: [{text: "rather than", isCorrect: true}, {text: "instead of", isCorrect: false}], chineseHint: "我宁愿五月去，也不愿八月去。" },
    { sentenceParts: ["He bought a new one ", " getting the old one repaired."] as const, choices: [{text: "instead of", isCorrect: true}, {text: "rather than", isCorrect: false}], chineseHint: "他买了个新的，而不是修理旧的。" }
];

export const RatherThanInsteadOfContent: React.FC<RatherThanInsteadOfContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>📖 'rather than' vs 'instead of'</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"rather than" 和 "instead of" 都表示“而不是”，用于表达选择。但它们的语法功能和用法有细微差别。"instead of" 是介词，而 "rather than" 更像连词，用法更灵活。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. instead of (作为...的替代)</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    <strong>介词 (Preposition)</strong>。后面必须跟<strong>名词</strong>、<strong>代词</strong>或<strong>动名词 (v-ing)</strong>。它强调的是一个选择替代了另一个。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I'll have water <strong>instead of</strong> juice.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I\'ll have water instead of juice.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我要水，不要果汁。(替代名词)</ExampleChinese>
                </ExampleItem>
                 <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>Instead of</strong> driving, let's walk.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Instead of driving, let\'s walk.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我们走路去吧，别开车了。(替代动名词)</ExampleChinese>
                </ExampleItem>

                <UsageType>2. rather than (宁愿...也不...)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    <strong>连词 (Conjunction)</strong>。用法更灵活，后面可以跟<strong>名词</strong>、<strong>动名词 (v-ing)</strong> 或<strong>动词原形 (bare infinitive)</strong>。它更侧重于表达主观的“偏好”。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I prefer to walk <strong>rather than</strong> drive.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I prefer to walk rather than drive.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我宁愿走路也不愿开车。(连接动词原形，保持结构平行)</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>He chose tea <strong>rather than</strong> coffee.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He chose tea rather than coffee.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他选择了茶而不是咖啡。(连接名词)</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <TipSection themeColor={themeColor}>
                <SectionTitle>💡 关键区别</SectionTitle>
                <p>
                    最大的区别在于动词形式：当比较两个动作时，<code>rather than</code> 后面常跟【动词原形】，特别是当它前面有不定式 (to do) 时。而 <code>instead of</code> 后面必须跟【动名词 (v-ing)】。
                    <br/><br/>
                    - He decided to write <code>rather than</code> <strong>call</strong>. (√)
                    <br/>
                    - He decided to write <code>instead of</code> <strong>calling</strong>. (√)
                    <br/>
                    - He decided to write <code>instead of</code> <strong>call</strong>. (X)
                </p>
            </TipSection>
            
            <FillInTheBlankPractice
                themeColor={themeColor}
                onCompleteAll={() => {}}
                practiceData={insteadOfPracticeData}
                title="🎯 练习 1: 'instead of'"
                subtitle="选择正确的短语填入句子"
                completionTitle="🎉 Good!"
                completionMessage="你已完成 'instead of' 专项练习！"
                nextButtonText="继续下一个练习"
            />

            <FillInTheBlankPractice
                themeColor={themeColor}
                onCompleteAll={() => {}}
                practiceData={ratherThanPracticeData}
                title="🎯 练习 2: 'rather than'"
                subtitle="选择正确的短语填入句子"
                completionTitle="🎉 Well Done!"
                completionMessage="你已完成 'rather than' 专项练习！"
                nextButtonText="继续下一个练习"
            />
            
            <FillInTheBlankPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={mixedPracticeData}
                title="🎯 练习 3: 综合练习"
                subtitle="选择 'rather than' 还是 'instead of'？"
                completionTitle="🎉 Perfect Choice!"
                completionMessage="你已经完全掌握了 'rather than' 和 'instead of' 的区别！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};