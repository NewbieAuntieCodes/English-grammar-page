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

interface AccessContentProps {
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
    { words: [{ en: 'The information', cn: '信息' }, { en: 'is easily', cn: '很容易' }, { en: 'accessible', cn: '获取' }], correct: ['The information', 'is easily', 'accessible'], chinese: '这些信息很容易获取。' },
    { words: [{ en: 'You need a password', cn: '你需要一个密码' }, { en: 'to access', cn: '来访问' }, { en: 'the file', cn: '这个文件' }], correct: ['You need a password', 'to access', 'the file'], chinese: '你需要一个密码来访问这个文件。' },
    { words: [{ en: 'The museum gives', cn: '博物馆提供' }, { en: 'free access', cn: '免费进入' }, { en: 'to students', cn: '给学生' }], correct: ['The museum gives', 'free access', 'to students'], chinese: '博物馆为学生提供免费入场券。' },
    { words: [{ en: 'The building is', cn: '这栋建筑是' }, { en: 'accessible to', cn: '可进入的' }, { en: 'wheelchair users', cn: '轮椅使用者' }], correct: ['The building is', 'accessible to', 'wheelchair users'], chinese: '这栋楼对轮椅使用者是无障碍的。' },
    { words: [{ en: 'How can I', cn: '我如何' }, { en: 'access', cn: '访问' }, { en: 'my account?', cn: '我的账户' }], correct: ['How can I', 'access', 'my account?'], chinese: '我如何才能访问我的账户？' },
    { words: [{ en: 'We have', cn: '我们有' }, { en: 'access to', cn: '...的权限' }, { en: 'the library', cn: '图书馆' }], correct: ['We have', 'access to', 'the library'], chinese: '我们有权使用图书馆。' },
    { words: [{ en: 'Make sure your website', cn: '确保你的网站' }, { en: 'is accessible', cn: '是可访问的' }], correct: ['Make sure your website', 'is accessible'], chinese: '确保你的网站是可访问的。' },
    { words: [{ en: 'He tried to', cn: '他试图' }, { en: 'access', cn: '获取' }, { en: 'the restricted data', cn: '受限数据' }], correct: ['He tried to', 'access', 'the restricted data'], chinese: '他试图获取受限制的数据。' }
];

export const AccessContent: React.FC<AccessContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>🔄 "Access" vs "Accessible"</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"Access" 可以作名词（进入权）或动词（访问），而 "Accessible" 则是其形容词形式，表示“可访问的”。区分这两者对于准确表达能否进入或使用某物非常重要。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. 作名词 (Noun): access</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    作为名词，"access" 表示“进入；使用的权利；通道”。它通常是不可数名词。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Students need a password to get <strong>access</strong> to the network.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Students need a password to get access to the network.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>学生需要密码才能获得网络的访问权限。</ExampleChinese>
                </ExampleItem>

                <UsageType>2. 作动词 (Verb): access</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    作为动词，"access" 表示“访问；存取（数据）”。这是一个及物动词，后面直接跟宾语。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>You can <strong>access</strong> your email from anywhere.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('You can access your email from anywhere.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>你可以从任何地方访问你的电子邮件。</ExampleChinese>
                </ExampleItem>

                <UsageType>3. 作形容词 (Adjective): accessible</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    "accessible" 是形容词，意思是“可进入的；可得到的；易于理解的”。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The museum is easily <strong>accessible</strong> by bus.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The museum is easily accessible by bus.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>乘坐公交车很容易到达这个博物馆。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：使用 'access' 和 'accessible'"
                subtitle="用下面的词组成句子，注意使用正确的词形"
                completionTitle="🎉 Fantastic!"
                completionMessage="你已经掌握了 'access' 和 'accessible' 的用法！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};
