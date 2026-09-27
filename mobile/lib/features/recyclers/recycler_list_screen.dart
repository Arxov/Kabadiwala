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
  final int matchScore;
  final List<String> matchReasonsEn;
  final List<String> matchReasonsHi;
  final List<String> matchReasonsMr;

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
    required this.matchScore,
    required this.matchReasonsEn,
    required this.matchReasonsHi,
    required this.matchReasonsMr,
  });

  List<String> getMatchReasons(String lang) {
    if (lang == 'hi') return matchReasonsHi;
    if (lang == 'mr') return matchReasonsMr;
    return matchReasonsEn;
  }
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
      matchScore: 96,
      matchReasonsEn: [
        'CPCB Govt Authorized (+30%)',
        '2.8km Nearby Proximity (+28%)',
        'Doorstep EV Pickup (+20%)',
        'Top Rate: ₹225/kg for PCB (+18%)',
      ],
      matchReasonsHi: [
        'CPCB सरकारी अधिकृत (+30%)',
        '2.8 किमी निकटता (+28%)',
        'डोरस्टेप पिकअप उपलब्ध (+20%)',
        'PCB का सर्वाधिक भाव (+18%)',
      ],
      matchReasonsMr: [
        'CPCB सरकारी अधिकृत (+30%)',
        '2.8 किमी जवळील अंतर (+28%)',
        'घरी मोफत पिकअप (+20%)',
        'PCB चा सर्वोच्च दर (+18%)',
      ],
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
      matchScore: 88,
      matchReasonsEn: [
        'MPCB State License (+30%)',
        '5.4km Distance (+20%)',
        'Large Batch Capacity (+20%)',
        'LCD/CRT Specialty (+18%)',
      ],
      matchReasonsHi: [
        'MPCB राज्य लाइसेंस (+30%)',
        '5.4 किमी दूरी (+20%)',
        'बड़ा बैच क्षमता (+20%)',
        'स्क्रीन/मॉनिटर विशेषज्ञ (+18%)',
      ],
      matchReasonsMr: [
        'MPCB राज्य परवाना (+30%)',
        '5.4 किमी अंतर (+20%)',
        'मोठी बॅच क्षमता (+20%)',
        'स्क्रीन/मॉनिटर स्पेशलिस्ट (+18%)',
      ],
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
      matchScore: 82,
      matchReasonsEn: [
        'CPCB EPR Registered (+30%)',
        'Premium Battery Rate (+25%)',
        'Copper Cable Specialist (+27%)',
      ],
      matchReasonsHi: [
        'CPCB EPR पंजीकृत (+30%)',
        'बैटरी का उच्च भाव (+25%)',
        'तांबे के तार विशेषज्ञ (+27%)',
      ],
      matchReasonsMr: [
        'CPCB EPR नोंदणीकृत (+30%)',
        'बॅटरीचा चांगला दर (+25%)',
        'तांबे तारांचे स्पेशलिस्ट (+27%)',
      ],
    ),
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

                  // Match Explainability Banner (Section 26 & 54 of Master Spec)
                  Container(
                    margin: const EdgeInsets.only(top: 8, bottom: 8),
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF0FDF4),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: const Color(0xFF86EFAC)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                              decoration: BoxDecoration(
                                color: const Color(0xFF059669),
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  const Icon(Icons.bolt, color: Colors.white, size: 14),
                                  const SizedBox(width: 2),
                                  Text(
                                    "${rec.matchScore}% Match",
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 12,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            const SizedBox(width: 8),
                            Text(
                              widget.currentLang == 'hi'
                                  ? "रीसाइक्लर क्यों चुना गया?"
                                  : (widget.currentLang == 'mr'
                                      ? "हा रीसायकलर का?"
                                      : "Why this recycler?"),
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 12,
                                color: Color(0xFF166534),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 6),
                        Wrap(
                          spacing: 6,
                          runSpacing: 4,
                          children: rec.getMatchReasons(widget.currentLang).map((reason) {
                            return Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(8),
                                border: Border.all(color: const Color(0xFFBBF7D0)),
                              ),
                              child: Text(
                                "✓ $reason",
                                style: const TextStyle(
                                  fontSize: 11,
                                  color: Color(0xFF15803D),
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            );
                          }).toList(),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 4),

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
