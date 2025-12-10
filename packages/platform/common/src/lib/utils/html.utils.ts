import { v4 } from "uuid";
import { isNull, isUndefined } from "./optional.utils";

export function deepCloneNode(node: HTMLElement): HTMLElement {
    const clone = node.cloneNode(true) as HTMLElement;
    const descendantsWithId = clone.querySelectorAll('[id]');
    const nodeName = node.nodeName.toLowerCase();
  
    clone.removeAttribute('id');
  
    descendantsWithId.forEach((descendant) => {
        descendant.removeAttribute('id');
    });
  
    if (nodeName === 'canvas') {
        transferCanvasData(node as HTMLCanvasElement, clone as HTMLCanvasElement);
    } else if (
        nodeName === 'input' ||
        nodeName === 'select' ||
        nodeName === 'textarea'
    ) {
        transferInputData(node as HTMLInputElement, clone as HTMLInputElement);
    }
  
    transferElementData('canvas', node, clone, transferCanvasData);
    transferElementData('input, textarea, select', node, clone, transferInputData);
    // transferElementData('div[zwpVScroll]', node, clone, transferScrollData);
    
    return clone;
}

export function transferElementData<T extends Element>(
    selector: string,
    node: HTMLElement,
    clone: HTMLElement,
    callback: (source: T, clone: T) => void
) {
    const descendantElements = node.querySelectorAll<T>(selector);
  
    if (descendantElements.length) {
        const cloneElements = clone.querySelectorAll<T>(selector);
  
        for (let i = 0; i < descendantElements.length; i++) {
            callback(descendantElements[i], cloneElements[i]);
        }
    }
}

function transferInputData(
    source: Element & { value: string },
    clone: Element & { value: string; name: string; type: string }
) {
    // Browsers throw an error when assigning the value of a file input programmatically.
    if (clone.type !== 'file') {
        clone.value = source.value;
    }
  
    // Radio button `name` attributes must be unique for radio button groups
    // otherwise original radio buttons can lose their checked state
    // once the clone is inserted in the DOM.
    if (clone.type === 'radio' && clone.name) {
        clone.name = `mat-clone-${clone.name}-${v4()}`;
    }
}
  
  /** Transfers the data of one canvas element to another. */
function transferCanvasData(
    source: HTMLCanvasElement,
    clone: HTMLCanvasElement
) {
    const context = clone.getContext('2d');
  
    if (context) {
      // In some cases `drawImage` can throw (e.g. if the canvas size is 0x0).
      // We can't do much about it so just ignore the error.
        try {
            context.drawImage(source, 0, 0);
        } catch {
            // console.log('canvas draw fail')
        }
    }
}

export function transferScrollData(
    source: HTMLElement,
    clone: HTMLElement
) {
    clone.scrollTop = source.scrollTop
    clone.scrollLeft = source.scrollLeft
}

export function getWindowForElement(el: HTMLElement): Window {
    if (isNull(el.ownerDocument) || isNull(el.ownerDocument.defaultView)) { return window }
    return el.ownerDocument.defaultView
}

export function getDocumentForElement(el: HTMLElement): Document {
    if (isNull(el.ownerDocument)) { return document }
    return el.ownerDocument
}

export function addClassStringToElement(el: HTMLElement, classStr: string) {
    el.classList.add(...classStr.split(' '))
}

export function removeClassStringFromElement(el: HTMLElement, classStr: string) {
    el.classList.remove(...classStr.split(' '))
}

export function generateClassStringQuery(classStr: string) {
    return `.${classStr.split(' ').join('.')}`
}