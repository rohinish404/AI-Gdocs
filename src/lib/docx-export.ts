import { Document, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, BorderStyle, ImageRun } from "docx";
import { JSONContent } from "@tiptap/react";

export interface DocxExportOptions {
  title: string;
  content: JSONContent;
}

export async function convertToDocx({ title, content }: DocxExportOptions): Promise<Uint8Array> {
  const paragraphs = await convertContentToDocx(content);
  
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
  });

  // Use the Packer to generate docx
  const { Packer } = await import("docx");
  return await Packer.toBuffer(doc);
}

async function convertContentToDocx(content: JSONContent): Promise<(Paragraph | Table)[]> {
  const elements: (Paragraph | Table)[] = [];
  
  if (content.content) {
    for (const node of content.content) {
      const converted = await convertNode(node);
      if (converted) {
        if (Array.isArray(converted)) {
          elements.push(...converted);
        } else {
          elements.push(converted);
        }
      }
    }
  }
  
  // If no content, add an empty paragraph
  if (elements.length === 0) {
    elements.push(new Paragraph({}));
  }
  
  return elements;
}

async function convertNode(node: JSONContent): Promise<(Paragraph | Table) | (Paragraph | Table)[] | null> {
  switch (node.type) {
    case "paragraph":
      return convertParagraph(node);
      
    case "heading":
      return convertHeading(node);
      
    case "bulletList":
    case "orderedList":
      return convertList(node);
      
    case "listItem":
      return convertListItem(node);
      
    case "table":
      return await convertTable(node);
      
    case "taskList":
      return convertTaskList(node);
      
    case "taskItem":
      return convertTaskItem(node);
      
    default:
      // For unknown types, try to extract text content as a paragraph
      if (node.content) {
        const textRuns = await extractTextRuns(node.content);
        if (textRuns.length > 0) {
          return new Paragraph({
            children: textRuns,
          });
        }
      }
      return null;
  }
}

function convertParagraph(node: JSONContent): Paragraph {
  const textRuns = node.content ? extractTextRunsSync(node.content) : [];
  
  // Handle text alignment
  let alignment;
  if (node.attrs?.textAlign === "center") {
    alignment = "center" as const;
  } else if (node.attrs?.textAlign === "right") {
    alignment = "right" as const;
  } else if (node.attrs?.textAlign === "justify") {
    alignment = "distribute" as const;
  }
  
  return new Paragraph({
    children: textRuns,
    alignment,
  });
}

function convertHeading(node: JSONContent): Paragraph {
  const textRuns = node.content ? extractTextRunsSync(node.content) : [];
  const level = (node.attrs?.level || 1) as 1 | 2 | 3 | 4 | 5 | 6;
  
  let headingLevel: HeadingLevel;
  switch (level) {
    case 1: headingLevel = HeadingLevel.HEADING_1; break;
    case 2: headingLevel = HeadingLevel.HEADING_2; break;
    case 3: headingLevel = HeadingLevel.HEADING_3; break;
    case 4: headingLevel = HeadingLevel.HEADING_4; break;
    case 5: headingLevel = HeadingLevel.HEADING_5; break;
    case 6: headingLevel = HeadingLevel.HEADING_6; break;
    default: headingLevel = HeadingLevel.HEADING_1;
  }
  
  return new Paragraph({
    children: textRuns,
    heading: headingLevel,
  });
}

function convertList(node: JSONContent): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  
  if (node.content) {
    node.content.forEach((listItem, index) => {
      if (listItem.type === "listItem" && listItem.content) {
        listItem.content.forEach((itemContent) => {
          const textRuns = itemContent.content ? extractTextRunsSync(itemContent.content) : [];
          const bullet = node.type === "bulletList" ? "• " : `${index + 1}. `;
          
          paragraphs.push(new Paragraph({
            children: [
              new TextRun(bullet),
              ...textRuns,
            ],
          }));
        });
      }
    });
  }
  
  return paragraphs;
}

function convertListItem(node: JSONContent): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  
  if (node.content) {
    node.content.forEach((itemContent) => {
      const textRuns = itemContent.content ? extractTextRunsSync(itemContent.content) : [];
      paragraphs.push(new Paragraph({
        children: textRuns,
      }));
    });
  }
  
  return paragraphs;
}

async function convertTable(node: JSONContent): Promise<Table> {
  const rows: TableRow[] = [];
  
  if (node.content) {
    for (const row of node.content) {
      if (row.type === "tableRow" && row.content) {
        const cells: TableCell[] = [];
        
        for (const cell of row.content) {
          if ((cell.type === "tableCell" || cell.type === "tableHeader") && cell.content) {
            const cellParagraphs: Paragraph[] = [];
            
            for (const cellContent of cell.content) {
              const converted = await convertNode(cellContent);
              if (converted) {
                if (Array.isArray(converted)) {
                  cellParagraphs.push(...converted.filter(p => p instanceof Paragraph) as Paragraph[]);
                } else if (converted instanceof Paragraph) {
                  cellParagraphs.push(converted);
                }
              }
            }
            
            if (cellParagraphs.length === 0) {
              cellParagraphs.push(new Paragraph({}));
            }
            
            cells.push(new TableCell({
              children: cellParagraphs,
              borders: {
                top: { style: BorderStyle.SINGLE, size: 1 },
                bottom: { style: BorderStyle.SINGLE, size: 1 },
                left: { style: BorderStyle.SINGLE, size: 1 },
                right: { style: BorderStyle.SINGLE, size: 1 },
              },
            }));
          }
        }
        
        if (cells.length > 0) {
          rows.push(new TableRow({
            children: cells,
          }));
        }
      }
    }
  }
  
  return new Table({
    rows,
  });
}

function convertTaskList(node: JSONContent): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  
  if (node.content) {
    node.content.forEach((taskItem) => {
      if (taskItem.type === "taskItem") {
        const converted = convertTaskItem(taskItem);
        paragraphs.push(...converted);
      }
    });
  }
  
  return paragraphs;
}

function convertTaskItem(node: JSONContent): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  const checked = node.attrs?.checked || false;
  const checkbox = checked ? "☑ " : "☐ ";
  
  if (node.content) {
    node.content.forEach((itemContent) => {
      const textRuns = itemContent.content ? extractTextRunsSync(itemContent.content) : [];
      paragraphs.push(new Paragraph({
        children: [
          new TextRun(checkbox),
          ...textRuns,
        ],
      }));
    });
  }
  
  return paragraphs;
}

function extractTextRunsSync(content: JSONContent[]): TextRun[] {
  const runs: TextRun[] = [];
  
  for (const node of content) {
    if (node.type === "text" && node.text) {
      const marks = node.marks || [];
      
      const run = new TextRun({
        text: node.text,
        bold: marks.some(mark => mark.type === "bold"),
        italics: marks.some(mark => mark.type === "italic"),
        underline: marks.some(mark => mark.type === "underline") ? {} : undefined,
        strike: marks.some(mark => mark.type === "strike"),
        color: marks.find(mark => mark.type === "textStyle" && mark.attrs?.color)?.attrs?.color || undefined,
        highlight: marks.find(mark => mark.type === "highlight" && mark.attrs?.color)?.attrs?.color || undefined,
        size: marks.find(mark => mark.type === "textStyle" && mark.attrs?.fontSize)?.attrs?.fontSize || undefined,
      });
      
      runs.push(run);
    } else if (node.type === "hardBreak") {
      runs.push(new TextRun({
        text: "",
        break: 1,
      }));
    } else if (node.content) {
      // Recursively process nested content
      runs.push(...extractTextRunsSync(node.content));
    }
  }
  
  return runs;
}

async function extractTextRuns(content: JSONContent[]): Promise<TextRun[]> {
  return extractTextRunsSync(content);
}