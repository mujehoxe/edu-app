import Realm from 'realm';

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
  unit?: Unit;

  static schema: {
    name: 'Block';
    properties: {
      _id: 'objectId';
      name: 'string';
      unit: 'Unit';
    };
    primaryKey: '_id';
  };
}

export class Topic extends Realm.Object<Topic> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  block?: Block;

  static schema: {
    name: 'Topic';
    properties: {
      _id: 'objectId';
      block: 'Block';
      name: 'string';
    };
    primaryKey: '_id';
  };
}

export class Section extends Realm.Object<Section> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  type!: string;
  contentType!: string;
  thumbnailSrc?: string;
  deadline?: string;
  topic?: Topic;

  static schema: {
    name: 'Section';
    properties: {
      _id: 'objectId';
      name: 'string';
      type: 'string';
      contentType: 'string';
      thumbnailSrc: 'string?';
      deadline: 'string?';
      topic: 'Topic';
    };
    primaryKey: '_id';
  };
}
