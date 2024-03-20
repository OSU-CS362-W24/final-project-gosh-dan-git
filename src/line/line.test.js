/**
* @jest-environment jsdom
*/

const fs = require("fs")
const domTesting = require('@testing-library/dom')
const { channel } = require("diagnostics_channel")
const { TestEnvironment, default: JSDOMEnvironment } = require("jest-environment-jsdom")
const { hasUncaughtExceptionCaptureCallback } = require("process")
const { waitForDebugger } = require("inspector")
require('@testing-library/jest-dom')
const userEvent = require("@testing-library/user-event").default


function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, "utf8");
    document.open();
    document.write(html);
    document.close();
    jest.isolateModules(function () {
        require(jsPath);
    });
}

beforeEach(function () {
    window.localStorage.clear();
    jest.resetModules();
    jest.restoreAllMocks();
});

test('Create chart with missing data error', async function() {
	initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)
	
	const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {})
	const genChartButton = domTesting.getByText(document, 'Generate chart')
	
	const user = userEvent.setup()
	await user.click(genChartButton)
	
		// Assert that window.alert was called
		expect(mockAlert).toHaveBeenCalled()
	// Check that error message is what it should be
	expect(mockAlert).toHaveBeenCalledWith('Error: No data specified!')

	// Restore the original implementation of window.alert
	mockAlert.mockRestore()
})

test('Create chart with empty label error', async function() {
	initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)
	
	const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {})
	const genChartButton = domTesting.getByText(document, 'Generate chart')

	// Assign first input with X, Y label
	const xIn1 = domTesting.getByLabelText(document, 'X')
	const yIn1 = domTesting.getByLabelText(document, 'Y')
	
	const user = userEvent.setup()
	
	// X and Y label inputs
	await user.type(xIn1, '1')
	await user.type(yIn1, '1')
	
	await user.click(genChartButton)
	
		// Assert that window.alert was called
		expect(mockAlert).toHaveBeenCalled()
	// Check that error message is what it should be
	expect(mockAlert).toHaveBeenCalledWith('Error: Must specify a label for both X and Y!')

	// Restore the original implementation of window.alert
	mockAlert.mockRestore()
})



test('Add more than one X, Y inputs', async function() {
	initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

	// Assign first input with X, Y label
	const xIn1 = domTesting.getByLabelText(document, 'X')
	const yIn1 = domTesting.getByLabelText(document, 'Y')

	// Add point button
	const addButton = domTesting.getByText(document, '+')

	// Set up user to click button
	const user = userEvent.setup()
	await user.click(addButton)
	await user.click(addButton)

	// UI should now contain two X and Y input boxes each
	const inputsWithX = domTesting.getAllByLabelText(document, 'X')
	const inputsWithY = domTesting.getAllByLabelText(document, 'Y')

	// length of inputs for each need to be two
	expect(inputsWithX.length).toEqual(3)
	expect(inputsWithY.length).toEqual(3)

	// An extra check to ensure the inputs are different elements
	expect(xIn1).not.toBe(inputsWithX[1])
	expect(yIn1).not.toBe(inputsWithY[1])
	expect(xIn1).not.toBe(inputsWithX[2])
	expect(yIn1).not.toBe(inputsWithY[2])

})

test('Generate chart with multiple points', async function() {
	jest.mock("../lib/generateChartImg.js")
	const generateChartImgSpy = require("../lib/generateChartImg.js")
	initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)
	
	const titleIn = domTesting.getByLabelText(document, 'Chart title')
	const genChartButton = document.getElementById("generate-chart-btn")
	const addButton = domTesting.getByText(document, '+')

	const xLabel = domTesting.getByLabelText(document, 'X label')
	const yLabel = domTesting.getByLabelText(document, 'Y label')

	// Assign first input with X, Y label
	const xIn1 = domTesting.getByLabelText(document, 'X')
	const yIn1 = domTesting.getByLabelText(document, 'Y')

	// Set up user to add point
	const user = userEvent.setup()
	await user.click(addButton)

	// Assign second input with X, Y label
	const xIn2 = domTesting.getAllByLabelText(document, 'X')[1]
	const yIn2 = domTesting.getAllByLabelText(document, 'Y')[1]


	// X and Y label inputs
	await user.type(xLabel, 'X test')
	await user.type(yLabel, 'Y test')

	// Titel input
	await user.type(titleIn, 'Test')

	// X and Y inputs
	await user.type(xIn1, '1')
	await user.type(yIn1, '1')
	await user.type(xIn2, '2')
	await user.type(yIn2, '2')

	// generate chart
	await user.click(genChartButton)
	
	await domTesting.waitFor(() => {
		expect(generateChartImgSpy).toHaveBeenCalledWith('line', [{ x: '1', y: '1' }, {x: '2', y: '2'}], 'X test', 'Y test', 'Test', "#ff4500")
		// get chart img
		const chartDisp = domTesting.getByRole(document, 'img')
		expect(chartDisp).toBeInTheDocument()
	})

})

test('Generate chart with point in correct location', async function() {
	jest.mock("../lib/generateChartImg.js")
	const generateChartImgSpy = require("../lib/generateChartImg.js")
	initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

	// Assign first input with X, Y label
	const xIn1 = domTesting.getByLabelText(document, 'X')
	const yIn1 = domTesting.getByLabelText(document, 'Y')

	const xLabel = domTesting.getByLabelText(document, 'X label')
	const yLabel = domTesting.getByLabelText(document, 'Y label')

	const titleIn = domTesting.getByLabelText(document, 'Chart title')
	const genChartButton = document.getElementById("generate-chart-btn");
	
	// User event sequence
	const user = userEvent.setup()

	// X and Y label inputs
	await user.type(xLabel, 'X test')
	await user.type(yLabel, 'Y test')

	// Titel input
	await user.type(titleIn, 'Test')

	// X and Y inputs
	await user.type(xIn1, '1')
	await user.type(yIn1, '1')
	
	// generate chart
	await user.click(genChartButton)
	
	await domTesting.waitFor(() => {
		expect(generateChartImgSpy).toHaveBeenCalledWith('line', [{ x: '1', y: '1' }], 'X test', 'Y test', 'Test', "#ff4500")
		// get chart img
		const chartDisp = domTesting.getByRole(document, 'img')
		expect(chartDisp).toBeInTheDocument()
	})
})

test('Values entered remain unchanged when adding inputs', async function() {
	initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

	// Assign first input with X, Y label
	const xIn1 = domTesting.getByLabelText(document, 'X')
	const yIn1 = domTesting.getByLabelText(document, 'Y')

	// Add point button
	const addButton = domTesting.getByText(document, '+')

		// Set up user to click button
		const user = userEvent.setup()
	
	// Enter input values
	await user.type(xIn1, '1')
	await user.type(yIn1, '1')


	await user.click(addButton)

	// length of inputs for each need to be two
	expect(xIn1.value).toEqual('1')
	expect(yIn1.value).toEqual('1')


})

test('Generate chart with a color change', async function() {
	jest.mock("../lib/generateChartImg.js")
	const generateChartImgSpy = require("../lib/generateChartImg.js")
	initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

	// Assign first input with X, Y label
	const xIn1 = domTesting.getByLabelText(document, 'X')
	const yIn1 = domTesting.getByLabelText(document, 'Y')

	const xLabel = domTesting.getByLabelText(document, 'X label')
	const yLabel = domTesting.getByLabelText(document, 'Y label')

	// Color change stuff
	const colorInput = domTesting.getByLabelText(document, 'Chart color')

	const titleIn = domTesting.getByLabelText(document, 'Chart title')
	const genChartButton = domTesting.getByText(document, "Generate chart")
	
	// User event sequence
	const user = userEvent.setup()

	// X and Y label inputs
	await user.type(xLabel, 'X test')
	await user.type(yLabel, 'Y test')

	// Title input
	await user.type(titleIn, 'Test')

	// X and Y inputs
	await user.type(xIn1, '1')
	await user.type(yIn1, '1')
	

	// Need to press color button before changing value
	domTesting.fireEvent.input(colorInput, {target: {value: '#333333'}})
	
	// generate chart
	await user.click(genChartButton)

	
	await domTesting.waitFor(() => {
		expect(generateChartImgSpy).toHaveBeenCalledWith('line', [{ x: '1', y: '1' }], 'X test', 'Y test', 'Test', "#333333")
		// get chart img
		const chartDisp = domTesting.getByRole(document, 'img')
		expect(chartDisp).toBeInTheDocument()
	})
})

test('Clear chart data removes all data entered', async function() {
	jest.mock("../lib/generateChartImg.js")
	const generateChartImgSpy = require("../lib/generateChartImg.js")
	initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

	// Assign first input with X, Y label
	const xIn1 = domTesting.getByLabelText(document, 'X')
	const yIn1 = domTesting.getByLabelText(document, 'Y')

	const xLabel = domTesting.getByLabelText(document, 'X label')
	const yLabel = domTesting.getByLabelText(document, 'Y label')

	// Add another data entry
	const addButton = domTesting.getByText(document, '+')

	// Color change stuff
	const colorInput = domTesting.getByLabelText(document, 'Chart color')

	const titleIn = domTesting.getByLabelText(document, 'Chart title')
	const genChartButton = domTesting.getByText(document, "Generate chart")
	
	// User event sequence
	const user = userEvent.setup()

	// X and Y label inputs
	await user.type(xLabel, 'X test')
	await user.type(yLabel, 'Y test')

	// Title input
	await user.type(titleIn, 'Test')

	// X and Y inputs
	await user.type(xIn1, '1')
	await user.type(yIn1, '1')

	// Need to press color button before changing value
	domTesting.fireEvent.input(colorInput, {target: {value: '#333333'}})
	
	// add another entry
	await user.click(addButton)
	
	// Assign second input with X, Y label
	const xIn2 = domTesting.getAllByLabelText(document, 'X')[1]
	const yIn2 = domTesting.getAllByLabelText(document, 'Y')[1]
	
	// X and Y inputs
	await user.type(xIn2, '2')
	await user.type(yIn2, '2')


	// generate chart
	await user.click(genChartButton)
	
	// Clear Chart
	const clearButton = domTesting.getByText(document, 'Clear chart data')
	await user.click(clearButton)

	// Checking if first entry in x and y is cleared
	// Also proves there is only 1 data entry
	// Will fail if there is more than one 'X' and 'Y' in the document
	const xIn = domTesting.getByLabelText(document, 'X')
	const yIn = domTesting.getByLabelText(document, 'Y')

	expect(xIn.value).toBe('')
	expect(yIn.value).toBe('')

	// Labels must be empty
	const xLabel1 = domTesting.getByLabelText(document, 'X label')
	const yLabel1 = domTesting.getByLabelText(document, 'Y label')

	expect(xLabel1.value).toBe('')
	expect(yLabel1.value).toBe('')

	// Color entry should return to default
	const colorIn = domTesting.getByLabelText(document, 'Chart color')

	expect(colorIn.value).toBe('#ff4500')

})

