
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
    FormulaParts,
    PlusSign,
} from '../Structures/SVOContent.styles';
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';
import styled from 'styled-components';

interface ModalVerbsContentProps {
    onBack: () => void;
    themeColor: string;
}

const FormulaPart = styled.div`
    background: white;
    padding: 15px 20px;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
    min-width: 100px;
    text-align: center;
`;

const PartEnglish = styled.div`
    font-weight: bold;
    color: #2d3748;
    margin-bottom: 5px;
    font-size: 1.1em;
`;

const PartChinese = styled.div`
    color: #718096;
    font-size: 0.9em;
`;

const practiceData = [
    { words: [{ en: 'I', cn: '我' }, { en: 'can', cn: '能' }, { en: 'swim', cn: '游泳' }], correct: ['I', 'can', 'swim'], chinese: '我会游泳。' },
    { words: [{ en: 'She', cn: '她' }, { en: 'will', cn: '将会' }, { en: 'come tomorrow', cn: '明天来' }], correct: ['She', 'will', 'come tomorrow'], chinese: '她明天会来。' },
    { words: [{ en: 'You', cn: '你' }, { en: 'should', cn: '应该' }, { en: 'see a doctor', cn: '看医生' }], correct: ['You', 'should', 'see a doctor'], chinese: '你应该去看医生。' },
    { words: [{ en: 'May I', cn: '我可以' }, { en: 'use your phone?', cn: '用你的手机吗？' }], correct: ['May I', 'use your phone?'], chinese: '我可以用你的手机吗？' },
    { words: [{ en: 'He', cn: '他' }, { en: 'must', cn: '必须' }, { en: 'finish his homework', cn: '完成他的作业' }], correct: ['He', 'must', 'finish his homework'], chinese: '他必须完成他的作业。' },
    { words: [{ en: 'They', cn: '他们' }, { en: 'might', cn: '可能' }, { en: 'be late', cn: '会迟到' }], correct: ['They', 'might', 'be late'], chinese: '他们可能会迟到。' },
    { words: [{ en: 'We', cn: '我们' }, { en: 'could', cn: '可以' }, { en: 'go to the park', cn: '去公园' }], correct: ['We', 'could', 'go to the park'], chinese: '我们可以去公园。' },
    { words: [{ en: 'You', cn: '你' }, { en: 'must not', cn: '不准' }, { en: 'smoke here', cn: '在这里吸烟' }], correct: ['You', 'must not', 'smoke here'], chinese: '你不准在这里吸烟。' },
];

export const ModalVerbsContent: React.FC<ModalVerbsContentProps> = ({ onBack, themeColor }) => {
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
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Lessons</BackButton>

            <LessonTitle>🤝 情态动词 (Modal Verbs)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>情态动词是动词的“小助手”，它们不能单独使用，必须跟在动词原形前，用来表达说话者的语气、情感和态度，如<strong>能力 (can)</strong>、<strong>可能性 (may/might)</strong>、<strong>必要性 (must)</strong>、<strong>建议 (should)</strong> 等。掌握它们能让你的表达更丰富、更委婉、更地道！</p>
            </WhyLearnSection>

            <FormulaSection themeColor={themeColor}>
                <FormulaTitle themeColor={themeColor}>核心结构</FormulaTitle>
                <FormulaParts>
                    <FormulaPart>
                        <PartEnglish>Subject</PartEnglish>
                        <PartChinese>主语</PartChinese>
                    </FormulaPart>
                    <PlusSign themeColor={themeColor}>+</PlusSign>
                    <FormulaPart>
                        <PartEnglish>Modal Verb</PartEnglish>
                        <PartChinese>情态动词</PartChinese>
                    </FormulaPart>
                    <PlusSign themeColor={themeColor}>+</PlusSign>
                    <FormulaPart>
                        <PartEnglish>Base Verb</PartEnglish>
                        <PartChinese>动词原形</PartChinese>
                    </FormulaPart>
                </FormulaParts>
            </FormulaSection>

            <ExamplesSection>
                <SectionTitle>📝 常见情态动词</SectionTitle>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish>I <strong>can</strong> swim.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('I can swim.')}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>我会游泳。(表示能力)</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish>You <strong>should</strong> listen to your parents.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('You should listen to your parents.')}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>你应该听父母的话。(表示建议)</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish>It <strong>may</strong> rain tomorrow.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('It may rain tomorrow.')}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>明天可能会下雨。(表示可能性)</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish>You <strong>must</strong> finish your homework.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('You must finish your homework.')}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>你必须完成你的作业。(表示必要性/命令)</ExampleChinese>
                </ExampleItem>
                 <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish><strong>May</strong> I use your pen?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('May I use your pen?')}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>我可以用你的笔吗？(表示请求许可)</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onBack}
                practiceData={practiceData}
                title="🎯 练习：构建含有情态动词的句子"
                subtitle="用下面的词组成句子"
                completionTitle="🎉 Fantastic!"
                completionMessage="你已经掌握了情态动词的基本用法！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};
