import React from "react";

const AboutPage = () => {
  const teamMembers = [
    { initial: "A", name: "Team Lead", role: "Frontend Developer" },
    { initial: "B", name: "Developer", role: "Backend Engineer" },
    { initial: "C", name: "Designer", role: "UI/UX Designer" },
    { initial: "D", name: "Researcher", role: "Data Collection" },
  ];

  return (
    <div className="page">
      <div className="about-content">
        <div className="about-card">
          <h2>About OAU Campus Navigator</h2>
          <p>
            The OAU Campus Navigator is a comprehensive digital solution
            designed to help students, especially freshers and direct-entry
            students, navigate the expansive Obafemi Awolowo University campus
            with ease and confidence.
          </p>

          <h3>Our Mission</h3>
          <p>
            To eliminate the stress and confusion of finding lecture venues and
            campus facilities, ensuring every student can focus on their
            academic journey rather than worrying about getting lost on campus.
          </p>

          <h3>Key Features</h3>
          <p>
            • Interactive search for all campus buildings and lecture theatres
          </p>
          <p>• Visual route guidance with images and landmarks</p>
          <p>• AI-powered chatbot for instant assistance</p>
          <p>• Mobile-responsive design for on-the-go access</p>
          <p>• Comprehensive database of campus locations</p>

          <h3>Development Team</h3>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <div className="team-avatar">{member.initial}</div>
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
