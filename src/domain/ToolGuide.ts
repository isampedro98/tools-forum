export class ToolGuide {
  readonly title: string;
  readonly content: string[];
  readonly code?: { language: string; snippet: string };

  constructor(data: {
    title: string;
    content: string[];
    code?: { language: string; snippet: string };
  }) {
    this.title = data.title;
    this.content = data.content;
    this.code = data.code;
  }
}
