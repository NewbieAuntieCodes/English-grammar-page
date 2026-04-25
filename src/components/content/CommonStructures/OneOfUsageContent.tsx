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

interface OneOfUsageContentProps {
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
    { words: [{ en: 'He is', cn: '他是' }, { en: 'one of', cn: '...之一' }, { en: 'my best friends', cn: '我最好的朋友' }], correct: ['He is', 'one of', 'my best friends'], chinese: '他是我最好的朋友之一。' },
    { words: [{ en: 'One of the books', cn: '其中一本书' }, { en: 'is', cn: '是' }, { en: 'missing', cn: '不见了' }], correct: ['One of the books', 'is', 'missing'], chinese: '其中一本书不见了。' },
    { words: [{ en: 'This is', cn: '这是' }, { en: 'one of the', cn: '...之一' }, { en: 'most famous paintings', cn: '最著名的画作' }], correct: ['This is', 'one of the', 'most famous paintings'], chinese: '这是最著名的画作之一。' },
    { words: [{ en: 'She is', cn: '她是' }, { en: 'one of the', cn: '...之一' }, { en: 'tallest girls', cn: '最高的女孩' }, { en: 'in our class', cn: '在我们班' }], correct: ['She is', 'one of the', 'tallest girls', 'in our class'], chinese: '她是我们班最高的女孩之一。' },
    { words: [{ en: 'I would like to try', cn: '我想尝尝' }, { en: 'one of these cakes', cn: '这些蛋糕中的一个' }], correct: ['I would like to try', 'one of these cakes'], chinese: '我想尝尝这些蛋糕中的一个。' },
    { words: [{ en: 'He is considered', cn: '他被认为是' }, { en: 'one of the greatest', cn: '最伟大的...之一' }, { en: 'writers', cn: '作家' }], correct: ['He is considered', 'one of the greatest', 'writers'], chinese: '他被认为是当代最伟大的作家之一。' },
    { words: [{ en: 'Each one of the students', cn: '每个学生' }, { en: 'has', cn: '有' }, { en: 'a different opinion', cn: '不同的意见' }], correct: ['Each one of the students', 'has', 'a different opinion'], chinese: '每个学生都有不同的看法。' },
];

export const OneOfUsageContent: React.FC<OneOfUsageContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>📖 'one of' 的用法</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"one of" 是一个非常高频的短语，用于从一个群体中挑出其中一个。它有一个核心语法规则：<strong>"one of" 后面必须跟【复数名词】</strong>，但整个短语作主语时，谓语动词通常用【单数】形式。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. 基本结构: one of + (the/my/these...) + 复数名词</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    这个结构表示“...中的一个”。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>One of my friends</strong> is a doctor.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('One of my friends is a doctor.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我的朋友中有一位是医生。(主语是 One, 所以谓语动词用 is)</ExampleChinese>
                </ExampleItem>

                <UsageType>2. 结合最高级: one of + the + 最高级 + 复数名词</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    这是 "one of" 最常见的用法之一，表示“最...之一”。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>This is <strong>one of the best movies</strong> I have ever seen.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('This is one of the best movies I have ever seen.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这是我看过的最好的电影之一。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：使用 'one of' 构建句子"
                subtitle="用下面的词组成句子"
                completionTitle="🎉 Perfect!"
                completionMessage="你已经掌握了 'one of' 的用法！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};
