import './globals.css';

export const metadata = {
  title: 'Soup Web',
  description: 'Listening to soup songs on the soup web',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
