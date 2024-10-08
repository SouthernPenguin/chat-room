import SideNav from '@/app/components/ui/dashboard/friend/Sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark:bg-black flex h-screen md:overflow-hidden w-full">
      <SideNav />
      <div className="flex-initial w-full overflow-hidden">{children}</div>
    </div>
  );
}
