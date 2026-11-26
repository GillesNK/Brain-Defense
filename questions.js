// Base de données des questions structurée pour permettre des formulations variées
const RAW_DATA = {
    geo: {
        facile: [
            { country: "du Cameroun", capital: "Yaoundé", wrong: ["Douala", "Garoua", "Bafoussam"] },
            { country: "de la France", capital: "Paris", wrong: ["Lyon", "Marseille", "Bordeaux"] },
            { country: "du Japon", capital: "Tokyo", wrong: ["Séoul", "Pékin", "Osaka"] },
            { country: "du Sénégal", capital: "Dakar", wrong: ["Bamako", "Abidjan", "Conakry"] },
            { country: "de l'Égypte", capital: "Le Caire", wrong: ["Alexandrie", "Louxor", "Gizeh"] },
            { q: "Plus grand océan du monde ?", a: "Pacifique", w: ["Atlantique", "Indien"] },
            { q: "Fleuve mythique d'Égypte ?", a: "Le Nil", w: ["Le Congo", "Le Niger"] },
            { q: "Continent du Brésil ?", a: "Amérique du Sud", w: ["Europe", "Afrique"] }
        ],
        moyen: [
            { country: "du Canada", capital: "Ottawa", wrong: ["Toronto", "Montréal", "Vancouver"] },
            { country: "du Brésil", capital: "Brasilia", wrong: ["Rio de Janeiro", "São Paulo", "Salvador"] },
            { country: "du Nigeria", capital: "Abuja", wrong: ["Lagos", "Kano", "Ibadan"] },
            { country: "de l'Australie", capital: "Canberra", wrong: ["Sydney", "Melbourne", "Perth"] },
            { country: "du Maroc", capital: "Rabat", wrong: ["Casablanca", "Marrakech", "Fès"] },
            { q: "Plus haut sommet du monde ?", a: "Everest", w: ["Kilimandjaro", "Mont Blanc"] },
            { q: "Pays le plus peuplé ?", a: "Inde", w: ["États-Unis", "Russie"] },
            { q: "Plus grand désert chaud ?", a: "Sahara", w: ["Gobi", "Kalahari"] }
        ],
        difficile: [
            { country: "du Kazakhstan", capital: "Astana", wrong: ["Almaty", "Tachkent", "Bichkek"] },
            { country: "de la Nouvelle-Zélande", capital: "Wellington", wrong: ["Auckland", "Christchurch", "Hamilton"] },
            { country: "de la Turquie", capital: "Ankara", wrong: ["Istanbul", "Izmir", "Antalya"] },
            { q: "Plus petit État du monde ?", a: "Vatican", w: ["Monaco", "Nauru"] },
            { q: "Détroit entre Asie et Amérique ?", a: "Béring", w: ["Gibraltar", "Ormuz"] },
            { q: "Désert le plus aride du monde ?", a: "Atacama", w: ["Sahara", "Mojave"] },
            { q: "Fleuve le plus long d'Europe ?", a: "La Volga", w: ["Le Danube", "Le Rhin"] }
        ]
    },
    anglais: {
        facile: [
            { en: "Dog", fr: "Chien", wEn: ["Cat", "Bird"], wFr: ["Chat", "Oiseau"] },
            { en: "House", fr: "Maison", wEn: ["Horse", "Mouse"], wFr: ["Cheval", "Souris"] },
            { en: "Apple", fr: "Pomme", wEn: ["Pear", "Peach"], wFr: ["Poire", "Pêche"] },
            { en: "Book", fr: "Livre", wEn: ["Look", "Cook"], wFr: ["Cahier", "Stylo"] },
            { en: "Water", fr: "Eau", wEn: ["Fire", "Wind"], wFr: ["Feu", "Air"] },
            { en: "Sun", fr: "Soleil", wEn: ["Moon", "Star"], wFr: ["Lune", "Étoile"] },
            { q: "Manger en anglais ?", a: "To eat", w: ["To drink", "To sleep"] }
        ],
        moyen: [
            { en: "Always", fr: "Toujours", wEn: ["Never", "Often"], wFr: ["Jamais", "Parfois"] },
            { en: "Weather", fr: "Météo", wEn: ["Feather", "Leather"], wFr: ["Plume", "Cuir"] },
            { en: "Knowledge", fr: "Savoir", wEn: ["Knife", "Knee"], wFr: ["Couteau", "Genou"] },
            { q: "Passé de 'Go' ?", a: "Went", w: ["Gone", "Goed"] },
            { q: "Passé de 'Buy' ?", a: "Bought", w: ["Buyed", "Brought"] },
            { q: "Passé de 'See' ?", a: "Saw", w: ["Seen", "Seed"] },
            { q: "Traduction de 'Journey' ?", a: "Voyage", w: ["Journée", "Journal"] }
        ],
        difficile: [
            { en: "Nevertheless", fr: "Néanmoins", wEn: ["Nowadays", "Previously"], wFr: ["Désormais", "Auparavant"] },
            { en: "Reluctant", fr: "Réticent", wEn: ["Delighted", "Eager"], wFr: ["Ravi", "Impatient"] },
            { en: "Thorough", fr: "Approfondu", wEn: ["Through", "Rough"], wFr: ["À travers", "Difficile"] },
            { q: "Synonyme de 'Huge' ?", a: "Enormous", w: ["Tiny", "Weak"] },
            { q: "Traduction de 'To achieve' ?", a: "Accomplir", w: ["Échouer", "Éviter"] },
            { q: "Traduction de 'Widespread' ?", a: "Répandu", w: ["Étroit", "Caché"] }
        ]
    },
    culture: {
        facile: [
            { q: "Planète la plus proche du Soleil ?", a: "Mercure", w: ["Vénus", "Mars"] },
            { q: "Jours dans une année bissextile ?", a: "366", w: ["365", "364"] },
            { q: "Formule chimique de l'eau ?", a: "H2O", w: ["CO2", "O2"] },
            { q: "Animal terrestre le plus rapide ?", a: "Guépard", w: ["Lion", "Gazelle"] },
            { q: "Couleurs drapeau camerounais ?", a: "Vert Rouge Jaune", w: ["Bleu Blanc Rouge", "Vert Jaune Bleu"] },
            { q: "Combien de continents sur Terre ?", a: "6", w: ["5", "7"] },
            { q: "Gaz que nous respirons pour vivre ?", a: "Oxygène", w: ["Azote", "Hélium"] }
        ],
        moyen: [
            { q: "Qui a peint la Joconde ?", a: "De Vinci", w: ["Picasso", "Van Gogh"] },
            { q: "Symbole chimique de l'or ?", a: "Au", w: ["Ag", "Fe"] },
            { q: "Année du 1er pas sur la Lune ?", a: "1969", w: ["1959", "1975"] },
            { q: "Organe qui pompe le sang ?", a: "Le cœur", w: ["Le foie", "Les poumons"] },
            { q: "Joueurs par équipe au football ?", a: "11", w: ["10", "12"] },
            { q: "Auteur des Misérables ?", a: "Victor Hugo", w: ["Molière", "Émile Zola"] },
            { q: "Plus grand organe du corps humain ?", a: "La peau", w: ["Le foie", "L'intestin"] }
        ],
        difficile: [
            { q: "Vitesse de la lumière (km/s) ?", a: "300 000", w: ["150 000", "30 000"] },
            { q: "Découvreur de la pénicilline ?", a: "Fleming", w: ["Pasteur", "Curie"] },
            { q: "Nombre d'os adulte humain ?", a: "206", w: ["186", "256"] },
            { q: "Planète avec le plus de lunes ?", a: "Saturne", w: ["Jupiter", "Uranus"] },
            { q: "Langage de style du Web ?", a: "CSS", w: ["SQL", "C++"] },
            { q: "Année chute du mur de Berlin ?", a: "1989", w: ["1991", "1979"] }
        ]
    }
};

// ============================================================================
// THÈME 1 : GÉOGRAPHIE (>1000 questions, capitales, continents, fleuves, reliefs)
// ============================================================================
const GEO_QUESTIONS = [
["Quelle est la capitale de la France ?","Paris",["Lyon","Marseille","Bordeaux"]],
["Quelle est la capitale de l'Allemagne ?","Berlin",["Munich","Hambourg","Francfort"]],
["Quelle est la capitale de l'Italie ?","Rome",["Milan","Venise","Naples"]],
["Quelle est la capitale de l'Espagne ?","Madrid",["Barcelone","Séville","Valence"]],
["Quelle est la capitale du Royaume-Uni ?","Londres",["Manchester","Liverpool","Birmingham"]],
["Quelle est la capitale de la Russie ?","Moscou",["Saint-Pétersbourg","Kiev","Minsk"]],
["Quelle est la capitale de la Chine ?","Pékin",["Shanghai","Canton","Hong Kong"]],
["Quelle est la capitale de l'Inde ?","New Delhi",["Mumbai","Bengaluru","Kolkata"]],
["Quelle est la capitale du Japon ?","Tokyo",["Osaka","Kyoto","Yokohama"]],
["Quelle est la capitale du Brésil ?","Brasilia",["Rio de Janeiro","São Paulo","Salvador"]],
["Quelle est la capitale du Canada ?","Ottawa",["Toronto","Montréal","Vancouver"]],
["Quelle est la capitale des États-Unis ?","Washington",["New York","Los Angeles","Chicago"]],
["Quelle est la capitale de l'Australie ?","Canberra",["Sydney","Melbourne","Perth"]],
["Quelle est la capitale du Cameroun ?","Yaoundé",["Douala","Garoua","Bafoussam"]],
["Quelle est la capitale du Sénégal ?","Dakar",["Bamako","Abidjan","Conakry"]],
["Quelle est la capitale de l'Égypte ?","Le Caire",["Alexandrie","Louxor","Gizeh"]],
["Quelle est la capitale du Maroc ?","Rabat",["Casablanca","Marrakech","Fès"]],
["Quelle est la capitale d'Afrique du Sud ?","Pretoria",["Le Cap","Johannesbourg","Durban"]],
["Quelle est la capitale de l'Argentine ?","Buenos Aires",["Córdoba","Rosario","Mendoza"]],
["Quelle est la capitale du Mexique ?","Mexico",["Guadalajara","Monterrey","Puebla"]],
["Quelle est la capitale du Chili ?","Santiago",["Valparaíso","Concepción","La Serena"]],
["Quelle est la capitale du Pérou ?","Lima",["Arequipa","Cusco","Trujillo"]],
["Quelle est la capitale de la Colombie ?","Bogota",["Medellín","Cali","Barranquilla"]],
["Quelle est la capitale du Venezuela ?","Caracas",["Maracaibo","Valencia","Barquisimeto"]],
["Quelle est la capitale de l'Équateur ?","Quito",["Guayaquil","Cuenca","Machala"]],
["Quelle est la capitale du Paraguay ?","Asuncion",["Ciudad del Este","Encarnación","Pedro Juan Caballero"]],
["Quelle est la capitale de l'Uruguay ?","Montevideo",["Salto","Paysandú","Las Piedras"]],
["Quelle est la capitale de la Bolivie ?","Sucre",["La Paz","Santa Cruz","Cochabamba"]],
["Quelle est la capitale du Guatemala ?","Guatemala",["Quetzaltenango","Escuintla","Villa Nueva"]],
["Quelle est la capitale de Cuba ?","La Havane",["Santiago de Cuba","Camagüey","Holguín"]],
["Quelle est la capitale de la République dominicaine ?","Saint-Domingue",["Santiago","La Romana","San Pedro de Macorís"]],
["Quelle est la capitale d'Haïti ?","Port-au-Prince",["Cap-Haïtien","Les Cayes","Gonaïves"]],
["Quelle est la capitale de la Jamaïque ?","Kingston",["Montego Bay","Spanish Town","Portmore"]],
["Quelle est la capitale de Trinité-et-Tobago ?","Port-d'Espagne",["San Fernando","Arima","Chaguanas"]],
["Quelle est la capitale de la Belgique ?","Bruxelles",["Anvers","Gand","Bruges"]],
["Quelle est la capitale des Pays-Bas ?","Amsterdam",["La Haye","Rotterdam","Utrecht"]],
["Quelle est la capitale de l'Autriche ?","Vienne",["Salzbourg","Graz","Linz"]],
["Quelle est la capitale de la Suisse ?","Berne",["Zurich","Genève","Bâle"]],
["Quelle est la capitale de la Suède ?","Stockholm",["Göteborg","Malmö","Uppsala"]],
["Quelle est la capitale de la Norvège ?","Oslo",["Bergen","Trondheim","Stavanger"]],
["Quelle est la capitale du Danemark ?","Copenhague",["Aarhus","Odense","Aalborg"]],
["Quelle est la capitale de la Finlande ?","Helsinki",["Espoo","Tampere","Turku"]],
["Quelle est la capitale de la Pologne ?","Varsovie",["Cracovie","Gdańsk","Poznań"]],
["Quelle est la capitale de la Tchéquie ?","Prague",["Brno","Ostrava","Plzeň"]],
["Quelle est la capitale de la Slovaquie ?","Bratislava",["Košice","Prešov","Žilina"]],
["Quelle est la capitale de la Hongrie ?","Budapest",["Debrecen","Szeged","Miskolc"]],
["Quelle est la capitale de la Roumanie ?","Bucarest",["Cluj-Napoca","Timișoara","Iași"]],
["Quelle est la capitale de la Bulgarie ?","Sofia",["Plovdiv","Varna","Bourgas"]],
["Quelle est la capitale de la Serbie ?","Belgrade",["Novi Sad","Niš","Kragujevac"]],
["Quelle est la capitale de la Croatie ?","Zagreb",["Split","Rijeka","Osijek"]],
["Quelle est la capitale de la Slovénie ?","Ljubljana",["Maribor","Celje","Kranj"]],
["Quelle est la capitale de la Bosnie-Herzégovine ?","Sarajevo",["Banja Luka","Tuzla","Mostar"]],
["Quelle est la capitale de l'Albanie ?","Tirana",["Durrës","Vlorë","Shkodër"]],
["Quelle est la capitale de la Grèce ?","Athènes",["Thessalonique","Patras","Héraklion"]],
["Quelle est la capitale de Chypre ?","Nicosie",["Limassol","Larnaca","Famagouste"]],
["Quelle est la capitale de Malte ?","La Valette",["Mdina","Sliema","Birgu"]],
["Quelle est la capitale de l'Irlande ?","Dublin",["Cork","Galway","Limerick"]],
["Quelle est la capitale de l'Islande ?","Reykjavik",["Akureyri","Kópavogur","Hafnarfjörður"]],
["Quelle est la capitale du Portugal ?","Lisbonne",["Porto","Braga","Coimbra"]],
["Quelle est la capitale de l'Ukraine ?","Kiev",["Kharkiv","Odessa","Dnipro"]],
["Quelle est la capitale de la Biélorussie ?","Minsk",["Brest","Gomel","Moguilev"]],
["Quelle est la capitale de la Lituanie ?","Vilnius",["Kaunas","Klaipėda","Šiauliai"]],
["Quelle est la capitale de la Lettonie ?","Riga",["Daugavpils","Liepāja","Jelgava"]],
["Quelle est la capitale de l'Estonie ?","Tallinn",["Tartu","Narva","Pärnu"]],
["Quelle est la capitale de la Géorgie ?","Tbilissi",["Koutaïssi","Batoumi","Roustavi"]],
["Quelle est la capitale de l'Arménie ?","Erevan",["Gjumri","Vanadzor","Abovian"]],
["Quelle est la capitale de l'Azerbaïdjan ?","Bakou",["Gandja","Sumgait","Khachmaz"]],
["Quelle est la capitale du Kazakhstan ?","Astana",["Almaty","Chymkent","Karaganda"]],
["Quelle est la capitale de l'Ouzbékistan ?","Tachkent",["Samarcande","Boukhara","Namangan"]],
["Quelle est la capitale du Turkménistan ?","Achgabat",["Türkmenabat","Dasgouoz","Mary"]],
["Quelle est la capitale du Tadjikistan ?","Douchanbé",["Khoudjand","Koulob","Istaravchan"]],
["Quelle est la capitale du Kirghizistan ?","Bichkek",["Och","Djalal-Abad","Karakol"]],
["Quelle est la capitale de la Mongolie ?","Oulan-Bator",["Erdenet","Darkhan","Choibalsan"]],
["Quelle est la capitale de la Corée du Sud ?","Séoul",["Busan","Incheon","Daegu"]],
["Quelle est la capitale de la Corée du Nord ?","Pyongyang",["Hamhung","Chongjin","Wonsan"]],
["Quelle est la capitale du Vietnam ?","Hanoï",["Hô Chi Minh-Ville","Da Nang","Hai Phong"]],
["Quelle est la capitale de la Thaïlande ?","Bangkok",["Chiang Mai","Pattaya","Phuket"]],
["Quelle est la capitale de la Malaisie ?","Kuala Lumpur",["George Town","Ipoh","Johor Bahru"]],
["Quelle est la capitale de l'Indonésie ?","Jakarta",["Surabaya","Bandung","Medan"]],
["Quelle est la capitale des Philippines ?","Manille",["Quezon City","Davao","Cebu"]],
["Quelle est la capitale de Singapour ?","Singapour",["Kuala Lumpur","Manille","Jakarta"]],
["Quelle est la capitale du Cambodge ?","Phnom Penh",["Siem Reap","Battambang","Sihanoukville"]],
["Quelle est la capitale du Laos ?","Vientiane",["Luang Prabang","Pakse","Savannakhet"]],
["Quelle est la capitale de la Birmanie (Myanmar) ?","Naypyidaw",["Yangon","Mandalay","Bago"]],
["Quelle est la capitale du Bangladesh ?","Dacca",["Chittagong","Khulna","Rajshahi"]],
["Quelle est la capitale du Pakistan ?","Islamabad",["Karachi","Lahore","Faisalabad"]],
["Quelle est la capitale de l'Afghanistan ?","Kaboul",["Kandahar","Herat","Mazar-i-Sharif"]],
["Quelle est la capitale de l'Iran ?","Téhéran",["Machhad","Ispahan","Tabriz"]],
["Quelle est la capitale de l'Irak ?","Bagdad",["Mossoul","Bassorah","Erbil"]],
["Quelle est la capitale de l'Arabie saoudite ?","Riyad",["Djeddah","La Mecque","Médine"]],
["Quelle est la capitale des Émirats arabes unis ?","Abou Dabi",["Dubaï","Charjah","Al-Aïn"]],
["Quelle est la capitale du Qatar ?","Doha",["Al Rayyan","Al Wakra","Al Khor"]],
["Quelle est la capitale du Koweït ?","Koweït",["Hawalli","Al Farwaniyah","Al Ahmadi"]],
["Quelle est la capitale de Bahreïn ?","Manama",["Muharraq","Riffa","Hidd"]],
["Quelle est la capitale d'Oman ?","Mascate",["Salalah","Sohar","Nizwa"]],
["Quelle est la capitale du Yémen ?","Sanaa",["Aden","Taëzz","Hodeïda"]],
["Quelle est la capitale de la Jordanie ?","Amman",["Zarqa","Irbid","Aqaba"]],
["Quelle est la capitale du Liban ?","Beyrouth",["Tripoli","Sidon","Tyr"]],
["Quelle est la capitale de la Syrie ?","Damas",["Alep","Homs","Hama"]],
["Quelle est la capitale d'Israël ?","Jérusalem",["Tel-Aviv","Haïfa","Beersheba"]],
["Quelle est la capitale de la Turquie ?","Ankara",["Istanbul","Izmir","Antalya"]],
["Quelle est la capitale de l'Azerbaïdjan ?","Bakou",["Gandja","Sumgait","Khachmaz"]],
["Quelle est la capitale de l'Afrique du Sud ?","Pretoria",["Le Cap","Johannesbourg","Durban"]],
["Quelle est la capitale du Nigeria ?","Abuja",["Lagos","Kano","Ibadan"]],
["Quelle est la capitale du Kenya ?","Nairobi",["Mombasa","Kisumu","Nakuru"]],
["Quelle est la capitale de l'Éthiopie ?","Addis-Abeba",["Dire Dawa","Gonder","Bahir Dar"]],
["Quelle est la capitale de la Tanzanie ?","Dodoma",["Dar es Salam","Mwanza","Arusha"]],
["Quelle est la capitale de l'Ouganda ?","Kampala",["Gulu","Lira","Jinja"]],
["Quelle est la capitale du Ghana ?","Accra",["Kumasi","Tamale","Sekondi-Takoradi"]],
["Quelle est la capitale de la Côte d'Ivoire ?","Yamoussoukro",["Abidjan","Bouaké","Daloa"]],
["Quelle est la capitale du Mali ?","Bamako",["Sikasso","Mopti","Koutiala"]],
["Quelle est la capitale du Burkina Faso ?","Ouagadougou",["Bobo-Dioulasso","Koudougou","Ouahigouya"]],
["Quelle est la capitale du Niger ?","Niamey",["Zinder","Maradi","Tahoua"]],
["Quelle est la capitale du Tchad ?","N'Djaména",["Moundou","Sarh","Abéché"]],
["Quelle est la capitale du Cameroun ?","Yaoundé",["Douala","Garoua","Bafoussam"]],
["Quelle est la capitale du Sénégal ?","Dakar",["Bamako","Abidjan","Conakry"]],
["Quelle est la capitale de la Guinée ?","Conakry",["Nzérékoré","Kankan","Kindia"]],
["Quelle est la capitale de la Sierra Leone ?","Freetown",["Bo","Kenema","Makeni"]],
["Quelle est la capitale du Libéria ?","Monrovia",["Buchanan","Gbarnga","Harper"]],
["Quelle est la capitale du Togo ?","Lomé",["Sokodé","Kara","Palimé"]],
["Quelle est la capitale du Bénin ?","Porto-Novo",["Cotonou","Parakou","Djougou"]],
["Quelle est la capitale du Gabon ?","Libreville",["Port-Gentil","Franceville","Oyem"]],
["Quelle est la capitale du Congo ?","Brazzaville",["Pointe-Noire","Dolisie","Nkayi"]],
["Quelle est la capitale de la République démocratique du Congo ?","Kinshasa",["Lubumbashi","Mbuji-Mayi","Kisangani"]],
["Quelle est la capitale de l'Angola ?","Luanda",["Huambo","Lobito","Benguela"]],
["Quelle est la capitale de la Zambie ?","Lusaka",["Kitwe","Ndola","Kabwe"]],
["Quelle est la capitale du Zimbabwe ?","Harare",["Bulawayo","Chitungwiza","Mutare"]],
["Quelle est la capitale du Botswana ?","Gaborone",["Francistown","Molepolole","Maun"]],
["Quelle est la capitale de la Namibie ?","Windhoek",["Swakopmund","Walvis Bay","Oshakati"]],
["Quelle est la capitale du Mozambique ?","Maputo",["Beira","Nampula","Quelimane"]],
["Quelle est la capitale de Madagascar ?","Antananarivo",["Toamasina","Antsiranana","Fianarantsoa"]],
["Quelle est la capitale de Maurice ?","Port-Louis",["Curepipe","Vacoas","Quatre Bornes"]],
["Quelle est la capitale des Seychelles ?","Victoria",["Conakry","Berne","Glacis"]],
["Quelle est la capitale des Comores ?","Moroni",["Mutsamudu","Fomboni","Domoni"]],
["Quelle est la capitale de Djibouti ?","Djibouti",["Stockholm","Le Sénégal","Ali Sabieh"]],
["Quelle est la capitale de l'Érythrée ?","Asmara",["Massawa","Keren","Assab"]],
["Quelle est la capitale de la Somalie ?","Mogadiscio",["Hargeisa","Bosaso","Kismayo"]],
["Quelle est la capitale du Soudan ?","Khartoum",["Omdurman","Port-Soudan","Kassala"]],
["Quelle est la capitale du Soudan du Sud ?","Djouba",["Wau","Malakal","Aweil"]],
["Quelle est la capitale de la République centrafricaine ?","Bangui",["Berbérati","Bambari","Carnot"]],
["Quelle est la capitale de la Guinée équatoriale ?","Ciudad de la Paz",["Bata","Ebebiyin","Malabo"]],
["Quelle est la capitale de Sao Tomé-et-Principe ?","Sao Tomé",["Santo Antonio","Neves","Trindade"]],
["Sur quel continent se trouve la France ?","Europe",["Asie","Afrique","Amérique"]],
["Sur quel continent se trouve le Brésil ?","Amérique du Sud",["Amérique du Nord","Europe","Afrique"]],
["Sur quel continent se trouve l'Égypte ?","Afrique",["Asie","Europe","Amérique"]],
["Sur quel continent se trouve l'Australie ?","Océanie",["Asie","Afrique","Amérique"]],
["Sur quel continent se trouve le Canada ?","Amérique du Nord",["Amérique du Sud","Europe","Asie"]],
["Sur quel continent se trouve l'Inde ?","Asie",["Afrique","Europe","Amérique"]],
["Sur quel continent se trouve l'Afrique du Sud ?","Afrique",["Europe","Asie","Amérique"]],
["Sur quel continent se trouve l'Argentine ?","Amérique du Sud",["Amérique du Nord","Europe","Asie"]],
["Sur quel continent se trouve le Japon ?","Asie",["Europe","Océanie","Amérique"]],
["Sur quel continent se trouve la Russie ?","Europe et Asie",["Afrique","Amérique","Océanie"]],
["Sur quel continent se trouve la Turquie ?","Asie et Europe",["Afrique","Amérique","Océanie"]],
["Sur quel continent se trouve le Mexique ?","Amérique du Nord",["Amérique du Sud","Europe","Asie"]],
["Sur quel continent se trouve le Pérou ?","Amérique du Sud",["Amérique du Nord","Europe","Asie"]],
["Sur quel continent se trouve le Nigeria ?","Afrique",["Europe","Asie","Amérique"]],
["Sur quel continent se trouve le Kenya ?","Afrique",["Europe","Asie","Amérique"]],
["Sur quel continent se trouve l'Éthiopie ?","Afrique",["Europe","Asie","Amérique"]],
["Sur quel continent se trouve la Chine ?","Asie",["Europe","Afrique","Amérique"]],
["Sur quel continent se trouve les États-Unis ?","Amérique du Nord",["Amérique du Sud","Europe","Asie"]],
["Sur quel continent se trouve l'Allemagne ?","Europe",["Asie","Afrique","Amérique"]],
["Sur quel continent se trouve le Chili ?","Amérique du Sud",["Amérique du Nord","Europe","Asie"]],
["Sur quel continent se trouve l'Égypte ?","Afrique",["Asie","Europe","Amérique"]],
["Sur quel continent se trouve le Maroc ?","Afrique",["Europe","Asie","Amérique"]],
["Sur quel continent se trouve le Sénégal ?","Afrique",["Europe","Asie","Amérique"]],
["Sur quel continent se trouve le Cameroun ?","Afrique",["Europe","Asie","Amérique"]],
["Sur quel continent se trouve l'Indonésie ?","Asie",["Océanie","Europe","Amérique"]],
["Sur quel continent se trouve l'Australie ?","Océanie",["Asie","Afrique","Amérique"]],
["Sur quel continent se trouve la Nouvelle-Zélande ?","Océanie",["Asie","Afrique","Amérique"]],
["Sur quel continent se trouve l'Islande ?","Europe",["Amérique","Afrique","Asie"]],
["Sur quel continent se trouve le Groenland ?","Amérique du Nord",["Europe","Afrique","Asie"]],
["Quel fleuve traverse notamment l'Égypte et le Soudan ?","Le Nil",["L'Amazone","Le Congo","Le Mississippi"]],
["Quel fleuve est le plus grand d'Amérique du Sud ?","L'Amazone",["Le Nil","Le Congo","Le Mékong"]],
["Quel fleuve traverse l'Afrique centrale au débit très important ?","Le Congo",["Le Nil","Le Zambèze","Le Niger"]],
["Quel fleuve est le plus long d'Europe ?","La Volga",["Le Danube","Le Rhin","Le Pô"]],
["Quel fleuve traverse plusieurs capitales européennes ?","Le Danube",["Le Rhin","Le Pô","La Seine"]],
["Quel fleuve traverse Paris ?","La Seine",["La Loire","Le Rhône","La Garonne"]],
["Quel fleuve traverse Londres ?","La Tamise",["La Severn","La Mersey","La Clyde"]],
["Quel fleuve traverse Rome ?","Le Tibre",["L'Arno","Le Pô","L'Adige"]],
["Quel fleuve traverse Le Caire ?","Le Nil",["L'Amazone","Le Niger","Le Congo"]],
["Quel fleuve traverse l'Inde et est sacré pour les hindous ?","Le Gange",["L'Indus","Le Brahmapoutre","Le Godavari"]],
["Quel fleuve traverse la Chine et se jette dans la mer Jaune ?","Le Fleuve Jaune",["Le Yangtsé","Le Mékong","Le Pearl"]],
["Quel fleuve est le plus long d'Asie ?","Le Yangtsé",["Le Fleuve Jaune","Le Mékong","L'Indus"]],
["Quel fleuve traverse le Brésil et plusieurs pays sud-américains ?","L'Amazone",["L'Orénoque","Le Paraná","L'Uruguay"]],
["Quel fleuve traverse l'Égypte du sud au nord ?","Le Nil",["L'Amazone","Le Congo","Le Niger"]],
["Quel fleuve est le plus long du monde ?","Le Nil",["L'Amazone","Le Yangtsé","Le Mississippi"]],
["Quel fleuve traverse la Russie et se jette dans la mer Caspienne ?","La Volga",["Le Danube","L'Ob","L'Ienisseï"]],
["Quel fleuve traverse la Sibérie et se jette dans l'océan Arctique ?","L'Ienisseï",["L'Ob","La Léna","L'Amour"]],
["Quel fleuve forme une partie de la frontière entre les États-Unis et le Canada ?","Le Saint-Laurent",["Le Niagara","Le Mississippi","Le Colorado"]],
["Quel fleuve traverse l'Allemagne et les Pays-Bas ?","Le Rhin",["Le Danube","L'Elbe","Le Pô"]],
["Quel fleuve traverse la Chine et le Vietnam ?","Le Mékong",["Le Yangtsé","Le Salouen","L'Irrawaddy"]],
["Quel fleuve traverse le Pérou et le Brésil ?","L'Amazone",["L'Orénoque","Le Paraná","L'Uruguay"]],
["Quel fleuve traverse l'Inde et le Pakistan ?","L'Indus",["Le Gange","Le Brahmapoutre","Le Yamuna"]],
["Quel fleuve traverse le Soudan et l'Égypte ?","Le Nil",["Le Congo","Le Niger","Le Zambèze"]],
["Quel fleuve est le principal fleuve d'Irak ?","Le Tigre",["L'Euphrate","Le Karoun","Le Chatt al-Arab"]],
["Quel fleuve traverse Bagdad ?","Le Tigre",["L'Euphrate","Le Karoun","Le Chatt al-Arab"]],
["Quel fleuve traverse l'Inde et le Bangladesh ?","Le Brahmapoutre",["Le Gange","L'Indus","Le Godavari"]],
["Quel fleuve est le plus long de Chine ?","Le Yangtsé",["Le Fleuve Jaune","Le Mékong","Le Pearl"]],
["Quel fleuve traverse le Vietnam et le Cambodge ?","Le Mékong",["Le Yangtsé","Le Salouen","L'Irrawaddy"]],
["Quel fleuve traverse le Laos et la Thaïlande ?","Le Mékong",["Le Yangtsé","Le Salouen","L'Irrawaddy"]],
["Quel fleuve traverse l'Argentine et l'Uruguay ?","Le Paraná",["L'Uruguay","L'Orénoque","Le Paraguay"]],
["Quel fleuve traverse le Paraguay et le Brésil ?","Le Paraná",["L'Uruguay","L'Orénoque","Le Paraguay"]],
["Quel fleuve traverse les États-Unis et le Mexique ?","Le Rio Grande",["Le Colorado","Le Mississippi","Le Missouri"]],
["Quel fleuve traverse les États-Unis du nord au sud ?","Le Mississippi",["Le Missouri","Le Colorado","L'Ohio"]],
["Quel fleuve traverse les États-Unis et se jette dans le golfe du Mexique ?","Le Mississippi",["Le Missouri","Le Colorado","L'Ohio"]],
["Quel fleuve traverse le Canada et les États-Unis ?","Le Saint-Laurent",["Le Niagara","Le Mackenzie","Le Fraser"]],
["Quel fleuve est le plus long du Canada ?","Le Mackenzie",["Le Saint-Laurent","Le Fraser","Le Yukon"]],
["Quel fleuve traverse l'Australie ?","La Murray",["La Darling","La Murrumbidgee","La Lachlan"]],
["Quel fleuve traverse l'Inde et se jette dans le golfe du Bengale ?","Le Gange",["L'Indus","Le Brahmapoutre","Le Godavari"]],
["Quel fleuve traverse le Pakistan et se jette dans la mer d'Arabie ?","L'Indus",["Le Gange","Le Brahmapoutre","Le Jhelum"]],
["Quel fleuve traverse la Chine et se jette dans la mer de Chine orientale ?","Le Yangtsé",["Le Fleuve Jaune","Le Mékong","Le Pearl"]],
["Quel fleuve traverse l'Espagne et le Portugal ?","Le Tage",["Le Douro","Le Guadalquivir","L'Èbre"]],
["Quel fleuve traverse le Portugal ?","Le Douro",["Le Tage","Le Guadalquivir","L'Èbre"]],
["Quel fleuve traverse l'Allemagne ?","Le Rhin",["Le Danube","L'Elbe","Le Pô"]],
["Quel fleuve traverse l'Autriche ?","Le Danube",["Le Rhin","L'Inn","La Drave"]],
["Quel fleuve traverse la Hongrie ?","Le Danube",["Le Rhin","L'Inn","La Tisza"]],
["Quel fleuve traverse la Serbie ?","Le Danube",["La Save","La Tisza","La Morava"]],
["Quel fleuve traverse la Roumanie ?","Le Danube",["Le Prut","Le Olt","Le Mureș"]],
["Quel fleuve traverse la Bulgarie ?","Le Danube",["Le Maritsa","L'Iskur","L'Osogovo"]],
["Quel fleuve traverse l'Ukraine ?","Le Dniepr",["Le Dniestr","Le Boug","Le Donets"]],
["Quel fleuve traverse la Russie et se jette dans la mer Noire ?","Le Don",["La Volga","Le Kouban","Le Terek"]],
["Quel fleuve traverse la Russie et se jette dans la mer Caspienne ?","L'Oural",["La Volga","Le Terek","Le Sulak"]],
["Quel fleuve traverse l'Afghanistan et l'Iran ?","L'Helmand",["L'Hari-Rud","Le Kaboul","Le Panjshir"]],
["Quel fleuve traverse l'Inde et le Népal ?","Le Ghaghara",["Le Gange","Le Gandak","Le Kosi"]],
["Quel fleuve traverse l'Inde et le Bangladesh ?","Le Padma",["Le Gange","Le Brahmapoutre","Le Meghna"]],
["Quel fleuve traverse le Népal et l'Inde ?","Le Kosi",["Le Gandak","Le Ghaghara","Le Karnali"]],
["Quel fleuve traverse la Chine et l'Inde ?","Le Brahmapoutre",["Le Gange","L'Indus","Le Salouen"]],
["Quel fleuve traverse la Chine et le Myanmar ?","L'Irrawaddy",["Le Salouen","Le Mékong","Le Chindwin"]],
["Quel fleuve traverse le Myanmar et la Thaïlande ?","Le Salouen",["Le Mékong","L'Irrawaddy","Le Ping"]],
["Quel fleuve traverse la Thaïlande et le Laos ?","Le Mékong",["Le Ping","Le Wang","Le Yom"]],
["Quel fleuve traverse le Cambodge et le Vietnam ?","Le Mékong",["Le Bassac","Le Tonlé Sap","Le Saigon"]],
["Quel fleuve traverse le Vietnam ?","Le Mékong",["Le Dong Nai","Le Perfume","Le Saigon"]],
["Quel fleuve traverse l'Indonésie ?","Le Kapuas",["Le Mahakam","Le Barito","Le Musi"]],
["Quel fleuve traverse la Malaisie ?","Le Rajang",["Le Kinabatangan","Le Pahang","Le Perak"]],
["Quel fleuve traverse les Philippines ?","Le Cagayan",["Le Agusan","Le Pasig","Le Pulangi"]],
["Quel fleuve traverse la Papouasie-Nouvelle-Guinée ?","Le Sepik",["Le Fly","Le Purari","Le Markham"]],
["Quel fleuve traverse la Nouvelle-Zélande ?","Le Waikato",["Le Clutha","Le Waimakariri","Le Waitaki"]],
["Quel fleuve traverse l'Argentine ?","Le Paraná",["L'Uruguay","Le Río de la Plata","Le Colorado"]],
["Quel fleuve traverse le Brésil ?","L'Amazone",["Le Paraná","Le São Francisco","Le Tocantins"]],
["Quel fleuve traverse le Pérou ?","L'Amazone",["L'Ucayali","Le Marañón","Le Huallaga"]],
["Quel fleuve traverse la Colombie ?","Le Magdalena",["Le Cauca","Le Orénoque","Le Putumayo"]],
["Quel fleuve traverse le Venezuela ?","L'Orénoque",["Le Caroni","Le Apure","Le Meta"]],
["Quel fleuve traverse le Guyana ?","L'Esséquibo",["Le Courantyne","Le Demerara","Le Berbice"]],
["Quel fleuve traverse le Suriname ?","Le Suriname",["Le Maroni","Le Coppename","Le Saramacca"]],
["Quel fleuve traverse la Guyane française ?","Le Maroni",["L'Oyapock","Le Sinnamary","Le Approuague"]],
["Quel fleuve traverse le Canada ?","Le Mackenzie",["Le Yukon","Le Saint-Laurent","Le Nelson"]],
["Quel fleuve traverse les États-Unis ?","Le Mississippi",["Le Missouri","L'Ohio","Le Tennessee"]],
["Quel fleuve traverse le Mexique ?","Le Rio Grande",["Le Balsas","Le Grijalva","L'Usumacinta"]],
["Quel fleuve traverse Cuba ?","Le Cauto",["Le Sagua la Grande","Le Zaza","Le Ariguanabo"]],
["Quel fleuve traverse la République dominicaine ?","Le Yaque del Norte",["Le Yaque del Sur","Le Ozama","Le Isabela"]],
["Quel fleuve traverse Haïti ?","L'Artibonite",["Le Grand-Anse","Le Massacre","Le Trois-Rivières"]],
["Quel fleuve traverse la Jamaïque ?","Le Rio Minho",["Le Rio Cobre","Le Black River","Le Martha Brae"]],
["Quel fleuve traverse Trinité-et-Tobago ?","Le Caroni",["L'Oropouche","Le South Oropouche","Le Nariva"]],
["Quel fleuve traverse le Belize ?","Le Belize",["Le Hondo","Le New River","Le Monkey River"]],
["Quel fleuve traverse le Guatemala ?","Le Motagua",["Le Polochic","Le Sarstún","Le Usumacinta"]],
["Quel fleuve traverse le Honduras ?","Le Ulúa",["Le Chamelecón","Le Aguan","Le Coco"]],
["Quel fleuve traverse le Nicaragua ?","Le Coco",["Le San Juan","Le Escondido","Le Grande"]],
["Quel fleuve traverse le Costa Rica ?","Le Tempisque",["Le Reventazón","Le Tarcoles","Le Sixaola"]],
["Quel fleuve traverse le Panama ?","Le Chagres",["Le Tuira","Le Chepo","Le Bayano"]],
["Quel fleuve traverse l'Équateur ?","Le Guayas",["Le Napo","Le Pastaza","Le Zamora"]],
["Quel fleuve traverse le Pérou ?","L'Amazone",["L'Ucayali","Le Marañón","Le Huallaga"]],
["Quel fleuve traverse le Chili ?","Le Loa",["Le Biobío","Le Maule","Le Maipo"]],
["Quel fleuve traverse l'Uruguay ?","Le Río Negro",["Le Santa Lucía","Le Cebollatí","Le Yaguarí"]],
["Quel fleuve traverse le Paraguay ?","Le Paraguay",["Le Paraná","Le Pilcomayo","Le Apa"]],
["Quel fleuve traverse la Bolivie ?","Le Madeira",["Le Mamoré","Le Beni","Le Guaporé"]],
["Quel fleuve traverse l'Afrique du Sud ?","Le Orange",["Le Vaal","Le Limpopo","Le Olifants"]],
["Quel fleuve traverse la Namibie ?","L'Orange",["Le Fish","Le Swakop","Le Kuiseb"]],
["Quel fleuve traverse le Botswana ?","L'Okavango",["Le Limpopo","Le Chobe","Le Okavango"]],
["Quel fleuve traverse le Zimbabwe ?","Le Zambèze",["Le Limpopo","Le Save","Le Pungwe"]],
["Quel fleuve traverse le Mozambique ?","Le Zambèze",["Le Limpopo","Le Save","Le Pungwe"]],
["Quel fleuve traverse la Zambie ?","Le Zambèze",["Le Kafue","Le Luangwa","Le Chambeshi"]],
["Quel fleuve traverse le Malawi ?","Le Shire",["Le Zambèze","Le Ruo","Le Linthipe"]],
["Quel fleuve traverse la Tanzanie ?","Le Rufiji",["Le Ruvuma","Le Wami","Le Pangani"]],
["Quel fleuve traverse le Kenya ?","Le Tana",["L'Athi","Le Ewaso Ng'iro","Le Nzoia"]],
["Quel fleuve traverse l'Ouganda ?","Le Nil blanc",["Le Kafu","Le Mpongo","Le Semliki"]],
["Quel fleuve traverse le Rwanda ?","Le Nyabarongo",["Le Kagera","Le Ruvubu","Le Ruvironza"]],
["Quel fleuve traverse le Burundi ?","Le Ruvubu",["Le Nyabarongo","Le Kagera","Le Rironge"]],
["Quel fleuve traverse la République centrafricaine ?","L'Oubangui",["Le Chari","Le Mbomou","Le Kotto"]],
["Quel fleuve traverse le Tchad ?","Le Chari",["Le Logone","Le Bahr el Ghazal","Le Ouham"]],
["Quel fleuve traverse le Cameroun ?","Le Sanaga",["Le Benoué","Le Logone","Le Nyong"]],
["Quel fleuve traverse le Gabon ?","L'Ogooué",["Le Nyanga","Le Komo","Le Ivindo"]],
["Quel fleuve traverse le Congo ?","Le Congo",["L'Oubangui","Le Sangha","L'Alima"]],
["Quel fleuve traverse l'Angola ?","Le Congo",["Le Kwanza","Le Kasai","Le Cuango"]],
["Quel fleuve traverse la République démocratique du Congo ?","Le Congo",["Le Kasai","Le Lualaba","L'Uélé"]],
["Quel fleuve traverse la Zambie ?","Le Kafue",["Le Zambèze","Le Luangwa","Le Chambeshi"]],
["Quel fleuve traverse le Zimbabwe ?","Le Save",["Le Zambèze","Le Limpopo","Le Pungwe"]],
["Quel fleuve traverse le Mozambique ?","Le Limpopo",["Le Zambèze","Le Save","Le Pungwe"]],
["Quel fleuve traverse Madagascar ?","Le Betsiboka",["Le Mangoky","Le Onilahy","Le Ikopa"]],
["Quel fleuve traverse l'Éthiopie ?","Le Nil bleu",["L'Awash","L'Omo","Le Tekezé"]],
["Quel fleuve traverse le Soudan ?","Le Nil blanc",["Le Nil bleu","L'Atbara","Le Bahr el Ghazal"]],
["Quel fleuve traverse l'Égypte ?","Le Nil",["Le Nil blanc","Le Nil bleu","L'Atbara"]],
["Quel fleuve traverse l'Érythrée ?","L'Anseba",["Le Barka","Le Gash","Le Tekezé"]],
["Quel fleuve traverse la Somalie ?","Le Chébéli",["Le Jubba","Le Nogal","Le Daror"]],
["Quel fleuve traverse le Soudan du Sud ?","Le Nil blanc",["Le Sobat","Le Bahr el Ghazal","Le Pibor"]],
["Quel fleuve traverse la République centrafricaine ?","Le Chari",["L'Oubangui","Le Mbomou","Le Kotto"]],
["Quel fleuve traverse le Tchad ?","Le Logone",["Le Chari","Le Bahr el Ghazal","Le Ouham"]],
["Quel fleuve traverse le Cameroun ?","Le Benoué",["Le Sanaga","Le Logone","Le Nyong"]],
["Quel fleuve traverse le Nigeria ?","Le Niger",["Le Benoué","Le Kaduna","Le Sokoto"]],
["Quel fleuve traverse le Bénin ?","Le Niger",["L'Ouémé","Le Mono","Le Couffo"]],
["Quel fleuve traverse le Niger ?","Le Niger",["Le Sirba","Le Gorouol","Le Dargol"]],
["Quel fleuve traverse le Mali ?","Le Niger",["Le Bani","Le Sénégal","Le Falémé"]],
["Quel fleuve traverse le Burkina Faso ?","Le Mouhoun",["Le Nakambé","Le Nazinon","Le Léraba"]],
["Quel fleuve traverse le Ghana ?","Le Volta",["L'Oti","Le Pra","L'Ankobra"]],
["Quel fleuve traverse le Togo ?","Le Mono",["L'Oti","Le Haho","Le Zio"]],
["Quel fleuve traverse la Côte d'Ivoire ?","Le Bandama",["Le Sassandra","Le Comoé","Le Bia"]],
["Quel fleuve traverse la Guinée ?","Le Niger",["Le Sénégal","Le Gambie","Le Konkouré"]],
["Quel fleuve traverse la Sierra Leone ?","Le Rokel",["Le Jong","Le Sewa","Le Moa"]],
["Quel fleuve traverse le Libéria ?","Le Saint-Paul",["Le Saint-Jean","Le Cavalla","Le Lofa"]],
["Quel fleuve traverse la Guinée-Bissau ?","Le Geba",["Le Cacheu","Le Corubal","Le Mansôa"]],
["Quel fleuve traverse le Sénégal ?","Le Sénégal",["Le Gambie","Le Saloum","Le Casamance"]],
["Quel fleuve traverse la Gambie ?","Le fleuve Gambie",["Le Sénégal","Le Saloum","Le Casamance"]],
["Quel fleuve traverse la Mauritanie ?","Le Sénégal",["L'orgueil","Le Gorgol","Le Garfa"]],
["Quel fleuve traverse l'Algérie ?","Le Chéliff",["Le Soummam","Le Seybouse","Le Mekerra"]],
["Quel fleuve traverse le Maroc ?","Le Moulouya",["Le Sebou","Le Oum Er-Rbia","Le Drâa"]],
["Quel fleuve traverse la Tunisie ?","La Medjerda",["Le Zoussouna","Le Oued Zouara","Le Oued Siliana"]],
["Quel fleuve traverse le Soudan ?","L'Atbara",["Le Nil blanc","Le Nil bleu","Le Bahr el Ghazal"]],
["Quel fleuve traverse l'Éthiopie ?","Le Tekezé",["Le Nil bleu","L'Awash","L'Omo"]],
["Quel fleuve traverse le Kenya ?","L'Athi",["Le Tana","Le Ewaso Ng'iro","Le Nzoia"]],
["Quel fleuve traverse la Tanzanie ?","Le Ruvuma",["Le Rufiji","Le Wami","Le Pangani"]],
["Quel fleuve traverse le Mozambique ?","Le Save",["Le Limpopo","Le Zambèze","Le Pungwe"]],
["Quel fleuve traverse l'Afrique du Sud ?","Le Limpopo",["L'Orange","Le Vaal","Le Olifants"]],
["Quel fleuve traverse le Botswana ?","Le Limpopo",["L'Okavango","Le Chobe","Le Okavango"]],
["Quel fleuve traverse la Namibie ?","Le Fish",["L'Orange","Le Swakop","Le Kuiseb"]],
["Quel fleuve traverse l'Angola ?","Le Kwanza",["Le Congo","Le Kasai","Le Cuango"]],
["Quel fleuve traverse la République démocratique du Congo ?","Le Lualaba",["Le Congo","Le Kasai","L'Uélé"]],
["Quel fleuve traverse la République du Congo ?","L'Alima",["Le Congo","L'Oubangui","Le Sangha"]],
["Quel fleuve traverse le Gabon ?","Le Nyanga",["L'Ogooué","Le Komo","Le Ivindo"]],
["Quel fleuve traverse le Cameroun ?","Le Nyong",["Le Sanaga","Le Benoué","Le Logone"]],
["Quel fleuve traverse le Tchad ?","Le Bahr el Ghazal",["Le Chari","Le Logone","Le Ouham"]],
["Quel fleuve traverse le Soudan ?","Le Bahr el Ghazal",["Le Nil blanc","Le Nil bleu","L'Atbara"]],
["Quel fleuve traverse le Soudan du Sud ?","Le Sobat",["Le Nil blanc","Le Bahr el Ghazal","Le Pibor"]],
["Quel fleuve traverse l'Ouganda ?","Le Semliki",["Le Nil blanc","Le Kafu","Le Mpongo"]],
["Quel fleuve traverse le Rwanda ?","Le Kagera",["Le Nyabarongo","Le Ruvubu","Le Ruvironza"]],
["Quel fleuve traverse le Burundi ?","Le Kagera",["Le Ruvubu","Le Nyabarongo","Le Rironge"]],
["Quel fleuve traverse la République centrafricaine ?","Le Mbomou",["L'Oubangui","Le Chari","Le Kotto"]],
["Quel fleuve traverse le Tchad ?","Le Ouham",["Le Chari","Le Logone","Le Bahr el Ghazal"]],
["Quel fleuve traverse le Cameroun ?","Le Logone",["Le Sanaga","Le Benoué","Le Nyong"]],
["Quel fleuve traverse le Nigeria ?","Le Sokoto",["Le Niger","Le Benoué","Le Kaduna"]],
["Quel fleuve traverse le Bénin ?","Le Mono",["Le Niger","L'Ouémé","Le Couffo"]],
["Quel fleuve traverse le Togo ?","L'Oti",["Le Mono","Le Haho","Le Zio"]],
["Quel fleuve traverse le Ghana ?","L'Oti",["Le Volta","Le Pra","L'Ankobra"]],
["Quel fleuve traverse la Côte d'Ivoire ?","Le Comoé",["Le Bandama","Le Sassandra","Le Bia"]],
["Quel fleuve traverse le Ghana ?","Le Pra",["Le Volta","L'Oti","L'Ankobra"]],
["Quel fleuve traverse la Côte d'Ivoire ?","Le Sassandra",["Le Bandama","Le Comoé","Le Bia"]],
["Quel fleuve traverse la Guinée ?","Le Konkouré",["Le Niger","Le Sénégal","Le Gambie"]],
["Quel fleuve traverse la Sierra Leone ?","Le Sewa",["Le Rokel","Le Jong","Le Moa"]],
["Quel fleuve traverse le Libéria ?","Le Cavalla",["Le Saint-Paul","Le Saint-Jean","Le Lofa"]],
["Quel fleuve traverse la Guinée-Bissau ?","Le Corubal",["Le Geba","Le Cacheu","Le Mansôa"]],
["Quel fleuve traverse le Sénégal ?","Le Saloum",["Le Sénégal","Le Gambie","Le Casamance"]],
["Quel fleuve traverse la Mauritanie ?","Le Gorgol",["Le Sénégal","L'orgueil","Le Garfa"]],
["Quel fleuve traverse l'Algérie ?","Le Soummam",["Le Chéliff","Le Seybouse","Le Mekerra"]],
["Quel fleuve traverse le Maroc ?","Le Sebou",["Le Moulouya","Le Oum Er-Rbia","Le Drâa"]],
["Quel fleuve traverse la Tunisie ?","L'Oued Zouara",["La Medjerda","Le Zoussouna","Le Oued Siliana"]],
["Quel sommet est le plus haut d'Afrique ?","Le Kilimandjaro",["Le Mont Kenya","Le Ruwenzori","Le Mont Meru"]],
["Quel sommet est le plus haut des Alpes ?","Le Mont Blanc",["L'Elbrouz","Le Cervin","Le Mont Rosa"]],
["Quel sommet est le plus haut d'Asie ?","L'Everest",["Le K2","Le Kangchenjunga","Le Lhotse"]],
["Quel sommet est le plus haut d'Amérique du Nord ?","Le Denali",["Le Mont Logan","Le Pico de Orizaba","Le Mont Saint-Élie"]],
["Quel sommet est le plus haut d'Amérique du Sud ?","L'Aconcagua",["L'Ojos del Salado","Le Pissis","Le Mercedario"]],
["Quel sommet est le plus haut d'Océanie ?","Le Puncak Jaya",["Le Mont Kosciuszko","Le Mont Wilhelm","Le Mont Giluwe"]],
["Quel sommet est le plus haut d'Antarctique ?","Le Vinson",["Le Mont Tyree","Le Mont Shinn","Le Mont Heger"]],
["Quel désert est le plus grand du monde ?","Le désert antarctique",["Le Sahara","Le désert arctique","Le Gobi"]],
["Quel est le plus grand désert chaud du monde ?","Le Sahara",["Le désert d'Arabie","Le Gobi","Le Kalahari"]],
["Quel est le désert non polaire le plus aride du monde ?","L'Atacama",["Le Sahara","Le Mojave","Le Gobi"]],
["Quel désert se trouve en Afrique du Nord ?","Le Sahara",["Le Kalahari","Le Namib","Le Gobi"]],
["Quel désert se trouve en Afrique australe ?","Le Kalahari",["Le Sahara","Le Namib","Le Gobi"]],
["Quel désert se trouve en Namibie ?","Le Namib",["Le Kalahari","Le Sahara","Le Gobi"]],
["Quel désert s'étend en Mongolie et dans le nord de la Chine ?","Le Gobi",["Le Sahara","Le Kalahari","Le Taklamakan"]],
["Quel désert se trouve dans la région chinoise du Xinjiang ?","Le Taklamakan",["Le Gobi","Le Sahara","Le Kalahari"]],
["Quel désert se trouve en Arabie saoudite ?","Le Rub al-Khali",["Le Sahara","Le Gobi","Le Kalahari"]],
["Quel désert se trouve en Amérique du Nord ?","Le Mojave",["Le Sahara","Le Gobi","Le Kalahari"]],
["Quel désert se trouve en Amérique du Sud ?","L'Atacama",["Le Sahara","Le Gobi","Le Kalahari"]],
["Quel désert se trouve en Australie ?","Le Grand Désert Victoria",["Le Sahara","Le Gobi","Le Kalahari"]],
["Quel désert se trouve en Antarctique ?","Le désert antarctique",["Le Sahara","Le Gobi","Le Kalahari"]],
["Quel désert se trouve en Arctique ?","Le désert arctique",["Le Sahara","Le Gobi","Le Kalahari"]],
["Quel océan est le plus grand du monde ?","Le Pacifique",["L'Atlantique","L'Indien","L'Arctique"]],
["Quel océan sépare l'Amérique de l'Europe et de l'Afrique ?","L'Atlantique",["Le Pacifique","L'Indien","L'Arctique"]],
["Quel océan se trouve entre l'Afrique, l'Asie et l'Australie ?","L'Indien",["Le Pacifique","L'Atlantique","L'Arctique"]],
["Quel océan se trouve autour du pôle Nord ?","L'Arctique",["Le Pacifique","L'Atlantique","L'Indien"]],
["Quel océan se trouve autour du pôle Sud ?","L'Antarctique",["Le Pacifique","L'Atlantique","L'Indien"]],
["Quel océan baigne la côte ouest des États-Unis ?","Le Pacifique",["L'Atlantique","L'Indien","L'Arctique"]],
["Quel océan baigne la côte est des États-Unis ?","L'Atlantique",["Le Pacifique","L'Indien","L'Arctique"]],
["Quel océan baigne la côte ouest de l'Afrique ?","L'Atlantique",["Le Pacifique","L'Indien","L'Arctique"]],
["Quel océan baigne la côte est de l'Afrique ?","L'Indien",["Le Pacifique","L'Atlantique","L'Arctique"]],
["Quel océan baigne la côte est de l'Asie ?","Le Pacifique",["L'Atlantique","L'Indien","L'Arctique"]],
["Quel océan baigne la côte ouest de l'Amérique du Sud ?","Le Pacifique",["L'Atlantique","L'Indien","L'Arctique"]],
["Quel océan baigne la côte est de l'Amérique du Sud ?","L'Atlantique",["Le Pacifique","L'Indien","L'Arctique"]],
["Quel océan baigne la côte nord de l'Australie ?","L'Indien",["Le Pacifique","L'Atlantique","L'Arctique"]],
["Quel océan baigne la côte est de l'Australie ?","Le Pacifique",["L'Indien","L'Atlantique","L'Arctique"]],
["Quel océan baigne la côte nord de la Russie ?","L'Arctique",["Le Pacifique","L'Atlantique","L'Indien"]],
["Quel océan baigne la côte est de la Russie ?","Le Pacifique",["L'Arctique","L'Atlantique","L'Indien"]],
["Quel océan baigne la côte ouest de l'Amérique du Nord ?","Le Pacifique",["L'Atlantique","L'Indien","L'Arctique"]],
["Quel océan baigne la côte est de l'Amérique du Nord ?","L'Atlantique",["Le Pacifique","L'Indien","L'Arctique"]],
["Quel océan baigne la côte sud de l'Inde ?","L'Indien",["Le Pacifique","L'Atlantique","L'Arctique"]],
["Quel océan baigne la côte ouest de l'Inde ?","La mer d'Arabie",["L'Indien","Le Pacifique","L'Atlantique"]],
["Quel océan baigne la côte est de l'Inde ?","Le golfe du Bengale",["L'Indien","Le Pacifique","L'Atlantique"]],
["Quel océan baigne la côte ouest de l'Afrique du Sud ?","L'Atlantique",["L'Indien","Le Pacifique","L'Arctique"]],
["Quel océan baigne la côte est de l'Afrique du Sud ?","L'Indien",["L'Atlantique","Le Pacifique","L'Arctique"]],
["Quel océan baigne la côte ouest de l'Amérique centrale ?","Le Pacifique",["L'Atlantique","L'Indien","L'Arctique"]],
["Quel océan baigne la côte est de l'Amérique centrale ?","L'Atlantique (mer des Caraïbes)",["Le Pacifique","L'Indien","L'Arctique"]],
["Quel océan baigne la côte nord de l'Amérique du Sud ?","L'Atlantique (mer des Caraïbes)",["Le Pacifique","L'Indien","L'Arctique"]],
["Quel océan baigne la côte ouest de l'Amérique du Sud ?","Le Pacifique",["L'Atlantique","L'Indien","L'Arctique"]],
["Quel océan baigne la côte est de l'Amérique du Sud ?","L'Atlantique",["Le Pacifique","L'Indien","L'Arctique"]],
["Quel océan baigne la côte nord de l'Australie ?","L'Indien",["Le Pacifique","L'Atlantique","L'Arctique"]],
["Quel océan baigne la côte est de l'Australie ?","Le Pacifique",["L'Indien","L'Atlantique","L'Arctique"]],
["Quel océan baigne la côte sud de l'Australie ?","L'Indien",["Le Pacifique","L'Atlantique","L'Arctique"]],
["Quel océan baigne la côte ouest de l'Australie ?","L'Indien",["Le Pacifique","L'Atlantique","L'Arctique"]],
["Quel océan baigne la côte nord de la Nouvelle-Zélande ?","Le Pacifique",["L'Indien","L'Atlantique","L'Arctique"]],
["Quel océan baigne la côte sud de la Nouvelle-Zélande ?","L'Antarctique",["Le Pacifique","L'Indien","L'Atlantique"]],
["Quel océan baigne la côte est de la Nouvelle-Zélande ?","Le Pacifique",["L'Indien","L'Atlantique","L'Arctique"]],
["Quel océan baigne la côte ouest de la Nouvelle-Zélande ?","La mer de Tasman",["Le Pacifique","L'Indien","L'Atlantique"]],
["Quel océan baigne la côte nord de l'Antarctique ?","L'Antarctique",["Le Pacifique","L'Atlantique","L'Indien"]],
["Quel océan baigne la côte sud de l'Antarctique ?","L'Antarctique",["Le Pacifique","L'Atlantique","L'Indien"]],
["Quel océan baigne la côte est de l'Antarctique ?","L'Indien",["Le Pacifique","L'Atlantique","L'Arctique"]],
["Quel océan baigne la côte ouest de l'Antarctique ?","Le Pacifique",["L'Indien","L'Atlantique","L'Arctique"]],
["Quel océan baigne la côte nord de l'Arctique ?","L'Arctique",["Le Pacifique","L'Atlantique","L'Indien"]],
["Quel océan baigne la côte sud de l'Arctique ?","L'Atlantique",["Le Pacifique","L'Indien","L'Arctique"]],
["Quel océan baigne la côte est de l'Arctique ?","Le Pacifique",["L'Atlantique","L'Indien","L'Arctique"]],
["Quel océan baigne la côte ouest de l'Arctique ?","Le Pacifique",["L'Atlantique","L'Indien","L'Arctique"]],
["Quelle île est la plus grande du monde ?","Le Groenland",["La Nouvelle-Guinée","Bornéo","Madagascar"]],
["Quelle île est la deuxième plus grande du monde ?","La Nouvelle-Guinée",["Le Groenland","Bornéo","Madagascar"]],
["Quelle île est la troisième plus grande du monde ?","Bornéo",["Le Groenland","La Nouvelle-Guinée","Madagascar"]],
["Quelle île est la quatrième plus grande du monde ?","Madagascar",["Le Groenland","La Nouvelle-Guinée","Bornéo"]],
["Quelle île est la cinquième plus grande du monde ?","Baffin",["Le Groenland","La Nouvelle-Guinée","Bornéo"]],
["Quelle île appartient au Danemark ?","Le Groenland",["L'Islande","Les Féroé","Le Danemark"]],
["Quelle île appartient à l'Indonésie et à la Papouasie-Nouvelle-Guinée ?","La Nouvelle-Guinée",["Bornéo","Sumatra","Madagascar"]],
["Quelle île appartient à l'Indonésie, la Malaisie et Brunei ?","Bornéo",["La Nouvelle-Guinée","Sumatra","Madagascar"]],
["Quelle île se trouve au large de l'Afrique de l'Est ?","Madagascar",["Le Groenland","La Nouvelle-Guinée","Bornéo"]],
["Quelle île se trouve au large de l'Italie ?","La Sicile",["La Sardaigne","La Corse","Chypre"]],
["Quelle île se trouve au large de l'Italie ?","La Sardaigne",["La Sicile","La Corse","Chypre"]],
["Quelle île se trouve au large de la France ?","La Corse",["La Sardaigne","La Sicile","Chypre"]],
["Quelle île se trouve au large de la Grande-Bretagne ?","L'Irlande",["L'Islande","Le Groenland","Madagascar"]],
["Quelle île se trouve au large de l'Écosse ?","Les Hébrides",["Les Orcades","Les Shetland","L'Île de Man"]],
["Quelle île se trouve au large du Pays de Galles ?","L'Anglesey",["L'Île de Wight","Jersey","Guernesey"]],
["Quelle île se trouve au large de l'Angleterre ?","L'Île de Wight",["L'Anglesey","Jersey","Guernesey"]],
["Quelle île se trouve en Méditerranée ?","Chypre",["La Crète","La Sicile","La Sardaigne"]],
["Quelle île se trouve en Méditerranée ?","La Crète",["Chypre","La Sicile","La Sardaigne"]],
["Quelle île se trouve en Méditerranée ?","Les Baléares",["Chypre","La Crète","La Sicile"]],
["Quelle île se trouve en Méditerranée ?","La Corse",["La Sardaigne","La Sicile","Chypre"]],
["Quelle île se trouve en Méditerranée ?","La Sardaigne",["La Corse","La Sicile","Chypre"]],
["Quelle île se trouve en Méditerranée ?","La Sicile",["La Corse","La Sardaigne","Chypre"]],
["Quelle île se trouve dans les Caraïbes ?","Cuba",["La Jamaïque","Haïti","La République dominicaine"]],
["Quelle île se trouve dans les Caraïbes ?","La Jamaïque",["Cuba","Haïti","La République dominicaine"]],
["Quelle île se trouve dans les Caraïbes ?","Haïti",["Cuba","La Jamaïque","La République dominicaine"]],
["Quelle île se trouve dans les Caraïbes ?","La République dominicaine",["Cuba","La Jamaïque","Haïti"]],
["Quelle île se trouve dans les Caraïbes ?","Porto Rico",["Cuba","La Jamaïque","Haïti"]],
["Quelle île se trouve dans les Caraïbes ?","Trinité-et-Tobago",["Cuba","La Jamaïque","Haïti"]],
["Quelle île se trouve dans les Caraïbes ?","La Barbade",["Cuba","La Jamaïque","Haïti"]],
["Quelle île se trouve dans les Caraïbes ?","Les Bahamas",["Cuba","La Jamaïque","Haïti"]],
["Quelle île se trouve dans les Caraïbes ?","La Dominique",["Cuba","La Jamaïque","Haïti"]],
["Quelle île se trouve dans les Caraïbes ?","La Grenade",["Cuba","La Jamaïque","Haïti"]],
["Quelle île se trouve dans les Caraïbes ?","Sainte-Lucie",["Cuba","La Jamaïque","Haïti"]],
["Quelle île se trouve dans les Caraïbes ?","Saint-Vincent-et-les-Grenadines",["Cuba","La Jamaïque","Haïti"]],
["Quelle île se trouve dans les Caraïbes ?","Antigua-et-Barbuda",["Cuba","La Jamaïque","Haïti"]],
["Quelle île se trouve dans les Caraïbes ?","Saint-Christophe-et-Niévès",["Cuba","La Jamaïque","Haïti"]],
["Quelle île se trouve dans l'océan Indien ?","Maurice",["Les Seychelles","Madagascar","Les Comores"]],
["Quelle île se trouve dans l'océan Indien ?","Les Seychelles",["Maurice","Madagascar","Les Comores"]],
["Quelle île se trouve dans l'océan Indien ?","Les Comores",["Maurice","Les Seychelles","Madagascar"]],
["Quelle île se trouve dans l'océan Indien ?","La Réunion",["Maurice","Les Seychelles","Madagascar"]],
["Quelle île se trouve dans l'océan Indien ?","Madagascar",["Maurice","Les Seychelles","Les Comores"]],
["Quelle île se trouve dans l'océan Indien ?","Zanzibar",["Maurice","Les Seychelles","Madagascar"]],
["Quelle île se trouve dans l'océan Indien ?","Sri Lanka",["Maurice","Les Seychelles","Madagascar"]],
["Quelle île se trouve dans l'océan Indien ?","Les Maldives",["Maurice","Les Seychelles","Madagascar"]],
["Quelle île se trouve dans l'océan Indien ?","La Réunion",["Maurice","Les Seychelles","Madagascar"]],
["Quelle île se trouve dans l'océan Pacifique ?","Hawaï",["La Nouvelle-Zélande","La Papouasie-Nouvelle-Guinée","Fidji"]],
["Quelle île se trouve dans l'océan Pacifique ?","La Nouvelle-Zélande",["Hawaï","La Papouasie-Nouvelle-Guinée","Fidji"]],
["Quelle île se trouve dans l'océan Pacifique ?","La Papouasie-Nouvelle-Guinée",["Hawaï","La Nouvelle-Zélande","Fidji"]],
["Quelle île se trouve dans l'océan Pacifique ?","Fidji",["Hawaï","La Nouvelle-Zélande","La Papouasie-Nouvelle-Guinée"]],
["Quelle île se trouve dans l'océan Pacifique ?","La Nouvelle-Calédonie",["Hawaï","La Nouvelle-Zélande","Fidji"]],
["Quelle île se trouve dans l'océan Pacifique ?","La Polynésie française",["Hawaï","La Nouvelle-Zélande","Fidji"]],
["Quelle île se trouve dans l'océan Pacifique ?","Les îles Cook",["Hawaï","La Nouvelle-Zélande","Fidji"]],
["Quelle île se trouve dans l'océan Pacifique ?","Le Vanuatu",["Hawaï","La Nouvelle-Zélande","Fidji"]],
["Quelle île se trouve dans l'océan Pacifique ?","Les Salomon",["Hawaï","La Nouvelle-Zélande","Fidji"]],
["Quelle île se trouve dans l'océan Pacifique ?","La Nouvelle-Calédonie",["Hawaï","La Nouvelle-Zélande","Fidji"]],
["Quel pays a la plus grande superficie du monde ?","La Russie",["Le Canada","La Chine","Les États-Unis"]],
["Quel pays a la deuxième plus grande superficie du monde ?","Le Canada",["La Russie","La Chine","Les États-Unis"]],
["Quel pays a la troisième plus grande superficie du monde ?","La Chine",["La Russie","Le Canada","Les États-Unis"]],
["Quel pays a la quatrième plus grande superficie du monde ?","Les États-Unis",["La Russie","Le Canada","La Chine"]],
["Quel pays a la cinquième plus grande superficie du monde ?","Le Brésil",["La Russie","Le Canada","La Chine"]],
["Quel pays a la sixième plus grande superficie du monde ?","L'Australie",["La Russie","Le Canada","La Chine"]],
["Quel pays a la septième plus grande superficie du monde ?","L'Inde",["La Russie","Le Canada","La Chine"]],
["Quel pays a la huitième plus grande superficie du monde ?","L'Argentine",["La Russie","Le Canada","La Chine"]],
["Quel pays a la neuvième plus grande superficie du monde ?","Le Kazakhstan",["La Russie","Le Canada","La Chine"]],
["Quel pays a la dixième plus grande superficie du monde ?","L'Algérie",["La Russie","Le Canada","La Chine"]],
["Quel pays a la plus grande population du monde ?","L'Inde",["La Chine","Les États-Unis","L'Indonésie"]],
["Quel pays a la deuxième plus grande population du monde ?","La Chine",["L'Inde","Les États-Unis","L'Indonésie"]],
["Quel pays a la troisième plus grande population du monde ?","Les États-Unis",["L'Inde","La Chine","L'Indonésie"]],
["Quel pays a la quatrième plus grande population du monde ?","L'Indonésie",["L'Inde","La Chine","Les États-Unis"]],
["Quel pays a la cinquième plus grande population du monde ?","Le Pakistan",["L'Inde","La Chine","Les États-Unis"]],
["Quel pays a la sixième plus grande population du monde ?","Le Nigeria",["L'Inde","La Chine","Les États-Unis"]],
["Quel pays a la septième plus grande population du monde ?","Le Brésil",["L'Inde","La Chine","Les États-Unis"]],
["Quel pays a la huitième plus grande population du monde ?","Le Bangladesh",["L'Inde","La Chine","Les États-Unis"]],
["Quel pays a la neuvième plus grande population du monde ?","La Russie",["L'Inde","La Chine","Les États-Unis"]],
["Quel pays a la dixième plus grande population du monde ?","Le Mexique",["L'Inde","La Chine","Les États-Unis"]],
["Quel pays est le plus petit du monde ?","Le Vatican",["Monaco","Nauru","Saint-Marin"]],
["Quel pays est le deuxième plus petit du monde ?","Monaco",["Le Vatican","Nauru","Saint-Marin"]],
["Quel pays est le troisième plus petit du monde ?","Nauru",["Le Vatican","Monaco","Saint-Marin"]],
["Quel pays est le quatrième plus petit du monde ?","Tuvalu",["Le Vatican","Monaco","Nauru"]],
["Quel pays est le cinquième plus petit du monde ?","Saint-Marin",["Le Vatican","Monaco","Nauru"]],
["Quel pays est le sixième plus petit du monde ?","Liechtenstein",["Le Vatican","Monaco","Nauru"]],
["Quel pays est le septième plus petit du monde ?","Les Îles Marshall",["Le Vatican","Monaco","Nauru"]],
["Quel pays est le huitième plus petit du monde ?","Saint-Kitts-et-Nevis",["Le Vatican","Monaco","Nauru"]],
["Quel pays est le neuvième plus petit du monde ?","Les Maldives",["Le Vatican","Monaco","Nauru"]],
["Quel pays est le dixième plus petit du monde ?","Malte",["Le Vatican","Monaco","Nauru"]],
["Quel pays possède la plus longue frontière du monde ?","Le Canada (avec les États-Unis)",["La Russie","Les États-Unis","La Chine"]],
["Quel pays possède la plus longue côte du monde ?","Le Canada",["La Russie","L'Indonésie","Les États-Unis"]],
["Quel pays possède la deuxième plus longue côte du monde ?","La Norvège",["Le Canada","La Russie","L'Indonésie"]],
["Quel pays possède la troisième plus longue côte du monde ?","L'Indonésie",["Le Canada","La Russie","La Norvège"]],
["Quel pays possède la quatrième plus longue côte du monde ?","Le Groenland",["Le Canada","La Russie","L'Indonésie"]],
["Quel pays possède la cinquième plus longue côte du monde ?","La Russie",["Le Canada","La Norvège","L'Indonésie"]],
["Quel pays possède la sixième plus longue côte du monde ?","Les Philippines",["Le Canada","La Russie","L'Indonésie"]],
["Quel pays possède la septième plus longue côte du monde ?","Le Japon",["Le Canada","La Russie","L'Indonésie"]],
["Quel pays possède la huitième plus longue côte du monde ?","L'Australie",["Le Canada","La Russie","L'Indonésie"]],
["Quel pays possède la neuvième plus longue côte du monde ?","Les États-Unis",["Le Canada","La Russie","L'Indonésie"]],
["Quel pays possède la dixième plus longue côte du monde ?","La Nouvelle-Zélande",["Le Canada","La Russie","L'Indonésie"]],
["Quel pays est enclavé en Europe ?","La Suisse",["L'Autriche","Le Liechtenstein","Le Luxembourg"]],
["Quel pays est enclavé en Europe ?","L'Autriche",["La Suisse","Le Liechtenstein","Le Luxembourg"]],
["Quel pays est enclavé en Europe ?","Le Liechtenstein",["La Suisse","L'Autriche","Le Luxembourg"]],
["Quel pays est enclavé en Europe ?","Le Luxembourg",["La Suisse","L'Autriche","Le Liechtenstein"]],
["Quel pays est enclavé en Europe ?","La République tchèque",["L'Allemagne","La Pologne","L'Autriche"]],
["Quel pays est enclavé en Europe ?","La Slovaquie",["La Tchéquie","La Pologne","L'Autriche"]],
["Quel pays est enclavé en Europe ?","La Hongrie",["L'Autriche","La Slovaquie","La Roumanie"]],
["Quel pays est enclavé en Europe ?","La Serbie",["La Hongrie","La Roumanie","La Bulgarie"]],
["Quel pays est enclavé en Europe ?","La Bosnie-Herzégovine",["La Croatie","La Serbie","Le Monténégro"]],
["Quel pays est enclavé en Europe ?","La République centrafricaine",["Le Tchad","Le Soudan","La RDC"]],
["Quel pays est enclavé en Afrique ?","Le Tchad",["Le Niger","Le Soudan","La RDC"]],
["Quel pays est enclavé en Afrique ?","Le Niger",["Le Tchad","Le Mali","Le Nigeria"]],
["Quel pays est enclavé en Afrique ?","Le Mali",["Le Niger","Le Burkina Faso","La Mauritanie"]],
["Quel pays est enclavé en Afrique ?","Le Burkina Faso",["Le Mali","Le Niger","Le Ghana"]],
["Quel pays est enclavé en Afrique ?","L'Ouganda",["Le Kenya","La Tanzanie","Le Soudan du Sud"]],
["Quel pays est enclavé en Afrique ?","Le Rwanda",["L'Ouganda","La Tanzanie","Le Burundi"]],
["Quel pays est enclavé en Afrique ?","Le Burundi",["Le Rwanda","La Tanzanie","La RDC"]],
["Quel pays est enclavé en Afrique ?","Le Malawi",["Le Mozambique","La Tanzanie","La Zambie"]],
["Quel pays est enclavé en Afrique ?","La Zambie",["La RDC","La Tanzanie","Le Malawi"]],
["Quel pays est enclavé en Afrique ?","Le Zimbabwe",["L'Afrique du Sud","Le Botswana","Le Mozambique"]],
["Quel pays est enclavé en Afrique ?","Le Botswana",["L'Afrique du Sud","La Namibie","Le Zimbabwe"]],
["Quel pays est enclavé en Afrique ?","Le Lesotho",["L'Afrique du Sud","Le Botswana","Le Zimbabwe"]],
["Quel pays est enclavé en Afrique ?","L'Eswatini (Swaziland)",["L'Afrique du Sud","Le Mozambique","Le Lesotho"]],
["Quel pays est enclavé en Afrique ?","Le Tchad",["Le Niger","Le Soudan","La RDC"]],
["Quel pays est enclavé en Amérique du Sud ?","La Bolivie",["Le Brésil","Le Pérou","L'Argentine"]],
["Quel pays est enclavé en Amérique du Sud ?","Le Paraguay",["La Bolivie","Le Brésil","L'Argentine"]],
["Quel pays est enclavé en Asie ?","L'Afghanistan",["Le Pakistan","L'Iran","Le Turkménistan"]],
["Quel pays est enclavé en Asie ?","Le Népal",["L'Inde","La Chine","Le Bhoutan"]],
["Quel pays est enclavé en Asie ?","Le Bhoutan",["L'Inde","La Chine","Le Népal"]],
["Quel pays est enclavé en Asie ?","Le Laos",["La Thaïlande","Le Vietnam","Le Cambodge"]],
["Quel pays est enclavé en Asie ?","Le Mongolie",["La Russie","La Chine","Le Kazakhstan"]],
["Quel pays est enclavé en Asie ?","Le Kazakhstan",["La Russie","La Chine","La Mongolie"]],
["Quel pays est enclavé en Asie ?","L'Ouzbékistan",["Le Kazakhstan","Le Turkménistan","Le Tadjikistan"]],
["Quel pays est enclavé en Asie ?","Le Turkménistan",["Le Kazakhstan","L'Ouzbékistan","L'Iran"]],
["Quel pays est enclavé en Asie ?","Le Tadjikistan",["L'Ouzbékistan","Le Kirghizistan","L'Afghanistan"]],
["Quel pays est enclavé en Asie ?","Le Kirghizistan",["Le Kazakhstan","L'Ouzbékistan","Le Tadjikistan"]],
["Quel pays est enclavé en Asie ?","Le Népal",["L'Inde","La Chine","Le Bhoutan"]],
["Quel pays est enclavé en Asie ?","Le Bhoutan",["L'Inde","La Chine","Le Népal"]],
["Quel pays traverse l'Équateur ?","L'Équateur",["La Colombie","Le Pérou","Le Brésil"]],
["Quel pays traverse le Méridien de Greenwich ?","Le Royaume-Uni",["La France","L'Espagne","Le Portugal"]],
["Quel pays traverse le Méridien de Greenwich ?","La France",["Le Royaume-Uni","L'Espagne","Le Portugal"]],
["Quel pays traverse le Méridien de Greenwich ?","L'Espagne",["Le Royaume-Uni","La France","Le Portugal"]],
["Quel pays traverse le Méridien de Greenwich ?","L'Algérie",["Le Mali","Le Niger","Le Burkina Faso"]],
["Quel pays traverse le Méridien de Greenwich ?","Le Mali",["L'Algérie","Le Niger","Le Burkina Faso"]],
["Quel pays traverse le Méridien de Greenwich ?","Le Burkina Faso",["Le Mali","Le Niger","Le Ghana"]],
["Quel pays traverse le Méridien de Greenwich ?","Le Ghana",["Le Burkina Faso","La Côte d'Ivoire","Le Togo"]],
["Quel pays traverse le Tropique du Cancer ?","Le Mexique",["Les États-Unis","Le Canada","Le Groenland"]],
["Quel pays traverse le Tropique du Cancer ?","L'Égypte",["La Libye","Le Soudan","Israël"]],
["Quel pays traverse le Tropique du Cancer ?","L'Arabie saoudite",["Le Yémen","Omán","Les Émirats"]],
["Quel pays traverse le Tropique du Cancer ?","L'Inde",["Le Pakistan","Le Népal","Le Bhoutan"]],
["Quel pays traverse le Tropique du Cancer ?","La Chine",["L'Inde","Le Népal","Le Bhoutan"]],
["Quel pays traverse le Tropique du Capricorne ?","Le Brésil",["L'Argentine","Le Paraguay","La Bolivie"]],
["Quel pays traverse le Tropique du Capricorne ?","L'Australie",["La Nouvelle-Zélande","La Papouasie-Nouvelle-Guinée","Fidji"]],
["Quel pays traverse le Tropique du Capricorne ?","La Namibie",["L'Angola","Le Botswana","L'Afrique du Sud"]],
["Quel pays traverse le Tropique du Capricorne ?","Le Botswana",["La Namibie","L'Afrique du Sud","Le Zimbabwe"]],
["Quel pays traverse le Tropique du Capricorne ?","L'Afrique du Sud",["La Namibie","Le Botswana","Le Zimbabwe"]],
["Quel pays traverse le Cercle polaire arctique ?","La Norvège",["La Suède","La Finlande","La Russie"]],
["Quel pays traverse le Cercle polaire arctique ?","La Suède",["La Norvège","La Finlande","La Russie"]],
["Quel pays traverse le Cercle polaire arctique ?","La Finlande",["La Norvège","La Suède","La Russie"]],
["Quel pays traverse le Cercle polaire arctique ?","La Russie",["La Norvège","La Suède","La Finlande"]],
["Quel pays traverse le Cercle polaire arctique ?","Les États-Unis (Alaska)",["Le Canada","Le Groenland","La Russie"]],
["Quel pays traverse le Cercle polaire arctique ?","Le Canada",["Les États-Unis (Alaska)","Le Groenland","La Russie"]],
["Quel pays traverse le Cercle polaire arctique ?","Le Groenland (Danemark)",["Le Canada","Les États-Unis","La Russie"]],
["Quel continent est traversé par le Cercle polaire antarctique ?","L'Antarctique",["L'Europe","L'Asie","L'Amérique du Sud"]],
["Quel pays possède le plus grand nombre de lacs ?","Le Canada",["La Russie","Les États-Unis","La Finlande"]],
["Quel pays possède le plus grand nombre d'îles ?","La Suède",["La Finlande","Le Canada","L'Indonésie"]],
["Quel pays possède le plus grand nombre de volcans actifs ?","L'Indonésie",["Le Japon","Les États-Unis","L'Islande"]],
["Quel pays possède le plus grand nombre de séismes ?","Le Japon",["L'Indonésie","Les États-Unis","Le Chili"]],
["Quel pays possède le plus grand nombre de sites UNESCO ?","L'Italie",["La Chine","L'Allemagne","L'Espagne"]],
["Quel pays possède le deuxième plus grand nombre de sites UNESCO ?","La Chine",["L'Italie","L'Allemagne","L'Espagne"]],
["Quel pays possède le troisième plus grand nombre de sites UNESCO ?","L'Allemagne",["L'Italie","La Chine","L'Espagne"]],
["Quel pays possède le quatrième plus grand nombre de sites UNESCO ?","L'Espagne",["L'Italie","La Chine","L'Allemagne"]],
["Quel pays possède le cinquième plus grand nombre de sites UNESCO ?","La France",["L'Italie","La Chine","L'Allemagne"]],
["Quel pays possède le sixième plus grand nombre de sites UNESCO ?","L'Inde",["L'Italie","La Chine","L'Allemagne"]],
["Quel pays possède le septième plus grand nombre de sites UNESCO ?","Le Mexique",["L'Italie","La Chine","L'Allemagne"]],
["Quel pays possède le huitième plus grand nombre de sites UNESCO ?","Le Royaume-Uni",["L'Italie","La Chine","L'Allemagne"]],
["Quel pays possède le neuvième plus grand nombre de sites UNESCO ?","La Russie",["L'Italie","La Chine","L'Allemagne"]],
["Quel pays possède le dixième plus grand nombre de sites UNESCO ?","L'Iran",["L'Italie","La Chine","L'Allemagne"]],
["Quel est le plus grand lac d'eau douce du monde par la superficie ?","Le lac Supérieur",["Le lac Victoria","Le lac Baïkal","Le lac Tanganyika"]],
["Quel est le plus grand lac d'eau douce du monde par le volume ?","Le lac Baïkal",["Le lac Supérieur","Le lac Victoria","Le lac Tanganyika"]],
["Quel est le lac le plus profond du monde ?","Le lac Baïkal",["Le lac Supérieur","Le lac Victoria","Le lac Tanganyika"]],
["Quel est le lac le plus salé du monde ?","La mer Morte",["Le lac Assal","Le Grand Lac Salé","La mer Caspienne"]],
["Quel est le lac le plus bas du monde ?","La mer Morte",["Le lac Assal","Le Grand Lac Salé","La mer Caspienne"]],
["Quel est le plus grand lac d'Afrique ?","Le lac Victoria",["Le lac Tanganyika","Le lac Malawi","Le lac Tchad"]],
["Quel est le plus grand lac d'Asie ?","La mer Caspienne",["Le lac Baïkal","Le lac Balkhach","Le lac d'Aral"]],
["Quel est le plus grand lac d'Amérique du Nord ?","Le lac Supérieur",["Le lac Michigan","Le lac Huron","Le lac Érié"]],
["Quel est le plus grand lac d'Amérique du Sud ?","Le lac Titicaca",["Le lac Maracaibo","Le lac Poopó","Le lac Laguna Merín"]],
["Quel est le plus grand lac d'Europe ?","Le lac Ladoga",["Le lac Onega","Le lac Vänern","Le lac Saïmaa"]],
["Quel est le plus grand lac d'Océanie ?","Le lac Eyre",["Le lac Taupo","Le lac Macquarie","Le lac George"]],
["Quel est le plus grand lac d'Antarctique ?","Le lac Vostok",["Le lac Hodgson","Le lac East","Le lac Mercer"]],
["Quel est le plus grand lac salé du monde ?","La mer Caspienne",["Le lac d'Aral","Le Grand Lac Salé","La mer Morte"]],
["Quel est le plus grand lac entièrement en Afrique ?","Le lac Victoria",["Le lac Tanganyika","Le lac Malawi","Le lac Tchad"]],
["Quel est le plus grand lac entièrement en Asie ?","Le lac Baïkal",["Le lac Balkhach","Le lac d'Aral","Le lac Taihu"]],
["Quel est le plus grand lac entièrement en Amérique du Nord ?","Le lac Michigan",["Le lac Supérieur","Le lac Huron","Le lac Érié"]],
["Quel est le plus grand lac entièrement en Amérique du Sud ?","Le lac Titicaca",["Le lac Maracaibo","Le lac Poopó","Le lac Laguna Merín"]],
["Quel est le plus grand lac entièrement en Europe ?","Le lac Ladoga",["Le lac Onega","Le lac Vänern","Le lac Saïmaa"]],
["Quel est le plus grand lac entièrement en Océanie ?","Le lac Eyre",["Le lac Taupo","Le lac Macquarie","Le lac George"]],
["Quel est le plus haut lac navigable du monde ?","Le lac Titicaca",["Le lac Supérieur","Le lac Baïkal","Le lac Victoria"]],
["Quel est le lac le plus élevé du monde ?","Le lac Titicaca",["Le lac Supérieur","Le lac Baïkal","Le lac Victoria"]],
["Quel est le plus grand réservoir artificiel du monde ?","Le lac Volta",["Le lac Nasser","Le lac Kariba","Le lac Bratsk"]],
["Quel est le plus grand lac artificiel d'Afrique ?","Le lac Volta",["Le lac Nasser","Le lac Kariba","Le lac Tchad"]],
["Quel est le plus grand lac artificiel d'Asie ?","Le lac Bratsk",["Le lac Volta","Le lac Nasser","Le lac Kariba"]],
["Quel est le plus grand lac artificiel d'Amérique du Nord ?","Le lac Mead",["Le lac Powell","Le lac Niagara","Le lac Ontario"]],
["Quel est le plus grand lac artificiel d'Amérique du Sud ?","Le lac de Itaipu",["Le lac Titicaca","Le lac Maracaibo","Le lac Poopó"]],
["Quel est le plus grand lac artificiel d'Europe ?","Le lac de Kama",["Le lac Ladoga","Le lac Onega","Le lac Vänern"]],
["Quel pays possède le plus grand nombre de frontières terrestres ?","La Chine et la Russie (14)",["Le Brésil","Les États-Unis","L'Allemagne"]],
["Quel pays possède le plus grand nombre de frontières terrestres en Europe ?","L'Allemagne (9)",["La France","L'Italie","L'Espagne"]],
["Quel pays possède le plus grand nombre de frontières terrestres en Afrique ?","La RDC (9)",["Le Soudan","Le Tchad","Le Niger"]],
["Quel pays possède le plus grand nombre de frontières terrestres en Amérique du Sud ?","Le Brésil (10)",["L'Argentine","Le Pérou","La Colombie"]],
["Quel pays possède le plus grand nombre de frontières terrestres en Asie ?","La Chine (14)",["La Russie","L'Inde","Le Kazakhstan"]],
["Quel pays possède le plus grand nombre de frontières terrestres en Amérique du Nord ?","Les États-Unis (2)",["Le Canada","Le Mexique","Le Guatemala"]],
["Quel pays possède le plus grand nombre de frontières terrestres en Océanie ?","L'Indonésie (2)",["La Papouasie-Nouvelle-Guinée","La Nouvelle-Zélande","Fidji"]],
["Quel traité encadre l'utilisation pacifique de l'Antarctique depuis 1961 ?","Le Traité sur l'Antarctique",["Le Traité de l'espace","Le Protocole de Kyoto","La Convention de Genève"]],
["Quel pays possède le plus grand nombre de fuseaux horaires ?","La France (12)",["La Russie","Les États-Unis","Le Royaume-Uni"]],
["Quel pays possède le deuxième plus grand nombre de fuseaux horaires ?","La Russie (11)",["La France","Les États-Unis","Le Royaume-Uni"]],
["Quel pays possède le troisième plus grand nombre de fuseaux horaires ?","Les États-Unis (11)",["La France","La Russie","Le Royaume-Uni"]],
["Quel pays possède le quatrième plus grand nombre de fuseaux horaires ?","Le Royaume-Uni (9)",["La France","La Russie","Les États-Unis"]],
["Quel pays possède le cinquième plus grand nombre de fuseaux horaires ?","L'Australie (9)",["La France","La Russie","Les États-Unis"]],
["Quel pays possède le sixième plus grand nombre de fuseaux horaires ?","Le Canada (6)",["La France","La Russie","Les États-Unis"]],
["Quel pays possède le septième plus grand nombre de fuseaux horaires ?","L'Indonésie (3)",["La France","La Russie","Les États-Unis"]],
["Quel pays possède le huitième plus grand nombre de fuseaux horaires ?","Le Brésil (4)",["La France","La Russie","Les États-Unis"]],
["Quel pays possède le neuvième plus grand nombre de fuseaux horaires ?","Le Mexique (4)",["La France","La Russie","Les États-Unis"]],
["Quel pays possède le dixième plus grand nombre de fuseaux horaires ?","Le Chili (3)",["La France","La Russie","Les États-Unis"]],
["Quel est le plus grand pays d'Afrique ?","L'Algérie",["Le Soudan","La RDC","La Libye"]],
["Quel est le plus grand pays d'Asie ?","La Russie",["La Chine","L'Inde","Le Kazakhstan"]],
["Quel est le plus grand pays d'Europe ?","La Russie",["La France","L'Espagne","La Suède"]],
["Quel est le plus grand pays d'Amérique du Nord ?","Le Canada",["Les États-Unis","Le Groenland","Le Mexique"]],
["Quel est le plus grand pays d'Amérique du Sud ?","Le Brésil",["L'Argentine","Le Pérou","La Colombie"]],
["Quel est le plus grand pays d'Océanie ?","L'Australie",["La Nouvelle-Zélande","La Papouasie-Nouvelle-Guinée","Fidji"]],
["Quel est le plus petit pays d'Afrique ?","Les Seychelles",["La Gambie","Le Lesotho","L'Eswatini"]],
["Quel est le plus petit pays d'Asie ?","Les Maldives",["Singapour","Bahreïn","Le Brunei"]],
["Quel est le plus petit pays d'Europe ?","Le Vatican",["Monaco","Saint-Marin","Liechtenstein"]],
["Quel est le plus petit pays d'Amérique du Nord ?","Saint-Kitts-et-Nevis",["La Barbade","Antigua-et-Barbuda","La Grenade"]],
["Quel est le plus petit pays d'Amérique du Sud ?","Le Suriname",["L'Uruguay","Le Guyana","L'Équateur"]],
["Quel est le plus petit pays d'Océanie ?","Nauru",["Tuvalu","Les Îles Marshall","Les Maldives"]],
["Quel pays possède le plus grand nombre de langues officielles ?","L'Afrique du Sud (11)",["L'Inde","La Suisse","Le Canada"]],
["Quel pays possède le deuxième plus grand nombre de langues officielles ?","L'Inde (22)",["L'Afrique du Sud","La Suisse","Le Canada"]],
["Quel pays possède le troisième plus grand nombre de langues officielles ?","La Suisse (4)",["L'Afrique du Sud","L'Inde","Le Canada"]],
["Quel pays possède le quatrième plus grand nombre de langues officielles ?","Le Canada (2)",["L'Afrique du Sud","L'Inde","La Suisse"]],
["Quel pays possède le cinquième plus grand nombre de langues officielles ?","La Belgique (3)",["L'Afrique du Sud","L'Inde","La Suisse"]],
["Quel pays possède le sixième plus grand nombre de langues officielles ?","Le Luxembourg (3)",["L'Afrique du Sud","L'Inde","La Suisse"]],
["Quel pays possède le septième plus grand nombre de langues officielles ?","Singapour (4)",["L'Afrique du Sud","L'Inde","La Suisse"]],
["Quel pays possède le huitième plus grand nombre de langues officielles ?","Israël (2)",["L'Afrique du Sud","L'Inde","La Suisse"]],
["Quel pays possède le neuvième plus grand nombre de langues officielles ?","L'Irlande (2)",["L'Afrique du Sud","L'Inde","La Suisse"]],
["Quel pays possède le dixième plus grand nombre de langues officielles ?","La Finlande (2)",["L'Afrique du Sud","L'Inde","La Suisse"]],
["Quel pays possède la plus grande densité de population ?","Monaco",["Singapour","Bahreïn","Le Vatican"]],
["Quel pays possède la deuxième plus grande densité de population ?","Singapour",["Monaco","Bahreïn","Le Vatican"]],
["Quel pays possède la troisième plus grande densité de population ?","Bahreïn",["Monaco","Singapour","Le Vatican"]],
["Quel pays possède la quatrième plus grande densité de population ?","Le Vatican",["Monaco","Singapour","Bahreïn"]],
["Quel pays possède la cinquième plus grande densité de population ?","Les Maldives",["Monaco","Singapour","Bahreïn"]],
["Quel pays possède la sixième plus grande densité de population ?","Malte",["Monaco","Singapour","Bahreïn"]],
["Quel pays possède la septième plus grande densité de population ?","Bangladesh",["Monaco","Singapour","Bahreïn"]],
["Quel pays possède la huitième plus grande densité de population ?","Les Pays-Bas",["Monaco","Singapour","Bahreïn"]],
["Quel pays possède la neuvième plus grande densité de population ?","La Corée du Sud",["Monaco","Singapour","Bahreïn"]],
["Quel pays possède la dixième plus grande densité de population ?","Le Liban",["Monaco","Singapour","Bahreïn"]],
["Quel pays possède la plus faible densité de population ?","La Mongolie",["La Namibie","L'Australie","L'Islande"]],
["Quel pays possède la deuxième plus faible densité de population ?","La Namibie",["La Mongolie","L'Australie","L'Islande"]],
["Quel pays possède la troisième plus faible densité de population ?","L'Australie",["La Mongolie","La Namibie","L'Islande"]],
["Quel pays possède la quatrième plus faible densité de population ?","L'Islande",["La Mongolie","La Namibie","L'Australie"]],
["Quel pays possède la cinquième plus faible densité de population ?","Le Suriname",["La Mongolie","La Namibie","L'Australie"]],
["Quel pays possède la sixième plus faible densité de population ?","La Mauritanie",["La Mongolie","La Namibie","L'Australie"]],
["Quel pays possède la septième plus faible densité de population ?","Le Botswana",["La Mongolie","La Namibie","L'Australie"]],
["Quel pays possède la huitième plus faible densité de population ?","Le Canada",["La Mongolie","La Namibie","L'Australie"]],
["Quel pays possède la neuvième plus faible densité de population ?","La Guyane",["La Mongolie","La Namibie","L'Australie"]],
["Quel pays possède la dixième plus faible densité de population ?","La Libye",["La Mongolie","La Namibie","L'Australie"]],
["Quel est le pays le plus au nord du monde ?","Le Groenland (Danemark)",["La Norvège","La Russie","Le Canada"]],
["Quel est le pays le plus au sud du monde ?","Le Chili",["L'Argentine","La Nouvelle-Zélande","L'Afrique du Sud"]],
["Quel est le pays le plus à l'ouest du monde ?","Les États-Unis (Alaska)",["Le Canada","Le Groenland","La Russie"]],
["Quel est le pays le plus à l'est du monde ?","La Russie (îles Diomède)",["Le Japon","Les États-Unis","La Chine"]],
["Quel est le pays le plus à l'ouest d'Afrique ?","Le Sénégal",["La Mauritanie","La Gambie","La Guinée-Bissau"]],
["Quel est le pays le plus à l'est d'Afrique ?","La Somalie",["Le Kenya","La Tanzanie","L'Éthiopie"]],
["Quel est le pays le plus au nord d'Afrique ?","La Tunisie",["Le Maroc","L'Algérie","L'Égypte"]],
["Quel est le pays le plus au sud d'Afrique ?","L'Afrique du Sud",["La Namibie","Le Botswana","Le Lesotho"]],
["Quel est le pays le plus à l'ouest d'Asie ?","La Turquie",["Chypre","Le Liban","Israël"]],
["Quel est le pays le plus à l'est d'Asie ?","Le Japon",["La Corée du Sud","La Chine","Les Philippines"]],
["Quel est le pays le plus au nord d'Asie ?","La Russie",["La Mongolie","Le Kazakhstan","La Chine"]],
["Quel est le pays le plus au sud d'Asie ?","L'Indonésie",["Le Timor oriental","La Papouasie-Nouvelle-Guinée","Les Maldives"]],
["Quel est le pays le plus à l'ouest d'Europe ?","Le Portugal",["L'Irlande","L'Islande","L'Espagne"]],
["Quel est le pays le plus à l'est d'Europe ?","La Russie",["L'Ukraine","La Biélorussie","La Moldavie"]],
["Quel est le pays le plus au nord d'Europe ?","La Norvège",["La Suède","La Finlande","L'Islande"]],
["Quel est le pays le plus au sud d'Europe ?","L'Espagne (îles Canaries)",["Malte","Chypre","La Grèce"]],
["Quel est le pays le plus à l'ouest d'Amérique du Nord ?","Les États-Unis (Alaska)",["Le Canada","Le Groenland","Le Mexique"]],
["Quel est le pays le plus à l'est d'Amérique du Nord ?","Le Canada (Terre-Neuve)",["Les États-Unis","Le Groenland","Le Mexique"]],
["Quel est le pays le plus au nord d'Amérique du Nord ?","Le Canada (île Ellesmere)",["Les États-Unis (Alaska)","Le Groenland","Le Mexique"]],
["Quel est le pays le plus au sud d'Amérique du Nord ?","Le Panama",["Le Costa Rica","Le Nicaragua","Le Guatemala"]],
["Quel est le pays le plus à l'ouest d'Amérique du Sud ?","Le Pérou",["L'Équateur","La Colombie","Le Chili"]],
["Quel est le pays le plus à l'est d'Amérique du Sud ?","Le Brésil",["La Guyane","Le Suriname","La Guyane française"]],
["Quel est le pays le plus au nord d'Amérique du Sud ?","La Colombie",["Le Venezuela","Le Guyana","Le Suriname"]],
["Quel est le pays le plus au sud d'Amérique du Sud ?","Le Chili",["L'Argentine","L'Uruguay","Le Brésil"]],
["Quel est le pays le plus à l'ouest d'Océanie ?","L'Australie",["La Nouvelle-Zélande","La Papouasie-Nouvelle-Guinée","Fidji"]],
["Quel est le pays le plus à l'est d'Océanie ?","Les Kiribati",["Les Fidji","Les Samoa","Les Tonga"]],
["Quel est le pays le plus au nord d'Océanie ?","Le Japon (îles Ogasawara)",["La Nouvelle-Zélande","La Papouasie-Nouvelle-Guinée","Fidji"]],
["Quel est le pays le plus au sud d'Océanie ?","La Nouvelle-Zélande (îles Antipodes)",["L'Australie","La Papouasie-Nouvelle-Guinée","Fidji"]],
["Quelle ville est la plus grande d'Afrique par la population ?","Le Caire",["Lagos","Kinshasa","Alexandrie"]],
["Quelle ville est la plus grande d'Asie par la population ?","Tokyo",["Déli","Shanghai","Pékin"]],
["Quelle ville est la plus grande d'Europe par la population ?","Moscou",["Londres","Paris","Istanbul"]],
["Quelle ville est la plus grande d'Amérique du Nord par la population ?","Mexico",["New York","Los Angeles","Chicago"]],
["Quelle ville est la plus grande d'Amérique du Sud par la population ?","São Paulo",["Lima","Bogota","Rio de Janeiro"]],
["Quelle ville est la plus grande d'Océanie par la population ?","Sydney",["Melbourne","Brisbane","Auckland"]],
["Quelle ville est la plus haute du monde ?","La Paz",["Quito","Bogota","Mexico"]],
["Quelle ville est la plus basse du monde ?","Jéricho",["La Mer Morte","Bakou","Nouvelle-Orléans"]],
["Quelle ville est la plus riche du monde ?","New York",["Tokyo","Londres","Paris"]],
["Quelle ville possède le plus grand nombre de gratte-ciel ?","Hong Kong",["New York","Dubaï","Shanghai"]],
["Quelle ville possède le plus grand nombre de musées ?","Londres",["Paris","New York","Washington"]],
["Quelle ville possède le plus grand nombre de parcs ?","Londres",["New York","Paris","Tokyo"]],
["Quelle ville possède le plus grand nombre de restaurants ?","New York",["Tokyo","Londres","Paris"]],
["Quelle ville possède le plus grand nombre de théâtres ?","Londres",["New York","Paris","Tokyo"]],
["Quelle ville possède le plus grand nombre de bibliothèques ?","New York",["Londres","Paris","Tokyo"]],
["Quelle ville possède le plus grand nombre de centres commerciaux ?","Bangkok",["Dubaï","Kuala Lumpur","Tokyo"]],
["Quelle ville possède le plus grand nombre de ponts ?","Hambourg",["Venise","Amsterdam","Pittsburg"]],
["Quelle ville possède le plus grand nombre de canaux ?","Venise",["Amsterdam","Bruges","Bangkok"]],
["Quelle ville possède le plus grand nombre de vélos ?","Amsterdam",["Copenhague","Pékin","Tokyo"]],
["Quelle ville possède le plus grand nombre de taxis ?","New York",["Londres","Paris","Tokyo"]],
["Quelle ville possède le plus grand nombre de bus ?","Londres",["New York","Paris","Tokyo"]],
["Quelle ville possède le plus grand nombre de métros ?","New York",["Londres","Paris","Tokyo"]],
["Quelle ville possède le plus grand nombre de gares ?","New York",["Londres","Paris","Tokyo"]],
["Quelle ville possède le plus grand nombre d'aéroports ?","Londres",["New York","Paris","Tokyo"]],
["Quelle ville possède le plus grand nombre d'universités ?","New York",["Londres","Paris","Tokyo"]],
["Quelle ville possède le plus grand nombre de hôpitaux ?","New York",["Londres","Paris","Tokyo"]],
["Quelle ville possède le plus grand nombre d'hôtels ?","Londres",["New York","Paris","Tokyo"]],
["Quelle ville possède le plus grand nombre de jardins ?","Londres",["New York","Paris","Tokyo"]],
["Quelle ville possède le plus grand nombre de zoos ?","Londres",["New York","Paris","Tokyo"]],
["Quelle ville possède le plus grand nombre d'aquariums ?","Londres",["New York","Paris","Tokyo"]],
["Quelle ville possède le plus grand nombre de parcs d'attractions ?","Orlando",["Tokyo","Londres","Paris"]],
["Quelle ville possède le plus grand nombre de plages ?","Sydney",["Rio de Janeiro","Miami","Barcelone"]],
["Quelle ville possède le plus grand nombre de pistes cyclables ?","Copenhague",["Amsterdam","Pékin","Tokyo"]],
["Quelle ville possède le plus grand nombre de zones piétonnes ?","Venise",["Londres","Paris","New York"]],
["Quelle ville possède le plus grand nombre de monuments historiques ?","Rome",["Le Caire","Athènes","Jérusalem"]],
];
GEO_QUESTIONS.push(
    ["Quelle est la capitale de l'Afghanistan ?","Kaboul",["Kandahar","Hérat","Mazar-i-Chârif"]],
    ["Quelle est la capitale de l'Albanie ?","Tirana",["Durrës","Vlorë","Shkodër"]],
    ["Quelle est la capitale de l'Algérie ?","Alger",["Oran","Constantine","Annaba"]],
    ["Quelle est la capitale de l'Andorre ?","Andorre-la-Vieille",["Canillo","Encamp","La Massana"]],
    ["Quelle est la capitale de l'Angola ?","Luanda",["Huambo","Lobito","Benguela"]],
    ["Quelle est la capitale d'Antigua-et-Barbuda ?","Saint-Jean",["Freeport","Marsh Harbour","George Town"]],
    ["Quelle est la capitale de l'Arabie saoudite ?","Riyad",["Djeddah","La Mecque","Médine"]],
    ["Quelle est la capitale de l'Argentine ?","Buenos Aires",["Córdoba","Rosario","Mendoza"]],
    ["Quelle est la capitale de l'Arménie ?","Erevan",["Gjumri","Vanadzor","Abovian"]],
    ["Quelle est la capitale de l'Australie ?","Canberra",["Sydney","Melbourne","Perth"]],
    ["Quelle est la capitale de l'Autriche ?","Vienne",["Salzbourg","Graz","Linz"]],
    ["Quelle est la capitale de l'Azerbaïdjan ?","Bakou",["Gandja","Sumgait","Khachmaz"]],
    ["Quelle est la capitale des Bahamas ?","Nassau",["Freeport","Marsh Harbour","George Town"]],
    ["Quelle est la capitale de Bahreïn ?","Manama",["Muharraq","Riffa","Hidd"]],
    ["Quelle est la capitale du Bangladesh ?","Dacca",["Chittagong","Khulna","Rajshahi"]],
    ["Quelle est la capitale de la Barbade ?","Bridgetown",["Speightstown","Oistins","Holetown"]],
    ["Quelle est la capitale de la Belgique ?","Bruxelles",["Anvers","Gand","Bruges"]],
    ["Quelle est la capitale du Belize ?","Belmopan",["Belize City","Orange Walk","Corozal"]],
    ["Quelle est la capitale du Bénin ?","Porto-Novo",["Cotonou","Parakou","Djougou"]],
    ["Quelle est la capitale du Bhoutan ?","Thimphou",["Paro","Bumthang","Trongsa"]],
    ["Quelle est la capitale de la Bolivie ?","Sucre",["La Paz","Santa Cruz","Cochabamba"]],
    ["Quelle est la capitale de la Bosnie-Herzégovine ?","Sarajevo",["Banja Luka","Tuzla","Mostar"]],
    ["Quelle est la capitale du Botswana ?","Gaborone",["Francistown","Molepolole","Maun"]],
    ["Quelle est la capitale du Brésil ?","Brasilia",["Rio de Janeiro","São Paulo","Salvador"]],
    ["Quelle est la capitale du Brunei ?","Bandar Seri Begawan",["Kuala Belait","Tutong","Seria"]],
    ["Quelle est la capitale de la Bulgarie ?","Sofia",["Plovdiv","Varna","Bourgas"]],
    ["Quelle est la capitale du Burkina Faso ?","Ouagadougou",["Bobo-Dioulasso","Koudougou","Ouahigouya"]],
    ["Quelle est la capitale du Burundi ?","Gitega",["Bujumbura","Ngozi","Muyinga"]],
    ["Quelle est la capitale du Cambodge ?","Phnom Penh",["Siem Reap","Battambang","Sihanoukville"]],
    ["Quelle est la capitale du Cameroun ?","Yaoundé",["Douala","Garoua","Bafoussam"]],
    ["Quelle est la capitale du Canada ?","Ottawa",["Toronto","Montréal","Vancouver"]],
    ["Quelle est la capitale du Cap-Vert ?","Praia",["Mindelo","São Filipe","Espargos"]],
    ["Quelle est la capitale de la République centrafricaine ?","Bangui",["Berbérati","Bambari","Carnot"]],
    ["Quelle est la capitale du Chili ?","Santiago",["Valparaíso","Concepción","La Serena"]],
    ["Quelle est la capitale de la Colombie ?","Bogota",["Medellín","Cali","Barranquilla"]],
    ["Quelle est la capitale des Comores ?","Moroni",["Mutsamudu","Fomboni","Domoni"]],
    ["Quelle est la capitale du Congo ?","Brazzaville",["Pointe-Noire","Dolisie","Nkayi"]],
    ["Quelle est la capitale de la République démocratique du Congo ?","Kinshasa",["Lubumbashi","Mbuji-Mayi","Kisangani"]],
    ["Quelle est la capitale de la Corée du Nord ?","Pyongyang",["Hamhung","Chongjin","Wonsan"]],
    ["Quelle est la capitale de la Corée du Sud ?","Séoul",["Busan","Incheon","Daegu"]],
    ["Quelle est la capitale de la Côte d'Ivoire ?","Yamoussoukro",["Abidjan","Bouaké","Daloa"]],
    ["Quelle est la capitale de la Croatie ?","Zagreb",["Split","Rijeka","Osijek"]],
    ["Quelle est la capitale de Cuba ?","La Havane",["Santiago de Cuba","Camagüey","Holguín"]],
    ["Quelle est la capitale de Chypre ?","Nicosie",["Limassol","Larnaca","Famagouste"]],
    ["Quelle est la capitale du Danemark ?","Copenhague",["Aarhus","Odense","Aalborg"]],
    ["Quelle est la capitale de Djibouti ?","Djibouti",["Ali Sabieh","Tadjourah","Arta"]],
    ["Quelle est la capitale de la Dominique ?","Roseau",["Marigot","Portsmouth","Roseau Valley"]],
    ["Quelle est la capitale de l'Égypte ?","Le Caire",["Alexandrie","Louxor","Gizeh"]],
    ["Quelle est la capitale des Émirats arabes unis ?","Abou Dabi",["Dubaï","Charjah","Al-Aïn"]],
    ["Quelle est la capitale de l'Équateur ?","Quito",["Guayaquil","Cuenca","Machala"]],
["Quelle est la capitale de l'Érythrée ?","Asmara",["Massawa","Keren","Assab"]],
    ["Quelle est la capitale de l'Espagne ?","Madrid",["Barcelone","Séville","Valence"]],
    ["Quelle est la capitale de l'Estonie ?","Tallinn",["Tartu","Narva","Pärnu"]],
    ["Quelle est la capitale des États-Unis ?","Washington",["New York","Los Angeles","Chicago"]],
    ["Quelle est la capitale de l'Éthiopie ?","Addis-Abeba",["Dire Dawa","Gonder","Bahir Dar"]],
    ["Quelle est la capitale des Fidji ?","Suva",["Nadi","Lautoka","Labasa"]],
["Quelle est la capitale de la Finlande ?","Helsinki",["Espoo","Tampere","Turku"]],
    ["Quelle est la capitale de la France ?","Paris",["Lyon","Marseille","Bordeaux"]],
    ["Quelle est la capitale du Gabon ?","Libreville",["Port-Gentil","Franceville","Oyem"]],
    ["Quelle est la capitale de la Gambie ?","Banjul",["Brikama","Georgetown","Farafenni"]],
    ["Quelle est la capitale de la Géorgie ?","Tbilissi",["Koutaïssi","Batoumi","Roustavi"]],
    ["Quelle est la capitale de l'Allemagne ?","Berlin",["Munich","Hambourg","Francfort"]],
    ["Quelle est la capitale du Ghana ?","Accra",["Kumasi","Tamale","Sekondi-Takoradi"]],
    ["Quelle est la capitale de la Grèce ?","Athènes",["Thessalonique","Patras","Héraklion"]],
    ["Quelle est la capitale de la Grenade ?","Saint-Georges",["Gouyave","Victoria","St. David's"]],
    ["Quelle est la capitale du Guatemala ?","Guatemala",["Quetzaltenango","Escuintla","Villa Nueva"]],
    ["Quelle est la capitale de la Guinée ?","Conakry",["Nzérékoré","Kankan","Kindia"]],
    ["Quelle est la capitale de la Guinée-Bissau ?","Bissau",["Bafatá","Gabú","Cacheu"]],
    ["Quelle est la capitale de la Guinée équatoriale ?","Ciudad de la Paz",["Bata","Ebebiyin","Malabo"]],
    ["Quelle est la capitale du Guyana ?","Georgetown",["New Amsterdam","Bartica","Lethem"]],
    ["Quelle est la capitale d'Haïti ?","Port-au-Prince",["Cap-Haïtien","Les Cayes","Gonaïves"]],
    ["Quelle est la capitale du Honduras ?","Tegucigalpa",["San Pedro Sula","La Ceiba","Choluteca"]],
    ["Quelle est la capitale de la Hongrie ?","Budapest",["Debrecen","Szeged","Miskolc"]],
    ["Quelle est la capitale de l'Islande ?","Reykjavik",["Akureyri","Kópavogur","Hafnarfjörður"]],
    ["Quelle est la capitale de l'Inde ?","New Delhi",["Mumbai","Bengaluru","Kolkata"]],
["Quelle est la capitale de l'Indonésie ?","Jakarta",["Surabaya","Bandung","Medan"]],
    ["Quelle est la capitale de l'Iran ?","Téhéran",["Machhad","Ispahan","Tabriz"]],
    ["Quelle est la capitale de l'Irak ?","Bagdad",["Mossoul","Bassorah","Erbil"]],
    ["Quelle est la capitale de l'Irlande ?","Dublin",["Cork","Galway","Limerick"]],
    ["Quelle est la capitale d'Israël ?","Jérusalem",["Tel-Aviv","Haïfa","Beersheba"]],
    ["Quelle est la capitale de l'Italie ?","Rome",["Milan","Venise","Naples"]],
    ["Quelle est la capitale de la Jamaïque ?","Kingston",["Montego Bay","Spanish Town","Portmore"]],
    ["Quelle est la capitale du Japon ?","Tokyo",["Osaka","Kyoto","Yokohama"]],
    ["Quelle est la capitale de la Jordanie ?","Amman",["Zarqa","Irbid","Aqaba"]],
    ["Quelle est la capitale du Kazakhstan ?","Astana",["Almaty","Chymkent","Karaganda"]],
    ["Quelle est la capitale du Kenya ?","Nairobi",["Mombasa","Kisumu","Nakuru"]],
    ["Quelle est la capitale des Kiribati ?","Tarawa-Sud",["Betio","Bairiki","Abaiang"]],
    ["Quelle est la capitale du Koweït ?","Koweït",["Hawalli","Al Farwaniyah","Al Ahmadi"]],
    ["Quelle est la capitale du Kirghizistan ?","Bichkek",["Och","Djalal-Abad","Karakol"]],
    ["Quelle est la capitale du Laos ?","Vientiane",["Luang Prabang","Pakse","Savannakhet"]],
    ["Quelle est la capitale de la Lettonie ?","Riga",["Daugavpils","Liepāja","Jelgava"]],
    ["Quelle est la capitale du Liban ?","Beyrouth",["Tripoli","Sidon","Tyr"]],
    ["Quelle est la capitale du Lesotho ?","Maseru",["Mafeteng","Mohale's Hoek","Quthing"]],
    ["Quelle est la capitale du Liberia ?","Monrovia",["Buchanan","Gbarnga","Harper"]],
    ["Quelle est la capitale de la Libye ?","Tripoli",["Benghazi","Misrata","Al-Bayda"]],
    ["Quelle est la capitale du Liechtenstein ?","Vaduz",["Schaan","Balzers","Triesen"]],
    ["Quelle est la capitale de la Lituanie ?","Vilnius",["Kaunas","Klaipėda","Šiauliai"]],
    ["Quelle est la capitale du Luxembourg ?","Luxembourg",["Esch-sur-Alzette","Differdange","Dudelange"]],
    ["Quelle est la capitale de Madagascar ?","Antananarivo",["Toamasina","Antsiranana","Fianarantsoa"]],
    ["Quelle est la capitale du Malawi ?","Lilongwe",["Blantyre","Mzuzu","Zomba"]],
    ["Quelle est la capitale de la Malaisie ?","Kuala Lumpur",["George Town","Ipoh","Johor Bahru"]],
    ["Quelle est la capitale des Maldives ?","Malé",["Hithadhoo","Fuvahmulah","Addu City"]],
    ["Quelle est la capitale du Mali ?","Bamako",["Sikasso","Mopti","Koutiala"]],
    ["Quelle est la capitale de Malte ?","La Valette",["Mdina","Sliema","Birgu"]],
    ["Quelle est la capitale du Maroc ?","Rabat",["Casablanca","Marrakech","Fès"]],
    ["Quelle est la capitale des Îles Marshall ?","Majuro",["Kwajalein","Wotje","Jaluit"]],
    ["Quelle est la capitale de Maurice ?","Port-Louis",["Curepipe","Vacoas","Quatre Bornes"]],
    ["Quelle est la capitale de la Mauritanie ?","Nouakchott",["Nouadhibou","Rosso","Zouérat"]],
    ["Quelle est la capitale du Mexique ?","Mexico",["Guadalajara","Monterrey","Puebla"]],
    ["Quelle est la capitale de la Micronésie ?","Palikir",["Weno","Colonia","Tono"]],
    ["Quelle est la capitale de la Moldavie ?","Chișinău",["Tiraspol","Bălți","Cahul"]],
    ["Quelle est la capitale de Monaco ?","Monaco",["Monte Carlo","La Condamine","Fontvieille"]],
    ["Quelle est la capitale de la Mongolie ?","Oulan-Bator",["Erdenet","Darkhan","Choibalsan"]],
    ["Quelle est la capitale du Monténégro ?","Podgorica",["Nikšić","Bijelo Polje","Cetinje"]],
    ["Quelle est la capitale du Mozambique ?","Maputo",["Beira","Nampula","Quelimane"]],
["Quelle est la capitale de la Birmanie (Myanmar) ?","Naypyidaw",["Yangon","Mandalay","Bago"]],
    ["Quelle est la capitale de la Namibie ?","Windhoek",["Swakopmund","Walvis Bay","Oshakati"]],
    ["Quelle est la capitale de Nauru ?","Yaren",["Denigomodu","Aiwo","Boe"]],
    ["Quelle est la capitale du Népal ?","Katmandou",["Lalitpur","Bhaktapur","Pokhara"]],
    ["Quelle est la capitale des Pays-Bas ?","Amsterdam",["La Haye","Rotterdam","Utrecht"]],
    ["Quelle est la capitale de la Nouvelle-Zélande ?","Wellington",["Auckland","Christchurch","Hamilton"]],
    ["Quelle est la capitale du Nicaragua ?","Managua",["León","Masaya","Granada"]],
    ["Quelle est la capitale du Niger ?","Niamey",["Zinder","Maradi","Tahoua"]],
    ["Quelle est la capitale du Nigeria ?","Abuja",["Lagos","Kano","Ibadan"]],
    ["Quelle est la capitale de la Norvège ?","Oslo",["Bergen","Trondheim","Stavanger"]],
    ["Quelle est la capitale d'Oman ?","Mascate",["Salalah","Sohar","Nizwa"]],
    ["Quelle est la capitale du Pakistan ?","Islamabad",["Karachi","Lahore","Faisalabad"]],
    ["Quelle est la capitale des Palaos ?","Ngerulmud",["Koror","Melekeok","Airai"]],
    ["Quelle est la capitale de la Palestine ?","Jérusalem",["Ramallah","Gaza","Hébron"]],
    ["Quelle est la capitale du Panama ?","Panama",["Colón","David","Chitré"]],
    ["Quelle est la capitale de la Papouasie-Nouvelle-Guinée ?","Port-Moresby",["Lae","Madang","Rabaul"]],
    ["Quelle est la capitale du Paraguay ?","Asuncion",["Ciudad del Este","Encarnación","Pedro Juan Caballero"]],
    ["Quelle est la capitale du Pérou ?","Lima",["Arequipa","Cusco","Trujillo"]],
    ["Quelle est la capitale des Philippines ?","Manille",["Quezon City","Davao","Cebu"]],
    ["Quelle est la capitale de la Pologne ?","Varsovie",["Cracovie","Gdańsk","Poznań"]],
    ["Quelle est la capitale du Portugal ?","Lisbonne",["Porto","Braga","Coimbra"]],
    ["Quelle est la capitale du Qatar ?","Doha",["Al Rayyan","Al Wakra","Al Khor"]],
    ["Quelle est la capitale de la Tchéquie ?","Prague",["Brno","Ostrava","Plzeň"]],
    ["Quelle est la capitale de la Roumanie ?","Bucarest",["Cluj-Napoca","Timișoara","Iași"]],
    ["Quelle est la capitale du Royaume-Uni ?","Londres",["Manchester","Liverpool","Birmingham"]],
    ["Quelle est la capitale de la Russie ?","Moscou",["Saint-Pétersbourg","Kiev","Minsk"]],
    ["Quelle est la capitale du Rwanda ?","Kigali",["Butare","Gisenyi","Ruhengeri"]],
    ["Quelle est la capitale de Saint-Kitts-et-Nevis ?","Basseterre",["Charlestown","Gingerland","Newtown"]],
    ["Quelle est la capitale de Sainte-Lucie ?","Castries",["Gros Isle","Soufrière","Vieux Fort"]],
    ["Quelle est la capitale de Saint-Vincent-et-les-Grenadines ?","Kingstown",["Georgetown","Calliaqua","Bequia"]],
    ["Quelle est la capitale des Salomon ?","Honiara",["Gizo","Auki","Kirakira"]],
    ["Quelle est la capitale du Samoa ?","Apia",["Mulifanua","Salelologa","Faleolo"]],
    ["Quelle est la capitale de Sao Tomé-et-Principe ?","Sao Tomé",["Santo Antonio","Neves","Trindade"]],
    ["Quelle est la capitale du Sénégal ?","Dakar",["Bamako","Abidjan","Conakry"]],
    ["Quelle est la capitale de la Serbie ?","Belgrade",["Novi Sad","Niš","Kragujevac"]],
    ["Quelle est la capitale des Seychelles ?","Victoria",["Anse Boileau","Beau Vallon","Glacis"]],
    ["Quelle est la capitale de la Sierra Leone ?","Freetown",["Bo","Kenema","Makeni"]],
    ["Quelle est la capitale de Singapour ?","Singapour",["Kuala Lumpur","Manille","Jakarta"]],
    ["Quelle est la capitale de la Slovaquie ?","Bratislava",["Košice","Prešov","Žilina"]],
    ["Quelle est la capitale de la Slovénie ?","Ljubljana",["Maribor","Celje","Kranj"]],
    ["Quelle est la capitale de la Somalie ?","Mogadiscio",["Hargeisa","Bosaso","Kismayo"]],
    ["Quelle est la capitale du Soudan ?","Khartoum",["Omdurman","Port-Soudan","Kassala"]],
    ["Quelle est la capitale du Soudan du Sud ?","Djouba",["Wau","Malakal","Aweil"]],
    ["Quelle est la capitale du Sri Lanka ?","Sri Jayawardenepura Kotte",["Colombo","Kandy","Galle"]],
    ["Quelle est la capitale du Suriname ?","Paramaribo",["Lelydorp","Commewijne","Nieuw Nickerie"]],
    ["Quelle est la capitale de la Suède ?","Stockholm",["Göteborg","Malmö","Uppsala"]],
    ["Quelle est la capitale de la Suisse ?","Berne",["Zurich","Genève","Bâle"]],
    ["Quelle est la capitale de la Syrie ?","Damas",["Alep","Homs","Hama"]],
    ["Quelle est la capitale du Tadjikistan ?","Douchanbé",["Khoudjand","Koulob","Istaravchan"]],
    ["Quelle est la capitale de la Tanzanie ?","Dodoma",["Dar es Salam","Mwanza","Arusha"]],
    ["Quelle est la capitale du Tchad ?","N'Djaména",["Moundou","Sarh","Abéché"]],
    ["Quelle est la capitale de la Thaïlande ?","Bangkok",["Chiang Mai","Pattaya","Phuket"]],
    ["Quelle est la capitale du Togo ?","Lomé",["Sokodé","Kara","Palimé"]],
    ["Quelle est la capitale de Trinité-et-Tobago ?","Port-d'Espagne",["San Fernando","Arima","Chaguanas"]],
    ["Quelle est la capitale de la Tunisie ?","Tunis",["Sfax","Sousse","Kairouan"]],
    ["Quelle est la capitale de la Turquie ?","Ankara",["Istanbul","Izmir","Antalya"]],
    ["Quelle est la capitale du Turkménistan ?","Achgabat",["Türkmenabat","Dasgouoz","Mary"]],
    ["Quelle est la capitale de Tuvalu ?","Funafuti",["Vaitupu","Nukufetau","Nukulaelae"]],
    ["Quelle est la capitale de l'Ouganda ?","Kampala",["Gulu","Lira","Jinja"]],
    ["Quelle est la capitale de l'Ukraine ?","Kiev",["Kharkiv","Odessa","Dnipro"]],
    ["Quelle est la capitale de l'Uruguay ?","Montevideo",["Salto","Paysandú","Las Piedras"]],
    ["Quelle est la capitale de l'Ouzbékistan ?","Tachkent",["Samarcande","Boukhara","Namangan"]],
    ["Quelle est la capitale du Vanuatu ?","Port-Vila",["Luganville","Santo","Tanna"]],
    ["Quelle est la capitale du Vatican ?","Cité du Vatican",["Borgo","Prati","Trastevere"]],
    ["Quelle est la capitale du Venezuela ?","Caracas",["Maracaibo","Valencia","Barquisimeto"]],
    ["Quelle est la capitale du Viêt Nam ?","Hanoï",["Hô Chi Minh-Ville","Da Nang","Hai Phong"]],
    ["Quelle est la capitale du Yémen ?","Sanaa",["Aden","Taëzz","Hodeïda"]],
    ["Quelle est la capitale de la Zambie ?","Lusaka",["Kitwe","Ndola","Kabwe"]],
    ["Quelle est la capitale du Zimbabwe ?","Harare",["Bulawayo","Chitungwiza","Mutare"]],
    ["Sur quel continent se trouve l'Afghanistan ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve l'Albanie ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve l'Algérie ?","Afrique",["Asie","Europe","Amérique"]],
    ["Sur quel continent se trouve l'Andorre ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve l'Angola ?","Afrique",["Asie","Europe","Amérique"]],
    ["Sur quel continent se trouvent Antigua-et-Barbuda ?","Amérique du Nord",["Amérique du Sud","Europe","Asie"]],
    ["Sur quel continent se trouve l'Arabie saoudite ?","Asie",["Afrique","Europe","Amérique"]],
    ["Sur quel continent se trouve l'Argentine ?","Amérique du Sud",["Amérique du Nord","Europe","Asie"]],
    ["Sur quel continent se trouve l'Arménie ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve l'Australie ?","Océanie",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve l'Autriche ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve l'Azerbaïdjan ?","Asie et Europe",["Afrique","Amérique","Océanie"]],
    ["Sur quel continent se trouvent les Bahamas ?","Amérique du Nord",["Amérique du Sud","Europe","Asie"]],
    ["Sur quel continent se trouve Bahreïn ?","Asie",["Afrique","Europe","Amérique"]],
    ["Sur quel continent se trouve le Bangladesh ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve la Barbade ?","Amérique du Nord",["Amérique du Sud","Europe","Asie"]],
    ["Sur quel continent se trouve la Belgique ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Belize ?","Amérique du Nord",["Amérique du Sud","Europe","Asie"]],
    ["Sur quel continent se trouve le Bénin ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve le Bhoutan ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve la Bolivie ?","Amérique du Sud",["Amérique du Nord","Europe","Asie"]],
    ["Sur quel continent se trouve la Bosnie-Herzégovine ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Botswana ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve le Brésil ?","Amérique du Sud",["Amérique du Nord","Europe","Asie"]],
    ["Sur quel continent se trouve le Brunei ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve la Bulgarie ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Burkina Faso ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve le Burundi ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve le Cambodge ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Cameroun ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve le Canada ?","Amérique du Nord",["Amérique du Sud","Europe","Asie"]],
    ["Sur quel continent se trouve le Cap-Vert ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve la République centrafricaine ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve le Chili ?","Amérique du Sud",["Amérique du Nord","Europe","Asie"]],
    ["Sur quel continent se trouve la Colombie ?","Amérique du Sud",["Amérique du Nord","Europe","Asie"]],
    ["Sur quel continent se trouvent les Comores ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve le Congo ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve la République démocratique du Congo ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve la Corée du Nord ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve la Corée du Sud ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve la Côte d'Ivoire ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve la Croatie ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve Cuba ?","Amérique du Nord",["Amérique du Sud","Europe","Asie"]],
    ["Sur quel continent se trouve Chypre ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Danemark ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve Djibouti ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve la Dominique ?","Amérique du Nord",["Amérique du Sud","Europe","Asie"]],
    ["Sur quel continent se trouve l'Égypte ?","Afrique",["Asie","Europe","Amérique"]],
    ["Sur quel continent se trouvent les Émirats arabes unis ?","Asie",["Afrique","Europe","Amérique"]],
    ["Sur quel continent se trouve l'Équateur ?","Amérique du Sud",["Amérique du Nord","Europe","Asie"]],
    ["Sur quel continent se trouve l'Érythrée ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve l'Espagne ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve l'Estonie ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouvent les États-Unis ?","Amérique du Nord",["Amérique du Sud","Europe","Asie"]],
    ["Sur quel continent se trouve l'Éthiopie ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouvent les Fidji ?","Océanie",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve la Finlande ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve la France ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Gabon ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve la Gambie ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve la Géorgie ?","Asie et Europe",["Afrique","Amérique","Océanie"]],
    ["Sur quel continent se trouve l'Allemagne ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Ghana ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve la Grèce ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve Grenade ?","Amérique du Nord",["Amérique du Sud","Europe","Asie"]],
    ["Sur quel continent se trouve le Guatemala ?","Amérique du Nord",["Amérique du Sud","Europe","Asie"]],
    ["Sur quel continent se trouve la Guinée ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve la Guinée-Bissau ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve la Guinée équatoriale ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve le Guyana ?","Amérique du Sud",["Amérique du Nord","Europe","Asie"]],
    ["Sur quel continent se trouve Haïti ?","Amérique du Nord",["Amérique du Sud","Europe","Asie"]],
    ["Sur quel continent se trouve le Honduras ?","Amérique du Nord",["Amérique du Sud","Europe","Asie"]],
    ["Sur quel continent se trouve la Hongrie ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve l'Islande ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve l'Inde ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve l'Indonésie ?","Asie",["Océanie","Europe","Amérique"]],
    ["Sur quel continent se trouve l'Iran ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve l'Irak ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve l'Irlande ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve Israël ?","Asie",["Afrique","Europe","Amérique"]],
    ["Sur quel continent se trouve l'Italie ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve la Jamaïque ?","Amérique du Nord",["Amérique du Sud","Europe","Asie"]],
    ["Sur quel continent se trouve le Japon ?","Asie",["Europe","Océanie","Amérique"]],
    ["Sur quel continent se trouve la Jordanie ?","Asie",["Afrique","Europe","Amérique"]],
    ["Sur quel continent se trouve le Kazakhstan ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Kenya ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouvent les Kiribati ?","Océanie",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Koweït ?","Asie",["Afrique","Europe","Amérique"]],
    ["Sur quel continent se trouve le Kirghizistan ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Laos ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve la Lettonie ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Liban ?","Asie",["Afrique","Europe","Amérique"]],
    ["Sur quel continent se trouve le Lesotho ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve le Liberia ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve la Libye ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve le Liechtenstein ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve la Lituanie ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Luxembourg ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve Madagascar ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve le Malawi ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve la Malaisie ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouvent les Maldives ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Mali ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve Malte ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Maroc ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouvent les Îles Marshall ?","Océanie",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve Maurice ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve la Mauritanie ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve le Mexique ?","Amérique du Nord",["Amérique du Sud","Europe","Asie"]],
    ["Sur quel continent se trouve la Micronésie ?","Océanie",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve la Moldavie ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve Monaco ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve la Mongolie ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Monténégro ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Mozambique ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve la Birmanie (Myanmar) ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve la Namibie ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve Nauru ?","Océanie",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Népal ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouvent les Pays-Bas ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve la Nouvelle-Zélande ?","Océanie",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Nicaragua ?","Amérique du Nord",["Amérique du Sud","Europe","Asie"]],
    ["Sur quel continent se trouve le Niger ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve le Nigeria ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve la Norvège ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve Oman ?","Asie",["Afrique","Europe","Amérique"]],
    ["Sur quel continent se trouve le Pakistan ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouvent les Palaos ?","Océanie",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve la Palestine ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Panama ?","Amérique du Nord",["Amérique du Sud","Europe","Asie"]],
    ["Sur quel continent se trouve la Papouasie-Nouvelle-Guinée ?","Océanie",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Paraguay ?","Amérique du Sud",["Amérique du Nord","Europe","Asie"]],
    ["Sur quel continent se trouve le Pérou ?","Amérique du Sud",["Amérique du Nord","Europe","Asie"]],
    ["Sur quel continent se trouvent les Philippines ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve la Pologne ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Portugal ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Qatar ?","Asie",["Afrique","Europe","Amérique"]],
    ["Sur quel continent se trouve la Tchéquie ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve la Roumanie ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Royaume-Uni ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve la Russie ?","Europe et Asie",["Afrique","Amérique","Océanie"]],
    ["Sur quel continent se trouve le Rwanda ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouvent Saint-Kitts-et-Nevis ?","Amérique du Nord",["Amérique du Sud","Europe","Asie"]],
    ["Sur quel continent se trouve Sainte-Lucie ?","Amérique du Nord",["Amérique du Sud","Europe","Asie"]],
    ["Sur quel continent se trouvent Saint-Vincent-et-les-Grenadines ?","Amérique du Nord",["Amérique du Sud","Europe","Asie"]],
    ["Sur quel continent se trouvent les Salomon ?","Océanie",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Samoa ?","Océanie",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve Sao Tomé-et-Principe ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve le Sénégal ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve la Serbie ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouvent les Seychelles ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve la Sierra Leone ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve Singapour ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve la Slovaquie ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve la Slovénie ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve la Somalie ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve le Soudan ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve le Soudan du Sud ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve le Sri Lanka ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Suriname ?","Amérique du Sud",["Amérique du Nord","Europe","Asie"]],
    ["Sur quel continent se trouve la Suède ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve la Suisse ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve la Syrie ?","Asie",["Afrique","Europe","Amérique"]],
    ["Sur quel continent se trouve le Tadjikistan ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve la Tanzanie ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve le Tchad ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve la Thaïlande ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Togo ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve Trinité-et-Tobago ?","Amérique du Nord",["Amérique du Sud","Europe","Asie"]],
    ["Sur quel continent se trouve la Tunisie ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve la Turquie ?","Asie et Europe",["Afrique","Amérique","Océanie"]],
    ["Sur quel continent se trouve le Turkménistan ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve Tuvalu ?","Océanie",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve l'Ouganda ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve l'Ukraine ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve l'Uruguay ?","Amérique du Sud",["Amérique du Nord","Europe","Asie"]],
    ["Sur quel continent se trouve l'Ouzbékistan ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Vanuatu ?","Océanie",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Vatican ?","Europe",["Asie","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Venezuela ?","Amérique du Sud",["Amérique du Nord","Europe","Asie"]],
    ["Sur quel continent se trouve le Viêt Nam ?","Asie",["Europe","Afrique","Amérique"]],
    ["Sur quel continent se trouve le Yémen ?","Asie",["Afrique","Europe","Amérique"]],
    ["Sur quel continent se trouve la Zambie ?","Afrique",["Europe","Asie","Amérique"]],
    ["Sur quel continent se trouve le Zimbabwe ?","Afrique",["Europe","Asie","Amérique"]],
    ["Quel fleuve traverse l'Afghanistan ?","Le Kaboul",["L'Helmand","L'Hari-Rud","Le Panjshir"]],
    ["Quel fleuve traverse l'Algérie ?","Le Chéliff",["Le Soummam","Le Seybouse","Le Mekerra"]],
    ["Quel fleuve traverse l'Angola ?","Le Kwanza",["Le Congo","Le Kasai","Le Cuango"]],
    ["Quel fleuve traverse l'Argentine ?","Le Paraná",["L'Uruguay","Le Río de la Plata","Le Colorado"]],
    ["Quel fleuve traverse l'Australie ?","La Murray",["La Darling","La Murrumbidgee","La Lachlan"]],
    ["Quel fleuve traverse l'Autriche ?","Le Danube",["Le Rhin","L'Inn","La Drave"]],
    ["Quel fleuve traverse le Bangladesh ?","Le Gange",["Le Brahmapoutre","Le Meghna","Le Jamuna"]],
    ["Quel fleuve traverse la Belgique ?","L'Escaut",["La Meuse","Le Rhin","La Seine"]],
    ["Quel fleuve traverse la Bolivie ?","Le Madeira",["Le Mamoré","Le Beni","Le Guaporé"]],
    ["Quel fleuve traverse la Bosnie-Herzégovine ?","La Save",["La Drina","La Neretva","L'Una"]],
    ["Quel fleuve traverse le Botswana ?","L'Okavango",["Le Limpopo","Le Chobe","Le Okavango"]],
    ["Quel fleuve traverse le Brésil ?","L'Amazone",["Le Paraná","Le São Francisco","Le Tocantins"]],
    ["Quel fleuve traverse la Bulgarie ?","Le Danube",["Le Maritsa","L'Iskur","L'Osogovo"]],
    ["Quel fleuve traverse le Burkina Faso ?","Le Mouhoun",["Le Nakambé","Le Nazinon","Le Léraba"]],
    ["Quel fleuve traverse le Burundi ?","Le Ruvubu",["Le Nyabarongo","Le Kagera","Le Rironge"]],
    ["Quel fleuve traverse le Cambodge ?","Le Mékong",["Le Bassac","Le Tonlé Sap","Le Saigon"]],
    ["Quel fleuve traverse le Cameroun ?","Le Sanaga",["Le Benoué","Le Logone","Le Nyong"]],
    ["Quel fleuve traverse le Canada ?","Le Mackenzie",["Le Yukon","Le Saint-Laurent","Le Nelson"]],
    ["Quel fleuve traverse la République centrafricaine ?","L'Oubangui",["Le Chari","Le Mbomou","Le Kotto"]],
    ["Quel fleuve traverse le Chili ?","Le Loa",["Le Biobío","Le Maule","Le Maipo"]],
    ["Quel fleuve traverse la Colombie ?","Le Magdalena",["Le Cauca","L'Orénoque","Le Putumayo"]],
    ["Quel fleuve traverse le Congo ?","Le Congo",["L'Oubangui","Le Sangha","L'Alima"]],
    ["Quel fleuve traverse la République démocratique du Congo ?","Le Congo",["Le Kasai","Le Lualaba","L'Uélé"]],
    ["Quel fleuve traverse la Côte d'Ivoire ?","Le Bandama",["Le Sassandra","Le Comoé","Le Bia"]],
    ["Quel fleuve traverse la Croatie ?","Le Danube",["La Save","La Drave","La Kupa"]],
    ["Quel fleuve traverse Cuba ?","Le Cauto",["Le Sagua la Grande","Le Zaza","Le Ariguanabo"]],
    ["Quel fleuve traverse l'Égypte ?","Le Nil",["Le Nil blanc","Le Nil bleu","L'Atbara"]],
    ["Quel fleuve traverse l'Équateur ?","Le Guayas",["Le Napo","Le Pastaza","Le Zamora"]],
    ["Quel fleuve traverse l'Espagne ?","Le Tage",["Le Douro","Le Guadalquivir","L'Èbre"]],
    ["Quel fleuve traverse les États-Unis ?","Le Mississippi",["Le Missouri","L'Ohio","Le Tennessee"]],
    ["Quel fleuve traverse l'Éthiopie ?","Le Nil bleu",["L'Awash","L'Omo","Le Tekezé"]],
    ["Quel fleuve traverse la Finlande ?","Le Kemijoki",["L'Ounasjoki","Le Tornionjoki","Le Lainionjoki"]],
    ["Quel fleuve traverse la France ?","La Seine",["La Loire","Le Rhône","La Garonne"]],
    ["Quel fleuve traverse le Gabon ?","L'Ogooué",["Le Nyanga","Le Komo","Le Ivindo"]],
    ["Quel fleuve traverse la Gambie ?","Le fleuve Gambie",["Le Sénégal","Le Saloum","Le Casamance"]],
    ["Quel fleuve traverse la Géorgie ?","Le Koura",["Le Rioni","Le Mtkvari","Le Tergi"]],
    ["Quel fleuve traverse l'Allemagne ?","Le Rhin",["Le Danube","L'Elbe","Le Pô"]],
    ["Quel fleuve traverse le Ghana ?","Le Volta",["L'Oti","Le Pra","L'Ankobra"]],
    ["Quel fleuve traverse le Guatemala ?","Le Motagua",["Le Polochic","Le Sarstún","Le Usumacinta"]],
    ["Quel fleuve traverse la Guinée ?","Le Niger",["Le Sénégal","Le Gambie","Le Konkouré"]],
    ["Quel fleuve traverse le Guyana ?","L'Esséquibo",["Le Courantyne","Le Demerara","Le Berbice"]],
    ["Quel fleuve traverse Haïti ?","L'Artibonite",["Le Grand-Anse","Le Massacre","Le Trois-Rivières"]],
    ["Quel fleuve traverse le Honduras ?","Le Ulúa",["Le Chamelecón","Le Aguan","Le Coco"]],
    ["Quel fleuve traverse la Hongrie ?","Le Danube",["La Tisza","La Drave","La Save"]],
    ["Quel fleuve traverse l'Inde ?","Le Gange",["L'Indus","Le Brahmapoutre","Le Yamuna"]],
    ["Quel fleuve traverse l'Indonésie ?","Le Kapuas",["Le Mahakam","Le Barito","Le Musi"]],
    ["Quel fleuve traverse l'Irak ?","Le Tigre",["L'Euphrate","Le Karoun","Le Chatt al-Arab"]],
    ["Quel fleuve traverse l'Irlande ?","Le Shannon",["Le Corrib","Le Suir","Le Nore"]],
    ["Quel fleuve traverse l'Italie ?","Le Pô",["L'Arno","Le Tibre","L'Adige"]],
    ["Quel fleuve traverse la Jamaïque ?","Le Rio Minho",["Le Rio Cobre","Le Black River","Le Martha Brae"]],
    ["Quel fleuve traverse le Japon ?","Le Shinano",["Le Tone","Le Kitakami","Le Ishikari"]],
    ["Quel fleuve traverse la Jordanie ?","Le Jourdain",["Le Yarmouk","Le Zarqa","Le Río Grande"]],
    ["Quel fleuve traverse le Kazakhstan ?","L'Irtych",["L'Ob","L'Ienisseï","L'Amour"]],
    ["Quel fleuve traverse le Kenya ?","Le Tana",["L'Athi","Le Ewaso Ng'iro","Le Nzoia"]],
    ["Sur quel fleuve le barrage de Toktogul a-t-il été construit au Kirghizistan ?","Le Naryn",["Le Syr-Daria","Le Chatkal","Le Arys"]],
    ["Quel fleuve traverse le Laos ?","Le Mékong",["Le Nam Ou","Le Xe Bang Fai","Le Xe Don"]],
    ["Quel fleuve traverse la Lettonie ?","La Daugava",["Le Lielupe","Le Venta","Le Gauja"]],
    ["Quel fleuve traverse le Liban ?","Le Litani",["Le Nahr al-Bared","Le Nahr Ibrahim","Le Nahr al-Kalb"]],
    ["Quel fleuve traverse le Liberia ?","Le Saint-Paul",["Le Saint-Jean","Le Cavalla","Le Lofa"]],
    ["Quel fleuve traverse le Liechtenstein ?","Le Rhin",["L'Aar","Le Landquart","L'Inn"]],
    ["Quel fleuve traverse la Lituanie ?","Le Niémen",["Le Lielupe","Le Venta","Le Gauja"]],
    ["Quel fleuve traverse le Luxembourg ?","L'Alzette",["La Sûre","La Moselle","L'Attert"]],
    ["Quel fleuve traverse Madagascar ?","Le Betsiboka",["Le Mangoky","Le Onilahy","Le Ikopa"]],
    ["Quel fleuve traverse le Malawi ?","Le Shire",["Le Zambèze","Le Ruo","Le Linthipe"]],
    ["Quel fleuve traverse la Malaisie ?","Le Rajang",["Le Kinabatangan","Le Pahang","Le Perak"]],
    ["Quel fleuve traverse le Mali ?","Le Niger",["Le Bani","Le Sénégal","Le Falémé"]],
    ["Quel fleuve traverse le Maroc ?","Le Moulouya",["Le Sebou","Le Oum Er-Rbia","Le Drâa"]],
["Quel fleuve traverse la Mauritanie ?","Le Sénégal",["Le Gorgol","Le Garfa","Le Yérimi"]],
    ["Quel fleuve traverse le Mexique ?","Le Rio Grande",["Le Balsas","Le Grijalva","L'Usumacinta"]],
    ["Quel fleuve traverse la Moldavie ?","Le Dniestr",["Le Prut","Le Bîc","Le Ichel"]],
    ["Quel fleuve traverse la Mongolie ?","L'Orkhon",["Le Selenga","Le Kerulen","Le Toula"]],
    ["Quel fleuve traverse le Monténégro ?","La Tara",["Le Lim","Le Morača","L'Ibar"]],
    ["Quel fleuve traverse le Mozambique ?","Le Zambèze",["Le Limpopo","Le Save","Le Pungwe"]],
    ["Quel fleuve traverse la Birmanie (Myanmar) ?","L'Irrawaddy",["Le Salouen","Le Chindwin","Le Sittoung"]],
    ["Quel fleuve traverse la Namibie ?","L'Orange",["Le Fish","Le Swakop","Le Kuiseb"]],
    ["Quel fleuve traverse le Népal ?","Le Kosi",["Le Gandak","Le Ghaghara","Le Karnali"]],
    ["Quel fleuve traverse les Pays-Bas ?","Le Rhin",["La Meuse","L'Escaut","L'IJssel"]],
    ["Quel fleuve traverse la Nouvelle-Zélande ?","Le Waikato",["Le Clutha","Le Waimakariri","Le Waitaki"]],
    ["Quel fleuve traverse le Nicaragua ?","Le Coco",["Le San Juan","Le Escondido","Le Grande"]],
    ["Quel fleuve traverse le Niger ?","Le Niger",["Le Sirba","Le Gorouol","Le Dargol"]],
    ["Quel fleuve traverse le Nigeria ?","Le Niger",["Le Benoué","Le Kaduna","Le Sokoto"]],
    ["Quel fleuve traverse la Norvège ?","La Glomma",["La Tana","La Drammen","La Vorma"]],
    ["Quel fleuve traverse le Pakistan ?","L'Indus",["Le Gange","Le Brahmapoutre","Le Jhelum"]],
    ["Quel fleuve traverse la Palestine ?","Le Jourdain",["Le Yarmouk","Le Zarqa","Le Hasbani"]],
    ["Quel fleuve traverse le Panama ?","Le Chagres",["Le Tuira","Le Chepo","Le Bayano"]],
    ["Quel fleuve traverse la Papouasie-Nouvelle-Guinée ?","Le Sepik",["Le Fly","Le Purari","Le Markham"]],
    ["Quel fleuve traverse le Paraguay ?","Le Paraguay",["Le Paraná","Le Pilcomayo","Le Apa"]],
    ["Quel fleuve traverse le Pérou ?","L'Amazone",["L'Ucayali","Le Marañón","Le Huallaga"]],
    ["Quel fleuve traverse les Philippines ?","Le Cagayan",["Le Agusan","Le Pasig","Le Pulangi"]],
    ["Quel fleuve traverse la Pologne ?","La Vistule",["L'Oder","La Warta","Le Bug"]],
    ["Quel fleuve traverse le Portugal ?","Le Douro",["Le Tage","Le Guadalquivir","L'Èbre"]],
    ["Quel fleuve traverse la Tchéquie ?","La Vltava",["L'Elbe","La Morava","L'Oder"]],
    ["Quel fleuve traverse la Roumanie ?","Le Danube",["Le Prut","Le Olt","Le Mureș"]],
    ["Quel fleuve traverse le Royaume-Uni ?","La Tamise",["La Severn","La Mersey","La Clyde"]],
    ["Quel fleuve traverse la Russie ?","La Volga",["Le Danube","L'Ob","L'Ienisseï"]],
    ["Quel fleuve traverse le Rwanda ?","Le Kagera",["Le Nyabarongo","Le Ruvubu","Le Ruvironza"]],
    ["Quel fleuve traverse la Serbie ?","Le Danube",["La Save","La Tisza","La Morava"]],
    ["Quel fleuve traverse la Sierra Leone ?","Le Rokel",["Le Jong","Le Sewa","Le Moa"]],
    ["Quel fleuve traverse la Slovaquie ?","Le Danube",["Le Váh","Le Hron","Le Ipeľ"]],
    ["Quel fleuve traverse la Slovénie ?","La Save",["La Drava","La Kolpa","La Soča"]],
    ["Quel fleuve traverse la Somalie ?","Le Chébéli",["Le Jubba","Le Nogal","Le Daror"]],
    ["Quel fleuve traverse le Soudan ?","Le Nil blanc",["Le Nil bleu","L'Atbara","Le Bahr el Ghazal"]],
    ["Quel fleuve traverse le Soudan du Sud ?","Le Nil blanc",["Le Sobat","Le Bahr el Ghazal","Le Pibor"]],
    ["Quel fleuve traverse le Sri Lanka ?","Le Mahaweli",["Le Kelani","Le Walawe","Le Deduru Oya"]],
    ["Quel fleuve traverse le Suriname ?","Le Suriname",["Le Maroni","Le Coppename","Le Saramacca"]],
    ["Quel fleuve traverse la Suède ?","La Lule",["Le Torne","Le Dalälven","Le Göta älv"]],
    ["Quel fleuve traverse la Suisse ?","Le Rhin",["Le Rhône","L'Inn","Le Ticino"]],
    ["Quel fleuve traverse la Syrie ?","L'Euphrate",["Le Khabour","Le Balikh","Le Sajour"]],
    ["Quel fleuve traverse le Tadjikistan ?","L'Amou-Daria",["Le Syr Darya","Le Panj","Le Vakhsh"]],
    ["Quel fleuve traverse la Tanzanie ?","Le Rufiji",["Le Ruvuma","Le Wami","Le Pangani"]],
    ["Quel fleuve traverse le Tchad ?","Le Chari",["Le Logone","Le Bahr el Ghazal","Le Ouham"]],
    ["Quel fleuve traverse la Thaïlande ?","Le Mékong",["Le Ping","Le Wang","Le Yom"]],
    ["Quel fleuve traverse le Togo ?","Le Mono",["L'Oti","Le Haho","Le Zio"]],
    ["Quel fleuve traverse Trinité-et-Tobago ?","Le Caroni",["L'Oropouche","Le South Oropouche","Le Nariva"]],
    ["Quel fleuve traverse la Tunisie ?","La Medjerda",["Le Zoussouna","Le Oued Zouara","Le Oued Siliana"]],
    ["Quel fleuve traverse la Turquie ?","Le Kizilirmak",["Le Sakarya","L'Euphrate","Le Tigre"]],
    ["Quel fleuve traverse le Turkménistan ?","L'Amou-Daria",["Le Tejen","Le Sumbar","Le Mourgab"]],
    ["Quel fleuve traverse l'Ouganda ?","Le Nil blanc",["Le Kafu","Le Mpongo","Le Semliki"]],
    ["Quel fleuve traverse l'Ukraine ?","Le Dniepr",["Le Dniestr","Le Boug","Le Donets"]],
    ["Quel fleuve traverse l'Uruguay ?","Le Río Negro",["Le Santa Lucía","Le Cebollatí","Le Yaguarí"]],
    ["Quel fleuve traverse l'Ouzbékistan ?","L'Amou-Daria",["Le Syr Darya","Le Chirchiq","Le Zeravchan"]],
    ["Quel fleuve traverse le Venezuela ?","L'Orénoque",["Le Caroni","Le Apure","Le Meta"]],
    ["Quel fleuve traverse le Viêt Nam ?","Le Mékong",["Le Dong Nai","Le Perfume","Le Saigon"]],
    ["Quel fleuve traverse la Zambie ?","Le Zambèze",["Le Kafue","Le Luangwa","Le Chambeshi"]],
    ["Quel fleuve traverse le Zimbabwe ?","Le Zambèze",["Le Limpopo","Le Save","Le Pungwe"]],
    ["Quel sommet est le plus haut d'Afrique ?","Le Kilimandjaro",["Le Mont Kenya","Le Ruwenzori","Le Mont Meru"]],
    ["Quel sommet est le plus haut d'Asie ?","L'Everest",["Le K2","Le Kangchenjunga","Le Lhotse"]],
    ["Quel sommet est le plus haut des Alpes ?","Le Mont Blanc",["L'Elbrouz","Le Cervin","Le Mont Rosa"]],
    ["Quel sommet est le plus haut d'Amérique du Nord ?","Le Denali",["Le Mont Logan","Le Pico de Orizaba","Le Mont Saint-Élie"]],
    ["Quel sommet est le plus haut d'Amérique du Sud ?","L'Aconcagua",["L'Ojos del Salado","Le Pissis","Le Mercedario"]],
    ["Quel sommet est le plus haut d'Océanie ?","Le Puncak Jaya",["Le Mont Kosciuszko","Le Mont Wilhelm","Le Mont Giluwe"]],
    ["Quel sommet est le plus haut d'Antarctique ?","Le Vinson",["Le Mont Tyree","Le Mont Shinn","Le Mont Heger"]],
    ["Quel désert est le plus grand du monde ?","Le désert antarctique",["Le Sahara","Le désert arctique","Le Gobi"]],
    ["Quel est le plus grand désert chaud du monde ?","Le Sahara",["Le désert d'Arabie","Le Gobi","Le Kalahari"]],
    ["Quel est le désert non polaire le plus aride du monde ?","L'Atacama",["Le Sahara","Le Mojave","Le Gobi"]],
    ["Quel désert se trouve en Afrique du Nord ?","Le Sahara",["Le Kalahari","Le Namib","Le Gobi"]],
    ["Quel désert se trouve en Afrique australe ?","Le Kalahari",["Le Sahara","Le Namib","Le Gobi"]],
    ["Quel désert se trouve en Namibie ?","Le Namib",["Le Kalahari","Le Sahara","Le Gobi"]],
    ["Quel désert s'étend en Mongolie et dans le nord de la Chine ?","Le Gobi",["Le Sahara","Le Kalahari","Le Taklamakan"]],
    ["Quel désert se trouve dans la région chinoise du Xinjiang ?","Le Taklamakan",["Le Gobi","Le Sahara","Le Kalahari"]],
    ["Quel désert se trouve en Arabie saoudite ?","Le Rub al-Khali",["Le Sahara","Le Gobi","Le Kalahari"]],
    ["Quel désert se trouve en Amérique du Nord ?","Le Mojave",["Le Sahara","Le Gobi","Le Kalahari"]],
    ["Quel désert se trouve en Amérique du Sud ?","L'Atacama",["Le Sahara","Le Gobi","Le Kalahari"]],
    ["Quel désert se trouve en Australie ?","Le Grand Désert Victoria",["Le Sahara","Le Gobi","Le Kalahari"]],
    ["Quel désert se trouve en Antarctique ?","Le désert antarctique",["Le Sahara","Le Gobi","Le Kalahari"]],
    ["Quel désert se trouve en Arctique ?","Le désert arctique",["Le Sahara","Le Gobi","Le Kalahari"]],
    ["Quel océan est le plus grand du monde ?","Le Pacifique",["L'Atlantique","L'Indien","L'Arctique"]],
    ["Quel océan sépare l'Amérique de l'Europe et de l'Afrique ?","L'Atlantique",["Le Pacifique","L'Indien","L'Arctique"]],
    ["Quel océan se trouve entre l'Afrique, l'Asie et l'Australie ?","L'Indien",["Le Pacifique","L'Atlantique","L'Arctique"]],
    ["Quel océan se trouve autour du pôle Nord ?","L'Arctique",["Le Pacifique","L'Atlantique","L'Indien"]],
    ["Quel océan se trouve autour du pôle Sud ?","L'Antarctique",["Le Pacifique","L'Atlantique","L'Indien"]],
    ["Quelle île est la plus grande du monde ?","Le Groenland",["La Nouvelle-Guinée","Bornéo","Madagascar"]],
    ["Quelle île est la deuxième plus grande du monde ?","La Nouvelle-Guinée",["Le Groenland","Bornéo","Madagascar"]],
    ["Quelle île est la troisième plus grande du monde ?","Bornéo",["Le Groenland","La Nouvelle-Guinée","Madagascar"]],
    ["Quelle île est la quatrième plus grande du monde ?","Madagascar",["Le Groenland","La Nouvelle-Guinée","Bornéo"]],
    ["Quelle île est la cinquième plus grande du monde ?","Baffin",["Le Groenland","La Nouvelle-Guinée","Bornéo"]],
    ["Quel pays a la plus grande superficie du monde ?","La Russie",["Le Canada","La Chine","Les États-Unis"]],
    ["Quel pays a la deuxième plus grande superficie du monde ?","Le Canada",["La Russie","La Chine","Les États-Unis"]],
    ["Quel pays a la troisième plus grande superficie du monde ?","La Chine",["La Russie","Le Canada","Les États-Unis"]],
    ["Quel pays a la quatrième plus grande superficie du monde ?","Les États-Unis",["La Russie","Le Canada","La Chine"]],
    ["Quel pays a la cinquième plus grande superficie du monde ?","Le Brésil",["La Russie","Le Canada","La Chine"]],
    ["Quel pays a la sixième plus grande superficie du monde ?","L'Australie",["La Russie","Le Canada","La Chine"]],
    ["Quel pays a la septième plus grande superficie du monde ?","L'Inde",["La Russie","Le Canada","La Chine"]],
    ["Quel pays a la huitième plus grande superficie du monde ?","L'Argentine",["La Russie","Le Canada","La Chine"]],
    ["Quel pays a la neuvième plus grande superficie du monde ?","Le Kazakhstan",["La Russie","Le Canada","La Chine"]],
    ["Quel pays a la dixième plus grande superficie du monde ?","L'Algérie",["La Russie","Le Canada","La Chine"]],
    ["Quel pays a la plus grande population du monde ?","L'Inde",["La Chine","Les États-Unis","L'Indonésie"]],
    ["Quel pays a la deuxième plus grande population du monde ?","La Chine",["L'Inde","Les États-Unis","L'Indonésie"]],
    ["Quel pays a la troisième plus grande population du monde ?","Les États-Unis",["L'Inde","La Chine","L'Indonésie"]],
    ["Quel pays a la quatrième plus grande population du monde ?","L'Indonésie",["L'Inde","La Chine","Les États-Unis"]],
    ["Quel pays a la cinquième plus grande population du monde ?","Le Pakistan",["L'Inde","La Chine","Les États-Unis"]],
    ["Quel pays a la sixième plus grande population du monde ?","Le Nigeria",["L'Inde","La Chine","Les États-Unis"]],
    ["Quel pays a la septième plus grande population du monde ?","Le Brésil",["L'Inde","La Chine","Les États-Unis"]],
    ["Quel pays a la huitième plus grande population du monde ?","Le Bangladesh",["L'Inde","La Chine","Les États-Unis"]],
    ["Quel pays a la neuvième plus grande population du monde ?","La Russie",["L'Inde","La Chine","Les États-Unis"]],
    ["Quel pays a la dixième plus grande population du monde ?","Le Mexique",["L'Inde","La Chine","Les États-Unis"]],
    ["Quel pays est le plus petit du monde ?","Le Vatican",["Monaco","Nauru","Saint-Marin"]],
    ["Quel pays est le deuxième plus petit du monde ?","Monaco",["Le Vatican","Nauru","Saint-Marin"]],
    ["Quel pays est le troisième plus petit du monde ?","Nauru",["Le Vatican","Monaco","Saint-Marin"]],
    ["Quel pays est le quatrième plus petit du monde ?","Tuvalu",["Le Vatican","Monaco","Nauru"]],
    ["Quel pays est le cinquième plus petit du monde ?","Saint-Marin",["Le Vatican","Monaco","Nauru"]],
);

const DIFFICULTY_LEVELS = [
    { key: "basique", label: "Basique" },
    { key: "facile", label: "Facile" },
    { key: "moyen", label: "Moyen" },
    { key: "difficile", label: "Difficile" },
    { key: "tres_difficile", label: "Très difficile" },
    { key: "master", label: "Master" }
];

function normalizeQuestionText(value) {
    return String(value ?? "").normalize("NFD").replace(/\p{M}/gu, "")
        .toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

function normalizeAnswerChoice(value) {
    const text = String(value ?? '').trim();
    const numeric = text.replace(/[\s\u00a0\u202f]/g, '').replace(',', '.');
    if (/^-?\d+(?:\.\d+)?$/.test(numeric)) return `number:${Number(numeric)}`;
    return `text:${normalizeQuestionText(text)}`;
}

function shuffleOptions(options) {
    const result = options.slice();
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

function selectQuestionOptions(question, answer, distractors) {
    const answerText = String(answer ?? '').trim();
    const correctKey = normalizeAnswerChoice(answerText);
    if (!correctKey) throw new Error(`Question sans bonne réponse : ${question}`);

    const uniqueDistractors = new Map();
    (distractors || []).forEach(choice => {
        const text = String(choice ?? '').trim();
        const key = normalizeAnswerChoice(text);
        if (text && key !== correctKey && !uniqueDistractors.has(key)) {
            uniqueDistractors.set(key, text);
        }
    });
    if (uniqueDistractors.size < 2) throw new Error(`Pas assez de choix distincts : ${question}`);

    const available = [...uniqueDistractors.values()];
    const selected = [];
    for (let i = 0; i < 2; i++) {
        selected.push(available.splice(Math.floor(Math.random() * available.length), 1)[0]);
    }
    return shuffleOptions([answerText, ...selected]);
}

function questionDifficultyScore(theme, row) {
    const question = normalizeQuestionText(row[0]);
    const answer = normalizeQuestionText(row[1]);
    const wordCount = question.split(" ").filter(Boolean).length;
    let score = Math.min(2.5, wordCount / 14) + Math.min(1.5, answer.length / 24);

    if (theme === "geo") {
        const familiarCountries = /\b(france|allemagne|italie|espagne|royaume uni|etats unis|chine|inde|japon|bresil|canada|australie|cameroun|senegal|maroc|egypte|afrique du sud|argentine|mexique|perou|chili|colombie|nigeria|kenya|ethiopie|indonesie|nouvelle zelande|islande|grece|norvege|pays bas|portugal|suede|turquie|russie)\b/;
        const familiarPlaces = /\b(paris|berlin|rome|madrid|londres|moscou|pekin|new delhi|tokyo|brasilia|ottawa|canberra|yaounde|dakar|rabat|le caire|nil|amazone|everest|pacifique)\b/;
        if (question.includes("capitale")) score += familiarCountries.test(question) ? 0 : 1.8;
        else if (question.includes("continent")) score += familiarCountries.test(question) ? 0.4 : 1.7;
        else if (question.includes("ocean")) score += 0.8;
        else if (question.includes("fleuve")) score += 1.8;
        else if (/detroit|isthme|affluent|bassin|latitude|longitude|confluence|source du/.test(question)) score += 3.2;
        else score += 1.5;
        if (familiarPlaces.test(answer)) score -= 0.6;
    } else if (theme === "culture") {
        if (/planete|formule chimique|symbole chimique|organe|animal terrestre|couleur du drapeau/.test(question)) score -= 0.7;
        if (/en quelle annee|quelle annee|combien d|vitesse de|distance|pourcentage|symbole chimique/.test(question)) score += 1.1;
        if (/qui a ecrit|qui a peint|qui a compose|qui a invente|qui a decouvert/.test(question)) score += 1.7;
        if (/theorie|theoreme|classification|mecanisme|reaction|philosophie|courant litteraire/.test(question)) score += 2.2;
        if (/world wide web|harry potter|petit prince|romeo et juliette|joconde|tournesols|la cene|penicilline|machine a vapeur|ampoule electrique|seigneur des anneaux|ferme des animaux|trois mousquetaires|hamlet|macbeth|le cid|imprimerie|quatre saisons|ode a la joie/.test(question)) {
            score -= 1.6;
        }
    } else if (theme === "anglais") {
        score += Math.min(2, answer.split(" ").length * 0.35);
        if (/yesterday|although|nevertheless|would have|could have|has been|had been|unless|despite/.test(question + " " + answer)) score += 1.5;
    }
    return score;
}

function buildQuestionLevels(rows, theme, referenceRows = rows) {
    if (rows.length !== referenceRows.length) {
        throw new Error(`Banques ${theme} désalignées : ${rows.length} / ${referenceRows.length}`);
    }
    const seen = new Set();
    const reviewedRiverPrompts = new Set([
        'quel fleuve traverse paris', 'quel fleuve traverse rome', 'quel fleuve traverse bagdad',
        'quel fleuve traverse londres', 'quel fleuve traverse l egypte du sud au nord',
        'quel fleuve traverse le perou et le bresil', 'quel fleuve traverse plusieurs capitales europeennes',
        'quel fleuve traverse l inde et est sacre pour les hindous',
        'quel fleuve traverse la chine et le vietnam', 'quel fleuve traverse le vietnam et le cambodge',
        'quel fleuve traverse le laos et la thailande', 'quel fleuve traverse le myanmar et la thailande',
        'quel fleuve traverse le pakistan et se jette dans la mer d arabie',
        'quel fleuve traverse la chine et se jette dans la mer de chine orientale',
        'quel fleuve traverse la chine et se jette dans la mer jaune',
        'quel fleuve traverse le soudan et l egypte', 'quel fleuve traverse notamment l egypte et le soudan',
        'quel fleuve traverse l inde et le pakistan'
    ]);
    const preparedRows = rows.map((row, index) => {
        const referenceRow = referenceRows[index];
        const question = normalizeQuestionText(referenceRow[0]);
        const weakDistractors = (row[2] || []).some(value => ['paris', 'londres'].includes(normalizeQuestionText(value)));
        if (!weakDistractors) return row;

        let category = null;
        if (theme === 'culture') {
            if (question.startsWith('qui a peint')) category = 'peint';
            else if (question.startsWith('qui a compose')) category = 'compose';
            else if (question.startsWith('qui a ecrit')) category = 'ecrit';
            else if (question.startsWith('qui a decouvert') || question.includes('double helice') || question.includes('isole l oxygene') || question.includes('identifie l hydrogene')) category = 'decouvert';
            else if (question.startsWith('qui a invente') || question.includes('cinematographe') || question.includes('machine analytique')) category = 'invente';
        } else if (theme === 'geo' && question.startsWith('quel fleuve traverse')) {
            category = 'fleuve';
        } else if (theme === 'geo' && question.startsWith('quelle est la capitale')) {
            category = 'capitale';
        }
        if (!category) return row;

        const answerKey = normalizeAnswerChoice(row[1]);
        const alternatives = rows
            .filter((other, otherIndex) => {
                const otherQuestion = normalizeQuestionText(referenceRows[otherIndex][0]);
                return category === 'fleuve'
                    ? otherQuestion.startsWith('quel fleuve traverse')
                    : category === 'capitale'
                        ? otherQuestion.startsWith('quelle est la capitale')
                        : otherQuestion.startsWith(`qui a ${category}`);
            })
            .map(other => other[1])
            .filter(value => normalizeAnswerChoice(value) !== answerKey);
        const distractors = [...new Map(alternatives.map(value => [normalizeAnswerChoice(value), value])).values()];
        return [row[0], row[1], shuffleOptions(distractors).slice(0, 3)];
    });

    const clean = preparedRows.map((row, index) => ({ row, referenceRow: referenceRows[index] })).filter(({ referenceRow }) => {
        const signature = normalizeQuestionText(referenceRow[0]);
        if (!signature || seen.has(signature)) return false;
        seen.add(signature);

        // These prompts have many valid answers or rely on constantly changing rankings.
        if (theme === "geo") {
            if (signature.startsWith('quel fleuve traverse ') && !reviewedRiverPrompts.has(signature)) return false;
            if (/^quelle ile se trouve /.test(signature) || signature === 'quelle ile appartient au danemark') return false;
            if (/population|densite|plus peuple|plus grande ville|plus grand nombre d habitants/.test(signature)) return false;
            if (/ville.*plus riche|plus riche.*ville/.test(signature)) return false;
            if (signature === 'quel fleuve traverse l inde et le bangladesh') return false;
            if (/sites unesco|fuseaux horaires|cercle polaire antarctique/.test(signature)) return false;
            if (/^quelle ville (?:possede le plus grand nombre|est la plus haute|est la plus basse)/.test(signature)) return false;
            if (/quel est le pays le plus (?:au nord|au sud|a l est|a l ouest) du monde/.test(signature)) return false;
            if (/^sur quel continent se trouve /.test(signature) &&
                /\b(russie|turquie|egypte|kazakhstan|georgie|azerbaidjan|indonesie|chypre)\b/.test(signature)) return false;
        }
        return true;
    });

    const ordered = clean.map(({ row, referenceRow }, index) => ({
        row,
        index,
        score: questionDifficultyScore(theme, referenceRow)
    }))
        .sort((a, b) => a.score - b.score || a.index - b.index);
    const levels = Object.fromEntries(DIFFICULTY_LEVELS.map(level => [level.key, []]));
    ordered.forEach((item, index) => {
        const levelIndex = Math.min(DIFFICULTY_LEVELS.length - 1, Math.floor(index * DIFFICULTY_LEVELS.length / ordered.length));
        levels[DIFFICULTY_LEVELS[levelIndex].key].push(item.row);
    });
    return levels;
}

function getLanguageSource(row) {
    if (row[5]) return row[5];
    const quoted = String(row[0]).match(/[«"]([^»"]+)[»"]/);
    return quoted ? quoted[1] : String(row[0]);
}

function languagePhraseDifficulty(row) {
    const source = normalizeQuestionText(getLanguageSource(row));
    const words = source.split(' ').filter(Boolean);
    let score = words.length * 0.28;
    if (/[?？]$/.test(getLanguageSource(row).trim())) score += 0.8;
    if (/\b(si|bien que|quoique|pourvu que|a condition que|quand bien meme|a supposer que|non que|qui que)\b/.test(source)) score += 2.2;
    if (/\b(aurais|aurait|aurions|auraient|auriez|eusse|eut|fut|fut il|eut il)\b/.test(source)) score += 2;
    if (/\b(avais|avait|avaient|avions|aviez|etes|etaient|etait|eut|eurent)\b/.test(source)) score += 1.1;
    if (/\b(doit|doivent|pourrait|pourraient|devrait|devraient|semble|semblerait|risque de|vient de)\b/.test(source)) score += 0.8;
    if (/\b(ne|n|pas|plus|jamais|rien|personne|aucun)\b/.test(source)) score += 0.45;
    if (/\b(dont|auquel|laquelle|lesquels|ce a quoi|ce dont|ce que)\b/.test(source)) score += 0.75;
    if (/\b(finir par|avoir beau|mettre a|se rendre compte|tenir a|faire en sorte)\b/.test(source)) score += 1;
    return score;
}

function buildLanguageLevels(rows) {
    const levels = Object.fromEntries(DIFFICULTY_LEVELS.map(level => [level.key, []]));
    const phrases = rows.filter(row => row[3] === 'phrase' && !row[4]);
    const explicitPhrases = rows.filter(row => row[3] === 'phrase' && row[4]);
    const vocabulary = rows.filter(row => row[3] === 'word');

    phrases.sort((a, b) => languagePhraseDifficulty(a) - languagePhraseDifficulty(b));
    phrases.forEach((row, index) => {
        // The original phrase bank is everyday language; it must never leak into
        // the advanced tiers just because it is relatively longer than a word.
        const levelIndex = Math.min(2, Math.floor(index * 3 / Math.max(1, phrases.length)));
        levels[DIFFICULTY_LEVELS[levelIndex].key].push(row);
    });
    explicitPhrases.forEach(row => {
        if (levels[row[4]]) levels[row[4]].push(row);
    });

    vocabulary.sort((a, b) => {
        const aSource = getLanguageSource(a), bSource = getLanguageSource(b);
        const score = value => value.length * 0.2 + (/[ -]/.test(value) ? 0.35 : 0);
        return score(aSource) - score(bSource);
    });
    vocabulary.forEach((row, index) => {
        const levelIndex = Math.min(2, Math.floor(index * 3 / Math.max(1, vocabulary.length)));
        levels[DIFFICULTY_LEVELS[levelIndex].key].push(row);
    });
    return levels;
}

const translationAnswerProfileCache = new WeakMap();

function translationAnswerProfile(row) {
    const cached = translationAnswerProfileCache.get(row);
    if (cached) return cached;
    const answer = String(row[1]).trim();
    const text = normalizeQuestionText(answer);
    const wordPrompt = row[3] === 'word';
    const interrogative = /[?？]$/.test(answer);
    const startsWithVerb = /^(?:please\s+)?(?:do not|dont|dont|open|close|turn|wait|stop|go|take|send|look|let|remember|forget|help|tell|give)\b/.test(text);
    const negative = /\b(not|never|no|dont|doesnt|didnt|cannot|cant|wont|wouldnt|isnt|arent|wasnt|werent|hasnt|havent|hadnt)\b/.test(text);
    let tense = 'present';
    if (/\b(would|could|should|might)\s+(?:not\s+)?(?:have|be)\b/.test(text)) tense = 'conditional_perfect';
    else if (/\b(would|could|should|might)\b/.test(text)) tense = 'conditional';
    else if (/\b(will|shall|going to)\b/.test(text)) tense = 'future';
    else if (/\b(have|has|had)\b(?:\s+\w{1,10}){0,2}\s+\w+(?:ed|en|n|t)\b/.test(text)) tense = 'perfect';
    else if (/\b(am|is|are|was|were)\s+\w+ing\b/.test(text)) tense = 'progressive';
    else if (/\b(did|was|were|had)\b|\b\w+ed\b/.test(text)) tense = 'past';
    const questionLead = text.match(/^(how long|how much|how many|how often|how old|how|where|when|why|who|what|which)\b/)?.[1] || '';
    const afterLead = questionLead ? text.slice(questionLead.length).trim() : text;
    const auxiliary = afterLead.match(/^(do|does|did|am|is|are|was|were|can|could|will|would|have|has|had|should|must)\b/)?.[1] || '';
    const subject = text.match(/^(?:how\s+\w+\s+)?(?:do|does|did|am|is|are|was|were|can|could|will|would|have|has|had|should|must)?\s*(i|you|he|she|we|they|it)\b/)?.[1] || '';
    const tokens = text.split(' ').filter(token => token.length > 2 && !['the', 'and', 'you', 'your', 'that', 'this', 'with', 'have', 'has', 'had', 'are', 'was', 'were'].includes(token));
    const profile = {
        kind: wordPrompt ? 'word' : 'phrase',
        interrogative,
        questionLead,
        auxiliary,
        imperative: !interrogative && startsWithVerb,
        negative,
        tense,
        subject,
        text,
        normalizedAnswer: normalizeAnswerChoice(answer),
        tokens,
        answerLength: answer.length
    };
    translationAnswerProfileCache.set(row, profile);
    return profile;
}

function translationDistractors(levelRows, allRows, answerRow) {
    const profile = translationAnswerProfile(answerRow);
    const answer = profile.normalizedAnswer;
    const makeCandidates = rows => rows.filter(row => row !== answerRow && row[3] === profile.kind &&
        translationAnswerProfile(row).normalizedAnswer !== answer);
    let candidates = makeCandidates(levelRows || []);
    if (candidates.length < 2) candidates = makeCandidates(allRows);
    let sameForm = candidates.filter(row => {
        const other = translationAnswerProfile(row);
        return other.interrogative === profile.interrogative && other.imperative === profile.imperative;
    });
    if (sameForm.length < 2) {
        candidates = makeCandidates(allRows);
        sameForm = candidates.filter(row => {
            const other = translationAnswerProfile(row);
            return other.interrogative === profile.interrogative && other.imperative === profile.imperative;
        });
    }
    let pool = sameForm;
    let strict = pool.filter(row => {
        const other = translationAnswerProfile(row);
        return other.negative === profile.negative && other.tense === profile.tense;
    });
    const strictSet = new Set(strict);
    if (strict.length) pool = [...strict, ...pool.filter(row => !strictSet.has(row))];
    if (profile.interrogative && profile.questionLead) {
        const sameLead = pool.filter(row => translationAnswerProfile(row).questionLead === profile.questionLead);
        if (sameLead.length >= 2) pool = sameLead;
    }
    if (profile.interrogative && profile.auxiliary) {
        const sameAuxiliary = pool.filter(row => translationAnswerProfile(row).auxiliary === profile.auxiliary);
        if (sameAuxiliary.length >= 2) pool = sameAuxiliary;
    }

    const answerTokens = new Set(profile.tokens);
    const ranked = pool.map(row => {
        const other = translationAnswerProfile(row);
        const overlap = other.tokens.filter(token => answerTokens.has(token)).length;
        const leadBonus = profile.questionLead && other.questionLead === profile.questionLead ? 3 : 0;
        const auxiliaryBonus = profile.auxiliary && other.auxiliary === profile.auxiliary ? 2 : 0;
        const lengthPenalty = Math.abs(other.answerLength - profile.answerLength) / 18;
        return { row, score: overlap * 3 + leadBonus + auxiliaryBonus + (strictSet.has(row) ? 6 : 0) - lengthPenalty };
    }).sort((a, b) => b.score - a.score).slice(0, 12).map(item => item.row);
    const chosen = (answerRow[2] || []).filter(value => {
        if (normalizeAnswerChoice(value) === answer) return false;
        const customRow = [answerRow[0], value, [], profile.kind];
        const custom = translationAnswerProfile(customRow);
        return custom.interrogative === profile.interrogative && custom.imperative === profile.imperative;
    }).slice(0, 2);
    while (ranked.length && chosen.length < 2) {
        const index = Math.floor(Math.random() * ranked.length);
        const value = ranked.splice(index, 1)[0][1];
        if (!chosen.some(choice => normalizeAnswerChoice(choice) === normalizeAnswerChoice(value))) chosen.push(value);
    }
    if (chosen.length < 2) {
        const fallback = (levelRows || []).filter(row => row !== answerRow && row[3] === profile.kind &&
            translationAnswerProfile(row).interrogative === profile.interrogative &&
            !chosen.some(value => normalizeAnswerChoice(value) === translationAnswerProfile(row).normalizedAnswer) &&
            translationAnswerProfile(row).normalizedAnswer !== answer);
        while (fallback.length && chosen.length < 2) chosen.push(fallback.splice(Math.floor(Math.random() * fallback.length), 1)[0][1]);
    }
    // Some target-language banks have only one question-form sentence per
    // tier. Fall back to other valid translations rather than returning fewer
    // than two distractors and crashing question creation.
    if (chosen.length < 2) {
        const fallback = makeCandidates(levelRows).concat(makeCandidates(allRows))
            .filter(row => translationAnswerProfile(row).normalizedAnswer !== answer &&
                !chosen.some(value => normalizeAnswerChoice(value) === translationAnswerProfile(row).normalizedAnswer))
            .sort((a, b) => Math.abs(translationAnswerProfile(a).answerLength - profile.answerLength) -
                Math.abs(translationAnswerProfile(b).answerLength - profile.answerLength));
        while (fallback.length && chosen.length < 2) {
            const candidate = fallback.shift()[1];
            if (!chosen.some(value => normalizeAnswerChoice(value) === normalizeAnswerChoice(candidate))) chosen.push(candidate);
        }
    }
    return chosen;
}

const GEO_QUESTIONS_BY_LEVEL = buildQuestionLevels(GEO_QUESTIONS, "geo");

// --- VOCABULAIRE MULTILINGUE POUR LE THÈME LANGUES (TRADUCTION) ---
const LANG_VOCAB = [
    { fr: "ami", en: "friend", es: "amigo", de: "Freund", zh: "朋友", ru: "друг" },
    { fr: "famille", en: "family", es: "familia", de: "Familie", zh: "家庭", ru: "семья" },
    { fr: "père", en: "father", es: "padre", de: "Vater", zh: "父亲", ru: "отец" },
    { fr: "mère", en: "mother", es: "madre", de: "Mutter", zh: "母亲", ru: "мать" },
    { fr: "frère", en: "brother", es: "hermano", de: "Bruder", zh: "兄弟", ru: "брат" },
    { fr: "sœur", en: "sister", es: "hermana", de: "Schwester", zh: "姐妹", ru: "сестра" },
    { fr: "fils", en: "son", es: "hijo", de: "Sohn", zh: "儿子", ru: "сын" },
    { fr: "fille", en: "daughter", es: "hija", de: "Tochter", zh: "女儿", ru: "дочь" },
    { fr: "grand-père", en: "grandfather", es: "abuelo", de: "Großvater", zh: "祖父", ru: "дедушка" },
    { fr: "grand-mère", en: "grandmother", es: "abuela", de: "Großmutter", zh: "祖母", ru: "бабушка" },
    { fr: "maison", en: "house", es: "casa", de: "Haus", zh: "房子", ru: "дом" },
    { fr: "chambre", en: "bedroom", es: "dormitorio", de: "Schlafzimmer", zh: "卧室", ru: "спальня" },
    { fr: "cuisine", en: "kitchen", es: "cocina", de: "Küche", zh: "厨房", ru: "кухня" },
    { fr: "salle de bain", en: "bathroom", es: "baño", de: "Badezimmer", zh: "浴室", ru: "ванная" },
    { fr: "salon", en: "living room", es: "sala", de: "Wohnzimmer", zh: "客厅", ru: "гостиная" },
    { fr: "porte", en: "door", es: "puerta", de: "Tür", zh: "门", ru: "дверь" },
    { fr: "fenêtre", en: "window", es: "ventana", de: "Fenster", zh: "窗户", ru: "окно" },
    { fr: "lit", en: "bed", es: "cama", de: "Bett", zh: "床", ru: "кровать" },
    { fr: "table", en: "table", es: "mesa", de: "Tisch", zh: "桌子", ru: "стол" },
    { fr: "chaise", en: "chair", es: "silla", de: "Stuhl", zh: "椅子", ru: "стул" },
    { fr: "pain", en: "bread", es: "pan", de: "Brot", zh: "面包", ru: "хлеб" },
    { fr: "eau", en: "water", es: "agua", de: "Wasser", zh: "水", ru: "вода" },
    { fr: "pomme", en: "apple", es: "manzana", de: "Apfel", zh: "苹果", ru: "яблоко" },
    { fr: "banane", en: "banana", es: "plátano", de: "Banane", zh: "香蕉", ru: "банан" },
    { fr: "riz", en: "rice", es: "arroz", de: "Reis", zh: "米饭", ru: "рис" },
    { fr: "viande", en: "meat", es: "carne", de: "Fleisch", zh: "肉", ru: "мясо" },
    { fr: "poisson", en: "fish", es: "pescado", de: "Fisch", zh: "鱼", ru: "рыба" },
    { fr: "fromage", en: "cheese", es: "queso", de: "Käse", zh: "奶酪", ru: "сыр" },
    { fr: "sel", en: "salt", es: "sal", de: "Salz", zh: "盐", ru: "соль" },
    { fr: "sucre", en: "sugar", es: "azúcar", de: "Zucker", zh: "糖", ru: "сахар" },
    { fr: "tête", en: "head", es: "cabeza", de: "Kopf", zh: "头", ru: "голова" },
    { fr: "œil", en: "eye", es: "ojo", de: "Auge", zh: "眼睛", ru: "глаз" },
    { fr: "oreille", en: "ear", es: "oreja", de: "Ohr", zh: "耳朵", ru: "ухо" },
    { fr: "nez", en: "nose", es: "nariz", de: "Nase", zh: "鼻子", ru: "нос" },
    { fr: "bouche", en: "mouth", es: "boca", de: "Mund", zh: "嘴", ru: "рот" },
    { fr: "main", en: "hand", es: "mano", de: "Hand", zh: "手", ru: "рука" },
    { fr: "pied", en: "foot", es: "pie", de: "Fuß", zh: "脚", ru: "нога" },
    { fr: "cœur", en: "heart", es: "corazón", de: "Herz", zh: "心脏", ru: "сердце" },
    { fr: "sang", en: "blood", es: "sangre", de: "Blut", zh: "血", ru: "кровь" },
    { fr: "os", en: "bone", es: "hueso", de: "Knochen", zh: "骨头", ru: "кость" },
    { fr: "arbre", en: "tree", es: "árbol", de: "Baum", zh: "树", ru: "дерево" },
    { fr: "fleur", en: "flower", es: "flor", de: "Blume", zh: "花", ru: "цветок" },
    { fr: "herbe", en: "grass", es: "hierba", de: "Gras", zh: "草", ru: "трава" },
    { fr: "montagne", en: "mountain", es: "montaña", de: "Berg", zh: "山", ru: "гора" },
    { fr: "mer", en: "sea", es: "mar", de: "Meer", zh: "海", ru: "море" },
    { fr: "rivière", en: "river", es: "río", de: "Fluss", zh: "河", ru: "река" },
    { fr: "soleil", en: "sun", es: "sol", de: "Sonne", zh: "太阳", ru: "солнце" },
    { fr: "lune", en: "moon", es: "luna", de: "Mond", zh: "月亮", ru: "луна" },
    { fr: "étoile", en: "star", es: "estrella", de: "Stern", zh: "星星", ru: "звезда" },
    { fr: "ciel", en: "sky", es: "cielo", de: "Himmel", zh: "天空", ru: "небо" },
    { fr: "rue", en: "street", es: "calle", de: "Straße", zh: "街道", ru: "улица" },
    { fr: "magasin", en: "shop", es: "tienda", de: "Geschäft", zh: "商店", ru: "магазин" },
    { fr: "hôtel", en: "hotel", es: "hotel", de: "Hotel", zh: "酒店", ru: "отель" },
    { fr: "école", en: "school", es: "escuela", de: "Schule", zh: "学校", ru: "школа" },
    { fr: "hôpital", en: "hospital", es: "hospital", de: "Krankenhaus", zh: "医院", ru: "больница" },
    { fr: "banque", en: "bank", es: "banco", de: "Bank", zh: "银行", ru: "банк" },
    { fr: "gare", en: "station", es: "estación", de: "Bahnhof", zh: "车站", ru: "станция" },
    { fr: "aéroport", en: "airport", es: "aeropuerto", de: "Flughafen", zh: "机场", ru: "аэропорт" },
    { fr: "parc", en: "park", es: "parque", de: "Park", zh: "公园", ru: "парк" },
    { fr: "pont", en: "bridge", es: "puente", de: "Brücke", zh: "桥", ru: "мост" },
    { fr: "voyage", en: "trip", es: "viaje", de: "Reise", zh: "旅行", ru: "поездка" },
    { fr: "avion", en: "plane", es: "avión", de: "Flugzeug", zh: "飞机", ru: "самолет" },
    { fr: "train", en: "train", es: "tren", de: "Zug", zh: "火车", ru: "поезд" },
    { fr: "bus", en: "bus", es: "autobús", de: "Bus", zh: "公共汽车", ru: "автобус" },
    { fr: "voiture", en: "car", es: "coche", de: "Auto", zh: "汽车", ru: "машина" },
    { fr: "ticket", en: "ticket", es: "boleto", de: "Ticket", zh: "票", ru: "билет" },
    { fr: "passeport", en: "passport", es: "pasaporte", de: "Reisepass", zh: "护照", ru: "паспорт" },
    { fr: "valise", en: "suitcase", es: "maleta", de: "Koffer", zh: "行李箱", ru: "чемодан" },
    { fr: "plage", en: "beach", es: "playa", de: "Strand", zh: "海滩", ru: "пляж" },
    { fr: "jour", en: "day", es: "día", de: "Tag", zh: "天", ru: "день" },
    { fr: "nuit", en: "night", es: "noche", de: "Nacht", zh: "夜", ru: "ночь" },
    { fr: "matin", en: "morning", es: "mañana", de: "Morgen", zh: "早上", ru: "утро" },
    { fr: "soir", en: "evening", es: "tarde", de: "Abend", zh: "晚上", ru: "вечер" },
    { fr: "heure", en: "hour", es: "hora", de: "Stunde", zh: "小时", ru: "час" },
    { fr: "minute", en: "minute", es: "minuto", de: "Minute", zh: "分钟", ru: "минута" },
    { fr: "seconde", en: "second", es: "segundo", de: "Sekunde", zh: "秒", ru: "секунда" },
    { fr: "semaine", en: "week", es: "semana", de: "Woche", zh: "周", ru: "неделя" },
    { fr: "mois", en: "month", es: "mes", de: "Monat", zh: "月", ru: "месяц" },
    { fr: "année", en: "year", es: "año", de: "Jahr", zh: "年", ru: "год" },
    { fr: "rouge", en: "red", es: "rojo", de: "Rot", zh: "红色", ru: "красный" },
    { fr: "bleu", en: "blue", es: "azul", de: "Blau", zh: "蓝色", ru: "синий" },
    { fr: "vert", en: "green", es: "verde", de: "Grün", zh: "绿色", ru: "зеленый" },
    { fr: "jaune", en: "yellow", es: "amarillo", de: "Gelb", zh: "黄色", ru: "желтый" },
    { fr: "noir", en: "black", es: "negro", de: "Schwarz", zh: "黑色", ru: "черный" },
    { fr: "blanc", en: "white", es: "blanco", de: "Weiß", zh: "白色", ru: "белый" },
    { fr: "gris", en: "gray", es: "gris", de: "Grau", zh: "灰色", ru: "серый" },
    { fr: "orange", en: "orange", es: "naranja", de: "Orange", zh: "橙色", ru: "оранжевый" },
    { fr: "rose", en: "pink", es: "rosa", de: "Rosa", zh: "粉色", ru: "розовый" },
    { fr: "violet", en: "purple", es: "morado", de: "Violett", zh: "紫色", ru: "фиолетовый" },
    { fr: "un", en: "one", es: "uno", de: "Eins", zh: "一", ru: "один" },
    { fr: "deux", en: "two", es: "dos", de: "Zwei", zh: "二", ru: "два" },
    { fr: "trois", en: "three", es: "tres", de: "Drei", zh: "三", ru: "три" },
    { fr: "quatre", en: "four", es: "cuatro", de: "Vier", zh: "四", ru: "четыре" },
    { fr: "cinq", en: "five", es: "cinco", de: "Fünf", zh: "五", ru: "пять" },
    { fr: "six", en: "six", es: "seis", de: "Sechs", zh: "六", ru: "шесть" },
    { fr: "sept", en: "seven", es: "siete", de: "Sieben", zh: "七", ru: "семь" },
    { fr: "huit", en: "eight", es: "ocho", de: "Acht", zh: "八", ru: "восемь" },
    { fr: "neuf", en: "nine", es: "nueve", de: "Neun", zh: "九", ru: "девять" },
    { fr: "dix", en: "ten", es: "diez", de: "Zehn", zh: "十", ru: "десять" },
    { fr: "bonheur", en: "happiness", es: "felicidad", de: "Glück", zh: "幸福", ru: "счастье" },
    { fr: "tristesse", en: "sadness", es: "tristeza", de: "Traurigkeit", zh: "悲伤", ru: "грусть" },
    { fr: "colère", en: "anger", es: "ira", de: "Wut", zh: "愤怒", ru: "гнев" },
    { fr: "peur", en: "fear", es: "miedo", de: "Angst", zh: "恐惧", ru: "страх" },
    { fr: "amour", en: "love", es: "amor", de: "Liebe", zh: "爱", ru: "любовь" },
    { fr: "haine", en: "hate", es: "odio", de: "Hass", zh: "恨", ru: "ненависть" },
    { fr: "joie", en: "joy", es: "alegría", de: "Freude", zh: "喜悦", ru: "радость" },
    { fr: "surprise", en: "surprise", es: "sorpresa", de: "Überraschung", zh: "惊喜", ru: "сюрприз" },
    { fr: "fatigue", en: "tiredness", es: "cansancio", de: "Müdigkeit", zh: "疲劳", ru: "усталость" },
    { fr: "stress", en: "stress", es: "estrés", de: "Stress", zh: "压力", ru: "стресс" },
    { fr: "manger", en: "eat", es: "comer", de: "essen", zh: "吃", ru: "есть" },
    { fr: "boire", en: "drink", es: "beber", de: "trinken", zh: "喝", ru: "пить" },
    { fr: "dormir", en: "sleep", es: "dormir", de: "schlafen", zh: "睡觉", ru: "спать" },
    { fr: "marcher", en: "walk", es: "caminar", de: "gehen", zh: "走", ru: "ходить" },
    { fr: "courir", en: "run", es: "correr", de: "rennen", zh: "跑", ru: "бежать" },
    { fr: "parler", en: "speak", es: "hablar", de: "sprechen", zh: "说话", ru: "говорить" },
    { fr: "écouter", en: "listen", es: "escuchar", de: "hören", zh: "听", ru: "слушать" },
    { fr: "regarder", en: "look", es: "mirar", de: "schauen", zh: "看", ru: "смотреть" },
    { fr: "lire", en: "read", es: "leer", de: "lesen", zh: "读", ru: "читать" },
    { fr: "écrire", en: "write", es: "escribir", de: "schreiben", zh: "写", ru: "писать" },
    { fr: "chemise", en: "shirt", es: "camisa", de: "Hemd", zh: "衬衫", ru: "рубашка" },
    { fr: "pantalon", en: "pants", es: "pantalón", de: "Hose", zh: "裤子", ru: "брюки" },
    { fr: "jupe", en: "skirt", es: "falda", de: "Rock", zh: "裙子", ru: "юбка" },
    { fr: "robe", en: "dress", es: "vestido", de: "Kleid", zh: "连衣裙", ru: "платье" },
    { fr: "chaussures", en: "shoes", es: "zapatos", de: "Schuhe", zh: "鞋子", ru: "обувь" },
    { fr: "chapeau", en: "hat", es: "sombrero", de: "Hut", zh: "帽子", ru: "шляпа" },
    { fr: "manteau", en: "coat", es: "abrigo", de: "Mantel", zh: "大衣", ru: "пальто" },
    { fr: "écharpe", en: "scarf", es: "bufanda", de: "Schal", zh: "围巾", ru: "шарф" },
    { fr: "gants", en: "gloves", es: "guantes", de: "Handschuhe", zh: "手套", ru: "перчатки" },
    { fr: "chaussettes", en: "socks", es: "calcetines", de: "Socken", zh: "袜子", ru: "носки" },
    { fr: "chat", en: "cat", es: "gato", de: "Katze", zh: "猫", ru: "кот" },
    { fr: "chien", en: "dog", es: "perro", de: "Hund", zh: "狗", ru: "собака" },
    { fr: "oiseau", en: "bird", es: "pájaro", de: "Vogel", zh: "鸟", ru: "птица" },
    { fr: "poisson", en: "fish", es: "pez", de: "Fisch", zh: "鱼", ru: "рыба" },
    { fr: "cheval", en: "horse", es: "caballo", de: "Pferd", zh: "马", ru: "лошадь" },
    { fr: "vache", en: "cow", es: "vaca", de: "Kuh", zh: "牛", ru: "корова" },
    { fr: "mouton", en: "sheep", es: "oveja", de: "Schaf", zh: "羊", ru: "овца" },
    { fr: "cochon", en: "pig", es: "cerdo", de: "Schwein", zh: "猪", ru: "свинья" },
    { fr: "lapin", en: "rabbit", es: "conejo", de: "Kaninchen", zh: "兔子", ru: "кролик" },
    { fr: "loup", en: "wolf", es: "lobo", de: "Wolf", zh: "狼", ru: "волк" },
    { fr: "médecin", en: "doctor", es: "médico", de: "Arzt", zh: "医生", ru: "врач" },
    { fr: "enseignant", en: "teacher", es: "profesor", de: "Lehrer", zh: "老师", ru: "учитель" },
    { fr: "avocat", en: "lawyer", es: "abogado", de: "Anwalt", zh: "律师", ru: "адвокат" },
    { fr: "ingénieur", en: "engineer", es: "ingeniero", de: "Ingenieur", zh: "工程师", ru: "инженер" },
    { fr: "policier", en: "policeman", es: "policía", de: "Polizist", zh: "警察", ru: "полицейский" },
    { fr: "pompier", en: "firefighter", es: "bombero", de: "Feuerwehrmann", zh: "消防员", ru: "пожарный" },
    { fr: "cuisinier", en: "cook", es: "cocinero", de: "Koch", zh: "厨师", ru: "повар" },
    { fr: "artiste", en: "artist", es: "artista", de: "Künstler", zh: "艺术家", ru: "художник" },
    { fr: "musicien", en: "musician", es: "músico", de: "Musiker", zh: "音乐家", ru: "музыкант" },
    { fr: "écrivain", en: "writer", es: "escritor", de: "Schriftsteller", zh: "作家", ru: "писатель" },
    { fr: "pluie", en: "rain", es: "lluvia", de: "Regen", zh: "雨", ru: "дождь" },
    { fr: "neige", en: "snow", es: "nieve", de: "Schnee", zh: "雪", ru: "снег" },
    { fr: "vent", en: "wind", es: "viento", de: "Wind", zh: "风", ru: "ветер" },
    { fr: "brouillard", en: "fog", es: "niebla", de: "Nebel", zh: "雾", ru: "туман" },
    { fr: "orage", en: "storm", es: "tormenta", de: "Sturm", zh: "暴风雨", ru: "шторм" },
    { fr: "nuage", en: "cloud", es: "nube", de: "Wolke", zh: "云", ru: "облако" },
    { fr: "glace", en: "ice", es: "hielo", de: "Eis", zh: "冰", ru: "лед" },
    { fr: "chaleur", en: "heat", es: "calor", de: "Hitze", zh: "热", ru: "жара" },
    { fr: "froid", en: "cold", es: "frío", de: "Kälte", zh: "冷", ru: "холод" },
    { fr: "ordinateur", en: "computer", es: "computadora", de: "Computer", zh: "电脑", ru: "компьютер" },
    { fr: "téléphone", en: "phone", es: "teléfono", de: "Telefon", zh: "电话", ru: "телефон" },
    { fr: "internet", en: "internet", es: "internet", de: "Internet", zh: "互联网", ru: "интернет" },
    { fr: "écran", en: "screen", es: "pantalla", de: "Bildschirm", zh: "屏幕", ru: "экран" },
    { fr: "clavier", en: "keyboard", es: "teclado", de: "Tastatur", zh: "键盘", ru: "клавиатура" },
    { fr: "souris", en: "mouse", es: "ratón", de: "Maus", zh: "鼠标", ru: "мышь" },
    { fr: "batterie", en: "battery", es: "batería", de: "Batterie", zh: "电池", ru: "батарея" },
    { fr: "câble", en: "cable", es: "cable", de: "Kabel", zh: "电缆", ru: "кабель" },
    { fr: "photo", en: "photo", es: "foto", de: "Foto", zh: "照片", ru: "фото" },
    { fr: "vidéo", en: "video", es: "video", de: "Video", zh: "视频", ru: "видео" },
    { fr: "football", en: "football", es: "fútbol", de: "Fußball", zh: "足球", ru: "футбол" },
    { fr: "basketball", en: "basketball", es: "baloncesto", de: "Basketball", zh: "篮球", ru: "баскетбол" },
    { fr: "tennis", en: "tennis", es: "tenis", de: "Tennis", zh: "网球", ru: "теннис" },
    { fr: "natation", en: "swimming", es: "natación", de: "Schwimmen", zh: "游泳", ru: "плавание" },
    { fr: "course", en: "running", es: "carrera", de: "Laufen", zh: "跑步", ru: "бег" },
    { fr: "boxe", en: "boxing", es: "boxeo", de: "Boxen", zh: "拳击", ru: "бокс" },
    { fr: "yoga", en: "yoga", es: "yoga", de: "Yoga", zh: "瑜伽", ru: "йога" },
    { fr: "vélo", en: "bike", es: "bicicleta", de: "Fahrrad", zh: "自行车", ru: "велосипед" },
    { fr: "ski", en: "ski", es: "esquí", de: "Ski", zh: "滑雪", ru: "лыжи" },
    { fr: "athlétisme", en: "athletics", es: "atletismo", de: "Leichtathletik", zh: "田径", ru: "атлетика" },
    { fr: "piano", en: "piano", es: "piano", de: "Klavier", zh: "钢琴", ru: "фортепиано" },
    { fr: "guitare", en: "guitar", es: "guitarra", de: "Gitarre", zh: "吉他", ru: "гитара" },
    { fr: "violon", en: "violin", es: "violín", de: "Geige", zh: "小提琴", ru: "скрипка" },
    { fr: "tambour", en: "drum", es: "tambor", de: "Trommel", zh: "鼓", ru: "барабан" },
    { fr: "chanson", en: "song", es: "canción", de: "Lied", zh: "歌曲", ru: "песня" },
    { fr: "musique", en: "music", es: "música", de: "Musik", zh: "音乐", ru: "музыка" },
    { fr: "chanteur", en: "singer", es: "cantante", de: "Sänger", zh: "歌手", ru: "певец" },
    { fr: "orchestre", en: "orchestra", es: "orquesta", de: "Orchester", zh: "管弦乐队", ru: "оркестр" },
    { fr: "concert", en: "concert", es: "concierto", de: "Konzert", zh: "音乐会", ru: "концерт" },
    { fr: "note", en: "note", es: "nota", de: "Note", zh: "音符", ru: "нота" },
    { fr: "livre", en: "book", es: "libro", de: "Buch", zh: "书", ru: "книга" },
    { fr: "stylo", en: "pen", es: "bolígrafo", de: "Kugelschreiber", zh: "笔", ru: "ручка" },
    { fr: "cahier", en: "notebook", es: "cuaderno", de: "Notizbuch", zh: "笔记本", ru: "тетрадь" },
    { fr: "crayon", en: "pencil", es: "lápiz", de: "Bleistift", zh: "铅笔", ru: "карандаш" },
    { fr: "gomme", en: "eraser", es: "borrador", de: "Radiergummi", zh: "橡皮", ru: "ластик" },
    { fr: "règle", en: "ruler", es: "regla", de: "Lineal", zh: "尺子", ru: "линейка" },
    { fr: "sac", en: "bag", es: "mochila", de: "Tasche", zh: "包", ru: "сумка" },
    { fr: "bureau", en: "desk", es: "escritorio", de: "Schreibtisch", zh: "桌子", ru: "стол" },
    { fr: "tableau", en: "board", es: "pizarra", de: "Tafel", zh: "黑板", ru: "доска" },
    { fr: "élève", en: "student", es: "estudiante", de: "Schüler", zh: "学生", ru: "студент" }
];

// --- PHRASES COURTES POUR LA TRADUCTION (FR <-> EN, max 6 mots) ---
const LANG_PHRASES = [
    ["Comment allez-vous ?", "How are you?", "¿Cómo está?", "Wie geht es Ihnen?", "您好吗？", "Как поживаете?"],
    ["Je vais très bien.", "I am very well.", "Estoy muy bien.", "Mir geht es sehr gut.", "我很好。", "Я чувствую себя очень хорошо."],
    ["Où est la gare ?", "Where is the station?", "¿Dónde está la estación?", "Wo ist der Bahnhof?", "车站在哪里？", "Где вокзал?"],
    ["Je cherche mon chemin.", "I am looking for directions.", "Estoy buscando direcciones.", "Ich suche den Weg.", "我在找路。", "Я ищу дорогу."],
    ["Combien cela coûte ?", "How much does it cost?", "¿Cuánto cuesta?", "Was kostet das?", "多少钱？", "Сколько это стоит?"],
    ["Je voudrais de l'eau.", "I would like some water.", "Quisiera agua.", "Ich möchte etwas Wasser.", "我要点水。", "Я бы хотел воды."],
    ["Pouvez-vous m'aider ?", "Can you help me?", "¿Puede ayudarme?", "Können Sie mir helfen?", "你能帮我吗？", "Вы можете мне помочь?"],
    ["Je ne comprends pas.", "I do not understand.", "No entiendo.", "Ich verstehe nicht.", "我不明白。", "Я не понимаю."],
    ["Parlez plus lentement, s'il vous plaît.", "Please speak more slowly.", "Hable más despacio, por favor.", "Bitte sprechen Sie langsamer.", "请说慢一点。", "Пожалуйста, говорите медленнее."],
    ["Le bus est en retard.", "The bus is late.", "El autobús se retrasa.", "Der Bus hat Verspätung.", "公交车晚点了。", "Автобус опаздывает."],
    ["Nous sommes presque arrivés.", "We are almost there.", "Ya casi llegamos.", "Wir sind fast da.", "我们快到了。", "Мы почти приехали."],
    ["Je reviens tout de suite.", "I will be right back.", "Vuelvo enseguida.", "Ich komme gleich zurück.", "我马上回来。", "Я сейчас вернусь."],
    ["Fermez la porte, s'il vous plaît.", "Please close the door.", "Cierre la puerta, por favor.", "Bitte schließen Sie die Tür.", "请关上门。", "Пожалуйста, закройте дверь."],
    ["Ouvre la fenêtre, s'il te plaît.", "Please open the window.", "Abre la ventana, por favor.", "Bitte öffne das Fenster.", "请打开窗户。", "Пожалуйста, откройте окно."],
    ["Le magasin est fermé.", "The shop is closed.", "La tienda está cerrada.", "Das Geschäft ist geschlossen.", "商店关门了。", "Магазин закрыт."],
    ["La réunion commence maintenant.", "The meeting starts now.", "La reunión comienza ahora.", "Das Meeting beginnt jetzt.", "会议现在开始。", "Встреча начинается сейчас."],
    ["Je suis en route.", "I am on my way.", "Estoy en camino.", "Ich bin unterwegs.", "我在路上。", "Я в пути."],
    ["Nous devons partir tôt.", "We must leave early.", "Debemos irnos temprano.", "Wir müssen früh los.", "我们必须早点走。", "Нам нужно уйти рано."],
    ["Elle a perdu ses clés.", "She has lost her keys.", "Ella ha perdido sus llaves.", "Sie hat ihre Schlüssel verloren.", "她丢了钥匙。", "Она потеряла ключи."],
    ["J'ai oublié mon téléphone.", "I forgot my phone.", "Olvidé mi teléfono.", "Ich habe mein Telefon vergessen.", "我忘了带手机。", "Я забыл телефон."],
    ["Il pleut depuis ce matin.", "It has been raining since morning.", "Llueve desde esta mañana.", "Es regnet seit heute Morgen.", "今天早上下雨。", "Дождь идет с утра."],
    ["Le soleil brille aujourd'hui.", "The sun is shining today.", "El sol brilla hoy.", "Die Sonne scheint heute.", "今天阳光明媚。", "Сегодня светит солнце."],
    ["Ce repas est délicieux.", "This meal is delicious.", "Esta comida está deliciosa.", "Dieses Essen ist köstlich.", "这顿饭很美味。", "Этот обед вкусный."],
    ["Je préfère le thé.", "I prefer tea.", "Prefiero el té.", "Ich bevorzuge Tee.", "我喜欢茶。", "Я предпочитаю чай."],
    ["Nous étudions ensemble.", "We study together.", "Estudiamos juntos.", "Wir lernen gemeinsam.", "我们一起学习。", "Мы учимся вместе."],
    ["Il faut faire attention.", "You must be careful.", "Hay que tener cuidado.", "Man muss aufpassen.", "必须小心。", "Нужно быть осторожным."],
    ["Je suis d'accord avec vous.", "I agree with you.", "Estoy de acuerdo con usted.", "Ich bin Ihrer Meinung.", "我同意你。", "Я согласен с вами."],
    ["Ce n'est pas nécessaire.", "It is not necessary.", "No es necesario.", "Das ist nicht notwendig.", "这不是必要的。", "Это не нужно."],
    ["Je voudrais réserver une chambre.", "I would like to book a room.", "Quisiera reservar una habitación.", "Ich möchte ein Zimmer buchen.", "我要订一间房。", "Я бы хотел забронировать номер."],
    ["Avez-vous une table libre ?", "Do you have a table available?", "¿Tiene una mesa libre?", "Haben Sie einen freien Tisch?", "你有空桌子吗？", "У вас есть свободный стол?"],
    ["Le train arrive bientôt.", "The train arrives soon.", "El tren llega pronto.", "Der Zug kommt gleich.", "火车马上就到。", "Поезд скоро приедет."],
    ["Attendez-moi ici, s'il vous plaît.", "Please wait for me here.", "Espéreme aquí, por favor.", "Bitte warten Sie hier auf mich.", "请在这里等我。", "Пожалуйста, ждите меня здесь."],
    ["Je travaille depuis lundi.", "I have been working since Monday.", "Trabajo desde el lunes.", "Ich arbeite seit Montag.", "我从周一开始工作。", "Я работаю с понедельника."],
    ["Elle parle trois langues.", "She speaks three languages.", "Ella habla tres idiomas.", "Sie spricht drei Sprachen.", "她说三种语言。", "Она говорит на трех языках."],
    ["Nous cherchons une solution.", "We are looking for a solution.", "Buscamos una solución.", "Wir suchen eine Lösung.", "我们在找解决方案。", "Мы ищем решение."],
    ["Le dossier est prêt.", "The file is ready.", "El expediente está listo.", "Die Akte ist bereit.", "文件准备好了。", "Дело готово."],
    ["Envoyez-moi le document demain.", "Send me the document tomorrow.", "Envíeme el documento mañana.", "Schicken Sie mir das Dokument morgen.", "明天把文件发给我。", "Пришлите мне документ завтра."],
    ["Je vous rappellerai demain matin.", "I will call you tomorrow morning.", "Le llamaré mañana por la mañana.", "Ich rufe Sie morgen früh an.", "我明早给你打电话。", "Я перезвоню вам утром."],
    ["Il a beaucoup progressé.", "He has made great progress.", "Ha progresado mucho.", "Er hat große Fortschritte gemacht.", "他进步很大。", "Он добился больших успехов."],
    ["N'oubliez pas votre rendez-vous.", "Do not forget your appointment.", "No olvide su cita.", "Vergessen Sie Ihren Termin nicht.", "不要忘记你的预约。", "Не забудьте о своей встрече."],
    ["La route est très longue.", "The road is very long.", "El camino es muy largo.", "Die Straße ist sehr lang.", "这条路很长。", "Дорога очень длинная."],
    ["Le travail est presque terminé.", "The work is almost finished.", "El trabajo está casi terminado.", "Die Arbeit ist fast fertig.", "工作快完成了。", "Работа почти завершена."],
    ["Je dois vérifier les chiffres.", "I must check the figures.", "Debo verificar las cifras.", "Ich muss die Zahlen überprüfen.", "我必须核对数字。", "Я должен проверить цифры."],
    ["Cette idée mérite réflexion.", "This idea deserves consideration.", "Esta idea merece consideración.", "Diese Idee verdient Beachtung.", "这个想法值得考虑。", "Эта идея заслуживает внимания."],
    ["Nous avons besoin de temps.", "We need some time.", "Necesitamos tiempo.", "Wir brauchen Zeit.", "我们需要时间。", "Нам нужно время."],
    ["Elle est arrivée en avance.", "She arrived early.", "Ella llegó temprano.", "Sie ist früher gekommen.", "她早到了。", "Она пришла раньше."],
    ["Il a choisi la bonne réponse.", "He chose the correct answer.", "Él escogió la respuesta correcta.", "Er hat die richtige Antwort gewählt.", "他选了正确答案。", "Он выбрал правильный ответ."],
    ["Pourquoi êtes-vous en retard ?", "Why are you late?", "¿Por qué llega tarde?", "Warum kommen Sie zu spät?", "你为什么迟到？", "Почему вы опоздали?"],
    ["Quand commence le cours ?", "When does the lesson start?", "¿Cuándo empieza la clase?", "Wann beginnt der Unterricht?", "课什么时候开始？", "Когда начинается урок?"],
    ["Qui a pris mon sac ?", "Who took my bag?", "¿Quién tomó mi bolsa?", "Wer hat meine Tasche genommen?", "谁拿了我的包？", "Кто взял мою сумку?"],
    ["Je peux essayer encore ?", "Can I try again?", "¿Puedo intentar de nuevo?", "Kann ich es noch einmal versuchen?", "我可以再试一次吗？", "Могу ли я попробовать еще раз?"],
    ["Tout dépend de la situation.", "It all depends on the situation.", "Todo depende de la situación.", "Es kommt auf die Situation an.", "这全取决于情况。", "Все зависит от ситуации."],
    ["Le marché ouvre à huit heures.", "The market opens at eight.", "El mercado abre a las ocho.", "Der Markt öffnet um acht.", "市场八点开门。", "Рынок открывается в восемь."],
    ["Nous irons demain matin.", "We will go tomorrow morning.", "Iremos mañana por la mañana.", "Wir gehen morgen früh.", "我们明早去。", "Мы пойдем завтра утром."],
    ["Je voudrais apprendre davantage.", "I would like to learn more.", "Me gustaría aprender más.", "Ich möchte mehr lernen.", "我想学更多。", "Я хочу узнать больше."],
    ["Elle ne travaille pas dimanche.", "She does not work on Sunday.", "Ella no trabaja el domingo.", "Sie arbeitet nicht sonntags.", "她周日不工作。", "Она не работает в воскресенье."],
    ["Bonjour, comment ça va ?", "Hello, how are you?", "Hola, ¿cómo estás?", "Hallo, wie geht es dir?", "你好，最近好吗？", "Здравствуйте, как дела?"],
    ["Au revoir et à bientôt.", "Goodbye and see you soon.", "Adiós y hasta pronto.", "Auf Wiedersehen und bis bald.", "再见，很快见。", "До свидания и до скорой встречи."],
    ["S'il vous plaît, aidez-moi.", "Please help me.", "Ayúdeme, por favor.", "Bitte helfen Sie mir.", "请帮帮我。", "Пожалуйста, помогите мне."],
    ["Merci beaucoup pour tout.", "Thank you very much.", "Muchas gracias por todo.", "Vielen Dank für alles.", "非常感谢一切。", "Большое спасибо за всё."],
    ["Je m'appelle Gilles.", "My name is Gilles.", "Me llamo Gilles.", "Ich heiße Gilles.", "我叫吉勒斯。", "Меня зовут Жиль."],
    ["Où habitez-vous ?", "Where do you live?", "¿Dónde vive?", "Wo wohnen Sie?", "你住在哪里？", "Где вы живете?"],
    ["J'habite à Paris.", "I live in Paris.", "Vivo en París.", "Ich wohne in Paris.", "我住在巴黎。", "Я живу в Париже."],
    ["Quel temps fait-il ?", "What is the weather like?", "¿Qué tiempo hace?", "Wie ist das Wetter?", "天气怎么样？", "Какая погода?"],
    ["Il fait beau aujourd'hui.", "It is nice weather today.", "Hace buen tiempo hoy.", "Das Wetter ist schön heute.", "今天天气很好。", "Сегодня хорошая погода."],
    ["Quelle heure est-il ?", "What time is it?", "¿Qué hora es?", "Wie spät ist es?", "现在几点？", "Который час?"],
    ["Il est dix heures.", "It is ten o'clock.", "Son las diez.", "Es ist zehn Uhr.", "现在十点。", "Сейчас десять часов."],
    ["Quel est votre nom ?", "What is your name?", "¿Cuál es su nombre?", "Wie ist Ihr Name?", "你叫什么名字？", "Как вас зовут?"],
    ["Mon nom est Marie.", "My name is Marie.", "Mi nombre es Marie.", "Ich heiße Marie.", "我叫玛丽。", "Меня зовут Мария."],
    ["Combien de personnes ?", "How many people?", "¿Cuántas personas?", "Wie viele Personen?", "多少人？", "Сколько человек?"],
    ["Nous sommes quatre.", "We are four people.", "Somos cuatro.", "Wir sind vier.", "我们四个人。", "Мы четверо."],
    ["Où sont les toilettes ?", "Where are the toilets?", "¿Dónde están los baños?", "Wo sind die Toiletten?", "洗手间在哪里？", "Где туалет?"],
    ["Les toilettes sont là-bas.", "The toilets are over there.", "Los baños están allí.", "Die Toiletten sind dort.", "洗手间在那里。", "Туалет там."],
    ["Je voudrais payer l'addition.", "I would like to pay the bill.", "Quisiera pagar la cuenta.", "Ich möchte bezahlen.", "我要结账。", "Я хочу заплатить счет."],
    ["L'addition, s'il vous plaît.", "The bill, please.", "La cuenta, por favor.", "Die Rechnung, bitte.", "买单，请。", "Счет, пожалуйста."],
    ["C'est combien ?", "How much is it?", "¿Cuánto cuesta?", "Wie viel kostet das?", "多少钱？", "Сколько стоит?"],
    ["C'est dix euros.", "It is ten euros.", "Son diez euros.", "Es zehn Euro.", "是十欧元。", "Это десять евро."],
    ["Je prends un café.", "I am having a coffee.", "Tomo un café.", "Ich trinke einen Kaffee.", "我喝咖啡。", "Я пью кофе."],
    ["Un café, s'il vous plaît.", "A coffee, please.", "Un café, por favor.", "Einen Kaffee, bitte.", "一杯咖啡，请。", "Кофе, пожалуйста."],
    ["Où est l'hôtel ?", "Where is the hotel?", "¿Dónde está el hotel?", "Wo ist das Hotel?", "酒店在哪里？", "Где отель?"],
    ["L'hôtel est près d'ici.", "The hotel is near here.", "El hotel está cerca de aquí.", "Das Hotel ist in der Nähe.", "酒店离这里近。", "Отель рядом."],
    ["Je suis perdu.", "I am lost.", "Estoy perdido.", "Ich habe mich verlaufen.", "我迷路了。", "Я заблудился."],
    ["Pouvez-vous me montrer ?", "Can you show me?", "¿Puede mostrarme?", "Können Sie mir zeigen?", "你能给我看看吗？", "Вы можете показать мне?"],
    ["Tournez à droite.", "Turn right.", "Gire a la derecha.", "Biegen Sie rechts ab.", "向右转。", "Поверните направо."],
    ["Tournez à gauche.", "Turn left.", "Gire a la izquierda.", "Biegen Sie links ab.", "向左转。", "Поверните налево."],
    ["Allez tout droit.", "Go straight ahead.", "Siga recto.", "Gehen Sie geradeaus.", "直走。", "Идите прямо."],
    ["Arrêtez-vous ici.", "Stop here.", "Párese aquí.", "Halten Sie hier an.", "在这里停下。", "Остановитесь здесь."],
    ["Je veux acheter cela.", "I want to buy that.", "Quiero comprar eso.", "Ich möchte das kaufen.", "我想买那个。", "Я хочу купить это."],
    ["C'est trop cher.", "It is too expensive.", "Es demasiado caro.", "Das ist zu teuer.", "这太贵了。", "Это слишком дорого."],
    ["Avez-vous cela en rouge ?", "Do you have this in red?", "¿Tiene esto en rojo?", "Haben Sie das in Rot?", "你有红色的吗？", "У вас есть это в красном?"],
    ["Je cherche une chemise.", "I am looking for a shirt.", "Busco una camisa.", "Ich suche ein Hemd.", "我在找一件衬衫。", "Я ищу рубашку."],
    ["La taille est trop petite.", "The size is too small.", "La talla es demasiado pequeña.", "Die Größe ist zu klein.", "尺寸太小了。", "Размер слишком мал."],
    ["Je peux essayer ?", "Can I try it on?", "¿Puedo probármelo?", "Kann ich es anprobieren?", "我可以试穿吗？", "Могу примерить?"],
    ["Les cabines sont là-bas.", "The fitting rooms are over there.", "Los probadores están allí.", "Die Umkleidekabinen sind dort.", "试衣间在那里.", "Раздевалки там."]
];

// Phrases à syntaxe soutenue : les niveaux sont affectés explicitement pour
// que les formes verbales, subordonnées et nuances avancées restent en haut.
const LANG_ADVANCED_PHRASES = [
    ["difficile", "Je n'avais pas encore compris ce qu'il voulait dire.", "I had not yet understood what he meant.", "Todavía no había entendido lo que quería decir.", "Ich hatte noch nicht verstanden, was er meinte.", "我还没明白他想表达什么。", "Я еще не понял, что он имел в виду."],
    ["difficile", "Depuis combien de temps attendiez-vous que le train arrive ?", "How long had you been waiting for the train to arrive?", "¿Cuánto tiempo llevaba esperando que llegara el tren?", "Wie lange hatten Sie auf den Zug gewartet?", "你等火车等了多久？", "Как долго вы ждали поезд?"],
    ["difficile", "Elle aurait accepté si on lui avait expliqué les conséquences.", "She would have accepted if we had explained the consequences to her.", "Ella habría aceptado si le hubiéramos explicado las consecuencias.", "Sie hätte angenommen, wenn wir ihr die Folgen erklärt hätten.", "如果我们向她解释后果，她本会接受。", "Она бы согласилась, если бы мы объяснили ей последствия."],
    ["difficile", "Il est peu probable qu'ils aient terminé avant midi.", "It is unlikely that they will have finished before noon.", "Es poco probable que hayan terminado antes del mediodía.", "Es unwahrscheinlich, dass sie vor Mittag fertig sein werden.", "不太可能他们中午前完成。", "Вряд ли они закончат до полудня."],
    ["difficile", "Ce n'est pas la première fois qu'il oublie de nous prévenir.", "This is not the first time he has forgotten to let us know.", "No es la primera vez que se olvida de avisarnos.", "Es ist nicht das erste Mal, dass er vergisst, uns Bescheid zu sagen.", "这不是他第一次忘了通知我们。", "Это не первый раз, когда он забыл нас предупредить."],
    ["difficile", "Pourquoi ne leur avez-vous pas demandé s'ils pouvaient rester ?", "Why didn't you ask them whether they could stay?", "¿Por qué no les preguntó si podían quedarse?", "Warum hast du sie nicht gefragt, ob sie bleiben könnten?", "你为什么不问他们能否留下？", "Почему вы не спросили их, могут ли они остаться?"],
    ["difficile", "Le rapport doit être envoyé avant que le directeur ne revienne.", "The report must be sent before the director comes back.", "El informe debe enviarse antes de que el director regrese.", "Der Bericht muss abgeschickt werden, bevor der Direktor zurückkommt.", "报告必须在主任回来前发出。", "Отчёт должен быть отправлен до возвращения директора."],
    ["difficile", "Plus tôt vous partirez, moins vous risquez de manquer le train.", "The earlier you leave, the less likely you are to miss the train.", "Cuanto antes se vaya, menos probabilidades tendrá de perder el tren.", "Je früher Sie losfahren, desto geringer ist das Risiko, den Zug zu verpassen.", "你走得越早，错过火车的风险就越小。", "Чем раньше вы уйдете, тем меньше риск опоздать на поезд."],
    ["difficile", "Je croyais qu'ils étaient déjà partis quand tu les as appelés.", "I thought they had already left when you called them.", "Creía que ya se habían ido cuando les llamaste.", "Ich dachte, sie wären bereits gegangen, als du sie anriefst.", "我以为他们打电话时已经走了。", "Я думал, что они уже ушли, когда вы им позвонили."],
    ["difficile", "Depuis qu'il a déménagé, nous ne nous sommes pas revus.", "We have not seen each other since he moved.", "Desde que se mudó, no nos hemos vuelto a ver.", "Seit er umgezogen ist, haben wir uns nicht mehr gesehen.", "自从他搬家后，我们就没再见过面。", "Мы не виделись с тех пор, как он переехал."],
    ["difficile", "Aurais-tu le temps de m'expliquer ce qui a changé ?", "Would you have time to explain what has changed?", "¿Tendrías tiempo de explicarme qué ha cambiado?", "Hättest du Zeit, mir zu erklären, was sich geändert hat?", "你有时间解释一下变化了什么吗？", "У вас есть время объяснить, что изменилось?"],
    ["difficile", "Elle m'a demandé si je pouvais lui prêter le livre que j'avais acheté.", "She asked me whether I could lend her the book I had bought.", "Ella me preguntó si podía prestarle el libro que había comprado.", "Sie fragte mich, ob ich ihr das Buch, das ich gekauft hatte, leihen könne.", "她问我是否可以借她我买的书。", "Она спросила меня, могу ли я одолжить ей книгу, которую я купил."],
    ["difficile", "Les résultats seront publiés dès que le comité aura terminé son examen.", "The results will be published as soon as the committee has finished its review.", "Los resultados se publicarán tan pronto como el comité termine su examen.", "Die Ergebnisse werden veröffentlicht, sobald der Ausschuss seine Prüfung abgeschlossen hat.", "结果将在委员会审查结束后尽快公布。", "Результаты будут опубликованы, как только комитет закончит проверку."],
    ["difficile", "Je ne pensais pas que le trajet prendrait autant de temps.", "I did not think the journey would take so long.", "No pensé que el viaje tomaría tanto tiempo.", "Ich dachte nicht, dass die Reise so lange dauern würde.", "我没想到旅程会花这么长时间。", "Я не думал, что поездка займет столько времени."],
    ["difficile", "Pourquoi a-t-il fallu attendre que tout le monde soit parti ?", "Why did we have to wait until everyone had left?", "¿Por qué tuvimos que esperar hasta que todos se fueran?", "Warum mussten wir warten, bis alle gegangen waren?", "为什么我们必须等所有人都走后？", "Зачем нам пришлось ждать, пока все уйдут?"],
    ["difficile", "Elle aurait pu réussir si elle avait suivi les instructions.", "She could have succeeded if she had followed the instructions.", "Ella podría haber tenido éxito si hubiera seguido las instrucciones.", "Sie hätte Erfolg haben können, wenn sie den Anweisungen gefolgt wäre.", "如果她遵循了指示，她本可以成功。", "Она бы смогла преуспеть, если бы следовала инструкциям."],
    ["difficile", "À moins qu'il ne pleuve, nous commencerons à l'heure prévue.", "Unless it rains, we will start at the scheduled time.", "A menos que llueva, comenzaremos a la hora prevista.", "Es sei denn, es regnet, werden wir zur geplanten Zeit beginnen.", "除非下雨，否则我们将按时开始。", "Если не пойдет дождь, мы начнем в запланированное время."],
    ["difficile", "Je me demande si tu as eu le temps de lire le message que je t'ai envoyé.", "I wonder whether you had time to read the message I sent you.", "Me pregunto si tuvo tiempo de leer el mensaje que le envié.", "Ich frage mich, ob du Zeit hattest, die Nachricht zu lesen, die ich dir geschickt habe.", "我想知道你是否有时间读我发给你的消息。", "Интересно, успел ли ты прочитать сообщение, которое я тебе отправил."],
    ["difficile", "Le colis aurait dû arriver hier, mais personne n'a sonné.", "The parcel should have arrived yesterday, but nobody rang the bell.", "El paquete debería haber llegado ayer, pero nadie tocó el timbre.", "Das Paket hätte gestern ankommen sollen, aber niemand hat geklingelt.", "包裹本应昨天到，但没人按门铃。", "Посылка должна была прийти вчера, но никто не позвонил."],
    ["difficile", "Il a expliqué pourquoi la réunion avait été reportée sans prévenir les participants.", "He explained why the meeting had been postponed without notifying the participants.", "Él explicó por qué la reunión se había pospuesto sin notificar a los participantes.", "Er erklärte, warum das Meeting verschoben worden war, ohne die Teilnehmer zu benachrichtigen.", "他解释了为什么会议在没有通知参与者的情况下被推迟。", "Он объяснил, почему встреча была отложена без уведомления участников."],
    ["tres_difficile", "À peine avions-nous commencé qu'il s'est mis à pleuvoir.", "Hardly had we started when it began to rain.", "Apenas habíamos empezado cuando empezó a llover.", "Kaum hatten wir angefangen, fing es an zu regnen.", "我们刚开始就下雨了。", "Едва мы начали, как пошел дождь."],
    ["tres_difficile", "Je me demande ce qu'elle aurait répondu si tu le lui avais demandé.", "I wonder what she would have answered if you had asked her.", "Me pregunto qué habría respondido si se le hubiera preguntado.", "Ich frage mich, was sie geantwortet hätte, wenn du sie gefragt hättest.", "我想知道如果你问她，她会怎么回答。", "Интересно, что бы она ответила, если бы ты её спросил."],
    ["tres_difficile", "Bien qu'il ait reconnu son erreur, il refuse toujours de s'excuser.", "Although he has admitted his mistake, he still refuses to apologize.", "Aunque haya reconocido su error, todavía se niega a disculparse.", "Obwohl er seinen Fehler eingeräumt hat, weigert er sich immer noch, sich zu entschuldigen.", "虽然他承认了错误，但他仍拒绝道歉。", "Хотя он признал свою ошибку, он всё ещё отказывается извиняться."],
    ["tres_difficile", "Auriez-vous pu me dire pourquoi cette porte est restée ouverte ?", "Could you have told me why this door was left open?", "¿Podría haberme dicho por qué esta puerta quedó abierta?", "Hätten Sie mir sagen können, warum diese Tür offen gelassen wurde?", "你能告诉我为什么这扇门开着吗？", "Не могли бы вы сказать мне, почему эта дверь была открыта?"],
    ["tres_difficile", "Il faut que chacun puisse exprimer ce qu'il aurait préféré faire.", "Everyone must be able to express what they would have preferred to do.", "Todos deben poder expresar lo que habrían preferido hacer.", "Jeder muss in der Lage sein, auszudrücken, was er lieber getan hätte.", "每个人都必须能够表达他们本想做什么。", "Каждый должен иметь возможность выразить, чем бы он предпочел заниматься."],
    ["tres_difficile", "Ce n'est qu'en comparant les deux versions qu'on a repéré l'omission.", "It was only by comparing the two versions that we noticed the omission.", "Solo al comparar las dos versiones notamos la omisión.", "Erst durch den Vergleich der beiden Versionen bemerkten wir die Auslassung.", "只有通过比较两个版本，我们才注意到遗漏。", "Только сравнив две версии, мы заметили опускание."],
    ["tres_difficile", "Elle prétend ne pas avoir vu le message que je lui avais envoyé.", "She claims not to have seen the message I had sent her.", "Ella afirma no haber visto el mensaje que le había enviado.", "Sie behauptet, die Nachricht nicht gesehen zu haben, die ich ihr geschickt hatte.", "她声称没看过我发给她的消息。", "Она утверждает, что не видела сообщение, которое я ей прислал."],
    ["tres_difficile", "Qu'auriez-vous fait à ma place si vous aviez su la vérité ?", "What would you have done in my place if you had known the truth?", "¿Qué habría hecho usted en mi lugar si hubiera sabido la verdad?", "Was hätten Sie an meiner Stelle getan, wenn Sie die Wahrheit gekannt hätten?", "如果你知道真相，你会怎么做？", "Что бы вы сделали на моем месте, если бы знали правду?"],
    ["tres_difficile", "Si j'avais su qu'ils viendraient si tard, je ne les aurais pas attendus.", "If I had known they were coming so late, I would not have waited for them.", "Si hubiera sabido que venirían tan tarde, no los habría esperado.", "Wenn ich gewusst hätte, dass sie so spät kommen, hätte ich nicht auf sie gewartet.", "如果我知道他们会这么晚来，我就不会等他们了。", "Если бы я знал, что они придут так поздно, я бы не ждал их."],
    ["tres_difficile", "Elle aurait voulu que nous ayons terminé avant son retour.", "She would have wanted us to have finished before she returned.", "Ella habría querido que hubiéramos terminado antes de que ella regresara.", "Sie hätte gewollt, dass wir fertig sind, bevor sie zurückkommt.", "她希望我们在她回来前完成。", "Она хотела бы, чтобы мы закончили до её возвращения."],
    ["tres_difficile", "Il a beau prétendre qu'il n'en savait rien, son nom figure sur le document.", "Much as he claims he knew nothing about it, his name appears on the document.", "Por mucho que afirme que no sabía nada, su nombre figura en el documento.", "So sehr er auch behauptet, nichts davon gewusst zu haben, sein Name steht auf dem Dokument.", "尽管他声称一无所知，但他的名字出现在文件上。", "Как бы он ни утверждал, что ничего об этом не знал, его имя указано в документе."],
    ["tres_difficile", "À moins que vous n'ayez une meilleure proposition, nous garderons celle-ci.", "Unless you have a better proposal, we will keep this one.", "A menos que tenga una propuesta mejor, guardaremos esta.", "Es sei denn, Sie haben einen besseren Vorschlag, werden wir diesen behalten.", "除非你有更好的提议，否则我们保留这个。", "Если у вас нет лучшего предложения, мы оставим это."],
    ["tres_difficile", "Ce que je lui reproche, ce n'est pas d'être parti, mais de n'avoir rien dit.", "What I blame him for is not leaving, but saying nothing.", "Lo que le reprocho no es que se haya ido, sino no haber dicho nada.", "Was ich ihm vorwerfe, ist nicht, dass er gegangen ist, sondern, dass er nichts gesagt hat.", "我责备他并不是因为他走了，而是因为他什么都没说。", "То, в чем я виню его, — не то, что он ушел, а то, что он ничего не сказал."],
    ["tres_difficile", "Quand elle a enfin répondu, j'avais déjà envoyé le formulaire.", "By the time she finally replied, I had already sent the form.", "Cuando ella finalmente respondió, ya había enviado el formulario.", "Als sie endlich antwortete, hatte ich das Formular bereits abgeschickt.", "当她终于回复时，我已经发送了表格。", "К тому времени, как она наконец ответила, я уже отправил форму."],
    ["tres_difficile", "Ils auraient dû vérifier si les données avaient été correctement sauvegardées.", "They should have checked whether the data had been saved correctly.", "Deberían haber verificado si los datos se habían guardado correctamente.", "Sie hätten prüfen müssen, ob die Daten korrekt gespeichert worden waren.", "他们本应检查数据是否已正确保存。", "Им следовало проверить, были ли данные правильно сохранены."],
    ["tres_difficile", "Pourquoi faudrait-il que je fasse semblant de ne pas comprendre ?", "Why should I have to pretend not to understand?", "¿Por qué tendría que fingir que no entiendo?", "Warum sollte ich so tun, als ob ich nicht verstünde?", "为什么我要假装不明白？", "Зачем мне притворяться, что я не понимаю?"],
    ["tres_difficile", "Nous ignorions que la route avait été fermée depuis la veille.", "We did not know the road had been closed since the previous day.", "Ignorábamos que la carretera había estado cerrada desde el día anterior.", "Wir wussten nicht, dass die Straße seit dem Vortag gesperrt war.", "我们不知道路从前一天起就封闭了。", "Мы не знали, что дорога была закрыта с предыдущего дня."],
    ["tres_difficile", "Il semble qu'elle ait oublié ce qu'elle était venue chercher.", "It seems she has forgotten what she came to look for.", "Parece que ella ha olvidado lo que vino a buscar.", "Es scheint, als hätte sie vergessen, wonach sie gekommen war.", "似乎她忘了自己来找什么。", "Похоже, она забыла, зачем пришла."],
    ["tres_difficile", "Quel que soit le résultat, nous aurons appris quelque chose.", "Whatever the result, we will have learned something.", "Cualquiera que sea el resultado, habremos aprendido algo.", "Was auch immer das Ergebnis sein mag, wir werden etwas gelernt haben.", "无论结果如何，我们都会学到东西。", "Какой бы ни был результат, мы чему-то научимся."],
    ["tres_difficile", "Tu aurais mieux fait de lui dire ce que tu avais découvert.", "You would have been better off telling him what you had found out.", "Habría sido mejor que le dijeras lo que habías descubierto.", "Du wärst besser dran, ihm zu sagen, was du herausgefunden hattest.", "你最好告诉他你发现了什么。", "Тебе стоило бы сказать ему, что ты узнал."],
    ["master", "Fût-il mieux préparé, il ne pourrait pas prévoir tout ce qui risque de se produire.", "Even if he were better prepared, he could not foresee everything that might happen.", "Incluso si estuviera mejor preparado, no podría prever todo lo que podría suceder.", "Selbst wenn er besser vorbereitet wäre, könnte er nicht alles vorhersehen, was passieren könnte.", "即使他准备得更好，他也无法预见一切可能发生的事情。", "Даже если бы он был лучше подготовлен, он не смог бы предсказать всё, что может случиться."],
    ["master", "Encore aurait-il fallu qu'ils nous préviennent avant de changer les règles.", "They would still have had to let us know before changing the rules.", "Todavía habrían tenido que informarnos antes de cambiar las reglas.", "Sie hätten uns trotzdem vor der Änderung der Regeln informieren müssen.", "他们改变规则之前仍然应该通知我们。", "Они всё равно должны были уведомить нас перед изменением правил."],
    ["master", "Ce n'est qu'une fois qu'elle eut relu le témoignage qu'elle en comprit la portée.", "Only after she had reread the testimony did she understand its implications.", "Solo después de que ella releyó el testimonio entendió sus implicaciones.", "Erst nachdem sie das Zeugnis noch einmal gelesen hatte, verstand sie dessen Tragweite.", "只有在她重读证词后，她才明白其含义。", "Только после того, как она перечитала показания, она поняла их значение."],
    ["master", "Qui que vous soyez, vous devrez justifier pourquoi vous avez gardé le silence.", "Whoever you are, you will have to explain why you stayed silent.", "Quienquiera que seas, tendrás que justificar por qué guardaste silencio.", "Wer auch immer Sie sind, Sie werden erklären müssen, warum Sie geschwiegen haben.", "无论你是谁，你都必须解释为什么保持沉默。", "Кем бы вы ни были, вам придется объяснить, почему вы молчали."],
    ["master", "Il n'en demeure pas moins que la décision aurait pu être prise autrement.", "The fact remains that the decision could have been made differently.", "No obstante, la decisión podría haberse tomado de otra manera.", "Dennoch bliebe dabei, dass die Entscheidung anders hätte getroffen werden können.", "无论如何，决定本可以做出不同。", "Тем не менее, решение могло быть принято иначе."],
    ["master", "Si tant est qu'il ait réellement promis de revenir, personne ne l'a entendu.", "If indeed he really promised to come back, nobody heard him.", "Si realmente prometió regresar, nadie lo oyó.", "Wenn er wirklich versprochen hat, zurückzukommen, hat es niemand gehört.", "如果他确实承诺过要回来，没人听到。", "Если он действительно пообещал вернуться, никто этого не слышал."],
    ["master", "Non qu'elle ait voulu contester leur choix, mais elle souhaitait en comprendre les raisons.", "Not that she wanted to challenge their choice, but she wanted to understand their reasons.", "No es que ella quisiera impugnar su elección, sino que quería entender las razones.", "Nicht, dass sie ihre Wahl anfechten wollte, aber sie wollte die Gründe verstehen.", "她不是想质疑他们的选择，而是想了解原因。", "Она не хотела оспаривать их выбор, она хотела понять причины."],
    ["master", "À quoi bon prétendre que vous l'auriez reconnu si vous ne l'aviez jamais rencontré ?", "What is the point of claiming you would have recognized him if you had never met him?", "¿De qué sirve pretender que lo habrías reconocido si nunca lo habías conocido?", "Wozu dient es zu behaupten, Sie hätten ihn erkannt, wenn Sie ihn nie getroffen hätten?", "如果你从未见过他，声称你会认出他有什么意义？", "Зачем утверждать, что вы бы узнали его, если никогда его не встречали?"],
    ["master", "Il assiste à la conférence sans intervenir.", "He attends the conference without taking part.", "Asiste a la conferencia sin participar.", "Er nimmt an der Konferenz teil, ohne sich zu beteiligen.", "他参加会议但不发言。", "Он присутствует на конференции, не участвуя."],
    ["master", "Je suis actuellement en train de vérifier le dossier.", "I am currently checking the file.", "Actualmente estoy verificando el expediente.", "Ich überprüfe derzeit die Akte.", "我正在审查档案。", "Я сейчас проверяю дело."],
    ["master", "Cette solution est sensée, mais le problème reste sensible.", "This solution is sensible, but the issue remains sensitive.", "Esta solución es sensata, pero el problema sigue siendo delicado.", "Diese Lösung ist vernünftig, aber die Frage bleibt heikel.", "这个解决方案是明智的，但问题仍然敏感。", "Это разумное решение, но вопрос остается деликатным."],
    ["master", "Il a finalement accepté la proposition, bien qu'il ait d'abord prétendu le contraire.", "He eventually accepted the proposal, although he had initially claimed otherwise.", "Finalmente aceptó la propuesta, aunque al principio afirmó lo contrario.", "Er hat den Vorschlag schließlich angenommen, obwohl er zunächst das Gegenteil behauptet hatte.", "他最终接受了提案，尽管他起初声称相反。", "Он в конечном итоге принял предложение, хотя сначала утверждал обратное."],
    ["master", "Si nous avions su qu'elle viendrait, nous aurions attendu.", "If we had known she was coming, we would have waited.", "Si hubiéramos sabido que ella vendría, habríamos esperado.", "Wenn wir gewusst hätten, dass sie kommt, hätten wir gewartet.", "如果我们知道她会来，我们就会等。", "Если бы мы знали, что она придет, мы бы подождали."],
    ["master", "À peine avaient-ils commencé qu'une autre difficulté surgit.", "Hardly had they started when another difficulty arose.", "Apenas habían empezado cuando surgió otra dificultad.", "Kaum hatten sie begonnen, als eine weitere Schwierigkeit auftrat.", "他们刚开始就又遇到困难。", "Едва они начали, как возникла другая трудность."],
    ["master", "Encore faut-il que les témoins puissent confirmer ce qu'ils ont déclaré.", "The witnesses still need to be able to confirm what they said.", "Aún hace falta que los testigos puedan confirmar lo que declararon.", "Es noch erforderlich, dass die Zeugen bestätigen können, was sie ausgesagt haben.", "证人仍需能够确认他们的陈述。", "Все ещё необходимо, чтобы свидетели могли подтвердить свои показания."],
    ["master", "Si complexe qu'elle paraisse, la règle ne souffre aucune exception.", "However complex it may seem, the rule allows no exceptions.", "Por compleja que parezca, la regla no admite excepciones.", "So komplex sie auch erscheinen mag, die Regel kennt keine Ausnahmen.", "无论规则看起来多么复杂，都不允许例外。", "Как бы сложным оно ни казалось, правило не допускает исключений."],
    ["master", "Eût-elle été avertie plus tôt, elle n'aurait sans doute pas pris la même décision.", "Had she been warned earlier, she probably would not have made the same decision.", "Si la hubieran advertido más temprano, probablemente no habría tomado la misma decisión.", "Wäre sie früher gewarnt worden, hätte sie wahrscheinlich nicht dieselbe Entscheidung getroffen.", "如果她早些被警告，她可能就不会做出同样的决定。", "Если бы её предупредили раньше, она, вероятно, не приняла бы того же решения."],
    ["master", "À supposer qu'il se soit trompé, cela ne justifierait pas qu'on l'exclue.", "Even assuming he was wrong, that would not justify excluding him.", "Incluso suponiendo que se equivocara, eso no justificaría excluirlo.", "Selbst wenn man annähme, dass er sich geirrt hätte, würde das seinen Ausschluss nicht rechtfertigen.", "即使假设他错了，那也不能证明把他排除在外是合理的。", "Даже если предположить, что он ошибся, это не оправдывает его исключение."],
    ["master", "Ce n'est pas faute de lui avoir répété qu'il aurait à répondre de ses actes.", "It is not as if we had failed to tell him he would be held accountable for his actions.", "No es que no le hayamos dicho repetidamente que tendría que responder de sus actos.", "Es nicht so, dass wir ihm nicht wiederholt gesagt hätten, dass er für seine Taten zur Rechenschaft gezogen werden würde.", "这不是因为我们没告诉他要为自己的行为负责。", "Это не потому, что мы не говорили ему, что он будет нести ответственность за свои действия."],
    ["master", "Quelque convaincant que son argument puisse paraître, il repose sur une hypothèse erronée.", "However convincing his argument may seem, it is based on a false assumption.", "Por convincente que parezca su argumento, se basa en una suposición errónea.", "So überzeugend sein Argument auch erscheinen mag, es beruht auf einer falschen Annahme.", "无论他的论点看起来多么有说服力，它都建立在错误的假设上。", "Каким бы убедительным ни казался его аргумент, он основан на ошибочном предположении."]
];

// --- CULTURE GÉNÉRALE (>1000 questions: sciences, histoire, arts, sport, cinéma, tech) ---
// Banque multilingue avancée : chaque langue cible dispose d'énoncés
// exigeants aux trois derniers niveaux, et le français passe par l'anglais.
const LANG_MULTILINGUAL_CHALLENGES = [
    ["difficile", "Bien qu'elle ait relu le contrat, elle n'a pas remarqué la clause qui aurait pu tout changer.", "Although she had reread the contract, she did not notice the clause that could have changed everything.", "Aunque había vuelto a leer el contrato, no advirtió la cláusula que podría haberlo cambiado todo.", "Obwohl sie den Vertrag noch einmal gelesen hatte, bemerkte sie die Klausel nicht, die alles hätte ändern können.", "尽管她重读了合同，却没有注意到那条本可能改变一切的条款。", "Хотя она перечитала договор, она не заметила пункт, который мог бы всё изменить."],
    ["difficile", "Si vous aviez demandé plus tôt pourquoi la réunion avait été reportée, nous aurions pu prévenir les équipes.", "If you had asked sooner why the meeting had been postponed, we could have informed the teams.", "Si hubieran preguntado antes por qué se había aplazado la reunión, habríamos podido avisar a los equipos.", "Wenn Sie früher gefragt hätten, warum die Sitzung verschoben worden war, hätten wir die Teams informieren können.", "如果您早些询问会议为何延期，我们本可以通知各个团队。", "Если бы вы раньше спросили, почему встречу отложили, мы могли бы предупредить команды."],
    ["difficile", "Il prétend qu'on ne lui a jamais expliqué ce dont il devait répondre.", "He claims that no one ever explained what he was expected to account for.", "Afirma que nunca le explicaron por qué debía responder.", "Er behauptet, niemand habe ihm je erklärt, wofür er sich verantworten sollte.", "他声称从来没有人向他解释过他需要为哪些事情负责。", "Он утверждает, что ему никогда не объясняли, за что он должен отвечать."],
    ["difficile", "À peine le train était-il parti que nous avons compris que nous avions laissé les dossiers sur le quai.", "No sooner had the train left than we realized we had left the files on the platform.", "Apenas había salido el tren cuando nos dimos cuenta de que habíamos dejado los expedientes en el andén.", "Kaum war der Zug abgefahren, merkten wir, dass wir die Akten auf dem Bahnsteig liegen gelassen hatten.", "火车刚开走，我们就意识到把文件落在站台上了。", "Едва поезд отошёл, как мы поняли, что оставили папки на платформе."],
    ["difficile", "Je doute qu'ils puissent terminer avant que le directeur ne revienne.", "I doubt they can finish before the director returns.", "Dudo que puedan terminar antes de que vuelva el director.", "Ich bezweifle, dass sie fertig werden, bevor der Direktor zurückkommt.", "我怀疑他们能否在主任回来之前完成。", "Сомневаюсь, что они успеют закончить до возвращения директора."],
    ["tres_difficile", "Non seulement le rapport omet les chiffres que nous avions vérifiés, mais il présente comme certaine une hypothèse encore contestée.", "Not only does the report omit the figures we had checked, but it presents a still-disputed hypothesis as certain.", "El informe no solo omite las cifras que habíamos comprobado, sino que presenta como cierta una hipótesis aún discutida.", "Der Bericht lässt nicht nur die von uns überprüften Zahlen aus, sondern stellt auch eine weiterhin umstrittene Hypothese als sicher dar.", "报告不仅遗漏了我们核实过的数据，还把一个仍有争议的假设说成了定论。", "Отчёт не только опускает проверенные нами цифры, но и выдаёт всё ещё спорную гипотезу за доказанную."],
    ["tres_difficile", "Quoiqu'il ait reconnu avoir modifié les données, il soutient qu'il ne s'agissait pas d'une falsification.", "Although he admitted changing the data, he maintains that it did not amount to falsification.", "Aunque admitió haber modificado los datos, sostiene que aquello no constituía una falsificación.", "Obwohl er eingeräumt hat, die Daten geändert zu haben, behauptet er, es habe sich nicht um eine Fälschung gehandelt.", "尽管他承认修改过数据，却坚持说那并不构成篡改。", "Хотя он признал, что изменил данные, он настаивает, что это не было фальсификацией."],
    ["tres_difficile", "Elle aurait préféré qu'on l'avertît avant que la décision ne soit rendue publique.", "She would have preferred to be warned before the decision was made public.", "Habría preferido que la avisaran antes de que se hiciera pública la decisión.", "Sie hätte es vorgezogen, vor der Veröffentlichung der Entscheidung gewarnt zu werden.", "她宁愿有人在决定公布之前提醒她。", "Она предпочла бы, чтобы её предупредили до обнародования решения."],
    ["tres_difficile", "Ce n'est qu'après avoir comparé les témoignages que les enquêteurs comprirent pourquoi chacun s'était tu.", "Only after comparing the testimonies did the investigators understand why everyone had remained silent.", "Solo después de comparar los testimonios, los investigadores comprendieron por qué todos habían guardado silencio.", "Erst nachdem sie die Aussagen verglichen hatten, verstanden die Ermittler, warum alle geschwiegen hatten.", "调查人员对比证词后，才明白每个人为何都保持了沉默。", "Только сравнив показания, следователи поняли, почему все молчали."],
    ["tres_difficile", "Si tant est que cette interprétation soit correcte, elle remettrait en cause les conclusions auxquelles nous étions parvenus.", "If this interpretation is indeed correct, it would call into question the conclusions we had reached.", "Si esta interpretación es realmente correcta, pondría en duda las conclusiones a las que habíamos llegado.", "Sollte diese Deutung tatsächlich zutreffen, würde sie die Schlussfolgerungen infrage stellen, zu denen wir gelangt waren.", "如果这种解释确实成立，就会使我们此前得出的结论受到质疑。", "Если это толкование действительно верно, оно поставит под сомнение выводы, к которым мы пришли."],
    ["master", "Eût-on tenu compte des réserves qu'elle avait formulées, l'accord n'aurait sans doute jamais été signé dans ces conditions.", "Had her reservations been taken into account, the agreement would probably never have been signed under those conditions.", "De haberse tenido en cuenta sus reservas, probablemente el acuerdo nunca se habría firmado en esas condiciones.", "Hätte man ihre Bedenken berücksichtigt, wäre die Vereinbarung unter diesen Bedingungen wahrscheinlich nie unterzeichnet worden.", "如果当时考虑了她提出的保留意见，这份协议大概就不会在那种情况下签署。", "Если бы учли высказанные ею оговорки, соглашение, вероятно, никогда не подписали бы на таких условиях."],
    ["master", "Encore aurait-il fallu que les preuves fussent recevables pour que le tribunal pût réexaminer l'affaire.", "The evidence would still have had to be admissible for the court to be able to review the case.", "Aún habría sido necesario que las pruebas fueran admisibles para que el tribunal pudiera revisar el caso.", "Die Beweise hätten überhaupt erst zulässig sein müssen, damit das Gericht den Fall hätte neu prüfen können.", "证据还必须具有可采性，法院才有可能重新审理此案。", "Доказательства должны были быть допустимыми, чтобы суд мог пересмотреть дело."],
    ["master", "Quelque plausibles que paraissent ces explications, elles ne sauraient rendre compte de la contradiction que révèle le dernier paragraphe.", "However plausible these explanations may seem, they cannot account for the contradiction revealed in the final paragraph.", "Por plausibles que parezcan estas explicaciones, no pueden explicar la contradicción que revela el último párrafo.", "So plausibel diese Erklärungen auch erscheinen mögen, sie können den Widerspruch im letzten Absatz nicht erklären.", "这些解释无论看起来多么可信，都无法说明最后一段所揭示的矛盾。", "Какими бы правдоподобными ни казались эти объяснения, они не объясняют противоречие в последнем абзаце."],
    ["master", "À supposer même qu'il eût agi de bonne foi, rien ne l'autorisait à dissimuler les conséquences qu'il avait prévues.", "Even assuming he had acted in good faith, nothing entitled him to conceal the consequences he had foreseen.", "Aun suponiendo que hubiera actuado de buena fe, nada le autorizaba a ocultar las consecuencias que había previsto.", "Selbst wenn er in gutem Glauben gehandelt hätte, durfte er die Folgen, die er vorausgesehen hatte, keinesfalls verschweigen.", "即便假设他当时出于善意，也没有理由让他隐瞒自己预见到的后果。", "Даже если предположить, что он действовал добросовестно, ничто не давало ему права скрывать предвиденные последствия."],
    ["master", "Ce dont elle s'est abstenue de parler lors de l'audience pourrait bien expliquer pourquoi son témoignage reste si difficile à réfuter.", "What she refrained from discussing at the hearing may well explain why her testimony remains so difficult to refute.", "Lo que evitó mencionar durante la audiencia bien podría explicar por qué su testimonio sigue siendo tan difícil de refutar.", "Was sie bei der Anhörung nicht anzusprechen wagte, könnte erklären, warum ihre Aussage so schwer zu widerlegen ist.", "她在听证会上刻意避而不谈的内容，或许正能解释为何她的证词如此难以反驳。", "То, о чём она умолчала на слушании, вполне может объяснить, почему её показания так трудно опровергнуть."],
    ["difficile", "Je ne savais pas qu'ils avaient reporté la séance jusqu'à ce que je reçoive le nouveau calendrier.", "I did not know they had postponed the session until I received the revised schedule.", "No sabía que habían aplazado la sesión hasta que recibí el nuevo calendario.", "Ich wusste nicht, dass sie die Sitzung verschoben hatten, bis ich den neuen Zeitplan erhielt.", "直到收到新的日程安排，我才知道他们已经推迟了会议。", "Я не знал, что заседание перенесли, пока не получил новое расписание."],
    ["difficile", "Le témoin a confirmé qu'il avait aperçu le véhicule avant que les lumières ne s'éteignent.", "The witness confirmed that he had seen the vehicle before the lights went out.", "El testigo confirmó que había visto el vehículo antes de que se apagaran las luces.", "Der Zeuge bestätigte, dass er das Fahrzeug gesehen hatte, bevor das Licht ausging.", "证人证实，在灯光熄灭之前他看到了那辆车。", "Свидетель подтвердил, что видел машину до того, как погас свет."],
    ["difficile", "Auriez-vous pu me prévenir dès que vous avez appris que le colis n'arriverait pas à temps ?", "Could you have let me know as soon as you learned the package would not arrive on time?", "¿Podría haberme avisado en cuanto supo que el paquete no llegaría a tiempo?", "Hätten Sie mich benachrichtigen können, sobald Sie erfahren hatten, dass das Paket nicht rechtzeitig eintreffen würde?", "您得知包裹无法按时送达后，能否立刻通知我？", "Не могли бы вы предупредить меня, как только узнали, что посылка не прибудет вовремя?"],
    ["difficile", "Bien qu'on lui ait conseillé d'attendre, il a signé le document sans en lire les dernières pages.", "Although he had been advised to wait, he signed the document without reading its final pages.", "Aunque le aconsejaron esperar, firmó el documento sin leer las últimas páginas.", "Obwohl man ihm geraten hatte zu warten, unterschrieb er das Dokument, ohne die letzten Seiten zu lesen.", "尽管有人建议他等一等，他还是没有读完最后几页就签了文件。", "Хотя ему посоветовали подождать, он подписал документ, не прочитав последние страницы."],
    ["difficile", "Nous aurions choisi une autre route si nous avions su que le pont était fermé depuis la veille.", "We would have chosen a different route if we had known the bridge had been closed since the previous day.", "Habríamos elegido otra ruta si hubiéramos sabido que el puente estaba cerrado desde el día anterior.", "Wir hätten eine andere Strecke gewählt, wenn wir gewusst hätten, dass die Brücke seit dem Vortag gesperrt war.", "如果我们早知道那座桥从前一天起就封闭了，就会选择另一条路线。", "Мы выбрали бы другой маршрут, если бы знали, что мост закрыт со вчерашнего дня."],
    ["tres_difficile", "Il se pourrait que les résultats aient été interprétés différemment si l'échantillon avait été plus représentatif.", "The results might have been interpreted differently if the sample had been more representative.", "Puede que los resultados se hubieran interpretado de otra manera si la muestra hubiera sido más representativa.", "Die Ergebnisse wären möglicherweise anders ausgelegt worden, wenn die Stichprobe repräsentativer gewesen wäre.", "如果样本更具代表性，结果或许会得到不同的解读。", "Возможно, результаты истолковали бы иначе, если бы выборка была более репрезентативной."],
    ["tres_difficile", "Non sans hésitation, le comité a fini par approuver une mesure dont les effets demeuraient incertains.", "Not without hesitation, the committee eventually approved a measure whose effects remained uncertain.", "No sin vacilar, el comité terminó aprobando una medida cuyos efectos seguían siendo inciertos.", "Nicht ohne Zögern stimmte der Ausschuss schließlich einer Maßnahme zu, deren Auswirkungen ungewiss blieben.", "委员会犹豫再三，最终还是批准了一项效果尚不确定的措施。", "Не без колебаний комитет в итоге одобрил меру, последствия которой оставались неясными."],
    ["tres_difficile", "À mesure que de nouvelles preuves apparaissaient, la version qu'il avait défendue devenait de moins en moins crédible.", "As new evidence emerged, the account he had defended became less and less credible.", "A medida que aparecían nuevas pruebas, la versión que había defendido resultaba cada vez menos creíble.", "Je mehr neue Beweise auftauchten, desto unglaubwürdiger wurde die Version, die er verteidigt hatte.", "随着新证据不断出现，他所维护的说法变得越来越站不住脚。", "По мере появления новых доказательств версия, которую он отстаивал, становилась всё менее убедительной."],
    ["tres_difficile", "Qu'aurait-il fallu modifier pour que la procédure puisse être menée à bien sans enfreindre le règlement ?", "What would have needed to be changed for the procedure to be completed without violating the rules?", "¿Qué habría sido necesario modificar para completar el procedimiento sin infringir el reglamento?", "Was hätte geändert werden müssen, damit das Verfahren abgeschlossen werden konnte, ohne gegen die Vorschriften zu verstoßen?", "需要修改哪些内容，才能在不违反规定的情况下完成程序？", "Что следовало изменить, чтобы завершить процедуру, не нарушив правил?"],
    ["tres_difficile", "Si nous avions tenu compte des avertissements, nous n'aurions pas engagé des ressources que nous ne pouvions plus récupérer.", "If we had taken the warnings into account, we would not have committed resources we could no longer recover.", "Si hubiéramos tenido en cuenta las advertencias, no habríamos comprometido recursos que ya no podíamos recuperar.", "Hätten wir die Warnungen berücksichtigt, hätten wir keine Mittel eingesetzt, die wir nicht mehr zurückholen konnten.", "如果我们当初考虑了那些警告，就不会投入已经无法收回的资源。", "Если бы мы учли предупреждения, то не вложили бы средства, которые уже нельзя было вернуть."],
    ["master", "Fût-ce au prix d'un retard considérable, il aurait fallu vérifier chaque pièce avant que l'ensemble ne soit scellé.", "Even at the cost of a considerable delay, every component should have been checked before the assembly was sealed.", "Aunque hubiera supuesto un retraso considerable, habría sido necesario revisar cada pieza antes de sellar el conjunto.", "Selbst um den Preis einer erheblichen Verzögerung hätte jedes Teil geprüft werden müssen, bevor die Baugruppe versiegelt wurde.", "即使会造成严重延误，也应该在整体封存之前逐一检查每个部件。", "Даже ценой значительной задержки следовало проверить каждую деталь до того, как узел опечатали."],
    ["master", "Il ne s'ensuit nullement que les témoins aient menti ; leurs souvenirs ont simplement pu être altérés par le temps.", "It by no means follows that the witnesses lied; their memories may simply have been altered by time.", "De ningún modo se deduce que los testigos mintieran; el paso del tiempo pudo simplemente alterar sus recuerdos.", "Daraus folgt keineswegs, dass die Zeugen gelogen haben; ihre Erinnerungen könnten sich lediglich im Laufe der Zeit verändert haben.", "这绝不意味着证人说了谎；他们的记忆可能只是随着时间发生了偏差。", "Из этого вовсе не следует, что свидетели лгали: их воспоминания могли просто исказиться со временем."],
    ["master", "N'eût été la précision qu'elle avait ajoutée en marge, personne n'aurait remarqué que les deux versions se contredisaient.", "Had it not been for the clarification she had added in the margin, no one would have noticed that the two versions contradicted each other.", "De no ser por la aclaración que añadió al margen, nadie habría advertido que las dos versiones se contradecían.", "Hätte sie nicht am Rand eine Präzisierung hinzugefügt, hätte niemand bemerkt, dass sich die beiden Fassungen widersprachen.", "要不是她在页边补充了说明，就没人会发现这两个版本互相矛盾。", "Если бы не уточнение, которое она добавила на полях, никто бы не заметил противоречия между двумя версиями."],
    ["difficile", "Elle s'est rendu compte qu'elle avait envoyé l'ancienne version du rapport.", "She realized that she had sent the old version of the report.", "Se dio cuenta de que había enviado la versión anterior del informe.", "Ihr wurde klar, dass sie die alte Fassung des Berichts geschickt hatte.", "她意识到自己发出的是报告的旧版本。", "Она поняла, что отправила старую версию отчёта."],
    ["difficile", "Nous aurions pu terminer plus tôt si chacun avait reçu les mêmes instructions.", "We could have finished earlier if everyone had received the same instructions.", "Podríamos haber terminado antes si todos hubieran recibido las mismas instrucciones.", "Wir hätten früher fertig werden können, wenn alle dieselben Anweisungen erhalten hätten.", "如果每个人都收到相同的指示，我们本可以更早完成。", "Мы могли бы закончить раньше, если бы все получили одинаковые инструкции."],
    ["difficile", "Le responsable vérifiera les références avant que l'article ne soit publié.", "The editor will check the references before the article is published.", "El responsable comprobará las referencias antes de que se publique el artículo.", "Die zuständige Person prüft die Quellen, bevor der Artikel veröffentlicht wird.", "负责人会在文章发表前核对参考资料。", "Ответственный проверит источники до публикации статьи."],
    ["difficile", "Je ne savais pas depuis combien de temps ils attendaient devant l'entrée.", "I did not know how long they had been waiting outside the entrance.", "No sabía cuánto tiempo llevaban esperando delante de la entrada.", "Ich wusste nicht, wie lange sie schon vor dem Eingang warteten.", "我不知道他们在入口外等了多久。", "Я не знал, как долго они ждали у входа."],
    ["difficile", "Bien qu'il ait promis de revenir, personne ne l'a revu depuis lundi.", "Although he promised to come back, no one has seen him since Monday.", "Aunque prometió volver, nadie lo ha vuelto a ver desde el lunes.", "Obwohl er versprochen hatte zurückzukommen, hat ihn seit Montag niemand mehr gesehen.", "尽管他答应会回来，但自星期一以来没人再见过他。", "Хотя он обещал вернуться, с понедельника его никто не видел."],
    ["difficile", "Elle a demandé si le changement affecterait les résultats déjà obtenus.", "She asked whether the change would affect the results already obtained.", "Preguntó si el cambio afectaría a los resultados ya obtenidos.", "Sie fragte, ob die Änderung die bereits erzielten Ergebnisse beeinflussen würde.", "她询问这项变更是否会影响已经取得的结果。", "Она спросила, повлияет ли изменение на уже полученные результаты."],
    ["difficile", "Au moment où nous sommes arrivés, la réunion avait déjà commencé.", "By the time we arrived, the meeting had already started.", "Cuando llegamos, la reunión ya había empezado.", "Als wir ankamen, hatte die Sitzung bereits begonnen.", "我们到达时，会议已经开始了。", "К моменту нашего приезда встреча уже началась."],
    ["difficile", "Il faudra conserver une copie au cas où le système tomberait en panne.", "A copy will have to be kept in case the system fails.", "Habrá que guardar una copia por si falla el sistema.", "Eine Kopie muss für den Fall aufbewahrt werden, dass das System ausfällt.", "必须保留一份副本，以防系统发生故障。", "Нужно сохранить копию на случай сбоя системы."],
    ["difficile", "Je pensais qu'ils avaient compris pourquoi la décision devait être reportée.", "I thought they had understood why the decision had to be postponed.", "Pensaba que habían entendido por qué había que aplazar la decisión.", "Ich dachte, sie hätten verstanden, warum die Entscheidung verschoben werden musste.", "我以为他们已经明白为什么必须推迟决定。", "Я думал, они поняли, почему решение нужно было отложить."],
    ["difficile", "Les documents seront envoyés dès que la traduction aura été relue.", "The documents will be sent as soon as the translation has been reviewed.", "Los documentos se enviarán en cuanto se haya revisado la traducción.", "Die Unterlagen werden verschickt, sobald die Übersetzung überprüft worden ist.", "翻译校对完成后，文件就会寄出。", "Документы отправят, как только перевод будет вычитан."],
    ["difficile", "Il a reconnu qu'il n'avait pas vérifié les chiffres avant de les publier.", "He admitted that he had not checked the figures before publishing them.", "Reconoció que no había comprobado las cifras antes de publicarlas.", "Er räumte ein, die Zahlen vor ihrer Veröffentlichung nicht überprüft zu haben.", "他承认发布数据前没有核实。", "Он признал, что не проверил цифры перед публикацией."],
    ["tres_difficile", "Si nous avions su que les données étaient incomplètes, nous aurions demandé une nouvelle analyse.", "Had we known the data were incomplete, we would have requested a new analysis.", "Si hubiéramos sabido que los datos estaban incompletos, habríamos solicitado un nuevo análisis.", "Hätten wir gewusst, dass die Daten unvollständig waren, hätten wir eine neue Analyse angefordert.", "如果我们知道数据不完整，就会要求重新分析。", "Если бы мы знали, что данные неполные, мы бы запросили новый анализ."],
    ["tres_difficile", "À peine avait-elle terminé son exposé que plusieurs questions furent soulevées.", "No sooner had she finished her presentation than several questions were raised.", "Apenas había terminado su exposición cuando se plantearon varias preguntas.", "Kaum hatte sie ihren Vortrag beendet, wurden mehrere Fragen aufgeworfen.", "她刚结束演讲，就有人提出了几个问题。", "Едва она закончила выступление, как возникло несколько вопросов."],
    ["tres_difficile", "Quoiqu'il eût reconnu la contradiction, il refusa d'en tirer les conséquences.", "Although he had acknowledged the contradiction, he refused to draw the consequences.", "Aunque había reconocido la contradicción, se negó a extraer las consecuencias.", "Obwohl er den Widerspruch eingeräumt hatte, weigerte er sich, die Konsequenzen daraus zu ziehen.", "尽管他承认存在矛盾，却拒绝由此得出相应结论。", "Хотя он признал противоречие, он отказался сделать из этого выводы."],
    ["tres_difficile", "Il aurait fallu que les deux parties s'accordent sur une méthode avant de commencer.", "The two parties should have agreed on a method before starting.", "Habría sido necesario que ambas partes acordaran un método antes de empezar.", "Beide Seiten hätten sich vor Beginn auf eine Methode einigen müssen.", "双方本应在开始前就方法达成一致。", "Сторонам следовало согласовать метод до начала работы."],
    ["tres_difficile", "Non seulement la mesure n'a pas produit l'effet attendu, mais elle a accru les coûts.", "Not only did the measure fail to produce the expected effect, it also increased costs.", "La medida no solo no produjo el efecto esperado, sino que además aumentó los costes.", "Die Maßnahme erzielte nicht nur nicht die erwartete Wirkung, sondern erhöhte auch die Kosten.", "这项措施不仅没有达到预期效果，还增加了成本。", "Мера не только не дала ожидаемого эффекта, но и повысила расходы."],
    ["tres_difficile", "Sans que personne s'en aperçoive, le document avait été modifié après sa signature.", "Without anyone noticing, the document had been altered after it was signed.", "Sin que nadie se diera cuenta, el documento había sido modificado después de firmarse.", "Unbemerkt war das Dokument nach der Unterzeichnung geändert worden.", "没人察觉到文件在签署后被修改了。", "Никто не заметил, что документ изменили после подписания."],
    ["tres_difficile", "Pour autant que les archives soient exactes, la décision avait été prise avant le vote.", "As far as the records are accurate, the decision had been made before the vote.", "Siempre que los archivos sean exactos, la decisión se había tomado antes de la votación.", "Sofern die Akten korrekt sind, war die Entscheidung vor der Abstimmung getroffen worden.", "如果档案记录准确，这项决定是在投票前作出的。", "Если архивные записи точны, решение приняли до голосования."],
    ["tres_difficile", "Elle ne comprenait pas pourquoi on lui reprochait d'avoir suivi les consignes.", "She did not understand why she was being blamed for following the instructions.", "No entendía por qué le reprochaban haber seguido las instrucciones.", "Sie verstand nicht, warum man ihr vorwarf, die Anweisungen befolgt zu haben.", "她不明白为什么别人责怪她遵守了指示。", "Она не понимала, почему ей ставили в вину то, что она следовала инструкциям."],
    ["tres_difficile", "Le comité aurait pu aboutir à une conclusion différente si certains éléments avaient été examinés.", "The committee might have reached a different conclusion if certain pieces of evidence had been examined.", "El comité podría haber llegado a otra conclusión si se hubieran examinado ciertos elementos.", "Der Ausschuss hätte zu einem anderen Ergebnis kommen können, wenn bestimmte Umstände geprüft worden wären.", "如果审查了某些材料，委员会本可能得出不同结论。", "Комитет мог бы прийти к иному выводу, если бы рассмотрели некоторые материалы."],
    ["tres_difficile", "Ce n'est qu'en recoupant les dates qu'ils ont découvert l'origine de l'erreur.", "Only by cross-checking the dates did they discover the source of the error.", "Solo al contrastar las fechas descubrieron el origen del error.", "Erst durch den Abgleich der Daten entdeckten sie die Ursache des Fehlers.", "他们通过核对日期才发现错误的根源。", "Лишь сопоставив даты, они обнаружили источник ошибки."],
    ["master", "Eût-on examiné les pièces dans leur ensemble, la contradiction aurait été manifeste.", "Had the documents been examined as a whole, the contradiction would have been obvious.", "De haberse examinado los documentos en su conjunto, la contradicción habría sido evidente.", "Hätte man die Unterlagen als Ganzes geprüft, wäre der Widerspruch offensichtlich gewesen.", "如果当时把这些材料作为整体审查，矛盾就会显而易见。", "Если бы материалы рассмотрели в совокупности, противоречие было бы очевидным."],
    ["master", "À supposer que l'hypothèse soit exacte, elle ne saurait à elle seule justifier cette conclusion.", "Even if the hypothesis is correct, it cannot by itself justify this conclusion.", "Aunque la hipótesis sea correcta, no puede justificar por sí sola esta conclusión.", "Selbst wenn die Hypothese zutrifft, kann sie diese Schlussfolgerung allein nicht rechtfertigen.", "即便假设正确，它本身也不足以证明这一结论合理。", "Даже если гипотеза верна, сама по себе она не может обосновать этот вывод."],
    ["master", "Encore faudrait-il que l'exception invoquée s'applique aux circonstances de l'espèce.", "The exception being invoked would still have to apply to the circumstances of this case.", "Aun así, la excepción invocada tendría que aplicarse a las circunstancias del caso.", "Die angeführte Ausnahme müsste allerdings auf die Umstände dieses Falls zutreffen.", "不过，所援引的例外还必须适用于本案的具体情况。", "Однако указанное исключение должно применяться к обстоятельствам данного дела."],
    ["master", "Nulle preuve ne permet d'affirmer que l'omission fut délibérée.", "No evidence allows us to claim that the omission was deliberate.", "Ninguna prueba permite afirmar que la omisión fuera deliberada.", "Es gibt keinen Beweis dafür, dass die Auslassung absichtlich war.", "没有证据可以证明这项遗漏是故意的。", "Нет доказательств, позволяющих утверждать, что пропуск был преднамеренным."],
    ["master", "Fût-elle tenue pour recevable, cette déposition ne suffirait pas à établir les faits.", "Even if admitted, this testimony would not be sufficient to establish the facts.", "Aunque se admitiera, esta declaración no bastaría para demostrar los hechos.", "Selbst wenn diese Aussage zugelassen würde, reichte sie nicht aus, um den Sachverhalt festzustellen.", "即使这份证词被采纳，也不足以证实这些事实。", "Даже если эти показания допустят, их будет недостаточно для установления фактов."],
    ["master", "Bien qu'il ne soit pas contesté que les règles aient changé, leur portée demeure incertaine.", "Although it is undisputed that the rules have changed, their scope remains uncertain.", "Aunque nadie discute que las reglas hayan cambiado, su alcance sigue siendo incierto.", "Obwohl unbestritten ist, dass sich die Regeln geändert haben, bleibt ihre Tragweite unklar.", "尽管规则已经改变这一点没有争议，但其适用范围仍不明确。", "Хотя никто не оспаривает, что правила изменились, их значение остаётся неясным."],
    ["master", "Le silence du rapport ne saurait être interprété comme une confirmation de cette hypothèse.", "The report's silence cannot be interpreted as confirmation of this hypothesis.", "El silencio del informe no puede interpretarse como una confirmación de esta hipótesis.", "Das Schweigen des Berichts darf nicht als Bestätigung dieser Hypothese ausgelegt werden.", "不能把报告没有提及此事解读为对这一假设的确认。", "Молчание отчёта нельзя истолковывать как подтверждение этой гипотезы."],
    ["master", "Si les versions successives avaient été conservées, il eût été possible d'identifier l'origine de l'altération.", "Had the successive versions been preserved, it would have been possible to identify the source of the alteration.", "Si se hubieran conservado las versiones sucesivas, habría sido posible identificar el origen de la modificación.", "Wären die aufeinanderfolgenden Fassungen aufbewahrt worden, hätte man die Ursache der Veränderung feststellen können.", "如果保留了各个版本，就有可能查明改动的来源。", "Если бы сохранили все версии, можно было бы установить источник изменений."],
    ["master", "À peine la décision fut-elle prononcée que son bien-fondé fut remis en question.", "Hardly had the decision been announced when its validity was called into question.", "Apenas se anunció la decisión cuando se cuestionó su validez.", "Kaum war die Entscheidung verkündet, wurde ihre Rechtmäßigkeit infrage gestellt.", "决定刚一宣布，其合理性就受到质疑。", "Едва решение объявили, как его обоснованность была поставлена под сомнение."],
    ["master", "Ce n'est pas tant la conclusion qui pose problème que le raisonnement par lequel on y parvient.", "It is not so much the conclusion that is problematic as the reasoning used to reach it.", "El problema no reside tanto en la conclusión como en el razonamiento que conduce a ella.", "Problematisch ist weniger die Schlussfolgerung als vielmehr die Argumentation, die zu ihr führt.", "问题不在于结论本身，而在于得出结论的推理过程。", "Проблема заключается не столько в выводе, сколько в рассуждении, которое к нему привело."],
    ["master", "Ce n'est pas tant qu'il ait refusé de coopérer, mais qu'il ait choisi de le faire au moment où cela ne pouvait plus rien changer.", "It is not so much that he refused to cooperate as that he chose to do so when it could no longer change anything.", "No es tanto que se negara a colaborar, sino que eligiera hacerlo cuando ya nada podía cambiar.", "Es geht weniger darum, dass er die Zusammenarbeit verweigerte, als darum, dass er sich erst dazu entschloss, als sich nichts mehr ändern ließ.", "问题不在于他拒绝配合，而在于他选择配合时已经无法改变任何结果。", "Дело не столько в том, что он отказался сотрудничать, сколько в том, что он согласился, когда это уже ничего не могло изменить."],
    ["master", "Quel que soit le sens qu'on prête à cette formule, rien ne permet d'affirmer qu'elle ait été comprise de la même manière par tous.", "Whatever meaning one assigns to this wording, nothing suggests that everyone understood it in the same way.", "Sea cual sea el sentido que se atribuya a esta formulación, nada permite afirmar que todos la entendieran del mismo modo.", "Welche Bedeutung man dieser Formulierung auch beimisst, nichts deutet darauf hin, dass sie von allen gleich verstanden wurde.", "无论如何理解这句话，都没有依据断言所有人对它的理解都相同。", "Какой бы смысл ни вкладывали в эту формулировку, ничто не позволяет утверждать, что все поняли её одинаково."]
];

const LANG_EXPANSION_OBJECTS = [
    ["la clé", "the key", "la llave", "den Schlüssel", "钥匙", "ключ"],
    ["le livre", "the book", "el libro", "das Buch", "书", "книгу"],
    ["le téléphone", "the phone", "el teléfono", "das Telefon", "电话", "телефон"],
    ["le sac", "the bag", "el bolso", "die Tasche", "包", "сумку"],
    ["la lettre", "the letter", "la carta", "den Brief", "信", "письмо"],
    ["la carte", "the map", "el mapa", "die Karte", "地图", "карту"],
    ["le billet", "the ticket", "el billete", "das Ticket", "车票", "билет"],
    ["le parapluie", "the umbrella", "el paraguas", "den Regenschirm", "雨伞", "зонт"],
    ["le manteau", "the coat", "el abrigo", "den Mantel", "外套", "пальто"],
    ["le vélo", "the bicycle", "la bicicleta", "das Fahrrad", "自行车", "велосипед"],
    ["l'appareil photo", "the camera", "la cámara", "die Kamera", "相机", "фотоаппарат"],
    ["l'ordinateur", "the computer", "el ordenador", "den Computer", "电脑", "компьютер"],
    ["la tasse", "the cup", "la taza", "die Tasse", "杯子", "чашку"],
    ["la bouteille", "the bottle", "la botella", "die Flasche", "瓶子", "бутылку"],
    ["la chaise", "the chair", "la silla", "den Stuhl", "椅子", "стул"],
    ["la table", "the table", "la mesa", "den Tisch", "桌子", "стол"],
    ["la valise", "the suitcase", "la maleta", "den Koffer", "行李箱", "чемодан"],
    ["le passeport", "the passport", "el pasaporte", "den Pass", "护照", "паспорт"],
    ["le portefeuille", "the wallet", "la cartera", "die Geldbörse", "钱包", "кошелёк"],
    ["la veste", "the jacket", "la chaqueta", "die Jacke", "夹克", "куртку"],
    ["le pull", "the sweater", "el suéter", "den Pullover", "毛衣", "свитер"],
    ["le crayon", "the pencil", "el lápiz", "den Bleistift", "铅笔", "карандаш"],
    ["le cahier", "the notebook", "el cuaderno", "das Heft", "笔记本", "тетрадь"],
    ["le journal", "the newspaper", "el periódico", "die Zeitung", "报纸", "газету"],
    ["la boîte", "the box", "la caja", "die Schachtel", "盒子", "коробку"],
    ["le paquet", "the package", "el paquete", "das Paket", "包裹", "посылку"],
    ["le sandwich", "the sandwich", "el sándwich", "das Sandwich", "三明治", "сэндвич"],
    ["la pomme", "the apple", "la manzana", "den Apfel", "苹果", "яблоко"],
    ["l'orange", "the orange", "la naranja", "die Orange", "橙子", "апельсин"],
    ["le gâteau", "the cake", "el pastel", "den Kuchen", "蛋糕", "торт"],
    ["le jouet", "the toy", "el juguete", "das Spielzeug", "玩具", "игрушку"],
    ["le ballon", "the ball", "la pelota", "den Ball", "球", "мяч"],
    ["l'outil", "the tool", "la herramienta", "das Werkzeug", "工具", "инструмент"],
    ["la couverture", "the blanket", "la manta", "die Decke", "毯子", "одеяло"],
    ["la lampe", "the lamp", "la lámpara", "die Lampe", "灯", "лампу"],
    ["le miroir", "the mirror", "el espejo", "den Spiegel", "镜子", "зеркало"],
    ["le réveil", "the alarm clock", "el despertador", "den Wecker", "闹钟", "будильник"],
    ["le cadeau", "the gift", "el regalo", "das Geschenk", "礼物", "подарок"],
    ["le vase", "the vase", "el jarrón", "die Vase", "花瓶", "вазу"],
    ["le dossier", "the folder", "la carpeta", "den Ordner", "文件夹", "папку"]
];

const LANG_EXPANSION_TEMPLATES = [
    ["basique", [
        ["Je cherche {item}.", "I am looking for {item}.", "Busco {item}.", "Ich suche {item}.", "我在找{item}。", "Я ищу {item}."],
        ["Elle a trouvé {item}.", "She found {item}.", "Ella encontró {item}.", "Sie hat {item} gefunden.", "她找到了{item}。", "Она нашла {item}."],
        ["Nous avons acheté {item}.", "We bought {item}.", "Compramos {item}.", "Wir haben {item} gekauft.", "我们买了{item}。", "Мы купили {item}."],
        ["Il prend {item}.", "He takes {item}.", "Él toma {item}.", "Er nimmt {item}.", "他拿起{item}。", "Он берёт {item}."],
        ["Ils gardent {item}.", "They keep {item}.", "Ellos guardan {item}.", "Sie behalten {item}.", "他们收好{item}。", "Они хранят {item}."]
    ]],
    ["facile", [
        ["Je vais apporter {item} demain.", "I will bring {item} tomorrow.", "Voy a traer {item} mañana.", "Ich werde {item} morgen mitbringen.", "我明天会带来{item}。", "Я принесу {item} завтра."],
        ["Elle a rangé {item} avant de partir.", "She put away {item} before leaving.", "Guardó {item} antes de irse.", "Sie räumte {item} weg, bevor sie ging.", "她离开前收好了{item}。", "Перед уходом она убрала {item}."],
        ["Nous avons acheté {item} hier.", "We bought {item} yesterday.", "Ayer compramos {item}.", "Wir haben {item} gestern gekauft.", "我们昨天买了{item}。", "Мы купили {item} вчера."],
        ["Il est en train de réparer {item}.", "He is repairing {item}.", "Está reparando {item}.", "Er repariert gerade {item}.", "他正在修理{item}。", "Он сейчас чинит {item}."],
        ["Ils apporteront {item} après le déjeuner.", "They will bring {item} after lunch.", "Traerán {item} después del almuerzo.", "Sie bringen {item} nach dem Mittagessen mit.", "他们午饭后会带来{item}。", "Они принесут {item} после обеда."]
    ]],
    ["moyen", [
        ["Quand elle a retrouvé {item}, elle a appelé son collègue.", "When she found {item}, she called her colleague.", "Cuando encontró {item}, llamó a su colega.", "Als sie {item} wiederfand, rief sie ihren Kollegen an.", "她找到{item}后，给同事打了电话。", "Когда она нашла {item}, она позвонила коллеге."],
        ["Avant de déplacer {item}, ils ont vérifié la pièce.", "Before moving {item}, they checked the room.", "Antes de mover {item}, revisaron la habitación.", "Bevor sie {item} bewegten, prüften sie den Raum.", "移动{item}之前，他们检查了房间。", "Прежде чем переместить {item}, они проверили комнату."],
        ["Il cherchait {item} pendant que nous préparions la salle.", "He was looking for {item} while we were preparing the room.", "Buscaba {item} mientras preparábamos la sala.", "Er suchte {item}, während wir den Raum vorbereiteten.", "我们准备房间时，他一直在找{item}。", "Он искал {item}, пока мы готовили комнату."],
        ["Après avoir emballé {item}, elle a fermé la valise.", "After packing {item}, she closed the suitcase.", "Después de empaquetar {item}, cerró la maleta.", "Nachdem sie {item} eingepackt hatte, schloss sie den Koffer.", "她把{item}装好后，关上了行李箱。", "Упаковав {item}, она закрыла чемодан."],
        ["Ils ont gardé {item} jusqu'à l'arrivée du technicien.", "They kept {item} until the technician arrived.", "Guardaron {item} hasta que llegó el técnico.", "Sie behielten {item}, bis der Techniker eintraf.", "他们把{item}留着，直到技术员到来。", "Они хранили {item}, пока не приехал техник."]
    ]],
    ["difficile", [
        ["Si tu avais apporté {item}, nous aurions pu partir plus tôt.", "If you had brought {item}, we could have left earlier.", "Si hubieras traído {item}, habríamos podido salir antes.", "Wenn du {item} mitgebracht hättest, hätten wir früher aufbrechen können.", "如果你带了{item}，我们本可以早点出发。", "Если бы ты принёс {item}, мы могли бы уйти раньше."],
        ["Bien qu'elle ait soigneusement emballé {item}, le retard a bouleversé ses plans.", "Although she had carefully packed {item}, the delay disrupted her plans.", "Aunque había embalado cuidadosamente {item}, el retraso trastocó sus planes.", "Obwohl sie {item} sorgfältig eingepackt hatte, brachte die Verspätung ihre Pläne durcheinander.", "尽管她仔细包装了{item}，延误还是打乱了她的计划。", "Хотя она тщательно упаковала {item}, задержка нарушила её планы."],
        ["Si nous avions inspecté {item} plus tôt, nous aurions peut-être évité le retard.", "Had we inspected {item} sooner, we might have avoided the delay.", "Si hubiéramos inspeccionado {item} antes, quizá habríamos evitado el retraso.", "Hätten wir {item} früher überprüft, hätten wir die Verspätung vielleicht vermieden.", "如果我们早点检查{item}，也许就能避免延误。", "Если бы мы проверили {item} раньше, возможно, нам удалось бы избежать задержки."],
        ["Nous n'aurions pas remplacé {item} sans l'accord du technicien.", "We would not have replaced {item} without the technician's approval.", "No habríamos reemplazado {item} sin la aprobación del técnico.", "Ohne die Zustimmung des Technikers hätten wir {item} nicht ersetzt.", "没有技术员的同意，我们本不会更换{item}。", "Без разрешения техника мы бы не стали заменять {item}."],
        ["S'ils avaient vérifié {item} avant de partir, ils auraient remarqué les dégâts.", "If they had checked {item} before leaving, they would have noticed the damage.", "Si hubieran revisado {item} antes de salir, habrían notado los daños.", "Wenn sie {item} vor der Abfahrt überprüft hätten, hätten sie den Schaden bemerkt.", "如果他们离开前检查了{item}，就会发现损坏。", "Если бы они проверили {item} перед уходом, они бы заметили повреждение."]
    ]],
    ["tres_difficile", [
        ["Ce n'est qu'après avoir examiné {item} que nous avons compris pourquoi la livraison avait été retardée.", "Only after examining {item} did we understand why the delivery had been delayed.", "Solo después de examinar {item} comprendimos por qué se había retrasado la entrega.", "Erst nachdem wir {item} untersucht hatten, verstanden wir, warum sich die Lieferung verzögert hatte.", "检查{item}之后，我们才明白交付为何被延迟。", "Только после проверки {item} мы поняли, почему доставка задержалась."],
        ["Bien qu'ils aient vérifié {item} deux fois, ils n'ont pas réussi à expliquer le problème.", "Although they had checked {item} twice, they could not explain the problem.", "Aunque habían revisado {item} dos veces, no lograron explicar el problema.", "Obwohl sie {item} zweimal überprüft hatten, konnten sie das Problem nicht erklären.", "尽管他们检查了{item}两次，还是无法解释这个问题。", "Хотя они дважды проверили {item}, им не удалось объяснить проблему."],
        ["Elle a insisté pour que {item} soit rendu avant la fermeture du bureau.", "She insisted that {item} be returned before the office closed.", "Insistió en que devolvieran {item} antes de que cerrara la oficina.", "Sie bestand darauf, dass {item} vor Büroschluss zurückgegeben wird.", "她坚持要求在办公室关门前归还{item}。", "Она настаивала на том, чтобы {item} вернули до закрытия офиса."],
        ["Il a nié avoir déplacé {item}, bien que l'inventaire indique le contraire.", "He denied moving {item}, even though the inventory says otherwise.", "Negó haber movido {item}, aunque el inventario indicaba lo contrario.", "Er bestritt, {item} bewegt zu haben, obwohl das Inventar auf das Gegenteil hinwies.", "他否认移动过{item}，尽管清单显示事实并非如此。", "Он отрицал, что перемещал {item}, хотя опись свидетельствовала об обратном."],
        ["Quelle qu'ait été la raison d'utiliser {item}, la décision devait être consignée.", "Whatever the reason for using {item}, the decision had to be recorded.", "Cualquiera que fuera la razón para usar {item}, había que dejar constancia de la decisión.", "Was auch immer der Grund dafür war, {item} zu verwenden, die Entscheidung musste dokumentiert werden.", "无论使用{item}的理由是什么，都必须记录这一决定。", "Какой бы ни была причина использовать {item}, решение следовало зафиксировать."]
    ]],
    ["master", [
        ["Si l'équipe avait examiné {item} avant l'échéance, l'erreur aurait pu être découverte.", "Had the team examined {item} before the deadline, the error might have been discovered.", "Si el equipo hubiera examinado {item} antes del plazo, quizá se habría descubierto el error.", "Hätte das Team {item} vor Ablauf der Frist untersucht, wäre der Fehler möglicherweise entdeckt worden.", "如果团队在截止日期前检查了{item}，就有可能发现这个错误。", "Если бы команда проверила {item} до истечения срока, ошибку, возможно, удалось бы обнаружить."],
        ["Le responsable a exigé que {item} soit remplacé avant la reprise de la réunion.", "The manager insisted that {item} be replaced before the meeting resumed.", "El responsable exigió que se sustituyera {item} antes de reanudar la reunión.", "Der Verantwortliche verlangte, dass {item} ersetzt wird, bevor die Sitzung fortgesetzt wird.", "负责人要求在会议继续前更换{item}。", "Руководитель потребовал заменить {item} до возобновления заседания."],
        ["S'ils livraient {item} aujourd'hui, nous pourrions encore terminer l'examen.", "Were they to deliver {item} today, we could still complete the review.", "Si entregaran {item} hoy, aún podríamos terminar la revisión.", "Würden sie {item} heute liefern, könnten wir die Prüfung noch abschließen.", "如果他们今天交付{item}，我们仍有可能完成审查。", "Если бы они доставили {item} сегодня, мы всё ещё могли бы завершить проверку."],
        ["Ce n'est qu'après que l'équipe a récupéré {item} que l'enquête a pu être close.", "Only after the team recovered {item} could the investigation be closed.", "Solo después de que el equipo recuperó {item} se pudo cerrar la investigación.", "Erst nachdem das Team {item} zurückerhalten hatte, konnte die Untersuchung abgeschlossen werden.", "团队找回{item}后，调查才得以结束。", "Расследование удалось завершить только после того, как команда вернула {item}."],
        ["Sans l'accord du directeur, personne n'aurait osé déplacer {item} pendant l'inspection.", "Without the manager's approval, no one would have dared to move {item} during the inspection.", "Sin la aprobación del director, nadie se habría atrevido a mover {item} durante la inspección.", "Ohne die Zustimmung des Leiters hätte niemand gewagt, {item} während der Inspektion zu bewegen.", "没有主管的批准，没人敢在检查期间移动{item}。", "Без разрешения руководителя никто не осмелился бы переместить {item} во время проверки."]
    ]]
];

const LANG_GENERATED_CHALLENGES = LANG_EXPANSION_TEMPLATES.flatMap(([levelKey, templates]) =>
    templates.flatMap(template => LANG_EXPANSION_OBJECTS.map(item => [
        levelKey,
        ...template.map((sentence, languageIndex) => sentence.replace(/\{item\}/g, item[languageIndex]))
    ]))
);

const CULTURE_QUESTIONS = [
["Quelle est la planète la plus proche du Soleil ?","Mercure",["Vénus","Terre","Mars"]],
["Quelle est la formule chimique de l'eau ?","H2O",["CO2","O2","NaCl"]],
["Quel est le symbole chimique de l'or ?","Au",["Ag","Fe","Cu"]],
["Qui a découvert la pénicilline ?","Alexander Fleming",["Louis Pasteur","Marie Curie","Isaac Newton"]],
["Quelle scientifique est connue pour ses travaux sur la radioactivité ?","Marie Curie",["Rosalind Franklin","Ada Lovelace","Hypatie"]],
["Qui a peint la Joconde ?","Léonard de Vinci",["Pablo Picasso","Vincent van Gogh","Claude Monet"]],
["Qui a écrit Les Misérables ?","Victor Hugo",["Molière","Voltaire","Émile Zola"]],
["En quelle année l'homme a-t-il marché sur la Lune pour la première fois ?","1969",["1961","1972","1959"]],
["En quelle année a eu lieu la Révolution française ?","1789",["1792","1804","1848"]],
["Combien d'os a environ un adulte humain ?","206",["208","200","210"]],
["Quel organe propulse le sang dans le corps ?","Le cœur",["Le foie","Les poumons","Les reins"]],
["Quel est le plus grand organe du corps humain ?","La peau",["Le foie","Le cœur","Les poumons"]],
["Quel est l'animal terrestre le plus rapide ?","Le guépard",["Le lion","L'antilope","Le cheval"]],
["Quel est le plus grand animal connu ?","La baleine bleue",["L'éléphant","Le requin baleine","La girafe"]],
["Quel est l'animal terrestre le plus grand ?","La girafe",["L'éléphant","Le rhinocéros","Le chameau"]],
["Quelle est la capitale politique du Cameroun ?","Yaoundé",["Douala","Garoua","Bafoussam"]],
["Quelle est la capitale économique du Cameroun ?","Douala",["Yaoundé","Garoua","Bafoussam"]],
["Qui était Nelson Mandela ?","Une figure de la lutte contre l'apartheid",["Un musicien","Un sportif","Un écrivain"]],
["Quelle monnaie est utilisée au Japon ?","Le yen",["Le yuan","Le won","Le roupie"]],
["Quelle est la monnaie de l'Afrique du Sud ?","Le rand",["Le naira","Le cedi","Le franc CFA"]],
["Quel sport oppose deux équipes de onze joueurs ?","Le football",["Le rugby","Le basketball","Le volleyball"]],
["Quelle est la distance d'un marathon ?","42,195 kilomètres",["20 km","10 km","100 km"]],
["Quelle langue est officielle au Brésil ?","Le portugais",["L'espagnol","L'anglais","Le français"]],
["Quel langage de balisage sert à créer des pages web ?","HTML",["CSS","JavaScript","Python"]],
["Quel langage sert à mettre en forme les pages web ?","CSS",["HTML","JavaScript","Python"]],
["Quel langage ajoute des interactions aux pages web ?","JavaScript",["HTML","CSS","Python"]],
["Quel processus utilisent les plantes pour produire leur matière organique ?","La photosynthèse",["La respiration","La transpiration","La germination"]],
["Quel gaz est indispensable à la respiration humaine ?","L'oxygène",["L'azote","Le dioxyde de carbone","L'hydrogène"]],
["Quel gaz est majoritaire dans l'atmosphère terrestre ?","L'azote",["L'oxygène","Le dioxyde de carbone","L'hélium"]],
["Quelle interaction attire les corps ayant une masse ?","La gravité",["L'électromagnétisme","La force nucléaire forte","La force nucléaire faible"]],
["Qu'est-ce que le son ?","Une vibration qui se propage dans un milieu matériel",["Une onde lumineuse","Un champ magnétique","Une particule"]],
["Qu'est-ce que la lumière ?","Un rayonnement électromagnétique visible par l'œil humain",["Un son","Une particule","Un champ magnétique"]],
["Quelle organisation internationale a été fondée en 1945 ?","L'ONU",["L'UE","L'OTAN","L'Union africaine"]],
["Quelle agence de l'ONU est dédiée à l'éducation, la science et la culture ?","L'UNESCO",["L'OMS","L'UNICEF","La FAO"]],
["Quelle est la plus petite planète du système solaire ?","Mercure",["Vénus","Mars","Pluton"]],
["Quelle est la plus grande planète du système solaire ?","Jupiter",["Saturne","Uranus","Neptune"]],
["Quelle planète est surnommée la planète rouge ?","Mars",["Vénus","Mercure","Jupiter"]],
["Quelle planète est célèbre pour ses anneaux ?","Saturne",["Jupiter","Uranus","Neptune"]],
["Qui a formulé la théorie de la relativité ?","Albert Einstein",["Isaac Newton","Galilée","Stephen Hawking"]],
["Qui a formulé la loi de la gravitation universelle ?","Isaac Newton",["Albert Einstein","Galilée","Johannes Kepler"]],
["Qui a développé la théorie de l'évolution ?","Charles Darwin",["Lamarck","Mendel","Pasteur"]],
["Quel peintre est associé au cubisme ?","Pablo Picasso",["Vincent van Gogh","Claude Monet","Salvador Dalí"]],
["Qui a peint Les Tournesols ?","Vincent van Gogh",["Pablo Picasso","Claude Monet","Paul Cézanne"]],
["Qui a écrit Hamlet ?","William Shakespeare",["Molière","Victor Hugo","Dante"]],
["Qui a écrit la Divine Comédie ?","Dante Alighieri",["Homère","Virgile","Ovide"]],
["Quel poète est martiniquais et homme politique ?","Aimé Césaire",["Léon-Gontran Damas","Léopold Sédar Senghor","Frantz Fanon"]],
["Quel est le plus petit État indépendant du monde ?","Le Vatican",["Monaco","Nauru","Saint-Marin"]],
["Quelle est la langue officielle de la France ?","Le français",["L'anglais","L'allemand","L'espagnol"]],
["Qui a inventé l'imprimerie à caractères mobiles en Europe ?","Johannes Gutenberg",["Léonard de Vinci","Galilée","Christophe Colomb"]],
["Qui a peint La Nuit étoilée ?","Vincent van Gogh",["Pablo Picasso","Claude Monet","Salvador Dalí"]],
["Qui a composé La Flûte enchantée ?","Wolfgang Amadeus Mozart",["Ludwig van Beethoven","Johann Sebastian Bach","Joseph Haydn"]],
["Qui a composé la Neuvième Symphonie ?","Ludwig van Beethoven",["Wolfgang Amadeus Mozart","Johann Sebastian Bach","Johannes Brahms"]],
["Qui a sculpté David ?","Michel-Ange",["Donatello","Bernin","Canova"]],
["Quelle est la capitale de l'Égypte antique ?","Thèbes",["Memphis","Alexandrie","Le Caire"]],
["Qui a construit les pyramides de Gizeh ?","Les Égyptiens anciens",["Les Romains","Les Grecs","Les Mayas"]],
["Qui a écrit L'Odyssée ?","Homère",["Virgile","Ovide","Hésiode"]],
["Qui a écrit L'Iliade ?","Homère",["Virgile","Ovide","Hésiode"]],
["Qui a fondé l'Empire mongol ?","Gengis Khan",["Kublai Khan","Tamerlan","Attila"]],
["Quel navigateur européen a atteint les Caraïbes en 1492 ?","Christophe Colomb",["Vasco de Gama","Magellan","Amerigo Vespucci"]],
["Quel navigateur a lancé l'expédition de circumnavigation achevée en 1522 ?","Ferdinand de Magellan",["Christophe Colomb","Vasco de Gama","James Cook"]],
["Qui a peint La Cène ?","Léonard de Vinci",["Michel-Ange","Raphael","Botticelli"]],
["Qui a écrit Le Prince ?","Nicolas Machiavel",["Thomas More","Érasme","Luther"]],
["Qui a rédigé la Déclaration des droits de l'homme et du citoyen ?","La Constituante (1789)",["Robespierre","Napoléon","Louis XVI"]],
["Qui a écrit Notre-Dame de Paris ?","Victor Hugo",["Molière","Émile Zola","Gustave Flaubert"]],
["Qui a écrit Les Fleurs du mal ?","Charles Baudelaire",["Arthur Rimbaud","Paul Verlaine","Stéphane Mallarmé"]],
["Qui a écrit À la recherche du temps perdu ?","Marcel Proust",["Albert Camus","Jean-Paul Sartre","André Gide"]],
["Qui a écrit L'Étranger ?","Albert Camus",["Jean-Paul Sartre","Simone de Beauvoir","André Gide"]],
["Qui a écrit Le Deuxième Sexe ?","Simone de Beauvoir",["Simone Veil","Olympe de Gouges","George Sand"]],
["Qui a écrit Candide ?","Voltaire",["Rousseau","Diderot","Montesquieu"]],
["Qui a écrit L'Esprit des lois ?","Montesquieu",["Voltaire","Rousseau","Diderot"]],
["Qui a écrit Le Contrat social ?","Jean-Jacques Rousseau",["Voltaire","Montesquieu","Diderot"]],
["Qui a inventé la machine à vapeur ?","James Watt",["Thomas Newcomen","Richard Trevithick","George Stephenson"]],
["Qui a breveté le téléphone aux États-Unis en 1876 ?","Alexander Graham Bell",["Thomas Edison","Nikola Tesla","Guglielmo Marconi"]],
["Qui a inventé l'ampoule électrique ?","Thomas Edison",["Nikola Tesla","Joseph Swan","Humphry Davy"]],
["Qui a inventé la radio ?","Guglielmo Marconi",["Nikola Tesla","Heinrich Hertz","Alexander Popov"]],
["Qui a inventé l'avion ?","Les frères Wright",["Louis Blériot","Charles Lindbergh","Amelia Earhart"]],
["Qui a peint La Naissance de Vénus ?","Sandro Botticelli",["Léonard de Vinci","Michel-Ange","Raphael"]],
["Qui a peint La Jeune Fille à la perle ?","Johannes Vermeer",["Rembrandt","Rubens","Vélasquez"]],
["Qui a peint Les Demoiselles d'Avignon ?","Pablo Picasso",["Georges Braque","Henri Matisse","Salvador Dalí"]],
["Qui a peint La Persistance de la mémoire ?","Salvador Dalí",["Pablo Picasso","Joan Miró","René Magritte"]],
["Qui a écrit Le Petit Prince ?","Antoine de Saint-Exupéry",["Jules Verne","Albert Camus","Victor Hugo"]],
["Qui a écrit Vingt Mille Lieues sous les mers ?","Jules Verne",["H.G. Wells","Ray Bradbury","Isaac Asimov"]],
["Qui a écrit La Guerre des mondes ?","H.G. Wells",["Jules Verne","Ray Bradbury","Isaac Asimov"]],
["Qui a écrit 1984 ?","George Orwell",["Aldous Huxley","Ray Bradbury","Isaac Asimov"]],
["Qui a écrit Le Meilleur des mondes ?","Aldous Huxley",["George Orwell","Ray Bradbury","Isaac Asimov"]],
["Qui a écrit Fahrenheit 451 ?","Ray Bradbury",["George Orwell","Aldous Huxley","Isaac Asimov"]],
["Qui a écrit Fondation ?","Isaac Asimov",["Arthur C. Clarke","Robert Heinlein","Ray Bradbury"]],
["Qui a écrit 2001, l'Odyssée de l'espace ?","Arthur C. Clarke",["Isaac Asimov","Ray Bradbury","Robert Heinlein"]],
["Qui a écrit Dune ?","Frank Herbert",["Isaac Asimov","Arthur C. Clarke","Ray Bradbury"]],
["Qui a écrit Le Seigneur des anneaux ?","J.R.R. Tolkien",["C.S. Lewis","George R.R. Martin","Terry Pratchett"]],
["Qui a écrit Harry Potter ?","J.K. Rowling",["Stephen King","George R.R. Martin","Terry Pratchett"]],
["Qui a écrit Le Nom de la rose ?","Umberto Eco",["Italo Calvino","Alessandro Baricco","Dario Fo"]],
["Qui a écrit Cent ans de solitude ?","Gabriel García Márquez",["Mario Vargas Llosa","Jorge Luis Borges","Pablo Neruda"]],
["Qui a écrit Le Rouge et le Noir ?","Stendhal",["Victor Hugo","Gustave Flaubert","Guy de Maupassant"]],
["Qui a écrit La Chartreuse de Parme ?","Stendhal",["Victor Hugo","Gustave Flaubert","Guy de Maupassant"]],
["Qui a écrit Germinal ?","Émile Zola",["Victor Hugo","Gustave Flaubert","Guy de Maupassant"]],
["Qui a écrit Nana ?","Émile Zola",["Victor Hugo","Gustave Flaubert","Guy de Maupassant"]],
["Qui a écrit Les Rougon-Macquart ?","Émile Zola",["Victor Hugo","Gustave Flaubert","Guy de Maupassant"]],
["Qui a écrit La Comédie humaine ?","Honoré de Balzac",["Victor Hugo","Gustave Flaubert","Guy de Maupassant"]],
["Qui a écrit Le Père Goriot ?","Honoré de Balzac",["Victor Hugo","Gustave Flaubert","Guy de Maupassant"]],
["Qui a écrit Eugénie Grandet ?","Honoré de Balzac",["Victor Hugo","Gustave Flaubert","Guy de Maupassant"]],
["Qui a écrit Les Chants de Maldoror ?","Comte de Lautréamont",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Une saison en enfer ?","Arthur Rimbaud",["Charles Baudelaire","Paul Verlaine","Stéphane Mallarmé"]],
["Qui a écrit Les Poèmes saturniens ?","Paul Verlaine",["Charles Baudelaire","Arthur Rimbaud","Stéphane Mallarmé"]],
["Qui a écrit Les Contemplations ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit La Légende des siècles ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Les Misérables ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Notre-Dame de Paris ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Le Dernier Jour d'un condamné ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Roméo et Juliette ?","William Shakespeare",["Molière","Victor Hugo","Dante"]],
["Qui a écrit Macbeth ?","William Shakespeare",["Molière","Victor Hugo","Dante"]],
["Qui a écrit L'Assommoir ?","Émile Zola",["Victor Hugo","Gustave Flaubert","Guy de Maupassant"]],
["Qui a écrit Bel-Ami ?","Guy de Maupassant",["Victor Hugo","Gustave Flaubert","Émile Zola"]],
["Qui a écrit Boule de Suif ?","Guy de Maupassant",["Victor Hugo","Gustave Flaubert","Émile Zola"]],
["Qui a écrit Madame Bovary ?","Gustave Flaubert",["Victor Hugo","Émile Zola","Guy de Maupassant"]],
["Qui a écrit L'Éducation sentimentale ?","Gustave Flaubert",["Victor Hugo","Émile Zola","Guy de Maupassant"]],
["Qui a écrit Les Trois Mousquetaires ?","Alexandre Dumas",["Victor Hugo","Molière","Honoré de Balzac"]],
["Qui a écrit Le Comte de Monte-Cristo ?","Alexandre Dumas",["Victor Hugo","Molière","Honoré de Balzac"]],
["Qui a écrit La Reine Margot ?","Alexandre Dumas",["Victor Hugo","Molière","Honoré de Balzac"]],
["Qui a écrit Vingt ans après ?","Alexandre Dumas",["Victor Hugo","Molière","Honoré de Balzac"]],
["Qui a écrit Le Vicomte de Bragelonne ?","Alexandre Dumas",["Victor Hugo","Molière","Honoré de Balzac"]],
["Qui a écrit Tartuffe ?","Molière",["Victor Hugo","Honoré de Balzac","Gustave Flaubert"]],
["Qui a écrit Le Misanthrope ?","Molière",["Victor Hugo","Honoré de Balzac","Gustave Flaubert"]],
["Qui a écrit L'Avare ?","Molière",["Victor Hugo","Honoré de Balzac","Gustave Flaubert"]],
["Qui a écrit Le Malade imaginaire ?","Molière",["Victor Hugo","Honoré de Balzac","Gustave Flaubert"]],
["Qui a écrit Les Fourberies de Scapin ?","Molière",["Victor Hugo","Honoré de Balzac","Gustave Flaubert"]],
["Qui a écrit Dom Juan ?","Molière",["Victor Hugo","Honoré de Balzac","Gustave Flaubert"]],
["Qui a écrit Le Cid ?","Pierre Corneille",["Molière","Victor Hugo","Jean Racine"]],
["Qui a écrit Horace ?","Pierre Corneille",["Molière","Victor Hugo","Jean Racine"]],
["Qui a écrit Cinna ?","Pierre Corneille",["Molière","Victor Hugo","Jean Racine"]],
["Qui a écrit Polyeucte ?","Pierre Corneille",["Molière","Victor Hugo","Jean Racine"]],
["Qui a écrit Phèdre ?","Jean Racine",["Molière","Victor Hugo","Pierre Corneille"]],
["Qui a écrit Andromaque ?","Jean Racine",["Molière","Victor Hugo","Pierre Corneille"]],
["Qui a écrit Britannicus ?","Jean Racine",["Molière","Victor Hugo","Pierre Corneille"]],
["Qui a écrit Athalie ?","Jean Racine",["Molière","Victor Hugo","Pierre Corneille"]],
["Qui a écrit Iphigénie ?","Jean Racine",["Molière","Victor Hugo","Pierre Corneille"]],
["Qui a écrit Les Plaideurs ?","Jean Racine",["Molière","Victor Hugo","Pierre Corneille"]],
["Qui a écrit Esther ?","Jean Racine",["Molière","Victor Hugo","Pierre Corneille"]],
["Qui a écrit Les Fleurs du mal ?","Charles Baudelaire",["Arthur Rimbaud","Paul Verlaine","Stéphane Mallarmé"]],
["Qui a écrit Les Contemplations ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit La Légende des siècles ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Les Châtiments ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Les Voix intérieures ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Les Rayons et les Ombres ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Les Orientales ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Les Feuilles d'automne ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Le Rhin ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit William Shakespeare ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Théâtre en liberté ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Actes et paroles ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Choses vues ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Notre-Dame de Paris ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Quatre-vingt-treize ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit L'Homme qui rit ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Les Travailleurs de la mer ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Bug-Jargal ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Han d'Islande ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Le Dernier Jour d'un condamné ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Claude Gueux ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Marie Tudor ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Marion de Lorme ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Le Roi s'amuse ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Lucrèce Borgia ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Ruy Blas ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Les Burgraves ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Les Chants du crépuscule ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Les Chants crépusculaires ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Les Étincelles ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Les Pauvres Gens ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit La Légende des siècles ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit La Fin de Satan ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Dieu ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit La Pitié suprême ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Les Quatre Vents de l'esprit ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit L'Année terrible ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit L'Art d'être grand-père ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Les Quatre Vents de l'esprit ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Toute la lyre ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Odes et ballades ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Les Feuilles d'automne ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Les Chansons des rues et des bois ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Les Voix intérieures ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Les Rayons et les Ombres ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Les Contemplations ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit La Légende des siècles ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Les Châtiments ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Les Orientales ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Les Feuilles d'automne ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Le Rhin ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit William Shakespeare ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Théâtre en liberté ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Actes et paroles ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Choses vues ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Notre-Dame de Paris ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Quatre-vingt-treize ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit L'Homme qui rit ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Les Travailleurs de la mer ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Bug-Jargal ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Han d'Islande ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Le Dernier Jour d'un condamné ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Claude Gueux ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Marie Tudor ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Marion de Lorme ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Le Roi s'amuse ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Lucrèce Borgia ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Ruy Blas ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
["Qui a écrit Les Burgraves ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
];
CULTURE_QUESTIONS.push(
    ["Qui a écrit Les Misérables ?","Victor Hugo",["Molière","Voltaire","Émile Zola"]],
    ["Qui a écrit Notre-Dame de Paris ?","Victor Hugo",["Molière","Émile Zola","Gustave Flaubert"]],
    ["Qui a écrit Germinal ?","Émile Zola",["Victor Hugo","Gustave Flaubert","Guy de Maupassant"]],
    ["Qui a écrit Nana ?","Émile Zola",["Victor Hugo","Gustave Flaubert","Guy de Maupassant"]],
    ["Qui a écrit L'Assommoir ?","Émile Zola",["Victor Hugo","Gustave Flaubert","Guy de Maupassant"]],
    ["Qui a écrit Madame Bovary ?","Gustave Flaubert",["Victor Hugo","Émile Zola","Guy de Maupassant"]],
    ["Qui a écrit L'Éducation sentimentale ?","Gustave Flaubert",["Victor Hugo","Émile Zola","Guy de Maupassant"]],
    ["Qui a écrit Bel-Ami ?","Guy de Maupassant",["Victor Hugo","Gustave Flaubert","Émile Zola"]],
    ["Qui a écrit Boule de Suif ?","Guy de Maupassant",["Victor Hugo","Gustave Flaubert","Émile Zola"]],
    ["Qui a écrit Le Rouge et le Noir ?","Stendhal",["Victor Hugo","Gustave Flaubert","Guy de Maupassant"]],
    ["Qui a écrit La Chartreuse de Parme ?","Stendhal",["Victor Hugo","Gustave Flaubert","Guy de Maupassant"]],
    ["Qui a écrit Les Trois Mousquetaires ?","Alexandre Dumas",["Victor Hugo","Molière","Honoré de Balzac"]],
    ["Qui a écrit Le Comte de Monte-Cristo ?","Alexandre Dumas",["Victor Hugo","Molière","Honoré de Balzac"]],
    ["Qui a écrit La Reine Margot ?","Alexandre Dumas",["Victor Hugo","Molière","Honoré de Balzac"]],
    ["Qui a écrit Tartuffe ?","Molière",["Victor Hugo","Honoré de Balzac","Gustave Flaubert"]],
    ["Qui a écrit Le Misanthrope ?","Molière",["Victor Hugo","Honoré de Balzac","Gustave Flaubert"]],
    ["Qui a écrit L'Avare ?","Molière",["Victor Hugo","Honoré de Balzac","Gustave Flaubert"]],
    ["Qui a écrit Le Malade imaginaire ?","Molière",["Victor Hugo","Honoré de Balzac","Gustave Flaubert"]],
    ["Qui a écrit Dom Juan ?","Molière",["Victor Hugo","Honoré de Balzac","Gustave Flaubert"]],
    ["Qui a écrit Le Cid ?","Pierre Corneille",["Molière","Victor Hugo","Jean Racine"]],
    ["Qui a écrit Phèdre ?","Jean Racine",["Molière","Victor Hugo","Pierre Corneille"]],
    ["Qui a écrit Andromaque ?","Jean Racine",["Molière","Victor Hugo","Pierre Corneille"]],
    ["Qui a écrit Britannicus ?","Jean Racine",["Molière","Victor Hugo","Pierre Corneille"]],
    ["Qui a écrit Hamlet ?","William Shakespeare",["Molière","Victor Hugo","Dante"]],
    ["Qui a écrit Macbeth ?","William Shakespeare",["Molière","Victor Hugo","Dante"]],
    ["Qui a écrit Roméo et Juliette ?","William Shakespeare",["Molière","Victor Hugo","Dante"]],
    ["Qui a écrit la Divine Comédie ?","Dante Alighieri",["Homère","Virgile","Ovide"]],
    ["Qui a écrit L'Odyssée ?","Homère",["Virgile","Ovide","Hésiode"]],
    ["Qui a écrit L'Iliade ?","Homère",["Virgile","Ovide","Hésiode"]],
    ["Qui a écrit Le Prince ?","Nicolas Machiavel",["Thomas More","Érasme","Luther"]],
    ["Qui a écrit Utopie ?","Thomas More",["Machiavel","Érasme","Luther"]],
    ["Qui a écrit Candide ?","Voltaire",["Rousseau","Diderot","Montesquieu"]],
    ["Qui a écrit L'Esprit des lois ?","Montesquieu",["Voltaire","Rousseau","Diderot"]],
    ["Qui a écrit Le Contrat social ?","Jean-Jacques Rousseau",["Voltaire","Montesquieu","Diderot"]],
    ["Qui a écrit Émile ou De l'éducation ?","Jean-Jacques Rousseau",["Voltaire","Montesquieu","Diderot"]],
    ["Qui a écrit La Nouvelle Héloïse ?","Jean-Jacques Rousseau",["Voltaire","Montesquieu","Diderot"]],
    ["Qui a écrit Les Confessions ?","Jean-Jacques Rousseau",["Voltaire","Montesquieu","Diderot"]],
    ["Qui a écrit Encyclopédie ?","Diderot",["Voltaire","Rousseau","Montesquieu"]],
    ["Qui a écrit Les Fleurs du mal ?","Charles Baudelaire",["Arthur Rimbaud","Paul Verlaine","Stéphane Mallarmé"]],
    ["Qui a écrit Les Contemplations ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
    ["Qui a écrit La Légende des siècles ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
    ["Qui a écrit Les Châtiments ?","Victor Hugo",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
    ["Qui a écrit Une saison en enfer ?","Arthur Rimbaud",["Charles Baudelaire","Paul Verlaine","Stéphane Mallarmé"]],
    ["Qui a écrit Illuminations ?","Arthur Rimbaud",["Charles Baudelaire","Paul Verlaine","Stéphane Mallarmé"]],
    ["Qui a écrit Les Poèmes saturniens ?","Paul Verlaine",["Charles Baudelaire","Arthur Rimbaud","Stéphane Mallarmé"]],
    ["Qui a écrit Les Fêtes galantes ?","Paul Verlaine",["Charles Baudelaire","Arthur Rimbaud","Stéphane Mallarmé"]],
    ["Qui a écrit Poèmes et Poésies ?","Stéphane Mallarmé",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
    ["Qui a écrit Un coup de dés ?","Stéphane Mallarmé",["Charles Baudelaire","Arthur Rimbaud","Paul Verlaine"]],
    ["Qui a écrit L'Étranger ?","Albert Camus",["Jean-Paul Sartre","Simone de Beauvoir","André Gide"]],
    ["Qui a écrit Le Mythe de Sisyphe ?","Albert Camus",["Jean-Paul Sartre","Simone de Beauvoir","André Gide"]],
    ["Qui a écrit La Peste ?","Albert Camus",["Jean-Paul Sartre","Simone de Beauvoir","André Gide"]],
    ["Qui a écrit L'Être et le Néant ?","Jean-Paul Sartre",["Albert Camus","Simone de Beauvoir","André Gide"]],
    ["Qui a écrit Huis Clos ?","Jean-Paul Sartre",["Albert Camus","Simone de Beauvoir","André Gide"]],
    ["Qui a écrit Le Deuxième Sexe ?","Simone de Beauvoir",["Simone Veil","Olympe de Gouges","George Sand"]],
    ["Qui a écrit Les Mandarins ?","Simone de Beauvoir",["Simone Veil","Olympe de Gouges","George Sand"]],
    ["Qui a écrit À la recherche du temps perdu ?","Marcel Proust",["Albert Camus","Jean-Paul Sartre","André Gide"]],
    ["Qui a écrit Du côté de chez Swann ?","Marcel Proust",["Albert Camus","Jean-Paul Sartre","André Gide"]],
    ["Qui a écrit Le Petit Prince ?","Antoine de Saint-Exupéry",["Jules Verne","Albert Camus","Victor Hugo"]],
    ["Qui a écrit Vol de nuit ?","Antoine de Saint-Exupéry",["Jules Verne","Albert Camus","Victor Hugo"]],
    ["Qui a écrit Vingt Mille Lieues sous les mers ?","Jules Verne",["H.G. Wells","Ray Bradbury","Isaac Asimov"]],
    ["Qui a écrit Le Tour du monde en quatre-vingts jours ?","Jules Verne",["H.G. Wells","Ray Bradbury","Isaac Asimov"]],
    ["Qui a écrit L'Île mystérieuse ?","Jules Verne",["H.G. Wells","Ray Bradbury","Isaac Asimov"]],
    ["Qui a écrit 1984 ?","George Orwell",["Aldous Huxley","Ray Bradbury","Isaac Asimov"]],
    ["Qui a écrit La Ferme des animaux ?","George Orwell",["Aldous Huxley","Ray Bradbury","Isaac Asimov"]],
    ["Qui a écrit Le Meilleur des mondes ?","Aldous Huxley",["George Orwell","Ray Bradbury","Isaac Asimov"]],
    ["Qui a écrit Fahrenheit 451 ?","Ray Bradbury",["George Orwell","Aldous Huxley","Isaac Asimov"]],
    ["Qui a écrit Fondation ?","Isaac Asimov",["Arthur C. Clarke","Robert Heinlein","Ray Bradbury"]],
    ["Qui a écrit Moi, robot ?","Isaac Asimov",["Arthur C. Clarke","Robert Heinlein","Ray Bradbury"]],
    ["Qui a écrit 2001, l'Odyssée de l'espace ?","Arthur C. Clarke",["Isaac Asimov","Ray Bradbury","Robert Heinlein"]],
    ["Qui a écrit Rendez-vous avec Rama ?","Arthur C. Clarke",["Isaac Asimov","Ray Bradbury","Robert Heinlein"]],
    ["Qui a écrit Dune ?","Frank Herbert",["Isaac Asimov","Arthur C. Clarke","Ray Bradbury"]],
    ["Qui a écrit Le Seigneur des anneaux ?","J.R.R. Tolkien",["C.S. Lewis","George R.R. Martin","Terry Pratchett"]],
    ["Qui a écrit Le Hobbit ?","J.R.R. Tolkien",["C.S. Lewis","George R.R. Martin","Terry Pratchett"]],
    ["Qui a écrit Harry Potter à l'école des sorciers ?","J.K. Rowling",["Stephen King","George R.R. Martin","Terry Pratchett"]],
    ["Qui a écrit Le Nom de la rose ?","Umberto Eco",["Italo Calvino","Alessandro Baricco","Dario Fo"]],
    ["Qui a écrit Cent ans de solitude ?","Gabriel García Márquez",["Mario Vargas Llosa","Jorge Luis Borges","Pablo Neruda"]],
    ["Qui a écrit L'Amour au temps du choléra ?","Gabriel García Márquez",["Mario Vargas Llosa","Jorge Luis Borges","Pablo Neruda"]],
    ["Qui a peint la Joconde ?","Léonard de Vinci",["Pablo Picasso","Vincent van Gogh","Claude Monet"]],
    ["Qui a peint La Nuit étoilée ?","Vincent van Gogh",["Pablo Picasso","Claude Monet","Salvador Dalí"]],
    ["Qui a peint Les Tournesols ?","Vincent van Gogh",["Pablo Picasso","Claude Monet","Paul Cézanne"]],
    ["Qui a peint La Naissance de Vénus ?","Sandro Botticelli",["Léonard de Vinci","Michel-Ange","Raphael"]],
    ["Qui a peint La Cène ?","Léonard de Vinci",["Michel-Ange","Raphael","Botticelli"]],
    ["Qui a peint La Jeune Fille à la perle ?","Johannes Vermeer",["Rembrandt","Rubens","Vélasquez"]],
    ["Qui a peint La Persistance de la mémoire ?","Salvador Dalí",["Pablo Picasso","Joan Miró","René Magritte"]],
    ["Qui a peint Les Demoiselles d'Avignon ?","Pablo Picasso",["Georges Braque","Henri Matisse","Salvador Dalí"]],
    ["Qui a peint Guernica ?","Pablo Picasso",["Georges Braque","Henri Matisse","Salvador Dalí"]],
    ["Qui a peint La Liberté guidant le peuple ?","Eugène Delacroix",["Théodore Géricault","Édouard Manet","Gustav Klimt"]],
    ["Qui a peint Le Radeau de la Méduse ?","Théodore Géricault",["Eugène Delacroix","Claude Monet","Edvard Munch"]],
    ["Qui a peint Olympia ?","Édouard Manet",["Claude Monet","Gustav Klimt","Diego Vélasquez"]],
    ["Qui a peint Le Déjeuner sur l'herbe ?","Édouard Manet",["Claude Monet","Pablo Picasso","Gustav Klimt"]],
    ["Qui a peint Impression, soleil levant ?","Claude Monet",["Édouard Manet","Vincent van Gogh","Paul Cézanne"]],
    ["Qui a peint Les Coquelicots ?","Claude Monet",["Édouard Manet","Vincent van Gogh","Paul Cézanne"]],
    ["Qui a peint La Nuit ?","Vincent van Gogh",["Claude Monet","Paul Cézanne","Edvard Munch"]],
    ["Qui a peint Les Ménines ?","Diego Vélasquez",["Francisco Goya","El Greco","Pablo Picasso"]],
    ["Qui a peint Le Baiser ?","Gustav Klimt",["Edvard Munch","Claude Monet","Diego Vélasquez"]],
    ["Qui a peint Le Cri ?","Edvard Munch",["Gustav Klimt","Vincent van Gogh","Pablo Picasso"]],
    ["Qui a peint La Chambre à coucher ?","Vincent van Gogh",["Claude Monet","Paul Cézanne","Édouard Manet"]],
    ["Qui a composé La Flûte enchantée ?","Wolfgang Amadeus Mozart",["Ludwig van Beethoven","Johann Sebastian Bach","Joseph Haydn"]],
    ["Qui a composé la Neuvième Symphonie ?","Ludwig van Beethoven",["Wolfgang Amadeus Mozart","Johann Sebastian Bach","Johannes Brahms"]],
    ["Qui a composé les Quatre Saisons ?","Antonio Vivaldi",["Johann Sebastian Bach","Wolfgang Amadeus Mozart","Georg Friedrich Haendel"]],
    ["Qui a composé le Boléro ?","Maurice Ravel",["Claude Debussy","Georges Bizet","Camille Saint-Saëns"]],
    ["Qui a composé Carmen ?","Georges Bizet",["Giuseppe Verdi","Giacomo Puccini","Wolfgang Amadeus Mozart"]],
    ["Qui a composé La Traviata ?","Giuseppe Verdi",["Georges Bizet","Giacomo Puccini","Gioachino Rossini"]],
    ["Qui a composé Le Lac des cygnes ?","Pyotr Ilyich Tchaïkovski",["Sergueï Rachmaninov","Igor Stravinsky","Alexandre Borodine"]],
    ["Qui a composé Casse-noisette ?","Pyotr Ilyich Tchaïkovski",["Sergueï Rachmaninov","Igor Stravinsky","Alexandre Borodine"]],
    ["Qui a composé la Cinquième Symphonie ?","Ludwig van Beethoven",["Wolfgang Amadeus Mozart","Johann Sebastian Bach","Johannes Brahms"]],
    ["Qui a composé l'Ode à la joie ?","Ludwig van Beethoven",["Wolfgang Amadeus Mozart","Johann Sebastian Bach","Johannes Brahms"]],
    ["Qui a composé la Messe en si mineur ?","Johann Sebastian Bach",["Georg Friedrich Haendel","Antonio Vivaldi","Wolfgang Amadeus Mozart"]],
    ["Qui a composé les Brandebourgeois ?","Johann Sebastian Bach",["Georg Friedrich Haendel","Antonio Vivaldi","Wolfgang Amadeus Mozart"]],
    ["Qui a composé Le Sacre du printemps ?","Igor Stravinsky",["Serge Prokofiev","Pyotr Ilyich Tchaïkovski","Maurice Ravel"]],
    ["Qui a composé Pierre et le Loup ?","Serge Prokofiev",["Dmitri Chostakovitch","Pyotr Ilyich Tchaïkovski","Igor Stravinsky"]],
    ["Qui a composé le Carnaval des animaux ?","Camille Saint-Saëns",["Maurice Ravel","Claude Debussy","Georges Bizet"]],
    ["Qui a composé la Symphonie du Nouveau Monde ?","Antonín Dvořák",["Bedřich Smetana","Johannes Brahms","Pyotr Ilyich Tchaïkovski"]],
    ["Qui a découvert la pénicilline ?","Alexander Fleming",["Louis Pasteur","Marie Curie","Isaac Newton"]],
    ["Qui a découvert les rayons X ?","Wilhelm Röntgen",["Henri Becquerel","Marie Curie","Thomas Edison"]],
    ["Qui a découvert la radioactivité ?","Henri Becquerel",["Marie Curie","Pierre Curie","Ernest Rutherford"]],
    ["Quels scientifiques ont publié le modèle de la double hélice de l'ADN en 1953 ?","James Watson et Francis Crick",["Maurice Wilkins et Rosalind Franklin","Linus Pauling et Robert Corey","Erwin Chargaff et Oswald Avery"]],
    ["Qui a formulé la théorie de la relativité ?","Albert Einstein",["Isaac Newton","Galilée","Stephen Hawking"]],
    ["Qui a formulé la loi de la gravitation universelle ?","Isaac Newton",["Albert Einstein","Galilée","Johannes Kepler"]],
    ["Qui a développé la théorie de l'évolution ?","Charles Darwin",["Lamarck","Mendel","Pasteur"]],
    ["Qui a inventé l'imprimerie ?","Johannes Gutenberg",["Léonard de Vinci","Galilée","Christophe Colomb"]],
    ["Qui a breveté le téléphone aux États-Unis en 1876 ?","Alexander Graham Bell",["Thomas Edison","Nikola Tesla","Guglielmo Marconi"]],
    ["Qui a inventé l'ampoule électrique ?","Thomas Edison",["Nikola Tesla","Joseph Swan","Humphry Davy"]],
    ["Qui a inventé la radio ?","Guglielmo Marconi",["Nikola Tesla","Heinrich Hertz","Alexander Popov"]],
    ["Qui a inventé l'avion ?","Les frères Wright",["Louis Blériot","Charles Lindbergh","Amelia Earhart"]],
    ["Qui a inventé la machine à vapeur ?","James Watt",["Thomas Newcomen","Richard Trevithick","George Stephenson"]],
    ["Qui a inventé le télégraphe ?","Samuel Morse",["Alexander Graham Bell","Guglielmo Marconi","Thomas Edison"]],
    ["Qui a inventé l'appareil photo ?","Nicéphore Niépce",["Louis Daguerre","George Eastman","William Henry Fox Talbot"]],
    ["Quel duo français a organisé la première séance publique payante du Cinématographe en 1895 ?","Les frères Lumière",["Georges Méliès","Alice Guy-Blaché","Thomas Edison"]],
    ["Quel mathématicien anglais a conçu la machine analytique, précurseur de l'ordinateur ?","Charles Babbage",["Alan Turing","Blaise Pascal","John von Neumann"]],
    ["Qui a inventé le World Wide Web ?","Tim Berners-Lee",["Vint Cerf","Robert Kahn","Bill Gates"]],
    ["Qui a découvert la gravité ?","Isaac Newton",["Albert Einstein","Galilée","Johannes Kepler"]],
    ["Qui a découvert les lois du mouvement ?","Isaac Newton",["Albert Einstein","Galilée","Johannes Kepler"]],
    ["Quel chimiste anglais a isolé l'oxygène en 1774 ?","Joseph Priestley",["Carl Wilhelm Scheele","Antoine Lavoisier","Henry Cavendish"]],
    ["Quel chimiste anglais a identifié l'hydrogène en 1766 ?","Henry Cavendish",["Joseph Priestley","Antoine Lavoisier","Robert Boyle"]],
    ["Qui a découvert le radium ?","Marie Curie",["Pierre Curie","Albert Einstein","Isaac Newton"]],
    ["Qui a découvert le polonium ?","Marie Curie",["Pierre Curie","Albert Einstein","Isaac Newton"]],
    ["Quelle est la formule chimique de l'eau ?","H2O",["CO2","O2","NaCl"]],
    ["Quel est le symbole chimique de l'or ?","Au",["Ag","Fe","Cu"]],
    ["Quel est le symbole chimique de l'argent ?","Ag",["Au","Fe","Cu"]],
    ["Quel est le symbole chimique du fer ?","Fe",["Au","Ag","Cu"]],
    ["Quel est le symbole chimique du cuivre ?","Cu",["Au","Ag","Fe"]],
    ["Quel est le symbole chimique du plomb ?","Pb",["Au","Ag","Fe"]],
    ["Quel est le symbole chimique du mercure ?","Hg",["Au","Ag","Fe"]],
    ["Quel est le symbole chimique du sodium ?","Na",["Au","Ag","Fe"]],
    ["Quel est le symbole chimique du potassium ?","K",["Au","Ag","Fe"]],
    ["Quel est le symbole chimique du calcium ?","Ca",["Au","Ag","Fe"]],
    ["Quelle est la vitesse de la lumière ?","300 000 km/s",["150 000 km/s","30 000 km/s","1 000 000 km/s"]],
    ["Combien d'os a un adulte humain ?","206",["186","256","200"]],
    ["Quel est le plus grand organe du corps humain ?","La peau",["Le foie","Le cœur","Les poumons"]],
    ["Quel organe pompe le sang ?","Le cœur",["Le foie","Les poumons","Les reins"]],
    ["Quel est l'animal terrestre le plus rapide ?","Le guépard",["Le lion","L'antilope","Le cheval"]],
    ["Quel est le plus grand animal connu ?","La baleine bleue",["L'éléphant","Le requin baleine","La girafe"]],
    ["Quel est l'animal terrestre le plus grand ?","La girafe",["L'éléphant","Le rhinocéros","Le chameau"]],
    ["Quelle est la planète la plus proche du Soleil ?","Mercure",["Vénus","Terre","Mars"]],
    ["Quelle est la plus grande planète du système solaire ?","Jupiter",["Saturne","Uranus","Neptune"]],
    ["Quelle planète est surnommée la planète rouge ?","Mars",["Vénus","Mercure","Jupiter"]],
    ["Quelle planète est célèbre pour ses anneaux ?","Saturne",["Jupiter","Uranus","Neptune"]],
    ["Quelle est la plus petite planète du système solaire ?","Mercure",["Vénus","Mars","Pluton"]],
    ["En quelle année l'homme a-t-il marché sur la Lune ?","1969",["1961","1972","1959"]],
    ["En quelle année a eu lieu la Révolution française ?","1789",["1792","1804","1848"]],
    ["Quel navigateur européen a atteint les Caraïbes en 1492 ?","Christophe Colomb",["Vasco de Gama","Magellan","Amerigo Vespucci"]],
    ["Quel navigateur a lancé l'expédition de circumnavigation achevée en 1522 ?","Ferdinand de Magellan",["Christophe Colomb","Vasco de Gama","James Cook"]],
    ["Qui a fondé l'Empire mongol ?","Gengis Khan",["Kublai Khan","Tamerlan","Attila"]],
    ["Qui a écrit L'Odyssée ?","Homère",["Virgile","Ovide","Hésiode"]],
    ["Qui a écrit L'Iliade ?","Homère",["Virgile","Ovide","Hésiode"]],
    ["Qui a peint La Nuit étoilée ?","Vincent van Gogh",["Pablo Picasso","Claude Monet","Salvador Dalí"]],
    ["Qui a composé La Flûte enchantée ?","Wolfgang Amadeus Mozart",["Ludwig van Beethoven","Johann Sebastian Bach","Joseph Haydn"]],
    ["Qui a breveté le téléphone aux États-Unis en 1876 ?","Alexander Graham Bell",["Thomas Edison","Nikola Tesla","Guglielmo Marconi"]],
    ["Qui a découvert la pénicilline ?","Alexander Fleming",["Louis Pasteur","Marie Curie","Isaac Newton"]],
    ["Quelle est la formule chimique de l'eau ?","H2O",["CO2","O2","NaCl"]],
    ["Quelle est la plus grande planète du système solaire ?","Jupiter",["Saturne","Uranus","Neptune"]],
    ["Quel est le plus grand organe du corps humain ?","La peau",["Le foie","Le cœur","Les poumons"]],
);

const CULTURE_QUESTIONS_BY_LEVEL = buildQuestionLevels(CULTURE_QUESTIONS, "culture");

const GEO_QUESTIONS_EN_BY_LEVEL = buildQuestionLevels(GEO_QUESTIONS_EN, "geo", GEO_QUESTIONS);
const CULTURE_QUESTIONS_EN_BY_LEVEL = buildQuestionLevels(CULTURE_QUESTIONS_EN, "culture", CULTURE_QUESTIONS);
const GEO_QUESTIONS_ES_BY_LEVEL = buildQuestionLevels(GEO_QUESTIONS_ES, "geo", GEO_QUESTIONS);
const CULTURE_QUESTIONS_ES_BY_LEVEL = buildQuestionLevels(CULTURE_QUESTIONS_ES, "culture", CULTURE_QUESTIONS);
const GEO_QUESTIONS_DE_BY_LEVEL = buildQuestionLevels(GEO_QUESTIONS_DE, "geo", GEO_QUESTIONS);
const CULTURE_QUESTIONS_DE_BY_LEVEL = buildQuestionLevels(CULTURE_QUESTIONS_DE, "culture", CULTURE_QUESTIONS);
const GEO_QUESTIONS_ZH_BY_LEVEL = buildQuestionLevels(GEO_QUESTIONS_ZH, "geo", GEO_QUESTIONS);
const CULTURE_QUESTIONS_ZH_BY_LEVEL = buildQuestionLevels(CULTURE_QUESTIONS_ZH, "culture", CULTURE_QUESTIONS);
const GEO_QUESTIONS_RU_BY_LEVEL = buildQuestionLevels(GEO_QUESTIONS_RU, "geo", GEO_QUESTIONS);
const CULTURE_QUESTIONS_RU_BY_LEVEL = buildQuestionLevels(CULTURE_QUESTIONS_RU, "culture", CULTURE_QUESTIONS);

function mergeQuestionLevels(primary, additions) {
    return Object.fromEntries(DIFFICULTY_LEVELS.map(({ key }) => [
        key,
        [...primary[key], ...(additions[key] || [])]
    ]));
}

const BANKS_BY_LANG = {
    fr: { geo: mergeQuestionLevels(GEO_QUESTIONS_BY_LEVEL, GEO_WIKIDATA_QUESTIONS.fr), culture: mergeQuestionLevels(CULTURE_QUESTIONS_BY_LEVEL, CULTURE_WIKIDATA_QUESTIONS.fr) },
    en: { geo: mergeQuestionLevels(GEO_QUESTIONS_EN_BY_LEVEL, GEO_WIKIDATA_QUESTIONS.en), culture: mergeQuestionLevels(CULTURE_QUESTIONS_EN_BY_LEVEL, CULTURE_WIKIDATA_QUESTIONS.en) },
    es: { geo: mergeQuestionLevels(GEO_QUESTIONS_ES_BY_LEVEL, GEO_WIKIDATA_QUESTIONS.es), culture: mergeQuestionLevels(CULTURE_QUESTIONS_ES_BY_LEVEL, CULTURE_WIKIDATA_QUESTIONS.es) },
    de: { geo: mergeQuestionLevels(GEO_QUESTIONS_DE_BY_LEVEL, GEO_WIKIDATA_QUESTIONS.de), culture: mergeQuestionLevels(CULTURE_QUESTIONS_DE_BY_LEVEL, CULTURE_WIKIDATA_QUESTIONS.de) },
    zh: { geo: mergeQuestionLevels(GEO_QUESTIONS_ZH_BY_LEVEL, GEO_WIKIDATA_QUESTIONS.zh), culture: mergeQuestionLevels(CULTURE_QUESTIONS_ZH_BY_LEVEL, CULTURE_WIKIDATA_QUESTIONS.zh) },
    ru: { geo: mergeQuestionLevels(GEO_QUESTIONS_RU_BY_LEVEL, GEO_WIKIDATA_QUESTIONS.ru), culture: mergeQuestionLevels(CULTURE_QUESTIONS_RU_BY_LEVEL, CULTURE_WIKIDATA_QUESTIONS.ru) },
};

// ============================================================================
// MATHS : difficulté croissante, petits problèmes et réflexion rapide
// ============================================================================
const MATH_QUESTION_TEXT = {
    fr: {
        double: n => `Le double de ${n} ?`,
        half: n => `La moitié de ${n} ?`,
        division: (n, d) => `Combien font ${n} ÷ ${d} ?`,
        sequence: (a, b, c) => `Suite : ${a}, ${b}, ${c}, ?`,
        percentage: n => `25 % de ${n} ?`,
        perimeter: (a, b) => `Périmètre d'un rectangle de ${a} cm sur ${b} cm ?`,
        solve: equation => `Résous : ${equation}`,
        threeQuarters: n => `3/4 de ${n} ?`,
        squareRoot: n => `Racine carrée de ${n} ?`,
        triangle: (a, b) => `Triangle rectangle : côtés ${a} cm et ${b} cm. Hypoténuse ?`,
        discountedPrice: n => `Prix de ${n} FCFA après une remise de 20 % ?`,
        leastCommonMultiple: (a, b) => `Quel est le plus petit commun multiple de ${a} et ${b} ?`,
        quadratic: (equation) => `Résous : ${equation} = 0. Quelle est la plus grande racine ?`,
        system: (sum, difference) => `Système : x + y = ${sum} et x - y = ${difference}. Quelle est la valeur de x ?`,
        diagonals: n => `Combien de diagonales possède un polygone régulier à ${n} côtés ?`,
        changingPrice: n => `Un article à ${n} FCFA augmente de 10 %, puis baisse de 10 %. Prix final ?`
    },
    en: {
        double: n => `What is double ${n}?`,
        half: n => `What is half of ${n}?`,
        division: (n, d) => `What is ${n} ÷ ${d}?`,
        sequence: (a, b, c) => `Sequence: ${a}, ${b}, ${c}, ?`,
        percentage: n => `What is 25% of ${n}?`,
        perimeter: (a, b) => `What is the perimeter of a rectangle measuring ${a} cm by ${b} cm?`,
        solve: equation => `Solve: ${equation}`,
        threeQuarters: n => `What is 3/4 of ${n}?`,
        squareRoot: n => `What is the square root of ${n}?`,
        triangle: (a, b) => `Right triangle: sides ${a} cm and ${b} cm. What is the hypotenuse?`,
        discountedPrice: n => `What is the price of ${n} CFA after a 20% discount?`,
        leastCommonMultiple: (a, b) => `What is the least common multiple of ${a} and ${b}?`,
        quadratic: equation => `Solve: ${equation} = 0. What is the larger root?`,
        system: (sum, difference) => `System: x + y = ${sum} and x - y = ${difference}. What is x?`,
        diagonals: n => `How many diagonals does a regular polygon with ${n} sides have?`,
        changingPrice: n => `An item costing ${n} CFA rises by 10%, then falls by 10%. What is its final price?`
    },
    es: {
        double: n => `¿Cuál es el doble de ${n}?`,
        half: n => `¿Cuál es la mitad de ${n}?`,
        division: (n, d) => `¿Cuánto es ${n} ÷ ${d}?`,
        sequence: (a, b, c) => `Secuencia: ${a}, ${b}, ${c}, ¿?`,
        percentage: n => `¿Cuánto es el 25 % de ${n}?`,
        perimeter: (a, b) => `¿Cuál es el perímetro de un rectángulo de ${a} cm por ${b} cm?`,
        solve: equation => `Resuelve: ${equation}`,
        threeQuarters: n => `¿Cuánto es 3/4 de ${n}?`,
        squareRoot: n => `¿Cuál es la raíz cuadrada de ${n}?`,
        triangle: (a, b) => `Triángulo rectángulo: lados de ${a} cm y ${b} cm. ¿Cuál es la hipotenusa?`,
        discountedPrice: n => `¿Cuál es el precio de ${n} FCFA después de un descuento del 20 %?`,
        leastCommonMultiple: (a, b) => `¿Cuál es el mínimo común múltiplo de ${a} y ${b}?`,
        quadratic: equation => `Resuelve: ${equation} = 0. ¿Cuál es la raíz mayor?`,
        system: (sum, difference) => `Sistema: x + y = ${sum} y x - y = ${difference}. ¿Cuál es el valor de x?`,
        diagonals: n => `¿Cuántas diagonales tiene un polígono regular de ${n} lados?`,
        changingPrice: n => `Un artículo cuesta ${n} FCFA; sube un 10 % y luego baja un 10 %. ¿Cuál es el precio final?`
    },
    de: {
        double: n => `Wie viel ist das Doppelte von ${n}?`,
        half: n => `Wie viel ist die Hälfte von ${n}?`,
        division: (n, d) => `Wie viel ist ${n} ÷ ${d}?`,
        sequence: (a, b, c) => `Folge: ${a}, ${b}, ${c}, ?`,
        percentage: n => `Wie viel sind 25 % von ${n}?`,
        perimeter: (a, b) => `Wie groß ist der Umfang eines Rechtecks mit ${a} cm Länge und ${b} cm Breite?`,
        solve: equation => `Löse: ${equation}`,
        threeQuarters: n => `Wie viel sind 3/4 von ${n}?`,
        squareRoot: n => `Was ist die Quadratwurzel aus ${n}?`,
        triangle: (a, b) => `Rechtwinkliges Dreieck: Seiten ${a} cm und ${b} cm. Wie lang ist die Hypotenuse?`,
        discountedPrice: n => `Wie viel kostet ${n} FCFA nach einem Rabatt von 20 %?`,
        leastCommonMultiple: (a, b) => `Was ist das kleinste gemeinsame Vielfache von ${a} und ${b}?`,
        quadratic: equation => `Löse: ${equation} = 0. Was ist die größere Lösung?`,
        system: (sum, difference) => `Gleichungssystem: x + y = ${sum} und x - y = ${difference}. Wie groß ist x?`,
        diagonals: n => `Wie viele Diagonalen hat ein regelmäßiges Vieleck mit ${n} Seiten?`,
        changingPrice: n => `Ein Artikel kostet ${n} FCFA. Der Preis steigt um 10 % und sinkt dann um 10 %. Wie hoch ist der Endpreis?`
    },
    zh: {
        double: n => `${n} 的两倍是多少？`,
        half: n => `${n} 的一半是多少？`,
        division: (n, d) => `${n} ÷ ${d} 等于多少？`,
        sequence: (a, b, c) => `数列：${a}、${b}、${c}、？`,
        percentage: n => `${n} 的 25% 是多少？`,
        perimeter: (a, b) => `一个长 ${a} 厘米、宽 ${b} 厘米的长方形，周长是多少？`,
        solve: equation => `求解：${equation}`,
        threeQuarters: n => `${n} 的四分之三是多少？`,
        squareRoot: n => `${n} 的平方根是多少？`,
        triangle: (a, b) => `直角三角形的两条直角边分别为 ${a} 厘米和 ${b} 厘米，斜边长多少？`,
        discountedPrice: n => `${n} FCFA 打八折后的价格是多少？`,
        leastCommonMultiple: (a, b) => `${a} 和 ${b} 的最小公倍数是多少？`,
        quadratic: equation => `求解：${equation} = 0。较大的根是多少？`,
        system: (sum, difference) => `方程组：x + y = ${sum}，x - y = ${difference}。x 等于多少？`,
        diagonals: n => `一个有 ${n} 条边的正多边形有多少条对角线？`,
        changingPrice: n => `一件商品原价 ${n} FCFA，先涨价 10%，再降价 10%。最终价格是多少？`
    },
    ru: {
        double: n => `Чему равен удвоенный ${n}?`,
        half: n => `Чему равна половина числа ${n}?`,
        division: (n, d) => `Сколько будет ${n} ÷ ${d}?`,
        sequence: (a, b, c) => `Последовательность: ${a}, ${b}, ${c}, ?`,
        percentage: n => `Сколько составляет 25 % от ${n}?`,
        perimeter: (a, b) => `Найдите периметр прямоугольника со сторонами ${a} см и ${b} см.`,
        solve: equation => `Решите: ${equation}`,
        threeQuarters: n => `Чему равны 3/4 от ${n}?`,
        squareRoot: n => `Чему равен квадратный корень из ${n}?`,
        triangle: (a, b) => `Прямоугольный треугольник: катеты ${a} см и ${b} см. Чему равна гипотенуза?`,
        discountedPrice: n => `Сколько стоит товар за ${n} FCFA после скидки 20 %?`,
        leastCommonMultiple: (a, b) => `Чему равно наименьшее общее кратное ${a} и ${b}?`,
        quadratic: equation => `Решите: ${equation} = 0. Чему равен больший корень?`,
        system: (sum, difference) => `Система: x + y = ${sum}, x - y = ${difference}. Чему равен x?`,
        diagonals: n => `Сколько диагоналей у правильного многоугольника с ${n} сторонами?`,
        changingPrice: n => `Товар стоил ${n} FCFA. Сначала цена выросла на 10 %, затем снизилась на 10 %. Какова итоговая цена?`
    }
};

function generateVariedMath(diffKey, language = 'fr') {
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const text = MATH_QUESTION_TEXT[language] || MATH_QUESTION_TEXT.fr;
    let question;
    let value;

    if (diffKey === 'basique') {
        const a = rand(1, 99), b = rand(1, 99);
        const kind = rand(0, 3);
        if (kind === 0) { question = `${a} + ${b} = ?`; value = a + b; }
        else if (kind === 1) { const high = Math.max(a, b), low = Math.min(a, b); question = `${high} - ${low} = ?`; value = high - low; }
        else if (kind === 2) { question = text.double(a); value = 2 * a; }
        else { const even = a * 2; question = text.half(even); value = a; }
    } else if (diffKey === 'facile') {
        const a = rand(2, 20), b = rand(2, 12);
        const kind = rand(0, 3);
        if (kind === 0) { question = `${a} + ${b} = ?`; value = a + b; }
        else if (kind === 1) { question = `${a} × ${b} = ?`; value = a * b; }
        else if (kind === 2) { question = text.division(a * b, b); value = a; }
        else { const step = rand(2, 6); question = text.sequence(a, a + step, a + 2 * step); value = a + 3 * step; }
    } else if (diffKey === 'moyen') {
        const a = rand(5, 30), b = rand(3, 15);
        const kind = rand(0, 3);
        if (kind === 0) { question = `${a} + ${b} × 2 = ?`; value = a + b * 2; }
        else if (kind === 1) { question = text.percentage(a * 4); value = a; }
        else if (kind === 2) { const perimeter = 2 * (a + b); question = text.perimeter(a, b); value = perimeter; }
        else { const x = rand(3, 20), result = 2 * x + 5; question = text.solve(`2x + 5 = ${result}`); value = x; }
    } else if (diffKey === 'difficile') {
        const kind = rand(0, 3);
        if (kind === 0) { const x = rand(4, 50), result = 3 * x - 7; question = text.solve(`3x - 7 = ${result}`); value = x; }
        else if (kind === 1) { const n = rand(3, 60); question = text.threeQuarters(4 * n); value = 3 * n; }
        else if (kind === 2) { const root = rand(5, 50); question = text.squareRoot(root * root); value = root; }
        else { const factor = rand(4, 30), offset = rand(3, 24); question = `${factor} × (${offset} + 5) - ${factor * 5} = ?`; value = factor * offset; }
    } else if (diffKey === 'tres_difficile') {
        const kind = rand(0, 3);
        if (kind === 0) { const x = rand(5, 125), result = 5 * x + 3; question = text.solve(`5x + 3 = ${result}`); value = x; }
        else if (kind === 1) { const x = rand(2, 75); question = text.triangle(3 * x, 4 * x); value = 5 * x; }
        else if (kind === 2) { const base = rand(2, 150) * 100; question = text.discountedPrice(base); value = base * 0.8; }
        else { const x = rand(3, 100); question = text.leastCommonMultiple(x, x + 1); value = x * (x + 1); }
    } else {
        const kind = rand(0, 3);
        if (kind === 0) { const r1 = rand(1, 30), r2 = rand(1, 30); question = text.quadratic(`x² - ${r1 + r2}x + ${r1 * r2}`); value = Math.max(r1, r2); }
        else if (kind === 1) { const x = rand(2, 30), y = rand(2, 30); question = text.system(x + y, x - y); value = x; }
        else if (kind === 2) { const n = rand(3, 60); question = text.diagonals(n); value = n * (n - 3) / 2; }
        else { const a = rand(3, 50), b = rand(3, 50); question = text.changingPrice(a * b * 100); value = a * b * 100 * 1.1 * 0.9; }
    }

    value = Number(value.toFixed(2));
    const answer = String(value);
    const delta = Math.max(1, Math.round(Math.abs(value) * 0.1));
    const choices = new Set([answer]);
    for (const offset of [delta, -delta, delta * 2, -delta * 2, delta * 3, -delta * 3, 1, -1, 2, -2]) {
        if (choices.size >= 4) break;
        const candidate = Number((value + offset).toFixed(2));
        if (Number.isFinite(candidate) && String(candidate) !== answer) choices.add(String(candidate));
    }
    return { question, answer, options: shuffleOptions([...choices]) };
}

// Gestionnaire de pioche équilibrée par thème et par niveau.
const QuestionManager = (() => {
    let usedSignatures = new Set();
    let langSource = 'fr';
    let langTarget = 'en';
    const languageLevelCache = new Map();

    function setLangPair(source, target) {
        const languages = ['fr', 'en', 'es', 'de', 'zh', 'ru'];
        if (!languages.includes(source) || !languages.includes(target) || source === target) return false;
        langSource = source;
        langTarget = target;
        languageLevelCache.clear();
        return true;
    }

    function questionSignature(theme, row) {
        const question = theme === 'anglais' && row[5] != null ? row[5] : row[0];
        return normalizeQuestionText(question);
    }

    function resetHistory() {
        usedSignatures.clear();
    }

    function getRunHistory() {
        return [...usedSignatures];
    }

    function restoreHistory(history) {
        usedSignatures = new Set(
            Array.isArray(history)
                ? history.filter(signature => typeof signature === 'string' && signature.length > 0)
                : []
        );
    }

    function getLanguageLevels(source, target) {
        const pairKey = `${source}_${target}`;
        if (languageLevelCache.has(pairKey)) return languageLevelCache.get(pairKey);

        let rows = [];
        const languageIndex = { fr: 0, en: 1, es: 2, de: 3, zh: 4, ru: 5 };

        // LANG_PHRASES: [fr, en, es, de, zh, ru]
        rows = LANG_PHRASES.map(row => {
            const sourceText = row[languageIndex[source]];
            const targetText = row[languageIndex[target]];
            return [`Traduis : « ${sourceText} »`, targetText, [], 'phrase', null, sourceText];
        });

        // LANG_ADVANCED_PHRASES: [levelKey, fr, en, es, de, zh, ru]
        rows.push(...LANG_ADVANCED_PHRASES.map(row => {
            const levelKey = row[0];
            const sourceText = row[languageIndex[source] + 1];
            const targetText = row[languageIndex[target] + 1];
            return [`Traduis : « ${sourceText} »`, targetText, [], 'phrase', levelKey, sourceText];
        }));

        rows.push(...LANG_MULTILINGUAL_CHALLENGES.map(([levelKey, ...translations]) => {
            const sourceText = translations[languageIndex[source]];
            const targetText = translations[languageIndex[target]];
            return [`Traduis : « ${sourceText} »`, targetText, [], 'phrase', levelKey, sourceText];
        }).filter(row => row[0] && row[1]));
        rows.push(...LANG_GENERATED_CHALLENGES.map(([levelKey, ...translations]) => {
            const sourceText = translations[languageIndex[source]];
            const targetText = translations[languageIndex[target]];
            return [`Traduis : « ${sourceText} »`, targetText, [], 'phrase', levelKey, sourceText];
        }));
        rows.push(...LANG_VOCAB.map(item => [
            `Traduis le mot « ${item[source]} »`, item[target], [], 'word', null, item[source]
        ]).filter(row => row[0] && row[1] && !String(row[1]).includes('undefined')));
        const levels = buildLanguageLevels(rows);
        languageLevelCache.set(pairKey, levels);
        return levels;
    }

    function pickQuestion(theme, levelKey, pool) {
        if (!pool || pool.length === 0) return null;
        const unused = pool.filter(row => !usedSignatures.has(questionSignature(theme, row)));
        if (unused.length === 0) {
            throw new Error(`Banque épuisée sans répétition : ${theme}, niveau ${levelKey}`);
        }
        const row = unused[Math.floor(Math.random() * unused.length)];
        usedSignatures.add(questionSignature(theme, row));
        return row;
    }

    function hasUnusedQuestion(theme, levelKey) {
        if (theme === 'maths') return true;
        if (theme === 'anglais') {
            const pool = getLanguageLevels(langSource, langTarget)[levelKey];
            return pool.some(row => !usedSignatures.has(questionSignature(theme, row)));
        }
        const banks = BANKS_BY_LANG[langSource] || BANKS_BY_LANG.fr;
        const pool = theme === 'geo' ? banks.geo[levelKey] : banks.culture[levelKey];
        return pool.some(row => !usedSignatures.has(questionSignature(theme, row)));
    }

    function createQuestion(question, answer, distractors, level, theme) {
        const answerText = String(answer ?? '').trim();
        const correctKey = normalizeAnswerChoice(answerText);
        const options = selectQuestionOptions(question, answerText, distractors);
        if (!options.some(option => normalizeAnswerChoice(option) === correctKey)) {
            throw new Error(`La bonne réponse est absente des choix : ${question}`);
        }
        return {
            question,
            answer: answerText,
            options,
            diffKey: level.key,
            diffLabel: level.label,
            theme
        };
    }

    function buildLangQuestionText(type, sourceText) {
        const uiLang = (typeof window !== 'undefined' && window.UI18n && window.UI18n.language) || 'fr';
        const templates = {
            fr: { phrase: `Traduis : « ${sourceText} »`, word: `Traduis le mot « ${sourceText} »` },
            en: { phrase: `Translate: "${sourceText}"`, word: `Translate the word "${sourceText}"` },
            es: { phrase: `Traduce: « ${sourceText} »`, word: `Traduce la palabra « ${sourceText} »` },
            de: { phrase: `Übersetze: „${sourceText}“`, word: `Übersetze das Wort „${sourceText}“` },
            zh: { phrase: `翻译：「${sourceText}」`, word: `翻译单词：「${sourceText}」` },
            ru: { phrase: `Переведи: « ${sourceText} »`, word: `Переведи слово « ${sourceText} »` }
        };
        const pack = templates[uiLang] || templates.fr;
        return type === 'word' ? pack.word : pack.phrase;
    }

    function generateLangQuestion(level) {
        const source = langSource;
        const target = langTarget;
        const languageLevels = getLanguageLevels(source, target);
        const pool = languageLevels[level.key];
        const row = pickQuestion(`anglais_${source}_${target}`, level.key, pool);
        if (!row) throw new Error(`Banque de traduction vide pour le niveau ${level.label}`);
        const distractors = translationDistractors(pool, Object.values(languageLevels).flat(), row);
        const localizedQuestion = buildLangQuestionText(row[3], row[5] != null ? row[5] : row[0]);
        return createQuestion(localizedQuestion, row[1], distractors, level, 'anglais');
    }

    function getNextQuestion(selectedTheme, difficultyKey) {
        const level = DIFFICULTY_LEVELS.find(item => item.key === difficultyKey) || DIFFICULTY_LEVELS[0];
        let theme = selectedTheme;
        if (selectedTheme === 'random') {
            const availableThemes = ['maths', 'geo', 'anglais', 'culture']
                .filter(item => hasUnusedQuestion(item, level.key));
            theme = availableThemes[Math.floor(Math.random() * availableThemes.length)];
        }

        if (!theme) throw new Error(`Aucun thème ne contient de question disponible : niveau ${level.key}`);
        if (theme === 'maths') {
            let generated;
            let signature;
            let tries = 0;
            do {
                generated = generateVariedMath(level.key, langSource);
                signature = normalizeQuestionText(generated.question);
                tries++;
            } while (usedSignatures.has(signature) && tries < 1000);
            if (usedSignatures.has(signature)) {
                throw new Error(`Générateur de maths épuisé sans répétition : niveau ${level.key}`);
            }
            usedSignatures.add(signature);
            return createQuestion(generated.question, generated.answer, generated.options.filter(value => value !== generated.answer), level, 'maths');
        }

        if (theme === 'anglais') return generateLangQuestion(level);

        const banks = BANKS_BY_LANG[langSource] || BANKS_BY_LANG.fr;
        const pool = theme === 'geo' ? banks.geo[level.key] : banks.culture[level.key];
        const row = pickQuestion(theme, level.key, pool);
        if (!row) throw new Error(`Banque vide : ${theme}, niveau ${level.label}`);
        return createQuestion(row[0], row[1], row[2], level, theme);
    }

    function getBankStats(source = langSource, target = langTarget) {
        const levels = {};
        const banks = BANKS_BY_LANG[source] || BANKS_BY_LANG.fr;
        for (const level of DIFFICULTY_LEVELS) {
            const geoPool = banks.geo[level.key];
            const translationPool = getLanguageLevels(source, target)[level.key];
            const culturePool = banks.culture[level.key];
            levels[level.key] = {
                geo: new Set(geoPool.map(row => questionSignature('geo', row))).size,
                anglais: new Set(translationPool.map(row => questionSignature('anglais', row))).size,
                culture: new Set(culturePool.map(row => questionSignature('culture', row))).size,
                maths: 240
            };
        }
        return levels;
    }

    return { getNextQuestion, resetHistory, restoreHistory, getRunHistory, setLangPair, getBankStats };
})();

