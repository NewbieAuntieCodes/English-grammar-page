/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
    SVOPartOfSpeechTextEng,
} from './SVOContent.styles';
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';

interface SVOCAdjectiveContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

// FIX: Updated `words` to be an array of objects with `en` and `cn` properties to match the `PracticeData` type.
const practiceData = {
    basic: [
        { words: [{ en: 'This song', cn: '这首歌' }, { en: 'makes', cn: '让' }, { en: 'me', cn: '我' }, { en: 'sad', cn: '伤心' }], correct: ['This song', 'makes', 'me', 'sad'], chinese: '这首歌让我伤心' },
        { words: [{ en: 'You should', cn: '你应该' }, { en: 'keep', cn: '保持' }, { en: 'your hands', cn: '你的手' }, { en: 'clean', cn: '干净' }], correct: ['You should', 'keep', 'your hands', 'clean'], chinese: '你应该保持双手干净' },
        { words: [{ en: 'I', cn: '我' }, { en: 'found', cn: '发现' }, { en: 'the movie', cn: '这部电影' }, { en: 'boring', cn: '无聊的' }], correct: ['I', 'found', 'the movie', 'boring'], chinese: '我发现这部电影很无聊' },
        { words: [{ en: "Don't leave", cn: '别让' }, { en: 'the window', cn: '窗户' }, { en: 'open', cn: '开着' }], correct: ["Don't leave", 'the window', 'open'], chinese: '别让窗户开着' },
        { words: [{ en: 'She', cn: '她' }, { en: 'wants', cn: '想要' }, { en: 'her coffee', cn: '她的咖啡' }, { en: 'black', cn: '黑的' }], correct: ['She', 'wants', 'her coffee', 'black'], chinese: '她想要黑咖啡' },
        { words: [{ en: 'He', cn: '他' }, { en: 'painted', cn: '漆了' }, { en: 'the wall', cn: '墙' }, { en: 'white', cn: '白色的' }], correct: ['He', 'painted', 'the wall', 'white'], chinese: '他把墙漆成白色' },
    ]
};


export const SVOCAdjectiveContent: React.FC<SVOCAdjectiveContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [activeExample, setActiveExample] = useState<string | null>(null);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        const loadVoices = () => { setVoices(window.speechSynthesis.getVoices()); };
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

    const handleExplainPart = (part: 'subject' | 'verb' | 'object' | 'complement') => {
        const explanations = {
            subject: "主语 (Subject): 句子的发起者。\n\n通常是【名词】(Noun) 或【代词】(Pronoun)。",
            verb: "谓语 (Verb): 表示动作的词。\n\n这里是【实义动词】(Action Verb)，例如 make, keep, find。",
            object: "宾语 (Object): 动作的接受者。\n\n通常是【名词】(Noun) 或【代词】(Pronoun)。",
            complement: "形容词宾补 (Adjective Complement): 用一个【形容词】(Adjective)来补充说明宾语(Object)的特征或状态。\n\n核心关系: 形容词修饰宾语\n- The joke made everyone happy. ('happy' 描述 'everyone' 的状态)"
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
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Menu</BackButton>

            <LessonTitle>🏗️ S + V + O + Adjective Complement (主谓宾宾补-形容词)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？Why learn this?</SectionTitle>
                <p>这个句型用来描述宾语的状态或特征。常见的动词有 make, keep, find, leave, paint 等。</p>
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
                        <SVOPartEnglish>Verb</SVOPartEnglish>
                        <SVOPartChinese>谓语</SVOPartChinese>
                        <SVOPartDivider />
                        <SVOPartOfSpeechInfo>
                            <SVOPartOfSpeechText>实义动词</SVOPartOfSpeechText>
                            <SVOPartOfSpeechTextEng>(Action Verb)</SVOPartOfSpeechTextEng>
                        </SVOPartOfSpeechInfo>
                    </SVOFormulaPart>
                    <PlusSign themeColor={themeColor}>+</PlusSign>
                    <SVOFormulaPart themeColor={themeColor} onClick={() => handleExplainPart('object')}>
                        <SVOPartEnglish>Object</SVOPartEnglish>
                        <SVOPartChinese>宾语</SVOPartChinese>
                        <SVOPartDivider />
                        <SVOPartOfSpeechInfo>
                            <SVOPartOfSpeechText>名词 / 代词</SVOPartOfSpeechText>
                            <SVOPartOfSpeechTextEng>(Noun / Pronoun)</SVOPartOfSpeechTextEng>
                        </SVOPartOfSpeechInfo>
                    </SVOFormulaPart>
                    <PlusSign themeColor={themeColor}>+</PlusSign>
                    <SVOFormulaPart themeColor={themeColor} onClick={() => handleExplainPart('complement')}>
                        <SVOPartEnglish>Adjective Comp.</SVOPartEnglish>
                        <SVOPartChinese>形容词宾补</SVOPartChinese>
                        <SVOPartDivider />
                        <SVOPartOfSpeechInfo>
                            <SVOPartOfSpeechText>形容词</SVOPartOfSpeechText>
                            <SVOPartOfSpeechTextEng>(Adjective)</SVOPartOfSpeechTextEng>
                        </SVOPartOfSpeechInfo>
                    </SVOFormulaPart>
                </FormulaParts>
            </FormulaSection>

            <ExamplesSection>
                <SectionTitle>📝 Interactive Examples (点击查看详细分析)</SectionTitle>
                <ExampleItem onClick={() => handleToggleBreakdown('ex1')} themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The joke made everyone happy.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The joke made everyone happy.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这个笑话让大家都很开心。</ExampleChinese>
                    <ExampleBreakdown show={activeExample === 'ex1'} themeColor={themeColor}>
                        <BreakdownPart><strong>主语 (Subject):</strong> The joke</BreakdownPart>
                        <BreakdownPart><strong>谓语 (Verb):</strong> made</BreakdownPart>
                        <BreakdownPart><strong>宾语 (Object):</strong> everyone</BreakdownPart>
                        <BreakdownPart><strong>宾补 (Complement):</strong> happy</BreakdownPart>
                    </ExampleBreakdown>
                </ExampleItem>
                <ExampleItem onClick={() => handleToggleBreakdown('ex2')} themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Please keep the room tidy.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Please keep the room tidy.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>请保持房间整洁。</ExampleChinese>
                    <ExampleBreakdown show={activeExample === 'ex2'} themeColor={themeColor}>
                        <BreakdownPart><strong>主语 (Subject):</strong> (You)</BreakdownPart>
                        <BreakdownPart><strong>谓语 (Verb):</strong> keep</BreakdownPart>
                        <BreakdownPart><strong>宾语 (Object):</strong> the room</BreakdownPart>
                        <BreakdownPart><strong>宾补 (Complement):</strong> tidy</BreakdownPart>
                    </ExampleBreakdown>
                </ExampleItem>
                <ExampleItem onClick={() => handleToggleBreakdown('ex3')} themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>She found the test easy.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('She found the test easy.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>她觉得这次考试很简单。</ExampleChinese>
                    <ExampleBreakdown show={activeExample === 'ex3'} themeColor={themeColor}>
                        <BreakdownPart><strong>主语 (Subject):</strong> She</BreakdownPart>
                        <BreakdownPart><strong>谓语 (Verb):</strong> found</BreakdownPart>
                        <BreakdownPart><strong>宾语 (Object):</strong> the test</BreakdownPart>
                        <BreakdownPart><strong>宾补 (Complement):</strong> easy</BreakdownPart>
                    </ExampleBreakdown>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData.basic}
                title="🎯 Practice: Build a sentence"
                subtitle="练习：用下面的词组成句子"
                completionTitle="🎉 Congratulations!"
                completionMessage="You have mastered all basic sentence structures."
                nextButtonText="完成本章，返回主列表"
            />
        </LessonContainer>
    );
};