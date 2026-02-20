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
          <p className="hero-label">Khadga Bahadur Shrestha</p>
          <h1>Senior Software Engineer<br />&amp; DevOps Engineer</h1>
          <p className="hero-intro">
            Software Engineer with 7+ years of experience designing and operating highly available
            cloud platforms. At PortPro, I manage infrastructure for 100+ microservices with strict
            uptime SLAs and reduced deployment time by 60% building fast, reliable CI/CD systems.
            I also handle mobile app releases with crash reporting, manage database migrations
            and monitoring, and support developers with infrastructure and server tooling.
            My background in full-stack development (Flutter, React, Node.js) gives me a unique
            edge&thinsp;&mdash;&thinsp;I build infrastructure from a developer&rsquo;s perspective, ensuring
            systems are observable, resilient, and easy to operate.
          </p>
          <div className="hero-strengths">
            <h2>Core Strengths</h2>
            <ul>
              <li>Platform Engineering &amp; Cloud Architecture (AWS, Kubernetes, Terraform)</li>
              <li>CI/CD &amp; Automation (GitHub Actions, Docker, GitOps)</li>
              <li>Databases &amp; Data Operations (MongoDB, PostgreSQL, Redis, TimescaleDB)</li>
              <li>Observability, Disaster Recovery &amp; Reliability</li>
              <li>Developer Experience &amp; Internal Tooling</li>
            </ul>
          </div>
          <div className="hero-actions">
            <a href="mailto:khadgalovecoding2016@gmail.com" className="hero-btn-primary">Get in touch</a>
            <a href="https://github.com/kodega2016" target="_blank" rel="noopener noreferrer" className="hero-btn">GitHub</a>
            <a href="https://linkedin.com/in/kodega" target="_blank" rel="noopener noreferrer" className="hero-btn">LinkedIn</a>
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
                <h3>Senior Software Engineer / DevOps Engineer</h3>
                <p className="exp-company">PortPro Pvt. Ltd. &middot; Kathmandu, Nepal</p>

                <h4 className="exp-subhead">Cloud Infrastructure &amp; Architecture</h4>
                <ul className="exp-bullets">
                  <li>Architected and automated AWS infrastructure using Terraform modules for VPC, EC2, ECS (Fargate &amp; EC2), App Runner, ALB, and Auto Scaling Groups, managing multi-region deployments</li>
                  <li>Provisioned, configured, and monitored managed services including Amazon RDS (PostgreSQL), ElastiCache (Redis), and Amazon MQ (RabbitMQ), ensuring high availability and optimal performance</li>
                  <li>Managed and maintained AWS Elastic Beanstalk and App Runner environments for application deployment, scaling, and lifecycle management</li>
                  <li>Configured and managed Amazon Route 53 for DNS management, domain routing, health checks, and failover strategies across production environments</li>
                  <li>Designed high-availability production systems supporting large-scale microservices architecture with strict uptime requirements</li>
                  <li>Implemented environment segregation across development, staging, and production with secure IAM policies and VPC peering strategies</li>
                  <li>Performed infrastructure cost optimization through right-sizing, automation, and efficient resource management, significantly reducing cloud expenditure</li>
                  <li>Deployed and managed containerized applications on Google Cloud Run and Firebase Cloud Functions for scalable and cost-effective service delivery</li>
                  <li>Worked with Microsoft Azure services including Azure App Service, AKS, Blob Storage, Container Instances, and Virtual Networks for multi-cloud deployments</li>
                </ul>

                <h4 className="exp-subhead">Containerization &amp; Orchestration</h4>
                <ul className="exp-bullets">
                  <li>Built and maintained production Kubernetes clusters with k3d, implementing GitOps workflows using ArgoCD for declarative infrastructure management</li>
                  <li>Containerized applications using Docker and managed orchestration via Amazon ECS and Kubernetes, optimizing container images for improved build times and deployment efficiency</li>
                </ul>

                <h4 className="exp-subhead">CI/CD &amp; Deployment Automation</h4>
                <ul className="exp-bullets">
                  <li>Designed and maintained comprehensive CI/CD pipelines using GitHub Actions and Jenkins, significantly reducing deployment time and improving reliability</li>
                  <li>Implemented blue-green and rolling deployment strategies for zero-downtime releases across all production services</li>
                  <li>Created deployment automation tools and scripts for ECS services, enabling rapid hot-fix release strategies for critical bug resolution</li>
                </ul>

                <h4 className="exp-subhead">Monitoring, Reliability &amp; Incident Management</h4>
                <ul className="exp-bullets">
                  <li>Implemented centralized monitoring using New Relic, AWS CloudWatch, Prometheus, and Grafana, significantly reducing mean time to detection (MTTD)</li>
                  <li>Conducted root cause analysis for production incidents, creating detailed runbooks and documentation for 24/7 support teams</li>
                  <li>Maintained high uptime SLA across all critical microservices through proactive monitoring and rapid incident response</li>
                </ul>

                <h4 className="exp-subhead">Database &amp; Data Operations</h4>
                <ul className="exp-bullets">
                  <li>Administered MongoDB Atlas clusters at scale, performing daily monitoring, query optimization, and capacity planning for high-traffic applications</li>
                  <li>Executed large-scale data migrations of 60 million+ records using custom SQL scripts and batch processing strategies, ensuring zero downtime</li>
                  <li>Executed complex database migrations using AWS DMS across PostgreSQL, TimescaleDB, and Redis deployments with zero downtime</li>
                  <li>Performed MongoDB database migrations, backup, and restore operations from MongoDB and PostgreSQL snapshots, ensuring data integrity and recoverability</li>
                  <li>Designed and executed database schema migrations and structural operations, managing evolving data models across multiple environments</li>
                  <li>Designed database schemas, implemented indexing strategies, and optimized query performance for improved response times</li>
                </ul>

                <h4 className="exp-subhead">Disaster Recovery &amp; Business Continuity</h4>
                <ul className="exp-bullets">
                  <li>Designed and implemented disaster recovery procedures with strict Recovery Time Objectives (RTO) for critical services, conducting quarterly DR drills</li>
                  <li>Implemented multi-region redundancy strategies and automated backup solutions for databases and critical applications</li>
                </ul>

                <h4 className="exp-subhead">Application Development &amp; Mobile Engineering</h4>
                <ul className="exp-bullets">
                  <li>Led mobile application design and development using Flutter with Clean Architecture, serving as the lead mobile developer for end-to-end delivery of iOS and Android applications</li>
                  <li>Coordinated with backend engineering teams to define API contracts, ensure seamless integration, and resolve cross-team technical dependencies</li>
                  <li>Integrated third-party SDKs including barcode/QR scanners, mapping services, turn-by-turn navigation, push notifications, and analytics platforms</li>
                  <li>Implemented crash reporting and analysis workflows using monitoring tools, proactively identifying and resolving application stability issues</li>
                  <li>Managed complete mobile release lifecycle including App Store and Google Play Store submissions, and hot-patch updates using Shorebird</li>
                  <li>Developed and maintained features for enterprise web applications using React.js, TypeScript, and Node.js with modern state management patterns</li>
                  <li>Developed and integrated backend services with RESTful APIs, third-party services, and implemented secure authentication using OAuth 2.0 and Firebase Authentication</li>
                  <li>Managed private Node.js package integration and package storage on GitHub Registry, maintaining internal shared libraries across teams</li>
                  <li>Wrote comprehensive test cases including unit tests, integration tests, and end-to-end tests; implemented automated test suites in CI/CD pipelines</li>
                </ul>
              </div>
              <span className="exp-row-date">Sep 2021 &ndash; Present</span>
            </div>

            <div className="exp-row">
              <div className="exp-row-left">
                <h3>Mobile Application Architect &amp; Full Stack Developer</h3>
                <p className="exp-company">Parentiv &middot; Remote</p>
                <ul className="exp-bullets">
                  <li>Designed application architecture using Flutter with Clean Architecture patterns and state management solutions for child care management platform serving thousands of users</li>
                  <li>Architected serverless backend infrastructure using Firebase Cloud Functions, Firestore, and Firebase Authentication, handling real-time data synchronization, offline capabilities, and secure multi-tenant access control</li>
                  <li>Built administrative web dashboard using React.js, later migrated to Flutter Web for code sharing and cross-platform consistency</li>
                  <li>Implemented CI/CD pipelines for automated building, testing, and deployment of iOS and Android applications, significantly reducing release cycle time</li>
                  <li>Optimized application performance achieving fast cold start times and smooth rendering across all supported devices</li>
                </ul>
              </div>
              <span className="exp-row-date">Jan 2019 &ndash; Sep 2021</span>
            </div>

            <div className="exp-row">
              <div className="exp-row-left">
                <h3>Full Stack Developer</h3>
                <p className="exp-company">Paailatechnologies &middot; Biratnagar, Nepal</p>
                <ul className="exp-bullets">
                  <li>Designed and developed RESTful APIs using Laravel framework with optimized MySQL database schemas for job portal and television channel applications</li>
                  <li>Built cross-platform mobile applications using Flutter integrated with Laravel backend APIs for seamless data synchronization</li>
                  <li>Managed complete application lifecycle from development to App Store and Google Play Store releases</li>
                </ul>
              </div>
              <span className="exp-row-date">May 2018 &ndash; Oct 2019</span>
            </div>

            <div className="exp-row">
              <div className="exp-row-left">
                <h3>Junior Web Developer</h3>
                <p className="exp-company">Delta Tech &middot; Biratnagar, Nepal</p>
                <ul className="exp-bullets">
                  <li>Developed responsive web applications using HTML5, CSS3, JavaScript, Bootstrap, and backend services using PHP and CodeIgniter framework</li>
                  <li>Integrated third-party services including Google Sign-In authentication and Google Sheets API for data management</li>
                  <li>Delivered web solutions for e-commerce platforms and business applications across the complete software development lifecycle</li>
                </ul>
              </div>
              <span className="exp-row-date">Mar 2016 &ndash; May 2018</span>
            </div>

          </div>
        </div>
      </section>

      <section id="skills" className="section">
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

      <section id="education" className="section">
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
              <span className="contact-val">Perth, Western Australia</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
