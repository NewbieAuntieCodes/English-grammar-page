/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
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
} from '../Structures/SVOContent.styles';
import { FillInTheBlankPractice } from '../../practice/FillInTheBlankPractice';
import { SpellingRulesSection, SpellingTable, TableHeader, TableRow, TableCell } from '../Tenses/PastTenseContent.styles';
import styled from 'styled-components';

interface ComparativesSuperlativesContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const UsageType = styled.h3`
    font-size: 1.3em;
    font-weight: bold;
    color: #2d3748;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 2px solid #e2e8f0;
    margin-bottom: 10px;
`;

// Practice Data
const comparativePracticeData = [
    { sentenceParts: ["He is ", " than his sister."] as const, choices: [{text: "taller", isCorrect: true}, {text: "tall", isCorrect: false}, {text: "tallest", isCorrect: false}], chineseHint: "他比他姐姐高。" },
    { sentenceParts: ["This car is ", " than mine."] as const, choices: [{text: "more expensive", isCorrect: true}, {text: "expensiver", isCorrect: false}, {text: "expensive", isCorrect: false}], chineseHint: "这辆车比我的贵。" },
    { sentenceParts: ["She feels much ", " today."] as const, choices: [{text: "better", isCorrect: true}, {text: "gooder", isCorrect: false}, {text: "good", isCorrect: false}], chineseHint: "她今天感觉好多了。" },
    { sentenceParts: ["You look ", " than before."] as const, choices: [{text: "happier", isCorrect: true}, {text: "happy", isCorrect: false}, {text: "more happy", isCorrect: false}], chineseHint: "你看起来比以前更开心了。" },
    { sentenceParts: ["My bag is ", " than yours."] as const, choices: [{text: "heavier", isCorrect: true}, {text: "heavy", isCorrect: false}, {text: "more heavy", isCorrect: false}], chineseHint: "我的包比你的重。" },
    { sentenceParts: ["This movie is ", " than the book."] as const, choices: [{text: "less interesting", isCorrect: true}, {text: "interesting", isCorrect: false}, {text: "more little interesting", isCorrect: false}], chineseHint: "这部电影不如书有趣。" },
    { sentenceParts: ["She runs ", " than I do."] as const, choices: [{text: "faster", isCorrect: true}, {text: "fast", isCorrect: false}, {text: "more fast", isCorrect: false}], chineseHint: "她跑得比我快。" },
    { sentenceParts: ["The weather is ", " than yesterday."] as const, choices: [{text: "worse", isCorrect: true}, {text: "badder", isCorrect: false}, {text: "bad", isCorrect: false}], chineseHint: "天气比昨天更糟。" },
];

const superlativePracticeData = [
    { sentenceParts: ["This is the ", " building in the city."] as const, choices: [{text: "tallest", isCorrect: true}, {text: "taller", isCorrect: false}, {text: "tall", isCorrect: false}], chineseHint: "这是城里最高的建筑。" },
    { sentenceParts: ["She is the ", " student in the class."] as const, choices: [{text: "best", isCorrect: true}, {text: "goodest", isCorrect: false}, {text: "better", isCorrect: false}], chineseHint: "她是班上最好的学生。" },
    { sentenceParts: ["It was the ", " day of my life."] as const, choices: [{text: "happiest", isCorrect: true}, {text: "happier", isCorrect: false}, {text: "happy", isCorrect: false}], chineseHint: "那是我一生中最快乐的一天。" },
    { sentenceParts: ["This is the ", " interesting book I have ever read."] as const, choices: [{text: "most interesting", isCorrect: true}, {text: "more interesting", isCorrect: false}, {text: "interestingest", isCorrect: false}], chineseHint: "这是我读过的最有趣的书。" },
    { sentenceParts: ["He is the ", " person I know."] as const, choices: [{text: "strongest", isCorrect: true}, {text: "stronger", isCorrect: false}, {text: "strong", isCorrect: false}], chineseHint: "他是我认识的最强壮的人。" },
    { sentenceParts: ["That was the ", " movie I have ever seen."] as const, choices: [{text: "worst", isCorrect: true}, {text: "worse", isCorrect: false}, {text: "bad", isCorrect: false}], chineseHint: "那是我看过的最糟糕的电影。" },
    { sentenceParts: ["Mount Everest is the ", " mountain in the world."] as const, choices: [{text: "highest", isCorrect: true}, {text: "higher", isCorrect: false}, {text: "high", isCorrect: false}], chineseHint: "珠穆朗玛峰是世界上最高的山。" },
    { sentenceParts: ["This is one of the ", " restaurants in town."] as const, choices: [{text: "most popular", isCorrect: true}, {text: "more popular", isCorrect: false}, {text: "popular", isCorrect: false}], chineseHint: "这是镇上最受欢迎的餐厅之一。" },
];

const mixedPracticeData = [
    { sentenceParts: ["John is tall, but his brother is even ", "."] as const, choices: [{text: "taller", isCorrect: true}, {text: "tallest", isCorrect: false}, {text: "tall", isCorrect: false}], chineseHint: "约翰很高，但他哥哥甚至更高。" },
    { sentenceParts: ["Of the three sisters, Mary is the ", "."] as const, choices: [{text: "youngest", isCorrect: true}, {text: "younger", isCorrect: false}, {text: "young", isCorrect: false}], chineseHint: "三姐妹中，玛丽是最小的。" },
    { sentenceParts: ["Which is ", ", an elephant or a whale?"] as const, choices: [{text: "bigger", isCorrect: true}, {text: "biggest", isCorrect: false}, {text: "big", isCorrect: false}], chineseHint: "大象和鲸鱼，哪个更大？" },
    { sentenceParts: ["This is the ", " delicious cake I've ever tasted."] as const, choices: [{text: "most delicious", isCorrect: true}, {text: "more delicious", isCorrect: false}, {text: "delicious", isCorrect: false}], chineseHint: "这是我尝过的最美味的蛋糕。" },
    { sentenceParts: ["She is ", " than her classmates."] as const, choices: [{text: "smarter", isCorrect: true}, {text: "smartest", isCorrect: false}, {text: "smart", isCorrect: false}], chineseHint: "她比她的同学更聪明。" },
    { sentenceParts: ["It was the ", " performance of the night."] as const, choices: [{text: "worst", isCorrect: true}, {text: "worse", isCorrect: false}, {text: "bad", isCorrect: false}], chineseHint: "那是当晚最糟糕的表演。" },
    { sentenceParts: ["My car is fast, but yours is ", "."] as const, choices: [{text: "faster", isCorrect: true}, {text: "fastest", isCorrect: false}, {text: "fast", isCorrect: false}], chineseHint: "我的车很快，但你的更快。" },
    { sentenceParts: ["She is the ", " person I've ever met."] as const, choices: [{text: "kindest", isCorrect: true}, {text: "kinder", isCorrect: false}, {text: "kind", isCorrect: false}], chineseHint: "她是我见过的最善良的人。" },
];


export const ComparativesSuperlativesContent: React.FC<ComparativesSuperlativesContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to List</BackButton>
            <LessonTitle>📈 比较级和最高级</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>比较级 (Comparatives) 和最高级 (Superlatives) 是用来比较人或事物的重要工具。比较级用于两者之间的比较，而最高级用于三者或三者以上范围内的比较。掌握它们能让你的描述更具体、更精确。</p>
            </WhyLearnSection>

            {/* --- Comparatives --- */}
            <UsageType>1. 比较级 (Comparatives)</UsageType>
            <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                用于比较两者，结构通常是 `形容词/副词比较级 + than`。
            </p>
            <ExamplesSection>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish>He is <strong>taller than</strong> me.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('He is taller than me.')}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>他比我高。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish>This book is <strong>more interesting than</strong> that one.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('This book is more interesting than that one.')}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>这本书比那本更有趣。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            <SpellingRulesSection>
                <SectionTitle>✍️ 比较级构成规则</SectionTitle>
                 <SpellingTable>
                    <TableRow><TableHeader themeColor={themeColor}>规则</TableHeader><TableHeader themeColor={themeColor}>例子</TableHeader></TableRow>
                    <TableRow><TableCell>单音节词</TableCell><TableCell>+ er (e.g., tall → taller)</TableCell></TableRow>
                    <TableRow><TableCell>以 e 结尾</TableCell><TableCell>+ r (e.g., large → larger)</TableCell></TableRow>
                    <TableRow><TableCell>辅音+元音+辅音结尾</TableCell><TableCell>双写末尾辅音 + er (e.g., big → bigger)</TableCell></TableRow>
                    <TableRow><TableCell>以 y 结尾</TableCell><TableCell>变 y 为 i + er (e.g., happy → happier)</TableCell></TableRow>
                    <TableRow><TableCell>两音节及以上</TableCell><TableCell>more + 原形 (e.g., beautiful → more beautiful)</TableCell></TableRow>
                    <TableRow><TableCell>不规则变化</TableCell><TableCell>good → better, bad → worse, far → farther/further</TableCell></TableRow>
                </SpellingTable>
            </SpellingRulesSection>

            <FillInTheBlankPractice
                themeColor={themeColor}
                onCompleteAll={() => { /* Do nothing, user just scrolls down */ }}
                practiceData={comparativePracticeData}
                title="🎯 练习 1: 比较级"
                subtitle="选择正确的比较级形式"
                completionTitle="🎉 Great!"
                completionMessage="你已完成比较级练习！请继续学习最高级。"
                nextButtonText="完成练习"
            />

            {/* --- Superlatives --- */}
            <UsageType>2. 最高级 (Superlatives)</UsageType>
            <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                用于比较三者或以上，结构通常是 `the + 形容词/副词最高级`。
            </p>
            <ExamplesSection>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish>He is <strong>the tallest</strong> in our class.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('He is the tallest in our class.')}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>他是我们班最高的。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader><ExampleEnglish>This is <strong>the most interesting</strong> book I've ever read.</ExampleEnglish><SpeakButton onClick={() => handleSpeak("This is the most interesting book I've ever read.")}>🔊</SpeakButton></ExampleHeader>
                    <ExampleChinese>这是我读过的最有趣的书。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            <SpellingRulesSection>
                <SectionTitle>✍️ 最高级构成规则</SectionTitle>
                 <SpellingTable>
                    <TableRow><TableHeader themeColor={themeColor}>规则</TableHeader><TableHeader themeColor={themeColor}>例子</TableHeader></TableRow>
                    <TableRow><TableCell>单音节词</TableCell><TableCell>+ est (e.g., tall → tallest)</TableCell></TableRow>
                    <TableRow><TableCell>以 e 结尾</TableCell><TableCell>+ st (e.g., large → largest)</TableCell></TableRow>
                    <TableRow><TableCell>辅音+元音+辅音结尾</TableCell><TableCell>双写末尾辅音 + est (e.g., big → biggest)</TableCell></TableRow>
                    <TableRow><TableCell>以 y 结尾</TableCell><TableCell>变 y 为 i + est (e.g., happy → happiest)</TableCell></TableRow>
                    <TableRow><TableCell>两音节及以上</TableCell><TableCell>most + 原形 (e.g., beautiful → most beautiful)</TableCell></TableRow>
                    <TableRow><TableCell>不规则变化</TableCell><TableCell>good → best, bad → worst, far → farthest/furthest</TableCell></TableRow>
                </SpellingTable>
            </SpellingRulesSection>
            
            <FillInTheBlankPractice
                themeColor={themeColor}
                onCompleteAll={() => { /* Do nothing, user just scrolls down */ }}
                practiceData={superlativePracticeData}
                title="🎯 练习 2: 最高级"
                subtitle="选择正确的最高级形式"
                completionTitle="🎉 Excellent!"
                completionMessage="你已完成最高级练习！请继续综合练习。"
                nextButtonText="完成练习"
            />
        
            <FillInTheBlankPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={mixedPracticeData}
                title="🎯 练习 3: 综合练习"
                subtitle="选择比较级还是最高级？"
                completionTitle="🎉 The Best!"
                completionMessage="你已经完全掌握了比较级和最高级！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};