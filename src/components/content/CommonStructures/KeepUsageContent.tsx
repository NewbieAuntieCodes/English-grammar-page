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

interface KeepUsageContentProps {
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
    { words: [{ en: 'The baby', cn: '婴儿' }, { en: 'kept crying', cn: '不停地哭' }], correct: ['The baby', 'kept crying'], chinese: '那个婴儿不停地哭。' },
    { words: [{ en: 'Please', cn: '请' }, { en: 'keep the door', cn: '让门' }, { en: 'closed', cn: '关着' }], correct: ['Please', 'keep the door', 'closed'], chinese: '请保持门关闭。' },
    { words: [{ en: 'The noise', cn: '噪音' }, { en: 'kept me from', cn: '阻止我' }, { en: 'sleeping', cn: '睡觉' }], correct: ['The noise', 'kept me from', 'sleeping'], chinese: '噪音使我无法入睡。' },
    { words: [{ en: 'You can', cn: '你可以' }, { en: 'keep this book', cn: '留下这本书' }], correct: ['You can', 'keep this book'], chinese: '你可以留下这本书。' },
    { words: [{ en: 'She', cn: '她' }, { en: 'keeps her desk', cn: '保持她的桌子' }, { en: 'tidy', cn: '整洁' }], correct: ['She', 'keeps her desk', 'tidy'], chinese: '她保持书桌整洁。' },
    { words: [{ en: 'He', cn: '他' }, { en: 'keeps asking', cn: '一直问' }, { en: 'the same question', cn: '同样的问题' }], correct: ['He', 'keeps asking', 'the same question'], chinese: '他不停地问同一个问题。' },
    { words: [{ en: 'What kept you from', cn: '是什么阻止你' }, { en: 'calling me?', cn: '打电话给我？' }], correct: ['What kept you from', 'calling me?'], chinese: '是什么让你没给我打电话？' },
    { words: [{ en: 'Keep the change', cn: '不用找了' }], correct: ['Keep the change'], chinese: '零钱不用找了。' },
];

export const KeepUsageContent: React.FC<KeepUsageContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>📖 'keep' 的用法</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"keep" 是一个非常灵活的动词，核心意思是“保持”。它可以表示动作的持续、状态的维持，甚至可以表示“阻止”。掌握它的核心句型对于日常交流至关重要。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要结构</SectionTitle>
                
                <UsageType>1. keep + V-ing (继续/反复做某事)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>He <strong>kept talking</strong> about his trip.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He kept talking about his trip.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他不停地谈论他的旅行。</ExampleChinese>
                </ExampleItem>

                <UsageType>2. keep + 宾语 + 形容词 (使...保持...)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Please <strong>keep the room clean</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Please keep the room clean.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>请保持房间干净。</ExampleChinese>
                </ExampleItem>
                
                <UsageType>3. keep + 宾语 + from + V-ing (阻止...做某事)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The heavy rain <strong>kept us from going out</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The heavy rain kept us from going out.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>大雨使我们无法外出。</ExampleChinese>
                </ExampleItem>

                <UsageType>4. keep + 宾语 (保留)</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>You can <strong>keep the change</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('You can keep the change.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>不用找零了。（保留零钱）</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习: 'keep' 的用法"
                subtitle="用下面的词组成句子"
                completionTitle="🎉 Great!"
                completionMessage="你已经掌握了 'keep' 的用法！"
                nextButtonText="学习下一个句型 →"
            />
        </LessonContainer>
    );
};