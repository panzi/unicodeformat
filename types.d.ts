interface Definition {
    key: string;
    name: string;
    space?: number;
    basicSet?: number;
    lowerCase?: number;
    upperCase?: number;
    digits?: number;
    map: { [codepoint: number]: number }
}


type DefinitionInit = Omit<Definition, 'map'> & { map?: { [codepoint: number]: number } };


interface KeyboardEvent {
    keyIdentifier?: string;
    altGrKey?: boolean;
}
