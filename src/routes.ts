import { readdir } from 'node:fs/promises'
import { Express, Request, Response } from 'express'

async function setupRoutes(app: Express)
{
	const routes = await readdir(`${__dirname}/routes`)
	for (const routeFileName of routes)
	{
		console.log(`loading ${routeFileName}`)
		let route: Route = require(__dirname+"/routes/"+routeFileName)
		let routeCallback = async (req: Request, res: Response) => {
			try {
				let routeRes = await route.run(req.query, req.body)
				let status = routeRes.status ? routeRes.status : 200
				res.status(status).send(routeRes.message)
			} catch (error) {
				console.error(error)
				res.status(500).send("server error")
			}
		}
		switch (route.type) {
			case "all":
				app.all(route.name, routeCallback)
			case "get":	
				app.get(route.name, routeCallback)
				break;
			case "post":	
				app.post(route.name, routeCallback)
				break;
			case "put":  
				app.put(route.name, routeCallback)
				break;
			case "delete":	
				app.delete(route.name, routeCallback)
				break;
			default:
				console.error(`can't use type ${route.type}`)
				break;
		}
		console.log(`route (${route.type}) ${route.name} OK`)
	}
}

export default setupRoutes