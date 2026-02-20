export default function Footer() {
  return (
    <footer>
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Khadga Bahadur Shrestha</p>
        <div className="footer-links">
          <a href="https://github.com/kodega2016" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/kodega" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="mailto:khadgalovecoding2016@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
}
