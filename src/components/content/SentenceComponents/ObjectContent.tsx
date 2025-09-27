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

interface ObjectContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const practiceData = [
    { sentence: 'She reads a book.', targetWords: ['book'], prompt: '宾语 (Object)', chinese: '她在读书。' },
    { sentence: 'I have a pen.', targetWords: ['pen'], prompt: '宾语 (Object)', chinese: '我有一支钢笔。' },
    { sentence: 'He loves music.', targetWords: ['music'], prompt: '宾语 (Object)', chinese: '他热爱音乐。' },
    { sentence: 'They bought a car.', targetWords: ['car'], prompt: '宾语 (Object)', chinese: '他们买了一辆车。' },
    { sentence: 'We eat apples.', targetWords: ['apples'], prompt: '宾语 (Object)', chinese: '我们吃苹果。' },
];


export const ObjectContent: React.FC<ObjectContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>🎯 Object (宾语)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 什么是宾语？</SectionTitle>
                <p>宾语是动作的“承受者”。它回答了“（主语）做了什么？”或“（主语）对谁做了什么？”的问题。注意：只有实义动词（Action Verbs）才有宾语。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 Examples</SectionTitle>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex1'} onClick={() => setActiveExample(p => p === 'ex1' ? null : 'ex1')}>
                    <ExampleHeader>
                        <ExampleEnglish>She reads <strong>a book</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('She reads a book.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>她在读书。（她读了什么？一本书。）</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex2'} onClick={() => setActiveExample(p => p === 'ex2' ? null : 'ex2')}>
                    <ExampleHeader>
                        <ExampleEnglish>He loves <strong>her</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He loves her.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他爱她。（他爱谁？她。）</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <WordSelectorPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                completionTitle="🎉 Well Done!"
                completionMessage="你已掌握句子的三大核心成分！"
                nextButtonText="Next Lesson: Attributive →"
            />
        </LessonContainer>
    );
};