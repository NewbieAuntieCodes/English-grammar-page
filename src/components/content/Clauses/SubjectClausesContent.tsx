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
    popIn,
} from '../Structures/SVOContent.styles';
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';
import { FillInTheBlankPractice } from '../../practice/FillInTheBlankPractice';
import { PracticeModeSwitcher, ModeButton } from '../../practice/SentenceBuilderPractice.styles';

// --- Data for Practice Sections ---

// THAT-clauses
const thatFillData = [
    { sentenceParts: ["", " she will come is certain."] as const, choices: [{text: "That", isCorrect: true}, {text: "What", isCorrect: false}, {text: "Whether", isCorrect: false}], chineseHint: "她会来是确定的。" },
    { sentenceParts: ["It is a pity ", " you missed the party."] as const, choices: [{text: "that", isCorrect: true}, {text: "what", isCorrect: false}, {text: "if", isCorrect: false}], chineseHint: "你错过了派对，真遗憾。" },
    { sentenceParts: ["It is true ", " he is a good man."] as const, choices: [{text: "that", isCorrect: true}, {text: "who", isCorrect: false}, {text: "what", isCorrect: false}], chineseHint: "他是个好人，这是真的。" },
    { sentenceParts: ["", " the earth is round is a fact."] as const, choices: [{text: "That", isCorrect: true}, {text: "What", isCorrect: false}, {text: "If", isCorrect: false}], chineseHint: "地球是圆的，这是一个事实。" },
    { sentenceParts: ["It is important ", " we protect the environment."] as const, choices: [{text: "that", isCorrect: true}, {text: "what", isCorrect: false}, {text: "whether", isCorrect: false}], chineseHint: "我们保护环境很重要。" },
    { sentenceParts: ["", " he didn't come to the meeting is strange."] as const, choices: [{text: "That", isCorrect: true}, {text: "What", isCorrect: false}, {text: "Why", isCorrect: false}], chineseHint: "他没来参加会议很奇怪。" },
    { sentenceParts: ["It is obvious ", " she is not interested."] as const, choices: [{text: "that", isCorrect: true}, {text: "what", isCorrect: false}, {text: "if", isCorrect: false}], chineseHint: "很明显她不感兴趣。" },
];
const thatBuildData = [
    { words: [{ en: 'That', cn: '(引导词)' }, { en: 'she will come', cn: '她将会来' }, { en: 'is certain', cn: '是确定的' }], correct: ['That', 'she will come', 'is certain'], chinese: '她会来是确定的。' },
    { words: [{ en: 'It is a pity', cn: '很遗憾' }, { en: 'that', cn: '(引导词)' }, { en: 'you missed the party', cn: '你错过了派对' }], correct: ['It is a pity', 'that', 'you missed the party'], chinese: '你错过了派对，真遗憾。' },
    { words: [{ en: 'It is true', cn: '是真的' }, { en: 'that', cn: '(引导词)' }, { en: 'he is a good man', cn: '他是个好人' }], correct: ['It is true', 'that', 'he is a good man'], chinese: '他是个好人，这是真的。' },
    { words: [{ en: 'That the earth is round', cn: '地球是圆的' }, { en: 'is a fact', cn: '是一个事实' }], correct: ['That the earth is round', 'is a fact'], chinese: '地球是圆的，这是一个事实。' },
    { words: [{ en: 'It is important', cn: '很重要' }, { en: 'that we protect', cn: '我们保护' }, { en: 'the environment', cn: '环境' }], correct: ['It is important', 'that we protect', 'the environment'], chinese: '我们保护环境很重要。' },
    { words: [{ en: 'That he is wrong', cn: '他是错的' }, { en: 'is clear', cn: '是清楚的' }], correct: ['That he is wrong', 'is clear'], chinese: '他错了，这是很清楚的。' },
    { words: [{ en: 'It is a miracle', cn: '是个奇迹' }, { en: 'that', cn: '(引导词)' }, { en: 'he survived the crash', cn: '他在车祸中幸存下来' }], correct: ['It is a miracle', 'that', 'he survived the crash'], chinese: '他在车祸中幸存下来，真是个奇迹。' },
];

// WH-clauses
const whFillData = [
    { sentenceParts: ["", " he said is not true."] as const, choices: [{text: "What", isCorrect: true}, {text: "That", isCorrect: false}, {text: "Who", isCorrect: false}], chineseHint: "他所说的话不是真的。" },
    { sentenceParts: ["", " will win is unknown."] as const, choices: [{text: "Who", isCorrect: true}, {text: "What", isCorrect: false}, {text: "That", isCorrect: false}], chineseHint: "谁会赢还不知道。" },
    { sentenceParts: ["", " she lives is a secret."] as const, choices: [{text: "Where", isCorrect: true}, {text: "When", isCorrect: false}, {text: "Why", isCorrect: false}], chineseHint: "她住在哪里是个秘密。" },
    { sentenceParts: ["", " he left so early is a mystery."] as const, choices: [{text: "Why", isCorrect: true}, {text: "How", isCorrect: false}, {text: "What", isCorrect: false}], chineseHint: "他为何这么早离开是个谜。" },
    { sentenceParts: ["It is amazing ", " he solved the problem."] as const, choices: [{text: "how", isCorrect: true}, {text: "that", isCorrect: false}, {text: "what", isCorrect: false}], chineseHint: "他如何解决这个问题令人惊叹。" },
    { sentenceParts: ["", " we need is more time."] as const, choices: [{text: "What", isCorrect: true}, {text: "That", isCorrect: false}, {text: "Who", isCorrect: false}], chineseHint: "我们需要的是更多时间。" },
    { sentenceParts: ["", " the party starts is still a secret."] as const, choices: [{text: "When", isCorrect: true}, {text: "Where", isCorrect: false}, {text: "Why", isCorrect: false}], chineseHint: "派对何时开始仍是个秘密。" },
];
const whBuildData = [
    { words: [{ en: 'What he said', cn: '他所说的' }, { en: 'is not', cn: '不是' }, { en: 'true', cn: '真实的' }], correct: ['What he said', 'is not', 'true'], chinese: '他所说的话不是真的。' },
    { words: [{ en: 'Who will win', cn: '谁会赢' }, { en: 'is unknown', cn: '是未知的' }], correct: ['Who will win', 'is unknown'], chinese: '谁会赢还不知道。' },
    { words: [{ en: 'Where she lives', cn: '她住在哪' }, { en: 'is a secret', cn: '是个秘密' }], correct: ['Where she lives', 'is a secret'], chinese: '她住在哪里是个秘密。' },
    { words: [{ en: 'Why he left', cn: '他为何离开' }, { en: 'is a mystery', cn: '是个谜' }], correct: ['Why he left', 'is a mystery'], chinese: '他为何离开是个谜。' },
    { words: [{ en: 'How he did it', cn: '他如何做到' }, { en: 'is incredible', cn: '难以置信' }], correct: ['How he did it', 'is incredible'], chinese: '他是如何做到这一点的，简直令人难以置信。' },
    { words: [{ en: 'When he will arrive', cn: '他何时到达' }, { en: 'is uncertain', cn: '是不确定的' }], correct: ['When he will arrive', 'is uncertain'], chinese: '他何时到达还不确定。' },
    { words: [{ en: 'What we should do next', cn: '我们下一步该做什么' }, { en: 'is the main question', cn: '是主要问题' }], correct: ['What we should do next', 'is the main question'], chinese: '我们下一步该怎么做是主要问题。' },
];

// WHETHER-clauses
const whetherFillData = [
    { sentenceParts: ["", " he can finish the job is a question."] as const, choices: [{text: "Whether", isCorrect: true}, {text: "That", isCorrect: false}, {text: "What", isCorrect: false}], chineseHint: "他能否完成这项工作仍是个问题。" },
    { sentenceParts: ["It is doubtful ", " she will agree."] as const, choices: [{text: "whether", isCorrect: true}, {text: "that", isCorrect: false}, {text: "what", isCorrect: false}], chineseHint: "她是否会同意是值得怀疑的。" },
    { sentenceParts: ["", " we should go or not is the problem."] as const, choices: [{text: "Whether", isCorrect: true}, {text: "That", isCorrect: false}, {text: "What", isCorrect: false}], chineseHint: "我们是否该去，这是个问题。" },
    { sentenceParts: ["", " it will rain tomorrow is uncertain."] as const, choices: [{text: "Whether", isCorrect: true}, {text: "That", isCorrect: false}, {text: "What", isCorrect: false}], chineseHint: "明天是否会下雨还不确定。" },
    { sentenceParts: ["It depends on ", " you like it or not."] as const, choices: [{text: "whether", isCorrect: true}, {text: "that", isCorrect: false}, {text: "if", isCorrect: false}], chineseHint: "这取决于你是否喜欢它。" },
    { sentenceParts: ["", " the report is true is still under discussion."] as const, choices: [{text: "Whether", isCorrect: true}, {text: "That", isCorrect: false}, {text: "What", isCorrect: false}], chineseHint: "该报告是否属实仍在讨论中。" },
    { sentenceParts: ["It is not yet decided ", " we will go on holiday.",] as const, choices: [{text: "whether", isCorrect: true}, {text: "that", isCorrect: false}, {text: "what", isCorrect: false}], chineseHint: "我们是否去度假还没有决定。" },
];
const whetherBuildData = [
    { words: [{ en: 'Whether he will come', cn: '他是否会来' }, { en: 'is not certain', cn: '不确定' }], correct: ['Whether he will come', 'is not certain'], chinese: '他是否会来还不确定。' },
    { words: [{ en: 'It is a question', cn: '是个问题' }, { en: 'whether we have enough time', cn: '我们是否有足够时间' }], correct: ['It is a question', 'whether we have enough time'], chinese: '我们是否有足够的时间，这是个问题。' },
    { words: [{ en: 'Whether he agrees or not', cn: '他是否同意' }, { en: 'doesn\'t matter', cn: '不重要' }], correct: ['Whether he agrees or not', 'doesn\'t matter'], chinese: '他同不同意都无关紧要。' },
    { words: [{ en: 'It is uncertain', cn: '不确定' }, { en: 'whether the flight will be delayed', cn: '航班是否会延误' }], correct: ['It is uncertain', 'whether the flight will be delayed'], chinese: '航班是否会延误还不确定。' },
    { words: [{ en: 'Whether we can succeed', cn: '我们能否成功' }, { en: 'depends on our effort', cn: '取决于我们的努力' }], correct: ['Whether we can succeed', 'depends on our effort'], chinese: '我们能否成功取决于我们的努力。' },
    { words: [{ en: 'Whether the project will succeed', cn: '项目是否会成功' }, { en: 'is our main concern', cn: '是我们主要关心的' }], correct: ['Whether the project will succeed', 'is our main concern'], chinese: '这个项目能否成功是我们主要关心的问题。' },
    { words: [{ en: 'It is questionable', cn: '值得怀疑' }, { en: 'whether he told the truth', cn: '他是否说了实话' }], correct: ['It is questionable', 'whether he told the truth'], chinese: '他是否说了实话是值得怀疑的。' },
];


interface SubjectClausesContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const AnimatedExampleItem = styled(ExampleItem)`
    animation: ${popIn} 0.4s ease-out;
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

const TipSection = styled(WhyLearnSection)`
    background: linear-gradient(135deg, rgba(254, 249, 195, 1), rgba(253, 230, 138, 0.2));
    border-left-color: #FBBF24;
    p, h4, strong {
        color: #92400E;
    }
    ul {
        list-style-position: inside;
        padding-left: 10px;
    }
    li {
        margin-top: 5px;
    }
`;

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
                    completionMessage="你已掌握此类主语从句！"
                    nextButtonText="继续学习"
                />
            )}
        </PracticeWrapper>
    );
};

export const SubjectClausesContent: React.FC<SubjectClausesContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
        if ('speechSynthesis' in window) {
            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
        return () => { if ('speechSynthesis' in window) window.speechSynthesis.onvoiceschanged = null; };
    }, []);

    const handleSpeak = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            const usVoice = voices.find(voice => voice.lang === 'en-US');
            utterance.voice = usVoice || voices.find(voice => voice.lang.startsWith('en-')) || null;
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleGroupComplete = () => { /* Placeholder for potential future logic */ };

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Clause List</BackButton>
            <LessonTitle>👑 主语从句 Subject Clauses</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>主语从句能让一个完整的“想法”或“事情”来做句子的主角！它能让你的表达更书面、更高级，用来强调某个观点或事实非常有效。</p>
            </WhyLearnSection>

            {/* --- Group 1: That --- */}
            <ClauseGroup>
                <GroupTitle>☝️ 第一组: 陈述事实 (That)</GroupTitle>
                <p>当你想把一个【陈述句】作为主语时，用 <strong>that</strong> 来引导。但这种用法会让句子“头重脚轻”，所以我们更常用 <strong>It</strong> 作形式主语。</p>
                <TipSection themeColor={themeColor}>
                    <SectionTitle>💡 常用句型：It is ... that ...</SectionTitle>
                    <p>为了让句子更平衡，我们把真正的主语 (that从句) 放到后面，用 <strong>It</strong> 占住主语的位置。这是最地道、最常见的用法！</p>
                </TipSection>
                <ExamplesSection>
                    <AnimatedExampleItem themeColor={themeColor}>
                        <ExampleHeader><ExampleEnglish><strong>That the earth is round</strong> is a fact.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('That the earth is round is a fact.')}>🔊</SpeakButton></ExampleHeader>
                        <ExampleChinese>地球是圆的，这是一个事实。(不常用)</ExampleChinese>
                    </AnimatedExampleItem>
                     <AnimatedExampleItem themeColor={themeColor}>
                        <ExampleHeader><ExampleEnglish><strong>It</strong> is a fact <strong>that the earth is round</strong>.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('It is a fact that the earth is round.')}>🔊</SpeakButton></ExampleHeader>
                        <ExampleChinese>地球是圆的，这是一个事实。(常用句型)</ExampleChinese>
                    </AnimatedExampleItem>
                </ExamplesSection>
                <ClausePracticeGroup themeColor={themeColor} onFillComplete={handleGroupComplete} buildData={thatBuildData} fillData={thatFillData} />
            </ClauseGroup>

            {/* --- Group 2: Wh- words --- */}
            <ClauseGroup>
                <GroupTitle>🤔 第二组: 提出问题 (Wh- words)</GroupTitle>
                <p>用 <strong>what, who, where, when, why, how</strong> 等疑问词来引导一个从句，这个从句本身就充当了句子的主语。</p>
                <ExamplesSection>
                    <AnimatedExampleItem themeColor={themeColor}>
                        <ExampleHeader><ExampleEnglish><strong>What he said</strong> is not true.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('What he said is not true.')}>🔊</SpeakButton></ExampleHeader>
                        <ExampleChinese>他所说的话不是真的。</ExampleChinese>
                    </AnimatedExampleItem>
                     <AnimatedExampleItem themeColor={themeColor}>
                        <ExampleHeader><ExampleEnglish><strong>Who will be the next president</strong> is still unknown.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('Who will be the next president is still unknown.')}>🔊</SpeakButton></ExampleHeader>
                        <ExampleChinese>谁会成为下一任总统还不得而知。</ExampleChinese>
                    </AnimatedExampleItem>
                     <AnimatedExampleItem themeColor={themeColor}>
                        <ExampleHeader><ExampleEnglish><strong>When the meeting will start</strong> has not been decided.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('When the meeting will start has not been decided.')}>🔊</SpeakButton></ExampleHeader>
                        <ExampleChinese>会议何时开始尚未决定。</ExampleChinese>
                    </AnimatedExampleItem>
                </ExamplesSection>
                <ClausePracticeGroup themeColor={themeColor} onFillComplete={handleGroupComplete} buildData={whBuildData} fillData={whFillData} />
            </ClauseGroup>
            
            {/* --- Group 3: Whether --- */}
            <ClauseGroup>
                <GroupTitle>🤷 第三组: 表示“是否” (Whether)</GroupTitle>
                <p>用 <strong>whether</strong> 来引导一个表示“是否”的从句作主语。同样，也可以用 <strong>It</strong> 作形式主语。</p>
                 <TipSection themeColor={themeColor}>
                    <SectionTitle>💡 小贴士：Whether vs. If</SectionTitle>
                    <p>在引导主语从句时，只能用 <strong>whether</strong>，不能用 <strong>if</strong>。 If 不能放在句首引导主语从句。</p>
                </TipSection>
                <ExamplesSection>
                    <AnimatedExampleItem themeColor={themeColor}>
                        <ExampleHeader><ExampleEnglish><strong>Whether he will come</strong> is not important.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('Whether he will come is not important.')}>🔊</SpeakButton></ExampleHeader>
                        <ExampleChinese>他是否会来不重要。</ExampleChinese>
                    </AnimatedExampleItem>
                     <AnimatedExampleItem themeColor={themeColor}>
                        <ExampleHeader><ExampleEnglish><strong>It</strong> is not important <strong>whether he will come</strong>.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('It is not important whether he will come.')}>🔊</SpeakButton></ExampleHeader>
                        <ExampleChinese>他是否会来不重要。(更常用)</ExampleChinese>
                    </AnimatedExampleItem>
                </ExamplesSection>
                <ClausePracticeGroup 
                    themeColor={themeColor} 
                    onFillComplete={onCompleteAll} 
                    buildData={whetherBuildData} 
                    fillData={whetherFillData} 
                />
            </ClauseGroup>
        </LessonContainer>
    );
};