import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, X, FileText, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { TOOLS } from '../mock';

export const Logo = ({ compact = false }) => (
  <Link to="/" className="flex items-center gap-2.5 group">
    <div className="relative">
      <div className="absolute inset-0 rounded-xl bg-rose-500/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative grid place-items-center w-9 h-9 rounded-xl btn-primary text-white">
        <FileText className="w-5 h-5" strokeWidth={2.4} />
      </div>
    </div>
    {!compact && (
      <span className="font-display font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
        PDF<span className="brand-gradient-text">Pro</span>
      </span>
    )}
  </Link>
);

const Header = () => {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const popular = TOOLS.slice(0, 8);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-slate-200/70 dark:border-white/10 shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <div className="relative" onMouseEnter={() => setMenu(true)} onMouseLeave={() => setMenu(false)}>
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                All tools <ChevronDown className={`w-4 h-4 transition-transform ${menu ? 'rotate-180' : ''}`} />
              </button>
              {menu && (
                <div className="absolute left-0 top-full pt-2 w-[520px]">
                  <div className="glass rounded-2xl border border-slate-200/70 dark:border-white/10 shadow-2xl p-3 grid grid-cols-2 gap-1 reveal">
                    {popular.map((t) => (
                      <button key={t.slug} onClick={() => navigate(`/tool/${t.slug}`)} className="flex items-start gap-3 p-2.5 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                        <span className="mt-0.5 text-rose-500 font-semibold text-xs">{t.name}</span>
                      </button>
                    ))}
                    <Link to="/#tools" className="col-span-2 mt-1 text-center text-sm font-semibold text-rose-500 hover:underline py-2">View all 26 tools</Link>
                  </div>
                </div>
              )}
            </div>
            <a href="/#how" className="px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">How it works</a>
            <a href="/#features" className="px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">Features</a>
            <a href="/#faq" className="px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">FAQ</a>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={toggle} aria-label="Toggle theme" className="grid place-items-center w-10 h-10 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <a href="/#tools" className="hidden sm:inline-flex items-center btn-primary text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition">
            Get started
          </a>
          <button onClick={() => setOpen(!open)} className="lg:hidden grid place-items-center w-10 h-10 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden glass border-t border-slate-200/70 dark:border-white/10 px-4 py-4 space-y-1 reveal">
          <a href="/#tools" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5">All tools</a>
          <a href="/#how" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5">How it works</a>
          <a href="/#features" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5">Features</a>
          <a href="/#faq" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5">FAQ</a>
        </div>
      )}
    </header>
  );
};

export default Header;
