Unicode Format
==============

Format text by using special Uincode symbols.

Unicode has multiple sets of latin letters and numbers for various special use
cases (mainly mathematics). This thing uses this in order to "format" plain
text.

[Open online version](https://panzi.github.io/unicodeformat/)

**NOTE:** Keep in mind that writing something with these Unicode symbols messes
with certain screen readers and accesibility software. Meaning blind people
probably can't read text formatted this way. So only use it where this is not
an issue.

You can use this tool to convert such formatted text back to plain text, though.
So in that way it can help with accesibility.

Hotkeys
-------

| Hotkey | Description |
| :----- | :---------- |
| `Ctrl`+`0` ... `Ctrl`+`9` | Select format 1 to 10. |
| `Ctrl`+`Alt`+`0` ... `Ctrl`+`Alt`+`9` | Select format 11 to 20. |
| `Ctrl`+`ArrowDown` | Select next format. |
| `Ctrl`+`ArrowUp` | Select previous format. |
| `Ctrl`+`Alt`+`C` | Copy whole text to clipboard. |
| `Ctrl`+`Alt`+`Z` | Insert zero-width space. This is useful when you want to make a hashtag out of a plural word, but that hashtag shouldn't contain the s. [#example](https://example.com/)s |
| `Ctrl`+`Enter` | Post on Mastodon. |

Parameters
----------

You can pre-fill the text and apply a format to it with these parameters:

| Parameter | Description |
| :-------- | :---------- |
| `text`    | The text to load. |
| `variant` | The "formatting". See below for possible values. You can also use this to clear any formatting by passing `ascii`. |

<!--
generated with:
definitions.forEach((d,i) => console.log('|',convertStr(d.name,d),'|',d.key,'|',i > 9 ? `\`Ctrl\`+\`Alt\`+\`${i - 10}\`` : `\`Ctrl\`+\`${i}\``,'|'))
-->

| Variant | Parameter Value | Hotkey |
| :------ | :-------------- | :----- |
| Normal | `ascii` | `Ctrl`+`0` |
| 𝕄𝕒𝕥𝕙𝕖𝕞𝕒𝕥𝕚𝕔𝕒𝕝 𝔻𝕠𝕦𝕓𝕝𝕖-𝕊𝕥𝕣𝕦𝕔𝕜[^1] | `mathDoubleStruck` | `Ctrl`+`1` |
| 𝑀𝑎𝑡ℎ𝑒𝑚𝑎𝑡𝑖𝑐𝑎𝑙 𝐼𝑡𝑎𝑙𝑖𝑐[^1][^7] | `mathItalic` | `Ctrl`+`2` |
| 𝐌𝐚𝐭𝐡𝐞𝐦𝐚𝐭𝐢𝐜𝐚𝐥 𝐁𝐨𝐥𝐝[^1] | `mathBold` | `Ctrl`+`3` |
| 𝑴𝒂𝒕𝒉𝒆𝒎𝒂𝒕𝒊𝒄𝒂𝒍 𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄[^2] | `mathBoldItalic` | `Ctrl`+`4` |
| 𝔐𝔞𝔱𝔥𝔢𝔪𝔞𝔱𝔦𝔠𝔞𝔩 𝔉𝔯𝔞𝔨𝔱𝔲𝔯[^8] | `mathFrakt` | `Ctrl`+`5` |
| 𝕸𝖆𝖙𝖍𝖊𝖒𝖆𝖙𝖎𝖈𝖆𝖑 𝕭𝖔𝖑𝖉 𝕱𝖗𝖆𝖐𝖙𝖚𝖗[^2] | `mathBoldFrakt` | `Ctrl`+`6` |
| ℳ𝒶𝓉𝒽ℯ𝓂𝒶𝓉𝒾𝒸𝒶𝓁 𝒮𝒸𝓇𝒾𝓅𝓉[^9] | `mathScript` | `Ctrl`+`7` |
| 𝓜𝓪𝓽𝓱𝓮𝓶𝓪𝓽𝓲𝓬𝓪𝓵 𝓑𝓸𝓵𝓭 𝓢𝓬𝓻𝓲𝓹𝓽 | `mathBoldScript` | `Ctrl`+`8` |
| 𝖬𝖺𝗍𝗁𝖾𝗆𝖺𝗍𝗂𝖼𝖺𝗅 𝖲𝖺𝗇𝗌-𝖲𝖾𝗋𝗂𝖿[^1] | `mathSans` | `Ctrl`+`9` |
| 𝗠𝗮𝘁𝗵𝗲𝗺𝗮𝘁𝗶𝗰𝗮𝗹 𝗦𝗮𝗻𝘀-𝗦𝗲𝗿𝗶𝗳 𝗕𝗼𝗹𝗱[^1] | `mathSansBold` | `Ctrl`+`Alt`+`0` |
| 𝘔𝘢𝘵𝘩𝘦𝘮𝘢𝘵𝘪𝘤𝘢𝘭 𝘚𝘢𝘯𝘴-𝘚𝘦𝘳𝘪𝘧 𝘐𝘵𝘢𝘭𝘪𝘤[^3] | `mathSansItalic` | `Ctrl`+`Alt`+`1` |
| 𝙈𝙖𝙩𝙝𝙚𝙢𝙖𝙩𝙞𝙘𝙖𝙡 𝙎𝙖𝙣𝙨-𝙎𝙚𝙧𝙞𝙛 𝘽𝙤𝙡𝙙 𝙄𝙩𝙖𝙡𝙞𝙘[^4] | `mathSansBoldItalic` | `Ctrl`+`Alt`+`2` |
| 𝙼𝚊𝚝𝚑𝚎𝚖𝚊𝚝𝚒𝚌𝚊𝚕 𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎[^1] | `mathMono` | `Ctrl`+`Alt`+`3` |
| Ｆｕｌｌｗｉｄｔｈ[^1] | `fullwidth` | `Ctrl`+`Alt`+`4` |
| Ⓒⓘⓡⓒⓛⓔⓓ[^1] | `circled` | `Ctrl`+`Alt`+`5` |
| 🅝🅔🅖🅐🅣🅘🅥🅔 🅒🅘🅡🅒🅛🅔🅓[^1][^5] | `negativeCircled` | `Ctrl`+`Alt`+`6` |
| 🅂🅀🅄🄰🅁🄴🄳[^5] | `squared` | `Ctrl`+`Alt`+`7` |
| 🅽🅴🅶🅰🆃🅸🆅🅴 🆂🆀🆄🅰🆁🅴🅳[^4] | `negativeSquared` | `Ctrl`+`Alt`+`8` |
| 🄟⒜⒭⒠⒩⒯⒣⒠⒮⒤⒵⒠⒟[^6] | `parenthesized` | `Ctrl`+`Alt`+`9` |

[^1]: Includes support for all decimal numbers.
[^2]: Uses Mathematical Bold as fallback for decimal numbers.
[^3]: Uses Mathematical Sans-Serif as fallback for decimal numbers.
[^4]: Uses Mathematical Sans-Serif Bold as fallback for decimal numbers.
[^5]: Upper-case letters only.
[^6]: Includes support for decimal numbers except 0.
[^7]: The lower-case h might look a bit different then the other letters,
      because it is the re-purposed Plank constant (ℎ).
[^8]: Uses "Black-Letter" to for the missing letters (C, H, I, R, Z).
[^9]: Uses "Script" to for the missing letters (B, E, F, H, I, L, M, R, e, g, o).

### Example

<https://panzi.github.io/unicodeformat/?text=example&variant=mathBoldScript>
