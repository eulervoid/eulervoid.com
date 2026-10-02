import type { CursorPosition, CursorTarget } from "./types";

export function isElementInViewport(el: HTMLElement): boolean {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        rect.left < window.innerWidth &&
        rect.right > 0
    );
}

export function isElementInDOM(el: HTMLElement): boolean {
    return document.body.contains(el);
}

export function getElementCenter(el: HTMLElement): CursorPosition {
    const rect = el.getBoundingClientRect();
    return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
    };
}

export function resolveTargetPosition(target: CursorTarget): CursorPosition | null {
    if (target.type === "position") {
        return target.position;
    }

    if (!isElementInDOM(target.element) || !isElementInViewport(target.element)) {
        return null;
    }

    return getElementCenter(target.element);
}

export function hasArrived(
    current: CursorPosition,
    target: CursorPosition,
    threshold = 3,
): boolean {
    const dx = current.x - target.x;
    const dy = current.y - target.y;
    return Math.sqrt(dx * dx + dy * dy) < threshold;
}
