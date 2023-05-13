module.exports = {
	name: "/ping",
	type: "get",
	run: async () => { 
		return {message: "pong"}
	}
} satisfies Route