interface Controller {
	route: string
	methode: string
	run: (props: any) => Promise<ControllerResponce>
}

interface ControllerResponce {
	status?: number
	error?: string
	data: any
}