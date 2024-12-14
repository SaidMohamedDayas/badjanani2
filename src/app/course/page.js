import Header from "../components/Header";
import Footer from "../components/Footer";
import ZoomForm from "../components/ZoomForm";

export default function Course() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow px-4">
        <h1 className="text-2xl font-bold mb-4">Accès au cours religieux</h1>
        <ZoomForm />
      </main>
      <Footer />
    </div>
  );
}
