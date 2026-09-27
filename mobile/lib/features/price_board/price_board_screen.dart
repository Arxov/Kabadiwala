import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import '../../core/services/tts_service.dart';

class PriceBoardScreen extends StatefulWidget {
  final String currentLang;
  const PriceBoardScreen({Key? key, required this.currentLang}) : super(key: key);

  @override
  State<PriceBoardScreen> createState() => _PriceBoardScreenState();
}

class ScrapItem {
  final String id;
  final String nameEn;
  final String nameHi;
  final String nameMr;
  final IconData icon;
  final Color color;
  final double currentPrice;
  final double minPrice;
  final double maxPrice;
  final double change24h;
  final List<FlSpot> trendSpots;

  const ScrapItem({
    required this.id,
    required this.nameEn,
    required this.nameHi,
    required this.nameMr,
    required this.icon,
    required this.color,
    required this.currentPrice,
    required this.minPrice,
    required this.maxPrice,
    required this.change24h,
    required this.trendSpots,
  });

  String getName(String lang) {
    if (lang == 'hi') return nameHi;
    if (lang == 'mr') return nameMr;
    return nameEn;
  }
}

class _PriceBoardScreenState extends State<PriceBoardScreen> {
  final TtsService _tts = TtsService();
  late ScrapItem _selectedItem;

  final List<ScrapItem> _items = const [
    ScrapItem(
      id: 'pcb',
      nameEn: 'Circuit Boards (PCB)',
      nameHi: 'सर्किट बोर्ड (PCB)',
      nameMr: 'सर्किट बोर्ड (PCB)',
      icon: Icons.memory,
      color: Color(0xFF2563EB),
      currentPrice: 220.0,
      minPrice: 185.0,
      maxPrice: 260.0,
      change24h: 12.0,
      trendSpots: [
        FlSpot(0, 195),
        FlSpot(1, 202),
        FlSpot(2, 208),
        FlSpot(3, 215),
        FlSpot(4, 220),
      ],
    ),
    ScrapItem(
      id: 'cables',
      nameEn: 'Copper Cables',
      nameHi: 'तांबे के तार / केबल',
      nameMr: 'तांब्याच्या तारा / केबल्स',
      icon: Icons.cable,
      color: Color(0xFF059669),
      currentPrice: 480.0,
      minPrice: 440.0,
      maxPrice: 520.0,
      change24h: 25.0,
      trendSpots: [
        FlSpot(0, 430),
        FlSpot(1, 445),
        FlSpot(2, 460),
        FlSpot(3, 472),
        FlSpot(4, 480),
      ],
    ),
    ScrapItem(
      id: 'batteries',
      nameEn: 'Li-ion Batteries',
      nameHi: 'लिथियम बैटरी',
      nameMr: 'लिथियम बॅटरी',
      icon: Icons.battery_charging_full,
      color: Color(0xFFD97706),
      currentPrice: 140.0,
      minPrice: 115.0,
      maxPrice: 165.0,
      change24h: -5.0,
      trendSpots: [
        FlSpot(0, 148),
        FlSpot(1, 145),
        FlSpot(2, 142),
        FlSpot(3, 139),
        FlSpot(4, 140),
      ],
    ),
    ScrapItem(
      id: 'crt',
      nameEn: 'CRT Monitors / TVs',
      nameHi: 'सीआरटी टीवी / मॉनिटर',
      nameMr: 'सीआरटी टीव्ही / मॉनिटर',
      icon: Icons.tv,
      color: Color(0xFF7C3AED),
      currentPrice: 32.0,
      minPrice: 25.0,
      maxPrice: 38.0,
      change24h: 2.0,
      trendSpots: [
        FlSpot(0, 28),
        FlSpot(1, 30),
        FlSpot(2, 29),
        FlSpot(3, 31),
        FlSpot(4, 32),
      ],
    ),
    ScrapItem(
      id: 'lcd',
      nameEn: 'LCD / LED Screens',
      nameHi: 'एलसीडी / एलईडी स्क्रीन',
      nameMr: 'एलसीडी / एलईडी स्क्रीन',
      icon: Icons.desktop_windows,
      color: Color(0xFF0284C7),
      currentPrice: 78.0,
      minPrice: 65.0,
      maxPrice: 92.0,
      change24h: 4.0,
      trendSpots: [
        FlSpot(0, 72),
        FlSpot(1, 74),
        FlSpot(2, 75),
        FlSpot(3, 77),
        FlSpot(4, 78),
      ],
    ),
    ScrapItem(
      id: 'motors',
      nameEn: 'Motors & Alternators',
      nameHi: 'मोटर और ट्रांसफॉर्मर',
      nameMr: 'मोटार आणि ट्रान्सफॉर्मर',
      icon: Icons.build_circle,
      color: Color(0xFFEA580C),
      currentPrice: 105.0,
      minPrice: 85.0,
      maxPrice: 125.0,
      change24h: 8.0,
      trendSpots: [
        FlSpot(0, 95),
        FlSpot(1, 98),
        FlSpot(2, 102),
        FlSpot(3, 104),
        FlSpot(4, 105),
      ],
    ),
    ScrapItem(
      id: 'plastics',
      nameEn: 'E-Waste Plastics',
      nameHi: 'ई-कचरा प्लास्टिक',
      nameMr: 'ई-कचरा प्लास्टिक',
      icon: Icons.recycling,
      color: Color(0xFF64748B),
      currentPrice: 24.0,
      minPrice: 18.0,
      maxPrice: 30.0,
      change24h: 0.0,
      trendSpots: [
        FlSpot(0, 24),
        FlSpot(1, 23.5),
        FlSpot(2, 24),
        FlSpot(3, 24),
        FlSpot(4, 24),
      ],
    ),
  ];

  @override
  void initState() {
    super.initState();
    _selectedItem = _items.first;
  }

  void _speakCurrentPrice(ScrapItem item) {
    _tts.speakPrice(
      categoryName: item.getName(widget.currentLang),
      price: item.currentPrice,
      minPrice: item.minPrice,
      maxPrice: item.maxPrice,
      langCode: widget.currentLang,
    );
  }

  @override
  Widget build(BuildContext context) {
    final titleText = widget.currentLang == 'hi'
        ? 'आज का भाव फलक'
        : (widget.currentLang == 'mr' ? 'आजचा भाव फलक' : 'Live Price Board');
    final hearPriceLabel = widget.currentLang == 'hi'
        ? 'भाव सुनें'
        : (widget.currentLang == 'mr' ? 'भाव ऐका' : 'Hear Price');
    final trendLabel = widget.currentLang == 'hi'
        ? '30 दिनों का भाव रुझान'
        : (widget.currentLang == 'mr' ? '३० दिवसांचा भाव कल' : '30-Day Price Trend');

    return Scaffold(
      backgroundColor: const Color(0xFFF1F5F9),
      appBar: AppBar(
        title: Text(titleText, style: const TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: const Color(0xFF0F172A),
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Hero Card for Selected Item
            Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [_selectedItem.color, _selectedItem.color.withOpacity(0.8)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(
                    color: _selectedItem.color.withOpacity(0.35),
                    blurRadius: 15,
                    offset: const Offset(0, 6),
                  ),
                ],
              ),
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          CircleAvatar(
                            backgroundColor: Colors.white.withOpacity(0.2),
                            radius: 26,
                            child: Icon(_selectedItem.icon, color: Colors.white, size: 30),
                          ),
                          const SizedBox(width: 12),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                _selectedItem.getName(widget.currentLang),
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              const SizedBox(height: 2),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                                decoration: BoxDecoration(
                                  color: Colors.white.withOpacity(0.25),
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                child: Text(
                                  _selectedItem.change24h >= 0
                                      ? "+₹${_selectedItem.change24h.toInt()} (24h) ▲"
                                      : "-₹${_selectedItem.change24h.abs().toInt()} (24h) ▼",
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                      // Hear Price Button
                      ElevatedButton.icon(
                        onPressed: () => _speakCurrentPrice(_selectedItem),
                        icon: const Icon(Icons.volume_up, color: Colors.black87),
                        label: Text(
                          hearPriceLabel,
                          style: const TextStyle(
                            color: Colors.black87,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30),
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                  // Price Big Display
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.baseline,
                    textBaseline: TextBaseline.alphabetic,
                    children: [
                      const Text(
                        "₹",
                        style: TextStyle(
                          color: Colors.white70,
                          fontSize: 28,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        "${_selectedItem.currentPrice.toInt()}",
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 48,
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text(
                        widget.currentLang == 'hi' ? "/ किलो" : (widget.currentLang == 'mr' ? "/ किलो" : "/ kg"),
                        style: const TextStyle(
                          color: Colors.white70,
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Text(
                    widget.currentLang == 'hi'
                        ? "बाजार सीमा: ₹${_selectedItem.minPrice.toInt()} - ₹${_selectedItem.maxPrice.toInt()}"
                        : (widget.currentLang == 'mr'
                            ? "बाजार मर्यादा: ₹${_selectedItem.minPrice.toInt()} - ₹${_selectedItem.maxPrice.toInt()}"
                            : "Market Range: ₹${_selectedItem.minPrice.toInt()} - ₹${_selectedItem.maxPrice.toInt()} / kg"),
                    style: TextStyle(
                      color: Colors.white.withOpacity(0.9),
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // 30-Day Trend Chart
            Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                boxShadow: const [
                  BoxShadow(color: Colors.black12, blurRadius: 10, offset: Offset(0, 3)),
                ],
              ),
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        trendLabel,
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF0F172A),
                        ),
                      ),
                      const Icon(Icons.show_chart, color: Color(0xFF059669)),
                    ],
                  ),
                  const SizedBox(height: 16),
                  SizedBox(
                    height: 140,
                    child: LineChart(
                      LineChartData(
                        gridData: const FlGridData(show: false),
                        titlesData: const FlTitlesData(show: false),
                        borderData: FlBorderData(show: false),
                        minX: 0,
                        maxX: 4,
                        minY: _selectedItem.minPrice * 0.9,
                        maxY: _selectedItem.maxPrice * 1.1,
                        lineBarsData: [
                          LineChartBarData(
                            spots: _selectedItem.trendSpots,
                            isCurved: true,
                            color: _selectedItem.color,
                            barWidth: 4,
                            isStrokeCapRound: true,
                            dotData: const FlDotData(show: true),
                            belowBarData: BarAreaData(
                              show: true,
                              color: _selectedItem.color.withOpacity(0.15),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Category Selection List
            Text(
              widget.currentLang == 'hi' ? "सभी श्रेणियां" : (widget.currentLang == 'mr' ? "सर्व प्रकार" : "All Categories"),
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Color(0xFF0F172A),
              ),
            ),
            const SizedBox(height: 12),

            ..._items.map((item) {
              final isSelected = item.id == _selectedItem.id;
              return Container(
                margin: const EdgeInsets.only(bottom: 10),
                decoration: BoxDecoration(
                  color: isSelected ? item.color.withOpacity(0.08) : Colors.white,
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(
                    color: isSelected ? item.color : Colors.transparent,
                    width: 2,
                  ),
                  boxShadow: const [
                    BoxShadow(color: Colors.black12, blurRadius: 4, offset: Offset(0, 2)),
                  ],
                ),
                child: ListTile(
                  contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                  onTap: () {
                    setState(() {
                      _selectedItem = item;
                    });
                    _speakCurrentPrice(item);
                  },
                  leading: CircleAvatar(
                    backgroundColor: item.color.withOpacity(0.15),
                    child: Icon(item.icon, color: item.color),
                  ),
                  title: Text(
                    item.getName(widget.currentLang),
                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                  ),
                  subtitle: Text(
                    "₹${item.minPrice.toInt()} - ₹${item.maxPrice.toInt()}/kg",
                    style: TextStyle(color: Colors.grey[600], fontSize: 13),
                  ),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        "₹${item.currentPrice.toInt()}",
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w900,
                          color: item.color,
                        ),
                      ),
                      const SizedBox(width: 8),
                      IconButton(
                        icon: const Icon(Icons.volume_up, color: Colors.grey),
                        onPressed: () => _speakCurrentPrice(item),
                      ),
                    ],
                  ),
                ),
              );
            }).toList(),
          ],
        ),
      ),
    );
  }
}
