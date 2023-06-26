/**
 * interface for oneui js function
 */
interface OneUI {
    loader(mode: 'show' | 'hide'): void;
    panelLoader(panelId, mode: 'show' | 'hide'): void;
    contentLoader(mode: 'show' | 'hide'): void;
    init(func?: string): void;
    initHelpers(funcs: any[]): void;
    layout(func?: string): void;
    blocks(block, mode): void;
}

declare var OneUI: OneUI;