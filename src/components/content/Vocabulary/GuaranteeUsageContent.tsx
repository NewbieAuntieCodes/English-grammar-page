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

interface GuaranteeUsageContentProps {
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
    { words: [{ en: 'This product comes with', cn: '这个产品附带' }, { en: 'a one-year guarantee', cn: '一年保修' }], correct: ['This product comes with', 'a one-year guarantee'], chinese: '这个产品附带一年保修。' },
    { words: [{ en: 'I cannot', cn: '我不能' }, { en: 'guarantee that', cn: '保证' }, { en: 'you will get the job', cn: '你会得到这份工作' }], correct: ['I cannot', 'guarantee that', 'you will get the job'], chinese: '我不能保证你会得到这份工作。' },
    { words: [{ en: 'We', cn: '我们' }, { en: 'guarantee', cn: '保证' }, { en: 'to finish the work', cn: '完成工作' }, { en: 'on time', cn: '准时' }], correct: ['We', 'guarantee', 'to finish the work', 'on time'], chinese: '我们保证准时完成工作。' },
    { words: [{ en: 'Good grades are', cn: '好成绩' }, { en: 'no guarantee of', cn: '不是...的保证' }, { en: 'a good job', cn: '一份好工作' }], correct: ['Good grades are', 'no guarantee of', 'a good job'], chinese: '好成绩不保证能找到好工作。' },
    { words: [{ en: 'The company', cn: '公司' }, { en: 'guarantees', cn: '保证' }, { en: 'customer satisfaction', cn: '顾客满意' }], correct: ['The company', 'guarantees', 'customer satisfaction'], chinese: '该公司保证顾客满意。' },
    { words: [{ en: 'Is there any', cn: '有任何' }, { en: 'guarantee that', cn: '保证吗' }, { en: 'this plan will work?', cn: '这个计划会成功' }], correct: ['Is there any', 'guarantee that', 'this plan will work?'], chinese: '有什么保证能让这个计划成功吗？' },
    { words: [{ en: 'He guaranteed me', cn: '他向我保证' }, { en: 'a position', cn: '一个职位' }, { en: 'in the company', cn: '在公司' }], correct: ['He guaranteed me', 'a position', 'in the company'], chinese: '他向我保证了公司的一个职位。' },
    { words: [{ en: 'The new system', cn: '新系统' }, { en: 'is guaranteed to be', cn: '保证会' }, { en: 'more efficient', cn: '更有效率' }], correct: ['The new system', 'is guaranteed to be', 'more efficient'], chinese: '新系统保证会更有效率。' },
];

export const GuaranteeUsageContent: React.FC<GuaranteeUsageContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>📖 'guarantee' 的用法</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"guarantee" 是一个表示“保证”或“担保”的强有力词汇。它既可以作动词，也可以作名词。在商务、购物或做出承诺等场景中非常常用。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. 作动词 (Verb)</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    意思是“保证；担保”。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>We <strong>guarantee</strong> the quality of our products.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('We guarantee the quality of our products.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我们保证我们产品的质量。</ExampleChinese>
                </ExampleItem>
                 <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I can't <strong>guarantee</strong> that he will come.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("I can't guarantee that he will come."); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我不能保证他会来。</ExampleChinese>
                </ExampleItem>

                <UsageType>2. 作名词 (Noun)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    意思是“保证；保修单”。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The TV comes with a five-year <strong>guarantee</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The TV comes with a five-year guarantee.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这台电视有五年的保修。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>There is no <strong>guarantee</strong> of success.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("There is no guarantee of success."); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>成功没有任何保证。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习: 'guarantee' 的用法"
                subtitle="用下面的词组成句子"
                completionTitle="🎉 Guaranteed Success!"
                completionMessage="你已经掌握了 'guarantee' 的用法！"
                nextButtonText="下一个练习 →"
            />
        </LessonContainer>
    );
};