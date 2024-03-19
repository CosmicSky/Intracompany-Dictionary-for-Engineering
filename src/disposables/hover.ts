import {
  CancellationToken,
  Hover,
  languages,
  Position,
  TextDocument,
} from "vscode";
import { dictionaryService } from "../services/dictionary.service";

const hoverProvider = {
  provideHover(
    document: TextDocument,
    position: Position,
    _: CancellationToken
  ) {
    const wordRange = document.getWordRangeAtPosition(position);
    const word = document.getText(wordRange);
    let hoverText: string | undefined = undefined;

    // hoverText = `We were not able to find a relevant definition for the word: ${word} \n\n
    //   We recommend using a different method for searching this word at this time!\n
    //   - Team Sunny Side Downs`;

    // editor.action.addSelectionToNextFindMatch
    // what if keyword is short word that is in long word, like a function or a method?
    // example: EMV vs. EMVDevice, we still want to search for 'EMV'
    // getResultsFromTerm will return empty array if we don't get any
    // then we should still be able to function with returning word.
    const dictionaryEntry = dictionaryService.searchTerm(word);
    if (dictionaryEntry) {
      hoverText = `Term: ${dictionaryEntry.term}\n
      Definition: ${dictionaryEntry.definition}`;
    }
    if (hoverText) {
      return new Hover(hoverText);
    }
    // console.log("was not able to find " + word + " in the db");
  },
};

export const hoverDisposable = languages.registerHoverProvider(
  "typescript",
  hoverProvider
);
