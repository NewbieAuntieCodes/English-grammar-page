/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import {
    PracticeSection,
    PracticeHeader,
    PracticeTitle,
    PracticeSubtitle,
    StoryPanel,
    ChoicesContainer,
    ChoiceButton,
    ProgressContainer,
    ProgressBarOuter,
    ProgressBarInner,
    CompletionContainer,
    CompletionTitle,
    CompletionMessage,
    CorrectSticker,
    NextChapterButton,
} from './StoryPractice.styles';
import { ChineseHint } from './SentenceBuilderPractice.styles';

interface Choice {
    text: string;
    isCorrect: boolean;
}

interface FillPracticeData {
    sentenceParts: readonly [string, string];
    choices: Choice[];
    chineseHint: string;
}

interface FillInTheBlankPracticeProps {
    themeColor: string;
    onCompleteAll: () => void;
    practiceData: FillPracticeData[];
    title: string;
    subtitle: string;
    completionTitle: string;
    completionMessage: string;
    nextButtonText: string;
}

const BlankPlaceholder = styled.span`
    display: inline-block;
    background: #e9ecef;
    color: #adb5bd;
    padding: 2px 15px;
    border-radius: 6px;
    font-style: italic;
    font-weight: bold;
    user-select: none;
`;

const CorrectAnswerSpan = styled(BlankPlaceholder)`
    background: rgba(46, 204, 113, 0.1);
    color: #27ae60;
    font-style: normal;
`;

export const FillInTheBlankPractice: React.FC<FillInTheBlankPracticeProps> = ({
    themeColor,
    onCompleteAll,
    practiceData,
    title,
    subtitle,
    completionTitle,
    completionMessage,
    nextButtonText,
}) => {
    const [stepIndex, setStepIndex] = useState(0);
    const [shakingButtonIndex, setShakingButtonIndex] = useState<number | null>(null);
    const [showCorrectSticker, setShowCorrectSticker] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);

    useEffect(() => {
        setStepIndex(0);
        setIsAnswered(false);
    }, [practiceData]);

    const currentStep = practiceData[stepIndex];
    const isCompleted = stepIndex >= practiceData.length;

    const shuffledChoices = useMemo(() => {
        if (!currentStep) return [];
        return [...currentStep.choices].sort(() => Math.random() - 0.5);
    }, [currentStep]);

    const handleChoice = (choice: Choice, index: number) => {
        if (isAnswered) return;

        if (choice.isCorrect) {
            setIsAnswered(true);
            setShowCorrectSticker(true);

            setTimeout(() => {
                setStepIndex(prev => prev + 1);
                setIsAnswered(false);
            }, 300);

            setTimeout(() => {
                setShowCorrectSticker(false);
            }, 2000);
        } else {
            setShakingButtonIndex(index);
            setTimeout(() => setShakingButtonIndex(null), 600);
        }
    };
    
    const progress = isCompleted ? 100 : (stepIndex / practiceData.length) * 100;

    return (
        <PracticeSection themeColor={themeColor}>
            {showCorrectSticker && <CorrectSticker themeColor={themeColor}>✔️ Correct!</CorrectSticker>}
            {isCompleted ? (
                <CompletionContainer>
                    <CompletionTitle>{completionTitle}</CompletionTitle>
                    <CompletionMessage>{completionMessage}</CompletionMessage>
                    <NextChapterButton onClick={onCompleteAll} themeColor={themeColor}>
                        {nextButtonText}
                    </NextChapterButton>
                </CompletionContainer>
            ) : (
                currentStep && (
                    <>
                        <div>
                            <PracticeHeader>
                                <PracticeTitle themeColor={themeColor}>{title}</PracticeTitle>
                                <PracticeSubtitle>{subtitle}</PracticeSubtitle>
                            </PracticeHeader>
                            
                            <StoryPanel>
                                {currentStep.sentenceParts[0]}
                                {isAnswered ? 
                                    <CorrectAnswerSpan>{currentStep.choices.find(c => c.isCorrect)?.text}</CorrectAnswerSpan> 
                                    : <BlankPlaceholder>[...]</BlankPlaceholder>
                                }
                                {currentStep.sentenceParts[1]}
                            </StoryPanel>

                            <ChineseHint>{currentStep.chineseHint}</ChineseHint>

                            <ChoicesContainer>
                                {shuffledChoices.map((choice, index) => (
                                    <ChoiceButton 
                                        key={choice.text}
                                        themeColor={themeColor}
                                        onClick={() => handleChoice(choice, index)}
                                        isShaking={shakingButtonIndex === index}
                                        disabled={isAnswered}
                                    >
                                        {choice.text}
                                    </ChoiceButton>
                                ))}
                            </ChoicesContainer>
                        </div>

                        <ProgressContainer>
                            <ProgressBarOuter>
                                <ProgressBarInner themeColor={themeColor} progress={progress} />
                            </ProgressBarOuter>
                        </ProgressContainer>
                    </>
                )
            )}
        </PracticeSection>
    );
};