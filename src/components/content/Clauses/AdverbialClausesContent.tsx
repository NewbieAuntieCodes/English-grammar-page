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
    ExamplesSection,
    ExampleItem,
    ExampleHeader,
    SpeakButton,
    ExampleEnglish,
    ExampleChinese,
    ExampleBreakdown,
    BreakdownPart,
    ExampleSwitcher,
    SwitcherButton,
    popIn,
} from '../Structures/SVOContent.styles';
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';
import { FillInTheBlankPractice } from '../../practice/FillInTheBlankPractice';
import { PracticeModeSwitcher, ModeButton } from '../../practice/SentenceBuilderPractice.styles';

interface AdverbialClausesContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

// Data for practice
const buildPracticeData = [
    { words: [{ en: 'He', cn: '他' }, { en: 'was late', cn: '迟到了' }, { en: 'because', cn: '因为' }, { en: 'he missed', cn: '他错过了' }, { en: 'the bus', cn: '公交车' }], correct: ['He', 'was late', 'because', 'he missed', 'the bus'], chinese: '他因为错过了公交车而迟到。' },
    { words: [{ en: 'If it rains tomorrow,', cn: '如果明天下雨' }, { en: 'we will', cn: '我们就会' }, { en: 'stay home', cn: '待在家里' }], correct: ['If it rains tomorrow,', 'we will', 'stay home'], chinese: '如果明天下雨，我们就待在家里。' },
    { words: [{ en: 'She will', cn: '她会' }, { en: 'call you', cn: '给你打电话' }, { en: 'when', cn: '当' }, { en: 'she arrives', cn: '她到达时' }], correct: ['She will', 'call you', 'when', 'she arrives'], chinese: '她到达时会给你打电话。' },
    { words: [{ en: 'Although', cn: '虽然' }, { en: 'he was tired,', cn: '他很累' }, { en: 'he kept', cn: '他仍继续' }, { en: 'working', cn: '工作' }], correct: ['Although', 'he was tired,', 'he kept', 'working'], chinese: '虽然他很累，但他仍继续工作。' },
    { words: [{ en: 'You can sit', cn: '你可以坐' }, { en: 'wherever', cn: '任何地方' }, { en: 'you like', cn: '你喜欢' }], correct: ['You can sit', 'wherever', 'you like'], chinese: '你可以坐在任何你喜欢的地方。' },
    { words: [{ en: 'I will wait', cn: '我会等' }, { en: 'until', cn: '直到' }, { en: 'you come back', cn: '你回来' }], correct: ['I will wait', 'until', 'you come back'], chinese: '我会等到你回来。' },
    { words: [{ en: 'He studies hard', cn: '他努力学习' }, { en: 'so that', cn: '以便' }, { en: 'he can pass', cn: '他能通过' }, { en: 'the exam', cn: '考试' }], correct: ['He studies hard', 'so that', 'he can pass', 'the exam'], chinese: '他努力学习以便能通过考试。' },
];

const fillPracticeData = [
    { sentenceParts: ["He was late ", " he missed the bus."] as const, choices: [{text: "because", isCorrect: true}, {text: "if", isCorrect: false}, {text: "when", isCorrect: false}], chineseHint: "他因为错过了公交车而迟到。" },
    { sentenceParts: ["", " it rains tomorrow, we will stay home."] as const, choices: [{text: "If", isCorrect: true}, {text: "When", isCorrect: false}, {text: "Although", isCorrect: false}], chineseHint: "如果明天下雨，我们就待在家里。" },
    { sentenceParts: ["She will call you ", " she arrives."] as const, choices: [{text: "when", isCorrect: true}, {text: "because", isCorrect: false}, {text: "if", isCorrect: false}], chineseHint: "她到达时会给你打电话。" },
    { sentenceParts: ["", " he was tired, he kept working."] as const, choices: [{text: "Although", isCorrect: true}, {text: "If", isCorrect: false}, {text: "Because", isCorrect: false}], chineseHint: "虽然他很累，但他仍继续工作。" },
    { sentenceParts: ["You can sit ", " you like."] as const, choices: [{text: "wherever", isCorrect: true}, {text: "whatever", isCorrect: false}, {text: "whenever", isCorrect: false}], chineseHint: "你可以坐在任何你喜欢的地方。" },
    { sentenceParts: ["I will wait ", " you come back."] as const, choices: [{text: "until", isCorrect: true}, {text: "if", isCorrect: false}, {text: "because", isCorrect: false}], chineseHint: "我会等到你回来。" },
    { sentenceParts: ["He studies hard ", " he can pass the exam."] as const, choices: [{text: "so that", isCorrect: true}, {text: "although", isCorrect: false}, {text: "when", isCorrect: false}], chineseHint: "他努力学习以便能通过考试。" },
];

// Data for examples
const examples = [
    {
        id: 'ex1',
        title: '时间 (when)',
        english: 'When I got home, I felt tired.',
        chinese: '当我到家时，我感觉很累。',
        adverbialClause: 'When I got home',
        mainClause: 'I felt tired',
        core: "从句 `When I got home` 描述了主句动作 `felt tired` 发生的【时间】。"
    },
    {
        id: 'ex2',
        title: '原因 (because)',
        english: 'He failed because he didn’t work hard.',
        chinese: '他失败了，因为他没有努力学习。',
        adverbialClause: 'because he didn’t work hard',
        mainClause: 'He failed',
        core: "从句 `because he didn’t work hard` 解释了主句动作 `failed` 发生的【原因】。"
    },
    {
        id: 'ex3',
        title: '条件 (if)',
        english: 'If you ask him, he will help you.',
        chinese: '如果你问他，他会帮助你的。',
        adverbialClause: 'If you ask him',
        mainClause: 'he will help you',
        core: "从句 `If you ask him` 提出了主句动作 `will help you` 发生的【条件】。"
    },
    {
        id: 'ex4',
        title: '让步 (although)',
        english: 'Although it was cold, he went swimming.',
        chinese: '尽管天气很冷，他还是去游泳了。',
        adverbialClause: 'Although it was cold',
        mainClause: 'he went swimming',
        core: "从句 `Although it was cold` 表示一种【让步】关系，说明主句的动作在一种意料之外的情况下发生。"
    },
];

const AnimatedExampleItem = styled(ExampleItem)`
    animation: ${popIn} 0.4s ease-out;
`;

const FormulaContainer = styled.div`
    text-align: center;
    font-size: 1.2em;
    font-weight: 500;
    color: #2d3748;
    background: #f8f9fa;
    padding: 20px;
    border-radius: 15px;
`;

const ClausePart = styled.span`
    background-color: #e2e8f0;
    color: #4a5568;
    padding: 5px 10px;
    border-radius: 8px;
`;

const MainClausePart = styled.span<{ themeColor: string }>`
    background-color: rgba(${props => props.themeColor.substring(1).match(/.{1,2}/g)?.map(v => parseInt(v, 16)).join(',')}, 0.1);
    color: ${props => props.themeColor};
    padding: 5px 10px;
    border-radius: 8px;
    border: 1px solid ${props => props.themeColor};
`;


export const AdverbialClausesContent: React.FC<AdverbialClausesContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [activeExampleIndex, setActiveExampleIndex] = useState(0);
    const [practiceMode, setPracticeMode] = useState<'build' | 'fill'>('build');

    useEffect(() => {
        const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
        if ('speechSynthesis' in window) {
            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
        return () => {
            if ('speechSynthesis' in window) window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    const handleSpeak = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            const usVoice = voices.find(voice => voice.lang === 'en-US');
            utterance.voice = usVoice || voices.find(voice => voice.lang.startsWith('en-')) || null;
            utterance.rate = 0.9;
            utterance.pitch = 1.1;
            window.speechSynthesis.speak(utterance);
        }
    };

    const activeExample = examples[activeExampleIndex];

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Clause List</BackButton>

            <LessonTitle>🌶️ 状语从句 Adverbial Clauses</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>状语从句是句子的“高级调味品”！它能告诉我们主句动作发生的【时间】、【地点】、【原因】、【条件】等背景信息，让你的表达逻辑更清晰，内容更丰富。</p>
            </WhyLearnSection>

            <FormulaSection themeColor={themeColor}>
                <FormulaTitle themeColor={themeColor}>状语从句结构</FormulaTitle>
                <FormulaContainer>
                    <ClausePart>引导词 + 从句</ClausePart>
                    &nbsp;,&nbsp;
                    <MainClausePart themeColor={themeColor}>主句</MainClausePart>
                    <br/><div style={{fontSize: '1em', margin: '10px 0'}}>或 (OR)</div>
                    <MainClausePart themeColor={themeColor}>主句</MainClausePart>
                    &nbsp;
                    <ClausePart>引导词 + 从句</ClausePart>
                </FormulaContainer>
            </FormulaSection>

            <ExamplesSection>
                <SectionTitle>📝 例子分析</SectionTitle>
                <ExampleSwitcher>
                    {examples.map((ex, index) => (
                        <SwitcherButton
                            key={ex.id}
                            isActive={activeExampleIndex === index}
                            onClick={() => setActiveExampleIndex(index)}
                            themeColor={themeColor}
                        >
                            {ex.title}
                        </SwitcherButton>
                    ))}
                </ExampleSwitcher>
                
                {activeExample && (
                    <AnimatedExampleItem themeColor={themeColor}>
                        <ExampleHeader>
                            <ExampleEnglish>{activeExample.english}</ExampleEnglish>
                            <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak(activeExample.english); }} aria-label="Speak sentence">🔊</SpeakButton>
                        </ExampleHeader>
                        <ExampleChinese>{activeExample.chinese}</ExampleChinese>
                        <ExampleBreakdown show={true} themeColor={themeColor}>
                            <BreakdownPart><strong>- 主句:</strong> {activeExample.mainClause}</BreakdownPart>
                            <BreakdownPart><strong>- 状语从句 (修饰部分):</strong> {activeExample.adverbialClause}</BreakdownPart>
                            <BreakdownPart style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #e2e8f0' }}>
                                <strong>* 核心:</strong> {activeExample.core}
                            </BreakdownPart>
                        </ExampleBreakdown>
                    </AnimatedExampleItem>
                )}
            </ExamplesSection>
            
            <PracticeModeSwitcher>
                <ModeButton 
                    isActive={practiceMode === 'build'} 
                    onClick={() => setPracticeMode('build')}
                    themeColor={themeColor}
                >
                    组句练习
                </ModeButton>
                <ModeButton 
                    isActive={practiceMode === 'fill'} 
                    onClick={() => setPracticeMode('fill')}
                    themeColor={themeColor}
                >
                    填空练习
                </ModeButton>
            </PracticeModeSwitcher>

            {practiceMode === 'build' ? (
                <SentenceBuilderPractice
                    themeColor={themeColor}
                    onCompleteAll={() => setPracticeMode('fill')}
                    practiceData={buildPracticeData}
                    title="🎯 练习：构建状语从句"
                    subtitle="用下面的词块组成句子"
                    completionTitle="🎉 Excellent!"
                    completionMessage="你已经完成了状语从句的组句练习！"
                    nextButtonText="开始填空练习 →"
                />
            ) : (
                <FillInTheBlankPractice
                    themeColor={themeColor}
                    onCompleteAll={onCompleteAll}
                    practiceData={fillPracticeData}
                    title="🎯 练习：状语从句填空"
                    subtitle="选择正确的引导词"
                    completionTitle="🎉 Excellent!"
                    completionMessage="你已经掌握了如何使用状语从句！"
                    nextButtonText="学习主语从句 →"
                />
            )}

        </LessonContainer>
    );
};