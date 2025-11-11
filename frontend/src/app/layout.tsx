import './globals.css';
import BackgroundImage from "@/assets/soubwebbg.png";


export const metadata = {
  title: 'Soup Web',
  description: 'Listening to soup songs on the soup web',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return( 
  <html
      lang="en"
      style={{
        backgroundImage: `url(${BackgroundImage.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // This keeps the background fixed while scrolling
      }}
    ><body>{children}</body></html>);
}

