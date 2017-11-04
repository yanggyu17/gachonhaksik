var redis = {};

redis.keyofvita = 'MEALS:VITA';
redis.keyofareum = 'MEALS:AREUM';
redis.keyofchang = 'MEALS:CHANG';
redis.keys_pattern = 'MEALS:*';

redis.getByKey = (reqCache, key, callback) => {
  return reqCache.get(key, callback);
};

redis.setByKey = (reqCache, key, value, callback) => {
  return reqCache.set(key, value, callback);
};

redis.deleteByKeyPattern = (reqCache, key, callback) => {
  reqCache.keys(key, (err, keyList) => {
    return reqCache.del(keyList, callback);
  });
};

module.exports = redis;
