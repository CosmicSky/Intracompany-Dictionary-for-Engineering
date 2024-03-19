import Fuse from "fuse.js";
import dictonary from "../data/dictionary.json";
import { DictionaryEntry } from "../models/dictionary.model";

class DictionaryService {
  dictionaryEntries: DictionaryEntry[] = dictonary.dictionaryEntries;
  fuse: Fuse<DictionaryEntry>;

  constructor() {
    this.fuse = new Fuse(this.dictionaryEntries, {
      keys: ["term", "synonyms"],
      includeScore: true,
      threshold: 0.4,
    });
  }

  searchTerm(searchTerm: string): DictionaryEntry | undefined {
    let topResult: Fuse.FuseResult<DictionaryEntry> | undefined = undefined;

    if (searchTerm.length >= 3) {
      const results = this.fuse.search(searchTerm);
      topResult = results.length ? results[0] : undefined;
      console.log(
        topResult
          ? `Term: ${searchTerm}. Top result: ${topResult?.item.term}. Score: ${topResult?.score}`
          : `No results for term: ${searchTerm}.`
      );
    }

    return topResult?.item;
  }
}

export const dictionaryService = new DictionaryService();
