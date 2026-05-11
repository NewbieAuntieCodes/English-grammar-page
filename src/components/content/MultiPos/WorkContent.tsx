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

interface WorkContentProps {
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
    { words: [{ en: 'I have to', cn: '我必须' }, { en: 'work', cn: '工作' }, { en: 'today', cn: '今天' }], correct: ['I have to', 'work', 'today'], chinese: '我今天必须工作。' },
    { words: [{ en: 'He finished', cn: '他完成了' }, { en: 'his', cn: '他的' }, { en: 'work', cn: '工作' }], correct: ['He finished', 'his', 'work'], chinese: '他完成了他的工作。' },
    { words: [{ en: 'My computer', cn: '我的电脑' }, { en: 'doesn\'t work', cn: '不工作了' }], correct: ['My computer', 'doesn\'t work'], chinese: '我的电脑坏了。' },
    { words: [{ en: 'She is looking for', cn: '她在找' }, { en: 'work', cn: '工作' }], correct: ['She is looking for', 'work'], chinese: '她在找工作。' },
    { words: [{ en: 'They', cn: '他们' }, { en: 'work', cn: '工作' }, { en: 'very hard', cn: '非常努力' }], correct: ['They', 'work', 'very hard'], chinese: '他们工作非常努力。' },
    { words: [{ en: 'This is a great', cn: '这是一件伟大的' }, { en: 'work of art', cn: '艺术作品' }], correct: ['This is a great', 'work of art'], chinese: '这是一件伟大的艺术品。' },
    { words: [{ en: 'Does this machine', cn: '这台机器' }, { en: 'work', cn: '运转' }, { en: 'properly?', cn: '正常吗' }], correct: ['Does this machine', 'work', 'properly?'], chinese: '这台机器运转正常吗？' },
    { words: [{ en: 'What kind of', cn: '什么种类的' }, { en: 'work', cn: '工作' }, { en: 'do you do?', cn: '你做' }], correct: ['What kind of', 'work', 'do you do?'], chinese: '你做什么样的工作？' }
];

export const WorkContent: React.FC<WorkContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>🔄 "Work" 的多种用法</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"Work" 是一个非常基础且重要的词，它既可以作动词表示“工作”或“运转”，也可以作名词表示“工作内容”或“作品”。理解它的不同角色是造句的基础。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. 作动词 (Verb)</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    当 "work" 表示一个动作时，它是动词。意思是“工作”、“学习”或“(机器等)运转”。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I <strong>work</strong> in an office.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I work in an office.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我在办公室工作。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>My phone doesn't <strong>work</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("My phone doesn't work."); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我的手机坏了（不运转了）。</ExampleChinese>
                </ExampleItem>

                <UsageType>2. 作名词 (Noun)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    当 "work" 表示一个事物时，它是名词。意思是“工作”、“任务”、“作品”。注意：作为“工作”讲时，它通常是不可数名词。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I have a lot of <strong>work</strong> to do.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I have a lot of work to do.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我有很多工作要做。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>This painting is a beautiful <strong>work</strong> of art.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("This painting is a beautiful work of art."); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这幅画是一件美丽的艺术品。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：使用 'work'"
                subtitle="用下面的词组成句子，判断 'work' 是动词还是名词"
                completionTitle="🎉 Great Work!"
                completionMessage="你已经掌握了 'work' 的用法！"
                nextButtonText="下一个练习 →"
            />
        </LessonContainer>
    );
};
