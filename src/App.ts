import type { BasePair } from '@rnacanvas/draw.bases';

export interface App {
  drawDotBracket(seq: string, dotBracket: string): void;

  drawSchema<S>(schema: S): void;

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
}

type Nucleobase = InstanceType<typeof BasePair>['base1'];

interface SecondaryBond {
  readonly base1: Nucleobase;
  readonly base2: Nucleobase;

  setAttribute(name: string, value: string): void;
}
