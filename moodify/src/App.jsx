import "./App.css";
import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [musicLink, setMusicLink] = useState("");
  const [mood, setMood] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [musicLinks, setMusicLinks] = useState([]);

  const handleAddMusic = async (e) => {
    e.preventDefault();
    try {
      const embedLink = musicLink.includes("watch?v=")
        ? musicLink.replace("watch?v=", "embed/")
        : musicLink;
      console.log("Formatted Link: ", embedLink);
      await axios.post("http://localhost:8000/addmusic", {
        link: embedLink,
        mood,
      });
      setMusicLink("");
      setMood("");
      alert("Music link added successfully");
    } catch (error) {
      console.error("Error adding music link:", error);
    }
  };

  const handleGetMusic = async () => {
    try {
      console.log("Selected Mood:", selectedMood);
      const response = await axios.get(
        `http://localhost:8000/getmusic/${selectedMood}`
      );
      console.log("Fetched Links:", response.data.links);
      setMusicLinks(response.data.links);
    } catch (error) {
      console.error("Error fetching music links:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="newmusic">
          <form onSubmit={handleAddMusic}>
            <label htmlFor="amusic">
              Add new Music for different moods to listen in future
            </label>
            <br />
            <input
              type="text"
              id="amusic"
              placeholder="Enter your music link"
              value={musicLink}
              onChange={(e) => setMusicLink(e.target.value)}
            />
            <select
              id="musicl"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            >
              <option value="">Choose Mood</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="angry">Angry</option>
              <option value="relaxed">Relaxed</option>
              <option value="excited">Excited</option>
              <option value="romantic">Romantic</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="listenmusic">
          <h2>Listen what you feel</h2>
          <label htmlFor="cmusic">Choose your mood</label>
          <select
            id="cmusic"
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
          >
            <option value="">Choose Mood</option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="angry">Angry</option>
            <option value="relaxed">Relaxed</option>
            <option value="excited">Excited</option>
            <option value="romantic">Romantic</option>
          </select>
          <button onClick={handleGetMusic}>Submit</button>
          <div className="music">
            {musicLinks.map((link, index) => (
              <iframe
                key={index}
                id="musicplayer"
                src={link}
                title={`YouTube video player ${index}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
