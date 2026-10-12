// Site photography. Every photo is free under the Unsplash License (no Unsplash+ images) and is served
// from Unsplash's image CDN, which resizes on request so each layout only downloads the width it needs.
// Photographer and source page are kept here for reference only; they are not displayed on the site.
const photo = (id, alt, credit, page, extra = {}) => ({ id, alt, credit, href: `https://unsplash.com/photos/${page}`, ...extra });

export const photos = {
  ladyJusticeBronze: photo('1589578527966-fdac0f44566c', 'A bronze statue of Lady Justice holding the scales and a sword', 'Tingey Injury Law Firm', 'woman-in-gold-dress-holding-sword-figurine-L4YGuSg0fxs'),
  admontLibrary: photo('1562932831-afcfe48b5786', 'The white and gold Admont Abbey Library beneath its painted ceiling', 'Valdemaras D.', 'admont-abbey-library-with-painted-ceiling-7VPFyhB_j8Y'),
  quantumComputer: photo('1681908571122-97f349e1ace0', 'A gold-plated quantum computer with intricate silver wiring', 'Planet Volumes', 'quantum-computer-with-gold-plates-7dRmpT3vxV8'),
  stateCentralLibrary: photo('1702218126435-27ca87e24ee2', 'The red façade of the State Central Library in Cubbon Park, Bengaluru', 'A M', 'a-red-building-with-a-green-fence-around-it-5791iBUb8xg'),
  raisinaHill: photo('1760872646618-13594fc00567', 'The sandstone Secretariat building on Raisina Hill, New Delhi', 'Zoshua Colah', 'grand-sandstone-building-with-columns-and-dome-bpgIRNgNahI'),
  legislativeChamber: photo('1755756383870-4e440efd5c36', 'Rows of seats in an empty legislative chamber', 'Hongwei FAN', 'empty-parliamentary-chamber-with-rows-of-seating-wGdXZE8jTp8'),
  aiHands: photo('1694903110330-cc64b7e1d21d', 'A human hand reaching towards a robotic hand', 'Igor Omilaev', 'two-hands-touching-each-other-in-front-of-a-pink-background-gVQLAbGVB6Q'),
  phoneLock: photo('1584433144859-1fc3ab64a957', 'A smartphone showing a security lock on a desk', 'Dan Nelson', 'smartphone-with-security-lock-icon-ah-HeguOe9k'),
  circuitBoard: photo('1550751827-4bd374c3f58b', 'Close-up of a glowing circuit board', 'Adi Goldstein', 'teal-led-panel-EUsVwEOsblE'),
  lightBulb: photo('1552862750-746b8f6f7f25', 'A glowing filament light bulb', 'Johannes Plenio', 'close-up-photography-of-light-bulb-voQ97kezCx0'),
  boardroom: photo('1431540015161-0bf868a2d407', 'An empty boardroom with a long table and chairs', 'Benjamin Child', 'oval-brown-wooden-conference-table-and-chairs-inside-conference-room-GWe0dlVD9e0'),
  onlinePayment: photo('1563013544-824ae1b704d3', 'A person shopping online with a payment card and a laptop', 'rupixen', 'person-using-laptop-computer-holding-card-Q59HmzK38eQ'),
  ladyJustice: photo('1589829545856-d10d557cf95f', 'A statue of Lady Justice holding scales', 'Tingey Injury Law Firm', 'woman-holding-sword-statue-during-daytime-DZpc4UY8ZtY'),
  tableDiscussion: photo('1517048676732-d65bc937f952', 'People taking notes around a meeting table', 'Dylan Gillis', 'people-sitting-on-chair-in-front-of-table-while-holding-pens-during-daytime-KdeqA3aTnBY'),
  forensicExamination: photo('1554178585-4947df428bea', 'Gloved hands marking a document on a dark table', 'Yohan Cho', 'man-marking-on-paper-RCWR1TkDHHg'),
  forestRoad: photo('1476231682828-37e571bc172f', 'An aerial view of a road through dense green forest', 'Geranimo', 'aerial-shot-of-road-surrounded-by-green-trees-qzgN45hseN0'),
  magnifierBook: photo('1697301439916-169bd6844842', 'A magnifying glass resting on an open book on a wooden desk', 'Harshit Suryawanshi', 'a-magnifying-glass-sitting-on-top-of-an-open-book--LgSTma8GJs'),
  readingRoomLamp: photo('1769092992766-9504cdd93696', 'A green banker’s lamp on a desk in a library reading room', 'Ilya Semenov', 'a-green-desk-lamp-in-a-library-B8HRcng8Ibg'),
  archiveShelves: photo('1549964336-67d7d7d74ac2', 'A curved corridor of white archive shelving', 'Ula Kuźma', 'brown-pathway-between-white-organizers-9i4DHlC80AQ'),
  researchTypewriter: photo('1653038417404-1ae1f38c373e', 'A typewriter with a sheet of paper reading “Research”', 'Markus Winkler', 'a-close-up-of-a-typewriter-with-a-paper-on-it-c_ksDvwnu8o'),
  newspapers: photo('1504711434969-e33886168f5c', 'A stack of folded newspapers', 'AbsolutVision', 'business-newspaper-article-WYd_PkCa1BY'),
  auditorium: photo('1519452575417-564c1401ecc0', 'Rows of empty seats in an auditorium', 'Nathan Dumlao', 'empty-chairs-in-theater-ewGMqs2tmJI'),
  lawReports: photo('1575282343536-469af953c6e7', 'Bound volumes of law reports on a shelf', 'Aleix Ventayol', 'black-book-on-shelf-yPoM-wmzKMM'),
  statuteVolumes: photo('1659869764315-dc3d188141fe', 'Bound volumes of Acts of Parliament in warm light', 'Brenton Pearce', 'a-row-of-books-on-a-table-Sc85cQWwiP8'),
  corinthianColumns: photo('1658664209996-c52a32784ecb', 'Corinthian columns of a classical building', 'refargotohp', 'a-building-with-columns-pqQCo0jUi5M'),
  vaultedLibrary: photo('1637455587265-2a3c2cbbcc84', 'A vaulted library reading hall lined with tall windows', 'Celine Lityo', 'a-large-room-filled-with-lots-of-wooden-tables-if0UHp_c2Mw'),
  seminarRoom: photo('1724315069759-3bac28f679f6', 'An empty seminar room with curved rows of desks', 'Aditya Sethia', 'a-room-filled-with-lots-of-wooden-desks-viY-ACkx2iE'),
  councilRoom: photo('1713692354132-03b7090c44a5', 'A wood-panelled council room with a long table beneath a chandelier', 'Peter Herrmann', 'a-dining-room-with-a-large-wooden-table-and-chairs-vre6yJGjnZE'),
  historicLibrary: photo('1505664194779-8beaceb93744', 'Marble busts beside tall shelves of old books in a historic library', 'Giammarco Boscaro', 'book-lot-on-black-wooden-shelf-zeH-ljawHtg'),
  lectureHall: photo('1703680968885-22659eb00165', 'Rows of wooden seats in an empty lecture hall', 'Rashid Tajuar', 'a-row-of-wooden-chairs-sitting-in-front-of-a-window-g0nVEyiDBAI'),
  printedPages: photo('1532153975070-2e9ab71f1b14', 'Overlapping pages of printed text', 'Annie Spratt', 'white-printer-paper-lot-5cFwQ-WMcJU'),
  oldBooks: photo('1491841573634-28140fc7ced7', 'A stack of old leather-bound books', 'Chris Lawton', 'shallow-focus-photography-of-stack-of-books-zvKx6ixUhWQ'),
  leatherBooks: photo('1603058817990-2b9a9abbce86', 'Shelves of leather-bound books', 'Eilis Garvey', 'brown-wooden-book-shelf-with-books-fhOQfT1eVEA'),
  bookcase: photo('1479142506502-19b3a3b7ff33', 'Old books in a glass-fronted bookcase', 'Clarisse Meyer', 'books-in-glass-bookcase-jKU2NneZAbI'),
  newsTypewriter: photo('1585829365295-ab7cd400c167', 'A typewriter with a sheet of paper reading “News”', 'Markus Winkler', 'a-close-up-of-an-old-fashioned-typewriter-aId-xYRTlEc'),
  fountainPen: photo('1455390582262-044cdead277a', 'A fountain pen nib writing on lined paper', 'Aaron Burden', 'fountain-pen-on-black-lined-paper-y02jEX_B0O0'),
  documentReview: photo('1681505504714-4ded1bc247e7', 'Two people reviewing documents together at a table', 'Amina Atar', 'two-men-sitting-at-a-table-with-papers-and-a-pen-Mqc-m8kgxkg'),
  roundTable: photo('1571624436279-b272aff752b5', 'An empty round meeting table with chairs', 'S O C I A L . C U T', 'brown-wooden-9-piece-office-table-and-chairs-1RT4txDDAbM'),
  colonnade: photo('1594025598468-f2ac06104cb6', 'Sunlight and shadow across a long stone colonnade', 'Darryl Low', 'grayscale-photo-of-a-building-pXqZs5TG2HU'),
  goldenJustice: photo('1607179885507-45521268659c', 'A gilded statue of Lady Justice holding scales and a sword', 'Paul Chard', 'gold-statue-of-man-holding-sword-xeXWGPRPP1g', { position: 'center 20%' }),
  letterAndPen: photo('1634562876572-5abe57afcceb', 'A pen resting on a handwritten letter and envelope', 'Towfiqu barbhuiya', 'a-pen-sitting-on-top-of-a-piece-of-paper-6FpGIdn45_A'),
  bengaluruDusk: photo('1596176530529-78163a4f7af2', 'Bengaluru at dusk, seen from above', 'satyaprakash kumawat', 'aerial-view-of-city-buildings-during-night-time-ky1d-IWCBis'),
};

export function photoUrl(image, width) { return `https://images.unsplash.com/photo-${image.id}?auto=format&fit=crop&w=${width}&q=80`; }
export function photoSrcSet(image, widths) { return widths.map(width => `${photoUrl(image, width)} ${width}w`).join(', '); }

export const heroSlides = [photos.ladyJusticeBronze, photos.admontLibrary, photos.quantumComputer];

export const pagePhotos = {
  about: photos.statuteVolumes,
  programs: photos.vaultedLibrary,
  committee: photos.seminarRoom,
  publications: photos.printedPages,
  news: photos.newsTypewriter,
  apply: photos.fountainPen,
  collaborate: photos.documentReview,
  governance: photos.colonnade,
  contact: photos.letterAndPen,
};

export const themePhotos = {
  'Constitutional Law, Governance and Institutional Accountability': photos.raisinaHill,
  'Legislative Reform, Public Policy and Regulatory Effectiveness': photos.legislativeChamber,
  'Artificial Intelligence, Emerging Technologies and Ethics': photos.aiHands,
  'Data Protection, Privacy and Digital Rights': photos.phoneLock,
  'Cybersecurity, Cybercrime and Digital Evidence': photos.circuitBoard,
  'Intellectual Property, Innovation and Technology Transfer': photos.lightBulb,
  'Corporate Governance, Mergers and Acquisitions, and Business Regulation': photos.boardroom,
  'Competition Law, Digital Markets and Consumer Protection': photos.onlinePayment,
  'Litigation, Judicial Administration and Access to Justice': photos.ladyJustice,
  'Arbitration, Mediation and Other Forms of ADR': photos.tableDiscussion,
  'Criminal Justice, Evidence and Procedural Safeguards': photos.forensicExamination,
  'Environment, Public Health and Social Welfare': photos.forestRoad,
};

export const programPhotos = { 'short-term': photos.magnifierBook, 'mid-term': photos.readingRoomLamp, 'long-term': photos.archiveShelves };
export const councilPhotos = { 'founding-committee': photos.councilRoom, 'research-council': photos.historicLibrary, 'academic-councils': photos.lectureHall };
export const newsPhotos = [photos.newspapers, photos.auditorium, photos.lawReports];
export const publicationPhotos = [photos.oldBooks, photos.leatherBooks, photos.bookcase];
