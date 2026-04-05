/// <reference path="./types.d.ts" />

"use strict";

/**
 * @param {number} character
 * @param {Definition} definition
 * @returns {number}
 */
function convertChar(character, definition) {
	const { map } = definition;
	if (character in TO_ASCII) {
		const ascii = TO_ASCII[character];
		if (ascii in map) {
			return map[ascii];
		} else {
			return ascii;
		}
	}
	return character;
}

/**
 * @param {string} str
 * @param {Definition} definition
 */
function convertStr(str, definition) {
	/** @type {number[]} */
	const codePoints = [];
	for (let i = 0; i < str.length;) {
		/** @type {number=} */
		const codePoint = str.codePointAt(i);
		if (codePoint === undefined) break;

		codePoints.push(convertChar(codePoint, definition));

		i += codePoint >= 0x010000 ? 2 : 1;
	}
	return String.fromCodePoint(...codePoints);
}

/** @type {{[codepoint: number]: boolean}} */
const SKIP = {};

[8, 9, 10, 11, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 58, 59, 60, 61, 62, 63, 64, 92, 94, 95, 96, 123, 124, 125, 126, 133, 160, 161, 166, 173, 176, 180, 183, 191, 894, 903, 1370, 1371, 1372, 1373, 1374, 1375, 1417, 1418, 1470, 1472, 1475, 1523, 1524, 1548, 1549, 1563, 1567, 1642, 1643, 1644, 1645, 1748, 1792, 1793, 1794, 1795, 1796, 1797, 1798, 1799, 1800, 1801, 1802, 1803, 1804, 1805, 2404, 2405, 2416, 3572, 3663, 3674, 3675, 3844, 3845, 3846, 3847, 3848, 3849, 3850, 3851, 3852, 3853, 3854, 3855, 3856, 3857, 3858, 3973, 4170, 4171, 4172, 4173, 4174, 4175, 4347, 4961, 4962, 4963, 4964, 4965, 4966, 4967, 4968, 5120, 5741, 5742, 5760, 5867, 5868, 5869, 5941, 5942, 6100, 6101, 6102, 6104, 6105, 6106, 6144, 6145, 6146, 6147, 6148, 6149, 6150, 6151, 6152, 6153, 6154, 6158, 6468, 6469, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8203, 8208, 8209, 8210, 8211, 8212, 8213, 8214, 8215, 8224, 8225, 8226, 8227, 8228, 8229, 8230, 8231, 8239, 8240, 8241, 8242, 8243, 8244, 8245, 8246, 8247, 8248, 8251, 8252, 8253, 8254, 8257, 8258, 8259, 8263, 8264, 8265, 8266, 8267, 8268, 8269, 8270, 8271, 8272, 8273, 8275, 8279, 8287, 8288, 9142, 11799, 11802, 11834, 11835, 11840, 12288, 12289, 12290, 12291, 12316, 12336, 12349, 12448, 65072, 65073, 65074, 65093, 65094, 65097, 65098, 65099, 65100, 65104, 65105, 65106, 65108, 65109, 65110, 65111, 65112, 65119, 65120, 65121, 65123, 65128, 65130, 65131, 65281, 65282, 65283, 65285, 65286, 65287, 65290, 65292, 65293, 65294, 65295, 65306, 65307, 65311, 65312, 65340, 65377, 65380].forEach(function (codePoint) {
	SKIP[codePoint] = true;
});

const ASCII = {
	key: 'ascii',
	name: 'Normal',
	space: 32,
	basicSet: 33,
	upperCase: 65,
	lowerCase: 97,
	greekLowerCase: 0x3B1,
	greekUpperCase: 0x391,
	digits: 48
};

/** @type {{[key: string]: Definition}} */
const definitionMap = {};

/** @type {Definition[]} */
const definitions = [];

// TODO: greek letters

/** @type {DefinitionInit[]} */
const definitionInits = [
	ASCII,
	{
		key: 'mathDoubleStruck',
		name: 'Mathematical Double-Struck',
		lowerCase: 120146,
		digits: 120792,
		map: {
			65: 0x1D538,
			66: 0x1D539,
			67: 0x2102,
			68: 0x1D53B,
			69: 0x1D53C,
			70: 0x1D53D,
			71: 0x1D53E,
			72: 0x210D,
			73: 0x1D540,
			74: 0x1D541,
			75: 0x1D542,
			76: 0x1D543,
			77: 0x1D544,
			78: 0x2115,
			79: 0x1D546,
			80: 0x2119,
			81: 0x211A,
			82: 0x211D,
			83: 0x1D54A,
			84: 0x1D54B,
			85: 0x1D54C,
			86: 0x1D54D,
			87: 0x1D54E,
			88: 0x1D54F,
			89: 0x1D550,
			90: 0x2124
		}
	},
	{
		key: 'mathBold',
		name: 'Mathematical Bold',
		upperCase: 119808,
		lowerCase: 119834,
		digits: 120782,
		map: {
			0x2207: 0x1D6C1, // Nabla
		}
	},
	{
		key: 'mathItalic',
		name: 'Mathematical Italic',
		upperCase: 0x1D434,
		lowerCase: 0x1D44E,
		map: {
			0x2207: 0x1D6fD, // Nabla
			0x68: 0x210E // h
		}
	},
	{
		key: 'mathBoldItalic',
		name: 'Mathematical Bold Italic',
		upperCase: 119912,
		lowerCase: 119938,
		digits: 120782,
		map: {
			0x2207: 0x1D735, // Nabla
		}
	},
	{
		key: 'mathFrakt',
		name: 'Mathematical Fraktur',
		upperCase: 120068,
		lowerCase: 120094,
		map: {
			0x43: 0x212D, // C
			0x48: 0x210C, // H
			0x49: 0x2111, // I
			0x52: 0x211C, // R
			0x5A: 0x2128, // Z
		}
	},
	{
		key: 'mathBoldFrakt',
		name: 'Mathematical Bold Fraktur',
		upperCase: 120172,
		lowerCase: 120198,
		digits: 120782
	},
	/* incomplete!
	{
		key: 'mathScript',
		name: 'Mathematical Script',
		upperCase: 119964,
		lowerCase: 119990
	},
	*/
	{
		key: 'mathBoldScript',
		name: 'Mathematical Bold Script',
		upperCase: 120016,
		lowerCase: 120042
	},
	{
		key: 'mathSans',
		name: 'Mathematical Sans-Serif',
		upperCase: 0x1D5A0,
		lowerCase: 0x1D5BA,
		digits: 0x1D7E2
	},
	{
		key: 'mathSansBold',
		name: 'Mathematical Sans-Serif Bold',
		upperCase: 0x1D5D4,
		lowerCase: 0x1D5EE,
		digits: 0x1D7EC,
		map: {
			0x2207: 0x1D76F, // Nabla
		}
	},
	{
		key: 'mathSansItalic',
		name: 'Mathematical Sans-Serif Italic',
		upperCase: 0x1D608,
		lowerCase: 0x1D622,
		digits: 0x1D7E2
	},
	{
		key: 'mathSansBoldItalic',
		name: 'Mathematical Sans-Serif Bold Italic',
		upperCase: 0x1D63C,
		lowerCase: 0x1D656,
		digits: 0x1D7EC,
		map: {
			0x2207: 0x1D7A9, // Nabla
		}
	},
	{
		key: 'mathMono',
		name: 'Mathematical Monospace',
		upperCase: 120432,
		lowerCase: 120458,
		digits: 120822
	},
	{
		key: 'fullwidth',
		name: 'Fullwidth',
		basicSet: 65281,
		space: 12288
	},
	{
		key: 'circled',
		name: 'Circled',
		upperCase: 9398,
		lowerCase: 9424,
		map: {
			48: 0x1F10B,
			49: 0x2780,
			50: 0x2781,
			51: 0x2782,
			52: 0x2783,
			53: 0x2784,
			54: 0x2785,
			55: 0x2786,
			56: 0x2787,
			57: 0x2788
		}
	},
	{
		key: 'negativeCircled',
		name: 'NEGATIVE CIRCLED (upper case-only)',
		upperCase: 0x1F150,
		map: {
			48: 0x1F10C,
			49: 0x278A,
			50: 0x278B,
			51: 0x278C,
			52: 0x278D,
			53: 0x278E,
			54: 0x278F,
			55: 0x2790,
			56: 0x2791,
			57: 0x2792
		}
	},
	{
		key: 'squared',
		name: 'SQUARED (upper case-only)',
		upperCase: 127280
	},
	{
		key: 'negativeSquared',
		name: 'NEGATIVE SQUARED (upper case-only)',
		upperCase: 127344
	},
	{
		key: 'parenthesized',
		name: 'Parenthesized',
		lowerCase: 9372,
		upperCase: 127248,
		map: {
			// no zero
			49: 9332,
			50: 9333,
			51: 9334,
			52: 9335,
			53: 9336,
			54: 9337,
			55: 9338,
			56: 9339,
			57: 9340,
		}
	}
];

/** @type {{[codepoint: number]: number}} */
const TO_ASCII = {};

// Process in reverse order so redundant usage of code points for numbers will
// be overwritten with the correct ones, which come before in this list.
for (let i = definitionInits.length - 1; i >= 0; -- i) {
	const init = definitionInits[i];
	const { lowerCase, upperCase, greekLowerCase, greekUpperCase, digits, basicSet, space } = init;

	/** @type {{[codepoint: number]: number}} */
	const map = {};

	/** @type {Definition} */
	const def = { ...init, map };

	definitionMap[def.key] = def;
	definitions.push(def);

	if (lowerCase !== undefined) {
		for (let offset = 0; offset < 26; ++ offset) {
			const asciiLower = ASCII.lowerCase + offset;
			const lower = lowerCase + offset;
			TO_ASCII[lower] = asciiLower;
			def.map[asciiLower] = lower;
		}
	}

	if (upperCase !== undefined) {
		for (let offset = 0; offset < 26; ++ offset) {
			const asciiUpper = ASCII.upperCase + offset;
			const upper = upperCase + offset;
			TO_ASCII[upper] = asciiUpper;
			def.map[asciiUpper] = upper;
		}
	}

	if (greekLowerCase !== undefined) {
		for (let offset = 0; offset < 25; ++ offset) {
			const asciiLower = ASCII.greekLowerCase + offset;
			const lower = greekLowerCase + offset;
			TO_ASCII[lower] = asciiLower;
			def.map[asciiLower] = lower;
		}
	}

	if (greekUpperCase !== undefined) {
		for (let offset = 0; offset < 25; ++ offset) {
			const asciiUpper = ASCII.greekUpperCase + offset;
			const upper = greekUpperCase + offset;
			TO_ASCII[upper] = asciiUpper;
			def.map[asciiUpper] = upper;
		}
	}

	if (digits !== undefined) {
		for (let offset = 0; offset < 10; ++ offset) {
			const ascii = ASCII.digits + offset;
			const digit = digits + offset;
			TO_ASCII[digit] = ascii;
			def.map[ascii] = digit;
		}
	}

	if (basicSet !== undefined) {
		for (let offset = 0; offset < 94; ++ offset) {
			const ascii = ASCII.basicSet + offset;
			const conv = basicSet + offset;
			TO_ASCII[conv] = ascii;
			def.map[ascii] = conv;
		}
	}

	const { map: initMap } = init;

	// map overwrites ranges
	if (initMap) {
		for (let asciiStr in initMap) {
			const ascii = +asciiStr;
			const value = initMap[ascii];
			TO_ASCII[value] = ascii;
			map[asciiStr] = value;
		}
	}

	if (space !== undefined) {
		TO_ASCII[space] = ASCII.space;
		def.map[ASCII.space] = space;
	}

	for (let asciiStr in def.map) {
		const ascii = +asciiStr;
		definitionMap[def.map[ascii]] = def;
	}
}
definitions.reverse();

function init() {
	const variantEl = document.getElementById('variant');
	const textEl = document.getElementById('text');
	const copyBtn = document.getElementById('copy-btn');
	const intentBtn = document.getElementById('intent-btn');
	const intentUrlInput = document.getElementById('intent-url');
	const zwSpcBtn = document.getElementById('zero-width-space-btn');

	if (!(variantEl instanceof HTMLSelectElement)) {
		console.error('variantEl is not a HTMLSelectElement!', variantEl);
		return;
	}

	if (!(textEl instanceof HTMLTextAreaElement)) {
		console.error('textEl is not a HTMLInputElement!', textEl);
		return;
	}

	if (!(copyBtn instanceof HTMLButtonElement)) {
		console.error('copyBtn is not a HTMLButtonElement!', copyBtn);
		return;
	}

	if (!(intentBtn instanceof HTMLButtonElement)) {
		console.error('intentBtn is not a HTMLButtonElement!', intentBtn);
		return;
	}

	if (!(intentUrlInput instanceof HTMLInputElement)) {
		console.error('intentUrlInput is not a HTMLInputElement!', intentUrlInput);
		return;
	}

	if (!(zwSpcBtn instanceof HTMLButtonElement)) {
		console.error('zwSpcBtn is not a HTMLButtonElement!', zwSpcBtn);
		return;
	}

	const growers = document.querySelectorAll(".grow-wrap");

	growers.forEach((grower) => {
		if (grower instanceof HTMLElement) {
			const textarea = grower.querySelector("textarea");
			textarea?.addEventListener("input", () => {
				grower.dataset.replicatedValue = textarea.value;
			});
		}
	});

	initElements(variantEl, textEl, copyBtn, intentBtn, intentUrlInput, zwSpcBtn);
}

/**
 * @param {HTMLSelectElement} variantEl 
 * @param {HTMLTextAreaElement} textEl
 * @param {HTMLButtonElement} copyBtn
 * @param {HTMLButtonElement} intentBtn
 * @param {HTMLInputElement} intentUrlInput
 * @param {HTMLButtonElement} zwSpcBtn
 */
function initElements(variantEl, textEl, copyBtn, intentBtn, intentUrlInput, zwSpcBtn) {
	for (let i = 0; i < definitions.length; ++ i) {
		const def = definitions[i];
		const optionEl = document.createElement('option');
		optionEl.value = def.key;
		const hotkey = i > 9 ? `Ctrl+Alt+${i - 10}` : `Ctrl+${i}`;
		optionEl.title = `${def.name} (variant: ${def.key}, ${hotkey})`;
		optionEl.appendChild(document.createTextNode(convertStr(def.name, def)));
		variantEl.appendChild(optionEl);
	}

	variantEl.title = definitionMap[variantEl.value].name;

	function updateVariant() {
		const selStart = textEl.selectionStart ?? 0;
		const selEnd = textEl.selectionEnd ?? 0;
		const definition = definitionMap[variantEl.value];
		const str = textEl.value;
		/*
		if (selStart === selEnd) {
			const converted = convertStr(str, definition);
			textEl.selectionStart = 0;
			textEl.selectionEnd = str.length;
			textEl.focus();
			document.execCommand('insertText', false, converted);
			textEl.selectionStart = textEl.selectionEnd = converted.length;
		}
		else {
		*/
			const selected = str.slice(selStart, selEnd);
			const converted = convertStr(selected, definition);
			textEl.value = str.slice(0, selStart) + converted + str.slice(selEnd);
			//textEl.focus();
			textEl.selectionStart = selStart;
			textEl.selectionEnd = selStart + converted.length;
		//}
		variantEl.title = definition.name;
		textEl.focus();
	}

	variantEl.addEventListener('change', updateVariant, false);

	/** @param {string} text */
	function insertText(text) {
		const selStart = textEl.selectionStart ?? 0;
		const selEnd = textEl.selectionEnd ?? 0;
		const str = textEl.value;
		textEl.value = str.slice(0, selStart) + text + str.slice(selEnd);
		textEl.selectionStart = textEl.selectionEnd = selStart + text.length;
	}

	zwSpcBtn.addEventListener('click', function (event) {
		insertText('\u200B');
	});

	textEl.addEventListener('keydown', function (event) {
		let character = 0;
		if (event.key.length === 1) {
			character = event.key.charCodeAt(0);
		}

		if (character && !event.altKey && !event.ctrlKey && !event.metaKey && !event.altGrKey) {
			const definition = definitionMap[variantEl.value];
			if (character in definition.map) {
				event.preventDefault();
				event.stopPropagation();
				const converted = String.fromCodePoint(definition.map[character]);
				insertText(converted);
			}
		}
	}, true);

	function performIntent() {
		let intentUrl = intentUrlInput.value.trim();
		if (!intentUrl) {
			alert('Please enter your Mastodon instance URL!');
			return;
		}
		if (intentUrl.startsWith('//')) {
			intentUrl = `https:${intentUrl}`;
		} else if (intentUrl.startsWith('/')) {
			intentUrl = `https:/${intentUrl}`;
		} else if (!/^[-_a-z0-9]+:/.test(intentUrl)) {
			intentUrl = `https://${intentUrl}`;
		}
		const url = new URL(intentUrl);
		url.searchParams.set('text', textEl.value);
		localStorage.setItem('intent-url', intentUrl);
		//open(url, '_blank');
		location.href = url.toString();
	}

	async function copyToClipboard() {
		await navigator.clipboard.writeText(textEl.value);
		const { copied, init } = copyBtn.dataset;
		if (copied) {
			copyBtn.innerText = copied;
			if (copyTimer !== null) {
				clearTimeout(copyTimer);
				copyTimer = null;
			}
			if (init) {
				copyTimer = setTimeout(() => {
					copyTimer = null;
					copyBtn.innerText = init;
				}, 2000);
			}
		}
	}

	textEl.addEventListener('keypress', function (event) {
		if (event.ctrlKey && event.key === 'Enter') {
			event.preventDefault();
			event.stopPropagation();
			performIntent();
		}
	}, true);

	window.addEventListener('keydown', function (event) {
		const { ctrlKey, key } = event;

		if (ctrlKey) {
			switch (key) {
				case 'ArrowDown':
				case 'ArrowUp':
					event.preventDefault();
					event.stopPropagation();
					break;
			}
		}
	}, true);

	window.addEventListener('keyup', function (event) {
		const { ctrlKey, altKey, key } = event;

		if (ctrlKey) {
			switch (key) {
				case 'ArrowDown':
				{
					event.preventDefault();
					event.stopPropagation();

					let index = 0;
					const current = variantEl.value;
					for (; index < definitions.length; ++ index) {
						if (definitions[index].key === current) {
							break;
						}
					}

					if (index >= definitions.length) {
						console.error(index, definitions.length)
						index = 0;
					} else {
						index = (index + 1) % definitions.length;
					}

					variantEl.value = definitions[index].key;
					updateVariant();
					return;
				}

				case 'ArrowUp':
				{
					event.preventDefault();
					event.stopPropagation();

					let index = 0;
					const current = variantEl.value;
					for (; index < definitions.length; ++ index) {
						if (definitions[index].key === current) {
							break;
						}
					}

					if (index >= definitions.length) {
						console.error(index, definitions.length)
						index = 0;
					} else {
						index = index === 0 ? definitions.length - 1 : index - 1;
					}

					variantEl.value = definitions[index].key;
					updateVariant();
					return;
				}
			}

			if (altKey) {
				switch (key) {
					case 'c':
						event.preventDefault();
						event.stopPropagation();

						copyToClipboard();
						return;

					case 'z':
						event.preventDefault();
						event.stopPropagation();

						insertText('\u200B');
						return;
				}
			}

			if (key.length === 1) {
				const codepoint = key.codePointAt(0) ?? 0;
				if (codepoint >= 0x30 && codepoint <= 0x39) {
					let index = codepoint - 0x30;

					if (altKey) {
						index += 10;
					}

					if (definitions.length > index) {
						const def = definitions[index];
						variantEl.value = def.key;
						updateVariant();
					}

					event.preventDefault();
					event.stopPropagation();
				}
			}
		}
	}, true);

	if (!intentUrlInput.value.trim()) {
		intentUrlInput.value = localStorage.getItem('intent-url') || 'https://mastodon.social/';
	}

	intentBtn.addEventListener('click', function (event) {
		performIntent();
	});

	/** @type {ReturnType<typeof setTimeout>?} */
	let copyTimer = null;
	copyBtn.addEventListener('click', async function (event) {
		event.preventDefault();
		await copyToClipboard();
	}, false);

	let oldSelectionStart = 0;
	let oldSelectionEnd = 0;

	function updateFromCursor() {
		const str = textEl.value;
		if (str.length > 0) {
			const selEnd = textEl.selectionEnd ?? 0;
			const selStart = textEl.selectionStart ?? 0;

			if (oldSelectionEnd === selEnd && oldSelectionStart === selStart) {
				return;
			}

			oldSelectionStart = selStart;
			oldSelectionEnd = selEnd;

			/** @type {number=} */
			let codePoint;
			let index = selEnd ?? 0;
			for (;;) {
				if (index === 0 || str.charCodeAt(index - 1) === 10) {
					codePoint = str.codePointAt(index);
					break;
				} else {
					const second = codePoint = str.charCodeAt(index - 1);
					if (second >= 0xDC00 && second <= 0xDFFF && index > 1) {
						const first = str.charCodeAt(index - 2);
						if (first >= 0xD800 && first <= 0xDBFF) {
							codePoint = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
							index -= 2;
						}
					} else {
						index -= 1;
					}

					if (SKIP[codePoint] !== true) {
						break;
					}
				}
			}
			if (codePoint !== undefined && codePoint in definitionMap) {
				const def = definitionMap[codePoint];
				variantEl.value = def.key;
				variantEl.title = def.name;
			}
		} else {
			oldSelectionStart = 0;
			oldSelectionEnd = 0;
		}
	}

	textEl.addEventListener('selectionchange', updateFromCursor, false);

	{
		const url = new URL(location.href);
		const variant = url.searchParams.get('variant');
		const def = variant && variant in definitionMap && definitionMap[variant];
		if (def) {
			variantEl.value = variant;
		}
		const text = url.searchParams.get('text');
		if (text) {
			if (def) {
				textEl.value = convertStr(text, def);
			} else {
				textEl.value = text;
			}

			textEl.focus();
			textEl.select();
		}
	}
}

if (document.readyState === 'loading') {
	window.addEventListener('DOMContentLoaded', init);
} else {
	init();
}
