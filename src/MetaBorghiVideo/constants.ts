import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";
import type {
	SceneTiming,
	StatItem,
	PillarItem,
	ComparisonItem,
	FundSource,
	GovernanceStake,
	RoadmapPhase,
	IncentiveItem,
	BusinessModelItem,
	PNRRMission,
	ImpactDimension,
} from "./types";

// --- Fonts ---
export const { fontFamily: montserratFont } = loadMontserrat("normal", {
	weights: ["400", "600", "700", "800"],
	subsets: ["latin", "latin-ext"],
});
export const { fontFamily: interFont } = loadInter("normal", {
	weights: ["300", "400", "500", "600"],
	subsets: ["latin", "latin-ext"],
});
export const { fontFamily: poppinsFont } = loadPoppins("normal", {
	weights: ["300", "400", "600", "700"],
	subsets: ["latin", "latin-ext"],
});

// --- Colors ---
export const COLORS = {
	bgDark: "#0a0e1a",
	bgDarkAlt: "#101828",
	bgCard: "#1a2236",
	bgCardHover: "#1f2b42",

	techBlue: "#00a8ff",
	techBlueBright: "#4dc9ff",
	techBlueDark: "#0066aa",
	techBlueGlow: "#00a8ff44",

	natureGreen: "#22c55e",
	natureGreenBright: "#4ade80",
	natureGreenDark: "#15803d",

	heritageGold: "#f59e0b",
	heritageAmber: "#d97706",
	heritageTerra: "#c0503a",

	textWhite: "#f8fafc",
	textGray: "#94a3b8",
	textMuted: "#64748b",

	success: "#22c55e",
	warning: "#f59e0b",
	danger: "#ef4444",
	accent: "#8b5cf6",
} as const;

// --- Scene Timings (seconds) ---
export const SCENES: Record<string, SceneTiming> = {
	OPENING: { start: 0, duration: 7 },
	EXECUTIVE_SUMMARY: { start: 6.5, duration: 8 },
	STRATEGIC_CONTEXT: { start: 14, duration: 7.5 },
	SOLUTION: { start: 21, duration: 7 },
	COMPETITIVE_ADVANTAGE: { start: 27.5, duration: 7.5 },
	PILLARS_INNOVATION: { start: 34.5, duration: 8 },
	TOKEN_ECONOMY: { start: 42, duration: 7 },
	DAO_FUND: { start: 48.5, duration: 7 },
	GOVERNANCE_TRANSITION: { start: 55, duration: 7 },
	INCENTIVES: { start: 61.5, duration: 6.5 },
	BUSINESS_MODELS: { start: 67.5, duration: 6.5 },
	PNRR_ALIGNMENT: { start: 73.5, duration: 6 },
	IMPACT_OBJECTIVES: { start: 79, duration: 6.5 },
	ROADMAP: { start: 85, duration: 7 },
	ROI: { start: 91.5, duration: 7 },
	CLOSING: { start: 98, duration: 7 },
};

// --- Spring Configs ---
export const SPRING_CONFIGS = {
	smooth: { damping: 200 },
	gentle: { damping: 100, stiffness: 80 },
	bouncy: { damping: 12, stiffness: 100 },
	snappy: { damping: 20, stiffness: 200 },
} as const;

// --- Data ---
export const KEY_STATS: StatItem[] = [
	{ value: 25, label: "BORGHI (PROPOSTA)" },
	{ value: 300, suffix: "+", label: "IMPRESE TARGET" },
	{ value: 400, suffix: "+", label: "VIRTUAL TOUR TARGET" },
	{ value: 180, suffix: "%", prefix: "+", label: "TARGET PRESENZE" },
];

export const FOUR_PILLARS: PillarItem[] = [
	{
		title: "Infrastruttura Integrata",
		subtitle: "Discovery Immersiva, Booking Completo, Marketplace",
		icon: "infrastructure",
		color: COLORS.techBlue,
	},
	{
		title: "Digital Twin 3D",
		subtitle: "Gemello Digitale Vivo dei Borghi",
		icon: "digitalTwin",
		color: COLORS.natureGreen,
	},
	{
		title: "Modello B2C / B2B / B2G",
		subtitle: "Valore per tutti gli attori dell'ecosistema",
		icon: "model",
		color: COLORS.heritageGold,
	},
	{
		title: "Governance & DAO",
		subtitle: "Gestione partecipativa tramite Blockchain",
		icon: "governance",
		color: COLORS.accent,
	},
];

export const COMPARISON_DATA: ComparisonItem[] = [
	{
		feature: "Commissioni Strutture",
		metaborghi: "5% - 10%",
		traditional: "15% - 30%",
		advantage: true,
	},
	{
		feature: "Booking Completo",
		metaborghi: "Alloggio + Trasporti + Exp",
		traditional: "Solo Alloggio",
		advantage: true,
	},
	{
		feature: "Digital Twin 3D",
		metaborghi: "Visita Immersiva",
		traditional: "Assente",
		advantage: true,
	},
	{
		feature: "Marketplace Prodotti",
		metaborghi: "800+ Prodotti Locali",
		traditional: "Assente",
		advantage: true,
	},
	{
		feature: "Proprietà Dati",
		metaborghi: "dell'Impresa Locale",
		traditional: "della Piattaforma",
		advantage: true,
	},
	{
		feature: "Governance (DAO)",
		metaborghi: "Partecipativa",
		traditional: "Centralizzata",
		advantage: true,
	},
];

export const SIX_PILLARS = {
	techAccessibility: {
		label: "Tecnologia e Accessibilità",
		color: COLORS.techBlue,
		pillars: [
			{
				title: "Digital Twin Immersivo",
				features: [
					"Scansioni Laser & Fotogrammetria",
					"Realtà Aumentata (AR)",
					"AI & Archivi IoT",
				],
			},
			{
				title: "Booking Viaggio Completo",
				features: [
					"GDS Aerei Integrato (120+ compagnie)",
					"Trasporti Intermodali",
					"Commissioni Trasparenti 2-3%",
				],
			},
		],
	},
	qualityAuthenticity: {
		label: "Qualità e Autenticità",
		color: COLORS.natureGreen,
		pillars: [
			{
				title: "Ospitalità Verificata",
				features: [
					"Strutture Certificate",
					"Commissioni Ridotte 5-10%",
					"Valore trattenuto sul territorio",
				],
			},
			{
				title: "Esperienze Autentiche",
				features: [
					"Esperienze Uniche in piccoli gruppi",
					"Guide Locali & Workshop",
					"Rating Certificato",
				],
			},
		],
	},
	economyGovernance: {
		label: "Economia e Governance",
		color: COLORS.heritageGold,
		pillars: [
			{
				title: "Marketplace Integrato",
				features: [
					"Prodotti Artigianali e Locali",
					"Tracciabilità Completa",
					"Canale Attivo 365gg",
				],
			},
			{
				title: "DAO Territoriale",
				features: [
					"Token $BORGO",
					"Smart Contract",
					"70% Valore al Territorio",
				],
			},
		],
	},
};

export const DAO_FUND_SOURCES: FundSource[] = [
	{ label: "Token Economy", amount: 90000, color: COLORS.heritageGold },
	{ label: "Commissioni", amount: 37500, color: COLORS.techBlue },
	{ label: "Contributo PA", amount: 15000, color: COLORS.natureGreen },
	{ label: "Imprese Aderenti", amount: 6000, color: COLORS.accent },
	{ label: "Contributo Territorio", amount: 5000, color: COLORS.heritageTerra },
];

export const GOVERNANCE_STAKES: GovernanceStake[] = [
	{ stakeholder: "InnTour S.r.l.", yearOne: 50, yearFive: 10, color: COLORS.techBlue },
	{ stakeholder: "Ente Pubblico", yearOne: 20, yearFive: 25, color: COLORS.natureGreen },
	{ stakeholder: "Imprese Locali", yearOne: 15, yearFive: 25, color: COLORS.heritageGold },
	{ stakeholder: "Associazioni", yearOne: 10, yearFive: 20, color: COLORS.accent },
	{ stakeholder: "Cittadini", yearOne: 5, yearFive: 20, color: COLORS.heritageTerra },
];

export const INCENTIVES_DATA: IncentiveItem[] = [
	{ title: "Bonus Acquisto", value: "+5% - 12%", description: "Valore extra su bundle $BORGO", color: COLORS.natureGreen },
	{ title: "Cashback Attivo", value: "3% - 7%", description: "Ritorno su ogni transazione", color: COLORS.techBlue },
	{ title: "Loyalty 4 Livelli", value: "Bronzo → Platino", description: "Premia la spesa ricorrente", color: COLORS.heritageGold },
	{ title: "Incentivi B2B", value: "50 / 30 / 200", description: "$BORGO per attivazione e referral", color: COLORS.techBlueBright },
	{ title: "Partecipazione Attiva", value: "5 - 100 $BORGO", description: "Ricompense per voto e contributi", color: COLORS.accent },
	{ title: "Moltiplicatore B2B", value: "3x - 5x", description: "Effetto volano economico", color: COLORS.natureGreenBright },
];

export const BUSINESS_MODELS: BusinessModelItem[] = [
	{
		segment: "B2C",
		label: "Viaggiatori",
		features: ["Accesso Gratuito", "Prenotazione Unica", "App Mobile"],
		revenue: "Pay-per-Booking",
		revenueLabel: "MODELLO DI REVENUE",
		color: COLORS.techBlue,
	},
	{
		segment: "B2B",
		label: "Imprese Locali",
		features: ["Visibilità Globale", "CRM & Analytics", "Digitalizzazione"],
		revenue: "Commissione 5-10%",
		revenueLabel: "MODELLO DI REVENUE",
		color: COLORS.natureGreen,
	},
	{
		segment: "B2G",
		label: "Pubblica Amm.",
		features: ["Digital Twin 3D", "Governance DAO", "Supporto PNRR"],
		revenue: "ROI Garantito ≤18 mesi",
		revenueLabel: "IMPATTO ECONOMICO",
		color: COLORS.heritageGold,
	},
];

export const PNRR_MISSIONS: PNRRMission[] = [
	{
		code: "M1C3",
		title: "Cultura 4.0",
		description: "Digitalizzazione del Patrimonio Culturale",
		color: COLORS.heritageGold,
	},
	{
		code: "M1C3",
		title: "Turismo 4.0",
		description: "Sostegno al Turismo Sostenibile",
		color: COLORS.techBlue,
	},
	{
		code: "M5C3",
		title: "Coesione Territoriale",
		description: "Contrasto allo Spopolamento",
		color: COLORS.natureGreen,
	},
	{
		code: "M1C2",
		title: "Digitalizzazione Imprese",
		description: "Transizione Digitale delle Imprese",
		color: COLORS.accent,
	},
];

export const IMPACT_DIMENSIONS: ImpactDimension[] = [
	{
		title: "Impatto Culturale",
		points: [
			"Preservazione della Memoria",
			"Fruizione Globale",
			"Nuove Narrazioni",
		],
		color: COLORS.heritageGold,
	},
	{
		title: "Impatto Sociale",
		points: [
			"Rafforzamento Comunità",
			"Contrasto allo Spopolamento",
			"Opportunità Giovani",
		],
		color: COLORS.natureGreen,
	},
	{
		title: "Impatto Economico",
		points: [
			"Turismo Sostenibile",
			"Filiere Produttive",
			"Attrazione Talenti",
		],
		color: COLORS.techBlue,
	},
	{
		title: "Impatto Territoriale",
		points: [
			"Reti Collaborative",
			"Valorizzazione Integrata",
			"Servizi Digitali",
		],
		color: COLORS.accent,
	},
];

export const ROADMAP_PHASES: RoadmapPhase[] = [
	{
		title: "Mappatura e Digital Twin",
		period: "MESI 1-2",
		items: [
			"Analisi preliminare del patrimonio",
			"Rilievi 3D con laser scanner e droni",
			"Creazione del gemello digitale",
		],
		color: COLORS.techBlue,
	},
	{
		title: "Coinvolgimento e Onboarding",
		period: "MESI 3-6",
		items: [
			"Workshop formativi per imprese",
			"Attivazione DAO e wallet digitali",
			"Popolamento piattaforma",
		],
		color: COLORS.natureGreen,
	},
	{
		title: "Lancio e Monitoraggio",
		period: "MESE 6+",
		items: [
			"Messa online dell'ecosistema",
			"Campagna marketing nazionale",
			"Tracking KPI e ottimizzazione",
		],
		color: COLORS.heritageGold,
	},
];

// --- Utility ---
export const seededRandom = (seed: number): number => {
	const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
	return x - Math.floor(x);
};
