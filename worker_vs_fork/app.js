const { Worker } = require('worker_threads');
const { fork } = require('child_process');
const { performance, PerformanceObserver } = require('perf_hooks');

const testArr = [1, 2, 3];

const performanceObserver = new PerformanceObserver(items => {
	items.getEntries().forEach(item => {
		console.log(`${item.name}: ${item.duration}`)
	})
})
performanceObserver.observe({ entryTypes: ['measure'] })

function runWorker() {
	return new Promise((resolve, reject) => {
		performance.mark('worker start')
		const worker = new Worker('./worker.js', {
			workerData: {
				arr: testArr
			}
		});

		worker.on('message', data => {
			performance.mark('worker end')
			console.log(performance.measure('worker measure', 'worker start', 'worker end'))
			resolve(data)
		})
	})
}

function runFork() {
	return new Promise((resolve, reject) => {
		performance.mark('fork start')
		const forkProcc = fork('fork.js');
		forkProcc.send(testArr)
		forkProcc.on('message', data => {
			performance.mark('fork end')
			console.log(performance.measure('fork measure', 'fork start', 'fork end'))
			resolve(data)
		})
	})
}

async function compare() {
	const workerResult = await runWorker();
	// console.log(workerResult)

	const forkResult = await runFork();
	// console.log(forkResult)
}

compare()




// console.log(process.env.UV_THREADPOOL_SIZE)


// const crypto = require('crypto');

// const start = performance.now();

// for (let i = 0; i < 30; i++) {
// 	crypto.pbkdf2('test', 'salt', 500000, 64, 'sha512', () => {
// 		console.log(performance.now() - start)
// 	})
// }
































