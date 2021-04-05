const mongo = require('../mongodb.js');
const profileSchema = require('../schemas/profile-schema.js');

const pointsCache = {};

module.exports = (client) => {};

module.exports.addPoints = async (guildId, userId) => {
    return await mongo().then(async mongoose => {
        try {
            console.log('Running findOneAndUpdate()');

            const result = await profileSchema.findOneAndUpdate({
                guildId,
                userId,
            },
            {
                guildId,
                userId,
                $inc: {
                    points,
                },
            },
            {
                upsert: true,
                new: true,
            });

            console.log('RESULT: ', result);

            pointsCache[`${guildId}-${userId}`] = result.points;

                coins = result.points;

            return result.points;
        } finally {
            mongoose.connection.close();
        }
    })
}

module.exports.getPoints = async (guildId, userId) => {
    const cachedValue = pointsCache[`${guildId}-${userId}`]
    if (cachedValue) {
      return cachedValue
    }
  
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running findOne()')
  
        const result = await profileSchema.findOne({
          guildId,
          userId,
        })
  
        console.log('RESULT:', result)
  
        let points = 0
        if (result) {
          points = result.points
        } else {
          console.log('Inserting a document')
          await new profileSchema({
            guildId,
            userId,
            points,
          }).save()
        }
  
        pointsCache[`${guildId}-${userId}`] = points;
  
        return points
      } finally {
        mongoose.connection.close()
      }
    })
  }