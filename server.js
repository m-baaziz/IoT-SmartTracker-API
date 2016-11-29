import express from 'express'
import morgan from 'morgan'

const app = express();

app.use(morgan('combined'))
	.get('/devices', (req, res) => {
	res.json({"devices": ["Device1", "Device2", "BlaBla"]});
});

app.listen(8080);