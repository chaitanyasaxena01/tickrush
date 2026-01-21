import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full relative min-h-screen bg-[var(--color-background)] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--glass-secondary)] via-[var(--color-background)] to-[var(--color-background)]">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80]">
                <Sidebar />
            </div>
            <main className="md:pl-72 h-full">
                {/* Mobile Header could go here */}
                <div className="h-full min-h-screen">
                    {children}
                </div>
            </main>
        </div>
    );
}
