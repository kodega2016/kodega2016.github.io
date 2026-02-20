const recs = [
  {
    img: '/people/khimananda.jpg',
    name: 'Khimananda Oli',
    role: 'Lead DevOps Engineer, PortPro',
    quote: 'Khadga strengthened our DevOps practices across AWS and GCP, improved GitHub-based workflows, and brought strong expertise in database performance and complex migrations. A quiet, highly dependable leader with excellent technical judgment.',
  },
  {
    img: '/people/sabin.jpg',
    name: 'Sabin Nepal',
    role: 'Flutter Developer, Parentiv / Paaila Technologies',
    quote: 'One of the most dedicated professionals I\u2019ve met. He understands the work deeply and solves complex problems with the best solution. He never hesitates to help others and always has a positive attitude.',
  },
  {
    img: '/people/shyam.jpg',
    name: 'Shyam Adhikari',
    role: 'Product Designer, Parentiv',
    quote: 'Well-rounded skills and the capabilities required of a skilled developer. Curious, eager to learn, and open to unlearning when necessary. The humility and ease he brings makes collaboration seamless.',
  },
];

export default function RecSlider() {
  return (
    <div className="rec-grid">
      {recs.map((r) => (
        <blockquote className="rec-card" key={r.name}>
          <p>&ldquo;{r.quote}&rdquo;</p>
          <div className="rec-person">
            <img src={r.img} alt={r.name} className="rec-avatar" />
            <div>
              <strong>{r.name}</strong>
              <span>{r.role}</span>
            </div>
          </div>
        </blockquote>
      ))}
    </div>
  );
}
