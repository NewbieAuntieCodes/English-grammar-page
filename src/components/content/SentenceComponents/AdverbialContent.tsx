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

interface AdverbialContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const practiceData = [
    { sentence: 'She sings beautifully.', targetWords: ['beautifully'], prompt: '状语 (Adverbial)', chinese: '她唱歌唱得很美。' },
    { sentence: 'He works hard.', targetWords: ['hard'], prompt: '状语 (Adverbial)', chinese: '他工作很努力。' },
    { sentence: 'They will meet tomorrow.', targetWords: ['tomorrow'], prompt: '状语 (Adverbial)', chinese: '他们明天见面。' },
    { sentence: 'I got up early.', targetWords: ['early'], prompt: '状语 (Adverbial)', chinese: '我起得很早。' },
    { sentence: 'Please speak slowly.', targetWords: ['slowly'], prompt: '状语 (Adverbial)', chinese: '请慢慢说。' },
    { sentence: 'I often walk to school.', targetWords: ['often'], prompt: '状语 (Adverbial)', chinese: '我经常步行上学。' },
    { sentence: 'They are playing outside.', targetWords: ['outside'], prompt: '状语 (Adverbial)', chinese: '他们在外面玩。' },
];

export const AdverbialContent: React.FC<AdverbialContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>🌶️ Adverbial (状语)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 什么是状语？</SectionTitle>
                <p>状语是句子的“调味品”！它用来修饰动词、形容词、副词或整个句子，告诉我们动作发生的<strong>时间(when)</strong>、<strong>地点(where)</strong>、<strong>方式(how)</strong>等。它让句子信息更完整。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 Examples</SectionTitle>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex1'} onClick={() => setActiveExample(p => p === 'ex1' ? null : 'ex1')}>
                    <ExampleHeader>
                        <ExampleEnglish>He runs <strong>quickly</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He runs quickly.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他跑得很快。（怎样跑？快快地。）</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex2'} onClick={() => setActiveExample(p => p === 'ex2' ? null : 'ex2')}>
                    <ExampleHeader>
                        <ExampleEnglish>I will go <strong>tomorrow</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I will go tomorrow.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我明天去。（什么时候去？明天。）</ExampleChinese>
                </ExampleItem>
                 <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex3'} onClick={() => setActiveExample(p => p === 'ex3' ? null : 'ex3')}>
                    <ExampleHeader>
                        <ExampleEnglish>She lives <strong>here</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('She lives here.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>她住在这里。（住在哪里？这里。）</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <WordSelectorPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                completionTitle="🎉 Excellent!"
                completionMessage="你已经学会如何为动作添加更多细节了！"
                nextButtonText="Next Lesson: Complement →"
            />
        </LessonContainer>
    );
};
