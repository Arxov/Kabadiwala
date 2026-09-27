# System Audit & Patch Notes (Sept 2026)

This document outlines the critical bugs, security vulnerabilities, and architectural flaws identified and patched during the pre-launch system audit.

## 1. Security & Data Integrity
* **Fixed Mass Assignment Vulnerability:** Patched `backend/app/api/endpoints/collector.py` endpoints (`update_lot` and `sync_push`). Previously, the API blindly iterated over JSON payloads and used `setattr()`, allowing malicious clients to overwrite sensitive internal fields. Enforced an `allowed_fields` strict inclusion set.
* **Prevented Flutter Offline Data Loss:** Fixed a destructive sync bug in `mobile/lib/core/sync/sync_manager.dart`. The app previously deleted the entire local sync queue upon receiving a 200 OK from the server, even if the server rejected specific items within the batch. Modified the queue to parse `op_results` and only delete successfully synchronized records.

## 2. Architecture & Database
* **Fixed Fatal FastAPI CORS Crash:** Resolved an `AssertionError` that prevented the backend from starting. FastAPI strictly forbids using `allow_origins=["*"]` alongside `allow_credentials=True`. Updated `backend/app/main.py` to explicitly list localhost/Vite origins.
* **Resolved Database Dialect Mismatch:** The `backend/app/db/session.py` was hardcoded to `sqlite:///./ewaste.db`, which would crash when SQLAlchemy attempted to compile PostgreSQL-specific `UUID` and `JSON` types. Re-wired the session to dynamically pull `postgresql://` credentials from `config.py`.
* **Restored Referential Integrity:** Added missing `ForeignKey` constraints to `TraceabilityEvent.txn_id` and `SyncQueue.collector_id` in `models/all.py` to prevent orphaned rows and guarantee CPCB traceability compliance.

## 3. Performance & Sync
* **Prevented Payload OOM Bombs:** The `GET /sync` endpoint blindly returned `.all()` records. Added `isoparse(since)` filtering and `.limit(100)` chunking to prevent out-of-memory crashes on low-end collector mobile devices.
* **Fixed PriceData Sync Fallback:** The sync logic attempted to filter `PriceData` by `updated_at`, which doesn't exist on that specific model, causing a silent failure that returned the entire price board every time. Implemented a fallback to `created_at`.

## 4. UI & UX (Flutter & React)
* **Resolved Flutter "Wingdings" Font Bug:** Removed an invalid `fontFamily: 'AppIcons'` override in `mobile/lib/main.dart` that caused all app text to render as unreadable icon symbols.
* **Fixed RenderFlex Overflows:** Wrapped the rigid `Column` in `mobile/lib/features/home/home_screen.dart` in a `ListView` to ensure scrollability and prevent UI overflow crashes on smaller Android screens.
* **Fixed React Encoding Corruption:** Replaced broken copy-paste artifacts (`Value (,1)` and `?"`) in `recycler-portal/src/app/admin/page.tsx` with proper `Value (₹)` strings without corrupting the underlying TypeScript data structures.
