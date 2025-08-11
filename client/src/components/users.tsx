import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001', { transports: ['websocket'] });

export const Users = () => {
  const [users, setUsers] = useState<Record<string, number | string>>({});

  useEffect(() => {
    const handler = (payload: { users: Record<string, number | string> }) => {
      setUsers(payload.users || {});
    };
    socket.on('room:update', handler);
    return () => {
      socket.off('room:update', handler);
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full bg-gray-800 py-4 px-3 rounded-lg shadow-lg z-50">
      <h2 className="text-white font-bold mb-2">Connected Users</h2>
      <p className="text-sm text-gray-400">
        {Object.entries(users).map(([id]) => (
          <span key={id}>{id}, </span>
        ))}
      </p>
    </div>
  );
};