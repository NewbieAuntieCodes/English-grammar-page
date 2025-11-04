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
import { SentenceBuilderPractice } from '../../practice/SentenceBuilderPractice';
import styled from 'styled-components';

interface DoMoreHarmGoodContentProps {
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
    { words: [{ en: 'The new law', cn: '这项新法律' }, { en: 'will do more harm', cn: '将弊大于' }, { en: 'than good', cn: '利' }], correct: ['The new law', 'will do more harm', 'than good'], chinese: '这项新法律将弊大于利。' },
    { words: [{ en: 'His advice', cn: '他的建议' }, { en: 'did more harm', cn: '弊大于' }, { en: 'than good', cn: '利' }], correct: ['His advice', 'did more harm', 'than good'], chinese: '他的建议弊大于利。' },
    { words: [{ en: 'This project will', cn: '这个项目将' }, { en: 'do more good', cn: '利大于' }, { en: 'than harm', cn: '弊' }, { en: 'for the community', cn: '对社区而言' }], correct: ['This project will', 'do more good', 'than harm', 'for the community'], chinese: '这个项目对社区而言将利大于弊。' },
    { words: [{ en: 'Eating too much', cn: '吃太多' }, { en: 'fast food', cn: '快餐' }, { en: 'does more harm', cn: '弊大于' }, { en: 'than good', cn: '利' }], correct: ['Eating too much', 'fast food', 'does more harm', 'than good'], chinese: '吃太多快餐弊大于利。' },
    { words: [{ en: 'Volunteering can', cn: '做志愿者可以' }, { en: 'do more good', cn: '利大于' }, { en: 'than harm', cn: '弊' }, { en: 'for your career', cn: '对你的职业生涯' }], correct: ['Volunteering can', 'do more good', 'than harm', 'for your career'], chinese: '做志愿者对你的职业生涯利大于弊。' },
    { words: [{ en: 'Micromanaging', cn: '微观管理' }, { en: 'your team', cn: '你的团队' }, { en: 'often does more harm', cn: '通常弊大于' }, { en: 'than good', cn: '利' }], correct: ['Micromanaging', 'your team', 'often does more harm', 'than good'], chinese: '微观管理你的团队通常弊大于利。' },
    { words: [{ en: 'This new technology', cn: '这项新技术' }, { en: 'will ultimately', cn: '最终将' }, { en: 'do more good', cn: '利大于' }, { en: 'than harm', cn: '弊' }], correct: ['This new technology', 'will ultimately', 'do more good', 'than harm'], chinese: '这项新技术最终将利大于弊。' },
    { words: [{ en: 'Ignoring the problem', cn: '忽视问题' }, { en: 'will do more harm', cn: '将弊大于' }, { en: 'than good', cn: '利' }], correct: ['Ignoring the problem', 'will do more harm', 'than good'], chinese: '忽视问题将弊大于利。' },
];

export const DoMoreHarmGoodContent: React.FC<DoMoreHarmGoodContentProps> = ({ onBack, themeColor, onCompleteAll }) => {
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
            <LessonTitle>📖 Phrases: 'do more harm than good' & 'do more good than harm'</LessonTitle>

            <WhyLearnSection themeColor={themeColor}>
                <SectionTitle>💡 为什么学这个？</SectionTitle>
                <p>这两个对立的短语在评估一个行为的后果时非常有用。它们可以帮你表达某件事最终是有益的（利大于弊）还是有害的（弊大于利），体现了对情况更细致的理解。</p>
            </WhyLearnSection>

            <ExamplesSection>
                <SectionTitle>📝 主要用法</SectionTitle>

                <UsageType>1. do more harm than good (弊大于利)</UsageType>
                <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    当一个行为的负面影响大于其正面影响时使用。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Giving children too much screen time can <strong>do more harm than good</strong>.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Giving children too much screen time can do more harm than good.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>给孩子太多看屏幕的时间可能弊大于利。</ExampleChinese>
                </ExampleItem>

                <UsageType>2. do more good than harm (利大于弊)</UsageType>
                 <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    当一个行为的正面影响超过其负面影响时使用。
                </p>
                <ExampleItem themeColor={themeColor}>
                    <ExampleHeader>
                        <ExampleEnglish>Regular exercise will <strong>do more good than harm</strong> in the long run.</ExampleEnglish>
                        <SpeakButton onClick={(e) => { e.stopPropagation(); handleSpeak('Regular exercise will do more good than harm in the long run.'); }}>🔊</SpeakButton>
                    </ExampleHeader>
                    <ExampleChinese>从长远来看，定期锻炼会利大于弊。</ExampleChinese>
                </ExampleItem>
            </ExamplesSection>
            
            <SentenceBuilderPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                title="🎯 练习: 弊大于利 vs. 利大于弊"
                subtitle="用下面的词组成句子"
                completionTitle="🎉 Excellent!"
                completionMessage="你已经掌握了这两个短语的用法！"
                nextButtonText="返回列表"
            />
        </LessonContainer>
    );
};