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
    ExamplesSection,
    ExampleItem,
    ExampleHeader,
    SpeakButton,
    ExampleEnglish,
    ExampleChinese,
} from '../Structures/SVOContent.styles';
import { MultipleChoicePractice } from '../../practice/MultipleChoicePractice';
import styled from 'styled-components';

interface ApplyUsageContentProps {
    onBack: () => void;
    themeColor: string;
    onCompleteAll: () => void;
}

const UsageType = styled.h3`
    font-size: 1.2em;
    font-weight: bold;
    color: #2d3748;
    margin-top: 20px;
    margin-bottom: 10px;
`;

const practiceData = [
    { question: "You need to fill out this ______ form.", choices: [{text: "application", isCorrect: true}, {text: "apply", isCorrect: false}, {text: "applicant", isCorrect: false}], chineseHint: "你需要填写这张申请表。" },
    { question: "She is going to ______ for a new job.", choices: [{text: "apply", isCorrect: true}, {text: "application", isCorrect: false}, {text: "applied", isCorrect: false}], chineseHint: "她打算申请一份新工作。" },
    { question: "There were over 100 ______s for the position.", choices: [{text: "applicant", isCorrect: true}, {text: "application", isCorrect: false}, {text: "apply", isCorrect: false}], chineseHint: "这个职位有超过100名申请人。" },
    { question: "The practical ______ of this theory is important.", choices: [{text: "application", isCorrect: true}, {text: "apply", isCorrect: false}, {text: "applicant", isCorrect: false}], chineseHint: "这个理论的实际应用很重要。" },
    { question: "This rule doesn't ______ to your situation.", choices: [{text: "apply", isCorrect: true}, {text: "applied", isCorrect: false}, {text: "application", isCorrect: false}], chineseHint: "这条规则不适用于你的情况。" },
    { question: "This is a course in ______ mathematics.", choices: [{text: "applied", isCorrect: true}, {text: "apply", isCorrect: false}, {text: "application", isCorrect: false}], chineseHint: "这是一门应用数学课程。" },
    { question: "You need to ______ the cream to the affected area twice a day.", choices: [{text: "apply", isCorrect: true}, {text: "application", isCorrect: false}, {text: "applied", isCorrect: false}], chineseHint: "你需要每天两次将药膏涂抹在患处。" },
    { question: "He decided to ______ to three universities.", choices: [{text: "apply", isCorrect: true}, {text: "applicant", isCorrect: false}, {text: "application", isCorrect: false}], chineseHint: "他决定申请三所大学。" },
];

export const ApplyUsageContent: React.FC<ApplyUsageContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
        if ('speechSynthesis' in window) {
            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
        return () => { if ('speechSynthesis' in window) window.speechSynthesis.onvoiceschanged = null; };
    }, []);

    const handleSpeak = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            const usVoice = voices.find(voice => voice.lang === 'en-US');
            utterance.voice = usVoice || voices.find(voice => voice.lang.startsWith('en-')) || null;
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <LessonContainer>
            <BackButton onClick={onBack} themeColor={themeColor}>← Back to List</BackButton>
            <LessonTitle>📖 'apply' 的用法</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>"apply" 及其相关词形 (application, applicant, applied) 是日常生活和工作中的高频词。它们涉及申请工作/学校、涂抹药膏、应用理论等多种场景。准确使用这些词形是英语水平的体现。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. apply (动词)</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    <strong>- apply for sth:</strong> 申请（工作、职位、护照等）<br/>
                    <strong>- apply to sb/sth:</strong> 适用于；向...申请（学校、机构）<br/>
                    <strong>- apply sth to sth:</strong> 涂抹；应用
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>She plans to <strong>apply for</strong> a new job.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('She plans to apply for a new job.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>她计划申请一份新工作。</ExampleChinese>
                </ExampleItem>
                 <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>You should <strong>apply</strong> this cream to the skin.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('You should apply this cream to the skin.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>你应该把这个药膏涂在皮肤上。</ExampleChinese>
                </ExampleItem>

                <UsageType>2. application (名词)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    <strong>- (可数) 申请；申请书:</strong> a written request for something.<br/>
                    <strong>- (不可数) 应用；运用:</strong> the practical use of something.
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Please fill out this <strong>application</strong> form.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Please fill out this application form.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>请填写这张申请表。</ExampleChinese>
                </ExampleItem>
                 <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>The <strong>application</strong> of this technology is widespread.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('The application of this technology is widespread.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>这项技术的应用非常广泛。</ExampleChinese>
                </ExampleItem>

                <UsageType>3. applicant (名词)</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    指“申请人”。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>There were over 200 <strong>applicants</strong> for the job.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('There were over 200 applicants for the job.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>有超过200人申请这份工作。</ExampleChinese>
                </ExampleItem>
                
                <UsageType>4. applied (形容词)</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    指“应用的；实用的”，通常用于学科领域。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>He is studying <strong>applied</strong> physics.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('He is studying applied physics.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>他正在学习应用物理学。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <MultipleChoicePractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习: 'apply' 家族"
                subtitle="选择最合适的单词形式"
                completionTitle="🎉 Application Approved!"
                completionMessage="你已经掌握了 'apply' 的相关用法！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};