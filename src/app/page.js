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
          <p className="subtitle">Site en construction</p>
          <a
            href="https://www.facebook.com/people/Actualit%C3%A9-B2/100083339030768/?sk=about"
            target="_blank"
            className="actuality flex mt-8 items-center font-bold"
          >
            Cliquez ici pour suivre sur Facebook l&apos;actualité de B2
          </a>
        </div>
      </div>
    </main>
  );
}
