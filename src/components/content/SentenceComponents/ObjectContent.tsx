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
    { sentence: 'She reads a book.', targetWords: ['a', 'book'], prompt: '完整宾语 (Object)', chinese: '她在读书。宾语是完整的 a book。' },
    { sentence: 'I have a pen.', targetWords: ['a', 'pen'], prompt: '完整宾语 (Object)', chinese: '我有一支钢笔。宾语是完整的 a pen。' },
    { sentence: 'He loves music.', targetWords: ['music'], prompt: '宾语 (Object)', chinese: '他热爱音乐。' },
    { sentence: 'They bought a car.', targetWords: ['a', 'car'], prompt: '完整宾语 (Object)', chinese: '他们买了一辆车。宾语是完整的 a car。' },
    { sentence: 'We eat apples.', targetWords: ['apples'], prompt: '宾语 (Object)', chinese: '我们吃苹果。' },
    { sentence: 'She is writing a letter.', targetWords: ['a', 'letter'], prompt: '完整宾语 (Object)', chinese: '她正在写一封信。宾语是完整的 a letter。' },
    { sentence: 'My father drives a car.', targetWords: ['a', 'car'], prompt: '完整宾语 (Object)', chinese: '我爸爸开一辆车。宾语是完整的 a car。' },
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
                <p>宾语是动作影响到的人或事。它常跟在实义动词后面，回答“做了什么”或“对谁做”。</p>
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
