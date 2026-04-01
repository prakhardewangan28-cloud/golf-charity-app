"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { GlassCard } from "@/components/ui/card";
import { Users, Trophy, Target, ArrowLeft, ShieldAlert, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminPanel() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const router = useRouter();

  // 1. SECURITY CHECK: Only allow the specific Admin email
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const adminEmail = "dhoteraj574@gmail.com"; 

      if (!user || user.email !== adminEmail) {
        setIsAdmin(false);
        // Kick them out after 3 seconds
        setTimeout(() => router.push("/dashboard"), 3000);
      } else {
        setIsAdmin(true);
      }
    };
    checkUser();
  }, [router]);

  // Loading state while checking credentials
  if (isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin w-10 h-10 text-primary" />
      </div>
    );
  }

  // Access Denied UI
  if (isAdmin === false) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-background">
        <ShieldAlert className="w-20 h-20 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
        <p className="text-muted-foreground text-lg">You do not have permission to view this page.</p>
        <p className="text-sm text-muted-foreground mt-4 italic">Redirecting you back to your dashboard...</p>
      </div>
    );
  }

  // 2. ADMIN UI (Only shows if logged in as dhoteraj574@gmail.com)
  const stats = [
    { label: "Total Players", value: "2", icon: Users, color: "text-blue-500" },
    { label: "Total Rounds", value: "48", icon: Target, color: "text-emerald-500" },
    { label: "Charity Raised", value: "£1,240", icon: Trophy, color: "text-amber-500" },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Admin Control</h1>
            <p className="text-muted-foreground text-lg">Platform-wide overview and user management.</p>
          </div>
          <Link href="/dashboard">
            <button className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, index) => (
            <GlassCard key={index} className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-background/50 ${stat.color}`}>
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
        
        {/* User Management Table */}
        <GlassCard className="overflow-hidden border-white/20">
           <div className="p-6 border-b border-white/10 bg-white/5">
              <h2 className="font-semibold text-xl">Active Users</h2>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-6 py-4">User Email</th>
                    <th className="px-6 py-4">Account Status</th>
                    <th className="px-6 py-4">Permission Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="px-6 py-4">dhoteraj574@gmail.com</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded-full">System Admin</span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">Owner</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">prakhardewangan28@gmail.com</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">Active</span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">Standard User</td>
                  </tr>
                </tbody>
              </table>
           </div>
        </GlassCard>
      </div>
    </div>
  );
}