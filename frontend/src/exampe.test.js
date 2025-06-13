import { expect, test, describe } from 'vitest';

describe('Checking if the test is working', () => {
    test("1 + 2", () => {
        expect(1 + 2).toBe(3);
    });
});