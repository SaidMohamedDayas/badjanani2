import Image from "next/image";
import moon from "../../../public/moon.gif";

export default function Background() {
  return (
    <div className="background-container absolute inset-0 -z-10">
      <Image id="background-image" src={moon} alt="Background" />
    </div>
  );
}
