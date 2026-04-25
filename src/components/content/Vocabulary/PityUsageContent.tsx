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
import styled from 'styled-components';

interface PityUsageContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const UsageType = styled.h3`
    font-size: 1.2em;
    font-weight: bold;
    color: #2d3748;
    margin-top: 20px;
    margin-bottom: 10px;
`;

const practiceData = [
    { sentenceParts: ["", " that you missed the concert. It was amazing."] as const, choices: [{text: "It's a pity", isCorrect: true}, {text: "I pity", isCorrect: false}, {text: "Take pity", isCorrect: false}], chineseHint: "你错过了音乐会，真遗憾。它太棒了。" },
    { sentenceParts: ["I really ", " anyone who has to work on a holiday."] as const, choices: [{text: "pity", isCorrect: true}, {text: "a pity for", isCorrect: false}, {text: "take pity", isCorrect: false}], chineseHint: "我真的很同情那些不得不在假日工作的人。" },
    { sentenceParts: ["She ", " the stray cat and gave it some milk."] as const, choices: [{text: "took pity on", isCorrect: true}, {text: "felt pity that", isCorrect: false}, {text: "is a pity", isCorrect: false}], chineseHint: "她可怜那只流浪猫，给了它一些牛奶。" },
    { sentenceParts: ["We all ", " the team after they lost the final game."] as const, choices: [{text: "felt pity for", isCorrect: true}, {text: "are a pity for", isCorrect: false}, {text: "pity on", isCorrect: false}], chineseHint: "在他们输掉决赛后，我们都为他们感到惋惜。" },
    { sentenceParts: ["", " he didn't get the job he wanted."] as const, choices: [{text: "It's a pity", isCorrect: true}, {text: "Pity him", isCorrect: false}, {text: "Take pity", isCorrect: false}], chineseHint: "真遗憾，他没有得到他想要的工作。" },
    { sentenceParts: ["Don't just ", " them; do something to help."] as const, choices: [{text: "pity", isCorrect: true}, {text: "a pity for", isCorrect: false}, {text: "feel pity", isCorrect: false}], chineseHint: "不要只是同情他们；做些什么来帮助他们。" }
];

export const PityUsageContent: React.FC<PityUsageContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>📖 'pity' 的用法</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"pity" 是一个用来表达“同情”、“怜悯”或“遗憾”的词。它既可以作名词，也可以作动词，并且常用于一些固定搭配中。掌握这些用法能让你的情感表达更地道。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. 作名词 (Noun)</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    作为名词，"pity" 表示“怜悯，同情”或“憾事”。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>It's a pity</strong> that you can't join us.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("It's a pity that you can't join us."); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>你不能加入我们，真是件憾事。</ExampleChinese>
                </ExampleItem>
                 <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>She <strong>took pity on</strong> the poor child.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('She took pity on the poor child.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>她很可怜那个贫穷的孩子。(固定搭配: take pity on sb)</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I <strong>felt pity for</strong> him.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I felt pity for him.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我为他感到惋惜。(固定搭配: feel pity for sb)</ExampleChinese>
                </ExampleItem>

                <UsageType>2. 作动词 (Verb)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    作为动词，"pity" 表示“同情，怜悯”。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I <strong>pity</strong> anyone who has to work in such conditions.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I pity anyone who has to work in such conditions.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我同情任何必须在这种条件下工作的人。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <FillInTheBlankPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习: 'pity' 的用法"
                subtitle="选择正确的单词或短语填入句子"
                completionTitle="🎉 Excellent!"
                completionMessage="你已经掌握了 'pity' 的用法！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};