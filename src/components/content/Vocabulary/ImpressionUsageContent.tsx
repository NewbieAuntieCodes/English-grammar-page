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
import { MultipleChoicePractice } from '../../practice/MultipleChoicePractice';
import styled from 'styled-components';

interface ImpressionUsageContentProps {
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
    { question: "He ______ a good impression on his first day at work.", choices: [{text: "made", isCorrect: true}, {text: "did", isCorrect: false}, {text: "took", isCorrect: false}], chineseHint: "他在第一天上班时给人留下了好印象。" },
    { question: "Her speech made a strong impression ______ the audience.", choices: [{text: "on", isCorrect: true}, {text: "to", isCorrect: false}, {text: "with", isCorrect: false}], chineseHint: "她的演讲给观众留下了深刻的印象。" },
    { question: "I was ______ the impression that the meeting was tomorrow.", choices: [{text: "under", isCorrect: true}, {text: "on", isCorrect: false}, {text: "with", isCorrect: false}], chineseHint: "我误以为会议是明天。" },
    { question: "He does a great impression ______ the president.", choices: [{text: "of", isCorrect: true}, {text: "for", isCorrect: false}, {text: "like", isCorrect: false}], chineseHint: "他对总统的模仿非常到位。" },
    { question: "What was your first ______ of him?", choices: [{text: "impression", isCorrect: true}, {text: "expression", isCorrect: false}, {text: "idea", isCorrect: false}], chineseHint: "你对他的第一印象是什么？" },
    { question: "He tried to ______ the impression that he was very busy.", choices: [{text: "create", isCorrect: true}, {text: "do", isCorrect: false}, {text: "get", isCorrect: false}], chineseHint: "他试图制造他很忙的印象。" },
    { question: "The trip to the mountains ______ a lasting impression on me.", choices: [{text: "left", isCorrect: true}, {text: "made", isCorrect: false}, {text: "got", isCorrect: false}], chineseHint: "那次山区之旅给我留下了持久的印象。" },
    { question: "I ______ the impression that she wasn't happy with the decision.", choices: [{text: "got", isCorrect: true}, {text: "made", isCorrect: false}, {text: "did", isCorrect: false}], chineseHint: "我感觉她对这个决定不满意。" }
];

export const ImpressionUsageContent: React.FC<ImpressionUsageContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>📖 'impression' 的用法</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"impression" 是一个关于观点和感觉的高频名词。掌握它及相关短语，如 "make an impression" 或 "be under the impression"，可以帮助你更准确地描述人和事给你留下的感觉。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. a first impression (第一印象)</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    指初次见面或接触时对某人或某物形成的感觉。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>My <strong>first impression</strong> of him was that he was very shy.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('My first impression of him was that he was very shy.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我对他的第一印象是他非常害羞。</ExampleChinese>
                </ExampleItem>

                <UsageType>2. make/create/leave an impression on sb (给某人留下/创造...印象)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    指因某个行为或特质而让别人对你产生某种看法。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>He <strong>made a good impression on</strong> his new boss.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He made a good impression on his new boss.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他给他的新老板留下了好印象。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The beautiful scenery <strong>left a lasting impression on</strong> me.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The beautiful scenery left a lasting impression on me.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>美丽的风景给我留下了持久的印象。</ExampleChinese>
                </ExampleItem>

                <UsageType>3. get an impression that... (得到...的印象/感觉)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    指从某人的言行中形成一种感觉或看法。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I <strong>get the impression that</strong> she doesn't like me.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("I get the impression that she doesn't like me."); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我感觉她不喜欢我。</ExampleChinese>
                </ExampleItem>
                
                <UsageType>4. be under the impression that... (误以为...)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    指错误地相信某件事是真的。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I <strong>was under the impression that</strong> the meeting was cancelled.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I was under the impression that the meeting was cancelled.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我误以为会议取消了。</ExampleChinese>
                </ExampleItem>

                <UsageType>5. do an impression of sb (模仿某人)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    指模仿某人的言行举止以达到娱乐效果。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>He can <strong>do a great impression of</strong> the teacher.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He can do a great impression of the teacher.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他能惟妙惟肖地模仿老师。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <MultipleChoicePractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习: 'impression' 的用法"
                subtitle="选择最合适的单词或短语填入句子"
                completionTitle="🎉 Impressive!"
                completionMessage="你已经掌握了 'impression' 的用法！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};