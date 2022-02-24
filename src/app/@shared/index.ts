/*----------------------   PIPES   ----------------------*/
import {NameSplitPipe} from '@shared/pipes/name-split.pipe';
import {GetLengthPipe} from '@shared/pipes/get-length.pipe';
import {NotFoundComponent} from '@shared/components/not-found/not-found.component';
import {LayoutComponent} from '@shared/components/layout/layout.component';
import {NavbarComponent} from '@shared/components/navbar/navbar.component';
import {SubmitButtonComponent} from '@shared/components/form/submit-button/submit-button.component';
import {LoaderComponent} from '@shared/components/loader/loader.component';
import {NameFilterPipe} from '@shared/pipes/name-filter.pipe';
import {DialogueComponent} from '@shared/components/dialouge/dialogue.component';
import {GetStatusPipe} from '@shared/pipes/get-status.pipe';
import {IncludesPipe} from '@shared/pipes/includes.pipe';
import { TestComponent } from '@app/test/test.component';

export const pipes: any[] = [
  NameSplitPipe,
  GetLengthPipe,
  NameFilterPipe,
  GetStatusPipe,
  IncludesPipe
];


/*----------------------   Components   ----------------------*/
export const components: any[] = [
  NotFoundComponent,
  LayoutComponent,
  NavbarComponent,
  SubmitButtonComponent,
  LoaderComponent,
  DialogueComponent,
  TestComponent
];

