import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import RecSlider from '@/components/RecSlider';

export const revalidate = 60;

async function getProjects() {
  const { data } = await supabase.from('projects').select('id, slug, title, meta, summary').order('created_at', { ascending: false });
  return data || [];
}

async function getBlogs() {
  const { data } = await supabase.from('blogs').select('id, slug, title, meta, summary').order('created_at', { ascending: false });
  return data || [];
}

export default async function Home() {
  const [projects, blogs] = await Promise.all([getProjects(), getBlogs()]);

  return (
    <>
      <section id="about" className="hero">
        <div className="container">
          <div className="hero-badge">
            <span className="status-dot" />
            Available for work
          </div>
          <h1>Software Engineer<br />&amp; DevOps Specialist</h1>
          <p className="hero-name">Khadga Bahadur Shrestha</p>
          <p className="hero-intro">
            I manage cloud infrastructure with IaC (Terraform, OpenTofu), handle database
            migrations and monitoring, set up CI/CD pipelines for continuous integration
            and deployment, manage mobile app releases with crash reporting, and support
            developers with infrastructure and server tooling.
          </p>
          <div className="hero-actions">
            <a href="mailto:khadgalovecoding2016@gmail.com" className="hero-btn-primary">Get in touch</a>
            <a href="https://github.com/kodega2016" target="_blank" rel="noopener noreferrer" className="hero-btn">GitHub</a>
            <a href="https://linkedin.com/in/kodega" target="_blank" rel="noopener noreferrer" className="hero-btn">LinkedIn</a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">7+</span>
              <span className="hero-stat-label">Years exp.</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">100+</span>
              <span className="hero-stat-label">Services</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">60M+</span>
              <span className="hero-stat-label">Records</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">3+</span>
              <span className="hero-stat-label">Yrs uptime SLA</span>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="section">
        <div className="container">
          <p className="section-label">Experience</p>
          <h2 className="section-title">Where I&rsquo;ve worked</h2>
          <div className="exp-list">
            <div className="exp-row">
              <div className="exp-row-left">
                <h3>Senior Software Engineer / DevOps</h3>
                <p className="exp-company">PortPro Pvt. Ltd.</p>
                <ul className="exp-bullets">
                  <li>Architected and automated AWS infrastructure using Terraform modules for VPC, EC2, ECS (Fargate &amp; EC2), App Runner, ALB, and Auto Scaling across multi-region deployments</li>
                  <li>Built and maintained production Kubernetes clusters with k3d, implementing GitOps workflows using ArgoCD with blue-green and rolling deployment strategies</li>
                  <li>Designed CI/CD pipelines using GitHub Actions and Jenkins, reducing deployment time significantly</li>
                  <li>Implemented centralized monitoring with New Relic, CloudWatch, Prometheus, and Grafana across 100+ microservices, maintaining high uptime SLA for 3+ years</li>
                  <li>Led mobile development using Flutter with Clean Architecture, delivering PortPro Driver and Owner Operator apps to both app stores</li>
                  <li>Built enterprise web features with React.js, TypeScript, and Node.js</li>
                  <li>Executed large-scale data migrations of 60M+ records with zero downtime</li>
                </ul>
              </div>
              <span className="exp-row-date">2021 &ndash; Present</span>
            </div>
            <div className="exp-row">
              <div className="exp-row-left">
                <h3>Mobile Architect &amp; Full Stack Developer</h3>
                <p className="exp-company">Parentiv</p>
                <ul className="exp-bullets">
                  <li>Designed Flutter application architecture with Clean Architecture for a child care management platform serving thousands of users</li>
                  <li>Architected serverless backend with Firebase Cloud Functions, Firestore, and Firebase Authentication</li>
                  <li>Built admin dashboard using React.js, later migrated to Flutter Web</li>
                  <li>Implemented CI/CD pipelines for automated building, testing, and deployment of iOS and Android applications</li>
                </ul>
              </div>
              <span className="exp-row-date">2019 &ndash; 2021</span>
            </div>
            <div className="exp-row">
              <div className="exp-row-left">
                <h3>Full Stack Developer</h3>
                <p className="exp-company">Paailatechnologies</p>
                <ul className="exp-bullets">
                  <li>Designed and developed RESTful APIs using Laravel with optimized MySQL schemas for job portal and television channel applications</li>
                  <li>Built cross-platform mobile apps using Flutter integrated with Laravel backend APIs</li>
                </ul>
              </div>
              <span className="exp-row-date">2018 &ndash; 2019</span>
            </div>
            <div className="exp-row">
              <div className="exp-row-left">
                <h3>Junior Web Developer</h3>
                <p className="exp-company">Delta Tech</p>
                <ul className="exp-bullets">
                  <li>Developed responsive web applications using HTML5, CSS3, JavaScript, Bootstrap, and backend services with PHP and CodeIgniter</li>
                  <li>Delivered web solutions for e-commerce platforms and business applications</li>
                </ul>
              </div>
              <span className="exp-row-date">2016 &ndash; 2018</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-label">Testimonials</p>
          <h2 className="section-title">Recommendations</h2>
          <RecSlider />
        </div>
      </section>

      <section id="projects" className="section">
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

      <section id="blogs" className="section">
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

      <section id="contact" className="section">
        <div className="container">
          <p className="section-label">Say hello</p>
          <h2 className="section-title">Contact</h2>
          <p className="contact-intro">
            Open to opportunities in Australia, remote roles, and freelance projects.
          </p>
          <div className="contact-rows">
            <a href="mailto:khadgalovecoding2016@gmail.com" className="contact-row">
              <span className="contact-key">Email</span>
              <span className="contact-val">khadgalovecoding2016@gmail.com</span>
            </a>
            <a href="tel:+61432688763" className="contact-row">
              <span className="contact-key">Phone</span>
              <span className="contact-val">+61 (0) 432 688 763</span>
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
              <span className="contact-val">Perth, Western Australia</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
