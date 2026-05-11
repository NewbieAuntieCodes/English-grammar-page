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
    { words: [{ en: "I don't mind", cn: '我不介意' }, { en: 'waiting', cn: '等' }, { en: 'for you', cn: '你' }], correct: ["I don't mind", 'waiting', 'for you'], chinese: '我不介意等你。' },
    { words: [{ en: 'She', cn: '她' }, { en: 'avoids', cn: '避免' }, { en: 'eating junk food', cn: '吃垃圾食品' }], correct: ['She', 'avoids', 'eating junk food'], chinese: '她避免吃垃圾食品。' },
];

const prepositionObjectPracticeData = [
    { words: [{ en: 'He is good at', cn: '他擅长' }, { en: 'drawing', cn: '画' }, { en: 'pictures', cn: '画' }], correct: ['He is good at', 'drawing', 'pictures'], chinese: '他擅长画画。' },
    { words: [{ en: 'I am tired of', cn: '我厌倦了' }, { en: 'doing', cn: '做' }, { en: 'this', cn: '这个' }], correct: ['I am tired of', 'doing', 'this'], chinese: '我厌倦了做这个。' },
    { words: [{ en: 'She is interested in', cn: '她对...感兴趣' }, { en: 'learning', cn: '学习' }, { en: 'Spanish', cn: '西班牙语' }], correct: ['She is interested in', 'learning', 'Spanish'], chinese: '她对学习西班牙语感兴趣。' },
    { words: [{ en: 'I look forward to', cn: '我期待' }, { en: 'seeing', cn: '见到' }, { en: 'you', cn: '你' }], correct: ['I look forward to', 'seeing', 'you'], chinese: '我期待见到你。' },
    { words: [{ en: 'He left', cn: '他离开了' }, { en: 'without saying', cn: '没有说' }, { en: 'goodbye', cn: '再见' }], correct: ['He left', 'without saying', 'goodbye'], chinese: '他一声不响地走了。' },
    { words: [{ en: 'She insisted on', cn: '她坚持' }, { en: 'paying for', cn: '支付' }, { en: 'the meal', cn: '这顿饭' }], correct: ['She insisted on', 'paying for', 'the meal'], chinese: '她坚持要付饭钱。' },
    { words: [{ en: 'How about', cn: '...怎么样?' }, { en: 'taking', cn: '进行' }, { en: 'a break?', cn: '休息' }], correct: ['How about', 'taking', 'a break?'], chinese: '休息一下怎么样？' },
];

const complementPracticeData = [
    { words: [{ en: 'My hobby is', cn: '我的爱好是' }, { en: 'collecting', cn: '收集' }, { en: 'stamps', cn: '邮票' }], correct: ['My hobby is', 'collecting', 'stamps'], chinese: '我的爱好是集邮。' },
    { words: [{ en: 'Her dream is', cn: '她的梦想是' }, { en: 'visiting', cn: '访问' }, { en: 'Paris', cn: '巴黎' }], correct: ['Her dream is', 'visiting', 'Paris'], chinese: '她的梦想是访问巴黎。' },
    { words: [{ en: 'The most important thing is', cn: '最重要的是' }, { en: 'trying', cn: '尝试' }, { en: 'your best', cn: '你的最好' }], correct: ['The most important thing is', 'trying', 'your best'], chinese: '最重要的是尽力而为。' },
    { words: [{ en: 'His job is', cn: '他的工作是' }, { en: 'teaching', cn: '教' }, { en: 'English', cn: '英语' }], correct: ['His job is', 'teaching', 'English'], chinese: '他的工作是教英语。' },
    { words: [{ en: 'My plan is', cn: '我的计划是' }, { en: 'traveling', cn: '旅行' }, { en: 'the world', cn: '世界' }], correct: ['My plan is', 'traveling', 'the world'], chinese: '我的计划是环游世界。' },
    { words: [{ en: 'The problem is', cn: '问题是' }, { en: 'finding', cn: '找到' }, { en: 'a solution', cn: '一个解决方案' }], correct: ['The problem is', 'finding', 'a solution'], chinese: '问题在于找到一个解决方案。' },
    { words: [{ en: 'Seeing', cn: '眼见' }, { en: 'is', cn: '是' }, { en: 'believing', cn: '为实' }], correct: ['Seeing', 'is', 'believing'], chinese: '眼见为实。' },
];

const adverbialPracticeData = [
    { words: [{ en: 'He sat on the sofa,', cn: '他坐在沙发上，' }, { en: 'watching', cn: '看着' }, { en: 'TV', cn: '电视' }], correct: ['He sat on the sofa,', 'watching', 'TV'], chinese: '他坐在沙发上，看着电视。' },
    { words: [{ en: 'She walked out,', cn: '她走了出去，' }, { en: 'singing', cn: '唱着' }, { en: 'a song', cn: '一首歌' }], correct: ['She walked out,', 'singing', 'a song'], chinese: '她唱着歌走了出去。' },
    { words: [{ en: 'They stood there,', cn: '他们站在那里，' }, { en: 'waiting for', cn: '等着' }, { en: 'the bus', cn: '公交车' }], correct: ['They stood there,', 'waiting for', 'the bus'], chinese: '他们站在那里等公交车。' },
    { words: [{ en: 'The children ran out,', cn: '孩子们跑了出去，' }, { en: 'laughing', cn: '笑着' }, { en: 'loudly', cn: '大声地' }], correct: ['The children ran out,', 'laughing', 'loudly'], chinese: '孩子们大笑着跑了出去。' },
    { words: [{ en: 'He fell asleep,', cn: '他睡着了，' }, { en: 'listening to', cn: '听着' }, { en: 'the rain', cn: '雨声' }], correct: ['He fell asleep,', 'listening to', 'the rain'], chinese: '他听着雨声睡着了。' },
];

const attributivePracticeData = [
    { words: [{ en: 'The man', cn: '那个男人' }, { en: 'talking to the teacher', cn: '正在和老师说话' }, { en: 'is my father', cn: '是我的父亲' }], correct: ['The man', 'talking to the teacher', 'is my father'], chinese: '正在和老师说话的那个男人是我的父亲。' },
    { words: [{ en: 'Do you know the girl', cn: '你认识那个女孩吗' }, { en: 'wearing', cn: '戴着' }, { en: 'a red hat?', cn: '一顶红帽子？' }], correct: ['Do you know the girl', 'wearing', 'a red hat?'], chinese: '你认识那个戴红帽子的女孩吗？' },
    { words: [{ en: 'The dog', cn: '那只狗' }, { en: 'barking loudly', cn: '大声叫' }, { en: 'is my neighbor\'s', cn: '是我邻居的' }], correct: ['The dog', 'barking loudly', 'is my neighbor\'s'], chinese: '那只大声叫的狗是我邻居的。' },
    { words: [{ en: 'The boy', cn: '那个男孩' }, { en: 'playing football', cn: '正在踢足球' }, { en: 'is my brother', cn: '是我的弟弟' }], correct: ['The boy', 'playing football', 'is my brother'], chinese: '那个正在踢足球的男孩是我的弟弟。' },
    { words: [{ en: 'I saw a car', cn: '我看见一辆车' }, { en: 'driving', cn: '开着' }, { en: 'too fast', cn: '太快' }], correct: ['I saw a car', 'driving', 'too fast'], chinese: '我看见一辆车开得太快了。' },
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
            <LessonTitle>🏃 动词-ing的用法 (Usage of V-ing)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 什么是动词-ing？</SectionTitle>
                <p>动词的-ing形式是一个“多面手”！当它像【名词】一样使用时，我们称之为动名词 (Gerund)；当它像【形容词】或【副词】一样使用时，我们称之为现在分词 (Present Participle)。它可以在句子中扮演多种角色，学会它能让你的表达更流畅、更地道！</p>
            </WhyLearnSection>

            {/* Section 1: Gerund as Subject */}
            <UsageType>1. 作主语 (As Subject)</UsageType>
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
            <UsageType>2. 作宾语 (As Object)</UsageType>
            <p style={{ color: '#4a5568', marginBottom: '15px' }}>放在 `enjoy`, `finish`, `mind`, `practice`, `avoid`, `suggest` 等动词后面，作为动作的对象。</p>
            <ExamplesSection>
                <ExampleItem onClick={() => handleToggleBreakdown('ex2')} themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish>I enjoy <strong>reading</strong>.</ExampleEnglish><SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I enjoy reading.'); }}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>我享受阅读。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            <SentenceBuilderPractice themeColor={themeColor} onCompleteAll={() => alert('已完成宾语练习！请继续学习。')} practiceData={objectPracticeData} title="🎯 练习：作宾语" subtitle="用下面的词组成句子" completionTitle="🎉 Excellent!" completionMessage="你已完成动名词作宾语的练习！" nextButtonText="完成练习" />

            {/* Section 3: Gerund as Object of a Preposition */}
            <UsageType>3. 作介词宾语 (As Object of a Preposition)</UsageType>
            <p style={{ color: '#4a5568', marginBottom: '15px' }}>放在 `at`, `for`, `in`, `of`, `without` 等介词后面。</p>
            <ExamplesSection>
                <ExampleItem onClick={() => handleToggleBreakdown('ex3')} themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish>She is good at <strong>drawing</strong>.</ExampleEnglish><SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('She is good at drawing.'); }}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>她擅长画画。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            <SentenceBuilderPractice themeColor={themeColor} onCompleteAll={() => alert('已完成介词宾语练习！请继续学习。')} practiceData={prepositionObjectPracticeData} title="🎯 练习：作介词宾语" subtitle="用下面的词组成句子" completionTitle="🎉 Awesome!" completionMessage="你已完成动名词作介词宾语的练习！" nextButtonText="完成练习" />
            
            {/* Section 4: Gerund as Complement */}
            <UsageType>4. 作表语 (As Complement)</UsageType>
            <p style={{ color: '#4a5568', marginBottom: '15px' }}>放在系动词 (如 is, am, are) 后面，用来解释说明主语是什么。</p>
            <ExamplesSection>
                <ExampleItem onClick={() => handleToggleBreakdown('ex4')} themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish>My hobby is <strong>collecting</strong> stamps.</ExampleEnglish><SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('My hobby is collecting stamps.'); }}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>我的爱好是集邮。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            <SentenceBuilderPractice themeColor={themeColor} onCompleteAll={() => alert('已完成表语练习！请继续学习。')} practiceData={complementPracticeData} title="🎯 练习：作表语" subtitle="用下面的词组成句子" completionTitle="🎉 Fantastic!" completionMessage="你已完成动名词作表语的练习！" nextButtonText="完成练习" />

            {/* Section 5: As Adverbial */}
            <UsageType>5. 作状语 (As Adverbial) - 表示伴随</UsageType>
            <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                表示伴随情况，说明主语在做主要动作的同时，还在做什么。它通常用逗号与主句隔开。
            </p>
            <ExamplesSection>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish>He sat on the sofa, <strong>watching TV</strong>.</ExampleEnglish><SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He sat on the sofa, watching TV.'); }}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>他坐在沙发上，看着电视。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            <SentenceBuilderPractice themeColor={themeColor} onCompleteAll={() => alert('已完成状语练习！请继续学习。')} practiceData={adverbialPracticeData} title="🎯 练习：作状语" subtitle="用下面的词组成句子" completionTitle="🎉 Perfect!" completionMessage="你已完成动名词作状语的练习！" nextButtonText="完成练习" />

            {/* Section 6: As Attributive */}
            <UsageType>6. 作定语 (As Attributive) - 后置修饰</UsageType>
            <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                放在名词后面，作后置定语，用来修饰该名词，功能类似于一个定语从句。
            </p>
            <ExamplesSection>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish>The man <strong>talking to John</strong> is my teacher.</ExampleEnglish><SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The man talking to John is my teacher.'); }}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>正在和约翰说话的那个男人是我的老师。(= The man who is talking to John...)</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            <SentenceBuilderPractice themeColor={themeColor} onCompleteAll={onCompleteAll} practiceData={attributivePracticeData} title="🎯 练习：作定语" subtitle="用下面的词组成句子" completionTitle="🎉 Fantastic!" completionMessage="你已全面掌握动词-ing的用法！" nextButtonText="学习下一个句型 →" />

        </LessonContainer>
    );
};
