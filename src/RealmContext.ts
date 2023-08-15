import {createRealmContext} from '@realm/react';
import {Unit} from './Schemas';

export const realmContext = createRealmContext({
  schema: [Unit],
});
