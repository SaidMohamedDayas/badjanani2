"use client";
import { useState, useEffect } from "react";
import Background from "./components/Background";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Image from "next/image";
import ZoomForm from "./components/ZoomForm";

export default function Home() {
  const [showZoomForm, setShowZoomForm] = useState(false);
  const [showMeetingNotStarted, setShowMeetingNotStarted] = useState(false);

  useEffect(() => {
    // Vérifier si on revient d'une réunion non commencée
    const meetingNotStarted = localStorage.getItem("zoomMeetingNotStarted");
    if (meetingNotStarted === "true") {
      localStorage.removeItem("zoomMeetingNotStarted");
      setShowMeetingNotStarted(true);

      // Masquer la modale après 3 secondes
      setTimeout(() => {
        setShowMeetingNotStarted(false);
      }, 3000);
    }
  }, []);

  return (
    <div className="relative min-h-screen">
      <Background />
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 text-center">
        <Image
          src="/B2-Logo.png"
          alt="Badjanani 2"
          width={270}
          height={270}
          className="rounded-full"
          priority
        />
        {/* <p className="title text-white text-4xl font-bold">Badjanani 2</p> */}
        <p className="subtitle text-custom-blue text-lg font-semibold">
          Payez votre cotisation en ligne sur PayPal <br /> N&apos;oubliez pas
          de sélectionner l&apos;option &quot;entre amis&quot;
        </p>
        <a
          href="https://www.paypal.me/assoB2"
          target="_blank"
          rel="noopener noreferrer"
          className="actuality inline-block text-white border-2 border-white py-3 px-6 rounded-lg font-bold hover:bg-white hover:text-blue-500 transition"
        >
          Cliquez ici pour payer
        </a>
        <p className="subtitle text-custom-blue text-lg font-semibold">
          Cours religieux
        </p>
        <button
          onClick={() => setShowZoomForm(true)}
          className="actuality inline-block text-white border-2 border-white py-3 px-6 rounded-lg font-bold hover:bg-white hover:text-blue-500 transition"
        >
          Cliquez ici pour accéder au cours
        </button>
      </main>
      <Footer />
      {showZoomForm && <ZoomForm onClose={() => setShowZoomForm(false)} />}
      {showMeetingNotStarted && (
        <div className="modal-overlay">
          <div className="modal-content p-6">
            <p className="text-white text-xl font-semibold">
              Le cours n&apos;a pas encore commencé
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
