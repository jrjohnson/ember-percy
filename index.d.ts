
interface QUnitAssert {
  test: {
    testName: string;
    module: {
      name: string;
    }
  }
}

interface MochaAssert {
  fullTitle(): string
}

interface SnapshotOptions {
  scope?: string;
  enableJavascript?: boolean,
  widths?: number[],
  minimumHeight?: number,
}

type SnapshotFunction = (
  name: string | QUnitAssert | MochaAssert,
  options?: SnapshotOptions
) => Promise<void>;

export const percySnapshot: SnapshotFunction;

declare global {
  const percySnapshot: SnapshotFunction;
}
