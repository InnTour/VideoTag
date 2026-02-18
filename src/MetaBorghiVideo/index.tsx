import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { SCENES, COLORS } from "./constants";
import { Scene01Opening } from "./Scene01Opening";
import { Scene02ExecutiveSummary } from "./Scene02ExecutiveSummary";
import { Scene03StrategicContext } from "./Scene03StrategicContext";
import { Scene04Solution } from "./Scene04Solution";
import { Scene05CompetitiveAdvantage } from "./Scene05CompetitiveAdvantage";
import { Scene06PillarsOfInnovation } from "./Scene06PillarsOfInnovation";
import { Scene07TokenEconomy } from "./Scene07TokenEconomy";
import { Scene08DAOFund } from "./Scene08DAOFund";
import { Scene09GovernanceTransition } from "./Scene09GovernanceTransition";
import { Scene10Incentives } from "./Scene10Incentives";
import { Scene11BusinessModels } from "./Scene11BusinessModels";
import { Scene12PNRRAlignment } from "./Scene12PNRRAlignment";
import { Scene13ImpactObjectives } from "./Scene13ImpactObjectives";
import { Scene14Roadmap } from "./Scene14Roadmap";
import { Scene15ROI } from "./Scene15ROI";
import { Scene16Closing } from "./Scene16Closing";

export const MetaBorghiVideo: React.FC = () => {
	const { fps } = useVideoConfig();

	const scenes = [
		{ key: "opening", timing: SCENES.OPENING, Component: Scene01Opening },
		{ key: "executiveSummary", timing: SCENES.EXECUTIVE_SUMMARY, Component: Scene02ExecutiveSummary },
		{ key: "strategicContext", timing: SCENES.STRATEGIC_CONTEXT, Component: Scene03StrategicContext },
		{ key: "solution", timing: SCENES.SOLUTION, Component: Scene04Solution },
		{ key: "competitiveAdvantage", timing: SCENES.COMPETITIVE_ADVANTAGE, Component: Scene05CompetitiveAdvantage },
		{ key: "pillarsInnovation", timing: SCENES.PILLARS_INNOVATION, Component: Scene06PillarsOfInnovation },
		{ key: "tokenEconomy", timing: SCENES.TOKEN_ECONOMY, Component: Scene07TokenEconomy },
		{ key: "daoFund", timing: SCENES.DAO_FUND, Component: Scene08DAOFund },
		{ key: "governanceTransition", timing: SCENES.GOVERNANCE_TRANSITION, Component: Scene09GovernanceTransition },
		{ key: "incentives", timing: SCENES.INCENTIVES, Component: Scene10Incentives },
		{ key: "businessModels", timing: SCENES.BUSINESS_MODELS, Component: Scene11BusinessModels },
		{ key: "pnrrAlignment", timing: SCENES.PNRR_ALIGNMENT, Component: Scene12PNRRAlignment },
		{ key: "impactObjectives", timing: SCENES.IMPACT_OBJECTIVES, Component: Scene13ImpactObjectives },
		{ key: "roadmap", timing: SCENES.ROADMAP, Component: Scene14Roadmap },
		{ key: "roi", timing: SCENES.ROI, Component: Scene15ROI },
		{ key: "closing", timing: SCENES.CLOSING, Component: Scene16Closing },
	];

	return (
		<AbsoluteFill style={{ backgroundColor: COLORS.bgDark }}>
			{scenes.map(({ key, timing, Component }) => (
				<Sequence
					key={key}
					from={Math.round(timing.start * fps)}
					durationInFrames={Math.round(timing.duration * fps)}
					premountFor={Math.round(0.5 * fps)}
				>
					<Component />
				</Sequence>
			))}
		</AbsoluteFill>
	);
};
