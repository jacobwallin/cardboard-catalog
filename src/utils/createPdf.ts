import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function createPdf(definitions: TDocumentDefinitions) {
  pdfMake.createPdf(definitions).download();
}
