const pool = require("../db");

const LgasTable = async (req, res, next) => {
  let conn;
  try {
    conn = await pool.connect();
    const checkSql = "SELECT COUNT(*) FROM lgas";
    const rows = await conn.query(checkSql);
    const rowCount = rows.rows[0].count;
    if (rowCount == 0) {
      const insertSql = `INSERT INTO lgas (lga,state_id)
            VALUES 
            ('aba north',1),
('aba south',1),
('arochukwu',1),
('bende',1),
('ikwuano',1),
('isiala ngwa north',1),
('isiala ngwa south',1),
('isuikwuato',1),
('obi ngwa',1),
('ohafia',1),
('osisioma',1),
('ugwunagbo',1),
('ukwa east',1),
('ukwa west',1),
('umuahia north',1),
('umuahia south',1),
('umu nneochi',1),
('demsa',2),
('fufure',2),
('ganye',2),
('gayuk',2),
('gombi',2),
('grie',2),
('hong',2),
('jada',2),
('lamurde',2),
('madagali',2),
('maiha',2),
('mayo belwa',2),
('michika',2),
('mubi north',2),
('mubi south',2),
('numan',2),
('shelleng',2),
('song',2),
('toungo',2),
('yola north',2),
('yola south',2),
('abak',3),
('eastern obolo',3),
('eket',3),
('esit eket',3),
('essien udim',3),
('etim ekpo',3),
('etinan',3),
('ibeno',3),
('ibesikpo asutan',3),
('ibiono-ibom',3),
('ika',3),
('ikono',3),
('ikot abasi',3),
('ikot ekpene',3),
('ini',3),
('itu',3),
('mbo',3),
('mkpat-enin',3),
('nsit-atai',3),
('nsit-ibom',3),
('nsit-ubium',3),
('obot akara',3),
('okobo',3),
('onna',3),
('oron',3),
('oruk anam',3),
('udung-uko',3),
('ukanafun',3),
('uruan',3),
('urue-offong/oruko',3),
('uyo',3),
('aguata',4),
('anambra east',4),
('anambra west',4),
('anaocha',4),
('awka north',4),
('awka south',4),
('ayamelum',4),
('dunukofia',4),
('ekwusigo',4),
('idemili north',4),
('idemili south',4),
('ihiala',4),
('njikoka',4),
('nnewi north',4),
('nnewi south',4),
('ogbaru',4),
('onitsha north',4),
('onitsha south',4),
('orumba north',4),
('orumba south',4),
('oyi',4),
('alkaleri',5),
('bauchi',5),
('bogoro',5),
('damban',5),
('darazo',5),
('dass',5),
('gamawa',5),
('ganjuwa',5),
('giade',5),
('itas/gadau',5),
('jama are',5),
('katagum',5),
('kirfi',5),
('misau',5),
('ningi',5),
('shira',5),
('tafawa balewa',5),
('toro',5),
('warji',5),
('zaki',5),
('brass',6),
('ekeremor',6),
('kolokuma/opokuma',6),
('nembe',6),
('ogbia',6),
('sagbama',6),
('southern ijaw',6),
('yenagoa',6),
('agatu',7),
('apa',7),
('ado',7),
('buruku',7),
('gboko',7),
('guma',7),
('gwer east',7),
('gwer west',7),
('katsina-ala',7),
('konshisha',7),
('kwande',7),
('logo',7),
('makurdi',7),
('obi',7),
('ogbadibo',7),
('ohimini',7),
('oju',7),
('okpokwu',7),
('oturkpo',7),
('tarka',7),
('ukum',7),
('ushongo',7),
('vandeikya',7),
('abadam',8),
('askira/uba',8),
('bama',8),
('bayo',8),
('biu',8),
('chibok',8),
('damboa',8),
('dikwa',8),
('gubio',8),
('guzamala',8),
('gwoza',8),
('hawul',8),
('jere',8),
('kaga',8),
('kala/balge',8),
('konduga',8),
('kukawa',8),
('kwaya kusar',8),
('mafa',8),
('magumeri',8),
('maiduguri',8),
('marte',8),
('mobbar',8),
('monguno',8),
('ngala',8),
('nganzai',8),
('shani',8),
('abi',9),
('akamkpa',9),
('akpabuyo',9),
('bakassi',9),
('bekwarra',9),
('biase',9),
('boki',9),
('calabar municipal',9),
('calabar south',9),
('etung',9),
('ikom',9),
('obanliku',9),
('obubra',9),
('obudu',9),
('odukpani',9),
('ogoja',9),
('yakuur',9),
('yala',9),
('aniocha north',10),
('aniocha south',10),
('bomadi',10),
('burutu',10),
('ethiope east',10),
('ethiope west',10),
('ika north east',10),
('ika south',10),
('isoko north',10),
('isoko south',10),
('ndokwa east',10),
('ndokwa west',10),
('okpe',10),
('oshimili north',10),
('oshimili south',10),
('patani',10),
('sapele',10),
('udu',10),
('ughelli north',10),
('ughelli south',10),
('ukwuani',10),
('uvwie',10),
('warri north',10),
('warri south',10),
('warri south west',10),
('abakaliki',11),
('afikpo north',11),
('afikpo south',11),
('ebonyi',11),
('ezza north',11),
('ezza south',11),
('ikwo',11),
('ishielu',11),
('ivo',11),
('izzi',11),
('ohaozara',11),
('ohaukwu',11),
('onicha',11),
('akoko-edo',12),
('egor',12),
('esan central',12),
('esan north-east',12),
('esan south-east',12),
('esan west',12),
('etsako central',12),
('etsako east',12),
('etsako west',12),
('igueben',12),
('ikpoba okha',12),
('orhionmwon',12),
('oredo',12),
('ovia north-east',12),
('ovia south-west',12),
('owan east',12),
('owan west',12),
('uhunmwonde',12),
('ado ekiti',13),
('efon',13),
('ekiti east',13),
('ekiti south-west',13),
('ekiti west',13),
('emure',13),
('gbonyin',13),
('ido osi',13),
('ijero',13),
('ikere',13),
('ikole',13),
('ilejemeje',13),
('irepodun/ifelodun',13),
('ise/orun',13),
('moba',13),
('oye',13),
('aninri',14),
('awgu',14),
('enugu east',14),
('enugu north',14),
('enugu south',14),
('ezeagu',14),
('igbo etiti',14),
('igbo eze north',14),
('igbo eze south',14),
('isi uzo',14),
('nkanu east',14),
('nkanu west',14),
('nsukka',14),
('oji river',14),
('udenu',14),
('udi',14),
('uzo uwani',14),
('akko',15),
('balanga',15),
('billiri',15),
('dukku',15),
('funakaye',15),
('gombe',15),
('kaltungo',15),
('kwami',15),
('nafada',15),
('shongom',15),
('yamaltu/deba',15),
('aboh mbaise',16),
('ahiazu mbaise',16),
('ehime mbano',16),
('ezinihitte',16),
('ideato north',16),
('ideato south',16),
('ihitte/uboma',16),
('ikeduru',16),
('isiala mbano',16),
('isu',16),
('mbaitoli',16),
('ngor okpala',16),
('njaba',16),
('nkwerre',16),
('nwangele',16),
('obowo',16),
('oguta',16),
('ohaji/egbema',16),
('okigwe',16),
('orlu',16),
('orsu',16),
('oru east',16),
('oru west',16),
('owerri municipal',16),
('owerri north',16),
('owerri west',16),
('unuimo',16),
('auyo',17),
('babura',17),
('biriniwa',17),
('birnin kudu',17),
('buji',17),
('dutse',17),
('gagarawa',17),
('garki',17),
('gumel',17),
('guri',17),
('gwaram',17),
('gwiwa',17),
('hadejia',17),
('jahun',17),
('kafin hausa',17),
('kazaure',17),
('kiri kasama',17),
('kiyawa',17),
('kaugama',17),
('maigatari',17),
('malam madori',17),
('miga',17),
('ringim',17),
('roni',17),
('sule tankarkar',17),
('taura',17),
('yankwashi',17),
('birnin gwari',18),
('chikun',18),
('giwa',18),
('igabi',18),
('ikara',18),
('jaba',18),
('jema a',18),
('kachia',18),
('kaduna north',18),
('kaduna south',18),
('kagarko',18),
('kajuru',18),
('kaura',18),
('kauru',18),
('kubau',18),
('kudan',18),
('lere',18),
('makarfi',18),
('sabon gari',18),
('sanga',18),
('soba',18),
('zangon kataf',18),
('zaria',18),
('ajingi',19),
('albasu',19),
('bagwai',19),
('bebeji',19),
('bichi',19),
('bunkure',19),
('dala',19),
('dambatta',19),
('dawakin kudu',19),
('dawakin tofa',19),
('doguwa',19),
('fagge',19),
('gabasawa',19),
('garko',19),
('garun mallam',19),
('gaya',19),
('gezawa',19),
('gwale',19),
('gwarzo',19),
('kabo',19),
('kano municipal',19),
('karaye',19),
('kibiya',19),
('kiru',19),
('kumbotso',19),
('kunchi',19),
('kura',19),
('madobi',19),
('makoda',19),
('minjibir',19),
('nasarawa',19),
('rano',19),
('rimin gado',19),
('rogo',19),
('shanono',19),
('sumaila',19),
('takai',19),
('tarauni',19),
('tofa',19),
('tsanyawa',19),
('tudun wada',19),
('ungogo',19),
('warawa',19),
('wudil',19),
('bakori',20),
('batagarawa',20),
('batsari',20),
('baure',20),
('bindawa',20),
('charanchi',20),
('dandume',20),
('danja',20),
('dan musa',20),
('daura',20),
('dutsi',20),
('dutsin ma',20),
('faskari',20),
('funtua',20),
('ingawa',20),
('jibia',20),
('kafur',20),
('kaita',20),
('kankara',20),
('kankia',20),
('katsina',20),
('kurfi',20),
('kusada',20),
('mai adua',20),
('malumfashi',20),
('mani',20),
('mashi',20),
('matazu',20),
('musawa',20),
('rimi',20),
('sabuwa',20),
('safana',20),
('sandamu',20),
('zango',20),
('aleiro',21),
('arewa dandi',21),
('argungu',21),
('augie',21),
('bagudo',21),
('birnin kebbi',21),
('bunza',21),
('dandi',21),
('fakai',21),
('gwandu',21),
('jega',21),
('kalgo',21),
('koko/besse',21),
('maiyama',21),
('ngaski',21),
('sakaba',21),
('shanga',21),
('suru',21),
('wasagu/danko',21),
('yauri',21),
('zuru',21),
('adavi',22),
('ajaokuta',22),
('ankpa',22),
('bassa',22),
('dekina',22),
('ibaji',22),
('idah',22),
('igalamela odolu',22),
('ijumu',22),
('kabba/bunu',22),
('kogi',22),
('lokoja',22),
('mopa muro',22),
('ofu',22),
('ogori/magongo',22),
('okehi',22),
('okene',22),
('olamaboro',22),
('omala',22),
('yagba east',22),
('yagba west',22),
('asa',23),
('baruten',23),
('edu',23),
('ekiti',23),
('ifelodun',23),
('ilorin east',23),
('ilorin south',23),
('ilorin west',23),
('irepodun',23),
('isin',23),
('kaiama',23),
('moro',23),
('offa',23),
('oke ero',23),
('oyun',23),
('pategi',23),
('agege',24),
('ajeromi-ifelodun',24),
('alimosho',24),
('amuwo-odofin',24),
('apapa',24),
('badagry',24),
('epe',24),
('eti osa',24),
('ibeju-lekki',24),
('ifako-ijaiye',24),
('ikeja',24),
('ikorodu',24),
('kosofe',24),
('lagos island',24),
('lagos mainland',24),
('mushin',24),
('ojo',24),
('oshodi-isolo',24),
('shomolu',24),
('surulere',24),
('akwanga',25),
('awe',25),
('doma',25),
('karu',25),
('keana',25),
('keffi',25),
('kokona',25),
('lafia',25),
('nasarawa',25),
('nasarawa egon',25),
('obi',25),
('toto',25),
('wamba',25),
('agaie',26),
('agwara',26),
('bida',26),
('borgu',26),
('bosso',26),
('chanchaga',26),
('edati',26),
('gbako',26),
('gurara',26),
('katcha',26),
('kontagora',26),
('lapai',26),
('lavun',26),
('magama',26),
('mariga',26),
('mashegu',26),
('mokwa',26),
('moya',26),
('paikoro',26),
('rafi',26),
('rijau',26),
('shiroro',26),
('suleja',26),
('tafa',26),
('wushishi',26),
('abeokuta north',27),
('abeokuta south',27),
('ado-odo/ota',27),
('egbado north',27),
('egbado south',27),
('ewekoro',27),
('ifo',27),
('ijebu east',27),
('ijebu north',27),
('ijebu north east',27),
('ijebu ode',27),
('ikenne',27),
('imeko afon',27),
('ipokia',27),
('obafemi owode',27),
('odeda',27),
('odogbolu',27),
('ogun waterside',27),
('remo north',27),
('shagamu',27),
('akoko north-east',28),
('akoko north-west',28),
('akoko south-west',28),
('akoko south-east',28),
('akure north',28),
('akure south',28),
('ese odo',28),
('idanre',28),
('ifedore',28),
('ilaje',28),
('ile oluji/okeigbo',28),
('irele',28),
('odigbo',28),
('okitipupa',28),
('ondo east',28),
('ondo west',28),
('ose',28),
('owo',28),
('atakunmosa east',29),
('atakunmosa west',29),
('aiyedaade',29),
('aiyedire',29),
('boluwaduro',29),
('boripe',29),
('ede north',29),
('ede south',29),
('ife central',29),
('ife east',29),
('ife north',29),
('ife south',29),
('egbedore',29),
('ejigbo',29),
('ifedayo',29),
('ifelodun',29),
('ila',29),
('ilesa east',29),
('ilesa west',29),
('irepodun',29),
('irewole',29),
('isokan',29),
('iwo',29),
('obokun',29),
('odo otin',29),
('ola oluwa',29),
('olorunda',29),
('oriade',29),
('orolu',29),
('osogbo',29),
('afijio',30),
('akinyele',30),
('atiba',30),
('atisbo',30),
('egbeda',30),
('ibadan north',30),
('ibadan north-east',30),
('ibadan north-west',30),
('ibadan south-east',30),
('ibadan south-west',30),
('ibarapa central',30),
('ibarapa east',30),
('ibarapa north',30),
('ido',30),
('irepo',30),
('iseyin',30),
('itesiwaju',30),
('iwajowa',30),
('kajola',30),
('lagelu',30),
('ogbomosho north',30),
('ogbomosho south',30),
('ogo oluwa',30),
('olorunsogo',30),
('oluyole',30),
('ona ara',30),
('orelope',30),
('ori ire',30),
('oyo',30),
('oyo east',30),
('saki east',30),
('saki west',30),
('surulere',30),
('bokkos',31),
('barkin ladi',31),
('bassa',31),
('jos east',31),
('jos north',31),
('jos south',31),
('kanam',31),
('kanke',31),
('langtang south',31),
('langtang north',31),
('mangu',31),
('mikang',31),
('pankshin',31),
('qua an pan',31),
('riyom',31),
('shendam',31),
('wase',31),
('abua/odual',32),
('ahoada east',32),
('ahoada west',32),
('akuku-toru',32),
('andoni',32),
('asari-toru',32),
('bonny',32),
('degema',32),
('eleme',32),
('emuoha',32),
('etche',32),
('gokana',32),
('ikwerre',32),
('khana',32),
('obio/akpor',32),
('ogba/egbema/ndoni',32),
('ogu/bolo',32),
('okrika',32),
('omuma',32),
('opobo/nkoro',32),
('oyigbo',32),
('port harcourt',32),
('tai',32),
('binji',33),
('bodinga',33),
('dange shuni',33),
('gada',33),
('goronyo',33),
('gudu',33),
('gwadabawa',33),
('illela',33),
('isa',33),
('kebbe',33),
('kware',33),
('rabah',33),
('sabon birni',33),
('shagari',33),
('silame',33),
('sokoto north',33),
('sokoto south',33),
('tambuwal',33),
('tangaza',33),
('tureta',33),
('wamako',33),
('wurno',33),
('yabo',33),
('ardo kola',34),
('bali',34),
('donga',34),
('gashaka',34),
('gassol',34),
('ibi',34),
('jalingo',34),
('karim lamido',34),
('kumi',34),
('lau',34),
('sardauna',34),
('takum',34),
('ussa',34),
('wukari',34),
('yorro',34),
('zing',34),
('bade',35),
('bursari',35),
('damaturu',35),
('fika',35),
('fune',35),
('geidam',35),
('gujba',35),
('gulani',35),
('jakusko',35),
('karasuwa',35),
('machina',35),
('nangere',35),
('nguru',35),
('potiskum',35),
('tarmuwa',35),
('yunusari',35),
('yusufari',35),
('anka',36),
('bakura',36),
('birnin magaji/kiyaw',36),
('bukkuyum',36),
('bungudu',36),
('gummi',36),
('gusau',36),
('kaura namoda',36),
('maradun',36),
('maru',36),
('shinkafi',36),
('talata mafara',36),
('chafe',36),
('zurmi',36),
('abaji',37),
('bwari',37),
('gwagwalada',37),
('kuje',37),
('kwali',37),
('municipal area council',37)           
            RETURNING *;`;
      const result = await conn.query(insertSql);
    }
  } catch (error) {
    console.log(error);
    res.status(401).json(`Error loading Lgas table- ${error}`);
  } finally {
    conn.release();
    next();
  }
};

module.exports = LgasTable;
