import { commands, Uri } from "vscode";
import { dictionaryService } from "./dictionary.service";

class MarkdownService {
  renderMarkdownString(searchTerm: string) {
    const result = dictionaryService.searchTerm(searchTerm);
    if (result) {
      let header: string;
      let link: string;

      if (result.documentationUrl) {
        header = `# [${result.term}](${result.documentationUrl})`;
        link = `[Link to Confluence page](${result.documentationUrl})`;
      } else {
        header = `# ${result.term}`;
        link = "";
      }

      return `${header}
        \n\n\`\`\`Searched term: ${searchTerm}\`\`\`
        \n\n${result.definition}
        \n\n${link}
      `;
    }

    return `### No results!
      \n\n#### Would you like to [run a Confluence search?](https://confluence.ncr.com/dosearchsite.action?cql=siteSearch+~+%22${searchTerm}%22)`;
  }

  async openMarkdownForTerm(term: string) {
    const fileUri = Uri.parse(`md:${term}`);
    await commands.executeCommand("markdown.showPreviewToSide", fileUri);
  }
}

export const markdownService = new MarkdownService();
