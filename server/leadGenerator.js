// Lead generation engine — per-lead-type data for roofing marketplace

const FIRST_NAMES = [
  'James','Mary','Robert','Patricia','John','Jennifer','Michael','Linda',
  'David','Elizabeth','William','Barbara','Richard','Susan','Joseph','Jessica',
  'Thomas','Sarah','Christopher','Karen','Charles','Lisa','Daniel','Nancy',
  'Matthew','Betty','Anthony','Margaret','Mark','Sandra','Donald','Ashley',
  'Steven','Kimberly','Andrew','Emily','Paul','Donna','Joshua','Michelle',
  'Kenneth','Carol','Kevin','Amanda','Brian','Dorothy','George','Melissa',
  'Timothy','Deborah','Ronald','Stephanie','Edward','Rebecca','Jason','Sharon'
];

const LAST_NAMES = [
  'Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis',
  'Rodriguez','Martinez','Hernandez','Lopez','Gonzalez','Wilson','Anderson',
  'Thomas','Taylor','Moore','Jackson','Martin','Lee','Perez','Thompson',
  'White','Harris','Sanchez','Clark','Ramirez','Lewis','Robinson','Walker',
  'Young','Allen','King','Wright','Scott','Torres','Nguyen','Hill',
  'Flores','Green','Adams','Nelson','Baker','Hall','Rivera','Campbell',
  'Mitchell','Carter','Roberts','Gomez','Phillips','Evans','Turner','Diaz'
];

const ROOF_ISSUES = [
  'Roof Leak', 'Storm Damage', 'Age/Worn', 'Missing Shingles',
  'Hail Damage', 'Wind Damage', 'Sagging Roof', 'Emergency Leak',
  'Flashing Repair', 'Skylight Leak', 'Chimney Flashing'
];

const ROOF_TYPES = ['Shingle', 'Tile', 'Metal', 'Flat'];

const STREET_NAMES = [
  'Main St','Oak Ave','Elm St','Cedar Ln','Maple Dr','Pine St','Washington Blvd',
  'Park Ave','Lake Dr','Hill Rd','Sunset Blvd','Forest Ave','River Rd','Valley Dr',
  'Church St','School Rd','Mill St','Spring St','Meadow Ln','Highland Ave'
];

const STATE_CITIES = {
  'AL': ['Birmingham','Montgomery','Huntsville','Mobile','Tuscaloosa','Hoover','Dothan','Auburn','Decatur','Madison','Florence','Gadsden','Vestavia Hills','Prattville','Phenix City'],
  'AK': ['Anchorage','Fairbanks','Juneau','Sitka','Wasilla','Kenai','Kodiak','Bethel','Palmer','Homer'],
  'AZ': ['Phoenix','Tucson','Mesa','Scottsdale','Chandler','Gilbert','Glendale','Tempe','Peoria','Surprise','Goodyear','Avondale','Flagstaff','Yuma','Queen Creek'],
  'AR': ['Little Rock','Fort Smith','Fayetteville','Springdale','Jonesboro','Rogers','Conway','North Little Rock','Bentonville','Pine Bluff','Hot Springs','Benton','Sherwood','Texarkana','Jacksonville'],
  'CA': ['Los Angeles','San Diego','San Jose','San Francisco','Fresno','Sacramento','Long Beach','Oakland','Bakersfield','Anaheim','Santa Ana','Riverside','Stockton','Irvine','Chula Vista'],
  'CO': ['Denver','Colorado Springs','Aurora','Fort Collins','Lakewood','Thornton','Arvada','Westminster','Pueblo','Centennial','Boulder','Greeley','Longmont','Loveland','Castle Rock'],
  'CT': ['Hartford','New Haven','Stamford','Bridgeport','Waterbury','Norwalk','Danbury','New Britain','Bristol','Meriden','Milford','West Haven','Middletown','Shelton','Torrington'],
  'DE': ['Wilmington','Dover','Newark','Middletown','Bear','Glasgow','Hockessin','Brookside','Smyrna','Milford'],
  'FL': ['Miami','Orlando','Tampa','Jacksonville','Fort Lauderdale','St. Petersburg','Hialeah','Tallahassee','Cape Coral','Port St. Lucie','Pembroke Pines','Hollywood','Gainesville','Coral Springs','Clearwater'],
  'GA': ['Atlanta','Augusta','Savannah','Columbus','Macon','Athens','Sandy Springs','Roswell','Albany','Johns Creek','Warner Robins','Alpharetta','Marietta','Valdosta','Smyrna'],
  'HI': ['Honolulu','Pearl City','Hilo','Kailua','Kaneohe','Waipahu','Mililani','Kahului','Ewa Beach','Kapolei'],
  'ID': ['Boise','Meridian','Nampa','Idaho Falls','Pocatello','Caldwell','Coeur d\'Alene','Twin Falls','Lewiston','Post Falls'],
  'IL': ['Chicago','Aurora','Naperville','Rockford','Joliet','Springfield','Peoria','Elgin','Champaign','Waukegan','Cicero','Bloomington','Decatur','Evanston','Schaumburg'],
  'IN': ['Indianapolis','Fort Wayne','Evansville','South Bend','Carmel','Fishers','Bloomington','Hammond','Gary','Lafayette','Muncie','Terre Haute','Kokomo','Noblesville','Anderson'],
  'IA': ['Des Moines','Cedar Rapids','Davenport','Sioux City','Iowa City','Waterloo','Ames','West Des Moines','Council Bluffs','Ankeny','Dubuque','Urbandale','Cedar Falls','Marion','Bettendorf'],
  'KS': ['Kansas City','Wichita','Overland Park','Olathe','Topeka','Lawrence','Shawnee','Manhattan','Lenexa','Salina','Hutchinson','Leavenworth','Leawood','Garden City','Emporia'],
  'KY': ['Louisville','Lexington','Bowling Green','Owensboro','Covington','Richmond','Georgetown','Florence','Hopkinsville','Nicholasville','Elizabethtown','Henderson','Frankfort','Jeffersontown','Paducah'],
  'LA': ['New Orleans','Baton Rouge','Shreveport','Lafayette','Lake Charles','Kenner','Bossier City','Monroe','Alexandria','Houma','New Iberia','Slidell','Central','Ruston','Sulphur'],
  'ME': ['Portland','Lewiston','Bangor','Auburn','South Portland','Biddeford','Sanford','Brunswick','Scarborough','Westbrook'],
  'MD': ['Baltimore','Frederick','Rockville','Gaithersburg','Annapolis','College Park','Salisbury','Bowie','Hagerstown','Laurel','Germantown','Ellicott City','Bethesda','Columbia','Silver Spring'],
  'MA': ['Boston','Worcester','Springfield','Cambridge','Lowell','New Bedford','Brockton','Quincy','Lynn','Fall River','Newton','Somerville','Lawrence','Framingham','Haverhill'],
  'MI': ['Detroit','Grand Rapids','Ann Arbor','Lansing','Flint','Dearborn','Sterling Heights','Troy','Warren','Kalamazoo','Livonia','Canton','Clinton Township','Westland','Farmington Hills'],
  'MN': ['Minneapolis','Saint Paul','Rochester','Bloomington','Duluth','Brooklyn Park','Plymouth','Maple Grove','Woodbury','St. Cloud','Eagan','Eden Prairie','Blaine','Lakeville','Minnetonka'],
  'MS': ['Jackson','Gulfport','Hattiesburg','Biloxi','Southaven','Olive Branch','Tupelo','Meridian','Pearl','Madison','Clinton','Brandon','Starkville','Columbus','Vicksburg'],
  'MO': ['St. Louis','Kansas City','Springfield','Columbia','Independence','Lee\'s Summit','O\'Fallon','St. Joseph','St. Charles','Blue Springs','St. Peters','Florissant','Joplin','Chesterfield','Jefferson City'],
  'MT': ['Helena','Billings','Missoula','Great Falls','Bozeman','Butte','Kalispell','Havre','Miles City','Anaconda'],
  'NE': ['Omaha','Lincoln','Bellevue','Grand Island','Kearney','Fremont','Hastings','Norfolk','North Platte','Columbus'],
  'NV': ['Las Vegas','Henderson','Reno','North Las Vegas','Sparks','Carson City','Fernley','Elko','Mesquite','Boulder City'],
  'NH': ['Manchester','Nashua','Concord','Dover','Rochester','Keene','Laconia','Portsmouth','Lebanon','Claremont'],
  'NJ': ['Newark','Jersey City','Paterson','Elizabeth','Edison','Woodbridge','Lakewood','Toms River','Hamilton','Trenton','Clifton','Camden','Brick','Cherry Hill','Passaic'],
  'NM': ['Albuquerque','Las Cruces','Santa Fe','Rio Rancho','Roswell','Farmington','Hobbs','Clovis','Carlsbad','Alamogordo'],
  'NY': ['New York','Buffalo','Rochester','Yonkers','Syracuse','Albany','New Rochelle','Mount Vernon','Schenectady','Utica','White Plains','Troy','Niagara Falls','Binghamton','Hempstead'],
  'NC': ['Raleigh','Charlotte','Durham','Greensboro','Winston-Salem','Fayetteville','Cary','Wilmington','High Point','Concord','Asheville','Gastonia','Jacksonville','Chapel Hill','Huntersville'],
  'ND': ['Fargo','Bismarck','Grand Forks','Minot','West Fargo','Williston','Dickinson','Mandan','Jamestown','Wahpeton'],
  'OH': ['Columbus','Cleveland','Cincinnati','Toledo','Akron','Dayton','Parma','Canton','Youngstown','Lorain','Hamilton','Springfield','Kettering','Lakewood','Elyria'],
  'OK': ['Oklahoma City','Tulsa','Norman','Broken Arrow','Edmond','Lawton','Moore','Midwest City','Stillwater','Enid','Muskogee','Bartlesville','Owasso','Shawnee','Yukon'],
  'OR': ['Portland','Eugene','Salem','Gresham','Hillsboro','Beaverton','Bend','Medford','Springfield','Corvallis','Albany','Tigard','Lake Oswego','Keizer','Grants Pass'],
  'PA': ['Philadelphia','Pittsburgh','Allentown','Erie','Reading','Scranton','Bethlehem','Lancaster','Harrisburg','York','State College','Wilkes-Barre','Chester','Easton','Lebanon'],
  'RI': ['Providence','Warwick','Cranston','Pawtucket','East Providence','Woonsocket','Newport','Central Falls','Westerly','North Providence'],
  'SC': ['Columbia','Charleston','Greenville','Rock Hill','Mount Pleasant','North Charleston','Summerville','Goose Creek','Hilton Head','Florence','Spartanburg','Myrtle Beach','Sumter','Greer','Aiken'],
  'SD': ['Sioux Falls','Rapid City','Aberdeen','Brookings','Watertown','Mitchell','Yankton','Huron','Vermillion','Pierre'],
  'TN': ['Nashville','Memphis','Knoxville','Chattanooga','Clarksville','Murfreesboro','Franklin','Jackson','Johnson City','Bartlett','Hendersonville','Kingsport','Smyrna','Collierville','Cleveland'],
  'TX': ['Dallas','Houston','Austin','San Antonio','Fort Worth','El Paso','Arlington','Plano','Laredo','Lubbock','Corpus Christi','Garland','Irving','Frisco','McKinney'],
  'UT': ['Salt Lake City','Provo','West Valley City','Orem','Sandy','Ogden','St. George','Layton','South Jordan','Lehi','Millcreek','Taylorsville','Logan','Murray','Draper'],
  'VT': ['Burlington','South Burlington','Rutland','Montpelier','Barre','Essex Junction','Bennington','Brattleboro','Milton','St. Albans'],
  'VA': ['Alexandria','Virginia Beach','Norfolk','Richmond','Arlington','Newport News','Hampton','Chesapeake','Suffolk','Roanoke','Lynchburg','Charlottesville','Manassas','Fredericksburg','Fairfax'],
  'WA': ['Seattle','Spokane','Tacoma','Vancouver','Bellevue','Kent','Everett','Renton','Federal Way','Kirkland','Auburn','Redmond','Lakewood','Olympia','Bellingham'],
  'WV': ['Charleston','Huntington','Morgantown','Parkersburg','Wheeling','Weirton','Martinsburg','Fairmont','Clarksburg','Beckley'],
  'WI': ['Milwaukee','Madison','Green Bay','Kenosha','Racine','Appleton','Waukesha','Oshkosh','Eau Claire','Janesville','West Allis','La Crosse','Sheboygan','Wauwatosa','Fond du Lac'],
  'WY': ['Cheyenne','Casper','Laramie','Gillette','Rock Springs','Sheridan','Green River','Evanston','Riverton','Jackson']
};

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getAreaCode(state) {
  const codes = {
    'AL': ['205','251','256','334'], 'AK': ['907'], 'AZ': ['480','520','602','623'],
    'AR': ['479','501','870'], 'CA': ['213','310','408','415','510','619','714','818','916'],
    'CO': ['303','719','720'], 'CT': ['203','860'], 'DE': ['302'],
    'FL': ['305','321','352','386','407','561','727','813','904','941'],
    'GA': ['229','404','470','478','678','706','770','912'],
    'HI': ['808'], 'ID': ['208'], 'IL': ['217','309','312','630','708','773','815'],
    'IN': ['219','260','317','574','765'], 'IA': ['319','515','563','641'],
    'KS': ['316','785','913'], 'KY': ['270','502','606','859'],
    'LA': ['225','318','337','504','985'], 'ME': ['207'],
    'MD': ['240','301','410','443'], 'MA': ['413','508','617','781','978'],
    'MI': ['231','248','313','517','586','616','734','810','906'],
    'MN': ['218','320','507','612','651','763','952'], 'MS': ['228','601','662'],
    'MO': ['314','417','573','636','816'], 'MT': ['406'],
    'NE': ['308','402'], 'NV': ['702','775'], 'NH': ['603'],
    'NJ': ['201','609','732','856','908','973'], 'NM': ['505','575'],
    'NY': ['212','315','347','516','518','585','607','631','716','718','845','914'],
    'NC': ['252','336','704','828','910','919','980'], 'ND': ['701'],
    'OH': ['216','234','330','419','440','513','614','740','937'],
    'OK': ['405','580','918'], 'OR': ['503','541','971'],
    'PA': ['215','267','412','484','570','610','717','724','814'],
    'RI': ['401'], 'SC': ['803','843','864'],
    'SD': ['605'], 'TN': ['423','615','731','865','901','931'],
    'TX': ['210','214','254','281','325','361','409','432','512','713','806','817','830','903','915','936','940','956','972'],
    'UT': ['385','801'], 'VT': ['802'],
    'VA': ['276','434','540','571','703','757','804'],
    'WA': ['206','253','360','425','509'], 'WV': ['304','681'],
    'WI': ['262','414','608','715','920'], 'WY': ['307']
  };
  return rand(codes[state] || ['800']);
}

function generatePhone(state) {
  const area = getAreaCode(state);
  return `(${area}) ${randInt(200, 999)}-${randInt(1000, 9999)}`;
}

function generateAddress(state) {
  const num = randInt(100, 9999);
  const street = rand(STREET_NAMES);
  const city = rand(STATE_CITIES[state] || ['Unknown']);
  return { address: `${num} ${street}`, city, state };
}

function generateCallDate() {
  const now = Date.now();
  // Weekday-heavy: 80% weekday, 20% weekend
  let date;
  if (Math.random() < 0.8) {
    // Force weekday
    do {
      date = new Date(now - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000));
    } while (date.getDay() === 0 || date.getDay() === 6);
  } else {
    date = new Date(now - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000));
  }
  return date.toISOString().split('T')[0];
}

function generateCallDuration() {
  return `${randInt(2, 15)}m ${randInt(0, 59)}s`;
}

function generateScheduledDate() {
  const future = Date.now() + randInt(1, 14) * 24 * 60 * 60 * 1000;
  const date = new Date(future);
  const hours = randInt(8, 17);
  const mins = [0, 15, 30, 45][randInt(0, 3)];
  const period = hours >= 12 ? 'PM' : 'AM';
  const dispHour = hours > 12 ? hours - 12 : hours;
  return `${date.toISOString().split('T')[0]} ${dispHour}:${mins.toString().padStart(2, '0')} ${period}`;
}

function generateLeads(state, type, count) {
  const leads = [];
  const usedPhones = new Set();

  for (let i = 0; i < count; i++) {
    const firstName = rand(FIRST_NAMES);
    const lastName = rand(LAST_NAMES);
    const loc = generateAddress(state);

    // Deduplicate phones
    let phone;
    do {
      phone = generatePhone(state);
    } while (usedPhones.has(phone));
    usedPhones.add(phone);

    const roofIssue = rand(ROOF_ISSUES);

    const lead = {
      firstName,
      lastName,
      phone,
      address: loc.address,
      city: loc.city,
      state: loc.state,
      homeownerConfirmed: 'Yes',
      roofIssue,
      callRecording: `recording_${Date.now()}_${randInt(1000, 9999)}.mp3`,
      callDuration: generateCallDuration()
    };

    if (type === 'booked') {
      lead.scheduledDateTime = generateScheduledDate();
      lead.decisionMaker = 'Yes';
      lead.roofType = rand(ROOF_TYPES);
    }

    if (type === 'transfer') {
      lead.decisionMaker = 'Yes';
      lead.availableForEstimate = 'Within 7 days';
    }

    leads.push(lead);
  }

  return leads;
}

function leadsToCSV(leads, type) {
  let headers = ['First Name','Last Name','Phone','Address','City','State','Homeowner Confirmed','Roof Issue','Call Recording','Call Duration'];

  if (type === 'booked') {
    headers = ['First Name','Last Name','Phone','Address','City','State','Roof Issue','Scheduled Date/Time','Decision Maker','Roof Type','Call Recording','Call Duration'];
  } else if (type === 'transfer') {
    headers = ['First Name','Last Name','Phone','Address','City','State','Homeowner Confirmed','Roof Issue','Decision Maker','Available for Estimate','Call Recording','Call Duration'];
  }

  const rows = leads.map(l => {
    if (type === 'verified') {
      return [l.firstName, l.lastName, l.phone, l.address, l.city, l.state, l.homeownerConfirmed, `"${l.roofIssue}"`, l.callRecording, l.callDuration].join(',');
    } else if (type === 'booked') {
      return [l.firstName, l.lastName, l.phone, l.address, l.city, l.state, `"${l.roofIssue}"`, `"${l.scheduledDateTime}"`, l.decisionMaker, l.roofType, l.callRecording, l.callDuration].join(',');
    } else {
      return [l.firstName, l.lastName, l.phone, l.address, l.city, l.state, l.homeownerConfirmed, `"${l.roofIssue}"`, l.decisionMaker, l.availableForEstimate, l.callRecording, l.callDuration].join(',');
    }
  });

  return [headers.join(','), ...rows].join('\n');
}

module.exports = { generateLeads, leadsToCSV };
