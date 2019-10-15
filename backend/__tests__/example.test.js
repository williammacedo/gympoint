function soma(a, b) {
  return a + b;
}

describe('Example', () => {
  it('should return 9 if I call soma with 4 and 5 as arguments', () => {
    const result = soma(4, 5);

    expect(result).toBe(9);
  });
});
