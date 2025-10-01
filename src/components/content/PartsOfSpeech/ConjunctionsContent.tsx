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

interface ConjunctionsContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const practiceData = [
    { sentence: 'I like tea and coffee.', targetWords: ['and'], prompt: '连词 (Conjunction)', chinese: "我喜欢茶和咖啡。" },
    { sentence: 'He is rich but unhappy.', targetWords: ['but'], prompt: '连词 (Conjunction)', chinese: "他富有但不快乐。" },
    { sentence: 'Do you want water or juice?', targetWords: ['or'], prompt: '连词 (Conjunction)', chinese: "你想要水还是果汁？" },
    { sentence: 'She was tired, so she went to bed.', targetWords: ['so'], prompt: '连词 (Conjunction)', chinese: "她累了，所以她去睡觉了。" },
    { sentence: 'I will call you when I arrive.', targetWords: ['when'], prompt: '连词 (Conjunction)', chinese: "我到的时候会给你打电话。" },
    { sentence: 'He is poor but he is happy.', targetWords: ['but'], prompt: '连词 (Conjunction)', chinese: "他很穷，但他很快乐。" },
    { sentence: 'I like it because it is beautiful.', targetWords: ['because'], prompt: '连词 (Conjunction)', chinese: "我喜欢它，因为它很漂亮。" },
];

export const ConjunctionsContent: React.FC<ConjunctionsContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>🔗 Conjunctions (连词)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学连词？</SectionTitle>
                <p>连词是句子的“胶水”，它们把单词、短语和句子连接在一起，让我们的思想能够平滑地连接和流动。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 Examples</SectionTitle>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex1'} onClick={() => setActiveExample(p => p === 'ex1' ? null : 'ex1')}>
                    <ExampleHeader>
                        <ExampleEnglish>He reads books <strong>and</strong> newspapers.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He reads books and newspapers.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他读各种书和报纸。（and 连接两个名词）</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex2'} onClick={() => setActiveExample(p => p === 'ex2' ? null : 'ex2')}>
                    <ExampleHeader>
                        <ExampleEnglish>I want to go, <strong>but</strong> I am busy.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I want to go, but I am busy.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我想去，但是我正忙着。（but 连接两个句子）</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <WordSelectorPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                completionTitle="🎉 Superb!"
                completionMessage="You can now connect ideas like a native speaker."
                nextButtonText="Next Lesson: Pronouns →"
            />
        </LessonContainer>
    );
};
