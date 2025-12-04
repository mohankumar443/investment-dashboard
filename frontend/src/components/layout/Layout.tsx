import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, LineChart, List, PieChart, Bot, Settings, Bell, User } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

const NavLink = ({ to, icon: Icon, children }: { to: string; icon: any; children: React.ReactNode }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
            )}
        >
            <Icon size={18} />
            {children}
        </Link>
    );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-background text-slate-100 font-sans selection:bg-primary/30">
            {/* Top Navigation */}
            <nav className="sticky top-0 z-50 border-b border-slate-800 bg-background/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                <LineChart className="text-white" size={20} />
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                                InvestDash+
                            </span>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center gap-1">
                            <NavLink to="/" icon={LayoutDashboard}>Dashboard</NavLink>
                            <NavLink to="/insights" icon={LineChart}>Insights</NavLink>
                            <NavLink to="/watchlist" icon={List}>Watchlist</NavLink>
                            <NavLink to="/portfolio" icon={PieChart}>Portfolio</NavLink>
                            <NavLink to="/advisor" icon={Bot}>AI Advisor</NavLink>
                            <NavLink to="/settings" icon={Settings}>Settings</NavLink>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-4">
                            <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
                                <Bell size={20} />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                            </button>
                            <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                                <User size={18} className="text-slate-300" />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
};
