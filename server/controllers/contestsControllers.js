import Entry from "../models/entryModel.js";

export const submitEntry = async (req, res) => {
  try {
    const { theme, influencerId, title, description } = req.body;
    const imageFile = req.file;

    if (!theme || !influencerId || !title || !description || !imageFile) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const imagePath = `/uploads/${imageFile.filename}`;

    const newEntry = new Entry({ theme, influencerId, title, description, imagePath });
    await newEntry.save();

    res.status(201).json({ message: "Entry submission successful", entryId: newEntry._id, newEntry: newEntry });
  } catch (error) {
    res.status(500).json({ error: 'Server error while submitting entry' });
  }
};

export const voteOnEntry = async (req, res) => {
  try {
    const { entryId, amountCents } = req.body;

    if (!entryId || typeof amountCents !== 'number') {
      return res.status(400).json({ error: 'Invalid vote payload' });
    }

    const votesToAdd = Math.floor(amountCents * 0.6);
    const entry = await Entry.findById(entryId);

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    entry.votes += votesToAdd;
    await entry.save();

    res.status(201).json({ message: "Voting successful", votes: entry.votes, entry: entry });
  } catch (error) {
    res.status(500).json({ error: 'Server error while voting' });
  }
};
