"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ScoresPage() {
  const [score, setScore] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [recentScores, setRecentScores] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInitialScores = async (id: string) => {
    const { data, error } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", id)
      .order("created_at", { ascending: false })
      .limit(5);

    if (error) {
      console.error("Error fetching scores:", error.message);
      setRecentScores([]);
    } else {
      setRecentScores(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        await fetchInitialScores(user.id);
      } else {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel("realtime-scores")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "scores" },
        (payload) => {
          if (!payload.new) return;
          setRecentScores((prevScores) => [payload.new, ...prevScores].slice(0, 5));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const scoreVal = parseInt(score, 10);
    if (!supabase || !userId || scoreVal < 1 || scoreVal > 45) return;

    const { data: currentScores } = await supabase
      .from("scores")
      .select("id")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (currentScores && currentScores.length >= 5) {
      const oldestId = currentScores[currentScores.length - 1].id;
      await supabase.from("scores").delete().eq("id", oldestId);
    }

    const { data: inserted, error } = await supabase
      .from("scores")
      .insert([{ score: scoreVal, user_id: userId }])
      .select();

    if (error) {
      console.error("Insert error:", error.message);
      return;
    }

    if (inserted && inserted.length > 0) {
      setRecentScores((prevScores) => [inserted[0], ...prevScores].slice(0, 5));
    }

    setScore("");
  };

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">Log Your Stableford Score</h1>

      <form onSubmit={handleSubmit} className="mb-10 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <label className="block text-sm font-medium text-slate-700 mb-2">Stableford Points (1-45)</label>
        <div className="flex gap-4">
          <input
            type="number"
            min="1"
            max="45"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="Enter points..."
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors"
          >
            Add Score
          </button>
        </div>
      </form>

      <h2 className="text-xl font-bold mb-4">Your Last 5 Rounds</h2>
      <div className="space-y-3">
        {recentScores.map((s) => (
          <div key={s.id} className="flex justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-semibold text-slate-700">{new Date(s.created_at).toLocaleDateString()}</span>
            <span className="text-green-600 font-black">{s.score} Points</span>
          </div>
        ))}
        {recentScores.length === 0 && !isLoading && <p className="text-slate-400">No scores logged yet.</p>}
      </div>
    </div>
  );
}
