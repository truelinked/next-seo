import { Performer } from 'src/types';
export declare function setPerformer(performer?: Performer):
  | {
      '@type': 'Person' | 'PerformingGroup';
      name: string;
      sameAs?: string | undefined;
    }
  | undefined;
