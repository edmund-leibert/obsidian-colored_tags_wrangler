// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ISettings_v000}
    from "../old_setting_versions/ISettings_v000";
import {ISettings_v001}
    from "../old_setting_versions/ISettings_v001";
import {RGB}
    from "obsidian";
import {v4 as uuid4}
    from "uuid";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_0_to_1(loaded_data:ISettings_v000):ISettings_v001 {
    let original_colored_tags: Record<string, { r: number; g: number; b: number }> = loaded_data.TagColors.ColorPicker;
    let transformedColoredTags: Record<string, {tag_name:string, color:RGB}> = {};

    for (const key of Object.keys(original_colored_tags)) {
        const originalData = original_colored_tags[key];

        // Transform the data as needed
        // Store the transformed data in the new object
        transformedColoredTags[uuid4()] = {
            tag_name: key, // You can set the 'tag_name' as the key
            color:originalData
        };
    }

    // Return the updated data with the new structure
    let transformed_data = loaded_data as unknown as ISettings_v001;
    transformed_data.TagColors.ColorPicker = transformedColoredTags;
    transformed_data.Info.SettingsVersion = 1;
    return transformed_data;

}