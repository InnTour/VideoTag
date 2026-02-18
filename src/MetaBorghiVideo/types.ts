export interface SceneTiming {
	start: number;
	duration: number;
}

export interface StatItem {
	value: number;
	suffix?: string;
	prefix?: string;
	label: string;
}

export interface PillarItem {
	title: string;
	subtitle: string;
	icon: string;
	color: string;
}

export interface ComparisonItem {
	feature: string;
	metaborghi: string;
	traditional: string;
	advantage: boolean;
}

export interface FundSource {
	label: string;
	amount: number;
	color: string;
}

export interface GovernanceStake {
	stakeholder: string;
	yearOne: number;
	yearFive: number;
	color: string;
}

export interface RoadmapPhase {
	title: string;
	period: string;
	items: string[];
	color: string;
}

export interface IncentiveItem {
	title: string;
	value: string;
	description: string;
	color: string;
}

export interface BusinessModelItem {
	segment: string;
	label: string;
	features: string[];
	revenue: string;
	revenueLabel: string;
	color: string;
}

export interface PNRRMission {
	code: string;
	title: string;
	description: string;
	color: string;
}

export interface ImpactDimension {
	title: string;
	points: string[];
	color: string;
}
