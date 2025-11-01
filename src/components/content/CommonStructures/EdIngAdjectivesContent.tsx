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

interface EdIngAdjectivesContentProps {
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
    { sentenceParts: ["The movie was so ", ", I fell asleep."] as const, choices: [{text: "boring", isCorrect: true}, {text: "bored", isCorrect: false}], chineseHint: "这部电影太无聊了，我都睡着了。" },
    { sentenceParts: ["I am ", " in science."] as const, choices: [{text: "interested", isCorrect: true}, {text: "interesting", isCorrect: false}], chineseHint: "我对科学感兴趣。" },
    { sentenceParts: ["The long journey was very ", "."] as const, choices: [{text: "tiring", isCorrect: true}, {text: "tired", isCorrect: false}], chineseHint: "漫长的旅途非常累人。" },
    { sentenceParts: ["He was ", " by the strange noise."] as const, choices: [{text: "frightened", isCorrect: true}, {text: "frightening", isCorrect: false}], chineseHint: "他被奇怪的噪音吓到了。" },
    { sentenceParts: ["This book is really ", ". You should read it!"] as const, choices: [{text: "interesting", isCorrect: true}, {text: "interested", isCorrect: false}], chineseHint: "这本书真的很有趣。你应该读一读！" },
    { sentenceParts: ["She was ", " with her exam results."] as const, choices: [{text: "disappointed", isCorrect: true}, {text: "disappointing", isCorrect: false}], chineseHint: "她对自己的考试成绩感到失望。" },
    { sentenceParts: ["The news was quite ", "."] as const, choices: [{text: "surprising", isCorrect: true}, {text: "surprised", isCorrect: false}], chineseHint: "这个消息相当令人惊讶。" },
    { sentenceParts: ["After the marathon, he felt completely ", "."] as const, choices: [{text: "exhausted", isCorrect: true}, {text: "exhausting", isCorrect: false}], chineseHint: "跑完马拉松后，他感觉筋疲力尽。" },
];

export const EdIngAdjectivesContent: React.FC<EdIngAdjectivesContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>🎭 形容词: -ed vs -ing</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"-ed" 和 "-ing" 结尾的形容词常常让人困惑。简单来说：<strong>-ed 形容词描述【感受】</strong> (通常是人)，而 <strong>-ing 形容词描述【事物的特征】或【引起感受的原因】</strong>。掌握它们的区别能让你的情感和描述更精准。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. -ed Adjectives (描述感受)</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    用来描述一个人（或动物）的内心感受或情绪状态。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I am <strong>bored</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I am bored.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我感到无聊。（描述我的感受）</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>She was <strong>surprised</strong> by the gift.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('She was surprised by the gift.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>她对这个礼物感到惊讶。（描述她的感受）</ExampleChinese>
                </ExampleItem>

                <UsageType>2. -ing Adjectives (描述事物/原因)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    用来描述一个事物、情况或人的特征，说明它本身是“令人...”的。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The movie is <strong>boring</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The movie is boring.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这部电影很无聊。（描述电影的特征，是它让我感到 bored）</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The news was <strong>surprising</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("The news was surprising."); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这个消息令人惊讶。（描述消息的特征，是它让我感到 surprised）</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <FillInTheBlankPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：-ed 还是 -ing？"
                subtitle="选择正确的形容词形式"
                completionTitle="🎉 Amazing!"
                completionMessage="你已经掌握了 -ed 和 -ing 形容词的区别！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};