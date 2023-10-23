// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "./style_wrangler";
import ColoredTagWranglerPlugin from "../main";
import {RGB} from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class StyleWranglerKanbanTitles extends StyleWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super("#styleKanbanTitlesEl", plugin)
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assemble_css(): string {
		return Object.keys(this.plugin.settings?.customTagColors)
			.map(tagName => {
				const color: RGB = this.plugin.settings.customTagColors[tagName];
				// noinspection CssInvalidFunction,CssUnusedSymbol
				return `
					div.kanban-plugin__lane:has(div.kanban-plugin__lane-title-text a[href="#${tagName.toLowerCase()}"]){
						background : rgba(${color.r}, ${color.g}, ${color.b}, 0.2) !important;
						border-color: rgba(${color.r}, ${color.g}, ${color.b}, 0.3) !important;
					}
					div.kanban-plugin__lane-header-wrapper:has(div.kanban-plugin__lane-title-text a[href="#${tagName.toLowerCase()}"]){
						border-color: rgba(${color.r}, ${color.g}, ${color.b}, 0.3) !important;
					}
				`;
			}).join('\n');
	}
}