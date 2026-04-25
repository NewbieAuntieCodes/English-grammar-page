/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
    ExampleBreakdown,
    BreakdownPart,
} from './SVOContent.styles';
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';
import { MultipleChoicePractice } from '../../practice/MultipleChoicePractice';
import { FillInTheBlankPractice } from '../../practice/FillInTheBlankPractice';

interface SVOCNounContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const QuickGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin: 24px 0;
`;

const QuickCard = styled.div`
    background: white;
    border-radius: 18px;
    padding: 18px 16px;
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
    font-size: 0.95em;
`;

const QuickCardExample = styled.div`
    margin-top: 8px;
    color: #718096;
    font-size: 0.9em;
`;

const CompareCard = styled.div`
    background: white;
    border-radius: 18px;
    padding: 18px;
    border: 2px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
    margin: 20px 0 28px;
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

const practiceData = {
    basic: [
        { words: [{ en: 'We', cn: '我们' }, { en: 'call', cn: '称' }, { en: 'him', cn: '他' }, { en: 'a hero', cn: '英雄' }], correct: ['We', 'call', 'him', 'a hero'], chinese: '我们称他为英雄' },
        { words: [{ en: 'His parents', cn: '他父母' }, { en: 'named', cn: '命名' }, { en: 'him', cn: '他' }, { en: 'John', cn: '约翰' }], correct: ['His parents', 'named', 'him', 'John'], chinese: '他的父母给他取名约翰' },
        { words: [{ en: 'I', cn: '我' }, { en: 'call', cn: '叫' }, { en: 'my dog', cn: '我的狗' }, { en: '"Max"', cn: '“麦克斯”' }], correct: ['I', 'call', 'my dog', '"Max"'], chinese: '我叫我的狗“麦克斯”' },
        { words: [{ en: 'They', cn: '他们' }, { en: 'made', cn: '让' }, { en: 'him', cn: '他' }, { en: 'captain', cn: '队长' }], correct: ['They', 'made', 'him', 'captain'], chinese: '他们让他当上了队长' },
        { words: [{ en: 'We', cn: '我们' }, { en: 'think', cn: '认为' }, { en: 'him', cn: '他' }, { en: 'a good boy', cn: '好男孩' }], correct: ['We', 'think', 'him', 'a good boy'], chinese: '我们认为他是个好孩子' },
        { words: [{ en: 'The club', cn: '俱乐部' }, { en: 'chose', cn: '选择' }, { en: 'her', cn: '她' }, { en: 'leader', cn: '领袖' }], correct: ['The club', 'chose', 'her', 'leader'], chinese: '俱乐部选择了她当领袖' },
        { words: [{ en: 'People', cn: '人们' }, { en: 'elected', cn: '选举' }, { en: 'him', cn: '他' }, { en: 'president', cn: '总统' }], correct: ['People', 'elected', 'him', 'president'], chinese: '人们选举他为总统' },
        { words: [{ en: 'I', cn: '我' }, { en: 'consider', cn: '认为' }, { en: 'it', cn: '它' }, { en: 'a mistake', cn: '一个错误' }], correct: ['I', 'consider', 'it', 'a mistake'], chinese: '我认为这是一个错误' },
    ]
};

const completeMiniPracticeData1 = [
    {
        question: 'We call our baby ___.',
        choices: [
            { text: 'Lily', isCorrect: true },
            { text: 'happy', isCorrect: false },
            { text: 'school', isCorrect: false },
        ],
        chineseHint: '我们叫我们的宝宝 Lily。',
    },
    {
        question: 'The class chose Tom ___.',
        choices: [
            { text: 'monitor', isCorrect: true },
            { text: 'angry', isCorrect: false },
            { text: 'quickly', isCorrect: false },
        ],
        chineseHint: '全班选 Tom 当班长。',
    },
    {
        question: 'They named the cat ___.',
        choices: [
            { text: 'Coco', isCorrect: true },
            { text: 'cold', isCorrect: false },
            { text: 'room', isCorrect: false },
        ],
        chineseHint: '他们给猫取名 Coco。',
    },
    {
        question: 'We consider him ___.',
        choices: [
            { text: 'a friend', isCorrect: true },
            { text: 'tidy', isCorrect: false },
            { text: 'run', isCorrect: false },
        ],
        chineseHint: '我们认为他是朋友。',
    },
];

const completeMiniPracticeData2 = [
    {
        question: 'People elected her ___.',
        choices: [
            { text: 'president', isCorrect: true },
            { text: 'excited', isCorrect: false },
            { text: 'the park', isCorrect: false },
        ],
        chineseHint: '人们选她当总统。',
    },
    {
        question: 'They made him ___.',
        choices: [
            { text: 'captain', isCorrect: true },
            { text: 'sad', isCorrect: false },
            { text: 'quietly', isCorrect: false },
        ],
        chineseHint: '他们让他当队长。',
    },
    {
        question: 'We call this place ___.',
        choices: [
            { text: 'home', isCorrect: true },
            { text: 'noisy', isCorrect: false },
            { text: 'under', isCorrect: false },
        ],
        chineseHint: '我们把这个地方叫作家。',
    },
    {
        question: 'The team chose Emma ___.',
        choices: [
            { text: 'leader', isCorrect: true },
            { text: 'blue', isCorrect: false },
            { text: 'jump', isCorrect: false },
        ],
        chineseHint: '队里选 Emma 当队长。',
    },
];

const fillPracticeData = [
    { sentenceParts: ['We call our teacher ', '.'] as const, choices: [{ text: 'Mr. Li', isCorrect: true }, { text: 'careful', isCorrect: false }, { text: 'quickly', isCorrect: false }], chineseHint: '我们叫老师李老师。' },
    { sentenceParts: ['They named the baby ', '.'] as const, choices: [{ text: 'Lucy', isCorrect: true }, { text: 'hungry', isCorrect: false }, { text: 'table', isCorrect: false }], chineseHint: '他们给宝宝取名 Lucy。' },
    { sentenceParts: ['The students chose Ben ', '.'] as const, choices: [{ text: 'monitor', isCorrect: true }, { text: 'open', isCorrect: false }, { text: 'under', isCorrect: false }], chineseHint: '学生们选 Ben 当班长。' },
    { sentenceParts: ['People consider him ', '.'] as const, choices: [{ text: 'a genius', isCorrect: true }, { text: 'sleepy', isCorrect: false }, { text: 'yesterday', isCorrect: false }], chineseHint: '人们认为他是天才。' },
    { sentenceParts: ['We elected her ', '.'] as const, choices: [{ text: 'captain', isCorrect: true }, { text: 'soft', isCorrect: false }, { text: 'behind', isCorrect: false }], chineseHint: '我们选她当队长。' },
    { sentenceParts: ['His friends call him ', '.'] as const, choices: [{ text: 'Ace', isCorrect: true }, { text: 'warm', isCorrect: false }, { text: 'from China', isCorrect: false }], chineseHint: '他的朋友们叫他 Ace。' },
    { sentenceParts: ['The club made Sarah ', '.'] as const, choices: [{ text: 'leader', isCorrect: true }, { text: 'careful', isCorrect: false }, { text: 'after class', isCorrect: false }], chineseHint: '俱乐部让 Sarah 当负责人。' },
    { sentenceParts: ['I consider this book ', '.'] as const, choices: [{ text: 'a classic', isCorrect: true }, { text: 'noisy', isCorrect: false }, { text: 'on Monday', isCorrect: false }], chineseHint: '我认为这本书是经典。' },
];

export const SVOCNounContent: React.FC<SVOCNounContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [activeExample, setActiveExample] = useState<string | null>(null);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        const loadVoices = () => {
            setVoices(window.speechSynthesis.getVoices());
        };
        if ('speechSynthesis' in window) {
            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
        return () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.onvoiceschanged = null;
            }
        };
    }, []);

    const handleToggleBreakdown = (exampleId: string) => {
        setActiveExample(prev => (prev === exampleId ? null : exampleId));
    };

    const handleSpeak = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            const usVoice = voices.find(voice => voice.lang === 'en-US');
            utterance.voice = usVoice || voices.find(voice => voice.lang.startsWith('en-')) || null;
            utterance.rate = 0.9;
            utterance.pitch = 1.1;
            window.speechSynthesis.speak(utterance);
        } else {
            alert("Sorry, your browser doesn't support text-to-speech.");
        }
    };
    
    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Menu</BackButton>

            <LessonTitle>🏗️ S + V + O + Noun Complement (主谓宾宾补-名词)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 先抓一个点</SectionTitle>
                <p>最后那个名词，不是在说主语，是在继续说明宾语是谁、叫什么、是什么身份。</p>
            </WhyLearnSection>

            <QuickGrid>
                <QuickCard>
                    <QuickCardTitle themeColor={themeColor}>Object</QuickCardTitle>
                    <QuickCardHint>宾语</QuickCardHint>
                    <QuickCardExample>him / her / our dog</QuickCardExample>
                </QuickCard>
                <QuickCard>
                    <QuickCardTitle themeColor={themeColor}>Noun Complement</QuickCardTitle>
                    <QuickCardHint>名字 / 身份</QuickCardHint>
                    <QuickCardExample>John / leader / a hero</QuickCardExample>
                </QuickCard>
            </QuickGrid>

            <CompareCard>
                <CompareSentence>They named him John.</CompareSentence>
                <CompareHint>him = John</CompareHint>
            </CompareCard>

            <MultipleChoicePractice
                themeColor={themeColor}
                practiceData={completeMiniPracticeData1}
                title="⚡ Fast Check 1"
                subtitle="先直接补全名词宾补"
                completionTitle="👏 Nice!"
                completionMessage="这一组完成了。下面还有一组补全题，已经在页面里。"
                nextButtonText="继续"
                hideCompletionButton
            />

            <MultipleChoicePractice
                themeColor={themeColor}
                practiceData={completeMiniPracticeData2}
                title="⚡ Fast Check 2"
                subtitle="再做一组补全题"
                completionTitle="👏 Great!"
                completionMessage="下面看 1 个例子，然后直接做正式练习。"
                nextButtonText="继续"
                hideCompletionButton
            />

            <ExamplesSection>
                <SectionTitle>📝 One Example</SectionTitle>
                <ExampleItem onClick={() => handleToggleBreakdown('ex1')} themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>They named their son "Leo".</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('They named their son "Leo".'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他们给儿子取名叫“里奥”。</ExampleChinese>
                    <ExampleBreakdown show={activeExample === 'ex1'} themeColor={themeColor}>
                        <BreakdownPart><strong>主语 (Subject):</strong> They</BreakdownPart>
                        <BreakdownPart><strong>谓语 (Verb):</strong> named</BreakdownPart>
                        <BreakdownPart><strong>宾语 (Object):</strong> their son</BreakdownPart>
                        <BreakdownPart><strong>宾补 (Complement):</strong> "Leo"</BreakdownPart>
                    </ExampleBreakdown>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={() => {}}
                practiceData={practiceData.basic}
                title="🎯 Practice: Build a sentence"
                subtitle="练习：用下面的词组成句子"
                completionTitle="🎉 Great Job!"
                completionMessage="组句练习完成。下面还有新的填空练习。"
                nextButtonText="学习形容词宾补 (Adjective)"
                hideCompletionButton
            />

            <FillInTheBlankPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={fillPracticeData}
                title="🎯 Practice: Fill in the complement"
                subtitle="练习：选择合适的名词宾补"
                completionTitle="🎉 Great Job!"
                completionMessage="名词宾补完成了。点下面进入形容词宾补。"
                nextButtonText="进入形容词宾补 →"
            />
        </LessonContainer>
    );
};
