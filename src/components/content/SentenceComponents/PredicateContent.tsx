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

interface PredicateContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const practiceData = [
    { sentence: 'Birds fly.', targetWords: ['fly'], prompt: '谓语 (Predicate)', chinese: '鸟儿飞翔。' },
    { sentence: 'She reads a book.', targetWords: ['reads'], prompt: '谓语 (Predicate)', chinese: '她在读书。' },
    { sentence: 'He is happy.', targetWords: ['is'], prompt: '谓语 (Predicate)', chinese: '他很开心。' },
    { sentence: 'They play games.', targetWords: ['play'], prompt: '谓语 (Predicate)', chinese: '他们玩游戏。' },
    { sentence: 'The baby sleeps.', targetWords: ['sleeps'], prompt: '谓语 (Predicate)', chinese: '宝宝在睡觉。' },
];


export const PredicateContent: React.FC<PredicateContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>🏃 Predicate (谓语)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 什么是谓语？</SectionTitle>
                <p>谓语是句子的“心脏”！它说明主语“做什么”或“是什么”，其核心是一个动词。一个句子绝对不能没有谓语。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 Examples</SectionTitle>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex1'} onClick={() => setActiveExample(p => p === 'ex1' ? null : 'ex1')}>
                    <ExampleHeader>
                        <ExampleEnglish>The cat <strong>sleeps</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The cat sleeps.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>猫在睡觉。（猫在做什么？睡觉。）</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex2'} onClick={() => setActiveExample(p => p === 'ex2' ? null : 'ex2')}>
                    <ExampleHeader>
                        <ExampleEnglish>He <strong>is a student</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He is a student.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他是一名学生。（他是什么？是学生。）</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <WordSelectorPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                completionTitle="🎉 Excellent!"
                completionMessage="你已经学会识别句子的核心动作了！"
                nextButtonText="Next Lesson: Object →"
            />
        </LessonContainer>
    );
};
