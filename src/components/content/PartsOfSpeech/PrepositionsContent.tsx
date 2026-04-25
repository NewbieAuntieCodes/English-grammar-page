/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import {
    LessonContainer, BackButton, LessonTitle, SectionTitle, WhyLearnSection,
} from './PartsOfSpeechLesson.styles';
import { WordSelectorPractice } from '../../practice/WordSelectorPractice';
import { MultipleChoicePractice } from '../../practice/MultipleChoicePractice';

interface PrepositionsContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const QuickGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 18px;
    margin: 24px 0;
`;

const RuleCard = styled.div<{ themeColor: string }>`
    background: white;
    border-radius: 18px;
    padding: 20px;
    border: 2px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
`;

const RuleTitle = styled.div<{ themeColor: string }>`
    font-size: 1.6em;
    font-weight: 800;
    color: ${props => props.themeColor};
    text-align: center;
    margin-bottom: 12px;
`;

const RuleHint = styled.div`
    text-align: center;
    font-size: 0.98em;
    color: #4a5568;
    font-weight: 700;
`;

const RuleExamples = styled.div`
    margin-top: 10px;
    text-align: center;
    color: #718096;
    font-size: 0.92em;
    line-height: 1.7;
`;

const Scene = styled.div`
    height: 88px;
    position: relative;
    margin: 0 auto 14px;
`;

const InFrame = styled.div`
    width: 92px;
    height: 72px;
    border: 4px solid #4ecdc4;
    border-radius: 12px;
    margin: 0 auto;
    position: relative;
`;

const InBall = styled.div`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ff8a5b;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const OnLine = styled.div`
    width: 110px;
    height: 8px;
    border-radius: 999px;
    background: #4ecdc4;
    position: absolute;
    left: 50%;
    top: 52px;
    transform: translateX(-50%);
`;

const OnBall = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ff8a5b;
    position: absolute;
    left: 50%;
    top: 32px;
    transform: translateX(-50%);
`;

const AtTarget = styled.div`
    width: 70px;
    height: 70px;
    border: 4px solid #4ecdc4;
    border-radius: 50%;
    margin: 0 auto;
    position: relative;
`;

const AtCenter = styled.div`
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #ff8a5b;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const WordGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
    margin: 20px 0 28px;
`;

const WordCard = styled.div<{ themeColor: string }>`
    background: white;
    border-radius: 14px;
    padding: 14px 12px;
    text-align: center;
    border: 2px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);
`;

const WordMain = styled.div<{ themeColor: string }>`
    color: ${props => props.themeColor};
    font-size: 1.2em;
    font-weight: 800;
`;

const WordSub = styled.div`
    color: #718096;
    font-size: 0.9em;
    margin-top: 4px;
    font-weight: 700;
`;

const IntroExamples = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 14px;
    margin: 20px 0 28px;
`;

const IntroExampleCard = styled.div`
    background: white;
    border-radius: 14px;
    padding: 16px 18px;
    border: 2px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);
`;

const IntroExampleEnglish = styled.div`
    color: #2d3748;
    font-weight: 700;
    line-height: 1.7;
`;

const IntroExampleChinese = styled.div`
    color: #718096;
    margin-top: 6px;
    line-height: 1.6;
`;

const practiceData = [
    { sentence: 'The cat is on the table.', targetWords: ['on'], prompt: '介词 (Preposition)', chinese: "猫在桌子上。" },
    { sentence: 'I go to school.', targetWords: ['to'], prompt: '介词 (Preposition)', chinese: "我去上学。" },
    { sentence: 'He lives in London.', targetWords: ['in'], prompt: '介词 (Preposition)', chinese: "他住在伦敦。" },
    { sentence: 'The book is under the bed.', targetWords: ['under'], prompt: '介词 (Preposition)', chinese: "书在床下。" },
    { sentence: "We will meet at 8 o'clock.", targetWords: ['at'], prompt: '介词 (Preposition)', chinese: "我们八点钟见。" },
    { sentence: 'I am from China.', targetWords: ['from'], prompt: '介词 (Preposition)', chinese: "我来自中国。" },
    { sentence: 'We will meet after school.', targetWords: ['after'], prompt: '介词 (Preposition)', chinese: "我们放学后见。" },
    { sentence: 'The ball is behind the door.', targetWords: ['behind'], prompt: '介词 (Preposition)', chinese: "球在门后面。" },
];

const placeMiniPracticeData = [
    {
        question: 'The fish is ___ the water.',
        choices: [
            { text: 'in', isCorrect: true },
            { text: 'on', isCorrect: false },
            { text: 'at', isCorrect: false },
        ],
        chineseHint: '想一想：鱼是在水的里面，还是在水面上，还是在一个时间点？',
    },
    {
        question: 'The lamp is ___ the desk.',
        choices: [
            { text: 'on', isCorrect: true },
            { text: 'in', isCorrect: false },
            { text: 'at', isCorrect: false },
        ],
        chineseHint: '想一想：台灯是在桌子里面、桌子表面，还是一个具体点位？',
    },
    {
        question: 'We meet ___ 6:30.',
        choices: [
            { text: 'at', isCorrect: true },
            { text: 'in', isCorrect: false },
            { text: 'on', isCorrect: false },
        ],
        chineseHint: '注意这里说的是一个很具体的时刻，不是一整天或一段时间。',
    },
    {
        question: 'I have an English class ___ Monday.',
        choices: [
            { text: 'on', isCorrect: true },
            { text: 'at', isCorrect: false },
            { text: 'in', isCorrect: false },
        ],
        chineseHint: '注意这里说的是“星期几”这种具体的一天。',
    },
    {
        question: 'My crayons are ___ the bag.',
        choices: [
            { text: 'in', isCorrect: true },
            { text: 'on', isCorrect: false },
            { text: 'at', isCorrect: false },
        ],
        chineseHint: '想一想：蜡笔是在书包里面，还是在书包表面，还是一个地点点位？',
    },
    {
        question: 'Dad is waiting ___ the bus stop.',
        choices: [
            { text: 'at', isCorrect: true },
            { text: 'in', isCorrect: false },
            { text: 'on', isCorrect: false },
        ],
        chineseHint: '这里更像一个具体的小地点，而不是“里面”或“表面”。',
    },
];

const moreMiniPracticeData = [
    {
        question: 'The boy is ___ the door.',
        choices: [
            { text: 'behind', isCorrect: true },
            { text: 'to', isCorrect: false },
            { text: 'under', isCorrect: false },
        ],
        chineseHint: '根据位置关系判断：男孩是在门后、去门那里，还是在门口某个点？',
    },
    {
        question: 'Please go ___ the classroom now.',
        choices: [
            { text: 'to', isCorrect: true },
            { text: 'from', isCorrect: false },
            { text: 'behind', isCorrect: false },
        ],
        chineseHint: '这里表达“去某个地方”。',
    },
    {
        question: 'I am ___ Shanghai.',
        choices: [
            { text: 'from', isCorrect: true },
            { text: 'to', isCorrect: false },
            { text: 'under', isCorrect: false },
        ],
        chineseHint: '这里要表达“来自哪里”，不是位置关系。',
    },
    {
        question: 'The cat is ___ the bed.',
        choices: [
            { text: 'under', isCorrect: true },
            { text: 'before', isCorrect: false },
            { text: 'from', isCorrect: false },
        ],
        chineseHint: '根据位置关系判断：猫是在床的上面、下面，还是前后时间关系？',
    },
    {
        question: 'We play basketball ___ school.',
        choices: [
            { text: 'after', isCorrect: true },
            { text: 'behind', isCorrect: false },
            { text: 'before', isCorrect: false },
        ],
        chineseHint: '这里强调的是“在……之后”的时间关系。',
    },
    {
        question: 'Wash your hands ___ dinner.',
        choices: [
            { text: 'before', isCorrect: true },
            { text: 'after', isCorrect: false },
            { text: 'under', isCorrect: false },
        ],
        chineseHint: '这里强调的是“在……之前”的时间关系。',
    },
];

export const PrepositionsContent: React.FC<PrepositionsContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
        if ('speechSynthesis' in window) {
            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
        return () => { if ('speechSynthesis' in window) window.speechSynthesis.onvoiceschanged = null; };
    }, []);

    const handleSpeak = useCallback((text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            const usVoice = voices.find(voice => voice.lang === 'en-US');
            utterance.voice = usVoice || voices.find(voice => voice.lang.startsWith('en-')) || null;
            utterance.rate = 0.9;
            utterance.pitch = 1.1;
            window.speechSynthesis.speak(utterance);
        }
    }, [voices]);

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to List</BackButton>
            <LessonTitle>📍 Prepositions (介词)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 什么是介词？</SectionTitle>
                <p>介词是放在名词前面的“小连接词”，用来说明<strong>位置</strong>、<strong>时间</strong>、<strong>方向</strong>这些关系。</p>
                <p>你可以先把它理解成：它负责告诉我们“在哪里”“什么时候”“往哪里去”“从哪里来”。</p>
            </WhyLearnSection>

            <IntroExamples>
                <IntroExampleCard>
                    <IntroExampleEnglish>The cat is <strong>on</strong> the table.</IntroExampleEnglish>
                    <IntroExampleChinese><strong>on</strong> 告诉我们猫和桌子的<strong>位置关系</strong>。</IntroExampleChinese>
                </IntroExampleCard>
                <IntroExampleCard>
                    <IntroExampleEnglish>We meet <strong>at</strong> 7:00.</IntroExampleEnglish>
                    <IntroExampleChinese><strong>at</strong> 告诉我们见面的<strong>时间点</strong>。</IntroExampleChinese>
                </IntroExampleCard>
                <IntroExampleCard>
                    <IntroExampleEnglish>She walks <strong>to</strong> school.</IntroExampleEnglish>
                    <IntroExampleChinese><strong>to</strong> 告诉我们动作的<strong>方向</strong>。</IntroExampleChinese>
                </IntroExampleCard>
            </IntroExamples>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>👀 先做一个小练习</SectionTitle>
                <p>先不要急着分 <strong>in / on / at</strong>。先练习一件事：在句子里把介词找出来。</p>
            </WhyLearnSection>

            <WordSelectorPractice
                themeColor={themeColor}
                practiceData={practiceData}
                completionTitle="👏 Nice!"
                completionMessage="你已经会在句子里找到介词了。下面开始专门区分 in / on / at。"
                nextButtonText="继续"
                hideCompletionButton
            />

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>🎯 先看最常用的 3 个：in / on / at</SectionTitle>
                <p>这 3 个最容易混。先看图，再做题，会比直接背规则更容易记住。</p>
            </WhyLearnSection>

            <QuickGrid>
                <RuleCard themeColor={themeColor}>
                    <RuleTitle themeColor={themeColor}>IN</RuleTitle>
                    <Scene>
                        <InFrame><InBall /></InFrame>
                    </Scene>
                    <RuleHint>里面</RuleHint>
                    <RuleExamples>in the box<br />in 2026</RuleExamples>
                </RuleCard>
                <RuleCard themeColor={themeColor}>
                    <RuleTitle themeColor={themeColor}>ON</RuleTitle>
                    <Scene>
                        <OnBall />
                        <OnLine />
                    </Scene>
                    <RuleHint>表面 / 某一天</RuleHint>
                    <RuleExamples>on the desk<br />on Monday</RuleExamples>
                </RuleCard>
                <RuleCard themeColor={themeColor}>
                    <RuleTitle themeColor={themeColor}>AT</RuleTitle>
                    <Scene>
                        <AtTarget><AtCenter /></AtTarget>
                    </Scene>
                    <RuleHint>点 / 具体时刻</RuleHint>
                    <RuleExamples>at the door<br />at 7:00</RuleExamples>
                </RuleCard>
            </QuickGrid>

            <MultipleChoicePractice
                themeColor={themeColor}
                practiceData={placeMiniPracticeData}
                title="⚡ Fast Check"
                subtitle="先做 6 题，分清 in / on / at"
                completionTitle="👏 Nice!"
                completionMessage="这一组完成了。下面其他常见介词和练习都已经在页面里。"
                nextButtonText="继续"
                hideCompletionButton
            />

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>🧩 其他常见介词</SectionTitle>
                <p>除了 <strong>in / on / at</strong>，这些也很常用。先认一下，再做题。</p>
            </WhyLearnSection>

            <WordGrid>
                <WordCard themeColor={themeColor}>
                    <WordMain themeColor={themeColor}>to</WordMain>
                    <WordSub>去 / 到</WordSub>
                </WordCard>
                <WordCard themeColor={themeColor}>
                    <WordMain themeColor={themeColor}>from</WordMain>
                    <WordSub>来自</WordSub>
                </WordCard>
                <WordCard themeColor={themeColor}>
                    <WordMain themeColor={themeColor}>under</WordMain>
                    <WordSub>在下面</WordSub>
                </WordCard>
                <WordCard themeColor={themeColor}>
                    <WordMain themeColor={themeColor}>behind</WordMain>
                    <WordSub>在后面</WordSub>
                </WordCard>
                <WordCard themeColor={themeColor}>
                    <WordMain themeColor={themeColor}>after</WordMain>
                    <WordSub>在之后</WordSub>
                </WordCard>
                <WordCard themeColor={themeColor}>
                    <WordMain themeColor={themeColor}>before</WordMain>
                    <WordSub>在之前</WordSub>
                </WordCard>
            </WordGrid>

            <MultipleChoicePractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={moreMiniPracticeData}
                title="⚡ Fast Check 2"
                subtitle="再做 6 题，练熟其他常见介词"
                completionTitle="🎉 Great!"
                completionMessage="这一课的介词练习已经完成，可以进入下一课了。"
                nextButtonText="Next Lesson: Conjunctions →"
            />
        </LessonContainer>
    );
};
