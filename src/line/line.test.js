/**
* @jest-environment jsdom
*/

const fs = require("fs")
const domTesting = require('@testing-library/dom')
const { channel } = require("diagnostics_channel")
require('@testing-library/jest-dom')
const userEvent = require("@testing-library/user-event").default

function initDomFromFiles(htmlPath, jsPath) {
	const html = fs.readFileSync(htmlPath, 'utf8')
	document.open()
	document.write(html)
	document.close()
	jest.isolateModules(function() {
		require(jsPath)
	})
}

describe('Invalid chart submission',  ()=> {
    test('Create chart with empty fields error', async function() {
        initDomFromFiles(`${__dirname}/line.html`, `${__dirname}/line.js`)
		
		const errorPopup = document.querySelector('.error-popup')
		const genChartButton = domTesting.getByText(document, 'Generate chart')
		
		const { document } = window;

		const user = userEvent.setup()
		await user.click(genChartButton)
		expect(errorPopup).not.toBeNull()
		expect(errorPopup.textContent).toBe('Error: No data specified!')
	})
})