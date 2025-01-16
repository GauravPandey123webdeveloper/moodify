const Music = require('../models/musicmodel');
const addMusicLink = async (req, res) => {
    const { mood, link } = req.body;
    console.log(req.body);
    try {
        let music = await Music.findOne({ mood });
        if (music) {
            music.links.push(link);
        } else {
            music = new Music({ mood, links: [link] });
        }

        await music.save();
        res.status(200).send({ message: 'Music link added successfully', music });
    } catch (error) {
        res.status(500).send({ message: 'Error adding music link', error });
    }
};
const getMusicLinks = async (req, res) => {
    const { mood } = req.params;
    try {
        const music = await Music.findOne({ mood });
        if (music) {
            res.status(200).send({ links: music.links });
        } else {
            res.status(404).send({ message: 'No music found for this mood' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving music links', error });
    }
};

module.exports = { addMusicLink, getMusicLinks };
