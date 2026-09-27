import 'package:flutter/material.dart';
// import 'package:mobile_scanner/mobile_scanner.dart'; // Uncomment after adding dependency
import 'package:dio/dio.dart';

class QRScannerScreen extends StatefulWidget {
  const QRScannerScreen({Key? key}) : super(key: key);

  @override
  State<QRScannerScreen> createState() => _QRScannerScreenState();
}

class _QRScannerScreenState extends State<QRScannerScreen> {
  bool isProcessing = false;

  Future<void> _processScannedQR(String qrData) async {
    if (isProcessing) return;
    setState(() => isProcessing = true);

    try {
      final dio = Dio();
      final response = await dio.post(
        'http://10.0.2.2:8000/api/v1/handover/scan-qr',
        data: {"qr_data": qrData},
      );
      
      if (response.statusCode == 200 && mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Handover verified successfully! \u2705'), backgroundColor: Colors.green),
        );
        Navigator.pop(context, true);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Invalid or Expired QR Code \u274c'), backgroundColor: Colors.red),
        );
      }
    } finally {
      if (mounted) {
        setState(() => isProcessing = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Scan Handover QR')),
      body: Stack(
        children: [
          /*
          MobileScanner(
            onDetect: (capture) {
              final List<Barcode> barcodes = capture.barcodes;
              for (final barcode in barcodes) {
                if (barcode.rawValue != null) {
                  _processScannedQR(barcode.rawValue!);
                  break;
                }
              }
            },
          ),
          */
          const Center(
            child: Text(
              "Camera Scanner Placeholder\n(Uncomment MobileScanner in code)",
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.grey),
            ),
          ),
          if (isProcessing)
            const Center(child: CircularProgressIndicator()),
          
          // Demo fallback button for emulator testing
          Positioned(
            bottom: 40,
            left: 20,
            right: 20,
            child: ElevatedButton(
              onPressed: () => _processScannedQR("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo_token.mock_signature"),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.green,
                padding: const EdgeInsets.symmetric(vertical: 16),
              ),
              child: const Text('Simulate Scan (For Emulator Demo)', style: TextStyle(fontSize: 16)),
            ),
          )
        ],
      ),
    );
  }
}
