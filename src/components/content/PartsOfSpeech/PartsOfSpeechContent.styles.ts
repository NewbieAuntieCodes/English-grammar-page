/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import styled from 'styled-components';

export const PartsOfSpeechGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 25px;
    margin-top: 20px;
`;

export const PartItem = styled.div<{ borderColor: string }>`
    background: #fff;
    border-radius: 12px;
    padding: 20px 20px 20px 40px;
    text-align: left;
    position: relative;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.07);
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        height: 50%;
        width: 10px;
        border: 3px solid ${props => props.borderColor};
        border-right: none;
        border-radius: 10px 0 0 10px;
    }

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
`;

export const PartChinese = styled.div`
    font-size: 1.1em;
    font-weight: bold;
    color: #2d3748;
    margin-bottom: 8px;
`;

export const PartDescription = styled.div`
    font-size: 0.9em;
    color: #718096;
`;

export const WordFormsHeader = styled.div`
    background: white;
    border-radius: 15px;
    padding: 25px;
    margin-top: 50px;
    margin-bottom: 25px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.06);
    display: flex;
    align-items: center;
`;

export const WordFormsGrid = styled(PartsOfSpeechGrid)`
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
`;

export const WordFormItem = styled(PartItem)`
    padding: 15px 15px 15px 30px;

    &::before {
        left: 12px;
        height: 40%;
        width: 8px;
    }
`;

export const WordFormChinese = styled(PartChinese)`
    font-size: 1em;
    margin-bottom: 4px;
`;

export const WordFormDescription = styled(PartDescription)`
    font-size: 0.85em;
`;
