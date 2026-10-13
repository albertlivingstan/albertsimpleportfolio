const fs = require('fs');

const extractCertificates = () => {
    const html = fs.readFileSync('old_portfolio/certificates.html', 'utf8');
    const regex = /<div class="card">\s*<img src="([^"]+)"[^>]*>\s*(?:<div class="card-content">\s*)?<h3>(.*?)<\/h3>\s*<p>(.*?)<\/p>/gs;
    const certs = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
        certs.push({
            img: match[1],
            title: match[2].trim(),
            date: match[3].trim()
        });
    }
    return certs;
};

const certs = extractCertificates();
const dataContent = `export const certificates = ${JSON.stringify(certs, null, 2)};

export const projectsData = [
  {
    id: 'fittrack',
    title: 'FitTrack – Health & Fitness App',
    desc: 'Health & fitness tracking platform with reminders and full user authentication.',
    mainImg: 'images/fittrack/fittrackpr.png',
    images: [
      "images/fittrack/Screenshot 2025-10-30 at 8.05.56 PM.png",
      "images/fittrack/Screenshot 2025-10-30 at 10.45.51 PM.png",
      "images/fittrack/1767213388479.jpeg",
      "images/fittrack/Web Development Internship.png"
    ],
    video: "1164942668",
    tags: ['React', 'Node.js', 'MongoDB']
  },
  {
    id: 'robot',
    title: 'Human Following Robot',
    desc: 'IoT-based robot that tracks humans using sensors and automated navigation.',
    mainImg: 'images/human/human follwing.png',
    images: [
      "images/human/human.jpeg",
      "images/human/robo.jpeg",
      "images/human/1739603575625.jpeg"
    ],
    video: "1164942922",
    tags: ['IoT', 'Hardware', 'C++']
  },
  {
    id: 'MVRbookme',
    title: 'MVRbookme – Movie Ticket Booking System',
    desc: 'Movie ticket booking website with an integrated cab scheduling feature for on-time arrival.',
    mainImg: 'images/mvrbook me/1741959241378.jpeg',
    images: [
      "images/mvrbook me/1741959241378.jpeg",
      "images/mvrbook me/1741959221741.jpeg",
      "images/mvrbook me/Nexus Global Solutions.png"
    ],
    video: "1164942938",
    tags: ['MERN Stack', 'Booking API']
  },
  {
    id: 'MINDKRAFT26_CHESS_TOURNAMENT',
    title: "MINDKRAFT'26 CHESS TOURNAMENT",
    desc: 'Complete chess tournament management system to handle participants and brackets.',
    mainImg: "images/MINDKRAFT'26_CHESS_TOURNAMENT/Screenshot 2026-03-07 at 11.05.22 PM.png",
    images: [
      "images/MINDKRAFT'26_CHESS_TOURNAMENT/Screenshot 2026-03-18 at 12.48.10 PM.png",
      "images/MINDKRAFT'26_CHESS_TOURNAMENT/Screenshot 2026-03-18 at 12.48.19 PM.png",
      "images/MINDKRAFT'26_CHESS_TOURNAMENT/Screenshot 2026-03-18 at 12.48.43 PM.png",
      "images/MINDKRAFT'26_CHESS_TOURNAMENT/Screenshot 2026-03-18 at 12.48.34 PM.png",
      "images/MINDKRAFT'26_CHESS_TOURNAMENT/Screenshot 2026-03-18 at 12.48.51 PM.png"
    ],
    video: "1171350769",
    tags: ['Web', 'Management']
  },
  {
    id: 'ChaosOps',
    title: 'ChaosOps',
    desc: 'DevOps automation tools for streamlined CI/CD processes and infrastructure.',
    mainImg: 'images/ChaosOps/Screenshot 2026-04-14 at 9.29.39 AM.png',
    images: [
      "images/ChaosOps/Screenshot 2026-04-10 at 11.47.01 PM.png",
      "images/ChaosOps/Screenshot 2026-04-10 at 11.47.19 PM.png",
      "images/ChaosOps/Screenshot 2026-04-14 at 9.27.47 AM.png",
      "images/ChaosOps/Screenshot 2026-04-14 at 9.34.02 AM.png"
    ],
    video: "1182855681",
    tags: ['DevOps', 'Automation']
  }
];
`;

fs.writeFileSync('src/data.js', dataContent);
console.log('Saved to src/data.js, extracted ' + certs.length + ' certificates.');
