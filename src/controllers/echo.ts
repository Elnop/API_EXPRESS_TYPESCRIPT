let route: Controller = {
	route: "/echo",
	methode: "post",
	run: async (props) => { 
		return {data: props}
	}
}

module.exports = route