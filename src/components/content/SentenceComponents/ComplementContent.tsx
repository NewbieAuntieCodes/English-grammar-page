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
    { sentence: 'The sky is blue.', targetWords: ['blue'], prompt: '表语', chinese: '天空是蓝色的。blue 说明 The sky。' },
    { sentence: 'He became famous.', targetWords: ['famous'], prompt: '表语', chinese: '他变得有名了。famous 说明 He。' },
    { sentence: 'We call him Jack.', targetWords: ['Jack'], prompt: '宾补', chinese: '我们叫他杰克。Jack 说明 him 叫什么。' },
    { sentence: 'The news made me happy.', targetWords: ['happy'], prompt: '宾补', chinese: '这个消息让我很高兴。happy 说明 me 的状态。' },
    { sentence: 'She looks tired.', targetWords: ['tired'], prompt: '表语', chinese: '她看起来很累。tired 说明 She。' },
    { sentence: 'They painted the door green.', targetWords: ['green'], prompt: '宾补', chinese: '他们把门漆成了绿色。green 说明 the door 的结果状态。' },
    { sentence: 'The story made her sad.', targetWords: ['sad'], prompt: '宾补', chinese: '这个故事让她感到悲伤。sad 说明 her 的状态。' },
    { sentence: 'We consider him honest.', targetWords: ['honest'], prompt: '宾补', chinese: '我们认为他很诚实。honest 说明 him。' },
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
                <p>补语就是<strong>补充说明的成分</strong>。它通常说明主语怎么样、主语是什么，或者说明宾语怎么样、宾语是谁。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>🟦 第一种：表语</SectionTitle>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>表语跟在<strong>系动词</strong>后面，说明<strong>主语</strong>。结构：主语 + 系动词 + 表语。</p>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex1'} onClick={() => setActiveExample(p => p === 'ex1' ? null : 'ex1')}>
                    <ExampleHeader>
                        <ExampleEnglish>She is <strong>a doctor</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('She is a doctor.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>a doctor 说明 She 是什么。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex2'} onClick={() => setActiveExample(p => p === 'ex2' ? null : 'ex2')}>
                    <ExampleHeader>
                        <ExampleEnglish>The food tastes <strong>delicious</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The food tastes delicious.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>delicious 说明 The food 怎么样。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>

            <ExamplesSection>
                <SectionTitle>🟩 第二种：宾补</SectionTitle>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>宾补跟在<strong>宾语</strong>后面，说明<strong>宾语</strong>。结构：主语 + 谓语 + 宾语 + 宾补。</p>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex3'} onClick={() => setActiveExample(p => p === 'ex3' ? null : 'ex3')}>
                    <ExampleHeader>
                        <ExampleEnglish>We call him <strong>Jack</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('We call him Jack.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>him 是宾语，Jack 说明 him 叫什么。</ExampleChinese>
                </ExampleItem>
                 <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex4'} onClick={() => setActiveExample(p => p === 'ex4' ? null : 'ex4')}>
                    <ExampleHeader>
                        <ExampleEnglish>The news made me <strong>happy</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The news made me happy.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>me 是宾语，happy 说明 me 的状态。</ExampleChinese>
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
