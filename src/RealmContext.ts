import {createRealmContext} from '@realm/react';
import {Block, Section, Topic, Unit} from './Schemas';

export const realmContext = createRealmContext({
  schema: [Unit, Block, Topic, Section],
  schemaVersion: 7,
});
