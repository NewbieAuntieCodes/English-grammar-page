/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { 
    FloatingCardWrapper, 
    RoundCard, 
    CardIcon, 
    CardTitle, 
    CardSubtitle, 
    Sparkle 
} from './FloatingCard.styles';

// --- Interface for props ---
interface CardProps {
    id: string;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    color: string;
    animationDelay: string;
    onClick: (id: string) => void;
}

// --- Reusable Component ---
export const FloatingCard: React.FC<CardProps> = ({ id, icon, title, subtitle, color, animationDelay, onClick }) => {
    return (
        <FloatingCardWrapper delay={animationDelay} onClick={() => onClick(id)}>
            <RoundCard>
                <CardIcon>{icon}</CardIcon>
                <CardTitle>{title}</CardTitle>
                <CardSubtitle>{subtitle}</CardSubtitle>
            </RoundCard>
            <Sparkle top="20%" left="15%" delay="0s" />
            <Sparkle top="70%" right="20%" delay="2s" />
            <Sparkle top="40%" right="15%" delay="1s" />
        </FloatingCardWrapper>
    );
};