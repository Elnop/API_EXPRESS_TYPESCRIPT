import { readdir } from 'node:fs/promises'
import { Express, Request, Response } from 'express'

async function setupRoutes(app: Express)
{
	const controllers = await readdir(`${__dirname}/controllers`)
	for (const controllerFileName of controllers)
	{
		console.log(`loading ${controllerFileName}`)
		let controller: Controller = require(__dirname+"/controllers/"+controllerFileName)
		let routeCallback = async (req: Request, res: Response) => {
			try {
				let controllerRes = await controller.run(req.body)
				let status = controllerRes.status ? controllerRes.status : 200
				res.status(status).send(controllerRes.data)
			} catch (error) {
				console.error(error)
				res.status(500).send("server error")
			}
		}
		switch (controller.methode) {
			case "all":
				app.all(controller.route, routeCallback)
			case "get":	
				app.get(controller.route, routeCallback)
				break;
			case "post":	
				app.post(controller.route, routeCallback)
				break;
			case "put":  
				app.put(controller.route, routeCallback)
				break;
			case "delete":	
				app.delete(controller.route, routeCallback)
				break;
			default:
				console.error(`can't use methode ${controller.methode}`)
				break;
		}
		console.log(`route (${controller.methode}) ${controller.route} OK`)
	}
}

export default setupRoutes