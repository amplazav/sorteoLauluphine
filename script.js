let participants = [];
let isSpinning = false;
let currentRotation = 0;
let canvas = null;
let ctx = null;
let primerGiroRealizado = false;
let spinCount = 0; // contador de giros totales
let sequentialWinners = []; // lista de ganadores preestablecidos a usar en orden

// Colores por tipo de participante - Femeninos y bonitos
function getColorByTipo(tipo) {
    const coloresPorTipo = {
        'seguidor': '#ff69b4',      // Hot Pink
        'suscriptor': '#dda0dd',    // Orquídea/Lavanda
        'super fan': '#ffb6d9'      // Rosa pálido
    };
    return coloresPorTipo[tipo?.toLowerCase()] || '#ff1493';
}

// Iconos para los tipos de participante
function getIconByTipo(tipo) {
    const iconos = {
        'seguidor': '👤',      // Usuario
        'suscriptor': '⭐',    // Estrella
        'super fan': '💎'      // Diamante
    };
    return iconos[tipo?.toLowerCase()] || '✨';
}

// Datos por defecto
const defaultParticipants = {
    "participantes": [
        { "nickname": "alcaflow_", "tipo": "seguidor", "ganador": false },
        { "nickname": "kennedyeth", "tipo": "seguidor", "ganador": false },
        { "nickname": "xgenesis69", "tipo": "seguidor", "ganador": false },
        { "nickname": "mariob94", "tipo": "seguidor", "ganador": false },
        { "nickname": "mendezrm", "tipo": "seguidor", "ganador": false },
        { "nickname": "seyvansmithdou4", "tipo": "seguidor", "ganador": false },
        { "nickname": "maikolg30", "tipo": "seguidor", "ganador": false },
        { "nickname": "leafar_games", "tipo": "seguidor", "ganador": false },
        { "nickname": "98punky", "tipo": "seguidor", "ganador": false },
        { "nickname": "muriodenuevo", "tipo": "seguidor", "ganador": false },
        { "nickname": "walter_boee", "tipo": "seguidor", "ganador": false },
        { "nickname": "hiccupab3", "tipo": "seguidor", "ganador": false },
        { "nickname": "nemesis5dm", "tipo": "seguidor", "ganador": false },
        { "nickname": "maxzzx16", "tipo": "seguidor", "ganador": false },
        { "nickname": "nemesis_griza", "tipo": "seguidor", "ganador": false },
        { "nickname": "danksg", "tipo": "seguidor", "ganador": false },
        { "nickname": "chusmaa", "tipo": "seguidor", "ganador": false },
        { "nickname": "ishiro7w", "tipo": "seguidor", "ganador": false },
        { "nickname": "embrujo_rustico4", "tipo": "seguidor", "ganador": false },
        { "nickname": "evaanackr", "tipo": "seguidor", "ganador": false },
        { "nickname": "daahrien", "tipo": "seguidor", "ganador": false },
        { "nickname": "tetitasrecargadas", "tipo": "seguidor", "ganador": false },
        { "nickname": "l_barry_l0", "tipo": "seguidor", "ganador": false },
        { "nickname": "david9955t", "tipo": "seguidor", "ganador": false },
        { "nickname": "helixcentauri", "tipo": "seguidor", "ganador": false },
        { "nickname": "lordgansito69", "tipo": "seguidor", "ganador": false },
        { "nickname": "star_leonidas", "tipo": "seguidor", "ganador": false },
        { "nickname": "s4faera", "tipo": "seguidor", "ganador": false },
        { "nickname": "fernando2606", "tipo": "seguidor", "ganador": false },
        { "nickname": "mai_sunshine", "tipo": "seguidor", "ganador": false },
        { "nickname": "edikroosaf", "tipo": "seguidor", "ganador": false },
        { "nickname": "miguel_angel__9", "tipo": "seguidor", "ganador": false },
        { "nickname": "lelouch521", "tipo": "seguidor", "ganador": false },
        { "nickname": "anthonyluna_", "tipo": "seguidor", "ganador": false },
        { "nickname": "jonha098", "tipo": "seguidor", "ganador": false },
        { "nickname": "pollux115", "tipo": "seguidor", "ganador": false },
        { "nickname": "carlosxd3666", "tipo": "seguidor", "ganador": false },
        { "nickname": "elsonorensehmo", "tipo": "seguidor", "ganador": false },
        { "nickname": "sir_leirax", "tipo": "seguidor", "ganador": false },
        { "nickname": "222hugoo", "tipo": "seguidor", "ganador": false },
        { "nickname": "danielkennedi", "tipo": "seguidor", "ganador": false },
        { "nickname": "emk_geovas_gears", "tipo": "seguidor", "ganador": false },
        { "nickname": "ivanj_frost", "tipo": "seguidor", "ganador": false },
        { "nickname": "manulamus", "tipo": "seguidor", "ganador": false },
        { "nickname": "zavaletajc", "tipo": "seguidor", "ganador": false },
        { "nickname": "tiohunter666", "tipo": "seguidor", "ganador": false },
        { "nickname": "thefenix210", "tipo": "seguidor", "ganador": false },
        { "nickname": "serch_aj", "tipo": "seguidor", "ganador": false },
        { "nickname": "x_alex_gamer_x", "tipo": "seguidor", "ganador": false },
        { "nickname": "aerosmithzero", "tipo": "seguidor", "ganador": false },
        { "nickname": "imonkis", "tipo": "seguidor", "ganador": false },
        { "nickname": "kurogames2424", "tipo": "seguidor", "ganador": false },
        { "nickname": "nightsae", "tipo": "seguidor", "ganador": false },
        { "nickname": "exuryii", "tipo": "seguidor", "ganador": false },
        { "nickname": "theblackandres", "tipo": "seguidor", "ganador": false },
        { "nickname": "jaguer_1", "tipo": "seguidor", "ganador": false },
        { "nickname": "akamennoc", "tipo": "seguidor", "ganador": false },
        { "nickname": "raiderkiin", "tipo": "seguidor", "ganador": false },
        { "nickname": "mariidumichi", "tipo": "seguidor", "ganador": false },
        { "nickname": "savagegg_", "tipo": "seguidor", "ganador": false },
        { "nickname": "santloxx", "tipo": "seguidor", "ganador": false },
        { "nickname": "ruztolz", "tipo": "seguidor", "ganador": false },
        { "nickname": "marog2", "tipo": "seguidor", "ganador": false },
        { "nickname": "kamina087", "tipo": "seguidor", "ganador": false },
        { "nickname": "lobito_ck", "tipo": "seguidor", "ganador": false },
        { "nickname": "x_hao_x", "tipo": "seguidor", "ganador": false },
        { "nickname": "mariopesaressi42891", "tipo": "seguidor", "ganador": false },
        { "nickname": "mcflygarcia", "tipo": "seguidor", "ganador": false },
        { "nickname": "a3_hack24k", "tipo": "seguidor", "ganador": false },
        { "nickname": "vibeblazze", "tipo": "seguidor", "ganador": false },
        { "nickname": "andy_4k", "tipo": "seguidor", "ganador": false },
        { "nickname": "androssi5", "tipo": "seguidor", "ganador": false },
        { "nickname": "neloz___", "tipo": "seguidor", "ganador": false },
        { "nickname": "ammuniition19", "tipo": "seguidor", "ganador": false },
        { "nickname": "avanzar", "tipo": "seguidor", "ganador": false },
        { "nickname": "leyder117lml", "tipo": "seguidor", "ganador": false },
        { "nickname": "purelightss", "tipo": "seguidor", "ganador": false },
        { "nickname": "hoke1234bros", "tipo": "seguidor", "ganador": false },
        { "nickname": "illuminaty_9", "tipo": "seguidor", "ganador": false },
        { "nickname": "hades3192", "tipo": "seguidor", "ganador": false },
        { "nickname": "dioszeus77", "tipo": "seguidor", "ganador": false },
        { "nickname": "aaron_33a", "tipo": "seguidor", "ganador": false },
        { "nickname": "omarmyte", "tipo": "seguidor", "ganador": false },
        { "nickname": "anubiis_mxi", "tipo": "seguidor", "ganador": false },
        { "nickname": "vicsstakes", "tipo": "seguidor", "ganador": false },
        { "nickname": "riot__chomber", "tipo": "seguidor", "ganador": false },
        { "nickname": "axelhg01", "tipo": "seguidor", "ganador": false },
        { "nickname": "nevarez_z", "tipo": "seguidor", "ganador": false },
        { "nickname": "lfmm06", "tipo": "seguidor", "ganador": false },
        { "nickname": "cremitadbebe", "tipo": "seguidor", "ganador": false },
        { "nickname": "jereck44", "tipo": "seguidor", "ganador": false },
        { "nickname": "elgomitash", "tipo": "seguidor", "ganador": true },
        { "nickname": "parisgrantt", "tipo": "seguidor", "ganador": false },
        { "nickname": "edgarsp03", "tipo": "seguidor", "ganador": false },
        { "nickname": "sigoxixonas", "tipo": "seguidor", "ganador": false },
        { "nickname": "11hec_tor11", "tipo": "seguidor", "ganador": false },
        { "nickname": "kaspergame7", "tipo": "seguidor", "ganador": false },
        { "nickname": "maxwellinn", "tipo": "seguidor", "ganador": false },
        { "nickname": "cristianzorro_0w0", "tipo": "seguidor", "ganador": false },
        { "nickname": "isynv", "tipo": "seguidor", "ganador": false },
        { "nickname": "peselagart", "tipo": "seguidor", "ganador": false },
        { "nickname": "miguelpichi", "tipo": "seguidor", "ganador": false },
        { "nickname": "luisleonardomx", "tipo": "seguidor", "ganador": false },
        { "nickname": "snuffygoat", "tipo": "seguidor", "ganador": false },
        { "nickname": "rocha2_12", "tipo": "seguidor", "ganador": false },
        { "nickname": "ltkeev", "tipo": "seguidor", "ganador": false },
        { "nickname": "soyzeeus_", "tipo": "seguidor", "ganador": false },
        { "nickname": "dougdimadoneg", "tipo": "seguidor", "ganador": false },
        { "nickname": "suidelta", "tipo": "seguidor", "ganador": false },
        { "nickname": "daniela3212", "tipo": "seguidor", "ganador": false },
        { "nickname": "ap1d_", "tipo": "seguidor", "ganador": false },
        { "nickname": "el_alexis_24", "tipo": "seguidor", "ganador": false },
        { "nickname": "j3ssge", "tipo": "seguidor", "ganador": false },
        { "nickname": "salovibes", "tipo": "seguidor", "ganador": false },
        { "nickname": "c6ej9th72n", "tipo": "seguidor", "ganador": false },
        { "nickname": "shuttuwu", "tipo": "seguidor", "ganador": false },
        { "nickname": "luisenrique072000", "tipo": "seguidor", "ganador": false },
        { "nickname": "erycampo", "tipo": "seguidor", "ganador": false },
        { "nickname": "sebastianbacon", "tipo": "seguidor", "ganador": false },
        { "nickname": "aaronjajasmalja", "tipo": "seguidor", "ganador": false },
        { "nickname": "peterbartolomeoj", "tipo": "seguidor", "ganador": false },
        { "nickname": "eliug3108", "tipo": "seguidor", "ganador": false },
        { "nickname": "ol_david_lo", "tipo": "seguidor", "ganador": false },
        { "nickname": "iorylee_187", "tipo": "seguidor", "ganador": false },
        { "nickname": "lachispaamiritmo", "tipo": "seguidor", "ganador": false },
        { "nickname": "jonathandx23", "tipo": "seguidor", "ganador": false },
        { "nickname": "lurieltv", "tipo": "seguidor", "ganador": false },
        { "nickname": "reydeemonio", "tipo": "seguidor", "ganador": false },
        { "nickname": "mikamix2000", "tipo": "seguidor", "ganador": false },
        { "nickname": "jorgefe1990", "tipo": "seguidor", "ganador": false },
        { "nickname": "leandroherrero4060", "tipo": "seguidor", "ganador": false },
        { "nickname": "champagne_9", "tipo": "seguidor", "ganador": false },
        { "nickname": "arell_sometimes", "tipo": "seguidor", "ganador": false },
        { "nickname": "alonsocb", "tipo": "seguidor", "ganador": false },
        { "nickname": "dragonofwar12", "tipo": "seguidor", "ganador": false },
        { "nickname": "nekogatito", "tipo": "seguidor", "ganador": false },
        { "nickname": "ki0sen", "tipo": "seguidor", "ganador": false },
        { "nickname": "adrian9524", "tipo": "seguidor", "ganador": false },
        { "nickname": "yonelvisg_g", "tipo": "seguidor", "ganador": false },
        { "nickname": "ramega2024", "tipo": "seguidor", "ganador": false },
        { "nickname": "moraleda14", "tipo": "seguidor", "ganador": false },
        { "nickname": "chef_del_infierno", "tipo": "seguidor", "ganador": false },
        { "nickname": "mt_rasca", "tipo": "seguidor", "ganador": false },
        { "nickname": "jhon_fercrack", "tipo": "seguidor", "ganador": false },
        { "nickname": "kiyotakaayanokouji3", "tipo": "seguidor", "ganador": false },
        { "nickname": "phxro_", "tipo": "seguidor", "ganador": false },
        { "nickname": "kaiservevo", "tipo": "seguidor", "ganador": false },
        { "nickname": "andrew_ramirezz", "tipo": "seguidor", "ganador": false },
        { "nickname": "fan_lau_resident", "tipo": "seguidor", "ganador": false },
        { "nickname": "yusepe_23", "tipo": "seguidor", "ganador": false },
        { "nickname": "anitalagita", "tipo": "seguidor", "ganador": false },
        { "nickname": "juancamilolk", "tipo": "seguidor", "ganador": false },
        { "nickname": "luckfullmklol", "tipo": "seguidor", "ganador": false },
        { "nickname": "invitacional", "tipo": "seguidor", "ganador": false },
        { "nickname": "retrowaffle_", "tipo": "seguidor", "ganador": false },
        { "nickname": "omarnyte", "tipo": "seguidor", "ganador": false },
        { "nickname": "cristian14jacobo", "tipo": "seguidor", "ganador": false },
        { "nickname": "sebasjara89", "tipo": "seguidor", "ganador": false },
        { "nickname": "nerosrsng", "tipo": "seguidor", "ganador": false },
        { "nickname": "sliferra7", "tipo": "seguidor", "ganador": false },
        { "nickname": "tenko_zorro_celestial01", "tipo": "seguidor", "ganador": false },
        { "nickname": "xavyprezzpr_", "tipo": "seguidor", "ganador": false },
        { "nickname": "johntecnoterrenus", "tipo": "seguidor", "ganador": false },
        { "nickname": "korlquid", "tipo": "seguidor", "ganador": false },
        { "nickname": "zannazul", "tipo": "seguidor", "ganador": false },
        { "nickname": "n1troxxx", "tipo": "seguidor", "ganador": false },
        { "nickname": "sosafail", "tipo": "seguidor", "ganador": false },
        { "nickname": "godzillalegedary117", "tipo": "seguidor", "ganador": false },
        { "nickname": "maximoflores165658", "tipo": "seguidor", "ganador": false },
        { "nickname": "captain4fit", "tipo": "seguidor", "ganador": false },
        { "nickname": "supervily47", "tipo": "seguidor", "ganador": false },
        { "nickname": "pablo27_05", "tipo": "seguidor", "ganador": false },
        { "nickname": "manutg64", "tipo": "seguidor", "ganador": false },
        { "nickname": "seth_gael", "tipo": "seguidor", "ganador": false },
        { "nickname": "elmikegc", "tipo": "seguidor", "ganador": false },
        { "nickname": "dante_d_616", "tipo": "seguidor", "ganador": false },
        { "nickname": "godgod97", "tipo": "seguidor", "ganador": false },
        { "nickname": "heeroyui480", "tipo": "seguidor", "ganador": false },
        { "nickname": "davinci_putero", "tipo": "seguidor", "ganador": false },
        { "nickname": "zeromus_77", "tipo": "seguidor", "ganador": false },
        { "nickname": "dudosaam", "tipo": "seguidor", "ganador": false },
        { "nickname": "andyelsetentaysiete", "tipo": "seguidor", "ganador": false },
        { "nickname": "hecren_", "tipo": "seguidor", "ganador": false },
        { "nickname": "serphp", "tipo": "seguidor", "ganador": false },
        { "nickname": "alexzazupick21", "tipo": "seguidor", "ganador": false },
        { "nickname": "kangreburguitoelpayaso", "tipo": "seguidor", "ganador": false },
        { "nickname": "davidhasseljoff", "tipo": "seguidor", "ganador": false },
        { "nickname": "el_santi_de_la_ely", "tipo": "seguidor", "ganador": false },
        { "nickname": "yeibo", "tipo": "seguidor", "ganador": false },
        { "nickname": "estacado169", "tipo": "seguidor", "ganador": false },
        { "nickname": "pollo_ala_brazer", "tipo": "seguidor", "ganador": false },
        { "nickname": "julian_j321", "tipo": "seguidor", "ganador": false },
        { "nickname": "cagaodelsusto", "tipo": "seguidor", "ganador": false },
        { "nickname": "chris_j03", "tipo": "seguidor", "ganador": false },
        { "nickname": "modooxi", "tipo": "seguidor", "ganador": false },
        { "nickname": "soriio", "tipo": "seguidor", "ganador": false },
        { "nickname": "barriosdaniel2", "tipo": "seguidor", "ganador": false },
        { "nickname": "jhafretd123", "tipo": "seguidor", "ganador": false },
        { "nickname": "omgpizzalolbit_", "tipo": "seguidor", "ganador": false },
        { "nickname": "mauricio_s22", "tipo": "seguidor", "ganador": false },
        { "nickname": "mr_raven22", "tipo": "seguidor", "ganador": false },
        { "nickname": "sbaztian", "tipo": "seguidor", "ganador": false },
        { "nickname": "villaoscar1", "tipo": "seguidor", "ganador": false },
        { "nickname": "gtjoelyt", "tipo": "seguidor", "ganador": false },
        { "nickname": "lucassss_4", "tipo": "seguidor", "ganador": false },
        { "nickname": "hans_von_der_leyen", "tipo": "seguidor", "ganador": false },
        { "nickname": "torres_0_9", "tipo": "seguidor", "ganador": false },
        { "nickname": "bethor996", "tipo": "seguidor", "ganador": false },
        { "nickname": "havek733", "tipo": "seguidor", "ganador": false },
        { "nickname": "thechristianytra", "tipo": "seguidor", "ganador": false },
        { "nickname": "eggburgerking", "tipo": "seguidor", "ganador": false },
        { "nickname": "jamesg08", "tipo": "seguidor", "ganador": false },
        { "nickname": "gearockxd", "tipo": "seguidor", "ganador": false },
        { "nickname": "kaleodc", "tipo": "seguidor", "ganador": false },
        { "nickname": "jesusbernal14", "tipo": "seguidor", "ganador": false },
        { "nickname": "qs_newbie", "tipo": "seguidor", "ganador": false },
        { "nickname": "taco_al_pastor_29", "tipo": "seguidor", "ganador": false },
        { "nickname": "victorjimenez__", "tipo": "seguidor", "ganador": false },
        { "nickname": "dreb8", "tipo": "seguidor", "ganador": false },
        { "nickname": "ray_6040", "tipo": "seguidor", "ganador": false },
        { "nickname": "snippetyivan", "tipo": "seguidor", "ganador": false },
        { "nickname": "mauricio_vca", "tipo": "seguidor", "ganador": false },
        { "nickname": "walejandrow1", "tipo": "seguidor", "ganador": false },
        { "nickname": "lunacobo17", "tipo": "seguidor", "ganador": false },
        { "nickname": "k0sm0", "tipo": "seguidor", "ganador": false },
        { "nickname": "nakamajuanelo", "tipo": "seguidor", "ganador": false },
        { "nickname": "elmarcus98x", "tipo": "seguidor", "ganador": false },
        { "nickname": "juanlin19", "tipo": "seguidor", "ganador": false },
        { "nickname": "matheusmbp", "tipo": "seguidor", "ganador": false },
        { "nickname": "theneontv1", "tipo": "seguidor", "ganador": false },
        { "nickname": "daahrl", "tipo": "seguidor", "ganador": false },
        { "nickname": "greedy_boy0", "tipo": "seguidor", "ganador": false },
        { "nickname": "raullokillo23", "tipo": "seguidor", "ganador": false },
        { "nickname": "ghaaheg58", "tipo": "seguidor", "ganador": false },
        { "nickname": "estzweii", "tipo": "seguidor", "ganador": false },
        { "nickname": "oliverwoodlol", "tipo": "seguidor", "ganador": false },
        { "nickname": "an_revoleeussuni_kfc", "tipo": "seguidor", "ganador": false },
        { "nickname": "xlove1xx", "tipo": "seguidor", "ganador": false },
        { "nickname": "inquisidorls", "tipo": "seguidor", "ganador": false },
        { "nickname": "iamhoruus", "tipo": "seguidor", "ganador": false },
        { "nickname": "warbajo", "tipo": "seguidor", "ganador": false },
        { "nickname": "diegoapa17", "tipo": "seguidor", "ganador": false },
        { "nickname": "expreator", "tipo": "seguidor", "ganador": false },
        { "nickname": "nobledarck", "tipo": "seguidor", "ganador": false },
        { "nickname": "emafernandez2002", "tipo": "seguidor", "ganador": false },
        { "nickname": "spartan176_oficial", "tipo": "seguidor", "ganador": false },
        { "nickname": "luiggisanchz", "tipo": "seguidor", "ganador": false },
        { "nickname": "tidanto", "tipo": "seguidor", "ganador": false },
        { "nickname": "justfortheow2drops", "tipo": "seguidor", "ganador": false },
        { "nickname": "parzitomx", "tipo": "seguidor", "ganador": false },
        { "nickname": "kitsushine", "tipo": "seguidor", "ganador": false },
        { "nickname": "nicolas_mc_", "tipo": "seguidor", "ganador": false },
        { "nickname": "paucruzzz", "tipo": "seguidor", "ganador": false },
        { "nickname": "davideronin23", "tipo": "seguidor", "ganador": false },
        { "nickname": "senintai", "tipo": "seguidor", "ganador": false },
        { "nickname": "agent_carl", "tipo": "seguidor", "ganador": false },
        { "nickname": "nicolascs11", "tipo": "seguidor", "ganador": false },
        { "nickname": "ark00198", "tipo": "seguidor", "ganador": false },
        { "nickname": "keypy_cosmic_of", "tipo": "seguidor", "ganador": false },
        { "nickname": "rikosuavetusabe", "tipo": "seguidor", "ganador": false },
        { "nickname": "gabrie710", "tipo": "seguidor", "ganador": false },
        { "nickname": "fabianchicaiza1999", "tipo": "seguidor", "ganador": false },
        { "nickname": "unlic3ddmagalover", "tipo": "seguidor", "ganador": false },
        { "nickname": "grahf_498", "tipo": "seguidor", "ganador": false },
        { "nickname": "fuegovely", "tipo": "seguidor", "ganador": false },
        { "nickname": "channelxyz1", "tipo": "seguidor", "ganador": false },
        { "nickname": "manolothebest10", "tipo": "seguidor", "ganador": false },
        { "nickname": "bunnita", "tipo": "seguidor", "ganador": false },
        { "nickname": "al3jandro_187", "tipo": "seguidor", "ganador": false },
        { "nickname": "thundercomeback", "tipo": "seguidor", "ganador": false },
        { "nickname": "panchiiodiporcelanadta", "tipo": "seguidor", "ganador": false },
        { "nickname": "andresmf7", "tipo": "seguidor", "ganador": false },
        { "nickname": "bodoquetwh", "tipo": "seguidor", "ganador": false },
        { "nickname": "damm_77", "tipo": "seguidor", "ganador": false },
        { "nickname": "jolam14", "tipo": "seguidor", "ganador": false },
        { "nickname": "eredinberserker03", "tipo": "seguidor", "ganador": false },
        { "nickname": "7luccho", "tipo": "seguidor", "ganador": false },
        { "nickname": "siniestro_jf", "tipo": "seguidor", "ganador": false },
        { "nickname": "andy_johnson_14", "tipo": "seguidor", "ganador": false },
        { "nickname": "ego_invictus_593", "tipo": "seguidor", "ganador": false },
        { "nickname": "william__197", "tipo": "seguidor", "ganador": false },
        { "nickname": "strectmart56_e", "tipo": "seguidor", "ganador": false },
        { "nickname": "valeria_afk", "tipo": "seguidor", "ganador": false },
        { "nickname": "brea_666", "tipo": "seguidor", "ganador": false },
        { "nickname": "coltan97", "tipo": "seguidor", "ganador": false },
        { "nickname": "strectmart56_", "tipo": "seguidor", "ganador": false },
        { "nickname": "choppah30", "tipo": "seguidor", "ganador": false },
        { "nickname": "diebolicc", "tipo": "seguidor", "ganador": false },
        { "nickname": "elkratos022", "tipo": "seguidor", "ganador": false },
        { "nickname": "godesulol", "tipo": "seguidor", "ganador": false },
        { "nickname": "mejoralit0o", "tipo": "seguidor", "ganador": false },
        { "nickname": "viand_s", "tipo": "seguidor", "ganador": false },
        { "nickname": "yulcito356", "tipo": "seguidor", "ganador": false },
        { "nickname": "khorixrd", "tipo": "seguidor", "ganador": false },
        { "nickname": "luismariotwich", "tipo": "seguidor", "ganador": false },
        { "nickname": "temohpabdraven", "tipo": "seguidor", "ganador": false },
        { "nickname": "mikurawr_", "tipo": "seguidor", "ganador": false },
        { "nickname": "mateolobo16", "tipo": "seguidor", "ganador": false },
        { "nickname": "galahadking567", "tipo": "seguidor", "ganador": false },
        { "nickname": "sarubin10", "tipo": "seguidor", "ganador": false },
        { "nickname": "blogos47", "tipo": "seguidor", "ganador": false },
        { "nickname": "callmefire_", "tipo": "seguidor", "ganador": false },
        { "nickname": "erickdios1234", "tipo": "seguidor", "ganador": false },
        { "nickname": "n30s_2023", "tipo": "seguidor", "ganador": false },
        { "nickname": "sander_howl", "tipo": "seguidor", "ganador": false },
        { "nickname": "jackal_ley", "tipo": "seguidor", "ganador": false },
        { "nickname": "gianv289", "tipo": "seguidor", "ganador": false },
        { "nickname": "leonpalidos", "tipo": "seguidor", "ganador": false },
        { "nickname": "nicolasbl23", "tipo": "seguidor", "ganador": false },
        { "nickname": "michaellbarreto", "tipo": "seguidor", "ganador": false },
        { "nickname": "bryanop1", "tipo": "seguidor", "ganador": false },
        { "nickname": "yuta3097", "tipo": "seguidor", "ganador": false },
        { "nickname": "novanryder", "tipo": "seguidor", "ganador": false },
        { "nickname": "nirbi_007", "tipo": "seguidor", "ganador": false },
        { "nickname": "max_games25", "tipo": "seguidor", "ganador": false },
        { "nickname": "lordoraka00", "tipo": "seguidor", "ganador": false },
        { "nickname": "sirpsychomagik", "tipo": "seguidor", "ganador": false },
        { "nickname": "royben33", "tipo": "seguidor", "ganador": false },
        { "nickname": "daikevs", "tipo": "seguidor", "ganador": false },
        { "nickname": "foreanoti", "tipo": "seguidor", "ganador": false },
        { "nickname": "darklezx", "tipo": "seguidor", "ganador": false },
        { "nickname": "rongort", "tipo": "seguidor", "ganador": false },
        { "nickname": "lionheead1", "tipo": "seguidor", "ganador": false },
        { "nickname": "cswerr", "tipo": "seguidor", "ganador": false },
        { "nickname": "jvlandazabal", "tipo": "seguidor", "ganador": false },
        { "nickname": "xnimusru", "tipo": "seguidor", "ganador": false },
        { "nickname": "sebastuto1", "tipo": "seguidor", "ganador": false },
        { "nickname": "soygalox_pixie27", "tipo": "seguidor", "ganador": false },
        { "nickname": "lozanossj", "tipo": "seguidor", "ganador": false },
        { "nickname": "hirofythru", "tipo": "seguidor", "ganador": false },
        { "nickname": "lymms_", "tipo": "seguidor", "ganador": false },
        { "nickname": "alejojojos", "tipo": "seguidor", "ganador": false },
        { "nickname": "freddy7598", "tipo": "seguidor", "ganador": false },
        { "nickname": "avocadotasty", "tipo": "seguidor", "ganador": false },
        { "nickname": "the_last_king_trounks", "tipo": "seguidor", "ganador": false },
        { "nickname": "caramelonaranja", "tipo": "seguidor", "ganador": false },
        { "nickname": "soii_nekro11", "tipo": "seguidor", "ganador": false },
        { "nickname": "symbolicc_", "tipo": "seguidor", "ganador": false },
        { "nickname": "rhaiigtt", "tipo": "seguidor", "ganador": false },
        { "nickname": "rodrigo_g0th", "tipo": "seguidor", "ganador": false },
        { "nickname": "kevless11", "tipo": "seguidor", "ganador": false },
        { "nickname": "velkahn", "tipo": "seguidor", "ganador": false },
        { "nickname": "slock115", "tipo": "seguidor", "ganador": false },
        { "nickname": "sparkito29", "tipo": "seguidor", "ganador": false },
        { "nickname": "lucass60000", "tipo": "seguidor", "ganador": false },
        { "nickname": "tiffanygrolon", "tipo": "seguidor", "ganador": false },
        { "nickname": "juandiego_mq11", "tipo": "seguidor", "ganador": false },
        { "nickname": "enosucl", "tipo": "seguidor", "ganador": false },
        { "nickname": "factoledg", "tipo": "seguidor", "ganador": false },
        { "nickname": "xjessicatm", "tipo": "seguidor", "ganador": false },
        { "nickname": "joaoxz17dc", "tipo": "seguidor", "ganador": false },
        { "nickname": "henrypxnyjuansamuelgam", "tipo": "seguidor", "ganador": false },
        { "nickname": "guaporeon", "tipo": "seguidor", "ganador": false },
        { "nickname": "davidglez32", "tipo": "seguidor", "ganador": false },
        { "nickname": "al_sick77", "tipo": "seguidor", "ganador": false },
        { "nickname": "foxkaax", "tipo": "seguidor", "ganador": false },
        { "nickname": "trenlokotakes", "tipo": "seguidor", "ganador": false },
        { "nickname": "victor_poncho", "tipo": "seguidor", "ganador": false },
        { "nickname": "emociooness", "tipo": "seguidor", "ganador": false },
        { "nickname": "geralcavaz", "tipo": "seguidor", "ganador": false },
        { "nickname": "moly74", "tipo": "seguidor", "ganador": false },
        { "nickname": "guilleflores17", "tipo": "seguidor", "ganador": false },
        { "nickname": "soulchelo468", "tipo": "seguidor", "ganador": false },
        { "nickname": "daniel_zoom", "tipo": "seguidor", "ganador": false },
        { "nickname": "ziaferus", "tipo": "seguidor", "ganador": false },
        { "nickname": "tentaclekun_gg", "tipo": "seguidor", "ganador": false },
        { "nickname": "lkariil", "tipo": "seguidor", "ganador": false },
        { "nickname": "merlyxd", "tipo": "seguidor", "ganador": false },
        { "nickname": "zzdoblordzz", "tipo": "seguidor", "ganador": false },
        { "nickname": "caballerodrag0n", "tipo": "seguidor", "ganador": false },
        { "nickname": "w0lfingame", "tipo": "seguidor", "ganador": false },
        { "nickname": "lechuga199423", "tipo": "seguidor", "ganador": false },
        { "nickname": "levidandres", "tipo": "seguidor", "ganador": false },
        { "nickname": "andresvzs", "tipo": "seguidor", "ganador": false },
        { "nickname": "aysel_san", "tipo": "seguidor", "ganador": false },
        { "nickname": "starblackwell", "tipo": "seguidor", "ganador": false },
        { "nickname": "lordbombard", "tipo": "seguidor", "ganador": false },
        { "nickname": "t1_carlitoz", "tipo": "seguidor", "ganador": false },
        { "nickname": "emiliofbx", "tipo": "seguidor", "ganador": false },
        { "nickname": "xxsamex", "tipo": "seguidor", "ganador": false },
        { "nickname": "ivanrsag", "tipo": "seguidor", "ganador": false },
        { "nickname": "duvaanzzzz", "tipo": "seguidor", "ganador": false },
        { "nickname": "pleasingzzz", "tipo": "seguidor", "ganador": false },
        { "nickname": "bogardd", "tipo": "seguidor", "ganador": false },
        { "nickname": "tadabanri_gt", "tipo": "seguidor", "ganador": false },
        { "nickname": "elpaisita0me", "tipo": "seguidor", "ganador": false },
        { "nickname": "lordnemes1s", "tipo": "seguidor", "ganador": false },
        { "nickname": "spirit_fre", "tipo": "seguidor", "ganador": false },
        { "nickname": "boaty94", "tipo": "seguidor", "ganador": false },
        { "nickname": "gonzaspw", "tipo": "seguidor", "ganador": false },
        { "nickname": "penislunatico", "tipo": "seguidor", "ganador": false },
        { "nickname": "olasa1199", "tipo": "seguidor", "ganador": false },
        { "nickname": "leonkennedyy22", "tipo": "seguidor", "ganador": false },
        { "nickname": "alexislobito", "tipo": "seguidor", "ganador": false },
        { "nickname": "dadollstekks", "tipo": "seguidor", "ganador": false },
        { "nickname": "pacmare_", "tipo": "seguidor", "ganador": false },
        { "nickname": "ryutaakari17", "tipo": "seguidor", "ganador": false },
        { "nickname": "yisus_uchiha__", "tipo": "seguidor", "ganador": false },
        { "nickname": "arkadio_97", "tipo": "seguidor", "ganador": false },
        { "nickname": "artic593ecu", "tipo": "seguidor", "ganador": false },
        { "nickname": "ville2000x", "tipo": "seguidor", "ganador": true }
    ]
};

// Cargar datos al abrir la página
window.addEventListener('DOMContentLoaded', async () => {
    // Intentar cargar data.txt si existe en el proyecto (formato CSV nombre,tipo[,ganador])
    try {
        const resp = await fetch('data.txt?' + Date.now()); // Cache-buster para asegurar versión más reciente
        if (resp.ok) {
            const text = await resp.text();
            const parsed = parseTxtContent(text);
            if (parsed.length > 0) {
                participants = parsed;
                console.log('[DOMContentLoaded] Cargados', participants.length, 'participantes desde data.txt');
            }
        } else {
            console.warn('[DOMContentLoaded] fetch data.txt respondió con status', resp.status);
        }
    } catch (err) {
        // No hacer nada si falla (p. ej. CORS o file://)
        console.warn('[DOMContentLoaded] No se pudo cargar data.txt automáticamente:', err.message || err, '(usa http://localhost:8000 en lugar de file://)');
    }

    // Si no se cargó data.txt, usar los por defecto embebidos
    if ((!participants || participants.length === 0) && defaultParticipants.participantes && defaultParticipants.participantes.length > 0) {
        participants = defaultParticipants.participantes;
        console.log('[DOMContentLoaded] Usando participantes por defecto:', participants.length, 'personas');
    }

    // Construir lista de ganadores segun campo ganador=true
    buildSequentialWinners();

    // Render inicial usando la lista vertical
    drawRoulette();

    // Permitir cargar archivo JSON o TXT personalizado
    const fileInput = document.getElementById('fileInput');
    if (fileInput) fileInput.addEventListener('change', handleFileUpload);

    const spinBtn = document.getElementById('spinBtn');
    if (spinBtn) spinBtn.addEventListener('click', spin);

    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) resetBtn.addEventListener('click', resetWheel);
});

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target.result;
                // Detectar si es TXT (CSV) por extensión o por contenido
                const isTxt = file.name.toLowerCase().endsWith('.txt') || file.type === 'text/plain' || content.indexOf(',') !== -1 && content.indexOf('{') === -1;

                if (isTxt) {
                    const parsed = parseTxtContent(content);
                    if (parsed.length > 0) {
                        participants = parsed;
                        spinCount = 0;
                        primerGiroRealizado = false;
                        buildSequentialWinners();
                        drawRoulette();
                        isSpinning = false;
                        const spinBtn = document.getElementById('spinBtn'); if (spinBtn) spinBtn.disabled = false;
                        alert(`✨ Se cargaron ${participants.length} participantes desde TXT correctamente!`);
                    } else {
                        alert('❌ No se encontraron participantes válidos en el archivo TXT. Asegúrate de que cada línea tenga: nombre,tipo[,ganador]');
                    }
                    return;
                }

                const data = JSON.parse(content);
                if (data.participantes && data.participantes.length > 0) {
                    participants = data.participantes;
                    currentRotation = 0;
                    spinCount = 0;
                    primerGiroRealizado = false;
                    buildSequentialWinners();
                    drawRoulette();
                    isSpinning = false;
                    const spinBtn = document.getElementById('spinBtn'); if (spinBtn) spinBtn.disabled = false;
                    
                    // Verificar si hay ganadores preestablecidos
                    if (sequentialWinners.length > 0) {
                        alert(`✨ Se cargaron ${participants.length} participantes correctamente!\n\n⭐ IMPORTANTE: Hay ${sequentialWinners.length} ganador(es) preestablecido(s) que ganarán en orden: ${sequentialWinners.map(p => p.nickname).join(', ')}.`);
                    } else {
                        alert(`✨ Se cargaron ${participants.length} participantes correctamente!`);
                    }
                } else {
                    alert('❌ El JSON debe contener un array "participantes"');
                }
            } catch (error) {
                alert('❌ Error al leer el archivo: ' + error.message);
            }
        };
        reader.readAsText(file);
    }
}

// Parsear contenido TXT/CSV: cada línea -> nickname,tipo[,ganador]
function parseTxtContent(content) {
    const lines = content.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    const results = [];
    let countBySuperFan = 0, countBySuscriptor = 0, countByFollower = 0;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        // Quitar comillas si existen
        if ((line.startsWith('"') && line.endsWith('"')) || (line.startsWith("'") && line.endsWith("'"))) {
            line = line.slice(1, -1);
        }
        const parts = line.split(',').map(p => p.trim());
        if (parts.length >= 2) {
            const nickname = parts[0];
            const tipo = parts[1] || 'seguidor';
            let ganador = false;
            if (parts.length >= 3) {
                const g = parts[2].toString().toLowerCase();
                ganador = (g === 'true' || g === '1' || g === 'si' || g === 'sí');
            }
            results.push({ nickname, tipo, ganador });
            
            // Contar por tipo
            if (tipo.toLowerCase() === 'super fan') countBySuperFan++;
            else if (tipo.toLowerCase() === 'suscriptor') countBySuscriptor++;
            else countByFollower++;
        }
    }

    console.log('[parseTxtContent] parseados', results.length, 'participantes:', countBySuperFan, 'super fans,', countBySuscriptor, 'suscriptores,', countByFollower, 'seguidores');
    return results;
}

// Vertical roulette rendering (DOM-based) for large participant counts
function drawRoulette() {
    const rouletteList = document.getElementById('rouletteList');
    if (!rouletteList) return;
    rouletteList.innerHTML = '';

    if (participants.length === 0) {
        rouletteList.innerHTML = '<div class="roulette-item">Carga un JSON para comenzar</div>';
        return;
    }

    const itemHeight = 60;
    // Usar participantes expandidos (super fan 5x, suscriptor 3x, seguidor 1x)
    const baseParticipants = getExpandedParticipants();
    
    // Determinar spins posible (se calcula en spin), pero para render simplemente repetimos suficiente veces
    const repeatCount = 7;
    const extended = [];
    for (let r = 0; r < repeatCount; r++) {
        for (let i = 0; i < baseParticipants.length; i++) {
            extended.push(baseParticipants[i]);
        }
    }

    extended.forEach((p) => {
        const item = document.createElement('div');
        item.className = 'roulette-item';
        item.dataset.nickname = p.nickname || '';
        const iconSpan = document.createElement('span');
        iconSpan.className = 'icon';
        iconSpan.textContent = getIconByTipo(p.tipo);
        iconSpan.style.color = getColorByTipo(p.tipo);

        const nameSpan = document.createElement('span');
        nameSpan.className = 'name';
        nameSpan.textContent = p.nickname;
        nameSpan.dataset.nickname = p.nickname || '';

        item.appendChild(iconSpan);
        item.appendChild(nameSpan);
        rouletteList.appendChild(item);
    });

    // Inicializar posición en la copia central
    const wrapper = document.querySelector('.roulette-wrapper');
    const centerOffset = Math.round(wrapper.clientHeight / 2 - itemHeight / 2);
    const startIndex = Math.floor((extended.length / 2));
    const startPosition = centerOffset - startIndex * itemHeight;
    rouletteList.style.transform = `translateY(${startPosition}px)`;
    // Guardar estado
    rouletteList.dataset.startPosition = startPosition;
    rouletteList.dataset.itemHeight = itemHeight;
    rouletteList.dataset.extendedLength = extended.length;
}

function buildSequentialWinners() {
    sequentialWinners = [];
    // Buscar ville2000x primero
    let ville = participants.find(p => p.nickname && p.nickname.toLowerCase() === 'ville2000x');
    if (ville) sequentialWinners.push(ville);

    // Luego los demás con ganador=true, pero no ville2000x
    for (let i = 0; i < participants.length; i++) {
        if (participants[i].ganador === true && (!participants[i].nickname || participants[i].nickname.toLowerCase() !== 'ville2000x')) {
            sequentialWinners.push(participants[i]);
        }
    }

    console.log('[buildSequentialWinners] found', sequentialWinners.length, 'sequential winners:', sequentialWinners.map(p => p.nickname).join(', '));
}

function getExpandedParticipants() {
    // Expandir participantes según tipo: super fan 20x, suscriptor 10x, seguidor 1x
    const expanded = [];
    let superFanCount = 0, suscriptorCount = 0, followerCount = 0;
    
    for (let i = 0; i < participants.length; i++) {
        const p = participants[i];
        const tipo = (p.tipo || 'seguidor').toLowerCase();
        const count = tipo === 'super fan' ? 20 : (tipo === 'suscriptor' ? 10 : 1);
        for (let c = 0; c < count; c++) {
            expanded.push(p);
        }
        
        if (tipo === 'super fan') superFanCount++;
        else if (tipo === 'suscriptor') suscriptorCount++;
        else followerCount++;
    }
    
    const superFanSlots = superFanCount * 20;
    const suscriptorSlots = suscriptorCount * 10;
    const followerSlots = followerCount * 1;
    
    console.log('[getExpandedParticipants] expandidos de', participants.length, 'a', expanded.length, 'items | super fans:', superFanCount, '(', superFanSlots, 'slots), suscriptores:', suscriptorCount, '(', suscriptorSlots, 'slots), seguidores:', followerCount, '(', followerSlots, 'slots)');
    return expanded;
}

function spin() {
    if (isSpinning || participants.length === 0) return;

    isSpinning = true;
    document.getElementById('spinBtn').disabled = true;

    spinCount++;

    // Determinar targetIndex: usar ganadores secuenciales primero, luego aleatorio
    let targetIndex = -1;

    if (spinCount <= sequentialWinners.length && sequentialWinners.length > 0) {
        // Usar el ganador secuencial del índice spinCount - 1
        const nextWinner = sequentialWinners[spinCount - 1];
        targetIndex = participants.findIndex(p => p.nickname === nextWinner.nickname);
        console.log('[spin] spinCount=', spinCount, 'usando secuencial winner=', nextWinner.nickname, 'targetIndex=', targetIndex);
    } else {
        // Aleatorio para giros posteriores
        targetIndex = Math.floor(Math.random() * participants.length);
        console.log('[spin] spinCount=', spinCount, 'usando aleatorio targetIndex=', targetIndex, 'targetNickname=', participants[targetIndex] ? participants[targetIndex].nickname : null);
    }

    if (targetIndex === -1) {
        targetIndex = Math.floor(Math.random() * participants.length);
        console.warn('[spin] targetIndex no encontrado, usando aleatorio:', targetIndex);
    }

    console.log('[spin] spinCount=', spinCount, 'targetIndex=', targetIndex, 'targetNickname=', participants[targetIndex] ? participants[targetIndex].nickname : null);

    // Preparar lista con repeticiones suficientes según spins
    const minSpins = 3;
    const extraSpins = Math.floor(Math.random() * 4); // 0..3
    const spins = minSpins + extraSpins; // 3..6
    const repeatCount = spins + 4; // asegurar espacio

    const rouletteList = document.getElementById('rouletteList');
    // reconstruir extended con repeatCount usando participantes expandidos
    rouletteList.innerHTML = '';
    const baseParticipants = getExpandedParticipants();
    const extended = [];
    for (let r = 0; r < repeatCount; r++) {
        for (let i = 0; i < baseParticipants.length; i++) {
            extended.push(baseParticipants[i]);
        }
    }
    extended.forEach((p) => {
        const item = document.createElement('div');
        item.className = 'roulette-item';
        item.dataset.nickname = p.nickname || '';
        const iconSpan = document.createElement('span');
        iconSpan.className = 'icon';
        iconSpan.textContent = getIconByTipo(p.tipo);
        iconSpan.style.color = getColorByTipo(p.tipo);

        const nameSpan = document.createElement('span');
        nameSpan.className = 'name';
        nameSpan.textContent = p.nickname;
        nameSpan.dataset.nickname = p.nickname || '';

        item.appendChild(iconSpan);
        item.appendChild(nameSpan);
        rouletteList.appendChild(item);
    });

    const itemHeight = parseInt(rouletteList.dataset.itemHeight || 60, 10);
    const wrapper = document.querySelector('.roulette-wrapper');
    const centerOffset = Math.round(wrapper.clientHeight / 2 - itemHeight / 2);

    // Calcular el tamaño de la lista expandida (para ciclos correctos)
    let expandedSize = 0;
    for (let i = 0; i < participants.length; i++) {
        const tipo = (participants[i].tipo || 'seguidor').toLowerCase();
        const count = tipo === 'super fan' ? 20 : (tipo === 'suscriptor' ? 10 : 1);
        expandedSize += count;
    }

    // Buscar la primer ocurrencia del targetIndex en baseParticipants (puede haber múltiples)
    let expandedTargetIndex = -1;
    let countSoFar = 0;
    for (let i = 0; i < participants.length; i++) {
        if (i === targetIndex) {
            expandedTargetIndex = countSoFar; // Primera copia del ganador
            break;
        }
        const tipo = (participants[i].tipo || 'seguidor').toLowerCase();
        const count = tipo === 'super fan' ? 20 : (tipo === 'suscriptor' ? 10 : 1);
        countSoFar += count;
    }

    if (expandedTargetIndex === -1) {
        expandedTargetIndex = targetIndex; // Fallback
    }

    const startIndex = Math.floor((repeatCount / 2)) * expandedSize;
    const finalIndex = startIndex + spins * expandedSize + expandedTargetIndex;

    const startPosition = centerOffset - startIndex * itemHeight;
    const finalPosition = centerOffset - finalIndex * itemHeight;

    // Animar desde startPosition a finalPosition (duración ampliada)
    animateRoulette(startPosition, finalPosition, 7000);
}

function animateRoulette(startPos, endPos, duration) {
    const rouletteList = document.getElementById('rouletteList');
    const startTime = Date.now();

    // Hint to browser to promote to its own layer for smoother transforms
    rouletteList.style.willChange = 'transform';
    const itemHeight = parseInt(rouletteList.dataset.itemHeight || 60, 10);
    const wrapper = document.querySelector('.roulette-wrapper');
    const centerOffset = Math.round(wrapper.clientHeight / 2 - itemHeight / 2);

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        const currentPos = startPos + (endPos - startPos) * easeProgress;

        // Restaurar nombres cercanos al centro si por alguna razón desaparecieron
        try {
            const rawIndexCurrent = Math.round((centerOffset - currentPos) / itemHeight);
            const checkRadius = 6;
            for (let k = rawIndexCurrent - checkRadius; k <= rawIndexCurrent + checkRadius; k++) {
                if (k >= 0 && k < rouletteList.children.length) {
                    const child = rouletteList.children[k];
                    const nameEl = child.querySelector('.name');
                    const nick = child.dataset.nickname || (nameEl && nameEl.dataset ? nameEl.dataset.nickname : '') || '';
                    if (nameEl && (!nameEl.textContent || nameEl.textContent.trim() === '')) {
                        nameEl.textContent = nick;
                        console.warn('[animateRoulette] restored empty name at domIndex=', k, 'to', nick);
                    }
                }
            }
        } catch (e) {
            console.warn('restore names error', e);
        }

        // Evitar translate enormes moviendo bloques completos cuando pasamos un ciclo
        try {
            // Calcular expandedSize basado en tipos de participantes
            let expandedSize = 0;
            for (let i = 0; i < participants.length; i++) {
                const tipo = (participants[i].tipo || 'seguidor').toLowerCase();
                const count = tipo === 'super fan' ? 20 : (tipo === 'suscriptor' ? 10 : 1);
                expandedSize += count;
            }

            const cycleHeight = expandedSize * itemHeight;
            // Mientras currentPos esté más allá de un ciclo completo por encima del centro,
            // mover un bloque de expandedSize elementos del principio al final
            let adjCurrent = currentPos;
            let shifts = 0;
            while (adjCurrent < centerOffset - cycleHeight && rouletteList.children.length >= expandedSize) {
                // Mover primero expandedSize elementos al final
                for (let m = 0; m < expandedSize; m++) {
                    const first = rouletteList.firstElementChild;
                    if (!first) break;
                    rouletteList.appendChild(first);
                }
                // Ajustar posiciones para mantener continuidad visual
                adjCurrent += cycleHeight;
                startPos += cycleHeight;
                endPos += cycleHeight;
                shifts++;
            }
            if (shifts > 0) console.log('[animateRoulette] shifted DOM blocks=', shifts, 'to keep translate small');

            rouletteList.style.transform = `translate3d(0, ${adjCurrent}px, 0)`;
        } catch (e) {
            // Fallback si algo falla
            rouletteList.style.transform = `translate3d(0, ${currentPos}px, 0)`;
        }

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Asegurar la posición final con translate3d
            rouletteList.style.transform = `translate3d(0, ${endPos}px, 0)`;

            // calcular ganador
            const itemHeight = parseInt(rouletteList.dataset.itemHeight || 60, 10);
            const wrapper = document.querySelector('.roulette-wrapper');
            const centerOffset = Math.round(wrapper.clientHeight / 2 - itemHeight / 2);

            // Calcular expandedSize para mapear índice de vuelta a participants original
            let expandedSize = 0;
            let expandedToOriginal = []; // mapeo: expandedIndex -> originalIndex
            for (let i = 0; i < participants.length; i++) {
                const tipo = (participants[i].tipo || 'seguidor').toLowerCase();
                const count = tipo === 'super fan' ? 20 : (tipo === 'suscriptor' ? 10 : 1);
                for (let c = 0; c < count; c++) {
                    expandedToOriginal.push(i); // múltiples índices expandidos apuntan al mismo original
                }
                expandedSize += count;
            }

            // derivar índice desde la posición final usando expandedSize
            const rawIndex = Math.round((centerOffset - endPos) / itemHeight);
            const expandedIndex = ((rawIndex % expandedSize) + expandedSize) % expandedSize;
            const winningIndex = expandedToOriginal[expandedIndex] || 0;
            const winner = participants[winningIndex];

            console.log('[animateRoulette] rawIndex=', rawIndex, 'expandedIndex=', expandedIndex, 'winningIndex=', winningIndex, 'winner=', winner ? winner.nickname : null);

            isSpinning = false;

            // Forzar repintado para evitar artefactos de render
            void rouletteList.offsetWidth;
            rouletteList.style.willChange = '';

            showWinner(winner);
        }
    }

    animate();
}

function showWinner(winner) {
    const winnerNickname = winner.nickname || winner.nombre || 'Usuario';
    const tipo = winner.tipo || 'seguidor';
    const tipoTexto = {
        'seguidor': '👤 Seguidor',
        'suscriptor': '⭐ Suscriptor',
        'super fan': '💎 Super Fan'
    }[tipo] || 'Participante';
    
    document.getElementById('winnerName').textContent = winnerNickname;
    document.getElementById('winnerType').textContent = tipoTexto;

    const resultContainer = document.getElementById('resultContainer');
    resultContainer.classList.add('show');

    // Efecto de confeti (simple)
    createConfetti();
}

function closeResult() {
    document.getElementById('resultContainer').classList.remove('show');
    document.getElementById('spinBtn').disabled = false;
}

function resetWheel() {
    if (isSpinning) return;
    currentRotation = 0;
    spinCount = 0;
    primerGiroRealizado = false;
    drawRoulette();
    document.getElementById('resultContainer').classList.remove('show');
    document.getElementById('spinBtn').disabled = false;
}

async function reloadDataTxt() {
    console.log('[reloadDataTxt] intentando cargar data.txt...');
    try {
        const resp = await fetch('data.txt?' + Date.now());
        if (resp.ok) {
            const text = await resp.text();
            const parsed = parseTxtContent(text);
            if (parsed.length > 0) {
                participants = parsed;
                spinCount = 0;
                primerGiroRealizado = false;
                buildSequentialWinners();
                drawRoulette();
                isSpinning = false;
                const spinBtn = document.getElementById('spinBtn');
                if (spinBtn) spinBtn.disabled = false;
                
                // Contar tipos
                let sf = 0, sus = 0, seg = 0;
                for (let p of participants) {
                    if (p.tipo.toLowerCase() === 'super fan') sf++;
                    else if (p.tipo.toLowerCase() === 'suscriptor') sus++;
                    else seg++;
                }
                
                alert(`✨ ¡Datos recargados exitosamente!\n\n${participants.length} participantes cargados:\n• ${sf} Super Fans\n• ${sus} Suscriptores\n• ${seg} Seguidores`);
            } else {
                alert('❌ No se encontraron participantes en data.txt');
            }
        } else {
            alert(`❌ Error al cargar data.txt (HTTP ${resp.status}).\n\nAsegúrate de servir con HTTP:\n\`python -m http.server 8000\`\n\nLuego abre: http://localhost:8000/`);
        }
    } catch (err) {
        alert(`❌ No se pudo cargar data.txt:\n${err.message}\n\nAsegúrate de servir con HTTP:\n\`python -m http.server 8000\`\n\nLuego abre: http://localhost:8000/`);
    }
}

function createConfetti() {
    const confetti = [];
    const colors_confetti = ['#ff1493', '#ff69b4', '#ffb6d9', '#8b008b', '#4a0080'];

    for (let i = 0; i < 60; i++) {
        confetti.push({
            x: Math.random() * window.innerWidth,
            y: -10,
            size: Math.random() * 8 + 4,
            color: colors_confetti[Math.floor(Math.random() * colors_confetti.length)],
            velocityY: Math.random() * 3 + 2,
            velocityX: (Math.random() - 0.5) * 4,
            opacity: 1,
        });
    }

    const confettiCanvas = document.createElement('canvas');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    confettiCanvas.style.position = 'fixed';
    confettiCanvas.style.top = '0';
    confettiCanvas.style.left = '0';
    confettiCanvas.style.pointerEvents = 'none';
    confettiCanvas.style.zIndex = '999';
    document.body.appendChild(confettiCanvas);

    const confettiCtx = confettiCanvas.getContext('2d');

    function animateConfetti() {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

        let anyActive = false;
        confetti.forEach((particle) => {
            if (particle.opacity > 0) {
                anyActive = true;
                particle.x += particle.velocityX;
                particle.y += particle.velocityY;
                particle.opacity -= 0.01;

                confettiCtx.globalAlpha = particle.opacity;
                confettiCtx.fillStyle = particle.color;
                confettiCtx.beginPath();
                confettiCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                confettiCtx.fill();
            }
        });

        confettiCtx.globalAlpha = 1;

        if (anyActive) {
            requestAnimationFrame(animateConfetti);
        } else {
            document.body.removeChild(confettiCanvas);
        }
    }

    animateConfetti();
}
