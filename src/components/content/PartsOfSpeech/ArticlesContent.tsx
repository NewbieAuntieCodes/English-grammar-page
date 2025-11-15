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

interface ArticlesContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const practiceData = [
    { sentence: 'This is a book.', targetWords: ['a'], prompt: '冠词 (Article)', chinese: "这是一本书。" },
    { sentence: 'I see an apple.', targetWords: ['an'], prompt: '冠词 (Article)', chinese: "我看到一个苹果。" },
    { sentence: 'The sun is hot.', targetWords: ['The'], prompt: '冠词 (Article)', chinese: "太阳很热。" },
    { sentence: 'She is a doctor.', targetWords: ['a'], prompt: '冠词 (Article)', chinese: "她是一名医生。" },
    { sentence: 'An hour has passed.', targetWords: ['An'], prompt: '冠词 (Article)', chinese: "一个小时过去了。" },
    { sentence: 'I have a computer.', targetWords: ['a'], prompt: '冠词 (Article)', chinese: "我有一台电脑。" },
    { sentence: 'The earth is round.', targetWords: ['The'], prompt: '冠词 (Article)', chinese: "地球是圆的。" },
];

export const ArticlesContent: React.FC<ArticlesContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>📰 Articles (冠词)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学冠词？</SectionTitle>
                <p>冠词（a, an, the）是英语中最常见的词。它们帮助我们明确谈论的是一个泛指的东西（a/an），还是一个特指的东西（the）。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 Examples</SectionTitle>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex1'} onClick={() => setActiveExample(p => p === 'ex1' ? null : 'ex1')}>
                    <ExampleHeader>
                        <ExampleEnglish>I saw <strong>a</strong> cat. <strong>The</strong> cat was black.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I saw a cat. The cat was black.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我看到了一只猫。那只猫是黑色的。（第一次提到用a，后面特指用the）</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex2'} onClick={() => setActiveExample(p => p === 'ex2' ? null : 'ex2')}>
                    <ExampleHeader>
                        <ExampleEnglish>He ate <strong>an</strong> orange.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He ate an orange.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他吃了一个橙子。（orange以元音开头，用an）</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <WordSelectorPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                completionTitle="🎉 Congratulations!"
                completionMessage="You've completed all the lessons in this section."
                nextButtonText="Finish & Return to List"
            />
        </LessonContainer>
    );
};