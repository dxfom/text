export interface DxfTextContentElement {
    text: string;
    k?: 1;
    o?: 1;
    u?: 1;
}
export declare const parseDxfTextContent: (text: string) => DxfTextContentElement[];
