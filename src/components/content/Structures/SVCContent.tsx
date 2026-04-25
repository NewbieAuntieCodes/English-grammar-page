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
    FormulaSection,
    FormulaTitle,
    FormulaParts,
    PlusSign,
    ExamplesSection,
    ExampleItem,
    ExampleHeader,
    SpeakButton,
    ExampleEnglish,
    ExampleChinese,
    ExampleBreakdown,
    BreakdownPart,
    SVOFormulaPart,
    SVOPartEnglish,
    SVOPartChinese,
    SVOPartDivider,
    SVOPartOfSpeechInfo,
    SVOPartOfSpeechText,
    SVOPartOfSpeechTextEng
} from './SVOContent.styles'; // Re-use SVO styles
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';
import { MultipleChoicePractice } from '../../practice/MultipleChoicePractice';


interface SVCContentProps {
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
    font-size: 1.2em;
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

const TypeGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    margin: 24px 0;
`;

const SplitSection = styled.div`
    margin: 26px 0;
`;

const SplitTitle = styled.div<{ themeColor: string }>`
    color: ${props => props.themeColor};
    font-size: 1.2em;
    font-weight: 900;
    margin-bottom: 8px;
`;

const SplitHint = styled.div`
    color: #4a5568;
    font-weight: 700;
    margin-bottom: 14px;
`;

const TypeCard = styled.div<{ themeColor: string }>`
    background: white;
    border-radius: 18px;
    padding: 18px;
    border: 2px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
`;

const TypeTitle = styled.div<{ themeColor: string }>`
    color: ${props => props.themeColor};
    font-size: 1.05em;
    font-weight: 800;
    text-align: center;
`;

const TypeMain = styled.div`
    margin-top: 8px;
    text-align: center;
    color: #2d3748;
    font-weight: 800;
`;

const TypeSub = styled.div`
    margin-top: 8px;
    text-align: center;
    color: #718096;
    font-size: 0.92em;
    line-height: 1.6;
`;

const practiceData = {
    basic: [
        { words: [{ en: 'She', cn: '她' }, { en: 'is', cn: '是' }, { en: 'happy', cn: '开心的' }], correct: ['She', 'is', 'happy'], chinese: '她很开心' },
        { words: [{ en: 'They', cn: '他们' }, { en: 'are', cn: '是' }, { en: 'doctors', cn: '医生' }], correct: ['They', 'are', 'doctors'], chinese: '他们是医生' },
        { words: [{ en: 'The food', cn: '食物' }, { en: 'tastes', cn: '尝起来' }, { en: 'delicious', cn: '美味的' }], correct: ['The food', 'tastes', 'delicious'], chinese: '食物尝起来很美味' },
        { words: [{ en: 'I', cn: '我' }, { en: 'feel', cn: '感觉' }, { en: 'cold', cn: '冷的' }], correct: ['I', 'feel', 'cold'], chinese: '我感觉很冷' },
        { words: [{ en: 'It', cn: '它' }, { en: 'sounds', cn: '听起来' }, { en: 'great', cn: '很棒' }], correct: ['It', 'sounds', 'great'], chinese: '这听起来很棒' },
        { words: [{ en: 'He', cn: '他' }, { en: 'seems', cn: '似乎' }, { en: 'tired', cn: '累了' }], correct: ['He', 'seems', 'tired'], chinese: '他看起来很累' },
        { words: [{ en: 'You', cn: '你' }, { en: 'look', cn: '看起来' }, { en: 'beautiful', cn: '漂亮的' }], correct: ['You', 'look', 'beautiful'], chinese: '你看起来很漂亮' },
        { words: [{ en: 'The flowers', cn: '花' }, { en: 'smell', cn: '闻起来' }, { en: 'sweet', cn: '香甜的' }], correct: ['The flowers', 'smell', 'sweet'], chinese: '花闻起来很香甜' },
        { words: [{ en: 'His story', cn: '他的故事' }, { en: 'became', cn: '变得' }, { en: 'famous', cn: '有名的' }], correct: ['His story', 'became', 'famous'], chinese: '他的故事变得有名了' },
    ]
};

const partMiniPracticeData = [
    {
        question: '句子：She is happy. 哪个词在描述 She？',
        choices: [
            { text: 'happy', isCorrect: true },
            { text: 'is', isCorrect: false },
            { text: 'She', isCorrect: false },
        ],
        chineseHint: '表语就是“是什么 / 怎么样”。',
    },
    {
        question: '句子：The soup tastes good. 哪个是系动词？',
        choices: [
            { text: 'tastes', isCorrect: true },
            { text: 'good', isCorrect: false },
            { text: 'soup', isCorrect: false },
        ],
        chineseHint: '系动词连接主语和描述词。',
    },
    {
        question: '句子：He is a teacher. 哪个是表语？',
        choices: [
            { text: 'a teacher', isCorrect: true },
            { text: 'He', isCorrect: false },
            { text: 'is', isCorrect: false },
        ],
        chineseHint: '表语说明主语是什么。',
    },
    {
        question: '主系表里面，中间通常是什么？',
        choices: [
            { text: '系动词', isCorrect: true },
            { text: '宾语', isCorrect: false },
            { text: '状语', isCorrect: false },
        ],
        chineseHint: '主 + 系动词 + 表语',
    },
];

const judgeMiniPracticeData = [
    {
        question: '句子：He is tall. 这是主系表吗？',
        choices: [
            { text: '是', isCorrect: true },
            { text: '不是', isCorrect: false },
        ],
        chineseHint: 'He / is / tall',
    },
    {
        question: '句子：I like apples. 这是主系表吗？',
        choices: [
            { text: '不是', isCorrect: true },
            { text: '是', isCorrect: false },
        ],
        chineseHint: '这是主谓宾，不是主系表。',
    },
    {
        question: '句子：The flowers smell sweet. 这是主系表吗？',
        choices: [
            { text: '是', isCorrect: true },
            { text: '不是', isCorrect: false },
        ],
        chineseHint: 'smell 在这里是“闻起来”。',
    },
    {
        question: '句子：I smell the flowers. 这是主系表吗？',
        choices: [
            { text: '不是', isCorrect: true },
            { text: '是', isCorrect: false },
        ],
        chineseHint: '这里是动作“闻”，后面是宾语。',
    },
];


export const SVCContent: React.FC<SVCContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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

    const handleExplainPart = (part: 'subject' | 'verb' | 'complement') => {
        const explanations = {
            subject: "主语 (Subject): 句子的主角，是动作的发出者。\n\n它通常由【名词】(Noun) 或【代词】(Pronoun) 担任。\n\n例如：\n- 名词: The food, The sky\n- 代词: I, She, They",
            verb: "系动词 (Linking Verb): 不表示具体动作，像一座桥梁，连接主语和描述它的词。\n\n它本身也是一种【动词】。\n\n主系表里常见的还有感官动词作系动词，例如：look, sound, smell, taste, feel。\n\n这时它们表示‘看起来 / 听起来 / 闻起来 / 尝起来 / 感觉起来怎么样’，后面通常接形容词或名词性表语。\n\n例如：The soup tastes delicious. / She looks happy.",
            complement: "表语 (Complement): 用来描述主语，说明主语的身份、状态或特征。\n\n它可以是：\n1. 【名词】(Noun) - 用来识别主语是什么。\n   - 例: He is a doctor. (doctor 识别 He)\n\n2. 【形容词】(Adjective) - 用来描述主语怎么样。\n   - 例: The sky is blue. (blue 描述 The sky)"
        };
        alert(explanations[part]);
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
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Lessons</BackButton>

            <LessonTitle>🏗️ Subject + Linking Verb + Complement (主系表)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？Why learn this?</SectionTitle>
                <p>这个句型用来描述主语的状态、身份或特征。比如'我是学生'或'天气很好'。它和SVO一样重要，是表达'是什么'和'怎么样'的关键！</p>
            </WhyLearnSection>

            <QuickGrid>
                <QuickCard themeColor={themeColor}>
                    <QuickCardTitle themeColor={themeColor}>Subject</QuickCardTitle>
                    <QuickCardHint>谁 / 什么</QuickCardHint>
                    <QuickCardExample>She / The soup</QuickCardExample>
                </QuickCard>
                <QuickCard themeColor={themeColor}>
                    <QuickCardTitle themeColor={themeColor}>Linking Verb</QuickCardTitle>
                    <QuickCardHint>是 / 看起来 / 闻起来</QuickCardHint>
                    <QuickCardExample>is / looks / smells</QuickCardExample>
                </QuickCard>
                <QuickCard themeColor={themeColor}>
                    <QuickCardTitle themeColor={themeColor}>Complement</QuickCardTitle>
                    <QuickCardHint>是什么 / 怎么样</QuickCardHint>
                    <QuickCardExample>happy / a teacher</QuickCardExample>
                </QuickCard>
            </QuickGrid>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>🧩 分开看</SectionTitle>
                <p>不要一起记。先只看<strong>系动词</strong>，再看<strong>表语</strong>。</p>
            </WhyLearnSection>

            <SplitSection>
                <SplitTitle themeColor={themeColor}>1. 先看系动词</SplitTitle>
                <SplitHint>系动词常见两类：</SplitHint>
                <TypeGrid>
                    <TypeCard themeColor={themeColor}>
                        <TypeTitle themeColor={themeColor}>be 动词</TypeTitle>
                        <TypeMain>am / is / are</TypeMain>
                        <TypeSub>was / were</TypeSub>
                    </TypeCard>
                    <TypeCard themeColor={themeColor}>
                        <TypeTitle themeColor={themeColor}>感官 / 状态系动词</TypeTitle>
                        <TypeMain>look / sound / smell</TypeMain>
                        <TypeSub>taste / feel / seem / become</TypeSub>
                    </TypeCard>
                </TypeGrid>
            </SplitSection>

            <SplitSection>
                <SplitTitle themeColor={themeColor}>2. 再看表语</SplitTitle>
                <SplitHint>表语也常见两类：</SplitHint>
                <TypeGrid>
                    <TypeCard themeColor={themeColor}>
                        <TypeTitle themeColor={themeColor}>名词表语</TypeTitle>
                        <TypeMain>说明“是什么”</TypeMain>
                        <TypeSub>He is a teacher.</TypeSub>
                    </TypeCard>
                    <TypeCard themeColor={themeColor}>
                        <TypeTitle themeColor={themeColor}>形容词表语</TypeTitle>
                        <TypeMain>说明“怎么样”</TypeMain>
                        <TypeSub>The soup smells good.</TypeSub>
                    </TypeCard>
                </TypeGrid>
            </SplitSection>

            <FormulaSection themeColor={themeColor}>
                <FormulaTitle themeColor={themeColor}>Sentence Structure Formula</FormulaTitle>
                <FormulaParts>
                    <SVOFormulaPart themeColor={themeColor} onClick={() => handleExplainPart('subject')}>
                        <SVOPartEnglish>Subject</SVOPartEnglish>
                        <SVOPartChinese>主语</SVOPartChinese>
                        <SVOPartDivider />
                        <SVOPartOfSpeechInfo>
                            <SVOPartOfSpeechText>名词 / 代词</SVOPartOfSpeechText>
                            <SVOPartOfSpeechTextEng>(Noun / Pronoun)</SVOPartOfSpeechTextEng>
                        </SVOPartOfSpeechInfo>
                    </SVOFormulaPart>
                    <PlusSign themeColor={themeColor}>+</PlusSign>
                    <SVOFormulaPart themeColor={themeColor} onClick={() => handleExplainPart('verb')}>
                        <SVOPartEnglish>Linking Verb</SVOPartEnglish>
                        <SVOPartChinese>系动词</SVOPartChinese>
                        <SVOPartDivider />
                        <SVOPartOfSpeechInfo>
                            <SVOPartOfSpeechText>be动词 / 感官系动词</SVOPartOfSpeechText>
                            <SVOPartOfSpeechTextEng>(be verb / sense verb)</SVOPartOfSpeechTextEng>
                        </SVOPartOfSpeechInfo>
                    </SVOFormulaPart>
                    <PlusSign themeColor={themeColor}>+</PlusSign>
                    <SVOFormulaPart themeColor={themeColor} onClick={() => handleExplainPart('complement')}>
                        <SVOPartEnglish>Complement</SVOPartEnglish>
                        <SVOPartChinese>表语</SVOPartChinese>
                        <SVOPartDivider />
                        <SVOPartOfSpeechInfo>
                            <SVOPartOfSpeechText>名词表语 / 形容词表语</SVOPartOfSpeechText>
                            <SVOPartOfSpeechTextEng>(Noun / Adjective)</SVOPartOfSpeechTextEng>
                        </SVOPartOfSpeechInfo>
                    </SVOFormulaPart>
                </FormulaParts>
            </FormulaSection>

            <MultipleChoicePractice
                themeColor={themeColor}
                practiceData={partMiniPracticeData}
                title="⚡ Fast Check 1"
                subtitle="先分清系动词和表语"
                completionTitle="👏 Nice!"
                completionMessage="这一组完成了。下面那组和正式内容都已经在页面里。"
                nextButtonText="继续"
                hideCompletionButton
            />

            <MultipleChoicePractice
                themeColor={themeColor}
                practiceData={judgeMiniPracticeData}
                title="⚡ Fast Check 2"
                subtitle="再判断哪些句子是主系表"
                completionTitle="👏 Great!"
                completionMessage="你已经会判断主系表了，下面直接继续看例子或做练习。"
                nextButtonText="继续"
                hideCompletionButton
            />

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>👀 一个重点</SectionTitle>
                <p><strong>The soup tastes good.</strong> 是主系表，因为 <strong>good</strong> 在描述 <strong>the soup</strong>。</p>
                <p><strong>I taste the soup.</strong> 不是主系表，因为这里是动作“尝”，后面有宾语 <strong>the soup</strong>。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 One Example</SectionTitle>
                <ExampleItem onClick={() => handleToggleBreakdown('ex1')} themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The soup tastes delicious.</ExampleEnglish>
                        <SpeakButton
                          onClick={(e) => { e.stopPropagation(); handleSpeak('The soup tastes delicious.'); }}
                          aria-label="Speak sentence"
                        >
                            🔊
                        </SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这汤尝起来很美味。</ExampleChinese>
                    <ExampleBreakdown show={activeExample === 'ex1'} themeColor={themeColor}>
                        <BreakdownPart><strong>主语 (Subject):</strong> The soup (这汤)</BreakdownPart>
                        <BreakdownPart><strong>系动词 (Verb):</strong> tastes (尝起来)</BreakdownPart>
                        <BreakdownPart><strong>表语 (Complement):</strong> delicious (美味的)</BreakdownPart>
                    </ExampleBreakdown>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData.basic}
                title="🎯 Practice: Build a sentence using the words below"
                subtitle="练习：用下面的词组成句子"
                completionTitle="🎉 Excellent!"
                completionMessage="You have mastered the Subject-Verb-Complement structure."
                nextButtonText="跳到下一章。Next Page"
            />
        </LessonContainer>
    );
};
