"use client";

import { cloneElement, isValidElement } from "react";
import Image from "next/image";
import { ArrowRight, Target, Heart, Trophy, CheckCircle2, Star } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// Temporary placeholder components to fix the "Module Not Found" error
const Button = ({ children, className = "", variant = "default", size = "md", asChild = false, ...props }: any) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const variantStyles =
    variant === "outline"
      ? "bg-transparent text-foreground/90 border border-primary/20 hover:bg-white/10"
      : "bg-green-600 text-white hover:bg-green-700";
  const sizeStyles = size === "lg" ? "px-6 py-3 text-base h-14" : "px-4 py-2 text-sm h-12";
  const classes = `${baseStyles} ${variantStyles} ${sizeStyles} ${className}`.trim();

  if (asChild && isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return cloneElement(child, {
      className: [child.props.className, classes].filter(Boolean).join(" "),
      ...props,
    });
  }

  return (
    <button {...props} className={classes}>
      {children}
    </button>
  );
};

const Card = ({ children, className }: any) => (
  <div className={`bg-white p-6 rounded-xl border shadow-sm ${className}`}>{children}</div>
);

// Keep other placeholders like CardHeader, CardContent, etc. as needed
const CardHeader = ({ children, className = "", ...props }: any) => (
  <div {...props} className={className}>
    {children}
  </div>
);
const CardContent = ({ children, className = "", ...props }: any) => (
  <div {...props} className={className}>
    {children}
  </div>
);
const CardTitle = ({ children, className = "", ...props }: any) => (
  <h3 {...props} className={`font-bold ${className}`}>
    {children}
  </h3>
);
const GlassCard = ({ children, className = "", ...props }: any) => (
  <div {...props} className={`backdrop-blur-md bg-white/30 ${className}`}>
    {children}
  </div>
);

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2670&auto=format&fit=crop"
            alt="Charity Impact"
            className="w-full h-full object-cover opacity-10 blur-2xl scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white" />
        </div>
        {/* Background Gradients */}
        <div className="absolute inset-0 -z-10 bg-background">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl opacity-50 -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="container mx-auto px-4 max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
              Play. Win. Give Back.
            </h1>
            <p className="text-xl text-foreground/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join the premium golf community where every round you log supports verified global charities and earns you entries into exclusive VIP reward draws.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="accent" size="lg" className="w-full sm:w-auto shadow-xl shadow-accent/20 text-lg h-14" asChild>
                <Link href="/register">
                  Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg h-14 bg-white/50 backdrop-blur-md border-primary/10" asChild>
                <Link href="#how-it-works">Learn More</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative mx-auto max-w-5xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 bottom-0 h-32 mt-auto" />
            <GlassCard className="p-2 pt-6 sm:p-4 rounded-[2rem] border-white/40 bg-white/40 shadow-2xl">
              <div className="aspect-[16/9] rounded-[1.5rem] overflow-hidden relative border border-white/50 bg-slate-50">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/40 via-cyan-100/30 to-sky-200/30" />
                <div className="absolute left-[-30%] top-[-15%] w-72 h-72 rounded-full bg-emerald-400/30 blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute right-[-20%] top-12 w-80 h-80 rounded-full bg-sky-400/30 blur-3xl animate-blob animation-delay-4000" />
                <div className="absolute left-1/2 bottom-[-10%] w-64 h-64 rounded-full bg-teal-300/30 blur-3xl animate-blob" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.6),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.45),transparent_30%)] pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center mx-auto mb-6 transform rotate-3 hover:rotate-6 transition-all">
                    <Trophy className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">Modern Dashboard</h3>
                  <p className="text-primary/70 max-w-sm mx-auto">Track your impact in real-time with our beautiful companion app.</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-white relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">How GolfCharity Works</h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              A seamless experience designed to reward your passion while amplifying your positive impact on the world.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "1. Log Your Scores", desc: "Sync your handicap and post your rounds directly in our app." },
              { icon: Heart, title: "2. Support A Cause", desc: "A portion of your monthly membership goes to the charity of your choice." },
              { icon: Trophy, title: "3. Win VIP Experiences", desc: "Every round logged earns entries into our exclusive monthly prize draw." }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
              >
                <GlassCard className="p-8 text-center bg-gray-50/50 hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-foreground/70">{step.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CHARITIES */}
      <section id="charities" className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50 -translate-x-1/2" />
        
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Verified Partners</h2>
              <p className="text-lg text-foreground/60">
                We've partnered with high-impact organizations so you know exactly where your contribution goes.
              </p>
            </div>
            <Button variant="outline" className="shrink-0 bg-white">View All Partners</Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Junior Golf Foundation",
                category: "Youth Development",
                desc: "Bringing the game of golf to underrepresented communities through accessible programs and equipment.",
                image: "https://images.unsplash.com/photo-1592916315587-84a1a5b822d6?q=80&w=2670&auto=format&fit=crop"
              },
              {
                title: "Clean Water Initiative",
                category: "Global Health",
                desc: "Providing sustainable, clean drinking water solutions to communities facing severe water scarcity.",
                image: "https://images.unsplash.com/photo-1519781542704-957ff19eff00?q=80&w=2746&auto=format&fit=crop"
              }
            ].map((charity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
              >
                <Card className="group cursor-pointer overflow-hidden border-0 bg-white shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={charity.image}
                      alt={charity.title}
                      loading="lazy"
                      onError={(event) => {
                        const target = event.currentTarget as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2670&q=80";
                      }}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-semibold uppercase tracking-wider rounded-full text-primary shadow-sm">
                        {charity.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{charity.title}</h3>
                    <p className="text-foreground/70 mb-6">{charity.desc}</p>
                    <div className="flex items-center text-primary font-medium text-sm">
                      Select Foundation <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DRAW EXPLANATION & TESTIMONIALS */}
      <section id="rewards" className="py-24 bg-primary text-white relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/4 w-full h-full bg-secondary opacity-20 blur-[100px] rounded-full" />
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 lg:order-1 space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                The Monthly <span className="text-accent text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#FFE066]">VIP Draw</span>
              </h2>
              <p className="text-lg text-white/80 leading-relaxed">
                As a subscriber, your passion for golf unlocks premium rewards. We curate exclusive experiences, from masterclass sessions to VIP tournament tickets.
              </p>
              
              <ul className="space-y-4">
                {[
                  "1 Base Entry per month",
                  "+1 Entry for every round logged",
                  "+5 Entries for handicap improvements",
                  "Winners announced on the 1st of every month"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-accent mr-3 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 mt-4">
                View Past Winners
              </Button>
            </div>

            <div className="order-1 lg:order-2">
              <GlassCard className="bg-white/10 backdrop-blur-xl border-white/20 p-8 shadow-2xl relative">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent rounded-full blur-2xl opacity-50" />
                <div className="relative z-10">
                  <div className="flex items-center gap-1 text-accent mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 text-white/90">
                    "I play every weekend anyway. GolfCharity let me turn those rounds into a measurable impact for clean water, and last month I won VIP tickets to the Open. Incredible platform."
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4 text-lg font-bold">
                      MS
                    </div>
                    <div>
                      <div className="font-semibold text-lg">Michael Scott</div>
                      <div className="text-white/60 text-sm">Member since 2024</div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
            
          </div>
        </div>
      </section>
      
    </div>
  );
}
