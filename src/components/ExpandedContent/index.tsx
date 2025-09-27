/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { 
    ExpandedContentBackdrop, 
    ContentCard, 
    CloseButton 
} from './ExpandedContent.styles';

// --- Interface for props ---
interface ExpandedContentProps {
    id: string;
    activeContent: string | null;
    onClose: () => void;
    children: React.ReactNode;
    color: string;
}

// --- Reusable Component ---
export const ExpandedContent: React.FC<ExpandedContentProps> = ({ id, activeContent, onClose, children, color }) => {
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    
    return (
        <ExpandedContentBackdrop show={activeContent === id} onClick={handleBackdropClick}>
            <ContentCard onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose} aria-label="Close" color={color} />
                {children}
            </ContentCard>
        </ExpandedContentBackdrop>
    );
};