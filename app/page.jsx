import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import RecSlider from '@/components/RecSlider';

export const revalidate = 60;

const SITE_URL = 'https://khadgabahadur.com.np';

async function getProjects() {
  const { data } = await supabase.from('projects').select('id, slug, title, meta, summary').order('created_at', { ascending: false });
  return data || [];
}

async function getBlogs() {
  const { data } = await supabase.from('blogs').select('id, slug, title, meta, summary').order('created_at', { ascending: false });
  return data || [];
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Khadga Bahadur Shrestha',
  url: SITE_URL,
  image: `${SITE_URL}/favicon.svg`,
  jobTitle: 'Senior DevOps Engineer & Software Developer',
  description:
    'Senior DevOps Engineer, Platform Engineer, and Flutter Developer originally from Nepal, now based in Perth, Western Australia with 7+ years of experience in cloud infrastructure, CI/CD automation, and mobile app development.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Perth',
    addressRegion: 'Western Australia',
    addressCountry: 'AU',
  },
  email: 'khadgalovecoding2016@gmail.com',
  sameAs: [
    'https://github.com/kodega2016',
    'https://linkedin.com/in/kodega',
  ],
  knowsAbout: [
    'DevOps', 'Platform Engineering', 'AWS', 'Kubernetes', 'Docker',
    'Terraform', 'CI/CD', 'GitHub Actions', 'Flutter', 'React.js',
    'Node.js', 'Mobile App Development', 'Cloud Architecture',
    'Infrastructure as Code', 'MongoDB', 'PostgreSQL',
    'Site Reliability Engineering',
  ],
  nationality: { '@type': 'Country', name: 'Nepal' },
  birthPlace: { '@type': 'Country', name: 'Nepal' },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Tribhuvan University',
  },
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', name: 'AWS Certified Solutions Architect – Associate', credentialCategory: 'certification' },
    { '@type': 'EducationalOccupationalCredential', name: 'AWS Certified Cloud Practitioner', credentialCategory: 'certification' },
    { '@type': 'EducationalOccupationalCredential', name: 'Kubernetes for Absolute Beginners', credentialCategory: 'certification' },
    { '@type': 'EducationalOccupationalCredential', name: 'Terraform Basics Training', credentialCategory: 'certification' },
    { '@type': 'EducationalOccupationalCredential', name: 'GitOps with ArgoCD', credentialCategory: 'certification' },
    { '@type': 'EducationalOccupationalCredential', name: 'Docker Training Course', credentialCategory: 'certification' },
  ],
  hasOccupation: [
    {
      '@type': 'Occupation',
      name: 'Senior Software Engineer / DevOps Engineer',
      occupationLocation: { '@type': 'Country', name: 'Australia' },
      description: 'Cloud infrastructure, Kubernetes, CI/CD automation, Flutter mobile development',
    },
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'PortPro Pvt. Ltd.',
    url: 'https://portpro.io',
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Khadga Bahadur Shrestha',
  url: SITE_URL,
  description: 'Portfolio of Khadga Bahadur Shrestha — Senior DevOps Engineer, Platform Engineer, and Flutter Developer from Nepal, now based in Perth, Australia.',
  author: { '@id': `${SITE_URL}/#person` },
};

const profilePageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profilepage`,
  name: 'Khadga Bahadur Shrestha — DevOps Engineer & Software Developer',
  url: SITE_URL,
  description: 'Portfolio and resume of Khadga Bahadur Shrestha, a Senior DevOps Engineer and Software Developer from Nepal, now based in Perth, Australia.',
  mainEntity: { '@id': `${SITE_URL}/#person` },
  isPartOf: { '@id': `${SITE_URL}/#website` },
};

export default async function Home() {
  const [projects, blogs] = await Promise.all([getProjects(), getBlogs()]);

  const projectListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Projects by Khadga Bahadur Shrestha',
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title,
      url: `${SITE_URL}/projects/${p.slug}`,
      description: p.summary,
    })),
  };

  const blogListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Blog posts by Khadga Bahadur Shrestha',
    itemListElement: blogs.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.title,
      url: `${SITE_URL}/blogs/${b.slug}`,
      description: b.summary,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJsonLd) }}
      />

      <section id="about" className="hero" aria-label="About Khadga Bahadur Shrestha">
        <div className="hero-bg" aria-hidden="true" />
        <div className="container">
          <div className="hero-badge">
            <span className="status-dot" aria-hidden="true" />
            Available for work
          </div>
          <div className="hero-grid">
            <div className="hero-left">
              <p className="hero-label">Hi, I&rsquo;m Khadga</p>
              <h1>
                I build &amp; operate<br />
                <span className="hero-accent">cloud platforms</span><br />
                at scale.
              </h1>
              <p className="hero-intro">
                Senior DevOps Engineer in Perth, Australia with 7+ years shipping resilient infrastructure.
                I manage 100+ microservices on AWS ECS at PortPro, cut deploy times by 60%,
                and build developer tooling that teams actually love.
              </p>
              <div className="hero-actions">
                <a href="mailto:khadgalovecoding2016@gmail.com" className="hero-btn-primary">Get in touch &rarr;</a>
                <a href="https://github.com/kodega2016" target="_blank" rel="noopener noreferrer" className="hero-btn">GitHub</a>
                <a href="https://linkedin.com/in/kodega" target="_blank" rel="noopener noreferrer" className="hero-btn">LinkedIn</a>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-terminal">
                <div className="terminal-bar">
                  <span className="terminal-dot" /><span className="terminal-dot" /><span className="terminal-dot" />
                  <span className="terminal-title">strengths.sh</span>
                </div>
                <div className="terminal-body">
                  <p className="terminal-line"><span className="t-prompt">$</span> cat core_strengths.yml</p>
                  <div className="terminal-output">
                    <p><span className="t-key">platform:</span> AWS, Kubernetes, Terraform</p>
                    <p><span className="t-key">cicd:</span> GitHub Actions, Docker, Reusable Workflows</p>
                    <p><span className="t-key">data:</span> MongoDB, PostgreSQL, Redis</p>
                    <p><span className="t-key">sre:</span> Observability, DR, Monitoring</p>
                    <p><span className="t-key">mobile:</span> Flutter, React Native</p>
                  </div>
                  <p className="terminal-line"><span className="t-prompt">$</span> echo $EXPERIENCE</p>
                  <p className="terminal-result">7+ years &middot; 100+ microservices &middot; 60% faster deploys</p>
                  <p className="terminal-line terminal-cursor"><span className="t-prompt">$</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="section" aria-label="Work experience summary">
        <div className="container">
          <p className="section-label">Experience</p>
          <h2 className="section-title">Background</h2>
          <div className="exp-summary">
            <p>
              With 7+ years of professional experience, I&rsquo;ve progressed from web development to
              senior DevOps and platform engineering roles. Currently at <strong>PortPro</strong>, I manage
              cloud infrastructure for 100+ microservices on AWS, deploy services on ECS with
              GitHub Actions using reusable workflows, and build CI/CD pipelines that cut deployment time by 60%.
            </p>
            <p>
              Previously, I architected a Flutter-based child care platform at <strong>Parentiv</strong> with
              a serverless Firebase backend, and built full-stack web and mobile applications at
              <strong> Paailatechnologies</strong> and <strong>Delta Tech</strong> in Nepal.
            </p>
            <p>
              My dual background in infrastructure and application development lets me bridge the gap
              between ops and engineering&thinsp;&mdash;&thinsp;building systems that are observable,
              resilient, and developer-friendly.
            </p>
          </div>
        </div>
      </section>

      <section id="skills" className="section" aria-label="Technical skills">
        <div className="container">
          <p className="section-label">Skills</p>
          <h2 className="section-title">Core Competencies</h2>
          <div className="skills-columns">
            <div className="skill-group">
              <h3>Cloud Infrastructure</h3>
              <ul>
                <li>AWS (VPC, EC2, ECS, RDS, S3, ALB, Route 53, CloudWatch)</li>
                <li>Terraform / Infrastructure as Code</li>
                <li>Google Cloud Platform</li>
                <li>Microsoft Azure</li>
              </ul>
            </div>
            <div className="skill-group">
              <h3>Containers &amp; Orchestration</h3>
              <ul>
                <li>Kubernetes / Docker</li>
                <li>ArgoCD / FluxCD</li>
                <li>Helm Charts / GitOps / k3d</li>
              </ul>
            </div>
            <div className="skill-group">
              <h3>CI/CD &amp; Automation</h3>
              <ul>
                <li>GitHub Actions / Jenkins</li>
                <li>GitLab CI/CD</li>
                <li>Blue-Green &amp; Rolling Deployments</li>
              </ul>
            </div>
            <div className="skill-group">
              <h3>Databases &amp; Messaging</h3>
              <ul>
                <li>MongoDB Atlas / PostgreSQL</li>
                <li>TimescaleDB / Redis</li>
                <li>RabbitMQ / AWS DMS</li>
              </ul>
            </div>
            <div className="skill-group">
              <h3>Monitoring &amp; Reliability</h3>
              <ul>
                <li>New Relic / Prometheus / Grafana</li>
                <li>AWS CloudWatch</li>
                <li>Incident Management / SRE</li>
              </ul>
            </div>
            <div className="skill-group">
              <h3>Development</h3>
              <ul>
                <li>Flutter / React.js / Node.js</li>
                <li>TypeScript / Python</li>
                <li>REST APIs / OAuth 2.0</li>
                <li>Clean Architecture</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-label="Testimonials and recommendations">
        <div className="container">
          <p className="section-label">Testimonials</p>
          <h2 className="section-title">Recommendations</h2>
          <RecSlider />
        </div>
      </section>

      <section id="projects" className="section" aria-label="Portfolio projects">
        <div className="container">
          <p className="section-label">Work</p>
          <h2 className="section-title">Projects</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <Link href={`/projects/${project.slug}`} key={project.id} className="project-item">
                <p className="project-meta">{project.meta}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="blogs" className="section" aria-label="Blog articles">
        <div className="container">
          <p className="section-label">Writing</p>
          <h2 className="section-title">Blog</h2>
          <div className="blog-grid">
            {blogs.map((blog) => {
              const parts = blog.meta.split(' / ');
              const date = parts[parts.length - 1];
              const category = parts.slice(0, -1).join(' / ');
              return (
                <Link href={`/blogs/${blog.slug}`} key={blog.id} className="blog-item">
                  <p className="blog-meta">{date} &middot; {category}</p>
                  <h3>{blog.title}</h3>
                  <p>{blog.summary}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="education" className="section" aria-label="Education and certifications">
        <div className="container">
          <p className="section-label">Education</p>
          <h2 className="section-title">Education &amp; Certifications</h2>
          <div className="edu-item">
            <h3>Bachelor of Science in Computer Science and Information Technology (BSc CSIT)</h3>
            <p>Tribhuvan University, Biratnagar</p>
            <p className="edu-date">2016 &ndash; 2020</p>
          </div>
          <h3 className="section-subtitle">Certifications</h3>
          <ul className="cert-list">
            <li>AWS Certified Solutions Architect &ndash; Associate</li>
            <li>AWS Certified Cloud Practitioner</li>
            <li>Kubernetes for Absolute Beginners</li>
            <li>Terraform Basics Training</li>
            <li>GitOps with ArgoCD</li>
            <li>MongoDB CRUD Operations in Node.js</li>
            <li>Docker Training Course</li>
          </ul>
        </div>
      </section>

      <section id="contact" className="section" aria-label="Contact information">
        <div className="container">
          <p className="section-label">Say hello</p>
          <h2 className="section-title">Contact</h2>
          <p className="contact-intro">
            DevOps Engineer and software developer from Nepal, currently based in Perth, Western Australia.
            Open to DevOps, platform engineering, and software development opportunities in Australia, remote roles, and freelance projects.
          </p>
          <div className="contact-rows">
            <a href="mailto:khadgalovecoding2016@gmail.com" className="contact-row">
              <span className="contact-key">Email</span>
              <span className="contact-val">khadgalovecoding2016@gmail.com</span>
            </a>
            <a href="https://khadgabahadur.com.np" target="_blank" rel="noopener noreferrer" className="contact-row">
              <span className="contact-key">Website</span>
              <span className="contact-val">khadgabahadur.com.np</span>
            </a>
            <a href="https://linkedin.com/in/kodega" target="_blank" rel="noopener noreferrer" className="contact-row">
              <span className="contact-key">LinkedIn</span>
              <span className="contact-val">kodega</span>
            </a>
            <a href="https://github.com/kodega2016" target="_blank" rel="noopener noreferrer" className="contact-row">
              <span className="contact-key">GitHub</span>
              <span className="contact-val">kodega2016</span>
            </a>
            <div className="contact-row">
              <span className="contact-key">Location</span>
              <span className="contact-val">Perth, Western Australia, Australia</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
