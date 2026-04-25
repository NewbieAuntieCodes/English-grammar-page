/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import styled from 'styled-components';
import {
    LessonContainer,
    LessonTitle,
    BackButton,
    WhyLearnSection,
    SectionTitle,
} from './SVOContent.styles';
import { LessonList, LessonItem, LessonTitleChinese, LessonTitleEnglish } from './StructuresContent.styles';
import { MultipleChoicePractice } from '../../practice/MultipleChoicePractice';
import { SVOCNounContent } from './SVOCNounContent';
import { SVOCAdjectiveContent } from './SVOCAdjectiveContent';

interface SVOCContentProps {
    onBack: () => void;
    themeColor: string;
}

const QuickGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin: 24px 0;
`;

const QuickCard = styled.div<{ themeColor: string }>`
    background: white;
    border-radius: 18px;
    padding: 18px 16px;
    text-align: center;
    border: 2px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
`;

const QuickCardTitle = styled.div<{ themeColor: string }>`
    color: ${props => props.themeColor};
    font-size: 1.15em;
    font-weight: 800;
`;

const QuickCardHint = styled.div`
    margin-top: 8px;
    color: #4a5568;
    font-weight: 700;
    font-size: 0.95em;
`;

const QuickCardExample = styled.div`
    margin-top: 8px;
    color: #718096;
    font-size: 0.9em;
`;

const CompareGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
    margin: 20px 0 28px;
`;

const CompareCard = styled.div`
    background: white;
    border-radius: 18px;
    padding: 18px;
    border: 2px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
`;

const CompareSentence = styled.div`
    font-size: 1.2em;
    font-weight: 800;
    color: #2d3748;
    text-align: center;
`;

const CompareHint = styled.div`
    margin-top: 10px;
    text-align: center;
    color: #718096;
    font-size: 0.92em;
    font-weight: 700;
`;

const partMiniPracticeData = [
    {
        question: '句子：They named him John. 哪个词是在补充说明 him？',
        choices: [
            { text: 'John', isCorrect: true },
            { text: 'named', isCorrect: false },
            { text: 'They', isCorrect: false },
        ],
        chineseHint: '宾补是在补充说明宾语。',
    },
    {
        question: '句子：The joke made him happy. 哪个词是在描述 him？',
        choices: [
            { text: 'happy', isCorrect: true },
            { text: 'made', isCorrect: false },
            { text: 'joke', isCorrect: false },
        ],
        chineseHint: '宾补可以是形容词。',
    },
    {
        question: '主谓宾宾补里面，宾补是在说明谁？',
        choices: [
            { text: '宾语', isCorrect: true },
            { text: '主语', isCorrect: false },
            { text: '谓语', isCorrect: false },
        ],
        chineseHint: '宾补是补充说明宾语，不是主语。',
    },
    {
        question: '句子：We call our dog Max. 哪个是宾语？',
        choices: [
            { text: 'our dog', isCorrect: true },
            { text: 'Max', isCorrect: false },
            { text: 'call', isCorrect: false },
        ],
        chineseHint: '宾语是被“叫”的那个对象。',
    },
];

const judgeMiniPracticeData = [
    {
        question: '句子：They named him John. 这是主谓宾宾补吗？',
        choices: [
            { text: '是', isCorrect: true },
            { text: '不是', isCorrect: false },
        ],
        chineseHint: 'him 后面还有 John，在补充说明 him。',
    },
    {
        question: '句子：I like apples. 这是主谓宾宾补吗？',
        choices: [
            { text: '不是', isCorrect: true },
            { text: '是', isCorrect: false },
        ],
        chineseHint: '这里只有主谓宾，没有宾补。',
    },
    {
        question: '句子：The joke made me happy. 这是主谓宾宾补吗？',
        choices: [
            { text: '是', isCorrect: true },
            { text: '不是', isCorrect: false },
        ],
        chineseHint: 'happy 在补充说明 me。',
    },
    {
        question: '句子：She is a teacher. 这是主谓宾宾补吗？',
        choices: [
            { text: '不是', isCorrect: true },
            { text: '是', isCorrect: false },
        ],
        chineseHint: '这是主系表，不是主谓宾宾补。',
    },
];

export const SVOCContent: React.FC<SVOCContentProps> = ({ onBack, themeColor }) => {
    const [view, setView] = useState<'menu' | 'noun' | 'adjective'>('menu');

    if (view === 'noun') {
        return (
            <SVOCNounContent
                onBack={() => setView('menu')}
                themeColor={themeColor}
                onCompleteAll={() => setView('adjective')}
            />
        );
    }

    if (view === 'adjective') {
        return (
            <SVOCAdjectiveContent
                onBack={() => setView('menu')}
                themeColor={themeColor}
                onCompleteAll={onBack}
            />
        );
    }

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Main List</BackButton>

            <LessonTitle>🏗️ Subject + Verb + Object + Complement (主谓宾宾补)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 先抓住一个点</SectionTitle>
                <p>宾补就是：<strong>宾语后面还有一个词，继续补充说明宾语。</strong></p>
            </WhyLearnSection>

            <QuickGrid>
                <QuickCard themeColor={themeColor}>
                    <QuickCardTitle themeColor={themeColor}>Subject</QuickCardTitle>
                    <QuickCardHint>谁做</QuickCardHint>
                    <QuickCardExample>They / The joke</QuickCardExample>
                </QuickCard>
                <QuickCard themeColor={themeColor}>
                    <QuickCardTitle themeColor={themeColor}>Verb</QuickCardTitle>
                    <QuickCardHint>做了什么</QuickCardHint>
                    <QuickCardExample>named / made</QuickCardExample>
                </QuickCard>
                <QuickCard themeColor={themeColor}>
                    <QuickCardTitle themeColor={themeColor}>Object</QuickCardTitle>
                    <QuickCardHint>对谁 / 什么</QuickCardHint>
                    <QuickCardExample>him / me</QuickCardExample>
                </QuickCard>
                <QuickCard themeColor={themeColor}>
                    <QuickCardTitle themeColor={themeColor}>Complement</QuickCardTitle>
                    <QuickCardHint>补充说明宾语</QuickCardHint>
                    <QuickCardExample>John / happy</QuickCardExample>
                </QuickCard>
            </QuickGrid>

            <CompareGrid>
                <CompareCard>
                    <CompareSentence>They named him John.</CompareSentence>
                    <CompareHint>`John` 是给 `him` 取的名字</CompareHint>
                </CompareCard>
                <CompareCard>
                    <CompareSentence>The joke made him happy.</CompareSentence>
                    <CompareHint>`happy` 是在描述 `him` 的状态</CompareHint>
                </CompareCard>
            </CompareGrid>

            <MultipleChoicePractice
                themeColor={themeColor}
                practiceData={partMiniPracticeData}
                title="⚡ Fast Check 1"
                subtitle="先看懂宾补是在说明谁"
                completionTitle="👏 Nice!"
                completionMessage="这一组完成了。下面还有一组判断题，也可以直接去点上面的类型。"
                nextButtonText="继续"
                hideCompletionButton
            />

            <MultipleChoicePractice
                themeColor={themeColor}
                practiceData={judgeMiniPracticeData}
                title="⚡ Fast Check 2"
                subtitle="再判断哪些句子是主谓宾宾补"
                completionTitle="👏 Great!"
                completionMessage="你已经抓到主谓宾宾补了，上面的两种类型可以直接进入。"
                nextButtonText="继续"
                hideCompletionButton
            />

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>🧩 再分两种</SectionTitle>
                <p>前面热身做完了，再往下就是两种正式类型。</p>
            </WhyLearnSection>

            <LessonList>
                <LessonItem borderColor={themeColor} onClick={() => setView('noun')}>
                    <LessonTitleChinese>类型一：宾补是名词</LessonTitleChinese>
                    <LessonTitleEnglish>Type 1: Noun as Complement</LessonTitleEnglish>
                </LessonItem>
                <LessonItem borderColor={themeColor} onClick={() => setView('adjective')}>
                    <LessonTitleChinese>类型二：宾补是形容词</LessonTitleChinese>
                    <LessonTitleEnglish>Type 2: Adjective as Complement</LessonTitleEnglish>
                </LessonItem>
            </LessonList>
        </LessonContainer>
    );
};
