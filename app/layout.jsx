import './globals.css';
import { Space_Grotesk } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space',
});

const SITE_URL = 'https://khadgabahadur.com.np';
const SITE_NAME = 'Khadga Bahadur Shrestha';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Khadga Shrestha — DevOps Engineer from Nepal, Based in Perth',
    template: '%s — Khadga Shrestha',
  },
  description:
    'Senior DevOps Engineer from Nepal, now based in Perth, Australia. 7+ years in AWS, Kubernetes, Terraform, CI/CD, and Flutter development.',
  keywords: [
    'devops engineer',
    'devops engineer australia',
    'devops engineer perth',
    'devops in australia',
    'platform engineer australia',
    'flutter developer',
    'flutter developer australia',
    'mobile app developer australia',
    'software developer perth',
    'software developer australia',
    'it developer perth',
    'cloud engineer australia',
    'kubernetes engineer',
    'aws devops engineer',
    'senior software engineer australia',
    'infrastructure engineer perth',
    'ci cd automation',
    'terraform engineer',
    'full stack developer australia',
    'react developer perth',
    'nepali developer australia',
    'nepali devops engineer',
    'software developer from nepal',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Khadga Shrestha — DevOps Engineer from Nepal, Based in Perth',
    description:
      'Senior DevOps Engineer from Nepal, now based in Perth, Australia. 7+ years in AWS, Kubernetes, Terraform, CI/CD, and Flutter development.',
  },
  twitter: {
    card: 'summary',
    title: 'Khadga Shrestha — DevOps Engineer from Nepal, Based in Perth',
    description:
      'Senior DevOps Engineer from Nepal, now based in Perth, Australia. 7+ years in AWS, Kubernetes, Terraform, CI/CD, and Flutter development.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {},
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU" className={spaceGrotesk.variable}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
