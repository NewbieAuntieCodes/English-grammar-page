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

// FIX: Added type for themeColor prop to fix TypeScript errors.
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
    const [activeExample, setActiveExample] = useState<string | null>(null);
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

    const handleToggleBreakdown = (exampleId: string) => {
        setActiveExample(prev => (prev === exampleId ? null : exampleId));
    };

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
                <SectionTitle>🚀 从句：英语“升级”的秘密武器！</SectionTitle>
                <p>想让你的英语听起来更地道、更有水平吗？从句就是你的秘密武器！它能帮你把两个简单的想法，合并成一个更酷、更丰富的句子。</p>
            </WhyLearnSection>

            <DefinitionSection themeColor={themeColor}>
                <SectionTitle>🤔 一个简单的比喻</SectionTitle>
                <p className="analogy-title">
                    从句就像是 “<strong>句子套娃</strong>”：
                </p>
                <p>
                    简单说，就是 <strong>“一句话”里面，又藏着另一句“小话”</strong>。这句“小话”自己也是完整的 (有主角和动作)，我们用它来给“大话”增加更多的信息！
                </p>
            </DefinitionSection>

            <FormulaSection themeColor={themeColor}>
                <FormulaTitle themeColor={themeColor}>从句的基本构成</FormulaTitle>
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
                            <SVOPartOfSpeechTextEng style={{marginTop: '8px'}}>连接主句和从句</SVOPartOfSpeechTextEng>
                        </SVOPartOfSpeechInfo>
                    </SVOFormulaPart>
                    <PlusSign themeColor={themeColor}>+</PlusSign>
                    <SVOFormulaPart themeColor={themeColor}>
                        <SVOPartEnglish>Clause</SVOPartEnglish>
                        <SVOPartChinese>一个完整的句子</SVOPartChinese>
                        <SVOPartDivider />
                        <SVOPartOfSpeechInfo>
                            <ClauseStructureDetail>- 主语 + 谓语... (S+V...)</ClauseStructureDetail>
                            <ClauseStructureDetail>- 主语 + 系动词 + 表语 (S+V+C)</ClauseStructureDetail>
                        </SVOPartOfSpeechInfo>
                    </SVOFormulaPart>
                </FormulaParts>
            </FormulaSection>

            <ClauseFunctionSection>
                <SectionTitle>“小话”的作用：它是什么从句？</SectionTitle>
                <FunctionGrid>
                    <FunctionCard>
                        <FunctionTitle>宾语从句</FunctionTitle>
                        <FunctionExplanation themeColor={themeColor}>当“小话”是动词的<strong>宾语</strong>时 (回答“...什么?”)</FunctionExplanation>
                    </FunctionCard>
                    <FunctionCard>
                        <FunctionTitle>主语从句</FunctionTitle>
                        <FunctionExplanation themeColor={themeColor}>当“小话”是整个句子的<strong>主语</strong>时</FunctionExplanation>
                    </FunctionCard>
                    <FunctionCard>
                        <FunctionTitle>定语从句</FunctionTitle>
                        <FunctionExplanation themeColor={themeColor}>当“小话”是<strong>定语</strong>，像形容词一样修饰名词时</FunctionExplanation>
                    </FunctionCard>
                    <FunctionCard>
                        <FunctionTitle>状语从句</FunctionTitle>
                        <FunctionExplanation themeColor={themeColor}>当“小话”是<strong>状语</strong>，像副词一样描述动作时</FunctionExplanation>
                    </FunctionCard>
                </FunctionGrid>
            </ClauseFunctionSection>


            <ExamplesSection>
                <SectionTitle>📝 例子 (点击拆解“句子套娃”)</SectionTitle>
                <ExampleItem onClick={() => handleToggleBreakdown('ex1')} themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I know that you are right.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I know that you are right.'); }} aria-label="Speak sentence">🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我知道你是对的。</ExampleChinese>
                    <ExampleBreakdown show={activeExample === 'ex1'} themeColor={themeColor}>
                        <BreakdownPart><strong>“大”句子是:</strong> I know ... (我知道...)</BreakdownPart>
                        <BreakdownPart><strong>藏着的“小”句子是:</strong> ... that you are right. (...你是对的。)</BreakdownPart>
                        <BreakdownPart><strong>分析:</strong> 我知道 “<strong>什么</strong>” 呢？ ⟶ 我知道了 “<strong>你是对的</strong>” 这件事。这句“小话”完整地解释了 “know” 的内容。</BreakdownPart>
                    </ExampleBreakdown>
                </ExampleItem>

                <ExampleItem onClick={() => handleToggleBreakdown('ex2')} themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The man who is standing there is my teacher.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The man who is standing there is my teacher.'); }} aria-label="Speak sentence">🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>站在那里的那个男人是我的老师。</ExampleChinese>
                    <ExampleBreakdown show={activeExample === 'ex2'} themeColor={themeColor}>
                        <BreakdownPart><strong>“大”句子是:</strong> The man ... is my teacher. (那个男人...是我的老师。)</BreakdownPart>
                        <BreakdownPart><strong>藏着的“小”句子是:</strong> ... who is standing there. (...他正站在那里。)</BreakdownPart>
                        <BreakdownPart><strong>分析:</strong> “<strong>什么样的</strong>” 男人是我的老师？ ⟶ 是 “<strong>正站在那里的</strong>” 那个。这句“小话”像一个形容词，详细描述了 “The man” 的样子。</BreakdownPart>
                    </ExampleBreakdown>
                </ExampleItem>
            </ExamplesSection>
            
            <RuleSection themeColor={themeColor}>
                <RuleTitle>💡 从句黄金法则：永远使用陈述句语序</RuleTitle>
                <p>
                    这是学习从句最重要的规则！无论主句是问句还是陈述句，<strong>从句内部永远要用陈述句的语序 (主语 + 动词...)</strong>，绝对不能用疑问句的语序 (动词提前)。
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