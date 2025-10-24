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

interface ItIsAdjForSbContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const FormulaContainer = styled.div`
    text-align: center;
    font-size: 1.1em;
    font-weight: 500;
    color: #2d3748;
    background: #f8f9fa;
    padding: 20px;
    border-radius: 15px;
    line-height: 1.8;
`;

const Part = styled.span<{ color?: string }>`
    background-color: ${props => props.color ? `rgba(${props.color.substring(1).match(/.{1,2}/g)?.map(v => parseInt(v, 16)).join(',')}, 0.1)` : '#e2e8f0'};
    color: ${props => props.color || '#4a5568'};
    padding: 3px 8px;
    border-radius: 6px;
    border: 1px solid ${props => props.color ? `rgba(${props.color.substring(1).match(/.{1,2}/g)?.map(v => parseInt(v, 16)).join(',')}, 0.3)` : '#ced4da'};
`;

const OptionalPart = styled(Part)`
    opacity: 0.7;
    font-style: italic;
`;


const practiceData = [
    { words: [{ en: 'It is', cn: '' }, { en: 'important', cn: '重要的' }, { en: 'for us', cn: '对我们' }, { en: 'to learn', cn: '去学习' }, { en: 'English', cn: '英语' }], correct: ['It is', 'important', 'for us', 'to learn', 'English'], chinese: '对我们来说，学英语很重要。' },
    { words: [{ en: 'It is', cn: '' }, { en: 'easy', cn: '容易的' }, { en: 'for him', cn: '对他' }, { en: 'to do this', cn: '做这个' }], correct: ['It is', 'easy', 'for him', 'to do this'], chinese: '做这件事对他来说很容易。' },
    { words: [{ en: 'It is', cn: '' }, { en: 'difficult', cn: '困难的' }, { en: 'to get up', cn: '起床' }, { en: 'early', cn: '早' }], correct: ['It is', 'difficult', 'to get up', 'early'], chinese: '早起是困难的。' },
    { words: [{ en: 'It is', cn: '' }, { en: 'fun', cn: '有趣的' }, { en: 'to play', cn: '玩' }, { en: 'with friends', cn: '和朋友' }], correct: ['It is', 'fun', 'to play', 'with friends'], chinese: '和朋友们一起玩很有趣。' },
    { words: [{ en: 'It is', cn: '' }, { en: 'necessary', cn: '必要的' }, { en: 'to protect', cn: '保护' }, { en: 'the environment', cn: '环境' }], correct: ['It is', 'necessary', 'to protect', 'the environment'], chinese: '保护环境是必要的。' },
    { words: [{ en: 'It is', cn: '' }, { en: 'dangerous', cn: '危险的' }, { en: 'to swim', cn: '游泳' }, { en: 'in the river', cn: '在河里' }], correct: ['It is', 'dangerous', 'to swim', 'in the river'], chinese: '在河里游泳是危险的。' },
    { words: [{ en: 'It is', cn: '' }, { en: 'not polite', cn: '不礼貌的' }, { en: 'for children', cn: '对孩子们' }, { en: 'to shout', cn: '大喊' }], correct: ['It is', 'not polite', 'for children', 'to shout'], chinese: '孩子们大喊大叫是不礼貌的。' },
];

export const ItIsAdjForSbContent: React.FC<ItIsAdjForSbContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>✨ It is adj for sb. to do sth.</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>这是一个超级实用的句型，用来评价某个行为。它用 "It" 作为形式主语，把真正的主语 (to do sth.) 放在后面，让句子听起来更平衡、更地道。</p>
            </WhyLearnSection>

            <FormulaSection themeColor={themeColor}>
                <FormulaTitle themeColor={themeColor}>结构公式</FormulaTitle>
                <FormulaContainer>
                    <Part color={themeColor}>It</Part> is <Part>Adjective</Part> <OptionalPart>(for somebody)</OptionalPart> <Part>to do something</Part>.
                </FormulaContainer>
            </FormulaSection>

            <ExamplesSection>
                <SectionTitle>📝 例子 (点击分析)</SectionTitle>
                <ExampleItem onClick={() => handleToggleBreakdown('ex1')} themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>It is important for students to study hard.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('It is important for students to study hard.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>对学生来说，努力学习很重要。</ExampleChinese>
                    <ExampleBreakdown show={activeExample === 'ex1'} themeColor={themeColor}>
                        <BreakdownPart><strong>形式主语 (Formal Subject):</strong> It</BreakdownPart>
                        <BreakdownPart><strong>形容词 (Adjective):</strong> important</BreakdownPart>
                        <BreakdownPart><strong>逻辑主语 (Logical Subject):</strong> for students</BreakdownPart>
                        <BreakdownPart><strong>真正主语 (Real Subject):</strong> to study hard</BreakdownPart>
                    </ExampleBreakdown>
                </ExampleItem>
                <ExampleItem onClick={() => handleToggleBreakdown('ex2')} themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>It is difficult to learn English well.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('It is difficult to learn English well.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>学好英语是困难的。</ExampleChinese>
                    <ExampleBreakdown show={activeExample === 'ex2'} themeColor={themeColor}>
                        <BreakdownPart><strong>形式主语 (Formal Subject):</strong> It</BreakdownPart>
                        <BreakdownPart><strong>形容词 (Adjective):</strong> difficult</BreakdownPart>
                        <BreakdownPart><strong>逻辑主语 (Logical Subject):</strong> (省略了，泛指 for anyone)</BreakdownPart>
                        <BreakdownPart><strong>真正主语 (Real Subject):</strong> to learn English well</BreakdownPart>
                    </ExampleBreakdown>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：构建句子"
                subtitle="用下面的词组成句子"
                completionTitle="🎉 Fantastic!"
                completionMessage="你已掌握所有常见句型！"
                nextButtonText="完成学习，返回列表"
            />
        </LessonContainer>
    );
};