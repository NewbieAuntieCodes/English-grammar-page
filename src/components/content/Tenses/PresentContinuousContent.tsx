/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { LessonContainer, BackButton, LessonTitle, WhyLearnSection, SectionTitle, FormulaSection, FormulaTitle, FormulaParts, PlusSign, SVOFormulaPart, ExamplesSection, ExampleItem, ExampleHeader, SpeakButton, ExampleEnglish, ExampleChinese } from '../Structures/SVOContent.styles';
import { SpellingRulesSection, SpellingTable, TableHeader, TableRow, TableCell, StorySelector, StoryButton } from './PastTenseContent.styles';
import { presentContinuousStories } from '../../../data/presentContinuousStories';
import { StoryPractice } from '../../practice/StoryPractice';

interface PresentContinuousContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

export const PresentContinuousContent: React.FC<PresentContinuousContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
        if (storyIndex < presentContinuousStories.length - 1) {
            setStoryIndex(prev => prev + 1);
        } else {
            onCompleteAll();
        }
    };

    const handleExplainPart = (part: 'be' | 'verb-ing') => {
        const explanations = {
            'be': "be 动词: 根据主语的人称和数来变化。\n\n- I am\n- He/She/It is\n- We/You/They are",
            'verb-ing': "现在分词 (Verb-ing): 在动词原形后加上 -ing。\n\n也叫 'v-ing' 形式。注意一些拼写变化，比如 double a consonant or drop an 'e'。"
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
    
    const isLastStory = storyIndex >= presentContinuousStories.length - 1;

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Tenses List</BackButton>
            <LessonTitle>🏃 现在进行时 (Present Continuous)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>现在进行时用来描述【现在正在发生】的动作。如果你想说 “我正在吃饭” 或 “天正在下雨”，就必须用这个时态。它让你的描述充满动感！</p>
            </WhyLearnSection>

            <FormulaSection themeColor={themeColor}>
                <FormulaTitle themeColor={themeColor}>现在进行时结构</FormulaTitle>
                <FormulaParts>
                     <SVOFormulaPart themeColor={themeColor}>
                        <div className="svo-part-english">Subject</div>
                        <div className="svo-part-chinese">主语</div>
                    </SVOFormulaPart>
                    <PlusSign themeColor={themeColor}>+</PlusSign>
                    <SVOFormulaPart themeColor={themeColor} onClick={() => handleExplainPart('be')}>
                        <div className="svo-part-english">am / is / are</div>
                        <div className="svo-part-chinese">be 动词</div>
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
                        <ExampleEnglish>He <strong>is reading</strong> a book.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He is reading a book.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他正在读一本书。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>They <strong>are playing</strong> football.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('They are playing football.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他们正在踢足球。</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Look! It <strong>is raining</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Look! It is raining.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>看！天正在下雨。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <StorySelector>
                {presentContinuousStories.map((story, index) => (
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
                storyData={presentContinuousStories[storyIndex].storyData}
                title={`🎯 练习：${presentContinuousStories[storyIndex].title}`}
                subtitle="选择正确的现在进行时形式"
                completionTitle="🎉 Story Complete!"
                completionMessage="你已经完成了这个故事！"
                nextButtonText={isLastStory ? "完成时态学习" : "下一个故事 →"}
            />
        </LessonContainer>
    );
};