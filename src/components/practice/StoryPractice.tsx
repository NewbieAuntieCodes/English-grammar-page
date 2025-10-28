/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import {
    PracticeSection,
    PracticeHeader,
    PracticeTitle,
    PracticeSubtitle,
    StoryPanel,
    PromptText,
    ChoicesContainer,
    ChoiceButton,
    NavigationDots,
    NavigationDot,
    ProgressContainer,
    ProgressBarOuter,
    ProgressBarInner,
    CompletionContainer,
    CompletionTitle,
    CompletionMessage,
    CorrectSticker,
    NextChapterButton,
} from './StoryPractice.styles';

interface Choice {
    text: string;
    isCorrect: boolean;
}

interface StoryStep {
    prompt: string;
    choices: Choice[];
}

interface StoryPracticeProps {
    themeColor: string;
    onCompleteAll: () => void;
    storyData: StoryStep[];
    title: string;
    subtitle: string;
    completionTitle: string;
    completionMessage: string;

    nextButtonText: string;
}

export const StoryPractice: React.FC<StoryPracticeProps> = ({
    themeColor,
    onCompleteAll,
    storyData,
    title,
    subtitle,
    completionTitle,
    completionMessage,
    nextButtonText,
}) => {
    const [stepIndex, setStepIndex] = useState(0);
    const [completedStory, setCompletedStory] = useState('');
    const [shakingButtonIndex, setShakingButtonIndex] = useState<number | null>(null);
    const [showCorrectSticker, setShowCorrectSticker] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);

    // Reset state when the story data changes (i.e., user selects a new story)
    useEffect(() => {
        setStepIndex(0);
        setCompletedStory('');
        setIsAnswered(false);
    }, [storyData]);

    const currentStep = storyData[stepIndex];
    const isCompleted = stepIndex >= storyData.length - 1;
    
    const handleChoice = (choice: Choice, index: number) => {
        if (isAnswered) return;

        if (choice.isCorrect) {
            setIsAnswered(true);
            setShowCorrectSticker(true);

            setTimeout(() => {
                const newStoryPart = currentStep.prompt.replace('...', ' ' + choice.text);
                let updatedStory = (completedStory + ' ' + newStoryPart).trim();

                // If this is the last interactive step, add the final concluding sentence.
                if (stepIndex === storyData.length - 2) {
                    updatedStory += ' ' + storyData[storyData.length - 1].prompt;
                }

                setCompletedStory(updatedStory);
                setStepIndex(prev => prev + 1);
                setIsAnswered(false); // Reset for next question
            }, 1200);

            setTimeout(() => {
                setShowCorrectSticker(false);
            }, 2000);
        } else {
            setShakingButtonIndex(index);
            setTimeout(() => setShakingButtonIndex(null), 600);
        }
    };
    
    const progress = isCompleted ? 100 : (stepIndex / (storyData.length - 1)) * 100;

    // Rebuild completed story string when jumping to a step
    useEffect(() => {
        let story = '';
        for (let i = 0; i < stepIndex; i++) {
            const step = storyData[i];
            const correctChoice = step.choices.find(c => c.isCorrect);
            if (correctChoice) {
                story += ' ' + step.prompt.replace('...', ' ' + correctChoice.text);
            }
        }
        setCompletedStory(story.trim());
    }, [stepIndex, storyData]);

    return (
        <PracticeSection themeColor={themeColor}>
            {showCorrectSticker && <CorrectSticker themeColor={themeColor}>✔️ Correct!</CorrectSticker>}
            {isCompleted ? (
                <CompletionContainer>
                    <CompletionTitle>{completionTitle}</CompletionTitle>
                    <StoryPanel>{completedStory.trim()}</StoryPanel>
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
                                {completedStory} <PromptText>{currentStep.prompt}</PromptText>
                            </StoryPanel>

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
                                {storyData.slice(0, -1).map((_, index) => (
                                    <NavigationDot
                                        key={index}
                                        isActive={index === stepIndex}
                                        themeColor={themeColor}
                                        onClick={() => setStepIndex(index)}
                                        aria-label={`Go to step ${index + 1}`}
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