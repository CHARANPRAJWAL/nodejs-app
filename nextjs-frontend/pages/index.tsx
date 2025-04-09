// pages/index.tsx
import { useEffect, useState } from "react";
import { fetchUsers, addUser, deleteUser } from "../utils/api";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const loadUsers = async () => {
    const data = await fetchUsers();
    setUsers(data);
  };

  const handleAdd = async () => {
    if (!name || !email) return;
    await addUser({ name, email });
    setName("");
    setEmail("");
    loadUsers();
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">👥 Users</h1>

        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-2">➕ Add New User</h2>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              className="flex-1 border border-gray-300 rounded px-3 py-2"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="flex-1 border border-gray-300 rounded px-3 py-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <span>
                <strong>{user.name}</strong> ({user.email})
              </span>
              <button
                className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
