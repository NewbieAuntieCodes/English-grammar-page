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

interface AvailableAccessibleContentProps {
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
    { sentenceParts: ["I'm sorry, the manager is not ", " right now."] as const, choices: [{text: "available", isCorrect: true}, {text: "accessible", isCorrect: false}], chineseHint: "对不起，经理现在没空。" },
    { sentenceParts: ["The new ramp makes the library ", " to everyone."] as const, choices: [{text: "accessible", isCorrect: true}, {text: "available", isCorrect: false}], chineseHint: "新的坡道使图书馆对所有人开放。" },
    { sentenceParts: ["Are there any tickets ", " for tonight's show?"] as const, choices: [{text: "available", isCorrect: true}, {text: "accessible", isCorrect: false}], chineseHint: "今晚的演出还有票吗？" },
    { sentenceParts: ["The website should be ", " on both mobile and desktop."] as const, choices: [{text: "accessible", isCorrect: true}, {text: "available", isCorrect: false}], chineseHint: "网站应该在手机和桌面上都可以访问。" },
    { sentenceParts: ["Is this shirt ", " in a larger size?"] as const, choices: [{text: "available", isCorrect: true}, {text: "accessible", isCorrect: false}], chineseHint: "这件衬衫有更大号的吗？" },
    { sentenceParts: ["The remote village is not easily ", " by car."] as const, choices: [{text: "accessible", isCorrect: true}, {text: "available", isCorrect: false}], chineseHint: "这个偏远的村庄开车不易到达。" },
    { sentenceParts: ["Dr. Lee will be ", " to see you at 3 PM."] as const, choices: [{text: "available", isCorrect: true}, {text: "accessible", isCorrect: false}], chineseHint: "李医生下午3点有空见你。" },
    { sentenceParts: ["We need to make our content more ", " to people with disabilities."] as const, choices: [{text: "accessible", isCorrect: true}, {text: "available", isCorrect: false}], chineseHint: "我们需要让我们的内容更容易被残疾人士获取。" },
];

export const AvailableAccessibleContent: React.FC<AvailableAccessibleContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>📖 Available vs. Accessible</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"Available" 和 "Accessible" 意思相近，都表示“可以得到”或“可以使用”，但它们的侧重点不同，很容易混淆。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. Available (可获得的 / 有空的)</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    <strong>侧重点:</strong> 某物是否可以被【购买、使用或找到】；某人是否【有时间】。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The book is <strong>available</strong> in the library.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The book is available in the library.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这本书在图书馆可以借到。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The manager is not <strong>available</strong> until 2 PM.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The manager is not available until 2 PM.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>经理下午两点才有空。</ExampleChinese>
                </ExampleItem>

                <UsageType>2. Accessible (可进入的 / 可理解的)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    <strong>侧重点:</strong> 是否容易【进入、到达或理解】，常常暗含“无障碍”的意思。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The new building is <strong>accessible</strong> to wheelchair users.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The new building is accessible to wheelchair users.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>新大楼对轮椅使用者是无障碍的。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The website is <strong>accessible</strong> from any device.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("The website is accessible from any device."); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这个网站可以从任何设备访问。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <FillInTheBlankPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：Available 还是 Accessible？"
                subtitle="选择正确的单词填入句子"
                completionTitle="🎉 Fantastic!"
                completionMessage="你已经掌握了 'Available' 和 'Accessible' 的区别！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};