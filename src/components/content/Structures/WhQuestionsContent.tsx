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
} from './SVOContent.styles';
import { RuleCard, RuleTitle, RuleExplanation, ExamplePair, Verb, Arrow } from '../Tenses/PastTenseContent.styles';
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';
import styled from 'styled-components';

interface WhQuestionsContentProps {
    onBack: () => void;
    themeColor: string;
}

const FormulaText = styled(Verb)`
    font-size: 1em;
    padding: 8px 12px;
`;

// Practice data sets
const subjectPracticeData = [
    { words: [{ en: 'Who', cn: '谁' }, { en: 'ate', cn: '吃了' }, { en: 'the last cookie?', cn: '最后一块饼干？' }], correct: ['Who', 'ate', 'the last cookie?'], chinese: '谁吃了最后一块饼干？' },
    { words: [{ en: 'What', cn: '什么' }, { en: 'made', cn: '发出了' }, { en: 'that noise?', cn: '那个声音？' }], correct: ['What', 'made', 'that noise?'], chinese: '是什么发出了那个声音？' },
    { words: [{ en: 'Which team', cn: '哪个队' }, { en: 'won', cn: '赢了' }, { en: 'the game?', cn: '比赛？' }], correct: ['Which team', 'won', 'the game?'], chinese: '哪个队赢了比赛？' },
    { words: [{ en: 'Who', cn: '谁' }, { en: 'is coming', cn: '要来' }, { en: 'to the party?', cn: '参加派对？' }], correct: ['Who', 'is coming', 'to the party?'], chinese: '谁要来参加派对？' },
    { words: [{ en: 'What', cn: '什么' }, { en: 'is', cn: '在' }, { en: 'on the table?', cn: '桌子上？' }], correct: ['What', 'is', 'on the table?'], chinese: '桌子上有什么？' },
];

const otherPracticeData = [
    { words: [{ en: 'Where did', cn: '哪里' }, { en: 'you', cn: '你' }, { en: 'go yesterday?', cn: '昨天去了？' }], correct: ['Where did', 'you', 'go yesterday?'], chinese: '你昨天去哪里了？' },
    { words: [{ en: 'What are', cn: '什么' }, { en: 'you', cn: '你' }, { en: 'doing?', cn: '正在做？' }], correct: ['What are', 'you', 'doing?'], chinese: '你在做什么？' },
    { words: [{ en: 'When will', cn: '什么时候' }, { en: 'she', cn: '她' }, { en: 'arrive?', cn: '到达？' }], correct: ['When will', 'she', 'arrive?'], chinese: '她什么时候到？' },
    { words: [{ en: 'Why', cn: '为什么' }, { en: 'is', cn: '是' }, { en: 'he sad?', cn: '他伤心？' }], correct: ['Why', 'is', 'he sad?'], chinese: '他为什么伤心？' },
    { words: [{ en: 'How do you', cn: '你怎么' }, { en: 'feel', cn: '感觉' }, { en: 'today?', cn: '今天？' }], correct: ['How do you', 'feel', 'today?'], chinese: '你今天感觉怎么样？' },
];

const mixedPracticeData = [
    { words: [{ en: 'What is', cn: '什么是' }, { en: 'your', cn: '你的' }, { en: 'name?', cn: '名字？' }], correct: ['What is', 'your', 'name?'], chinese: '你叫什么名字？' },
    { words: [{ en: 'Where did', cn: '哪里' }, { en: 'he', cn: '他' }, { en: 'go?', cn: '去了？' }], correct: ['Where did', 'he', 'go?'], chinese: '他去哪儿了？' },
    { words: [{ en: 'Who', cn: '谁' }, { en: 'ate', cn: '吃了' }, { en: 'the cake?', cn: '蛋糕？' }], correct: ['Who', 'ate', 'the cake?'], chinese: '谁吃了蛋糕？' },
    { words: [{ en: 'When is', cn: '什么时候是' }, { en: 'your', cn: '你的' }, { en: 'birthday?', cn: '生日？' }], correct: ['When is', 'your', 'birthday?'], chinese: '你的生日是什么时候？' },
    { words: [{ en: 'Why', cn: '为什么' }, { en: 'are you', cn: '你' }, { en: 'late?', cn: '迟到了？' }], correct: ['Why', 'are you', 'late?'], chinese: '你为什么迟到了？' },
    { words: [{ en: 'How do you', cn: '你怎么' }, { en: 'spell', cn: '拼写' }, { en: 'that?', cn: '那个？' }], correct: ['How do you', 'spell', 'that?'], chinese: '那个单词你怎么拼写？' },
    { words: [{ en: 'Which book', cn: '哪本书' }, { en: 'is', cn: '是' }, { en: 'yours?', cn: '你的？' }], correct: ['Which book', 'is', 'yours?'], chinese: '哪本书是你的？' },
    { words: [{ en: 'What made', cn: '什么使' }, { en: 'you', cn: '你' }, { en: 'happy?', cn: '开心？' }], correct: ['What made', 'you', 'happy?'], chinese: '是什么让你开心？' },
];

export const WhQuestionsContent: React.FC<WhQuestionsContentProps> = ({ onBack, themeColor }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    const handleIntermediateComplete = () => {
        // A dummy function to pass to intermediate practices. 
        // The user is guided by text to scroll down.
    };

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

            <LessonTitle>❓ 特殊疑问句 (Wh- Questions)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>特殊疑问句用于获取具体信息，而不是简单的“是”或“否”。它们以疑问词 (Wh- words) 开头，如 Who, What, Where, When, Why, How。这是获取信息、进行深入交流的核心句型！</p>
            </WhyLearnSection>
            
            {/* --- Rule 1 --- */}
            <RuleCard themeColor={themeColor}>
                <RuleTitle>结构 1: 疑问词作主语</RuleTitle>
                <RuleExplanation>当疑问词 Who, What, Which 是句子的主语时，语序不变，直接构成问句。</RuleExplanation>
                <ExamplePair>
                    <FormulaText><strong>疑问词 (主语)</strong></FormulaText> <Arrow themeColor={themeColor}>+</Arrow> <FormulaText><strong>谓语 + ... ?</strong></FormulaText>
                </ExamplePair>
            </RuleCard>
            <ExamplesSection>
                <SectionTitle>📝 例子 (Examples)</SectionTitle>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish><strong>Who</strong> broke the window?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('Who broke the window?')}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>谁打破了窗户？</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish><strong>What</strong> happened next?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('What happened next?')}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>接下来发生了什么？</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish><strong>Which</strong> car looks better?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('Which car looks better?')}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>哪辆车看起来更好？</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={handleIntermediateComplete}
                practiceData={subjectPracticeData}
                title="🎯 练习 1: 疑问词作主语"
                subtitle="用下面的词组成正确的问句"
                completionTitle="第一组完成!"
                completionMessage="你已掌握第一种结构。请向下滚动继续学习。"
                nextButtonText="好的，继续"
            />
            
            {/* --- Rule 2 --- */}
            <RuleCard themeColor={themeColor} style={{ marginTop: '40px' }}>
                <RuleTitle>结构 2: 疑问词作其他成分</RuleTitle>
                <RuleExplanation>当疑问词作宾语、状语等其他成分时，需要借助动词 (be, do/does/did, can 等) 并将其置于主语之前。</RuleExplanation>
                <ExamplePair>
                    <FormulaText><strong>疑问词</strong></FormulaText> <Arrow themeColor={themeColor}>+</Arrow> <FormulaText><strong>助动词</strong></FormulaText><Arrow themeColor={themeColor}>+</Arrow> <FormulaText><strong>主语 + ... ?</strong></FormulaText>
                </ExamplePair>
            </RuleCard>
            <ExamplesSection>
                <SectionTitle>📝 例子 (Examples)</SectionTitle>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish><strong>What did</strong> you eat?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('What did you eat?')}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>你吃了什么？</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish><strong>Where are</strong> you going?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('Where are you going?')}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>你要去哪里？</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish><strong>When does</strong> the movie start?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('When does the movie start?')}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>电影什么时候开始？</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={handleIntermediateComplete}
                practiceData={otherPracticeData}
                title="🎯 练习 2: 疑问词作其他成分"
                subtitle="用下面的词组成正确的问句"
                completionTitle="第二组完成!"
                completionMessage="你已掌握第二种结构。准备好最终的综合练习了吗？"
                nextButtonText="准备好了！"
            />

            {/* --- Mixed Practice --- */}
            <SectionTitle style={{ marginTop: '40px', textAlign: 'center', fontSize: '1.5em' }}>最后冲刺：综合练习</SectionTitle>
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onBack}
                practiceData={mixedPracticeData}
                title="🎯 综合练习"
                subtitle="用下面的词块组成正确的问句"
                completionTitle="🎉 Awesome!"
                completionMessage="你已经掌握了特殊疑问句的构成！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};