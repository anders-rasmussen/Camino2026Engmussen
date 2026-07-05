/* Camino Português da Costa 2026 – al rejsedata ét sted.
   Rute-data (pois/legs/koordinater) genbrugt fra det oprindelige kort.
   Følsom data (bookingnumre, priser, tracking-URL'er, rejsendes navne) er
   bevidst udeladt – appen serveres offentligt. */

const DAYS = [
  {
    date: "11. juli", short: "11/7", weekday: "Lørdag",
    title: "Porto Lufthavn → Vila do Conde",
    from: "Mindelo", to: "Vila do Conde",
    dist: "~10–12 km", terrain: "Fladt – passadiços (træbroer), sandstier",
    lodging: "Casa da Praia",
    address: "Av. Cidade de Olinda 41-2DTO, 4480-661 Vila do Conde",
    breakfast: "–", washer: "Ja",
    desc: "Efter landing i Porto kl. 09:30 starter eventyret. For at undgå Portos forstæder og industri tager I Metroens linje E (lilla) til stationen Verdes. Her skifter I til linje B (rød) mod Póvoa de Varzim og står af ved Mindelo. Herfra går I de få kilometer ned mod kysten, hvor I rammer de første træbroer (passadiços). Den perfekte bløde start langs vandet ind til Vila do Conde.",
    transport: {
      title: "Transport fra lufthavnen til Mindelo",
      lines: [
        "Linje E (lilla) starter direkte i terminalen og kører dagligt fra ca. 06:00 til 01:00.",
        "Afgangsfrekvens: ca. hvert 20.–30. minut (intervaller mellem ca. 18 og 35 min afhængigt af tidspunkt og ugedag). Med landing kl. 09:30 venter I sjældent mere end 20 min – regn med at være på metroen ca. kl. 10:00–10:15 efter bagage og billetkøb.",
        "Skift: linje E løber sammen med linje B ved stationen Verdes – her skifter I til et linje B-tog mod Póvoa de Varzim og står af ved Mindelo.",
        "Billet: køb én enkelt Andante Azul-billet pr. person til Mindelo. Ved automaten i lufthavnen køber I fire genopladelige Andante Azul-papkort (0,60 € pr. stk., ét pr. person) og lægger én enkeltbillet på hvert til Mindelo. Turen krydser flere zoner: regn med ca. Z6–Z7 = 3,20–3,65 € pr. person, i alt ca. 15–17 € for jer fire. Ingen alders- eller grupperabat.",
        "Rejsetid: ca. 45–60 min i alt inkl. skiftet ved Verdes.",
        "Tjek før afrejse: bekræft på metrodoporto.pt at jeres linje B-tog faktisk standser i Mindelo (enkelte afgange springer mindre stationer over), og at sommertabellen ikke har ændret sig."
      ]
    },
    highlights: [
      { n: "Santa Clara-klosteret", d: "Det enorme middelalder-kloster fra 1318 dominerer Vila do Condes skyline." },
      { n: "Akvædukten", d: "Berømt akvædukt fra 1700-tallet med 999 buer, der strækker sig 4 km." },
      { n: "De første passadiços", d: "Boardwalkene starter allerede ved Mindelo-stranden – magisk at gå over klitterne med havet ved siden af." }
    ],
    tips: [
      "Første stempel: få jeres første \"sello\" i pilgrimspasset på turistkontoret eller i en kirke i Vila do Conde.",
      "Frokost: find en café i Vila Chã på vejen og få den første portugisiske kaffe og Pastel de Nata.",
      "Aftensmad: prøv frisk fisk langs floden Ave – Vila do Conde er en gammel fiskeby."
    ]
  },
  {
    date: "12. juli", short: "12/7", weekday: "Søndag",
    title: "Vila do Conde → Esposende",
    from: "Vila do Conde", to: "Esposende",
    dist: "~26 km", terrain: "Fladt til let bølget – boardwalks, sandstier, korte asfaltstræk",
    lodging: "Vivas House",
    address: "Rua Manuel de Boaventura 6, 4740-305 Esposende",
    breakfast: "Nej", washer: "Ja",
    desc: "Dagens lange etape fører jer langs en af Portugals mest spektakulære kyststræk. I starter med Passadiços do Mindelo – kilometer efter kilometer af træ-boardwalks svævende over klipper og klitter. Derefter passerer I kystbyen Apúlia, kendt for sine vindmøller. Etapen kulminerer med krydsningen af Cávado-floden, hvor I ankommer til Esposende med udsigt over flodmundingen og Atlanterhavet.",
    highlights: [
      { n: "Passadiços do Mindelo", d: "Ikoniske træstier langs klipperne nord for Vila do Conde – etapens mest fotogene strækning." },
      { n: "Apúlia", d: "Charmerende kystby med traditionelle vindmøller i klitterne – godt pausested." },
      { n: "Cávado-flodens munding", d: "Den dramatiske overgang fra kyststi til Esposende over floden." }
    ],
    tips: [
      "Senda Litoral: vælg stien helt ude ved vandet mod Viana – fladere og køligere i juli-varmen.",
      "Tidlig start (senest kl. 07): 26 km i juli, og passadiços har næsten ingen skygge.",
      "Vand: pak mindst 1,5 liter pr. person – langt mellem caféerne i klitterne.",
      "Solbeskyttelse: solcreme, hat og solbriller – næsten ingen skygge på denne etape."
    ]
  },
  {
    date: "13. juli", short: "13/7", weekday: "Mandag",
    title: "Esposende → Castelo do Neiva",
    from: "Esposende", to: "Castelo do Neiva",
    dist: "~14 km", terrain: "Fladt – Senda Litoral (kyststier), korte skovstræk",
    lodging: "Minho at home",
    address: "Rua de Sendim 173, 4935-564 Viana do Castelo (Castelo do Neiva)",
    breakfast: "Ja", washer: "",
    desc: "En bevidst kort etape efter gårsdagens 26 km. I forlader Esposende ad Senda Litoral og bevæger jer ind i et mere landligt og frodigt område. Landskabet skifter fra åbne klitter til grønne marker og pinjeskov. I krydser Neiva-floden over en smuk bro og ankommer til den stille landsby Castelo do Neiva – et af de mest autentiske steder på hele ruten.",
    highlights: [
      { n: "Neiva-flodens delta", d: "Naturskønt kryds med fiskerbåde og fugleliv, fredet som naturreservat." },
      { n: "Landsbystemning", d: "Castelo do Neiva er ægte portugisisk provins med vinmarker og stille gader." },
      { n: "Solnedgang over havet", d: "Gå de få hundrede meter ned til stranden og nyd solnedgangen over Atlanterhavet." }
    ],
    tips: [
      "Overnatningsstedet har morgenmad inkluderet – slap af og nyd omgivelserne.",
      "Køb frugt og vand i Esposende inden I går – få butikker undervejs.",
      "Brug den korte dag til at pleje fødderne og vaske tøj."
    ]
  },
  {
    date: "14. juli", short: "14/7", weekday: "Tirsdag",
    title: "Castelo do Neiva → Viana do Castelo",
    from: "Castelo do Neiva", to: "Viana do Castelo",
    dist: "~11 km", terrain: "Fladt langs kysten, let stigning ind mod byen",
    lodging: "Rua Grande Hotel",
    address: "Rua Grande 78, 4900-542 Viana do Castelo",
    breakfast: "Ja", washer: "",
    desc: "Endnu en kort og behagelig etape. I følger kyststien nordpå gennem pinjeskov og over små sandstrande. Viana do Castelo åbenbarer sig langsomt – først ser I Monte de Santa Luzia med kirken på toppen, og derefter glider I ind i byen over den imponerende jernbro bygget af Gustave Eiffels firma (1878). Viana er en af rutens absolutte perler og fortjener en hel eftermiddag.",
    highlights: [
      { n: "Santa Luzia-kirken", d: "Tag kabelbanen (~3 €) op. Udsigten over Atlanterhavet, Lima-mundingen og byen er verdensklasse." },
      { n: "Praça da República", d: "Byens smukke hovedtorv med gammelt rådhus og springvand." },
      { n: "Gil Eannes hospitalsskib", d: "Gammelt hospitalsskib ved havnen, omdannet til museum og vandrerhjem." },
      { n: "Eiffel-broen", d: "Den elegante jernbro over Lima-floden er byens vartegn." }
    ],
    tips: [
      "Med kun 11 km er I fremme til frokost – brug eftermiddagen på Santa Luzia og den gamle bydel.",
      "Aftensmad: prøv bacalhau (klipfisk) på en lokal restaurant.",
      "Morgenmad inkluderet – sov lidt længere i morgen."
    ]
  },
  {
    date: "15. juli", short: "15/7", weekday: "Onsdag",
    title: "Viana do Castelo → Vila Praia de Âncora",
    from: "Viana do Castelo", to: "Vila Praia de Âncora",
    dist: "~21 km", terrain: "Blandet – kyststi, skovsti, kort passage gennem gammel jernbanetunnel",
    lodging: "Baixinho Guest House",
    address: "Rua Cândido dos Reis 16, 4910-460 Vila Praia de Âncora",
    breakfast: "Nej", washer: "",
    desc: "En længere dag med et af rutens mest varierede landskaber. I forlader Viana over Lima-floden og følger kysten nordpå. Ved Afife passerer I et dramatisk klippelandskab og den gamle, nedlagte jernbanetunnel – et sjovt fotostop. Længere fremme ligger Forte do Cão med udsigt over havet. Dagen slutter i den charmerende badeby Vila Praia de Âncora med sin lange sandstrand.",
    highlights: [
      { n: "Jernbanetunnelen ved Afife", d: "En gammel nedlagt jernbanetunnel, som stien fører igennem – stemningsfuld og elsket af pilgrimme." },
      { n: "Forte do Cão", d: "Lille, velplaceret kystfort med panoramaudsigt. Godt sted til en drikkepause." },
      { n: "Montedor-fyrtårnet", d: "Hvidt fyrtårn på en klippepynt med vild udsigt." },
      { n: "Dolmen de Barrosa", d: "5.000 år gammel megalit-grav lige ud til stranden – arkæologi og hav i ét." }
    ],
    tips: [
      "Strandtid: Âncora er en skøn badeby – en dukkert i Atlanterhavet er god restitution.",
      "Fiskemarked: prøv grillfisk til aftensmad ved havnen.",
      "Pak rigeligt vand – få caféer mellem Afife og Âncora."
    ]
  },
  {
    date: "16. juli", short: "16/7", weekday: "Torsdag",
    title: "Vila Praia de Âncora → Oia (grænseovergang)",
    from: "Vila Praia de Âncora", to: "Oia",
    dist: "~20 km", terrain: "Fladt til Caminha, derefter kuperet klippekyst i Spanien",
    lodging: "Casa Picota",
    address: "Calle la Palma 5, 36794 Oia (Spanien)",
    breakfast: "Ja", washer: "",
    desc: "En episk dag med to lande! Først går I langs kysten til Caminha, den sidste portugisiske by ved Minhos flodmunding. Her tager I båden over til Spanien og lander i A Guarda. Herfra ændrer alt sig: landskabet bliver dramatisk med klipper, og stien bugter sig langs klippekysten hele vejen til Oia, hvor det betagende Monasterio de Santa María de Oia ligger lige ned til havet.",
    transport: {
      title: "Bådoverfart Caminha → A Guarda",
      lines: [
        "Booket med Xacobeo Transfer (den officielle pilgrimsbåd). Afgang kl. 09:30 (portugisisk tid) fra Caminha → Camposancos (A Guarda). Kan bookes online i forvejen på xacobeotransfer.com (6 € pr. person).",
        "NB – portugisisk tid: bådens tid er portugisisk tid. I lander i Spanien ca. kl. 10:40 spansk tid (Spanien er én time foran). Vær ved kajen i Caminha i god tid før kl. 09:30 (portugisisk tid).",
        "Overfarten tager ca. 10 min port-til-port. Afbestilling/ændring er mulig indtil 24 timer før afgang. Ved vejrvarsel der suspenderer sejladsen, giver de besked.",
        "Kontakt: +34 613 01 12 26 / info@xacobeotransfer.com.",
        "Advarsel: hold jer til Xacobeo Transfer – konkurrenten Taximar (Bar do Ferry) har ikke en autoriseret havn i Spanien og kan påstå, at Xacobeo ikke sejler.",
        "Der er ingen pascheck ved overfarten, men det er et magisk øjeblik. Bekræft overfarten dagen før, da tider kan afhænge af vejr og tidevand."
      ]
    },
    highlights: [
      { n: "Caminha", d: "Smuk Praça da República med middelalderligt klokketårn. Sidste chance for billig portugisisk kaffe." },
      { n: "Bådturen over Minho", d: "Kort (~10 min), men magisk overfart – se Portugal og Spanien samtidig." },
      { n: "Monte Santa Trega (A Guarda)", d: "Valgfri afstikker (~3 km ekstra) op til det keltiske castro-anlæg med 360° udsigt." },
      { n: "Klosterkysten mod Oia", d: "De sidste kilometer langs klipperne er rute-højdepunktet." }
    ],
    tips: [
      "Vigtigt! Stil uret én time frem, når I træder i land i Spanien (UTC+2 om sommeren).",
      "Husk et spansk stempel i A Guarda eller Oia.",
      "Stadig euro – men prisniveauet er lidt højere end i Portugal.",
      "Morgenmad på Casa Picota, så I ikke behøver bekymre jer om det næste morgen."
    ]
  },
  {
    date: "17. juli", short: "17/7", weekday: "Fredag",
    title: "Oia → Baiona",
    from: "Oia", to: "Baiona",
    dist: "~16 km", terrain: "Kuperet klippekyst, derefter faldende mod Baiona-bugten",
    lodging: "Airbnb-lejlighed",
    address: "Camiño do Valentón, Baiona (Galicien, Spanien)",
    breakfast: "Nej", washer: "Ja",
    desc: "En fantastisk kystvandring langs Galiciens dramatiske Atlanterhavskyst. I forlader Oia og følger klippestien med åndeløse udsigter. Ved Cabo Silleiro passerer I det ikoniske fyrtårn, og herfra åbner Baiona-bugten sig med Monterreal-fæstningen tronende i horisonten. Nedgangen til Baiona er magisk – byen vokser langsomt frem foran jer.",
    highlights: [
      { n: "Cabo Silleiro fyrtårn", d: "Hvidt fyrtårn på en klippepynt med vild udsigt over Atlanterhavet." },
      { n: "Monterreal-fæstningen", d: "Enorm fæstning (nu Parador-hotel), Baionas vartegn. Gratis gåtur langs 2 km fæstningsmur." },
      { n: "Pinta-replikaen", d: "Kopi af karavellen der i 1493 bragte nyheden om Amerika til Europa – Baiona hørte det først." },
      { n: "Havnepromenaden", d: "Farverige fiskerbåde, tapas-barer og udsigt til fæstningen." }
    ],
    tips: [
      "Vaskedag: I har vaskemaskine i lejligheden – vask alt vandretøjet nu.",
      "Aftensmad: prøv pulpo á feira (blæksprutte) og et glas kølig Albariño-vin.",
      "2 nætter i lejlighed – handl ind til morgenmad og snacks i centrum."
    ]
  },
  {
    date: "18. juli", short: "18/7", weekday: "Lørdag",
    title: "Hviledag i Baiona",
    from: "Baiona", to: "Baiona",
    dist: "0 km", terrain: "Hviledag – afslapning",
    rest: true,
    lodging: "Airbnb-lejlighed",
    address: "Camiño do Valentón, Baiona (Galicien, Spanien)",
    breakfast: "Nej", washer: "Ja",
    desc: "En velfortjent pause midt på turen. Baiona er som skabt til at slappe af i – en af Galiciens smukkeste kystbyer med historisk charme, der går helt tilbage til romertiden.",
    highlights: [
      { n: "Fæstningsvandring (2 km)", d: "Langsom tur rundt om Monterreal-murene – fladt, smukt, ~45 min." },
      { n: "Stranddag", d: "Praia de Barbeira ligger tættest på centrum og er god til en rolig formiddag." },
      { n: "Islas Cíes (valgfri udflugt)", d: "Både fra havnen til øgruppen \"Galiciens Caribien\". Skal bookes på forhånd (pirenaica.es / islasCies.net)." }
    ],
    tips: [
      "Find en tapasbar bag havnen og nyd Albariño og lokale skaldyr (mejillones, navajas).",
      "Pilgrimsstempel: Colegiata de Santa María i centrum.",
      "Fodpleje: køb Compeed eller Betadine på apoteket – det er midt på turen, invester i fødderne."
    ]
  },
  {
    date: "19. juli", short: "19/7", weekday: "Søndag",
    title: "Baiona → Nigrán",
    from: "Baiona", to: "Nigrán",
    dist: "~10–12 km", terrain: "Fladt langs kysten, let kuperet gennem A Ramallosa",
    lodging: "Rincón Do Demo",
    address: "Rúa Carrasca A 18, 36379 Nigrán (Spanien)",
    breakfast: "Nej", washer: "",
    desc: "Efter hviledagen er dette en bevidst blød start. I forlader Baiona og går langs kysten til A Ramallosa, hvor I krydser den smukke romanske middelalder-bro over Miñor-floden. Herefter følger I kysten forbi den brede, hvide sandstrand Playa América – en af Galiciens fineste – og videre til det rolige Nigrán.",
    highlights: [
      { n: "Ponte Románica de A Ramallosa", d: "Smuk middelalder-bro med rundbuede stenportaler – et klassisk Camino-fotomotiv." },
      { n: "Playa América", d: "Lang, bred sandstrand med roligt vand. Perfekt til en pause eller dukkert." },
      { n: "Udsigt mod Islas Cíes", d: "Fra strandpromenaden ses øerne ude i fjorden – smukt i eftermiddagslyset." }
    ],
    tips: [
      "Kort etape – brug et par timer på Playa América før I tjekker ind.",
      "Køb frokost, snacks og rigeligt vand i dag: morgendagens Senda da Auga har INGEN butikker eller caféer.",
      "Bed værten bestille en taxa til i morgen tidlig til Zamáns (starten af Senda da Auga)."
    ]
  },
  {
    date: "20. juli", short: "20/7", weekday: "Mandag",
    title: "Nigrán → Redondela (Senda da Auga)",
    from: "Nigrán", to: "Redondela",
    dist: "~15 km vandring (efter taxi/bus)", terrain: "Fladt – skyggefuld skovsti langs vandkanal (Senda da Auga)",
    lodging: "Casa África y Ramona",
    address: "Rúa Campo das Redes 23, 36800 Redondela (Spanien)",
    breakfast: "Nej", washer: "Ja",
    desc: "Den officielle kystrute går tværs igennem Vigo – ca. 25 km ad trafikerede veje og kedelig forstad, turens eneste virkelig grimme strækning. Løsningen: tag en taxi fra Nigrán til Zamáns og gå Senda da Auga derfra – en fantastisk flad sti langs en gammel vandledning højt oppe på bjergsiden bag Vigo, med udsigt over hele Vigo-fjorden og Rande-broen, helt uden trafik.",
    transport: {
      title: "Undgå det kedelige gennem Vigo",
      lines: [
        "Den officielle kystrute går tværs igennem Vigo – ca. 25 km ad trafikerede veje, industrikvarterer og kedelig forstad. Det er turens eneste virkelig grimme strækning.",
        "Taxi (anbefalet): bestil fra Rincón Do Demo direkte til Zamáns (landsbyen hvor Senda da Auga begynder). Bed chaufføren køre til \"inicio de la Senda da Auga en Zamáns\" eller koordinaterne 42.1880, -8.6970. Ca. 20 min, koster omkring 15–20 €.",
        "Bybus: Vigo har et godt busnet (Vitrasa/Vigobus). I kan tage taxa til Vigo busstation og derfra bybus L15A mod Zamáns – men taxa hele vejen er nemmere med rygsække og 4 personer.",
        "Ruten: fra Zamáns er der ca. 12–15 km ad Senda da Auga ned til Redondela. Stien følger den gamle vandkanal (\"Traída de Aguas\") langs bjergsiden – bred, flad og næsten helt skygget af eukalyptus- og egeskove. Ingen nævneværdig stigning; I passerer små vandfald og mosbegroede stenmure.",
        "Vand og mad: der er INGEN caféer eller butikker på selve Senda da Auga. Pak frokost, snacks og rigeligt vand inden I starter.",
        "Navigation: download ruten på forhånd i Mapy.cz eller Gronze Maps. Stien er velmarkeret med blå pile, men et offline kort giver tryghed."
      ]
    },
    highlights: [
      { n: "Senda da Auga", d: "Bred, flad sti langs den gamle vandkanal, skygget af eukalyptus- og egeskove. Små vandfald og mosbegroede stenmure." },
      { n: "Udsigt til Rande & Vigo-fjord", d: "I går bogstaveligt talt \"over\" storbyen med panorama ud over fjorden." },
      { n: "Mødet med den centrale rute", d: "Nær Redondela mødes I med pilgrimmene fra den centrale rute – pludselig \"Buen Camino\" overalt." }
    ],
    tips: [
      "Pak alt ind aftenen før i Nigrán – ingen service på ruten.",
      "Stien er velmarkeret med blå pile, men et offline kort giver tryghed."
    ]
  },
  {
    date: "21. juli", short: "21/7", weekday: "Tirsdag",
    title: "Redondela → Arcade / Ponte Sampaio",
    from: "Redondela", to: "Arcade",
    dist: "~7 km", terrain: "Let kuperet – en lille bakke ud af Redondela, derefter fladt",
    lodging: "Casa Héroes de Pontesampaio",
    address: "Lugar Puente, Puentesampaio, 36690 (ved Ponte Sampaio-broen, Spanien)",
    breakfast: "Nej", washer: "",
    desc: "Turens korteste vandringsdag. I går ud af Redondela og over en lille bakke med udsigt til de to imponerende jernbaneviadukter. Herfra følger I stien langs vandet til Arcade og den historiske bro Ponte Sampaio. Jeres overnatning ligger lige ved broen, hvor historien virkelig kan mærkes.",
    highlights: [
      { n: "Redondelas viadukter", d: "To massive jernbaneviadukter (1876 og 1884) spænder over dalen – I passerer lige under dem." },
      { n: "Ponte Sampaio", d: "Middelalderbro over Río Verdugo: her besejrede galiciske oprørere Napoleons tropper i 1809." },
      { n: "Fjord-udsigten", d: "Udsigt over Ría de Vigo med Rande-broen i baggrunden." }
    ],
    tips: [
      "Østers i Arcade: Galiciens østers-hovedstad – forkæl jer med friske østers og Albariño til overraskende lav pris.",
      "Kun 7 km: brug formiddagen på Redondelas hyggelige gamle bydel.",
      "Se muslingebådene (\"bateas\") i fjorden – de berømte galiciske muslingefarme."
    ]
  },
  {
    date: "22. juli", short: "22/7", weekday: "Onsdag",
    title: "Arcade → Pontevedra",
    from: "Arcade", to: "Pontevedra",
    dist: "~13 km", terrain: "Let kuperet skovsti, derefter fladt ind i Pontevedra",
    lodging: "Apartamento Lugris",
    address: "Rúa Pintor Urbano Lugris 3, 1N, 36003 Pontevedra (Spanien)",
    breakfast: "Nej", washer: "Ja",
    desc: "I krydser Ponte Sampaio-broen og følger de gamle stenbelagte veje op gennem klassisk galicisk landskab: dybe eukalyptus- og kastanjeskove, mosbegroede stenmure og små kapeller. Stien følger til sidst Río dos Gafos ind i Pontevedra – en fredelig skovsti langs floden helt ind i den bilfrie bymidte. Pontevedra er turens store finale-by.",
    highlights: [
      { n: "Skovstien langs Río dos Gafos", d: "De sidste kilometer ind i Pontevedra er magiske – smal sti langs en lille flod, fuld af bregner og fuglesang." },
      { n: "Basílica de Santa María a Maior", d: "Gotisk kirke med fantastisk udsmykket façade." },
      { n: "Bilfri bymidte", d: "Pontevedra er berømt for at have fjernet næsten alle biler – en vidunderligt fredelig by." }
    ],
    tips: [
      "To nætter her – tag det roligt. Måske den hyggeligste by på hele Caminoen.",
      "Tapas omkring Praza da Leña og Praza da Ferrería: raxo, pimientos de Padrón og mere Albariño.",
      "Sidste pilgrimsstempel i Igrexa da Peregrina – den runde barokkirke."
    ]
  },
  {
    date: "23. juli", short: "23/7", weekday: "Torsdag",
    title: "Ekstra dag i Pontevedra",
    from: "Pontevedra", to: "Pontevedra",
    dist: "0 km", terrain: "Hviledag – udforskning til fods",
    rest: true,
    lodging: "Apartamento Lugris",
    address: "Rúa Pintor Urbano Lugris 3, 1N, 36003 Pontevedra (Spanien)",
    breakfast: "Nej", washer: "Ja",
    desc: "Jeres sidste hele dag i Spanien. Pontevedra fortjener at blive udforsket til fods – hvert hjørne af den gamle bydel byder på nye opdagelser.",
    highlights: [
      { n: "Igrexa da Peregrina", d: "Den ikoniske runde, muslingeskalformede barokkirke – Pontevedras symbol." },
      { n: "Ruinerne af Santo Domingo", d: "Stemningsfuld klosterruin med gotiske buer åbne mod himlen – meget fotogent." },
      { n: "Mercado de Abastos", d: "Lokalt fødevaremarked med frisk fisk og skaldyr. Åbent om formiddagen." },
      { n: "Praza da Ferrería", d: "Byens største plads med springvand og caféer under træerne." },
      { n: "Alameda", d: "Bred boulevard langs floden Lérez – perfekt til en rolig eftermiddagsspadsering." }
    ],
    tips: [
      "Afskeds-middag: forkæl jer med galicisk mad – pulpo á feira og empanada gallega.",
      "Tjek togtiderne til i morgen (Renfe.es). Pak rygsækkene aftenen før, så morgenen bliver stressfri.",
      "Sæt en alarm – I skal afsted tidligt til hjemrejsen."
    ]
  },
  {
    date: "24. juli", short: "24/7", weekday: "Fredag",
    title: "Hjemrejse: Pontevedra → Porto Lufthavn",
    from: "Pontevedra", to: "Porto Lufthavn",
    dist: "Bus 08:15 → 10:10", terrain: "Hjemrejse med FlixBus – direkte til lufthavnen",
    depart: true,
    lodging: null,
    address: null,
    breakfast: "", washer: "",
    desc: "Den store finale. Hjemrejsen til Porto Lufthavn er booket med FlixBus – direkte til lufthavnen, ingen metro nødvendig.",
    transport: {
      title: "FlixBus Pontevedra → Porto Lufthavn",
      lines: [
        "Afgang fredag 24. juli kl. 08:15 fra Pontevedra busterminal (Rúa da Estación).",
        "Stop i Vigo: ankomst busterminal 08:35, videre kl. 08:50. Samme bus fortsætter – I skal ikke skifte (rute CES062/MonBus fortsætter som FlixBus 1783).",
        "Ankomst Porto Lufthavn kl. 10:10 (stoppested P8 – Parque de Estacionamento BUS, ankomstniveau).",
        "Bagage: lille håndtaske pr. person + kufferter i lastrum (20 kg pr. stk.).",
        "God buffer: fly afgår kl. 13:00 – ca. 2t50 til check-in. Vær ved lufthavnen senest kl. 11:00.",
        "Mød i god tid: vær ved Pontevedra busterminal senest kl. 08:00 (FlixBus anbefaler fremmøde 15 min før afgang). Følg bussen i realtid via FlixBus-appen."
      ]
    },
    highlights: [],
    tips: [
      "Pak aftenen før og aftal en tidlig morgenmadsplan – de fleste steder serverer først morgenmad fra kl. 08:00.",
      "Følg bussen i realtid via FlixBus-appen."
    ]
  }
];

/* Rute-geometri pr. dag (koordinater [lon,lat] for ruteberegneren).
   Indekseret med samme rækkefølge som DAYS. */
const ROUTES = [
  { pois:[
      {n:"Mindelo (start)", lat:41.3105, lon:-8.7405, t:"start"},
      {n:"Passadiços de Mindelo", lat:41.312, lon:-8.746, t:"sight"},
      {n:"Santa Clara-klosteret", lat:41.352448, lon:-8.738753, t:"sight"},
      {n:"Akvædukten", lat:41.374312, lon:-8.738293, t:"sight"},
      {n:"Vila do Conde (mål)", lat:41.3490644, lon:-8.7500668, t:"end"} ],
    legs:[{mode:"foot", via:[[-8.7405,41.3105],[-8.7460,41.3200],[-8.7500668,41.3490644]]}] },
  { pois:[
      {n:"Vila do Conde (start)", lat:41.3490644, lon:-8.7500668, t:"start"},
      {n:"Apúlia (vindmøller)", lat:41.482443, lon:-8.765188, t:"sight"},
      {n:"Cávado-mundingen", lat:41.533834, lon:-8.782639, t:"sight"},
      {n:"Esposende (mål)", lat:41.5347537, lon:-8.7797242, t:"end"} ],
    legs:[{mode:"foot", via:[[-8.7500668,41.3490644],[-8.7770,41.4400],[-8.7770,41.4820],[-8.7855,41.5120],[-8.7797242,41.5347537]]}] },
  { pois:[
      {n:"Esposende (start)", lat:41.5347537, lon:-8.7797242, t:"start"},
      {n:"Neiva-flodens delta", lat:41.6268, lon:-8.8042, t:"sight"},
      {n:"Castelo do Neiva (mål)", lat:41.6252325, lon:-8.8009528, t:"end"} ],
    legs:[{mode:"foot", via:[[-8.7797242,41.5347537],[-8.7960,41.5550],[-8.8030,41.5670],[-8.8009528,41.6252325]]}] },
  { pois:[
      {n:"Castelo do Neiva (start)", lat:41.6252325, lon:-8.8009528, t:"start"},
      {n:"Gil Eannes-skibet", lat:41.6936, lon:-8.8298, t:"sight"},
      {n:"Eiffel-broen", lat:41.692753, lon:-8.818354, t:"sight"},
      {n:"Santa Luzia-kirken", lat:41.701534, lon:-8.835109, t:"sight"},
      {n:"Viana do Castelo (mål)", lat:41.6925850, lon:-8.8272861, t:"end"} ],
    legs:[{mode:"foot", via:[[-8.8009528,41.6252325],[-8.8250,41.6500],[-8.8320,41.6850],[-8.8272861,41.6925850]]}] },
  { pois:[
      {n:"Viana do Castelo (start)", lat:41.6925850, lon:-8.8272861, t:"start"},
      {n:"Montedor-fyrtårnet", lat:41.751082, lon:-8.873491, t:"sight"},
      {n:"Jernbanetunnel (Afife)", lat:41.778594, lon:-8.860871, t:"sight"},
      {n:"Forte do Cão", lat:41.797675, lon:-8.874048, t:"sight"},
      {n:"Dolmen de Barrosa", lat:41.810005, lon:-8.850726, t:"sight"},
      {n:"Vila Praia de Âncora (mål)", lat:41.8134990, lon:-8.8637160, t:"end"} ],
    legs:[{mode:"foot", via:[[-8.8272861,41.6925850],[-8.8700,41.7350],[-8.8770,41.7620],[-8.8740,41.7950],[-8.8637160,41.8134990]]}] },
  { pois:[
      {n:"Vila Praia de Âncora (start)", lat:41.8134990, lon:-8.8637160, t:"start"},
      {n:"Caminha (bådafgang)", lat:41.878239, lon:-8.837477, t:"sight"},
      {n:"A Guarda / Camposancos", lat:41.881415, lon:-8.864189, t:"sight"},
      {n:"Monte Santa Trega", lat:41.888059, lon:-8.871494, t:"sight"},
      {n:"Monasterio de Oia (mål)", lat:42.0006950, lon:-8.8769042, t:"end"} ],
    legs:[
      {mode:"foot", via:[[-8.8637160,41.8134990],[-8.8550,41.8500],[-8.8400,41.8740]]},
      {mode:"boat", via:[[-8.8400,41.8740],[-8.8760,41.9000]]},
      {mode:"foot", via:[[-8.8760,41.9000],[-8.8780,41.9500],[-8.8730,41.9800],[-8.8769042,42.0006950]]} ] },
  { pois:[
      {n:"Monasterio de Oia (start)", lat:42.0006950, lon:-8.8769042, t:"start"},
      {n:"Cabo Silleiro fyrtårn", lat:42.104568, lon:-8.896341, t:"sight"},
      {n:"Monterreal-fæstningen", lat:42.124878, lon:-8.84934, t:"sight"},
      {n:"Pinta-replikaen", lat:42.120051, lon:-8.85154, t:"sight"},
      {n:"Baiona (mål)", lat:42.1182, lon:-8.8556, t:"end"} ],
    legs:[{mode:"foot", via:[[-8.8769042,42.0006950],[-8.8850,42.0600],[-8.8990,42.1040],[-8.8600,42.1150],[-8.8556,42.1182]]}] },
  { pois:[
      {n:"Monterreal-fæstningen", lat:42.124878, lon:-8.84934, t:"sight"},
      {n:"Praia de Barbeira", lat:42.123421, lon:-8.848439, t:"sight"},
      {n:"Colegiata Santa María", lat:42.118025, lon:-8.850471, t:"sight"},
      {n:"Havnen (Islas Cíes-både)", lat:42.120273, lon:-8.847431, t:"sight"} ],
    legs:[] },
  { pois:[
      {n:"Baiona (start)", lat:42.1182, lon:-8.8556, t:"start"},
      {n:"Ponte Románica (A Ramallosa)", lat:42.115457, lon:-8.812606, t:"sight"},
      {n:"Playa América", lat:42.134945, lon:-8.817769, t:"sight"},
      {n:"Nigrán (mål)", lat:42.1267432, lon:-8.7923983, t:"end"} ],
    legs:[{mode:"foot", via:[[-8.8556,42.1182],[-8.8300,42.1300],[-8.8220,42.1350],[-8.8200,42.1450],[-8.7923983,42.1267432]]}] },
  { pois:[
      {n:"Nigrán (start)", lat:42.1267432, lon:-8.7923983, t:"start"},
      {n:"Zamáns (start på Senda da Auga)", lat:42.152851, lon:-8.687566, t:"sight"},
      {n:"Senda da Auga (vandkanal)", lat:42.2200, lon:-8.6550, t:"sight"},
      {n:"Udsigt til Rande & Vigo-fjord", lat:42.2450, lon:-8.6350, t:"sight"},
      {n:"Redondela (mål)", lat:42.2845513, lon:-8.6069624, t:"end"} ],
    legs:[
      {mode:"taxi", via:[[-8.7923983,42.1267432],[-8.6970,42.1880]]},
      {mode:"foot", via:[[-8.6970,42.1880],[-8.6550,42.2200],[-8.6350,42.2450],[-8.6069624,42.2845513]]} ] },
  { pois:[
      {n:"Redondela (start)", lat:42.2845513, lon:-8.6069624, t:"start"},
      {n:"Jernbaneviadukterne", lat:42.286016, lon:-8.609226, t:"sight"},
      {n:"Ponte Sampaio", lat:42.345964, lon:-8.606845, t:"sight"},
      {n:"Arcade / Ponte Sampaio (mål)", lat:42.3471773, lon:-8.6072373, t:"end"} ],
    legs:[{mode:"foot", via:[[-8.6069624,42.2845513],[-8.6250,42.3200],[-8.6350,42.3450],[-8.6072373,42.3471773]]}] },
  { pois:[
      {n:"Arcade / Ponte Sampaio (start)", lat:42.3471773, lon:-8.6072373, t:"start"},
      {n:"Río dos Gafos (skovsti)", lat:42.4100, lon:-8.6430, t:"sight"},
      {n:"Basílica de Santa María", lat:42.4331, lon:-8.647, t:"sight"},
      {n:"Igrexa da Peregrina", lat:42.431, lon:-8.6446, t:"sight"},
      {n:"Pontevedra (mål)", lat:42.4214794, lon:-8.6399188, t:"end"} ],
    legs:[{mode:"foot", via:[[-8.6072373,42.3471773],[-8.6380,42.3800],[-8.6430,42.4100],[-8.6399188,42.4214794]]}] },
  { pois:[
      {n:"Igrexa da Peregrina", lat:42.431, lon:-8.6446, t:"sight"},
      {n:"Ruinerne af Santo Domingo", lat:42.431134, lon:-8.64704, t:"sight"},
      {n:"Mercado de Abastos", lat:42.434237, lon:-8.643553, t:"sight"},
      {n:"Praza da Ferrería", lat:42.431371, lon:-8.644222, t:"sight"},
      {n:"Alameda", lat:42.430885, lon:-8.648584, t:"sight"} ],
    legs:[] },
  { pois:[
      {n:"Pontevedra busterminal (08:15)", lat:42.4218, lon:-8.6371, t:"start"},
      {n:"Vigo busterminal (stop)", lat:42.2290, lon:-8.7120, t:"sight"},
      {n:"Porto Lufthavn (10:10)", lat:41.2359, lon:-8.6699, t:"end"} ],
    legs:[{mode:"bus", via:[[-8.6371,42.4218],[-8.7120,42.2290],[-8.7000,41.7000],[-8.6699,41.2359]]}] }
];

/* Oversigtskort: overnatningsbyer i rækkefølge */
const OVERVIEW_PTS = [
  {n:"Mindelo (start)", lat:41.3105, lon:-8.7405, t:"start"},
  {n:"Vila do Conde", lat:41.3490644, lon:-8.7500668, t:"sight"},
  {n:"Esposende", lat:41.5347537, lon:-8.7797242, t:"sight"},
  {n:"Castelo do Neiva", lat:41.6252325, lon:-8.8009528, t:"sight"},
  {n:"Viana do Castelo", lat:41.6925850, lon:-8.8272861, t:"sight"},
  {n:"Vila Praia de Âncora", lat:41.8134990, lon:-8.8637160, t:"sight"},
  {n:"Caminha (båd)", lat:41.8740, lon:-8.8400, t:"sight"},
  {n:"A Guarda", lat:41.9000, lon:-8.8760, t:"sight"},
  {n:"Oia", lat:42.0006950, lon:-8.8769042, t:"sight"},
  {n:"Baiona", lat:42.1182, lon:-8.8556, t:"sight"},
  {n:"Nigrán", lat:42.1267432, lon:-8.7923983, t:"sight"},
  {n:"Redondela", lat:42.2845513, lon:-8.6069624, t:"sight"},
  {n:"Arcade", lat:42.3471773, lon:-8.6072373, t:"sight"},
  {n:"Pontevedra (mål)", lat:42.4214794, lon:-8.6399188, t:"end"}
];

/* Generel information – ikke-følsomme afsnit fra rejseguiden. */
const GENERAL = [
  {
    "key": "raad",
    "icon": "star",
    "title": "Generelle råd til ruten",
    "blocks": [
      {
        "type": "list",
        "items": [
          "Start tidligt: den vigtigste regel i juli. Gå afsted mellem kl. 06 og 07, så I er fremme inden den værste middagsvarme. Mange pilgrimme starter endda ved solopgang (ca. 06.30 i juli).",
          "Hydrering: drik løbende – vent ikke til I er tørstige. Regn med mindst 2-3 liter vand pr. person pr. dag. Fyld op ved hver mulighed.",
          "Siesta-strategi: hvis I ankommer tidligt (kl. 12-14), tag en pause i skyggen og udforsk byen om aftenen, når det køler af.",
          "Vabelforebyggelse: smør fødderne med Vaseline om morgenen. Skift sokker ved frokostpausen. Stop og behandl hotspots med det samme – vent ikke til det bliver en vabel.",
          "Pak let: alt hvad I medbringer, skal I bære. Vær brutale med pakkelisten. I kan købe det meste undervejs i Portugal og Spanien.",
          "Vasketøj: de fleste overnatningssteder har mulighed for håndvask. Hurtigtørrende tøj er klar igen næste morgen. I Baiona (17-18/7) har I adgang til vaskemaskine – planlæg en stor vask dér.",
          "Grænseovergang: Portugal → Spanien foregår med båd over Rio Minho fra Caminha til A Guarda (ca. 10 min). Book den officielle Xacobeo Transfer online i forvejen på xacobeotransfer.com (6 € pr. person). Der er ingen pascheck, men det er et magisk øjeblik. Bekræft overfarten dagen før, da tider kan afhænge af vejr og tidevand.",
          "Sprog: portugisisk i den første halvdel, galicisk/spansk i den anden. Basale fraser som Bom dia / Buenos días (godmorgen), Obrigado/a / Gracias (tak) og Buen Camino! (god vej!) er alt, hvad I behøver. Alle forstår den universelle pilgrimshilsen \"Buen Camino!\"."
        ]
      },
      {
        "type": "sub",
        "text": "Portugal vs Spanien"
      },
      {
        "type": "p",
        "text": "Der er en markant forskel på oplevelsen alt efter, om I er på den portugisiske side (Porto til grænsen) eller den spanske (grænsen og nordpå)."
      },
      {
        "type": "subhead",
        "text": "Landskab og terræn"
      },
      {
        "type": "list",
        "items": [
          "Portugal: meget fladt, masser af passadiços (træbroer), vilde strande og lidt skygge.",
          "Spanien: klippefyldt og kuperet fra floden Minho, flere bakker, mere læ i de galiciske eukalyptusskove."
        ]
      },
      {
        "type": "subhead",
        "text": "Byer og mad"
      },
      {
        "type": "list",
        "items": [
          "Portugal: klassiske feriebyer ved havet, billig café-kultur med Pastéis de Nata og espresso.",
          "Spanien: middelalder-charme (Baiona, Pontevedra), tapas/raciones og livet på de små torve."
        ]
      },
      {
        "type": "subhead",
        "text": "Pilgrimsstemning"
      },
      {
        "type": "list",
        "items": [
          "Porto til grænsen: let, forventningsfuld stemning, føles lidt som en strandvandring.",
          "Fra Redondela smelter kystruten sammen med den centrale rute – antallet af pilgrimme eksploderer, og den klassiske Camino-ånd med \"Buen Camino\" mærkes overalt."
        ]
      },
      {
        "type": "table",
        "head": [
          "Faktor",
          "Portugal",
          "Spanien"
        ],
        "rows": [
          [
            "Underlag",
            "Træbroer og sand (fladt)",
            "Klippestier, skovveje, asfalt (kuperet)"
          ],
          [
            "Vejr",
            "Mere vind, eksponeret",
            "Mere læ i skove og bugter"
          ],
          [
            "Mad/drikke",
            "Billig kaffe, fisk",
            "Tapas, Albariño, pulpo"
          ],
          [
            "Prisniveau",
            "Generelt billigst",
            "Lidt dyrere"
          ],
          [
            "Højdepunkt",
            "Viana do Castelo & broerne",
            "Baiona & de galiciske skove"
          ]
        ]
      },
      {
        "type": "subhead",
        "text": "Kort sagt"
      },
      {
        "type": "p",
        "text": "Den portugisiske del er en fantastisk, meditativ start, hvor I får kilometer i benene på fladt underlag med havet som fast følgesvend. Den spanske del er smukkere rent historisk og arkitektonisk, men kræver lidt mere fysisk indsats og byder på en mere intens social oplevelse med andre pilgrimme."
      },
      {
        "type": "sub",
        "text": "Forberedelser hjemmefra"
      },
      {
        "type": "subhead",
        "text": "Fysisk træning"
      },
      {
        "type": "list",
        "items": [
          "Start træningen mindst 6-8 uger før afgang. Gå lange ture (15-25 km) med rygsæk, gerne i det terræn og de sko I vil bruge.",
          "Fokusér på udholdenhed, ikke tempo. I skal gå 10-26 km dagligt i varme – det kræver tilvænning.",
          "Træn gerne med den fulde rygsækvægt. Tommelfingerregel: maks 10 % af jeres kropsvægt (ekskl. vand)."
        ]
      },
      {
        "type": "subhead",
        "text": "Økonomi og betaling"
      },
      {
        "type": "list",
        "items": [
          "Valuta: både Portugal og Spanien bruger euro.",
          "Kort: Visa/Mastercard accepteres de fleste steder, men hav altid lidt kontanter (50-100 €) til små caféer og landsbyer uden kortterminaler.",
          "Budget: regn med ca. 30-50 € pr. person pr. dag til mad og drikke (frokost, aftensmad, snacks). Portugal er generelt billigere end Spanien."
        ]
      },
      {
        "type": "subhead",
        "text": "Forsikring og sundhed"
      },
      {
        "type": "list",
        "items": [
          "Rejseforsikring: sørg for en forsikring, der dækker vandring og eventuel hjemtransport. Tjek jeres eksisterende – mange kreditkortforsikringer dækker ikke langdistancevandring.",
          "Det blå EU-sygesikringskort: giver ret til behandling på offentlige hospitaler i EU-lande. Bestil det gratis via borger.dk – det tager typisk 1-2 uger.",
          "Apotek: både Portugal og Spanien har veludstyrede apoteker (farmácia/farmacia) i de fleste byer. Compeed og ibuprofen kan købes overalt."
        ]
      },
      {
        "type": "subhead",
        "text": "Apps og navigation"
      },
      {
        "type": "list",
        "items": [
          "Buen Camino (app): gratis, med GPS-tracking, vandpunkter, caféer og herberger. Fungerer offline.",
          "Maps.me eller Google Maps offline: download kort over Nordportugal og Galicien hjemmefra – svag dækning i klitter og skove.",
          "Wise / Revolut: rejsekort med gode kurser og ingen udenlandske hævegebyrer."
        ]
      },
      {
        "type": "sub",
        "text": "Toiletforhold på ruten"
      },
      {
        "type": "list",
        "items": [
          "Brug toilettet når I kan – langt mellem dem på lange kyststræk og især Senda da Auga.",
          "Caféer, barer og restauranter er den sikreste løsning (køb en kaffe først).",
          "Offentlige toiletter findes i byer og havne, men kan være lukkede eller mangle papir.",
          "Hav altid en lille nødpakke: lommetørklæder, håndsprit, affaldspose.",
          "Planlæg stop i Apúlia, Caminha, A Guarda og Nigrán før de øde stræk."
        ]
      },
      {
        "type": "sub",
        "text": "Sikkerhed, varme og plan B"
      },
      {
        "type": "list",
        "items": [
          "112 er gratis alarmnummer i både Portugal og Spanien, fra fastnet og mobil.",
          "Varmeslag-plan: afkort etapen uden dårlig samvittighed hvis det bliver for varmt – en taxa er bedre end at miste vandredage.",
          "Lokale taxaer: Uber/Bolt kan I ikke regne med uden for byerne – bed værten bestille taxa aftenen før.",
          "Del dagens plan: send næste overnatningsadresse og forventet ankomst til hinanden eller familie hjemme.",
          "Glatte underlag: træbroer, granit og skaller kan være glatte, især om morgenen eller efter regn."
        ]
      }
    ]
  },
  {
    "key": "praktisk",
    "icon": "passport",
    "title": "Praktisk guide – før I tager hjemmefra",
    "blocks": [
      {
        "type": "sub",
        "text": "Pilgrimspas (Credencial del Peregrino)"
      },
      {
        "type": "p",
        "text": "Et pilgrimspas er jeres officielle dokumentation som pilgrimme. I får det stemplet ved overnatningssteder, kirker, caféer og turistkontorer undervejs – stemplerne beviser, at I har gået ruten."
      },
      {
        "type": "list",
        "items": [
          "Hvor: køb online hos Pilgrim (pilgrim.es) eller den danske Camino-forening. Fås også ved katedralen i Porto eller pilgrimskontorer i startbyerne.",
          "Hvorfor: en fantastisk souvenir med stempler fra hele turen. Vil I senere forlænge til Santiago, kræves mindst 2 stempler pr. dag på de sidste 100 km for Compostela-certifikatet.",
          "Tip: få mindst ét stempel om dagen – gerne to. Det er en del af oplevelsen at finde de mest kreative stempler.",
          "Hvis I fortsætter til Santiago: pilgrimskontoret dér har normalt åbent dagligt kl. 09–19. I højsæson bruger de et QR-køsystem, og udlevering samme dag kan ikke altid garanteres."
        ]
      },
      {
        "type": "sub",
        "text": "Pakke- og afrejsecheckliste"
      },
      {
        "type": "subhead",
        "text": "Fodtøj (det allervigtigste!)"
      },
      {
        "type": "checklist",
        "items": [
          "Vandresko/trail runners: lette, indgåede sko med god sål. Undgå tunge støvler – ruten er flad og varm. Trail runners er ideelle.",
          "Sandaler til aftenen: giv fødderne luft efter dagens vandring.",
          "Sokker: mindst 3-4 par vandresokker i merino-uld eller syntetisk materiale. Undgå bomuld – det holder på fugt og giver vabler."
        ]
      },
      {
        "type": "subhead",
        "text": "Tøj"
      },
      {
        "type": "checklist",
        "items": [
          "2-3 hurtigtørrende t-shirts",
          "1 langærmet trøje (sol-/vindbeskyttelse)",
          "1 let fleece eller softshell (til kølige aftener)",
          "1-2 par lette shorts",
          "1 par lange vandrebukser/tights",
          "3 sæt hurtigtørrende undertøj (helst ikke bomuld)",
          "Solhat med bred skygge",
          "Solbriller"
        ]
      },
      {
        "type": "subhead",
        "text": "Udstyr"
      },
      {
        "type": "checklist",
        "items": [
          "Let rygsæk (30-40 liter) med regncover",
          "Vandflasker/drikkeblære – mindst 1,5 liter kapacitet",
          "Powerbank + ladekabel",
          "Opladning: Portugal og Spanien bruger primært stiktype C/F. De fleste danske mobilopladere passer direkte, men tjek evt. kraftige jordstik hjemmefra."
        ]
      },
      {
        "type": "subhead",
        "text": "Pleje og førstehjælp"
      },
      {
        "type": "checklist",
        "items": [
          "Compeed (vabler!) – køb en stor pakke hjemmefra",
          "Vaseline eller Bodyglide (mod gnavesår/skrubsår)",
          "Solcreme SPF 50 + læbepomade med SPF",
          "Håndsprit",
          "Ibuprofen / paracetamol",
          "Elastisk bandage",
          "Personlig medicin",
          "Fodpudder/talkum"
        ]
      },
      {
        "type": "subhead",
        "text": "Afrejsecheckliste"
      },
      {
        "type": "checklist",
        "items": [
          "Pas, betalingskort, det blå EU-sygesikringskort og rejseforsikring er pakket og fotograferet digitalt",
          "Pilgrimspas er købt eller reserveret, og første sted til stempel er kendt",
          "Alle bookingbekræftelser og adresser er gemt som screenshots/offline",
          "Telefoner, powerbank og ladekabler er pakket og testet",
          "Offline-kort til Portugal, Galicien og Senda da Auga er downloadet",
          "Skoene er gået til, og mindst én længere træningstur er gået med fuld oppakning",
          "Compeed, solcreme, smertestillende og personlig medicin er pakket",
          "50-100 € i kontanter er hævet til småkøb og steder uden kort",
          "Plan for bådoverfarten Caminha → A Guarda er noteret",
          "Taxa-planen til Zamáns/Senda da Auga er gemt i noter eller aftalt med vært",
          "Hjemrejse med tog/bus fra Pontevedra til Porto er dobbelttjekket et par dage før",
          "Første dags snack og vand er tænkt ind, så I ikke starter halvtomme fra lufthavnen"
        ]
      },
      {
        "type": "sub",
        "text": "Mobil, strøm og dokumenter"
      },
      {
        "type": "list",
        "items": [
          "EU-roaming: danske abonnementer virker normalt i både Portugal og Spanien – tjek fair-use hjemmefra.",
          "Offline backup: gem bookingbekræftelser, adresser og værtsnumre som screenshots og i en note der kan åbnes offline.",
          "Vandtæt dokumentpose: pas, pilgrimspas, EU-sygesikringskort og kort i en ziplock – kystvind og sved er hårdt ved papir.",
          "Strømstrategi: lad powerbank og telefon fuldt op hver aften. Brug den anden telefon som reserve."
        ]
      },
      {
        "type": "sub",
        "text": "Små ting der ofte bliver glemt"
      },
      {
        "type": "list",
        "items": [
          "Anti-gnidning: ud over fødderne er lår, hofter og skuldre klassiske problemzoner. Bodyglide eller Vaseline kan spare jer for meget irritation i varme og salt luft.",
          "Undertøj i merino-uld: svedabsorberende og holder lugt væk. Icebreaker Anatomica (Fjeld og Fritid) er et godt mærke. Ellers er ExOfficio Give-N-Go 2.0 Sport Mesh også godt.",
          "Småpenge: hav mønter og små sedler til kaffe, is, små køb og steder hvor kort ikke er en selvfølge.",
          "Ziplocks og safety pins: guld værd til vådt tøj, opladere, kvitteringer og hurtig håndvask undervejs.",
          "Aftenen før: fyld vand, tjek vejret, læg morgentøj frem og aftal første stop for kaffe eller mad, inden I går i seng. Det gør tidlige starter meget lettere.",
          "Langærmet solbeskyttelse: trøje med hætte (Patagonia Capilene Cool Daily Hoody, Black Diamond Alpenglow) eller nylonskjorte (Columbia Silver Ridge Utility, Patagonia Self-Guided Hike Shirt)."
        ]
      },
      {
        "type": "sub",
        "text": "Hvis energien er lav – hvad er vigtigst?"
      },
      {
        "type": "list",
        "items": [
          "Prioritér pausebyer frem for tilfældige stop: Viana do Castelo, Baiona og Pontevedra er de bedste steder at bruge ekstra tid og penge.",
          "Brug de små byer funktionelt: Apúlia, Caminha, A Guarda og Nigrán er især gode til kaffe, vand, is, toilet og proviant.",
          "På varme dage: spis mere til morgenmad og frokost, og mindre tungt om aftenen. Det gør de næste morgener lettere."
        ]
      }
    ]
  },
  {
    "key": "specialiteter",
    "icon": "coffee",
    "title": "Mad og drikke – specialiteter at prøve",
    "blocks": [
      {
        "type": "p",
        "text": "En guide til lokale specialiteter, vine og ting, der er værd at smage undervejs. Husk: I går netop gennem Minho (Vinho Verde-land) og Rías Baixas (Albariño-land) – to af de bedste vinregioner for lige præcis den mad, I møder."
      },
      {
        "type": "sub",
        "text": "Portugal"
      },
      {
        "type": "subhead",
        "text": "Morgenmad"
      },
      {
        "type": "list",
        "items": [
          "Pastel de nata – lille cremet vaniljetærte i sprød butterdej. Den klassiske følgesvend til morgenkaffen.",
          "Galão – mild café latte serveret i et højt glas; portugisernes foretrukne morgenkaffe.",
          "Cimbalino – sådan kalder man en espresso i Porto-området (i syd hedder den \"bica\"). Lille, stærk og billig.",
          "Torrada – tykt ristet brød med masser af smør, ofte til kaffen.",
          "Broa de milho – tæt, rustikt majsbrød – godt med ost eller marmelade."
        ]
      },
      {
        "type": "subhead",
        "text": "Frokost"
      },
      {
        "type": "list",
        "items": [
          "Francesinha – Portos berømte \"lille franskmand\": sandwich med flere slags kød, dækket af smeltet ost og en krydret øl-tomatsauce, ofte med spejlæg og pommes. Del evt. én.",
          "Bifana – varm sandwich med marineret, krydret svinekød. Billig, hurtig og lækker vandrefrokost.",
          "Caldo verde – grøn kålsuppe med kartoffel og skiver chorizo. Let nordportugisisk klassiker.",
          "Sardinha assada – grillede sardiner, allerbedst om sommeren, direkte fra kysten.",
          "Bacalhau à Brás – revet klipfisk vendt med æg, løg og sprøde kartoffelstrimler."
        ]
      },
      {
        "type": "subhead",
        "text": "Aftensmad"
      },
      {
        "type": "list",
        "items": [
          "Bacalhau – klipfisk, nationalretten, tilberedt på \"365 måder\". Prøv bacalhau à lagareiro (ovnbagt med olivenolie og kartofler).",
          "Polvo à lagareiro – møre blæksprutte-arme bagt i ovn med små kartofler og rigelig olivenolie.",
          "Arroz de marisco – saftig, suppet skaldyrsris – fyldig og fælles at dele.",
          "Robalo/dourada grelhada – grillet havbars eller guldbrasen, frisk fra fiskebyerne langs ruten.",
          "Arroz de pato – andekonfit bagt sammen med ris og chorizo; comfort food."
        ]
      },
      {
        "type": "subhead",
        "text": "Andet"
      },
      {
        "type": "list",
        "items": [
          "Pastéis de bacalhau – sprøde klipfiske-kroketter; perfekt snack eller forret.",
          "Presunto – lufttørret skinke, ofte skåret tyndt til tapas-stil.",
          "Queijo da Serra – blød, cremet fåremælksost fra Serra da Estrela.",
          "Ginjinha – sød kirsebærlikør, drukket som en lille shot – gerne som afslutning."
        ]
      },
      {
        "type": "subhead",
        "text": "Drikkevarer"
      },
      {
        "type": "list",
        "items": [
          "Vinho Verde – frisk, ung og let perlende \"grøn vin\" fra Minho – lige der hvor I vandrer. Lav alkohol, syrlig og perfekt sommervin til fisk.",
          "Alvarinho – den fineste Vinho Verde-drue (Monção/Melgaço); mere aromatisk og fyldig.",
          "Port (Porto) – Douro-hedvin. Prøv en white port med tonic som aperitif eller en tawny som dessert.",
          "Douro tinto – kraftige røde fra samme dal som portvinen.",
          "Moscatel – sød dessertvin, god til ost.",
          "Super Bock / Sagres – de to store portugisiske øl; en kold én efter en varm etape.",
          "Água das Pedras – Portugals ikoniske naturlige mineralvand med kraftig brus. En klassiker til maden.",
          "Licor Beirão – Portugals egen urtelikør; drukket som digestif eller i en cocktail (Caipirinha do Beirão).",
          "Aguardente / bagaço – klar, stærk druesnaps til at runde måltidet af.",
          "Sumol – portugisisk frugtsodavand (appelsin eller ananas) – forfriskende og alkoholfri i varmen."
        ]
      },
      {
        "type": "sub",
        "text": "Spanien (Galicien)"
      },
      {
        "type": "subhead",
        "text": "Morgenmad"
      },
      {
        "type": "list",
        "items": [
          "Café con leche – standard morgenkaffe med varm mælk.",
          "Tostada con tomate – ristet brød med revet tomat, olivenolie og salt.",
          "Churros con chocolate – friterede dejstænger dyppet i tyk, varm chokolade – en weekend-forkælelse.",
          "Bica gallega – luftig galicisk sukkerkage (forveksl ikke med portugisisk \"bica\", som er kaffe!).",
          "Empanada (en skive) – den galiciske tærte spises også fint til en sen morgenmad."
        ]
      },
      {
        "type": "subhead",
        "text": "Frokost"
      },
      {
        "type": "list",
        "items": [
          "Pulpo á feira – kogt blæksprutte i skiver med groft salt, paprika og olivenolie. Galiciens signaturret – smag den i Arcade eller Pontevedra.",
          "Empanada gallega – flad tærte fyldt med tun, kød eller skaldyr; perfekt at tage med som vandrefrokost.",
          "Pimientos de Padrón – små stegte grønne peberfrugter med havsalt. De fleste er milde – men en enkelt brænder!",
          "Caldo gallego – grøn suppe med grønkål (grelos), hvide bønner og svinekød.",
          "Menú del día – fast 3-retters frokostmenu til fast pris (ofte m. vin) – den bedste værdi i Spanien."
        ]
      },
      {
        "type": "subhead",
        "text": "Aftensmad"
      },
      {
        "type": "list",
        "items": [
          "Mariscada – stort fad med blandet skaldyr (muslinger, rurer, krebs, hummer). Fælles festmåltid.",
          "Vieiras – kammuslinger – selveste Camino-symbolet – gratineret i skallen.",
          "Zamburiñas – små, søde kammuslinger stegt med hvidløg og persille.",
          "Mejillones – fjord-muslinger fra \"bateas\"-flådene; utroligt friske i Ría de Vigo.",
          "Percebes – rurer/andeskaller fra klipperne; en dyr, men berømt delikatesse.",
          "Ostras – friske østers, især fra Arcade (Galiciens østers-hovedstad). Nydes rå med citron og et glas kølig Albariño."
        ]
      },
      {
        "type": "subhead",
        "text": "Andet"
      },
      {
        "type": "list",
        "items": [
          "Tarta de Santiago – mandelkage pudret med flormelis og Sankt Jakobs-korset. Den ægte Camino-dessert.",
          "Tetilla – blød, mild ost formet som en lille kegle.",
          "Queixo San Simón – røget, pæreformet ost med fyldig smag.",
          "Orujo / licor café – kraftig druesnaps eller sød kaffelikør som digestif; den flammende version hedder queimada."
        ]
      },
      {
        "type": "subhead",
        "text": "Drikkevarer"
      },
      {
        "type": "list",
        "items": [
          "Albariño – Galiciens stolthed fra Rías Baixas – lige det område I går igennem. Frisk, aromatisk hvidvin, skabt til skaldyr.",
          "Ribeiro – lette, drikkevenlige hvid- og rødvine fra indlandet.",
          "Godello – fyldig, mineralsk hvidvindrue (Valdeorras) – for dem der vil have mere krop end Albariño.",
          "Mencía – frugtig, elegant rødvin fra de stejle skråninger i Ribeira Sacra.",
          "Ribeira Sacra tinto – Mencía-baserede røde fra en af Europas mest dramatiske vinregioner.",
          "Estrella Galicia – Galiciens egen pilsner – lokal stolthed. Prøv også den fyldigere premium-udgave 1906.",
          "Queimada – flammende orujo-punch med sukker, kaffebønner og citronskal, ledsaget af en gammel besværgelse mod onde ånder.",
          "Carajillo – espresso med et skud orujo eller brandy; kort og kraftig digestif.",
          "Auga de Mondariz – lokalt galicisk mineralvand fra kilden i Pontevedra-provinsen – alkoholfrit alternativ."
        ]
      },
      {
        "type": "sub",
        "text": "Mad, åbningstider og hverdagslogistik"
      },
      {
        "type": "list",
        "items": [
          "Morgenmad: ikke alle steder inkluderer morgenmad. Hav altid en nødplan på værelset: bananer, havrebarer, nødder eller lidt brød fra aftenen før.",
          "Tidlige starter: hvis I går kl. 06.00-06.30, er caféer ofte ikke åbne endnu. Køb vand og snacks aftenen før. I Portugal åbner mange caféer dog tidligt (fra ca. kl. 07.00-08.00) og serverer kaffe og pastel de nata.",
          "Portugisiske spisetider: portugiserne spiser tidligere end spanierne. Frokost er typisk kl. 12.00-15.00 og aftensmad kl. 19.00-22.00. Køkkenerne er forholdsvis fleksible, og det er ofte muligt at få et varmt måltid tidligt på aftenen.",
          "Spanske spisetider: i Spanien (Galicien) forskydes alt 1-2 timer. Frokost er kl. 13.30-16.00, og mange køkkener åbner først til aftensmad omkring kl. 20.00-20.30. En sen frokost eller tapas sidst på eftermiddagen er ofte lettere at finde end en \"normal\" dansk aftensmad kl. 18.",
          "Søndage og siesta: mindre butikker kan holde lukket søndag eller midt på dagen (siesta, typisk kl. 14-17 – mest udpræget i Spanien). På de lange kystetaper bør I ikke regne med, at I altid kan handle spontant undervejs."
        ]
      }
    ]
  }
];

/* Mad- og pausestop pr. dag (fra dokumentet). Nøgle = dagindeks. Vises på dag-visningen. */
const PAUSESTOP = {
  0:["Vila do Conde: god første rigtige pauseby. Tag kaffe og Pastel de Nata eller en let frokost tæt ved floden, og gem den store middag til om aftenen."],
  1:["Apúlia (undervejs): ideelt kaffestop på den lange dag mod Esposende. God by til en kold drink, is eller et hurtigt bagerstop, før de sidste kilometer.",
     "Esposende: et godt sted at spise fisk og skaldyr om aftenen og købe snacks eller frugt til næste formiddag, inden I går ud på mere stille stræk."],
  3:["Viana do Castelo: en af rutens bedste frokost- og pausebyer. Brug byen til et ordentligt måltid, fordi udvalget er større og stemningen bedre end i de små landsbyer."],
  5:["Caminha (undervejs): sidste stærke portugisiske stop før Spanien. Godt sted til kaffe, toilet og en tidlig frokost, hvis I vil holde overfarten og resten af dagen enkel.",
     "A Guarda (undervejs): første spanske madstop. Perfekt til sen frokost, frisk vand og et lille hvil efter overfarten, især hvis I overvejer afstikkeren op på Santa Trega.",
     "Oia: smuk, men lille ankomstby. Regn ikke med kæmpe udvalg sent på dagen, så det er smart at have snacks med fra tidligere på etapen."],
  6:["Baiona: den bedste \"forkælelsesby\" på ruten. Her giver det mening med god middag, dagligvareindkøb, vaskedag og måske lidt ekstra morgenmad til næste dag."],
  8:["Playa América / Nigrán: god dag til strandpause og let frokost. Samtidig er det et vigtigt sted at købe alt ind til Senda da Auga-dagen, hvor der ikke er service."],
  9:["Redondela: her begynder den mere klassiske pilgrimstemning. God by til et enkelt menú del día eller tapas, men ikke et sted hvor I behøver overplanlægge."],
  10:["Arcade: stop for østers, Albariño og en lille luksusfrokost. Det er et af de mest oplagte steder på hele ruten at prioritere madoplevelsen."],
  11:["Pontevedra: den stærkeste spiseby på turen. Brug markedet om formiddagen, tapasområderne om aftenen og gem gerne en rigtig afskedsmiddag til sidste aften."]
};
