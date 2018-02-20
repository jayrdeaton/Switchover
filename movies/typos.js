module.exports.title = (object) => {
  if (object['dvd_title'].includes('Jimmy Eat World (Limited )Edition')) object['dvd_title'] = object['dvd_title'].replace('Jimmy Eat World (Limited )Edition', 'Jimmy Eat World (Limited Edition)')
  if (object['dvd_title'].includes('Accountant (2016/ DVD/CD Combo w/ Digital Copy')) object['dvd_title'] = object['dvd_title'].replace('Accountant (2016/ DVD/CD Combo w/ Digital Copy', 'Accountant (2016/ DVD/CD Combo w/ Digital Copy)');
  if (object['dvd_title'].includes('Al Green: Gospel According To Al Green (Acacia0')) object['dvd_title'] = object['dvd_title'].replace('Al Green: Gospel According To Al Green (Acacia0', 'Al Green: Gospel According To Al Green (Acacia)');
  if (object['dvd_title'].includes('Collateral Beauty (Blu-ray w/ Digital Copy')) object['dvd_title'] = object['dvd_title'].replace('Collateral Beauty (Blu-ray w/ Digital Copy', 'Collateral Beauty (Blu-ray w/ Digital Copy)');
  if (object['dvd_title'].includes('Dr. Seuss Triple Feature: Green Eggs And Ham And Other Stories / The Lorax (1972) / The Cat In The Hat (1971)(')) object['dvd_title'] = object['dvd_title'].replace('Dr. Seuss Triple Feature: Green Eggs And Ham And Other Stories / The Lorax (1972) / The Cat In The Hat (1971)(', 'Dr. Seuss Triple Feature: Green Eggs And Ham And Other Stories / The Lorax (1972) / The Cat In The Hat (1971)');
  if (object['dvd_title'].includes('Dreaming Out Loud (Alpha Video0')) object['dvd_title'] = object['dvd_title'].replace('Dreaming Out Loud (Alpha Video0', 'Dreaming Out Loud (Alpha Video)')
  if (object['dvd_title'].includes('Get Along Monsters Series (DVD/CD Combo')) object['dvd_title'] = object['dvd_title'].replace('Get Along Monsters Series (DVD/CD Combo', 'Get Along Monsters Series (DVD/CD Combo)')
  if (object['dvd_title'].includes('Handel: Admeto: Tim Mead / Marie Arnet / William Berger (Blu-ray')) object['dvd_title'] = object['dvd_title'].replace('Handel: Admeto: Tim Mead / Marie Arnet / William Berger (Blu-ray', 'Handel: Admeto: Tim Mead / Marie Arnet / William Berger (Blu-ray)')
  if (object['dvd_title'].includes('Hollywood Chaos (Breaking Glass Pictures0')) object['dvd_title'] = object['dvd_title'].replace('Hollywood Chaos (Breaking Glass Pictures0', 'Hollywood Chaos (Breaking Glass Pictures)')
  if (object['dvd_title'].includes('House Of The Witchdoctor (Breaking Glass Pictures0')) object['dvd_title'] = object['dvd_title'].replace('House Of The Witchdoctor (Breaking Glass Pictures0', 'House Of The Witchdoctor (Breaking Glass Pictures)')
  if (object['dvd_title'].includes('I Want To Get Married (Breaking Glass Pictures0')) object['dvd_title'] = object['dvd_title'].replace('I Want To Get Married (Breaking Glass Pictures0', 'I Want To Get Married (Breaking Glass Pictures)')
  if (object['dvd_title'].includes('In The Beginning 2000/ Mill Creek Entertainment)')) object['dvd_title'] = object['dvd_title'].replace('In The Beginning 2000/ Mill Creek Entertainment)', 'In The Beginning (2000/ Mill Creek Entertainment)')
  if (object['dvd_title'].includes('Kung Fu Panda (Fox) / Kung Fu Panda 2 (w/ Digital Copy)(')) object['dvd_title'] = object['dvd_title'].replace('Kung Fu Panda (Fox) / Kung Fu Panda 2 (w/ Digital Copy)(', 'Kung Fu Panda (Fox) / Kung Fu Panda 2 (w/ Digital Copy)')
  if (object['dvd_title'].includes('Long Road To The Hall Of Fame: From The NFL To Hollywood To Hip Hop)')) object['dvd_title'] = object['dvd_title'].replace('Long Road To The Hall Of Fame: From The NFL To Hollywood To Hip Hop)', 'Long Road To The Hall Of Fame: From The NFL To Hollywood To Hip Hop')
  if (object['dvd_title'].includes('Raiders Of Old California (Alpha Video0')) object['dvd_title'] = object['dvd_title'].replace('Raiders Of Old California (Alpha Video0', 'Raiders Of Old California (Alpha Video)')
  if (object['dvd_title'].includes('Sakura Wars: The Movie (FUNimation/ DVD & Blu-ray Combo/ Super Amazing Value Edition')) object['dvd_title'] = object['dvd_title'].replace('Sakura Wars: The Movie (FUNimation/ DVD & Blu-ray Combo/ Super Amazing Value Edition', 'Sakura Wars: The Movie (FUNimation/ DVD & Blu-ray Combo/ Super Amazing Value Edition)')
  if (object['dvd_title'].includes('Stewardesses (Jezebel/ 3D')) object['dvd_title'] = object['dvd_title'].replace('Stewardesses (Jezebel/ 3D', 'Stewardesses (Jezebel/ 3D)')
  if (object['dvd_title'].includes('Thumbelina 1994/ Fox)')) object['dvd_title'] = object['dvd_title'].replace('Thumbelina 1994/ Fox)', 'Thumbelina (1994/ Fox)')
  if (object['dvd_title'].includes('Wolf Children (DVD & Blu-ray Combo/ The Hosoda Collection')) object['dvd_title'] = object['dvd_title'].replace('Wolf Children (DVD & Blu-ray Combo/ The Hosoda Collection', 'Wolf Children (DVD & Blu-ray Combo/ The Hosoda Collection)')
  if (object['dvd_title'].includes('(Blu-ray 3D/ Blu-ray w/ Digital Copy: Iron Man 3 ')) object['dvd_title'] = object['dvd_title'].replace('(Blu-ray 3D/ Blu-ray w/ Digital Copy: Iron Man 3 ', '(Blu-ray 3D/ Blu-ray w/ Digital Copy) Iron Man 3 ');
  return object;
};
module.exports.options = (object) => {
  if (object.options.includes('(w) ')) object.options = object.options.replace('(w) ', '');
  if (object.options.includes('(w)')) console.log(object.options);
  if (object.options.includes(' w)')) object.options = object.options.replace(' w)', ')');
  if (object.options.includes(' w)')) object.options = object.options.replace(' w)', ')');
  // if (object.options.includes(' w)')) console.log(object.options);
  if (object.options.includes(' W)')) object.options = object.options.replace(' W)', ')');
  if (object.options.includes('  ')) object.options = object.options.replace('  ', ' ');
  if (object.options.includes(' (DVD)')) object.options = object.options.replace(' (DVD)', '');
  if (object.options.includes('(Digital Copy & ')) object.options = object.options.replace('(Digital Copy & ', '(Digital Copy) (');
  if (object.options.includes('Widescreenw')) object.options = object.options.replace('Widescreenw', 'Widescreen');
  if (object.options.includes(' w/Digital Copy')) object.options = object.options.replace(' w/Digital Copy', ') (Digital Copy');
  if (object.options.includes(' Widescreen)')) object.options = object.options.replace(' Widescreen)', ') (Widescreen)');
  if (object.options.includes('Digital Copy 4k')) object.options = object.options.replace('Digital Copy 4k', 'Digital Copy) (4k');
  if (object.options.includes('Digital Copy 4K')) object.options = object.options.replace('Digital Copy 4K', 'Digital Copy) (4k');
  if (object.options.includes('Blu-ray 4k')) object.options = object.options.replace('Blu-ray 4k', 'Blu-ray) (4k');
  if (object.options.includes('Blu-ray 4K')) object.options = object.options.replace('Blu-ray 4K', 'Blu-ray) (4k');
  if (object.options.includes('WidescreenBlu-ray')) object.options = object.options.replace('WidescreenBlu-ray', 'Widescreen) (Blu-ray');
  if (object.options.includes('Digital Copy Disc')) object.options = object.options.replace('Digital Copy Disc', 'Digital Copy');
  if (object.options.includes('Digital Copy w ')) object.options = object.options.replace('Digital Copy w', 'Digital Copy');
  if (object.options.includes('Widescreen Blu-ray')) object.options = object.options.replace('Widescreen Blu-ray', 'Widescreen) (Blu-ray');
  if (object.options.includes('Widescreen UMD')) object.options = object.options.replace('Widescreen UMD', 'Widescreen) (UMD');
  if (object.options.includes('(Digital Copy w)')) object.options = object.options.replace('(Digital Copy w)', '(Digital Copy)');
  if (object.options.includes('Digital Copy Party Edition')) object.options = object.options.replace('Digital Copy Party Edition', 'Digital Copy) (Party Edition');
  if (object.options.includes('Widescreen R-Rated Version')) object.options = object.options.replace('Widescreen R-Rated Version', 'Widescreen) (R-Rated Version');
  if (object.options.includes('Widescreen Unrated Version')) object.options = object.options.replace('Widescreen Unrated Version', 'Widescreen) (Unrated Version');
  if (object.options.includes('UV Digital Copy')) object.options = object.options.replace('UV Digital Copy', 'Digital Copy');
  if (object.options.includes(' & Digital Copy')) object.options = object.options.replace(' & Digital Copy', ') (Digital Copy');
  if (object.options.includes(' w? ')) object.options = object.options.replace(' w? ', ') (');
  if (object.options.includes(' /w Digital Copy')) object.options = object.options.replace(' /w Digital Copy', ') (Digital Copy');
  if (object.options.includes('Blu-ray Digital Copy')) object.options = object.options.replace('Blu-ray Digital Copy', 'Blu-ray) (Digital Copy');
  if (object.options.includes('-Disc Set')) object.options = object.options.replace('-Disc Set', '-Disc');
  if (object.options.includes('-Disc Box Set')) object.options = object.options.replace('-Disc Box Set', '-Disc');
  if (object.options.includes('-Disc Package')) object.options = object.options.replace('-Disc Package', '-Disc');
  if (object.options.includes('-Disc ')) object.options = object.options.replace('-Disc ', '-Disc) (');
  if (object.options.includes('(MGM/UA UMD)')) object.options = object.options.replace('(MGM/UA UMD)', '(MGM/UA) (UMD)');
  if (object.options.includes('(PBS Direct)')) object.options = object.options.replace('(PBS Direct)', '(PBS)');
  if (object.options.includes('(PBS/Direct)')) object.options = object.options.replace('(PBS/Direct)', '(PBS)');
  if (object.options.includes('(Lions Gate Home Entertainment)')) object.options = object.options.replace('(Lions Gate Home Entertainment)', '(Lions Gate)');
  if (object.options.includes('(A&E Video Direct)')) object.options = object.options.replace('(A&E Video Direct)', '(A&E Video)');
  if (object.options.includes('(SeverinBlu-ray)')) object.options = object.options.replace('(SeverinBlu-ray)', '(Severin) (Blu-ray)');
  if (object.options.includes('(Trinity Home Entertainment/Old Version)')) object.options = object.options.replace('(Trinity Home Entertainment/Old Version)', 'Trinity Home Entertainment) (Old Version');
  if (object.options.includes('(Classic Studio T T)')) object.options = object.options.replace('(Classic Studio T T)', '(Classic Studio T)');
  if (object.options.includes('(2007/Paradox)')) object.options = object.options.replace('(2007/Paradox)', '(2007) (Paradox)');
  if (object.options.includes('(Universal Legacy Series)')) object.options = object.options.replace('(Universal Legacy Series)', '(Universal) (Legacy Series)');
  if (object.options.includes('dist. by ')) object.options = object.options.replace('dist. by ', '');
  if (object.options.includes('Dist. by ')) object.options = object.options.replace('Dist. by ', '');
  if (object.options.includes('(Direct Source Version #2)')) object.options = object.options.replace('(Direct Source Version #2)', '(Direct Source) (Version #2)');
  if (object.options.includes('(Grapevine Video. On Demand DVD-R)')) object.options = object.options.replace('(Grapevine Video. On Demand DVD-R)', '(Grapevine Video) (On Demand DVD-R)');
  if (object.options.includes('(Magnolia PicturesBlu-ray)')) object.options = object.options.replace('(Magnolia PicturesBlu-ray)', '(Magnolia Pictures) (Blu-ray)');
  if (object.options.includes('(1964/Synergy Entertainment)')) object.options = object.options.replace('(1964/Synergy Entertainment)', '(1964) (Synergy Entertainment)');
  if (object.options.includes('(Image/Blu-ray)')) object.options = object.options.replace('(Image/Blu-ray)', '(Image) (Blu-ray)');
  if (object.options.includes('(2007 Echo Bridge)')) object.options = object.options.replace('(2007 Echo Bridge)', '(2007) (Echo Bridge)');
  if (object.options.includes('(HIT Entertainmentw)')) object.options = object.options.replace('(HIT Entertainmentw)', '(HIT Entertainment)');
  if (object.options.includes('(Miramax Lions GateBlu-ray)')) object.options = object.options.replace('(Miramax Lions GateBlu-ray)', '(Miramax Lions Gate) (Blu-ray)');
  if (object.options.includes('(Miramax Lions Gate)')) object.options = object.options.replace('(Miramax Lions Gate)', '(Miramax) (Lions Gate)');
  if (object.options.includes('(Pioneer TV Movie)')) object.options = object.options.replace('(Pioneer TV Movie)', '(Pioneer) (TV Movie)');
  if (object.options.includes('(Paradox Blu-ray)')) object.options = object.options.replace('(Paradox Blu-ray)', '(Paradox) (Blu-ray)');
  if (object.options.includes('(Pacific EntertainmentDVD/CD Combo)')) object.options = object.options.replace('(Pacific EntertainmentDVD/CD Combo)', '(Pacific Entertainment) (DVD/CD Combo)');
  if (object.options.includes('(GoodTimes Mediaw)')) object.options = object.options.replace('(GoodTimes Mediaw)', '(GoodTimes Media)');
  if (object.options.includes('(Alliance Atlantist)')) object.options = object.options.replace('(Alliance Atlantist)', '(Alliance Atlantis)');
  if (object.options.includes('(Beauty Media Inc.)')) object.options = object.options.replace('(Beauty Media Inc.)', '(Beauty Media)');
  if (object.options.includes('(Columbia/Tri-Starw)')) object.options = object.options.replace('(Columbia/Tri-Starw)', '(Columbia/Tri-Star)');
  if (object.options.includes('(Miramax Lions Gatew)')) object.options = object.options.replace('(Miramax Lions Gatew)', '(Miramax Lions Gate)');
  if (object.options.includes('(Liberty International International)')) object.options = object.options.replace('(Liberty International International)', '(Liberty International)');
  if (object.options.includes('(ImageBlu-ray)')) object.options = object.options.replace('(ImageBlu-ray)', '(Image) (Blu-ray)');
  if (object.options.includes('(Miramax Echo Bridge)')) object.options = object.options.replace('(Miramax Echo Bridge)', '(Miramax) (Echo Bridge)');
  if (object.options.includes('(/Melee Entertainment)')) object.options = object.options.replace('(/Melee Entertainment)', '(Melee Entertainment)');
  if (object.options.includes('(EMI Records DVD/CD Combo)')) object.options = object.options.replace('(EMI Records DVD/CD Combo)', '(EMI Records) (DVD/CD Combo)');
  if (object.options.includes('(Sony International DVD/CD Combo)')) object.options = object.options.replace('(Sony International DVD/CD Combo)', '(Sony International) (DVD/CD Combo)');
  if (object.options.includes('(2005/MGM/UA)')) object.options = object.options.replace('(2005/MGM/UA)', '(2005) (MGM/UA)');
  if (object.options.includes('(1950/VCI)')) object.options = object.options.replace('(1950/VCI)', '(1950) (VCI)');
  if (object.options.includes('(ESPN:)')) object.options = object.options.replace('(ESPN:)', '(ESPN)');
  if (object.options.includes('(Big Kids Productionst)')) object.options = object.options.replace('(Big Kids Productionst)', '(Big Kids Productions)');
  if (object.options.includes('(Anchor BayBlu-ray)')) object.options = object.options.replace('(Anchor BayBlu-ray)', '(Anchor Bay) (Blu-ray)');
  if (object.options.includes('(1991/Warner Brothers)')) object.options = object.options.replace('(1991/Warner Brothers)', '(1991) (Warner Brothers)');
  if (object.options.includes('(NuTech Digitale)')) object.options = object.options.replace('(NuTech Digitale)', '(NuTech Digital)');
  if (object.options.includes('(1957 VCI)')) object.options = object.options.replace('(1957 VCI)', '(1957) (VCI)');
  if (object.options.includes('(Desert Island Films/On Demand DVD-R)')) object.options = object.options.replace('(Desert Island Films/On Demand DVD-R)', '(Desert Island Films) (On Demand DVD-R)');
  if (object.options.includes('(Vanguard En Espanol)')) object.options = object.options.replace('(Vanguard En Espanol)', '(Vanguard) (En Espanol)');
  if (object.options.includes('(SilverlineAudio-Only DVD)')) object.options = object.options.replace('(SilverlineAudio-Only DVD)', '(Silverline) (Audio-Only)');
  if (object.options.includes('(KRB Music Home)')) object.options = object.options.replace('(KRB Music Home)', '(KRB Music)');
  if (object.options.includes('(Platinum1)')) object.options = object.options.replace('(Platinum1)', '(Platinum)');
  if (object.options.includes('(St. Clair Entertainment. Encore Series)')) object.options = object.options.replace('(St. Clair Entertainment. Encore Series)', '(St. Clair Entertainment) (Encore Series)');
  if (object.options.includes('(Mill Creek EntertainmentUnrated Version)')) object.options = object.options.replace('(Mill Creek EntertainmentUnrated Version)', '(Mill Creek Entertainment) (Unrated Version)');
  if (object.options.includes('(1940/Sony Pictures)')) object.options = object.options.replace('(1940/Sony Pictures)', '(1940) (Sony Pictures)');
  if (object.options.includes('(Warner Brothers Digital Dist.)')) object.options = object.options.replace('(Warner Brothers Digital Dist.)', '(Warner Brothers) (Digital Dist.)');
  if (object.options.includes('(Timeless MultimediaEmbossed Tin)')) object.options = object.options.replace('(Timeless MultimediaEmbossed Tin)', '(Timeless Multimedia) (Embossed Tin)');
  if (object.options.includes('(Sony Picturesr)')) object.options = object.options.replace('(Sony Picturesr)', '(Sony Pictures)');
  if (object.options.includes('(SpartanI)')) object.options = object.options.replace('(SpartanI)', '(Spartan)');
  if (object.options.includes('(WWE Home VideoRental Ready)')) object.options = object.options.replace('(WWE Home VideoRental Ready)', '(WWE Home Video) (Rental Ready)');
  if (object.options.includes('(Immortal ClassicsDVD/CD Combo)')) object.options = object.options.replace('(Immortal ClassicsDVD/CD Combo)', '(Immortal Classics) (DVD/CD Combo)');
  if (object.options.includes('(Sony InternationalDVD/CD Combo)')) object.options = object.options.replace('(Sony InternationalDVD/CD Combo)', '(Sony International) (DVD/CD Combo)');
  if (object.options.includes('(MGM/UA Pan & Scan)')) object.options = object.options.replace('(MGM/UA Pan & Scan)', '(MGM/UA) (Pan & Scan)');
  if (object.options.includes('(1980/Warner Brothers)')) object.options = object.options.replace('(1980/Warner Brothers)', '(1980) (Warner Brothers)');
  if (object.options.includes('(1943/Intercontinental Record)')) object.options = object.options.replace('(1943/Intercontinental Record)', '(1943) (Intercontinental Record)');
  if (object.options.includes('(1927/Kino)')) object.options = object.options.replace('(1927/Kino)', '(1927) (Kino)');
  if (object.options.includes('(Magada International)')) object.options = object.options.replace('(Magada International)', '(Magada)');
  if (object.options.includes('(1960/Vina Distributor)')) object.options = object.options.replace('(1960/Vina Distributor)', '(1960) (Vina Distributor)');
  if (object.options.includes('(a.k.a. There Was A Little GirlArrow)')) object.options = object.options.replace('(a.k.a. There Was A Little GirlArrow)', '(a.k.a. There Was A Little Girl) (Arrow)');
  if (object.options.includes('(Cohen Media GroupBlu-ray)')) object.options = object.options.replace('(Cohen Media GroupBlu-ray)', '(Cohen Media Group) (Blu-ray)');
  if (object.options.includes('(Film Chestw)')) object.options = object.options.replace('(Film Chestw)', '(Film Chest)');
  if (object.options.includes('(Asylum Home Entertainmentt)')) object.options = object.options.replace('(Asylum Home Entertainmentt)', '(Asylum Home Entertainment)');
  if (object.options.includes('(2001) Trinity Home Entertainment)')) object.options = object.options.replace('(2001) Trinity Home Entertainment)', '(2001) (Trinity Home Entertainment)');
  if (object.options.includes('(Steelbook Edition)')) object.options = object.options.replace('(Steelbook Edition)', '(Steelbook)');
  if (object.options.includes('(Limited Edition Steelbook)')) object.options = object.options.replace('(Limited Edition Steelbook)', '(Limited Edition) (Steelbook)');
  if (object.options.includes('(Steelbook Bloody Benton Cover)')) object.options = object.options.replace('(Steelbook Bloody Benton Cover)', '(Steelbook) (Bloody Benton Cover)');
  if (object.options.includes('(Steelbook Gunslinger Cover)')) object.options = object.options.replace('(Steelbook Gunslinger Cover)', '(Steelbook) (Gunslinger Cover)');
  if (object.options.includes('(Steelbook Pay-Off Cover)')) object.options = object.options.replace('(Steelbook Pay-Off Cover)', '(Steelbook) (Pay-Off Cover)');
  if (object.options.includes('(Limited Edition Steelbook)')) object.options = object.options.replace('(Limited Edition Steelbook)', '(Limited Edition) (Steelbook)');
  if (object.options.includes('(DVD & Blu-ray Combo Steelbook)')) object.options = object.options.replace('(DVD & Blu-ray Combo Steelbook)', '(DVD & Blu-ray Combo) (Steelbook)');
  if (object.options.includes('Ultimate Edtion')) object.options = object.options.replace('Ultimate Edtion', 'Ultimate Edition');
  if (object.options.includes('(Blu-ray & DVD Combo)')) object.options = object.options.replace('(Blu-ray & DVD Combo)', '(DVD) (Blu-ray)');
  if (object.options.includes('(DVVD & Blu-ray Combo)')) object.options = object.options.replace('(DVVD & Blu-ray Combo)', '(DVD) (Blu-ray)');
  if (object.options.includes('(Audio-Only Blu-ray)')) object.options = object.options.replace('(Audio-Only Blu-ray)', '(Audio-Only) (Blu-ray)');
  if (object.options.includes("(DVD & Blu-ray Combo 'Wonder Woman [2009]')")) object.options = object.options.replace("(DVD & Blu-ray Combo 'Wonder Woman [2009]')", "(DVD) (Blu-ray) ('Wonder Woman [2009]')");
  if (object.options.includes('(Audio-Only Blu-ray/CD Combo)')) object.options = object.options.replace('(Audio-Only Blu-ray/CD Combo)', '(Audio-Only) (Blu-ray) (CD)');
  if (object.options.includes('(Audio-Only Blu-ray & CD Combo)')) object.options = object.options.replace('(Audio-Only Blu-ray & CD Combo)', '(Audio-Only) (Blu-ray) (CD)');
  if (object.options.includes('(DVD/Blu-ray Disc Dual Format)')) object.options = object.options.replace('(DVD/Blu-ray Disc Dual Format)', '(DVD) (Blu-ray)');
  if (object.options.includes('(DVD/Blu-ray Dual Format)')) object.options = object.options.replace('(DVD/Blu-ray Dual Format)', '(DVD) (Blu-ray)');
  if (object.options.includes('(DVD& Blu-ray Combo)')) object.options = object.options.replace('(DVD& Blu-ray Combo)', '(DVD) (Blu-ray)');
  if (object.options.includes('(Set Blu-ray)')) object.options = object.options.replace('(Set Blu-ray)', '(Blu-ray)');
  if (object.options.includes('(DVD & Blu-ray)')) object.options = object.options.replace('(DVD & Blu-ray)', '(DVD) (Blu-ray)');
  if (object.options.includes('(DVD & Blu-ray/CD Combo)')) object.options = object.options.replace('(DVD & Blu-ray/CD Combo)', '(DVD) (CD) (Blu-ray)');
  if (object.options.includes('(DVD & Blu-ray Combo Rental Ready)')) object.options = object.options.replace('(DVD & Blu-ray Combo Rental Ready)', '(DVD) (Blu-ray) (Rental Ready)');
  if (object.options.includes('(DVD & Blu-ray Comob)')) object.options = object.options.replace('(DVD & Blu-ray Comob)', '(DVD) (Blu-ray)');
  if (object.options.includes('(Mini UMD)')) object.options = object.options.replace('(Mini UMD)', '(UMD)');
  if (object.options.includes('(DVD/UMD Combo)')) object.options = object.options.replace('(DVD/UMD Combo)', '(DVD) (UMD)');
  if (object.options.includes('(DVD/CD Combo)')) object.options = object.options.replace('(DVD/CD Combo)', '(DVD) (CD)');
  if (object.options.includes('(DVD & Blu-ray Combo)')) object.options = object.options.replace('(DVD & Blu-ray Combo)', '(DVD) (Blu-ray)');
  if (object.options.includes('(Blu-ray/CD Combo)')) object.options = object.options.replace('(Blu-ray/CD Combo)', '(Blu-ray) (CD)');
  if (object.options.includes('(DVD/CD & Blu-ray Combo)')) object.options = object.options.replace('(DVD/CD & Blu-ray Combo)', '(DVD) (CD) (Blu-ray)');
  if (object.options.includes('(Blu-ray 3D & DVD Combo)')) object.options = object.options.replace('(Blu-ray 3D & DVD Combo)', '(Blu-ray 3D) (DVD)');
  if (object.options.includes('(Blu-ray 3D & Blu-ray)')) object.options = object.options.replace('(Blu-ray 3D & Blu-ray)', '(Blu-ray 3D) (Blu-ray)');
  if (object.options.includes('(Blu-ray 3D/DVD Combo)')) object.options = object.options.replace('(Blu-ray 3D/DVD Combo)', '(Blu-ray 3D) (DVD)');
  if (object.options.includes('(DVD & Blu-ray 3D Combo)')) object.options = object.options.replace('(DVD & Blu-ray 3D Combo)', '(DVD) (Blu-ray 3D)');
  if (object.options.includes('(DVD/CD Combo & Pass Code)')) object.options = object.options.replace('(DVD/CD Combo & Pass Code)', '(DVD/CD Combo) (Pass Code)');
  if (object.options.includes('(Audio-Only DVD)')) object.options = object.options.replace('(Audio-Only DVD)', '(Audio-Only) (DVD)');
  if (object.options.includes('(Blu-ray Audio Only)')) object.options = object.options.replace('(Blu-ray Audio Only)', '(Blu-ray) (Audio Only)');

  if (object.options.includes('() ')) object.options = object.options.replace('() ', '');
  if (object.options.includes(' ()')) object.options = object.options.replace(' ()', '');
  if (object.options.includes('()')) object.options = object.options.replace('()', '');
  return object;
};
