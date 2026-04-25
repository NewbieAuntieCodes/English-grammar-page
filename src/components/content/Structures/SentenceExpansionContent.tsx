/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import styled from 'styled-components';
import { LessonContainer, BackButton, LessonTitle, WhyLearnSection, SectionTitle } from './SVOContent.styles';
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';
import { MultipleChoicePractice } from '../../practice/MultipleChoicePractice';
import { FillInTheBlankPractice } from '../../practice/FillInTheBlankPractice';
import {
    ExpansionContainer,
    ExpansionStep,
    StepHeader,
    StepExplanation,
    SentenceBlock,
    ExampleSwitcher,
    SwitcherButton,
    RuleSection,
    RuleTitle,
    RuleExplanation,
    RuleDiagram,
    RuleBox,
    RuleArrow,
    RuleExample,
    CorrectOrder,
    OrderBreakdown
} from './SentenceExpansionContent.styles';

interface SentenceExpansionContentProps {
    onBack: () => void;
    themeColor: string;
}

const QuickGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
    gap: 16px;
    margin: 24px 0;
`;

const QuickCard = styled.div<{ themeColor: string }>`
    background: white;
    border-radius: 18px;
    padding: 18px 14px;
    text-align: center;
    border: 2px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
`;

const QuickCardTitle = styled.div<{ themeColor: string }>`
    color: ${props => props.themeColor};
    font-size: 1.1em;
    font-weight: 800;
`;

const QuickCardHint = styled.div`
    margin-top: 8px;
    color: #4a5568;
    font-weight: 700;
`;

const QuickCardExample = styled.div`
    margin-top: 8px;
    color: #718096;
    font-size: 0.9em;
    line-height: 1.6;
`;

const buildPracticeData = [
    {
        words: [{ en: 'The', cn: '这只' }, { en: 'cute', cn: '可爱的' }, { en: 'dog', cn: '狗' }, { en: 'runs', cn: '跑' }, { en: 'in the park', cn: '在公园里' }],
        correct: ['The', 'cute', 'dog', 'runs', 'in the park'],
        chinese: '这只可爱的狗在公园里跑。'
    },
    {
        words: [{ en: 'She', cn: '她' }, { en: 'reads', cn: '读' }, { en: 'a book', cn: '一本书' }, { en: 'quietly', cn: '安静地' }, { en: 'in the library', cn: '在图书馆里' }],
        correct: ['She', 'reads', 'a book', 'quietly', 'in the library'],
        chinese: '她在图书馆里安静地读一本书。'
    },
    {
        words: [{ en: 'My father', cn: '我爸爸' }, { en: 'drives', cn: '开车' }, { en: 'carefully', cn: '小心地' }, { en: 'every day', cn: '每天' }],
        correct: ['My father', 'drives', 'carefully', 'every day'],
        chinese: '我爸爸每天都小心地开车。'
    },
    {
        words: [{ en: 'They', cn: '他们' }, { en: 'played', cn: '玩了' }, { en: 'football', cn: '足球' }, { en: 'happily', cn: '开心地' }, { en: 'after class', cn: '下课后' }],
        correct: ['They', 'played', 'football', 'happily', 'after class'],
        chinese: '他们下课后开心地踢足球。'
    },
    {
        words: [{ en: 'A', cn: '一个' }, { en: 'little', cn: '小' }, { en: 'girl', cn: '女孩' }, { en: 'is singing', cn: '正在唱歌' }, { en: 'on the stage', cn: '在舞台上' }, { en: 'now', cn: '现在' }],
        correct: ['A', 'little', 'girl', 'is singing', 'on the stage', 'now'],
        chinese: '一个小女孩现在正在舞台上唱歌。'
    },
    {
        words: [{ en: 'The', cn: '这些' }, { en: 'students', cn: '学生们' }, { en: 'study', cn: '学习' }, { en: 'hard', cn: '努力地' }, { en: 'in the classroom', cn: '在教室里' }],
        correct: ['The', 'students', 'study', 'hard', 'in the classroom'],
        chinese: '这些学生在教室里努力学习。'
    },
    {
        words: [{ en: 'Our teacher', cn: '我们老师' }, { en: 'spoke', cn: '说' }, { en: 'slowly', cn: '慢慢地' }, { en: 'to us', cn: '对我们' }, { en: 'this morning', cn: '今天早上' }],
        correct: ['Our teacher', 'spoke', 'slowly', 'to us', 'this morning'],
        chinese: '我们老师今天早上慢慢地对我们说话。'
    },
    {
        words: [{ en: 'The', cn: '那只' }, { en: 'black', cn: '黑色的' }, { en: 'cat', cn: '猫' }, { en: 'slept', cn: '睡觉' }, { en: 'under the table', cn: '在桌子下面' }, { en: 'all afternoon', cn: '整个下午' }],
        correct: ['The', 'black', 'cat', 'slept', 'under the table', 'all afternoon'],
        chinese: '那只黑猫整个下午都在桌子下面睡觉。'
    },
];

const fillPracticeData = [
    { sentenceParts: ['The boy runs ', '.'] as const, choices: [{ text: 'quickly', isCorrect: true }, { text: 'teacher', isCorrect: false }, { text: 'Monday', isCorrect: false }], chineseHint: '这个男孩跑得很快。' },
    { sentenceParts: ['She sings in the room ', '.'] as const, choices: [{ text: 'every night', isCorrect: true }, { text: 'happy', isCorrect: false }, { text: 'doctor', isCorrect: false }], chineseHint: '她每天晚上都在房间里唱歌。' },
    { sentenceParts: ['My brother plays basketball ', '.'] as const, choices: [{ text: 'after school', isCorrect: true }, { text: 'careful', isCorrect: false }, { text: 'a student', isCorrect: false }], chineseHint: '我哥哥放学后打篮球。' },
    { sentenceParts: ['The baby is sleeping ', '.'] as const, choices: [{ text: 'on the bed', isCorrect: true }, { text: 'friendly', isCorrect: false }, { text: 'artist', isCorrect: false }], chineseHint: '宝宝正在床上睡觉。' },
    { sentenceParts: ['They watched TV ', '.'] as const, choices: [{ text: 'together', isCorrect: true }, { text: 'library', isCorrect: false }, { text: 'young', isCorrect: false }], chineseHint: '他们一起看电视。' },
    { sentenceParts: ['The birds sing in the tree ', '.'] as const, choices: [{ text: 'every morning', isCorrect: true }, { text: 'carefully', isCorrect: false }, { text: 'driver', isCorrect: false }], chineseHint: '这些鸟每天早上都在树上唱歌。' },
    { sentenceParts: ['Our teacher speaks ', ' in class.'] as const, choices: [{ text: 'clearly', isCorrect: true }, { text: 'hospital', isCorrect: false }, { text: 'winter', isCorrect: false }], chineseHint: '我们老师上课时讲得很清楚。' },
    { sentenceParts: ['A small cat is playing ', '.'] as const, choices: [{ text: 'in the garden', isCorrect: true }, { text: 'kind', isCorrect: false }, { text: 'farmer', isCorrect: false }], chineseHint: '一只小猫正在花园里玩。' },
];

const addOnMiniPracticeData = [
    {
        question: 'The girl sings. 想让句子更完整，可以加哪一块？',
        choices: [
            { text: 'beautifully', isCorrect: true },
            { text: 'a doctor', isCorrect: false },
            { text: 'is happy', isCorrect: false },
        ],
        chineseHint: '这里是在给动作加“怎样唱”。',
    },
    {
        question: 'The boy plays football. 想补“在哪里”，选哪个？',
        choices: [
            { text: 'on the playground', isCorrect: true },
            { text: 'careful', isCorrect: false },
            { text: 'a player', isCorrect: false },
        ],
        chineseHint: '地点常常放后面。',
    },
    {
        question: 'A bird sings. 想补“什么样的鸟”，选哪个？',
        choices: [
            { text: 'small', isCorrect: true },
            { text: 'quietly', isCorrect: false },
            { text: 'at night', isCorrect: false },
        ],
        chineseHint: '形容词放在名词前面。',
    },
    {
        question: 'She studies in the library. 想补“什么时候”，选哪个？',
        choices: [
            { text: 'every evening', isCorrect: true },
            { text: 'smart', isCorrect: false },
            { text: 'a student', isCorrect: false },
        ],
        chineseHint: '时间通常放在后面。',
    },
];

const orderMiniPracticeData = [
    {
        question: 'He speaks English ___.',
        choices: [
            { text: 'well at school every day', isCorrect: true },
            { text: 'every day well at school', isCorrect: false },
            { text: 'at school every day well', isCorrect: false },
        ],
        chineseHint: '常见顺序：方式 → 地点 → 时间',
    },
    {
        question: 'They sang ___.',
        choices: [
            { text: 'happily in the room last night', isCorrect: true },
            { text: 'last night happily in the room', isCorrect: false },
            { text: 'in the room last night happily', isCorrect: false },
        ],
        chineseHint: '先怎样，再哪里，再什么时候。',
    },
    {
        question: 'The dog ran ___.',
        choices: [
            { text: 'quickly in the park this morning', isCorrect: true },
            { text: 'this morning quickly in the park', isCorrect: false },
            { text: 'in the park quickly this morning', isCorrect: false },
        ],
        chineseHint: '快速记：How → Where → When',
    },
    {
        question: 'She read a book ___.',
        choices: [
            { text: 'quietly in her room after dinner', isCorrect: true },
            { text: 'after dinner quietly in her room', isCorrect: false },
            { text: 'in her room after dinner quietly', isCorrect: false },
        ],
        chineseHint: '方式在前，时间最后。',
    },
];

const birdExampleSteps = [
    {
        step: '核',
        title: '核心句',
        explanation: '先有最短的完整句子。',
        sentence: <>A bird sings.</>,
    },
    {
        step: '1',
        title: '+ 什么样',
        explanation: '加形容词，放在名词前面。',
        sentence: <>A <strong>small</strong> bird sings.</>,
    },
    {
        step: '2',
        title: '+ 在哪里',
        explanation: '地点常常放后面。',
        sentence: <>A small bird sings <strong>in the tree</strong>.</>,
    },
    {
        step: '3',
        title: '+ 怎样',
        explanation: '方式常见放在动词后面。',
        sentence: <>A small bird sings <strong>happily</strong> in the tree.</>,
    },
    {
        step: '4',
        title: '+ 什么时候',
        explanation: '时间通常放最后。',
        sentence: <>A small bird sings happily in the tree <strong>every morning</strong>.</>,
    }
];

const basketballExampleSteps = [
    {
        step: '核',
        title: '核心句',
        explanation: '先有主谓宾。',
        sentence: <>He plays basketball.</>,
    },
    {
        step: '1',
        title: '+ 怎样',
        explanation: '先补动作方式。',
        sentence: <>He plays basketball <strong>well</strong>.</>,
    },
    {
        step: '2',
        title: '+ 和谁',
        explanation: '再补更多信息。',
        sentence: <>He plays basketball well <strong>with his friends</strong>.</>,
    },
    {
        step: '3',
        title: '+ 在哪里',
        explanation: '地点也放后面。',
        sentence: <>He plays basketball well with his friends <strong>at the park</strong>.</>,
    },
    {
        step: '4',
        title: '+ 什么时候',
        explanation: '时间放最末尾。',
        sentence: <>He plays basketball well with his friends at the park <strong>after school</strong>.</>,
    }
];

export const SentenceExpansionContent: React.FC<SentenceExpansionContentProps> = ({ onBack, themeColor }) => {
    const [activeExample, setActiveExample] = useState<'bird' | 'basketball'>('bird');

    const currentSteps = activeExample === 'bird' ? birdExampleSteps : basketballExampleSteps;

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Lessons</BackButton>

            <LessonTitle>✨ 简单句扩展练习</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 先抓一个点</SectionTitle>
                <p>先说核心句，再一点点加信息。这样句子会更长，也更具体。</p>
            </WhyLearnSection>

            <QuickGrid>
                <QuickCard themeColor={themeColor}>
                    <QuickCardTitle themeColor={themeColor}>什么样</QuickCardTitle>
                    <QuickCardHint>形容词</QuickCardHint>
                    <QuickCardExample>small bird<br />beautiful flowers</QuickCardExample>
                </QuickCard>
                <QuickCard themeColor={themeColor}>
                    <QuickCardTitle themeColor={themeColor}>怎样</QuickCardTitle>
                    <QuickCardHint>方式</QuickCardHint>
                    <QuickCardExample>quickly<br />happily</QuickCardExample>
                </QuickCard>
                <QuickCard themeColor={themeColor}>
                    <QuickCardTitle themeColor={themeColor}>在哪里</QuickCardTitle>
                    <QuickCardHint>地点</QuickCardHint>
                    <QuickCardExample>in the park<br />at school</QuickCardExample>
                </QuickCard>
                <QuickCard themeColor={themeColor}>
                    <QuickCardTitle themeColor={themeColor}>什么时候</QuickCardTitle>
                    <QuickCardHint>时间</QuickCardHint>
                    <QuickCardExample>every day<br />after class</QuickCardExample>
                </QuickCard>
            </QuickGrid>

            <MultipleChoicePractice
                themeColor={themeColor}
                practiceData={addOnMiniPracticeData}
                title="⚡ Fast Check 1"
                subtitle="先补最合适的一块"
                completionTitle="👏 Nice!"
                completionMessage="这组完成了。下面还有顺序练习和正式练习。"
                nextButtonText="继续"
                hideCompletionButton
            />

            <SectionTitle>📈 看两个扩展示范</SectionTitle>

            <ExampleSwitcher>
                <SwitcherButton
                    isActive={activeExample === 'bird'}
                    onClick={() => setActiveExample('bird')}
                    themeColor={themeColor}
                >
                    例1: A bird sings
                </SwitcherButton>
                <SwitcherButton
                    isActive={activeExample === 'basketball'}
                    onClick={() => setActiveExample('basketball')}
                    themeColor={themeColor}
                >
                    例2: He plays basketball
                </SwitcherButton>
            </ExampleSwitcher>

            <ExpansionContainer>
                {currentSteps.map(step => (
                    <ExpansionStep key={step.title + step.step} data-step={step.step}>
                        <StepHeader>{step.title}</StepHeader>
                        <StepExplanation>{step.explanation}</StepExplanation>
                        <SentenceBlock>{step.sentence}</SentenceBlock>
                    </ExpansionStep>
                ))}
            </ExpansionContainer>

            <RuleSection themeColor={themeColor}>
                <RuleTitle>💡 常见顺序</RuleTitle>
                <RuleExplanation>
                    如果一个句子要同时加“怎样 / 在哪里 / 什么时候”，常见顺序是：
                </RuleExplanation>
                <RuleDiagram>
                    <RuleBox>
                        <h4>方式 How</h4>
                        <span>quickly, happily, well</span>
                    </RuleBox>
                    <RuleArrow>→</RuleArrow>
                    <RuleBox>
                        <h4>地点 Where</h4>
                        <span>in the park, at school</span>
                    </RuleBox>
                    <RuleArrow>→</RuleArrow>
                    <RuleBox>
                        <h4>时间 When</h4>
                        <span>every day, after class</span>
                    </RuleBox>
                </RuleDiagram>
                <RuleExample>
                    <p>例如：</p>
                    <div>
                        He speaks English <CorrectOrder>well</CorrectOrder> <CorrectOrder>at school</CorrectOrder> <CorrectOrder>every day</CorrectOrder>.
                        <br />
                        <OrderBreakdown>方式 → 地点 → 时间</OrderBreakdown>
                    </div>
                </RuleExample>
            </RuleSection>

            <MultipleChoicePractice
                themeColor={themeColor}
                practiceData={orderMiniPracticeData}
                title="⚡ Fast Check 2"
                subtitle="再练顺序"
                completionTitle="👏 Great!"
                completionMessage="顺序感觉已经出来了。下面开始正式练习。"
                nextButtonText="继续"
                hideCompletionButton
            />

            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={() => {}}
                practiceData={buildPracticeData}
                title="🎯 练习 1：组长句"
                subtitle="把句子扩展完整，正式练习一共 8 题"
                completionTitle="🎉 Good Job!"
                completionMessage="组句这组做完了。下面还有 8 题填空练习。"
                nextButtonText="继续"
                hideCompletionButton
            />

            <FillInTheBlankPractice
                themeColor={themeColor}
                onCompleteAll={onBack}
                practiceData={fillPracticeData}
                title="🎯 练习 2：补充信息"
                subtitle="再做 8 题，选最合适的扩展内容"
                completionTitle="🎉 太棒了!"
                completionMessage="你已经会把简单句扩长了。"
                nextButtonText="返回基础句型结构 →"
            />
        </LessonContainer>
    );
};
