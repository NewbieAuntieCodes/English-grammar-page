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

interface BalanceAndContentProps {
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
    { words: [{ en: 'You must', cn: '你必须' }, { en: 'balance', cn: '平衡' }, { en: 'your work', cn: '你的工作' }, { en: 'and', cn: '和' }, { en: 'your health', cn: '你的健康' }], correct: ['You must', 'balance', 'your work', 'and', 'your health'], chinese: '你必须平衡你的工作和健康。' },
    { words: [{ en: 'It is important', cn: '很重要' }, { en: 'to find a balance', cn: '找到一个平衡' }, { en: 'between', cn: '在...之间' }, { en: 'fun', cn: '娱乐' }, { en: 'and', cn: '和' }, { en: 'studies', cn: '学习' }], correct: ['It is important', 'to find a balance', 'between', 'fun', 'and', 'studies'], chinese: '在娱乐和学习之间找到平衡很重要。' },
    { words: [{ en: 'The government', cn: '政府' }, { en: 'tries to balance', cn: '试图平衡' }, { en: 'the economy', cn: '经济' }, { en: 'and', cn: '和' }, { en: 'the environment', cn: '环境' }], correct: ['The government', 'tries to balance', 'the economy', 'and', 'the environment'], chinese: '政府试图平衡经济与环境。' },
    { words: [{ en: 'A good relationship', cn: '一段好的关系' }, { en: 'has a balance', cn: '有一个平衡' }, { en: 'between', cn: '在...之间' }, { en: 'giving', cn: '付出' }, { en: 'and', cn: '和' }, { en: 'taking', cn: '索取' }], correct: ['A good relationship', 'has a balance', 'between', 'giving', 'and', 'taking'], chinese: '一段好的关系在付出与索取之间有一个平衡。' },
    { words: [{ en: 'How do you', cn: '你如何' }, { en: 'balance', cn: '平衡' }, { en: 'a career', cn: '事业' }, { en: 'and', cn: '和' }, { en: 'a family', cn: '家庭' }], correct: ['How do you', 'balance', 'a career', 'and', 'a family'], chinese: '你如何平衡事业和家庭？' },
    { words: [{ en: 'There is a fine', cn: '有一个微妙的' }, { en: 'balance between', cn: '...之间的平衡' }, { en: 'being confident', cn: '自信' }, { en: 'and', cn: '和' }, { en: 'being arrogant', cn: '自大' }], correct: ['There is a fine', 'balance between', 'being confident', 'and', 'being arrogant'], chinese: '自信和自大之间有一个微妙的平衡。' }
];

export const BalanceAndContent: React.FC<BalanceAndContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>📖 'balance ... and ...' 的用法</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>这个句式用来表达在两个事物之间取得“平衡”或“权衡”。它在讨论生活、工作、健康等方面时非常常用，能让你的表达听起来更成熟、更有思想。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要结构</SectionTitle>
                <UsageType>1. 动词用法: balance [A] and [B]</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    直接用动词 `balance` 来连接两个需要权衡的名词或动名词短语。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>You need to <strong>balance</strong> your work <strong>and</strong> your personal life.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('You need to balance your work and your personal life.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>你需要平衡你的工作和个人生活。</ExampleChinese>
                </ExampleItem>

                <UsageType>2. 名词用法: a balance between [A] and [B]</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    使用名词 `balance`，后面通常跟介词 `between` 来连接两个事物。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>It's important to find a good <strong>balance between</strong> work <strong>and</strong> leisure.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('It\'s important to find a good balance between work and leisure.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>在工作和休闲之间找到一个好的平衡很重要。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习: 平衡...和..."
                subtitle="用下面的词组成句子"
                completionTitle="🎉 Well balanced!"
                completionMessage="你已经掌握了 'balance...and...' 的用法！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};