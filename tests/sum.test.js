const {sum, sumPromise} = require('../src/test_modules/modules')

test('check the sum method', () =>{
    expect(sum(5,2)).toBe(7)
})

test('check the sum for promise', async() => {
    const sum = await sumPromise(5,3)
    expect(sum).toBe(8)
})

test('check the sum for negative number', async() => {
    const sum = await sumPromise(5,-3)
    expect(sum).toBe('Both numbers must be positive')
})