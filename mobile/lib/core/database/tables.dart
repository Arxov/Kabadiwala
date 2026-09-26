import 'package:drift/drift.dart';

@DataClassName('Collector')
class Collectors extends Table {
  TextColumn get collectorId => text()();
  TextColumn get phoneHash => text()();
  TextColumn get preferredLang => text().withDefault(const Constant('hi'))();
  BoolColumn get isActive => boolean().withDefault(const Constant(true))();
  DateTimeColumn get createdAt => dateTime().nullable()();

  @override
  Set<Column> get primaryKey => {collectorId};
}

@DataClassName('MaterialLot')
class MaterialLots extends Table {
  TextColumn get lotId => text()();
  TextColumn get referenceCode => text()();
  TextColumn get category => text()();
  RealColumn get weightKg => real().nullable()();
  RealColumn get estValueMin => real().nullable()();
  RealColumn get estValueMax => real().nullable()();
  TextColumn get status => text().withDefault(const Constant('draft'))();
  DateTimeColumn get createdAt => dateTime().nullable()();
  DateTimeColumn get updatedAt => dateTime().nullable()();
  DateTimeColumn get syncedAt => dateTime().nullable()();

  @override
  Set<Column> get primaryKey => {lotId};
}

@DataClassName('PriceData')
class PriceDatas extends Table {
  TextColumn get priceId => text()();
  TextColumn get category => text()();
  RealColumn get buyingPrice => real().nullable()();
  RealColumn get sellingPrice => real().nullable()();
  DateTimeColumn get dateRecorded => dateTime()();

  @override
  Set<Column> get primaryKey => {priceId};
}

@DataClassName('SyncQueue')
class SyncQueues extends Table {
  TextColumn get queueId => text()();
  TextColumn get opType => text()();
  TextColumn get entityType => text()();
  TextColumn get entityId => text()();
  TextColumn get payload => text()();
  DateTimeColumn get clientTs => dateTime().nullable()();
  TextColumn get status => text().withDefault(const Constant('pending'))();

  @override
  Set<Column> get primaryKey => {queueId};
}
