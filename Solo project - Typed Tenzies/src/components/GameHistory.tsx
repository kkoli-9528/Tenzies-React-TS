import { useEffect, useState } from 'react'
import type { gameSession } from '../types/types'
import toast from 'react-hot-toast';

const GameHistory = () => {
  const [sessions, setSessions] = useState<gameSession[]>([])
  const token = localStorage.getItem("token");

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  fetch('http://localhost:5000/api/games', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch sessions");
      return res.json();
    })
    .then(data => setSessions(data))
    .catch(err => {
      console.error("Fetch error:", err);
      toast.error("Failed to load your game history");
    });
}, []);

  return (
    <div className="mt-10 w-full max-w-md text-left">
      <h2 className="text-xl font-bold mb-2">Previous Games</h2>
      <ul className="space-y-2 text-sm text-gray-700">
        {sessions.map((session, idx) => (
          <li key={idx} className="bg-gray-100 p-3 rounded-md shadow-sm">
            <div><strong>Rolls:</strong> {session.rolls}</div>
            <div><strong>Duration:</strong> {session.duration}s</div>
            <div><strong>Date:</strong> {new Date(session.date).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GameHistory
