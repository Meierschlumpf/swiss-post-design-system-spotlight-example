export type SpotlightAction = {
	id?: string;
	title: string;
	description?: string;
	path: string;
};

export type SpotlightTriggerHandler = (action: SpotlightAction) => void;
