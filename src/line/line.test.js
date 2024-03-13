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
	const html = fs.readFileSync(htmlPath, 'utf8')
	document.open()
	document.write(html)
	document.close()
	jest.resetModules()
	require(jsPath)
}

describe('Invalid chart submission',  ()=> {
	beforeEach(() => {
        jest.resetModules(); // Reset modules before each test
    });

	afterEach(() => {
        jest.resetModules(); // Reset modules before each test
    });

    test('Create chart with empty fields error', async function() {
        initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)
		const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

		const genChartButton = domTesting.getByText(document, 'Generate chart')
		
		const user = userEvent.setup()
		await user.click(genChartButton)

		// Assert that window.alert was called
		expect(mockAlert).toHaveBeenCalled();

		// CHeck that error message is what it should be
		expect(mockAlert).toHaveBeenCalledWith('Error: No data specified!');

// Restore the original implementation of window.alert
mockAlert.mockRestore();
	})
})

describe('Chart Manipulation', ()=>{
	beforeEach(() => {
        jest.resetModules(); // Reset modules before each test
    });

	afterEach(() => {
        jest.resetModules(); // Reset modules before each test
    });
	
	test('Add more than one X, Y points', async function() {
		initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)

		// Assign first input with X, Y label
		const xIn1 = domTesting.getByLabelText(document, 'X')
		const yIn1 = domTesting.getAllByLabelText(document, 'Y')

		// Add point button
		const addButton = domTesting.getByText(document, '+')

		// Set up user to click button
		const user = userEvent.setup()
		await user.click(addButton)

		// UI should now contain two X and Y input boxes each
		const inputsWithX = domTesting.getAllByLabelText(document, 'X')
		const inputsWithY = domTesting.getAllByLabelText(document, 'Y')

		// length of inputs for each need to be two
		expect(inputsWithX.length).toEqual(2)
		expect(inputsWithY.length).toEqual(2)

		// An extra check to ensure the inputs are different elements
		expect(xIn1).not.toBe(inputsWithX[1])
		expect(yIn1).not.toBe(inputsWithY[1])
	})
	
	test('Generate chart with point in correct location', async function(){
		initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)
		
		jest.mock("../lib/generateChartImg.js")
		const generateChartImgSpy = require("../lib/generateChartImg.js")

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

		// Restore the spy
		generateChartImgSpy.mockRestore();
	})

	test('Generate chart with multiple points', async function(){
		initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)
		
		jest.mock("../lib/generateChartImg.js")
		const generateChartImgSpy = require("../lib/generateChartImg.js")

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

		// Restore the spy
		generateChartImgSpy.mockRestore();
	}) 
})