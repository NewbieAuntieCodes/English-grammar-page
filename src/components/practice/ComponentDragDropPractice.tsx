/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    PracticeSection,
    PracticeTitle,
    PracticeSubtitle,
    SentenceHint,
    ChineseHint,
    DropArea,
    DropZone,
    DropZoneTitle,
    DraggableContainer,
    DraggableItem,
    CheckButton,
    ProgressDots,
    ProgressDot,
    CorrectSticker,
    CompletionContainer,
    CompletionTitle,
    CompletionMessage,
    NextChapterButton,
} from './ComponentDragDropPractice.styles';

// FIX: Export types to allow them to be used in other components.
export type ComponentType = 'Subject' | 'Verb' | 'Object';

export interface ComponentData {
    id: number;
    text: string;
    type: ComponentType;
}

export interface PracticeData {
    sentence: string;
    components: ComponentData[];
    chinese: string;
}

interface ComponentDragDropPracticeProps {
    themeColor: string;
    onCompleteAll: () => void;
    practiceData: PracticeData[];
    completionTitle: string;
    completionMessage: string;
    nextButtonText: string;
}

export const ComponentDragDropPractice: React.FC<ComponentDragDropPracticeProps> = ({
    themeColor,
    onCompleteAll,
    practiceData,
    completionTitle,
    completionMessage,
    nextButtonText,
}) => {
    const [practiceIndex, setPracticeIndex] = useState(0);
    const [unplaced, setUnplaced] = useState<ComponentData[]>([]);
    const [placements, setPlacements] = useState<Record<ComponentType, ComponentData | null>>({ Subject: null, Verb: null, Object: null });
    const [statuses, setStatuses] = useState<Record<ComponentType, 'default' | 'correct' | 'incorrect'>>({ Subject: 'default', Verb: 'default', Object: 'default' });
    const [dragOverZone, setDragOverZone] = useState<ComponentType | null>(null);
    const [showCorrectSticker, setShowCorrectSticker] = useState(false);
    const [allPracticesCompleted, setAllPracticesCompleted] = useState(false);

    const currentPractice = useMemo(() => practiceData[practiceIndex], [practiceData, practiceIndex]);

    const handleNextPractice = useCallback(() => {
        if (practiceIndex < practiceData.length - 1) {
            setPracticeIndex(prev => prev + 1);
        } else {
            setAllPracticesCompleted(true);
        }
    }, [practiceIndex, practiceData.length]);

    const handlePrevPractice = () => {
        if (practiceIndex > 0) {
            setPracticeIndex(prev => prev - 1);
        }
    };

    const resetStateForCurrentPractice = useCallback(() => {
        if (currentPractice) {
            setUnplaced([...currentPractice.components].sort(() => Math.random() - 0.5));
            setPlacements({ Subject: null, Verb: null, Object: null });
            setStatuses({ Subject: 'default', Verb: 'default', Object: 'default' });
        }
    }, [currentPractice]);

    useEffect(() => {
        resetStateForCurrentPractice();
    }, [practiceIndex, resetStateForCurrentPractice]);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, component: ComponentData) => {
        e.dataTransfer.setData('componentId', component.id.toString());
        e.currentTarget.style.opacity = '0.5';
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.opacity = '1';
        setDragOverZone(null);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, category: ComponentType) => {
        e.preventDefault();
        setDragOverZone(null);
        setStatuses(prev => ({ ...prev, [category]: 'default' }));

        const componentId = parseInt(e.dataTransfer.getData('componentId'), 10);
        let componentToMove: ComponentData | undefined;

        // Find component in unplaced
        componentToMove = unplaced.find(c => c.id === componentId);
        if (componentToMove) {
            setUnplaced(unplaced.filter(c => c.id !== componentId));
        } else { // Find component in other placements
            for (const key in placements) {
                const typedKey = key as ComponentType;
                if (placements[typedKey]?.id === componentId) {
                    componentToMove = placements[typedKey];
                    setPlacements(prev => ({ ...prev, [typedKey]: null }));
                    break;
                }
            }
        }

        if (componentToMove) {
            // If there's already a component in the target zone, move it back to unplaced
            const existingComponent = placements[category];
            if (existingComponent) {
                setUnplaced(prev => [...prev, existingComponent]);
            }
            setPlacements(prev => ({ ...prev, [category]: componentToMove }));
        }
    };

    const handleCheckAnswer = () => {
        let allCorrect = true;
        const newStatuses = { ...statuses };

        for (const key in placements) {
            const category = key as ComponentType;
            const placedComponent = placements[category];
            if (placedComponent) {
                if (placedComponent.type === category) {
                    newStatuses[category] = 'correct';
                } else {
                    newStatuses[category] = 'incorrect';
                    allCorrect = false;
                }
            } else { // Empty drop zone is incorrect
                allCorrect = false;
            }
        }
        setStatuses(newStatuses);

        if (allCorrect) {
            setShowCorrectSticker(true);
            setTimeout(() => {
                handleNextPractice();
            }, 1200);
            setTimeout(() => setShowCorrectSticker(false), 2000);
        } else {
             setTimeout(() => setStatuses({ Subject: 'default', Verb: 'default', Object: 'default' }), 2000);
        }
    };
    
    const touchStartRef = React.useRef<number | null>(null);
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
                    <NextChapterButton onClick={onCompleteAll} themeColor={themeColor}>{nextButtonText}</NextChapterButton>
                </CompletionContainer>
            </PracticeSection>
        );
    }
    
    if (!currentPractice) return null;

    const allDropped = unplaced.length === 0;

    return (
        <PracticeSection themeColor={themeColor} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {showCorrectSticker && <CorrectSticker themeColor={themeColor}>✔️ Perfect!</CorrectSticker>}
            <>
                <PracticeTitle themeColor={themeColor}>🎯 练习：拖拽分类</PracticeTitle>
                <PracticeSubtitle>将下面的句子成分拖到正确的类别框中</PracticeSubtitle>
                
                <SentenceHint>{currentPractice.sentence}</SentenceHint>
                <ChineseHint>{currentPractice.chinese}</ChineseHint>

                <DropArea>
                    {(['Subject', 'Verb', 'Object'] as ComponentType[]).map(category => (
                        <DropZone
                            key={category}
                            onDrop={(e) => handleDrop(e, category)}
                            onDragOver={(e) => e.preventDefault()}
                            onDragEnter={() => setDragOverZone(category)}
                            onDragLeave={() => setDragOverZone(null)}
                            isOver={dragOverZone === category}
                            status={statuses[category]}
                            themeColor={themeColor}
                        >
                            <DropZoneTitle>{category}</DropZoneTitle>
                            {placements[category] && (
                                <DraggableItem
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, placements[category]!)}
                                    onDragEnd={handleDragEnd}
                                >
                                    {placements[category]!.text}
                                </DraggableItem>
                            )}
                        </DropZone>
                    ))}
                </DropArea>

                <DraggableContainer>
                    {unplaced.map(component => (
                        <DraggableItem
                            key={component.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, component)}
                            onDragEnd={handleDragEnd}
                        >
                            {component.text}
                        </DraggableItem>
                    ))}
                </DraggableContainer>

                <CheckButton onClick={handleCheckAnswer} disabled={!allDropped} themeColor={themeColor}>
                    Check Answer
                </CheckButton>

                <ProgressDots>
                    {practiceData.map((_, index) => (<ProgressDot 
                        key={index} 
                        isActive={index === practiceIndex} 
                        themeColor={themeColor} 
                        onClick={() => setPracticeIndex(index)}
                        aria-label={`Go to question ${index + 1}`}
                    />))}
                </ProgressDots>
            </>
        </PracticeSection>
    );
};