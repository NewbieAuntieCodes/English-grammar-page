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
    FormulaSection,
    FormulaTitle,
    FormulaParts,
    PlusSign,
    ExamplesSection,
    ExampleItem,
    ExampleHeader,
    SpeakButton,
    ExampleEnglish,
    ExampleChinese,
    ExampleBreakdown,
    BreakdownPart,
    SVOFormulaPart,
    SVOPartEnglish,
    SVOPartChinese,
    SVOPartDivider,
    SVOPartOfSpeechInfo,
    SVOPartOfSpeechText,
    SVOPartOfSpeechTextEng
} from './SVOContent.styles'; // Re-use SVO styles
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';


interface SVCContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

// FIX: Updated `words` to be an array of objects with `en` and `cn` properties to match the `PracticeData` type.
const practiceData = {
    basic: [
        { words: [{ en: 'She', cn: '她' }, { en: 'is', cn: '是' }, { en: 'happy', cn: '开心的' }], correct: ['She', 'is', 'happy'], chinese: '她很开心' },
        { words: [{ en: 'They', cn: '他们' }, { en: 'are', cn: '是' }, { en: 'doctors', cn: '医生' }], correct: ['They', 'are', 'doctors'], chinese: '他们是医生' },
        { words: [{ en: 'The food', cn: '食物' }, { en: 'tastes', cn: '尝起来' }, { en: 'delicious', cn: '美味的' }], correct: ['The food', 'tastes', 'delicious'], chinese: '食物尝起来很美味' },
        { words: [{ en: 'I', cn: '我' }, { en: 'feel', cn: '感觉' }, { en: 'cold', cn: '冷的' }], correct: ['I', 'feel', 'cold'], chinese: '我感觉很冷' },
        { words: [{ en: 'It', cn: '它' }, { en: 'sounds', cn: '听起来' }, { en: 'great', cn: '很棒' }], correct: ['It', 'sounds', 'great'], chinese: '这听起来很棒' },
        { words: [{ en: 'He', cn: '他' }, { en: 'seems', cn: '似乎' }, { en: 'tired', cn: '累了' }], correct: ['He', 'seems', 'tired'], chinese: '他看起来很累' },
        { words: [{ en: 'You', cn: '你' }, { en: 'look', cn: '看起来' }, { en: 'beautiful', cn: '漂亮的' }], correct: ['You', 'look', 'beautiful'], chinese: '你看起来很漂亮' },
    ]
};


export const SVCContent: React.FC<SVCContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [activeExample, setActiveExample] = useState<string | null>(null);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        const loadVoices = () => {
            setVoices(window.speechSynthesis.getVoices());
        };

        if ('speechSynthesis' in window) {
            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        return () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.onvoiceschanged = null;
            }
        };
    }, []);

    const handleToggleBreakdown = (exampleId: string) => {
        setActiveExample(prev => (prev === exampleId ? null : exampleId));
    };

    const handleExplainPart = (part: 'subject' | 'verb' | 'complement') => {
        const explanations = {
            subject: "主语 (Subject): 句子的主角，是动作的发出者。\n\n它通常由【名词】(Noun) 或【代词】(Pronoun) 担任。\n\n例如：\n- 名词: The food, The sky\n- 代词: I, She, They",
            verb: "系动词 (Linking Verb): 不表示具体动作，像一座桥梁，连接主语和描述它的词。\n\n它本身也是一种【动词】。\n\n例如：am, is, are, look, sound, feel, seem",
            complement: "表语 (Complement): 用来描述主语，说明主语的身份、状态或特征。\n\n它可以是：\n1. 【名词】(Noun) - 用来识别主语是什么。\n   - 例: He is a doctor. (doctor 识别 He)\n\n2. 【形容词】(Adjective) - 用来描述主语怎么样。\n   - 例: The sky is blue. (blue 描述 The sky)"
        };
        alert(explanations[part]);
    };

    const handleSpeak = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            const usVoice = voices.find(voice => voice.lang === 'en-US');
            
            utterance.voice = usVoice || voices.find(voice => voice.lang.startsWith('en-')) || null;
            utterance.rate = 0.9;
            utterance.pitch = 1.1;

            window.speechSynthesis.speak(utterance);
        } else {
            alert("Sorry, your browser doesn't support text-to-speech.");
        }
    };

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Lessons</BackButton>

            <LessonTitle>🏗️ Subject + Linking Verb + Complement (主系表)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？Why learn this?</SectionTitle>
                <p>这个句型用来描述主语的状态、身份或特征。比如'我是学生'或'天气很好'。它和SVO一样重要，是表达'是什么'和'怎么样'的关键！</p>
            </WhyLearnSection>

            <FormulaSection themeColor={themeColor}>
                <FormulaTitle themeColor={themeColor}>Sentence Structure Formula</FormulaTitle>
                <FormulaParts>
                    <SVOFormulaPart themeColor={themeColor} onClick={() => handleExplainPart('subject')}>
                        <SVOPartEnglish>Subject</SVOPartEnglish>
                        <SVOPartChinese>主语</SVOPartChinese>
                        <SVOPartDivider />
                        <SVOPartOfSpeechInfo>
                            <SVOPartOfSpeechText>名词 / 代词</SVOPartOfSpeechText>
                            <SVOPartOfSpeechTextEng>(Noun / Pronoun)</SVOPartOfSpeechTextEng>
                        </SVOPartOfSpeechInfo>
                    </SVOFormulaPart>
                    <PlusSign themeColor={themeColor}>+</PlusSign>
                    <SVOFormulaPart themeColor={themeColor} onClick={() => handleExplainPart('verb')}>
                        <SVOPartEnglish>Linking Verb</SVOPartEnglish>
                        <SVOPartChinese>系动词</SVOPartChinese>
                        <SVOPartDivider />
                        <SVOPartOfSpeechInfo>
                            <SVOPartOfSpeechText>系动词</SVOPartOfSpeechText>
                            <SVOPartOfSpeechTextEng>(A type of Verb)</SVOPartOfSpeechTextEng>
                        </SVOPartOfSpeechInfo>
                    </SVOFormulaPart>
                    <PlusSign themeColor={themeColor}>+</PlusSign>
                    <SVOFormulaPart themeColor={themeColor} onClick={() => handleExplainPart('complement')}>
                        <SVOPartEnglish>Complement</SVOPartEnglish>
                        <SVOPartChinese>表语</SVOPartChinese>
                        <SVOPartDivider />
                        <SVOPartOfSpeechInfo>
                            <SVOPartOfSpeechText>名词 / 形容词</SVOPartOfSpeechText>
                            <SVOPartOfSpeechTextEng>(Noun / Adjective)</SVOPartOfSpeechTextEng>
                        </SVOPartOfSpeechInfo>
                    </SVOFormulaPart>
                </FormulaParts>
            </FormulaSection>

            <ExamplesSection>
                <SectionTitle>📝 Interactive Examples (点击查看详细分析)</SectionTitle>
                <ExampleItem onClick={() => handleToggleBreakdown('ex1')} themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>He is a teacher.</ExampleEnglish>
                        <SpeakButton
                          onClick={(e) => { e.stopPropagation(); handleSpeak('He is a teacher.'); }}
                          aria-label="Speak sentence"
                        >
                            🔊
                        </SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他是一位老师。</ExampleChinese>
                    <ExampleBreakdown show={activeExample === 'ex1'} themeColor={themeColor}>
                        <BreakdownPart><strong>主语 (Subject):</strong> He (他)</BreakdownPart>
                        <BreakdownPart><strong>系动词 (Verb):</strong> is (是)</BreakdownPart>
                        <BreakdownPart><strong>表语 (Complement):</strong> a teacher (一位老师)</BreakdownPart>
                    </ExampleBreakdown>
                </ExampleItem>
                <ExampleItem onClick={() => handleToggleBreakdown('ex2')} themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The flowers smell good.</ExampleEnglish>
                        <SpeakButton
                          onClick={(e) => { e.stopPropagation(); handleSpeak('The flowers smell good.'); }}
                          aria-label="Speak sentence"
                        >
                            🔊
                        </SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>花闻起来很香。</ExampleChinese>
                    <ExampleBreakdown show={activeExample === 'ex2'} themeColor={themeColor}>
                        <BreakdownPart><strong>主语 (Subject):</strong> The flowers (花)</BreakdownPart>
                        <BreakdownPart><strong>系动词 (Verb):</strong> smell (闻起来)</BreakdownPart>
                        <BreakdownPart><strong>表语 (Complement):</strong> good (香)</BreakdownPart>
                    </ExampleBreakdown>
                </ExampleItem>
                <ExampleItem onClick={() => handleToggleBreakdown('ex3')} themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The sky is blue.</ExampleEnglish>
                        <SpeakButton
                          onClick={(e) => { e.stopPropagation(); handleSpeak('The sky is blue.'); }}
                          aria-label="Speak sentence"
                        >
                            🔊
                        </SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>天空是蓝色的。</ExampleChinese>
                    <ExampleBreakdown show={activeExample === 'ex3'} themeColor={themeColor}>
                        <BreakdownPart><strong>主语 (Subject):</strong> The sky (天空)</BreakdownPart>
                        <BreakdownPart><strong>系动词 (Verb):</strong> is (是)</BreakdownPart>
                        <BreakdownPart><strong>表语 (Complement):</strong> blue (蓝色的)</BreakdownPart>
                    </ExampleBreakdown>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData.basic}
                title="🎯 Practice: Build a sentence using the words below"
                subtitle="练习：用下面的词组成句子"
                completionTitle="🎉 Excellent!"
                completionMessage="You have mastered the Subject-Verb-Complement structure."
                nextButtonText="跳到下一章。Next Page"
            />
        </LessonContainer>
    );
};