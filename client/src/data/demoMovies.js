const img = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const video = 'https://res.cloudinary.com/demo/video/upload/dog.mp4';

export const requestedMovieTitles = [
  'Emergency',
  'Hisaab Barabar',
  'Superboys of Malegaon',
  'Fateh',
  'Azaad',
  'Sky Force',
  'Chhaava',
  'The Diplomat',
  'Sikandar',
  'Jaat',
  'Kesari Chapter 2',
  'Ground Zero',
  'Raid 2',
  'Maalik',
  'War 2',
  'Bhool Chuk Maaf',
  'Housefull 5',
  'Maa',
  'Metro... In Dino',
  'Saiyaara',
  'Dhadak 2',
  'Son of Sardaar 2',
  'Baaghi 4',
  'Jolly LLB 3',
  'Kantara: Chapter 1',
  'Tere Ishk Mein',
  'Alpha',
  'Welcome to the Jungle'
];

const requestedMovieMeta = {
  Emergency: {
    genre: 'Drama',
    genres: ['Drama', 'History', 'War'],
    year: 2025,
    duration: '147 min',
    durationSeconds: 8820,
    rating: 'PG-13',
    voteAverage: 4.8,
    description: 'A political drama inspired by events around the 1975 Emergency, following power, resistance, and the choices that shaped Indian history.',
    cast: ['Kangana Ranaut', 'Anupam Kher', 'Shreyas Talpade', 'Mahima Chaudhry', 'Milind Soman'],
    thumbnail: 'https://en.wikipedia.org/wiki/Special:FilePath/Emergency%20movie%20poster.jpg',
    banner: 'https://en.wikipedia.org/wiki/Special:FilePath/Emergency%20movie%20poster.jpg'
  },
  'Hisaab Barabar': {
    genre: 'Drama',
    genres: ['Drama', 'Comedy', 'Thriller'],
    year: 2025,
    duration: '111 min',
    durationSeconds: 6660,
    rating: 'PG-13',
    voteAverage: 6.1,
    description: 'A railway ticket checker uncovers a banking scam and finds himself pulled into a fight where every missing rupee matters.',
    cast: ['R. Madhavan', 'Neil Nitin Mukesh', 'Kirti Kulhari', 'Rashami Desai', 'Faisal Rashid'],
    thumbnail: 'https://en.wikipedia.org/wiki/Special:FilePath/Hisaab%20Barabar%20film%20poster.jpg',
    banner: 'https://en.wikipedia.org/wiki/Special:FilePath/Hisaab%20Barabar%20film%20poster.jpg'
  },
  'Superboys of Malegaon': {
    genre: 'Drama',
    genres: ['Drama', 'Comedy'],
    year: 2025,
    duration: '131 min',
    durationSeconds: 7860,
    rating: 'PG-13',
    voteAverage: 7.4,
    description: 'A group of small-town dreamers in Malegaon make their own movies, turning friendship and jugaad into pure cinema.',
    cast: ['Adarsh Gourav', 'Vineet Kumar Singh', 'Shashank Arora', 'Anuj Singh Duhan', 'Riddhi Kumar'],
    thumbnail: 'https://en.wikipedia.org/wiki/Special:FilePath/Superboys%20of%20Malegaon.jpg',
    banner: 'https://en.wikipedia.org/wiki/Special:FilePath/Superboys%20of%20Malegaon.jpg'
  },
  Fateh: {
    genre: 'Action',
    genres: ['Action', 'Thriller', 'Crime'],
    year: 2025,
    duration: '127 min',
    durationSeconds: 7620,
    rating: 'R',
    voteAverage: 5.8,
    description: 'A former special-ops officer turns cybercrime hunter when a ruthless digital syndicate targets innocent lives.',
    cast: ['Sonu Sood', 'Jacqueline Fernandez', 'Vijay Raaz', 'Naseeruddin Shah', 'Dibyendu Bhattacharya'],
    thumbnail: 'https://en.wikipedia.org/wiki/Special:FilePath/Fateh%20film%20poster.jpg',
    banner: 'https://en.wikipedia.org/wiki/Special:FilePath/Fateh%20film%20poster.jpg'
  },
  Azaad: {
    genre: 'Action',
    genres: ['Action', 'Drama', 'Adventure'],
    year: 2025,
    duration: '145 min',
    durationSeconds: 8700,
    rating: 'PG-13',
    voteAverage: 4.6,
    description: 'A stable boy forms a fierce bond with a horse while rebellion, loyalty, and love push him toward a dangerous race for freedom.',
    cast: ['Ajay Devgn', 'Diana Penty', 'Aaman Devgan', 'Rasha Thadani', 'Piyush Mishra'],
    thumbnail: 'https://en.wikipedia.org/wiki/Special:FilePath/Azaa%20film%20poster.jpg',
    banner: 'https://en.wikipedia.org/wiki/Special:FilePath/Azaa%20film%20poster.jpg'
  },
  'Sky Force': {
    genre: 'Action',
    genres: ['Action', 'Drama', 'War'],
    year: 2025,
    duration: '125 min',
    durationSeconds: 7500,
    rating: 'PG-13',
    voteAverage: 6.5,
    description: 'Inspired by India\'s first airstrike, a decorated officer searches for the truth behind a missing pilot and a mission buried by war.',
    cast: ['Akshay Kumar', 'Veer Pahariya', 'Sara Ali Khan', 'Nimrat Kaur', 'Sharad Kelkar'],
    thumbnail: 'https://en.wikipedia.org/wiki/Special:FilePath/Sky%20Force%20poster.jpg',
    banner: 'https://en.wikipedia.org/wiki/Special:FilePath/Sky%20Force%20poster.jpg'
  },
  Chhaava: {
    genre: 'History',
    genres: ['History', 'Action', 'Drama'],
    year: 2025,
    duration: '161 min',
    durationSeconds: 9660,
    rating: 'PG-13',
    voteAverage: 7.0,
    description: 'After Shivaji Maharaj, Sambhaji rises to defend the Maratha empire against a relentless Mughal campaign.',
    cast: ['Vicky Kaushal', 'Rashmika Mandanna', 'Akshaye Khanna', 'Ashutosh Rana', 'Divya Dutta'],
    thumbnail: 'https://en.wikipedia.org/wiki/Special:FilePath/Chhaava%20film%20poster.jpg',
    banner: 'https://en.wikipedia.org/wiki/Special:FilePath/Chhaava%20film%20poster.jpg'
  },
  'The Diplomat': {
    genre: 'Thriller',
    genres: ['Thriller', 'Drama'],
    year: 2025,
    duration: '137 min',
    durationSeconds: 8220,
    rating: 'PG-13',
    voteAverage: 6.5,
    description: 'An Indian diplomat faces a tense cross-border crisis when a woman seeks refuge and a safe return home.',
    cast: ['John Abraham', 'Sadia Khateeb', 'Kumud Mishra', 'Sharib Hashmi', 'Revathi'],
    thumbnail: 'https://en.wikipedia.org/wiki/Special:FilePath/The%20Diplomat%202025%20film.jpeg',
    banner: 'https://en.wikipedia.org/wiki/Special:FilePath/The%20Diplomat%202025%20film.jpeg'
  },
  Sikandar: {
    genre: 'Action',
    genres: ['Action', 'Drama'],
    year: 2025,
    duration: '133 min',
    durationSeconds: 7980,
    rating: 'PG-13',
    voteAverage: 4.9,
    description: 'A powerful man turns against corruption after tragedy forces him to fight for people who cannot fight for themselves.',
    cast: ['Salman Khan', 'Rashmika Mandanna', 'Sathyaraj', 'Sharman Joshi', 'Kajal Aggarwal'],
    thumbnail: 'https://en.wikipedia.org/wiki/Special:FilePath/Sikandar%202025%20film%20poster.jpg',
    banner: 'https://en.wikipedia.org/wiki/Special:FilePath/Sikandar%202025%20film%20poster.jpg'
  },
  Jaat: {
    genre: 'Crime',
    genres: ['Crime', 'Action', 'Thriller'],
    year: 2025,
    duration: '153 min',
    durationSeconds: 9180,
    rating: 'PG-13',
    voteAverage: 6.2,
    description: 'A mysterious stranger reaches a town ruled by a brutal crime lord and begins a violent mission to restore justice.',
    cast: ['Sunny Deol', 'Randeep Hooda', 'Saiyami Kher', 'Regina Cassandra', 'Vineet Kumar Singh'],
    thumbnail: 'https://en.wikipedia.org/wiki/Special:FilePath/Jaat%20film%20poster.jpg',
    banner: 'https://en.wikipedia.org/wiki/Special:FilePath/Jaat%20film%20poster.jpg'
  },
  'Kesari Chapter 2': {
    genre: 'Drama',
    genres: ['Drama', 'History', 'Thriller', 'Action'],
    year: 2025,
    duration: '135 min',
    durationSeconds: 8100,
    rating: 'PG-13',
    voteAverage: 7.1,
    description: 'A courtroom drama inspired by the fight to expose the truth behind the Jallianwala Bagh massacre.',
    cast: ['Akshay Kumar', 'R. Madhavan', 'Ananya Panday', 'Regina Cassandra', 'Simon Paisley Day'],
    thumbnail: 'https://image.tmdb.org/t/p/original/jgGSqe1YgSot6Y1zDVTVkbsZ46z.jpg',
    banner: 'https://image.tmdb.org/t/p/original/7vGWPw9y9uJ8SZ17oyy2Ts3EmdD.jpg'
  },
  'Raid 2': {
    genre: 'Crime',
    genres: ['Crime', 'Drama', 'Thriller', 'Action'],
    year: 2025,
    duration: '139 min',
    durationSeconds: 8340,
    rating: 'PG-13',
    voteAverage: 6.4,
    description: 'IRS officer Amay Patnaik returns to take on a powerful public figure hiding a dangerous empire of corruption.',
    cast: ['Ajay Devgn', 'Riteish Deshmukh', 'Vaani Kapoor', 'Saurabh Shukla', 'Rajat Kapoor'],
    thumbnail: 'https://en.wikipedia.org/wiki/Special:FilePath/Raid%202%20poster.jpg',
    banner: 'https://en.wikipedia.org/wiki/Special:FilePath/Raid%202%20poster.jpg'
  },
  'Ground Zero': {
    genre: 'Action',
    genres: ['Action', 'Thriller', 'Drama'],
    year: 2025,
    duration: '134 min',
    durationSeconds: 8040,
    rating: 'PG-13',
    voteAverage: 6.8,
    description: 'A BSF officer leads a high-risk investigation in Kashmir to track the mastermind behind a deadly attack.',
    cast: ['Emraan Hashmi', 'Sai Tamhankar', 'Zoya Hussain', 'Mukesh Tiwari', 'Deepak Paramesh'],
    thumbnail: 'https://en.wikipedia.org/wiki/Special:FilePath/Ground%20Zero%20%282025%20film%29%20poster.jpg',
    banner: 'https://en.wikipedia.org/wiki/Special:FilePath/Ground%20Zero%20%282025%20film%29%20poster.jpg'
  },
  Maalik: {
    genre: 'Action',
    genres: ['Action', 'Crime', 'Drama'],
    year: 2025,
    duration: '152 min',
    durationSeconds: 9120,
    rating: 'PG-13',
    voteAverage: 6.1,
    description: 'A feared gangster fights to hold his empire together as ambition, betrayal, and power pull his world apart.',
    cast: ['Rajkummar Rao', 'Prosenjit Chatterjee', 'Manushi Chhillar', 'Saurabh Shukla', 'Swanand Kirkire'],
    thumbnail: 'https://en.wikipedia.org/wiki/Special:FilePath/Maalik%20%282025%20film%29.jpg',
    banner: 'https://en.wikipedia.org/wiki/Special:FilePath/Maalik%20%282025%20film%29.jpg'
  },
  'War 2': {
    genre: 'Action',
    genres: ['Action', 'Thriller', 'Spy'],
    year: 2025,
    duration: '173 min',
    durationSeconds: 10380,
    rating: 'PG-13',
    voteAverage: 5.9,
    description: 'Kabir returns to a globe-spanning spy war when a dangerous new rival forces old loyalties into the line of fire.',
    cast: ['Hrithik Roshan', 'N. T. Rama Rao Jr.', 'Kiara Advani', 'Ashutosh Rana', 'Anil Kapoor'],
    thumbnail: 'https://en.wikipedia.org/wiki/Special:FilePath/War%202%20official%20poster.jpg',
    banner: 'https://en.wikipedia.org/wiki/Special:FilePath/War%202%20official%20poster.jpg'
  },
  'Bhool Chuk Maaf': {
    genre: 'Comedy',
    genres: ['Comedy', 'Romance', 'Science Fiction', 'Drama'],
    year: 2025,
    duration: '121 min',
    durationSeconds: 7260,
    rating: 'PG-13',
    voteAverage: 6.0,
    description: 'A small-town groom gets trapped in a time loop and must fix his forgotten promise before his wedding can happen.',
    cast: ['Rajkummar Rao', 'Wamiqa Gabbi', 'Raghubir Yadav', 'Seema Pahwa', 'Sanjay Mishra'],
    thumbnail: 'https://en.wikipedia.org/wiki/Special:FilePath/Bhool%20Chuk%20Maaf%20film%20poster.jpg',
    banner: 'https://en.wikipedia.org/wiki/Special:FilePath/Bhool%20Chuk%20Maaf%20film%20poster.jpg'
  },
  'Housefull 5': {
    genre: 'Comedy',
    genres: ['Comedy', 'Mystery', 'Thriller'],
    year: 2025,
    duration: '163 min',
    durationSeconds: 9780,
    rating: 'PG-13',
    voteAverage: 5.2,
    description: 'A luxury cruise turns into chaos when multiple people claim to be the heir to a fortune and a murder mystery erupts.',
    cast: ['Akshay Kumar', 'Abhishek Bachchan', 'Riteish Deshmukh', 'Jacqueline Fernandez', 'Sanjay Dutt']
  },
  Maa: {
    genre: 'Horror',
    genres: ['Horror', 'Thriller', 'Drama'],
    year: 2025,
    duration: '133 min',
    durationSeconds: 7980,
    rating: 'PG-13',
    voteAverage: 6.7,
    description: 'A mother enters a village haunted by disappearances and dark forces to protect her daughter from an ancient evil.',
    cast: ['Kajol', 'Ronit Roy', 'Indraneil Sengupta', 'Jitin Gulati', 'Kherin Sharma'],
    thumbnail: 'https://en.wikipedia.org/wiki/Special:FilePath/Maa%20%282025%20film%29.jpg',
    banner: 'https://en.wikipedia.org/wiki/Special:FilePath/Maa%20%282025%20film%29.jpg'
  },
  'Metro... In Dino': {
    genre: 'Drama',
    genres: ['Drama', 'Romance', 'Music'],
    year: 2025,
    duration: '143 min',
    durationSeconds: 8580,
    rating: 'PG-13',
    voteAverage: 6.8,
    description: 'Across a restless city, couples and strangers cross paths while love, loneliness, ambition, and second chances reshape their lives.',
    cast: ['Aditya Roy Kapur', 'Sara Ali Khan', 'Anupam Kher', 'Neena Gupta', 'Pankaj Tripathi', 'Konkona Sen Sharma'],
    thumbnail: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/64/Metro..._In_Dino_poster.jpg/500px-Metro..._In_Dino_poster.jpg',
    banner: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/64/Metro..._In_Dino_poster.jpg/500px-Metro..._In_Dino_poster.jpg'
  },
  Saiyaara: {
    genre: 'Romance',
    genres: ['Romance', 'Drama', 'Music'],
    year: 2025,
    duration: '156 min',
    durationSeconds: 9360,
    rating: 'PG-13',
    voteAverage: 6.4,
    description: 'Two artistic souls connect through music, but love and circumstance test the bond that changes both their lives.',
    cast: ['Ahaan Panday', 'Aneet Padda', 'Alam Khan', 'Rajesh Kumar', 'Geeta Agrawal Sharma'],
    thumbnail: 'https://en.wikipedia.org/wiki/Special:FilePath/Saiyaara%20film%20poster.jpg',
    banner: 'https://en.wikipedia.org/wiki/Special:FilePath/Saiyaara%20film%20poster.jpg'
  },
  'Dhadak 2': {
    genre: 'Romance',
    genres: ['Romance', 'Drama'],
    year: 2025,
    duration: '146 min',
    durationSeconds: 8760,
    rating: 'PG-13',
    voteAverage: 7.0,
    description: 'An idealistic student and a young woman fall in love while social pressure and prejudice threaten their future.',
    cast: ['Siddhant Chaturvedi', 'Triptii Dimri', 'Saurabh Sachdeva', 'Vipin Sharma', 'Zakir Hussain'],
    thumbnail: 'https://en.wikipedia.org/wiki/Special:FilePath/Dhadak%202.jpg',
    banner: 'https://en.wikipedia.org/wiki/Special:FilePath/Dhadak%202.jpg'
  },
  'Son of Sardaar 2': {
    genre: 'Comedy',
    genres: ['Comedy', 'Drama'],
    year: 2025,
    duration: '145 min',
    durationSeconds: 8700,
    rating: 'PG-13',
    voteAverage: 4.6,
    description: 'Jassi lands in Scotland chasing love and gets dragged into a hostage crisis, a mafia clash, and a chaotic wedding.',
    cast: ['Ajay Devgn', 'Mrunal Thakur', 'Ravi Kishan', 'Neeru Bajwa', 'Sanjay Mishra']
  },
  'Baaghi 4': {
    genre: 'Action',
    genres: ['Action', 'Romance', 'Thriller'],
    year: 2025,
    duration: '156 min',
    durationSeconds: 9360,
    rating: 'PG-13',
    voteAverage: 4.0,
    description: 'A wounded fighter wakes from a coma and hunts for the truth behind the disappearance of the woman he loves.',
    cast: ['Tiger Shroff', 'Sanjay Dutt', 'Harnaaz Kaur Sandhu', 'Sonam Bajwa', 'Shreyas Talpade'],
    thumbnail: 'https://en.wikipedia.org/wiki/Special:FilePath/Baaghi%204.jpg',
    banner: 'https://en.wikipedia.org/wiki/Special:FilePath/Baaghi%204.jpg'
  },
  'Jolly LLB 3': {
    genre: 'Drama',
    genres: ['Drama', 'Comedy'],
    year: 2025,
    duration: '157 min',
    durationSeconds: 9420,
    rating: 'PG-13',
    voteAverage: 6.4,
    description: 'Two Jollys return to court for a sharp legal battle that turns justice, privilege, and power into biting satire.',
    cast: ['Akshay Kumar', 'Arshad Warsi', 'Saurabh Shukla', 'Gajraj Rao', 'Huma Qureshi'],
    thumbnail: 'https://en.wikipedia.org/wiki/Special:FilePath/Jolly%20LLB%203%20poster.jpg',
    banner: 'https://en.wikipedia.org/wiki/Special:FilePath/Jolly%20LLB%203%20poster.jpg'
  },
  'Kantara: Chapter 1': {
    genre: 'Thriller',
    genres: ['Thriller', 'Action', 'Drama'],
    year: 2025,
    duration: '150 min',
    durationSeconds: 9000,
    rating: 'PG-13',
    voteAverage: 7.4,
    description: 'Set before the legend of Kantara, a warrior rises from forest lands where faith, power, and ancient spirits collide.',
    cast: ['Rishab Shetty', 'Rukmini Vasanth', 'Jayaram', 'Gulshan Devaiah', 'Pramod Shetty'],
    thumbnail: 'https://image.tmdb.org/t/p/original/3CP7crYcSBV0k8JP6fl0XaMPpDY.jpg',
    banner: 'https://image.tmdb.org/t/p/original/w57nxiBIODAYHLRs1xmrCY9zEFe.jpg'
  },
  'Tere Ishk Mein': {
    genre: 'Romance',
    genres: ['Romance', 'Drama'],
    year: 2025,
    duration: '169 min',
    durationSeconds: 10140,
    rating: 'PG-13',
    voteAverage: 5.6,
    description: 'A volatile young man and a psychology student fall into a love story where obsession and healing collide.',
    cast: ['Dhanush', 'Kriti Sanon', 'Prakash Raj', 'Vineet Kumar Singh', 'Mohammed Zeeshan Ayyub'],
    thumbnail: 'https://en.wikipedia.org/wiki/Special:FilePath/Tere%20Ishk%20Mein%20poster.jpg',
    banner: 'https://en.wikipedia.org/wiki/Special:FilePath/Tere%20Ishk%20Mein%20poster.jpg'
  },
  Alpha: {
    genre: 'Action',
    genres: ['Action', 'Thriller', 'Adventure'],
    year: 2026,
    duration: '140 min',
    durationSeconds: 8400,
    rating: 'PG-13',
    voteAverage: 6.9,
    description: 'Two elite agents are pulled into a global spy mission where trust, betrayal, and survival decide their future.',
    cast: ['Alia Bhatt', 'Sharvari', 'Bobby Deol', 'Anil Kapoor', 'Dibyendu Bhattacharya'],
    thumbnail: 'https://en.wikipedia.org/wiki/Special:FilePath/Alpha%20official%20poster.JPG',
    banner: 'https://en.wikipedia.org/wiki/Special:FilePath/Alpha%20official%20poster.JPG'
  },
  'Welcome to the Jungle': {
    genre: 'Comedy',
    genres: ['Comedy', 'Adventure', 'Action'],
    year: 2026,
    duration: '155 min',
    durationSeconds: 9300,
    rating: 'PG-13',
    voteAverage: 6.5,
    description: 'A wild rescue mission sends a chaotic crew into the jungle, where survival quickly turns into nonstop confusion.',
    cast: ['Akshay Kumar', 'Suniel Shetty', 'Arshad Warsi', 'Jacqueline Fernandez', 'Disha Patani', 'Paresh Rawal']
  }
};

const normalizeTitle = (title = '') => title.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const slugify = (title) => normalizeTitle(title).replace(/ /g, '-');
const posterFor = (title) => 'https://placehold.co/600x900/121522/ffffff?text=' + encodeURIComponent(title);
const bannerFor = (title) => 'https://placehold.co/1600x900/0b0d16/ffffff?text=' + encodeURIComponent(title);

const requestedMovieSeeds = requestedMovieTitles.map((title) => {
  const meta = requestedMovieMeta[title] || { genre: 'Drama', year: 2025 };
  return {
    _id: 'requested-' + slugify(title),
    type: 'movie',
    title,
    description: meta.description || title + " is part of Vistaara's highlighted Bollywood lineup.",
    genre: meta.genre,
    genres: meta.genres || [meta.genre],
    categories: ['Recommended', 'Trending', 'Recently Added'],
    thumbnail: meta.thumbnail || posterFor(title),
    banner: meta.banner || bannerFor(title),
    videoUrl: video,
    duration: meta.duration || '2h 10m',
    durationSeconds: meta.durationSeconds || 7800,
    year: meta.year,
    rating: meta.rating || 'PG-13',
    voteAverage: meta.voteAverage || 0,
    cast: meta.cast || []
  };
});

export const demoMovies = [
  ...requestedMovieSeeds,
  {
    _id: 'lost-space',
    type: 'series',
    title: 'Lost in Space 2',
    description: 'A brave crew enters a glacial alien tunnel system after a distress signal starts broadcasting from beneath the ice.',
    genre: 'Sci-Fi',
    categories: ['Trending', 'Recently Added'],
    thumbnail: '/lost-in-space-2.jpg',
    thumbnailFit: 'contain',
    banner: '/banners/lost-in-space.jpg',
    videoUrl: video,
    duration: '2h 12m',
    durationSeconds: 7920,
    year: 2026,
    rating: 'TV-14',
    episodeCount: 8,
    episodes: [
      { number: 1, title: 'Signal Under Ice', duration: '48m', description: 'The crew follows a strange transmission into frozen alien tunnels.' },
      { number: 2, title: 'Whiteout', duration: '45m', description: 'A storm cuts the team off while a hidden engine begins to wake.' },
      { number: 3, title: 'Orbit Break', duration: '51m', description: 'A rescue plan turns risky when the planet starts shifting beneath them.' },
      { number: 4, title: 'The Lost Map', duration: '47m', description: 'Old coordinates reveal that another ship reached the caves first.' },
      { number: 5, title: 'Deep Current', duration: '50m', description: 'The survivors discover a power source buried below the ice shelf.' },
      { number: 6, title: 'No Safe Return', duration: '46m', description: 'A damaged shuttle forces the crew to choose who gets back to orbit.' },
      { number: 7, title: 'Alien Dawn', duration: '52m', description: 'The distress signal finally answers, but it is not asking for help.' },
      { number: 8, title: 'Home Vector', duration: '55m', description: 'One final launch decides whether the mission becomes rescue or exile.' }
    ],
    isFeatured: true
  },
  {
    _id: 'iron-vow',
    type: 'movie',
    title: 'Dhunrandhar 2 : The revenge',
    description: 'A retired weapons engineer returns to the field when an experimental suit goes missing.',
    genre: 'Action',
    categories: ['Trending'],
    thumbnail: '/dhurandhar-2-revenge.jpg',
    banner: '/banners/dhurandhar-2-revenge.jpg',
    videoUrl: video,
    duration: '1h 56m',
    durationSeconds: 6960,
    year: 2025,
    rating: 'PG-13'
  },
  {
    _id: 'midnight-cafe',
    type: 'series',
    title: 'Breaking Bad',
    description: 'A chemistry teacher enters the criminal underworld and builds a dangerous new life around power and survival.',
    genre: 'Crime',
    categories: ['Trending', 'Recently Added'],
    thumbnail: '/breaking-bad.jpg',
    banner: '/banners/breaking-bad.jpg',
    videoUrl: video,
    duration: '1h 38m',
    durationSeconds: 5880,
    year: 2024,
    rating: 'PG',
    episodeCount: 7,
    episodes: [
      { number: 1, title: 'Chemistry', duration: '49m', description: 'A desperate teacher makes a choice that changes his family forever.' },
      { number: 2, title: 'The First Deal', duration: '47m', description: 'A dangerous partnership begins with fear, money, and secrets.' },
      { number: 3, title: 'Blue Smoke', duration: '50m', description: 'The new product catches attention from people who cannot be ignored.' },
      { number: 4, title: 'Family Man', duration: '46m', description: 'Lies at home become harder to manage as pressure grows outside.' },
      { number: 5, title: 'The Cook', duration: '51m', description: 'A bigger operation brings bigger enemies and fewer exits.' },
      { number: 6, title: 'Crossroads', duration: '48m', description: 'Old morals collapse when survival starts feeling like ambition.' },
      { number: 7, title: 'Empire', duration: '54m', description: 'Power arrives with a cost that no one around him can escape.' }
    ],
  },
  {
    _id: 'quantum-dr',
    type: 'movie',
    title: 'Dhurandhar',
    description: 'A fierce agent is pulled into a dangerous mission where revenge, loyalty, and survival collide.',
    genre: 'Action',
    categories: ['Trending'],
    thumbnail: '/dhurandhar.jpg',
    banner: '/banners/dhurandhar-2-revenge.jpg',
    videoUrl: video,
    duration: '2h 05m',
    durationSeconds: 7500,
    year: 2025,
    rating: 'PG-13'
  },
  {
    _id: 'black-panther-city',
    type: 'movie',
    title: 'Bahubali : The beginning',
    description: 'An heir to a hidden kingdom must choose between secrecy and saving the world outside.',
    genre: 'Action',
    categories: ['Trending'],
    thumbnail: '/bahubali-the-beginning.webp',
    banner: '/banners/baahubali-the-beginning.jpg',
    videoUrl: video,
    duration: '2h 08m',
    durationSeconds: 7680,
    year: 2026,
    rating: 'PG-13'
  },
  {
    _id: 'spider-man-far-from-home',
    type: 'movie',
    title: 'Spider-Man : Far From Home',
    description: 'Peter Parker tries to enjoy a school trip across Europe while a new threat pulls him back into hero duty.',
    genre: 'Action',
    categories: ['Trending', 'Recently Added'],
    thumbnail: '/spider-man-far-from-home.jpg',
    banner: '/banners/spider-man-far-from-home.jpg',
    videoUrl: video,
    duration: '2h 09m',
    durationSeconds: 7740,
    year: 2019,
    rating: 'PG-13'

  },
  {
    _id: 'dune',
    type: 'movie',
    title: 'Dune',
    description: 'A gifted heir enters a desert world where spice, prophecy, and rival houses decide the future of an empire.',
    genre: 'Sci-Fi',
    categories: ['Trending', 'Recently Added'],
    thumbnail: '/dune.jpg',
    banner: '/banners/dune.jpg',
    videoUrl: video,
    duration: '2h 35m',
    durationSeconds: 9300,
    year: 2021,
    rating: 'PG-13'
  },
  {
    _id: 'spider-man-no-way-home',
    type: 'movie',
    title: 'Spider-Man : No Way Home',
    description: 'Peter Parker asks for help after his identity is exposed, opening the door to enemies from other worlds.',
    genre: 'Action',
    categories: ['Trending', 'Recently Added'],
    thumbnail: '/spider-man-no-way-home.jpg',
    banner: '/banners/spider-man-no-way-home.jpg',
    videoUrl: video,
    duration: '2h 28m',
    durationSeconds: 8880,
    year: 2021,
    rating: 'PG-13'
  },
  {
    _id: 'alice-in-borderland',
    type: 'series',
    title: 'Alice in Borderland',
    description: 'A group of strangers must survive deadly games across an emptied Tokyo where every choice has a price.',
    genre: 'Thriller',
    categories: ['Trending'],
    thumbnail: '/alice-in-borderland.webp',
    banner: '/banners/alice-in-borderland.jpg',
    videoUrl: video,
    duration: '2h 00m',
    durationSeconds: 7200,
    year: 2020,
    rating: 'TV-MA',
    episodeCount: 6,
    episodes: [
      { number: 1, title: 'Game Start', duration: '47m', description: 'Arisu wakes in an empty city where one wrong move can be fatal.' },
      { number: 2, title: 'The Club Room', duration: '44m', description: 'A simple puzzle turns into a brutal test of trust and timing.' },
      { number: 3, title: 'Border Rules', duration: '50m', description: 'The survivors learn how visas, cards, and death games connect.' },
      { number: 4, title: 'Run Rabbit', duration: '45m', description: 'A chase through Tokyo forces strangers to work as one.' },
      { number: 5, title: 'The Beach', duration: '52m', description: 'A safe haven offers answers, but its leaders hide darker plans.' },
      { number: 6, title: 'Final Card', duration: '56m', description: 'The next game reveals what the players are really fighting for.' }
    ],
  },
  {
    _id: 'dark',
    type: 'series',
    title: 'Dark',
    description: 'Four families uncover a hidden time loop after a child disappears near the caves of a quiet German town.',
    genre: 'Thriller',
    categories: ['Sci-Fi', 'Recently Added'],
    thumbnail: '/dark.webp',
    banner: '/banners/dark.jpg',
    videoUrl: video,
    duration: '1h 52m',
    durationSeconds: 6720,
    year: 2017,
    rating: 'TV-MA',
    episodeCount: 8,
    episodes: [
      { number: 1, title: 'The Missing', duration: '51m', description: 'A child disappears and exposes old wounds across four families.' },
      { number: 2, title: 'Caves', duration: '49m', description: 'A tunnel system becomes the center of impossible timelines.' },
      { number: 3, title: '1986', duration: '53m', description: 'Secrets from the past begin repeating in the present.' },
      { number: 4, title: 'Cycle', duration: '50m', description: 'The town realizes every clue points to something already written.' },
      { number: 5, title: 'The Stranger', duration: '52m', description: 'A visitor knows more about the disappearances than anyone should.' },
      { number: 6, title: 'Sic Mundus', duration: '54m', description: 'A hidden society reveals the scale of the time loop.' },
      { number: 7, title: 'Bootstrap', duration: '48m', description: 'Cause and effect blur as families confront their own origins.' },
      { number: 8, title: 'Endless Knot', duration: '57m', description: 'The cycle tightens, leaving one chance to break the pattern.' }
    ],
  },
  {
    _id: 'spider-man-3',
    type: 'movie',
    title: 'Spider-Man 3',
    description: 'A darker power changes Peter Parker while old friendships, new villains, and revenge collide across New York.',
    genre: 'Action',
    categories: ['Action', 'Recently Added'],
    thumbnail: '/spider-man-3.webp',
    banner: '/banners/spider-man-3.jpg',
    videoUrl: video,
    duration: '2h 19m',
    durationSeconds: 8340,
    year: 2007,
    rating: 'PG-13'
  },
  {
    _id: 'dunki',
    type: 'movie',
    title: 'Dunki',
    description: 'A group of friends take an impossible route across borders while chasing dreams, home, and belonging.',
    genre: 'Drama',
    categories: ['Recently Added'],
    thumbnail: '/dunki.jpg',
    banner: img('photo-1517248135467-4c7edcad34c4'),
    videoUrl: video,
    duration: '2h 40m',
    durationSeconds: 9600,
    year: 2023,
    rating: 'PG-13'
  },
  {
    _id: 'de-dana-dan',
    type: 'movie',
    title: 'De Dana Dan',
    description: 'Two broke friends attempt a chaotic ransom plan that spirals into confusion, romance, and nonstop comedy.',
    genre: 'Comedy',
    categories: ['Comedy', 'Recently Added'],
    thumbnail: '/de-dana-dan.webp',
    banner: img('photo-1529156069898-49953e39b3ac'),
    videoUrl: video,
    duration: '2h 46m',
    durationSeconds: 9960,
    year: 2009,
    rating: 'PG'
  }

];

const requestedSeedByTitle = new Map(requestedMovieSeeds.map((movie) => [normalizeTitle(movie.title), movie]));
const requestedTitleSet = new Set(requestedMovieTitles.map(normalizeTitle));

export const prioritizeRequestedMovies = (movies = []) => {
  const inputByTitle = new Map();
  movies.forEach((movie) => {
    const key = normalizeTitle(movie.title);
    if (key && !inputByTitle.has(key)) inputByTitle.set(key, movie);
  });

  const used = new Set();
  const priorityMovies = requestedMovieTitles
    .map((title) => inputByTitle.get(normalizeTitle(title)) || requestedSeedByTitle.get(normalizeTitle(title)))
    .filter(Boolean)
    .map((movie) => {
      used.add(normalizeTitle(movie.title));
      return movie;
    });

  return [
    ...priorityMovies,
    ...movies.filter((movie) => !used.has(normalizeTitle(movie.title)))
  ];
};

export const buildRows = (movies = demoMovies) => {
  const catalogMovies = prioritizeRequestedMovies(movies);
  const recommendedMovies = catalogMovies;
  const trendingMovies = prioritizeRequestedMovies(
    catalogMovies.filter((movie) => movie.categories?.includes('Trending') || requestedTitleSet.has(normalizeTitle(movie.title)))
  );

  return [
    { title: 'Recommended for you', movies: recommendedMovies },
    { title: 'Trending Movies', movies: trendingMovies },
    { title: 'Action Movies', movies: catalogMovies.filter((m) => m.genre === 'Action' || m.genres?.includes('Action')) },
    { title: 'Crime Movies', movies: catalogMovies.filter((m) => m.genre === 'Crime') },
    { title: 'Drama Movies', movies: catalogMovies.filter((m) => m.genre === 'Drama' || m.genres?.includes('Drama')) },
    { title: 'Thriller Movies', movies: catalogMovies.filter((m) => m.genre === 'Thriller') },
    { title: 'Comedy Movies', movies: catalogMovies.filter((m) => m.genre === 'Comedy') },
    { title: 'Sci-Fi Movies', movies: catalogMovies.filter((m) => m.genre === 'Sci-Fi' || m.categories?.includes('Sci-Fi')) },
    { title: 'Recently Added', movies: catalogMovies.filter((m) => m.categories?.includes('Recently Added')) }
  ];
};

const localMoviesKey = 'vistaara_admin_movies';

export const getLocalAdminMovies = () => {
  try {
    return JSON.parse(localStorage.getItem(localMoviesKey) || '[]');
  } catch {
    return [];
  }
};

export const saveLocalAdminMovies = (movies) => {
  localStorage.setItem(localMoviesKey, JSON.stringify(movies));
};

export const getCatalogMovies = () => [...getLocalAdminMovies(), ...demoMovies];
