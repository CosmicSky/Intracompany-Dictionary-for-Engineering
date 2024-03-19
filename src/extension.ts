import { ExtensionContext } from "vscode";
import { hoverDisposable } from "./disposables/hover";
import { markdownDisposable } from "./disposables/markdown";
import { searchDisposable } from "./disposables/search-command";

// Run after the editor starts up
export function activate(context: ExtensionContext) {
  const disposables = [hoverDisposable, searchDisposable, markdownDisposable];

  context.subscriptions.push(...disposables);
}
