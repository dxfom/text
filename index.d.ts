export interface DxfTextContentElement {
    /** text content */
    text: string;
    /** strike-through */
    k?: 1;
    /** overscore */
    o?: 1;
    /** underscore */
    u?: 1;
}
export declare const parseDxfTextContent: (text: string) => DxfTextContentElement[];
