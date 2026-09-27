import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'dart:convert';
import '../../core/services/tts_service.dart';

class HandoverQrScreen extends StatefulWidget {
  final String currentLang;
  final String lotRef;
  final String category;
  final double weightKg;
  final double estimatedValue;

  const HandoverQrScreen({
    Key? key,
    required this.currentLang,
    this.lotRef = "LOT-2026-MH-8921",
    this.category = "Printed Circuit Boards (PCB)",
    this.weightKg = 24.5,
    this.estimatedValue = 5390,
  }) : super(key: key);

  @override
  State<HandoverQrScreen> createState() => _HandoverQrScreenState();
}

class _HandoverQrScreenState extends State<HandoverQrScreen> {
  final TtsService _tts = TtsService();
  int _confirmationStep = 1; // 1: QR Ready, 2: Scanned, 3: Weighed, 4: Settled
  double _scaleWeightKg = 24.8;
  double _finalPayoutInr = 5450;
  String _paymentMethod = "CASH";

  String get _qrPayload {
    final payload = {
      "ref": widget.lotRef,
      "collector_id": "c-pun-0042",
      "collector_name": "Ramesh Shinde",
      "category": widget.category,
      "weight_kg": widget.weightKg,
      "est_val": widget.estimatedValue,
      "timestamp": DateTime.now().millisecondsSinceEpoch,
      "gps": {"lat": 18.5204, "lng": 73.8567, "acc": 4.5},
      "sig": "hmac_sha256_verified_token_cpcb",
    };
    return jsonEncode(payload);
  }

  void _advanceSimulation() {
    setState(() {
      if (_confirmationStep < 4) {
        _confirmationStep++;
      } else {
        _confirmationStep = 1;
      }
    });

    if (_confirmationStep == 4) {
      final msg = widget.currentLang == 'hi'
          ? "बधाई हो! ₹5,450 का नकद भुगतान प्राप्त हुआ और लॉट CPCB को ट्रांसफर हो गया।"
          : (widget.currentLang == 'mr'
              ? "अभिनंदन! ₹५,४५० रोख रक्कम मिळाली आणि लॉट यशस्वीरीत्या हस्तांतरित झाला."
              : "Congratulations! ₹5,450 payment received and lot transferred to authorized recycler.");
      _tts.speak(msg, langCode: widget.currentLang);
    }
  }

  @override
  Widget build(BuildContext context) {
    final title = widget.currentLang == 'hi'
        ? 'डिजिटल हैंडओवर क्यूआर'
        : (widget.currentLang == 'mr' ? 'हस्तांतरण क्यूआर कोड' : 'Digital Handover QR');

    return Scaffold(
      backgroundColor: const Color(0xFFF1F5F9),
      appBar: AppBar(
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: const Color(0xFF0F172A),
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Instructions Banner
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: const Color(0xFFEFF6FF),
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: const Color(0xFF3B82F6).withOpacity(0.5)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.info, color: Color(0xFF2563EB)),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      widget.currentLang == 'hi'
                          ? "माल देते समय अधिकृत रीसाइक्लर को यह क्यूआर कोड स्कैन कराएं।"
                          : (widget.currentLang == 'mr'
                              ? "माल देताना अधिकृत रीसायकलरला हा क्यूआर कोड स्कॅन करू द्या."
                              : "Show this dynamic QR code to the authorized recycler at pickup."),
                      style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: Color(0xFF1E3A8A)),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // QR Code Container
            Center(
              child: Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(24),
                  boxShadow: const [
                    BoxShadow(color: Colors.black12, blurRadius: 15, offset: Offset(0, 5)),
                  ],
                ),
                child: Column(
                  children: [
                    QrImageView(
                      data: _qrPayload,
                      version: QrVersions.auto,
                      size: 220.0,
                      foregroundColor: const Color(0xFF0F172A),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      widget.lotRef,
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w900,
                        letterSpacing: 1.2,
                        color: Color(0xFF0F172A),
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      "${widget.category} • ${widget.weightKg} kg",
                      style: TextStyle(fontSize: 14, color: Colors.grey[700], fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 20),

            // 4-Stage Dual Handover Stepper
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                boxShadow: const [
                  BoxShadow(color: Colors.black12, blurRadius: 6, offset: Offset(0, 2)),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    widget.currentLang == 'hi' ? "हैंडओवर स्थिति" : (widget.currentLang == 'mr' ? "हस्तांतरण स्थिती" : "Handover Status"),
                    style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                  ),
                  const SizedBox(height: 12),
                  _buildStatusStep(
                    stepNum: 1,
                    title: widget.currentLang == 'hi' ? "लॉट तैयार और हस्ताक्षरित" : "Lot Created & Signed",
                    subtitle: "GPS: 18.5204° N, 73.8567° E",
                    isDone: _confirmationStep >= 1,
                  ),
                  _buildStatusStep(
                    stepNum: 2,
                    title: widget.currentLang == 'hi' ? "रीसाइक्लर ने स्कैन किया" : "Recycler Scanned QR",
                    subtitle: _confirmationStep >= 2 ? "GPS Match Verified (<42m)" : "Waiting for scan...",
                    isDone: _confirmationStep >= 2,
                  ),
                  _buildStatusStep(
                    stepNum: 3,
                    title: widget.currentLang == 'hi' ? "कांटा वजन सत्यापित" : "Scale Weight Confirmed",
                    subtitle: _confirmationStep >= 3 ? "Actual: $_scaleWeightKg kg (variance +1.2%)" : "Pending scale check",
                    isDone: _confirmationStep >= 3,
                  ),
                  _buildStatusStep(
                    stepNum: 4,
                    title: widget.currentLang == 'hi' ? "भुगतान संपन्न (₹$_finalPayoutInr)" : "Payment Settled (₹$_finalPayoutInr)",
                    subtitle: _confirmationStep >= 4 ? "Mode: $_paymentMethod - CPCB EPR Registered" : "Pending payout",
                    isDone: _confirmationStep >= 4,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Demo Simulation Button
            ElevatedButton.icon(
              onPressed: _advanceSimulation,
              icon: Icon(_confirmationStep == 4 ? Icons.refresh : Icons.play_arrow),
              label: Text(
                _confirmationStep == 4
                    ? (widget.currentLang == 'hi' ? "नया टेस्ट शुरू करें" : "Reset Test")
                    : (widget.currentLang == 'hi'
                        ? "अगला चरण सिम्युलेट करें (कदम $_confirmationStep/4)"
                        : "Simulate Next Handover Step (Step $_confirmationStep/4)"),
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
              ),
              style: ElevatedButton.styleFrom(
                backgroundColor: _confirmationStep == 4 ? const Color(0xFF059669) : const Color(0xFF2563EB),
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 14),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatusStep({
    required int stepNum,
    required String title,
    required String subtitle,
    required bool isDone,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12.0),
      child: Row(
        children: [
          CircleAvatar(
            radius: 14,
            backgroundColor: isDone ? const Color(0xFF059669) : Colors.grey.shade300,
            child: isDone
                ? const Icon(Icons.check, size: 16, color: Colors.white)
                : Text("$stepNum", style: const TextStyle(fontSize: 12, color: Colors.black54)),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 14,
                    color: isDone ? const Color(0xFF0F172A) : Colors.grey,
                  ),
                ),
                Text(
                  subtitle,
                  style: TextStyle(
                    fontSize: 12,
                    color: isDone ? const Color(0xFF059669) : Colors.grey,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
