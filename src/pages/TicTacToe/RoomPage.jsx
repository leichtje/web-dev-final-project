import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://game-room-api.fly.dev/api/rooms';

export default function RoomPage({ onRoomJoin }) {
  const [inputRoomID, setInputRoomID] = useState("");

  const handleJoin = async () => {
    if (!inputRoomID) return alert("Enter a room ID.");
    try {
      const response = await axios.get(`${API_BASE_URL}/${inputRoomID}`);
      onRoomJoin(inputRoomID, response.data.gameState);
    } catch (error) {
      alert("Room not found.");
    }
  };

  const handleCreate = async () => {
    const response = await axios.post(API_BASE_URL, {
      initialState: {
        board: [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ],
        currentPlayer: 'X',
      },
    });
    onRoomJoin(response.data.roomId, response.data.gameState);
  };

  return (
    <div>
      <h2>Join a Room</h2>
      <input
        type="text"
        value={inputRoomID}
        placeholder="Enter Room ID"
        onChange={(e) => setInputRoomID(e.target.value)}
      />
      <button onClick={handleJoin}>Join Room</button>
      <hr />
      <h2>Or Create a New Room</h2>
      <button onClick={handleCreate}>Create Room</button>
    </div>
  );
}
