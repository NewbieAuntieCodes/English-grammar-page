/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
    PracticeSection,
    ProgressDots,
    ProgressDot,
    CorrectSticker,
    CompletionContainer,
    CompletionTitle,
    CompletionMessage,
    NextChapterButton,
    InstructionText,
    SentenceDisplay,
    ChineseHint,
    WordSpan,
    FeedbackMessage,
} from './WordSelectorPractice.styles';

interface PracticeData {
    sentence: string;
    targetWords: string[];
    prompt: string;
    chinese: string;
}

interface WordSelectorPracticeProps {
    themeColor: string;
    onCompleteAll: () => void;
    practiceData: PracticeData[];
    completionTitle: string;
    completionMessage: string;
    nextButtonText: string;
}

export const WordSelectorPractice: React.FC<WordSelectorPracticeProps> = ({
    themeColor,
    onCompleteAll,
    practiceData,
    completionTitle,
    completionMessage,
    nextButtonText,
}) => {
    const [practiceIndex, setPracticeIndex] = useState(0);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [wordStatuses, setWordStatuses] = useState<Record<number, 'default' | 'correct' | 'incorrect'>>({});
    const [feedback, setFeedback] = useState<string | null>(null);
    const [showCorrectSticker, setShowCorrectSticker] = useState(false);
    const [allPracticesCompleted, setAllPracticesCompleted] = useState(false);
    
    const currentPractice = useMemo(() => practiceData[practiceIndex], [practiceData, practiceIndex]);
    const sentenceWords = useMemo(() => currentPractice?.sentence.split(' ') || [], [currentPractice]);

    const resetForCurrentPractice = useCallback(() => {
        if (allPracticesCompleted) {
            setAllPracticesCompleted(false);
        }
        setSelectedWords([]);
        setWordStatuses({});
        setFeedback(null);
    }, [allPracticesCompleted]);

    useEffect(() => {
        resetForCurrentPractice();
    }, [practiceIndex, resetForCurrentPractice]);

    const handlePrevPractice = () => {
        if (practiceIndex > 0) {
            setPracticeIndex(prev => prev - 1);
        }
    };

    const handleNextPractice = useCallback(() => {
        if (practiceIndex < practiceData.length - 1) {
            setPracticeIndex(prev => prev + 1);
        } else {
            setAllPracticesCompleted(true);
        }
    }, [practiceIndex, practiceData.length]);

    const handleWordClick = (word: string, index: number) => {
        if (wordStatuses[index] === 'correct') return;

        const cleanedWord = word.replace(/[.,!?]/g, '');
        const isTarget = currentPractice.targetWords.includes(cleanedWord);

        if (isTarget) {
            const newSelectedWords = [...selectedWords, cleanedWord];
            setSelectedWords(newSelectedWords);
            setWordStatuses(prev => ({ ...prev, [index]: 'correct' }));

            // Check if all target words have been found. This handles cases with multiple target words.
            const allTargetsFound = currentPractice.targetWords.every(target => 
                newSelectedWords.includes(target)
            );

            if (allTargetsFound) {
                setShowCorrectSticker(true);
                setTimeout(() => {
                    handleNextPractice();
                }, 1200);
                setTimeout(() => {
                    setShowCorrectSticker(false);
                }, 2000);
            }
        } else {
            setWordStatuses(prev => ({ ...prev, [index]: 'incorrect' }));
            setFeedback(`'${cleanedWord}' is not a ${currentPractice.prompt}. Try again!`);
            setTimeout(() => {
                setWordStatuses(prev => ({ ...prev, [index]: 'default' }));
                setFeedback(null);
            }, 1500);
        }
    };
    
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

    if (allPracticesCompleted) {
        return (
            <PracticeSection themeColor={themeColor}>
                <CompletionContainer>
                    <CompletionTitle>{completionTitle}</CompletionTitle>
                    <CompletionMessage>{completionMessage}</CompletionMessage>
                    <NextChapterButton onClick={onCompleteAll} themeColor={themeColor}>
                        {nextButtonText}
                    </NextChapterButton>
                </CompletionContainer>
            </PracticeSection>
        );
    }
    
    if (!currentPractice) {
        return null; // Or a loading state
    }

    return (
        <PracticeSection themeColor={themeColor} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {showCorrectSticker && <CorrectSticker themeColor={themeColor}>✔️ Correct!</CorrectSticker>}
            <>
                <InstructionText themeColor={themeColor}>
                    Click on the <strong>{currentPractice.prompt}</strong> in the sentence below.
                </InstructionText>

                <SentenceDisplay themeColor={themeColor}>
                    {sentenceWords.map((word, index) => (
                        <WordSpan
                            key={index}
                            status={wordStatuses[index] || 'default'}
                            themeColor={themeColor}
                            onClick={() => handleWordClick(word, index)}
                        >
                            {word}
                        </WordSpan>
                    ))}
                </SentenceDisplay>

                <ChineseHint themeColor={themeColor}>{currentPractice.chinese}</ChineseHint>

                {feedback && <FeedbackMessage>{feedback}</FeedbackMessage>}

                <ProgressDots>
                    {practiceData.map((_, index) => (
                        <ProgressDot 
                            key={index} 
                            isActive={index === practiceIndex} 
                            themeColor={themeColor} 
                            onClick={() => setPracticeIndex(index)}
                            aria-label={`Go to question ${index + 1}`}
                        />
                    ))}
                </ProgressDots>
            </>
        </PracticeSection>
    );
};