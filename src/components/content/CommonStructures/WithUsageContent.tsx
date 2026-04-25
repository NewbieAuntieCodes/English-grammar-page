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

interface WithUsageContentProps {
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
    { words: [{ en: 'It is a house', cn: '这是一个房子' }, { en: 'with', cn: '带有' }, { en: 'a big garden', cn: '一个大花园' }], correct: ['It is a house', 'with', 'a big garden'], chinese: '这是一个带有大花园的房子。' },
    { words: [{ en: 'I drink coffee', cn: '我喝咖啡' }, { en: 'with', cn: '加' }, { en: 'milk and sugar', cn: '牛奶和糖' }], correct: ['I drink coffee', 'with', 'milk and sugar'], chinese: '我喝咖啡加牛奶和糖。' },
    { words: [{ en: 'He opened', cn: '他打开' }, { en: 'the door', cn: '门' }, { en: 'with a key', cn: '用一把钥匙' }], correct: ['He opened', 'the door', 'with a key'], chinese: '他用钥匙打开了门。' },
    { words: [{ en: 'She looked at me', cn: '她看着我' }, { en: 'with surprise', cn: '带着惊讶' }], correct: ['She looked at me', 'with surprise'], chinese: '她惊讶地看着我。' },
    { words: [{ en: 'The man', cn: '那个男人' }, { en: 'with a beard', cn: '有胡子的' }, { en: 'is my uncle', cn: '是我的叔叔' }], correct: ['The man', 'with a beard', 'is my uncle'], chinese: '那个有胡子的男人是我的叔叔。' },
    { words: [{ en: 'He went on a trip', cn: '他去旅行' }, { en: 'with his family', cn: '和他的家人' }], correct: ['He went on a trip', 'with his family'], chinese: '他和家人一起去旅行了。' },
    { words: [{ en: 'She filled', cn: '她装满' }, { en: 'the bottle', cn: '瓶子' }, { en: 'with water', cn: '用水' }], correct: ['She filled', 'the bottle', 'with water'], chinese: '她用水装满了瓶子。' },
    { words: [{ en: 'He spoke', cn: '他说话' }, { en: 'with confidence', cn: '带着自信' }], correct: ['He spoke', 'with confidence'], chinese: '他自信地说话。' },
];

export const WithUsageContent: React.FC<WithUsageContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>🤝 介词 'with' 的用法</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"with" 是一个非常灵活和常用的介词。它可以表示“和...一起”（伴随）、“带有”（拥有）、“用...”（工具）或描述动作的方式。掌握它能让你的句子内容更丰富！</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. 表示伴随 (Accompaniment)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I go to school <strong>with my friends</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I go to school with my friends.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我和我的朋友们一起去上学。</ExampleChinese>
                </ExampleItem>

                <UsageType>2. 表示拥有 (Possession)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>She is a girl <strong>with long hair</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('She is a girl with long hair.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>她是一个长头发的女孩。</ExampleChinese>
                </ExampleItem>

                <UsageType>3. 表示工具 (Instrument)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>He writes <strong>with a pen</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He writes with a pen.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他用钢笔写字。</ExampleChinese>
                </ExampleItem>

                <UsageType>4. 表示方式 (Manner)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>She sang <strong>with a smile</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('She sang with a smile.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>她微笑着唱歌。</ExampleChinese>
                </ExampleItem>

            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：使用 'with' 构建句子"
                subtitle="用下面的词组成句子"
                completionTitle="🎉 Perfect!"
                completionMessage="你已经掌握了 'with' 的用法！"
                nextButtonText="学习不定式的用法 →"
            />
        </LessonContainer>
    );
};