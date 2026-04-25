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

interface AsUsageContentProps {
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
    { sentenceParts: ["She works ", " a doctor."] as const, choices: [{text: "as", isCorrect: true}, {text: "like", isCorrect: false}, {text: "for", isCorrect: false}], chineseHint: "她是一名医生。" },
    { sentenceParts: ["", " it was raining, we stayed indoors."] as const, choices: [{text: "As", isCorrect: true}, {text: "When", isCorrect: false}, {text: "Since", isCorrect: false}], chineseHint: "因为下雨了，我们待在室内。" },
    { sentenceParts: ["He arrived just ", " I was leaving."] as const, choices: [{text: "as", isCorrect: true}, {text: "when", isCorrect: false}, {text: "while", isCorrect: false}], chineseHint: "我正要离开时，他到了。" },
    { sentenceParts: ["Please do ", " I say."] as const, choices: [{text: "as", isCorrect: true}, {text: "like", isCorrect: false}, {text: "what", isCorrect: false}], chineseHint: "请照我说的做。" },
    { sentenceParts: ["He used his coat ", " a blanket."] as const, choices: [{text: "as", isCorrect: true}, {text: "like", isCorrect: false}, {text: "for", isCorrect: false}], chineseHint: "他把外套当作毯子用。" },
    { sentenceParts: ["", " he grew older, he became wiser."] as const, choices: [{text: "As", isCorrect: true}, {text: "When", isCorrect: false}, {text: "While", isCorrect: false}], chineseHint: "随着年龄的增长，他变得更聪明了。" },
    { sentenceParts: ["I can't run ", " fast as you."] as const, choices: [{text: "as", isCorrect: true}, {text: "so", isCorrect: false}, {text: "very", isCorrect: false}], chineseHint: "我跑得没你快。" },
    { sentenceParts: ["", " you know, the meeting is cancelled."] as const, choices: [{text: "As", isCorrect: true}, {text: "Like", isCorrect: false}, {text: "What", isCorrect: false}], chineseHint: "如你所知，会议取消了。" },
];

export const AsUsageContent: React.FC<AsUsageContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>🤝 介词/连词 'as' 的用法</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"as" 是一个极其多功能的词。它可以表示“作为”（身份）、“当...时候”（时间）、“因为”（原因）和“像...一样”（方式/比较）。掌握它的不同用法能让你更灵活地组织句子。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. 表示身份“作为” (In the role of)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>He works <strong>as a teacher</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He works as a teacher.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他以教师的身份工作。</ExampleChinese>
                </ExampleItem>

                <UsageType>2. 表示时间“当...时候” (Time)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>As</strong> I was leaving, the phone rang.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('As I was leaving, the phone rang.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我正要离开时，电话响了。</ExampleChinese>
                </ExampleItem>
                
                <UsageType>3. 表示原因“因为” (Reason)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>As</strong> it was getting late, we went home.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('As it was getting late, we went home.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>因为天色已晚，我们就回家了。</ExampleChinese>
                </ExampleItem>

                <UsageType>4. 表示方式/比较“像...一样” (Manner/Comparison)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Do <strong>as</strong> I tell you.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Do as I tell you.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>照我告诉你的去做。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <FillInTheBlankPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：使用 'as'"
                subtitle="选择正确的单词填空"
                completionTitle="🎉 Perfect!"
                completionMessage="你已经掌握了 'as' 的用法！"
                nextButtonText="学习下一个句型 →"
            />
        </LessonContainer>
    );
};