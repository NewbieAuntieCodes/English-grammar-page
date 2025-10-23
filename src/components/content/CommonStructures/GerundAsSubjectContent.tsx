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
    FormulaSection,
    FormulaTitle,
    ExamplesSection,
    ExampleItem,
    ExampleHeader,
    SpeakButton,
    ExampleEnglish,
    ExampleChinese,
    ExampleBreakdown,
    BreakdownPart,
} from '../Structures/SVOContent.styles';
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';
import styled from 'styled-components';

interface GerundAsSubjectContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const FormulaContainer = styled.div`
    text-align: center;
    font-size: 1.2em;
    font-weight: 500;
    color: #2d3748;
    background: #f8f9fa;
    padding: 20px;
    border-radius: 15px;
`;

const ClausePart = styled.span<{ themeColor: string }>`
    background-color: rgba(${props => props.themeColor.substring(1).match(/.{1,2}/g)?.map(v => parseInt(v, 16)).join(',')}, 0.1);
    color: ${props => props.themeColor};
    padding: 5px 10px;
    border-radius: 8px;
    border: 1px solid ${props => props.themeColor};
`;

const MainClausePart = styled.span`
    background-color: #e2e8f0;
    color: #4a5568;
    padding: 5px 10px;
    border-radius: 8px;
`;

const practiceData = [
    { words: [{ en: 'Swimming', cn: '游泳' }, { en: 'is', cn: '是' }, { en: 'good exercise', cn: '好的锻炼' }], correct: ['Swimming', 'is', 'good exercise'], chinese: '游泳是很好的锻炼。' },
    { words: [{ en: 'Learning English', cn: '学英语' }, { en: 'is', cn: '是' }, { en: 'fun', cn: '有趣的' }], correct: ['Learning English', 'is', 'fun'], chinese: '学习英语很有趣。' },
    { words: [{ en: 'Waking up early', cn: '早起' }, { en: 'is', cn: '是' }, { en: 'difficult', cn: '困难的' }], correct: ['Waking up early', 'is', 'difficult'], chinese: '早起是困难的。' },
    { words: [{ en: 'Playing sports', cn: '做运动' }, { en: 'makes', cn: '使' }, { en: 'you healthy', cn: '你健康' }], correct: ['Playing sports', 'makes', 'you healthy'], chinese: '做运动使你健康。' },
    { words: [{ en: 'Listening to music', cn: '听音乐' }, { en: 'relaxes', cn: '放松' }, { en: 'me', cn: '我' }], correct: ['Listening to music', 'relaxes', 'me'], chinese: '听音乐让我放松。' },
    { words: [{ en: 'Reading books', cn: '读书' }, { en: 'is', cn: '是' }, { en: 'a good habit', cn: '一个好习惯' }], correct: ['Reading books', 'is', 'a good habit'], chinese: '读书是一个好习惯。' },
    { words: [{ en: 'Traveling', cn: '旅行' }, { en: 'broadens', cn: '开阔' }, { en: 'the mind', cn: '眼界' }], correct: ['Traveling', 'broadens', 'the mind'], chinese: '旅行开阔眼界。' },
];

export const GerundAsSubjectContent: React.FC<GerundAsSubjectContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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

    const handleSpeak = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            const usVoice = voices.find(voice => voice.lang === 'en-US');
            utterance.voice = usVoice || voices.find(voice => voice.lang.startsWith('en-')) || null;
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleToggleBreakdown = (exampleId: string) => {
        setActiveExample(prev => (prev === exampleId ? null : exampleId));
    };

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to List</BackButton>
            <LessonTitle>🏃 动名词做主语</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>把一个“动作”当作句子的“主角”来说，会让你的表达更流畅、更地道。比如，不说 "To swim is good" (有点生硬)，而说 "Swimming is good" (非常自然)。</p>
            </WhyLearnSection>

            <FormulaSection themeColor={themeColor}>
                <FormulaTitle themeColor={themeColor}>结构公式</FormulaTitle>
                <FormulaContainer>
                    <ClausePart themeColor={themeColor}>Verb-ing (+ ...)</ClausePart>
                    &nbsp;+&nbsp;
                    <MainClausePart>Verb + ...</MainClausePart>
                </FormulaContainer>
            </FormulaSection>

            <ExamplesSection>
                <SectionTitle>📝 例子 (点击分析)</SectionTitle>
                <ExampleItem onClick={() => handleToggleBreakdown('ex1')} themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Reading is fun.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Reading is fun.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>阅读很有趣。</ExampleChinese>
                    <ExampleBreakdown show={activeExample === 'ex1'} themeColor={themeColor}>
                        <BreakdownPart><strong>主语 (Subject):</strong> Reading (阅读这件事)</BreakdownPart>
                        <BreakdownPart><strong>谓语 (Verb):</strong> is</BreakdownPart>
                        <BreakdownPart><strong>表语 (Complement):</strong> fun</BreakdownPart>
                    </ExampleBreakdown>
                </ExampleItem>
                <ExampleItem onClick={() => handleToggleBreakdown('ex2')} themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Learning a new language takes time.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Learning a new language takes time.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>学习一门新语言需要时间。</ExampleChinese>
                    <ExampleBreakdown show={activeExample === 'ex2'} themeColor={themeColor}>
                        <BreakdownPart><strong>主语 (Subject):</strong> Learning a new language (学习新语言这件事)</BreakdownPart>
                        <BreakdownPart><strong>谓语 (Verb):</strong> takes</BreakdownPart>
                        <BreakdownPart><strong>宾语 (Object):</strong> time</BreakdownPart>
                    </ExampleBreakdown>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：构建动名词主语句子"
                subtitle="用下面的词组成句子"
                completionTitle="🎉 Awesome!"
                completionMessage="你已掌握动名词做主语！"
                nextButtonText="学习下一个句型 →"
            />
        </LessonContainer>
    );
};