/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
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
    { sentence: 'Reading is fun.', targetWords: ['Reading'], prompt: '主语 (Subject)', chinese: '阅读很有趣。' },
    { sentence: 'My teacher helps me.', targetWords: ['teacher'], prompt: '主语 (Subject)', chinese: '我的老师帮助我。' },
    { sentence: 'To swim is good exercise.', targetWords: ['To', 'swim'], prompt: '主语 (Subject)', chinese: '游泳是很好的锻炼。' },
    { sentence: 'We play football.', targetWords: ['We'], prompt: '主语 (Subject)', chinese: '我们踢足球。' },
    { sentence: 'What he said is a secret.', targetWords: ['What', 'he', 'said'], prompt: '主语 (Subject)', chinese: '他所说的是个秘密。' },
    { sentence: 'The sun shines.', targetWords: ['sun'], prompt: '主语 (Subject)', chinese: '太阳在照耀。' },
];

const UsageType = styled.h3`
    font-size: 1.2em;
    font-weight: bold;
    color: #2d3748;
    margin-top: 25px;
    margin-bottom: 10px;
    padding-top: 15px;
    border-top: 1px solid #e2e8f0;
`;


export const SubjectContent: React.FC<SubjectContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    
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
                <p>主语是句子的“主角”！它告诉我们句子在谈论“谁”或“什么”，是动作的发出者。<strong>主语通常由名词或起名词作用的成分充当。</strong> 找到主语是理解句子的第一步。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 充当主语的常见形式</SectionTitle>

                <UsageType>1. 名词 (Noun)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>The cat</strong> sleeps.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The cat sleeps.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>猫在睡觉。（谁在睡觉？猫。）</ExampleChinese>
                </ExampleItem>
                
                <UsageType>2. 代词 (Pronoun)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>He</strong> loves music.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He loves music.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他热爱音乐。（谁热爱音乐？他。）</ExampleChinese>
                </ExampleItem>

                <UsageType>3. 动名词 (Gerund)</UsageType>
                <p style={{ color: '#4a5568', margin: '0 0 15px 5px', lineHeight: '1.6' }}>
                    动词的-ing形式也可以像名词一样，充当句子的主语，表示一个“动作”或“事情”。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>Reading</strong> is fun.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Reading is fun.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>阅读很有趣。（什么很有趣？阅读这件事。）</ExampleChinese>
                </ExampleItem>

                <UsageType>4. 不定式 (Infinitive)</UsageType>
                 <p style={{ color: '#4a5568', margin: '0 0 15px 5px', lineHeight: '1.6' }}>
                    `to + 动词原形` 也可以作主语，但更常见的是用 `It` 作形式主语将不定式后置。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>To learn a new language</strong> takes time.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('To learn a new language takes time.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>学习一门新语言需要时间。（什么需要时间？学习一门新语言这件事。）</ExampleChinese>
                </ExampleItem>
                
                <UsageType>5. 名词性从句 (Noun Clause)</UsageType>
                <p style={{ color: '#4a5568', margin: '0 0 15px 5px', lineHeight: '1.6' }}>
                    一个完整的句子（由 `what`, `that`, `whether` 等引导）也可以充当另一个大句子的主语。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>What he said</strong> is not true.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('What he said is not true.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他所说的话不是真的。（什么不是真的？他所说的话。）</ExampleChinese>
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
