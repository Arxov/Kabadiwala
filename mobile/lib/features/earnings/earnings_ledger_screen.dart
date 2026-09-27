import 'package:flutter/material.dart';
import '../../core/services/tts_service.dart';

class TransactionItem {
  final String lotRef;
  final String category;
  final IconData icon;
  final Color color;
  final double weightKg;
  final double ratePerKg;
  final double totalAmount;
  final String paymentMode; // CASH, UPI, PENDING
  final String recyclerName;
  final String dateStr;
  final bool isSettled;

  const TransactionItem({
    required this.lotRef,
    required this.category,
    required this.icon,
    required this.color,
    required this.weightKg,
    required this.ratePerKg,
    required this.totalAmount,
    required this.paymentMode,
    required this.recyclerName,
    required this.dateStr,
    required this.isSettled,
  });
}

class EarningsLedgerScreen extends StatefulWidget {
  final String currentLang;
  const EarningsLedgerScreen({Key? key, required this.currentLang}) : super(key: key);

  @override
  State<EarningsLedgerScreen> createState() => _EarningsLedgerScreenState();
}

class _EarningsLedgerScreenState extends State<EarningsLedgerScreen> {
  final TtsService _tts = TtsService();
  String _selectedFilter = 'ALL';

  final List<TransactionItem> _transactions = const [
    TransactionItem(
      lotRef: "LOT-2026-MH-8921",
      category: "Circuit Boards (PCB)",
      icon: Icons.memory,
      color: Color(0xFF2563EB),
      weightKg: 24.8,
      ratePerKg: 220.0,
      totalAmount: 5456.0,
      paymentMode: "CASH",
      recyclerName: "EcoMetals CPCB Dismantler",
      dateStr: "27 Sep 2026, 11:30 AM",
      isSettled: true,
    ),
    TransactionItem(
      lotRef: "LOT-2026-MH-8710",
      category: "Copper Cables",
      icon: Icons.cable,
      color: Color(0xFF059669),
      weightKg: 15.2,
      ratePerKg: 480.0,
      totalAmount: 7296.0,
      paymentMode: "UPI",
      recyclerName: "Maharashtra GreenTech",
      dateStr: "25 Sep 2026, 04:15 PM",
      isSettled: true,
    ),
    TransactionItem(
      lotRef: "LOT-2026-MH-8642",
      category: "Li-ion Batteries",
      icon: Icons.battery_charging_full,
      color: Color(0xFFD97706),
      weightKg: 10.0,
      ratePerKg: 140.0,
      totalAmount: 1400.0,
      paymentMode: "CASH",
      recyclerName: "EcoMetals CPCB Dismantler",
      dateStr: "22 Sep 2026, 02:40 PM",
      isSettled: true,
    ),
    TransactionItem(
      lotRef: "LOT-2026-MH-8590",
      category: "CRT Monitors / TVs",
      icon: Icons.tv,
      color: Color(0xFF7C3AED),
      weightKg: 42.0,
      ratePerKg: 32.0,
      totalAmount: 1344.0,
      paymentMode: "PENDING",
      recyclerName: "Swachh Bharat Electronic Recyclers",
      dateStr: "20 Sep 2026, 10:00 AM",
      isSettled: false,
    ),
  ];

  double get _totalEarned => _transactions
      .where((t) => t.isSettled)
      .fold(0, (acc, t) => acc + t.totalAmount);

  double get _cashEarned => _transactions
      .where((t) => t.isSettled && t.paymentMode == "CASH")
      .fold(0, (acc, t) => acc + t.totalAmount);

  double get _pendingDues => _transactions
      .where((t) => !t.isSettled)
      .fold(0, (acc, t) => acc + t.totalAmount);

  void _speakTransaction(TransactionItem t) {
    String text;
    if (widget.currentLang == 'hi') {
      text = "${t.dateStr} को ${t.weightKg} किलो ${t.category} का कुल ₹${t.totalAmount.toInt()} " +
          (t.isSettled ? "${t.paymentMode} से प्राप्त हुआ।" : "का भुगतान बाकी है।");
    } else if (widget.currentLang == 'mr') {
      text = "${t.dateStr} रोजी ${t.weightKg} किलो ${t.category} चे एकूण ₹${t.totalAmount.toInt()} रुपये " +
          (t.isSettled ? "${t.paymentMode} द्वारे मिळाले." : "येणे बाकी आहे.");
    } else {
      text = "Transaction of ${t.weightKg} kg ${t.category} for ₹${t.totalAmount.toInt()} on ${t.dateStr}. " +
          (t.isSettled ? "Settled via ${t.paymentMode}." : "Payment pending.");
    }
    _tts.speak(text, langCode: widget.currentLang);
  }

  @override
  Widget build(BuildContext context) {
    final title = widget.currentLang == 'hi'
        ? 'कमाई का बहीखाता'
        : (widget.currentLang == 'mr' ? 'कमाईचा हिशोब' : 'Earnings Ledger');

    final filtered = _selectedFilter == 'ALL'
        ? _transactions
        : _transactions.where((t) => t.paymentMode == _selectedFilter).toList();

    return Scaffold(
      backgroundColor: const Color(0xFFF1F5F9),
      appBar: AppBar(
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: const Color(0xFF0F172A),
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          // Total Earnings Emerald Card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFF059669), Color(0xFF10B981)],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
              borderRadius: BorderRadius.circular(20),
              boxShadow: const [
                BoxShadow(color: Colors.black12, blurRadius: 10, offset: Offset(0, 4)),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      widget.currentLang == 'hi'
                          ? "कुल प्राप्त आय (औपचारिक)"
                          : (widget.currentLang == 'mr' ? "एकूण मिळालेली कमाई" : "Total Formal Earnings"),
                      style: const TextStyle(color: Colors.white70, fontSize: 14, fontWeight: FontWeight.w600),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.2),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: const Text(
                        "+79% vs दलाल",
                        style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.baseline,
                  textBaseline: TextBaseline.alphabetic,
                  children: [
                    const Text("₹", style: TextStyle(color: Colors.white70, fontSize: 28, fontWeight: FontWeight.bold)),
                    Text(
                      "${_totalEarned.toInt()}",
                      style: const TextStyle(color: Colors.white, fontSize: 44, fontWeight: FontWeight.w900),
                    ),
                    const SizedBox(width: 8),
                    const Text(".00", style: TextStyle(color: Colors.white70, fontSize: 20)),
                  ],
                ),
                const SizedBox(height: 8),
                Text(
                  widget.currentLang == 'hi'
                      ? "मध्यस्थों की तुलना में आपने ₹6,250 अधिक कमाए!"
                      : (widget.currentLang == 'mr'
                          ? "दलालांपेक्षा तुम्ही ₹६,२५० जास्त कमावले!"
                          : "You earned ₹6,250 more than local informal middlemen!"),
                  style: const TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w600),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Cash vs Pending KPI Strip
          Row(
            children: [
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(14),
                    boxShadow: const [BoxShadow(color: Colors.black12, blurRadius: 4, offset: Offset(0, 2))],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: const [
                          Icon(Icons.payments, color: Color(0xFF2563EB), size: 18),
                          SizedBox(width: 6),
                          Text("रोकड़ (Cash)", style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.grey)),
                        ],
                      ),
                      const SizedBox(height: 6),
                      Text(
                        "₹${_cashEarned.toInt()}",
                        style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: Color(0xFF2563EB)),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(14),
                    boxShadow: const [BoxShadow(color: Colors.black12, blurRadius: 4, offset: Offset(0, 2))],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: const [
                          Icon(Icons.pending_actions, color: Color(0xFFD97706), size: 18),
                          SizedBox(width: 6),
                          Text("बाकी (Pending)", style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.grey)),
                        ],
                      ),
                      const SizedBox(height: 6),
                      Text(
                        "₹${_pendingDues.toInt()}",
                        style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: Color(0xFFD97706)),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),

          // Filter Row
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                widget.currentLang == 'hi' ? "लेन-देन का इतिहास" : (widget.currentLang == 'mr' ? "व्यवहार इतिहास" : "Transaction History"),
                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
              ),
              DropdownButton<String>(
                value: _selectedFilter,
                underline: const SizedBox(),
                items: const [
                  DropdownMenuItem(value: 'ALL', child: Text("All")),
                  DropdownMenuItem(value: 'CASH', child: Text("Cash")),
                  DropdownMenuItem(value: 'UPI', child: Text("UPI")),
                  DropdownMenuItem(value: 'PENDING', child: Text("Pending")),
                ],
                onChanged: (val) {
                  if (val != null) setState(() => _selectedFilter = val);
                },
              ),
            ],
          ),
          const SizedBox(height: 10),

          // Transactions List
          ...filtered.map((item) {
            return Container(
              margin: const EdgeInsets.only(bottom: 12),
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                boxShadow: const [BoxShadow(color: Colors.black12, blurRadius: 4, offset: Offset(0, 2))],
              ),
              child: Column(
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      CircleAvatar(
                        backgroundColor: item.color.withOpacity(0.12),
                        radius: 22,
                        child: Icon(item.icon, color: item.color, size: 24),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              item.category,
                              style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              "${item.weightKg} kg × ₹${item.ratePerKg.toInt()}/kg",
                              style: TextStyle(fontSize: 13, color: Colors.grey[600]),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              item.recyclerName,
                              style: const TextStyle(fontSize: 11, color: Color(0xFF2563EB), fontWeight: FontWeight.w600),
                            ),
                          ],
                        ),
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          Text(
                            "₹${item.totalAmount.toInt()}",
                            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Color(0xFF0F172A)),
                          ),
                          const SizedBox(height: 4),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                            decoration: BoxDecoration(
                              color: item.isSettled ? const Color(0xFFECFDF5) : const Color(0xFFFFFBEB),
                              borderRadius: BorderRadius.circular(8),
                              border: Border.all(
                                color: item.isSettled ? const Color(0xFF10B981) : const Color(0xFFF59E0B),
                              ),
                            ),
                            child: Text(
                              item.paymentMode,
                              style: TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.bold,
                                color: item.isSettled ? const Color(0xFF059669) : const Color(0xFFD97706),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  const Divider(height: 18),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(item.dateStr, style: TextStyle(fontSize: 11, color: Colors.grey[500])),
                      TextButton.icon(
                        onPressed: () => _speakTransaction(item),
                        icon: const Icon(Icons.volume_up, size: 16),
                        label: Text(
                          widget.currentLang == 'hi' ? "सुनें" : (widget.currentLang == 'mr' ? "ऐका" : "Hear"),
                          style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                        ),
                        style: TextButton.styleFrom(
                          foregroundColor: const Color(0xFF059669),
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            );
          }).toList(),
        ],
      ),
    );
  }
}
