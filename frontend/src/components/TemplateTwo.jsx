import React from 'react';

const TemplateTwo = ({ resumeData, sectionOrder = ['summary', 'experience', 'education', 'skills', 'projects', 'achievements'], selectedFont = 'Times New Roman' }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const formatDateRange = (startDate, endDate) => {
    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : 'Present';
    return `${start} - ${end}`;
  };

  const renderBulletPoints = (text) => {
    if (!text) return null;
    
    // Split into points first, then handle bold formatting
    const points = text.split('\n').filter(point => point.trim());
    
    return (
      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
        {points.map((point, index) => {
          // Convert **bold** markers to HTML and make technologies bolder
          let enhancedPoint = point
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\b(React|JavaScript|Node\.js|Python|Java|C\+\+|HTML|CSS|MongoDB|MySQL|PostgreSQL|AWS|Docker|Git|TypeScript|Angular|Vue\.js|Express\.js|Django|Flask|Spring|Laravel|PHP|Ruby|Go|Rust|Swift|Kotlin|Scala|R|MATLAB|TensorFlow|PyTorch|Kubernetes|Jenkins|Jira|Figma|Adobe|Photoshop|Illustrator|Sketch|Blender|Unity|Unreal|Maya|3ds Max|AutoCAD|SolidWorks|Fusion 360|Arduino|Raspberry Pi|Linux|Windows|macOS|iOS|Android|Flutter|React Native|Xamarin|Ionic|Cordova|PhoneGap|Bootstrap|Tailwind|Sass|Less|Webpack|Babel|ESLint|Prettier|Jest|Mocha|Chai|Cypress|Selenium|Postman|Insomnia|Swagger|GraphQL|REST|SOAP|gRPC|WebSocket|Socket\.io|Redis|Elasticsearch|Kafka|RabbitMQ|Apache|Nginx|IIS|Tomcat|JBoss|WebLogic|WebSphere|Docker|Kubernetes|Helm|Terraform|Ansible|Chef|Puppet|Salt|Vagrant|VirtualBox|VMware|Hyper-V|OpenStack|AWS|Azure|GCP|Heroku|Netlify|Vercel|Firebase|Supabase|Stripe|PayPal|Twilio|SendGrid|Mailgun|Slack|Discord|Teams|Zoom|Skype|Trello|Asana|Monday|Notion|Confluence|Jira|Bitbucket|GitLab|GitHub|SVN|Mercurial|Perforce|ClearCase|Rational|StarTeam|AccuRev|Plastic SCM|Fossil|Darcs|Bazaar|Monotone|Veracity|SourceGear|Vault|Dimensions|Integrity|Synergy|ClearCase|Rational|StarTeam|AccuRev|Plastic SCM|Fossil|Darcs|Bazaar|Monotone|Veracity|SourceGear|Vault|Dimensions|Integrity|Synergy)\b/gi, '<strong>$1</strong>');
          
          return (
            <li key={index} dangerouslySetInnerHTML={{ __html: enhancedPoint.trim() }} />
          );
        })}
      </ul>
    );
  };

  const renderSection = (sectionName) => {
    switch (sectionName) {
      case 'summary':
        return resumeData.summary && resumeData.summary.trim() ? (
          <section key="summary" className="mb-3">
            <h2 className="text-lg font-normal text-black mb-2 border-b border-black pb-1">
              Professional Summary
            </h2>
            <div className="text-gray-700 text-sm leading-relaxed pl-3">
              {renderBulletPoints(resumeData.summary)}
            </div>
          </section>
        ) : null;

      case 'experience':
        return resumeData.experience && resumeData.experience.length > 0 && resumeData.experience.some(exp => exp.position || exp.company || exp.description) ? (
          <section key="experience" className="mb-3">
            <h2 className="text-lg font-normal text-black mb-2 border-b border-black pb-1">
              Work Experience
            </h2>
            <div className="space-y-2">
              {resumeData.experience.map((exp, index) => (
                <div key={exp.id || index} className="pl-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-black text-sm">{exp.position}{exp.company ? ` at ${exp.company}` : ''}</h3>
                    </div>
                    <span className="text-xs text-gray-600">
                      {formatDateRange(exp.startDate, exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <div className="mt-2 pl-3">
                      {renderBulletPoints(exp.description)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case 'education':
        return resumeData.education && resumeData.education.length > 0 && resumeData.education.some(edu => edu.institution || edu.degree || edu.field) ? (
          <section key="education" className="mb-3">
            <h2 className="text-lg font-normal text-black mb-2 border-b border-black pb-1">
              Education
            </h2>
            <div className="space-y-2">
              {resumeData.education.map((edu, index) => (
                <div key={edu.id || index} className="pl-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-black text-sm">{edu.institution}</h3>
                      <p className="text-gray-700 text-sm italic">{edu.degree} - {edu.field} {edu.gpa && `(CGPA: ${edu.gpa})`}</p>
                    </div>
                    <span className="text-xs text-gray-600">
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case 'skills':
        return resumeData.skills && resumeData.skills.trim() ? (
          <section key="skills" className="mb-3">
            <h2 className="text-lg font-normal text-black mb-2 border-b border-black pb-1">
              Technical Skills
            </h2>
            <div className="space-y-2 pl-3">
              {resumeData.skills.split('\n').map((skillGroup, index) => {
                const [category, skills] = skillGroup.split(':');
                if (!category || !skills) return null;
                return (
                  <div key={index} className="mb-2">
                    <span className="font-bold text-black text-sm">{category.trim()}: </span>
                    <span className="text-gray-700 text-sm">{skills.trim()}</span>
                  </div>
                );
              })}
            </div>
          </section>
        ) : null;

      case 'projects':
        return resumeData.projects && resumeData.projects.length > 0 && resumeData.projects.some(project => project.name || project.description) ? (
          <section key="projects" className="mb-3">
            <h2 className="text-lg font-normal text-black mb-2 border-b border-black pb-1">
              Projects
            </h2>
            <div className="space-y-2">
              {resumeData.projects.map((project, index) => (
                <div key={project.id || index} className="pl-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-black text-sm">
                        {project.name}
                        {project.technologies && (
                          <span className="text-gray-600 font-normal text-xs ml-2 italic">{project.technologies}</span>
                        )}
                      </h3>
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-black text-xs font-medium"
                      >
                        Link
                      </a>
                    )}
                  </div>
                  {project.description && (
                    <div className="mt-2 pl-3">
                      {renderBulletPoints(project.description)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null;

      case 'achievements':
        return resumeData.achievements && resumeData.achievements.length > 0 && resumeData.achievements.some(achievement => achievement.title || achievement.description) ? (
          <section key="achievements" className="mb-3">
            <h2 className="text-lg font-normal text-black mb-2 border-b border-black pb-1">
              Achievements & Awards
            </h2>
            <div className="space-y-2">
              {resumeData.achievements.map((achievement, index) => (
                <div key={achievement.id || index} className="pl-3">
                  <h3 className="font-bold text-black text-sm mb-1">{achievement.title}</h3>
                  {achievement.description && (
                    <div className="mt-2 pl-3">
                      {renderBulletPoints(achievement.description)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ) : null;

      default:
        return null;
    }
  };

  // Get font family based on selected font
  const getFontFamily = (fontName) => {
    const fontMap = {
      'Times New Roman': 'Times New Roman, serif',
      'Segoe UI': 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      'Georgia': 'Georgia, Times, serif',
      'Arial': 'Arial, Helvetica, sans-serif',
      'Verdana': 'Verdana, Geneva, sans-serif',
      'Calibri': 'Calibri, Candara, Segoe, Optima, Arial, sans-serif',
      'Cambria': 'Cambria, Georgia, serif',
      'Tahoma': 'Tahoma, Geneva, Verdana, sans-serif'
    };
    return fontMap[fontName] || 'Times New Roman, serif';
  };

  return (
    <div className="p-2 print:p-2 bg-white text-gray-900 print:bg-white" style={{ fontFamily: getFontFamily(selectedFont) }}>
      {/* Header */}
      <header className="text-center border-b-4 border-black pb-2 mb-3">
        <h1 className="text-3xl font-bold text-black mb-2 tracking-wide">
          {resumeData.personalInfo.name || 'Your Name'}
        </h1>
        <div className="flex justify-center flex-wrap gap-4 text-xs text-gray-600">
          {resumeData.personalInfo.email && (
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {resumeData.personalInfo.email}
            </span>
          )}
          {resumeData.personalInfo.phone && (
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {resumeData.personalInfo.phone}
            </span>
          )}
          {resumeData.personalInfo.location && (
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {resumeData.personalInfo.location}
            </span>
          )}
          {resumeData.personalInfo.linkedin && (
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </span>
          )}
        </div>
      </header>

      {/* Dynamic Sections */}
      {sectionOrder.map(sectionName => renderSection(sectionName))}
    </div>
  );
};

export default TemplateTwo; 