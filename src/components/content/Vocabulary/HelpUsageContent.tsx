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
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';
import styled from 'styled-components';

interface HelpUsageContentProps {
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
    { words: [{ en: 'Can you help me', cn: '你能帮我' }, { en: 'carry this bag?', cn: '拿这个包吗？' }], correct: ['Can you help me', 'carry this bag?'], chinese: '你能帮我拿这个包吗？' },
    { words: [{ en: 'My teacher', cn: '我的老师' }, { en: 'helped me', cn: '帮助了我' }, { en: 'with my math', cn: '在数学上' }], correct: ['My teacher', 'helped me', 'with my math'], chinese: '我的老师在数学上帮助了我。' },
    { words: [{ en: "I can't help", cn: '我忍不住' }, { en: 'laughing', cn: '笑' }, { en: 'at the joke', cn: '听到那个笑话' }], correct: ["I can't help", 'laughing', 'at the joke'], chinese: '听到那个笑话我忍不住笑了。' },
    { words: [{ en: 'He helped', cn: '他帮助' }, { en: 'his friend', cn: '他的朋友' }, { en: 'to move', cn: '移动' }, { en: 'the table', cn: '桌子' }], correct: ['He helped', 'his friend', 'to move', 'the table'], chinese: '他帮助他的朋友移动桌子。' },
    { words: [{ en: 'Let me help you', cn: '让我帮你' }, { en: 'with your luggage', cn: '拿行李吧' }], correct: ['Let me help you', 'with your luggage'], chinese: '让我帮你拿行李吧。' },
    { words: [{ en: "She couldn't help", cn: '她忍不住' }, { en: 'crying', cn: '哭' }, { en: 'during the movie', cn: '在看电影时' }], correct: ["She couldn't help", 'crying', 'during the movie'], chinese: '看电影时她忍不住哭了。' }
];

export const HelpUsageContent: React.FC<HelpUsageContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>📖 'help' 的用法</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"help" 是一个非常基础且高频的动词，但它的用法却很灵活。掌握它的几种核心句型，比如 help sb (to) do, help sb with sth, 和 can't help doing，能让你的求助、提供帮助和描述情感的表达更地道、更准确。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要结构</SectionTitle>
                <UsageType>1. help sb (to) do sth (帮助某人做某事)</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    这是最常见的用法。动词 `do` 前面的 `to` 可以省略，尤其是在口语中。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Can you <strong>help</strong> me <strong>(to) carry</strong> this box?</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Can you help me to carry this box?'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>你能帮我搬这个箱子吗？</ExampleChinese>
                </ExampleItem>

                <UsageType>2. help sb with sth (在某方面帮助某人)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    当帮助的内容是一个名词（比如一个任务或学科）时，使用这个结构。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>My brother <strong>helped</strong> me <strong>with my homework</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('My brother helped me with my homework.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我哥哥帮我做作业。</ExampleChinese>
                </ExampleItem>

                <UsageType>3. can't help doing sth (情不自禁做某事)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    这是一个固定短语，意思是“忍不住做某事”。注意后面跟的是动名词 (v-ing)。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I <strong>can't help laughing</strong> when I see that video.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I can\'t help laughing when I see that video.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>看到那个视频我就忍不住想笑。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习: 'help' 的用法"
                subtitle="用下面的词组成句子"
                completionTitle="🎉 Great!"
                completionMessage="你已经掌握了 'help' 的用法！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};