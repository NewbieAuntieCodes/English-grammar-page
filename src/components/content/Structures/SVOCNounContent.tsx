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

interface SVOCNounContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const practiceData = {
    basic: [
        { words: [{ en: 'We', cn: '我们' }, { en: 'call', cn: '称' }, { en: 'him', cn: '他' }, { en: 'a hero', cn: '英雄' }], correct: ['We', 'call', 'him', 'a hero'], chinese: '我们称他为英雄' },
        { words: [{ en: 'His parents', cn: '他父母' }, { en: 'named', cn: '命名' }, { en: 'him', cn: '他' }, { en: 'John', cn: '约翰' }], correct: ['His parents', 'named', 'him', 'John'], chinese: '他的父母给他取名约翰' },
        { words: [{ en: 'I', cn: '我' }, { en: 'call', cn: '叫' }, { en: 'my dog', cn: '我的狗' }, { en: '"Max"', cn: '“麦克斯”' }], correct: ['I', 'call', 'my dog', '"Max"'], chinese: '我叫我的狗“麦克斯”' },
        { words: [{ en: 'They', cn: '他们' }, { en: 'made', cn: '让' }, { en: 'him', cn: '他' }, { en: 'captain', cn: '队长' }], correct: ['They', 'made', 'him', 'captain'], chinese: '他们让他当上了队长' },
        { words: [{ en: 'We', cn: '我们' }, { en: 'think', cn: '认为' }, { en: 'him', cn: '他' }, { en: 'a good boy', cn: '好男孩' }], correct: ['We', 'think', 'him', 'a good boy'], chinese: '我们认为他是个好孩子' },
        { words: [{ en: 'The club', cn: '俱乐部' }, { en: 'chose', cn: '选择' }, { en: 'her', cn: '她' }, { en: 'leader', cn: '领袖' }], correct: ['The club', 'chose', 'her', 'leader'], chinese: '俱乐部选择了她当领袖' },
        { words: [{ en: 'People', cn: '人们' }, { en: 'elected', cn: '选举' }, { en: 'him', cn: '他' }, { en: 'president', cn: '总统' }], correct: ['People', 'elected', 'him', 'president'], chinese: '人们选举他为总统' },
        { words: [{ en: 'I', cn: '我' }, { en: 'consider', cn: '认为' }, { en: 'it', cn: '它' }, { en: 'a mistake', cn: '一个错误' }], correct: ['I', 'consider', 'it', 'a mistake'], chinese: '我认为这是一个错误' },
    ]
};


export const SVOCNounContent: React.FC<SVOCNounContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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

    const handleExplainPart = (part: 'subject' | 'verb' | 'object' | 'complement') => {
        const explanations = {
            subject: "主语 (Subject): 句子的发起者。\n\n通常是【名词】(Noun) 或【代词】(Pronoun)。",
            verb: "谓语 (Verb): 表示动作的词。\n\n这里是【实义动词】(Action Verb)，例如 call, name, make。",
            object: "宾语 (Object): 动作的接受者。\n\n通常是【名词】(Noun) 或【代词】(Pronoun)。",
            complement: "名词宾补 (Noun Complement): 用一个【名词】(Noun)来补充说明宾语(Object)是什么，给宾语一个身份或名字。\n\n核心关系: 宾语 = 宾补\n- They named their son 'Leo'. (their son = 'Leo')"
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

            <LessonTitle>🏗️ S + V + O + Noun Complement (主谓宾宾补-名词)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？Why learn this?</SectionTitle>
                <p>这个句型用来进一步说明宾语的身份、职位或成为什么。常见的动词有 call, name, make, elect, consider 等。</p>
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
                        <SVOPartEnglish>Noun Comp.</SVOPartEnglish>
                        <SVOPartChinese>名词宾补</SVOPartChinese>
                        <SVOPartDivider />
                        <SVOPartOfSpeechInfo>
                            <SVOPartOfSpeechText>名词</SVOPartOfSpeechText>
                            <SVOPartOfSpeechTextEng>(Noun)</SVOPartOfSpeechTextEng>
                        </SVOPartOfSpeechInfo>
                    </SVOFormulaPart>
                </FormulaParts>
            </FormulaSection>

            <ExamplesSection>
                <SectionTitle>📝 Interactive Examples (点击查看详细分析)</SectionTitle>
                <ExampleItem onClick={() => handleToggleBreakdown('ex1')} themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>They named their son "Leo".</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('They named their son "Leo".'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他们给儿子取名叫“里奥”。</ExampleChinese>
                    <ExampleBreakdown show={activeExample === 'ex1'} themeColor={themeColor}>
                        <BreakdownPart><strong>主语 (Subject):</strong> They</BreakdownPart>
                        <BreakdownPart><strong>谓语 (Verb):</strong> named</BreakdownPart>
                        <BreakdownPart><strong>宾语 (Object):</strong> their son</BreakdownPart>
                        <BreakdownPart><strong>宾补 (Complement):</strong> "Leo"</BreakdownPart>
                    </ExampleBreakdown>
                </ExampleItem>
                <ExampleItem onClick={() => handleToggleBreakdown('ex2')} themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I consider this a good book.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I consider this a good book.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我认为这是一本好书。</ExampleChinese>
                    <ExampleBreakdown show={activeExample === 'ex2'} themeColor={themeColor}>
                        <BreakdownPart><strong>主语 (Subject):</strong> I</BreakdownPart>
                        <BreakdownPart><strong>谓语 (Verb):</strong> consider</BreakdownPart>
                        <BreakdownPart><strong>宾语 (Object):</strong> this</BreakdownPart>
                        <BreakdownPart><strong>宾补 (Complement):</strong> a good book</BreakdownPart>
                    </ExampleBreakdown>
                </ExampleItem>
                <ExampleItem onClick={() => handleToggleBreakdown('ex3')} themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>We call our cat 'Mimi'.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak("We call our cat 'Mimi'."); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我们叫我们的猫“咪咪”。</ExampleChinese>
                    <ExampleBreakdown show={activeExample === 'ex3'} themeColor={themeColor}>
                        <BreakdownPart><strong>主语 (Subject):</strong> We</BreakdownPart>
                        <BreakdownPart><strong>谓语 (Verb):</strong> call</BreakdownPart>
                        <BreakdownPart><strong>宾语 (Object):</strong> our cat</BreakdownPart>
                        <BreakdownPart><strong>宾补 (Complement):</strong> 'Mimi'</BreakdownPart>
                    </ExampleBreakdown>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData.basic}
                title="🎯 Practice: Build a sentence"
                subtitle="练习：用下面的词组成句子"
                completionTitle="🎉 Great Job!"
                completionMessage="You have mastered the SVOC (Noun) structure."
                nextButtonText="学习形容词宾补 (Adjective)"
            />
        </LessonContainer>
    );
};
