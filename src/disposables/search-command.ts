import { commands, Range, window } from "vscode";
import { markdownService } from "../services/markdown.service";

const launchSearchCommand = async () => {
  const searchTerm = (await window.showInputBox({
    placeHolder: "Enter search term: ",
    validateInput: (text) =>
      !!text && text.length ? null : "Enter a valid alphanumeric term.",
  }))!;
  await markdownService.openMarkdownForTerm(searchTerm);
};

const searchCommand = async () => {
  const selection = window.activeTextEditor?.selection;
  let searchTerm: string;
  if (
    window.activeTextEditor &&
    selection &&
    selection.end.compareTo(selection.start) > 0
  ) {
    // If user is in an editor and has selected text, use it as the search term
    searchTerm = window.activeTextEditor.document.getText(
      new Range(selection.start, selection.end)
    );
    await markdownService.openMarkdownForTerm(searchTerm);
  } else if (
    window.activeTextEditor &&
    selection &&
    selection.end.compareTo(selection.start) == 0
  ) {
    const cursorPosition = selection.start;
    const wordRange =
      window.activeTextEditor.document.getWordRangeAtPosition(cursorPosition);
    if (wordRange) {
      searchTerm = window.activeTextEditor.document.getText(wordRange);
      await markdownService.openMarkdownForTerm(searchTerm);
    } else {
      await launchSearchCommand();
    }
  } else {
    await launchSearchCommand();
  }
};

export const searchDisposable = commands.registerCommand(
  "extension.launchSearch",
  searchCommand
);
