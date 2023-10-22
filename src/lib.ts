// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {RGB}
    from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export const hexToRgb = (hexColor:string) : RGB => ({
    r: parseInt(hexColor.slice(1, 3), 16),
    g: parseInt(hexColor.slice(3, 5), 16),
    b: parseInt(hexColor.slice(5, 7), 16)
})
// ---------------------------------------------------------------------------------------------------------------------
export const rgbToHex = (rgb: RGB): string => {
    const toHex = (c: number) => c.toString(16).padStart(2, "0");
    return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
};
// ---------------------------------------------------------------------------------------------------------------------
export const removeById = (id:string) :void => {
	if (!id.startsWith("#")){
		throw new DOMException("id did not start with a '#' ")
	}
	const existingStyle = document.querySelector(id)
	if (existingStyle) {
		existingStyle.remove();
	}
}


