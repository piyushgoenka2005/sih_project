const dotenv = require('dotenv');
const { app, server } = require("./app");

dotenv.config();

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => {
	console.log(`Server is running at ${PORT}`);
});
