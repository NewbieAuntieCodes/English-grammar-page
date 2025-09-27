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

interface SubjectClausesContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const practiceData = [
    { words: [{ en: 'What he said', cn: '他所说的' }, { en: 'is not', cn: '不是' }, { en: 'true', cn: '真实的' }], correct: ['What he said', 'is not', 'true'], chinese: '他所说的话不是真的。' },
    { words: [{ en: 'That', cn: '(引导词)' }, { en: 'she will come', cn: '她将会来' }, { en: 'is certain', cn: '是确定的' }], correct: ['That', 'she will come', 'is certain'], chinese: '她会来是确定的。' },
    { words: [{ en: 'It is a pity', cn: '很遗憾' }, { en: 'that', cn: '(引导词)' }, { en: 'you missed', cn: '你错过了' }, { en: 'the party', cn: '派对' }], correct: ['It is a pity', 'that', 'you missed', 'the party'], chinese: '你错过了派对，真遗憾。' },
    { words: [{ en: 'Whether', cn: '是否' }, { en: 'he can finish', cn: '他能否完成' }, { en: 'the job', cn: '工作' }, { en: 'is still', cn: '仍是' }, { en: 'a question', cn: '个问题' }], correct: ['Whether', 'he can finish', 'the job', 'is still', 'a question'], chinese: '他能否完成这项工作仍是个问题。' },
    { words: [{ en: 'It is important', cn: '很重要' }, { en: 'that', cn: '(引导词)' }, { en: 'we protect', cn: '我们保护' }, { en: 'the environment', cn: '环境' }], correct: ['It is important', 'that', 'we protect', 'the environment'], chinese: '我们保护环境很重要。' },
];

const examples = [
    {
        id: 'ex1',
        title: '从句作主语',
        english: 'What he needs is more time.',
        chinese: '他需要的是更多时间。',
        subjectClause: 'What he needs',
        mainVerb: 'is',
        mainComplement: 'more time',
        core: "整个从句 `What he needs` 在句子中充当【主语】的角色，回答了“`什么`是更多时间？”的问题。"
    },
    {
        id: 'ex2',
        title: '从句作主语',
        english: 'That the world is round is a fact.',
        chinese: '地球是圆的，这是一个事实。',
        subjectClause: 'That the world is round',
        mainVerb: 'is',
        mainComplement: 'a fact',
        core: "整个从句 `That the world is round` 充当句子的【主语】。"
    },
    {
        id: 'ex3',
        title: '形式主语 "It"',
        english: 'It is a fact that the world is round.',
        chinese: '地球是圆的，这是一个事实。',
        formalSubject: 'It',
        mainVerb: 'is a fact',
        realSubject: 'that the world is round',
        core: "为了避免头重脚轻，我们常用 `It` 作形式主语放在句首，而把真正的主语（从句）放到后面。这是更常见的用法！"
    },
    {
        id: 'ex4',
        title: '形式主语 "It"',
        english: 'It is uncertain whether he will join us.',
        chinese: '他不确定是否会加入我们。',
        formalSubject: 'It',
        mainVerb: 'is uncertain',
        realSubject: 'whether he will join us',
        core: "同样，`It` 代替了后面的 `whether` 从句作形式主语，使句子结构更平衡。"
    },
];

const AnimatedExampleItem = styled(ExampleItem)`
    animation: ${popIn} 0.4s ease-out;
`;

const FormulaContainer = styled.div`
    text-align: center;
    font-size: 1.2em;
    font-weight: 500;
    color: #2d3748;
    background: #f8f9fa;
    padding: 20px;
    border-radius: 15px;
`;

const ClausePart = styled.span`
    background-color: #e2e8f0;
    color: #4a5568;
    padding: 5px 10px;
    border-radius: 8px;
`;

const MainClausePart = styled.span<{ themeColor: string }>`
    background-color: rgba(${props => props.themeColor.substring(1).match(/.{1,2}/g)?.map(v => parseInt(v, 16)).join(',')}, 0.1);
    color: ${props => props.themeColor};
    padding: 5px 10px;
    border-radius: 8px;
    border: 1px solid ${props => props.themeColor};
`;


export const SubjectClausesContent: React.FC<SubjectClausesContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [activeExampleIndex, setActiveExampleIndex] = useState(0);

    useEffect(() => {
        const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
        if ('speechSynthesis' in window) {
            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
        return () => {
            if ('speechSynthesis' in window) window.speechSynthesis.onvoiceschanged = null;
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

            <LessonTitle>👑 主语从句 Subject Clauses</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>主语从句能让一个完整的“想法”或“事情”来做句子的主角！它能让你的表达更书面、更高级，用来强调某个观点或事实非常有效。</p>
            </WhyLearnSection>

            <FormulaSection themeColor={themeColor}>
                <FormulaTitle themeColor={themeColor}>主语从句结构</FormulaTitle>
                <FormulaContainer>
                    <ClausePart>引导词 + 从句</ClausePart>
                    &nbsp;+&nbsp;
                    <MainClausePart themeColor={themeColor}>谓语 + 其他</MainClausePart>
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
                            {activeExample.subjectClause && <BreakdownPart><strong>- 主语从句:</strong> {activeExample.subjectClause}</BreakdownPart>}
                            {activeExample.formalSubject && <BreakdownPart><strong>- 形式主语:</strong> {activeExample.formalSubject}</BreakdownPart>}
                            {activeExample.mainVerb && <BreakdownPart><strong>- 主句谓语:</strong> {activeExample.mainVerb}</BreakdownPart>}
                            {activeExample.mainComplement && <BreakdownPart><strong>- 主句表语:</strong> {activeExample.mainComplement}</BreakdownPart>}
                            {activeExample.realSubject && <BreakdownPart><strong>- 真正的主语:</strong> {activeExample.realSubject}</BreakdownPart>}
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
                title="🎯 练习：构建主语从句"
                subtitle="用下面的词块组成句子"
                completionTitle="🎉 Fantastic!"
                completionMessage="你已经掌握了所有从句类型！"
                nextButtonText="完成学习，返回列表"
            />

        </LessonContainer>
    );
};