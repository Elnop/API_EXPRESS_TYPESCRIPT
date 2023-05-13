interface RouteResponce {
	status?: number
	message: any
}

interface Route<Params = any, Body = any> {
	name: string
	type: string
	run: (query: Params, body: Body) => Promise<RouteResponce>
}