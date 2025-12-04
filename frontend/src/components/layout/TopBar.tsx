import React from 'react';
import { ThemeSwitcher } from '../common/ThemeSwitcher';
import { Bell, User } from 'lucide-react';

interface TopBarProps {
    title: string;
    subtitle?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ title, subtitle }) => {
    const [currentTime, setCurrentTime] = React.useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex justify-between items-start mb-8 pb-6 border-b border-default">
            <div>
                <h1 className="text-3xl font-bold text-primary">{title}</h1>
                {subtitle && <p className="text-secondary mt-1 text-sm">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="text-xs text-muted">Last updated</p>
                    <p className="text-brand font-medium text-sm">{currentTime.toLocaleTimeString()}</p>
                </div>
                <button className="p-2 hover:bg-tertiary rounded-md transition-colors">
                    <Bell size={18} className="text-secondary" />
                </button>
                <button className="p-2 hover:bg-tertiary rounded-md transition-colors">
                    <User size={18} className="text-secondary" />
                </button>
                <ThemeSwitcher />
            </div>
        </div>
    );
};
