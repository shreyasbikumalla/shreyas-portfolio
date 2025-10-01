import React, { useState, useRef, useEffect } from 'react';

const AIAssistant = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi! I'm Shreyas's AI assistant! 🤖 Ask me anything about his portfolio, skills, experience, or projects!"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Portfolio knowledge base
  const portfolioQA = {
    // Skills and Technologies
    skills: {
      keywords: ['skills', 'technologies', 'tech stack', 'programming', 'languages', 'frameworks', 'technical'],
      answer: "Shreyas has extensive technical expertise:\n\n🔧 **Programming Languages:** Python, Java, C++, C, JavaScript, TypeScript, SQL, Go\n\n🌐 **Web Technologies:** ReactJS, AngularJS, NodeJS, REST APIs, HTML/CSS, JSON, XML\n\n☁️ **Cloud & DevOps:** AWS (Lambda, S3, EC2), Microsoft Azure, GCP, Docker, Kubernetes, Terraform, Jenkins\n\n🤖 **Machine Learning:** TensorFlow, Keras, PyTorch, scikit-learn, CUDA/GPU Acceleration\n\n💾 **Databases:** MySQL, PostgreSQL, MongoDB, DynamoDB, SQLite, Snowflake\n\n📊 **Data Analysis:** Power BI, Tableau, Excel, DOMO, ETL pipelines\n\n🛠️ **Tools:** Git, GitHub, Jira, Flask, SpringBoot, Linux"
    },
    
    // Education
    education: {
      keywords: ['education', 'degree', 'university', 'college', 'masters', 'computer science', 'gpa', 'coursework'],
      answer: "🎓 **Education Background:**\n\n**Master's in Computer Science** (Aug 2023 – May 2025)\n📍 Michigan State University, East Lansing, MI\n📊 GPA: 3.8/4.0\n📚 Coursework: Artificial Intelligence, AIoT, Operating Systems, Cloud Computing\n\n**Bachelor's in Computer Science** (Aug 2019 – May 2023)\n📍 Vishwakarma Institute of Information Technology, Pune, India\n📊 CGPA: 3.9/4.0\n📚 Coursework: Machine Learning, AI, Computer Networks, Distributed Systems"
    },
    
    // Experience
    experience: {
      keywords: ['experience', 'work', 'job', 'career', 'professional', 'internship', 'teaching', 'research'],
      answer: "💼 **Professional Experience:**\n\n🎓 **Graduate Teaching Assistant** (Aug 2024 – May 2025)\n📍 Michigan State University\n• Supported 200+ students in C++, SQL, microservices, Docker\n• Led web app deployment workshops, reduced errors by 15%\n\n🔬 **Software Engineer - Research** (Dec 2024 – May 2025)\n📍 Michigan State University\n• Optimized C++/CUDA kernels, accelerated runtimes by 80%\n• Automated ParaView visualization, streamlined analysis by 40%\n\n📊 **Data Analyst Intern** (Jan 2023 – May 2023)\n📍 Colgate Palmolive, Mumbai\n• Built MySQL-to-Snowflake ETL pipeline, cut refresh cycles by 60%\n• Enhanced reporting across 20+ regions\n\n💻 **Software Engineer** (Sept 2022 – Dec 2022)\n📍 Innobytes, Pune\n• Built full-stack financial platform with React/Redux, PostgreSQL\n• Improved ML model accuracy by 30% with PyTorch/TensorFlow"
    },
    
    // Projects
    projects: {
      keywords: ['projects', 'portfolio', 'work', 'built', 'developed', 'created', 'github', 'machine learning'],
      answer: "🚀 **Key Projects:**\n\n🧠 **Graph Convolutional Network for Node Classification**\n• Implemented GCN with PyTorch Geometric\n• Achieved 85%+ accuracy on structured graph data\n• GitHub: shreyasbikumalla/Graph-convolutional-network\n\n🎵 **AI-ML for Speech Enhancement**\n• Two-stage Conv-TasNet deep learning model\n• Improved PESQ from 1.95→3.25, STOI from 0.72→0.92\n• Technologies: MATLAB, PyTorch\n\n🚦 **Traffic Signal Optimization**\n• Multi-objective algorithms (NSGA-II, MOEA/D)\n• Minimized wait time and congestion\n• Real-time traffic data processing\n\n🎬 **IMDB Genre Classifier**\n• 27-class classification with imbalanced data\n• Combined ML and deep learning approaches\n• Technologies: Python, scikit-learn, Keras"
    },
    
    // Contact
    contact: {
      keywords: ['contact', 'email', 'phone', 'reach', 'hire', 'connect', 'linkedin'],
      answer: "You can reach Shreyas at:\n📧 shreyasbikumalla@gmail.com\n📱 (334) 663-0810\n💼 LinkedIn: shreyas-bikumalla-178475193\n💻 GitHub: shreyasbikumalla\n\nHe's always open to discussing new opportunities!"
    },
    
    // Certifications
    certifications: {
      keywords: ['certifications', 'certified', 'credentials', 'certificates', 'google', 'cisco', 'ccna'],
      answer: "🏆 **Professional Certifications:**\n\n📊 **Google Data Analytics Professional**\n📅 May 2025 | Issued by Google\n\n🌐 **Cisco Certified Network Associate (CCNA)**\n📅 December 2022 | Issued by Cisco\n\nThese certifications demonstrate expertise in data analytics and network administration!"
    },
    
    // General
    about: {
      keywords: ['about', 'who', 'background', 'bio', 'story', 'shreyas'],
      answer: "👨‍💻 **About Shreyas Srinivas Bikumalla:**\n\nShreyas is a dedicated Computer Science Master's student at Michigan State University with a strong academic record (3.8 GPA). He combines theoretical knowledge with practical experience across:\n\n• **Teaching & Mentoring**: Currently supporting 200+ students as a Graduate TA\n• **Research**: Optimizing high-performance computing systems with C++/CUDA\n• **Industry Experience**: From fintech startups to Fortune 500 companies\n• **Global Perspective**: Experience in India and the United States\n\nHis passion lies in leveraging AI/ML and cloud technologies to solve real-world problems!"
    },
    
    // Robot/Fun
    robot: {
      keywords: ['robot', 'ai', 'assistant', 'you', 'cool', 'awesome'],
      answer: "Thanks! I'm Shreyas's portfolio AI assistant! 🤖✨ I was built to help visitors learn more about his skills and experience. Pretty cool that I have cursor-following eyes and can do a 360° spin, right? Try clicking me multiple times for a surprise! 😉"
    },

    // Specific Technology Questions
    python: {
      keywords: ['python', 'pytorch', 'tensorflow', 'keras', 'scikit-learn', 'machine learning'],
      answer: "🐍 **Python Expertise:**\n\nShreyas is highly proficient in Python with extensive experience in:\n• **ML Frameworks**: TensorFlow, Keras, PyTorch, scikit-learn\n• **Projects**: Speech enhancement, graph neural networks, genre classification\n• **Applications**: Data analysis, ETL pipelines, research automation\n• **Performance**: Achieved 85%+ accuracy in GCN models, improved speech PESQ from 1.95→3.25"
    },

    // Cloud & DevOps
    cloud: {
      keywords: ['aws', 'azure', 'gcp', 'cloud', 'docker', 'kubernetes', 'devops'],
      answer: "☁️ **Cloud & DevOps Experience:**\n\n• **AWS**: Lambda, S3, EC2, DynamoDB - used in production financial platforms\n• **Microsoft Azure**: Multi-cloud experience\n• **GCP**: Google Cloud Platform projects\n• **Containerization**: Docker, Kubernetes for scalable deployments\n• **Infrastructure**: Terraform for infrastructure as code\n• **CI/CD**: Jenkins, Git-driven pipelines that cut refresh cycles by 60%"
    },

    // Data & Analytics
    data: {
      keywords: ['data', 'analytics', 'etl', 'pipeline', 'snowflake', 'mysql', 'database'],
      answer: "📊 **Data & Analytics Expertise:**\n\n• **ETL Pipelines**: Built MySQL-to-Snowflake production pipeline at Colgate Palmolive\n• **Databases**: MySQL, PostgreSQL, MongoDB, DynamoDB, SQLite\n• **Analytics Tools**: Power BI, Tableau, Excel, DOMO\n• **Performance**: Cut data refresh cycles by 60%, enhanced reporting across 20+ regions\n• **Scale**: Handled multi-currency reporting solutions globally"
    }
  };

  const findBestMatch = (userInput) => {
    const input = userInput.toLowerCase();
    
    for (const [category, data] of Object.entries(portfolioQA)) {
      if (data.keywords.some(keyword => input.includes(keyword))) {
        return data.answer;
      }
    }
    
    // Default responses for unmatched queries
    const defaultResponses = [
      "That's an interesting question! You can find more details in the relevant sections of Shreyas's portfolio. Is there something specific about his skills, projects, or experience you'd like to know?",
      "I'd love to help! Try asking about Shreyas's skills, education, projects, experience, or how to contact him. What would you like to know?",
      "Great question! Feel free to explore the different sections of the portfolio, or ask me about his technical skills, work experience, or projects!"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = { type: 'user', text: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = findBestMatch(inputValue);
      const botMessage = { type: 'bot', text: botResponse };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 seconds delay
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What are your Python/ML skills?",
    "Tell me about your GitHub projects",
    "What's your experience at Michigan State?",
    "How can I contact you?",
    "What cloud technologies do you use?",
    "What certifications do you have?"
  ];

  if (!isOpen) return null;

  return (
    <div className="ai-assistant-overlay">
      <div className="ai-assistant-modal">
        <div className="ai-assistant-header">
          <div className="ai-assistant-title">
            <span className="ai-icon">🤖</span>
            <h3>Portfolio AI Assistant</h3>
          </div>
          <button className="ai-close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="ai-messages-container">
          {messages.map((message, index) => (
            <div key={index} className={`ai-message ${message.type}`}>
              <div className="ai-message-content">
                {message.text.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="ai-message bot">
              <div className="ai-message-content ai-typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="ai-quick-questions">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              className="ai-quick-btn"
              onClick={() => {
                setInputValue(question);
                setTimeout(() => handleSendMessage(), 100);
              }}
            >
              {question}
            </button>
          ))}
        </div>
        
        <div className="ai-input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about Shreyas's portfolio..."
            className="ai-input"
          />
          <button 
            onClick={handleSendMessage}
            className="ai-send-btn"
            disabled={!inputValue.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
