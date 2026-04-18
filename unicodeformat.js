/// <reference path="./types.d.ts" />

"use strict";

/**
 * @param {string} str
 * @param {Definition} definition
 */
function convertStr(str, definition) {
	/** @type {number[]} */
	const codePoints = [];
	const { map } = definition;
	str = str.normalize('NFD');
	for (let i = 0; i < str.length;) {
		const codePoint = str.codePointAt(i);
		if (codePoint === undefined) break;

		/** @type {number} */
		let converted = codePoint;
		if (codePoint in TO_ASCII) {
			const ascii = TO_ASCII[codePoint];
			if (ascii in map) {
				converted = map[ascii];
			}
		}

		codePoints.push(converted);

		i += codePoint >= 0x010000 ? 2 : 1;
	}
	return String.fromCodePoint(...codePoints).normalize('NFC');
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
	greekUpperCase: 0x391,
	greekLowerCase: 0x3B1,
	digits: 48,
	regular: 'ascii',
	bold: 'mathBold',
	italic: 'mathItalic',
	boldItalic: 'mathBoldItalic',
	map: /** @type {{[codepoint: number]: number}} */ ({
		0x03DC: 0x03DC,
		0x03DD: 0x03DD,
		0x2207: 0x2207,
		0x03A2: 0x03F4, // Theta is not in the block but seperate!
	}),
};

const GREEK_ADDITIONAL = [0x2202, 0x03F5, 0x03D1, 0x03F0, 0x03D5, 0x03F1, 0x03D6];

GREEK_ADDITIONAL.forEach(codepoint => {
	ASCII.map[codepoint] = codepoint;
});

/** @type {{[key: string]: Definition}} */
const definitionMap = {};

/** @type {Definition[]} */
const definitions = [];

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
		greekUpperCase: 0x1D6A8,
		greekLowerCase: 0x1D6C2,
		greekAdditional: 0x1D6DB,
		map: {
			0x03DC: 0x1D7CA, // Ϝ greek letter digamma
			0x03DD: 0x1D7CB, // ϝ greek small letter digamma
			0x2207: 0x1D6C1, // Nabla
		},
		isBold: true,
		regular: 'ascii',
		bold: 'mathBold',
		italic: 'mathItalic',
		boldItalic: 'mathBoldItalic',
	},
	{
		key: 'mathItalic',
		name: 'Mathematical Italic',
		upperCase: 0x1D434,
		lowerCase: 0x1D44E,
		greekUpperCase: 0x1D6E2,
		greekLowerCase: 0x1D6FC,
		greekAdditional: 0x1D715,
		map: {
			0x68:    0x210E, // h
			0x131:  0x1D6A4, // ı
			0x237:  0x1D6A5, // ȷ
			0x2207: 0x1D6fD, // Nabla
		},
		isItalic: true,
		regular: 'ascii',
		bold: 'mathBold',
		italic: 'mathItalic',
		boldItalic: 'mathBoldItalic',
	},
	{
		key: 'mathBoldItalic',
		name: 'Mathematical Bold Italic',
		upperCase: 119912,
		lowerCase: 119938,
		digits: 120782,
		greekUpperCase: 0x1D71C,
		greekLowerCase: 0x1D736,
		greekAdditional: 0x1D74F,
		map: {
			0x2207: 0x1D735, // Nabla
		},
		isBold: true,
		isItalic: true,
		regular: 'ascii',
		bold: 'mathBold',
		italic: 'mathItalic',
		boldItalic: 'mathBoldItalic',
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
		},
		regular: 'mathFrakt',
		bold: 'mathBoldFrakt',
	},
	{
		key: 'mathBoldFrakt',
		name: 'Mathematical Bold Fraktur',
		upperCase: 120172,
		lowerCase: 120198,
		digits: 120782,
		isBold: true,
		regular: 'mathFrakt',
		bold: 'mathBoldFrakt',
	},
	{
		key: 'mathScript',
		name: 'Mathematical Script',
		upperCase: 119964,
		lowerCase: 119990,
		map: {
			0x42: 0x212C, // B
			0x45: 0x2130, // E
			0x46: 0x2131, // F
			0x48: 0x210B, // H
			0x49: 0x2110, // I
			0x4C: 0x2112, // L
			0x4D: 0x2133, // M
			0x52: 0x211B, // R
			0x65: 0x212F, // e
			0x67: 0x210A, // g
			0x6F: 0x2134, // o
		},
		regular: 'mathScript',
		bold: 'mathBoldScript',
	},
	{
		key: 'mathBoldScript',
		name: 'Mathematical Bold Script',
		upperCase: 120016,
		lowerCase: 120042,
		isBold: true,
		regular: 'mathScript',
		bold: 'mathBoldScript',
	},
	{
		key: 'mathSans',
		name: 'Mathematical Sans-Serif',
		upperCase: 0x1D5A0,
		lowerCase: 0x1D5BA,
		greekUpperCase: 0x391,
		greekLowerCase: 0x3B1,
		digits: 0x1D7E2,
		regular: 'mathSans',
		bold: 'mathSansBold',
		italic: 'mathSansItalic',
		boldItalic: 'mathSansBoldItalic',
		map: {
			...ASCII.map
		}
	},
	{
		key: 'mathSansBold',
		name: 'Mathematical Sans-Serif Bold',
		upperCase: 0x1D5D4,
		lowerCase: 0x1D5EE,
		digits: 0x1D7EC,
		greekUpperCase: 0x1D756,
		greekLowerCase: 0x1D770,
		greekAdditional: 0x1D789,
		map: {
			0x2207: 0x1D76F, // Nabla
		},
		isBold: true,
		regular: 'mathSans',
		bold: 'mathSansBold',
		italic: 'mathSansItalic',
		boldItalic: 'mathSansBoldItalic',
	},
	{
		key: 'mathSansItalic',
		name: 'Mathematical Sans-Serif Italic',
		upperCase: 0x1D608,
		lowerCase: 0x1D622,
		digits: 0x1D7E2,
		isItalic: true,
		regular: 'mathSans',
		bold: 'mathSansBold',
		italic: 'mathSansItalic',
		boldItalic: 'mathSansBoldItalic',
	},
	{
		key: 'mathSansBoldItalic',
		name: 'Mathematical Sans-Serif Bold Italic',
		upperCase: 0x1D63C,
		lowerCase: 0x1D656,
		digits: 0x1D7EC,
		greekUpperCase: 0x1D790,
		greekLowerCase: 0x1D7AA,
		greekAdditional: 0x1D7C3,
		map: {
			0x2207: 0x1D7A9, // Nabla
		},
		isBold: true,
		isItalic: true,
		regular: 'mathSans',
		bold: 'mathSansBold',
		italic: 'mathSansItalic',
		boldItalic: 'mathSansBoldItalic',
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
		key: 'smallcaps',
		name: 'Small Capital Letters',
		map: {
			// no support for SMALL CAPITAL X in Unicode!
			0x62: 0x0299,
			0x67: 0x0262,
			0x68: 0x029C,
			0x69: 0x026A,
			0x6C: 0x029F,
			0x6E: 0x0274,
			0x72: 0x0280,
			0x79: 0x028F,
			0x61: 0x1D00,
			0x63: 0x1D04,
			0x64: 0x1D05,
			0x65: 0x1D07,
			0x6A: 0x1D0A,
			0x6B: 0x1D0B,
			0x6D: 0x1D0D,
			0x6F: 0x1D0F,
			0x70: 0x1D18,
			0x74: 0x1D1B,
			0x75: 0x1D1C,
			0x76: 0x1D20,
			0x77: 0x1D21,
			0x7A: 0x1D22,
			0x66: 0xA730,
			0x73: 0xA731,
			0x71: 0xA7AF,
		}
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
		name: 'NEGATIVE CIRCLED',
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
		name: 'SQUARED',
		upperCase: 127280
	},
	{
		key: 'negativeSquared',
		name: 'NEGATIVE SQUARED',
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

/** @type {{[key: string]: FontGroup}} */
const groupMap = {};

// Process in reverse order so redundant usage of code points for numbers will
// be overwritten with the correct ones, which come before in this list.
for (let i = definitionInits.length - 1; i >= 0; -- i) {
	const init = definitionInits[i];
	const { lowerCase, upperCase, greekLowerCase, greekUpperCase, greekAdditional, digits, basicSet, space } = init;

	/** @type {{[codepoint: number]: number}} */
	const map = {};

	/** @type {Definition} */
	const def = { ...init, map };

	const groupKey = init.regular ?? init.key;
	/** @type {FontGroup} */
	let group;

	if (Object.hasOwn(groupMap, groupKey)) {
		group = groupMap[groupKey];
	} else {
		group = groupMap[groupKey] = {
			order: -1,
			name: init.name,
			key: groupKey,
		};
	}

	if (init.isBold && init.isItalic) {
		group.boldItalic = def;
	} else if (init.isBold) {
		group.bold = def;
	} else if (init.isItalic) {
		group.italic = def;
	} else {
		group.name = def.name;
		group.regular = def;
	}

	definitionMap[def.key] = def;
	definitions.push(def);

	if (lowerCase !== undefined) {
		for (let offset = 0; offset < 26; ++ offset) {
			const asciiLower = ASCII.lowerCase + offset;
			const lower = lowerCase + offset;
			TO_ASCII[lower] = asciiLower;
			map[asciiLower] = lower;
		}
	}

	if (upperCase !== undefined) {
		for (let offset = 0; offset < 26; ++ offset) {
			const asciiUpper = ASCII.upperCase + offset;
			const upper = upperCase + offset;
			TO_ASCII[upper] = asciiUpper;
			map[asciiUpper] = upper;
		}
	}

	if (greekAdditional !== undefined) {
		for (let offset = 0; offset < GREEK_ADDITIONAL.length; ++ offset) {
			const ascii = GREEK_ADDITIONAL[offset];
			const conv = greekAdditional + offset;
			TO_ASCII[conv] = ascii;
			map[ascii] = conv;
		}
	}

	if (greekLowerCase !== undefined) {
		for (let offset = 0; offset < 25; ++ offset) {
			const asciiLower = ASCII.greekLowerCase + offset;
			const lower = greekLowerCase + offset;
			TO_ASCII[lower] = asciiLower;
			map[asciiLower] = lower;
		}
	}

	if (greekUpperCase !== undefined) {
		for (let offset = 0; offset < 25; ++ offset) {
			const asciiUpper = ASCII.greekUpperCase + offset;
			const upper = greekUpperCase + offset;
			TO_ASCII[upper] = asciiUpper;
			map[asciiUpper] = upper;
		}
	}

	if (digits !== undefined) {
		for (let offset = 0; offset < 10; ++ offset) {
			const ascii = ASCII.digits + offset;
			const digit = digits + offset;
			TO_ASCII[digit] = ascii;
			map[ascii] = digit;
		}
	}

	if (basicSet !== undefined) {
		for (let offset = 0; offset < 94; ++ offset) {
			const ascii = ASCII.basicSet + offset;
			const conv = basicSet + offset;
			TO_ASCII[conv] = ascii;
			map[ascii] = conv;
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
		map[ASCII.space] = space;
	}

	for (const asciiStr in map) {
		const ascii = +asciiStr;
		definitionMap[map[ascii]] = def;
	}
}
definitions.reverse();

/** @type {FontGroup[]} */
const groups = [];

for (const def of definitions) {
	const groupKey = def.regular ?? def.key;
	const group = groupMap[groupKey];
	if (group.order < 0) {
		group.order = groups.length;
		groups.push(group);
	}
}

function init() {
	const variantEl = document.getElementById('variant');
	const textEl = document.getElementById('text');
	const copyBtn = document.getElementById('copy-btn');
	const intentBtn = document.getElementById('intent-btn');
	const intentUrlInput = document.getElementById('intent-url');
	const zwSpcBtn = document.getElementById('zero-width-space-btn');
	const familyEl = document.getElementById('family');
	const boldEl = document.getElementById('bold');
	const italicEl = document.getElementById('italic');

	if (!(variantEl instanceof HTMLInputElement)) {
		console.error('variantEl is not a HTMLInputElement!', variantEl);
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

	if (!(familyEl instanceof HTMLSelectElement)) {
		console.error('familyEl is not a HTMLSelectElement!', familyEl);
		return;
	}

	if (!(boldEl instanceof HTMLInputElement)) {
		console.error('boldEl is not a HTMLInputElement!', boldEl);
		return;
	}

	if (!(italicEl instanceof HTMLInputElement)) {
		console.error('italicEl is not a HTMLInputElement!', italicEl);
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

	initElements(variantEl, textEl, copyBtn, intentBtn, intentUrlInput, zwSpcBtn, familyEl, boldEl, italicEl);
}

/**
 * @param {HTMLInputElement} variantEl
 * @param {HTMLTextAreaElement} textEl
 * @param {HTMLButtonElement} copyBtn
 * @param {HTMLButtonElement} intentBtn
 * @param {HTMLInputElement} intentUrlInput
 * @param {HTMLButtonElement} zwSpcBtn
 * @param {HTMLSelectElement} familyEl
 * @param {HTMLInputElement} boldEl
 * @param {HTMLInputElement} italicEl
 */
function initElements(variantEl, textEl, copyBtn, intentBtn, intentUrlInput, zwSpcBtn, familyEl, boldEl, italicEl) {
	for (let i = 0; i < groups.length; ++ i) {
		const group = groups[i];
		const hotkey = i > 9 ? `Ctrl+Alt+${i - 10}` : `Ctrl+${i}`;
		const optionEl = document.createElement('option');
		optionEl.value = group.key;
		optionEl.title = `${group.name} (family: ${group.key}, ${hotkey})`;
		const def = group.regular ?? group.bold ?? group.italic ?? group.boldItalic;
		optionEl.appendChild(document.createTextNode(def ? convertStr(group.name, def) : group.name));
		familyEl.appendChild(optionEl);
	}

	function applyVariant() {
		const def = definitionMap[variantEl.value];
		const selStart = textEl.selectionStart ?? 0;
		const selEnd = textEl.selectionEnd ?? 0;
		const str = textEl.value;

		const selected = str.slice(selStart, selEnd);
		const converted = convertStr(selected, def);
		textEl.value = str.slice(0, selStart) + converted + str.slice(selEnd);
		textEl.setSelectionRange(selStart, selStart + converted.length);

		textEl.focus();
	}

	/**
	 * @param {Definition} def 
	 */
	function applyBoldItalicState(def) {
		boldEl.disabled = !((def.bold || def.boldItalic) && (def.regular || def.italic));
		italicEl.disabled = !((def.italic || def.boldItalic) && (def.regular || def.bold));
		boldEl.checked = !!def.isBold;
		italicEl.checked = !!def.isItalic;
	}

	function applyFamilyBoldItalic() {
		const group = groupMap[familyEl.value];

		/** @type {Definition=} */
		let def;

		if (boldEl.checked && italicEl.checked) {
			def = group.boldItalic ?? group.bold ?? group.italic;
		} else if (boldEl.checked) {
			def = group.bold ?? group.boldItalic;
		} else if (italicEl.checked) {
			def = group.italic ?? group.boldItalic;
		} else {
			def = group.regular ?? group.italic ?? group.bold ?? group.boldItalic;
		}

		def ??= definitionMap[familyEl.value];

		applyBoldItalicState(def);

		variantEl.value = def.key;
		familyEl.title = group.name;
		applyVariant();
	}

	familyEl.addEventListener('change', applyFamilyBoldItalic, false);
	boldEl.addEventListener('change', applyFamilyBoldItalic, false);
	italicEl.addEventListener('change', applyFamilyBoldItalic, false);

	/** @param {string} text */
	function insertText(text) {
		const selStart = textEl.selectionStart ?? 0;
		const selEnd = textEl.selectionEnd ?? 0;
		const str = textEl.value;
		textEl.value = str.slice(0, selStart) + text + str.slice(selEnd);
		const newPos = selStart + text.length;
		textEl.setSelectionRange(newPos, newPos);
	}

	zwSpcBtn.addEventListener('click', function (event) {
		insertText('\u200B');
	});

	textEl.addEventListener('keydown', function (event) {
		const { key } = event;
		if (key.length !== 1 || event.altKey || event.ctrlKey || event.metaKey || event.altGrKey) {
			return;
		}

		const decomp = key.normalize('NFD');
		const character = decomp.codePointAt(0);

		if (!character) {
			return;
		}

		const definition = definitionMap[variantEl.value];
		const { map } = definition;

		if (Object.hasOwn(map, character)) {
			event.preventDefault();
			event.stopPropagation();
			let converted = String.fromCodePoint(map[character]);
			if (decomp.length > 1) {
				converted = (converted + decomp.slice(1)).normalize('NFC');
			}
			insertText(converted);
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
		const { ctrlKey, altKey, metaKey, altGrKey, key } = event;

		if (ctrlKey && !altKey && !metaKey && !altGrKey) {
			switch (key) {
				case 'ArrowDown':
				case 'ArrowUp':
				case 'i':
				case 'b':
					event.preventDefault();
					event.stopPropagation();
					break;
			}
		}
	}, true);

	window.addEventListener('keyup', function (event) {
		const { ctrlKey, altKey, metaKey, altGrKey, key } = event;

		if (metaKey || altGrKey) {
			return;
		}

		if (ctrlKey) {
			if (!altKey) {
				switch (key) {
					case 'ArrowDown':
					{
						event.preventDefault();
						event.stopPropagation();

						let index = 0;
						const current = familyEl.value;
						for (; index < groups.length; ++ index) {
							if (groups[index].key === current) {
								break;
							}
						}

						if (index >= groups.length) {
							console.error(index, groups.length)
							index = 0;
						} else {
							index = (index + 1) % groups.length;
						}

						const group = groups[index];
						familyEl.value = group.key;
						applyFamilyBoldItalic();
						return;
					}

					case 'ArrowUp':
					{
						event.preventDefault();
						event.stopPropagation();

						let index = 0;
						const current = familyEl.value;
						for (; index < groups.length; ++ index) {
							if (groups[index].key === current) {
								break;
							}
						}

						if (index >= groups.length) {
							console.error(index, groups.length)
							index = 0;
						} else {
							index = index === 0 ? groups.length - 1 : index - 1;
						}

						const group = groups[index];
						familyEl.value = group.key;
						applyFamilyBoldItalic();
						return;
					}

					case 'i':
					{
						event.preventDefault();
						event.stopPropagation();

						if (!italicEl.disabled) {
							italicEl.checked = !italicEl.checked;
							applyFamilyBoldItalic();
						}
						return;
					}

					case 'b':
					{
						event.preventDefault();
						event.stopPropagation();

						if (!boldEl.disabled) {
							boldEl.checked = !boldEl.checked;
							applyFamilyBoldItalic();
						}
						return;
					}
				}
			} else {
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
				if (codepoint >= 0x30 && codepoint <= 0x39) { // '0' ... '9'
					let index = codepoint - 0x30;

					if (altKey) {
						index += 10;
					}

					if (groups.length > index) {
						const group = groups[index];
						familyEl.value = group.key;
						applyFamilyBoldItalic();
					}

					event.preventDefault();
					event.stopPropagation();
					return;
				}
			}
		}
	}, true);

	// HACK: On Android things like "ä" don't produce a keyup event with key == "ä".
	//       It produces a keyup event with key == "Process" (Firefox) or
	//       key == "Unidentifed" (Chrome) and then an input event.
	let nonAsciiCharTimeStamp = -Infinity;
	textEl.addEventListener('keydown', function (event) {
		const { ctrlKey, altKey, metaKey, key } = event;

		if (ctrlKey || altKey || metaKey) {
			return;
		}

		if (key === 'Process' || key === 'Unidentified') {
			nonAsciiCharTimeStamp = event.timeStamp;
			return;
		}

		nonAsciiCharTimeStamp = -Infinity;
	}, true);

	let typingTimeStamp = -Infinity;
	textEl.addEventListener('input', function (event) {
		// HACK: Support typing umlauts etc. in Firefox on Android.
		//       Chrome on Android produces a string consisting of the correct,
		//       but rendering is broken.
		const { timeStamp, inputType } = event;
		if (timeStamp - nonAsciiCharTimeStamp < 25 && inputType === 'insertText') {
			nonAsciiCharTimeStamp = -Infinity;

			const selStart = textEl.selectionStart;
			const selEnd = textEl.selectionEnd;

			if (selStart !== null && selStart === selEnd) {
				const def = definitionMap[variantEl.value];
				const str = textEl.value;
				const char = event.data ?? '';
				const charStart = selStart - char.length;
				const converted = convertStr(char, def);
				textEl.value = str.slice(0, charStart) + converted + str.slice(selStart);
				const newPos = charStart + converted.length;
				textEl.setSelectionRange(newPos, newPos);
			}
		}

		if (inputType === 'insertText' || inputType === 'insertTranspose') {
			typingTimeStamp = timeStamp;
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

				applyBoldItalicState(def);
				familyEl.value = def.regular ?? def.key;
			}
		} else {
			oldSelectionStart = 0;
			oldSelectionEnd = 0;
		}
	}

	textEl.addEventListener('selectionchange', event => {
		if (event.timeStamp - typingTimeStamp >= 25) {
			updateFromCursor();
		}
	}, false);

	{
		const url = new URL(location.href);

		const variant = url.searchParams.get('variant');
		const family = url.searchParams.get('family');
		const bold = url.searchParams.get('bold')?.trim().toLowerCase() === 'true';
		const italic = url.searchParams.get('italic')?.trim().toLowerCase() === 'true';

		/** @type {Definition=} */
		let paramDef;
		
		if (family && Object.hasOwn(groupMap, family)) {
			const group = groupMap[family];

			if (bold && italic) {
				paramDef = group.boldItalic ?? group.bold ?? group.italic ?? group.regular;
			} else if (bold) {
				paramDef = group.bold ?? group.boldItalic ?? group.regular ?? group.italic;
			} else if (italic) {
				paramDef = group.italic ?? group.boldItalic ?? group.regular ?? group.bold;
			}

			paramDef ??= definitionMap[group.key];
		}
		
		if (!paramDef && variant && Object.hasOwn(definitionMap, variant)) {
			paramDef = definitionMap[variant];
		}

		{
			const def = paramDef || definitionMap[variantEl.value];
			applyBoldItalicState(def);
			variantEl.value = def.key;
			familyEl.value = def.regular ?? def.key;
			familyEl.title = groupMap[familyEl.value].name;
		}

		const text = url.searchParams.get('text');
		if (text) {
			if (paramDef) {
				textEl.value = convertStr(text, paramDef);
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
