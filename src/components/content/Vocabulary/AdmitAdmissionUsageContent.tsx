/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import {
    LessonContainer,
    LessonTitle,
    BackButton,
    WhyLearnSection,
    SectionTitle,
    ExamplesSection,
    ExampleItem,
    ExampleHeader,
    SpeakButton,
    ExampleEnglish,
    ExampleChinese,
} from '../Structures/SVOContent.styles';
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';
import styled from 'styled-components';

interface AdmitAdmissionUsageContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const UsageType = styled.h3`
    font-size: 1.2em;
    font-weight: bold;
    color: #2d3748;
    margin-top: 20px;
    margin-bottom: 10px;
`;

const practiceData = [
    { words: [{ en: 'He refused to', cn: '他拒绝' }, { en: 'admit', cn: '承认' }, { en: 'his mistake', cn: '他的错误' }], correct: ['He refused to', 'admit', 'his mistake'], chinese: '他拒绝承认自己的错误。' },
    { words: [{ en: 'Admission to', cn: '进入...是' }, { en: 'the museum', cn: '博物馆' }, { en: 'is free', cn: '免费的' }], correct: ['Admission to', 'the museum', 'is free'], chinese: '进入博物馆是免费的。' },
    { words: [{ en: 'She finally', cn: '她最终' }, { en: 'admitted that', cn: '承认' }, { en: 'she was wrong', cn: '她错了' }], correct: ['She finally', 'admitted that', 'she was wrong'], chinese: '她最终承认自己错了。' },
    { words: [{ en: 'He was denied', cn: '他被拒绝' }, { en: 'admission to', cn: '进入' }, { en: 'the club', cn: '俱乐部' }], correct: ['He was denied', 'admission to', 'the club'], chinese: '他被拒绝加入该俱乐部。' },
    { words: [{ en: 'You must', cn: '你必须' }, { en: 'admit', cn: '承认' }, { en: 'the plan has problems', cn: '计划有问题' }], correct: ['You must', 'admit', 'the plan has problems'], chinese: '你必须承认这个计划有问题。' },
    { words: [{ en: 'His letter was', cn: '他的信是' }, { en: 'an admission of', cn: '一份...的承认' }, { en: 'defeat', cn: '失败' }], correct: ['His letter was', 'an admission of', 'defeat'], chinese: '他的信等于承认了失败。' },
    { words: [{ en: 'The hospital has', cn: '这家医院有' }, { en: 'a new', cn: '一个新的' }, { en: 'admission policy', cn: '入院政策' }], correct: ['The hospital has', 'a new', 'admission policy'], chinese: '这家医院有新的入院政策。' },
    { words: [{ en: 'They', cn: '他们' }, { en: 'admitted', cn: '承认' }, { en: 'breaking the window', cn: '打破了窗户' }], correct: ['They', 'admitted', 'breaking the window'], chinese: '他们承认打破了窗户。' },
];

export const AdmitAdmissionUsageContent: React.FC<AdmitAdmissionUsageContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
        if ('speechSynthesis' in window) {
            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
        return () => { if ('speechSynthesis' in window) window.speechSynthesis.onvoiceschanged = null; };
    }, []);

    const handleSpeak = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            const usVoice = voices.find(voice => voice.lang === 'en-US');
            utterance.voice = usVoice || voices.find(voice => voice.lang.startsWith('en-')) || null;
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to List</BackButton>
            <LessonTitle>📖 'admit' vs 'admission'</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"admit" 是一个动词，而 "admission" 是它的名词形式。它们都与“承认”或“准入”有关，但词性决定了它们在句子中的位置和用法完全不同。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. admit (动词 - Verb)</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    意思是“承认”或“准许...进入”。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>He <strong>admitted</strong> making a mistake.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He admitted making a mistake.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他承认犯了个错误。(承认做某事: admit + V-ing)</ExampleChinese>
                </ExampleItem>
                 <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>She was <strong>admitted</strong> to the university.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("She was admitted to the university."); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>她被这所大学录取了。(准许进入)</ExampleChinese>
                </ExampleItem>

                <UsageType>2. admission (名词 - Noun)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    意思是“承认”或“入场费；进入许可”。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>His silence was an <strong>admission</strong> of guilt.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('His silence was an admission of guilt.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他的沉默就是承认了罪行。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>Admission</strong> to the museum is free.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("Admission to the museum is free."); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>进入该博物馆是免费的。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习: 'admit' vs 'admission'"
                subtitle="用下面的词组成句子"
                completionTitle="🎉 Admitted!"
                completionMessage="你已经掌握了 'admit' 和 'admission' 的用法！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};