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
    ExampleBreakdown,
    BreakdownPart,
    FormulaSection,
    FormulaTitle,
    FormulaParts,
    PlusSign,
    SVOFormulaPart,
    SVOPartEnglish,
    SVOPartChinese,
    SVOPartDivider,
    SVOPartOfSpeechInfo,
    SVOPartOfSpeechText,
    SVOPartOfSpeechTextEng,
} from '../Structures/SVOContent.styles';
import styled from 'styled-components';

interface WhatIsAClauseContentProps {
    onBack: () => void;
    themeColor: string;
    onComplete: () => void;
}

const DefinitionSection = styled(WhyLearnSection)`
    p {
        font-size: 1.1em;
        line-height: 1.7;
    }
    strong {
        color: ${props => props.themeColor};
        font-weight: bold;
    }
    .analogy-title {
        font-size: 1.2em;
        font-weight: bold;
        color: #2d3748;
    }
`;

const ClauseFunctionSection = styled.div`
    margin: 40px 0;
`;

const FunctionGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin-top: 15px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const FunctionCard = styled.div`
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
`;

const FunctionTitle = styled.h4`
    font-size: 1.2em;
    font-weight: bold;
    color: #2d3748;
    margin-bottom: 10px;
`;

const FunctionExplanation = styled.p<{ themeColor: string }>`
    font-size: 1em;
    color: #4a5568;
    line-height: 1.5;

    strong {
        color: ${props => props.themeColor};
        font-weight: bold;
    }
`;


const NextButton = styled.button<{ themeColor: string }>`
    background: ${props => props.themeColor};
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
    font-size: 1.1em;
    display: block;
    margin: 40px auto 10px;

    &:hover {
        transform: scale(1.05) translateY(-2px);
    }
`;

const ClauseStructureDetail = styled.div`
    text-align: left;
    width: 100%;
    font-size: 1em;
    color: #4a5568;
    line-height: 1.5;
    padding: 0 5px;

    &:not(:last-child) {
        margin-bottom: 5px;
    }
`;

const ClausePatternCard = styled.div<{ themeColor: string }>`
    background: white;
    border-radius: 14px;
    padding: 20px;
    margin: 0 auto 24px;
    max-width: 760px;
    border-top: 4px solid ${props => props.themeColor};
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    text-align: center;
`;

const PatternLabel = styled.div<{ themeColor: string }>`
    color: ${props => props.themeColor};
    font-weight: bold;
    font-size: 1.05em;
    margin-bottom: 12px;
`;

const PatternFormula = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    color: #2d3748;
    font-size: 1.15em;
    font-weight: bold;
    line-height: 1.6;
`;

const PatternPart = styled.span`
    background: #f7fafc;
    border: 1px solid #edf2f7;
    border-radius: 8px;
    padding: 5px 10px;
`;

const PatternPlus = styled.span<{ themeColor: string }>`
    color: ${props => props.themeColor};
`;

const PatternExample = styled.div`
    color: #4a5568;
    margin-top: 14px;
    line-height: 1.7;

    code {
        background: #f7fafc;
        border: 1px solid #edf2f7;
        border-radius: 6px;
        color: #2d3748;
        padding: 2px 6px;
        white-space: nowrap;
    }
`;

const PatternNote = styled.div`
    color: #718096;
    font-size: 0.95em;
    margin-top: 8px;
    line-height: 1.5;
`;

const RuleSection = styled(WhyLearnSection)`
    background: linear-gradient(135deg, rgba(254, 249, 195, 0.8), rgba(253, 230, 138, 0.2));
    border-left-color: #FBBF24; // yellow color for tips
    p, h4 {
        color: #92400E;
    }
`;

const RuleTitle = styled(SectionTitle)`
    font-size: 1.4em;
    color: #92400E; // dark brown
`;

const ExampleComparison = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-top: 20px;
    
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const ExampleBox = styled.div<{ isCorrect: boolean }>`
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    border: 1px solid ${props => (props.isCorrect ? '#D1FAE5' : '#FEE2E2')};
    border-left: 5px solid ${props => (props.isCorrect ? '#10B981' : '#EF4444')};
`;

const ExampleLabel = styled.div<{ isCorrect: boolean }>`
    font-size: 1.1em;
    font-weight: bold;
    color: ${props => (props.isCorrect ? '#065F46' : '#991B1B')};
    margin-bottom: 10px;
`;

const ExampleSentence = styled.div`
    font-size: 1.1em;
    color: #2d3748;
    margin-bottom: 15px;
    line-height: 1.6;
    
    .clause-part {
        font-weight: bold;
        text-decoration: underline;
        text-decoration-color: #fdba74;
        text-decoration-thickness: 2px;
    }
`;

const ExampleAnalysis = styled.div`
    font-size: 0.9em;
    color: #4a5568;
    line-height: 1.5;

    code {
        background: #f1f3f4;
        padding: 2px 5px;
        border-radius: 4px;
        color: #c53030;
    }
`;


export const WhatIsAClauseContent: React.FC<WhatIsAClauseContentProps> = ({ onBack, themeColor, onComplete }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        const loadVoices = () => {
            setVoices(window.speechSynthesis.getVoices());
        };

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
        } else {
            alert("Sorry, your browser doesn't support text-to-speech.");
        }
    };

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Clause List</BackButton>
            <LessonTitle>📖 什么是从句？ What is a Clause?</LessonTitle>
            
            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>从句是什么？</SectionTitle>
                <p>从句是依附在主句里的句子成分。它通常有自己的主语和谓语，用来补充说明主句里的某个部分。</p>
            </WhyLearnSection>

            <DefinitionSection themeColor={themeColor}>
                <SectionTitle>先看一个简单例子</SectionTitle>
                <p>
                    比如 <strong>I know that you are right.</strong> 里面，主句是 <strong>I know</strong>，从句是 <strong>that you are right</strong>。这个从句有自己的主语 <strong>you</strong> 和谓语 <strong>are</strong>。
                </p>
            </DefinitionSection>

            <FormulaSection themeColor={themeColor}>
                <FormulaTitle themeColor={themeColor}>从句的基本构成</FormulaTitle>
                <ClausePatternCard themeColor={themeColor}>
                    <PatternLabel themeColor={themeColor}>从句一般先由一个引导词开头，后面接一个“小句子”</PatternLabel>
                    <PatternFormula>
                        <PatternPart>引导词</PatternPart>
                        <PatternPlus themeColor={themeColor}>+</PatternPlus>
                        <PatternPart>主语</PatternPart>
                        <PatternPlus themeColor={themeColor}>+</PatternPlus>
                        <PatternPart>谓语 / 系表</PatternPart>
                        <PatternPlus themeColor={themeColor}>+</PatternPlus>
                        <PatternPart>其他信息</PatternPart>
                    </PatternFormula>
                    <PatternExample>
                        例如 <code>that you are right</code> / <code>when the class starts</code> / <code>because he was tired</code>
                    </PatternExample>
                    <PatternNote>
                        重点：引导词负责把从句接到主句里；后面的从句主体通常要用普通陈述句语序。
                    </PatternNote>
                </ClausePatternCard>
                <FormulaParts>
                    <SVOFormulaPart themeColor={themeColor}>
                        <SVOPartEnglish>Connector</SVOPartEnglish>
                        <SVOPartChinese>引导词</SVOPartChinese>
                        <SVOPartDivider />
                        <SVOPartOfSpeechInfo>
                            <SVOPartOfSpeechText style={{fontSize: '1em', lineHeight: '1.6'}}>
                                that, who, which
                                <br/>
                                what, when, where, why, how
                                <br/>
                                if, whether
                                <br/>
                                because, so...
                            </SVOPartOfSpeechText>
                            <SVOPartOfSpeechTextEng style={{marginTop: '8px'}}>放在从句前面，把它接到主句里</SVOPartOfSpeechTextEng>
                        </SVOPartOfSpeechInfo>
                    </SVOFormulaPart>
                    <PlusSign themeColor={themeColor}>+</PlusSign>
                    <SVOFormulaPart themeColor={themeColor}>
                        <SVOPartEnglish>Clause</SVOPartEnglish>
                        <SVOPartChinese>从句主体</SVOPartChinese>
                        <SVOPartDivider />
                        <SVOPartOfSpeechInfo>
                            <ClauseStructureDetail>- 主语 + 谓语... (S+V...)</ClauseStructureDetail>
                            <ClauseStructureDetail>- 主语 + 系动词 + 表语 (S+V+C)</ClauseStructureDetail>
                        </SVOPartOfSpeechInfo>
                    </SVOFormulaPart>
                </FormulaParts>
            </FormulaSection>

            <ClauseFunctionSection>
                <SectionTitle>从句在句子里做什么？</SectionTitle>
                <FunctionGrid>
                    <FunctionCard>
                        <FunctionTitle>宾语从句</FunctionTitle>
                        <FunctionExplanation themeColor={themeColor}>当从句放在动词后面，回答“知道什么 / 说什么 / 相信什么”</FunctionExplanation>
                    </FunctionCard>
                    <FunctionCard>
                        <FunctionTitle>主语从句</FunctionTitle>
                        <FunctionExplanation themeColor={themeColor}>当从句放在主语位置，表示一件事</FunctionExplanation>
                    </FunctionCard>
                    <FunctionCard>
                        <FunctionTitle>定语从句</FunctionTitle>
                        <FunctionExplanation themeColor={themeColor}>当从句跟在名词后面，修饰这个名词</FunctionExplanation>
                    </FunctionCard>
                    <FunctionCard>
                        <FunctionTitle>状语从句</FunctionTitle>
                        <FunctionExplanation themeColor={themeColor}>当从句说明时间、原因、条件等背景信息</FunctionExplanation>
                    </FunctionCard>
                </FunctionGrid>
            </ClauseFunctionSection>


            <ExamplesSection>
                <SectionTitle>📝 例子</SectionTitle>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I know that you are right.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I know that you are right.'); }} aria-label="Speak sentence">🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我知道你是对的。</ExampleChinese>
                    <ExampleBreakdown show={true} themeColor={themeColor}>
                        <BreakdownPart><strong>主句 / 主干句子:</strong> I know ... (我知道...)</BreakdownPart>
                        <BreakdownPart><strong>从句:</strong> ... that you are right. (...你是对的。)</BreakdownPart>
                        <BreakdownPart><strong>分析:</strong> 我知道 “<strong>什么</strong>” 呢？ ⟶ 我知道了 “<strong>你是对的</strong>” 这件事。这个从句完整地解释了 “know” 的内容。</BreakdownPart>
                    </ExampleBreakdown>
                </ExampleItem>

                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I like the cake which she made.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I like the cake which she made.'); }} aria-label="Speak sentence">🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我喜欢她做的那个蛋糕。</ExampleChinese>
                    <ExampleBreakdown show={true} themeColor={themeColor}>
                        <BreakdownPart><strong>主句 / 主干句子:</strong> I like the cake. (我喜欢那个蛋糕。)</BreakdownPart>
                        <BreakdownPart><strong>从句:</strong> ... which she made. (...是她做的。)</BreakdownPart>
                        <BreakdownPart><strong>分析:</strong> “<strong>什么样的</strong>” 蛋糕我喜欢？ ⟶ 是 “<strong>她做的</strong>” 那个。这个从句像一个形容词，详细描述了 “the cake”。</BreakdownPart>
                    </ExampleBreakdown>
                </ExampleItem>
            </ExamplesSection>
            
            <RuleSection themeColor={themeColor}>
                <RuleTitle>💡 重点规则：问题变成从句时，语序要变</RuleTitle>
                <p>
                    当一个问题不再独立提问，而是变成从句放进主句里时，通常不再使用疑问句语序，而要改成普通句子的语序。
                </p>
                <ExampleComparison>
                    <ExampleBox isCorrect={false}>
                        <ExampleLabel isCorrect={false}>❌ 错误 (疑问语序)</ExampleLabel>
                        <ExampleSentence>
                            Do you know <span className="clause-part">where is the station?</span>
                        </ExampleSentence>
                        <ExampleAnalysis>
                            分析：从句 <code>where is the station?</code> 采用了疑问句的语序 (系动词 `is` 在主语 `the station` 前面)，这是错误的。
                        </ExampleAnalysis>
                    </ExampleBox>
                    <ExampleBox isCorrect={true}>
                        <ExampleLabel isCorrect={true}>✅ 正确 (陈述语序)</ExampleLabel>
                        <ExampleSentence>
                            Do you know <span className="clause-part">where the station is?</span>
                        </ExampleSentence>
                        <ExampleAnalysis>
                            分析：从句 <code>where the station is</code> 采用了陈述句的语序 (主语 `the station` 在系动词 `is` 前面)，这是正确的。
                        </ExampleAnalysis>
                    </ExampleBox>
                    <ExampleBox isCorrect={false}>
                        <ExampleLabel isCorrect={false}>❌ 错误 (疑问语序)</ExampleLabel>
                        <ExampleSentence>
                            I want to know <span className="clause-part">what is his name.</span>
                        </ExampleSentence>
                        <ExampleAnalysis>
                            分析：从句 <code>what is his name</code> 采用了疑问句的语序 (系动词 `is` 在主语 `his name` 前面)。
                        </ExampleAnalysis>
                    </ExampleBox>
                    <ExampleBox isCorrect={true}>
                        <ExampleLabel isCorrect={true}>✅ 正确 (陈述语序)</ExampleLabel>
                        <ExampleSentence>
                            I want to know <span className="clause-part">what his name is.</span>
                        </ExampleSentence>
                        <ExampleAnalysis>
                            分析：从句 <code>what his name is</code> 采用了陈述句的语序 (主语 `his name` 在系动词 `is` 前面)。
                        </ExampleAnalysis>
                    </ExampleBox>
                </ExampleComparison>
            </RuleSection>

            <NextButton onClick={onComplete} themeColor={themeColor}>
                我明白了！开始学习第一种从句 →
            </NextButton>
        </LessonContainer>
    );
};
