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

interface AdverbsContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const practiceData = [
    { sentence: 'He runs fast.', targetWords: ['fast'], prompt: '副词 (Adverb)', chinese: "他跑得很快。" },
    { sentence: 'She sings well.', targetWords: ['well'], prompt: '副词 (Adverb)', chinese: "她唱得很好。" },
    { sentence: 'He is very tall.', targetWords: ['very'], prompt: '副词 (Adverb)', chinese: "他非常高。" },
    { sentence: 'The boy works hard.', targetWords: ['hard'], prompt: '副词 (Adverb)', chinese: "这个男孩努力工作。" },
    { sentence: 'I often read books.', targetWords: ['often'], prompt: '副词 (Adverb)', chinese: "我经常读书。" },
];

export const AdverbsContent: React.FC<AdverbsContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>🚀 Adverbs (副词)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学副词？</SectionTitle>
                <p>副词为动作和描述增添了更多信息。它们告诉我们动作发生的方式（how）、时间（when）或地点（where）。副词能让你的描述更精确。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 Examples</SectionTitle>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex1'} onClick={() => setActiveExample(p => p === 'ex1' ? null : 'ex1')}>
                    <ExampleHeader>
                        <ExampleEnglish>He walks <strong>slowly</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He walks slowly.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他走得很慢。（slowly 修饰动词 walks）</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex2'} onClick={() => setActiveExample(p => p === 'ex2' ? null : 'ex2')}>
                    <ExampleHeader>
                        <ExampleEnglish>It's a <strong>very</strong> big house.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("It's a very big house."); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这是一座非常大的房子。（very 修饰形容词 big）</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <WordSelectorPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                completionTitle="🎉 Wonderful!"
                completionMessage="You have a strong grasp of adverbs."
                nextButtonText="Next Lesson: Prepositions →"
            />
        </LessonContainer>
    );
};