/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { LessonContainer, BackButton, LessonTitle, WhyLearnSection, SectionTitle, SpeakButton } from '../Structures/SVOContent.styles';
import { RuleContainer, RuleCard, RuleTitle, RuleExplanation } from '../Tenses/PastTenseContent.styles';
import { MultipleChoicePractice } from '../../practice/MultipleChoicePractice';
import styled from 'styled-components';

interface EdPronunciationContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const SoundText = styled.div`
    font-size: 1.8em;
    font-weight: bold;
    color: ${props => props.color};
    font-family: 'Arial', sans-serif;
`;

const ExampleWordContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 15px;
`;

const ExampleWord = styled.div`
    background: #fff;
    border: 1px solid #dee2e6;
    padding: 8px 12px;
    border-radius: 8px;
    font-weight: 500;
    font-size: 1em;
    color: #495057;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const practiceData = [
    { question: 'walked', choices: [{text: "/t/", isCorrect: true}, {text: "/d/", isCorrect: false}, {text: "/ɪd/", isCorrect: false}], chineseHint: "walk (k) - voiceless" },
    { question: 'played', choices: [{text: "/t/", isCorrect: false}, {text: "/d/", isCorrect: true}, {text: "/ɪd/", isCorrect: false}], chineseHint: "play (vowel) - voiced" },
    { question: 'wanted', choices: [{text: "/t/", isCorrect: false}, {text: "/d/", isCorrect: false}, {text: "/ɪd/", isCorrect: true}], chineseHint: "want (t) - ends in t/d" },
    { question: 'helped', choices: [{text: "/t/", isCorrect: true}, {text: "/d/", isCorrect: false}, {text: "/ɪd/", isCorrect: false}], chineseHint: "help (p) - voiceless" },
    { question: 'loved', choices: [{text: "/t/", isCorrect: false}, {text: "/d/", isCorrect: true}, {text: "/ɪd/", isCorrect: false}], chineseHint: "love (v) - voiced" },
    { question: 'needed', choices: [{text: "/t/", isCorrect: false}, {text: "/d/", isCorrect: false}, {text: "/ɪd/", isCorrect: true}], chineseHint: "need (d) - ends in t/d" },
    { question: 'laughed', choices: [{text: "/t/", isCorrect: true}, {text: "/d/", isCorrect: false}, {text: "/ɪd/", isCorrect: false}], chineseHint: "laugh (f) - voiceless" },
    { question: 'called', choices: [{text: "/t/", isCorrect: false}, {text: "/d/", isCorrect: true}, {text: "/ɪd/", isCorrect: false}], chineseHint: "call (l) - voiced" },
    { question: 'decided', choices: [{text: "/t/", isCorrect: false}, {text: "/d/", isCorrect: false}, {text: "/ɪd/", isCorrect: true}], chineseHint: "decide (d) - ends in t/d" },
    { question: 'watched', choices: [{text: "/t/", isCorrect: true}, {text: "/d/", isCorrect: false}, {text: "/ɪd/", isCorrect: false}], chineseHint: "watch (ch) - voiceless" },
];

export const EdPronunciationContent: React.FC<EdPronunciationContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Pronunciation List</BackButton>
            <LessonTitle>🗣️ -ed 结尾的发音</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>正确发出 "-ed" 的音是英语流利度的重要标志。很多学习者会错误地把所有的 "-ed" 都读成一个单独的音节，但实际上它有三种不同的发音。掌握这些规则能让你的口语听起来更自然！</p>
            </WhyLearnSection>

            <SectionTitle>📝 三种发音规则</SectionTitle>
            <RuleContainer>
                <RuleCard themeColor="#3498db">
                    <RuleTitle>规则 1: /t/</RuleTitle>
                    <SoundText color="#3498db">/t/</SoundText>
                    <RuleExplanation>当动词原形以<strong>清辅音 (voiceless)</strong> 结尾时 (除了/t/)，-ed 发 /t/ 音。 <br/>(例如: p, k, s, sh, ch, f, th)</RuleExplanation>
                    <ExampleWordContainer>
                        <ExampleWord>helped <SpeakButton onClick={() => handleSpeak('helped')}>🔊</SpeakButton></ExampleWord>
                        <ExampleWord>looked <SpeakButton onClick={() => handleSpeak('looked')}>🔊</SpeakButton></ExampleWord>
                        <ExampleWord>missed <SpeakButton onClick={() => handleSpeak('missed')}>🔊</SpeakButton></ExampleWord>
                    </ExampleWordContainer>
                </RuleCard>
                <RuleCard themeColor="#2ecc71">
                    <RuleTitle>规则 2: /d/</RuleTitle>
                    <SoundText color="#2ecc71">/d/</SoundText>
                    <RuleExplanation>当动词原形以<strong>浊辅音 (voiced)</strong> 或<strong>元音</strong>结尾时 (除了/d/)，-ed 发 /d/ 音。<br/>(例如: b, g, v, z, l, m, n, r, and a, e, i, o, u)</RuleExplanation>
                     <ExampleWordContainer>
                        <ExampleWord>played <SpeakButton onClick={() => handleSpeak('played')}>🔊</SpeakButton></ExampleWord>
                        <ExampleWord>loved <SpeakButton onClick={() => handleSpeak('loved')}>🔊</SpeakButton></ExampleWord>
                        <ExampleWord>called <SpeakButton onClick={() => handleSpeak('called')}>🔊</SpeakButton></ExampleWord>
                    </ExampleWordContainer>
                </RuleCard>
                 <RuleCard themeColor="#e74c3c" style={{gridColumn: '1 / -1'}}>
                    <RuleTitle>规则 3: /ɪd/</RuleTitle>
                    <SoundText color="#e74c3c">/ɪd/ or /əd/</SoundText>
                    <RuleExplanation>当动词原形以 <strong>/t/</strong> 或 <strong>/d/</strong> 音结尾时，-ed 发 /ɪd/ 音，并增加一个音节。</RuleExplanation>
                     <ExampleWordContainer>
                        <ExampleWord>wanted <SpeakButton onClick={() => handleSpeak('wanted')}>🔊</SpeakButton></ExampleWord>
                        <ExampleWord>needed <SpeakButton onClick={() => handleSpeak('needed')}>🔊</SpeakButton></ExampleWord>
                        <ExampleWord>decided <SpeakButton onClick={() => handleSpeak('decided')}>🔊</SpeakButton></ExampleWord>
                    </ExampleWordContainer>
                </RuleCard>
            </RuleContainer>
            
            <MultipleChoicePractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习：选择正确的 -ed 发音"
                subtitle="根据单词的结尾音，选择 -ed 的正确发音"
                completionTitle="🎉 Excellent!"
                completionMessage="你已经掌握了 -ed 的发音规则！"
                nextButtonText="完成练习"
            />
        </LessonContainer>
    );
};