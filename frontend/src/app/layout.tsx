import './globals.css';

export const metadata = {
  title: 'Soup Web Music Player',
  description: 'Play songs from Azure Function',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
