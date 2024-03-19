const sortPoints = require('../lib/sortPoints')


test('Unordered 2 object list', () => {
    expect(sortPoints([{x: 5, y: 2}, {x: 3, y: 4}])).toStrictEqual([{x: 3, y: 4}, {x: 5, y: 2}])
})
    
test('Unordered 2 object list', () => {
    expect(sortPoints([{x: 3, y: 4}, {x: 5, y: 2}])).toStrictEqual([{x: 3, y: 4}, {x: 5, y: 2}])
})