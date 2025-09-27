/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import styled from 'styled-components';
import { floatAnimation, sparkleAnimation } from '../../styles/animations';

export const FloatingCardWrapper = styled.div<{ delay: string }>`
    position: relative;
    cursor: pointer;
    transition: all 0.4s ease;
    animation: ${floatAnimation} 6s ease-in-out infinite;
    animation-delay: ${props => props.delay};
`;

export const RoundCard = styled.div`
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background: radial-gradient(circle at 70% 30%, #ffffff 0%, #f0f2f5 90%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 40px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    margin: 0 auto;

    &:hover {
        transform: translateY(-15px) scale(1.05);
        box-shadow: 0 30px 60px rgba(0,0,0,0.25);
    }

    @media (max-width: 768px) {
        width: 240px;
        height: 240px;
        padding: 30px;
    }
`;

export const CardIcon = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        margin-bottom: 15px;
        transform: scale(0.9);
    }
`;

export const CardTitle = styled.div`
    font-size: 1.4em;
    font-weight: bold;
    color: #2d3748;
    margin-bottom: 10px;
    line-height: 1.3;

    @media (max-width: 768px) {
        font-size: 1.2em;
    }
`;

export const CardSubtitle = styled.div`
    font-size: 1em;
    color: #718096;
    font-style: italic;

    @media (max-width: 768px) {
        font-size: 0.9em;
    }
`;

export const Sparkle = styled.div<{ top?: string; left?: string; right?: string; delay: string }>`
    position: absolute;
    width: 10px;
    height: 10px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    animation: ${sparkleAnimation} 3s linear infinite;
    top: ${props => props.top};
    left: ${props => props.left};
    right: ${props => props.right};
    animation-delay: ${props => props.delay};
`;