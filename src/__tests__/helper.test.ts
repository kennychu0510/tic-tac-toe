import { describe, expect, test } from '@jest/globals';
import { getTurn, checkForWinner, CellState } from '../helper'

describe('helper module', () => {
  test('getTurn 5 is "o"', () => {
    expect(getTurn(5)).toBe('o');
  });
});

describe('win horizontally', () => {
  test('check winner 1st row is correct for x', () => {
    const board = ['x', 'x', 'x', null, null, null, null, null, null] as CellState[]
    expect(checkForWinner(board)).toBe('x');
  });
  test('check winner 2nd row is correct for x', () => {
    const board = [null, null, null, 'x', 'x', 'x', null, null, null] as CellState[]
    expect(checkForWinner(board)).toBe('x');
  });
  test('check winner 3rd row is correct for x', () => {
    const board = [null, null, null, null, null, null, 'x', 'x', 'x'] as CellState[]
    expect(checkForWinner(board)).toBe('x');
  });
  test('check winner 1st row is correct for o', () => {
    const board = ['o', 'o', 'o', null, null, null, null, null, null] as CellState[]
    expect(checkForWinner(board)).toBe('o');
  });
  test('check winner 2nd row is correct for o', () => {
    const board = [null, null, null, 'o', 'o', 'o', null, null, null] as CellState[]
    expect(checkForWinner(board)).toBe('o');
  });
  test('check winner 3rd row is correct for o', () => {
    const board = [null, null, null, null, null, null, 'o', 'o', 'o'] as CellState[]
    expect(checkForWinner(board)).toBe('o');
  });
})

describe('win vertically', () => {
  test('check winner 1st column is correct for x', () => {
    const board = ['x', null, null, 'x', null, null, 'x', null, null] as CellState[]
    expect(checkForWinner(board)).toBe('x');
  });
  test('check winner 2nd column is correct for x', () => {
    const board = [null, 'x', null, null, 'x', null, null, 'x', null] as CellState[]
    expect(checkForWinner(board)).toBe('x');
  });
  test('check winner 3rd column is correct for x', () => {
    const board = [null, null, 'x', null, null, 'x', null, null, 'x'] as CellState[]
    expect(checkForWinner(board)).toBe('x');
  });
  test('check winner 1st column is correct for o', () => {
    const board = ['o', null, null, 'o', null, null, 'o', null, null] as CellState[]
    expect(checkForWinner(board)).toBe('o');
  });
  test('check winner 2nd column is correct for o', () => {
    const board = [null, 'o', null, null, 'o', null, null, 'o', null] as CellState[]
    expect(checkForWinner(board)).toBe('o');
  });
  test('check winner 3rd column is correct for o', () => {
    const board = [null, null, 'o', null, null, 'o', null, null, 'o'] as CellState[]
    expect(checkForWinner(board)).toBe('o');
  });
})

describe('win diagonally', () => {
  test('left diagonal', () => {
    const board = ['x', null, null, null, 'x', null, null, null, 'x'] as CellState[]
    expect(checkForWinner(board)).toBe('x');
  });
  test('right diagonal', () => {
    const board = [null, null, 'o', null, 'o', null, 'o', null, null] as CellState[]
    expect(checkForWinner(board)).toBe('o');
  });
});

describe('no winners', () => {
  test('no winners for blank board', () => {
    const board = [null, null, null, null, null, null, null, null, null] as CellState[]
    expect(checkForWinner(board)).toBe(null);
  });
  test('no winners for unfinished board', () => {
    const board = [null, null, 'x', 'o', 'x', null, null, null, null] as CellState[]
    expect(checkForWinner(board)).toBe(null);
  });
});
