"use client";

import { useState, useEffect } from "react";
import { getMessage } from "../utils/contract";

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "";

  useEffect(() => {
    async function fetchMessage() {
      try {
        setLoading(true);
        const contractMessage = await getMessage();
        setMessage(contractMessage as string);
      } catch (err) {
        setError("Failed to fetch message from contract");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMessage();
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <h1 className="text-4xl font-bold text-center">
          🚀 Smart Contract Reader
        </h1>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 min-w-[300px]">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Contract Message:
          </h2>

          {loading && (
            <p className="text-center text-gray-600 dark:text-gray-400">
              Loading...
            </p>
          )}

          {error && (
            <p className="text-center text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          {!loading && !error && (
            <p className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400">
              ✨ {message}
            </p>
          )}
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row mt-4">
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href={`https://sepolia.etherscan.io/address/${contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Contract on Etherscan →
          </a>
        </div>
      </main>
    </div>
  );
}
