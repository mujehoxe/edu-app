import {createRealmContext} from '@realm/react';
import {Block, Topic, Unit} from './Schemas';

export const realmContext = createRealmContext({
  schema: [Unit, Block, Topic],
  schemaVersion: 3,
});
