import "../styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Badjanani 2",
  description: "Site internet de Badjanani 2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="font-sans">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
