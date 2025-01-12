// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "src/style_manager/wranglers/StyleWrangler";
import {RGB}
	from "obsidian";
import ColoredTagWranglerPlugin
	from "src/main";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class StyleWranglerTagsCanvas extends StyleWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super("#styleTagsCanvasEl", plugin);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assemble_css_light(): Array<string> {
		return this.get_tags()
			.map(
				({tag_name, color, background_color,luminance_offset}) => {
					return this.assemble_css(
						"body.theme-light",
						tag_name,
						color,
						this.get_background_color(
							background_color,
							luminance_offset,
							true
						)
					)
				});
	}

	assemble_css_dark(): Array<string> {
		return this.get_tags()
			.map(
				({tag_name, color, background_color, luminance_offset}) => {
					return this.assemble_css(
						"body.theme-dark",
						tag_name,
						color,
						this.get_background_color(
							background_color,
							luminance_offset,
							false
						)
					)
				});
	}

	private assemble_css(theme:string, tag_name:string, color:RGB, background_color:RGB){
		const important:string = this.get_important();

		return`
${theme} div.canvas-node-container:has(div.markdown-embed-content a[href="#${tag_name}"]) {
	background : ${this.get_background_string(background_color)} ${important};
	border-color: rgb(${color.r}, ${color.g}, ${color.b}) ${important};
}`

	}
}
