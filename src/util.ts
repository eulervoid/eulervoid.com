export type Point = {
	x: number;
	y: number;
};

export type Rect = {
	min: Point;
	max: Point;
};

export type BoundedPoint = {
	current: Point;
	bounds: Rect;
};

export const createRng = (seed: number): (() => number) => {
	let a = seed;
	return () => {
		let t = (a += 0x6d2b79f5);
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
};

export const randomInt = (
	min: number,
	max: number,
	rng: () => number = Math.random,
): number => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(rng() * (max - min + 1)) + min;
};

export const randomFloat = (
	min: number,
	max: number,
	rng: () => number = Math.random,
): number => {
	return rng() * (max - min) + min;
};

export const randomPoint = (
	minX: number,
	minY: number,
	maxX: number,
	maxY: number,
	rng: () => number = Math.random,
): Point => {
	return {
		x: randomFloat(minX, maxX, rng),
		y: randomFloat(minY, maxY, rng),
	};
};

export const biasedRandom = (
	rng: () => number,
	biasStrength: number = 2,
): number => {
	let sum = 0;
	for (let i = 0; i < biasStrength; i++) {
		sum += rng();
	}
	return sum / biasStrength;
};

export const createBiasedRng = (
	rng: () => number = Math.random,
	biasStrength: number = 2,
): (() => number) => {
	return () => biasedRandom(rng, biasStrength);
};

export const distance = (p1: Point, p2: Point): number => {
	const dx = p1.x - p2.x;
	const dy = p1.y - p2.y;
	return Math.sqrt(dx * dx + dy * dy);
};

export const clamp = (value: number, min: number = 0, max: number = 1) => {
	return Math.max(min, Math.min(max, value));
};

export const rng = createBiasedRng(Math.random, 1);

export const cornerBiasedRandom = (min: number, max: number, bias: number) => {
	return clamp(randomInt(min - bias, max + bias), min, max);
};

type PauseWeights = {
	start?: number;
	end?: number;
	intermediate?: number;
};

type RangeOptions = {
	totalPausePercentage?: number;
	pauseWeights?: PauseWeights;
};

// The return type now includes pauseMidpoints
type PausableRange = {
	inputRange: number[];
	outputRange: any[];
	pauseMidpoints: number[];
};

/**
 * Generates inputRange, outputRange, and pauseMidpoints arrays for useTransform.
 *
 * @param steps - An array of output values.
 * @param options - Configuration for total pause percentage and weights.
 * @returns An object containing the timeline arrays.
 */
export function createPausableRange(
	steps: any[],
	options: RangeOptions = {},
): PausableRange {
	const { totalPausePercentage = 0.5, pauseWeights = {} } = options;
	const {
		start: startWeight = 1,
		end: endWeight = 1,
		intermediate: intermediateWeight = 1,
	} = pauseWeights;

	const numSteps = steps.length;
	if (numSteps <= 1) {
		return {
			inputRange: [0, 1],
			outputRange: [steps[0] ?? 0, steps[0] ?? 0],
			pauseMidpoints: [],
		};
	}

	const numTransitions = numSteps - 1;
	const numIntermediatePauses = Math.max(0, numSteps - 2);

	const totalWeightUnits =
		startWeight + endWeight + numIntermediatePauses * intermediateWeight;

	if (totalWeightUnits === 0) {
		const inputRange = steps.map((_, i) => i / numTransitions);
		return { inputRange, outputRange: steps, pauseMidpoints: [] };
	}

	const clampedPausePercentage = Math.max(0, Math.min(1, totalPausePercentage));
	const unitDuration = clampedPausePercentage / totalWeightUnits;

	const startPauseDuration = startWeight * unitDuration;
	const intermediatePauseDuration = intermediateWeight * unitDuration;

	const totalTransitionTime = 1 - clampedPausePercentage;
	const transitionDuration = totalTransitionTime / numTransitions;

	const inputRange: number[] = [0];
	const outputRange: any[] = [steps[0]];

	const pauseMidpoints: number[] = [];
	let currentTime = 0;

	if (startPauseDuration > 0) {
		currentTime += startPauseDuration;
		inputRange.push(currentTime);
		outputRange.push(steps[0]);
	}

	for (let i = 1; i < numSteps; i++) {
		currentTime += transitionDuration;
		inputRange.push(currentTime);
		outputRange.push(steps[i]);

		if (i < numSteps - 1 && intermediatePauseDuration > 0) {
			const midpoint = currentTime + intermediatePauseDuration / 2;
			pauseMidpoints.push(midpoint);

			currentTime += intermediatePauseDuration;
			inputRange.push(currentTime);
			outputRange.push(steps[i]);
		}
	}

	if (currentTime < 1) {
		inputRange.push(1);
		outputRange.push(steps[numSteps - 1]);
	}

	return { inputRange, outputRange, pauseMidpoints };
}

export function dedent(
	strings: TemplateStringsArray,
	...values: unknown[]
): string {
	let fullString = strings.reduce(
		(acc, str, i) => acc + str + (values[i] ?? ""),
		"",
	);

	const lines = fullString.split("\n");
	const minIndent = lines.reduce((min, line) => {
		if (line.trim() === "") return min;
		const indent = line.match(/^\s*/)?.[0].length ?? 0;
		return Math.min(min, indent);
	}, Infinity);

	if (minIndent === Infinity) {
		return fullString;
	}

	return lines
		.map((line) => line.slice(minIndent))
		.join("\n")
		.trim();
}
