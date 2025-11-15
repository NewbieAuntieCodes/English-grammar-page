/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import {
    LessonContainer, BackButton, LessonTitle, SectionTitle, WhyLearnSection, ExamplesSection,
    ExampleItem, ExampleHeader, SpeakButton, ExampleEnglish, ExampleChinese,
} from './PartsOfSpeechLesson.styles';
import { FillInTheBlankPractice } from '../../practice/FillInTheBlankPractice';
import styled from 'styled-components';

interface PronounsContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const PronounTable = styled.div`
    overflow-x: auto;
    margin: 20px 0;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
`;

const Th = styled.th<{ themeColor: string }>`
    background: rgba(${props => props.themeColor.substring(1).match(/.{1,2}/g)?.map(v => parseInt(v, 16)).join(',')}, 0.1);
    color: ${props => props.themeColor};
    padding: 15px;
    text-align: left;
    font-size: 1em;
    border-bottom: 2px solid ${props => props.themeColor};
`;

const Td = styled.td`
    padding: 15px;
    border-bottom: 1px solid #e2e8f0;
    color: #4a5568;

    &:first-child {
        font-weight: bold;
        color: #2d3748;
    }
`;

const Tr = styled.tr`
    &:last-child ${Td} {
        border-bottom: none;
    }
    &:hover {
        background-color: #f8f9fa;
    }
`;

const UsageType = styled.h3`
    font-size: 1.3em;
    font-weight: bold;
    color: #2d3748;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 2px solid #e2e8f0;
    margin-bottom: 10px;
`;

// --- Practice Data ---
const subjectPracticeData = [
    { sentenceParts: ["", " am a student."] as const, choices: [{text: "I", isCorrect: true}, {text: "Me", isCorrect: false}], chineseHint: "我是一名学生。" },
    { sentenceParts: ["", " are my best friends."] as const, choices: [{text: "They", isCorrect: true}, {text: "Them", isCorrect: false}], chineseHint: "他们是我最好的朋友。" },
    { sentenceParts: ["", " is a good doctor."] as const, choices: [{text: "He", isCorrect: true}, {text: "Him", isCorrect: false}], chineseHint: "他是一位好医生。" },
    { sentenceParts: ["", " like to play basketball."] as const, choices: [{text: "We", isCorrect: true}, {text: "Us", isCorrect: false}], chineseHint: "我们喜欢打篮球。" },
];
const objectPracticeData = [
    { sentenceParts: ["She gave ", " a book."] as const, choices: [{text: "me", isCorrect: true}, {text: "I", isCorrect: false}], chineseHint: "她给了我一本书。" },
    { sentenceParts: ["I saw ", " at the park."] as const, choices: [{text: "them", isCorrect: true}, {text: "they", isCorrect: false}], chineseHint: "我在公园看到了他们。" },
    { sentenceParts: ["Please tell ", " the truth."] as const, choices: [{text: "us", isCorrect: true}, {text: "we", isCorrect: false}], chineseHint: "请告诉我们真相。" },
    { sentenceParts: ["The teacher is talking to ", "."] as const, choices: [{text: "him", isCorrect: true}, {text: "he", isCorrect: false}], chineseHint: "老师正在和他说话。" },
];
const possAdjPracticeData = [
    { sentenceParts: ["This is ", " book."] as const, choices: [{text: "my", isCorrect: true}, {text: "mine", isCorrect: false}], chineseHint: "这是我的书。" },
    { sentenceParts: ["What is ", " name?"] as const, choices: [{text: "your", isCorrect: true}, {text: "yours", isCorrect: false}], chineseHint: "你叫什么名字？" },
    { sentenceParts: ["The dog is wagging ", " tail."] as const, choices: [{text: "its", isCorrect: true}, {text: "it's", isCorrect: false}], chineseHint: "狗在摇它的尾巴。" },
    { sentenceParts: ["She forgot ", " keys."] as const, choices: [{text: "her", isCorrect: true}, {text: "hers", isCorrect: false}], chineseHint: "她忘了她的钥匙。" },
];
const possProPracticeData = [
    { sentenceParts: ["The blue car is ", "."] as const, choices: [{text: "mine", isCorrect: true}, {text: "my", isCorrect: false}], chineseHint: "那辆蓝色的车是我的。" },
    { sentenceParts: ["This pen is not yours, it is ", "."] as const, choices: [{text: "hers", isCorrect: true}, {text: "her", isCorrect: false}], chineseHint: "这支笔不是你的，是她的。" },
    { sentenceParts: ["That house on the corner is ", "."] as const, choices: [{text: "ours", isCorrect: true}, {text: "our", isCorrect: false}], chineseHint: "拐角处的那栋房子是我们的。" },
    { sentenceParts: ["I found a wallet. Is it ", "?"] as const, choices: [{text: "yours", isCorrect: true}, {text: "your", isCorrect: false}], chineseHint: "我找到了一个钱包。是你的吗？" },
];
const mixedPracticeData = [
    { sentenceParts: ["", " gave me her book."] as const, choices: [{text: "She", isCorrect: true}, {text: "Her", isCorrect: false}], chineseHint: "她把她的书给了我。" },
    { sentenceParts: ["This is my car, not ", "."] as const, choices: [{text: "yours", isCorrect: true}, {text: "your", isCorrect: false}], chineseHint: "这是我的车，不是你的。" },
    { sentenceParts: ["Please give the phone to ", ". It is ", "."] as const, choices: [{text: "him, his", isCorrect: true}, {text: "he, his", isCorrect: false}, {text: "him, he", isCorrect: false}], chineseHint: "请把电话给他。是他的。" },
    { sentenceParts: ["", " told us that their idea was better than ", "."] as const, choices: [{text: "They, ours", isCorrect: true}, {text: "Them, our", isCorrect: false}, {text: "They, our", isCorrect: false}], chineseHint: "他们告诉我们，他们的主意比我们的好。" },
    { sentenceParts: ["Is this ", " bag or ", "?"] as const, choices: [{text: "his, hers", isCorrect: true}, {text: "he, her", isCorrect: false}, {text: "his, her", isCorrect: false}], chineseHint: "这是他的包还是她的？" },
    { sentenceParts: ["I think ", " should tell ", " the truth."] as const, choices: [{text: "you, them", isCorrect: true}, {text: "your, they", isCorrect: false}, {text: "you, they", isCorrect: false}], chineseHint: "我认为你应该告诉他们真相。" },
];


export const PronounsContent: React.FC<PronounsContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
    
    // Dummy function for intermediate practices
    const handleIntermediateComplete = () => {};

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to List</BackButton>
            <LessonTitle>👤 代词 (Pronouns)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学代词？</SectionTitle>
                <p>代词用来代替名词，避免重复，让句子更简洁流畅。使用正确的形式（如 I vs me, my vs mine）对于保证语法正确至关重要。</p>
            </WhyLearnSection>

            <SectionTitle>📊 代词总览表 (Pronoun Chart)</SectionTitle>
            <PronounTable>
                <Table>
                    <thead>
                        <Tr>
                            <Th themeColor={themeColor}>类型</Th>
                            <Th themeColor={themeColor}>主格 (Subject)</Th>
                            <Th themeColor={themeColor}>宾格 (Object)</Th>
                            <Th themeColor={themeColor}>形容词性物主代词</Th>
                            <Th themeColor={themeColor}>名词性物主代词</Th>
                        </Tr>
                    </thead>
                    <tbody>
                        <Tr><Td>第一人称单数</Td><Td>I (我)</Td><Td>me (我)</Td><Td>my (我的)</Td><Td>mine (我的)</Td></Tr>
                        <Tr><Td>第二人称单数/复数</Td><Td>you (你/你们)</Td><Td>you (你/你们)</Td><Td>your (你的/你们的)</Td><Td>yours (你的/你们的)</Td></Tr>
                        <Tr><Td>第三人称单数 (男)</Td><Td>he (他)</Td><Td>him (他)</Td><Td>his (他的)</Td><Td>his (他的)</Td></Tr>
                        <Tr><Td>第三人称单数 (女)</Td><Td>she (她)</Td><Td>her (她)</Td><Td>her (她的)</Td><Td>hers (她的)</Td></Tr>
                        <Tr><Td>第三人称单数 (物)</Td><Td>it (它)</Td><Td>it (它)</Td><Td>its (它的)</Td><Td>(none)</Td></Tr>
                        <Tr><Td>第一人称复数</Td><Td>we (我们)</Td><Td>us (我们)</Td><Td>our (我们的)</Td><Td>ours (我们的)</Td></Tr>
                        <Tr><Td>第三人称复数</Td><Td>they (他们)</Td><Td>them (他们)</Td><Td>their (他们的)</Td><Td>theirs (他们的)</Td></Tr>
                    </tbody>
                </Table>
            </PronounTable>

            {/* Subject Pronouns */}
            <UsageType>1. 主格 (Subject Pronouns)</UsageType>
            <p style={{ color: '#4a5568', marginBottom: '15px' }}>作句子的主语，即动作的发出者。</p>
            <ExamplesSection>
                <ExampleItem themeColor={themeColor}><ExampleHeader><ExampleEnglish><strong>I</strong> like apples.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('I like apples.')}>🔊</SpeakButton></ExampleHeader><ExampleChinese>我喜欢苹果。</ExampleChinese></ExampleItem>
            </ExamplesSection>
            <FillInTheBlankPractice themeColor={themeColor} onCompleteAll={handleIntermediateComplete} practiceData={subjectPracticeData} title="🎯 练习 1: 主格" subtitle="选择正确的主格代词" completionTitle="完成!" completionMessage="请继续学习宾格。" nextButtonText="继续" />

            {/* Object Pronouns */}
            <UsageType>2. 宾格 (Object Pronouns)</UsageType>
            <p style={{ color: '#4a5568', marginBottom: '15px' }}>作动词或介词的宾语，即动作的承受者。</p>
            <ExamplesSection>
                <ExampleItem themeColor={themeColor}><ExampleHeader><ExampleEnglish>He told <strong>me</strong> a secret.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('He told me a secret.')}>🔊</SpeakButton></ExampleHeader><ExampleChinese>他告诉了我一个秘密。</ExampleChinese></ExampleItem>
            </ExamplesSection>
            <FillInTheBlankPractice themeColor={themeColor} onCompleteAll={handleIntermediateComplete} practiceData={objectPracticeData} title="🎯 练习 2: 宾格" subtitle="选择正确的宾格代词" completionTitle="完成!" completionMessage="请继续学习所有格。" nextButtonText="继续" />

            {/* Possessive Adjectives */}
            <UsageType>3. 形容词性物主代词 (Possessive Adjectives)</UsageType>
            <p style={{ color: '#4a5568', marginBottom: '15px' }}>表示“...的”，后面必须跟名词。</p>
            <ExamplesSection>
                <ExampleItem themeColor={themeColor}><ExampleHeader><ExampleEnglish>This is <strong>my</strong> car.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('This is my car.')}>🔊</SpeakButton></ExampleHeader><ExampleChinese>这是我的车。</ExampleChinese></ExampleItem>
            </ExamplesSection>
            <FillInTheBlankPractice themeColor={themeColor} onCompleteAll={handleIntermediateComplete} practiceData={possAdjPracticeData} title="🎯 练习 3: 形容词性物主代词" subtitle="选择正确的代词" completionTitle="完成!" completionMessage="请继续学习名词性物主代词。" nextButtonText="继续" />

            {/* Possessive Pronouns */}
            <UsageType>4. 名词性物主代词 (Possessive Pronouns)</UsageType>
            <p style={{ color: '#4a5568', marginBottom: '15px' }}>表示“...的东西”，相当于“形容词性物主代词 + 名词”，后面不跟名词。</p>
            <ExamplesSection>
                <ExampleItem themeColor={themeColor}><ExampleHeader><ExampleEnglish>This car is <strong>mine</strong>.</ExampleEnglish><SpeakButton onClick={() => handleSpeak('This car is mine.')}>🔊</SpeakButton></ExampleHeader><ExampleChinese>这辆车是我的。(mine = my car)</ExampleChinese></ExampleItem>
            </ExamplesSection>
            <FillInTheBlankPractice themeColor={themeColor} onCompleteAll={handleIntermediateComplete} practiceData={possProPracticeData} title="🎯 练习 4: 名词性物主代词" subtitle="选择正确的代词" completionTitle="完成!" completionMessage="准备好最终的综合练习了吗？" nextButtonText="开始综合练习" />

            {/* Mixed Practice */}
            <UsageType>5. 综合练习 (Mixed Practice)</UsageType>
            <FillInTheBlankPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={mixedPracticeData}
                title="🎯 综合练习"
                subtitle="选择最合适的代词形式"
                completionTitle="🎉 Excellent!"
                completionMessage="你已经完全掌握了各种人称代词的用法！"
                nextButtonText="Next Lesson: Articles →"
            />
        </LessonContainer>
    );
};