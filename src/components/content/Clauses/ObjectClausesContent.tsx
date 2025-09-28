/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
    ExampleSwitcher,
    SwitcherButton,
    AnalysisGrid,
    AnalysisColumn,
    popIn,
} from '../Structures/SVOContent.styles';
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';
import { FillInTheBlankPractice } from '../../practice/FillInTheBlankPractice';
import { PracticeModeSwitcher, ModeButton } from '../../practice/SentenceBuilderPractice.styles';


interface ObjectClausesContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const buildPracticeData = [
    { words: [{ en: 'I', cn: '我' }, { en: 'think', cn: '认为' }, { en: 'that', cn: '' }, { en: 'he', cn: '他' }, { en: 'is honest', cn: '是诚实的' }], correct: ['I', 'think', 'that', 'he', 'is honest'], chinese: '我认为他是诚实的。' },
    { words: [{ en: 'She', cn: '她' }, { en: 'said', cn: '说' }, { en: 'that', cn: '' }, { en: 'she', cn: '她' }, { en: 'was tired', cn: '累了' }], correct: ['She', 'said', 'that', 'she', 'was tired'], chinese: '她说她累了。' },
    { words: [{ en: 'Do you know', cn: '你知道' }, { en: 'what', cn: '什么' }, { en: 'he', cn: '他' }, { en: 'wants', cn: '想要' }], correct: ['Do you know', 'what', 'he', 'wants'], chinese: '你知道他想要什么吗？' },
    { words: [{ en: 'I wonder', cn: '我想知道' }, { en: 'if', cn: '是否' }, { en: 'it', cn: '它' }, { en: 'will rain', cn: '会下雨' }], correct: ['I wonder', 'if', 'it', 'will rain'], chinese: '我想知道是否会下雨。' },
    { words: [{ en: 'Tell me', cn: '告诉我' }, { en: 'where', cn: '哪里' }, { en: 'you', cn: '你' }, { en: 'live', cn: '住' }], correct: ['Tell me', 'where', 'you', 'live'], chinese: '告诉我你住在哪里。' },
    { words: [{ en: 'Nobody knows', cn: '没人知道' }, { en: 'why', cn: '为什么' }, { en: 'he', cn: '他' }, { en: 'is angry', cn: '生气' }], correct: ['Nobody knows', 'why', 'he', 'is angry'], chinese: '没人知道他为什么生气。' },
    { words: [{ en: "I don't know", cn: '我不知道' }, { en: 'who', cn: '谁' }, { en: 'took', cn: '拿了' }, { en: 'my pen', cn: '我的笔' }], correct: ["I don't know", 'who', 'took', 'my pen'], chinese: '我不知道谁拿了我的笔。' },
];

const fillPracticeData = [
    { sentenceParts: ["I think ", " he is honest."], choices: [{text: "that", isCorrect: true}, {text: "if", isCorrect: false}, {text: "what", isCorrect: false}], chineseHint: "我认为他是诚实的。" },
    { sentenceParts: ["She said ", " she was tired."], choices: [{text: "that", isCorrect: true}, {text: "who", isCorrect: false}, {text: "why", isCorrect: false}], chineseHint: "她说她累了。" },
    { sentenceParts: ["Do you know ", " he wants?"], choices: [{text: "what", isCorrect: true}, {text: "who", isCorrect: false}, {text: "if", isCorrect: false}], chineseHint: "你知道他想要什么吗？" },
    { sentenceParts: ["I wonder ", " it will rain."], choices: [{text: "if", isCorrect: true}, {text: "that", isCorrect: false}, {text: "what", isCorrect: false}], chineseHint: "我想知道是否会下雨。" },
    { sentenceParts: ["Tell me ", " you live."], choices: [{text: "where", isCorrect: true}, {text: "who", isCorrect: false}, {text: "that", isCorrect: false}], chineseHint: "告诉我你住在哪里。" },
];

const normalExamples = [
    {
        id: 'ex1',
        title: 'I hope...',
        english: 'I hope (that) you can come.',
        chinese: '我希望你能来。',
        mainClause: { subject: 'I', verb: 'hope' },
        objectClause: { connector: '(that) - 已省略', subject: 'you', verb: 'can come' },
        core: '动词 `hope` 的宾语(object)是什么？是 `(that) you can come` 这整件事。'
    },
    {
        id: 'ex2',
        title: "I don't know...",
        english: "I don't know what I should do.",
        chinese: '我不知道我应该做什么。',
        mainClause: { subject: 'I', verb: "don't know" },
        objectClause: { connector: 'what', subject: 'I', verb: 'should do' },
        core: "动词 `know` 的宾语是什么？是 `what I should do` 这个从句。引导词 `what` 在从句中也充当 `do` 的宾语。"
    },
    {
        id: 'ex3',
        title: 'Can you tell me...',
        english: 'Can you tell me if he is at home?',
        chinese: '你能告诉我他是否在家吗？',
        mainClause: { subject: 'You', verb: 'tell', indirectObject: 'me' },
        objectClause: { connector: 'if', subject: 'he', verb: 'is', complement: 'at home' },
        core: '动词 `tell` 有两个宾语。`me` 是间接宾语，而 `if he is at home` 整个从句是直接宾语，回答了 "tell me what?"'
    },
    {
        id: 'ex4',
        title: "I don't understand...",
        english: "I don't understand why she is upset.",
        chinese: '我不明白她为什么不高兴。',
        mainClause: { subject: 'I', verb: "don't understand" },
        objectClause: { connector: 'why', subject: 'she', verb: 'is', complement: 'upset' },
        core: '动词 `understand` 的宾语是什么？是 `why she is upset` 这个从句，解释了不明白的内容。'
    },
];

const specialCaseExamples = [
    {
        id: 'ex5',
        title: 'He asked who...',
        english: 'He asked who ate the cake.',
        chinese: '他问是谁吃了蛋糕。',
        mainClause: { subject: 'He', verb: 'asked' },
        objectClause: { connector: 'who', subject: 'who (既是引导词也是主语)', verb: 'ate the cake' },
        core: '动词 `asked` 的宾语是 `who ate the cake` 这个从句。在这里引导词 `who` 同时充当从句的主语。'
    },
    {
        id: 'ex6',
        title: 'I want to know what...',
        english: 'I want to know what happened.',
        chinese: '我想知道发生了什么事。',
        mainClause: { subject: 'I', verb: 'want to know' },
        objectClause: { connector: 'what', subject: 'what (既是引导词也是主语)', verb: 'happened' },
        core: '动词 `know` 的宾语是 `what happened` 这个从句。`what` 在这里既是引导词，也是从句 `happened` 的主语。'
    },
    {
        id: 'ex7',
        title: 'They will find out who...',
        english: 'They will find out who is responsible.',
        chinese: '他们会查出谁是负责人。',
        mainClause: { subject: 'They', verb: 'will find out' },
        objectClause: { connector: 'who', subject: 'who (既是引导词也是主语)', verb: 'is responsible' },
        core: '动词 `find out` 的宾语是 `who is responsible` 这个从句。`who` 在这里既是引导词，也是从句的主语。'
    }
];

const AnimatedExampleItem = styled(ExampleItem)`
    animation: ${popIn} 0.4s ease-out;
`;

const TipSection = styled(WhyLearnSection)`
    background: linear-gradient(135deg, rgba(254, 249, 195, 1), rgba(253, 230, 138, 0.2));
    border-left-color: #FBBF24;
    p, h4 {
        color: #92400E;
    }
`;

const SpecialCaseSection = styled(WhyLearnSection)`
    background: linear-gradient(135deg, rgba(224, 231, 255, 1), rgba(239, 246, 255, 0.2));
    border-left-color: #6366F1;
    p, h4 {
        color: #4338CA;
    }
`;

export const ObjectClausesContent: React.FC<ObjectClausesContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [activeNormalExampleIndex, setActiveNormalExampleIndex] = useState(0);
    const [activeSpecialExampleIndex, setActiveSpecialExampleIndex] = useState(0);
    const [practiceMode, setPracticeMode] = useState<'build' | 'fill'>('build');

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

    const handleExplainPart = (part: 'main' | 'object-clause') => {
        const explanations = {
            main: "主句 (Main Clause): 句子的主要部分，包含核心的主语和谓语动词 (通常是及物动词，如 know, think, say)。\n\n例如: I believe..., She asked...",
            'object-clause': "宾语从句 (Object Clause): 充当主句动词的宾语。它回答了 '主语 + 动词' + '什么？' 的问题。\n\n它由一个【引导词】(that, if, who, what等) 加上一个【完整的陈述句】构成。\n\n例如: ...that he will come. (I believe 'what?' -> that he will come)"
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

    const activeNormalExample = normalExamples[activeNormalExampleIndex];
    const activeSpecialExample = specialCaseExamples[activeSpecialExampleIndex];

    const renderExample = (example: any) => (
        <AnimatedExampleItem themeColor={themeColor}>
            <ExampleHeader>
                <ExampleEnglish>{example.english}</ExampleEnglish>
                <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak(example.english.replace(/[()]/g, '')); }} aria-label="Speak sentence">🔊</SpeakButton>
            </ExampleHeader>
            <ExampleChinese>{example.chinese}</ExampleChinese>
            <ExampleBreakdown show={true} themeColor={themeColor}>
                <AnalysisGrid>
                    <AnalysisColumn themeColor={themeColor}>
                        <h4>主句分析</h4>
                        <BreakdownPart>- <strong>主语:</strong> {example.mainClause.subject}</BreakdownPart>
                        <BreakdownPart>- <strong>谓语:</strong> {example.mainClause.verb}</BreakdownPart>
                        {example.mainClause.indirectObject && (
                            <BreakdownPart>- <strong>间接宾语:</strong> {example.mainClause.indirectObject}</BreakdownPart>
                        )}
                    </AnalysisColumn>
                    <AnalysisColumn themeColor={themeColor}>
                        <h4>宾语从句分析</h4>
                        <BreakdownPart>- <strong>引导词:</strong> {example.objectClause.connector}</BreakdownPart>
                        <BreakdownPart>- <strong>从句主语:</strong> {example.objectClause.subject}</BreakdownPart>
                        <BreakdownPart>- <strong>从句谓语:</strong> {example.objectClause.verb}</BreakdownPart>
                        {example.objectClause.complement && (
                            <BreakdownPart>- <strong>从句表语:</strong> {example.objectClause.complement}</BreakdownPart>
                        )}
                    </AnalysisColumn>
                </AnalysisGrid>
                <BreakdownPart style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #e2e8f0' }}>
                    <strong>* 核心:</strong> {example.core}
                </BreakdownPart>
            </ExampleBreakdown>
        </AnimatedExampleItem>
    );

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Clause List</BackButton>

            <LessonTitle>📦 宾语从句 Object Clauses</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>宾语从句非常常用，尤其是在转述别人的话、表达观点或提出问题时。比如 "他说他会来" 或 "我不知道该做什么"，这些都需要宾语从句。它让我们可以把一个完整的句子当作一个名词（宾语）来使用。</p>
            </WhyLearnSection>

            <FormulaSection themeColor={themeColor}>
                <FormulaTitle themeColor={themeColor}>宾语从句结构</FormulaTitle>
                <FormulaParts>
                    <SVOFormulaPart themeColor={themeColor} onClick={() => handleExplainPart('main')}>
                        <SVOPartEnglish>Main Clause</SVOPartEnglish>
                        <SVOPartChinese>主句 (主+谓)</SVOPartChinese>
                        <SVOPartDivider />
                        <SVOPartOfSpeechInfo>
                            <SVOPartOfSpeechText>I think...</SVOPartOfSpeechText>
                            <SVOPartOfSpeechTextEng>She knows...</SVOPartOfSpeechTextEng>
                        </SVOPartOfSpeechInfo>
                    </SVOFormulaPart>
                    <PlusSign themeColor={themeColor}>+</PlusSign>
                    <SVOFormulaPart themeColor={themeColor} onClick={() => handleExplainPart('object-clause')}>
                        <SVOPartEnglish>Object Clause</SVOPartEnglish>
                        <SVOPartChinese>宾语从句</SVOPartChinese>
                        <SVOPartDivider />
                        <SVOPartOfSpeechInfo>
                            <SVOPartOfSpeechText>引导词+陈述句</SVOPartOfSpeechText>
                            <SVOPartOfSpeechTextEng>(that/if/what... + SVO)</SVOPartOfSpeechTextEng>
                        </SVOPartOfSpeechInfo>
                    </SVOFormulaPart>
                </FormulaParts>
            </FormulaSection>

            <TipSection themeColor={themeColor}>
                <SectionTitle>💡 小贴士：'that' 的省略</SectionTitle>
                <p>在多数口语和非正式写作中，如果宾语从句由 <strong>that</strong> 引导，这个 <strong>that</strong> 通常可以省略，句子意思不变。但它其实还在那里，只是“隐身”了！</p>
                <ExampleEnglish style={{ marginTop: '10px', fontSize: '1.1em', fontWeight: 'normal' }}>
                    I think <strong>(that)</strong> he is right.
                </ExampleEnglish>
            </TipSection>

            <ExamplesSection>
                <SectionTitle>📝 基础例子分析</SectionTitle>
                <ExampleSwitcher>
                    {normalExamples.map((ex, index) => (
                        <SwitcherButton
                            key={ex.id}
                            isActive={activeNormalExampleIndex === index}
                            onClick={() => setActiveNormalExampleIndex(index)}
                            themeColor={themeColor}
                        >
                            {ex.title}
                        </SwitcherButton>
                    ))}
                </ExampleSwitcher>
                {activeNormalExample && renderExample(activeNormalExample)}
            </ExamplesSection>

            <SpecialCaseSection themeColor={themeColor}>
                <SectionTitle>📌 特殊情况：引导词同时作主语</SectionTitle>
                <p>有时候，引导词如 <strong>who</strong>, <strong>what</strong>, <strong>which</strong> 不仅引导从句，也直接充当从句的【主语】。这时，从句的结构是【引导词(主语) + 谓语...】，引导词后面不再有其他主语。</p>
                <ExampleEnglish style={{ marginTop: '10px', fontSize: '1.1em', fontWeight: 'normal' }}>
                    I want to know <strong>who</strong> opened the door.
                </ExampleEnglish>
                <p style={{ marginTop: '5px', fontSize: '0.9em', color: '#4338CA' }}>- 在这里，<strong>who</strong> 就是动词 <strong>opened</strong> 的主语。</p>
            </SpecialCaseSection>

            <ExamplesSection>
                <SectionTitle>📌 特殊情况例句</SectionTitle>
                <ExampleSwitcher>
                    {specialCaseExamples.map((ex, index) => (
                        <SwitcherButton
                            key={ex.id}
                            isActive={activeSpecialExampleIndex === index}
                            onClick={() => setActiveSpecialExampleIndex(index)}
                            themeColor={themeColor}
                        >
                            {ex.title}
                        </SwitcherButton>
                    ))}
                </ExampleSwitcher>
                {activeSpecialExample && renderExample(activeSpecialExample)}
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
                    填空练习
                </ModeButton>
            </PracticeModeSwitcher>

            {practiceMode === 'build' ? (
                <SentenceBuilderPractice
                    themeColor={themeColor}
                    onCompleteAll={onCompleteAll}
                    practiceData={buildPracticeData}
                    title="🎯 练习：构建宾语从句"
                    subtitle="用下面的词组成句子"
                    completionTitle="🎉 Awesome!"
                    completionMessage="你已经掌握了宾语从句！"
                    nextButtonText="返回从句列表"
                />
            ) : (
                <FillInTheBlankPractice
                    themeColor={themeColor}
                    onCompleteAll={onCompleteAll}
                    practiceData={fillPracticeData}
                    title="🎯 练习：宾语从句填空"
                    subtitle="选择正确的引导词"
                    completionTitle="🎉 Awesome!"
                    completionMessage="你已经掌握了宾语从句！"
                    nextButtonText="返回从句列表"
                />
            )}

        </LessonContainer>
    );
};