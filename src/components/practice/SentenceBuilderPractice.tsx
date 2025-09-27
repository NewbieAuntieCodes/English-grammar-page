/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    PracticeSection,
    PracticeTitle,
    PracticeSubtitle,
    ChineseHint,
    WordBank,
    WordItem,
    WordEnglish,
    SentenceBuilder,
    BuilderPlaceholder,
    BuilderWord,
    ProgressDots,
    ProgressDot,
    Feedback,
    CorrectSticker,
    CompletionContainer,
    CompletionTitle,
    CompletionMessage,
    NextChapterButton,
    PracticeModeSwitcher,
    ModeButton,
    TranslationContainer,
    RevealedAnswer,
    CheckButton,
} from './SentenceBuilderPractice.styles';

interface WordData {
    en: string;
    cn: string;
}

interface PracticeData {
    words: WordData[];
    correct: string[];
    chinese: string;
}

interface SentenceBuilderPracticeProps {
    themeColor: string;
    onCompleteAll: () => void;
    practiceData: PracticeData[];
    title: string;
    subtitle: string;
    completionTitle: string;
    completionMessage: string;
    nextButtonText: string;
}

interface WordState {
    word: string;
    id: number;
    cn: string;
}

export const SentenceBuilderPractice: React.FC<SentenceBuilderPracticeProps> = ({
    themeColor,
    onCompleteAll,
    practiceData,
    title,
    subtitle,
    completionTitle,
    completionMessage,
    nextButtonText,
}) => {
    const [practiceIndex, setPracticeIndex] = useState(0);
    const [practiceMode, setPracticeMode] = useState<'build' | 'translate'>('build');
    
    // State for 'build' mode
    const [bankWords, setBankWords] = useState<WordState[]>([]);
    const [builtSentence, setBuiltSentence] = useState<WordState[]>([]);

    // State for 'translate' mode
    const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
    
    // Shared state
    const [feedback, setFeedback] = useState<{ type: 'incorrect'; message: React.ReactNode } | null>(null);
    const [showCorrectSticker, setShowCorrectSticker] = useState(false);
    const [isShaking, setIsShaking] = useState(false);
    const [allPracticesCompleted, setAllPracticesCompleted] = useState(false);
    
    const currentPractice = practiceData[practiceIndex];

    const shuffledWords = useMemo(() => {
        if (!currentPractice) return [];
        return [...currentPractice.words]
            .sort(() => Math.random() - 0.5)
            .map((wordData, index) => ({ word: wordData.en, id: index, cn: wordData.cn }));
    }, [practiceIndex, currentPractice]);

    useEffect(() => {
        setBankWords(shuffledWords);
        setBuiltSentence([]);
        setFeedback(null);
        setIsAnswerRevealed(false);
    }, [practiceIndex, practiceMode, shuffledWords]);

    const handleAddWord = (wordItem: WordState) => {
        setBuiltSentence(prev => [...prev, wordItem]);
        setBankWords(prev => prev.filter(item => item.id !== wordItem.id));
        setFeedback(null);
    };

    const handleRemoveWord = (wordItem: WordState) => {
        setBankWords(prev => [...prev, wordItem].sort((a, b) => a.id - b.id));
        setBuiltSentence(prev => prev.filter(item => item.id !== wordItem.id));
        setFeedback(null);
    };
    
    const handleNextPractice = useCallback(() => {
        const isLastQuestion = practiceIndex >= practiceData.length - 1;

        if (isLastQuestion) {
            setAllPracticesCompleted(true);
        } else {
            setPracticeIndex(prev => prev + 1);
        }
    }, [practiceIndex, practiceData.length]);

    const handleResetPractice = useCallback(() => {
        setBankWords(shuffledWords);
        setBuiltSentence([]);
        setFeedback(null);
    }, [shuffledWords]);

    const handleCheckAnswer = useCallback(() => {
        if (builtSentence.length === 0) return;
        const userSentence = builtSentence.map(item => item.word);
        const isCorrect = JSON.stringify(userSentence) === JSON.stringify(currentPractice.correct);
        
        if (isCorrect) {
            setShowCorrectSticker(true);
            setTimeout(() => {
                handleNextPractice();
            }, 300);

            setTimeout(() => {
                setShowCorrectSticker(false);
            }, 2000);
        } else {
            setFeedback({ 
                type: 'incorrect', 
                message: (
                    <>
                        🤔 不太对哦，再试一次!
                        <br />
                        Remember the sentence structure.
                    </>
                )
             });
             setIsShaking(true);

             setTimeout(() => {
                 handleResetPractice();
                 setIsShaking(false);
             }, 1500);
        }
    }, [builtSentence, currentPractice, handleNextPractice, handleResetPractice]);

    const handleTranslateAction = () => {
        if (isAnswerRevealed) {
            handleNextPractice();
        } else {
            setIsAnswerRevealed(true);
        }
    };
    
    useEffect(() => {
        if (practiceMode === 'build' && bankWords.length === 0 && builtSentence.length > 0 && !allPracticesCompleted) {
            const timer = setTimeout(handleCheckAnswer, 200);
            return () => clearTimeout(timer);
        }
    }, [practiceMode, bankWords.length, builtSentence.length, handleCheckAnswer, allPracticesCompleted]);

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
                        <PracticeTitle themeColor={themeColor}>{title}</PracticeTitle>
                        <PracticeSubtitle>{subtitle}</PracticeSubtitle>
                        
                        <PracticeModeSwitcher>
                            <ModeButton 
                                isActive={practiceMode === 'build'} 
                                onClick={() => setPracticeMode('build')}
                                themeColor={themeColor}
                            >
                                组句练习
                            </ModeButton>
                            <ModeButton 
                                isActive={practiceMode === 'translate'} 
                                onClick={() => setPracticeMode('translate')}
                                themeColor={themeColor}
                            >
                                翻译练习
                            </ModeButton>
                        </PracticeModeSwitcher>

                        <ChineseHint>
                            {currentPractice.chinese}
                        </ChineseHint>
                        
                        {practiceMode === 'build' ? (
                            <>
                                <WordBank>
                                    {bankWords.map(item => (
                                        <WordItem key={item.id} onClick={() => handleAddWord(item)}>
                                            <WordEnglish>{item.word}</WordEnglish>
                                        </WordItem>
                                    ))}
                                </WordBank>
                                
                                <SentenceBuilder themeColor={themeColor} isShaking={isShaking}>
                                    {builtSentence.length === 0 ? (
                                        <BuilderPlaceholder>Click words from the bank to add them here</BuilderPlaceholder>
                                    ) : (
                                        builtSentence.map(item => (
                                            <BuilderWord key={item.id} onClick={() => handleRemoveWord(item)} title="Click to remove" themeColor={themeColor}>
                                                <WordEnglish>{item.word}</WordEnglish>
                                            </BuilderWord>
                                        ))
                                    )}
                                </SentenceBuilder>
                            </>
                        ) : (
                            <TranslationContainer>
                                <RevealedAnswer isVisible={isAnswerRevealed}>
                                    {isAnswerRevealed ? currentPractice.correct.join(' ') : ''}
                                </RevealedAnswer>
                                <CheckButton 
                                    themeColor={themeColor} 
                                    onClick={handleTranslateAction}
                                >
                                    {isAnswerRevealed ? 'Next' : 'Check'}
                                </CheckButton>
                            </TranslationContainer>
                        )}


                        {practiceMode === 'build' && feedback && feedback.type === 'incorrect' && (
                            <Feedback type={feedback.type}>
                                {feedback.message}
                            </Feedback>
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