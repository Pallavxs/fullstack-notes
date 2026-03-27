import Card from './components/Card.jsx'
import './index.css'

function App() {

  const user = [
  {
    fullName: "Shreyansh Patel",
    jobTitle: "Frontend Developer",
    skills: ["React", "Tailwind CSS", "JavaScript"],
    description: "Passionate frontend developer who builds responsive and user-friendly web interfaces.",
    pricePerHour: 15,
    profileImg: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    fullName: "Aarav Sharma",
    jobTitle: "Backend Developer",
    skills: ["Node.js", "Express", "MongoDB"],
    description: "Experienced backend developer focused on scalable APIs.",
    pricePerHour: 20,
    profileImg: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    fullName: "Priya Verma",
    jobTitle: "UI/UX Designer",
    skills: ["Figma", "Adobe XD", "User Research"],
    description: "Creative designer crafting intuitive user experiences.",
    pricePerHour: 18,
    profileImg: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    fullName: "Rohit Singh",
    jobTitle: "Full Stack Developer",
    skills: ["React", "Node.js", "PostgreSQL"],
    description: "Handles both frontend and backend like a pro.",
    pricePerHour: 25,
    profileImg: "https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    fullName: "Neha Gupta",
    jobTitle: "Mobile App Developer",
    skills: ["React Native", "Flutter", "Firebase"],
    description: "Builds high-performance mobile applications.",
    pricePerHour: 22,
    profileImg: "https://randomuser.me/api/portraits/women/5.jpg"
  },
  {
    fullName: "Karan Mehta",
    jobTitle: "DevOps Engineer",
    skills: ["Docker", "AWS", "CI/CD"],
    description: "Automates deployment pipelines and cloud infrastructure.",
    pricePerHour: 30,
    profileImg: "https://randomuser.me/api/portraits/men/6.jpg"
  },
  {
    fullName: "Ananya Das",
    jobTitle: "Data Analyst",
    skills: ["Python", "Pandas", "SQL"],
    description: "Transforms raw data into meaningful insights.",
    pricePerHour: 19,
    profileImg: "https://randomuser.me/api/portraits/women/7.jpg"
  },
  {
    fullName: "Vikram Joshi",
    jobTitle: "Cybersecurity Specialist",
    skills: ["Network Security", "Ethical Hacking", "Encryption"],
    description: "Protects systems from digital threats and vulnerabilities.",
    pricePerHour: 35,
    profileImg: "https://randomuser.me/api/portraits/men/8.jpg"
  },
  {
    fullName: "Sneha Kapoor",
    jobTitle: "Content Writer",
    skills: ["SEO", "Copywriting", "Blogging"],
    description: "Creates engaging and optimized content for the web.",
    pricePerHour: 12,
    profileImg: "https://randomuser.me/api/portraits/women/9.jpg"
  },
  {
    fullName: "Kanshana Roy",
    jobTitle: "Digital Creator",
    skills: ["Digi tools", "Copywriting", "Blogging"],
    description: "Creates engaging and optimized content for the web.",
    pricePerHour: 12,
    profileImg: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shreyansh"
  }
];


  return (
    <div className='bg-gray-500 min-h-screen flex flex-wrap justify-center gap-6 p-6'>
      {user.map((elem) => {
        return <Card user={elem}/>
      })}
    </div>
  )
}

export default App;
