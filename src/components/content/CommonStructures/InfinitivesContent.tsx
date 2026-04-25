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

interface InfinitivesContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

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
    { words: [{ en: 'To learn a language', cn: '学习一门语言' }, { en: 'takes time', cn: '需要时间' }], correct: ['To learn a language', 'takes time'], chinese: '学习一门语言需要时间。' },
    { words: [{ en: 'It is important', cn: '很重要' }, { en: 'to stay healthy', cn: '保持健康' }], correct: ['It is important', 'to stay healthy'], chinese: '保持健康很重要。' },
    { words: [{ en: 'To see', cn: '眼见' }, { en: 'is to believe', cn: '为实' }], correct: ['To see', 'is to believe'], chinese: '眼见为实。' },
    { words: [{ en: 'It is my dream', cn: '是我的梦想' }, { en: 'to become a doctor', cn: '成为一名医生' }], correct: ['It is my dream', 'to become a doctor'], chinese: '成为一名医生是我的梦想。' },
    { words: [{ en: 'To get up early', cn: '早起' }, { en: 'is a good habit', cn: '是个好习惯' }], correct: ['To get up early', 'is a good habit'], chinese: '早起是个好习惯。' },
    { words: [{ en: 'It is not easy', cn: '不容易' }, { en: 'to solve this problem', cn: '解决这个问题' }], correct: ['It is not easy', 'to solve this problem'], chinese: '解决这个问题不容易。' },
    { words: [{ en: 'To travel alone', cn: '独自旅行' }, { en: 'can be exciting', cn: '会很刺激' }], correct: ['To travel alone', 'can be exciting'], chinese: '独自旅行可能很刺激。' },
];

const objectPracticeData = [
    { words: [{ en: 'I', cn: '我' }, { en: 'want', cn: '想' }, { en: 'to buy a new phone', cn: '买一个新手机' }], correct: ['I', 'want', 'to buy a new phone'], chinese: '我想买一个新手机。' },
    { words: [{ en: 'She', cn: '她' }, { en: 'decided', cn: '决定' }, { en: 'to stay home', cn: '待在家里' }], correct: ['She', 'decided', 'to stay home'], chinese: '她决定待在家里。' },
    { words: [{ en: 'He', cn: '他' }, { en: 'hopes', cn: '希望' }, { en: 'to see you again', cn: '再次见到你' }], correct: ['He', 'hopes', 'to see you again'], chinese: '他希望能再次见到你。' },
    { words: [{ en: 'They', cn: '他们' }, { en: 'are planning', cn: '正在计划' }, { en: 'to have a party', cn: '举办一个派对' }], correct: ['They', 'are planning', 'to have a party'], chinese: '他们正计划举办一个派对。' },
    { words: [{ en: 'We', cn: '我们' }, { en: 'agreed', cn: '同意' }, { en: 'to help him', cn: '帮助他' }], correct: ['We', 'agreed', 'to help him'], chinese: '我们同意帮助他。' },
    { words: [{ en: "Don't forget", cn: '别忘了' }, { en: 'to lock the door', cn: '锁门' }], correct: ["Don't forget", 'to lock the door'], chinese: '别忘了锁门。' },
    { words: [{ en: 'She', cn: '她' }, { en: 'is learning', cn: '正在学习' }, { en: 'to drive a car', cn: '开车' }], correct: ['She', 'is learning', 'to drive a car'], chinese: '她正在学习开车。' },
];

const complementPracticeData = [
    { words: [{ en: 'My dream is', cn: '我的梦想是' }, { en: 'to travel the world', cn: '环游世界' }], correct: ['My dream is', 'to travel the world'], chinese: '我的梦想是环游世界。' },
    { words: [{ en: 'His goal is', cn: '他的目标是' }, { en: 'to become an artist', cn: '成为一名艺术家' }], correct: ['His goal is', 'to become an artist'], chinese: '他的目标是成为一名艺术家。' },
    { words: [{ en: 'The most important thing is', cn: '最重要的是' }, { en: 'to be happy', cn: '要开心' }], correct: ['The most important thing is', 'to be happy'], chinese: '最重要的是要开心。' },
    { words: [{ en: 'Her job is', cn: '她的工作是' }, { en: 'to answer phone calls', cn: '接电话' }], correct: ['Her job is', 'to answer phone calls'], chinese: '她的工作是接听电话。' },
    { words: [{ en: 'Our plan is', cn: '我们的计划是' }, { en: 'to start early', cn: '早点开始' }], correct: ['Our plan is', 'to start early'], chinese: '我们的计划是早点开始。' },
    { words: [{ en: 'All you need to do is', cn: '你需要做的就是' }, { en: 'to press this button', cn: '按下这个按钮' }], correct: ['All you need to do is', 'to press this button'], chinese: '你所需要做的就是按下这个按钮。' },
    { words: [{ en: 'To see', cn: '眼见' }, { en: 'is to believe', cn: '为实' }], correct: ['To see', 'is to believe'], chinese: '眼见为实。' },
];

const adverbialPracticeData = [
    { words: [{ en: 'I came here', cn: '我来这里' }, { en: 'to see you', cn: '为了见你' }], correct: ['I came here', 'to see you'], chinese: '我来这里是为了见你。' },
    { words: [{ en: 'He works hard', cn: '他努力工作' }, { en: 'to support his family', cn: '为了养家' }], correct: ['He works hard', 'to support his family'], chinese: '他努力工作以养家糊口。' },
    { words: [{ en: 'She went to the store', cn: '她去商店' }, { en: 'to buy some milk', cn: '为了买些牛奶' }], correct: ['She went to the store', 'to buy some milk'], chinese: '她去商店买牛奶了。' },
    { words: [{ en: 'They saved money', cn: '他们存钱' }, { en: 'to buy a new house', cn: '为了买新房子' }], correct: ['They saved money', 'to buy a new house'], chinese: '他们存钱是为了买个新房子。' },
    { words: [{ en: 'You need to exercise', cn: '你需要锻炼' }, { en: 'to stay fit', cn: '为了保持健康' }], correct: ['You need to exercise', 'to stay fit'], chinese: '你需要锻炼来保持健康。' },
    { words: [{ en: 'I wake up early', cn: '我早起' }, { en: 'to catch the bus', cn: '为了赶公交车' }], correct: ['I wake up early', 'to catch the bus'], chinese: '我早起是为了赶公交车。' },
    { words: [{ en: 'She is studying', cn: '她在学习' }, { en: 'to pass the exam', cn: '为了通过考试' }], correct: ['She is studying', 'to pass the exam'], chinese: '她正在为了通过考试而学习。' },
];

const attributivePracticeData = [
    { words: [{ en: 'I have some work', cn: '我有些工作' }, { en: 'to do', cn: '要做' }], correct: ['I have some work', 'to do'], chinese: '我有些工作要做。' },
    { words: [{ en: 'She needs a friend', cn: '她需要一个朋友' }, { en: 'to talk to', cn: '可以倾诉' }], correct: ['She needs a friend', 'to talk to'], chinese: '她需要一个可以倾诉的朋友。' },
    { words: [{ en: 'This is the best way', cn: '这是最好的方法' }, { en: 'to learn English', cn: '学英语的' }], correct: ['This is the best way', 'to learn English'], chinese: '这是学习英语的最好方法。' },
    { words: [{ en: 'He is looking for a place', cn: '他在找一个地方' }, { en: 'to live', cn: '居住' }], correct: ['He is looking for a place', 'to live'], chinese: '他在找一个住的地方。' },
    { words: [{ en: 'There is nothing', cn: '没什么' }, { en: 'to worry about', cn: '好担心的' }], correct: ['There is nothing', 'to worry about'], chinese: '没什么好担心的。' },
    { words: [{ en: 'Give me something', cn: '给我点东西' }, { en: 'to drink', cn: '喝的' }], correct: ['Give me something', 'to drink'], chinese: '给我点喝的。' },
    { words: [{ en: 'It is time', cn: '是时候' }, { en: 'to go to bed', cn: '上床睡觉了' }], correct: ['It is time', 'to go to bed'], chinese: '是时候睡觉了。' },
];


export const InfinitivesContent: React.FC<InfinitivesContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>📚 不定式的用法 (Usage of Infinitives)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 什么是不定式？</SectionTitle>
                <p>不定式 (Infinitive) 是 `to + 动词原形` 的形式。它非常灵活，可以在句子中扮演多种角色，如名词、形容词或副词。掌握它能极大地丰富你的句子结构！</p>
            </WhyLearnSection>

            {/* Section 1: As Subject */}
            <UsageType>1. 作主语 (As Subject)</UsageType>
            <p style={{ color: '#4a5568', marginBottom: '15px' }}>把一个“动作”作为句子的主角。通常为了句子平衡，会使用 `It is... to do...` 的形式。</p>
            <ExamplesSection>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish><strong>To master English</strong> is his goal.</ExampleEnglish><SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('To master English is his goal.'); }}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>精通英语是他的目标。(句子有点头重脚轻)</ExampleChinese>
                </ExampleItem>
                 <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish><strong>It</strong> is his goal <strong>to master English</strong>.</ExampleEnglish><SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('It is his goal to master English.'); }}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>精通英语是他的目标。(更常见的用法)</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            <SentenceBuilderPractice themeColor={themeColor} onCompleteAll={() => {}} practiceData={subjectPracticeData} title="🎯 练习：作主语" subtitle="用下面的词组成句子" completionTitle="🎉 Great!" completionMessage="你已完成不定式作主语的练习！" nextButtonText="继续下一个练习" />

            {/* Section 2: As Object */}
            <UsageType>2. 作宾语 (As Object)</UsageType>
            <p style={{ color: '#4a5568', marginBottom: '15px' }}>放在 `want`, `hope`, `decide`, `plan`, `learn` 等动词后面，作为动作的对象。</p>
            <ExamplesSection>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish>He wants <strong>to learn</strong> French.</ExampleEnglish><SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He wants to learn French.'); }}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>他想学法语。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            <SentenceBuilderPractice themeColor={themeColor} onCompleteAll={() => {}} practiceData={objectPracticeData} title="🎯 练习：作宾语" subtitle="用下面的词组成句子" completionTitle="🎉 Excellent!" completionMessage="你已完成不定式作宾语的练习！" nextButtonText="继续下一个练习" />

            {/* Section 3: As Complement */}
            <UsageType>3. 作表语 (As Complement)</UsageType>
            <p style={{ color: '#4a5568', marginBottom: '15px' }}>放在系动词 (如 is, am, are) 后面，用来解释说明主语是什么。</p>
            <ExamplesSection>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish>Her dream is <strong>to be a singer</strong>.</ExampleEnglish><SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Her dream is to be a singer.'); }}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>她的梦想是成为一名歌手。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            <SentenceBuilderPractice themeColor={themeColor} onCompleteAll={() => {}} practiceData={complementPracticeData} title="🎯 练习：作表语" subtitle="用下面的词组成句子" completionTitle="🎉 Awesome!" completionMessage="你已完成不定式作表语的练习！" nextButtonText="继续下一个练习" />
            
            {/* Section 4: As Adverbial */}
            <UsageType>4. 作状语 (As Adverbial) - 表示目的</UsageType>
            <p style={{ color: '#4a5568', marginBottom: '15px' }}>用来解释做某个动作的【目的】，回答 “Why?”</p>
            <ExamplesSection>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish>He got up early <strong>to catch the train</strong>.</ExampleEnglish><SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He got up early to catch the train.'); }}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>他早起是为了赶火车。(为什么早起？为了赶火车。)</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            <SentenceBuilderPractice themeColor={themeColor} onCompleteAll={() => {}} practiceData={adverbialPracticeData} title="🎯 练习：作状语" subtitle="用下面的词组成句子" completionTitle="🎉 Perfect!" completionMessage="你已完成不定式作状语的练习！" nextButtonText="继续下一个练习" />

            {/* Section 5: As Attributive */}
            <UsageType>5. 作定语 (As Attributive)</UsageType>
            <p style={{ color: '#4a5568', marginBottom: '15px' }}>放在名词后面，修饰该名词。</p>
            <ExamplesSection>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish>I have a lot of homework <strong>to do</strong>.</ExampleEnglish><SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I have a lot of homework to do.'); }}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>我有很多作业要做。(什么样的作业？要做的作业。)</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            <SentenceBuilderPractice themeColor={themeColor} onCompleteAll={onCompleteAll} practiceData={attributivePracticeData} title="🎯 练习：作定语" subtitle="用下面的词组成句子" completionTitle="🎉 Fantastic!" completionMessage="你已全面掌握不定式的用法！" nextButtonText="返回列表" />

        </LessonContainer>
    );
};