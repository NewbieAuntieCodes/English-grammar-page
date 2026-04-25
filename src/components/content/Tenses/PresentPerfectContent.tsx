/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LessonContainer, BackButton, LessonTitle, WhyLearnSection, SectionTitle, FormulaSection, FormulaTitle, FormulaParts, PlusSign, SVOFormulaPart, ExamplesSection, ExampleItem, ExampleHeader, SpeakButton, ExampleEnglish, ExampleChinese } from '../Structures/SVOContent.styles';
import { SpellingRulesSection, SpellingTable, TableHeader, TableRow, TableCell, StorySelector, StoryButton } from './PastTenseContent.styles';
import { presentPerfectStories, presentPerfectQuestionPractice } from '../../../data/presentPerfectStories';
import { StoryPractice } from '../../practice/StoryPractice';
import { FillInTheBlankPractice } from '../../practice/FillInTheBlankPractice';

interface PresentPerfectContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const QuestionFormulaContainer = styled.div`
    text-align: center;
    font-size: 1.1em;
    font-weight: 500;
    color: #2d3748;
    background: #fff;
    padding: 20px;
    border-radius: 12px;
    margin-top: 15px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

const Highlight = styled.span<{ themeColor: string }>`
    color: ${props => props.themeColor};
    font-weight: bold;
    text-decoration: underline;
`;

export const PresentPerfectContent: React.FC<PresentPerfectContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [storyIndex, setStoryIndex] = useState(0);
    const [showAdvancedPractice, setShowAdvancedPractice] = useState(false);
    
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
        if (storyIndex < presentPerfectStories.length - 1) {
            setStoryIndex(prev => prev + 1);
        } else {
            // 所有故事练习完成后，不直接退出，而是显示进阶疑问句练习
            setShowAdvancedPractice(true);
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    };

    const handleExplainPart = (part: 'have-has' | 'past-participle' | 'question') => {
        const explanations = {
            'have-has': "助动词 have / has: 根据主语人称选择。\n\n- I/We/You/They 用 have\n- He/She/It 用 has",
            'past-participle': "过去分词 (Past Participle): 动词的第三种形式 (Done)。\n\n规则动词加 -ed，不规则动词需要特殊记忆 (如 gone, eaten, seen)。",
            'question': "疑问句变法：只需将助动词 Have 或 Has 提到【主语】之前即可！\n\n注意：动词依然保持【过去分词】形式，不要变回原形哦！"
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
    
    const isLastStory = storyIndex >= presentPerfectStories.length - 1;

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to Tenses List</BackButton>
            <LessonTitle>✅ 现在完成时 (Present Perfect Tense)</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>现在完成时连接了【过去】和【现在】。它用来表达过去发生的动作对现在产生的影响，或者从过去一直持续到现在的状态。它是英语口语中极具“高级感”且必不可少的时态！</p>
            </WhyLearnSection>

            <FormulaSection themeColor={themeColor}>
                <FormulaTitle themeColor={themeColor}>1. 陈述句结构</FormulaTitle>
                <FormulaParts>
                     <SVOFormulaPart themeColor={themeColor}>
                        <div className="svo-part-english">Subject</div>
                        <div className="svo-part-chinese">主语</div>
                    </SVOFormulaPart>
                    <PlusSign themeColor={themeColor}>+</PlusSign>
                    <SVOFormulaPart themeColor={themeColor} onClick={() => handleExplainPart('have-has')}>
                        <div className="svo-part-english">have / has</div>
                        <div className="svo-part-chinese">助动词</div>
                    </SVOFormulaPart>
                    <PlusSign themeColor={themeColor}>+</PlusSign>
                    <SVOFormulaPart themeColor={themeColor} onClick={() => handleExplainPart('past-participle')}>
                        <div className="svo-part-english">Past Participle</div>
                        <div className="svo-part-chinese">过去分词 (Done)</div>
                    </SVOFormulaPart>
                </FormulaParts>
            </FormulaSection>

            {/* 新增疑问句教学板块 */}
            <FormulaSection themeColor={themeColor} style={{ marginTop: '40px' }}>
                <FormulaTitle themeColor={themeColor}>2. 疑问句结构</FormulaTitle>
                <p style={{ color: '#4a5568', marginBottom: '10px' }}>将 <Highlight themeColor={themeColor}>Have/Has</Highlight> 提到句首即可！</p>
                <QuestionFormulaContainer onClick={() => handleExplainPart('question')}>
                    <Highlight themeColor={themeColor}>Have / Has</Highlight> + 主语 + <Highlight themeColor={themeColor}>过去分词 (PP)</Highlight> ... ?
                </QuestionFormulaContainer>
                <div style={{ marginTop: '20px', textAlign: 'left' }}>
                    <p><strong>- 回答方式：</strong></p>
                    <p>Yes, I <Highlight themeColor={themeColor}>have</Highlight>. / No, I <Highlight themeColor={themeColor}>haven't</Highlight>.</p>
                    <p>Yes, she <Highlight themeColor={themeColor}>has</Highlight>. / No, she <Highlight themeColor={themeColor}>hasn't</Highlight>.</p>
                </div>
            </FormulaSection>

            <SpellingRulesSection>
                <SectionTitle>✍️ 常用动词变形表</SectionTitle>
                 <SpellingTable>
                    <TableRow>
                        <TableHeader themeColor={themeColor}>动词原形</TableHeader>
                        <TableHeader themeColor={themeColor}>过去式</TableHeader>
                        <TableHeader themeColor={themeColor}>过去分词 (PP)</TableHeader>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>do</strong></TableCell>
                        <TableCell>did</TableCell>
                        <TableCell><strong>done</strong></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>go</strong></TableCell>
                        <TableCell>went</TableCell>
                        <TableCell><strong>gone</strong></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><strong>eat</strong></TableCell>
                        <TableCell>ate</TableCell>
                        <TableCell><strong>eaten</strong></TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell><strong>see</strong></TableCell>
                        <TableCell>saw</TableCell>
                        <TableCell><strong>seen</strong></TableCell>
                    </TableRow>
                </SpellingTable>
            </SpellingRulesSection>

            <ExamplesSection>
                <SectionTitle>📝 核心用法例子</SectionTitle>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>I <strong>have lost</strong> my keys.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('I have lost my keys.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>我丢了钥匙。(结果是现在没钥匙进门)</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish><strong>Have</strong> you <strong>seen</strong> my keys?</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Have you seen my keys?'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>你看到我的钥匙了吗？(疑问句：Have 提前)</ExampleChinese>
                </ExampleItem>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>She <strong>has been</strong> to London twice.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('She has been to London twice.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>她去过伦敦两次。(表示经历)</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <SectionTitle>📖 练习一：故事填空</SectionTitle>
            <StorySelector>
                {presentPerfectStories.map((story, index) => (
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
                storyData={presentPerfectStories[storyIndex].storyData}
                title={`🎯 练习：${presentPerfectStories[storyIndex].title}`}
                subtitle="选择正确的 have/has + 过去分词形式"
                completionTitle="🎉 Excellent!"
                completionMessage={isLastStory ? "所有故事已完成！下面进入疑问句专项挑战。" : "你已经完成了这个故事！"}
                nextButtonText={isLastStory ? "进行疑问句练习 ↓" : "下一个故事 →"}
            />

            {/* 新增疑问句专项填空练习 */}
            {showAdvancedPractice && (
                <div style={{ marginTop: '50px', borderTop: '2px dashed #e2e8f0', paddingTop: '30px' }}>
                    <SectionTitle>🚀 练习二：疑问句与综合挑战</SectionTitle>
                    <FillInTheBlankPractice
                        themeColor={themeColor}
                        onCompleteAll={onCompleteAll}
                        practiceData={presentPerfectQuestionPractice}
                        title="🎯 疑问句专项挑战"
                        subtitle="选择正确的助动词或动词形式"
                        completionTitle="🎉 完美达成!"
                        completionMessage="你已经完全掌握了现在完成时的陈述句和疑问句形式！"
                        nextButtonText="返回时态列表"
                    />
                </div>
            )}
        </LessonContainer>
    );
};
