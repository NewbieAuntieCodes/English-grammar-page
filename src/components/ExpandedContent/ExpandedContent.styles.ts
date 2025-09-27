/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import styled from 'styled-components';
import { fadeInAnimation, slideUpAnimation } from '../../styles/animations';

export const ExpandedContentBackdrop = styled.div<{ show: boolean }>`
    display: ${props => props.show ? 'flex' : 'none'};
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    animation: ${fadeInAnimation} 0.4s ease;
`;

export const ContentCard = styled.div`
    background: white;
    border-radius: 25px;
    padding: 50px;
    max-width: 1140px;
    width: 100%;
    margin: 20px 0;
    position: relative;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    animation: ${slideUpAnimation} 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    @media (max-width: 768px) {
        padding: 30px;
        margin: 10px 0;
        border-radius: 20px;
    }
`;

export const CloseButton = styled.button<{ color: string }>`
    position: absolute;
    top: 20px;
    right: 25px;
    background: ${props => props.color || '#ff6b6b'};
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;

    &:hover {
        filter: brightness(0.9);
        transform: scale(1.1) rotate(90deg);
    }

    &::before,
    &::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 2px;
        background-color: white;
        border-radius: 1px;
    }

    &::before {
        transform: rotate(45deg);
    }

    &::after {
        transform: rotate(-45deg);
    }

    @media (max-width: 768px) {
        top: 15px;
        right: 15px;
        width: 35px;
        height: 35px;
    }
`;