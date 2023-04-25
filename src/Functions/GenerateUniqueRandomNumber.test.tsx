import React from 'react';
import '@testing-library/jest-dom';
import generateUniqueRandomNumber from './GenerateUniqueRandomNumber';

describe('generateUniqueRandomNumber should return a random number', () => {
    let maxValue = 50;
    let existingArray = [34, 54, 45, 3, 26];
    it('generateUniqueRandomNumber should return a value less tham max value', () => {
        let value = generateUniqueRandomNumber(existingArray, maxValue)

        expect(value).toBeLessThanOrEqual(maxValue);
    });

    it('generateUniqueRandomNumber should return a value lequal to max value 1', () => {
        let value = generateUniqueRandomNumber([], 1)

        expect(value).toEqual(1);
    });

    it('generateUniqueRandomNumber should return a value lequal to max value 1', () => {
        let value = generateUniqueRandomNumber(existingArray, maxValue)

        expect(value).toBeLessThanOrEqual(maxValue);
        expect(existingArray).not.toContain(value);
    });
});