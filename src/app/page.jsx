import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Button from "../../components/ui/Button";
import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import ProgressBar from "../../components/ui/ProgressBar";
import CourseCard from "../../components/CourseCard";
import AudioRow from "../../components/AudioRow";
import NewsCard from "../../components/NewsCard";

const courses = [
  {
    id: 1,
    title: "Lecture commentée du Coran - Sourate Al-Mulk",
    date: "Samedi 1 mars 2026",
    time: "20:30",
    teacher: "Imam A. Traoré",
    tag: "Tafsir",
  },
  {
    id: 2,
    title: "Questions/Réponses - Vie familiale et spiritualité",
    date: "Dimanche 2 mars 2026",
    time: "18:00",
    teacher: "Ustadh M. Diallo",
    tag: "Q&R",
  },
  {
    id: 3,
    title: "Cours de jurisprudence - Purification",
    date: "Mercredi 5 mars 2026",
    time: "21:00",
    teacher: "Imam S. Koné",
    tag: "Fiqh",
  },
  {
    id: 4,
    title: "Rappel du soir - Patience et constance",
    date: "Vendredi 7 mars 2026",
    time: "20:45",
    teacher: "Cheikh B. Sylla",
    tag: "Rappel",
  },
];

const audios = [
  {
    id: 1,
    title: "Les bonnes intentions au quotidien",
    date: "24 février 2026",
    duration: "18 min",
    url: "/audios",
  },
  {
    id: 2,
    title: "Respect des parents: conseils pratiques",
    date: "18 février 2026",
    duration: "26 min",
    url: "/audios",
  },
  {
    id: 3,
    title: "Préparer Ramadan avec sérénité",
    date: "11 février 2026",
    duration: "31 min",
    url: "/audios",
  },
];

const news = [
  {
    id: 1,
    title: "Atelier d'accompagnement administratif pour les familles",
    date: "22 février 2026",
    excerpt:
      "Une permanence sera organisée au local pour aider les habitants dans leurs démarches courantes et orienter vers les bons services.",
    tag: "Quartier",
  },
  {
    id: 2,
    title: "Collecte solidaire: vêtements et denrées",
    date: "16 février 2026",
    excerpt:
      "La prochaine collecte aura lieu ce week-end. Les dons seront triés puis distribués aux foyers identifiés avec nos partenaires locaux.",
    tag: "Solidarité",
  },
  {
    id: 3,
    title: "Réunion d'information sur le futur centre social",
    date: "8 février 2026",
    excerpt:
      "Présentation de l'avancement du projet, des priorités d'aménagement et des prochaines étapes ouvertes aux bénévoles et aux habitants.",
    tag: "Projet",
  },
];

const project = {
  progress: 62,
  goalAmount: 150000,
  raisedAmount: 93000,
};

function formatAmount(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function HomePage() {
  const nextCourse = courses[0];
  const missingAmount = Math.max(project.goalAmount - project.raisedAmount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white text-slate-900">
      <Header />

      <main>
        <section aria-labelledby="hero-title" className="py-10 sm:py-14 lg:py-16">
          <Container>
            <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
              <div className="space-y-6">
                <Badge variant="default" className="bg-blue-50 text-blue-700 ring-blue-200">
                  Communauté · Cours · Transmission
                </Badge>

                <div className="space-y-4">
                  <h1
                    id="hero-title"
                    className="text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
                  >
                    Cours religieux en ligne
                  </h1>
                  <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                    Une plateforme simple et accessible pour suivre les cours en direct,
                    réécouter les rappels audio, et rester informé des activités de la
                    communauté Badjanani2.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button as={Link} href="/live" size="lg" className="bg-blue-700 hover:bg-blue-800 focus-visible:ring-blue-500">
                    Rejoindre le direct
                  </Button>
                  <Button
                    as={Link}
                    href="/audios"
                    variant="secondary"
                    size="lg"
                    className="bg-white text-slate-900 ring-1 ring-inset ring-slate-200 hover:bg-slate-50"
                  >
                    Écouter les audios
                  </Button>
                </div>

                <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                  <div className="rounded-xl border border-blue-100 bg-white/80 p-3">
                    <p className="font-semibold text-slate-900">Direct hebdomadaire</p>
                    <p>Sessions régulières et claires</p>
                  </div>
                  <div className="rounded-xl border border-blue-100 bg-white/80 p-3">
                    <p className="font-semibold text-slate-900">Audios disponibles</p>
                    <p>Réécoute à tout moment</p>
                  </div>
                  <div className="rounded-xl border border-blue-100 bg-white/80 p-3">
                    <p className="font-semibold text-slate-900">Infos quartier</p>
                    <p>Actualités et actions locales</p>
                  </div>
                </div>
              </div>

              <Card
                as="aside"
                className="border-blue-100 bg-white/95 shadow-md"
                padding="lg"
                ariaLabel="Prochain cours"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold text-slate-900">Prochain cours</h2>
                    <Badge className="bg-blue-50 text-blue-700 ring-blue-200">
                      En ligne
                    </Badge>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Date et heure
                    </p>
                    <p className="mt-1 text-base font-semibold text-slate-900">
                      {nextCourse.date}
                    </p>
                    <p className="text-sm text-slate-600">{nextCourse.time}</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Thème
                      </p>
                      <p className="mt-1 text-base font-semibold text-slate-900">
                        {nextCourse.title}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Intervenant
                      </p>
                      <p className="mt-1 text-sm text-slate-700">{nextCourse.teacher}</p>
                    </div>
                  </div>

                  <Button as={Link} href="/cours" variant="outline" className="w-full">
                    Voir le programme
                  </Button>
                </div>
              </Card>
            </div>
          </Container>
        </section>

        <Container>
          <Section
            title="Prochains cours"
            subtitle="Retrouvez les prochains rendez-vous en ligne. Horaires et intervenants sont indiqués pour faciliter votre organisation."
          >
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} href="/live" />
              ))}
            </div>
            <div className="mt-6">
              <Button as={Link} href="/cours" variant="outline">
                Voir tout le programme
              </Button>
            </div>
          </Section>

          <Section
            title="Derniers audios"
            subtitle="Une sélection récente pour écouter ou réécouter les rappels à votre rythme."
          >
            <ul className="space-y-3" aria-label="Liste des derniers audios">
              {audios.map((audio) => (
                <AudioRow key={audio.id} audio={audio} />
              ))}
            </ul>
            <div className="mt-6">
              <Button as={Link} href="/audios" variant="outline">
                Voir tous les audios
              </Button>
            </div>
          </Section>

          <Section
            title="Actualités du quartier"
            subtitle="Suivez les actions locales, les événements communautaires et les informations utiles."
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {news.map((item) => (
                <NewsCard key={item.id} item={item} href="/actualites" />
              ))}
            </div>
            <div className="mt-6">
              <Button as={Link} href="/actualites" variant="outline">
                Voir toutes les actualités
              </Button>
            </div>
          </Section>

          <Section
            title="Centre Social & Culturel"
            subtitle="Un projet au service des familles, des jeunes et des aînés pour renforcer le lien social et l'accompagnement du quartier."
          >
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <Card className="border-blue-100" padding="lg">
                <div className="space-y-5">
                  <p className="text-sm leading-7 text-slate-700 sm:text-base">
                    Le futur centre social et culturel proposera des activités
                    éducatives, de l&apos;accompagnement, des temps d&apos;échange et des
                    services de proximité dans un cadre accueillant et accessible.
                  </p>

                  <ul className="space-y-3" aria-label="Points clés du centre social">
                    <li className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                      Espaces adaptés pour cours, ateliers et rencontres intergénérationnelles
                    </li>
                    <li className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                      Accompagnement social et administratif pour les familles du quartier
                    </li>
                    <li className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                      Programme culturel et éducatif ouvert à tous les publics
                    </li>
                  </ul>

                  <Button as={Link} href="/centre-social" className="bg-blue-700 hover:bg-blue-800 focus-visible:ring-blue-500">
                    Découvrir le projet
                  </Button>
                </div>
              </Card>

              <div className="grid gap-4">
                <Card className="border-blue-100" padding="lg">
                  <h3 className="text-lg font-semibold text-slate-900">Avancement</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Progression estimée du projet (placeholder).
                  </p>
                  <div className="mt-4">
                    <ProgressBar
                      value={project.progress}
                      label="Travaux et préparation"
                      ariaLabel="Avancement du projet de centre social"
                      barClassName="bg-blue-700"
                      trackClassName="bg-blue-100"
                    />
                  </div>
                </Card>

                <Card className="border-blue-100" padding="lg">
                  <h3 className="text-lg font-semibold text-slate-900">Financement</h3>
                  <div className="mt-4 grid gap-3 text-sm">
                    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                      <span className="text-slate-600">Collecté</span>
                      <strong className="text-slate-900">
                        {formatAmount(project.raisedAmount)}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                      <span className="text-slate-600">Objectif</span>
                      <strong className="text-slate-900">
                        {formatAmount(project.goalAmount)}
                      </strong>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-blue-50 p-3">
                      <span className="text-blue-800">Manquant</span>
                      <strong className="text-blue-900">
                        {formatAmount(missingAmount)}
                      </strong>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </Section>

          <Section
            title="Cotisation"
            subtitle="Contribuez simplement à la vie de l'association et au maintien des activités tout au long de l'année."
          >
            <Card className="border-blue-100 bg-white" padding="lg">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-2xl text-sm leading-7 text-slate-700 sm:text-base">
                  La cotisation permet de soutenir les cours, les actions du quartier et
                  le développement des projets collectifs. Un parcours de paiement simple
                  et lisible est disponible en ligne.
                </p>
                <Button
                  as={Link}
                  href="/cotisation"
                  className="w-full bg-blue-700 hover:bg-blue-800 focus-visible:ring-blue-500 sm:w-auto"
                >
                  Accéder à la cotisation
                </Button>
              </div>
            </Card>
          </Section>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
