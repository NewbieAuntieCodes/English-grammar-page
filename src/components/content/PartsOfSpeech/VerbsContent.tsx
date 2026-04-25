/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useCallback } from 'react';
import {
    LessonContainer, BackButton, LessonTitle, SectionTitle, WhyLearnSection, ExamplesSection,
    ExampleItem, ExampleHeader, SpeakButton, ExampleEnglish, ExampleChinese,
    VerbTypeContainer, VerbTypeCard, VerbTypeHeader, VerbTypeIcon, VerbTypeTitle, VerbTypeConcept,
    VerbTypeExampleList, VerbTypeExampleItem, VerbTypeSentence
} from './PartsOfSpeechLesson.styles';
import { WordSelectorPractice } from '../../practice/WordSelectorPractice';

interface VerbsContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const practiceData = [
    { sentence: 'I run fast.', targetWords: ['run'], prompt: '动词 (Verb)', chinese: "我跑得很快。" },
    { sentence: 'They eat bread.', targetWords: ['eat'], prompt: '动词 (Verb)', chinese: "他们吃面包。" },
    { sentence: 'We like cats.', targetWords: ['like'], prompt: '动词 (Verb)', chinese: "我们喜欢猫。" },
    { sentence: 'She writes a letter.', targetWords: ['writes'], prompt: '动词 (Verb)', chinese: "她写一封信。" },
    { sentence: 'You are a student.', targetWords: ['are'], prompt: '动词 (Verb)', chinese: "你是一名学生。" },
    { sentence: 'I feel happy.', targetWords: ['feel'], prompt: '动词 (Verb)', chinese: "我感觉很开心。" },
    { sentence: 'You look great.', targetWords: ['look'], prompt: '动词 (Verb)', chinese: "你看起来很棒。" },
    { sentence: 'The baby sleeps peacefully.', targetWords: ['sleeps'], prompt: '动词 (Verb)', chinese: "宝宝安静地睡着了。" },
];

export const VerbsContent: React.FC<VerbsContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [activeExample, setActiveExample] = useState<string | null>(null);

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
            <LessonTitle>🏃 Verbs (动词)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学动词？</SectionTitle>
                <p>动词是句子的心脏！它们表示动作或状态，告诉我们名词在“做什么”或“是什么”。没有动词，句子就不完整。</p>
            </WhyLearnSection>

            <VerbTypeContainer>
                <VerbTypeCard>
                    <VerbTypeHeader>
                        <VerbTypeIcon>🏃</VerbTypeIcon>
                        <VerbTypeTitle>实义动词 (Action Verbs)</VerbTypeTitle>
                    </VerbTypeHeader>
                    <VerbTypeConcept>
                        表示一个具体的<strong>动作</strong>。它们告诉我们主语在<strong>做什么</strong>。
                    </VerbTypeConcept>
                    <VerbTypeExampleList>
                        <VerbTypeExampleItem>run (跑)</VerbTypeExampleItem>
                        <VerbTypeExampleItem>eat (吃)</VerbTypeExampleItem>
                        <VerbTypeExampleItem>think (思考)</VerbTypeExampleItem>
                        <VerbTypeExampleItem>write (写)</VerbTypeExampleItem>
                        <VerbTypeExampleItem>play (玩)</VerbTypeExampleItem>
                    </VerbTypeExampleList>
                    <VerbTypeSentence>The cat <strong>climbs</strong> the tree.</VerbTypeSentence>
                </VerbTypeCard>
                <VerbTypeCard>
                    <VerbTypeHeader>
                        <VerbTypeIcon>🔗</VerbTypeIcon>
                        <VerbTypeTitle>系动词 (Linking Verbs)</VerbTypeTitle>
                    </VerbTypeHeader>
                    <VerbTypeConcept>
                        不表示动作，像一座<strong>桥梁</strong>，连接主语和描述它的词。这包括常见的感官动词 (sensory verbs)。
                    </VerbTypeConcept>
                    <VerbTypeExampleList>
                        <VerbTypeExampleItem>is/am/are</VerbTypeExampleItem>
                        <VerbTypeExampleItem>feel (感觉)</VerbTypeExampleItem>
                        <VerbTypeExampleItem>look (看起来)</VerbTypeExampleItem>
                        <VerbTypeExampleItem>smell (闻起来)</VerbTypeExampleItem>
                        <VerbTypeExampleItem>taste (尝起来)</VerbTypeExampleItem>
                    </VerbTypeExampleList>
                    <VerbTypeSentence>The cat <strong>is</strong> fluffy. (猫<strong>是</strong>毛茸茸的)</VerbTypeSentence>
                </VerbTypeCard>
            </VerbTypeContainer>

            <ExamplesSection>
                <SectionTitle>📝 Examples</SectionTitle>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex1'} onClick={() => setActiveExample(p => p === 'ex1' ? null : 'ex1')}>
                    <ExampleHeader>
                        <ExampleEnglish>The baby <strong>sleeps</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The baby sleeps.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>宝宝在睡觉。（sleeps 是一个‘动作’，是实义动词）</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor} isExpanded={activeExample === 'ex2'} onClick={() => setActiveExample(p => p === 'ex2' ? null : 'ex2')}>
                    <ExampleHeader>
                        <ExampleEnglish>She <strong>is</strong> a doctor.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('She is a doctor.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>她是一名医生。（is 是一个‘状态’，是系动词）</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <WordSelectorPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                completionTitle="🎉 Well Done!"
                completionMessage="You're getting good at spotting verbs."
                nextButtonText="Next Lesson: Adjectives →"
            />
        </LessonContainer>
    );
};
