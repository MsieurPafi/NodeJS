/**
 * Define the tweet model.
 */

module.exports = (database, types) => {
  return database.define('tweet', {
    content: {
      type: types.TEXT,
      allowNull: false,
      validate: {
        min: 1,
        max: 140
      }
    }
  }, {
    underscored: true,
    classMethods: {
      associate: models => {
        models.tweet.belongsTo(models.user);
      }
    }
  });
};
