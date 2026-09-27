import 'package:flutter/material.dart';

class RecyclerListScreen extends StatefulWidget {
  final String currentLang;
  const RecyclerListScreen({Key? key, required this.currentLang}) : super(key: key);

  @override
  State<RecyclerListScreen> createState() => _RecyclerListScreenState();
}

class RecyclerProfile {
  final String id;
  final String name;
  final String authNumber;
  final String authority;
  final double distanceKm;
  final double rating;
  final bool pickupAvailable;
  final double pickupMinKg;
  final String contactPhone;
  final String locationAddress;
  final Map<String, double> rates;

  const RecyclerProfile({
    required this.id,
    required this.name,
    required this.authNumber,
    required this.authority,
    required this.distanceKm,
    required this.rating,
    required this.pickupAvailable,
    required this.pickupMinKg,
    required this.contactPhone,
    required this.locationAddress,
    required this.rates,
  });
}

class _RecyclerListScreenState extends State<RecyclerListScreen> {
  String _selectedMaterialFilter = 'ALL';

  final List<RecyclerProfile> _recyclers = const [
    RecyclerProfile(
      id: 'rec-cpcb-01',
      name: 'EcoMetals CPCB E-Waste Dismantling Hub',
      authNumber: 'CPCB-REG-2022-MH-892',
      authority: 'Central Pollution Control Board',
      distanceKm: 2.8,
      rating: 4.9,
      pickupAvailable: true,
      pickupMinKg: 20.0,
      contactPhone: '+919822012345',
      locationAddress: 'Plot 42, Bhosari MIDC, Pune',
      rates: {
        'PCB': 225.0,
        'Cables': 485.0,
        'Batteries': 145.0,
        'Motors': 110.0,
      },
    ),
    RecyclerProfile(
      id: 'rec-cpcb-02',
      name: 'Maharashtra GreenTech Urban Miners',
      authNumber: 'MPCB-DISM-2023-PUN-041',
      authority: 'Maharashtra Pollution Control Board',
      distanceKm: 5.4,
      rating: 4.8,
      pickupAvailable: true,
      pickupMinKg: 30.0,
      contactPhone: '+919822098765',
      locationAddress: 'Sector 10, Chakan Industrial Area, Pune',
      rates: {
        'CRT': 34.0,
        'LCD': 82.0,
        'Plastics': 26.0,
        'PCB': 218.0,
      },
    ),
    RecyclerProfile(
      id: 'rec-cpcb-03',
      name: 'Swachh Bharat Electronic Recyclers Ltd.',
      authNumber: 'CPCB-EPR-2024-MH-119',
      authority: 'Central Pollution Control Board',
      distanceKm: 8.1,
      rating: 4.7,
      pickupAvailable: false,
      pickupMinKg: 50.0,
      contactPhone: '+919822033445',
      locationAddress: 'Dhadge Industrial Estate, Hadapsar, Pune',
      rates: {
        'Cables': 490.0,
        'Motors': 115.0,
        'Batteries': 150.0,
      },
    ),
  ];

  void _triggerCall(String phone) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Row(
          children: const [
            Icon(Icons.phone_forwarded, color: Color(0xFF059669)),
            SizedBox(width: 8),
            Text("रीसाइक्लर को कॉल करें"),
          ],
        ),
        content: Text("सीधे संपर्क नंबर: $phone पर कॉल लगाया जा रहा है।"),
        actions: [
          TextButton(onPressed: () => Navigator.of(ctx).pop(), child: const Text("रद्द करें")),
          ElevatedButton(
            onPressed: () {
              Navigator.of(ctx).pop();
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: Text("Calling $phone...")),
              );
            },
            style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF059669), foregroundColor: Colors.white),
            child: const Text("कॉल करें"),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final title = widget.currentLang == 'hi'
        ? 'अधिकृत रीसाइक्लर'
        : (widget.currentLang == 'mr' ? 'अधिकृत रीसायकलर्स' : 'Authorized Recyclers');

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
          // Filter Chips
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: ['ALL', 'PCB', 'Cables', 'Batteries', 'CRT', 'LCD'].map((cat) {
                final isSelected = _selectedMaterialFilter == cat;
                return Padding(
                  padding: const EdgeInsets.only(right: 8.0),
                  child: FilterChip(
                    label: Text(cat == 'ALL' ? (widget.currentLang == 'hi' ? 'सभी' : (widget.currentLang == 'mr' ? 'सर्व' : 'All')) : cat),
                    selected: isSelected,
                    selectedColor: const Color(0xFF0F172A),
                    labelStyle: TextStyle(
                      color: isSelected ? Colors.white : const Color(0xFF0F172A),
                      fontWeight: FontWeight.bold,
                    ),
                    backgroundColor: Colors.white,
                    onSelected: (val) {
                      setState(() => _selectedMaterialFilter = cat);
                    },
                  ),
                );
              }).toList(),
            ),
          ),
          const SizedBox(height: 16),

          // Recycler Cards
          ..._recyclers.map((rec) {
            return Container(
              margin: const EdgeInsets.only(bottom: 16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                boxShadow: const [
                  BoxShadow(color: Colors.black12, blurRadius: 6, offset: Offset(0, 2)),
                ],
              ),
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Title + Distance Badge
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Text(
                          rec.name,
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF0F172A),
                          ),
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: const Color(0xFFECFDF5),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: const Color(0xFF10B981)),
                        ),
                        child: Text(
                          "${rec.distanceKm} km",
                          style: const TextStyle(
                            color: Color(0xFF059669),
                            fontWeight: FontWeight.bold,
                            fontSize: 13,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),

                  // CPCB Badge
                  Row(
                    children: [
                      const Icon(Icons.verified, color: Color(0xFF2563EB), size: 16),
                      const SizedBox(width: 4),
                      Text(
                        rec.authNumber,
                        style: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF2563EB),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text("(${rec.authority})", style: TextStyle(fontSize: 11, color: Colors.grey[600])),
                    ],
                  ),
                  const SizedBox(height: 10),

                  // Rates Offered Strip
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF8FAFC),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: rec.rates.entries.map((e) {
                        return Column(
                          children: [
                            Text(e.key, style: TextStyle(fontSize: 11, color: Colors.grey[700])),
                            const SizedBox(height: 2),
                            Text(
                              "₹${e.value.toInt()}/kg",
                              style: const TextStyle(
                                fontSize: 13,
                                fontWeight: FontWeight.bold,
                                color: Color(0xFF059669),
                              ),
                            ),
                          ],
                        );
                      }).toList(),
                    ),
                  ),
                  const SizedBox(height: 12),

                  // Pickup & Contact Row
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Icon(
                            rec.pickupAvailable ? Icons.local_shipping : Icons.store,
                            color: rec.pickupAvailable ? const Color(0xFF059669) : Colors.grey,
                            size: 18,
                          ),
                          const SizedBox(width: 6),
                          Text(
                            rec.pickupAvailable
                                ? (widget.currentLang == 'hi'
                                    ? "घर पहुंच पिकअप (न्यूनतम ${rec.pickupMinKg.toInt()} किलो)"
                                    : (widget.currentLang == 'mr'
                                        ? "मोफत पिकअप (किमान ${rec.pickupMinKg.toInt()} किलो)"
                                        : "Free Pickup (Min ${rec.pickupMinKg.toInt()}kg)"))
                                : "Drop-off Only",
                            style: TextStyle(
                              fontSize: 12,
                              color: rec.pickupAvailable ? const Color(0xFF059669) : Colors.grey[700],
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
                      ElevatedButton.icon(
                        onPressed: () => _triggerCall(rec.contactPhone),
                        icon: const Icon(Icons.call, size: 16),
                        label: Text(
                          widget.currentLang == 'hi' ? "कॉल करें" : (widget.currentLang == 'mr' ? "कॉल करा" : "Call"),
                          style: const TextStyle(fontWeight: FontWeight.bold),
                        ),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF059669),
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
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
