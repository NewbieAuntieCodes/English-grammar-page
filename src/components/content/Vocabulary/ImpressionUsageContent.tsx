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

interface ImpressionUsageContentProps {
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
    { sentenceParts: ["He made a good ", " on his first day at work."] as const, choices: [{text: "impression", isCorrect: true}, {text: "expression", isCorrect: false}, {text: "idea", isCorrect: false}], chineseHint: "他在第一天上班时给人留下了好印象。" },
    { sentenceParts: ["First ", "s are very important in an interview."] as const, choices: [{text: "impression", isCorrect: true}, {text: "opinion", isCorrect: false}, {text: "view", isCorrect: false}], chineseHint: "在面试中，第一印象非常重要。" },
    { sentenceParts: ["I was under the ", " that the meeting was tomorrow."] as const, choices: [{text: "impression", isCorrect: true}, {text: "feeling", isCorrect: false}, {text: "thought", isCorrect: false}], chineseHint: "我误以为会议是明天。" },
    { sentenceParts: ["Her speech made a strong ", " on the audience."] as const, choices: [{text: "impression", isCorrect: true}, {text: "effect", isCorrect: false}, {text: "affect", isCorrect: false}], chineseHint: "她的演讲给观众留下了深刻的印象。" },
    { sentenceParts: ["What was your first ", " of him?"] as const, choices: [{text: "impression", isCorrect: true}, {text: "look", isCorrect: false}, {text: "sense", isCorrect: false}], chineseHint: "你对他的第一印象是什么？" },
    { sentenceParts: ["He tried to create the ", " that he was very busy."] as const, choices: [{text: "impression", isCorrect: true}, {text: "image", isCorrect: false}, {text: "picture", isCorrect: false}], chineseHint: "他试图制造他很忙的印象。" },
    { sentenceParts: ["He does a great ", " of the president; they sound exactly alike."] as const, choices: [{text: "impression", isCorrect: true}, {text: "imitation", isCorrect: false}, {text: "copy", isCorrect: false}], chineseHint: "他对总统的模仿非常到位；他们的声音一模一样。" },
    { sentenceParts: ["I have a vague ", " that I've met her before."] as const, choices: [{text: "impression", isCorrect: true}, {text: "memory", isCorrect: false}, {text: "feeling", isCorrect: false}], chineseHint: "我隐约觉得我以前见过她。" }
];

export const ImpressionUsageContent: React.FC<ImpressionUsageContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>📖 'impression' 的用法</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"impression" 是一个关于观点和感觉的高频名词。掌握它及相关短语，如 "make an impression" 或 "be under the impression"，可以帮助你更准确地描述人和事给你留下的感觉。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. a first impression (第一印象)</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    指初次见面或接触时对某人或某物形成的感觉。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>My <strong>first impression</strong> of him was that he was very shy.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('My first impression of him was that he was very shy.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我对他的第一印象是他非常害羞。</ExampleChinese>
                </ExampleItem>

                <UsageType>2. make an impression on sb (给某人留下印象)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    指因某个行为或特质而让别人对你产生某种看法。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>He <strong>made a good impression on</strong> his new boss.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He made a good impression on his new boss.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他给他的新老板留下了好印象。</ExampleChinese>
                </ExampleItem>
                
                <UsageType>3. be under the impression that... (误以为...)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    指错误地相信某件事是真的。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I <strong>was under the impression that</strong> the meeting was cancelled.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I was under the impression that the meeting was cancelled.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我误以为会议取消了。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <FillInTheBlankPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习: 'impression' 的用法"
                subtitle="选择正确的单词填入句子"
                completionTitle="🎉 Impressive!"
                completionMessage="你已经掌握了 'impression' 的用法！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};