"use client";
import { useState } from "react";
import Background from "./components/Background";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Image from "next/image";
import ZoomForm from "./components/ZoomForm";

export default function Home() {
  const [showZoomForm, setShowZoomForm] = useState(false);

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
          Formulaire d&apos;inscription pour la sortie du 28 Décembre 2024
        </p>
        <a
          href="https://forms.office.com/Pages/ResponsePage.aspx?id=lGJLFC2VhkuHqqqL8peaR6aCMqFMfjVFr2r2j2HffLRUOEFYWldLMEU1Mk9OSTRIR0lDVVpVNlZLTS4u"
          target="_blank"
          rel="noopener noreferrer"
          className="actuality inline-block text-white border-2 border-white py-3 px-6 rounded-lg font-bold hover:bg-white hover:text-blue-500 transition"
        >
          Cliquez ici pour vous inscrire à la sortie
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
    </div>
  );
}
