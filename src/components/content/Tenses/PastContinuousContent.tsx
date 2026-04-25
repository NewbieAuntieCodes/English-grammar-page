/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { LessonContainer, BackButton, LessonTitle, WhyLearnSection, SectionTitle, FormulaSection, FormulaTitle, FormulaParts, PlusSign, SVOFormulaPart, ExamplesSection, ExampleItem, ExampleHeader, SpeakButton, ExampleEnglish, ExampleChinese } from '../Structures/SVOContent.styles';
import { SpellingRulesSection, SpellingTable, TableHeader, TableRow, TableCell, StorySelector, StoryButton } from './PastTenseContent.styles';
import { pastContinuousStories } from '../../../data/pastContinuousStories';
import { StoryPractice } from '../../practice/StoryPractice';

interface PastContinuousContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

export const PastContinuousContent: React.FC<PastContinuousContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [storyIndex, setStoryIndex] = useState(0);
    
    useEffect(() => {
        const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
        if ('speechSynthesis' in window) {
            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
        return () => {
            if ('speechSynthesis' in window) window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    const handleStoryComplete = () => {
        if (storyIndex < pastContinuousStories.length - 1) {
            setStoryIndex(prev => prev + 1);
        } else {
            onCompleteAll();
        }
    };

    const handleExplainPart = (part: 'be' | 'verb-ing') => {
        const explanations = {
            'be': "be 动词的过去式: was / were。\n\n- I/He/She/It was\n- We/You/They were",
            'verb-ing': "现在分词 (Verb-ing): 和现在进行时一样，在动词原形后加上 -ing。"
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
        }
    };
    
    const isLastStory = storyIndex >= pastContinuousStories.length - 1;

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Tenses List</BackButton>
            <LessonTitle>⏳ 过去进行时 (Past Continuous)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>过去进行时用来描述【过去某个特定时间点正在发生】的动作。它经常用来设置故事背景，或描述一个被另一个动作打断的“背景动作”。</p>
            </WhyLearnSection>

            <FormulaSection themeColor={themeColor}>
                <FormulaTitle themeColor={themeColor}>过去进行时结构</FormulaTitle>
                <FormulaParts>
                     <SVOFormulaPart themeColor={themeColor}>
                        <div className="svo-part-english">Subject</div>
                        <div className="svo-part-chinese">主语</div>
                    </SVOFormulaPart>
                    <PlusSign themeColor={themeColor}>+</PlusSign>
                    <SVOFormulaPart themeColor={themeColor} onClick={() => handleExplainPart('be')}>
                        <div className="svo-part-english">was / were</div>
                        <div className="svo-part-chinese">be 动词过去式</div>
                    </SVOFormulaPart>
                    <PlusSign themeColor={themeColor}>+</PlusSign>
                    <SVOFormulaPart themeColor={themeColor} onClick={() => handleExplainPart('verb-ing')}>
                        <div className="svo-part-english">Verb-ing</div>
                        <div className="svo-part-chinese">动词-ing形式</div>
                    </SVOFormulaPart>
                </FormulaParts>
            </FormulaSection>

            <SpellingRulesSection>
                <SectionTitle>✍️ 动词-ing 拼写变化</SectionTitle>
                 <SpellingTable>
                    <TableRow>
                        <TableHeader themeColor={themeColor}>规则</TableHeader>
                        <TableHeader themeColor={themeColor}>例子</TableHeader>
                        <TableHeader themeColor={themeColor}>说明</TableHeader>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>直接 + ing</strong></TableCell>
                        <TableCell>go → going<br/>read → reading</TableCell>
                        <TableCell>大多数动词</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>以 e 结尾, 去 e, + ing</strong></TableCell>
                        <TableCell>come → coming<br/>write → writing</TableCell>
                        <TableCell>动词以不发音的 e 结尾</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>重读闭音节, 双写末尾辅音, + ing</strong></TableCell>
                        <TableCell>run → running<br/>sit → sitting</TableCell>
                        <TableCell>末尾为“辅音+元音+辅音”</TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell><strong>以 ie 结尾, 变 ie 为 y, + ing</strong></TableCell>
                        <TableCell>lie → lying<br/>die → dying</TableCell>
                        <TableCell>这是一个特殊的规则</TableCell>
                    </TableRow>
                </SpellingTable>
            </SpellingRulesSection>

            <ExamplesSection>
                <SectionTitle>📝 例子 (Examples)</SectionTitle>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I <strong>was watching</strong> TV when you called.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I was watching TV when you called.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>你打电话的时候，我正在看电视。（一个动作“看电视”被另一个动作“打电话”打断）</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Yesterday at 7 PM, we <strong>were eating</strong> dinner.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Yesterday at 7 PM, we were eating dinner.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>昨天晚上7点，我们正在吃晚饭。（过去某个具体时间点正在做的事）</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>While he <strong>was studying</strong>, his sister <strong>was listening</strong> to music.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('While he was studying, his sister was listening to music.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>当他学习的时候，他的妹妹正在听音乐。（过去同时进行的两个动作）</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <StorySelector>
                {pastContinuousStories.map((story, index) => (
                    <StoryButton 
                        key={story.title} 
                        isActive={storyIndex === index}
                        onClick={() => setStoryIndex(index)}
                        themeColor={themeColor}
                    >
                        {story.title}
                    </StoryButton>
                ))}
            </StorySelector>

            <StoryPractice
                themeColor={themeColor}
                onCompleteAll={handleStoryComplete}
                storyData={pastContinuousStories[storyIndex].storyData}
                title={`🎯 练习：${pastContinuousStories[storyIndex].title}`}
                subtitle="选择正确的过去进行时形式"
                completionTitle="🎉 Story Complete!"
                completionMessage="你已经完成了这个故事！"
                nextButtonText={isLastStory ? "学习将来时 →" : "下一个故事 →"}
            />
        </LessonContainer>
    );
};