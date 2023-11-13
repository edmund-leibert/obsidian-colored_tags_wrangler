// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {
    CachedMetadata, PluginSettingTab,
    TFile
} from "obsidian";
import ColoredTagWranglerPlugin
    from "../main";
import {file_is_folderNote, processTagColors}
    from "../lib/FolderNoteLogic";
import {v4 as uuid4}
    from "uuid";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class EventHandlerMetadataChange{
    plugin:ColoredTagWranglerPlugin;

    public constructor(plugin:ColoredTagWranglerPlugin,) {
        this.plugin = plugin;
    }

    public register(){
        this.plugin.registerEvent(
            this.plugin.app.metadataCache.on(
                "changed",
                async (file, __, cache: CachedMetadata) => {
                    if (this.plugin.settings.FolderNote.Enable && this.plugin.settings.FolderNote.EnableAutoDetect) {
                        await this.callback(file, cache)
                    }
                }
            ));
    }

    private async callback(file:TFile, cache: CachedMetadata):Promise<void>{
        const folder_path = file.path.replace(`/${file.name}`, "")
        const tags = cache.frontmatter?.tags as string[] | undefined;

        if (!file_is_folderNote(file) || tags === undefined){
            return
        }

        const links = Object
            .values(this.plugin.settings.FolderNote.FolderTagLinks)
            .filter(link=> link.folder_path !== folder_path); // exclude the current file, if it is in there somewhere

        this.plugin.settings.FolderNote.FolderTagLinks = {}; // reset the list

        links
            .concat(tags
                .map(tag=> tag.replace("#", ""))
                .filter(tag => processTagColors(this.plugin, tag))
                .map(tag => ({
                    tag_name: tag as string,
                    folder_path: folder_path
                }))
            )
            .sort((a, b) => a.folder_path.localeCompare(b.folder_path))
            .forEach(v => {
                this.plugin.settings.FolderNote.FolderTagLinks[uuid4()] = v
            })

        await this.plugin.saveSettings()

    }
}