export default class CDatabase {
  constructor(eToken) {
    this._eToken = eToken
  };

  getAchievements(callback) {
    let query = `
SELECT a.achievement_id, a.value
FROM achievements a
JOIN newsletter n ON a.newsletter_id = n.id
WHERE n.token = '${this._eToken}';
    `;

    return _BefDb.get(query, (rows) => {
      if (rows.length > 0) if (callback) return callback(rows)
    })
  }
}