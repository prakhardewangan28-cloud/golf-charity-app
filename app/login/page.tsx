"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/card";
import { ArrowRight, Mail, Lock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setIsLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-60 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/3" />

      <Link href="/" className="flex items-center space-x-2 mb-10 relative z-10">
        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
          <span className="text-accent font-bold text-2xl">G</span>
        </div>
        <span className="text-2xl font-bold tracking-tight text-foreground">
          GolfCharity
        </span>
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <GlassCard className="p-8 md:p-10 shadow-2xl border-white/40">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h1>
            <p className="text-foreground/60">Log in to track your scores and impact.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="pl-12"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="pl-12"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                <span className="text-foreground/70">Remember me</span>
              </label>
              <Link href="#" className="font-medium text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="default" className="w-full text-lg h-12" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-foreground/60">
            Don't have an account?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline transition-colors">
              Start your journey
            </Link>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
