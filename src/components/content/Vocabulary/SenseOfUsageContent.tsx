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

interface SenseOfUsageContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const practiceData = [
    { words: [{ en: 'He has', cn: '他有' }, { en: 'a good sense of', cn: '很好的' }, { en: 'humor', cn: '幽默感' }], correct: ['He has', 'a good sense of', 'humor'], chinese: '他很有幽默感。' },
    { words: [{ en: 'She has', cn: '她有' }, { en: 'a strong sense of', cn: '强烈的' }, { en: 'duty', cn: '责任感' }], correct: ['She has', 'a strong sense of', 'duty'], chinese: '她有强烈的责任感。' },
    { words: [{ en: 'The job gives me', cn: '这份工作给我' }, { en: 'a sense of', cn: '' }, { en: 'accomplishment', cn: '成就感' }], correct: ['The job gives me', 'a sense of', 'accomplishment'], chinese: '这份工作给了我一种成就感。' },
    { words: [{ en: 'He lost', cn: '他失去了' }, { en: 'his sense of', cn: '他的' }, { en: 'direction', cn: '方向感' }, { en: 'in the forest', cn: '在森林里' }], correct: ['He lost', 'his sense of', 'direction', 'in the forest'], chinese: '他在森林里失去了方向感。' },
    { words: [{ en: "It's important", cn: '很重要' }, { en: 'to develop', cn: '去培养' }, { en: 'a sense of', cn: '' }, { en: 'responsibility', cn: '责任感' }], correct: ["It's important", 'to develop', 'a sense of', 'responsibility'], chinese: '培养责任感很重要。' },
    { words: [{ en: 'She has', cn: '她有' }, { en: 'a great', cn: '很好的' }, { en: 'sense of style', cn: '时尚感' }], correct: ['She has', 'a great', 'sense of style'], chinese: '她有很好的时尚感。' },
    { words: [{ en: 'The urgent news', cn: '紧急新闻' }, { en: 'created', cn: '制造了' }, { en: 'a sense of panic', cn: '一种恐慌感' }], correct: ['The urgent news', 'created', 'a sense of panic'], chinese: '这则紧急新闻造成了恐慌。' },
];

export const SenseOfUsageContent: React.FC<SenseOfUsageContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>📖 'a sense of' 的用法</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"a sense of" 是一个非常地道的英语短语，用来表达一个人所拥有或体验到的某种感觉、品质或意识。例如“幽默感”(a sense of humor) 或“责任感”(a sense of responsibility)。掌握它能让你的表达更细腻、更丰富。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要结构: a sense of + [名词]</SectionTitle>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    这个结构用来描述一种抽象的感觉或品质。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>He has a good <strong>sense of humor</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He has a good sense of humor.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他很有幽默感。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>After a long hike, I felt a <strong>sense of accomplishment</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('After a long hike, I felt a sense of accomplishment.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>长途徒步后，我感到一种成就感。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The new employee showed a strong <strong>sense of responsibility</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The new employee showed a strong sense of responsibility.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>新员工表现出了强烈的责任感。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习: 'a sense of' 的用法"
                subtitle="用下面的词组成句子"
                completionTitle="🎉 Great!"
                completionMessage="你已经掌握了 'a sense of' 的用法！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};