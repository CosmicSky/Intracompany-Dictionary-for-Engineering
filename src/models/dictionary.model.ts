export interface DictionaryEntry {
  id: string;
  term: string;
  synonyms?: string[];
  definition: string;
  documentationUrl?: string;
}
