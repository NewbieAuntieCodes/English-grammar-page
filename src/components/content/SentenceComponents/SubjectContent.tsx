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

interface SubjectContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const practiceData = [
    { sentence: 'The dog barks.', targetWords: ['dog'], prompt: '主语 (Subject)', chinese: '狗在叫。' },
    { sentence: 'She is a doctor.', targetWords: ['She'], prompt: '主语 (Subject)', chinese: '她是一名医生。' },
    { sentence: 'My teacher helps me.', targetWords: ['teacher'], prompt: '主语 (Subject)', chinese: '我的老师帮助我。' },
    { sentence: 'We play football.', targetWords: ['We'], prompt: '主语 (Subject)', chinese: '我们踢足球。' },
    { sentence: 'The sun shines.', targetWords: ['sun'], prompt: '主语 (Subject)', chinese: '太阳在照耀。' },
    { sentence: 'The beautiful bird sings.', targetWords: ['bird'], prompt: '主语 (Subject)', chinese: '美丽的小鸟在歌唱。' },
    { sentence: 'Reading is fun.', targetWords: ['Reading'], prompt: '主语 (Subject)', chinese: '阅读很有趣。' },
];


export const SubjectContent: React.FC<SubjectContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>👤 Subject (主语)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 什么是主语？</SectionTitle>
                <p>主语是句子的“主角”！它告诉我们句子在谈论“谁”或“什么”，是动作的发出者。找到主语是理解句子的第一步。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 Examples</SectionTitle>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex1'} onClick={() => setActiveExample(p => p === 'ex1' ? null : 'ex1')}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>The cat</strong> sleeps.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The cat sleeps.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>猫在睡觉。（谁在睡觉？猫。）</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex2'} onClick={() => setActiveExample(p => p === 'ex2' ? null : 'ex2')}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>He</strong> loves music.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He loves music.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他热爱音乐。（谁热爱音乐？他。）</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <WordSelectorPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                completionTitle="🎉 Awesome!"
                completionMessage="你已经掌握了如何找到主语！"
                nextButtonText="Next Lesson: Predicate →"
            />
        </LessonContainer>
    );
};
