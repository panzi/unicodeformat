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
    map: { [codepoint: number]: number }
}

type DefinitionInit = Omit<Definition, 'map'> & { map?: { [codepoint: number]: number } };

interface KeyboardEvent {
    altGrKey?: boolean;
}
