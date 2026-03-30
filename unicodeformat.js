/// <reference path="./types.d.ts" />

"use strict";

function detectMobile() {
	const a = navigator.userAgent||navigator.vendor;
	return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)));
}

/**
 * @param {number} character
 * @param {Definition} definition
 * @returns {number}
 */
function convertChar(character, definition) {
	if (character in TO_ASCII) {
		var ascii = TO_ASCII[character];
		if (ascii in definition.map) {
			return definition.map[ascii];
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
	var codePoints = [];
	/*
	for (var ch of str) {
		codePoints.push(convertChar(ch.codePointAt(0), definition));
	}
	*/
	for (var i = 0; i < str.length;) {
		var first, codePoint;
		codePoint = first = str.charCodeAt(i);
		if (first >= 0xD800 && first <= 0xDBFF) {
			++ i;
			var second = str.charCodeAt(i);
			if (second >= 0xDC00 && second <= 0xDFFF) {
				++ i;
				codePoint = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
			}
		} else {
			++ i;
		}
		codePoints.push(convertChar(codePoint, definition));
	}
	return String.fromCodePoint.apply(String, codePoints);
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
	digits: 48
};

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
		digits: 120782
	},
	{
		key: 'mathBoldItalic',
		name: 'Mathematical Bold Italic',
		upperCase: 119912,
		lowerCase: 119938,
		digits: 120782
	},
	/* incomplete!
	{
		key: 'mathFrakt',
		name: 'Mathematical Fraktur',
		upperCase: 120068,
		lowerCase: 120094
	},
	*/
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
		digits: 0x1D7EC
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
		digits: 0x1D7EC
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
		upperCase: 127248
	}
];

/** @type {{[codepoint: number]: number}} */
var TO_ASCII = {};

// Process in reverse order so redundant usage of code points for numbers will
// be overwritten with the correct ones, which come before in this list.
for (let i = definitionInits.length - 1; i >= 0; -- i) {
	const init = definitionInits[i];
	const { lowerCase, upperCase, digits, basicSet, space } = init;
	let { map } = init;

	if (map) {
		for (let asciiStr in map) {
			const ascii = +asciiStr;
			TO_ASCII[map[ascii]] = ascii;
		}
	} else {
		map = {};
	}

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

var IS_WEBKIT = navigator.userAgent.indexOf('WebKit') >= 0;
var IS_MOBILE = detectMobile();

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
		optionEl.appendChild(document.createTextNode(IS_MOBILE ? def.name : convertStr(def.name, def)));
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
			if (IS_WEBKIT) {
				textEl.focus();
				document.execCommand('insertText', false, converted);
			}
			else {
				textEl.value = str.slice(0, selStart) + converted + str.slice(selEnd);
			}
			//textEl.focus();
			textEl.selectionStart = selStart;
			textEl.selectionEnd = selStart + converted.length;
		//}
		variantEl.title = definition.name;
		textEl.focus();
	}


	if (!IS_MOBILE && IS_WEBKIT) {
		variantEl.addEventListener('click', updateVariant, false);
	}

	variantEl.addEventListener('change', updateVariant, false);

	/** @param {string} text */
	function insertText(text) {
		const selStart = textEl.selectionStart ?? 0;
		const selEnd = textEl.selectionEnd ?? 0;
		const str = textEl.value;
		if (IS_WEBKIT) {
			document.execCommand('insertText', false, text);
		}
		else {
			textEl.value = str.slice(0, selStart) + text + str.slice(selEnd);
		}
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
			performIntent();
		}
	});

	window.addEventListener('keyup', function (event) {
		const { ctrlKey, altKey, key } = event;

		if (ctrlKey) {
			if (altKey) {
				switch (key) {
					case 'c':
						event.preventDefault();
						copyToClipboard();
						return;

					case 'z':
						event.preventDefault();
						insertText('\u200B');
						return;

					case '+':
					{
						event.preventDefault();

						let index = 0;
						const current = variantEl.value;
						for (; index < definitions.length; ++ index) {
							if (definitions[index].key === current) {
								break;
							}
						}

						if (index >= definitions.length) {
							index = 0;
						} else {
							index = (index + 1) % definitions.length;
						}

						variantEl.value = definitions[index].key;
						return;
					}
					case '-':
					{
						event.preventDefault();

						let index = 0;
						const current = variantEl.value;
						for (; index < definitions.length; ++ index) {
							if (definitions[index].key === current) {
								break;
							}
						}

						if (index >= definitions.length) {
							index = 0;
						} else {
							index = index === 0 ? definitions.length - 1 : index - 1;
						}

						variantEl.value = definitions[index].key;
						return;
					}
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
					}

					event.preventDefault();
				}
			}
		}
	});

	if (!intentUrlInput.value.trim()) {
		intentUrlInput.value = localStorage.getItem('intent-url') || 'https://mastodon.social/';
	}

	intentBtn.addEventListener('click', function (event) {
		performIntent();
	});

	/** @type {ReturnType<typeof setTimeout>?} */
	let copyTimer = null;
	copyBtn.addEventListener('click', async function (event) {
		await copyToClipboard();
	}, false);

	/** @type {ReturnType<typeof setTimeout>?} */
	let updateTimer = null;
	function updateFromCursor() {
		updateTimer = null;
		var str = textEl.value;
		if (str.length > 0) {
			const selEnd = textEl.selectionEnd ?? 0;
			/** @type {number=} */
			let codePoint;
			let index = selEnd ?? 0;
			for (;;) {
				if (index === 0 || str.charCodeAt(index - 1) === 10) {
					codePoint = str.codePointAt(index);
					break;
				} else {
					var second = codePoint = str.charCodeAt(index - 1);
					if (second >= 0xDC00 && second <= 0xDFFF && index > 1) {
						var first = str.charCodeAt(index - 2);
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
		}
	}

	function immediateUpdateFromCursor() {
		if (updateTimer !== null) {
			clearTimeout(updateTimer);
		}
		updateFromCursor();
	}

	function delayedUpdateFromCursor() {
		if (updateTimer !== null) {
			clearTimeout(updateTimer);
		}
		updateTimer = setTimeout(updateFromCursor, 0);
	}

	textEl.addEventListener('keyup', function (event) {
		if (event.key) {
			switch (event.key) {
				case "ArrowDown":
				case "ArrowUp":
				case "ArrowLeft":
				case "ArrowRight":
				case "Home":
				case "End":
				case "PageUp":
				case "PageDown":
				case "Backspace":
				case "Delete":
					delayedUpdateFromCursor();
					break;
			}
		}
	}, false);

	textEl.addEventListener('paste', delayedUpdateFromCursor, false);
	textEl.addEventListener('cut',   delayedUpdateFromCursor, false);
	textEl.addEventListener('drop',  delayedUpdateFromCursor, false);
	textEl.addEventListener('click', immediateUpdateFromCursor, false);

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
