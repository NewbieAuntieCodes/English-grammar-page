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

interface AsAsUsageContentProps {
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
    { sentenceParts: ["He is ", " his brother."] as const, choices: [{text: "as tall as", isCorrect: true}, {text: "taller", isCorrect: false}, {text: "as tall", isCorrect: false}], chineseHint: "他和他的哥哥一样高。" },
    { sentenceParts: ["This book is ", " that one."] as const, choices: [{text: "not as interesting as", isCorrect: true}, {text: "more interesting than", isCorrect: false}, {text: "not interesting", isCorrect: false}], chineseHint: "这本书不如那本有趣。" },
    { sentenceParts: ["She sings ", " a bird."] as const, choices: [{text: "as beautifully as", isCorrect: true}, {text: "more beautiful than", isCorrect: false}, {text: "beautiful as", isCorrect: false}], chineseHint: "她唱歌像鸟儿一样动听。" },
    { sentenceParts: ["I can run ", " you."] as const, choices: [{text: "as fast as", isCorrect: true}, {text: "faster than", isCorrect: false}, {text: "as fast", isCorrect: false}], chineseHint: "我能跑得和你一样快。" },
    { sentenceParts: ["He is not ", " his father."] as const, choices: [{text: "so strong as", isCorrect: true}, {text: "stronger than", isCorrect: false}, {text: "as strong", isCorrect: false}], chineseHint: "他不如他父亲强壮。" },
    { sentenceParts: ["My car is ", " yours."] as const, choices: [{text: "as expensive as", isCorrect: true}, {text: "more expensive than", isCorrect: false}, {text: "so expensive", isCorrect: false}], chineseHint: "我的车和你的一样贵。" },
    { sentenceParts: ["She doesn't speak English ", " her sister."] as const, choices: [{text: "as fluently as", isCorrect: true}, {text: "more fluently than", isCorrect: false}, {text: "as fluent", isCorrect: false}], chineseHint: "她说英语不如她姐姐流利。" },
    { sentenceParts: ["The weather today is ", " yesterday."] as const, choices: [{text: "as good as", isCorrect: true}, {text: "better than", isCorrect: false}, {text: "as well as", isCorrect: false}], chineseHint: "今天的天气和昨天一样好。" },
    { sentenceParts: ["You can watch TV ", " you finish your homework."] as const, choices: [{text: "as long as", isCorrect: true}, {text: "as well as", isCorrect: false}, {text: "as soon as", isCorrect: false}], chineseHint: "只要你完成作业，你就可以看电视。" },
    { sentenceParts: ["She is smart ", " beautiful."] as const, choices: [{text: "as well as", isCorrect: true}, {text: "as long as", isCorrect: false}, {text: "as good as", isCorrect: false}], chineseHint: "她既聪明又漂亮。" },
    { sentenceParts: ["We will go to the park ", " it doesn't rain."] as const, choices: [{text: "as long as", isCorrect: true}, {text: "as well as", isCorrect: false}, {text: "as much as", isCorrect: false}], chineseHint: "只要不下雨，我们就会去公园。" },
    { sentenceParts: ["The captain, ", " the players, was happy."] as const, choices: [{text: "as well as", isCorrect: true}, {text: "as long as", isCorrect: false}, {text: "and", isCorrect: false}], chineseHint: "队长和队员们都很高兴。" }
];

export const AsAsUsageContent: React.FC<AsAsUsageContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>⚖️ 'as' 相关短语用法</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>
                    包含 "as" 的短语是英语中最基本的比较和条件句型之一。本节课我们学习 "as...as" (和...一样), "as long as" (只要) 和 "as well as" (也, 和)。掌握它们能让你的表达更丰富、更精确。
                </p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. 肯定句：as + 形容词/副词 + as</UsageType>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>She is <strong>as tall as</strong> her brother.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('She is as tall as her brother.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>她和她哥哥一样高。(形容词)</ExampleChinese>
                </ExampleItem>
                
                <UsageType>2. 否定句：not as/so + 形容词/副词 + as</UsageType>
                 <p style={{ color: '#4a5568', margin: '0 0 15px 5px', lineHeight: '1.6' }}>
                    在否定句中，第一个 as 可以用 so 替换，意思不变。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>He is <strong>not as tall as</strong> his father.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He is not as tall as his father.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他不如他父亲高。</ExampleChinese>
                </ExampleItem>
                
                <UsageType>3. as long as (只要)</UsageType>
                 <p style={{ color: '#4a5568', margin: '0 0 15px 5px', lineHeight: '1.6' }}>
                    用来引导一个条件状语从句，表示“只要...就...”。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>You can use my car <strong>as long as</strong> you drive carefully.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('You can use my car as long as you drive carefully.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>只要你小心驾驶，你就可以用我的车。</ExampleChinese>
                </ExampleItem>

                <UsageType>4. as well as (也, 和)</UsageType>
                 <p style={{ color: '#4a5568', margin: '0 0 15px 5px', lineHeight: '1.6' }}>
                    用来连接两个并列的成分，类似 "and"，但更强调前者。当 `A as well as B` 作主语时，谓语动词的单复数由 A 决定。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>She is smart <strong>as well as</strong> beautiful.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('She is smart as well as beautiful.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>她既聪明又漂亮。</ExampleChinese>
                </ExampleItem>
                 <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The teacher, <strong>as well as</strong> the students, <strong>is</strong> excited.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The teacher, as well as the students, is excited.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>老师和学生们都很兴奋。(谓语动词 is 跟随主语 the teacher)</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <FillInTheBlankPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：使用 'as' 相关短语"
                subtitle="选择正确的短语填入句子"
                completionTitle="🎉 Awesome!"
                completionMessage="你已经掌握了这些 'as' 短语的用法！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};