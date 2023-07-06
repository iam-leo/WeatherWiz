import { ZeroPadPipe } from './zero-pad.pipe';

describe('ZeroPadPipe', () => {
  it('create an instance', () => {
    const pipe = new ZeroPadPipe();
    expect(pipe).toBeTruthy();
  });
});
