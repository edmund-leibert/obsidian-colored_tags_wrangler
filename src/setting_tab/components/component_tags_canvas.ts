// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {PluginSettingTab, Setting, SliderComponent, TextComponent}
	from "obsidian";
import ColoredTagWranglerPlugin
	from "src/main";
import {SettingsTabComponent}
	from "src/setting_tab/components/component";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ComponentTagsCanvas extends SettingsTabComponent {
	// -----------------------------------------------------------------------------------------------------------------
	// methods
	// -----------------------------------------------------------------------------------------------------------------
	public create_component(containerEL:HTMLElement): Setting {
		let setting = new Setting(containerEL)
			.setName("Apply tag color to canvas card")
			.setDesc(`
				Applies the tag color, of the tag within the canvas's card, to the background color of the canvas card. 
				Known issue: When a canvas card has multiple tags, the color of the canvas card is randomly chosen.
			`).addToggle(component => {
					component
						.setValue(this.plugin.settings.enableCanvas)
						.onChange(async state => {
							this.plugin.settings.enableCanvas = state;
							await this.plugin.saveSettings();
							this.settings_tab.display();
						})
				}
			);

		// Only show this setting when debug mode is enabled
		//		TODO maybe change this later
		let sliderElement: SliderComponent; // Little work around to make them update together
		let textElement: TextComponent;

		if (this.plugin.settings.enableDebugSettings) {
			setting
				.addSlider(component => {
					component
						.setLimits(0, .5, 0.05)
						.setDisabled(!this.plugin.settings.enableCanvas)
						.setValue(this.plugin.settings.CanvasCardBackgroundLuminanceOffset)
						.onChange(async state => {
							this.plugin.settings.CanvasCardBackgroundLuminanceOffset = state;
							await this.plugin.saveSettings();

							// Update the text component's value
							textElement.setValue(String(state));
						});
					sliderElement = component;
					}
				).addText((text) => {
					text
						.setDisabled(!this.plugin.settings.enableCanvas)
						.setValue(String(this.plugin.settings.CanvasCardBackgroundLuminanceOffset))
						.onChange(async state => {
							// Because this is a text component it needs to be cast to a number
							let state_as_number = Number(state)
							if (isNaN(state_as_number) || state_as_number === null){
								state_as_number = 0
							}

							this.plugin.settings.CanvasCardBackgroundLuminanceOffset = state_as_number;
							await this.plugin.saveSettings();

							sliderElement.setValue(state_as_number)
						});
					textElement = text;
				});
		}

		return setting
	}
}



