import 'fetch', 'node-fetch'

export default async def handler(req, res)
  file_id = req.query.file_id

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

    res.set_header('Content-Type', response.headers.get('content-type'))
    res.set_header('Cache-Control', 'public, max-age=3600')
    return res.status(200).send(image_buffer)
  rescue => error
    console.error('Error fetching image:', error)
    return res.status(500).json({ error: 'Internal server error' })
  end
end