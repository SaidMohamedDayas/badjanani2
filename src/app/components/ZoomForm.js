"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ZoomForm({ onClose }) {
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const clean = String(lastName || "").trim();
    if (!clean) {
      setError("Veuillez renseigner votre nom de famille.");
      return;
    }

    localStorage.setItem("zoomUserName", clean);
    router.push("/courses");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content bg-white p-6 rounded shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="lastName"
            placeholder="Nom de famille"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-red-500 border border-red-500 rounded-full"
            >
              X
            </button>

            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-600 rounded-lg font-semibold"
            >
              Rejoindre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
