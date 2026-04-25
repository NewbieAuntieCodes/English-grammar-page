/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useMemo, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import {
    BackButton,
    LessonContainer,
    LessonTitle,
} from '../PartsOfSpeech/PartsOfSpeechLesson.styles';

interface PosComponentsBridgeContentProps {
    onBack: () => void;
    themeColor: string;
}

interface TaskStep {
    title: string;
    targetIndexes: number[];
    hint: string;
}

interface LessonPair {
    id: string;
    title: string;
    sentence: string[];
    skeletonSteps: TaskStep[];
    posSteps: TaskStep[];
    takeaway: string;
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

const TinyGuideGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    margin: 18px 0 28px;
`;

const TinyGuideCard = styled.div<{ themeColor: string }>`
    border-radius: 22px;
    padding: 18px;
    background: linear-gradient(135deg, rgba(${props => hexToRgb(props.themeColor)}, 0.08), #ffffff 70%);
    border: 1px solid rgba(${props => hexToRgb(props.themeColor)}, 0.14);
    box-shadow: 0 16px 34px rgba(15, 23, 42, 0.05);
`;

const TinyGuideBadge = styled.div<{ themeColor: string }>`
    width: fit-content;
    padding: 5px 10px;
    border-radius: 999px;
    background: rgba(${props => hexToRgb(props.themeColor)}, 0.12);
    color: ${props => props.themeColor};
    font-size: 0.82em;
    font-weight: 800;
`;

const TinyGuideTitle = styled.h3`
    margin: 12px 0 6px;
    color: #111827;
    font-size: 1.08em;
`;

const TinyGuideText = styled.p`
    margin: 0;
    color: #4b5563;
    line-height: 1.6;
    font-weight: 600;
`;

const LessonStack = styled.div`
    display: flex;
    flex-direction: column;
    gap: 22px;
`;

const LessonBlock = styled.section<{ themeColor: string }>`
    border-radius: 28px;
    padding: 22px;
    background:
        radial-gradient(circle at top left, rgba(${props => hexToRgb(props.themeColor)}, 0.12), transparent 42%),
        linear-gradient(135deg, #ffffff, rgba(${props => hexToRgb(props.themeColor)}, 0.04));
    border: 1px solid rgba(${props => hexToRgb(props.themeColor)}, 0.14);
    box-shadow: 0 20px 44px rgba(15, 23, 42, 0.07);
`;

const LessonHeading = styled.div`
    margin-bottom: 18px;
`;

const LessonLabel = styled.div<{ themeColor: string }>`
    width: fit-content;
    padding: 5px 10px;
    border-radius: 999px;
    background: rgba(${props => hexToRgb(props.themeColor)}, 0.12);
    color: ${props => props.themeColor};
    font-size: 0.82em;
    font-weight: 800;
`;

const LessonBlockTitle = styled.h3`
    margin: 10px 0 0;
    color: #111827;
    font-size: 1.22em;
`;

const SentenceBoard = styled.div<{ themeColor: string }>`
    margin-top: 14px;
    border-radius: 20px;
    padding: 18px;
    background: rgba(${props => hexToRgb(props.themeColor)}, 0.05);
    border: 1px solid rgba(${props => hexToRgb(props.themeColor)}, 0.12);
`;

const SentenceLabel = styled.div`
    color: #6b7280;
    font-size: 0.84em;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.02em;
`;

const SentenceText = styled.div`
    margin-top: 10px;
    color: #111827;
    font-size: 1.4em;
    font-weight: 800;
    line-height: 1.7;
`;

const PairGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
    margin-top: 18px;
`;

const TaskCard = styled.div<{ themeColor: string }>`
    border-radius: 22px;
    padding: 20px;
    background: linear-gradient(180deg, rgba(${props => hexToRgb(props.themeColor)}, 0.11), #ffffff 55%);
    border: 1px solid rgba(${props => hexToRgb(props.themeColor)}, 0.14);
    animation: ${popIn} 0.35s ease;
`;

const TaskTag = styled.div<{ themeColor: string }>`
    width: fit-content;
    padding: 6px 12px;
    border-radius: 999px;
    background: rgba(${props => hexToRgb(props.themeColor)}, 0.12);
    color: ${props => props.themeColor};
    font-size: 0.82em;
    font-weight: 800;
`;

const TaskTitle = styled.h4`
    margin: 12px 0 6px;
    color: #111827;
    font-size: 1.08em;
`;

const TaskTip = styled.p`
    margin: 0;
    color: #4b5563;
    line-height: 1.6;
    font-weight: 600;
`;

const StepIndicator = styled.div<{ themeColor: string }>`
    margin-top: 16px;
    color: ${props => props.themeColor};
    font-size: 0.9em;
    font-weight: 800;
`;

const StepPrompt = styled.div`
    margin-top: 8px;
    color: #111827;
    font-size: 1.16em;
    font-weight: 800;
`;

const WordRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 16px;
`;

const WordButton = styled.button<{
    themeColor: string;
    status: 'default' | 'done' | 'wrong';
}>`
    border: none;
    border-radius: 16px;
    padding: 12px 16px;
    cursor: pointer;
    background: #ffffff;
    color: #111827;
    font-size: 1em;
    font-weight: 800;
    box-shadow: inset 0 0 0 1px #d1d5db;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: inset 0 0 0 1px rgba(${props => hexToRgb(props.themeColor)}, 0.44);
    }

    ${props => props.status === 'done' && css`
        background: ${props.themeColor};
        color: #ffffff;
        box-shadow: 0 14px 28px rgba(${hexToRgb(props.themeColor)}, 0.24);
    `}

    ${props => props.status === 'wrong' && css`
        background: #fee2e2;
        color: #991b1b;
        box-shadow: inset 0 0 0 1px #ef4444;
        animation: ${shake} 0.35s ease;
    `}
`;

const Feedback = styled.div<{ tone: 'neutral' | 'success' }>`
    margin-top: 16px;
    padding: 14px 16px;
    border-radius: 16px;
    line-height: 1.6;
    font-weight: 700;
    color: ${props => props.tone === 'success' ? '#065f46' : '#4b5563'};
    background: ${props => props.tone === 'success' ? '#d1fae5' : '#f3f4f6'};
`;

const Takeaway = styled.div<{ themeColor: string }>`
    margin-top: 18px;
    border-radius: 18px;
    padding: 14px 16px;
    background: rgba(${props => hexToRgb(props.themeColor)}, 0.08);
    color: #1f2937;
    line-height: 1.65;
    font-weight: 700;
`;

const lessons: LessonPair[] = [
    {
        id: 'sv',
        title: '一句话先找主干，再看词性',
        sentence: ['The', 'boy', 'runs.'],
        skeletonSteps: [
            { title: '先点主语', targetIndexes: [0, 1], hint: '主语就是“谁 / 什么”。' },
            { title: '再点谓语', targetIndexes: [2], hint: '谓语就是动作或状态的核心。' },
        ],
        posSteps: [
            { title: '先点名词', targetIndexes: [1], hint: '这里只抓核心词，不抓 the。' },
            { title: '再点动词', targetIndexes: [2], hint: '动作词通常就是动词。' },
        ],
        takeaway: '`boy` 是名词，作主语；`runs` 是动词，作谓语。先找主干，再看词性会更清楚。',
    },
    {
        id: 'svo',
        title: '同一句话继续：先看 SVO，再看名词 / 动词 / 形容词',
        sentence: ['The', 'tall', 'boy', 'likes', 'music.'],
        skeletonSteps: [
            { title: '先点主语', targetIndexes: [0, 1, 2], hint: '谁喜欢音乐？整块主语先点出来。' },
            { title: '再点谓语', targetIndexes: [3], hint: '主语后面最核心的动作词，就是谓语。' },
            { title: '最后点宾语', targetIndexes: [4], hint: '喜欢什么？答案就是宾语。' },
        ],
        posSteps: [
            { title: '先点名词', targetIndexes: [2, 4], hint: 'boy 和 music 都是名词。' },
            { title: '再点动词', targetIndexes: [3], hint: 'likes 是动作词。' },
            { title: '最后点形容词', targetIndexes: [1], hint: 'tall 在修饰 boy，所以它是形容词。' },
        ],
        takeaway: '`boy` 和 `music` 是名词；`likes` 是动词；`tall` 是形容词。句子成分看“做什么”，词性看“是什么词”。',
    },
    {
        id: 'svc',
        title: '再看一个句子：形容词在句子里不一定只是修饰词',
        sentence: ['My', 'teacher', 'is', 'kind.'],
        skeletonSteps: [
            { title: '先点主语', targetIndexes: [0, 1], hint: '谁是 kind？先找主语。' },
            { title: '再点谓语', targetIndexes: [2], hint: 'be 动词这里是谓语核心。' },
            { title: '最后点补语', targetIndexes: [3], hint: 'kind 在补充说明主语的状态。' },
        ],
        posSteps: [
            { title: '先点名词', targetIndexes: [1], hint: 'teacher 是名词。' },
            { title: '再点动词', targetIndexes: [2], hint: 'is 是动词。' },
            { title: '最后点形容词', targetIndexes: [3], hint: 'kind 是形容词。' },
        ],
        takeaway: '`teacher` 是名词，作主语；`is` 是动词，作谓语；`kind` 是形容词，但它在句子里作补语。',
    },
    {
        id: 'svo-2',
        title: '再练一个 SVO：还是先抓骨架',
        sentence: ['The', 'young', 'doctor', 'helps', 'patients.'],
        skeletonSteps: [
            { title: '先点主语', targetIndexes: [0, 1, 2], hint: '谁在帮助别人？先把主语整块点出来。' },
            { title: '再点谓语', targetIndexes: [3], hint: 'helps 是这个句子的动作核心。' },
            { title: '最后点宾语', targetIndexes: [4], hint: '帮助谁？patients 就是宾语。' },
        ],
        posSteps: [
            { title: '先点名词', targetIndexes: [2, 4], hint: 'doctor 和 patients 都是名词。' },
            { title: '再点动词', targetIndexes: [3], hint: 'helps 是动词。' },
            { title: '最后点形容词', targetIndexes: [1], hint: 'young 在修饰 doctor，所以它是形容词。' },
        ],
        takeaway: '`doctor` 和 `patients` 是名词；`helps` 是动词；`young` 是形容词。先看 SVO，再看词性，最不容易乱。',
    },
    {
        id: 'svc-2',
        title: '再练一个 SVC：形容词也可以放在句子主干里',
        sentence: ['Our', 'classroom', 'looks', 'bright.'],
        skeletonSteps: [
            { title: '先点主语', targetIndexes: [0, 1], hint: '什么东西 looks bright？先找主语。' },
            { title: '再点谓语', targetIndexes: [2], hint: 'looks 是句子的谓语核心。' },
            { title: '最后点补语', targetIndexes: [3], hint: 'bright 在补充说明 classroom 的状态。' },
        ],
        posSteps: [
            { title: '先点名词', targetIndexes: [1], hint: 'classroom 是名词。' },
            { title: '再点动词', targetIndexes: [2], hint: 'looks 是动词。' },
            { title: '最后点形容词', targetIndexes: [3], hint: 'bright 是形容词。' },
        ],
        takeaway: '`classroom` 是名词，作主语；`looks` 是动词，作谓语；`bright` 是形容词，但在句子里作补语。',
    },
    {
        id: 'review',
        title: '最后再来一句综合一点的',
        sentence: ['The', 'clever', 'students', 'finish', 'homework.'],
        skeletonSteps: [
            { title: '先点主语', targetIndexes: [0, 1, 2], hint: '谁完成作业？先把主语整块抓出来。' },
            { title: '再点谓语', targetIndexes: [3], hint: 'finish 是这个句子的动作核心。' },
            { title: '最后点宾语', targetIndexes: [4], hint: '完成什么？homework 是宾语。' },
        ],
        posSteps: [
            { title: '先点名词', targetIndexes: [2, 4], hint: 'students 和 homework 都是名词。' },
            { title: '再点动词', targetIndexes: [3], hint: 'finish 是动词。' },
            { title: '最后点形容词', targetIndexes: [1], hint: 'clever 在修饰 students，所以它是形容词。' },
        ],
        takeaway: '你现在应该能先看出 `students + finish + homework` 这个主干，再看 `clever` 是形容词、`students/homework` 是名词、`finish` 是动词。',
    },
];

const SequentialTapCard: React.FC<{
    sentence: string[];
    steps: TaskStep[];
    themeColor: string;
    tag: string;
    subtitle: string;
}> = ({ sentence, steps, themeColor, tag, subtitle }) => {
    const [stepIndex, setStepIndex] = useState(0);
    const [completedIndexes, setCompletedIndexes] = useState<number[]>([]);
    const [currentHits, setCurrentHits] = useState<number[]>([]);
    const [wrongIndex, setWrongIndex] = useState<number | null>(null);

    const currentStep = steps[stepIndex];
    const isFinished = stepIndex >= steps.length;

    const activeHint = useMemo(() => {
        if (isFinished) {
            return '这一句完成了。下一步就看同一句话里的词性。';
        }
        return currentStep.hint;
    }, [currentStep, isFinished]);

    const handleWordClick = (index: number) => {
        if (isFinished || !currentStep) return;
        if (completedIndexes.includes(index) || currentHits.includes(index)) return;

        if (currentStep.targetIndexes.includes(index)) {
            const updatedHits = [...currentHits, index];
            const stepDone = currentStep.targetIndexes.every(target => updatedHits.includes(target));

            if (!stepDone) {
                setCurrentHits(updatedHits);
                return;
            }

            const merged = [...completedIndexes, ...updatedHits];
            setCompletedIndexes(merged);
            setCurrentHits([]);

            if (stepIndex === steps.length - 1) {
                setStepIndex(steps.length);
                return;
            }

            setStepIndex(prev => prev + 1);
            return;
        }

        setWrongIndex(index);
        setTimeout(() => {
            setWrongIndex(current => current === index ? null : current);
        }, 400);
    };

    return (
        <TaskCard themeColor={themeColor}>
            <TaskTag themeColor={themeColor}>{tag}</TaskTag>
            <TaskTitle>{subtitle}</TaskTitle>
            <TaskTip>同一句话，按顺序做。</TaskTip>

            {!isFinished && (
                <>
                    <StepIndicator themeColor={themeColor}>
                        第 {stepIndex + 1} 步 / {steps.length}
                    </StepIndicator>
                    <StepPrompt>{currentStep.title}</StepPrompt>
                </>
            )}

            {isFinished && (
                <StepPrompt>这一组做完了</StepPrompt>
            )}

            <WordRow>
                {sentence.map((word, index) => {
                    let status: 'default' | 'done' | 'wrong' = 'default';
                    if (completedIndexes.includes(index) || currentHits.includes(index)) status = 'done';
                    if (wrongIndex === index) status = 'wrong';

                    return (
                        <WordButton
                            key={`${word}-${index}`}
                            themeColor={themeColor}
                            status={status}
                            onClick={() => handleWordClick(index)}
                        >
                            {word}
                        </WordButton>
                    );
                })}
            </WordRow>

            <Feedback tone={isFinished ? 'success' : 'neutral'}>
                {activeHint}
            </Feedback>
        </TaskCard>
    );
};

export const PosComponentsBridgeContent: React.FC<PosComponentsBridgeContentProps> = ({ onBack, themeColor }) => {
    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to List</BackButton>
            <LessonTitle>🔗 词性 vs 句子成分</LessonTitle>

            <TinyGuideGrid>
                <TinyGuideCard themeColor={themeColor}>
                    <TinyGuideBadge themeColor={themeColor}>角度 A</TinyGuideBadge>
                    <TinyGuideTitle>看句子主干</TinyGuideTitle>
                    <TinyGuideText>先只看主语、谓语、宾语，或者主语、谓语、补语。</TinyGuideText>
                </TinyGuideCard>
                <TinyGuideCard themeColor={themeColor}>
                    <TinyGuideBadge themeColor={themeColor}>角度 B</TinyGuideBadge>
                    <TinyGuideTitle>看词性</TinyGuideTitle>
                    <TinyGuideText>还是同一句话，再看哪些是名词、动词、形容词。</TinyGuideText>
                </TinyGuideCard>
            </TinyGuideGrid>

            <LessonStack>
                {lessons.map((lesson, index) => (
                    <LessonBlock key={lesson.id} themeColor={themeColor}>
                        <LessonHeading>
                            <LessonLabel themeColor={themeColor}>句子 {index + 1}</LessonLabel>
                            <LessonBlockTitle>{lesson.title}</LessonBlockTitle>
                        </LessonHeading>

                        <SentenceBoard themeColor={themeColor}>
                            <SentenceLabel>Sentence</SentenceLabel>
                            <SentenceText>{lesson.sentence.join(' ')}</SentenceText>
                        </SentenceBoard>

                        <PairGrid>
                            <SequentialTapCard
                                sentence={lesson.sentence}
                                steps={lesson.skeletonSteps}
                                themeColor={themeColor}
                                tag="先找主干"
                                subtitle="先点主语、谓语、宾语 / 补语"
                            />
                            <SequentialTapCard
                                sentence={lesson.sentence}
                                steps={lesson.posSteps}
                                themeColor={themeColor}
                                tag="再看词性"
                                subtitle="再点名词、动词、形容词"
                            />
                        </PairGrid>

                        <Takeaway themeColor={themeColor}>{lesson.takeaway}</Takeaway>
                    </LessonBlock>
                ))}
            </LessonStack>

        </LessonContainer>
    );
};
