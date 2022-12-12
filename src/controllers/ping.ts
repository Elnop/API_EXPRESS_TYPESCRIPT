let route: Controller = {
	route: "/ping",
	methode: "get",
	run: async (props) => { 
		return {data: "pong"}
	}
}

module.exports = route