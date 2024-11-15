'use client';

import { useState } from 'react';

export default function HomePage() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    setImageUrl(null);

    try {
      const response = await fetch('/api/generateImage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setImageUrl(data.imageUrl); // Update this key based on the response structure
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen w-full flex flex-col items-center justify-center relative mx-auto py-10 md:py-0 overflow-y-auto">
      {/* Spotlight effect in the left corner using radial gradient with increased opacity */}
      <div
        className="absolute inset-0 bg-black opacity-80 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at left top, rgba(255, 255, 255, 0.4), transparent 50%, black 100%)',
          backgroundSize: '150%',
        }}
      ></div>

      <div className="p-4 relative z-10 w-full text-center flex flex-col items-center flex-grow">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 md:mb-10 pt-6 md:pt-8 text-glow">
          Generate an AI Image
        </h1>

        <div className="flex flex-col items-center w-full max-w-md">
          {/* Textarea for multiline input */}
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter image prompt"
            className="w-full p-3 text-black rounded-lg mb-4 resize-none"
            rows={4} // Can adjust this number to allow more lines
          />
          <button
            onClick={generateImage}
            disabled={loading}
            className={`w-full px-6 py-3 text-lg rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 transition transform ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
            }`}
          >
            {loading ? 'Generating...' : 'Generate Image'}
          </button>
        </div>

        {/* Display the generated image */}
        {imageUrl && (
          <div className="mt-8 w-full flex justify-center">
            <div className="relative max-w-lg w-full">
              <img
                src={imageUrl}
                alt="Generated by AI"
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
