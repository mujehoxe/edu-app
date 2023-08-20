import Realm from 'realm';
import {SectionContentTypes} from './types';

export class Unit extends Realm.Object<Unit> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  number!: number;
  iconSrc?: string;

  static schema = {
    name: 'Unit',
    properties: {
      _id: 'objectId',
      name: 'string',
      number: 'int',
      iconSrc: 'string?',
    },
    primaryKey: '_id',
  };
}

export class Block extends Realm.Object<Block> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  order!: number;
  unit_id!: Realm.BSON.ObjectId;

  static schema = {
    name: 'Block',
    properties: {
      _id: 'objectId',
      name: 'string',
      order: 'int',
      unit_id: 'objectId',
    },
    primaryKey: '_id',
  };
}

export class Topic extends Realm.Object<Topic> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  order!: number;
  block_id!: Realm.BSON.ObjectId;

  static schema = {
    name: 'Topic',
    properties: {
      _id: 'objectId',
      name: 'string',
      order: 'int',
      block_id: 'objectId',
    },
    primaryKey: '_id',
  };
}

export class Section extends Realm.Object<Section> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  type?: string;
  contentType!: SectionContentTypes;
  src!: string;
  thumbnailSrc?: string;
  deadline?: Date;
  order!: number;
  topic_id!: Realm.BSON.ObjectId;

  static schema = {
    name: 'Section',
    properties: {
      _id: 'objectId',
      name: 'string',
      type: 'string?',
      contentType: 'string',
      src: 'string',
      thumbnailSrc: 'string?',
      deadline: 'date?',
      order: 'int',
      topic_id: 'objectId',
    },
    primaryKey: '_id',
  };
}
