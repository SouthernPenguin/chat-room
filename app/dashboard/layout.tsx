import { ConfigProvider, theme } from 'antd';
import SideNav from '../components/ui/dashboard/Sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  // const { defaultAlgorithm, darkAlgorithm } = theme;

  // const [isDarkMode, setIsDarkMode] = useState(false);
  // const toggleDarkMode = () => {
  //   document.documentElement.classList.toggle('dark');
  //   setIsDarkMode(!isDarkMode);
  // };

  return (
    <div className="dark:bg-black flex h-screen md:overflow-hidden w-full">
      <SideNav />
      <div className="flex-initial w-full overflow-hidden">
        {/* theme={{ algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm }} */}
        <ConfigProvider> {children}</ConfigProvider>
      </div>
    </div>
  );
}
