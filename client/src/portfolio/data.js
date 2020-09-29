export default {
  aboutMe: {
    __html: `
    Hi, I'm Chappy Asel 👋
    <br/><br/>
    I'm a self-driven full stack developer eager to try new things and continue
    to expand on my areas of knowledge. I am currently studying Computer Science
    at the University of Washington and pursuing a position as a full-time
    developer at an exciting, results-driven company for this upcoming summer.
    <br/><br/>
    I've had the privilege of interning for a variety of companies, including
    [Apple](https://www.apple.com),
    [Facebook](https://about.fb.com/),
    [Lime](https://www.li.me),
    [Xevo](https://www.xevo.com),
    [Suplari](https://www.suplari.com),
    among others. While working at each of these companies, I have gained
    valuable insights into how both established companies and startups scale and
    function as well as how effective leaders and cutting-edge products are
    forged from positive, electric work environments.
    <br/><br/>
    Beyond developing products that solving real-world problems to improve
    people's lives, I enjoy challenging myself physically via weightlifting,
    organized endurance events, and hiking. I also enjoy spending time with my
    family and friends whenever I can find the time.
    <br/><br/>
    Below is a list of some of my recent personal projects. I have published two
    of these projects,
    [Homework App](https://apps.apple.com/us/app/id1097438761)
    and
    [Weightlifting App](https://apps.apple.com/us/app/id1266077653),
    to the iOS App Store which have a combined 350k+ installs. Homework App
    was acquired in early 2019 by a private investor with which I negotiated
    the terms personally.
    <br/><br/>
    For more details on each project, feel free to click on its respective link.
    If you have any further questions regarding my past work experience or
    credentials please feel free to check out my
    [LinkedIn](https://www.linkedin.com/in/chappyasel/)
    or
    [reach out](mailto:chappyasel@gmail.com)
    via the email listed at the top of my resume.
    `.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>'),
  },
  contacts: [
    {
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/in/chappyasel/',
      image: 'linkedin.png',
    },
    {
      name: 'Github',
      link: 'https://github.com/ChappyA12',
      image: 'github.png',
    },
    {
      name: 'Email',
      link: 'mailto:chappyasel@gmail.com',
      image: 'email.png',
    },
    {
      name: 'Phone',
      link: 'tel:+7036772825',
      image: 'phone.png',
    },
    {
      name: 'Facebook',
      link: 'https://www.facebook.com/chappy.asel',
      image: 'facebook.png',
    },
    {
      name: 'Twitter',
      link: 'https://twitter.com/ChappyA12',
      image: 'twitter.png',
    },
    {
      name: 'Instagram',
      link: 'https://www.instagram.com/chappya12/',
      image: 'instagram.png',
    },
  ],
  projects: {
    languages: [
      'HTML',
      'CSS',
      'JavaScript',
      'Objective C',
      'Python',
      'Node.js',
    ],
    list: [
      {
        name: 'Weightlifting App',
        link: 'https://apps.apple.com/us/app/id1266077653',
        image: 'weightlifting.jpg',
        languages: ['Objective C'],
      },
      {
        name: 'Homework App',
        link: 'https://apps.apple.com/us/app/id1097438761',
        image: 'homework.jpg',
        languages: ['Objective C'],
      },
      {
        name: 'Web Experiments',
        link: 'https://github.com/ChappyA12/WebExperiments_Backend',
        image: 'web-exp.jpg',
        languages: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
      },
      {
        name: 'Fantasy Basketball',
        link: 'https://github.com/ChappyA12/FantasyBasketball_iOS',
        image: 'fantasy.jpg',
        languages: ['Objective C'],
      },
      {
        name: 'Weightlifting App ML',
        link: 'https://github.com/ChappyA12/WeightliftingAppML_Python',
        image: 'weightlifting-ml.jpg',
        languages: ['Python'],
      },
      {
        name: 'Rotoworld ML',
        link: 'https://github.com/ChappyA12/RotoworldML_Python',
        image: 'rotoworld-ml.jpg',
        languages: ['Python'],
      },
    ],
  },
}
