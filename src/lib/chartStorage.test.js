const chartStorage = require('../lib/chartStorage')


test('Test save function', () => {
    //Saves away a "chart"
    chartStorage.saveChart(83, 0)
    //Loads the chart and expects it to be the same output
    expect(chartStorage.loadSavedChart(0)).toBe(83)
})

test('Test chart update', () => {
    //Updates the current chart data
    chartStorage.updateCurrentChartData(77)
    //Exports the chart data and checks for the update
    expect(chartStorage.loadCurrentChartData()).toBe(77)
})

test('Test loadAllSavedCharts', () => {
    jest.resetModules()
    //Saves a couple charts
    chartStorage.saveChart(66, 0)
    chartStorage.saveChart(77, 1)
    //Loads all saved charts and checks for the data
    expect(chartStorage.loadAllSavedCharts()).toStrictEqual([66, 77])
})

