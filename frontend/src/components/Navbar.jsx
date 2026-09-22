import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="relative z-50 px-4 pt-5 bg-black">

      <div className="max-w-6xl mx-auto">

        {/* NAVBAR */}
        <div className="h-16 px-5 md:px-6 flex items-center justify-between rounded-full bg-[#0b0b0b] backdrop-blur-xl border border-white/10 shadow-2xl">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 group">

            <div className="w-9 h-9 bg-[#ef233c] rounded-md rotate-45 flex items-center justify-center shadow-[0_0_25px_rgba(239,35,60,0.25)]">

              <div className="-rotate-45 text-white font-bold text-xs">
                AI
              </div>

            </div>

            <div className="flex flex-col leading-none">

              <span className="text-white font-bold text-sm tracking-tight">
                TC EXPLAINER
              </span>

              <span className="text-[8px] text-zinc-500 uppercase tracking-[0.2em] mt-1">
                AI Legal Intelligence
              </span>

            </div>

          </Link>


          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-8">

            <a
              href="/#features"
              className="text-sm font-medium text-zinc-500 hover:text-white transition-colors"
            >
              Features
            </a>

            <a
              href="/#how-it-works"
              className="text-sm font-medium text-zinc-500 hover:text-white transition-colors"
            >
              How It Works
            </a>

            <a
              href="/#use-cases"
              className="text-sm font-medium text-zinc-500 hover:text-white transition-colors"
            >
              Use Cases
            </a>

            <a
              href="/#about"
              className="text-sm font-medium text-zinc-500 hover:text-white transition-colors"
            >
              About
            </a>

          </div>


          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-3">

            {user ? (
              <div className="flex items-center gap-3">

                <Link
                  to="/dashboard"
                  className="px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/10 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/[0.08] transition-all"
                >
                  Dashboard
                </Link>

                <div className="flex items-center gap-2 pl-3 border-l border-white/10">

                  <span className="text-xs text-zinc-400 flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-[#ef233c]" />
                    {user.full_name || 'Account'}
                  </span>

                  <button
                    onClick={handleLogout}
                    className="p-2 text-zinc-500 hover:text-white hover:bg-white/10 rounded-full transition-all"
                    title="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>

                </div>

              </div>
            ) : (
              <div className="flex items-center gap-4">

                <Link
                  to="/login"
                  className="hidden lg:block text-sm font-medium text-zinc-500 hover:text-white transition-colors"
                >
                  Log In
                </Link>

                <Link
                  to="/login"
                  className="group inline-flex items-center gap-2 rounded-full bg-white/[0.03] px-5 py-2.5 border border-white/10 hover:border-[#ef233c]/50 transition-all"
                >

                  <span className="relative z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">

                    Get Started

                    <ArrowRight className="w-3.5 h-3.5 text-[#ef233c] group-hover:translate-x-1 transition-transform" />

                  </span>

                </Link>

              </div>
            )}

          </div>


          {/* MOBILE BUTTON */}
          <div className="md:hidden">

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

          </div>

        </div>


        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-5 rounded-2xl bg-[#090909] backdrop-blur-xl border border-white/10 shadow-2xl">

            <div className="flex flex-col gap-2">

              <a
                href="/#features"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-all"
              >
                Features
              </a>

              <a
                href="/#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-all"
              >
                How It Works
              </a>

              <a
                href="/#use-cases"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-all"
              >
                Use Cases
              </a>

              <a
                href="/#about"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-all"
              >
                About
              </a>

              <div className="border-t border-white/10 my-2" />

              <Link
                to={user ? '/dashboard' : '/login'}
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-[#ef233c] text-white text-center font-bold uppercase tracking-wider text-sm"
              >
                {user ? 'Go to Dashboard' : 'Get Started'}
              </Link>

            </div>

          </div>
        )}

      </div>

    </nav>
  );
}