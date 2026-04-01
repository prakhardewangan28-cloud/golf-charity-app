"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/card";
import { Trophy, Target, Heart, Plus, Sparkles, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import UserGreeting from "@/components/layout/UserGreeting";

export default function DashboardOverview() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newScore, setNewScore] = useState("");
  const [scoreError, setScoreError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [stats, setStats] = useState({ totalContribution: 0, totalEntries: 0 });
  const [recentRounds, setRecentRounds] = useState<any[]>([]);

  const fetchDashboardData = async (userId: string) => {
    const [{ data: scoreData }, { data: roundsData }] = await Promise.all([
      supabase.from("scores").select("score").eq("user_id", userId),
      supabase
        .from("scores")
        .select("id,score,created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

    if (scoreData) {
      const totalScore = scoreData.reduce((sum: number, item: any) => sum + (item.score ?? 0), 0);
      setStats({
        totalContribution: totalScore,
        totalEntries: Math.floor(totalScore / 5),
      });
    }

    if (roundsData) {
      setRecentRounds(
        roundsData.map((round: any) => ({
          id: round.id,
          score: round.score,
          course: "Recent Round",
          date: round.created_at ? new Date(round.created_at).toLocaleDateString() : "",
          par: 72,
          hcpDiff:
            typeof round.score === "number"
              ? `${round.score - 72 >= 0 ? "+" : ""}${round.score - 72}`
              : "0",
        })),
      );
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } = {} } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
      } else {
        await fetchDashboardData(session.user.id);
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  if (loading) return <div className="p-10 text-center">Loading your dashboard...</div>;

  const handleScoreSubmit = async (scoreVal: number) => {
    if (!scoreVal || scoreVal < 1 || scoreVal > 45) {
      setScoreError("Please enter a Stableford score between 1 and 45.");
      return;
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      alert("Please log in");
      return;
    }

    const { data: currentScores } = await supabase
      .from("scores")
      .select("id")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (currentScores && currentScores.length >= 5) {
      const oldestId = currentScores[currentScores.length - 1].id;
      await supabase.from("scores").delete().eq("id", oldestId);
    }

    const { error } = await supabase.from("scores").insert([
      { score: scoreVal, user_id: user.id },
    ]);

    if (error) {
      console.error("Error saving score:", error.message);
      return;
    }

    await fetchDashboardData(user.id);
    setNewScore("");
    setIsAdding(false);
    setScoreError("");
    setSuccessMessage("Score submitted successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      <UserGreeting />
      {/* STATUS OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <GlassCard className="p-6 h-full flex flex-col justify-center bg-gradient-to-br from-primary/5 to-secondary/10 border-primary/20">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-primary/70 mb-1">Impact Tier</p>
                <div className="text-3xl font-bold text-primary flex items-center">
                  Gold <Sparkles className="w-5 h-5 ml-2 text-accent" />
                </div>
              </div>
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                <Trophy className="w-6 h-6 text-accent" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-primary/10 flex justify-between items-center text-sm">
              <span className="text-primary/70">Next draw entries</span>
              <span className="font-bold text-primary">{stats.totalEntries} Entries</span>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <Card className="p-6 h-full">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-foreground/50 mb-1">Handicap</p>
                <div className="text-3xl font-bold flex items-center">
                  14.2
                  <span className="text-sm font-medium text-green-500 ml-2 flex items-center bg-green-50 px-2 py-0.5 rounded-full">
                    <TrendingDown className="w-3 h-3 mr-1" /> 1.1
                  </span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
              <span className="text-foreground/50">Rounds this year</span>
              <span className="font-semibold">24</span>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
          <Card className="p-6 h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-secondary/10 transition-colors" />
            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className="text-sm font-medium text-foreground/50 mb-1">Supported Charity</p>
                <div className="text-xl font-bold leading-tight">Clean Water Initiative</div>
              </div>
              <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center shrink-0">
                <Heart className="w-6 h-6 text-rose-500" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 relative z-10 w-full text-sm">
              <div className="flex justify-between mb-2">
                <span className="text-foreground/50">Total Contribution</span>
                <span className="font-semibold text-primary">${stats.totalContribution}.00</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full w-[75%]" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* RECENT SCORES & ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Recent Rounds</h2>
            <Button variant="ghost" className="text-primary">View All</Button>
          </div>
          
          <Card className="overflow-hidden">
            <div className="divide-y divide-gray-100">
              {recentRounds.length > 0 ? (
                recentRounds.map((round, i) => (
                  <div key={round.id ?? i} className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors">
                    <div>
                      <div className="font-semibold text-foreground/90">{round.course}</div>
                      <div className="text-sm text-foreground/50">{round.date}</div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right hidden sm:block">
                        <div className="text-sm font-medium">To Par: {(round.score - round.par) > 0 ? "+" : ""}{round.score - round.par}</div>
                        <div className={cn("text-xs font-semibold", round.hcpDiff.startsWith("-") ? "text-green-500" : "text-foreground/40")}>
                          Diff: {round.hcpDiff}
                        </div>
                      </div>
                      <div className="text-2xl font-bold w-12 text-center text-primary">{round.score}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-slate-500">No recent rounds logged yet.</div>
              )}
            </div>
            <div className="p-4 bg-gray-50 border-t flex justify-center">
              {isAdding ? (
              <div className="w-full flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max="45"
                    value={newScore}
                    onChange={(e) => setNewScore(e.target.value)}
                    className="flex-1 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Stableford Points (1-45)"
                  />
                  <button
                    type="button"
                    onClick={() => handleScoreSubmit(parseInt(newScore, 10))}
                    className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdding(false);
                      setScoreError("");
                    }}
                    className="bg-slate-100 text-slate-600 px-4 py-3 rounded-xl hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                </div>
                {scoreError && <p className="text-sm text-rose-500">{scoreError}</p>}
                {successMessage && <p className="text-sm text-emerald-600">{successMessage}</p>}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAdding(true)}
                className="w-full bg-green-600 text-white flex items-center justify-center gap-2 py-4 rounded-xl font-bold hover:bg-green-700 transition-all active:scale-95"
              >
                <span className="text-xl">+</span>
                Post New Score
              </button>
            )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-tight">Upcoming Draw</h2>
          
          <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-amber-400 to-yellow-500 p-6 shadow-xl">
            {/* 1. Add a subtle dark overlay for text contrast */}
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                The Open Championship VIP Package
              </h3>
              <p className="text-slate-800 text-sm leading-relaxed mb-6 opacity-90">
                2 tickets to the final round, VIP hospitality access, and a custom TaylorMade fitting experience.
              </p>

              {/* 2. Enhanced Stat Box with Glassmorphism */}
              <div className="rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 p-5 mb-6">
                <p className="text-slate-900 text-xs font-bold uppercase tracking-wider mb-1">
                  Your current entries
                </p>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-4xl font-black text-slate-900">12</span>
                  <span className="text-slate-700 font-medium">/ target 20</span>
                </div>

                {/* 3. High-Contrast Progress Bar */}
                <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-900 rounded-full transition-all duration-500"
                    style={{ width: '60%' }}
                  />
                </div>
              </div>

              {/* 4. Action Button */}
              <button className="mt-6 w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg active:scale-95">
                See Details
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Ensure cn is accessible if not imported naturally in the snippet. (Should be provided by our utils)
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}
