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
    popIn,
} from '../Structures/SVOContent.styles';
import { FillInTheBlankPractice } from '../../practice/FillInTheBlankPractice';
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';
import { PracticeModeSwitcher, ModeButton } from '../../practice/SentenceBuilderPractice.styles';


interface AttributiveClausesContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

// --- Grouped Practice Data ---

// --- WHICH / THAT ---
const whichThatFillData = [
    { sentenceParts: ["The book ", " I'm reading is interesting."] as const, choices: [{text: "which", isCorrect: true}, {text: "who", isCorrect: false}, {text: "where", isCorrect: false}], chineseHint: "我正在读的那本书很有趣。" },
    { sentenceParts: ["This is the house ", " Jack built."] as const, choices: [{text: "that", isCorrect: true}, {text: "who", isCorrect: false}, {text: "when", isCorrect: false}], chineseHint: "这是杰克建造的房子。" },
    { sentenceParts: ["I don't like stories ", " have unhappy endings."] as const, choices: [{text: "that", isCorrect: true}, {text: "whose", isCorrect: false}, {text: "where", isCorrect: false}], chineseHint: "我不喜欢结局悲惨的故事。" },
    { sentenceParts: ["The cake ", " she baked was delicious."] as const, choices: [{text: "which", isCorrect: true}, {text: "who", isCorrect: false}, {text: "when", isCorrect: false}], chineseHint: "她烤的蛋糕很好吃。" },
    { sentenceParts: ["Show me the dress ", " you bought yesterday."] as const, choices: [{text: "that", isCorrect: true}, {text: "who", isCorrect: false}, {text: "where", isCorrect: false}], chineseHint: "给我看看你昨天买的那条裙子。" },
];
const whichThatBuildData = [
    { words: [{ en: 'The book', cn: '书' }, { en: 'which', cn: '(定语)' }, { en: 'I am reading', cn: '我正在读' }, { en: 'is interesting', cn: '很有趣' }], correct: ['The book', 'which', 'I am reading', 'is interesting'], chinese: '我正在读的那本书很有趣。' },
    { words: [{ en: 'This is', cn: '这是' }, { en: 'the house', cn: '房子' }, { en: 'that', cn: '(定语)' }, { en: 'Jack built', cn: '杰克建的' }], correct: ['This is', 'the house', 'that', 'Jack built'], chinese: '这是杰克建造的房子。' },
    { words: [{ en: 'The cake', cn: '蛋糕' }, { en: 'which', cn: '(定语)' }, { en: 'she made', cn: '她做的' }, { en: 'was delicious', cn: '很美味' }], correct: ['The cake', 'which', 'she made', 'was delicious'], chinese: '她做的蛋糕很好吃。' },
    { words: [{ en: "I don't like", cn: '我不喜欢' }, { en: 'movies', cn: '电影' }, { en: 'that', cn: '(定语)' }, { en: 'have sad endings', cn: '有悲伤的结局' }], correct: ["I don't like", 'movies', 'that', 'have sad endings'], chinese: '我不喜欢结局悲伤的电影。' },
    { words: [{ en: 'The phone', cn: '手机' }, { en: 'which is on the table', cn: '在桌子上' }, { en: 'is mine', cn: '是我的' }], correct: ['The phone', 'which is on the table', 'is mine'], chinese: '桌上的那部手机是我的。' },
];

// --- WHERE / WHEN ---
const whereWhenFillData = [
    { sentenceParts: ["This is the town ", " I was born."] as const, choices: [{text: "where", isCorrect: true}, {text: "which", isCorrect: false}, {text: "when", isCorrect: false}], chineseHint: "这就是我出生的城镇。" },
    { sentenceParts: ["I'll never forget the day ", " we first met."] as const, choices: [{text: "when", isCorrect: true}, {text: "where", isCorrect: false}, {text: "who", isCorrect: false}], chineseHint: "我永远不会忘记我们初次见面的那一天。" },
    { sentenceParts: ["Do you know a restaurant ", " we can get good pizza?"] as const, choices: [{text: "where", isCorrect: true}, {text: "which", isCorrect: false}, {text: "when", isCorrect: false}], chineseHint: "你知道哪家餐厅有好吃的披萨吗？" },
    { sentenceParts: ["2024 is the year ", " the Olympics were in Paris."] as const, choices: [{text: "when", isCorrect: true}, {text: "where", isCorrect: false}, {text: "that", isCorrect: false}], chineseHint: "2024年是奥运会在巴黎举办的那一年。" },
    { sentenceParts: ["The park ", " we used to play has been rebuilt."] as const, choices: [{text: "where", isCorrect: true}, {text: "when", isCorrect: false}, {text: "which", isCorrect: false}], chineseHint: "我们曾经玩耍的那个公园已经重建了。" },
];
const whereWhenBuildData = [
    { words: [{ en: 'This is', cn: '这是' }, { en: 'the town', cn: '城镇' }, { en: 'where', cn: '(定语)' }, { en: 'I was born', cn: '我出生' }], correct: ['This is', 'the town', 'where', 'I was born'], chinese: '这是我出生的城镇。' },
    { words: [{ en: "I'll never forget", cn: '我永不忘记' }, { en: 'the day', cn: '那一天' }, { en: 'when', cn: '(定语)' }, { en: 'we first met', cn: '我们初次见面' }], correct: ["I'll never forget", 'the day', 'when', 'we first met'], chinese: '我永远不会忘记我们初次见面的那一天。' },
    { words: [{ en: 'The park', cn: '公园' }, { en: 'where', cn: '(定语)' }, { en: 'we play', cn: '我们玩耍' }, { en: 'is very big', cn: '很大' }], correct: ['The park', 'where', 'we play', 'is very big'], chinese: '我们玩耍的那个公园很大。' },
    { words: [{ en: 'Summer is', cn: '夏天是' }, { en: 'the season', cn: '季节' }, { en: 'when', cn: '(定语)' }, { en: 'I feel happiest', cn: '我感觉最快乐' }], correct: ['Summer is', 'the season', 'when', 'I feel happiest'], chinese: '夏天是我感觉最快乐的季节。' },
    { words: [{ en: 'Do you know', cn: '你知道' }, { en: 'a place', cn: '一个地方' }, { en: 'where', cn: '(定语)' }, { en: 'we can eat?', cn: '我们可以吃饭' }], correct: ['Do you know', 'a place', 'where', 'we can eat?'], chinese: '你知道一个我们可以吃饭的地方吗？' },
];

// --- WHO / WHOM ---
const whoWhomFillData = [
    { sentenceParts: ["The woman ", " lives next door is a doctor."] as const, choices: [{text: "who", isCorrect: true}, {text: "whom", isCorrect: false}, {text: "which", isCorrect: false}], chineseHint: "住在隔壁的那个女人是一名医生。" },
    { sentenceParts: ["The man ", " you met yesterday is my uncle."] as const, choices: [{text: "whom", isCorrect: true}, {text: "whose", isCorrect: false}, {text: "which", isCorrect: false}], chineseHint: "你昨天遇到的那个男人是我叔叔。" },
    { sentenceParts: ["She is the student ", " got the highest score."] as const, choices: [{text: "who", isCorrect: true}, {text: "whom", isCorrect: false}, {text: "whose", isCorrect: false}], chineseHint: "她就是得了最高分的那个学生。" },
    { sentenceParts: ["The person to ", " you should speak is Mr. Smith."] as const, choices: [{text: "whom", isCorrect: true}, {text: "who", isCorrect: false}, {text: "which", isCorrect: false}], chineseHint: "你应该与之交谈的人是史密斯先生。" },
    { sentenceParts: ["I know the boy ", " broke the window."] as const, choices: [{text: "who", isCorrect: true}, {text: "whom", isCorrect: false}, {text: "where", isCorrect: false}], chineseHint: "我认识打破窗户的那个男孩。" },
];
const whoWhomBuildData = [
    { words: [{ en: 'The woman', cn: '女人' }, { en: 'who lives next door', cn: '住隔壁' }, { en: 'is a doctor', cn: '是医生' }], correct: ['The woman', 'who lives next door', 'is a doctor'], chinese: '住在隔壁的那个女人是一名医生。' },
    { words: [{ en: 'The man', cn: '男人' }, { en: 'whom', cn: '(定语)' }, { en: 'you met', cn: '你遇见' }, { en: 'is my uncle', cn: '是我叔叔' }], correct: ['The man', 'whom', 'you met', 'is my uncle'], chinese: '你遇到的那个男人是我叔叔。' },
    { words: [{ en: 'She is', cn: '她是' }, { en: 'the student', cn: '学生' }, { en: 'who got', cn: '得了' }, { en: 'the highest score', cn: '最高分' }], correct: ['She is', 'the student', 'who got', 'the highest score'], chinese: '她就是得了最高分的那个学生。' },
    { words: [{ en: 'I know', cn: '我认识' }, { en: 'the boy', cn: '男孩' }, { en: 'who', cn: '(定语)' }, { en: 'broke the window', cn: '打破窗户' }], correct: ['I know', 'the boy', 'who', 'broke the window'], chinese: '我认识打破窗户的那个男孩。' },
    { words: [{ en: 'The artist', cn: '艺术家' }, { en: 'whom we admire', cn: '我们敬佩' }, { en: 'is famous', cn: '很有名' }], correct: ['The artist', 'whom we admire', 'is famous'], chinese: '我们敬佩的那位艺术家很有名。' },
];

// --- WHOSE ---
const whoseFillData = [
    { sentenceParts: ["That's the girl ", " father is a famous actor."] as const, choices: [{text: "whose", isCorrect: true}, {text: "who", isCorrect: false}, {text: "whom", isCorrect: false}], chineseHint: "那就是父亲是著名演员的那个女孩。" },
    { sentenceParts: ["I have a friend ", " cat has six toes."] as const, choices: [{text: "whose", isCorrect: true}, {text: "who", isCorrect: false}, {text: "which", isCorrect: false}], chineseHint: "我有一个朋友，他的猫有六个脚趾。" },
    { sentenceParts: ["This is the student ", " homework was lost."] as const, choices: [{text: "whose", isCorrect: true}, {text: "who", isCorrect: false}, {text: "whom", isCorrect: false}], chineseHint: "这就是作业丢失的那个学生。" },
    { sentenceParts: ["The author, ", " books are bestsellers, is visiting our city."] as const, choices: [{text: "whose", isCorrect: true}, {text: "who", isCorrect: false}, {text: "whom", isCorrect: false}], chineseHint: "那位书是畅销书的作者正在访问我们的城市。" },
    { sentenceParts: ["They found the dog ", " owner was looking for it."] as const, choices: [{text: "whose", isCorrect: true}, {text: "who", isCorrect: false}, {text: "which", isCorrect: false}], chineseHint: "他们找到了主人正在寻找的那只狗。" },
];
const whoseBuildData = [
    { words: [{ en: "That's the girl", cn: '那是女孩' }, { en: 'whose', cn: '她的' }, { en: 'father is an actor', cn: '父亲是演员' }], correct: ["That's the girl", 'whose', 'father is an actor'], chinese: '那就是父亲是演员的那个女孩。' },
    { words: [{ en: 'I have', cn: '我有个' }, { en: 'a friend', cn: '朋友' }, { en: 'whose cat', cn: '他的猫' }, { en: 'has six toes', cn: '有六个脚趾' }], correct: ['I have', 'a friend', 'whose cat', 'has six toes'], chinese: '我有一个朋友，他的猫有六个脚趾。' },
    { words: [{ en: 'This is', cn: '这是' }, { en: 'the student', cn: '学生' }, { en: 'whose homework', cn: '他的作业' }, { en: 'was lost', cn: '丢了' }], correct: ['This is', 'the student', 'whose homework', 'was lost'], chinese: '这就是作业丢失的那个学生。' },
    { words: [{ en: 'The boy', cn: '男孩' }, { en: 'whose bike was stolen', cn: '他的自行车被偷' }, { en: 'went to the police', cn: '去了警察局' }], correct: ['The boy', 'whose bike was stolen', 'went to the police'], chinese: '自行车被偷的那个男孩去了警察局。' },
    { words: [{ en: 'She married', cn: '她嫁给了' }, { en: 'a man', cn: '一个男人' }, { en: 'whose family', cn: '他的家庭' }, { en: 'is very rich', cn: '非常富有' }], correct: ['She married', 'a man', 'whose family', 'is very rich'], chinese: '她嫁给了一个家庭非常富有的男人。' },
];

// --- WHY ---
const whyFillData = [
    { sentenceParts: ["Tell me the reason ", " you were so late."] as const, choices: [{text: "why", isCorrect: true}, {text: "when", isCorrect: false}, {text: "where", isCorrect: false}], chineseHint: "告诉我你迟到的原因。" },
    { sentenceParts: ["I don't know the reason ", " she is angry with me."] as const, choices: [{text: "why", isCorrect: true}, {text: "who", isCorrect: false}, {text: "which", isCorrect: false}], chineseHint: "我不知道她为什么生我的气。" },
    { sentenceParts: ["Is there a reason ", " you can't come?"] as const, choices: [{text: "why", isCorrect: true}, {text: "when", isCorrect: false}, {text: "what", isCorrect: false}], chineseHint: "你有什么不能来的理由吗？" },
    { sentenceParts: ["That is the reason ", " I decided to quit my job."] as const, choices: [{text: "why", isCorrect: true}, {text: "where", isCorrect: false}, {text: "when", isCorrect: false}], chineseHint: "那就是我决定辞职的原因。" },
    { sentenceParts: ["The reason ", " he failed is obvious."] as const, choices: [{text: "why", isCorrect: true}, {text: "what", isCorrect: false}, {text: "when", isCorrect: false}], chineseHint: "他失败的原因很明显。" },
];
const whyBuildData = [
    { words: [{ en: 'Tell me', cn: '告诉我' }, { en: 'the reason', cn: '原因' }, { en: 'why', cn: '(定语)' }, { en: 'you were late', cn: '你迟到了' }], correct: ['Tell me', 'the reason', 'why', 'you were late'], chinese: '告诉我你迟到的原因。' },
    { words: [{ en: "I don't know", cn: '我不知道' }, { en: 'the reason', cn: '原因' }, { en: 'why', cn: '(定语)' }, { en: 'she is angry', cn: '她生气' }], correct: ["I don't know", 'the reason', 'why', 'she is angry'], chinese: '我不知道她为什么生气。' },
    { words: [{ en: 'That is', cn: '那是' }, { en: 'the reason', cn: '原因' }, { en: 'why', cn: '(定语)' }, { en: 'I quit my job', cn: '我辞职' }], correct: ['That is', 'the reason', 'why', 'I quit my job'], chinese: '那就是我辞职的原因。' },
    { words: [{ en: 'Is there', cn: '有' }, { en: 'a reason', cn: '一个原因' }, { en: 'why', cn: '(定语)' }, { en: "you can't come?", cn: '你不能来' }], correct: ['Is there', 'a reason', 'why', "you can't come?"], chinese: '你有什么不能来的理由吗？' },
    { words: [{ en: 'The reason', cn: '原因' }, { en: 'why he failed', cn: '他失败' }, { en: 'is obvious', cn: '是明显的' }], correct: ['The reason', 'why he failed', 'is obvious'], chinese: '他失败的原因很明显。' },
];

const AnimatedExampleItem = styled(ExampleItem)`
    animation: ${popIn} 0.4s ease-out;
`;

const FormulaContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f8f9fa;
    padding: 20px;
    border-radius: 15px;
    font-size: 1.2em;
    font-weight: 500;
    color: #2d3748;
    flex-wrap: wrap;
`;

const AntecedentPart = styled.span<{ themeColor: string }>`
    background-color: rgba(${props => props.themeColor.substring(1).match(/.{1,2}/g)?.map(v => parseInt(v, 16)).join(',')}, 0.1);
    color: ${props => props.themeColor};
    padding: 5px 10px;
    border-radius: 8px;
    border: 1px solid ${props => props.themeColor};
`;

const ClausePart = styled.span`
    background-color: #e2e8f0;
    color: #4a5568;
    padding: 5px 10px;
    border-radius: 8px;
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
    code {
        background: #FEF3C7;
        padding: 2px 5px;
        border-radius: 4px;
        font-family: monospace;
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

// Helper component for each clause group's practice section
interface ClausePracticeGroupProps {
    themeColor: string;
    onFillComplete: () => void;
    buildData: any[];
    fillData: any[];
}

const ClausePracticeGroup: React.FC<ClausePracticeGroupProps> = ({ themeColor, onFillComplete, buildData, fillData }) => {
    const [practiceMode, setPracticeMode] = useState<'build' | 'fill'>('build');
    
    // Automatically switch to 'fill' mode after completing 'build' mode
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
                    completionMessage="你已掌握此类定语从句！"
                    nextButtonText="继续学习"
                />
            )}
        </PracticeWrapper>
    );
};


export const AttributiveClausesContent: React.FC<AttributiveClausesContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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

    const handleGroupComplete = (groupId: string) => {
        // This is a placeholder for any logic to run when a group is finished, e.g., scrolling.
    };

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Clause List</BackButton>
            <LessonTitle>🔗 定语从句 Attributive Clauses</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>定语从句就像一个“长长的形容词”，它跟在一个名词后面，详细地描述这个名词，让别人清楚地知道你指的是“哪一个”。学会它，你的句子就能包含更丰富、更精确的信息！</p>
            </WhyLearnSection>

            <FormulaSection themeColor={themeColor}>
                <FormulaTitle themeColor={themeColor}>定语从句结构</FormulaTitle>
                <FormulaContainer>
                    ...&nbsp;
                    <AntecedentPart themeColor={themeColor}>先行词 (名词)</AntecedentPart>
                    &nbsp;+&nbsp;
                    <ClausePart>引导词 + 从句</ClausePart>
                    &nbsp;...
                </FormulaContainer>
            </FormulaSection>

            {/* --- Group 1: which / that --- */}
            <ClauseGroup>
                <GroupTitle>📦 第一组: 指代事物 (which / that)</GroupTitle>
                <p>当先行词是【事物】时，我们用 <strong>which</strong> 或 <strong>that</strong> 来引导定语从句。</p>
                <TipSection themeColor={themeColor}>
                    <SectionTitle>💡 小贴士：that vs. which</SectionTitle>
                    <p>在大多数情况下，指代事物时 <strong>that</strong> 和 <strong>which</strong> 可以互换。<strong>that</strong> 更口语化，而 <strong>which</strong> 稍微正式一些。</p>
                </TipSection>
                <ExamplesSection>
                    <AnimatedExampleItem themeColor={themeColor}>
                        <ExampleHeader><ExampleEnglish>I lost the book <strong>which</strong> you lent me.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('I lost the book which you lent me.')}>🔊</SpeakButton></ExampleHeader>
                        <ExampleChinese>我弄丢了你借给我的那本书。</ExampleChinese>
                    </AnimatedExampleItem>
                     <AnimatedExampleItem themeColor={themeColor}>
                        <ExampleHeader><ExampleEnglish>This is the cake <strong>that</strong> I made.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('This is the cake that I made.')}>🔊</SpeakButton></ExampleHeader>
                        <ExampleChinese>这就是我做的那个蛋糕。</ExampleChinese>
                    </AnimatedExampleItem>
                </ExamplesSection>
                <ClausePracticeGroup themeColor={themeColor} onFillComplete={() => handleGroupComplete('whichThat')} buildData={whichThatBuildData} fillData={whichThatFillData} />
            </ClauseGroup>

            {/* --- Group 2: where / when --- */}
            <ClauseGroup>
                <GroupTitle>📍 第二组: 指代地点和时间 (where / when)</GroupTitle>
                <p>当先行词是【地点】名词时用 <strong>where</strong>；当先行词是【时间】名词时用 <strong>when</strong>。</p>
                <ExamplesSection>
                    <AnimatedExampleItem themeColor={themeColor}>
                        <ExampleHeader><ExampleEnglish>The house <strong>where</strong> I grew up is now a museum.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('The house where I grew up is now a museum.')}>🔊</SpeakButton></ExampleHeader>
                        <ExampleChinese>我长大的那座房子现在是一个博物馆。</ExampleChinese>
                    </AnimatedExampleItem>
                     <AnimatedExampleItem themeColor={themeColor}>
                        <ExampleHeader><ExampleEnglish>I remember the day <strong>when</strong> we first met.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('I remember the day when we first met.')}>🔊</SpeakButton></ExampleHeader>
                        <ExampleChinese>我记得我们初次见面的那一天。</ExampleChinese>
                    </AnimatedExampleItem>
                </ExamplesSection>
                <ClausePracticeGroup themeColor={themeColor} onFillComplete={() => handleGroupComplete('whereWhen')} buildData={whereWhenBuildData} fillData={whereWhenFillData} />
            </ClauseGroup>
            
            {/* --- Group 3: who / whom --- */}
            <ClauseGroup>
                <GroupTitle>👤 第三组: 指代人 (who / whom)</GroupTitle>
                <p>当先行词是【人】时，我们用 <strong>who</strong> 或 <strong>whom</strong>。</p>
                 <TipSection themeColor={themeColor}>
                    <SectionTitle>💡 小贴士：who vs. whom</SectionTitle>
                    <ul>
                        <li><strong>who</strong>: 作从句的【主语】 (做动作的人)。例: The man <code>who <strong>lives</strong> here</code>...</li>
                        <li><strong>whom</strong>: 作从句的【宾语】 (接受动作的人)。例: The man <code>whom <strong>I met</strong></code>...</li>
                    </ul>
                    <p style={{marginTop: '10px'}}><strong>注意:</strong> 在口语中，作宾语时也常用 <strong>who</strong> 代替 <strong>whom</strong>。正式写作中，介词后用 <strong>whom</strong> 更稳妥。</p>
                </TipSection>
                <ExamplesSection>
                    <AnimatedExampleItem themeColor={themeColor}>
                        <ExampleHeader><ExampleEnglish>The man <strong>who</strong> lives next door is a doctor.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('The man who lives next door is a doctor.')}>🔊</SpeakButton></ExampleHeader>
                        <ExampleChinese>住在隔壁的那个男人是一名医生。(who 在从句中作主语)</ExampleChinese>
                    </AnimatedExampleItem>
                     <AnimatedExampleItem themeColor={themeColor}>
                        <ExampleHeader><ExampleEnglish>The artist <strong>whom</strong> we admire is very famous.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('The artist whom we admire is very famous.')}>🔊</SpeakButton></ExampleHeader>
                        <ExampleChinese>我们敬佩的那位艺术家非常有名。(whom 在从句中作宾语)</ExampleChinese>
                    </AnimatedExampleItem>
                </ExamplesSection>
                <ClausePracticeGroup themeColor={themeColor} onFillComplete={() => handleGroupComplete('whoWhom')} buildData={whoWhomBuildData} fillData={whoWhomFillData} />
            </ClauseGroup>

             {/* --- Group 4: whose --- */}
            <ClauseGroup>
                <GroupTitle>🤝 第四组: 指代所属 (whose)</GroupTitle>
                <p>当我们需要表达 “...的” 这种所属关系时，无论先行词是人还是物，都用 <strong>whose</strong>。</p>
                <ExamplesSection>
                    <AnimatedExampleItem themeColor={themeColor}>
                        <ExampleHeader><ExampleEnglish>I know the girl <strong>whose</strong> mother is a singer.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('I know the girl whose mother is a singer.')}>🔊</SpeakButton></ExampleHeader>
                        <ExampleChinese>我认识那个妈妈是歌手的女孩。</ExampleChinese>
                    </AnimatedExampleItem>
                     <AnimatedExampleItem themeColor={themeColor}>
                        <ExampleHeader><ExampleEnglish>He bought a car <strong>whose</strong> color is red.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('He bought a car whose color is red.')}>🔊</SpeakButton></ExampleHeader>
                        <ExampleChinese>他买了一辆红色的车。</ExampleChinese>
                    </AnimatedExampleItem>
                </ExamplesSection>
                <ClausePracticeGroup themeColor={themeColor} onFillComplete={() => handleGroupComplete('whose')} buildData={whoseBuildData} fillData={whoseFillData} />
            </ClauseGroup>

            {/* --- Group 5: why --- */}
            <ClauseGroup>
                <GroupTitle>🤔 第五组: 指代原因 (why)</GroupTitle>
                <p>当先行词是 <strong>the reason</strong> 时，我们用 <strong>why</strong> 来引导定语从句。</p>
                <ExamplesSection>
                    <AnimatedExampleItem themeColor={themeColor}>
                        <ExampleHeader><ExampleEnglish>The reason <strong>why</strong> he was late is a secret.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('The reason why he was late is a secret.')}>🔊</SpeakButton></ExampleHeader>
                        <ExampleChinese>他迟到的原因是个秘密。</ExampleChinese>
                    </AnimatedExampleItem>
                </ExamplesSection>
                <ClausePracticeGroup 
                    themeColor={themeColor} 
                    onFillComplete={onCompleteAll} 
                    buildData={whyBuildData} 
                    fillData={whyFillData} 
                />
            </ClauseGroup>

        </LessonContainer>
    );
};
