/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
    
    const currentPractice = practiceData[practiceIndex];

    const resetForNewQuestion = useCallback(() => {
        setSelectedWords([]);
        setWordStatuses({});
        setFeedback(null);
    }, []);

    useEffect(() => {
        resetForNewQuestion();
    }, [practiceIndex, resetForNewQuestion]);
    
    const handleNextPractice = useCallback(() => {
        if (practiceIndex >= practiceData.length - 1) {
            setAllPracticesCompleted(true);
        } else {
            setPracticeIndex(prev => prev + 1);
        }
    }, [practiceIndex, practiceData.length]);

    const handleWordClick = (word: string, index: number) => {
        // Ignore clicks on already correct words
        if (wordStatuses[index] === 'correct') return;

        const cleanedWord = word.replace(/[.,!?]/g, '');
        const isTarget = currentPractice.targetWords.some(target => target.toLowerCase() === cleanedWord.toLowerCase());

        if (isTarget) {
            // Avoid re-selecting the same correct word if there are duplicates in the sentence
            if (selectedWords.includes(cleanedWord.toLowerCase())) {
                const countInTargets = currentPractice.targetWords.filter(t => t.toLowerCase() === cleanedWord.toLowerCase()).length;
                const countInSelected = selectedWords.filter(s => s === cleanedWord.toLowerCase()).length;
                if (countInSelected >= countInTargets) return;
            }

            const newSelected = [...selectedWords, cleanedWord.toLowerCase()];
            setSelectedWords(newSelected);
            setWordStatuses(prev => ({ ...prev, [index]: 'correct' }));

            if (newSelected.length === currentPractice.targetWords.length) {
                setShowCorrectSticker(true);
                setTimeout(() => handleNextPractice(), 800);
                setTimeout(() => setShowCorrectSticker(false), 2000);
            }
        } else {
            setWordStatuses(prev => ({ ...prev, [index]: 'incorrect' }));
            setFeedback("🤔 That's not it, try again!");
            setTimeout(() => {
                setWordStatuses(prev => ({ ...prev, [index]: 'default' }));
                setFeedback(null);
            }, 1000);
        }
    };

    const words = useMemo(() => currentPractice ? currentPractice.sentence.split(' ') : [], [currentPractice]);

    return (
        <PracticeSection themeColor={themeColor}>
            {showCorrectSticker && <CorrectSticker themeColor={themeColor}>✔️ Correct!</CorrectSticker>}
            {allPracticesCompleted ? (
                <CompletionContainer>
                    <CompletionTitle>{completionTitle}</CompletionTitle>
                    <CompletionMessage>{completionMessage}</CompletionMessage>
                    <NextChapterButton onClick={onCompleteAll} themeColor={themeColor}>
                        {nextButtonText}
                    </NextChapterButton>
                </CompletionContainer>
            ) : (
                currentPractice && (
                    <>
                        <InstructionText>
                            点击句子中的 <strong>{currentPractice.prompt}</strong>
                        </InstructionText>
                        
                        <SentenceDisplay themeColor={themeColor}>
                            {words.map((word, index) => (
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
                        <ChineseHint>
                            {currentPractice.chinese}
                        </ChineseHint>

                        {feedback && (
                            <FeedbackMessage>{feedback}</FeedbackMessage>
                        )}

                        <ProgressDots>
                            {practiceData.map((_, index) => (
                                <ProgressDot key={index} isActive={index === practiceIndex} themeColor={themeColor} />
                            ))}
                        </ProgressDots>
                    </>
                )
            )}
        </PracticeSection>
    );
};