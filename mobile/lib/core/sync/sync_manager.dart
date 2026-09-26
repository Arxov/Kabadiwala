import 'dart:convert';
import 'package:workmanager/workmanager.dart';
import 'package:dio/dio.dart';
import '../database/database.dart';

const syncTaskName = "syncOfflineQueue";

void callbackDispatcher() {
  Workmanager().executeTask((task, inputData) async {
    try {
      if (task == syncTaskName) {
        final db = AppDatabase();
        final queueItems = await db.select(db.syncQueues).get();
        
        if (queueItems.isEmpty) return true;

        final pendingOps = queueItems.map((item) => {
          "op": item.opType,
          "entity": item.entityType,
          "id": item.entityId,
          "payload": jsonDecode(item.payload),
          "client_ts": item.clientTs?.toIso8601String()
        }).toList();

        final payload = {
          "last_sync_ts": DateTime.now().subtract(const Duration(days: 1)).toIso8601String(), // stub
          "pending_ops": pendingOps
        };

        // Network call to backend
        final dio = Dio();
        final response = await dio.post(
          'https://api.ewasteconnect.in/api/v1/sync/push', 
          data: payload,
          options: Options(
            headers: {'Authorization': 'Bearer STUB_TOKEN'}, // Should come from secure storage
          )
        );

        if (response.statusCode == 200) {
          // Clear successful syncs
          for (var item in queueItems) {
             await (db.delete(db.syncQueues)..where((t) => t.queueId.equals(item.queueId))).go();
          }
          return true;
        }
      }
    } catch (err) {
      print("Sync failed: $err");
      return false; // Retry later (exponential backoff)
    }
    return true;
  });
}

class SyncManager {
  static void initialize() {
    Workmanager().initialize(
      callbackDispatcher,
      isInDebugMode: true 
    );
  }

  static void scheduleSync() {
    Workmanager().registerOneOffTask(
      "1", 
      syncTaskName,
      constraints: Constraints(
        networkType: NetworkType.connected,
      ),
      backoffPolicy: BackoffPolicy.exponential,
      backoffPolicyDelay: const Duration(seconds: 10)
    );
  }
}
