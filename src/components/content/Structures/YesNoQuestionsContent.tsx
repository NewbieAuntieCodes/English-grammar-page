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
import { RuleContainer, RuleCard, RuleTitle, RuleExplanation, ExamplePair, Verb, Arrow } from '../Tenses/PastTenseContent.styles';
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';

interface YesNoQuestionsContentProps {
    onBack: () => void;
    themeColor: string;
}

const practiceData = [
    { words: [{ en: 'Are', cn: '是' }, { en: 'you', cn: '你' }, { en: 'a student?', cn: '一个学生吗？' }], correct: ['Are', 'you', 'a student?'], chinese: '你是一名学生吗？' },
    { words: [{ en: 'Was', cn: '是' }, { en: 'he', cn: '他' }, { en: 'tired yesterday?', cn: '昨天累吗？' }], correct: ['Was', 'he', 'tired yesterday?'], chinese: '他昨天累吗？' },
    { words: [{ en: 'Do', cn: '(助动词)' }, { en: 'they', cn: '他们' }, { en: 'play football?', cn: '踢足球吗？' }], correct: ['Do', 'they', 'play football?'], chinese: '他们踢足球吗？' },
    { words: [{ en: 'Does', cn: '(助动词)' }, { en: 'she', cn: '她' }, { en: 'like music?', cn: '喜欢音乐吗？' }], correct: ['Does', 'she', 'like music?'], chinese: '她喜欢音乐吗？' },
    { words: [{ en: 'Did', cn: '(助动词)' }, { en: 'you', cn: '你' }, { en: 'see the movie?', cn: '看那部电影吗？' }], correct: ['Did', 'you', 'see the movie?'], chinese: '你看了那部电影吗？' },
    { words: [{ en: 'Can', cn: '能' }, { en: 'he', cn: '他' }, { en: 'speak English?', cn: '说英语吗？' }], correct: ['Can', 'he', 'speak English?'], chinese: '他会说英语吗？' },
    { words: [{ en: 'Will', cn: '会' }, { en: 'she', cn: '她' }, { en: 'come to the party?', cn: '来派对吗？' }], correct: ['Will', 'she', 'come to the party?'], chinese: '她会来参加派对吗？' },
    { words: [{ en: 'Is', cn: '是' }, { en: 'the cat', cn: '这只猫' }, { en: 'sleeping?', cn: '在睡觉吗？' }], correct: ['Is', 'the cat', 'sleeping?'], chinese: '猫在睡觉吗？' },
];

export const YesNoQuestionsContent: React.FC<YesNoQuestionsContentProps> = ({ onBack, themeColor }) => {
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

            <LessonTitle>❓ 一般疑问句 (Yes/No Questions)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>一般疑问句是英语中最基本的提问方式，用来确认信息，得到的回答通常是“是”或“否”。掌握它，你就能向别人提问，开启真正的对话！</p>
            </WhyLearnSection>
            
            <SectionTitle>📝 三种核心规则</SectionTitle>

            <RuleContainer>
                <RuleCard themeColor={themeColor}>
                    <RuleTitle>规则 1: 含有 Be 动词</RuleTitle>
                    <RuleExplanation>如果句子里有 be 动词 (am, is, are, was, were)，直接把 be 动词提到句首。</RuleExplanation>
                    <ExamplePair>
                        <Verb>He <strong>is</strong> a doctor.</Verb> <Arrow themeColor={themeColor}>→</Arrow> <Verb><strong>Is</strong> he a doctor?</Verb>
                    </ExamplePair>
                    <ExamplePair>
                        <Verb>They <strong>were</strong> happy.</Verb> <Arrow themeColor={themeColor}>→</Arrow> <Verb><strong>Were</strong> they happy?</Verb>
                    </ExamplePair>
                </RuleCard>
                <RuleCard themeColor={themeColor}>
                    <RuleTitle>规则 2: 含有实义动词</RuleTitle>
                    <RuleExplanation>如果句子里只有实义动词 (如 run, eat, play)，需要在句首借助动词 <strong>do, does, did</strong>，原句动词变回原型。</RuleExplanation>
                    <ExamplePair>
                        <Verb>You <strong>like</strong> coffee.</Verb> <Arrow themeColor={themeColor}>→</Arrow> <Verb><strong>Do</strong> you <strong>like</strong> coffee?</Verb>
                    </ExamplePair>
                    <ExamplePair>
                        <Verb>She <strong>went</strong> home.</Verb> <Arrow themeColor={themeColor}>→</Arrow> <Verb><strong>Did</strong> she <strong>go</strong> home?</Verb>
                    </ExamplePair>
                </RuleCard>
                 <RuleCard themeColor={themeColor} style={{ gridColumn: '1 / -1' }}>
                    <RuleTitle>规则 3: 含有情态动词</RuleTitle>
                    <RuleExplanation>如果句子里有情态动词 (can, will, should, may 等)，直接把情态动词提到句首。</RuleExplanation>
                    <ExamplePair>
                        <Verb>He <strong>can</strong> swim.</Verb> <Arrow themeColor={themeColor}>→</Arrow> <Verb><strong>Can</strong> he swim?</Verb>
                    </ExamplePair>
                    <ExamplePair>
                        <Verb>They <strong>will</strong> come.</Verb> <Arrow themeColor={themeColor}>→</Arrow> <Verb><strong>Will</strong> they come?</Verb>
                    </ExamplePair>
                </RuleCard>
            </RuleContainer>

            <ExamplesSection>
                <SectionTitle>📝 例子 (Examples)</SectionTitle>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>Are</strong> you from China?</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Are you from China?'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>你来自中国吗？ (Be 动词)</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>Does</strong> he play the guitar?</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Does he play the guitar?'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他弹吉他吗？(实义动词)</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>Can</strong> you help me?</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Can you help me?'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>你能帮我吗？(情态动词)</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>

            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onBack}
                practiceData={practiceData}
                title="🎯 练习：构建一般疑问句"
                subtitle="用下面的词组成正确的问句"
                completionTitle="🎉 Fantastic!"
                completionMessage="你已经掌握了一般疑问句的构成！"
                nextButtonText="返回列表"
            />

        </LessonContainer>
    );
};
