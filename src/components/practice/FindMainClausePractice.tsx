/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import {
    LessonTitle,
} from '../content/Structures/SVOContent.styles';
import { WordSelectorPractice } from './WordSelectorPractice';

export interface PracticeData {
    sentence: string;
    targetWords: string[];
    prompt: string;
    chinese: string;
}

interface FindMainClausePracticeProps {
    onCompleteAll: () => void;
    themeColor: string;
    practiceData: PracticeData[];
    title: string;
}

export const FindMainClausePractice: React.FC<FindMainClausePracticeProps> = ({
    onCompleteAll,
    themeColor,
    practiceData,
    title,
}) => {
    return (
        <>
            <LessonTitle>{title}</LessonTitle>

            <WordSelectorPractice
                themeColor={themeColor}
                onCompleteAll={onCompleteAll}
                practiceData={practiceData}
                completionTitle="🎉 Excellent!"
                completionMessage="你已经完成了本组练习！"
                nextButtonText="返回练习列表"
            />
        </>
    );
};
