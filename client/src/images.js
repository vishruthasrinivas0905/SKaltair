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
  scholarReading: photo('1624254009481-94fb3b9cf16e', 'A researcher reading at a desk in front of shelves of bound volumes', 'Abbat', 'woman-in-black-and-white-floral-long-sleeve-shirt-sitting-at-the-table-iS4v-fNG0Lg'),
  magnifierPage: photo('1682624400764-d2c9eaeae972', 'A magnifying glass resting on a page of an open book', 'Charly Álvarez', 'a-magnifying-glass-sitting-on-top-of-an-open-book-E9h7MUcSGEE'),
  bookAndNotes: photo('1456513080510-7bf3a84b82f8', 'An open book and a notebook of handwritten notes side by side', 'Aaron Burden', 'opened-book-QJDzYT_K8Xg'),
  openBooks: photo('1513185041617-8ab03f83d6c5', 'Many open books overlapping in warm light', 'Rey Seven', 'brown-books-closeup-photography-_nm_mZ4Cs2I'),
  councilChamber: photo('1780396269429-e20eaa1a1cd2', 'An ornate council chamber with wood panelling, chandeliers and curved rows of seats', 'Michael D Beckwith', 'ornate-council-chamber-with-wood-paneling-chandeliers-and-many-seats-t4I2VeWm8t8'),
  // Research-focus-only photography. These images are deliberately separate from
  // the home, programme, news, publication and institutional page image sets.
  focusCourtHouse: photo('1683538796020-78b15306e864', 'The brick courthouse of Vaasa framed by broad steps and a clear sky', 'Harri P', 'a-large-brick-building-with-stairs-leading-up-to-it-2-d1vRLcXoc'),
  focusCyberAccess: photo('1754494977432-425fb917df70', 'A hand uses a smartphone at a secure office access terminal', 'Jakub Żerdzicki', 'phone-being-used-at-a-security-door-UyWuiljE25w'),
  focusBusinessTalk: photo('1763739530672-4aadafbd81ff', 'Two professionals discuss a strategy in a contemporary meeting room', 'Praise Judah', 'two-professionals-talking-in-a-meeting-room-KHQJf0Gq3RA'),
  focusAiCode: photo('1774901128281-a884cd447af5', 'A modern computer screen displaying software code and project files', 'Bernd Dittrich', 'computer-screen-displaying-code-and-project-files-A9jp72Owzvs'),
  focusLibraryParis: photo('1784359065403-93da31c36115', 'Researchers and readers in a contemporary national library reading room', 'Johan Mouchet', 'busy-library-reading-room-with-people-studying-PjpRF0LhBB8'),
  focusPublicStudy: photo('1707757112182-5167a5e17444', 'People working at computers in a sunlit public research library', 'Linus Belanger', 'a-large-open-room-with-people-working-on-their-computers-nGlfw0HouBQ'),
  focusLibraryHall: photo('1778735940457-772f588a0dd3', 'Students studying in a grand, dimly lit library hall', 'Ashutosh Gupta', 'students-studying-in-a-grand-dimly-lit-library-hall-dsQKzZEwSQY'),
  focusDocumentReview: photo('1775163024488-e88e4a71179f', 'Two professionals review documents together at a conference table', 'Olena Kholina', 'two-people-reviewing-documents-at-a-table-MhqUBTxQ3Hw'),
  focusContract: photo('1758518731462-d091b0b4ed0d', 'Business partners sign a contract with legal guidance in a modern office', 'Vitaly Gariev', 'business-people-signing-a-contract-at-a-table-iPheGw7_UaI'),
  focusCourtInterior: photo('1660784670019-33a36fd82515', 'The judge’s bench inside a formal courtroom in Santiago', 'Rai Singh Uriarte', 'a-courtroom-with-a-large-wooden-bench-ZV0kXnONoHo'),
  focusCircuitEngineer: photo('1769149068959-b11392164add', 'An engineer studies a circuit-board design on a computer screen', 'EnCata PD', 'man-looking-at-circuit-board-design-on-computer-screen-ZmDk8tXQRS0'),
  focusResearchMeeting: photo('1681569685382-e75f0301584e', 'Two colleagues speak across a table in a thoughtful discussion', 'phyo min', 'two-men-sitting-at-a-table-talking-to-each-other-CLhULgqR-xg'),
  focusTeamMeeting: photo('1760346546771-a81d986459ff', 'A small team reviews information together around laptops', 'Bluestonex', 'three-men-in-discussion-around-a-table-with-laptops-ceIEGTR7G18'),
  focusPolicyConversation: photo('1764173038859-11b5bcf26d0f', 'Two people talk at a table beside tall, light-filled windows', 'Centre for Ageing Better', 'two-people-talking-at-a-table-by-large-windows-BWKb7aPdR14'),
  focusResearchGroup: photo('1573497701240-345a300b8d36', 'A diverse group of colleagues work together around a table', 'Christina @ wocintechchat.com M', 'five-people-sitting-at-table-and-talking-jzonFmreWok'),
  focusInnovationDesk: photo('1761122827167-159d1d272313', 'A designer works across a computer and tablet on an innovation project', 'Mahmudul Hasan', 'man-working-at-a-desk-with-computer-and-tablet-Mo08jadTWYc'),
  // Replacement full-bleed research-focus hero photography, selected to give
  // each field a distinct contemporary visual. These are not reused in theme cards.
  focusGovernanceArchitecture: photo('1722946241841-9d6aabed060c', 'The Vidhana Soudha, seat of Karnataka’s state legislature in Bengaluru', 'Suki Yuga', 'a-large-building-with-a-lot-of-trees-in-front-of-it-g5O5kUvNmIw'),
  focusAiSculpture: photo('1694903089438-bf28d4697d9a', 'A human hand and robotic hand reach toward a glowing AI interface', 'Igor Omilaev', 'robot-and-human-hands-reaching-toward-ai-text-FHgWFzDDAOs'),
  focusCyberInfrastructure: photo('1759884247381-d7222dd72dec', 'A person studies source code on a laptop in a modern workspace', 'Compagnons', 'woman-working-on-a-laptop-with-code-on-screen-Zi0GmYPm88M'),
  focusInnovationPrototype: photo('1756723902460-235b1f21ad05', 'A 3D printer builds red prototypes in a working design studio', 'Snapmaker 3D Printer', '3d-printer-with-tools-and-creations-in-workshop-X-Q7NAwnwE0'),
  focusCorporateRoundtable: photo('1769740333462-9a63bfa914bc', 'A business team discusses strategy around a conference table', 'Beatriz Cattel', 'business-meeting-with-people-around-a-conference-table-3tCLyPBSQ5k'),
  focusDisputeResolution: photo('1711003596872-aa68f08a4b8e', 'A courtroom with a public gallery and an attorney’s podium', 'Dragon White Munthe', 'an-empty-courtroom-with-wooden-paneling-and-columns-Bh6u25Qv9qA'),
};

export function photoUrl(image, width) { return `https://images.unsplash.com/photo-${image.id}?auto=format&fit=crop&w=${width}&q=80`; }
export function photoSrcSet(image, widths) { return widths.map(width => `${photoUrl(image, width)} ${width}w`).join(', '); }

export const heroSlides = [photos.ladyJusticeBronze, photos.admontLibrary, photos.quantumComputer];

export const pagePhotos = {
  about: photos.statuteVolumes,
  programs: photos.scholarReading,
  committee: photos.councilChamber,
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
// Research Programmes page: one page under the glass, two texts compared, many sources at once.
export const programTermPhotos = { 'short-term': photos.magnifierPage, 'mid-term': photos.bookAndNotes, 'long-term': photos.openBooks };
export const councilPhotos = { 'founding-committee': photos.councilRoom, 'research-council': photos.historicLibrary, 'academic-councils': photos.lectureHall };
export const newsPhotos = [photos.newspapers, photos.auditorium, photos.lawReports];
export const publicationPhotos = [photos.oldBooks, photos.leatherBooks, photos.bookcase];
