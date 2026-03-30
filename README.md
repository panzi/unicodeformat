Unicode Format
==============

Format text by using special Uincode symbols.

Unicode has multiple sets of latin letters and numbers for various special use
cases (mainly mathematics). This thing uses this in order to "format" plain
text.

[Open online version](https://panzi.github.io/unicodeformat/)

Parameters
----------

You can pre-fill the text and apply a format to it with these parameters:

| Parameter | Description |
| :-------- | :---------- |
| `text`    | The text to load. |
| `variant` | The "formatting". Hover the options of the select box to see possible values. You can also use this to clear any formatting by passing `ascii`. |

Hotkeys
-------

| Hotkey | Description |
| :----- | :---------- |
| `Ctrl`+`0` ... `Ctrl`+`9` | Select format 1 to 10. |
| `Ctrl`+`Alt`+`0` ... `Ctrl`+`Alt`+`6` | Select format 11 to 16. |
| `Ctrl`+`Alt`+`C` | Copy whole text to clipboard. |
| `Ctrl`+`Alt`+`Z` | Insert zero-width space. This is useful when you want to make a hashtag out of a plural word, but that hashtag shouldn't contain the s. [#example](https://example.com/)s |
| `Ctrl`+`Enter` | Post on Mastodon. |
