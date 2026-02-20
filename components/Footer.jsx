export default function Footer() {
  return (
    <footer role="contentinfo">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Khadga Bahadur Shrestha &middot; DevOps Engineer &amp; Software Developer in Perth, Australia</p>
        <div className="footer-links">
          <a href="https://github.com/kodega2016" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">GitHub</a>
          <a href="https://linkedin.com/in/kodega" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">LinkedIn</a>
          <a href="mailto:khadgalovecoding2016@gmail.com" aria-label="Send email">Email</a>
        </div>
      </div>
    </footer>
  );
}
