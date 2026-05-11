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

interface ThereBeContentProps {
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
    { words: [{ en: 'There is', cn: '有' }, { en: 'a cat', cn: '一只猫' }, { en: 'on the roof', cn: '在屋顶上' }], correct: ['There is', 'a cat', 'on the roof'], chinese: '屋顶上有一只猫。' },
    { words: [{ en: 'There are', cn: '有' }, { en: 'three books', cn: '三本书' }, { en: 'in my bag', cn: '在我的包里' }], correct: ['There are', 'three books', 'in my bag'], chinese: '我的包里有三本书。' },
    { words: [{ en: 'Is there', cn: '有吗' }, { en: 'a bank', cn: '一家银行' }, { en: 'near here?', cn: '在这附近' }], correct: ['Is there', 'a bank', 'near here?'], chinese: '这附近有银行吗？' },
    { words: [{ en: 'There is', cn: '有' }, { en: 'a big tree', cn: '一棵大树' }, { en: 'in front of the house', cn: '在房子前面' }], correct: ['There is', 'a big tree', 'in front of the house'], chinese: '房子前面有一棵大树。' },
    { words: [{ en: 'There are', cn: '有' }, { en: 'some flowers', cn: '一些花' }, { en: 'in the vase', cn: '在花瓶里' }], correct: ['There are', 'some flowers', 'in the vase'], chinese: '花瓶里有一些花。' },
    { words: [{ en: 'There is no', cn: '没有' }, { en: 'milk', cn: '牛奶' }, { en: 'in the fridge', cn: '在冰箱里' }], correct: ['There is no', 'milk', 'in the fridge'], chinese: '冰箱里没有牛奶了。' },
    { words: [{ en: 'There were', cn: '曾有' }, { en: 'many people', cn: '很多人' }, { en: 'at the party', cn: '在派对上' }], correct: ['There were', 'many people', 'at the party'], chinese: '昨晚派对上有很多人。' },
    { words: [{ en: 'Are there', cn: '有吗' }, { en: 'any questions?', cn: '任何问题' }], correct: ['Are there', 'any questions?'], chinese: '有什么问题吗？' },
];

export const ThereBeContent: React.FC<ThereBeContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>✨ There be 句型</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"There be" 是英语中最基本的句型之一，用来表达“某地有某物”。它强调事物的“存在”，而不是某人“拥有”某物。例如，说“桌上有一本书”，而不是“桌子有一本书”。</p>
            </WhyLearnSection>

            <FormulaSection themeColor={themeColor}>
                <FormulaTitle themeColor={themeColor}>结构公式</FormulaTitle>
                <FormulaContainer>
                    <div><Part color={themeColor}>There</Part> + <Part>be (is/are/was...)</Part> + <Part>Noun (名词)</Part> + <OptionalPart>(Place/Time)</OptionalPart>.</div>
                    <div style={{ margin: '15px 0', fontSize: '0.9em', color: '#718096' }}>--- 疑问句 (Question) ---</div>
                    <div><Part>Be (Is/Are...)</Part> + <Part color={themeColor}>there</Part> + <Part>Noun (名词)</Part> + <OptionalPart>(Place/Time)</OptionalPart>?</div>
                </FormulaContainer>
            </FormulaSection>

            <ExamplesSection>
                <SectionTitle>📝 例子 (Examples)</SectionTitle>
                <ExampleItem onClick={() => handleToggleBreakdown('ex1')} themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>There is</strong> a book on the desk.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('There is a book on the desk.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>桌子上有一本书。(is 用于单数名词)</ExampleChinese>
                    <ExampleBreakdown show={activeExample === 'ex1'} themeColor={themeColor}>
                        <BreakdownPart><strong>Be 动词:</strong> is (因为 'a book' 是单数)</BreakdownPart>
                        <BreakdownPart><strong>名词:</strong> a book</BreakdownPart>
                        <BreakdownPart><strong>地点:</strong> on the desk</BreakdownPart>
                    </ExampleBreakdown>
                </ExampleItem>
                <ExampleItem onClick={() => handleToggleBreakdown('ex2')} themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>There are</strong> many people in the park.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('There are many people in the park.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>公园里有很多人。(are 用于复数名词)</ExampleChinese>
                    <ExampleBreakdown show={activeExample === 'ex2'} themeColor={themeColor}>
                        <BreakdownPart><strong>Be 动词:</strong> are (因为 'many people' 是复数)</BreakdownPart>
                        <BreakdownPart><strong>名词:</strong> many people</BreakdownPart>
                        <BreakdownPart><strong>地点:</strong> in the park</BreakdownPart>
                    </ExampleBreakdown>
                </ExampleItem>
                <ExampleItem onClick={() => handleToggleBreakdown('ex3')} themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>Is there</strong> a hospital near here?</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Is there a hospital near here?'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这附近有医院吗？(疑问句：把 be 动词提前)</ExampleChinese>
                    <ExampleBreakdown show={activeExample === 'ex3'} themeColor={themeColor}>
                        <BreakdownPart><strong>Be 动词 (提前):</strong> Is</BreakdownPart>
                        <BreakdownPart><strong>引导词:</strong> there</BreakdownPart>
                        <BreakdownPart><strong>名词:</strong> a hospital</BreakdownPart>
                        <BreakdownPart><strong>地点:</strong> near here</BreakdownPart>
                    </ExampleBreakdown>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：构建句子"
                subtitle="用下面的词组成 'There be' 句型"
                completionTitle="🎉 Fantastic!"
                completionMessage="你已掌握 'There be' 句型！"
                nextButtonText="学习 'of' 的用法 →"
            />
        </LessonContainer>
    );
};
