import { Test } from '../src';

test('hello', () => {
  expect(new Test().sayHello()).toBe('hello, world!');
});