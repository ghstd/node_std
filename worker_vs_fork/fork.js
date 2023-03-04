function bigCalc(data) {
	for (let i = 0; i < 100000000; i++) {
		for (let j = 0; j < data.length; j++) {
			data[j] = data[j] + i
		}
	}

	return data
}

process.on('message', data => {
	const result = bigCalc(data);
	process.send(result)
	process.disconnect()
})































