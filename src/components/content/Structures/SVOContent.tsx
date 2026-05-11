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
    SVOPartOfSpeechTextEng,
} from './SVOContent.styles';
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';
import { FillInTheBlankPractice } from '../../practice/FillInTheBlankPractice';
import { MultipleChoicePractice } from '../../practice/MultipleChoicePractice';
import { PracticeModeSwitcher, ModeButton } from '../../practice/SentenceBuilderPractice.styles';

interface SVOContentProps {
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

const buildPracticeData = [
    { words: [{ en: 'I', cn: '我' }, { en: 'like', cn: '喜欢' }, { en: 'apples', cn: '苹果' }], correct: ['I', 'like', 'apples'], chinese: '我喜欢苹果' },
    { words: [{ en: 'She', cn: '她' }, { en: 'reads', cn: '读' }, { en: 'books', cn: '书' }], correct: ['She', 'reads', 'books'], chinese: '她读书' },
    { words: [{ en: 'We', cn: '我们' }, { en: 'play', cn: '玩' }, { en: 'games', cn: '游戏' }], correct: ['We', 'play', 'games'], chinese: '我们玩游戏' },
    { words: [{ en: 'He', cn: '他' }, { en: 'loves', cn: '爱' }, { en: 'music', cn: '音乐' }], correct: ['He', 'loves', 'music'], chinese: '他热爱音乐' },
    { words: [{ en: 'They', cn: '他们' }, { en: 'eat', cn: '吃' }, { en: 'dinner', cn: '晚餐' }], correct: ['They', 'eat', 'dinner'], chinese: '他们吃晚饭' },
    { words: [{ en: 'You', cn: '你' }, { en: 'drink', cn: '喝' }, { en: 'water', cn: '水' }], correct: ['You', 'drink', 'water'], chinese: '你喝水' },
    { words: [{ en: 'The students', cn: '学生们' }, { en: 'speak', cn: '说' }, { en: 'English', cn: '英语' }], correct: ['The students', 'speak', 'English'], chinese: '学生们说英语' },
];

const fillPracticeData = [
    { sentenceParts: ["I", "apples."] as const, choices: [{text: "like", isCorrect: true}, {text: "am", isCorrect: false}, {text: "happy", isCorrect: false}], chineseHint: "我喜欢苹果。" },
    { sentenceParts: ["She", "books."] as const, choices: [{text: "reads", isCorrect: true}, {text: "is", isCorrect: false}, {text: "reading", isCorrect: false}], chineseHint: "她读书。" },
    { sentenceParts: ["", "play games."] as const, choices: [{text: "We", isCorrect: true}, {text: "Is", isCorrect: false}, {text: "Are", isCorrect: false}], chineseHint: "我们玩游戏。" },
    { sentenceParts: ["He loves", "."] as const, choices: [{text: "music", isCorrect: true}, {text: "beautiful", isCorrect: false}, {text: "run", isCorrect: false}], chineseHint: "他热爱音乐。" },
    { sentenceParts: ["They", "dinner."] as const, choices: [{text: "eat", isCorrect: true}, {text: "are", isCorrect: false}, {text: "is", isCorrect: false}], chineseHint: "他们吃晚饭。" },
    { sentenceParts: ["You drink", "."] as const, choices: [{text: "water", isCorrect: true}, {text: "juice", isCorrect: false}, {text: "milk", isCorrect: false}], chineseHint: "你喝水。" },
    { sentenceParts: ["The students", "English."] as const, choices: [{text: "speak", isCorrect: true}, {text: "learn", isCorrect: false}, {text: "write", isCorrect: false}], chineseHint: "学生们说英语。" },
];

const partMiniPracticeData = [
    {
        question: "句子：She reads books. 谁是主语？",
        choices: [
            { text: 'She', isCorrect: true },
            { text: 'reads', isCorrect: false },
            { text: 'books', isCorrect: false },
        ],
        chineseHint: '主语就是“谁做这个动作”。',
    },
    {
        question: "句子：I love music. 哪个是谓语？",
        choices: [
            { text: 'love', isCorrect: true },
            { text: 'I', isCorrect: false },
            { text: 'music', isCorrect: false },
        ],
        chineseHint: '谓语是动作词。',
    },
    {
        question: "句子：They eat dinner. 哪个是宾语？",
        choices: [
            { text: 'dinner', isCorrect: true },
            { text: 'They', isCorrect: false },
            { text: 'eat', isCorrect: false },
        ],
        chineseHint: '宾语是动作的对象。',
    },
    {
        question: '主谓宾里面，最后一个部分是什么？',
        choices: [
            { text: '宾语 Object', isCorrect: true },
            { text: '主语 Subject', isCorrect: false },
            { text: '谓语 Verb', isCorrect: false },
        ],
        chineseHint: 'S + V + O，最后一个是 O。',
    },
];

const structureMiniPracticeData = [
    {
        question: '句子：He likes tea. 这是主谓宾吗？',
        choices: [
            { text: '是', isCorrect: true },
            { text: '不是', isCorrect: false },
        ],
        chineseHint: 'He / likes / tea',
    },
    {
        question: '句子：She is happy. 这是主谓宾吗？',
        choices: [
            { text: '不是', isCorrect: true },
            { text: '是', isCorrect: false },
        ],
        chineseHint: '这是主系表，不是主谓宾。',
    },
    {
        question: '句子：We study English. 这是主谓宾吗？',
        choices: [
            { text: '是', isCorrect: true },
            { text: '不是', isCorrect: false },
        ],
        chineseHint: 'We / study / English',
    },
    {
        question: '句子：The soup tastes good. 这是主谓宾吗？',
        choices: [
            { text: '不是', isCorrect: true },
            { text: '是', isCorrect: false },
        ],
        chineseHint: '这是主系表，不是主谓宾。',
    },
];

export const SVOContent: React.FC<SVOContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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

    const handleExplainPart = (part: 'subject' | 'verb' | 'object') => {
        const explanations = {
            subject: "主语 (Subject): 句子的主角，是动作的发出者。\n\n它通常由【名词】(Noun) 或【代词】(Pronoun) 担任。\n\n例如：\n- 名词: The dog, My teacher\n- 代词: I, She, They",
            verb: "谓语 (Verb): 表示主语发出的具体【动作】。\n\n在SVO结构中，这通常是【实义动词】(Action Verb)，而不是'is'/'am'/'are'这样的系动词。\n\n例如：love (爱), eat (吃), study (学习)",
            object: "宾语 (Object): 动作的承受者，是动作的对象。\n\n和主语一样，它也通常由【名词】(Noun) 或【代词】(Pronoun) 担任。\n\n例如：\n- 名词: English, apples, a book\n- 代词: me, him, them"
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

            <LessonTitle>🏗️ Subject + Verb + Object (主谓宾)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？Why learn this?</SectionTitle>
                <p>这是英语里很基础、很常见的句型。很多短句都可以先用这个结构理解。</p>
            </WhyLearnSection>

            <QuickGrid>
                <QuickCard themeColor={themeColor}>
                    <QuickCardTitle themeColor={themeColor}>Subject</QuickCardTitle>
                    <QuickCardHint>谁</QuickCardHint>
                    <QuickCardExample>I / She / The boy</QuickCardExample>
                </QuickCard>
                <QuickCard themeColor={themeColor}>
                    <QuickCardTitle themeColor={themeColor}>Verb</QuickCardTitle>
                    <QuickCardHint>做什么</QuickCardHint>
                    <QuickCardExample>love / read / eat</QuickCardExample>
                </QuickCard>
                <QuickCard themeColor={themeColor}>
                    <QuickCardTitle themeColor={themeColor}>Object</QuickCardTitle>
                    <QuickCardHint>对谁 / 什么</QuickCardHint>
                    <QuickCardExample>English / books / dinner</QuickCardExample>
                </QuickCard>
            </QuickGrid>

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
                        <SVOPartEnglish>Verb</SVOPartEnglish>
                        <SVOPartChinese>谓语</SVOPartChinese>
                        <SVOPartDivider />
                        <SVOPartOfSpeechInfo>
                            <SVOPartOfSpeechText>实义动词</SVOPartOfSpeechText>
                            <SVOPartOfSpeechTextEng>(Action Verb)</SVOPartOfSpeechTextEng>
                        </SVOPartOfSpeechInfo>
                    </SVOFormulaPart>
                    <PlusSign themeColor={themeColor}>+</PlusSign>
                    <SVOFormulaPart themeColor={themeColor} onClick={() => handleExplainPart('object')}>
                        <SVOPartEnglish>Object</SVOPartEnglish>
                        <SVOPartChinese>宾语</SVOPartChinese>
                        <SVOPartDivider />
                        <SVOPartOfSpeechInfo>
                            <SVOPartOfSpeechText>名词 / 代词</SVOPartOfSpeechText>
                            <SVOPartOfSpeechTextEng>(Noun / Pronoun)</SVOPartOfSpeechTextEng>
                        </SVOPartOfSpeechInfo>
                    </SVOFormulaPart>
                </FormulaParts>
            </FormulaSection>

            <MultipleChoicePractice
                themeColor={themeColor}
                practiceData={partMiniPracticeData}
                title="⚡ Fast Check 1"
                subtitle="先分清 Subject / Verb / Object"
                completionTitle="👏 Nice!"
                completionMessage="这一组完成了。下面那组也已经在页面里了，直接继续做就行。"
                nextButtonText="继续"
                hideCompletionButton
            />

            <MultipleChoicePractice
                themeColor={themeColor}
                practiceData={structureMiniPracticeData}
                title="⚡ Fast Check 2"
                subtitle="再判断哪些句子是 SVO"
                completionTitle="👏 Great!"
                completionMessage="你已经会判断主谓宾了。下面有例子，也有正式练习。"
                nextButtonText="继续"
                hideCompletionButton
            />

            <ExamplesSection>
                <SectionTitle>📝 One Example</SectionTitle>
                <ExampleItem onClick={() => handleToggleBreakdown('ex1')} themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I love English.</ExampleEnglish>
                        <SpeakButton
                          onClick={(e) => { e.stopPropagation(); handleSpeak('I love English.'); }}
                          aria-label="Speak sentence"
                        >
                            🔊
                        </SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我喜欢英语。</ExampleChinese>
                    <ExampleBreakdown show={activeExample === 'ex1'} themeColor={themeColor}>
                        <BreakdownPart><strong>主语 (Subject):</strong> I (我)</BreakdownPart>
                        <BreakdownPart><strong>谓语 (Verb):</strong> love (喜欢)</BreakdownPart>
                        <BreakdownPart><strong>宾语 (Object):</strong> English (英语)</BreakdownPart>
                    </ExampleBreakdown>
                </ExampleItem>
            </ExamplesSection>

            <PracticeModeSwitcher>
                <ModeButton isActive themeColor={themeColor}>
                    组句练习 (Build)
                </ModeButton>
            </PracticeModeSwitcher>

            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={() => {}}
                practiceData={buildPracticeData}
                title="🎯 练习：构建句子"
                subtitle="用下面的词组成句子"
                completionTitle="🎉 Good Job!"
                completionMessage="这一组做完了。下面的填空练习一直都在，直接往下做。"
                nextButtonText="继续"
                hideCompletionButton
            />

            <PracticeModeSwitcher>
                <ModeButton isActive themeColor={themeColor}>
                    填空练习 (Fill)
                </ModeButton>
            </PracticeModeSwitcher>

            <FillInTheBlankPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={fillPracticeData}
                title="🎯 练习：句子填空"
                subtitle="选择正确的单词填入句子"
                completionTitle="🎉 Well Done!"
                completionMessage="你已经掌握了主谓宾句型！"
                nextButtonText="跳到下一章。Next Page"
            />
        </LessonContainer>
    );
};
