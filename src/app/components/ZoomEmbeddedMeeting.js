"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";
import apiClient from "../api/apiClient";

export default function ZoomEmbeddedMeeting({ userName }) {
  const meetingRef = useRef(null);
  const clientRef = useRef(null);
  const [error, setError] = useState("");
  const hasStartedRef = useRef(false);
  const versionRef = useRef(0);
  const router = useRouter();

  useEffect(() => {
    const currentVersion = ++versionRef.current;
    const containerElement = meetingRef.current;

    async function startMeeting() {
      try {
        setError("");

        if (!userName || currentVersion !== versionRef.current) {
          hasStartedRef.current = false;
          return;
        }

        if (hasStartedRef.current) {
          return;
        }

        const waitForContainer = async () => {
          for (let i = 0; i < 30; i += 1) {
            if (!meetingRef.current) {
              await new Promise((resolve) => requestAnimationFrame(resolve));
              continue;
            }

            const { width, height } =
              meetingRef.current.getBoundingClientRect();
            if (width > 0 && height > 0) {
              return true;
            }

            await new Promise((resolve) => requestAnimationFrame(resolve));
          }

          return false;
        };

        const containerReady = await waitForContainer();
        if (!containerReady || currentVersion !== versionRef.current) {
          hasStartedRef.current = false;
          return;
        }

        hasStartedRef.current = true;
        meetingRef.current.innerHTML = "";

        const response = await apiClient.post("/zoom/signature", {
          userName,
        });

        const {
          signature,
          meetingNumber,
          userName: returnedUserName,
          passcode,
        } = response.data;

        if (!signature || !meetingNumber) {
          throw new Error("Réponse Zoom invalide.");
        }

        await new Promise((resolve) => requestAnimationFrame(resolve));

        clientRef.current = ZoomMtgEmbedded.createClient();

        await clientRef.current.init({
          zoomAppRoot: meetingRef.current,
          language: "fr-FR",
          patchJsMedia: true,
          leaveOnPageUnload: true,
        });

        // Délai critique : s'assurer que l'init est vraiment complet
        await new Promise((resolve) => setTimeout(resolve, 500));

        try {
          if (clientRef.current?.on) {
            clientRef.current.on("connection-change", (payload) => {
              const state = payload?.state || payload?.status;
              if (
                state === "Closed" ||
                state === "Disconnected" ||
                state === "Ended"
              ) {
                router.push("/");
              }
            });

            clientRef.current.on("meeting-status", (payload) => {
              const status = payload?.status || payload?.meetingStatus;
              if (
                status === 3 ||
                status === "Ended" ||
                status === "Disconnected"
              ) {
                router.push("/");
              }
            });
          }
        } catch (eventError) {
          console.warn("Zoom events not supported:", eventError);
        }

        const joinConfig = {
          signature,
          meetingNumber,
          userName: returnedUserName,
          password: passcode || "",
        };

        if (currentVersion === versionRef.current && hasStartedRef.current) {
          await clientRef.current.join(joinConfig);
        }
      } catch (err) {
        if (currentVersion === versionRef.current) {
          console.error(err);
          hasStartedRef.current = false;

          // Détecter si la réunion n'a pas commencé
          const errorMessage = err?.message || err?.reason || String(err);
          const errorCode = err?.errorCode || err?.code;

          if (
            errorCode === 3008 ||
            errorCode === "3008" ||
            errorMessage.includes("not started") ||
            errorMessage.includes("pas commencé")
          ) {
            // Cleanup complet AVANT redirection
            try {
              if (clientRef.current) {
                await clientRef.current.leaveMeeting?.();
                await clientRef.current.destroy?.();
                clientRef.current = null;
              }
              await ZoomMtgEmbedded.destroyClient();

              if (meetingRef.current) {
                meetingRef.current.innerHTML = "";
              }
            } catch (_) {}

            // Attendre que le cleanup soit terminé
            await new Promise((resolve) => setTimeout(resolve, 100));

            // Stocker le message et rediriger vers l'accueil
            try {
              localStorage.setItem("zoomMeetingNotStarted", "true");
              localStorage.removeItem("zoomUserName");
            } catch (_) {}

            // Utiliser window.location pour forcer une vraie navigation
            window.location.href = "/";
            return;
          }

          setError("Impossible de démarrer la réunion.");
        }
      }
    }

    startMeeting();

    return () => {
      hasStartedRef.current = false;

      try {
        if (clientRef.current) {
          clientRef.current.leaveMeeting?.();
          clientRef.current.destroy?.();
          clientRef.current = null;
        }

        ZoomMtgEmbedded.destroyClient();
      } catch (_) {}

      if (containerElement) {
        containerElement.innerHTML = "";
      }
    };
  }, [userName, router]);

  if (error) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
        {error}
      </div>
    );
  }

  return <div ref={meetingRef} className="w-full" style={{ height: "80vh" }} />;
}
