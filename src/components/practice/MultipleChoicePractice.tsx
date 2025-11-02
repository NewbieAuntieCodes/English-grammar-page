/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef } from 'react';
import {
    PracticeSection,
    PracticeHeader,
    PracticeTitle,
    PracticeSubtitle,
    QuestionPanel,
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
    ChineseHint,
} from './MultipleChoicePractice.styles';

interface Choice {
    text: string;
    isCorrect: boolean;
}

interface PracticeData {
    question: string;
    choices: Choice[];
    chineseHint: string;
}

interface MultipleChoicePracticeProps {
    themeColor: string;
    onCompleteAll: () => void;
    practiceData: PracticeData[];
    title: string;
    subtitle: string;
    completionTitle: string;
    completionMessage: string;
    nextButtonText: string;
}

export const MultipleChoicePractice: React.FC<MultipleChoicePracticeProps> = ({
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

    const handleChoice = (choice: Choice, index: number) => {
        if (isAnswered) return;

        if (choice.isCorrect) {
            setIsAnswered(true);
            setShowCorrectSticker(true);

            setTimeout(() => {
                handleNextPractice();
                setIsAnswered(false);
            }, 1200);

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
                            
                            <QuestionPanel>
                                {currentStep.question}
                            </QuestionPanel>
                            
                            <ChineseHint>{currentStep.chineseHint}</ChineseHint>

                            <ChoicesContainer>
                                {currentStep.choices.map((choice, index) => (
                                    <ChoiceButton 
                                        key={index}
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