
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
import { RuleCard, RuleTitle, RuleExplanation, ExamplePair, Verb, Arrow } from '../Tenses/PastTenseContent.styles';
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';

interface YesNoQuestionsContentProps {
    onBack: () => void;
    themeColor: string;
}

const beVerbPracticeData = [
    { words: [{ en: 'Are', cn: '是' }, { en: 'you', cn: '你' }, { en: 'a student?', cn: '一个学生吗？' }], correct: ['Are', 'you', 'a student?'], chinese: '你是一名学生吗？' },
    { words: [{ en: 'Was', cn: '是' }, { en: 'he', cn: '他' }, { en: 'tired yesterday?', cn: '昨天累吗？' }], correct: ['Was', 'he', 'tired yesterday?'], chinese: '他昨天累吗？' },
    { words: [{ en: 'Is', cn: '是' }, { en: 'the cat', cn: '这只猫' }, { en: 'sleeping?', cn: '在睡觉吗？' }], correct: ['Is', 'the cat', 'sleeping?'], chinese: '猫在睡觉吗？' },
    { words: [{ en: 'Were', cn: '是' }, { en: 'they', cn: '他们' }, { en: 'happy?', cn: '开心吗？' }], correct: ['Were', 'they', 'happy?'], chinese: '他们开心吗？' },
];

const actionVerbPracticeData = [
    { words: [{ en: 'Do', cn: '(助动词)' }, { en: 'they', cn: '他们' }, { en: 'play football?', cn: '踢足球吗？' }], correct: ['Do', 'they', 'play football?'], chinese: '他们踢足球吗？' },
    { words: [{ en: 'Does', cn: '(助动词)' }, { en: 'she', cn: '她' }, { en: 'like music?', cn: '喜欢音乐吗？' }], correct: ['Does', 'she', 'like music?'], chinese: '她喜欢音乐吗？' },
    { words: [{ en: 'Did', cn: '(助动词)' }, { en: 'you', cn: '你' }, { en: 'see the movie?', cn: '看那部电影吗？' }], correct: ['Did', 'you', 'see the movie?'], chinese: '你看了那部电影吗？' },
    { words: [{ en: 'Do', cn: '(助动词)' }, { en: 'you', cn: '你' }, { en: 'understand?', cn: '明白吗？' }], correct: ['Do', 'you', 'understand?'], chinese: '你明白吗？' },
];

const modalVerbPracticeData = [
    { words: [{ en: 'Can', cn: '能' }, { en: 'he', cn: '他' }, { en: 'speak English?', cn: '说英语吗？' }], correct: ['Can', 'he', 'speak English?'], chinese: '他会说英语吗？' },
    { words: [{ en: 'Will', cn: '会' }, { en: 'she', cn: '她' }, { en: 'come to the party?', cn: '来派对吗？' }], correct: ['Will', 'she', 'come to the party?'], chinese: '她会来参加派对吗？' },
    { words: [{ en: 'Should', cn: '应该' }, { en: 'we', cn: '我们' }, { en: 'leave now?', cn: '现在离开吗？' }], correct: ['Should', 'we', 'leave now?'], chinese: '我们现在应该离开吗？' },
    { words: [{ en: 'May', cn: '可以' }, { en: 'I', cn: '我' }, { en: 'use your pen?', cn: '用你的笔吗？' }], correct: ['May', 'I', 'use your pen?'], chinese: '我可以用你的笔吗？' },
];

const mixedPracticeData = [
    { words: [{ en: 'Is', cn: '是' }, { en: 'it', cn: '天气' }, { en: 'cold outside?', cn: '外面冷吗？' }], correct: ['Is', 'it', 'cold outside?'], chinese: '外面冷吗？' },
    { words: [{ en: 'Did', cn: '(助动词)' }, { en: 'they finish', cn: '他们完成了' }, { en: 'their homework?', cn: '他们的作业吗？' }], correct: ['Did', 'they finish', 'their homework?'], chinese: '他们完成作业了吗？' },
    { words: [{ en: 'Can', cn: '能' }, { en: 'you', cn: '你' }, { en: 'help me?', cn: '帮我吗？' }], correct: ['Can', 'you', 'help me?'], chinese: '你能帮我吗？' },
    { words: [{ en: 'Were', cn: '是' }, { en: 'the children', cn: '孩子们' }, { en: 'noisy?', cn: '吵闹吗？' }], correct: ['Were', 'the children', 'noisy?'], chinese: '孩子们吵闹吗？' },
    { words: [{ en: 'Does', cn: '(助动词)' }, { en: 'he', cn: '他' }, { en: 'work here?', cn: '在这里工作吗？' }], correct: ['Does', 'he', 'work here?'], chinese: '他在这里工作吗？' },
    { words: [{ en: 'Will', cn: '会' }, { en: 'you', cn: '你' }, { en: 'call me later?', cn: '稍后给我打电话吗？' }], correct: ['Will', 'you', 'call me later?'], chinese: '你稍后会给我打电话吗？' },
    { words: [{ en: 'Is', cn: '是' }, { en: 'this', cn: '这' }, { en: 'your book?', cn: '你的书吗？' }], correct: ['Is', 'this', 'your book?'], chinese: '这是你的书吗？' },
    { words: [{ en: 'Do', cn: '(助动词)' }, { en: 'you', cn: '你' }, { en: 'need help?', cn: '需要帮助吗？' }], correct: ['Do', 'you', 'need help?'], chinese: '你需要帮助吗？' },
];

export const YesNoQuestionsContent: React.FC<YesNoQuestionsContentProps> = ({ onBack, themeColor }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    
    // A dummy function to pass to intermediate practices. The user is guided by text to scroll down.
    const handleIntermediateComplete = () => {};

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

            {/* --- Rule 1 --- */}
            <RuleCard themeColor={themeColor}>
                <RuleTitle>规则 1: 含有 Be 动词</RuleTitle>
                <RuleExplanation>如果句子里有 be 动词 (am, is, are, was, were)，直接把 be 动词提到句首。</RuleExplanation>
                <ExamplePair>
                    <Verb>He <strong>is</strong> a doctor.</Verb> <Arrow themeColor={themeColor}>→</Arrow> <Verb><strong>Is</strong> he a doctor?</Verb>
                </ExamplePair>
            </RuleCard>
            <ExamplesSection>
                <SectionTitle>📝 更多例子 (More Examples)</SectionTitle>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish><strong>Are</strong> you happy?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('Are you happy?')}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>你是开心的吗？</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish><strong>Is</strong> she from Canada?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('Is she from Canada?')}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>她是加拿大人吗？</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish><strong>Were</strong> they at the party last night?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('Were they at the party last night?')}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>他们昨晚在派对上吗？</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={handleIntermediateComplete}
                practiceData={beVerbPracticeData}
                title="🎯 练习 1: Be 动词"
                subtitle="用下面的词组成正确的问句"
                completionTitle="第一组完成!"
                completionMessage="你已掌握 Be 动词问句。请向下滚动继续学习。"
                nextButtonText="好的，继续"
            />
            
            {/* --- Rule 2 --- */}
            <RuleCard themeColor={themeColor} style={{ marginTop: '40px' }}>
                <RuleTitle>规则 2: 含有实义动词</RuleTitle>
                <RuleExplanation>如果句子里只有实义动词 (如 run, eat, play)，需要在句首借助动词 <strong>do, does, did</strong>，原句动词变回原型。</RuleExplanation>
                <ExamplePair>
                    <Verb>She <strong>went</strong> home.</Verb> <Arrow themeColor={themeColor}>→</Arrow> <Verb><strong>Did</strong> she <strong>go</strong> home?</Verb>
                </ExamplePair>
            </RuleCard>
            <ExamplesSection>
                <SectionTitle>📝 更多例子 (More Examples)</SectionTitle>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish><strong>Do</strong> you like coffee?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('Do you like coffee?')}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>你喜欢咖啡吗？</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish><strong>Does</strong> he play the guitar?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('Does he play the guitar?')}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>他弹吉他吗？</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish><strong>Did</strong> they finish the project?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('Did they finish the project?')}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>他们完成项目了吗？</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={handleIntermediateComplete}
                practiceData={actionVerbPracticeData}
                title="🎯 练习 2: 实义动词"
                subtitle="用下面的词组成正确的问句"
                completionTitle="第二组完成!"
                completionMessage="你已掌握实义动词问句。请向下滚动继续学习。"
                nextButtonText="好的，继续"
            />

            {/* --- Rule 3 --- */}
            <RuleCard themeColor={themeColor} style={{ marginTop: '40px' }}>
                <RuleTitle>规则 3: 含有情态动词</RuleTitle>
                <RuleExplanation>如果句子里有情态动词 (can, will, should, may 等)，直接把情态动词提到句首。</RuleExplanation>
                <ExamplePair>
                    <Verb>He <strong>can</strong> swim.</Verb> <Arrow themeColor={themeColor}>→</Arrow> <Verb><strong>Can</strong> he swim?</Verb>
                </ExamplePair>
            </RuleCard>
            <ExamplesSection>
                <SectionTitle>📝 更多例子 (More Examples)</SectionTitle>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish><strong>Will</strong> you be there tomorrow?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('Will you be there tomorrow?')}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>你明天会去那里吗？</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish><strong>Should</strong> I call her?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('Should I call her?')}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>我应该给她打电话吗？</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish><strong>May</strong> I open the window?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('May I open the window?')}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>我可以打开窗户吗？</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
             <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={handleIntermediateComplete}
                practiceData={modalVerbPracticeData}
                title="🎯 练习 3: 情态动词"
                subtitle="用下面的词组成正确的问句"
                completionTitle="第三组完成!"
                completionMessage="你已掌握情态动词问句。准备好最终的综合练习了吗？"
                nextButtonText="准备好了！"
            />
            
            {/* --- Mixed Practice --- */}
            <SectionTitle style={{ marginTop: '40px', textAlign: 'center', fontSize: '1.5em' }}>最后冲刺：综合练习</SectionTitle>
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onBack}
                practiceData={mixedPracticeData}
                title="🎯 综合练习"
                subtitle="用下面的词组成正确的问句"
                completionTitle="🎉 全部完成!"
                completionMessage="你已经完全掌握了一般疑问句的构成！"
                nextButtonText="返回列表"
            />

        </LessonContainer>
    );
};
