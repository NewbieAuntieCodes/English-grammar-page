/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useCallback } from 'react';
import {
    LessonContainer, BackButton, LessonTitle, SectionTitle, WhyLearnSection, ExamplesSection,
    ExampleItem, ExampleHeader, SpeakButton, ExampleEnglish, ExampleChinese,
} from '../PartsOfSpeech/PartsOfSpeechLesson.styles';
import { WordSelectorPractice } from '../../practice/WordSelectorPractice';

interface AttributiveContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const practiceData = [
    { sentence: 'This is a beautiful garden.', targetWords: ['beautiful'], prompt: '定语 (Attributive)', chinese: '这是一个美丽的花园。' },
    { sentence: 'I bought a new computer.', targetWords: ['new'], prompt: '定语 (Attributive)', chinese: '我买了一台新电脑。' },
    { sentence: 'That is his pencil.', targetWords: ['his'], prompt: '定语 (Attributive)', chinese: '那是他的铅笔。' },
    { sentence: 'The tall man is a doctor.', targetWords: ['tall'], prompt: '定语 (Attributive)', chinese: '那个高个子男人是一名医生。' },
    { sentence: 'She wore a blue dress.', targetWords: ['blue'], prompt: '定语 (Attributive)', chinese: '她穿了一条蓝色的连衣裙。' },
    { sentence: 'It is a sunny day.', targetWords: ['sunny'], prompt: '定语 (Attributive)', chinese: '这是一个晴天。' },
    { sentence: 'I have two books.', targetWords: ['two'], prompt: '定语 (Attributive)', chinese: '我有两本书。' },
];

export const AttributiveContent: React.FC<AttributiveContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [activeExample, setActiveExample] = useState<string | null>(null);

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
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to List</BackButton>
            <LessonTitle>✨ Attributive (定语)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 什么是定语？</SectionTitle>
                <p>定语就像是名词的“化妆师”！它用来修饰、限定名词或代词，让它更具体、更生动。定语回答的是“什么样的？”或“谁的？”这类问题。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 Examples</SectionTitle>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex1'} onClick={() => setActiveExample(p => p === 'ex1' ? null : 'ex1')}>
                    <ExampleHeader>
                        <ExampleEnglish>A <strong>small</strong> cat is sleeping.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('A small cat is sleeping.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>一只小猫在睡觉。（什么样的猫？小的。）</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex2'} onClick={() => setActiveExample(p => p === 'ex2' ? null : 'ex2')}>
                    <ExampleHeader>
                        <ExampleEnglish>This is <strong>my</strong> book.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('This is my book.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这是我的书。（谁的书？我的。）</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <WordSelectorPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                completionTitle="🎉 Great!"
                completionMessage="你现在知道如何给名词添加描述了！"
                nextButtonText="Next Lesson: Adverbial →"
            />
        </LessonContainer>
    );
};
