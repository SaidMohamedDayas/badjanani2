"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../../../components/ui/Container";
import Section from "../../../components/ui/Section";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";

const ZoomEmbeddedMeeting = dynamic(
  () => import("../components/ZoomEmbeddedMeeting"),
  { ssr: false },
);

export default function LivePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [draftName, setDraftName] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [zoomAttemptKey, setZoomAttemptKey] = useState(0);
  const noticeTimeoutRef = useRef(null);

  useEffect(() => {
    const storedName = localStorage.getItem("zoomUserName") || "";
    setUserName(storedName);
    setDraftName(storedName);

    const clearLiveSession = () => {
      try {
        localStorage.removeItem("zoomUserName");
      } catch (_) {}
    };

    window.addEventListener("beforeunload", clearLiveSession);
    window.addEventListener("unload", clearLiveSession);

    return () => {
      clearLiveSession();
      window.removeEventListener("beforeunload", clearLiveSession);
      window.removeEventListener("unload", clearLiveSession);
    };
  }, []);

  useEffect(() => {
    const redirectHomeAfterMeetingEnd = () => {
      try {
        localStorage.removeItem("zoomUserName");
        localStorage.removeItem("zoomMeetingNotStarted");
        localStorage.removeItem("zoomMeetingEnded");
      } catch (_) {}

      setUserName("");
      setDraftName("");
      setError("");
      setNotice("");
      setZoomAttemptKey((value) => value + 1);
      router.replace("/");

      window.setTimeout(() => {
        if (window.location.pathname !== "/") {
          window.location.replace("/");
        }
      }, 120);
    };

    const onCustomEnded = () => redirectHomeAfterMeetingEnd();
    const onStorage = (event) => {
      if (event.key === "zoomMeetingEnded" && event.newValue === "true") {
        redirectHomeAfterMeetingEnd();
      }
    };

    window.addEventListener("zoom-meeting-ended", onCustomEnded);
    window.addEventListener("storage", onStorage);

    if (localStorage.getItem("zoomMeetingEnded") === "true") {
      redirectHomeAfterMeetingEnd();
    }

    return () => {
      window.removeEventListener("zoom-meeting-ended", onCustomEnded);
      window.removeEventListener("storage", onStorage);
    };
  }, [router]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const clean = String(draftName || "").trim();
    if (!clean) {
      setError("Veuillez renseigner votre Nom.");
      return;
    }

    localStorage.setItem("zoomUserName", clean);
    setUserName(clean);
  };

  const handleResetName = () => {
    localStorage.removeItem("zoomUserName");
    setUserName("");
    setDraftName("");
    setError("");
    setZoomAttemptKey((value) => value + 1);
  };

  const showNotice = (message) => {
    setNotice(message);
    window.clearTimeout(noticeTimeoutRef.current);
    noticeTimeoutRef.current = window.setTimeout(() => {
      setNotice("");
    }, 5000);
  };

  const handleMeetingNotStarted = () => {
    localStorage.removeItem("zoomUserName");
    setUserName("");
    setError("");
    setZoomAttemptKey((value) => value + 1);
    showNotice("La réunion n'a pas encore commencé. Réessayez dans quelques minutes.");
  };

  useEffect(() => {
    return () => {
      window.clearTimeout(noticeTimeoutRef.current);
    };
  }, []);

  const hasUserName = Boolean(userName);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-white text-slate-900">
      <Header />
      {notice && (
        <div className="fixed left-1/2 top-20 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2">
          <div
            className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-lg"
            role="status"
            aria-live="polite"
          >
            {notice}
          </div>
        </div>
      )}

      <main className="flex-1 pb-8">
        <Container>
          <Section
            className="pb-6 pt-8 sm:pt-10"
            title="Cours en direct"
            subtitle="Accédez au cours Zoom depuis cette page. Renseignez votre Nom une seule fois pour rejoindre la réunion."
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-blue-50 text-blue-700 ring-blue-200">
                Accès Zoom
              </Badge>
              <Badge variant="neutral">
                {userName ? "Prêt à rejoindre" : "Nom requis"}
              </Badge>
            </div>
          </Section>

          <div
            className={[
              "grid gap-5 lg:items-start",
              hasUserName
                ? "grid-cols-1"
                : "lg:grid-cols-[360px_minmax(0,1fr)]",
            ].join(" ")}
          >
            {!hasUserName && (
              <Card
                as="aside"
                padding="lg"
                className="border-blue-100 bg-white/95"
                ariaLabel="Informations de connexion au cours"
              >
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Rejoindre le cours
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Entrez votre Nom pour générer votre accès Zoom. Les
                      informations nécessaires sont ensuite récupérées
                      automatiquement depuis le serveur.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label
                        htmlFor="live-last-name"
                        className="mb-2 block text-sm font-medium text-slate-800"
                      >
                        Nom
                      </label>
                      <input
                        id="live-last-name"
                        type="text"
                        name="lastName"
                        placeholder="Ex: Mama Iliasse"
                        value={draftName}
                        onChange={(e) => setDraftName(e.target.value)}
                        autoComplete="family-name"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-600" role="alert">
                        {error}
                      </p>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-blue-700 hover:bg-blue-800 focus-visible:ring-blue-500"
                      ariaLabel="Rejoindre la réunion Zoom"
                    >
                      Rejoindre
                    </Button>
                  </form>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                    <p className="font-medium text-slate-900">Infos</p>
                    <p className="mt-1">
                      Si le cours n&apos;est pas encore lancé, Zoom affichera un
                      message. Réessayez quelques minutes plus tard.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                    <Button
                      as={Link}
                      href="/audios"
                      variant="outline"
                      className="w-full"
                    >
                      Écouter les audios
                    </Button>
                    <Button
                      as={Link}
                      href="/"
                      variant="secondary"
                      className="w-full"
                    >
                      Retour accueil
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            <Card
              as="section"
              padding="none"
              className="overflow-hidden border-blue-100 bg-white/95 shadow-md"
              ariaLabel="Zone de réunion Zoom"
            >
              <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Salle de cours
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                      La réunion Zoom s&apos;affiche ici après validation de
                      votre nom.
                    </p>
                  </div>
                  <Badge className="bg-blue-50 text-blue-700 ring-blue-200">
                    {userName ? `Connecté: ${userName}` : "En attente"}
                  </Badge>
                </div>
                {hasUserName && (
                  <div className="mt-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleResetName}
                      ariaLabel="Changer le nom utilisé pour rejoindre"
                    >
                      Changer de nom
                    </Button>
                  </div>
                )}
              </div>

              <div className="min-h-[420px] bg-white p-4 sm:p-5">
                {userName ? (
                  <div className="w-full rounded-xl border border-slate-200 bg-white p-2">
                    <ZoomEmbeddedMeeting
                      key={`${userName}-${zoomAttemptKey}`}
                      userName={userName}
                      onMeetingNotStarted={handleMeetingNotStarted}
                    />
                  </div>
                ) : (
                  <div className="flex h-full min-h-[380px] items-center justify-center rounded-xl border border-dashed border-blue-200 bg-blue-50/40 p-6">
                    <div className="max-w-md text-center">
                      <div
                        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-white text-xl shadow-sm"
                        aria-hidden="true"
                      >
                        ▶
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        Prêt pour le direct
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Renseignez votre Nom dans le panneau de gauche puis
                        cliquez sur “Rejoindre” pour charger la réunion Zoom.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
