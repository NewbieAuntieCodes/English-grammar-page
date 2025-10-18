/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useCallback } from 'react';
import {
    LessonContainer,
    BackButton,
    LessonTitle,
    WhyLearnSection,
    SectionTitle,
    ExamplesSection,
    ExampleItem,
    ExampleHeader,
    SpeakButton,
    ExampleEnglish,
    ExampleChinese,
} from './SVOContent.styles';
import { WordSelectorPractice } from '../../practice/WordSelectorPractice';

interface FindMainClauseContentProps {
    onBack: () => void;
    themeColor: string;
}

const practiceData = [
    { sentence: 'When I got home, I felt tired.', targetWords: ['I', 'felt', 'tired'], prompt: '主句 (Main Clause)', chinese: "当我到家时，我感觉很累。" },
    { sentence: 'The man who lives next door is a doctor.', targetWords: ['The', 'man', 'is', 'a', 'doctor'], prompt: '主句 (Main Clause)', chinese: "住在隔壁的那个男人是一名医生。" },
    { sentence: 'If you ask him, he will help you.', targetWords: ['he', 'will', 'help', 'you'], prompt: '主句 (Main Clause)', chinese: "如果你问他，他会帮助你的。" },
    { sentence: 'Although it was cold, he went swimming.', targetWords: ['he', 'went', 'swimming'], prompt: '主句 (Main Clause)', chinese: "尽管天气很冷，他还是去游泳了。" },
    { sentence: 'The house where I grew up is now a museum.', targetWords: ['The', 'house', 'is', 'now', 'a', 'museum'], prompt: '主句 (Main Clause)', chinese: "我长大的那座房子现在是一个博物馆。" },
    { sentence: 'I will call you when she arrives.', targetWords: ['I', 'will', 'call', 'you'], prompt: '主句 (Main Clause)', chinese: "她到达时我会给你打电话。" },
    { sentence: 'Because he was tired, he went to bed early.', targetWords: ['he', 'went', 'to', 'bed', 'early'], prompt: '主句 (Main Clause)', chinese: "因为他累了，所以他很早就上床睡觉了。" },
    { sentence: 'My brother, who lives in London, is a pilot.', targetWords: ['My', 'brother', 'is', 'a', 'pilot'], prompt: '主句 (Main Clause)', chinese: "我的兄弟，他住在伦敦，是一名飞行员。" },
];


export const FindMainClauseContent: React.FC<FindMainClauseContentProps> = ({ onBack, themeColor }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
        if ('speechSynthesis' in window) {
            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
        return () => { if ('speechSynthesis' in window) window.speechSynthesis.onvoiceschanged = null; };
    }, []);

    const handleSpeak = useCallback((text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            const usVoice = voices.find(voice => voice.lang === 'en-US');
            utterance.voice = usVoice || voices.find(voice => voice.lang.startsWith('en-')) || null;
            utterance.rate = 0.9;
            utterance.pitch = 1.1;
            window.speechSynthesis.speak(utterance);
        }
    }, [voices]);

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Lessons</BackButton>
            <LessonTitle>🎯 找主句练习</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么要找主句？</SectionTitle>
                <p>在复杂的长句中，快速找到主句是理解句子核心意思的关键。主句是一个可以独立存在的完整句子，它表达了最主要的信息。学会识别主句能让你在阅读和分析句子时事半功倍！</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 例子 (Examples)</SectionTitle>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Although it was raining, <strong>we played outside</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Although it was raining, we played outside.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>尽管在下雨，我们还是在外面玩了。(主句是 "we played outside")</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>The boy</strong> who is wearing a blue shirt <strong>is my brother</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The boy who is wearing a blue shirt is my brother.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>那个穿着蓝色衬衫的男孩是我的弟弟。(主句是 "The boy is my brother")</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <WordSelectorPractice
                themeColor={themeColor}
                onCompleteAll={onBack}
                practiceData={practiceData}
                completionTitle="🎉 Excellent!"
                completionMessage="你已经掌握了如何识别主句！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};