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

interface AsAsUsageContentProps {
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
    { words: [{ en: 'He is', cn: '他' }, { en: 'as tall as', cn: '和...一样高' }, { en: 'his brother', cn: '他的哥哥' }], correct: ['He is', 'as tall as', 'his brother'], chinese: '他和他的哥哥一样高。' },
    { words: [{ en: 'This book is', cn: '这本书' }, { en: 'not as interesting as', cn: '不如...有趣' }, { en: 'that one', cn: '那本' }], correct: ['This book is', 'not as interesting as', 'that one'], chinese: '这本书不如那本有趣。' },
    { words: [{ en: 'She sings', cn: '她唱歌' }, { en: 'as beautifully as', cn: '和...一样好听' }, { en: 'a bird', cn: '一只鸟' }], correct: ['She sings', 'as beautifully as', 'a bird'], chinese: '她唱歌像鸟儿一样动听。' },
    { words: [{ en: 'I can run', cn: '我能跑' }, { en: 'as fast as', cn: '和...一样快' }, { en: 'you', cn: '你' }], correct: ['I can run', 'as fast as', 'you'], chinese: '我能跑得和你一样快。' },
    { words: [{ en: 'He is not', cn: '他没有' }, { en: 'so strong as', cn: '...那么强壮' }, { en: 'his father', cn: '他的父亲' }], correct: ['He is not', 'so strong as', 'his father'], chinese: '他不如他父亲强壮。' },
    { words: [{ en: 'My car is', cn: '我的车' }, { en: 'as expensive as', cn: '和...一样贵' }, { en: 'yours', cn: '你的' }], correct: ['My car is', 'as expensive as', 'yours'], chinese: '我的车和你的一样贵。' },
    { words: [{ en: 'She doesn\'t speak', cn: '她说...不如' }, { en: 'English', cn: '英语' }, { en: 'as fluently as', cn: '...流利' }, { en: 'her sister', cn: '她姐姐' }], correct: ['She doesn\'t speak', 'English', 'as fluently as', 'her sister'], chinese: '她说英语不如她姐姐流利。' },
    { words: [{ en: 'The weather today is', cn: '今天的天气' }, { en: 'as good as', cn: '和...一样好' }, { en: 'yesterday', cn: '昨天' }], correct: ['The weather today is', 'as good as', 'yesterday'], chinese: '今天的天气和昨天一样好。' },
];

export const AsAsUsageContent: React.FC<AsAsUsageContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>⚖️ 同级比较 'as...as' 的用法</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>
                    "as...as" 结构是英语中最基本的比较句型之一，用来表示两个人或事物的某个方面【程度相同】。它的否定形式 "not as/so...as" 则用来表示【程度不及】。这是表达“和...一样...”或“不如...”的核心句式。
                </p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. 肯定句：as + 形容词/副词 + as</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>She is <strong>as tall as</strong> her brother.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('She is as tall as her brother.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>她和她哥哥一样高。(形容词)</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>He can run <strong>as fast as</strong> me.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He can run as fast as me.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他能跑得和我一样快。(副词)</ExampleChinese>
                </ExampleItem>
                
                <UsageType>2. 否定句：not as/so + 形容词/副词 + as</UsageType>
                 <p style={{ color: '#4a5568', margin: '0 0 15px 5px', lineHeight: '1.6' }}>
                    在否定句中，第一个 as 可以用 so 替换，意思不变。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>He is <strong>not as tall as</strong> his father.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He is not as tall as his father.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他不如他父亲高。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>This movie is <strong>not so interesting as</strong> the book.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('This movie is not so interesting as the book.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这部电影不如书有趣。</ExampleChinese>
                </ExampleItem>

                <UsageType>3. 涉及名词的比较</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I have <strong>as many books as</strong> you.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I have as many books as you.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我的书和你一样多。(as many/much ... as)</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：使用 'as...as' 构建句子"
                subtitle="用下面的词组成比较句"
                completionTitle="🎉 Awesome!"
                completionMessage="你已经掌握了 'as...as' 的用法！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};