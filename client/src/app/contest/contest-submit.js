"use client"

import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({
    theme: 'BakingBonanza',
    influencerId: 'INF_123',
    title: '',
    description: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [entryId, setEntryId] = useState('');
  const [voteAmount, setVoteAmount] = useState(25);
  const [voteResult, setVoteResult] = useState(null);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('theme', form.theme);
    formData.append('influencerId', form.influencerId);
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('image', imageFile);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contests/submit`, {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    console.log("Submission data: ", data);
    
    if (data.entryId) setEntryId(data.entryId);
  };

  const handleVote = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contests/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entryId, amountCents: voteAmount })
    });
    const data = await res.json();
    console.log("Voting data: ", data);
    
    setVoteResult(data);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-4 text-black">Submit Contest Entry</h1>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <input
            className="w-full border border-gray-500 bg-white text-black p-2 rounded placeholder-gray-500"
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <textarea
            className="w-full border border-gray-500 bg-white text-black p-2 rounded placeholder-gray-500"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border border-gray-500 bg-white text-black p-2 rounded placeholder-gray-500"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          <button className="bg-blue-600 text-white cursor-pointer px-4 py-2 rounded hover:bg-blue-700">
            Submit Entry
          </button>
        </form>

        {entryId && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-black">✅ Entry Submitted</h2>
            <p className="text-sm text-gray-500">entryId: {entryId}</p>

            <div className="mt-4">
              <h3 className="font-semibold text-black">Vote on This Entry</h3>
              <input
                type="number"
                className="border px-2 py-1.5 rounded mr-2 text-black border-gray-500"
                value={voteAmount}
                onChange={(e) => setVoteAmount(parseInt(e.target.value))}
              />
              <button
                onClick={handleVote}
                className="bg-green-600 text-white cursor-pointer px-4 py-2 rounded hover:bg-green-700"
              >
                Vote
              </button>
            </div>

            {voteResult && (
              <div className="mt-4 text-sm bg-green-100 p-2 rounded text-black">
                ✅ {voteResult.message} — Total Votes: {voteResult.votes}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
