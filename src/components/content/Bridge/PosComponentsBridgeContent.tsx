/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import {
    LessonContainer,
    BackButton,
    LessonTitle,
} from '../PartsOfSpeech/PartsOfSpeechLesson.styles';
import { MultipleChoicePractice } from '../../practice/MultipleChoicePractice';

interface PosComponentsBridgeContentProps {
    onBack: () => void;
    themeColor: string;
}

const hexToRgb = (hex: string) => {
    let c: any = hex.substring(1).split('');
    if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',');
};

const popIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const shake = keyframes`
    10%, 90% { transform: translate3d(-1px, 0, 0); }
    20%, 80% { transform: translate3d(2px, 0, 0); }
    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
    40%, 60% { transform: translate3d(4px, 0, 0); }
`;

const LeadBanner = styled.div<{ themeColor: string }>`
    background:
        radial-gradient(circle at top left, rgba(${props => hexToRgb(props.themeColor)}, 0.18), transparent 48%),
        linear-gradient(135deg, #f4fff9, #ffffff 62%);
    border: 1px solid rgba(${props => hexToRgb(props.themeColor)}, 0.18);
    border-radius: 24px;
    padding: 24px;
    margin: 18px 0 24px;
    box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
`;

const LeadEyebrow = styled.div<{ themeColor: string }>`
    width: fit-content;
    padding: 6px 12px;
    border-radius: 999px;
    background: rgba(${props => hexToRgb(props.themeColor)}, 0.12);
    color: ${props => props.themeColor};
    font-size: 0.88em;
    font-weight: 800;
    letter-spacing: 0.02em;
`;

const LeadTitle = styled.h3`
    margin: 12px 0 8px;
    color: #1f2937;
    font-size: 1.55em;
    line-height: 1.3;
`;

const LeadText = styled.p`
    margin: 0;
    color: #4b5563;
    line-height: 1.7;
    font-size: 1.02em;
`;

const TipGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin: 22px 0 30px;
`;

const TipCard = styled.div<{ themeColor: string }>`
    background: #ffffff;
    border-radius: 20px;
    padding: 18px;
    border: 1px solid rgba(${props => hexToRgb(props.themeColor)}, 0.12);
    box-shadow: 0 12px 26px rgba(15, 23, 42, 0.05);
`;

const TipLabel = styled.div<{ themeColor: string }>`
    width: fit-content;
    margin-bottom: 10px;
    padding: 5px 10px;
    border-radius: 999px;
    font-size: 0.82em;
    font-weight: 800;
    color: ${props => props.themeColor};
    background: rgba(${props => hexToRgb(props.themeColor)}, 0.1);
`;

const TipTitle = styled.div`
    color: #111827;
    font-size: 1.08em;
    font-weight: 800;
    line-height: 1.45;
`;

const TipExample = styled.div`
    margin-top: 10px;
    color: #6b7280;
    font-size: 0.95em;
    line-height: 1.6;
`;

const TaskStack = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin: 16px 0 28px;
`;

const TaskCard = styled.section<{ themeColor: string; practice?: boolean }>`
    position: relative;
    overflow: hidden;
    border-radius: 24px;
    padding: 24px;
    border: 1px solid rgba(${props => hexToRgb(props.themeColor)}, 0.14);
    background: ${props => props.practice
        ? `linear-gradient(135deg, rgba(${hexToRgb(props.themeColor)}, 0.12), #ffffff 58%)`
        : '#ffffff'};
    box-shadow: 0 20px 42px rgba(15, 23, 42, 0.07);
    animation: ${popIn} 0.35s ease;
`;

const TaskTopRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
`;

const StepBadge = styled.div<{ themeColor: string }>`
    min-width: 38px;
    height: 38px;
    border-radius: 12px;
    display: grid;
    place-items: center;
    background: ${props => props.themeColor};
    color: white;
    font-weight: 900;
    box-shadow: 0 10px 24px rgba(${props => hexToRgb(props.themeColor)}, 0.32);
`;

const TaskTag = styled.div<{ themeColor: string }>`
    width: fit-content;
    padding: 6px 12px;
    border-radius: 999px;
    background: rgba(${props => hexToRgb(props.themeColor)}, 0.1);
    color: ${props => props.themeColor};
    font-size: 0.84em;
    font-weight: 800;
`;

const TaskTitle = styled.h3`
    margin: 0;
    color: #111827;
    font-size: 1.28em;
    line-height: 1.35;
`;

const TaskMicroTip = styled.p`
    margin: 8px 0 0;
    color: #4b5563;
    line-height: 1.65;
    font-weight: 600;
`;

const SentenceBoard = styled.div<{ themeColor: string }>`
    margin-top: 16px;
    padding: 18px;
    border-radius: 18px;
    border: 1px solid rgba(${props => hexToRgb(props.themeColor)}, 0.12);
    background: rgba(${props => hexToRgb(props.themeColor)}, 0.04);
`;

const SentenceLabel = styled.div`
    font-size: 0.88em;
    font-weight: 800;
    color: #6b7280;
    letter-spacing: 0.02em;
    text-transform: uppercase;
`;

const SentenceText = styled.div`
    margin-top: 10px;
    color: #111827;
    font-size: 1.24em;
    font-weight: 800;
    line-height: 1.7;
`;

const TokenRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 16px;
`;

const TokenButton = styled.button<{
    themeColor: string;
    status: 'default' | 'correct' | 'wrong';
}>`
    border: none;
    border-radius: 16px;
    padding: 12px 16px;
    font-size: 1em;
    font-weight: 800;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
    background: #ffffff;
    color: #1f2937;
    box-shadow: inset 0 0 0 1px #d1d5db;

    &:hover {
        transform: translateY(-2px);
        box-shadow: inset 0 0 0 1px rgba(${props => hexToRgb(props.themeColor)}, 0.45);
    }

    ${props => props.status === 'correct' && css`
        background: ${props.themeColor};
        color: #ffffff;
        box-shadow: 0 14px 30px rgba(${hexToRgb(props.themeColor)}, 0.24);
    `}

    ${props => props.status === 'wrong' && css`
        background: #fee2e2;
        color: #991b1b;
        box-shadow: inset 0 0 0 1px #ef4444;
        animation: ${shake} 0.35s ease;
    `}
`;

const ChoiceGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 14px;
    margin-top: 18px;
`;

const ChoiceButton = styled.button<{
    themeColor: string;
    status: 'default' | 'correct' | 'wrong';
}>`
    text-align: left;
    border: none;
    border-radius: 18px;
    padding: 18px;
    min-height: 84px;
    cursor: pointer;
    font-size: 1.02em;
    font-weight: 800;
    line-height: 1.55;
    color: #1f2937;
    background: #ffffff;
    box-shadow: inset 0 0 0 1px #d1d5db;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: inset 0 0 0 1px rgba(${props => hexToRgb(props.themeColor)}, 0.42);
    }

    ${props => props.status === 'correct' && css`
        background: ${props.themeColor};
        color: #ffffff;
        box-shadow: 0 16px 30px rgba(${hexToRgb(props.themeColor)}, 0.24);
    `}

    ${props => props.status === 'wrong' && css`
        background: #fee2e2;
        color: #991b1b;
        box-shadow: inset 0 0 0 1px #ef4444;
        animation: ${shake} 0.35s ease;
    `}
`;

const CompareGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 14px;
    margin-top: 18px;
`;

const ComparePanel = styled.div<{ themeColor: string }>`
    border-radius: 20px;
    padding: 18px;
    background: #ffffff;
    border: 1px solid rgba(${props => hexToRgb(props.themeColor)}, 0.12);
`;

const CompareLabel = styled.div<{ themeColor: string }>`
    width: fit-content;
    margin-bottom: 10px;
    padding: 5px 10px;
    border-radius: 999px;
    background: rgba(${props => hexToRgb(props.themeColor)}, 0.1);
    color: ${props => props.themeColor};
    font-size: 0.82em;
    font-weight: 800;
`;

const CompareSentence = styled.div`
    font-size: 1.14em;
    font-weight: 800;
    color: #111827;
    line-height: 1.7;

    strong {
        color: #047857;
        background: #d1fae5;
        padding: 2px 8px;
        border-radius: 999px;
    }
`;

const CompareHint = styled.div`
    margin-top: 10px;
    color: #6b7280;
    line-height: 1.6;
    font-weight: 600;
`;

const FeedbackText = styled.div<{ tone: 'neutral' | 'success' | 'warning' }>`
    margin-top: 16px;
    padding: 14px 16px;
    border-radius: 16px;
    font-weight: 700;
    line-height: 1.6;
    color: ${props => {
        if (props.tone === 'success') return '#065f46';
        if (props.tone === 'warning') return '#991b1b';
        return '#4b5563';
    }};
    background: ${props => {
        if (props.tone === 'success') return '#d1fae5';
        if (props.tone === 'warning') return '#fee2e2';
        return '#f3f4f6';
    }};
`;

const MiniSummaryCard = styled.div<{ themeColor: string }>`
    border-radius: 24px;
    padding: 24px;
    background:
        radial-gradient(circle at top right, rgba(${props => hexToRgb(props.themeColor)}, 0.2), transparent 42%),
        linear-gradient(135deg, #ffffff, #f5fffb 72%);
    border: 1px solid rgba(${props => hexToRgb(props.themeColor)}, 0.16);
    box-shadow: 0 18px 38px rgba(15, 23, 42, 0.06);
`;

const SummaryTitle = styled.h3`
    margin: 0 0 12px;
    color: #111827;
    font-size: 1.28em;
`;

const SummaryList = styled.div`
    display: grid;
    gap: 10px;
`;

const SummaryItem = styled.div`
    padding: 12px 14px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.82);
    color: #374151;
    line-height: 1.65;
    font-weight: 700;
`;

const FinalSection = styled.div<{ themeColor: string }>`
    margin-top: 28px;
    padding: 24px;
    border-radius: 28px;
    background:
        radial-gradient(circle at top left, rgba(${props => hexToRgb(props.themeColor)}, 0.16), transparent 38%),
        linear-gradient(135deg, #ffffff, rgba(${props => hexToRgb(props.themeColor)}, 0.05));
    border: 1px solid rgba(${props => hexToRgb(props.themeColor)}, 0.12);
`;

const FinalHeader = styled.div`
    margin-bottom: 8px;
`;

const FinalTitle = styled.h3`
    margin: 0;
    color: #111827;
    font-size: 1.32em;
`;

const FinalText = styled.p`
    margin: 8px 0 0;
    color: #4b5563;
    line-height: 1.65;
    font-weight: 600;
`;

interface WordTapTaskData {
    step: string;
    tag: string;
    title: string;
    microTip: string;
    sentence: string[];
    targetIndexes: number[];
    hint: string;
    successMessage: string;
}

interface ChoiceTaskData {
    step: string;
    tag: string;
    title: string;
    microTip: string;
    prompt: string;
    choices: Array<{ text: string; isCorrect: boolean }>;
    hint: string;
    successMessage: string;
}

interface CompareTaskData {
    step: string;
    tag: string;
    title: string;
    microTip: string;
    question: string;
    leftLabel: string;
    leftSentence: string;
    leftHint: string;
    rightLabel: string;
    rightSentence: string;
    rightHint: string;
    correctAnswer: 'A' | 'B';
    hint: string;
    successMessage: string;
}

const wordTapTasks: WordTapTaskData[] = [
    {
        step: '1',
        tag: '点词题',
        title: '先点主语',
        microTip: '超短提示：主语就是“谁 / 什么”。',
        sentence: ['The', 'boy', 'runs.'],
        targetIndexes: [0, 1],
        hint: '谁在跑？把整块主语点出来。',
        successMessage: '对，`The boy` 是主语。先看成分，再看核心词 `boy` 是名词。',
    },
    {
        step: '2',
        tag: '再点一题',
        title: '再点主语',
        microTip: '主语常常不止一个词，但核心通常是名词或代词。',
        sentence: ['My', 'teacher', 'helps', 'me.'],
        targetIndexes: [0, 1],
        hint: '谁在帮助我？先别想词性，先找“谁”。',
        successMessage: '对，`My teacher` 是主语。这里的核心词 `teacher` 是名词。',
    },
];

const choiceTasks: ChoiceTaskData[] = [
    {
        step: '3',
        tag: '选择题',
        title: '再选正确答案',
        microTip: '谓语通常是动作或状态的核心。',
        prompt: 'The girl sings loudly. 哪一部分是谓语？',
        choices: [
            { text: 'The girl', isCorrect: false },
            { text: 'sings', isCorrect: true },
            { text: 'loudly', isCorrect: false },
        ],
        hint: '先问：这句话里“做什么”？',
        successMessage: '对，`sings` 是谓语。它的词性是动词。',
    },
    {
        step: '4',
        tag: '判断题',
        title: '再判断一句话',
        microTip: '同一个词，可以同时有“词性”和“成分”两个答案。',
        prompt: '在 She is happy. 里，happy 是“形容词，作补语”。这句话对吗？',
        choices: [
            { text: '对', isCorrect: true },
            { text: '不对', isCorrect: false },
        ],
        hint: '这一题专门训练“词性”和“成分”分开说。',
        successMessage: '对，`happy` 的词性是形容词，但它在句子里作补语。',
    },
];

const compareTask: CompareTaskData = {
    step: '5',
    tag: '两个句子对比',
    title: '最后比一比',
    microTip: '补语是在补充主语状态，状语是在修饰动作。',
    question: '哪一句里的加粗词是在作补语？',
    leftLabel: 'A',
    leftSentence: 'She is happy.',
    leftHint: '`happy` 在补充说明 she 的状态。',
    rightLabel: 'B',
    rightSentence: 'She sings happily.',
    rightHint: '`happily` 在修饰 sings 这个动作。',
    correctAnswer: 'A',
    hint: '看它是在补主语，还是在修饰动作。',
    successMessage: '对，A 里 `happy` 是形容词，作补语；B 里 `happily` 是副词，作状语。',
};

const finalPracticeData = [
    {
        question: 'The red car is in the garage. `in the garage` 是什么成分？',
        choices: [
            { text: '状语', isCorrect: true },
            { text: '主语', isCorrect: false },
            { text: '宾语', isCorrect: false },
        ],
        chineseHint: '它在补充地点信息，所以先往状语想。',
    },
    {
        question: 'We call him Tom. `Tom` 的词性和成分分别是什么？',
        choices: [
            { text: '名词，作补语', isCorrect: true },
            { text: '代词，作宾语', isCorrect: false },
            { text: '形容词，作状语', isCorrect: false },
        ],
        chineseHint: '这题要两层一起答：先看词性，再看成分。',
    },
    {
        question: 'The tall boy runs fast. 主语核心词 `boy` 是什么词性？',
        choices: [
            { text: '名词', isCorrect: true },
            { text: '形容词', isCorrect: false },
            { text: '副词', isCorrect: false },
        ],
        chineseHint: '主语可以是一整块，但核心词通常只抓最关键的那个词。',
    },
    {
        question: '下面哪句话最能说明“词性”和“句子成分”不是一回事？',
        choices: [
            { text: '`happy` 是形容词，也可以在句子里作补语', isCorrect: true },
            { text: '名词只能作主语', isCorrect: false },
            { text: '只要知道词性，就等于知道句子成分', isCorrect: false },
        ],
        chineseHint: '选那句同时把“是什么词”和“在句子里做什么”分开说清楚的。',
    },
];

const tipCards = [
    {
        label: '词性',
        title: '看“这是什么词”',
        example: '名词 / 动词 / 形容词 / 副词',
    },
    {
        label: '句子成分',
        title: '看“这一块在做什么”',
        example: '主语 / 谓语 / 宾语 / 状语 / 补语',
    },
    {
        label: '做题顺序',
        title: '先找成分，再看核心词性',
        example: '谁 / 什么 → 做什么 → 核心词是什么',
    },
];

const WordTapTaskCard: React.FC<{ task: WordTapTaskData; themeColor: string }> = ({ task, themeColor }) => {
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
    const [wrongIndex, setWrongIndex] = useState<number | null>(null);
    const isComplete = task.targetIndexes.every(index => selectedIndexes.includes(index));

    const handleTokenClick = (index: number) => {
        if (isComplete) return;

        if (task.targetIndexes.includes(index)) {
            setSelectedIndexes(prev => prev.includes(index) ? prev : [...prev, index]);
            return;
        }

        setWrongIndex(index);
        setTimeout(() => {
            setWrongIndex(current => current === index ? null : current);
        }, 450);
    };

    return (
        <TaskCard themeColor={themeColor} practice>
            <TaskTopRow>
                <StepBadge themeColor={themeColor}>{task.step}</StepBadge>
                <TaskTag themeColor={themeColor}>{task.tag}</TaskTag>
            </TaskTopRow>
            <TaskTitle>{task.title}</TaskTitle>
            <TaskMicroTip>{task.microTip}</TaskMicroTip>

            <SentenceBoard themeColor={themeColor}>
                <SentenceLabel>Sentence</SentenceLabel>
                <SentenceText>{task.sentence.join(' ')}</SentenceText>
                <TokenRow>
                    {task.sentence.map((word, index) => {
                        let status: 'default' | 'correct' | 'wrong' = 'default';
                        if (selectedIndexes.includes(index)) status = 'correct';
                        if (wrongIndex === index) status = 'wrong';

                        return (
                            <TokenButton
                                key={`${word}-${index}`}
                                themeColor={themeColor}
                                status={status}
                                onClick={() => handleTokenClick(index)}
                            >
                                {word}
                            </TokenButton>
                        );
                    })}
                </TokenRow>
            </SentenceBoard>

            <FeedbackText tone={isComplete ? 'success' : 'neutral'}>
                {isComplete ? task.successMessage : task.hint}
            </FeedbackText>
        </TaskCard>
    );
};

const ChoiceTaskCard: React.FC<{ task: ChoiceTaskData; themeColor: string }> = ({ task, themeColor }) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [status, setStatus] = useState<'idle' | 'success' | 'wrong'>('idle');

    const handleChoiceClick = (isCorrect: boolean, index: number) => {
        if (status === 'success') return;

        setSelectedIndex(index);
        if (isCorrect) {
            setStatus('success');
            return;
        }

        setStatus('wrong');
        setTimeout(() => {
            setSelectedIndex(null);
            setStatus('idle');
        }, 450);
    };

    return (
        <TaskCard themeColor={themeColor} practice>
            <TaskTopRow>
                <StepBadge themeColor={themeColor}>{task.step}</StepBadge>
                <TaskTag themeColor={themeColor}>{task.tag}</TaskTag>
            </TaskTopRow>
            <TaskTitle>{task.title}</TaskTitle>
            <TaskMicroTip>{task.microTip}</TaskMicroTip>

            <SentenceBoard themeColor={themeColor}>
                <SentenceLabel>Do This</SentenceLabel>
                <SentenceText>{task.prompt}</SentenceText>
            </SentenceBoard>

            <ChoiceGrid>
                {task.choices.map((choice, index) => {
                    let buttonStatus: 'default' | 'correct' | 'wrong' = 'default';
                    if (selectedIndex === index && status === 'success') buttonStatus = 'correct';
                    if (selectedIndex === index && status === 'wrong') buttonStatus = 'wrong';

                    return (
                        <ChoiceButton
                            key={choice.text}
                            themeColor={themeColor}
                            status={buttonStatus}
                            onClick={() => handleChoiceClick(choice.isCorrect, index)}
                        >
                            {choice.text}
                        </ChoiceButton>
                    );
                })}
            </ChoiceGrid>

            <FeedbackText tone={status === 'success' ? 'success' : status === 'wrong' ? 'warning' : 'neutral'}>
                {status === 'success' ? task.successMessage : status === 'wrong' ? '再想一下。' : task.hint}
            </FeedbackText>
        </TaskCard>
    );
};

const CompareTaskCard: React.FC<{ task: CompareTaskData; themeColor: string }> = ({ task, themeColor }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | null>(null);
    const [status, setStatus] = useState<'idle' | 'success' | 'wrong'>('idle');

    const handleAnswerClick = (answer: 'A' | 'B') => {
        if (status === 'success') return;

        setSelectedAnswer(answer);
        if (answer === task.correctAnswer) {
            setStatus('success');
            return;
        }

        setStatus('wrong');
        setTimeout(() => {
            setSelectedAnswer(null);
            setStatus('idle');
        }, 450);
    };

    return (
        <TaskCard themeColor={themeColor} practice>
            <TaskTopRow>
                <StepBadge themeColor={themeColor}>{task.step}</StepBadge>
                <TaskTag themeColor={themeColor}>{task.tag}</TaskTag>
            </TaskTopRow>
            <TaskTitle>{task.title}</TaskTitle>
            <TaskMicroTip>{task.microTip}</TaskMicroTip>

            <SentenceBoard themeColor={themeColor}>
                <SentenceLabel>Compare</SentenceLabel>
                <SentenceText>{task.question}</SentenceText>
            </SentenceBoard>

            <CompareGrid>
                <ComparePanel themeColor={themeColor}>
                    <CompareLabel themeColor={themeColor}>{task.leftLabel}</CompareLabel>
                    <CompareSentence>She is <strong>happy</strong>.</CompareSentence>
                    <CompareHint>{task.leftHint}</CompareHint>
                </ComparePanel>
                <ComparePanel themeColor={themeColor}>
                    <CompareLabel themeColor={themeColor}>{task.rightLabel}</CompareLabel>
                    <CompareSentence>She sings <strong>happily</strong>.</CompareSentence>
                    <CompareHint>{task.rightHint}</CompareHint>
                </ComparePanel>
            </CompareGrid>

            <ChoiceGrid>
                {(['A', 'B'] as const).map(answer => {
                    let buttonStatus: 'default' | 'correct' | 'wrong' = 'default';
                    if (selectedAnswer === answer && status === 'success') buttonStatus = 'correct';
                    if (selectedAnswer === answer && status === 'wrong') buttonStatus = 'wrong';

                    return (
                        <ChoiceButton
                            key={answer}
                            themeColor={themeColor}
                            status={buttonStatus}
                            onClick={() => handleAnswerClick(answer)}
                        >
                            选 {answer}
                        </ChoiceButton>
                    );
                })}
            </ChoiceGrid>

            <FeedbackText tone={status === 'success' ? 'success' : status === 'wrong' ? 'warning' : 'neutral'}>
                {status === 'success' ? task.successMessage : status === 'wrong' ? '再对比一下。' : task.hint}
            </FeedbackText>
        </TaskCard>
    );
};

export const PosComponentsBridgeContent: React.FC<PosComponentsBridgeContentProps> = ({ onBack, themeColor }) => {
    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to List</BackButton>
            <LessonTitle>🔗 词性 vs 句子成分</LessonTitle>

            <LeadBanner themeColor={themeColor}>
                <LeadEyebrow themeColor={themeColor}>少看字，多动手</LeadEyebrow>
                <LeadTitle>先做小题，再记概念。</LeadTitle>
                <LeadText>
                    这一页不再先塞一大段解释。你先连续做 5 个短任务，每次只抓一个动作，
                    做完马上得到一句短结论，最后再做一组综合练习。
                </LeadText>
            </LeadBanner>

            <TipGrid>
                {tipCards.map((card) => (
                    <TipCard key={card.label} themeColor={themeColor}>
                        <TipLabel themeColor={themeColor}>{card.label}</TipLabel>
                        <TipTitle>{card.title}</TipTitle>
                        <TipExample>{card.example}</TipExample>
                    </TipCard>
                ))}
            </TipGrid>

            <TaskStack>
                {wordTapTasks.map(task => (
                    <WordTapTaskCard key={task.step} task={task} themeColor={themeColor} />
                ))}

                {choiceTasks.map(task => (
                    <ChoiceTaskCard key={task.step} task={task} themeColor={themeColor} />
                ))}

                <CompareTaskCard task={compareTask} themeColor={themeColor} />
            </TaskStack>

            <MiniSummaryCard themeColor={themeColor}>
                <SummaryTitle>小结先收住三句</SummaryTitle>
                <SummaryList>
                    <SummaryItem>主语、谓语、宾语、状语、补语，回答的是“这一块在句子里做什么”。</SummaryItem>
                    <SummaryItem>名词、动词、形容词、副词，回答的是“这个词本身是什么词”。</SummaryItem>
                    <SummaryItem>一个词可以有自己的词性，也可以在句子里承担某个成分，两者不要混成一句话。</SummaryItem>
                </SummaryList>
            </MiniSummaryCard>

            <FinalSection themeColor={themeColor}>
                <FinalHeader>
                    <FinalTitle>最后做一组综合练习</FinalTitle>
                    <FinalText>现在再把成分和词性放在一起看，但每一题仍然只抓一个重点。</FinalText>
                </FinalHeader>

                <MultipleChoicePractice
                    themeColor={themeColor}
                    onCompleteAll={onBack}
                    practiceData={finalPracticeData}
                    title="🎯 综合练习"
                    subtitle="先看成分，再看核心词性"
                    completionTitle="🎉 这一节完成了"
                    completionMessage="你已经能把“这个词是什么” 和 “这一块在做什么” 分开看了。"
                    nextButtonText="返回列表"
                />
            </FinalSection>
        </LessonContainer>
    );
};
