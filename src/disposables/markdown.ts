import { TextDocumentContentProvider, Uri, workspace } from "vscode";
import { markdownService } from "../services/markdown.service";

class MarkdownUriProvider implements TextDocumentContentProvider {
  provideTextDocumentContent = (uri: Uri) =>
    markdownService.renderMarkdownString(uri.path);
}

export const markdownDisposable = workspace.registerTextDocumentContentProvider(
  "md",
  new MarkdownUriProvider()
);
