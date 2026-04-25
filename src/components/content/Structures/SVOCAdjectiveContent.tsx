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
    ExamplesSection,
    ExampleItem,
    ExampleHeader,
    SpeakButton,
    ExampleEnglish,
    ExampleChinese,
    ExampleBreakdown,
    BreakdownPart,
} from './SVOContent.styles';
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';
import { MultipleChoicePractice } from '../../practice/MultipleChoicePractice';
import { FillInTheBlankPractice } from '../../practice/FillInTheBlankPractice';

interface SVOCAdjectiveContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const QuickGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin: 24px 0;
`;

const QuickCard = styled.div`
    background: white;
    border-radius: 18px;
    padding: 18px 16px;
    text-align: center;
    border: 2px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
`;

const QuickCardTitle = styled.div<{ themeColor: string }>`
    color: ${props => props.themeColor};
    font-size: 1.1em;
    font-weight: 800;
`;

const QuickCardHint = styled.div`
    margin-top: 8px;
    color: #4a5568;
    font-weight: 700;
    font-size: 0.95em;
`;

const QuickCardExample = styled.div`
    margin-top: 8px;
    color: #718096;
    font-size: 0.9em;
`;

const CompareCard = styled.div`
    background: white;
    border-radius: 18px;
    padding: 18px;
    border: 2px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
    margin: 20px 0 28px;
`;

const CompareSentence = styled.div`
    font-size: 1.2em;
    font-weight: 800;
    color: #2d3748;
    text-align: center;
`;

const CompareHint = styled.div`
    margin-top: 10px;
    text-align: center;
    color: #718096;
    font-size: 0.92em;
    font-weight: 700;
`;

const practiceData = {
    basic: [
        { words: [{ en: 'This song', cn: '这首歌' }, { en: 'makes', cn: '让' }, { en: 'me', cn: '我' }, { en: 'sad', cn: '伤心' }], correct: ['This song', 'makes', 'me', 'sad'], chinese: '这首歌让我伤心' },
        { words: [{ en: 'You should', cn: '你应该' }, { en: 'keep', cn: '保持' }, { en: 'your hands', cn: '你的手' }, { en: 'clean', cn: '干净' }], correct: ['You should', 'keep', 'your hands', 'clean'], chinese: '你应该保持双手干净' },
        { words: [{ en: 'I', cn: '我' }, { en: 'found', cn: '发现' }, { en: 'the movie', cn: '这部电影' }, { en: 'boring', cn: '无聊的' }], correct: ['I', 'found', 'the movie', 'boring'], chinese: '我发现这部电影很无聊' },
        { words: [{ en: "Don't leave", cn: '别让' }, { en: 'the window', cn: '窗户' }, { en: 'open', cn: '开着' }], correct: ["Don't leave", 'the window', 'open'], chinese: '别让窗户开着' },
        { words: [{ en: 'She', cn: '她' }, { en: 'wants', cn: '想要' }, { en: 'her coffee', cn: '她的咖啡' }, { en: 'black', cn: '黑的' }], correct: ['She', 'wants', 'her coffee', 'black'], chinese: '她想要黑咖啡' },
        { words: [{ en: 'He', cn: '他' }, { en: 'painted', cn: '漆了' }, { en: 'the wall', cn: '墙' }, { en: 'white', cn: '白色的' }], correct: ['He', 'painted', 'the wall', 'white'], chinese: '他把墙漆成白色' },
        { words: [{ en: 'The sun', cn: '太阳' }, { en: 'keeps', cn: '保持' }, { en: 'us', cn: '我们' }, { en: 'warm', cn: '温暖' }], correct: ['The sun', 'keeps', 'us', 'warm'], chinese: '太阳让我们保持温暖' },
        { words: [{ en: 'Exercise', cn: '锻炼' }, { en: 'makes', cn: '使' }, { en: 'you', cn: '你' }, { en: 'healthy', cn: '健康' }], correct: ['Exercise', 'makes', 'you', 'healthy'], chinese: '锻炼使你健康' },
    ]
};

const completeMiniPracticeData1 = [
    {
        question: 'The news made me ___.',
        choices: [
            { text: 'happy', isCorrect: true },
            { text: 'school', isCorrect: false },
            { text: 'Amy', isCorrect: false },
        ],
        chineseHint: '这个消息让我开心。',
    },
    {
        question: 'She painted the door ___.',
        choices: [
            { text: 'red', isCorrect: true },
            { text: 'doctor', isCorrect: false },
            { text: 'room', isCorrect: false },
        ],
        chineseHint: '她把门刷成红色。',
    },
    {
        question: 'We found the game ___.',
        choices: [
            { text: 'easy', isCorrect: true },
            { text: 'Mike', isCorrect: false },
            { text: 'class', isCorrect: false },
        ],
        chineseHint: '我们觉得这个游戏很简单。',
    },
    {
        question: 'The teacher kept the class ___.',
        choices: [
            { text: 'quiet', isCorrect: true },
            { text: 'leader', isCorrect: false },
            { text: 'London', isCorrect: false },
        ],
        chineseHint: '老师让全班保持安静。',
    },
];

const completeMiniPracticeData2 = [
    {
        question: 'This song makes us ___.',
        choices: [
            { text: 'sleepy', isCorrect: true },
            { text: 'Tom', isCorrect: false },
            { text: 'the park', isCorrect: false },
        ],
        chineseHint: '这首歌让我们困了。',
    },
    {
        question: 'The blanket keeps me ___.',
        choices: [
            { text: 'warm', isCorrect: true },
            { text: 'teacher', isCorrect: false },
            { text: 'class', isCorrect: false },
        ],
        chineseHint: '毛毯让我保持温暖。',
    },
    {
        question: 'I found the test ___.',
        choices: [
            { text: 'hard', isCorrect: true },
            { text: 'Lily', isCorrect: false },
            { text: 'home', isCorrect: false },
        ],
        chineseHint: '我觉得这次考试很难。',
    },
    {
        question: 'They left the door ___.',
        choices: [
            { text: 'open', isCorrect: true },
            { text: 'leader', isCorrect: false },
            { text: 'at school', isCorrect: false },
        ],
        chineseHint: '他们让门开着。',
    },
];

const fillPracticeData = [
    { sentenceParts: ['The story made me ', '.'] as const, choices: [{ text: 'excited', isCorrect: true }, { text: 'teacher', isCorrect: false }, { text: 'library', isCorrect: false }], chineseHint: '这个故事让我很兴奋。' },
    { sentenceParts: ['She painted the chair ', '.'] as const, choices: [{ text: 'yellow', isCorrect: true }, { text: 'Amy', isCorrect: false }, { text: 'in the room', isCorrect: false }], chineseHint: '她把椅子刷成黄色。' },
    { sentenceParts: ['We found the book ', '.'] as const, choices: [{ text: 'useful', isCorrect: true }, { text: 'captain', isCorrect: false }, { text: 'tomorrow', isCorrect: false }], chineseHint: '我们觉得这本书很有用。' },
    { sentenceParts: ['The coach kept the team ', '.'] as const, choices: [{ text: 'ready', isCorrect: true }, { text: 'doctor', isCorrect: false }, { text: 'behind the door', isCorrect: false }], chineseHint: '教练让队伍保持准备状态。' },
    { sentenceParts: ['They left the window ', '.'] as const, choices: [{ text: 'open', isCorrect: true }, { text: 'leader', isCorrect: false }, { text: 'after lunch', isCorrect: false }], chineseHint: '他们让窗户开着。' },
    { sentenceParts: ['This weather makes me ', '.'] as const, choices: [{ text: 'sleepy', isCorrect: true }, { text: 'Mimi', isCorrect: false }, { text: 'on Friday', isCorrect: false }], chineseHint: '这种天气让我犯困。' },
    { sentenceParts: ['I found the bag ', '.'] as const, choices: [{ text: 'heavy', isCorrect: true }, { text: 'monitor', isCorrect: false }, { text: 'under the desk', isCorrect: false }], chineseHint: '我觉得这个包很重。' },
    { sentenceParts: ['The music made the room ', '.'] as const, choices: [{ text: 'lively', isCorrect: true }, { text: 'Peter', isCorrect: false }, { text: 'in May', isCorrect: false }], chineseHint: '音乐让整个房间气氛活跃。' },
];

export const SVOCAdjectiveContent: React.FC<SVOCAdjectiveContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [activeExample, setActiveExample] = useState<string | null>(null);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

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
                <SectionTitle>💡 先抓一个点</SectionTitle>
                <p>最后那个形容词，不是在说主语，是在说宾语现在怎么样。</p>
            </WhyLearnSection>

            <QuickGrid>
                <QuickCard>
                    <QuickCardTitle themeColor={themeColor}>Object</QuickCardTitle>
                    <QuickCardHint>宾语</QuickCardHint>
                    <QuickCardExample>me / the wall / the movie</QuickCardExample>
                </QuickCard>
                <QuickCard>
                    <QuickCardTitle themeColor={themeColor}>Adjective Complement</QuickCardTitle>
                    <QuickCardHint>状态 / 感觉</QuickCardHint>
                    <QuickCardExample>sad / white / boring</QuickCardExample>
                </QuickCard>
            </QuickGrid>

            <CompareCard>
                <CompareSentence>The joke made him happy.</CompareSentence>
                <CompareHint>him = happy</CompareHint>
            </CompareCard>

            <MultipleChoicePractice
                themeColor={themeColor}
                practiceData={completeMiniPracticeData1}
                title="⚡ Fast Check 1"
                subtitle="先直接补全形容词宾补"
                completionTitle="👏 Nice!"
                completionMessage="这一组完成了。下面还有一组补全题，已经在页面里。"
                nextButtonText="继续"
                hideCompletionButton
            />

            <MultipleChoicePractice
                themeColor={themeColor}
                practiceData={completeMiniPracticeData2}
                title="⚡ Fast Check 2"
                subtitle="再做一组补全题"
                completionTitle="👏 Great!"
                completionMessage="下面看 1 个例子，然后直接做正式练习。"
                nextButtonText="继续"
                hideCompletionButton
            />

            <ExamplesSection>
                <SectionTitle>📝 One Example</SectionTitle>
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
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={() => {}}
                practiceData={practiceData.basic}
                title="🎯 Practice: Build a sentence"
                subtitle="练习：用下面的词组成句子"
                completionTitle="🎉 Congratulations!"
                completionMessage="组句练习完成。下面还有新的填空练习。"
                nextButtonText="继续"
                hideCompletionButton
            />

            <FillInTheBlankPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={fillPracticeData}
                title="🎯 Practice: Fill in the complement"
                subtitle="练习：选择合适的形容词宾补"
                completionTitle="🎉 Congratulations!"
                completionMessage="宾补练习全部完成了。点下面回到基础句型结构。"
                nextButtonText="返回基础句型结构 →"
            />
        </LessonContainer>
    );
};
