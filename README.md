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
| `Ctrl`+`Alt`+`0` ... `Ctrl`+`Alt`+`6` | Select format 11 to 16. |
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
| 𝐌𝐚𝐭𝐡𝐞𝐦𝐚𝐭𝐢𝐜𝐚𝐥 𝐁𝐨𝐥𝐝[^1] | `mathBold` | `Ctrl`+`2` |
| 𝑴𝒂𝒕𝒉𝒆𝒎𝒂𝒕𝒊𝒄𝒂𝒍 𝑩𝒐𝒍𝒅 𝑰𝒕𝒂𝒍𝒊𝒄 | `mathBoldItalic` | `Ctrl`+`3` |
| 𝕸𝖆𝖙𝖍𝖊𝖒𝖆𝖙𝖎𝖈𝖆𝖑 𝕭𝖔𝖑𝖉 𝕱𝖗𝖆𝖐𝖙𝖚𝖗 | `mathBoldFrakt` | `Ctrl`+`4` |
| 𝓜𝓪𝓽𝓱𝓮𝓶𝓪𝓽𝓲𝓬𝓪𝓵 𝓑𝓸𝓵𝓭 𝓢𝓬𝓻𝓲𝓹𝓽 | `mathBoldScript` | `Ctrl`+`5` |
| 𝖬𝖺𝗍𝗁𝖾𝗆𝖺𝗍𝗂𝖼𝖺𝗅 𝖲𝖺𝗇𝗌-𝖲𝖾𝗋𝗂𝖿[^1] | `mathSans` | `Ctrl`+`6` |
| 𝗠𝗮𝘁𝗵𝗲𝗺𝗮𝘁𝗶𝗰𝗮𝗹 𝗦𝗮𝗻𝘀-𝗦𝗲𝗿𝗶𝗳 𝗕𝗼𝗹𝗱[^1] | `mathSansBold` | `Ctrl`+`7` |
| 𝘔𝘢𝘵𝘩𝘦𝘮𝘢𝘵𝘪𝘤𝘢𝘭 𝘚𝘢𝘯𝘴-𝘚𝘦𝘳𝘪𝘧 𝘐𝘵𝘢𝘭𝘪𝘤 | `mathSansItalic` | `Ctrl`+`8` |
| 𝙈𝙖𝙩𝙝𝙚𝙢𝙖𝙩𝙞𝙘𝙖𝙡 𝙎𝙖𝙣𝙨-𝙎𝙚𝙧𝙞𝙛 𝘽𝙤𝙡𝙙 𝙄𝙩𝙖𝙡𝙞𝙘 | `mathSansBoldItalic` | `Ctrl`+`9` |
| 𝙼𝚊𝚝𝚑𝚎𝚖𝚊𝚝𝚒𝚌𝚊𝚕 𝙼𝚘𝚗𝚘𝚜𝚙𝚊𝚌𝚎 | `mathMono` | `Ctrl`+`Alt`+`0` |
| Ｆｕｌｌｗｉｄｔｈ[^1] | `fullwidth` | `Ctrl`+`Alt`+`1` |
| Ⓒⓘⓡⓒⓛⓔⓓ[^1] | `circled` | `Ctrl`+`Alt`+`2` |
| 🅝🅔🅖🅐🅣🅘🅥🅔 🅒🅘🅡🅒🅛🅔🅓[^1] [^2] | `negativeCircled` | `Ctrl`+`Alt`+`3` |
| 🅂🅀🅄🄰🅁🄴🄳[^2] | `squared` | `Ctrl`+`Alt`+`4` |
| 🅽🅴🅶🅰🆃🅸🆅🅴 🆂🆀🆄🅰🆁🅴🅳[^2] | `negativeSquared` | `Ctrl`+`Alt`+`5` |
| 🄟⒜⒭⒠⒩⒯⒣⒠⒮⒤⒵⒠⒟[^3] | `parenthesized` | `Ctrl`+`Alt`+`6` |

[^1]: Includes support for all decimal numbers.
[^2]: Upper-case letters only.
[^3]: Includes support for decimal numbers except 0.

### Example

<https://panzi.github.io/unicodeformat/?text=example&variant=mathBoldScript>
