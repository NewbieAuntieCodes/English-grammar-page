/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useCallback } from 'react';
import {
    PracticeSection,
    PracticeHeader,
    PracticeTitle,
    PracticeSubtitle,
    StoryPanel,
    PromptText,
    ChoicesContainer,
    ChoiceButton,
    ProgressContainer,
    ProgressBarOuter,
    ProgressBarInner,
    CompletionContainer,
    CompletionTitle,
    CompletionMessage,
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

    const currentStep = storyData[stepIndex];
    const isCompleted = stepIndex >= storyData.length - 1;

    const handleChoice = (choice: Choice, index: number) => {
        if (choice.isCorrect) {
            const newStoryPart = currentStep.prompt.replace('...', ' ' + choice.text);
            let updatedStory = (completedStory + ' ' + newStoryPart).trim();

            // If this is the last interactive step, add the final concluding sentence.
            if (stepIndex === storyData.length - 2) {
                updatedStory += ' ' + storyData[storyData.length - 1].prompt;
            }

            setCompletedStory(updatedStory);
            setStepIndex(prev => prev + 1);
        } else {
            setShakingButtonIndex(index);
            setTimeout(() => setShakingButtonIndex(null), 600);
        }
    };
    
    const progress = isCompleted ? 100 : (stepIndex / (storyData.length - 1)) * 100;

    return (
        <PracticeSection themeColor={themeColor}>
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
            )}
        </PracticeSection>
    );
};