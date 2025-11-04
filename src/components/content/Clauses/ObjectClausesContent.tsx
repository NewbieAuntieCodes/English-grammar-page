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
    SVOFormulaPart,
    SVOPartEnglish,
    SVOPartChinese,
    popIn,
} from '../Structures/SVOContent.styles';
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';
import { FillInTheBlankPractice } from '../../practice/FillInTheBlankPractice';
import { PracticeModeSwitcher, ModeButton } from '../../practice/SentenceBuilderPractice.styles';

// --- Interface and Props ---
interface ObjectClausesContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

// --- Grouped Practice Data ---

// THAT-clauses
const thatFillData = [
    { sentenceParts: ["I think ", " he is honest."] as const, choices: [{text: "that", isCorrect: true}, {text: "if", isCorrect: false}, {text: "what", isCorrect: false}], chineseHint: "我认为他是诚实的。" },
    { sentenceParts: ["She said ", " she was tired."] as const, choices: [{text: "that", isCorrect: true}, {text: "who", isCorrect: false}, {text: "why", isCorrect: false}], chineseHint: "她说她累了。" },
    { sentenceParts: ["We hope ", " you can come to the party."] as const, choices: [{text: "that", isCorrect: true}, {text: "if", isCorrect: false}, {text: "what", isCorrect: false}], chineseHint: "我们希望你能来参加派对。" },
    { sentenceParts: ["He knows ", " the earth is round."] as const, choices: [{text: "that", isCorrect: true}, {text: "what", isCorrect: false}, {text: "whether", isCorrect: false}], chineseHint: "他知道地球是圆的。" },
];
const thatBuildData = [
    { words: [{ en: 'I think', cn: '我认为' }, { en: '(that)', cn: '(可省略)' }, { en: 'he is honest', cn: '他是诚实的' }], correct: ['I think', '(that)', 'he is honest'], chinese: '我认为他是诚实的。' },
    { words: [{ en: 'She said', cn: '她说' }, { en: '(that)', cn: '(可省略)' }, { en: 'she was tired', cn: '她累了' }], correct: ['She said', '(that)', 'she was tired'], chinese: '她说她累了。' },
    { words: [{ en: 'We hope', cn: '我们希望' }, { en: 'that you can come', cn: '你能来' }], correct: ['We hope', 'that you can come'], chinese: '我们希望你能来。' },
    { words: [{ en: 'He knows', cn: '他知道' }, { en: 'that the earth is round', cn: '地球是圆的' }], correct: ['He knows', 'that the earth is round'], chinese: '他知道地球是圆的。' },
];

// IF/WHETHER-clauses
const ifWhetherFillData = [
    { sentenceParts: ["I wonder ", " it will rain tomorrow."] as const, choices: [{text: "if", isCorrect: true}, {text: "that", isCorrect: false}, {text: "what", isCorrect: false}], chineseHint: "我想知道明天是否会下雨。" },
    { sentenceParts: ["Can you tell me ", " he is at home?"] as const, choices: [{text: "whether", isCorrect: true}, {text: "that", isCorrect: false}, {text: "what", isCorrect: false}], chineseHint: "你能告诉我他是否在家吗？" },
    { sentenceParts: ["She asked ", " I could help her."] as const, choices: [{text: "if", isCorrect: true}, {text: "who", isCorrect: false}, {text: "what", isCorrect: false}], chineseHint: "她问我是否能帮助她。" },
    { sentenceParts: ["I'm not sure ", " this is the right answer."] as const, choices: [{text: "whether", isCorrect: true}, {text: "that", isCorrect: false}, {text: "what", isCorrect: false}], chineseHint: "我不确定这是否是正确答案。" },
];
const ifWhetherBuildData = [
    { words: [{ en: 'I wonder', cn: '我想知道' }, { en: 'if', cn: '是否' }, { en: 'it will rain', cn: '会下雨' }], correct: ['I wonder', 'if', 'it will rain'], chinese: '我想知道明天是否会下雨。' },
    { words: [{ en: 'Ask him', cn: '问问他' }, { en: 'whether', cn: '是否' }, { en: 'he can come', cn: '他能来' }], correct: ['Ask him', 'whether', 'he can come'], chinese: '问问他是否能来。' },
    { words: [{ en: 'She wants to know', cn: '她想知道' }, { en: 'if you are free', cn: '你是否有空' }], correct: ['She wants to know', 'if you are free'], chinese: '她想知道你是否有空。' },
    { words: [{ en: "I don't know", cn: '我不知道' }, { en: 'whether to go or not', cn: '是否该去' }], correct: ["I don't know", 'whether to go or not'], chinese: '我不知道是否该去。' },
];

// WH-clauses
const whFillData = [
    { sentenceParts: ["Do you know ", " he wants?"] as const, choices: [{text: "what", isCorrect: true}, {text: "who", isCorrect: false}, {text: "if", isCorrect: false}], chineseHint: "你知道他想要什么吗？" },
    { sentenceParts: ["Tell me ", " you live."] as const, choices: [{text: "where", isCorrect: true}, {text: "who", isCorrect: false}, {text: "that", isCorrect: false}], chineseHint: "告诉我你住在哪里。" },
    { sentenceParts: ["Nobody knows ", " he is angry."] as const, choices: [{text: "why", isCorrect: true}, {text: "who", isCorrect: false}, {text: "that", isCorrect: false}], chineseHint: "没人知道他为什么生气。" },
    { sentenceParts: ["I don't know ", " took my pen."] as const, choices: [{text: "who", isCorrect: true}, {text: "what", isCorrect: false}, {text: "if", isCorrect: false}], chineseHint: "我不知道谁拿了我的笔。" },
    { sentenceParts: ["Can you tell me ", " the party will start?"] as const, choices: [{text: "when", isCorrect: true}, {text: "if", isCorrect: false}, {text: "what", isCorrect: false}], chineseHint: "你能告诉我派对什么时候开始吗？" },
    { sentenceParts: ["I'd like to know ", " you solved the problem."] as const, choices: [{text: "how", isCorrect: true}, {text: "why", isCorrect: false}, {text: "where", isCorrect: false}], chineseHint: "我想知道你是如何解决这个问题的。" },
    { sentenceParts: ["Please show me ", " the bathroom is."] as const, choices: [{text: "where", isCorrect: true}, {text: "what", isCorrect: false}, {text: "when", isCorrect: false}], chineseHint: "请告诉我卫生间在哪里。" },
    { sentenceParts: ["I wonder ", " is calling at this hour."] as const, choices: [{text: "who", isCorrect: true}, {text: "what", isCorrect: false}, {text: "if", isCorrect: false}], chineseHint: "我想知道谁在这个时候打电话。" },
    { sentenceParts: ["He didn't explain ", " he was so late."] as const, choices: [{text: "why", isCorrect: true}, {text: "how", isCorrect: false}, {text: "when", isCorrect: false}], chineseHint: "他没有解释为什么他迟到了这么久。" },
    { sentenceParts: ["I can't remember ", " I put my keys."] as const, choices: [{text: "where", isCorrect: true}, {text: "what", isCorrect: false}, {text: "who", isCorrect: false}], chineseHint: "我不记得我把钥匙放在哪里了。" },
];
const whBuildData = [
    { words: [{ en: 'Do you know', cn: '你知道' }, { en: 'what he wants', cn: '他想要什么' }], correct: ['Do you know', 'what he wants'], chinese: '你知道他想要什么吗？' },
    { words: [{ en: 'Tell me', cn: '告诉我' }, { en: 'where you live', cn: '你住哪里' }], correct: ['Tell me', 'where you live'], chinese: '告诉我你住在哪里。' },
    { words: [{ en: 'Nobody knows', cn: '没人知道' }, { en: 'why he is angry', cn: '他为何生气' }], correct: ['Nobody knows', 'why he is angry'], chinese: '没人知道他为什么生气。' },
    { words: [{ en: "I don't know", cn: '我不知道' }, { en: 'who took my pen', cn: '谁拿了我的笔' }], correct: ["I don't know", 'who took my pen'], chinese: '我不知道谁拿了我的笔。' },
    { words: [{ en: 'She asked', cn: '她问' }, { en: 'when the train would arrive', cn: '火车何时到达' }], correct: ['She asked', 'when the train would arrive'], chinese: '她问火车什么时候到。' },
    { words: [{ en: 'I want to know', cn: '我想知道' }, { en: 'how this works', cn: '这个如何运作' }], correct: ['I want to know', 'how this works'], chinese: '我想知道这个是怎么运作的。' },
    { words: [{ en: 'Can you show me', cn: '你能告诉我' }, { en: 'where the station is', cn: '车站在哪' }], correct: ['Can you show me', 'where the station is'], chinese: '你能告诉我车站在哪里吗？' },
    { words: [{ en: 'He explained', cn: '他解释了' }, { en: 'why he made that decision', cn: '他为何做此决定' }], correct: ['He explained', 'why he made that decision'], chinese: '他解释了他为什么做出那个决定。' },
    { words: [{ en: 'We need to decide', cn: '我们需要决定' }, { en: 'what to do next', cn: '下一步做什么' }], correct: ['We need to decide', 'what to do next'], chinese: '我们需要决定下一步该做什么。' },
    { words: [{ en: 'I can’t remember', cn: '我不记得' }, { en: 'who I gave the book to', cn: '我把书给了谁' }], correct: ['I can’t remember', 'who I gave the book to'], chinese: '我不记得我把书给谁了。' },
];

// --- Styled Components ---

const AnimatedExampleItem = styled(ExampleItem)`
    animation: ${popIn} 0.4s ease-out;
`;

const TipSection = styled(WhyLearnSection)`
    background: linear-gradient(135deg, rgba(254, 249, 195, 1), rgba(253, 230, 138, 0.2));
    border-left-color: #FBBF24;
    p, h4, strong {
        color: #92400E;
    }
`;

const ClauseGroup = styled.div`
    margin-top: 50px;
    padding-top: 30px;
    border-top: 3px dashed #e2e8f0;
`;

const GroupTitle = styled.h3`
    font-size: 1.6em;
    font-weight: bold;
    color: #2d3748;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 12px;
`;

const PracticeWrapper = styled.div`
    margin-top: 40px;
    background-color: #f8f9fa;
    border-radius: 20px;
    border: 1px solid #e9ecef;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
`;

// --- Helper Practice Component ---
interface ClausePracticeGroupProps {
    themeColor: string;
    onFillComplete: () => void;
    buildData: any[];
    fillData: any[];
}

const ClausePracticeGroup: React.FC<ClausePracticeGroupProps> = ({ themeColor, onFillComplete, buildData, fillData }) => {
    const [practiceMode, setPracticeMode] = useState<'build' | 'fill'>('build');
    
    const handleBuildComplete = () => {
        setPracticeMode('fill');
    };

    return (
        <PracticeWrapper>
            <PracticeModeSwitcher>
                <ModeButton isActive={practiceMode === 'build'} onClick={() => setPracticeMode('build')} themeColor={themeColor}>
                    组句练习
                </ModeButton>
                <ModeButton isActive={practiceMode === 'fill'} onClick={() => setPracticeMode('fill')} themeColor={themeColor}>
                    填空练习
                </ModeButton>
            </PracticeModeSwitcher>

            {practiceMode === 'build' ? (
                <SentenceBuilderPractice
                    themeColor={themeColor}
                    onCompleteAll={handleBuildComplete}
                    practiceData={buildData}
                    title="🎯 组句练习"
                    subtitle="用下面的词块组成句子"
                    completionTitle="🎉 组句完成!"
                    completionMessage="已自动进入填空练习..."
                    nextButtonText="开始填空 →"
                />
            ) : (
                <FillInTheBlankPractice
                    themeColor={themeColor}
                    onCompleteAll={onFillComplete}
                    practiceData={fillData}
                    title="🎯 填空练习"
                    subtitle="选择正确的引导词"
                    completionTitle="🎉 本组完成!"
                    completionMessage="你已掌握此类宾语从句！"
                    nextButtonText="继续学习"
                />
            )}
        </PracticeWrapper>
    );
};


// --- Main Component ---
export const ObjectClausesContent: React.FC<ObjectClausesContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
        if ('speechSynthesis' in window) {
            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
        return () => { if ('speechSynthesis' in window) window.speechSynthesis.onvoiceschanged = null; };
    }, []);

    const handleExplainPart = (part: 'main' | 'object-clause') => {
        const explanations = {
            main: "主句 (Main Clause): 句子的主要部分，包含核心的主语和谓语动词 (通常是及物动词，如 know, think, say)。\n\n例如: I believe..., She asked...",
            'object-clause': "宾语从句 (Object Clause): 充当主句动词的宾语。它回答了 '主语 + 动词' + '什么？' 的问题。\n\n它由一个【引导词】(that, if, who, what等) 加上一个【完整的陈述句】构成。\n\n例如: ...that he will come. (I believe 'what?' -> that he will come)"
        };
        alert(explanations[part]);
    };

    const handleSpeak = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            const usVoice = voices.find(voice => voice.lang === 'en-US');
            utterance.voice = usVoice || voices.find(voice => voice.lang.startsWith('en-')) || null;
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Clause List</BackButton>
            <LessonTitle>📦 宾语从句 Object Clauses</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>宾语从句非常常用，尤其是在转述别人的话、表达观点或提出问题时。比如 "他说他会来" 或 "我不知道该做什么"，这些都需要宾语从句。它让我们可以把一个完整的句子当作一个名词（宾语）来使用。</p>
            </WhyLearnSection>

            <FormulaSection themeColor={themeColor}>
                <FormulaTitle themeColor={themeColor}>宾语从句结构</FormulaTitle>
                <FormulaParts>
                    <SVOFormulaPart themeColor={themeColor} onClick={() => handleExplainPart('main')}>
                        <SVOPartEnglish>Main Clause</SVOPartEnglish>
                        <SVOPartChinese>主句 (主+谓)</SVOPartChinese>
                    </SVOFormulaPart>
                    <PlusSign themeColor={themeColor}>+</PlusSign>
                    <SVOFormulaPart themeColor={themeColor} onClick={() => handleExplainPart('object-clause')}>
                        <SVOPartEnglish>Object Clause</SVOPartEnglish>
                        <SVOPartChinese>宾语从句</SVOPartChinese>
                    </SVOFormulaPart>
                </FormulaParts>
            </FormulaSection>

            <TipSection themeColor={themeColor}>
                <SectionTitle>💡 黄金法则：永远用陈述句语序</SectionTitle>
                <p>这是宾语从句最重要的规则！无论主句是什么，<strong>宾语从句内部永远是陈述句语序 (主语 + 谓语...)</strong>，绝对不能用疑问句语序 (助动词/be动词提前)。</p>
                <ExampleEnglish style={{ marginTop: '10px', fontSize: '1.1em', fontWeight: 'normal' }}>
                    ❌ I don't know where <strong>is he</strong>.
                    <br/>
                    ✅ I don't know where <strong>he is</strong>.
                </ExampleEnglish>
            </TipSection>

            {/* --- Group 1: that --- */}
            <ClauseGroup>
                <GroupTitle>☝️ 第一组: 陈述事实 (that)</GroupTitle>
                <p>当你想把一个【陈述句】作为宾语时，用 <strong>that</strong> 来引导。在口语中，这个 <strong>that</strong> 常常被省略。</p>
                <ExamplesSection>
                    <AnimatedExampleItem themeColor={themeColor}>
                        <ExampleHeader><ExampleEnglish>I think <strong>(that) you are right</strong>.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('I think that you are right.')}>🔊</SpeakButton></ExampleHeader>
                        <ExampleChinese>我认为你是对的。</ExampleChinese>
                    </AnimatedExampleItem>
                </ExamplesSection>
                <ClausePracticeGroup themeColor={themeColor} onFillComplete={() => {}} buildData={thatBuildData} fillData={thatFillData} />
            </ClauseGroup>

            {/* --- Group 2: if / whether --- */}
            <ClauseGroup>
                <GroupTitle>🤔 第二组: 表达“是否” (if / whether)</GroupTitle>
                <p>当你想把一个【一般疑问句】（Yes/No 问题）作为宾语时，用 <strong>if</strong> 或 <strong>whether</strong> 来引导。</p>
                <ExamplesSection>
                    <AnimatedExampleItem themeColor={themeColor}>
                        <ExampleHeader><ExampleEnglish>I want to know <strong>if you can come</strong>.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('I want to know if you can come.')}>🔊</SpeakButton></ExampleHeader>
                        <ExampleChinese>我想知道你是否能来。</ExampleChinese>
                    </AnimatedExampleItem>
                </ExamplesSection>
                <ClausePracticeGroup themeColor={themeColor} onFillComplete={() => {}} buildData={ifWhetherBuildData} fillData={ifWhetherFillData} />
            </ClauseGroup>

            {/* --- Group 3: Wh- words --- */}
            <ClauseGroup>
                <GroupTitle>❓ 第三组: 提出问题 (Wh- words)</GroupTitle>
                <p>当你想把一个【特殊疑问句】作为宾语时，用 <strong>what, who, where, when, why, how</strong> 等疑问词来引导。</p>
                <TipSection themeColor={themeColor}>
                    <SectionTitle>📌 特殊情况：引导词同时作主语</SectionTitle>
                    <p>有时候，引导词如 <strong>who, what</strong> 不仅引导从句，也直接充当从句的【主语】。这时，引导词后面直接跟谓语动词。</p>
                </TipSection>
                <ExamplesSection>
                    <AnimatedExampleItem themeColor={themeColor}>
                        <ExampleHeader><ExampleEnglish>Tell me <strong>what you want</strong>.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('Tell me what you want.')}>🔊</SpeakButton></ExampleHeader>
                        <ExampleChinese>告诉我你想要什么。</ExampleChinese>
                    </AnimatedExampleItem>
                    <AnimatedExampleItem themeColor={themeColor}>
                        <ExampleHeader><ExampleEnglish>I don't know <strong>who took my pen</strong>.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('I don\'t know who took my pen.')}>🔊</SpeakButton></ExampleHeader>
                        <ExampleChinese>我不知道谁拿了我的笔。(who 在此既是引导词也是从句的主语)</ExampleChinese>
                    </AnimatedExampleItem>
                </ExamplesSection>
                <ClausePracticeGroup themeColor={themeColor} onFillComplete={onCompleteAll} buildData={whBuildData} fillData={whFillData} />
            </ClauseGroup>
        </LessonContainer>
    );
};