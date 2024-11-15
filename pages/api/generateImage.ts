import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { prompt } = req.body;

      const response = await axios.post(
        'https://api.limewire.com/api/image/generation',
        {
          prompt: prompt,
          aspect_ratio: '1:1', // Adjust this based on your needs
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Api-Version': 'v1',
            Accept: 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_LIMEWIRE_API_KEY}`, // Use your Limewire API key here
          },
        }
      );

      // Extract the image URL from the response
      const imageUrl = response.data.data[0].asset_url;

      res.status(200).json({ imageUrl });
    } catch (error) {
      console.error('Error generating image:', error);
      res.status(500).json({ message: 'Failed to generate image' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}