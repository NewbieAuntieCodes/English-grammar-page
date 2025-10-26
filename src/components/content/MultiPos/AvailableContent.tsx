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

interface AvailableContentProps {
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
    { sentenceParts: ["I'm sorry, the doctor is not ", " right now."] as const, choices: [{text: "available", isCorrect: true}, {text: "open", isCorrect: false}, {text: "present", isCorrect: false}], chineseHint: "对不起，医生现在没空。" },
    { sentenceParts: ["Are there any seats ", " on this flight?"] as const, choices: [{text: "available", isCorrect: true}, {text: "empty", isCorrect: false}, {text: "free", isCorrect: false}], chineseHint: "这次航班还有空位吗？" },
    { sentenceParts: ["The new software update is now ", " for download."] as const, choices: [{text: "available", isCorrect: true}, {text: "ready", isCorrect: false}, {text: "public", isCorrect: false}], chineseHint: "新的软件更新现在可以下载了。" },
    { sentenceParts: ["I'm afraid I'm not ", " for a meeting on Friday."] as const, choices: [{text: "available", isCorrect: true}, {text: "free", isCorrect: false}, {text: "possible", isCorrect: false}], chineseHint: "恐怕我周五没时间开会。" },
    { sentenceParts: ["Is this shirt ", " in blue?"] as const, choices: [{text: "available", isCorrect: true}, {text: "existing", isCorrect: false}, {text: "made", isCorrect: false}], chineseHint: "这件衬衫有蓝色的吗？" },
    { sentenceParts: ["The information is made publicly ", " on their website."] as const, choices: [{text: "available", isCorrect: true}, {text: "shown", isCorrect: false}, {text: "visible", isCorrect: false}], chineseHint: "这些信息在他们的网站上是公开的。" },
    { sentenceParts: ["The manager is ", " to talk if you have any questions."] as const, choices: [{text: "available", isCorrect: true}, {text: "ready", isCorrect: false}, {text: "willing", isCorrect: false}], chineseHint: "如果你有任何问题，经理有空可以谈谈。" },
    { sentenceParts: ["There are no tickets ", " for Saturday's show."] as const, choices: [{text: "available", isCorrect: true}, {text: "left", isCorrect: false}, {text: "remaining", isCorrect: false}], chineseHint: "周六演出的票已经没有了。" }
];


export const AvailableContent: React.FC<AvailableContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>🔄 "Available" 的用法</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"Available" 是一个非常实用的形容词，可以用来描述物品（可获得的）和人（有空的）。学会它能让你的日常沟通更顺畅，无论是购物、预约还是安排会议。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. 形容事物 (Describing Things)</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    意思是“可用的”或“可获得的”。用来表示某物可以被购买、找到或使用。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Are there any tickets <strong>available</strong>?</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Are there any tickets available?'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>还有票吗？</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>This dress is not <strong>available</strong> in your size.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("This dress is not available in your size."); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这件连衣裙没有你的尺码。</ExampleChinese>
                </ExampleItem>

                <UsageType>2. 形容人 (Describing People)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    意思是“有空的”或“有时间的”。用来表示某人没有被占用，可以做某事。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The doctor is not <strong>available</strong> right now.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The doctor is not available right now.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>医生现在没空。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Are you <strong>available</strong> for a call tomorrow?</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("Are you available for a call tomorrow?"); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>你明天有空打电话吗？</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <FillInTheBlankPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：填空"
                subtitle="选择最合适的词填入句子"
                completionTitle="🎉 Awesome!"
                completionMessage="你已经掌握了 'available' 的用法！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};