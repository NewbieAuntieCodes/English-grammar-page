/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { LessonContainer, BackButton, LessonTitle, WhyLearnSection, SectionTitle, SpeakButton } from '../Structures/SVOContent.styles';
import { RuleContainer, RuleCard, RuleTitle, RuleExplanation } from '../Tenses/PastTenseContent.styles';
import styled, { ThemeProvider } from 'styled-components';

interface EdPronunciationContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const hexToRgb = (hex: string) => {
    let c: any = hex.substring(1).split('');
    if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',');
};

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

const ReadingPracticeSection = styled.div<{ themeColor: string }>`
    background: linear-gradient(to bottom, rgba(${props => hexToRgb(props.themeColor)}, 0.12), rgba(${props => hexToRgb(props.themeColor)}, 0.03));
    border-radius: 15px;
    padding: 30px;
    margin: 30px 0;
    text-align: center;
`;

const ReadingParagraph = styled.div`
    background: #fff;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    padding: 25px;
    font-size: 1.2em;
    line-height: 1.8;
    color: #34495e;
    text-align: left;
    margin-bottom: 25px;

    strong {
        font-weight: bold;
        color: ${(props: any) => props.theme.themeColor};
        background: rgba(${(props: any) => hexToRgb(props.theme.themeColor)}, 0.1);
        padding: 2px 5px;
        border-radius: 4px;
    }
`;

const LargeSpeakButton = styled(SpeakButton)`
    font-size: 1.5em;
    padding: 15px 25px;
    margin: 0 auto 25px;
    display: flex;
    gap: 10px;
    border-radius: 30px;
    width: fit-content;
    color: #2d3748;
`;

const FinishButton = styled.button<{ themeColor: string }>`
    background: ${props => props.themeColor};
    color: white;
    border: none;
    padding: 12px 28px;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
    font-size: 1em;

    &:hover {
        transform: scale(1.05);
    }
`;


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

    const paragraphHTML = "Yesterday, I <strong>walked</strong> to my friend's house. We <strong>played</strong> a game and <strong>laughed</strong> a lot. He <strong>needed</strong> help with his project, so I <strong>helped</strong> him. We <strong>decided</strong> to order pizza because we both <strong>wanted</strong> to eat something easy. The pizza arrived and we <strong>loved</strong> it. After we <strong>finished</strong>, we <strong>watched</strong> a movie. It <strong>rained</strong> outside, but we felt cozy.";
    const paragraphText = "Yesterday, I walked to my friend's house. We played a game and laughed a lot. He needed help with his project, so I helped him. We decided to order pizza because we both wanted to eat something easy. The pizza arrived and we loved it. After we finished, we watched a movie. It rained outside, but we felt cozy.";


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
            
            <ReadingPracticeSection themeColor={themeColor}>
                <SectionTitle style={{textAlign: 'center', fontSize: '1.3em'}}>朗读练习 (Reading Practice)</SectionTitle>
                <p style={{textAlign: 'center', color: '#6b7280', fontSize: '0.9em', marginBottom: '20px'}}>
                    听下面的段落，注意-ed单词的发音
                </p>
                <ThemeProvider theme={{ themeColor }}>
                    <ReadingParagraph dangerouslySetInnerHTML={{ __html: paragraphHTML }} />
                </ThemeProvider>
                <LargeSpeakButton onClick={() => handleSpeak(paragraphText)} aria-label="Play Full Paragraph">
                    <span>🔊</span> Play Audio
                </LargeSpeakButton>
                <FinishButton themeColor={themeColor} onClick={onBack}>
                    完成练习
                </FinishButton>
            </ReadingPracticeSection>
        </LessonContainer>
    );
};
