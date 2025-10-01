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

interface ComplementContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const practiceData = [
    { sentence: 'The sky is blue.', targetWords: ['blue'], prompt: '补语 (Complement)', chinese: '天空是蓝色的。' },
    { sentence: 'He became famous.', targetWords: ['famous'], prompt: '补语 (Complement)', chinese: '他变得有名了。' },
    { sentence: 'We call him Jack.', targetWords: ['Jack'], prompt: '补语 (Complement)', chinese: '我们叫他杰克。' },
    { sentence: 'The news made me happy.', targetWords: ['happy'], prompt: '补语 (Complement)', chinese: '这个消息让我很高兴。' },
    { sentence: 'She looks tired.', targetWords: ['tired'], prompt: '补语 (Complement)', chinese: '她看起来很累。' },
    { sentence: 'They painted the door green.', targetWords: ['green'], prompt: '补语 (Complement)', chinese: '他们把门漆成了绿色。' },
    { sentence: 'The story made her sad.', targetWords: ['sad'], prompt: '补语 (Complement)', chinese: '这个故事让她感到悲伤。' },
    { sentence: 'We consider him honest.', targetWords: ['honest'], prompt: '补语 (Complement)', chinese: '我们认为他很诚实。' },
];

export const ComplementContent: React.FC<ComplementContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>🧩 Complement (补语)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 什么是补语？</SectionTitle>
                <p>补语是“补充说明”的意思。它跟在动词后面，补充说明<strong>主语</strong>或<strong>宾语</strong>的状态或身份，让句子意思完整。没有它，句子意思就不完整或改变了。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 Examples: 主语补语 (Subject Complement)</SectionTitle>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>跟在<strong>系动词</strong> (is, am, are, look, feel...) 后面，补充说明<strong>主语</strong>。</p>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex1'} onClick={() => setActiveExample(p => p === 'ex1' ? null : 'ex1')}>
                    <ExampleHeader>
                        <ExampleEnglish>She is <strong>a doctor</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('She is a doctor.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>她是一名医生。（'a doctor' 补充说明 'She' 的身份）</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex2'} onClick={() => setActiveExample(p => p === 'ex2' ? null : 'ex2')}>
                    <ExampleHeader>
                        <ExampleEnglish>The food tastes <strong>delicious</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The food tastes delicious.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>食物尝起来很美味。（'delicious' 补充说明 'The food' 的状态）</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>

            <ExamplesSection>
                <SectionTitle>📝 Examples: 宾语补语 (Object Complement)</SectionTitle>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>跟在<strong>宾语</strong>后面，补充说明<strong>宾语</strong>。</p>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex3'} onClick={() => setActiveExample(p => p === 'ex3' ? null : 'ex3')}>
                    <ExampleHeader>
                        <ExampleEnglish>They made him <strong>the captain</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('They made him the captain.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他们让他当了队长。（'the captain' 补充说明 'him' 的身份）</ExampleChinese>
                </ExampleItem>
                 <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex4'} onClick={() => setActiveExample(p => p === 'ex4' ? null : 'ex4')}>
                    <ExampleHeader>
                        <ExampleEnglish>I found the movie <strong>boring</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I found the movie boring.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我发现这部电影很无聊。（'boring' 补充说明 'the movie' 的状态）</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <WordSelectorPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                completionTitle="🎉 Congratulations!"
                completionMessage="你已完成所有句子成分的学习！"
                nextButtonText="Finish & Return"
            />
        </LessonContainer>
    );
};
