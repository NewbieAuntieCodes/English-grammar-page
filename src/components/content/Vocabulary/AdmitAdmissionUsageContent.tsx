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
import { FillInTheBlankPractice } from '../../practice/FillInTheBlankPractice';
import { PracticeModeSwitcher, ModeButton } from '../../practice/SentenceBuilderPractice.styles';
import styled from 'styled-components';

interface AdmitAdmissionUsageContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const UsageGroup = styled.div`
    margin-top: 30px;
    padding: 25px;
    border-radius: 15px;
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
`;

const UsageTitle = styled.h3`
    font-size: 1.5em;
    font-weight: bold;
    color: #2d3748;
    margin-bottom: 20px;
`;

const WordType = styled.h4<{ themeColor: string }>`
    font-size: 1.2em;
    font-weight: bold;
    color: ${props => props.themeColor};
    margin-top: 15px;
    margin-bottom: 10px;

    code {
        background-color: rgba(${props => props.themeColor.substring(1).match(/.{1,2}/g)?.map(v => parseInt(v, 16)).join(',')}, 0.1);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: monospace;
    }
`;

const buildPracticeData = [
    { words: [{ en: 'He refused to', cn: '他拒绝' }, { en: 'admit', cn: '承认' }, { en: 'his mistake', cn: '他的错误' }], correct: ['He refused to', 'admit', 'his mistake'], chinese: '他拒绝承认自己的错误。' },
    { words: [{ en: 'Admission to', cn: '进入...' }, { en: 'the museum', cn: '博物馆' }, { en: 'is free', cn: '是免费的' }], correct: ['Admission to', 'the museum', 'is free'], chinese: '进入博物馆是免费的。' },
    { words: [{ en: 'His silence was', cn: '他的沉默是' }, { en: 'an admission of', cn: '一种承认' }, { en: 'guilt', cn: '罪行' }], correct: ['His silence was', 'an admission of', 'guilt'], chinese: '他的沉默就是承认有罪。' },
    { words: [{ en: 'She was', cn: '她被' }, { en: 'admitted to', cn: '录取到' }, { en: 'the university', cn: '这所大学' }], correct: ['She was', 'admitted to', 'the university'], chinese: '她被这所大学录取了。' }
];

const fillPracticeData = [
    { sentenceParts: ["She finally ", " that she had lied."] as const, choices: [{text: "admitted", isCorrect: true}, {text: "admission", isCorrect: false}], chineseHint: "她最终承认她撒谎了。" },
    { sentenceParts: ["How much is the ", " fee for the park?"] as const, choices: [{text: "admission", isCorrect: true}, {text: "admit", isCorrect: false}], chineseHint: "这个公园的入场费是多少？" },
    { sentenceParts: ["He made a full ", " of his crimes to the police."] as const, choices: [{text: "admission", isCorrect: true}, {text: "admit", isCorrect: false}], chineseHint: "他向警方全部承认了他的罪行。" },
    { sentenceParts: ["Only ticket holders will be ", " into the theater."] as const, choices: [{text: "admitted", isCorrect: true}, {text: "admission", isCorrect: false}], chineseHint: "只有持票人才能被允许进入剧院。" },
];

export const AdmitAdmissionUsageContent: React.FC<AdmitAdmissionUsageContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [practiceMode, setPracticeMode] = useState<'build' | 'fill'>('build');

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
            <LessonTitle>📖 'admit' vs 'admission'</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"admit" 是一个动词，而 "admission" 是它的名词形式。它们都与“承认”或“准许进入”有关，但词性决定了它们在句子中的位置和用法完全不同。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 按意思分类学习</SectionTitle>

                <UsageGroup>
                    <UsageTitle>含义一：承认 (Confession)</UsageTitle>
                    
                    <WordType themeColor={themeColor}>动词: <code>admit</code></WordType>
                    <ExampleItem themeColor={themeColor}>
                        <ExampleHeader>
                            <ExampleEnglish>He <strong>admitted</strong> making a mistake.</ExampleEnglish>
                            <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He admitted making a mistake.'); }}>🔊</SpeakButton>
                        </ExampleHeader>
                        <ExampleChinese>他承认犯了个错误。(承认做某事: admit + V-ing)</ExampleChinese>
                    </ExampleItem>
                    
                    <WordType themeColor={themeColor}>名词: <code>admission</code></WordType>
                    <ExampleItem themeColor={themeColor}>
                        <ExampleHeader>
                            <ExampleEnglish>His silence was an <strong>admission</strong> of guilt.</ExampleEnglish>
                            <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('His silence was an admission of guilt.'); }}>🔊</SpeakButton>
                        </ExampleHeader>
                        <ExampleChinese>他的沉默就是承认了罪行。</ExampleChinese>
                    </ExampleItem>
                </UsageGroup>
                
                <UsageGroup>
                    <UsageTitle>含义二：准许进入 (Entry)</UsageTitle>
                    
                    <WordType themeColor={themeColor}>动词: <code>admit</code></WordType>
                    <ExampleItem themeColor={themeColor}>
                        <ExampleHeader>
                            <ExampleEnglish>She was <strong>admitted</strong> to the university.</ExampleEnglish>
                            <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("She was admitted to the university."); }}>🔊</SpeakButton>
                        </ExampleHeader>
                        <ExampleChinese>她被这所大学录取了。</ExampleChinese>
                    </ExampleItem>

                    <WordType themeColor={themeColor}>名词: <code>admission</code></WordType>
                    <ExampleItem themeColor={themeColor}>
                        <ExampleHeader>
                            <ExampleEnglish><strong>Admission</strong> to the museum is free.</ExampleEnglish>
                            <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("Admission to the museum is free."); }}>🔊</SpeakButton>
                        </ExampleHeader>
                        <ExampleChinese>进入该博物馆是免费的。</ExampleChinese>
                    </ExampleItem>
                </UsageGroup>
            </ExamplesSection>
            
             <PracticeModeSwitcher>
                <ModeButton 
                    isActive={practiceMode === 'build'} 
                    onClick={() => setPracticeMode('build')}
                    themeColor={themeColor}
                >
                    组句练习
                </ModeButton>
                <ModeButton 
                    isActive={practiceMode === 'fill'} 
                    onClick={() => setPracticeMode('fill')}
                    themeColor={themeColor}
                >
                    选择题
                </ModeButton>
            </PracticeModeSwitcher>

            {practiceMode === 'build' ? (
                <SentenceBuilderPractice
                    themeColor={themeColor}
                    onCompleteAll={() => setPracticeMode('fill')}
                    practiceData={buildPracticeData}
                    title="🎯 练习：组句"
                    subtitle="用下面的词组成句子"
                    completionTitle="🎉 Good Job!"
                    completionMessage="你已完成组句练习！"
                    nextButtonText="开始选择题 →"
                />
            ) : (
                 <FillInTheBlankPractice
                    themeColor={themeColor}
                    onCompleteAll={onCompleteAll}
                    practiceData={fillPracticeData}
                    title="🎯 练习：选择题"
                    subtitle="选择正确的单词"
                    completionTitle="🎉 Admitted!"
                    completionMessage="你已经掌握了 'admit' 和 'admission' 的用法！"
                    nextButtonText="返回列表"
                />
            )}
        </LessonContainer>
    );
};