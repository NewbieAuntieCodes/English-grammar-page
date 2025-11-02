/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useMemo, useRef } from 'react';
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
    NavigationDots,
    NavigationDot,
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

    const handleNextPractice = () => {
        if (stepIndex < practiceData.length) {
            setStepIndex(prev => prev + 1);
        }
    };

    const handlePrevPractice = () => {
        if (stepIndex > 0) {
            setStepIndex(prev => prev - 1);
        }
    };

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
                handleNextPractice();
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

    const touchStartRef = useRef<number | null>(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        touchStartRef.current = e.targetTouches[0].clientX;
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartRef.current === null) {
            return;
        }

        const touchEnd = e.changedTouches[0].clientX;
        const distance = touchStartRef.current - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            handleNextPractice();
        } else if (isRightSwipe) {
            handlePrevPractice();
        }

        touchStartRef.current = null;
    };

    return (
        <PracticeSection themeColor={themeColor} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
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

                        <div>
                            <NavigationDots>
                                {practiceData.map((_, index) => (
                                    <NavigationDot
                                        key={index}
                                        isActive={index === stepIndex}
                                        themeColor={themeColor}
                                        onClick={() => !isAnswered && setStepIndex(index)}
                                        aria-label={`Go to question ${index + 1}`}
                                    />
                                ))}
                            </NavigationDots>
                            <ProgressContainer>
                                <ProgressBarOuter>
                                    <ProgressBarInner themeColor={themeColor} progress={progress} />
                                </ProgressBarOuter>
                            </ProgressContainer>
                        </div>
                    </>
                )
            )}
        </PracticeSection>
    );
};