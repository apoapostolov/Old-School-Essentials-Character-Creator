import type { SourcePromptOverrides } from '../../lib/ai/prompt-overrides';

/**
 * Karameikos prompt payloads for the Mystara source pack.
 * Provenance: lifestyle/rpg_campaigns/keep-on-the-borderlands/setting/setting_changes_en.md
 * and context/ideas/b2-ethnic-naming-guide-en.md.
 *
 * Core generators must not special-case these ethnoses. Add another pack's
 * prompt-overrides.ts to get the same hook for a different setting.
 */
export const PROMPT_OVERRIDES: SourcePromptOverrides = {
    sourceId: 'mystara',
    always: {
        name: `Karameikos names follow a three-step process: a real name from the analogue people, then an optional fantasy twist (Petar → Petran or P'tran), then an optional Thyatian/Byzantine overlay (Petreus, -ios, -eus) for status or city life. Never invent English fantasy names.`,
        portrait: `Karameikos humans are Eastern European and Byzantine, not generic Northern-European D&D stock. Match the rolled ethnos when present. Sun-disk icons and church-cut clothing are common.`,
        village: `Village names should sound South or East Slavic (or Byzantine if Thyatian). Compound fields, fords, oaks, saints, and river-folds. One token: hyphens allowed, no spaces.`,
        backstory: `Set the life in the Grand Duchy of Karameikos: Slavic-fantasy countryside under Thyatian feudal titles (lord, knight, castellan, bailiff). Faith is a sun-god church with local saints; keep it as flavor, not a lecture. Ethnic tension is everyday and superstitious, not a speech.`,
        traits: `Ground traits in Karameikos life: village councils, shearing-age travel, clan honor, market cant, or sun-church habit. Avoid generic chosen-one tone.`,
        lifeStandard: `Measure success in Karameikos terms: village standing, guild or clan debt, church tithe, horse or herd, a roof in Specularum or a wintering in the woods.`,
    },
    ethnicProfiles: [
        {
            id: 'Slavani',
            aliases: ['Slav', 'Slavs'],
            displayName: 'Slavani',
            realWorldAnalogues: 'Croatia, Slovenia, Bosnia and Herzegovina',
            context: 'Most numerous folk of the duchy: farmers, woodworkers, craftsmen, small traders. Best integrated with Thyatian administration. Ruling houses are hereditary Slavani. High Traladaran speech; they often take Thyatian-style names to signal status.',
            names: {
                male: {
                    real: ['Petar', 'Ivan', 'Marko', 'Stjepan', 'Zvonimir', 'Ante', 'Luka', 'Josip', 'Nikola', 'Davor', 'Goran', 'Matej'],
                    fantasy: ['Petran', "P'tran", 'Ivanar', 'Markos', 'Stjepanos', 'Zvonimios', 'Lukar', 'Bornos', 'Branimar', 'Dragovan', 'Stoyar'],
                    imperial: ['Petreus', 'Ivanaeus', 'Marcus', 'Stephanos', 'Nicolaus', 'Stefanos'],
                },
                female: {
                    real: ['Ana', 'Marija', 'Ivana', 'Petra', 'Jelena', 'Katarina', 'Vesna', 'Mila', 'Lucija', 'Dragica', 'Branka'],
                    fantasy: ['Anica', 'Petrana', 'Ivanara', 'Vesnara', 'Zlata', 'Višnja', 'Željka', 'Danica', 'Marica'],
                    imperial: ['Petraea', 'Maria', 'Helena', 'Anastasia', 'Katarina'],
                },
                instructions: 'Clear consonants, High Traladaran -ar/-os endings on fantasy forms. Urban or titled Slavani lean Thyatian.',
            },
            appearance: {
                appliesTo: 'human',
                male: 'South-Slavic: fair to light olive skin, brown to dark-brown hair, brown or hazel eyes, practical build. Not a default Northern-European blonde.',
                female: 'South-Slavic: fair to light olive skin, brown to dark-brown hair, brown or hazel eyes. Festive look uses embroidered shirts and flower garlands, not court gowns.',
                clothing: 'Plain unbleached linens; leather aprons on craftsmen; embroidered shirts and garlands only as festive wear.',
                hardBans: ['generic pale-blonde "fantasy human"', 'heavy fur-and-bear Viking kit'],
            },
            village: {
                examples: ['Zlatapolje', 'Bornin-Brod', 'Svetoslar', 'Lukapolje'],
                instructions: 'Croatian/Slovene/Bosnian village flavor: fields, fords, saint-compounds. Single token, no spaces.',
            },
            backstory: {
                instructions: 'Village councils, hereditary guilds, sun-church feast days, markets. Cooperation with Thyatian clerks is normal, not treason.',
            },
        },
        {
            id: 'Sarapi',
            aliases: ['Sarap', 'Srap', 'Saraps'],
            displayName: 'Sarapi',
            realWorldAnalogues: 'Bulgaria, North Macedonia, southern Serbia',
            context: 'Hill and river-valley folk: fiery, hospitable, clan-loyal. Majority in garrisons and mercenary bands because the duchy lets them swap tithe for military service. Clipped Traladaran with Hinasi (Ylari) loanwords — Turkisms as trade speech, not as a conquest story.',
            names: {
                male: {
                    real: ['Petar', 'Georgi', 'Dimitar', 'Nikola', 'Todor', 'Kaloyan', 'Bozhidar', 'Krasimir', 'Radomir', 'Asen', 'Hristo', 'Dragan', 'Ivaylo', 'Stoyan'],
                    fantasy: ['Petran', "P'tran", 'Kaloyanos', 'Bozhidaran', 'Radomirko', 'Dragutin', 'Preslav', 'Krum'],
                    imperial: ['Petreus', 'Georgios', 'Demetrios', 'Christos', 'Theodoros'],
                },
                female: {
                    real: ['Elena', 'Maria', 'Desislava', 'Kalina', 'Rayna', 'Teodora', 'Nevena', 'Rumyana', 'Gergana', 'Petya', 'Nadezhda'],
                    fantasy: ['Desislara', 'Kalinara', 'Raynara', 'Nevenka', 'Zora', 'Stoyanka'],
                    imperial: ['Helena', 'Theodora', 'Maria', 'Elisavet'],
                },
                instructions: 'Hard consonants; -mir/-slav/-ko on warrior names. A few Ylari loan-sounding nicknames are fine; do not invent an Ottoman occupation.',
            },
            appearance: {
                appliesTo: 'human',
                male: 'Balkan hill folk: wheat-olive to brown skin, black or very dark hair, dark eyes, moustache common on adult men. Weathered from field and garrison.',
                female: 'Wheat-olive to brown skin, dark hair, dark eyes. Holiday wear is embroidered dresses and shawls, not pale court silk.',
                clothing: 'Brown layered wool for work; sturdy mountain footwear; embroidered dresses and shawls on feast days.',
                hardBans: ['pale Nordic skin as default', 'turban-as-ethnicity costume'],
            },
            village: {
                examples: ['Gorna-Reka', 'Kaloyanov-Sar', 'Zora-Rid', 'Preslavets'],
                instructions: 'Bulgarian/Macedonian hill-and-river names; folds, ridges, small holds. Single token, no spaces.',
            },
            backstory: {
                instructions: 'Family loyalty, harvest custom, garrison or mercenary service as tax. Local folk belief under a sun-church surface.',
            },
        },
        {
            id: 'Polanitsi',
            aliases: ['Polanici', 'Polasi', 'Polanets', 'Polan'],
            displayName: 'Polanici',
            realWorldAnalogues: 'Poland, Czechia, Slovakia, parts of Ukraine',
            context: 'Horse-breeders and grain merchants near larger towns. Shearing at 13: youths leave the father\'s house. Long travel (hadzhuvane) is a mark of success. Soft vowels, guild cant. Adoption and given-word matter more than blood.',
            names: {
                male: {
                    real: ['Piotr', 'Jan', 'Wojciech', 'Stanisław', 'Kazimierz', 'Maciej', 'Jakub', 'Tadeusz', 'Václav', 'Zdeněk', 'Marek'],
                    fantasy: ['Petrik', 'Petran', "P'tran", 'Janek', 'Stanivar', 'Zorand', 'Milor', 'Kostovan'],
                    imperial: ['Petrus', 'Ioannes', 'Stanislaus', 'Casimirus'],
                },
                female: {
                    real: ['Zofia', 'Jadwiga', 'Katarzyna', 'Agnieszka', 'Magdalena', 'Hanna', 'Elżbieta', 'Kinga', 'Zuzanna'],
                    fantasy: ['Zofiara', 'Kingara', 'Simora', 'Danuta'],
                    imperial: ['Sophia', 'Helena', 'Magdalena'],
                },
                instructions: 'West-Slavic softness; -ek/-ush on familiar forms. Traveler-caste men may use a short road-name.',
            },
            appearance: {
                appliesTo: 'human',
                male: 'West-Slavic: paler than Sarapi, brown or dirty-blonde hair more common, high cheekbones. Traveler-for-life men often shave the head; warriors grow a nape braid for battles survived.',
                female: 'Paler West-Slavic coloring, brown to dirty-blonde hair, practical riding clothes rather than peasant wool stacks.',
                clothing: 'Riding tunics, decorated bridles on any horse; ornamental kit on wealthy families.',
                hardBans: ['Cossack cartoon costume', 'winged-hussar parade armor on a starting adventurer'],
            },
            village: {
                examples: ['Nowy-Bor', 'Zofino', 'Vaclav-Brod', 'Kingin-Targ'],
                instructions: 'Polish/Czech/Slovak market-town and horse-station flavor. Single token, no spaces.',
            },
            backstory: {
                instructions: 'Shearing, a hadzhuvane or failed one, guild debt, horse or grain contract, church donations as status.',
            },
        },
        {
            id: 'Vlastari',
            aliases: ['Vlas', 'Vlasini', 'Vlasi', 'Vlach'],
            displayName: 'Vlastari',
            realWorldAnalogues: 'Romania, Montenegro, mountain Serbia, Bulgaria, and Macedonia (Vlach/Aromanian highlanders)',
            context: 'Mountain clans and shepherds. Clan honor, blood oaths, oral verse. Lowlanders call them coarse and superstitious. Mixed marriages are bargained by elders. They keep older rites beside the sun-church.',
            names: {
                male: {
                    real: ['Ion', 'Gheorghe', 'Alexandru', 'Andrei', 'Mihai', 'Vasile', 'Constantin', 'Dumitru', 'Traian', 'Vlad', 'Ștefan', 'Radu'],
                    fantasy: ['Ioanel', 'Vladan', "V'lad", 'Petran', 'Radul', 'Zlatin', 'Mircian', 'Dragos'],
                    imperial: ['Ioannes', 'Georgius', 'Traianus', 'Stephanus', 'Constantinus'],
                },
                female: {
                    real: ['Maria', 'Elena', 'Ioana', 'Ana', 'Doina', 'Ileana', 'Raluca', 'Viorica', 'Rodica', 'Luminița'],
                    fantasy: ['Ioanara', 'Ileanara', 'Doinara', 'Viorica', 'Zlatina'],
                    imperial: ['Maria', 'Helena', 'Iulia'],
                },
                instructions: 'Latin/Dacian flavor; -in/-el/-us on fantasy forms. Clan names may follow the given name.',
            },
            appearance: {
                appliesTo: 'human',
                male: 'Highland Vlach: olive-tan skin, dark hair, heavy brows, wind-cut face. Sheepskin and a clan dagger are identity, not costume extras.',
                female: 'Olive-tan skin, dark hair, practical mountain dress; clan sash or heirloom jewelry rather than city finery.',
                clothing: 'Sheepskin coats, heavy boots, clan belts; inherited dagger visible and defended.',
                hardBans: ['Dracula cape-and-collar', 'generic barbarian pelts with no clan mark'],
            },
            village: {
                examples: ['Poiana-Vlad', 'Radul-Stan', 'Ileana-Col'],
                instructions: 'High pasture, col, sheepfold; Romanian/Montenegrin mountain toponyms. Single token, no spaces.',
            },
            backstory: {
                instructions: 'Clan elders, a blood oath or feud, a mixed marriage bargain, night-horror charms, suspicion from lowlanders.',
            },
        },
        {
            id: 'Derevei',
            aliases: ['Drevyan', 'Derevei'],
            displayName: 'Derevei',
            realWorldAnalogues: 'Northern Russia, Belarus, northern Poland, northern Ukraine',
            context: 'Scattered forest hunters and trappers. No private land in the woods; money is a last resort. Long hair cut rarely — first child or last hunt — and tied to an old oak. A northern mercenary strain exists; do not default to Viking kit.',
            names: {
                male: {
                    real: ['Ivan', 'Dmitry', 'Boris', 'Igor', 'Mikhail', 'Nikolai', 'Pavel', 'Yaroslav', 'Gleb', 'Fyodor', 'Oleg'],
                    fantasy: ['Ivanko', "I'van", 'Dmitran', 'Yarosh', 'Glebko', 'Fedoran', 'Vihren'],
                    imperial: ['Ioannes', 'Demetrios', 'Basileios'],
                },
                female: {
                    real: ['Olga', 'Irina', 'Svetlana', 'Natalia', 'Anastasia', 'Lyudmila', 'Nadezhda', 'Aksinya', 'Alena'],
                    fantasy: ['Olgara', 'Irinasha', 'Svetlara', 'Aksyona', 'Zoya'],
                    imperial: ['Helena', 'Anastasia', 'Sophia'],
                },
                instructions: 'East Slavic first. Nordic names (Bjorn, Einar) only if the story is explicitly a northern mercenary, not the default Drevyan.',
            },
            appearance: {
                appliesTo: 'human',
                male: 'North-east Slavic woodsman: paler, windburned, weathered. Dark hides, moss-green cloak, long rarely-cut hair, bone or wood amulet. Not a horned-helmet Viking.',
                female: 'Pale and weather-marked, practical furs, hair worn long; utilitarian bone/wood charms, not city jewelry.',
                clothing: 'Dark hides, moss-green cloaks, utilitarian amulets of bone and wood.',
                hardBans: ['horned helmet', 'Hollywood Viking braids as the default', 'Siberian shaman cartoon'],
            },
            village: {
                examples: ['Ivan-Zimov', 'Oak-Tie', 'Gleb-Zimka'],
                instructions: 'Winterings of a few families; oak, mire, hunt-camps. Not walled towns. Single token, no spaces.',
            },
            backstory: {
                instructions: 'A wintering, shared hunt-store, distrust of coin and priests\' tithe, a forest-mark after ten winters.',
            },
        },
        {
            id: 'Stigani',
            aliases: ['Stigi', 'Stiganos'],
            displayName: 'Stigani',
            realWorldAnalogues: 'Bulgarian and Balkan Roma (not Russian Romani, not Sinti, not literary "gypsy")',
            context: 'Mobile artisan and fair-caravan kin-groups. Metalworkers, musicians, animal traders. Honor is inward. Settled traders call a Stigani bargain a bad omen and still hire them for rough labor. Names mix Bulgarian host-country names, Balkan Romani names, and some Ylari/Turkic nicknames — without a conquest frame.',
            names: {
                male: {
                    real: ['Asen', 'Tosho', 'Yordan', 'Zlatko', 'Rosen', 'Slavi', 'Boyko', 'Plamen', 'Yanko', 'Dragan', 'Manush', 'Kalo', 'Loizo', 'Shaban', 'Bajram', 'Rustem', 'Ferdo', 'Stevo', 'Nicu'],
                    fantasy: ['Manushan', "K'alo", 'Loizan', 'Zlatan', 'Rusten', 'Feridan', 'Asenar'],
                    imperial: ['Asenios', 'Iordanus', 'Draganios'],
                },
                female: {
                    real: ['Rumyana', 'Rositsa', 'Tsvetanka', 'Donka', 'Stanka', 'Magda', 'Zhivka', 'Violeta', 'Kali', 'Miri', 'Simza', 'Florica', 'Gyuldzhan', 'Lala', 'Mirela', 'Sofiya'],
                    fantasy: ['Mirusha', 'Simzana', 'Tsvetara', 'Rumyara', 'Kalira'],
                    imperial: ['Maria', 'Helena'],
                },
                instructions: 'Bulgarian Roma and Balkan Roma names. Forbidden name stock: Django, Esmeralda, Hanzi, Zemfira, Gilderoy, Walther.',
            },
            appearance: {
                appliesTo: 'human',
                male: 'Bulgarian Roma: bronze-dark to deep olive-brown skin on every Stigani, black hair, black moustache on adult men, dark brown or black eyes, strong brows. Not pale. Not "white-skinned Russian gypsy." Not a light-eyed Hollywood traveler.',
                female: 'Same bronze-dark skin, long black hair, dark eyes. Fair-veil masks and painted face or palms in rich colors at fairs. Not pale, not red-skirt Esmeralda.',
                clothing: 'Bright traveling clothes for fairs; practical road kit otherwise; living on the outskirts of towns.',
                hardBans: [
                    'pale or white skin',
                    'light brown or blonde hair',
                    'blue or green eyes as the default',
                    'Russian fair-skinned Romani',
                    'Esmeralda / Disney traveler costume',
                    'German Sinti look',
                    'using a headscarf as the only ethnic marker on pale skin',
                ],
            },
            village: {
                examples: ['Kali-Fair', 'Loizo-Kuznya', 'Yanko-Meadow'],
                instructions: 'Camps and fair-grounds, not walled villages. Single token, no spaces.',
            },
            backstory: {
                instructions: 'Kin-group first, a craft or fair circuit, settled folk hiring and distrusting them. Do not write a redemption-from-thievery cliché as the whole life.',
            },
        },
        {
            id: 'Thyatians',
            aliases: ['Thyatian'],
            displayName: 'Thyatians',
            realWorldAnalogues: 'Byzantine Empire, Constantinople, medieval Greek/Roman administration',
            context: 'Imperial administrators, knights, and officers. Cultured, hierarchical, often urban. They brought feudal titles and the sun-church form used in the duchy. Distinct from the Slavic-named subjects.',
            names: {
                male: {
                    real: ['Petros', 'Alexandros', 'Basileios', 'Demetrios', 'Georgios', 'Ioannes', 'Konstantinos', 'Leonidas', 'Nikolaos', 'Stephanos', 'Theodoros'],
                    fantasy: ['Petreus', 'Alexios', 'Konstantios', 'Evgenor', 'Cyrillan', 'Valentiar'],
                    imperial: ['Adrianos', 'Nikephoros', 'Theophylaktos', 'Andronikos'],
                },
                female: {
                    real: ['Theodora', 'Eirene', 'Eleni', 'Sophia', 'Anastasia', 'Angeliki', 'Katerina', 'Daphni', 'Ioanna'],
                    fantasy: ['Eirene', 'Chrysoula', 'Kyriaki', 'Despina'],
                    imperial: ['Aikaterini', 'Theodora', 'Zoe'],
                },
                instructions: 'Greek/Byzantine forms. Latinized -us is acceptable. Do not Slavicize a Thyatian unless mixed parentage is explicit.',
            },
            appearance: {
                appliesTo: 'human',
                male: 'East-Mediterranean/Byzantine: olive to tan skin, dark hair, short military cut or a trimmed beard, not a Slavic peasant moustache as the default.',
                female: 'Olive to tan skin, dark hair, urban or officer-family dress; less embroidery-folk, more dyed cloth and sun-disk jewelry.',
                clothing: 'Tunics and practical military garb in imperial reds or purples; shorter haircuts; court or keep life rather than sheepfold.',
                hardBans: ['white marble statue skin', 'Hollywood Roman lorica on a starting PC unless they are clearly an officer'],
            },
            village: {
                examples: ['Petrosford', 'Konstantia', 'Heliokastron'],
                instructions: 'Greek/Byzantine compounds; forts, chapels, administrative hamlets. Single token, no spaces.',
            },
            backstory: {
                instructions: 'Posting, clerkship, officer family, or a colonial household. Tension with Traladaran subjects is manners and rank, not a rant.',
            },
        },
    ],
};
