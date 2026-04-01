"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function UserGreeting() {
  const [userName, setUserName] = useState<string>("User");

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } = {} } = await supabase.auth.getUser();
      if (user?.user_metadata?.full_name) {
        setUserName(user.user_metadata.full_name.split(" ")[0]);
      } else if (user?.email) {
        setUserName(user.email.split("@")[0]);
      }
    };
    getUser();
  }, []);

  return (
    <h1 className="text-2xl font-bold text-slate-900">
      Welcome back, {userName}
    </h1>
  );
}
