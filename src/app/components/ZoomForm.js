"use client";
import { useState } from "react";
import apiClient from "../api/apiClient";
import ZoomMeeting from "./ZoomMeeting";

export default function ZoomForm({ onClose }) {
  const [formData, setFormData] = useState({
    lastName: "",
    memberId: "",
  });
  const [firstName, setFirstName] = useState("");
  const [error, setError] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await apiClient.get(`/members/${formData.memberId}`);
      const member = response.data;
      if (
        member &&
        member.firstName &&
        member.lastName.toUpperCase() === formData.lastName.toUpperCase()
      ) {
        setFirstName(member.firstName);
        setIsAuthorized(true);
      } else {
        setError("Nom de famille ou numéro d'adhérent incorrect.");
      }
    } catch (error) {
      setError("Erreur lors de la vérification des informations.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content bg-white p-6 rounded shadow-lg">
        {!isAuthorized ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="lastName"
              placeholder="Nom de famille"
              value={formData.lastName}
              onChange={handleChange}
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <input
              type="text"
              name="memberId"
              placeholder="Numéro d'adhérent"
              value={formData.memberId}
              onChange={handleChange}
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="p-1 text-white rounded-full border border-green-500 flex items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center text-red-500 border border-red-500 rounded-full"
                disabled={isLoading}
              >
                X
              </button>
            </div>
          </form>
        ) : (
          <ZoomMeeting firstName={firstName} />
        )}
      </div>
    </div>
  );
}
