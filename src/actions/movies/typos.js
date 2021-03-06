module.exports.title = (object) => {
  let { dvd_title } = object;
  dvd_title = dvd_title.replace('Jimmy Eat World (Limited )Edition', 'Jimmy Eat World (Limited Edition)')
  dvd_title = dvd_title.replace('Accountant (2016/ DVD/CD Combo w/ Digital Copy', 'Accountant (2016/ DVD/CD Combo w/ Digital Copy)');
  dvd_title = dvd_title.replace('Al Green: Gospel According To Al Green (Acacia0', 'Al Green: Gospel According To Al Green (Acacia)');
  dvd_title = dvd_title.replace('Collateral Beauty (Blu-ray w/ Digital Copy', 'Collateral Beauty (Blu-ray w/ Digital Copy)');
  dvd_title = dvd_title.replace('Dr. Seuss Triple Feature: Green Eggs And Ham And Other Stories / The Lorax (1972) / The Cat In The Hat (1971)(', 'Dr. Seuss Triple Feature: Green Eggs And Ham And Other Stories / The Lorax (1972) / The Cat In The Hat (1971)');
  dvd_title = dvd_title.replace('Dreaming Out Loud (Alpha Video0', 'Dreaming Out Loud (Alpha Video)')
  dvd_title = dvd_title.replace('Get Along Monsters Series (DVD/CD Combo', 'Get Along Monsters Series (DVD/CD Combo)')
  dvd_title = dvd_title.replace('Handel: Admeto: Tim Mead / Marie Arnet / William Berger (Blu-ray', 'Handel: Admeto: Tim Mead / Marie Arnet / William Berger (Blu-ray)')
  dvd_title = dvd_title.replace('Hollywood Chaos (Breaking Glass Pictures0', 'Hollywood Chaos (Breaking Glass Pictures)')
  dvd_title = dvd_title.replace('House Of The Witchdoctor (Breaking Glass Pictures0', 'House Of The Witchdoctor (Breaking Glass Pictures)')
  dvd_title = dvd_title.replace('I Want To Get Married (Breaking Glass Pictures0', 'I Want To Get Married (Breaking Glass Pictures)')
  dvd_title = dvd_title.replace('In The Beginning 2000/ Mill Creek Entertainment)', 'In The Beginning (2000/ Mill Creek Entertainment)')
  dvd_title = dvd_title.replace('Kung Fu Panda (Fox) / Kung Fu Panda 2 (w/ Digital Copy)(', 'Kung Fu Panda (Fox) / Kung Fu Panda 2 (w/ Digital Copy)')
  dvd_title = dvd_title.replace('Long Road To The Hall Of Fame: From The NFL To Hollywood To Hip Hop)', 'Long Road To The Hall Of Fame: From The NFL To Hollywood To Hip Hop')
  dvd_title = dvd_title.replace('Raiders Of Old California (Alpha Video0', 'Raiders Of Old California (Alpha Video)')
  dvd_title = dvd_title.replace('Sakura Wars: The Movie (FUNimation/ DVD & Blu-ray Combo/ Super Amazing Value Edition', 'Sakura Wars: The Movie (FUNimation/ DVD & Blu-ray Combo/ Super Amazing Value Edition)')
  dvd_title = dvd_title.replace('Stewardesses (Jezebel/ 3D', 'Stewardesses (Jezebel/ 3D)')
  dvd_title = dvd_title.replace('Thumbelina 1994/ Fox)', 'Thumbelina (1994/ Fox)')
  dvd_title = dvd_title.replace('Wolf Children (DVD & Blu-ray Combo/ The Hosoda Collection', 'Wolf Children (DVD & Blu-ray Combo/ The Hosoda Collection)')
  dvd_title = dvd_title.replace('(Blu-ray 3D/ Blu-ray w/ Digital Copy: Iron Man 3 ', '(Blu-ray 3D/ Blu-ray w/ Digital Copy) Iron Man 3 ');
  dvd_title = dvd_title.replace('Kino Lorber Studio Classics Blu-ray', 'Kino Lorber Studio Classics) (Blu-ray');
  dvd_title = dvd_title.replace('Fox. Blu-ray', 'Fox) (Blu-ray');
  dvd_title = dvd_title.replace('Mondo X Steelbook', 'Mondo X) (Steelbook');
  dvd_title = dvd_title.replace('Cohen Media Group Blu-ray', 'Cohen Media Group) (Blu-ray');
  dvd_title = dvd_title.replace('Apprehensive Films/', 'Apprehensive Films');
  dvd_title = dvd_title.replace('Lions Gate Blu-ray', 'Lions Gate) (Blu-ray');
  dvd_title = dvd_title.replace('(DreamWorks Dolby Digita)', '(DreamWorks) (Dolby Digital)');
  object.dvd_title = dvd_title;
  return object;
};
module.exports.genre = (object) => {
  let { genre } = object;
  genre = genre.replace('ANime', 'Anime');
  return object;
};
module.exports.options = (object) => {
  let { options } = object;

  options = options.replace(`(${object.year})`, '');

  options = options.replace('(w) ', '');
  // console.log(options);
  options = options.replace(' w)', ')');
  options = options.replace(' w)', ')');
  // if (options.includes(' w)')) console.log(options);
  options = options.replace(' W)', ')');
  options = options.replace('  ', ' ');
  options = options.replace(' (DVD)', '');
  options = options.replace('(Digital Copy & ', '(Digital Copy) (');
  options = options.replace('Widescreenw', 'Widescreen');
  options = options.replace(' w/Digital Copy', ') (Digital Copy');
  options = options.replace(' Widescreen)', ') (Widescreen)');
  options = options.replace('Digital Copy 4k', 'Digital Copy) (4k');
  options = options.replace('Digital Copy 4K', 'Digital Copy) (4k');
  options = options.replace('Blu-ray 4k', 'Blu-ray) (4k');
  options = options.replace('Blu-ray 4K', 'Blu-ray) (4k');
  options = options.replace('WidescreenBlu-ray', 'Widescreen) (Blu-ray');
  options = options.replace('Digital Copy Disc', 'Digital Copy');
  options = options.replace('Digital Copy w', 'Digital Copy');
  options = options.replace('Widescreen Blu-ray', 'Widescreen) (Blu-ray');
  options = options.replace('Widescreen UMD', 'Widescreen) (UMD');
  options = options.replace('(Digital Copy w)', '(Digital Copy)');
  options = options.replace('Digital Copy Party Edition', 'Digital Copy) (Party Edition');
  options = options.replace('Widescreen R-Rated Version', 'Widescreen) (R-Rated Version');
  options = options.replace('Widescreen Unrated Version', 'Widescreen) (Unrated Version');
  options = options.replace('UV Digital Copy', 'Digital Copy');
  options = options.replace(' & Digital Copy', ') (Digital Copy');
  options = options.replace(' w? ', ') (');
  options = options.replace(' /w Digital Copy', ') (Digital Copy');
  options = options.replace('Blu-ray Digital Copy', 'Blu-ray) (Digital Copy');
  options = options.replace('-Disc Set', '-Disc');
  options = options.replace('-Disc Box Set', '-Disc');
  options = options.replace('-Disc Package', '-Disc');
  options = options.replace('-Disc ', '-Disc) (');
  options = options.replace('(MGM/UA UMD)', '(MGM/UA) (UMD)');
  options = options.replace('(PBS Direct)', '(PBS)');
  options = options.replace('(PBS/Direct)', '(PBS)');
  options = options.replace('(Lions Gate Home Entertainment)', '(Lions Gate)');
  options = options.replace('(A&E Video Direct)', '(A&E Video)');
  options = options.replace('(SeverinBlu-ray)', '(Severin) (Blu-ray)');
  options = options.replace('(Trinity Home Entertainment/Old Version)', 'Trinity Home Entertainment) (Old Version');
  options = options.replace('(Classic Studio T T)', '(Classic Studio T)');
  options = options.replace('(2007/Paradox)', '(2007) (Paradox)');
  options = options.replace('(Universal Legacy Series)', '(Universal) (Legacy Series)');
  options = options.replace('dist. by ', '');
  options = options.replace('Dist. by ', '');
  options = options.replace('(Direct Source Version #2)', '(Direct Source) (Version #2)');
  options = options.replace('(Grapevine Video. On Demand DVD-R)', '(Grapevine Video) (On Demand DVD-R)');
  options = options.replace('(Magnolia PicturesBlu-ray)', '(Magnolia Pictures) (Blu-ray)');
  options = options.replace('(1964/Synergy Entertainment)', '(1964) (Synergy Entertainment)');
  options = options.replace('(Image/Blu-ray)', '(Image) (Blu-ray)');
  options = options.replace('(2007 Echo Bridge)', '(2007) (Echo Bridge)');
  options = options.replace('(HIT Entertainmentw)', '(HIT Entertainment)');
  options = options.replace('(Miramax Lions GateBlu-ray)', '(Miramax Lions Gate) (Blu-ray)');
  options = options.replace('(Miramax Lions Gate)', '(Miramax) (Lions Gate)');
  options = options.replace('(Pioneer TV Movie)', '(Pioneer) (TV Movie)');
  options = options.replace('(Paradox Blu-ray)', '(Paradox) (Blu-ray)');
  options = options.replace('(Pacific EntertainmentDVD/CD Combo)', '(Pacific Entertainment) (DVD/CD Combo)');
  options = options.replace('(GoodTimes Mediaw)', '(GoodTimes Media)');
  options = options.replace('(Alliance Atlantist)', '(Alliance Atlantis)');
  options = options.replace('(Beauty Media Inc.)', '(Beauty Media)');
  options = options.replace('(Columbia/Tri-Starw)', '(Columbia/Tri-Star)');
  options = options.replace('(Miramax Lions Gatew)', '(Miramax Lions Gate)');
  options = options.replace('(Liberty International International)', '(Liberty International)');
  options = options.replace('(ImageBlu-ray)', '(Image) (Blu-ray)');
  options = options.replace('(Miramax Echo Bridge)', '(Miramax) (Echo Bridge)');
  options = options.replace('(/Melee Entertainment)', '(Melee Entertainment)');
  options = options.replace('(EMI Records DVD/CD Combo)', '(EMI Records) (DVD/CD Combo)');
  options = options.replace('(Sony International DVD/CD Combo)', '(Sony International) (DVD/CD Combo)');
  options = options.replace('(2005/MGM/UA)', '(2005) (MGM/UA)');
  options = options.replace('(1950/VCI)', '(1950) (VCI)');
  options = options.replace('(ESPN:)', '(ESPN)');
  options = options.replace('(Big Kids Productionst)', '(Big Kids Productions)');
  options = options.replace('(Anchor BayBlu-ray)', '(Anchor Bay) (Blu-ray)');
  options = options.replace('(1991/Warner Brothers)', '(1991) (Warner Brothers)');
  options = options.replace('(NuTech Digitale)', '(NuTech Digital)');
  options = options.replace('(1957 VCI)', '(1957) (VCI)');
  options = options.replace('(Desert Island Films/On Demand DVD-R)', '(Desert Island Films) (On Demand DVD-R)');
  options = options.replace('(Vanguard En Espanol)', '(Vanguard) (En Espanol)');
  options = options.replace('(SilverlineAudio-Only DVD)', '(Silverline) (Audio-Only)');
  options = options.replace('(KRB Music Home)', '(KRB Music)');
  options = options.replace('(Platinum1)', '(Platinum)');
  options = options.replace('(St. Clair Entertainment. Encore Series)', '(St. Clair Entertainment) (Encore Series)');
  options = options.replace('(Mill Creek EntertainmentUnrated Version)', '(Mill Creek Entertainment) (Unrated Version)');
  options = options.replace('(1940/Sony Pictures)', '(1940) (Sony Pictures)');
  options = options.replace('(Warner Brothers Digital Dist.)', '(Warner Brothers) (Digital Dist.)');
  options = options.replace('(Timeless MultimediaEmbossed Tin)', '(Timeless Multimedia) (Embossed Tin)');
  options = options.replace('(Sony Picturesr)', '(Sony Pictures)');
  options = options.replace('(SpartanI)', '(Spartan)');
  options = options.replace('(WWE Home VideoRental Ready)', '(WWE Home Video) (Rental Ready)');
  options = options.replace('(Immortal ClassicsDVD/CD Combo)', '(Immortal Classics) (DVD/CD Combo)');
  options = options.replace('(Sony InternationalDVD/CD Combo)', '(Sony International) (DVD/CD Combo)');
  options = options.replace('(MGM/UA Pan & Scan)', '(MGM/UA) (Pan & Scan)');
  options = options.replace('(1980/Warner Brothers)', '(1980) (Warner Brothers)');
  options = options.replace('(1943/Intercontinental Record)', '(1943) (Intercontinental Record)');
  options = options.replace('(1927/Kino)', '(1927) (Kino)');
  options = options.replace('(Magada International)', '(Magada)');
  options = options.replace('(1960/Vina Distributor)', '(1960) (Vina Distributor)');
  options = options.replace('(a.k.a. There Was A Little GirlArrow)', '(a.k.a. There Was A Little Girl) (Arrow)');
  options = options.replace('(Cohen Media GroupBlu-ray)', '(Cohen Media Group) (Blu-ray)');
  options = options.replace('(Film Chestw)', '(Film Chest)');
  options = options.replace('(Asylum Home Entertainmentt)', '(Asylum Home Entertainment)');
  options = options.replace('(2001) Trinity Home Entertainment)', '(2001) (Trinity Home Entertainment)');
  options = options.replace('(Steelbook Edition)', '(Steelbook)');
  options = options.replace('(Limited Edition Steelbook)', '(Limited Edition) (Steelbook)');
  options = options.replace('(Steelbook Bloody Benton Cover)', '(Steelbook) (Bloody Benton Cover)');
  options = options.replace('(Steelbook Gunslinger Cover)', '(Steelbook) (Gunslinger Cover)');
  options = options.replace('(Steelbook Pay-Off Cover)', '(Steelbook) (Pay-Off Cover)');
  options = options.replace('(Limited Edition Steelbook)', '(Limited Edition) (Steelbook)');
  options = options.replace('(DVD & Blu-ray Combo Steelbook)', '(DVD & Blu-ray Combo) (Steelbook)');
  options = options.replace('Ultimate Edtion', 'Ultimate Edition');
  options = options.replace('(DVD & Blu-Ray Combo)', '(DVD) (Blu-ray)');
  options = options.replace('(Blu-ray & DVD Combo)', '(DVD) (Blu-ray)');
  options = options.replace('(DVVD & Blu-ray Combo)', '(DVD) (Blu-ray)');
  options = options.replace('(Audio-Only Blu-ray)', '(Audio-Only) (Blu-ray)');
  options = options.replace("(DVD & Blu-ray Combo 'Wonder Woman [2009]')", "(DVD) (Blu-ray) ('Wonder Woman [2009]')");
  options = options.replace('(Audio-Only Blu-ray/CD Combo)', '(Audio-Only) (Blu-ray) (CD)');
  options = options.replace('(Audio-Only Blu-ray & CD Combo)', '(Audio-Only) (Blu-ray) (CD)');
  options = options.replace('(DVD/Blu-ray Disc Dual Format)', '(DVD) (Blu-ray)');
  options = options.replace('(DVD/Blu-ray Dual Format)', '(DVD) (Blu-ray)');
  options = options.replace('(DVD& Blu-ray Combo)', '(DVD) (Blu-ray)');
  options = options.replace('(Set Blu-ray)', '(Blu-ray)');
  options = options.replace('(DVD & Blu-ray)', '(DVD) (Blu-ray)');
  options = options.replace('(DVD & Blu-ray/CD Combo)', '(DVD) (CD) (Blu-ray)');
  options = options.replace('(DVD & Blu-ray Combo Rental Ready)', '(DVD) (Blu-ray) (Rental Ready)');
  options = options.replace('(DVD & Blu-ray Comob)', '(DVD) (Blu-ray)');
  options = options.replace('(Mini UMD)', '(UMD)');
  options = options.replace('(DVD/UMD Combo)', '(DVD) (UMD)');
  options = options.replace('(DVD/CD Combo)', '(DVD) (CD)');
  options = options.replace('(DVD & Blu-ray Combo)', '(DVD) (Blu-ray)');
  options = options.replace('(Blu-ray/CD Combo)', '(Blu-ray) (CD)');
  options = options.replace('(DVD/CD & Blu-ray Combo)', '(DVD) (CD) (Blu-ray)');
  options = options.replace('(Blu-ray 3D & DVD Combo)', '(Blu-ray 3D) (DVD)');
  options = options.replace('(Blu-ray 3D & Blu-ray)', '(Blu-ray 3D) (Blu-ray)');
  options = options.replace('(Blu-ray 3D/DVD Combo)', '(Blu-ray 3D) (DVD)');
  options = options.replace('(DVD & Blu-ray 3D Combo)', '(DVD) (Blu-ray 3D)');
  options = options.replace('(DVD/CD Combo & Pass Code)', '(DVD/CD Combo) (Pass Code)');
  options = options.replace('(Audio-Only DVD)', '(Audio-Only) (DVD)');
  options = options.replace('(Blu-ray Audio Only)', '(Blu-ray) (Audio Only)');
  options = options.replace('CollectionBlu-ray', 'Collection) (Blu-ray');

  options = options.replace('Apprehensive Films On Demand DVD-R', 'Apprehensive Films) (On Demand DVD-R');
  options = options.replace('(MGM/UA/)', '(MGM/UA)');
  options = options.replace('(DreamWorks Dolby Digital)', '(DreamWorks) (Dolby Digital)');
  options = options.replace('(Paramountc)', '(Paramount)');
  options = options.replace('Trinity Home Entertainment)', '(Trinity Home Entertainment)');

  options = options.replace('() ', '');
  options = options.replace(' ()', '');
  options = options.replace('()', '');

  while (options.includes('  ')) options = options.replace('  ', ' ');
  options = options.trim();

  object.options = options;

  return object;
};
module.exports.rating = (object) => {
  let { rating } = object;
  rating = rating.replace('PG*13', 'PG-13');
  rating = rating.replace('[NR]', 'NR');
  rating = rating.replace('special interest', 'Special Interest');
  rating = rating.replace('horror', 'Horror');
  return object;
};
