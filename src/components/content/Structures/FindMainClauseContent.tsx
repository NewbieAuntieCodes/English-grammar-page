/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    LessonContainer,
    BackButton,
    LessonTitle,
    WhyLearnSection,
    SectionTitle,
    ExamplesSection,
    ExampleItem,
    ExampleHeader,
    SpeakButton,
    ExampleEnglish,
    ExampleChinese,
} from './SVOContent.styles';
import { LessonList, LessonItem, LessonTitleChinese, LessonTitleEnglish } from './StructuresContent.styles';
import { FindMainClausePractice } from '../../practice/FindMainClausePractice';
import type { PracticeData as MainClausePracticeData } from '../../practice/FindMainClausePractice';

interface FindMainClauseContentProps {
    onBack: () => void;
    themeColor: string;
}

type PracticeView = 'menu' | 'object' | 'adverbial' | 'attributive' | 'subject';

// --- Practice Data Sets ---

const objectClauseData: MainClausePracticeData[] = [
    { sentence: 'I believe that he will succeed.', targetWords: ['I', 'believe'], prompt: '主句', chinese: '我相信他会成功。' },
    { sentence: 'She asked if I was a student.', targetWords: ['She', 'asked'], prompt: '主句', chinese: '她问我是否是学生。' },
    { sentence: 'We don\'t know where he lives.', targetWords: ['We', 'don\'t', 'know'], prompt: '主句', chinese: '我们不知道他住在哪里。' },
    { sentence: 'Tell me what you want.', targetWords: ['Tell', 'me'], prompt: '主句', chinese: '告诉我你想要什么。' },
    { sentence: 'He explained why he was late.', targetWords: ['He', 'explained'], prompt: '主句', chinese: '他解释了为什么他迟到了。' },
    { sentence: 'I wonder who took my book.', targetWords: ['I', 'wonder'], prompt: '主句', chinese: '我想知道谁拿了我的书。' },
    { sentence: 'They forgot that they had a meeting.', targetWords: ['They', 'forgot'], prompt: '主句', chinese: '他们忘记了他们有个会议。' },
    { sentence: 'I can\'t remember how I got here.', targetWords: ['I', 'can\'t', 'remember'], prompt: '主句', chinese: '我不记得我是怎么到这里的。' },
];

const adverbialClauseData: MainClausePracticeData[] = [
    { sentence: 'When you are ready, we will leave.', targetWords: ['we', 'will', 'leave'], prompt: '主句', chinese: '你准备好了我们就出发。' },
    { sentence: 'He stayed home because he was sick.', targetWords: ['He', 'stayed', 'home'], prompt: '主句', chinese: '他因为生病待在家里。' },
    { sentence: 'Although she was tired, she finished her work.', targetWords: ['she', 'finished', 'her', 'work'], prompt: '主句', chinese: '虽然她很累，但她完成了工作。' },
    { sentence: 'You can go wherever you want.', targetWords: ['You', 'can', 'go'], prompt: '主句', chinese: '你可以去任何你想去的地方。' },
    { sentence: 'If it rains, the game will be canceled.', targetWords: ['the', 'game', 'will', 'be', 'canceled'], prompt: '主句', chinese: '如果下雨，比赛将被取消。' },
    { sentence: 'She sang while she was cooking.', targetWords: ['She', 'sang'], prompt: '主句', chinese: '她边做饭边唱歌。' },
    { sentence: 'I will wait until you come back.', targetWords: ['I', 'will', 'wait'], prompt: '主句', chinese: '我会等到你回来。' },
    { sentence: 'He will not succeed unless he works harder.', targetWords: ['He', 'will', 'not', 'succeed'], prompt: '主句', chinese: '除非他更努力地工作，否则他不会成功。' },
];

const attributiveClauseData: MainClausePracticeData[] = [
    { sentence: 'The boy who won the race is my cousin.', targetWords: ['The', 'boy', 'is', 'my', 'cousin'], prompt: '主句', chinese: '赢得比赛的那个男孩是我的表弟。' },
    { sentence: 'I met a woman who works as a chef.', targetWords: ['I', 'met', 'a', 'woman'], prompt: '主句', chinese: '我遇到一位当厨师的女士。' },
    { sentence: 'The book that is on the table is mine.', targetWords: ['The', 'book', 'is', 'mine'], prompt: '主句', chinese: '桌上的那本书是我的。' },
    { sentence: 'She bought a dress which was very expensive.', targetWords: ['She', 'bought', 'a', 'dress'], prompt: '主句', chinese: '她买了一件很贵的连衣裙。' },
    { sentence: 'This is the park where we used to play.', targetWords: ['This', 'is', 'the', 'park'], prompt: '主句', chinese: '这是我们以前玩耍的公园。' },
    { sentence: 'I remember the year when I graduated.', targetWords: ['I', 'remember', 'the', 'year'], prompt: '主句', chinese: '我记得我毕业的那一年。' },
    { sentence: 'That is the man whose car was stolen.', targetWords: ['That', 'is', 'the', 'man'], prompt: '主句', chinese: '那就是车被偷的那个男人。' },
    { sentence: 'I have a friend whose father is a pilot.', targetWords: ['I', 'have', 'a', 'friend'], prompt: '主句', chinese: '我有一个朋友，他的父亲是飞行员。' },
];

const subjectClauseData: MainClausePracticeData[] = [
    { sentence: 'It is true that the earth is round.', targetWords: ['It', 'is', 'true'], prompt: '主句', chinese: '地球是圆的是真的。' },
    { sentence: 'It is a pity that you missed the party.', targetWords: ['It', 'is', 'a', 'pity'], prompt: '主句', chinese: '你错过了派对，真遗憾。' },
    { sentence: 'It is uncertain whether he will come.', targetWords: ['It', 'is', 'uncertain'], prompt: '主句', chinese: '他不确定是否会来。' },
    { sentence: 'It doesn\'t matter what you wear.', targetWords: ['It', 'doesn\'t', 'matter'], prompt: '主句', chinese: '你穿什么不重要。' },
    { sentence: 'It is well known that he is a famous writer.', targetWords: ['It', 'is', 'well', 'known'], prompt: '主句', chinese: '众所周知，他是一位著名作家。' },
    { sentence: 'It remains a mystery why she left.', targetWords: ['It', 'remains', 'a', 'mystery'], prompt: '主句', chinese: '她为什么离开仍然是个谜。' },
    { sentence: 'It is important that we finish the work on time.', targetWords: ['It', 'is', 'important'], prompt: '主句', chinese: '我们按时完成工作很重要。' },
    { sentence: 'It was surprising how he solved the problem.', targetWords: ['It', 'was', 'surprising'], prompt: '主句', chinese: '他如何解决这个问题令人惊讶。' },
];


export const FindMainClauseContent: React.FC<FindMainClauseContentProps> = ({ onBack, themeColor }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [view, setView] = useState<PracticeView>('menu');

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
    
    const practiceInfo = useMemo(() => {
        switch (view) {
            case 'object': return { data: objectClauseData, title: '找主句练习 (宾语从句)' };
            case 'adverbial': return { data: adverbialClauseData, title: '找主句练习 (状语从句)' };
            case 'attributive': return { data: attributiveClauseData, title: '找主句练习 (定语从句)' };
            case 'subject': return { data: subjectClauseData, title: '找主句练习 (主语从句)' };
            default: return null;
        }
    }, [view]);

    return (
        <LessonContainer>
            <BackButton onClick={view === 'menu' ? onBack : () => setView('menu')} themeColor={themeColor}>
                {view === 'menu' ? '← Back to Lessons' : '← Back to Practice List'}
            </BackButton>

            {view === 'menu' ? (
                <>
                    <LessonTitle>🎯 找主句练习</LessonTitle>

                    <WhyLearnSection themeColor={themeColor}>
                        <SectionTitle>💡 为什么要找主句？</SectionTitle>
                        <p>在复杂的长句中，快速找到主句是理解句子核心意思的关键。主句是一个可以独立存在的完整句子，它表达了最主要的信息。学会识别主句能让你在阅读和分析句子时事半功倍！</p>
                    </WhyLearnSection>

                    <ExamplesSection>
                        <SectionTitle>📝 例子 (Examples)</SectionTitle>
                        <ExampleItem themeColor={themeColor}>
                            <ExampleHeader>
                                <ExampleEnglish>Although it was raining, <strong>we played outside</strong>.</ExampleEnglish>
                                <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Although it was raining, we played outside.'); }}>🔊</SpeakButton>
                            </ExampleHeader>
                            <ExampleChinese>尽管在下雨，我们还是在外面玩了。(主句是 "we played outside")</ExampleChinese>
                        </ExampleItem>
                        <ExampleItem themeColor={themeColor}>
                            <ExampleHeader>
                                <ExampleEnglish><strong>The boy</strong> who is wearing a blue shirt <strong>is my brother</strong>.</ExampleEnglish>
                                <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The boy who is wearing a blue shirt is my brother.'); }}>🔊</SpeakButton>
                            </ExampleHeader>
                            <ExampleChinese>那个穿着蓝色衬衫的男孩是我的弟弟。(主句是 "The boy is my brother")</ExampleChinese>
                        </ExampleItem>
                    </ExamplesSection>
                    
                    <SectionTitle>选择练习类型</SectionTitle>
                    <LessonList>
                        <LessonItem borderColor={themeColor} onClick={() => setView('object')}>
                            <LessonTitleChinese>宾语从句</LessonTitleChinese>
                            <LessonTitleEnglish>Object Clauses</LessonTitleEnglish>
                        </LessonItem>
                        <LessonItem borderColor={themeColor} onClick={() => setView('adverbial')}>
                            <LessonTitleChinese>状语从句</LessonTitleChinese>
                            <LessonTitleEnglish>Adverbial Clauses</LessonTitleEnglish>
                        </LessonItem>
                        <LessonItem borderColor={themeColor} onClick={() => setView('attributive')}>
                            <LessonTitleChinese>定语从句</LessonTitleChinese>
                            <LessonTitleEnglish>Attributive Clauses</LessonTitleEnglish>
                        </LessonItem>
                        <LessonItem borderColor={themeColor} onClick={() => setView('subject')}>
                            <LessonTitleChinese>主语从句</LessonTitleChinese>
                            <LessonTitleEnglish>Subject Clauses</LessonTitleEnglish>
                        </LessonItem>
                    </LessonList>
                </>
            ) : (
                 practiceInfo && (
                    <FindMainClausePractice
                        onCompleteAll={() => setView('menu')}
                        themeColor={themeColor}
                        practiceData={practiceInfo.data}
                        title={practiceInfo.title}
                    />
                )
            )}
        </LessonContainer>
    );
};
