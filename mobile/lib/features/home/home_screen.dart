import 'package:flutter/material.dart';
import '../../core/database/database.dart';
import '../../core/services/tts_service.dart';
import '../price_board/price_board_screen.dart';
import '../new_lot/new_lot_screen.dart';
import '../recyclers/recycler_list_screen.dart';
import '../handover/handover_qr_screen.dart';
import '../earnings/earnings_ledger_screen.dart';
import '../safety/safety_guidance_screen.dart';

class HomeScreen extends StatefulWidget {
  final AppDatabase database;
  final String currentLang;
  final Function(String) onLanguageChanged;

  const HomeScreen({
    Key? key,
    required this.database,
    required this.currentLang,
    required this.onLanguageChanged,
  }) : super(key: key);

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final TtsService _tts = TtsService();

  void _speakWelcome() {
    String text;
    if (widget.currentLang == 'hi') {
      text = "नमस्ते रमेश जी। कबाड़ीवाला कनेक्ट में आपका स्वागत है। आज का भाव देखने या नया माल जोड़ने के लिए नीचे दिए गए बटन दबाएं।";
    } else if (widget.currentLang == 'mr') {
      text = "नमस्कार रमेश जी। कबाडीवाला कनेक्ट मध्ये आपले स्वागत आहे. आजचा भाव पाहण्यासाठी किंवा नवीन माल जोडण्यासाठी खालील बटणे दाबा.";
    } else {
      text = "Welcome Ramesh ji to Kabadiwala Connect. Tap any card below to check live prices, sell scrap, or view earnings.";
    }
    _tts.speak(text, langCode: widget.currentLang);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF1F5F9),
      appBar: AppBar(
        backgroundColor: const Color(0xFF0F172A),
        elevation: 0,
        title: Row(
          children: [
            const Icon(Icons.recycling, color: Color(0xFF10B981), size: 26),
            const SizedBox(width: 8),
            const Text(
              'Kabadiwala Connect',
              style: TextStyle(fontWeight: FontWeight.w900, fontSize: 18, color: Colors.white),
            ),
          ],
        ),
        actions: [
          // Vernacular Language Pill Switcher
          Padding(
            padding: const EdgeInsets.only(right: 8.0),
            child: Row(
              children: [
                _buildLangPill('hi', 'हिंदी'),
                const SizedBox(width: 4),
                _buildLangPill('mr', 'मराठी'),
                const SizedBox(width: 4),
                _buildLangPill('en', 'EN'),
              ],
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(16.0),
          children: [
            // Collector Registration Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF1E293B), Color(0xFF0F172A)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(20),
                boxShadow: const [
                  BoxShadow(color: Colors.black12, blurRadius: 10, offset: Offset(0, 4)),
                ],
              ),
              child: Column(
                children: [
                  Row(
                    children: [
                      const CircleAvatar(
                        radius: 26,
                        backgroundColor: Color(0xFF10B981),
                        child: Icon(Icons.person, color: Colors.white, size: 30),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                const Text(
                                  "Ramesh Shinde",
                                  style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
                                ),
                                const SizedBox(width: 6),
                                const Icon(Icons.verified, color: Color(0xFF38BDF8), size: 18),
                              ],
                            ),
                            const SizedBox(height: 2),
                            Text(
                              "MPCB ID: MH-PUN-COLL-0042",
                              style: TextStyle(color: Colors.grey[400], fontSize: 12),
                            ),
                          ],
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.volume_up, color: Color(0xFF10B981)),
                        onPressed: _speakWelcome,
                      ),
                    ],
                  ),
                  const SizedBox(height: 14),
                  const Divider(color: Colors.white24, height: 1),
                  const SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: const [
                          Icon(Icons.wifi_off, color: Color(0xFF10B981), size: 14),
                          SizedBox(width: 6),
                          Text(
                            "Offline Ready (Drift DB)",
                            style: TextStyle(color: Color(0xFF10B981), fontSize: 12, fontWeight: FontWeight.w600),
                          ),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: const Color(0xFF059669).withOpacity(0.25),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Text(
                          "EPR Formalized",
                          style: TextStyle(color: Color(0xFF34D399), fontSize: 11, fontWeight: FontWeight.bold),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // 6 High-Contrast Visual Action Cards
            // 1. Price Board
            _buildActionTile(
              title: widget.currentLang == 'hi'
                  ? 'आज का भाव फलक'
                  : (widget.currentLang == 'mr' ? 'आजचा भाव फलक' : 'Live Price Board'),
              subtitle: widget.currentLang == 'hi'
                  ? '7 श्रेणियों का ताजा बाजार भाव'
                  : (widget.currentLang == 'mr' ? '७ प्रकारांचे ताजे बाजार भाव' : 'Rates for 7 E-Waste Categories'),
              icon: Icons.currency_rupee,
              bgGradient: const [Color(0xFF059669), Color(0xFF10B981)],
              tagText: "ताजा भाव",
              onTap: () {
                Navigator.of(context).push(
                  MaterialPageRoute(builder: (_) => PriceBoardScreen(currentLang: widget.currentLang)),
                );
              },
            ),
            const SizedBox(height: 14),

            // 2. New Lot (Sell Scrap)
            _buildActionTile(
              title: widget.currentLang == 'hi'
                  ? 'नया माल बेचें (लॉट बनाएं)'
                  : (widget.currentLang == 'mr' ? 'नवीन माल विका' : 'Create Scrap Lot'),
              subtitle: widget.currentLang == 'hi'
                  ? 'फोटो लें, वजन नापें और तुरंत कीमत पाएं'
                  : (widget.currentLang == 'mr' ? 'फोटो काढा, वजन करा व लगेच किंमत मिळवा' : 'Camera photo, weight slider & instant estimate'),
              icon: Icons.camera_alt,
              bgGradient: const [Color(0xFF1D4ED8), Color(0xFF3B82F6)],
              tagText: "कैमरा + वजन",
              onTap: () {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (_) => NewLotScreen(
                      database: widget.database,
                      currentLang: widget.currentLang,
                    ),
                  ),
                );
              },
            ),
            const SizedBox(height: 14),

            // 3. Nearby Recyclers
            _buildActionTile(
              title: widget.currentLang == 'hi'
                  ? 'अधिकृत रीसाइक्लर'
                  : (widget.currentLang == 'mr' ? 'अधिकृत रीसायकलर्स' : 'Authorized Recyclers'),
              subtitle: widget.currentLang == 'hi'
                  ? 'CPCB अधिकृत कारखाने व मुफ्त पिकअप'
                  : (widget.currentLang == 'mr' ? 'CPCB प्रमाणित कारखाने व मोफत पिकअप' : 'Nearby CPCB/SPCB Dismantlers with Doorstep Pickup'),
              icon: Icons.local_shipping,
              bgGradient: const [Color(0xFFD97706), Color(0xFFF59E0B)],
              tagText: "मुफ्त पिकअप",
              onTap: () {
                Navigator.of(context).push(
                  MaterialPageRoute(builder: (_) => RecyclerListScreen(currentLang: widget.currentLang)),
                );
              },
            ),
            const SizedBox(height: 14),

            // 4. Digital Handover QR
            _buildActionTile(
              title: widget.currentLang == 'hi'
                  ? 'क्यूआर हैंडओवर'
                  : (widget.currentLang == 'mr' ? 'क्यूआर हस्तांतरण' : 'Digital Handover QR'),
              subtitle: widget.currentLang == 'hi'
                  ? 'माल देते समय क्यूआर स्कैन करवाएं और नकद पाएं'
                  : (widget.currentLang == 'mr' ? 'माल देताना क्यूआर स्कॅन करा व रोख रक्कम घ्या' : 'Verifiable geofenced transfer and instant cash settlement'),
              icon: Icons.qr_code_scanner,
              bgGradient: const [Color(0xFF334155), Color(0xFF475569)],
              tagText: "सत्यापित",
              onTap: () {
                Navigator.of(context).push(
                  MaterialPageRoute(builder: (_) => HandoverQrScreen(currentLang: widget.currentLang)),
                );
              },
            ),
            const SizedBox(height: 14),

            // 5. My Earnings Ledger
            _buildActionTile(
              title: widget.currentLang == 'hi'
                  ? 'मेरी कमाई (बहीखाता)'
                  : (widget.currentLang == 'mr' ? 'माझी कमाई (हिशोब)' : 'My Earnings Ledger'),
              subtitle: widget.currentLang == 'hi'
                  ? 'कुल ₹14,152 प्राप्त • +79% अधिक कमाई'
                  : (widget.currentLang == 'mr' ? 'एकूण ₹१४,१५२ मिळाले • +७९% जास्त उत्पन्न' : 'Formal Ledger, Cash receipts & SPCB records'),
              icon: Icons.account_balance_wallet,
              bgGradient: const [Color(0xFF7C3AED), Color(0xFF8B5CF6)],
              tagText: "+79% लाभ",
              onTap: () {
                Navigator.of(context).push(
                  MaterialPageRoute(builder: (_) => EarningsLedgerScreen(currentLang: widget.currentLang)),
                );
              },
            ),
            const SizedBox(height: 14),

            // 6. Safety Rules
            _buildActionTile(
              title: widget.currentLang == 'hi'
                  ? 'सुरक्षा एवं स्वास्थ्य नियम'
                  : (widget.currentLang == 'mr' ? 'सुरक्षा व आरोग्य नियम' : 'Safety & Health Rules'),
              subtitle: widget.currentLang == 'hi'
                  ? 'तार न जलाएं, एसिड न डालें • जान बचाएं'
                  : (widget.currentLang == 'mr' ? 'तारा जाळू नका, ऍसिड टाकू नका • सुरक्षित राहा' : 'Prevent burning & acid risks • Audio guide'),
              icon: Icons.warning_amber_rounded,
              bgGradient: const [Color(0xFFB91C1C), Color(0xFFDC2626)],
              tagText: "अति महत्वपूर्ण",
              onTap: () {
                Navigator.of(context).push(
                  MaterialPageRoute(builder: (_) => SafetyGuidanceScreen(currentLang: widget.currentLang)),
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLangPill(String code, String label) {
    final isSelected = widget.currentLang == code;
    return GestureDetector(
      onTap: () => widget.onLanguageChanged(code),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
        decoration: BoxDecoration(
          color: isSelected ? const Color(0xFF10B981) : Colors.white12,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: Colors.white,
            fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
            fontSize: 12,
          ),
        ),
      ),
    );
  }

  Widget _buildActionTile({
    required String title,
    required String subtitle,
    required IconData icon,
    required List<Color> bgGradient,
    required String tagText,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(18),
      child: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: bgGradient,
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(18),
          boxShadow: [
            BoxShadow(
              color: bgGradient.first.withOpacity(0.3),
              blurRadius: 8,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        padding: const EdgeInsets.all(18),
        child: Row(
          children: [
            CircleAvatar(
              radius: 28,
              backgroundColor: Colors.white.withOpacity(0.2),
              child: Icon(icon, color: Colors.white, size: 32),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          title,
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w900,
                            color: Colors.white,
                          ),
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.25),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Text(
                          tagText,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(
                    subtitle,
                    style: TextStyle(
                      fontSize: 12,
                      color: Colors.white.withOpacity(0.85),
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(width: 8),
            const Icon(Icons.chevron_right, color: Colors.white70, size: 28),
          ],
        ),
      ),
    );
  }
}
