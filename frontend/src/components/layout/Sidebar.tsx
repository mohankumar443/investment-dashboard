import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, TrendingUp, FileText, Newspaper, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Overview' },
    { to: '/portfolio', icon: Briefcase, label: 'Portfolio' },
    { to: '/market', icon: TrendingUp, label: 'Market' },
    { to: '/research', icon: FileText, label: 'Research' },
    { to: '/news', icon: Newspaper, label: 'News' },
];

export const Sidebar = () => {
    return (
        <motion.aside
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-default flex flex-col"
        >
            {/* Logo */}
            <div className="p-6 border-b border-default">
                <h1 className="text-2xl font-bold text-primary">
                    Invest<span className="text-brand">Dash+</span>
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-150 ${isActive
                                ? 'bg-brand-primary text-white font-medium'
                                : 'text-secondary hover:bg-tertiary hover:text-primary'
                            }`
                        }
                    >
                        <item.icon size={18} strokeWidth={2} />
                        <span className="text-sm">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-default space-y-1">
                <button className="flex items-center gap-3 px-4 py-2.5 rounded-md w-full text-secondary hover:bg-tertiary hover:text-primary transition-all duration-150">
                    <Settings size={18} strokeWidth={2} />
                    <span className="text-sm">Settings</span>
                </button>
                <button className="flex items-center gap-3 px-4 py-2.5 rounded-md w-full text-secondary hover:bg-tertiary hover:text-primary transition-all duration-150">
                    <LogOut size={18} strokeWidth={2} />
                    <span className="text-sm">Logout</span>
                </button>
            </div>
        </motion.aside>
    );
};
