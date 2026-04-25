/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { keyframes } from 'styled-components';

// --- Keyframe Animations ---
export const floatAnimation = keyframes`
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
`;

export const sparkleAnimation = keyframes`
    0%, 100% { opacity: 0; transform: scale(0); }
    50% { opacity: 1; transform: scale(1); }
`;

export const fadeInAnimation = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

export const slideUpAnimation = keyframes`
    from { opacity: 0; transform: translateY(50px) scale(0.9); }
    to { opacity: 1; transform: translateY(0) scale(1); }
`;