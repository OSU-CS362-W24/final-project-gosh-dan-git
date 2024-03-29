
/**
 * This function makes an HTTP POST request to the QuickChart API to generate
 * a chart image.  Once the chart image is generated and returned by the API,
 * a URL representing the image is returned (within a Promise) from this
 * function.
 *
 * More information on the QuickChart API can be found here:
 *
 *   https://quickchart.io/documentation/
 *
 * @param type A string indicating what kind of chart to draw.  Must be one
 *   of "line", "scatter", or "bar".
 * @param data An array of x,y data points.  Should have the following format:
 *   [
 *     { x: ..., y: ... },
 *     { x: ..., y: ... },
 *     { x: ..., y: ... },
 *     ...
 *   ]
 * @param xLabel A string specifying the label for the X axis of the chart.
 * @param yLabel A string specifying the label for the Y axis of the chart.
 * @param title An optional string specifying the title of the chart.  If not
 *   specified, no title is drawn.
 * @param color An optional string specifying the color of the chart.  This
 *   can be any valid CSS color string (e.g. a hex color or CSS keyword color).
 *
 * @return Returns a JS Promise that resolves to a URL representing the chart
 *   image generated by the QuickCharts API based on the specified parameters.
 */
module.exports = async function generateChartImg(type, data, xLabel, yLabel, title, color) {
    const reqBody = generateQuickChartReq(type, data, xLabel, yLabel, title, color)
    //console.log(JSON.stringify(reqBody, null, 2))
    const res = await fetch("https://quickchart.io/chart", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (res.ok) {
        const blob = await res.blob()
        const imgUrl = URL.createObjectURL(blob)
        return imgUrl
    } else {
        const err = await res.text()
        throw Error(err)
    }
}

/*
 * This is a utility function that generates a properly formatted request body
 * for the QuickChart API.  As you can see, the necessary request body is
 * fairly complex.  More information on the QuickChart API can be found here:
 *
 *   https://quickchart.io/documentation/
 *
 * @param type A string indicating what kind of chart to draw.  Must be one
 *   of "line", "scatter", or "bar".
 * @param data An array of x,y data points.  Should have the following format:
 *   [
 *     { x: ..., y: ... },
 *     { x: ..., y: ... },
 *     { x: ..., y: ... },
 *     ...
 *   ]
 * @param xLabel A string specifying the label for the X axis of the chart.
 * @param yLabel A string specifying the label for the Y axis of the chart.
 * @param title An optional string specifying the title of the chart.  If not
 *   specified, no title is drawn.
 * @param color An optional string specifying the color of the chart.  This
 *   can be any valid CSS color string (e.g. a hex color or CSS keyword color).
 *
 * @return Returns an object that can be passed to JSON.stringify() to serve
 *   as a POST request body to the QuickChart API.
 */
function generateQuickChartReq(type, data, xLabel, yLabel, title, color) {
    return {
        format: "png",
        version: "4",
        chart: {
            type: type,
            data: {
                datasets: [
                    {
                        data: data
                    }
                ]
            },
            options: {
                datasets: {
                    line: type === "line" && {
                        borderColor: color,
                        borderWidth: 2
                    },
                    bar: type === "bar" && {
                        backgroundColor: color,
                    },
                    scatter: type === "scatter" && {
                        borderColor: color,
                        backgroundColor: color,
                        borderWidth: 1
                    },
                },
                scales: {
                    x: {
                        type: type === "bar" ? undefined : "linear",
                        beginAtZero: type === "scatter",
                        title: {
                            display: true,
                            text: xLabel
                        }
                    },
                    y: {
                        type: "linear",
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: yLabel
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: title && {
                        display: true,
                        text: title
                    }
                }
            }
        }
    }
}
