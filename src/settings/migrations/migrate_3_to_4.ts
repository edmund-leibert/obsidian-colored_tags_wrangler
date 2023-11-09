// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagWranglerSettings} from "../DefaultSettings";
import {ISettings_v003} from "../old_setting_versions/ISettings_v003";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_3_to_4(loaded_data:ISettings_v003):IColoredTagWranglerSettings {
    let transformed_data = loaded_data as unknown as IColoredTagWranglerSettings;
    transformed_data.Info.SettingsVersion = 4;
    transformed_data.TagColors = {
        ColorPicker:loaded_data.TagColors.ColorPicker,
        EnableMultipleTags:loaded_data.TagColors.EnableMultipleTags,
        Values:loaded_data.TagColors.Values
    }
    return transformed_data as unknown as IColoredTagWranglerSettings;

}