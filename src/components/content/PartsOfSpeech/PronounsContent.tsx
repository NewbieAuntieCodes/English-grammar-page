/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useCallback } from 'react';
import {
    LessonContainer, BackButton, LessonTitle, SectionTitle, WhyLearnSection, ExamplesSection,
    ExampleItem, ExampleHeader, SpeakButton, ExampleEnglish, ExampleChinese,
} from './PartsOfSpeechLesson.styles';
import { WordSelectorPractice } from '../../practice/WordSelectorPractice';

interface PronounsContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const practiceData = [
    { sentence: 'He likes to read.', targetWords: ['He'], prompt: '代词 (Pronoun)', chinese: "他喜欢读书。" },
    { sentence: 'She gave me a book.', targetWords: ['She', 'me'], prompt: '代词 (Pronoun)', chinese: "她给了我一本书。" },
    { sentence: 'They are friends.', targetWords: ['They'], prompt: '代词 (Pronoun)', chinese: "他们是朋友。" },
    { sentence: 'Do you know him?', targetWords: ['you', 'him'], prompt: '代词 (Pronoun)', chinese: "你认识他吗？" },
    { sentence: 'This is mine.', targetWords: ['mine'], prompt: '代词 (Pronoun)', chinese: "这是我的。" },
    { sentence: 'It is a sunny day.', targetWords: ['It'], prompt: '代词 (Pronoun)', chinese: "这是一个晴天。" },
    { sentence: 'We are students.', targetWords: ['We'], prompt: '代词 (Pronoun)', chinese: "我们是学生。" },
    { sentence: 'The book is yours.', targetWords: ['yours'], prompt: '代词 (Pronoun)', chinese: "这本书是你的。" },
];

export const PronounsContent: React.FC<PronounsContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>👤 Pronouns (代词)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学代词？</SectionTitle>
                <p>代词用来代替名词，避免重复，让句子更简洁流畅。比如，不说“Tom likes dogs. Tom is happy.”，而是说“Tom likes dogs. He is happy.”。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 Examples</SectionTitle>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex1'} onClick={() => setActiveExample(p => p === 'ex1' ? null : 'ex1')}>
                    <ExampleHeader>
                        <ExampleEnglish>John is tall. <strong>He</strong> is a student.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('John is tall. He is a student.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>约翰很高。他是一名学生。（He 代替 John）</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex2'} onClick={() => setActiveExample(p => p === 'ex2' ? null : 'ex2')}>
                    <ExampleHeader>
                        <ExampleEnglish>I have a cat. <strong>It</strong> is cute.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I have a cat. It is cute.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我有一只猫。它很可爱。（It 代替 a cat）</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <WordSelectorPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                completionTitle="🎉 Excellent!"
                completionMessage="You're a pro at pronouns!"
                nextButtonText="Next Lesson: Articles →"
            />
        </LessonContainer>
    );
};
