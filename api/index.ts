import server from './src/config/express';
import connectDB from './src/config/db';

const PORT = process.env.PORT || 3001;

async function connectServer(){
	try{
		server.listen(PORT, () => {
			console.log(`server running on port ${PORT}`);
			connectDB(); 
		});
	}catch(error){
		console.log(error);
	}}
connectServer();