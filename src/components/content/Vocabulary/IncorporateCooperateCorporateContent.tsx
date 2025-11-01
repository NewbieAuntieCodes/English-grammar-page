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
import { FillInTheBlankPractice } from '../../practice/FillInTheBlankPractice';
import styled from 'styled-components';

interface IncorporateCooperateCorporateContentProps {
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
    { sentenceParts: ["To succeed, all team members must ", " with each other."] as const, choices: [{text: "cooperate", isCorrect: true}, {text: "incorporate", isCorrect: false}, {text: "corporate", isCorrect: false}], chineseHint: "为了成功，所有团队成员必须互相合作。" },
    { sentenceParts: ["The company has a strong ", " culture."] as const, choices: [{text: "corporate", isCorrect: true}, {text: "cooperate", isCorrect: false}, {text: "incorporate", isCorrect: false}], chineseHint: "这家公司有很强的企业文化。" },
    { sentenceParts: ["We need to ", " new safety features into the product."] as const, choices: [{text: "incorporate", isCorrect: true}, {text: "cooperate", isCorrect: false}, {text: "corporate", isCorrect: false}], chineseHint: "我们需要将新的安全功能整合到产品中。" },
    { sentenceParts: ["The two departments will ", " to launch the new campaign."] as const, choices: [{text: "cooperate", isCorrect: true}, {text: "incorporate", isCorrect: false}, {text: "corporate", isCorrect: false}], chineseHint: "这两个部门将合作发起新的宣传活动。" },
    { sentenceParts: ["He left his job due to the high-pressure ", " environment."] as const, choices: [{text: "corporate", isCorrect: true}, {text: "cooperate", isCorrect: false}, {text: "incorporate", isCorrect: false}], chineseHint: "由于高压的公司环境，他辞职了。" },
    { sentenceParts: ["The architect plans to ", " a garden into the building's design."] as const, choices: [{text: "incorporate", isCorrect: true}, {text: "cooperate", isCorrect: false}, {text: "corporate", isCorrect: false}], chineseHint: "建筑师计划在建筑设计中融入一个花园。" },
    { sentenceParts: ["The police asked the public to ", " with their investigation."] as const, choices: [{text: "cooperate", isCorrect: true}, {text: "incorporate", isCorrect: false}, {text: "corporate", isCorrect: false}], chineseHint: "警方请求公众配合他们的调查。" },
    { sentenceParts: ["She is a lawyer specializing in ", " law."] as const, choices: [{text: "corporate", isCorrect: true}, {text: "cooperate", isCorrect: false}, {text: "incorporate", isCorrect: false}], chineseHint: "她是一位专攻公司法的律师。" }
];

export const IncorporateCooperateCorporateContent: React.FC<IncorporateCooperateCorporateContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>📖 Incorporate / Cooperate / Corporate</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>这三个词长得很像，但意思和用法完全不同。"Incorporate" 表示包含，"Cooperate" 表示合作，而 "Corporate" 是形容词，表示“公司的”。分清它们对于商务和学术英语尤为重要。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. Incorporate (动词 - Verb)</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    意思是“包含；合并；纳入”。表示将某物作为一部分包含到更大的整体中。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>We will <strong>incorporate</strong> your feedback into the report.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("We will incorporate your feedback into the report."); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我们会将您的反馈纳入报告中。</ExampleChinese>
                </ExampleItem>
                
                <UsageType>2. Cooperate (动词 - Verb)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    意思是“合作；协作”。表示为了共同的目标而一起工作。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The two companies agreed to <strong>cooperate</strong> on the project.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The two companies agreed to cooperate on the project.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这两家公司同意在该项目上进行合作。</ExampleChinese>
                </ExampleItem>

                <UsageType>3. Corporate (形容词 - Adjective)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    意思是“公司的；法人的；团体的”。用来修饰与大公司或团体相关的事物。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>He is climbing the <strong>corporate</strong> ladder.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He is climbing the corporate ladder.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他正在攀登公司的晋升阶梯。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <FillInTheBlankPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习: 选择正确的词"
                subtitle="选择正确的单词填入句子"
                completionTitle="🎉 Excellent!"
                completionMessage="你已经掌握了这组易混淆词！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};