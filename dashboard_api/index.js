import express from 'express';
import { userRouter } from './users/users.js';

const port = 8000;
const app = express();

app.use((req, res, next) => {
	console.log('request time is: ', new Date().toLocaleString())
	next()
})

app.get('/hello', (req, res) => {
	// res.send({ key: 'value' })
	throw new Error('some error text')
})

app.use('/users', userRouter)

app.use((err, req, res, next) => {
	console.log(err.message)
	res.status(500).send(err.message)
})

app.listen(port, () => {
	console.log('server started')
})




































// ===================================================
// app.all('/path')
// app.use('/path')
// app.use(callback)

// app.use((err, req, res, next) => {
// 	console.log(err.message)
// 	res.status(500).send(err.message)
// })

// app.get('/hello', cb, (req, res) => {
	// res.send({ key: 'value' })
	// res.status(201).send({ key: 'value' })
	// res.json({ key: 'value' })
	// res.download('/test.pdf', 'test.pdf')
	// res.redirect(301, 'https://example.com')

	// res.set('Content-Type', 'text/plain')
	// res.append('some header', 'some text')
	// res.send('hello')

	// res.type('application/json')
	// res.send('hello')

	// res.location('')
	// res.links({
	// 	some_link: '',
	// 	some_link: ''
	// })

	// res.cookie('name', 'value', {
	// 	domain: '',
	// 	path: '/',
	// 	secure: true,
	// 	expires: 600
	// })
	// res.clearCookie('name', { path: '/' })

	// res.end()
// })









