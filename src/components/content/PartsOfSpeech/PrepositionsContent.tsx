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

interface PrepositionsContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const practiceData = [
    { sentence: 'The cat is on the table.', targetWords: ['on'], prompt: '介词 (Preposition)', chinese: "猫在桌子上。" },
    { sentence: 'I go to school.', targetWords: ['to'], prompt: '介词 (Preposition)', chinese: "我去上学。" },
    { sentence: 'He lives in London.', targetWords: ['in'], prompt: '介词 (Preposition)', chinese: "他住在伦敦。" },
    { sentence: 'The book is under the bed.', targetWords: ['under'], prompt: '介词 (Preposition)', chinese: "书在床下。" },
    { sentence: "We will meet at 8 o'clock.", targetWords: ['at'], prompt: '介词 (Preposition)', chinese: "我们八点钟见。" },
    { sentence: 'I am from China.', targetWords: ['from'], prompt: '介词 (Preposition)', chinese: "我来自中国。" },
    { sentence: 'We will meet after school.', targetWords: ['after'], prompt: '介词 (Preposition)', chinese: "我们放学后见。" },
];

export const PrepositionsContent: React.FC<PrepositionsContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>📍 Prepositions (介词)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学介词？</SectionTitle>
                <p>介词像GPS一样，告诉我们事物的位置、时间和方向。它们连接名词到句子的其他部分，表示它们之间的关系。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 Examples</SectionTitle>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex1'} onClick={() => setActiveExample(p => p === 'ex1' ? null : 'ex1')}>
                    <ExampleHeader>
                        <ExampleEnglish>The keys are <strong>in</strong> the box.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The keys are in the box.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>钥匙在盒子里。（in 表示位置）</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex2'} onClick={() => setActiveExample(p => p === 'ex2' ? null : 'ex2')}>
                    <ExampleHeader>
                        <ExampleEnglish>We go to the park <strong>after</strong> lunch.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('We go to the park after lunch.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我们午饭后去公园。（after 表示时间）</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <WordSelectorPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                completionTitle="🎉 Perfect!"
                completionMessage="You're an expert on prepositions now."
                nextButtonText="Next Lesson: Conjunctions →"
            />
        </LessonContainer>
    );
};
