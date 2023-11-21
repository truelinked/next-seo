import { Performer } from 'src/types';
export declare function setPerformer(performer?: Performer):
  | {
      '@type': 'Person' | 'PerformingGroup';
      name: string;
      url?: string | undefined;
    }
  | undefined;
