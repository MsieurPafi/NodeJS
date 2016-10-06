/**
 * Module dependencies.
 */

const models = require('../../database');

/**
 * Export the user API with its own routes.
 */

exports.register = function (server, options, next) {
	server.route({
		method: 'POST',
		path: '/users',
		handler: (request, reply) => {
			const data = 
				request.payload ||
				request.params ||
				request.body;

			models.user.create(data)
				.then(result => {
					return reply(result)
				})
				.catch(err => {
					return reply({
						error: err.message
					})
				})
		}
	})

	server.route({
		method: "GET",
		path: '/users',
		handler: (request, reply) => {
			models.user.findAll()
				.then(result => {
					return reply(result);
				})
				.catch(err => {
					return reply({
						error: err.message
					})
				})
		}
	});

	server.route({
		method: 'GET',
		path: '/users/{id}',
		handler: (request, reply) => {
			const data =
				request.payload ||
				request.params ||
				request.body;

			models.user.findById(data.id)
				.then(result => {
					return reply(result);
				})
				.catch(err => {
					return reply({
						error: err.message
					})
				})
		}
	});

	server.route({
		method: 'PUT',
		path: '/users/{id}',
		handler: (request, reply) => {
			const data =
				request.payload ||
				request.params ||
				request.body;

			models.user.update({
				    first_name: data.first_name,
				    last_name: data.last_name,
				    biography: data.biography
				  },
				  {
				    where: { 
				    	id: encodeURIComponent(request.params.id)
				    	//usign request.params.id instead of data bc there is a id field in payload but it's null (params' isn't)
				    }
				  })
				.then(result => {
					return reply(result);
				})
				.catch(err => {
					return reply({
						error: err.message
					})
				})
		}
	})

	server.route({
		method: 'DELETE',
		path: '/users/{id}',
		handler: (request, reply) => {
			const data =
				request.payload ||
				request.params ||
				request.body;

			models.user.destroy({
					where: {
						id: encodeURIComponent(request.params.id)
					}
				})
				.then(result => {
					return reply(result);
				})
				.catch(err => {
					return reply({
						error: err.message
					})
				})
		}
	})

	server.route({
		method: 'GET',
		path: '/users/{id}/tweets',
		handler: (request, reply) => {
			const data =
				request.payload ||
				request.params ||
				request.body;

			const resultFix = null;

			models.tweet.findAll({
					where: {
						user_id: data.id
					}
				})
				.then(result => {
					return reply(result);
				})
				.catch(err => {
					return reply({
						error: err.message
					})
				})
		}
	})

  	next();
};

exports.register.attributes = {
  name: 'users'
};
