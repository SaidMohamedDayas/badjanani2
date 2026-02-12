"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ZoomEmbeddedMeeting from "../components/ZoomEmbeddedMeeting";

export default function CoursesPage() {
  const [userName, setUserName] = useState("");
  const [draftName, setDraftName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("zoomUserName") || "";
    setUserName(storedName);
    setDraftName(storedName);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const clean = String(draftName || "").trim();
    if (!clean) {
      return;
    }

    localStorage.setItem("zoomUserName", clean);
    setUserName(clean);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-6">Cours en direct</h1>

        {userName ? (
          <div className="w-full max-w-6xl flex flex-col items-center gap-4">
            <ZoomEmbeddedMeeting userName={userName} />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm flex flex-col gap-3"
          >
            <input
              type="text"
              name="lastName"
              placeholder="Nom de famille"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-600 rounded-lg font-semibold"
            >
              Rejoindre
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
