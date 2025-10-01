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

interface AdjectivesContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const practiceData = [
    { sentence: 'He is a tall boy.', targetWords: ['tall'], prompt: '形容词 (Adjective)', chinese: "他是一个高个子男孩。" },
    { sentence: 'The sky is blue.', targetWords: ['blue'], prompt: '形容词 (Adjective)', chinese: "天空是蓝色的。" },
    { sentence: 'This is a red apple.', targetWords: ['red'], prompt: '形容词 (Adjective)', chinese: "这是一个红苹果。" },
    { sentence: 'I am happy.', targetWords: ['happy'], prompt: '形容词 (Adjective)', chinese: "我很开心。" },
    { sentence: 'The little cat is cute.', targetWords: ['little', 'cute'], prompt: '形容词 (Adjective)', chinese: "这只小猫很可爱。" },
    { sentence: 'The beautiful flower is in the garden.', targetWords: ['beautiful'], prompt: '形容词 (Adjective)', chinese: "美丽的花在花园里。" },
    { sentence: 'This soup is very hot.', targetWords: ['hot'], prompt: '形容词 (Adjective)', chinese: "这个汤很烫。" },
];


export const AdjectivesContent: React.FC<AdjectivesContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>🎨 Adjectives (形容词)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学形容词？</SectionTitle>
                <p>形容词给句子增添色彩和细节！它们用来描述名词，告诉我们事物“怎么样”。使用形容词能让你的英语表达更生动。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 Examples</SectionTitle>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex1'} onClick={() => setActiveExample(p => p === 'ex1' ? null : 'ex1')}>
                    <ExampleHeader>
                        <ExampleEnglish>A <strong>red</strong> car.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('A red car.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>一辆红色的车。（red 描述 car 的颜色）</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex2'} onClick={() => setActiveExample(p => p === 'ex2' ? null : 'ex2')}>
                    <ExampleHeader>
                        <ExampleEnglish>The music is <strong>loud</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The music is loud.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>音乐很大声。（loud 描述 music 的状态）</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <WordSelectorPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                completionTitle="🎉 Fantastic!"
                completionMessage="You have a good eye for adjectives."
                nextButtonText="Next Lesson: Adverbs →"
            />
        </LessonContainer>
    );
};
