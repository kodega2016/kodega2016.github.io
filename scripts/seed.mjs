import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const projects = [
  {
    slug: 'kubernetes-automation',
    title: 'Kubernetes Infrastructure Automation',
    meta: 'DevOps / Infrastructure / 2024',
    summary: 'Automated Kubernetes cluster management using Terraform and Helm charts. Implemented CI/CD pipelines for seamless deployments across multiple environments.',
    content: `<h2>Overview</h2>
<p>This project involved automating Kubernetes cluster management using Infrastructure as Code (IaC) principles. The goal was to create a scalable, maintainable infrastructure setup that could be version-controlled and deployed consistently across multiple environments.</p>

<h2>Technologies Used</h2>
<ul>
<li>Terraform for infrastructure provisioning</li>
<li>Helm charts for Kubernetes application deployment</li>
<li>Kustomize for environment-specific configurations</li>
<li>GitHub Actions for CI/CD automation</li>
<li>AWS EKS for managed Kubernetes clusters</li>
</ul>

<h2>Key Features</h2>
<ul>
<li>Automated cluster provisioning with Terraform</li>
<li>Multi-environment support (dev, staging, production)</li>
<li>Helm-based application deployments</li>
<li>Automated CI/CD pipelines for infrastructure changes</li>
<li>Infrastructure versioning and rollback capabilities</li>
</ul>

<h2>Challenges & Solutions</h2>
<p>One of the main challenges was managing different configurations across environments while maintaining consistency. This was solved by using Kustomize overlays that allowed environment-specific customizations while keeping a common base configuration.</p>
<p>Another challenge was ensuring security best practices. I implemented RBAC policies, network policies, and secrets management using AWS Secrets Manager integrated with Kubernetes.</p>

<h2>Results</h2>
<p>The automation reduced deployment time from hours to minutes. Infrastructure changes could now be reviewed through pull requests, ensuring better collaboration and reducing human errors. The setup also enabled quick disaster recovery through infrastructure recreation from code.</p>`,
  },
  {
    slug: 'flutter-mobile-app',
    title: 'Flutter Mobile Application',
    meta: 'Mobile Development / Flutter / 2023',
    summary: 'Built a production-ready mobile application using Flutter with Clean Architecture. Implemented TDD practices and automated CI/CD for Android and iOS releases.',
    content: `<h2>Overview</h2>
<p>Developed a production-ready mobile application using Flutter framework with Clean Architecture principles. The application serves as the core product for the company, handling complex business logic while maintaining code quality and testability.</p>

<h2>Architecture</h2>
<p>The application follows Clean Architecture with clear separation of concerns:</p>
<ul>
<li><strong>Presentation Layer:</strong> UI components, state management using Provider/Riverpod</li>
<li><strong>Domain Layer:</strong> Business logic, entities, and use cases</li>
<li><strong>Data Layer:</strong> Repositories, data sources, and API clients</li>
</ul>

<h2>Key Features</h2>
<ul>
<li>Cross-platform support (iOS and Android)</li>
<li>Offline-first architecture with local caching</li>
<li>Real-time data synchronization</li>
<li>Comprehensive test coverage (Unit, Widget, Integration tests)</li>
<li>Automated CI/CD for both platforms</li>
</ul>

<h2>Results</h2>
<p>The application achieved 95%+ test coverage and significantly reduced bug reports in production. The Clean Architecture approach made the codebase maintainable and allowed for easy feature additions. The automated CI/CD pipeline reduced release time from days to hours.</p>`,
  },
  {
    slug: 'cloud-monitoring-system',
    title: 'Cloud Monitoring & Observability',
    meta: 'DevOps / Monitoring / 2024',
    summary: 'Designed and implemented a comprehensive monitoring solution using New Relic and CloudWatch. Reduced incident response time by 60% through proactive alerting.',
    content: `<h2>Overview</h2>
<p>Designed and implemented a comprehensive monitoring and observability solution for cloud-native applications. The system provides real-time insights into application performance, infrastructure health, and business metrics.</p>

<h2>Monitoring Stack</h2>
<ul>
<li><strong>New Relic:</strong> Application Performance Monitoring (APM) and distributed tracing</li>
<li><strong>AWS CloudWatch:</strong> Infrastructure metrics, logs, and alarms</li>
<li><strong>Custom Dashboards:</strong> Business metrics and KPI tracking</li>
<li><strong>Alerting System:</strong> Multi-channel notifications (Slack, PagerDuty, Email)</li>
</ul>

<h2>Key Features</h2>
<ul>
<li>Real-time application performance monitoring</li>
<li>Infrastructure health dashboards</li>
<li>Automated alerting with intelligent routing</li>
<li>Distributed tracing across microservices</li>
<li>Log aggregation and analysis</li>
<li>Cost monitoring and optimization recommendations</li>
</ul>

<h2>Results</h2>
<p>The implementation resulted in a 60% reduction in incident response time. Proactive alerting helped identify and resolve issues before they impacted users. The comprehensive dashboards provided visibility into system behavior, enabling data-driven decisions for capacity planning and optimization.</p>`,
  },
  {
    slug: 'fullstack-web-app',
    title: 'Full-Stack Web Application',
    meta: 'Web Development / React / Node.js / 2022',
    summary: 'Developed a scalable web application using React.js frontend and Node.js backend. Implemented RESTful APIs and real-time features using WebSockets.',
    content: `<h2>Overview</h2>
<p>Developed a scalable full-stack web application with React.js frontend and Node.js backend. The application handles real-time data processing, user authentication, and complex business workflows.</p>

<h2>Technology Stack</h2>
<ul>
<li><strong>Frontend:</strong> React.js, Redux for state management, Material-UI for components</li>
<li><strong>Backend:</strong> Node.js, Express.js framework</li>
<li><strong>Database:</strong> PostgreSQL for relational data, MongoDB for document storage</li>
<li><strong>Real-time:</strong> WebSockets for live updates</li>
<li><strong>Authentication:</strong> JWT-based authentication with refresh tokens</li>
</ul>

<h2>Key Features</h2>
<ul>
<li>Responsive design for all device sizes</li>
<li>Real-time notifications and updates</li>
<li>RESTful API architecture</li>
<li>Role-based access control (RBAC)</li>
<li>File upload and management</li>
<li>Advanced search and filtering</li>
</ul>

<h2>Results</h2>
<p>The application successfully handles thousands of concurrent users with sub-second response times. The modular architecture made it easy to add new features and maintain the codebase. The real-time capabilities enhanced user experience significantly.</p>`,
  },
];

const blogs = [
  {
    slug: 'getting-started-with-kubernetes',
    title: 'Getting Started with Kubernetes',
    meta: 'DevOps / Kubernetes / January 2024',
    summary: 'An introduction to Kubernetes for beginners. Learn the fundamentals of container orchestration, pods, services, and deployments in this comprehensive guide.',
    content: `<h2>Introduction</h2>
<p>Kubernetes has become the de-facto standard for container orchestration. Whether you're deploying microservices, managing complex applications, or scaling your infrastructure, Kubernetes provides the tools and abstractions needed to run containerized applications efficiently.</p>

<h2>What is Kubernetes?</h2>
<p>Kubernetes (often abbreviated as K8s) is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. Originally developed by Google, it's now maintained by the Cloud Native Computing Foundation (CNCF).</p>

<h2>Core Concepts</h2>

<h3>Pods</h3>
<p>A Pod is the smallest deployable unit in Kubernetes. It represents a single instance of a running process in your cluster.</p>

<h3>Services</h3>
<p>Services provide a stable network endpoint to access your Pods. They abstract away the complexity of Pod IP addresses.</p>

<h3>Deployments</h3>
<p>Deployments manage the creation and updating of Pods. They provide declarative updates for Pods and ReplicaSets.</p>

<h2>Best Practices</h2>
<ul>
<li>Always use Deployments instead of creating Pods directly</li>
<li>Define resource requests and limits for your containers</li>
<li>Use ConfigMaps and Secrets for configuration management</li>
<li>Implement health checks with liveness and readiness probes</li>
<li>Use namespaces to organize resources</li>
</ul>

<h2>Conclusion</h2>
<p>Kubernetes can seem overwhelming at first, but understanding the core concepts and starting with simple deployments will help you build confidence. Start small, experiment, and gradually incorporate more advanced features as your needs grow.</p>`,
  },
  {
    slug: 'flutter-clean-architecture',
    title: 'Implementing Clean Architecture in Flutter',
    meta: 'Mobile Development / Flutter / December 2023',
    summary: 'Explore how to structure your Flutter applications using Clean Architecture principles. Best practices for maintainable and testable code.',
    content: `<h2>Introduction</h2>
<p>Clean Architecture is a software design philosophy that emphasizes separation of concerns and independence of frameworks. When applied to Flutter applications, it results in maintainable, testable, and scalable codebases.</p>

<h2>Why Clean Architecture?</h2>
<ul>
<li>Separating business logic from UI and data sources</li>
<li>Making code more testable</li>
<li>Enabling easier maintenance and updates</li>
<li>Allowing independent development of different layers</li>
</ul>

<h2>Layer Structure</h2>

<h3>Presentation Layer</h3>
<p>Contains UI components (Widgets), state management (Provider, Riverpod, Bloc), and presentation logic.</p>

<h3>Domain Layer</h3>
<p>The core of your application. Contains business logic, entities, and use cases. Independent of frameworks.</p>

<h3>Data Layer</h3>
<p>Handles data operations, API calls, local storage, and data transformation.</p>

<h2>Best Practices</h2>
<ul>
<li>Keep the domain layer pure - no Flutter dependencies</li>
<li>Use dependency injection for loose coupling</li>
<li>Implement repositories as interfaces in the domain layer</li>
<li>Handle errors at appropriate layers</li>
</ul>

<h2>Conclusion</h2>
<p>Clean Architecture in Flutter requires discipline and upfront planning, but the benefits in terms of maintainability and testability are significant. Start with a simple structure and evolve it as your application grows.</p>`,
  },
  {
    slug: 'terraform-aws-infrastructure',
    title: 'Infrastructure as Code with Terraform and AWS',
    meta: 'DevOps / Terraform / November 2023',
    summary: 'Learn how to manage AWS infrastructure using Terraform. From basic concepts to advanced patterns for scalable cloud deployments.',
    content: `<h2>What is Infrastructure as Code?</h2>
<p>Infrastructure as Code (IaC) is the practice of managing and provisioning infrastructure through machine-readable definition files. Terraform is one of the most popular tools for implementing IaC.</p>

<h2>Why Terraform?</h2>
<ul>
<li>Declarative configuration - describe what you want, not how to get it</li>
<li>Multi-cloud support - not limited to AWS</li>
<li>State management - tracks infrastructure changes</li>
<li>Plan and apply workflow - preview changes before applying</li>
<li>Large provider ecosystem</li>
</ul>

<h2>Basic Concepts</h2>

<h3>Providers</h3>
<p>Providers are plugins that Terraform uses to interact with cloud platforms.</p>

<h3>Resources</h3>
<p>Resources are the infrastructure components you want to create - EC2 instances, S3 buckets, VPCs, IAM roles.</p>

<h3>State</h3>
<p>Terraform maintains a state file that tracks the current state of your infrastructure.</p>

<h2>Best Practices</h2>
<ul>
<li>Use remote state (S3 backend) for team collaboration</li>
<li>Organize code into modules for reusability</li>
<li>Use variables for configuration values</li>
<li>Tag all resources appropriately</li>
<li>Version control your Terraform code</li>
</ul>

<h2>Conclusion</h2>
<p>Terraform with AWS provides a powerful way to manage infrastructure. Start with simple resources, gradually adopt best practices, and scale your infrastructure management as your needs grow.</p>`,
  },
  {
    slug: 'ci-cd-best-practices',
    title: 'CI/CD Best Practices for Modern Applications',
    meta: 'DevOps / CI/CD / October 2023',
    summary: 'Essential CI/CD practices for building reliable deployment pipelines. Tips and tricks for GitHub Actions and Jenkins automation.',
    content: `<h2>Introduction</h2>
<p>Continuous Integration and Continuous Deployment (CI/CD) are essential practices for modern software development. They enable teams to deliver code changes more frequently and reliably.</p>

<h2>Continuous Integration Best Practices</h2>

<h3>Automate Everything</h3>
<p>Every step of your build, test, and deployment process should be automated.</p>

<h3>Run Tests Early and Often</h3>
<p>Run unit tests, integration tests, and linting on every commit.</p>

<h3>Keep Builds Fast</h3>
<p>Use parallelization, caching, and incremental builds.</p>

<h2>Continuous Deployment Best Practices</h2>

<h3>Use Feature Flags</h3>
<p>Feature flags allow you to deploy code without immediately exposing it to users.</p>

<h3>Implement Blue-Green Deployments</h3>
<p>Maintain two identical production environments for zero-downtime deployments.</p>

<h3>Monitor Deployments</h3>
<p>Set up alerts for error rates, performance metrics, and business KPIs.</p>

<h2>Pipeline Design</h2>
<ul>
<li><strong>Build:</strong> Compile code and create artifacts</li>
<li><strong>Test:</strong> Run automated tests</li>
<li><strong>Security Scan:</strong> Check for vulnerabilities</li>
<li><strong>Deploy to Staging:</strong> Test in production-like environment</li>
<li><strong>Deploy to Production:</strong> Release to users</li>
</ul>

<h2>Conclusion</h2>
<p>Effective CI/CD pipelines are crucial for modern software development. Start with the basics, then gradually add more sophisticated practices. The goal is to reduce risk and increase confidence in your deployments.</p>`,
  },
];

async function seed() {
  console.log('Seeding projects...');
  for (const p of projects) {
    const { error } = await supabase.from('projects').upsert(p, { onConflict: 'slug' });
    if (error) console.error(`  Failed: ${p.slug} - ${error.message}`);
    else console.log(`  ✓ ${p.slug}`);
  }

  console.log('Seeding blogs...');
  for (const b of blogs) {
    const { error } = await supabase.from('blogs').upsert(b, { onConflict: 'slug' });
    if (error) console.error(`  Failed: ${b.slug} - ${error.message}`);
    else console.log(`  ✓ ${b.slug}`);
  }

  console.log('Done!');
}

seed();
