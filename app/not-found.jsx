import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist. Visit the homepage of Khadga Bahadur Shrestha — DevOps Engineer & Software Developer in Perth, Australia.',
};

export default function NotFound() {
  return (
    <section className="section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '16px' }}>404</h1>
        <p style={{ color: 'var(--text-2)', marginBottom: '24px' }}>
          The page you&rsquo;re looking for doesn&rsquo;t exist.
        </p>
        <Link href="/" className="hero-btn-primary" style={{ display: 'inline-block', background: 'var(--text)', color: '#fff', padding: '12px 28px', borderRadius: '100px' }}>
          Go home
        </Link>
      </div>
    </section>
  );
}
