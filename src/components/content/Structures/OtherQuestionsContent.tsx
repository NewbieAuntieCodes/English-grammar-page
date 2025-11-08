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
import { RuleCard, RuleTitle, RuleExplanation } from '../Tenses/PastTenseContent.styles';
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';

interface OtherQuestionsContentProps {
    onBack: () => void;
    themeColor: string;
}

// Practice Data
const wouldShouldPracticeData = [
    { words: [{ en: 'Would you', cn: '你愿意' }, { en: 'help me', cn: '帮助我' }, { en: 'with this box?', cn: '拿这个箱子吗？' }], correct: ['Would you', 'help me', 'with this box?'], chinese: '你愿意帮我拿这个箱子吗？' },
    { words: [{ en: 'Should I', cn: '我应该' }, { en: 'buy', cn: '买' }, { en: 'the new phone?', cn: '新手机吗？' }], correct: ['Should I', 'buy', 'the new phone?'], chinese: '我应该买这部新手机吗？' },
    { words: [{ en: 'Would you like', cn: '你想要' }, { en: 'to go to', cn: '去' }, { en: 'the movies?', cn: '看电影吗？' }], correct: ['Would you like', 'to go to', 'the movies?'], chinese: '你想去看电影吗？' },
    { words: [{ en: 'What should I do', cn: '我该做什么' }, { en: 'to improve', cn: '来提高' }, { en: 'my English?', cn: '我的英语？' }], correct: ['What should I do', 'to improve', 'my English?'], chinese: '我该怎么做才能提高我的英语？' },
];

const howOftenPracticeData = [
    { words: [{ en: 'How often', cn: '多久一次' }, { en: 'do you', cn: '你' }, { en: 'read books?', cn: '读书？' }], correct: ['How often', 'do you', 'read books?'], chinese: '你多久读一次书？' },
    { words: [{ en: 'How often', cn: '多久一次' }, { en: 'does she visit', cn: '她探望' }, { en: 'her grandparents?', cn: '她的祖父母？' }], correct: ['How often', 'does she visit', 'her grandparents?'], chinese: '她多久探望一次祖父母？' },
    { words: [{ en: 'How often', cn: '多久一次' }, { en: 'should I water', cn: '我应该浇水' }, { en: 'this plant?', cn: '这株植物？' }], correct: ['How often', 'should I water', 'this plant?'], chinese: '我应该多久给这株植物浇一次水？' },
    { words: [{ en: 'How often', cn: '多久一次' }, { en: 'do they play', cn: '他们玩' }, { en: 'basketball?', cn: '篮球？' }], correct: ['How often', 'do they play', 'basketball?'], chinese: '他们多久打一次篮球？' },
];

const howAdjPracticeData = [
    { words: [{ en: 'How big', cn: '多大' }, { en: 'is your', cn: '是你的' }, { en: 'house?', cn: '房子？' }], correct: ['How big', 'is your', 'house?'], chinese: '你的房子有多大？' },
    { words: [{ en: 'How long', cn: '多久' }, { en: 'will the journey', cn: '旅程将' }, { en: 'take?', cn: '花费？' }], correct: ['How long', 'will the journey', 'take?'], chinese: '这次旅程需要多长时间？' },
    { words: [{ en: 'How important', cn: '多重要' }, { en: 'is it to', cn: '是' }, { en: 'learn English?', cn: '学习英语？' }], correct: ['How important', 'is it to', 'learn English?'], chinese: '学习英语有多重要？' },
    { words: [{ en: 'How old', cn: '多大' }, { en: 'is your', cn: '是你的' }, { en: 'brother?', cn: '哥哥？' }], correct: ['How old', 'is your', 'brother?'], chinese: '你哥哥多大了？' },
];

const mixedPracticeData = [
    { words: [{ en: 'Would you like', cn: '你想要' }, { en: 'another cup of coffee?', cn: '再来一杯咖啡吗？' }], correct: ['Would you like', 'another cup of coffee?'], chinese: '你想要再来一杯咖啡吗？' },
    { words: [{ en: 'How often', cn: '多久一次' }, { en: 'do you check', cn: '你检查' }, { en: 'your email?', cn: '你的邮件？' }], correct: ['How often', 'do you check', 'your email?'], chinese: '你多久查一次邮件？' },
    { words: [{ en: 'Should I', cn: '我应该' }, { en: 'apologize', cn: '道歉' }, { en: 'to her?', cn: '向她？' }], correct: ['Should I', 'apologize', 'to her?'], chinese: '我应该向她道歉吗？' },
    { words: [{ en: 'How long', cn: '多长' }, { en: 'is the', cn: '是' }, { en: 'Great Wall?', cn: '长城？' }], correct: ['How long', 'is the', 'Great Wall?'], chinese: '长城有多长？' },
    { words: [{ en: 'What should I', cn: '我应该穿什么' }, { en: 'wear to the party?', cn: '去派对？' }], correct: ['What should I', 'wear to the party?'], chinese: '我应该穿什么去参加派对？' },
    { words: [{ en: 'Would you mind', cn: '你介意' }, { en: 'closing the door?', cn: '关门吗？' }], correct: ['Would you mind', 'closing the door?'], chinese: '你介意关上门吗？' },
    { words: [{ en: 'How important', cn: '多重要' }, { en: 'is this project', cn: '这个项目' }, { en: 'to you?', cn: '对你来说？' }], correct: ['How important', 'is this project', 'to you?'], chinese: '这个项目对你来说有多重要？' },
    { words: [{ en: 'How often', cn: '多久一次' }, { en: 'does it rain', cn: '下雨' }, { en: 'in summer here?', cn: '在夏天这里？' }], correct: ['How often', 'does it rain', 'in summer here?'], chinese: '这里夏天多久下一次雨？' },
];


export const OtherQuestionsContent: React.FC<OtherQuestionsContentProps> = ({ onBack, themeColor }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    
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

            <LessonTitle>🤔 其他常见疑问句</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>除了基本的 Yes/No 和 Wh- 问题，英语中还有许多常用的提问结构，用于提出礼貌的请求、寻求建议或询问频率和程度。掌握这些句式能让你的交流更自然、更地道。</p>
            </WhyLearnSection>
            
            {/* --- Section 1 --- */}
            <RuleCard themeColor={themeColor}>
                <RuleTitle>"Would" 和 "Should" - 礼貌提问与建议</RuleTitle>
                <RuleExplanation><strong>Would:</strong> 用于礼貌地提出请求或邀请。<br/><strong>Should:</strong> 用于征求建议或意见。</RuleExplanation>
            </RuleCard>
            <ExamplesSection>
                <ExampleItem themeColor={themeColor}><ExampleHeader><ExampleEnglish><strong>Would</strong> you like some tea?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('Would you like some tea?')}>🔊</SpeakButton></ExampleHeader><ExampleChinese>你想喝点茶吗？</ExampleChinese></ExampleItem>
                <ExampleItem themeColor={themeColor}><ExampleHeader><ExampleEnglish><strong>Would</strong> you please open the window?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('Would you please open the window?')}>🔊</SpeakButton></ExampleHeader><ExampleChinese>请你打开窗户好吗？</ExampleChinese></ExampleItem>
                <ExampleItem themeColor={themeColor}><ExampleHeader><ExampleEnglish><strong>Should</strong> I call him now?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('Should I call him now?')}>🔊</SpeakButton></ExampleHeader><ExampleChinese>我现在应该给他打电话吗？</ExampleChinese></ExampleItem>
            </ExamplesSection>
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={handleIntermediateComplete}
                practiceData={wouldShouldPracticeData}
                title="🎯 练习 1: Would & Should"
                subtitle="用下面的词组成正确的问句"
                completionTitle="第一组完成!"
                completionMessage="你已掌握 Would/Should 问句。请向下滚动继续学习。"
                nextButtonText="好的，继续"
            />
            
            {/* --- Section 2 --- */}
            <RuleCard themeColor={themeColor} style={{ marginTop: '40px' }}>
                <RuleTitle>"How often" - 询问频率</RuleTitle>
                <RuleExplanation>用于询问动作发生的频率。结构: `How often + do/does/did + 主语 + 动词...?`</RuleExplanation>
            </RuleCard>
            <ExamplesSection>
                <ExampleItem themeColor={themeColor}><ExampleHeader><ExampleEnglish><strong>How often</strong> do you go to the gym?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('How often do you go to the gym?')}>🔊</SpeakButton></ExampleHeader><ExampleChinese>你多久去一次健身房？</ExampleChinese></ExampleItem>
                <ExampleItem themeColor={themeColor}><ExampleHeader><ExampleEnglish><strong>How often</strong> does he call his parents?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('How often does he call his parents?')}>🔊</SpeakButton></ExampleHeader><ExampleChinese>他多久给父母打一次电话？</ExampleChinese></ExampleItem>
                <ExampleItem themeColor={themeColor}><ExampleHeader><ExampleEnglish><strong>How often</strong> did you travel last year?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('How often did you travel last year?')}>🔊</SpeakButton></ExampleHeader><ExampleChinese>你去年旅行了多少次？</ExampleChinese></ExampleItem>
            </ExamplesSection>
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={handleIntermediateComplete}
                practiceData={howOftenPracticeData}
                title="🎯 练习 2: How often"
                subtitle="用下面的词组成正确的问句"
                completionTitle="第二组完成!"
                completionMessage="你已掌握 How often 问句。请向下滚动继续学习。"
                nextButtonText="好的，继续"
            />

            {/* --- Section 3 --- */}
            <RuleCard themeColor={themeColor} style={{ marginTop: '40px' }}>
                <RuleTitle>"How + Adjective" - 询问程度</RuleTitle>
                <RuleExplanation>用于询问事物的程度，如大小、长短、重要性等。结构: `How + 形容词 + be/动词 + 主语...?`</RuleExplanation>
            </RuleCard>
            <ExamplesSection>
                <ExampleItem themeColor={themeColor}><ExampleHeader><ExampleEnglish><strong>How important</strong> is this meeting?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('How important is this meeting?')}>🔊</SpeakButton></ExampleHeader><ExampleChinese>这次会议有多重要？</ExampleChinese></ExampleItem>
                <ExampleItem themeColor={themeColor}><ExampleHeader><ExampleEnglish><strong>How tall</strong> are you?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('How tall are you?')}>🔊</SpeakButton></ExampleHeader><ExampleChinese>你有多高？</ExampleChinese></ExampleItem>
                <ExampleItem themeColor={themeColor}><ExampleHeader><ExampleEnglish><strong>How difficult</strong> was the exam?</ExampleEnglish><SpeakButton onClick={() => handleSpeak('How difficult was the exam?')}>🔊</SpeakButton></ExampleHeader><ExampleChinese>考试有多难？</ExampleChinese></ExampleItem>
            </ExamplesSection>
             <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={handleIntermediateComplete}
                practiceData={howAdjPracticeData}
                title="🎯 练习 3: How + Adjective"
                subtitle="用下面的词组成正确的问句"
                completionTitle="第三组完成!"
                completionMessage="你已掌握 How + Adjective 问句。准备好最终的综合练习了吗？"
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
                completionMessage="你已经掌握了这些常见的疑问句式！"
                nextButtonText="返回列表"
            />

        </LessonContainer>
    );
};