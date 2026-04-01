"use client";

import { GlassCard } from "@/components/ui/card";
import { Users, Trophy, Target, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AdminPanel() {
  // In a real app, you would fetch these numbers from Supabase
  const stats = [
    { label: "Total Players", value: "128", icon: Users, color: "text-blue-500" },
    { label: "Total Rounds", value: "1,450", icon: Target, iconColor: "text-emerald-500" },
    { label: "Charity Raised", value: "£12,400", icon: Trophy, iconColor: "text-amber-500" },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Admin Control</h1>
            <p className="text-muted-foreground text-lg">Platform-wide overview and impact tracking.</p>
          </div>
          <Link href="/dashboard">
            <button className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, index) => (
            <GlassCard key={index} className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-background/50 ${stat.iconColor}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
        
        <GlassCard className="p-8 text-center border-dashed border-2">
          <p className="text-muted-foreground">User Management Table coming soon...</p>
        </GlassCard>
      </div>
    </div>
  );
}