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
    ExampleBreakdown,
    BreakdownPart,
} from '../Structures/SVOContent.styles';
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';
import styled from 'styled-components';

interface GerundsContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const FormulaContainer = styled.div`
    text-align: center;
    font-size: 1.2em;
    font-weight: 500;
    color: #2d3748;
    background: #f8f9fa;
    padding: 20px;
    border-radius: 15px;
`;

const ClausePart = styled.span<{ themeColor: string }>`
    background-color: rgba(${props => props.themeColor.substring(1).match(/.{1,2}/g)?.map(v => parseInt(v, 16)).join(',')}, 0.1);
    color: ${props => props.themeColor};
    padding: 5px 10px;
    border-radius: 8px;
    border: 1px solid ${props => props.themeColor};
`;

const MainClausePart = styled.span`
    background-color: #e2e8f0;
    color: #4a5568;
    padding: 5px 10px;
    border-radius: 8px;
`;

const UsageType = styled.h3`
    font-size: 1.3em;
    font-weight: bold;
    color: #2d3748;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 2px solid #e2e8f0;
    margin-bottom: 10px;
`;

// Practice Data
const subjectPracticeData = [
    { words: [{ en: 'Swimming', cn: '游泳' }, { en: 'is', cn: '是' }, { en: 'good exercise', cn: '好的锻炼' }], correct: ['Swimming', 'is', 'good exercise'], chinese: '游泳是很好的锻炼。' },
    { words: [{ en: 'Learning English', cn: '学英语' }, { en: 'is', cn: '是' }, { en: 'fun', cn: '有趣的' }], correct: ['Learning English', 'is', 'fun'], chinese: '学习英语很有趣。' },
    { words: [{ en: 'Waking up early', cn: '早起' }, { en: 'is', cn: '是' }, { en: 'difficult', cn: '困难的' }], correct: ['Waking up early', 'is', 'difficult'], chinese: '早起是困难的。' },
    { words: [{ en: 'Playing sports', cn: '做运动' }, { en: 'makes', cn: '使' }, { en: 'you healthy', cn: '你健康' }], correct: ['Playing sports', 'makes', 'you healthy'], chinese: '做运动使你健康。' },
    { words: [{ en: 'Listening to music', cn: '听音乐' }, { en: 'relaxes', cn: '放松' }, { en: 'me', cn: '我' }], correct: ['Listening to music', 'relaxes', 'me'], chinese: '听音乐让我放松。' },
    { words: [{ en: 'Reading books', cn: '读书' }, { en: 'is', cn: '是' }, { en: 'a good habit', cn: '一个好习惯' }], correct: ['Reading books', 'is', 'a good habit'], chinese: '读书是一个好习惯。' },
    { words: [{ en: 'Traveling', cn: '旅行' }, { en: 'broadens', cn: '开阔' }, { en: 'the mind', cn: '眼界' }], correct: ['Traveling', 'broadens', 'the mind'], chinese: '旅行开阔眼界。' },
];

const objectPracticeData = [
    { words: [{ en: 'I', cn: '我' }, { en: 'enjoy', cn: '享受' }, { en: 'reading books', cn: '读书' }], correct: ['I', 'enjoy', 'reading books'], chinese: '我喜欢读书。' },
    { words: [{ en: 'She', cn: '她' }, { en: 'finished', cn: '完成了' }, { en: 'doing her homework', cn: '做她的作业' }], correct: ['She', 'finished', 'doing her homework'], chinese: '她做完了作业。' },
    { words: [{ en: 'He', cn: '他' }, { en: 'practices', cn: '练习' }, { en: 'playing the piano', cn: '弹钢琴' }], correct: ['He', 'practices', 'playing the piano'], chinese: '他练习弹钢琴。' },
    { words: [{ en: 'They', cn: '他们' }, { en: 'suggested', cn: '建议' }, { en: 'going to the movies', cn: '去看电影' }], correct: ['They', 'suggested', 'going to the movies'], chinese: '他们建议去看电影。' },
    { words: [{ en: 'Please', cn: '请' }, { en: 'stop', cn: '停止' }, { en: 'talking', cn: '说话' }], correct: ['Please', 'stop', 'talking'], chinese: '请停止说话。' },
    { words: [{ en: "I don't mind", cn: '我不介意' }, { en: 'waiting for you', cn: '等你' }], correct: ["I don't mind", 'waiting for you'], chinese: '我不介意等你。' },
    { words: [{ en: 'She', cn: '她' }, { en: 'avoids', cn: '避免' }, { en: 'eating junk food', cn: '吃垃圾食品' }], correct: ['She', 'avoids', 'eating junk food'], chinese: '她避免吃垃圾食品。' },
];

const prepositionObjectPracticeData = [
    { words: [{ en: 'He is good at', cn: '他擅长' }, { en: 'drawing pictures', cn: '画画' }], correct: ['He is good at', 'drawing pictures'], chinese: '他擅长画画。' },
    { words: [{ en: 'Thank you for', cn: '谢谢你' }, { en: 'coming', cn: '前来' }], correct: ['Thank you for', 'coming'], chinese: '谢谢你的到来。' },
    { words: [{ en: 'She is interested in', cn: '她对...感兴趣' }, { en: 'learning Spanish', cn: '学习西班牙语' }], correct: ['She is interested in', 'learning Spanish'], chinese: '她对学习西班牙语感兴趣。' },
    { words: [{ en: 'I look forward to', cn: '我期待' }, { en: 'seeing you', cn: '见到你' }], correct: ['I look forward to', 'seeing you'], chinese: '我期待见到你。' },
    { words: [{ en: 'He left', cn: '他离开了' }, { en: 'without saying goodbye', cn: '没有说再见' }], correct: ['He left', 'without saying goodbye'], chinese: '他一声不响地走了。' },
    { words: [{ en: 'She insisted on', cn: '她坚持' }, { en: 'paying for the meal', cn: '付饭钱' }], correct: ['She insisted on', 'paying for the meal'], chinese: '她坚持要付饭钱。' },
    { words: [{ en: 'How about', cn: '...怎么样?' }, { en: 'taking a break', cn: '休息一下' }], correct: ['How about', 'taking a break'], chinese: '休息一下怎么样？' },
];

const complementPracticeData = [
    { words: [{ en: 'My hobby is', cn: '我的爱好是' }, { en: 'collecting stamps', cn: '集邮' }], correct: ['My hobby is', 'collecting stamps'], chinese: '我的爱好是集邮。' },
    { words: [{ en: 'Her favorite activity is', cn: '她最喜欢的活动是' }, { en: 'dancing', cn: '跳舞' }], correct: ['Her favorite activity is', 'dancing'], chinese: '她最喜欢的活动是跳舞。' },
    { words: [{ en: 'The most important thing is', cn: '最重要的是' }, { en: 'trying your best', cn: '尽力而为' }], correct: ['The most important thing is', 'trying your best'], chinese: '最重要的是尽力而为。' },
    { words: [{ en: 'His job is', cn: '他的工作是' }, { en: 'teaching English', cn: '教英语' }], correct: ['His job is', 'teaching English'], chinese: '他的工作是教英语。' },
    { words: [{ en: 'My plan is', cn: '我的计划是' }, { en: 'traveling the world', cn: '环游世界' }], correct: ['My plan is', 'traveling the world'], chinese: '我的计划是环游世界。' },
    { words: [{ en: 'The problem is', cn: '问题是' }, { en: 'finding a solution', cn: '找到一个解决方案' }], correct: ['The problem is', 'finding a solution'], chinese: '问题在于找到一个解决方案。' },
    { words: [{ en: 'Seeing', cn: '眼见' }, { en: 'is', cn: '是' }, { en: 'believing', cn: '为实' }], correct: ['Seeing', 'is', 'believing'], chinese: '眼见为实。' },
];


export const GerundsContent: React.FC<GerundsContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [activeExample, setActiveExample] = useState<string | null>(null);

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

    const handleToggleBreakdown = (exampleId: string) => {
        setActiveExample(prev => (prev === exampleId ? null : exampleId));
    };

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to List</BackButton>
            <LessonTitle>🏃 动名词的用法 (Usage of Gerunds)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 什么是动名词？</SectionTitle>
                <p>动名词 (Gerund) 是动词的-ing形式，但它在句子中像一个【名词】一样使用。它可以做主语、宾语、表语等。学会它能让你的表达更流畅、更地道！</p>
            </WhyLearnSection>

            {/* Section 1: Gerund as Subject */}
            <UsageType>1. 动名词作主语 (Gerund as Subject)</UsageType>
            <p style={{ color: '#4a5568', marginBottom: '15px' }}>把一个“动作”当作句子的“主角”。</p>
            <FormulaSection themeColor={themeColor}>
                <FormulaTitle themeColor={themeColor}>结构公式</FormulaTitle>
                <FormulaContainer>
                    <ClausePart themeColor={themeColor}>Verb-ing (+ ...)</ClausePart>
                    &nbsp;+&nbsp;
                    <MainClausePart>Verb + ...</MainClausePart>
                </FormulaContainer>
            </FormulaSection>
            <ExamplesSection>
                <ExampleItem onClick={() => handleToggleBreakdown('ex1')} themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish><strong>Reading</strong> is fun.</ExampleEnglish><SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Reading is fun.'); }}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>阅读很有趣。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            <SentenceBuilderPractice themeColor={themeColor} onCompleteAll={() => alert('已完成主语练习！请继续学习。')} practiceData={subjectPracticeData} title="🎯 练习：作主语" subtitle="用下面的词组成句子" completionTitle="🎉 Great!" completionMessage="你已完成动名词作主语的练习！" nextButtonText="完成练习" />

            {/* Section 2: Gerund as Object */}
            <UsageType>2. 动名词作宾语 (Gerund as Object)</UsageType>
            <p style={{ color: '#4a5568', marginBottom: '15px' }}>放在 `enjoy`, `finish`, `mind`, `practice`, `avoid`, `suggest` 等动词后面，作为动作的对象。</p>
            <ExamplesSection>
                <ExampleItem onClick={() => handleToggleBreakdown('ex2')} themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish>I enjoy <strong>reading</strong>.</ExampleEnglish><SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I enjoy reading.'); }}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>我享受阅读。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            <SentenceBuilderPractice themeColor={themeColor} onCompleteAll={() => alert('已完成宾语练习！请继续学习。')} practiceData={objectPracticeData} title="🎯 练习：作宾语" subtitle="用下面的词组成句子" completionTitle="🎉 Excellent!" completionMessage="你已完成动名词作宾语的练习！" nextButtonText="完成练习" />

            {/* Section 3: Gerund as Object of a Preposition */}
            <UsageType>3. 动名词作介词宾语 (Gerund as Object of a Preposition)</UsageType>
            <p style={{ color: '#4a5568', marginBottom: '15px' }}>放在 `at`, `for`, `in`, `of`, `without` 等介词后面。</p>
            <ExamplesSection>
                <ExampleItem onClick={() => handleToggleBreakdown('ex3')} themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish>She is good at <strong>drawing</strong>.</ExampleEnglish><SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('She is good at drawing.'); }}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>她擅长画画。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            <SentenceBuilderPractice themeColor={themeColor} onCompleteAll={() => alert('已完成介词宾语练习！请继续学习。')} practiceData={prepositionObjectPracticeData} title="🎯 练习：作介词宾语" subtitle="用下面的词组成句子" completionTitle="🎉 Awesome!" completionMessage="你已完成动名词作介词宾语的练习！" nextButtonText="完成练习" />
            
            {/* Section 4: Gerund as Complement */}
            <UsageType>4. 动名词作表语 (Gerund as Complement)</UsageType>
            <p style={{ color: '#4a5568', marginBottom: '15px' }}>放在系动词 (如 is, am, are) 后面，用来解释说明主语是什么。</p>
            <ExamplesSection>
                <ExampleItem onClick={() => handleToggleBreakdown('ex4')} themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish>My hobby is <strong>collecting</strong> stamps.</ExampleEnglish><SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('My hobby is collecting stamps.'); }}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>我的爱好是集邮。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            <SentenceBuilderPractice themeColor={themeColor} onCompleteAll={onCompleteAll} practiceData={complementPracticeData} title="🎯 练习：作表语" subtitle="用下面的词组成句子" completionTitle="🎉 Fantastic!" completionMessage="你已全面掌握动名词的用法！" nextButtonText="学习下一个句型 →" />

        </LessonContainer>
    );
};