module.exports = {
	name: "/echo",
	type: "post",
	run: async (params, body) => {
		return {message: body}
	}
} satisfies Route