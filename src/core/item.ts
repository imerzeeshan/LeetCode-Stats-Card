import { Item as Base } from "./types";

export class Item implements Base {
    public type: string;
    public attr: Record<string, string[] | string | number>;
    public style: Record<string, string | number>;
    public single?: boolean;
    public children?: Item[];
    public content?: string;

    constructor({
        type = "g",
        attr = {},
        style = {},
        single = false,
        children = [],
        content = undefined,
    }: {
        type?: string;
        attr?: Record<string, string[] | string | number>;
        style?: Record<string, string | number>;
        single?: boolean;
        children?: Item[];
        content?: string;
    } = {}) {
        this.type = type;
        this.attr = attr;
        this.style = style;
        this.single = single;
        this.children = children;
        this.content = content;
    }

    public stringify(): string {
        if (!this.attr.id) {
            this.attr.id = `_${Math.random().toString(36).substring(2, 9)}`;
        }
        const attr = Object.entries(this.attr)
            .map(([key, value]) => `${key}="${Array.isArray(value) ? value.join(" ") : value}"`)
            .join(" ");
        const children = this.children?.map((child) => child.stringify()).join("") || "";
        return this.single
            ? `<${this.type} ${attr} />`
            : `<${this.type} ${attr}>${this.content || ""}${children}</${this.type}>`;
    }

    public css(): string {
        if (!this.attr.id) {
            this.attr.id = `_${Math.random().toString(36).substring(2, 9)}`;
        }

        if (Object.keys(this.style).length === 0) {
            return this.children?.map((child) => child.css()).join("") || "";
        }

        return `#${this.attr.id}{${Object.entries(this.style)
            .map(([key, value]) => `${key}:${value}`)
            .join(";")}} ${this.children?.map((child) => child.css()).join("") || ""}`;
    }
}

export const svg_attrs = {
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
};