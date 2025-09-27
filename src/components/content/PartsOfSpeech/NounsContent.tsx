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

interface NounsContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const practiceData = [
    { sentence: 'The dog is cute.', targetWords: ['dog'], prompt: '名词 (Noun)', chinese: '这只狗很可爱。' },
    { sentence: 'She likes the apple.', targetWords: ['apple'], prompt: '名词 (Noun)', chinese: '她喜欢这个苹果。' },
    { sentence: 'My dad is a doctor.', targetWords: ['dad', 'doctor'], prompt: '名词 (Noun)', chinese: '我爸爸是一名医生。' },
    { sentence: 'I have a pen.', targetWords: ['pen'], prompt: '名词 (Noun)', chinese: '我有一支钢笔。' },
    { sentence: 'This is a book.', targetWords: ['book'], prompt: '名词 (Noun)', chinese: '这是一本书。' },
];

export const NounsContent: React.FC<NounsContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>📚 Nouns (名词)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学名词？</SectionTitle>
                <p>名词是句子的主角！它们告诉我们句子在谈论“谁”或“什么”。掌握名词是构建任何句子的第一步。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 Examples</SectionTitle>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex1'} onClick={() => setActiveExample(p => p === 'ex1' ? null : 'ex1')}>
                    <ExampleHeader>
                        <ExampleEnglish>The <strong>dog</strong> barks.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The dog barks.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这只狗在叫。（dog 是一个‘事物’）</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex2'} onClick={() => setActiveExample(p => p === 'ex2' ? null : 'ex2')}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>Maria</strong> is a <strong>student</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Maria is a student.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>玛利亚是一名学生。（Maria 和 student 都是‘人’）</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <WordSelectorPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                completionTitle="🎉 Awesome!"
                completionMessage="You've completed the noun exercises."
                nextButtonText="Next Lesson: Verbs →"
            />
        </LessonContainer>
    );
};