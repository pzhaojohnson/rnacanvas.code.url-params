import type { Nucleobase } from './Nucleobase';

import type { Outline } from './Outline';

export interface App<Schema> {
  drawDotBracket(seq: string, dotBracket: string): void;

  /**
   * Draws the structure specified by the provided CT string in the drawing of the app.
   *
   * A CT string could be the text contents of a CT file, for example.
   *
   * Throws if unable to parse the CT string.
   */
  drawCT(ctString: string): void | never;

  drawSchema(schema: Schema): void;

  drawing: {
    /**
     * Setting the padding of a drawing
     * ensures that it is big enough to encompass a drawn structure.
     */
    setPadding(padding: number): void;

    /**
     * All bases in the drawing.
     *
     * The ordering of bases in this iterable is the ordering of bases in the drawing.
     */
    readonly bases: Iterable<Nucleobase>;

    /**
     * Outlines the specified base and returns the outline that was added to the drawing.
     */
    outline(b: Nucleobase): Outline;

    /**
     * Numbers the specified base the specified number in the drawing.
     */
    number(b: Nucleobase, n: number): void;

    readonly secondaryBonds: Iterable<SecondaryBond>;
  }

  drawingView: {
    /**
     * Centers the user's view of the drawing on the drawn structure
     * and zooms out/in enough so that the user's view of the drawing closely fits the drawn structure.
     */
    fitToContent(): void;
  }

  /**
   * Includes things like the Toolbar and floating buttons.
   */
  peripheralUI: {
    hide(): void;
    show(): void;

    showMinimal(): void;
  }
}

interface SecondaryBond {
  readonly base1: Nucleobase;
  readonly base2: Nucleobase;

  setAttribute(name: string, value: string): void;
}
