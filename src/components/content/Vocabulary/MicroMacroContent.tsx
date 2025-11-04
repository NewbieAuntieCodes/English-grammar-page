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

interface MicroMacroContentProps {
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
    { sentenceParts: ["You need a ", "scope to see tiny cells."] as const, choices: [{text: "micro", isCorrect: true}, {text: "macro", isCorrect: false}], chineseHint: "你需要一台显微镜才能看到微小的细胞。" },
    { sentenceParts: ["", "economics studies the economy of a whole country or the world."] as const, choices: [{text: "Macro", isCorrect: true}, {text: "Micro", isCorrect: false}], chineseHint: "宏观经济学研究整个国家或世界的经济。" },
    { sentenceParts: ["A virus is a kind of ", "organism."] as const, choices: [{text: "micro", isCorrect: true}, {text: "macro", isCorrect: false}], chineseHint: "病毒是一种微生物。" },
    { sentenceParts: ["A good leader doesn't ", "manage their team."] as const, choices: [{text: "micro", isCorrect: true}, {text: "macro", isCorrect: false}], chineseHint: "一个好的领导者不会对团队进行微观管理。" },
    { sentenceParts: ["From a ", "scopic view, the individual stars are part of a huge galaxy."] as const, choices: [{text: "macro", isCorrect: true}, {text: "micro", isCorrect: false}], chineseHint: "从宏观的角度看，单个的恒星是一个巨大星系的一部分。" },
    { sentenceParts: ["This tiny ", "chip can store a lot of data."] as const, choices: [{text: "micro", isCorrect: true}, {text: "macro", isCorrect: false}], chineseHint: "这个微小的微芯片可以存储大量数据。" },
    { sentenceParts: ["", "plastics are small plastic particles that pollute the environment."] as const, choices: [{text: "Micro", isCorrect: true}, {text: "Macro", isCorrect: false}], chineseHint: "微塑料是污染环境的小塑料颗粒。" },
    { sentenceParts: ["He's analyzing the ", "-level trends in the industry."] as const, choices: [{text: "macro", isCorrect: true}, {text: "micro", isCorrect: false}], chineseHint: "他正在分析行业内的宏观趋势。" },
];

export const MicroMacroContent: React.FC<MicroMacroContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>📖 前缀: micro- vs macro-</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>掌握 `micro-` (小的) 和 `macro-` (大的) 这对前缀，可以帮助你轻松理解和记忆一系列相关的科学和经济学术语。这是通过词根词缀扩大词汇量的有效方法！</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. micro- (表示“微小的”)</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    源自希腊语 `mikros`，意思是 "small"。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>Microscope</strong>: an instrument to see very small things.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Microscope'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>显微镜：一种看微小事物的仪器。</ExampleChinese>
                </ExampleItem>
                 <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>Micromanage</strong>: to manage with excessive control or attention to small details.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Micromanage'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>微观管理：过度控制或关注微小细节的管理。</ExampleChinese>
                </ExampleItem>

                <UsageType>2. macro- (表示“宏大的”)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    源自希腊语 `makros`，意思是 "large" 或 "long"。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>Macroeconomics</strong>: the study of the large-scale economy.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Macroeconomics'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>宏观经济学：研究大规模经济的学科。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>Macroscopic</strong>: visible to the naked eye; not microscopic.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("Macroscopic"); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>宏观的：肉眼可见的；非微观的。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <FillInTheBlankPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习: micro- 还是 macro-？"
                subtitle="选择正确的前缀填入句子"
                completionTitle="🎉 Excellent!"
                completionMessage="你已经掌握了 'micro-' 和 'macro-' 的区别！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};