interface Definition {
    key: string;
    name: string;
    space?: number;
    basicSet?: number;
    lowerCase?: number;
    upperCase?: number;
    greekLowerCase?: number;
    greekUpperCase?: number;
    digits?: number;
    map: { [codepoint: number]: number },
    isBold?: boolean,
    isItalic?: boolean,
    regular?: string,
    bold?: string,
    italic?: string,
    boldItalic?: string,
}

type DefinitionInit = Omit<Definition, 'map'> & { map?: { [codepoint: number]: number } };

interface FontGroup {
    order: number;
    key: string;
    name: string;
    regular?: Definition;
    bold?: Definition;
    italic?: Definition;
    boldItalic?: Definition;
}

interface KeyboardEvent {
    readonly altGrKey?: boolean;
}
