/**
 * Module dependencies.
 */

const models = require('../../database');
const passwordHash = require('password-hash');


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

			var hashedPassword = passwordHash.generate(data.password);


			models.user.create({
				username: data.username,
				first_name: data.first_name,
				last_name: data.last_name,
				biography: data.biography,
				password: hashedPassword,
				email: data.email
			})
				.then(result => {
					return reply(result)
				})
				.catch(err => {
					return reply({
						error: err.message
					})
				})

			// models.user.create(data)
			// 	.then(result => {
			// 		return reply(result)
			// 	})
			// 	.catch(err => {
			// 		return reply({
			// 			error: err.message
			// 		})
			// 	})
		}
	});

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
	});

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
	});

	server.route({
		method: 'GET',
		path: '/users/{id}/tweets',
		handler: (request, reply) => {
			const data =
				request.payload ||
				request.params ||
				request.body;

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
	});

 

	server.route({
		method: 'GET',
		path: '/users/{id}/following',
		handler: (request, reply) => {
			const data = 
				request.payload ||
				request.params ||
				request.body;

			models.user.findAll({
				// include: [
				// database.users_following, {//il faut trouver comment rejoindre la table de followers
				// 	where: {
				// 		follower_id: data.id 
				// 	}
				// }]	
				where: {
						
				},
				include: [{
					model: models.user, //here we need to reach the users_follower table
		      		where: {
		      			follower_id: data.id
		      		}
				}]	
			})
					
			.then(result => {
				return reply(result);
			})
			.catch(err => {
				console.log(err);
				return reply({
					error: err.message
				})
			})
		}
	});

  	next();
};

exports.register.attributes = {
  name: 'users'
};
