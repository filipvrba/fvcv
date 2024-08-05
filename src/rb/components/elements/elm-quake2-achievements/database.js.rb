export default class CDatabase
  def initialize(e_token)
    @e_token = e_token
  end

  def get_achievements(&callback)
    query = "
SELECT a.achievement_id, a.value
FROM achievements a
JOIN newsletter n ON a.newsletter_id = n.id
WHERE n.token = '#{@e_token}';
    "
    __bef_db.get(query) do |rows|
      if rows.length > 0
        callback(rows) if callback
      end
    end
  end # get_achievements
end