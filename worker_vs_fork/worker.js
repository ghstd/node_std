const { parentPort, workerData } = require('worker_threads')

function bigCalc() {
	for (let i = 0; i < 100000000; i++) {
		for (let j = 0; j < workerData.arr.length; j++) {
			workerData.arr[j] = workerData.arr[j] + i
		}
	}
	parentPort.postMessage(workerData.arr)
}

bigCalc()





















