import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Upload,
  FileText,
  ShieldCheck,
  MessageCircle,
  Search,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Sparkles,
  Brain,
  Lock,
} from 'lucide-react';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-white/10">

        {/* RED GLOWS */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#ef233c]/20 rounded-full blur-[140px]" />

        <div className="absolute top-1/3 -right-40 w-[450px] h-[450px] bg-[#ef233c]/10 rounded-full blur-[130px]" />

        {/* GRID */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 lg:py-32 w-full">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* HERO TEXT */}
            <div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-7">

                <Sparkles className="w-4 h-4 text-[#ef233c]" />

                AI Legal Intelligence

              </div>


              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight mb-7">

                Understand

                <span className="block text-[#ef233c]">
                  the fine print.
                </span>

              </h1>


              <p className="text-lg lg:text-xl text-zinc-400 leading-relaxed max-w-xl mb-9">

                Turn complicated Terms & Conditions into clear,
                understandable insights with AI-powered document analysis.

              </p>


              <div className="flex flex-wrap gap-4">

                <Link
                  to={user ? '/dashboard' : '/login'}
                  className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#ef233c] text-white font-bold text-sm shadow-[0_0_35px_rgba(239,35,60,0.25)] hover:bg-[#d91f35] transition-all"
                >

                  {user ? 'Open Dashboard' : 'Analyze a Document'}

                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />

                </Link>


                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/15 bg-white/[0.03] text-zinc-200 font-semibold text-sm hover:bg-white/[0.08] transition-all"
                >
                  How It Works
                </a>

              </div>


              <div className="flex flex-wrap gap-6 mt-9 text-sm text-zinc-500">

                <span className="flex items-center gap-2">

                  <CheckCircle2 className="w-4 h-4 text-[#ef233c]" />

                  Plain-English explanations

                </span>


                <span className="flex items-center gap-2">

                  <CheckCircle2 className="w-4 h-4 text-[#ef233c]" />

                  Risk highlights

                </span>

              </div>

            </div>


            {/* DOCUMENT PREVIEW */}
            <div className="relative">

              <div className="absolute inset-0 bg-[#ef233c]/10 blur-3xl rounded-full" />


              <div className="relative bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-5 shadow-2xl">

                {/* DOCUMENT HEADER */}

                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">

                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-xl bg-[#ef233c]/10 border border-[#ef233c]/20 flex items-center justify-center">

                      <FileText className="w-5 h-5 text-[#ef233c]" />

                    </div>


                    <div>

                      <p className="font-semibold text-white text-sm">
                        Terms_and_Conditions.pdf
                      </p>

                      <p className="text-xs text-zinc-500 mt-1">
                        AI analysis completed
                      </p>

                    </div>

                  </div>


                  <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] uppercase tracking-wider text-green-400">
                    Analyzed
                  </div>

                </div>


                {/* ANALYSIS */}

                <div className="space-y-3">

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">

                    <div className="flex items-center gap-2 mb-2">

                      <CheckCircle2 className="w-4 h-4 text-green-400" />

                      <span className="font-semibold text-sm text-white">
                        Clearly Explained
                      </span>

                    </div>

                    <p className="text-xs text-zinc-500 leading-relaxed">
                      This section explains how your account can be cancelled.
                    </p>

                  </div>


                  <div className="p-4 rounded-2xl bg-[#ef233c]/[0.05] border border-[#ef233c]/20">

                    <div className="flex items-center gap-2 mb-2">

                      <AlertTriangle className="w-4 h-4 text-[#ef233c]" />

                      <span className="font-semibold text-sm text-white">
                        Important Clause
                      </span>

                    </div>

                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Automatic renewal may occur unless cancelled before
                      the renewal date.
                    </p>

                  </div>


                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">

                    <div className="flex items-center gap-2 mb-2">

                      <ShieldCheck className="w-4 h-4 text-[#ef233c]" />

                      <span className="font-semibold text-sm text-white">
                        Potential Risk
                      </span>

                    </div>

                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Review the limitation-of-liability section carefully.
                    </p>

                  </div>

                </div>


                {/* STATUS */}

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">

                  <span className="text-xs text-zinc-600">
                    AI Legal Analysis
                  </span>

                  <span className="flex items-center gap-2 text-xs text-zinc-400">

                    <span className="w-2 h-2 rounded-full bg-[#ef233c] animate-pulse" />

                    Processing complete

                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section id="features" className="relative py-24 bg-black">

        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-2xl mb-14">

            <p className="text-[#ef233c] font-bold uppercase tracking-[0.2em] text-xs mb-4">
              What it does
            </p>

            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-5">

              Legal language.

              <span className="text-zinc-500">
                {' '}Human understanding.
              </span>

            </h2>

            <p className="text-zinc-500 text-lg leading-relaxed">

              Quickly identify the important parts of lengthy Terms &
              Conditions documents without getting lost in legal jargon.

            </p>

          </div>


          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

            <FeatureCard
              icon={Upload}
              title="Upload Documents"
              description="Upload supported Terms & Conditions documents for AI analysis."
            />

            <FeatureCard
              icon={FileText}
              title="Simple Summaries"
              description="Convert complicated clauses into easier, understandable language."
            />

            <FeatureCard
              icon={AlertTriangle}
              title="Risk Detection"
              description="Highlight clauses that may deserve closer attention."
            />

            <FeatureCard
              icon={MessageCircle}
              title="Ask Questions"
              description="Ask questions about your uploaded document and its contents."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section
        id="how-it-works"
        className="relative py-24 bg-[#050505] border-y border-white/10"
      >

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <p className="text-[#ef233c] font-bold uppercase tracking-[0.2em] text-xs mb-4">
              Simple workflow
            </p>

            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">

              From document to

              <span className="text-zinc-500">
                {' '}understanding.
              </span>

            </h2>

          </div>


          <div className="grid md:grid-cols-3 gap-6">

            <Step
              number="01"
              icon={Upload}
              title="Upload"
              description="Upload a Terms & Conditions document from your device."
            />

            <Step
              number="02"
              icon={Search}
              title="Analyze"
              description="The application processes the document and identifies important clauses."
            />

            <Step
              number="03"
              icon={MessageCircle}
              title="Understand"
              description="Read summaries, review highlighted risks, and ask questions."
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY USE IT
      ===================================================== */}

      <section id="use-cases" className="py-24 bg-black">

        <div className="max-w-5xl mx-auto px-6">

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#090909] p-8 lg:p-12">

            <div className="absolute -right-32 -top-32 w-80 h-80 bg-[#ef233c]/10 blur-3xl rounded-full" />

            <div className="relative">

              <div className="flex items-start gap-5 mb-8">

                <div className="w-12 h-12 rounded-xl bg-[#ef233c]/10 border border-[#ef233c]/20 flex items-center justify-center shrink-0">

                  <Brain className="w-6 h-6 text-[#ef233c]" />

                </div>


                <div>

                  <p className="text-[#ef233c] text-xs font-bold uppercase tracking-[0.2em] mb-2">
                    AI-powered clarity
                  </p>

                  <h2 className="text-3xl lg:text-4xl font-extrabold mb-3">
                    Make the fine print easier to understand.
                  </h2>

                  <p className="text-zinc-500 leading-relaxed max-w-2xl">
                    Instead of reading a long document from beginning to end,
                    quickly locate the information that matters to you.
                  </p>

                </div>

              </div>


              <div className="grid sm:grid-cols-2 gap-3 mt-8">

                <Benefit text="Understand important clauses" />

                <Benefit text="Identify potential risks" />

                <Benefit text="Find cancellation and renewal terms" />

                <Benefit text="Ask questions about the document" />

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section
        id="about"
        className="relative overflow-hidden py-28 bg-[#070707] border-y border-white/10"
      >

        <div className="absolute inset-0 flex items-center justify-center">

          <div className="w-[500px] h-[300px] bg-[#ef233c]/10 blur-[120px] rounded-full" />

        </div>


        <div className="relative max-w-4xl mx-auto px-6 text-center">

          <div className="inline-flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-[0.2em] mb-6">

            <Lock className="w-4 h-4 text-[#ef233c]" />

            Understand before you agree

          </div>


          <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-6">

            Don't just accept the

            <span className="text-[#ef233c]">
              {' '}fine print.
            </span>

          </h2>


          <p className="text-zinc-500 text-lg max-w-2xl mx-auto mb-9">

            Upload your Terms & Conditions and explore them with
            AI-powered explanations.

          </p>


          <Link
            to={user ? '/dashboard' : '/login'}
            className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#ef233c] text-white font-bold shadow-[0_0_40px_rgba(239,35,60,0.25)] hover:bg-[#d91f35] transition-all"
          >

            {user ? 'Open Dashboard' : 'Get Started'}

            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />

          </Link>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-black text-zinc-500 py-12">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col md:flex-row justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-3">

                <div className="w-8 h-8 rounded-md bg-[#ef233c] flex items-center justify-center">

                  <span className="text-white font-bold text-xs">
                    AI
                  </span>

                </div>

                <span className="text-white text-xl font-bold">
                  TC EXPLAINER
                </span>

              </div>


              <p className="text-sm max-w-md leading-relaxed">

                An AI-powered application designed to help users understand
                Terms & Conditions documents more easily.

              </p>

            </div>


            <div className="text-sm max-w-sm">

              <p className="text-zinc-400 font-medium">
                AI Terms & Conditions Explainer
              </p>

              <p className="mt-2 leading-relaxed">

                Information provided by the system is for informational
                purposes and is not legal advice.

              </p>

            </div>

          </div>


          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between gap-3 text-sm">

            <p>
              © 2026 AI TC Explainer. All rights reserved.
            </p>

            <p>
              Designed & Developed by{' '}
              <span className="text-[#ef233c] font-semibold">
                Mahesh Singh
              </span>
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}


/* =====================================================
   FEATURE CARD
   ===================================================== */

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="group p-6 rounded-2xl bg-[#080808] border border-white/10 hover:border-[#ef233c]/40 transition-all">

      <div className="w-12 h-12 rounded-xl bg-[#ef233c]/10 border border-[#ef233c]/20 flex items-center justify-center mb-5 group-hover:bg-[#ef233c]/15 transition">

        <Icon className="w-5 h-5 text-[#ef233c]" />

      </div>


      <h3 className="text-lg font-bold mb-2 text-white">
        {title}
      </h3>


      <p className="text-zinc-500 text-sm leading-relaxed">
        {description}
      </p>

    </div>
  );
}


/* =====================================================
   STEP
   ===================================================== */

function Step({ number, icon: Icon, title, description }) {
  return (
    <div className="relative p-8 rounded-2xl bg-[#080808] border border-white/10">

      <div className="flex items-center justify-between mb-7">

        <div className="w-12 h-12 rounded-xl bg-[#ef233c]/10 border border-[#ef233c]/20 flex items-center justify-center">

          <Icon className="w-5 h-5 text-[#ef233c]" />

        </div>


        <span className="text-5xl font-black text-white/[0.06]">
          {number}
        </span>

      </div>


      <h3 className="text-xl font-bold mb-3">
        {title}
      </h3>


      <p className="text-zinc-500 leading-relaxed text-sm">
        {description}
      </p>

    </div>
  );
}


/* =====================================================
   BENEFIT
   ===================================================== */

function Benefit({ text }) {
  return (
    <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-xl p-4">

      <CheckCircle2 className="w-5 h-5 text-[#ef233c] shrink-0" />

      <span className="font-medium text-zinc-300 text-sm">
        {text}
      </span>

    </div>
  );
}