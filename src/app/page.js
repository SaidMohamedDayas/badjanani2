import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="video-container">
        <video
          src="/video-moon.mp4"
          type="video/mp4"
          autoPlay
          muted
          loop
          id="background-video"
        ></video>
        <div>
          <Image
            src="/logo-b2.png"
            alt="Badjanani 2"
            width={270}
            height={270}
            className="img rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            priority
          />
          <p className="title">Badjanani 2</p>
          <p className="subtitle">
            Formulaire d&apos;inscription pour la sortie du 28 Décembre 2024
          </p>
          <a
            href="https://forms.office.com/Pages/ResponsePage.aspx?id=lGJLFC2VhkuHqqqL8peaR6aCMqFMfjVFr2r2j2HffLRUOEFYWldLMEU1Mk9OSTRIR0lDVVpVNlZLTS4u"
            target="_blank"
            className="actuality flex mt-8 items-center font-bold"
          >
            Cliquez ici pour vous inscrire à la sortie
          </a>
        </div>
      </div>
    </main>
  );
}
