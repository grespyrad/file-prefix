import { App, Plugin, TFile, Menu, Notice, normalizePath } from 'obsidian';

export default class FilePrefixPlugin extends Plugin {
    async onload() {
        // Add context menu item
        this.registerEvent(
            this.app.workspace.on("file-menu", (menu, file) => {
                if (file instanceof TFile) {
                    menu.addItem((item) => {
                        item
                            .setTitle("Prefix with creation date")
                            .setIcon("calendar")
                            .onClick(async () => {
                                await this.prefixFile(file);
                            });
                    });
                }
            })
        );

        // Add command palette command
        this.addCommand({
            id: "prefix-file",
            name: "Prefix current file with creation date",
            callback: async () => {
                const file = this.app.workspace.getActiveFile();
                if (file) {
                    await this.prefixFile(file);
                } else {
                    new Notice("No active file");
                }
            }
        });
    }

    private async prefixFile(file: TFile) {
        try {
            const stats = await this.app.vault.adapter.stat(file.path);
            if (!stats) {
                new Notice("Could not get file stats");
                return;
            }

            // Format the date as YYYYMMDDHHmm
            const date = new Date(stats.ctime);
            const prefix = date.getFullYear().toString() +
                (date.getMonth() + 1).toString().padStart(2, '0') +
                date.getDate().toString().padStart(2, '0') +
                date.getHours().toString().padStart(2, '0') +
                date.getMinutes().toString().padStart(2, '0');

            // Build the new filename with extension
            const extension = file.extension;
            const basename = file.basename;
            const newFilename = `${prefix} ${basename}.${extension}`;

            // Determine the current directory from file path
            const currentDir = file.path.substring(0, file.path.lastIndexOf("/"));
            const newPath = normalizePath(`${currentDir}/${newFilename}`);

            // Check if file with new name already exists
            if (await this.app.vault.adapter.exists(newPath)) {
                new Notice("A file with this prefix already exists");
                return;
            }

            // Rename the file
            await this.app.fileManager.renameFile(file, newPath);
            new Notice("File prefixed successfully");
        } catch (error) {
            console.error("Error prefixing file:", error);
            new Notice("Error prefixing file");
        }
    }
}