/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import {
    LessonContainer, BackButton, LessonTitle, SectionTitle, WhyLearnSection, ExamplesSection,
    ExampleItem, ExampleHeader, SpeakButton, ExampleEnglish, ExampleChinese,
} from './PartsOfSpeechLesson.styles';
import { WordSelectorPractice } from '../../practice/WordSelectorPractice';

interface AdverbsContentProps {
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

const practiceDataModifyingVerbs = [
    { sentence: 'He runs fast.', targetWords: ['fast'], prompt: '副词 (Adverb)', chinese: "他跑得很快。" },
    { sentence: 'She sings well.', targetWords: ['well'], prompt: '副词 (Adverb)', chinese: "她唱得很好。" },
    { sentence: 'The boy works hard.', targetWords: ['hard'], prompt: '副词 (Adverb)', chinese: "这个男孩努力工作。" },
    { sentence: 'I often read books.', targetWords: ['often'], prompt: '副词 (Adverb)', chinese: "我经常读书。" },
    { sentence: 'Please speak slowly.', targetWords: ['slowly'], prompt: '副词 (Adverb)', chinese: "请慢慢说。" },
    { sentence: 'She always helps others.', targetWords: ['always'], prompt: '副词 (Adverb)', chinese: "她总是帮助别人。" },
    { sentence: 'They talked quietly in the library.', targetWords: ['quietly'], prompt: '副词 (Adverb)', chinese: "他们在图书馆里轻声交谈。" },
    { sentence: 'The train arrived late yesterday.', targetWords: ['late'], prompt: '副词 (Adverb)', chinese: "火车昨天晚到了。" },
];

const practiceDataModifyingAdjectives = [
    { sentence: 'He is very tall.', targetWords: ['very'], prompt: '副词 (Adverb)', chinese: "他非常高。" },
    { sentence: 'The movie was really good.', targetWords: ['really'], prompt: '副词 (Adverb)', chinese: "这部电影真的很好。" },
    { sentence: 'She is an extremely smart student.', targetWords: ['extremely'], prompt: '副词 (Adverb)', chinese: "她是一个极其聪明的学生。" },
    { sentence: 'This is a fairly easy question.', targetWords: ['fairly'], prompt: '副词 (Adverb)', chinese: "这是一个相当简单的问题。" },
    { sentence: 'The weather is too hot today.', targetWords: ['too'], prompt: '副词 (Adverb)', chinese: "今天天气太热了。" },
    { sentence: 'It was an incredibly beautiful view.', targetWords: ['incredibly'], prompt: '副词 (Adverb)', chinese: "那真是美得令人难以置信的景色。" },
    { sentence: 'The test was quite difficult.', targetWords: ['quite'], prompt: '副词 (Adverb)', chinese: "考试相当难。" },
    { sentence: 'The box is almost full.', targetWords: ['almost'], prompt: '副词 (Adverb)', chinese: "这个箱子几乎满了。" },
];

export const AdverbsContent: React.FC<AdverbsContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [activeExample, setActiveExample] = useState<string | null>(null);
    const [practiceView, setPracticeView] = useState<'verbs' | 'adjectives'>('verbs');

    useEffect(() => {
        const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
        if ('speechSynthesis' in window) {
            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
        return () => { if ('speechSynthesis' in window) window.speechSynthesis.onvoiceschanged = null; };
    }, []);

    const handleSpeak = useCallback((text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            const usVoice = voices.find(voice => voice.lang === 'en-US');
            utterance.voice = usVoice || voices.find(voice => voice.lang.startsWith('en-')) || null;
            utterance.rate = 0.9;
            utterance.pitch = 1.1;
            window.speechSynthesis.speak(utterance);
        }
    }, [voices]);

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to List</BackButton>
            <LessonTitle>🚀 Adverbs (副词)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学副词？</SectionTitle>
                <p>副词为动作和描述增添了更多信息。它们可以修饰动词，告诉我们动作发生的方式（how）、时间（when）；也可以修饰形容词，表示程度。副词能让你的描述更精确、更生动。</p>
            </WhyLearnSection>

            <UsageType>1. 副词修饰动词 (Adverbs Modifying Verbs)</UsageType>
            <p style={{ color: '#4a5568', margin: '0 0 15px 5px' }}>
                这是副词最常见的用法。它们告诉我们动作发生的方式、时间、地点或频率。
            </p>
            <ExamplesSection style={{margin: '0'}}>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex1'} onClick={() => setActiveExample(p => p === 'ex1' ? null : 'ex1')}>
                    <ExampleHeader>
                        <ExampleEnglish>He walks <strong>slowly</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He walks slowly.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他走得很慢。(slowly 修饰动词 walks，说明走路的方式)</ExampleChinese>
                </ExampleItem>
                 <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex3'} onClick={() => setActiveExample(p => p === 'ex3' ? null : 'ex3')}>
                    <ExampleHeader>
                        <ExampleEnglish>She sings <strong>well</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('She sings well.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>她唱得很好。(well 修饰动词 sings，说明唱歌的方式)</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <UsageType>2. 副词修饰形容词 (Adverbs Modifying Adjectives)</UsageType>
            <p style={{ color: '#4a5568', margin: '0 0 15px 5px' }}>
                副词也可以用来加强或减弱形容词的语气，表示程度。这类副词通常被称为程度副词 (Adverbs of Degree)。
            </p>
            <ExamplesSection style={{margin: '0'}}>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex2'} onClick={() => setActiveExample(p => p === 'ex2' ? null : 'ex2')}>
                    <ExampleHeader>
                        <ExampleEnglish>It's a <strong>very</strong> big house.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("It's a very big house."); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这是一座非常大的房子。(very 修饰形容词 big，说明大的程度)</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex4'} onClick={() => setActiveExample(p => p === 'ex4' ? null : 'ex4')}>
                    <ExampleHeader>
                        <ExampleEnglish>The soup is <strong>too</strong> hot.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("The soup is too hot."); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这个汤太烫了。(too 修饰形容词 hot，说明热的程度)</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>

            {practiceView === 'verbs' && (
                <WordSelectorPractice
                    themeColor={themeColor}
                    onCompleteAll={() => setPracticeView('adjectives')}
                    practiceData={practiceDataModifyingVerbs}
                    completionTitle="🎉 Good Job!"
                    completionMessage="你已完成第一组练习！"
                    nextButtonText="开始下一组练习 →"
                />
            )}
            
            {practiceView === 'adjectives' && (
                <WordSelectorPractice
                    themeColor={themeColor}
                    onCompleteAll={onCompleteAll}
                    practiceData={practiceDataModifyingAdjectives}
                    completionTitle="🎉 Wonderful!"
                    completionMessage="你已经掌握了副词的两种主要用法！"
                    nextButtonText="Next Lesson: Prepositions →"
                />
            )}
        </LessonContainer>
    );
};
