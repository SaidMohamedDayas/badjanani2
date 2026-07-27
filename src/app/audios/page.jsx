"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../../../components/ui/Container";
import Section from "../../../components/ui/Section";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";

// Données mock V1 (remplacer par vraies URLs audio)
const audios = [
  {
    id: 1,
    title: "Les bonnes intentions au quotidien",
    date: "24 février 2026",
    teacher: "Imam A. Traoré",
    duration: "18 min",
    url: "/audio/placeholder-intentions.mp3",
    tags: ["Rappel", "Spiritualité"],
  },
  {
    id: 2,
    title: "Respect des parents: conseils pratiques",
    date: "18 février 2026",
    teacher: "Ustadh M. Diallo",
    duration: "26 min",
    url: "/audio/placeholder-parents.mp3",
    tags: ["Famille", "Éthique"],
  },
  {
    id: 3,
    title: "Préparer Ramadan avec sérénité",
    date: "11 février 2026",
    teacher: "Cheikh B. Sylla",
    duration: "31 min",
    url: "/audio/placeholder-ramadan.mp3",
    tags: ["Ramadan", "Rappel"],
  },
  {
    id: 4,
    title: "La patience dans les épreuves",
    date: "2 février 2026",
    teacher: "Imam S. Koné",
    duration: "22 min",
    url: "/audio/placeholder-patience.mp3",
    tags: ["Spiritualité", "Rappel"],
  },
  {
    id: 5,
    title: "Vie de quartier: entraide et responsabilité",
    date: "28 janvier 2026",
    teacher: "Ustadh M. Diallo",
    duration: "19 min",
    url: "/audio/placeholder-quartier.mp3",
    tags: ["Quartier", "Solidarité"],
  },
  {
    id: 6,
    title: "Questions-réponses: purification",
    date: "20 janvier 2026",
    teacher: "Imam A. Traoré",
    duration: "34 min",
    url: "/audio/placeholder-purification.mp3",
    tags: ["Fiqh", "Q&R"],
  },
];

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "00:00";
  const total = Math.floor(seconds);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function normalizeText(value) {
  return value.toLowerCase().trim();
}

function AudioFilters({
  query,
  onQueryChange,
  tags,
  activeTag,
  onTagChange,
  resultsCount,
}) {
  return (
    <Card className="border-blue-100" padding="lg" ariaLabel="Filtres audio">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="audio-search"
            className="mb-2 block text-sm font-medium text-slate-800"
          >
            Rechercher un audio
          </label>
          <input
            id="audio-search"
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Rechercher par titre..."
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-describedby="audio-search-help"
          />
          <p id="audio-search-help" className="mt-2 text-xs text-slate-500">
            {resultsCount} résultat{resultsCount > 1 ? "s" : ""} affiché
            {resultsCount > 1 ? "s" : ""}.
          </p>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-slate-800">Filtrer par tag</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Tags audio">
            {tags.map((tag) => {
              const active = activeTag === tag;

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onTagChange(tag)}
                  aria-pressed={active}
                  className={[
                    "rounded-full px-3 py-1.5 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                    active
                      ? "bg-blue-700 text-white"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-800",
                  ].join(" ")}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}

function AudioListItem({ audio, isActive, isPlaying, onPrimaryAction }) {
  const actionLabel = isActive && isPlaying ? "Pause" : "Lire";

  return (
    <Card
      as="li"
      hoverable
      className={[
        "border transition-colors",
        isActive ? "border-blue-200 bg-blue-50/50" : "border-slate-200 bg-white",
      ].join(" ")}
      ariaLabel={`Audio: ${audio.title}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <Badge className="bg-blue-50 text-blue-700 ring-blue-200">
              {audio.date}
            </Badge>
            <Badge variant="neutral">{audio.duration}</Badge>
            {audio.tags.map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </div>

          <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
            {audio.title}
          </h3>
          <p className="mt-1 text-sm text-slate-600">{audio.teacher}</p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {isActive && (
            <span
              className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200"
              aria-live="polite"
            >
              {isPlaying ? "Lecture..." : "En pause"}
            </span>
          )}
          <Button
            onClick={() => onPrimaryAction(audio)}
            variant={isActive ? "secondary" : "primary"}
            className={isActive ? "" : "bg-blue-700 hover:bg-blue-800 focus-visible:ring-blue-500"}
            ariaLabel={`${actionLabel} l'audio ${audio.title}`}
          >
            {actionLabel}
          </Button>
        </div>
      </div>
    </Card>
  );
}

function AudioList({ items, selectedAudioId, isPlaying, onPrimaryAction }) {
  if (!items.length) {
    return (
      <Card className="border-slate-200" padding="lg">
        <p className="text-sm leading-7 text-slate-600">
          Aucun audio ne correspond à votre recherche. Essayez un autre mot-clé
          ou retirez un filtre.
        </p>
      </Card>
    );
  }

  return (
    <ul className="space-y-3" aria-label="Liste des audios">
      {items.map((audio) => (
        <AudioListItem
          key={audio.id}
          audio={audio}
          isActive={selectedAudioId === audio.id}
          isPlaying={selectedAudioId === audio.id && isPlaying}
          onPrimaryAction={onPrimaryAction}
        />
      ))}
    </ul>
  );
}

function StickyPlayer({
  audioRef,
  currentAudio,
  isPlaying,
  currentTime,
  duration,
  canGoPrev,
  canGoNext,
  onTogglePlay,
  onPrev,
  onNext,
  onSkipBack,
  onSkipForward,
  onSeek,
  onLoadedMetadata,
  onTimeUpdate,
  onEnded,
  onPlay,
  onPause,
}) {
  if (!currentAudio) return null;

  return (
    <div className="sticky bottom-0 z-50 border-t border-blue-100 bg-white/95 backdrop-blur">
      <Container className="py-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge className="bg-blue-50 text-blue-700 ring-blue-200">
                  Lecture en cours
                </Badge>
                {currentAudio.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="neutral">
                    {tag}
                  </Badge>
                ))}
              </div>

              <p className="truncate text-sm text-slate-600">{currentAudio.teacher}</p>
              <h2 className="truncate text-base font-semibold text-slate-900 sm:text-lg">
                {currentAudio.title}
              </h2>

              <div className="mt-3">
                <label htmlFor="audio-progress" className="sr-only">
                  Progression audio
                </label>
                <input
                  id="audio-progress"
                  type="range"
                  min={0}
                  max={duration > 0 ? duration : 0}
                  step={1}
                  value={Math.min(currentTime, duration || 0)}
                  onChange={(event) => onSeek(Number(event.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-label="Barre de progression audio"
                />
                <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                  <span>{formatTime(currentTime)}</span>
                  <span>{duration > 0 ? formatTime(duration) : "--:--"}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={onPrev}
                disabled={!canGoPrev}
                ariaLabel="Audio précédent"
              >
                Précédent
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onSkipBack}
                ariaLabel="Reculer de 10 secondes"
              >
                -10s
              </Button>
              <Button
                size="sm"
                onClick={onTogglePlay}
                className="bg-blue-700 hover:bg-blue-800 focus-visible:ring-blue-500"
                ariaLabel={isPlaying ? "Mettre en pause" : "Lancer la lecture"}
              >
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onSkipForward}
                ariaLabel="Avancer de 10 secondes"
              >
                +10s
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={onNext}
                disabled={!canGoNext}
                ariaLabel="Audio suivant"
              >
                Suivant
              </Button>
            </div>
          </div>

          <audio
            ref={audioRef}
            src={currentAudio.url}
            preload="metadata"
            onLoadedMetadata={onLoadedMetadata}
            onTimeUpdate={onTimeUpdate}
            onEnded={onEnded}
            onPlay={onPlay}
            onPause={onPause}
          >
            Votre navigateur ne supporte pas la lecture audio.
          </audio>
        </div>
      </Container>
    </div>
  );
}

export default function AudiosPage() {
  const audioRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("Tous");
  const [selectedAudioId, setSelectedAudioId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);

  const allTags = useMemo(() => {
    const unique = new Set(audios.flatMap((audio) => audio.tags));
    return ["Tous", ...Array.from(unique)];
  }, []);

  const filteredAudios = useMemo(() => {
    const q = normalizeText(searchQuery);

    return audios.filter((audio) => {
      const matchQuery = !q || normalizeText(audio.title).includes(q);
      const matchTag = activeTag === "Tous" || audio.tags.includes(activeTag);
      return matchQuery && matchTag;
    });
  }, [searchQuery, activeTag]);

  const selectedAudio =
    audios.find((audio) => audio.id === selectedAudioId) || null;

  const activeQueue = useMemo(() => {
    if (selectedAudioId && filteredAudios.some((audio) => audio.id === selectedAudioId)) {
      return filteredAudios;
    }
    return filteredAudios.length ? filteredAudios : audios;
  }, [filteredAudios, selectedAudioId]);

  const currentIndex = activeQueue.findIndex((audio) => audio.id === selectedAudioId);
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex >= 0 && currentIndex < activeQueue.length - 1;

  function playAudioElement() {
    const el = audioRef.current;
    if (!el) return;

    const playPromise = el.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        setIsPlaying(false);
      });
    }
  }

  function pauseAudioElement() {
    audioRef.current?.pause();
  }

  function selectAudio(audio, autoplay = true) {
    setSelectedAudioId(audio.id);
    setCurrentTime(0);
    setDuration(0);
    setShouldAutoplay(autoplay);
  }

  function togglePlay() {
    if (!selectedAudio) return;

    if (isPlaying) {
      pauseAudioElement();
      return;
    }

    playAudioElement();
  }

  function goToRelative(offset) {
    if (currentIndex < 0) return;
    const nextIndex = currentIndex + offset;
    if (nextIndex < 0 || nextIndex >= activeQueue.length) return;
    selectAudio(activeQueue[nextIndex], true);
  }

  function seekTo(nextTime) {
    const el = audioRef.current;
    if (!el) return;

    const next = Math.max(0, Math.min(nextTime, duration || 0));
    el.currentTime = next;
    setCurrentTime(next);
  }

  function skipBy(seconds) {
    const el = audioRef.current;
    if (!el) return;
    seekTo((el.currentTime || 0) + seconds);
  }

  useEffect(() => {
    if (!selectedAudio || !audioRef.current) return;

    const el = audioRef.current;
    el.load();
    setCurrentTime(0);
    setDuration(0);

    if (shouldAutoplay) {
      playAudioElement();
      setShouldAutoplay(false);
    }
  }, [selectedAudioId, selectedAudio, shouldAutoplay]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white text-slate-900">
      <Header />

      <main className={selectedAudio ? "pb-36 sm:pb-32" : ""}>
        <Container>
          <Section
            className="pb-6 pt-8 sm:pt-10"
            title="Audios"
            subtitle="Bibliothèque des anciens cours et rappels. Recherchez un thème, filtrez par tag et écoutez directement depuis la page."
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-blue-50 text-blue-700 ring-blue-200">
                Bibliothèque audio
              </Badge>
              <Badge variant="neutral">{audios.length} pistes</Badge>
            </div>
          </Section>

          <div className="space-y-5">
            <AudioFilters
              query={searchQuery}
              onQueryChange={setSearchQuery}
              tags={allTags}
              activeTag={activeTag}
              onTagChange={setActiveTag}
              resultsCount={filteredAudios.length}
            />

            <Section
              as="section"
              className="py-0"
              title="Liste des audios"
              subtitle="Cliquez sur “Lire” pour lancer la lecture dans le mini player en bas."
            >
              <AudioList
                items={filteredAudios}
                selectedAudioId={selectedAudioId}
                isPlaying={isPlaying}
                onPrimaryAction={(audio) => {
                  if (selectedAudioId === audio.id) {
                    togglePlay();
                    return;
                  }
                  selectAudio(audio, true);
                }}
              />
            </Section>
          </div>
        </Container>
      </main>

      <StickyPlayer
        audioRef={audioRef}
        currentAudio={selectedAudio}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
        onTogglePlay={togglePlay}
        onPrev={() => goToRelative(-1)}
        onNext={() => goToRelative(1)}
        onSkipBack={() => skipBy(-10)}
        onSkipForward={() => skipBy(10)}
        onSeek={seekTo}
        onLoadedMetadata={(event) => {
          const nextDuration = Number(event.currentTarget.duration);
          setDuration(Number.isFinite(nextDuration) ? nextDuration : 0);
        }}
        onTimeUpdate={(event) => {
          setCurrentTime(event.currentTarget.currentTime || 0);
        }}
        onEnded={() => {
          if (canGoNext) {
            goToRelative(1);
            return;
          }
          setIsPlaying(false);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <Footer />
    </div>
  );
}
