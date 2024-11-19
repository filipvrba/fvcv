import 'fetch', 'node-fetch'

export default async def handler(req, res)
  file_id = req.query['file-id']

  unless file_id
    return res.status(400).json({ error: 'File ID is required' })
  end

  begin
    image_url = "https://drive.google.com/uc?export=view&id=#{file_id}"
    response = await fetch(image_url)

    unless response.ok
      return res.status(500).json({ error: 'Failed to fetch the image' })
    end

    image_buffer = await response.buffer()

    content_type = response.headers.get('content-type')
    base64_image = "data:#{content_type};base64,#{image_buffer.to_string('base64')}"

    res.status(200).json({ base64: base64_image })
  rescue => error
    console.error('Error fetching image:', error)
    return res.status(500).json({ error: 'Internal server error' })
  end
end