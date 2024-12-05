import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Conteneur de la vidéo */}
      <div className="video-container absolute inset-0 -z-10">
        <video
          src="/video-moon.mp4"
          type="video/mp4"
          autoPlay
          muted
          loop
          id="background-video"
          className="w-full h-full object-cover"
        ></video>
      </div>

      {/* Contenu centré */}
      <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 text-center">
        <Image
          src="/logo-b2.png"
          alt="Badjanani 2"
          width={270}
          height={270}
          className="rounded-full"
          priority
        />
        <p className="title text-white text-4xl font-bold">Badjanani 2</p>
        <p className="subtitle text-blue-500 text-lg font-semibold">
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
      </div>
    </main>
  );
}
