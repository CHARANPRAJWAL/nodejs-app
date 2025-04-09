const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
};

export const addUser = async (user: { name: string; email: string }) => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
};

export const deleteUser = async (id: number) => {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
  });
  return res.json();
};
