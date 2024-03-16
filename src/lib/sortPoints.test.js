const sortPoints = require('../lib/sortPoints')


test('Unordered 2 object list', () => {
    expect(sortPoints([{x: 5, y: 2}, {x: 3, y: 4}]))
    .toStrictEqual([{x: 3, y: 4}, {x: 5, y: 2}])
})
    
test('Ordered 2 object list', () => {
    expect(sortPoints([{x: 3, y: 4}, {x: 5, y: 2}]))
    .toStrictEqual([{x: 3, y: 4}, {x: 5, y: 2}])
})

test('Ordered 10 object list', () => {
    expect(sortPoints([{x: -30, y: 47}, {x: -10, y: -12}, {x: -5, y: 1}, {x: 0, y: 6}, {x: 3, y: 4}, {x: 5, y: 2}, {x: 10, y: 3}, {x: 9999, y: -9999}, {x: 10000, y: 0}, {x: 12345, y: 54321}]))
    .toStrictEqual([{x: -30, y: 47}, {x: -10, y: -12}, {x: -5, y: 1}, {x: 0, y: 6}, {x: 3, y: 4}, {x: 5, y: 2}, {x: 10, y: 3}, {x: 9999, y: -9999}, {x: 10000, y: 0}, {x: 12345, y: 54321}])
})

test('Unordered 10 object list', () => {
    expect(sortPoints([{x: 12345, y: 54321}, {x: 10, y: 3}, {x: 9999, y: -9999}, {x: -10, y: -12}, {x: 0, y: 6}, {x: 3, y: 4}, {x: 10000, y: 0}, {x: -30, y: 47}, {x: -5, y: 1}, {x: 5, y: 2}]))
    .toStrictEqual([{x: -30, y: 47}, {x: -10, y: -12}, {x: -5, y: 1}, {x: 0, y: 6}, {x: 3, y: 4}, {x: 5, y: 2}, {x: 10, y: 3}, {x: 9999, y: -9999}, {x: 10000, y: 0}, {x: 12345, y: 54321}])
})
