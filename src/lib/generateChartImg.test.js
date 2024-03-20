/**
* @jest-environment ./src/fixjsdomenvironment.js
*/

const generateChartImg = require('../lib/generateChartImg')
const chartImg = require('../lib/generateChartImg')
require('whatwg-fetch');

test('Basic chart generation test', async () => {
    //Runs a test on a urlimage
    const blobData =  await generateChartImg(
        "line",
        [{x: -30, y: 47}, {x: -10, y: -12}, {x: -5, y: 1}, {x: 0, y: 6}, {x: 3, y: 4}, {x: 5, y: 2}, {x: 10, y: 3}, {x: 9999, y: -9999}, {x: 10000, y: 0}, {x: 12345, y: 54321}],
        "X-Axis",
        "Y-Axis",
        "Chart Title!",
        "black"
    );

    blobTemp = new Blob([blobData])

    url = URL.createObjectURL(blobTemp);

    expect(url).toContain("blob:nodedata:");
})