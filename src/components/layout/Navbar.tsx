"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } = {} } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();

    const { data: { subscription } = {} } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="flex justify-between p-4 bg-white border-b">
      <div className="font-bold text-green-600">GolfCharity</div>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-sm text-slate-600">{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-slate-100 px-4 py-2 rounded-lg hover:bg-slate-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-slate-600">
              Login
            </Link>
            <Link href="/register" className="bg-green-600 text-white px-4 py-2 rounded-lg">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
