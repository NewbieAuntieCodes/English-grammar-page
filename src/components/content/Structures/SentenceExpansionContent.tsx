/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { LessonContainer, BackButton, LessonTitle, WhyLearnSection, SectionTitle } from './SVOContent.styles';
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';
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

// Data for the first example
const birdExampleSteps = [
    {
        step: '核',
        title: '核心句子 (Core Sentence)',
        explanation: '一个完整的句子至少需要主语和谓语。这个核心句子表达了一个完整的思想。',
        sentence: <>A bird sings.</>,
    },
    {
        step: '1',
        title: '+ 形容词 (Adjective)',
        explanation: '回答 “什么样的鸟?” 我们可以加上一个形容词来描述主语。规则：形容词通常放在它修饰的名词前面。',
        sentence: <>A <strong>small</strong> bird sings.</>,
    },
    {
        step: '2',
        title: '+ 地点 (Where)',
        explanation: '回答 “在哪里唱?” 我们可以加上一个表示地点的介词短语。规则：地点状语通常放在句子的末尾。',
        sentence: <>A small bird sings <strong>in the tree</strong>.</>,
    },
    {
        step: '3',
        title: '+ 方式 (How)',
        explanation: '回答 “怎样唱?” 我们可以加上一个副词来描述动作的方式。规则：方式副词通常紧跟在动词后面，或在地点状语之前。',
        sentence: <>A small bird sings <strong>happily</strong> in the tree.</>,
    },
    {
        step: '4',
        title: '+ 时间 (When)',
        explanation: '回答 “什么时候唱?” 我们可以加上一个时间状语。规则：时间状语通常放在句子的最末尾，在地点和方式之后。',
        sentence: <>A small bird sings happily in the tree <strong>every morning</strong>.</>,
    }
];

// Data for the second example
const basketballExampleSteps = [
    {
        step: '核',
        title: '核心句子 (Core Sentence)',
        explanation: '这是一个主谓宾 (SVO) 结构的核心句，包含了一个动作和动作的对象。',
        sentence: <>He plays basketball.</>,
    },
    {
        step: '1',
        title: '+ 方式 (How)',
        explanation: '回答 “打得怎么样?” 我们可以加上一个副词。规则：在“主谓宾”结构中，方式副词通常放在宾语的后面。',
        sentence: <>He plays basketball <strong>well</strong>.</>,
    },
    {
        step: '2',
        title: '+ 和谁一起 (With Whom)',
        explanation: '回答 “和谁一起打?” 我们可以加上一个介词短语。规则：这类补充信息通常添加到句子的后半部分，跟在核心成分之后。',
        sentence: <>He plays basketball well <strong>with his friends</strong>.</>,
    },
    {
        step: '3',
        title: '+ 地点 (Where)',
        explanation: '回答 “在哪里打?” 我们可以加上另一个表示地点的介词短语。规则：英语中状语的常见顺序是：方式 → 地点 → 时间。所以地点放在方式之后。',
        sentence: <>He plays basketball well with his friends <strong>at the park</strong>.</>,
    },
    {
        step: '4',
        title: '+ 时间 (When)',
        explanation: '回答 “什么时候打?” 我们可以加上一个时间状语。规则：按照“方式 → 地点 → 时间”的顺序，时间状语放在最后。',
        sentence: <>He plays basketball well with his friends at the park <strong>after school</strong>.</>,
    }
];


const practiceData = [
    { 
        words: [
            { en: 'The', cn: '这只' }, 
            { en: 'happy', cn: '快乐的' }, 
            { en: 'dog', cn: '狗' }, 
            { en: 'runs', cn: '奔跑' }, 
            { en: 'in the garden', cn: '在花园里' }
        ], 
        correct: ['The', 'happy', 'dog', 'runs', 'in the garden'], 
        chinese: '快乐的狗在花园里奔跑。' 
    },
    { 
        words: [
            { en: 'She', cn: '她' }, 
            { en: 'eats', cn: '吃' }, 
            { en: 'an apple', cn: '一个苹果' }, 
            { en: 'quickly', cn: '迅速地' }, 
            { en: 'at her desk', cn: '在她的桌子上' }
        ], 
        correct: ['She', 'eats', 'an apple', 'quickly', 'at her desk'], 
        chinese: '她在办公桌上迅速地吃了一个苹果。' 
    },
    { 
        words: [
            { en: 'My brother', cn: '我哥哥' }, 
            { en: 'studies', cn: '学习' }, 
            { en: 'hard', cn: '努力地' }, 
            { en: 'every night', cn: '每天晚上' }
        ], 
        correct: ['My brother', 'studies', 'hard', 'every night'], 
        chinese: '我哥哥每天晚上都努力学习。' 
    },
    { 
        words: [
            { en: 'They', cn: '他们' }, 
            { en: 'watched', cn: '看了' }, 
            { en: 'a movie', cn: '一部电影' }, 
            { en: 'together', cn: '一起' }, 
            { en: 'last Sunday', cn: '上周日' }
        ], 
        correct: ['They', 'watched', 'a movie', 'together', 'last Sunday'], 
        chinese: '他们上周日一起看了一部电影。' 
    },
    { 
        words: [
            { en: 'The', cn: '这些' },
            { en: 'beautiful', cn: '美丽的' },
            { en: 'flowers', cn: '花' },
            { en: 'grow', cn: '生长' },
            { en: 'in the valley', cn: '在山谷里' },
            { en: 'in spring', cn: '在春天' }
        ], 
        correct: ['The', 'beautiful', 'flowers', 'grow', 'in the valley', 'in spring'], 
        chinese: '美丽的鲜花春天在山谷里生长。' 
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
                <SectionTitle>💡 为什么要扩展句子？</SectionTitle>
                <p>
                    简单的句子就像骨架，虽然正确但不够生动。通过添加形容词、副词、介词短语等“血肉”，我们可以让句子变得更丰富、更具体、更有画面感，从而更准确地表达我们的意思！
                </p>
            </WhyLearnSection>
            
            <SectionTitle>📈 如何一步步扩展句子？</SectionTitle>

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
                     <ExpansionStep key={step.title} data-step={step.step}>
                        <StepHeader>{step.title}</StepHeader>
                        <StepExplanation>{step.explanation}</StepExplanation>
                        <SentenceBlock>{step.sentence}</SentenceBlock>
                    </ExpansionStep>
                ))}
            </ExpansionContainer>
            
            <RuleSection themeColor={themeColor}>
                <RuleTitle>💡 顺序黄金法则：把它们放在一起</RuleTitle>
                <RuleExplanation>
                    当你需要添加多个补充信息（状语）时，它们通常遵循一个固定的顺序。记住这个简单的规则，你的句子就会听起来非常自然！
                </RuleExplanation>
                <RuleDiagram>
                    <RuleBox>
                        <h4>方式 (How)</h4>
                        <span>happily, quickly, well, together</span>
                    </RuleBox>
                    <RuleArrow>→</RuleArrow>
                    <RuleBox>
                        <h4>地点 (Where)</h4>
                        <span>at the park, in the tree, at her desk</span>
                    </RuleBox>
                    <RuleArrow>→</RuleArrow>
                    <RuleBox>
                        <h4>时间 (When)</h4>
                        <span>every morning, after school, last Sunday</span>
                    </RuleBox>
                </RuleDiagram>
                <RuleExample>
                    <p><strong>例如 (Examples):</strong></p>
                    <div>
                        She eats an apple <CorrectOrder>quickly</CorrectOrder> <CorrectOrder>at her desk</CorrectOrder>.
                        <br />
                        <OrderBreakdown>(方式 How) → (地点 Where)</OrderBreakdown>
                    </div>
                    <div>
                        They watched a movie <CorrectOrder>together</CorrectOrder> <CorrectOrder>last Sunday</CorrectOrder>.
                        <br />
                        <OrderBreakdown>(方式 How) → (时间 When)</OrderBreakdown>
                    </div>
                </RuleExample>
            </RuleSection>

            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onBack}
                practiceData={practiceData}
                title="🎯 练习：扩展你的句子！"
                subtitle="用下面的词语，根据“方式→地点→时间”的顺序，组成一个完整、丰富的句子。"
                completionTitle="🎉 太棒了!"
                completionMessage="你现在知道如何让句子变得更生动了！"
                nextButtonText="返回列表"
            />

        </LessonContainer>
    );
};