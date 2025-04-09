import { useState } from "react";
import { addUser } from "../utils/api";
import { useRouter } from "next/router";

export default function AddUser() {
  const [form, setForm] = useState({ name: "", email: "" });
  const router = useRouter();

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await addUser(form);
    router.push("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
