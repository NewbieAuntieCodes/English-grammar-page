/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
    ExampleSwitcher,
    SwitcherButton,
    popIn,
} from '../Structures/SVOContent.styles';
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';

interface AttributiveClausesContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const practiceData = [
    { 
        words: [
            { en: 'The girl', cn: '那个女孩' }, 
            { en: 'who', cn: '(引导词)' }, 
            { en: 'is wearing a red hat', cn: '正戴着一顶红帽子' }, 
            { en: 'is my sister', cn: '是我的妹妹' }
        ], 
        correct: ['The girl', 'who', 'is wearing a red hat', 'is my sister'], 
        chinese: '那个戴着红帽子的女孩是我的妹妹。' 
    },
    { 
        words: [
            { en: 'This is the cake', cn: '这就是那个蛋糕' }, 
            { en: 'that', cn: '(引导词)' }, 
            { en: 'I made', cn: '我做的' }
        ], 
        correct: ['This is the cake', 'that', 'I made'], 
        chinese: '这就是我做的那个蛋糕。' 
    },
    { 
        words: [
            { en: 'I know the man', cn: '我认识那个男人' }, 
            { en: 'whose car', cn: '他的车' }, 
            { en: 'was stolen', cn: '被偷了' }
        ], 
        correct: ['I know the man', 'whose car', 'was stolen'], 
        chinese: '我认识那个车被偷了的男人。' 
    },
    { 
        words: [
            { en: 'This is the park', cn: '这是那个公园' }, 
            { en: 'where', cn: '(引导词)' }, 
            { en: 'we first met', cn: '我们初次相遇' }
        ], 
        correct: ['This is the park', 'where', 'we first met'], 
        chinese: '这是我们初次相遇的公园。' 
    },
    { 
        words: [
            { en: 'I miss the days', cn: '我怀念那些日子' }, 
            { en: 'when', cn: '(引导词)' }, 
            { en: 'we were young', cn: '我们还年轻' }
        ], 
        correct: ['I miss the days', 'when', 'we were young'], 
        chinese: '我怀念我们年轻时的那些日子。' 
    },
];

const examples = [
    {
        id: 'ex1',
        title: 'who/that (指人)',
        english: 'The man who lives next door is a doctor.',
        chinese: '住在隔壁的那个男人是一名医生。',
        antecedent: 'The man',
        clause: 'who lives next door',
        mainSentence: 'The man ... is a doctor.',
        core: "从句 `who lives next door` 像一个长长的形容词，用来修饰 `The man`，告诉我们是“哪个”男人。"
    },
    {
        id: 'ex2',
        title: 'which/that (指物)',
        english: 'This is the book that I bought yesterday.',
        chinese: '这就是我昨天买的那本书。',
        antecedent: 'the book',
        clause: 'that I bought yesterday',
        mainSentence: 'This is the book ...',
        core: "从句 `that I bought yesterday` 用来修饰 `the book`，说明是“哪本”书。"
    },
    {
        id: 'ex3',
        title: 'where (指地点)',
        english: 'The house where I grew up is now a museum.',
        chinese: '我长大的那座房子现在是一个博物馆。',
        antecedent: 'The house',
        clause: 'where I grew up',
        mainSentence: 'The house ... is now a museum.',
        core: "从句 `where I grew up` 用来修饰 `The house`，说明是“哪座”房子。"
    },
    {
        id: 'ex4',
        title: 'when (指时间)',
        english: 'I remember the day when we first met.',
        chinese: '我记得我们初次见面的那一天。',
        antecedent: 'the day',
        clause: 'when we first met',
        mainSentence: 'I remember the day ...',
        core: "从句 `when we first met` 用来修饰 `the day`，说明是“哪一天”。"
    },
];

const AnimatedExampleItem = styled(ExampleItem)`
    animation: ${popIn} 0.4s ease-out;
`;

const FormulaContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f8f9fa;
    padding: 20px;
    border-radius: 15px;
    font-size: 1.2em;
    font-weight: 500;
    color: #2d3748;
    flex-wrap: wrap;
`;

const AntecedentPart = styled.span<{ themeColor: string }>`
    background-color: rgba(${props => props.themeColor.substring(1).match(/.{1,2}/g)?.map(v => parseInt(v, 16)).join(',')}, 0.1);
    color: ${props => props.themeColor};
    padding: 5px 10px;
    border-radius: 8px;
    border: 1px solid ${props => props.themeColor};
`;

const ClausePart = styled.span`
    background-color: #e2e8f0;
    color: #4a5568;
    padding: 5px 10px;
    border-radius: 8px;
`;


export const AttributiveClausesContent: React.FC<AttributiveClausesContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [activeExampleIndex, setActiveExampleIndex] = useState(0);

    useEffect(() => {
        const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
        if ('speechSynthesis' in window) {
            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
        return () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.onvoiceschanged = null;
            }
        };
    }, []);

    const handleSpeak = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            const usVoice = voices.find(voice => voice.lang === 'en-US');
            utterance.voice = usVoice || voices.find(voice => voice.lang.startsWith('en-')) || null;
            utterance.rate = 0.9;
            utterance.pitch = 1.1;
            window.speechSynthesis.speak(utterance);
        }
    };

    const activeExample = examples[activeExampleIndex];

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Clause List</BackButton>

            <LessonTitle>🔗 定语从句 Attributive Clauses</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>定语从句就像一个“长长的形容词”，它跟在一个名词后面，详细地描述这个名词，让别人清楚地知道你指的是“哪一个”。学会它，你的句子就能包含更丰富、更精确的信息！</p>
            </WhyLearnSection>

            <FormulaSection themeColor={themeColor}>
                <FormulaTitle themeColor={themeColor}>定语从句结构</FormulaTitle>
                <FormulaContainer>
                    ...&nbsp;
                    <AntecedentPart themeColor={themeColor}>先行词 (名词)</AntecedentPart>
                    &nbsp;+&nbsp;
                    <ClausePart>引导词 + 从句</ClausePart>
                    &nbsp;...
                </FormulaContainer>
            </FormulaSection>

            <ExamplesSection>
                <SectionTitle>📝 例子分析</SectionTitle>
                <ExampleSwitcher>
                    {examples.map((ex, index) => (
                        <SwitcherButton
                            key={ex.id}
                            isActive={activeExampleIndex === index}
                            onClick={() => setActiveExampleIndex(index)}
                            themeColor={themeColor}
                        >
                            {ex.title}
                        </SwitcherButton>
                    ))}
                </ExampleSwitcher>
                
                {activeExample && (
                    <AnimatedExampleItem themeColor={themeColor}>
                        <ExampleHeader>
                            <ExampleEnglish>{activeExample.english}</ExampleEnglish>
                            <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak(activeExample.english); }} aria-label="Speak sentence">🔊</SpeakButton>
                        </ExampleHeader>
                        <ExampleChinese>{activeExample.chinese}</ExampleChinese>
                        <ExampleBreakdown show={true} themeColor={themeColor}>
                            <BreakdownPart><strong>- 先行词 (被修饰的名词):</strong> {activeExample.antecedent}</BreakdownPart>
                            <BreakdownPart><strong>- 定语从句 (修饰部分):</strong> {activeExample.clause}</BreakdownPart>
                            <BreakdownPart><strong>- 主句 (骨架):</strong> {activeExample.mainSentence}</BreakdownPart>
                            <BreakdownPart style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #e2e8f0' }}>
                                <strong>* 核心:</strong> {activeExample.core}
                            </BreakdownPart>
                        </ExampleBreakdown>
                    </AnimatedExampleItem>
                )}
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：构建定语从句"
                subtitle="用下面的词块组成句子"
                completionTitle="🎉 Perfect!"
                completionMessage="你已经掌握了如何使用定语从句！"
                nextButtonText="返回从句列表"
            />

        </LessonContainer>
    );
};