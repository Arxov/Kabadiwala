import 'package:flutter/material.dart';
import '../../core/services/tts_service.dart';

class SafetyHazard {
  final String id;
  final String titleEn;
  final String titleHi;
  final String titleMr;
  final String dangerEn;
  final String dangerHi;
  final String dangerMr;
  final String safeWayEn;
  final String safeWayHi;
  final String safeWayMr;
  final String gainEn;
  final String gainHi;
  final String gainMr;
  final IconData icon;

  const SafetyHazard({
    required this.id,
    required this.titleEn,
    required this.titleHi,
    required this.titleMr,
    required this.dangerEn,
    required this.dangerHi,
    required this.dangerMr,
    required this.safeWayEn,
    required this.safeWayHi,
    required this.safeWayMr,
    required this.gainEn,
    required this.gainHi,
    required this.gainMr,
    required this.icon,
  });

  String getTitle(String lang) {
    if (lang == 'hi') return titleHi;
    if (lang == 'mr') return titleMr;
    return titleEn;
  }

  String getDanger(String lang) {
    if (lang == 'hi') return dangerHi;
    if (lang == 'mr') return dangerMr;
    return dangerEn;
  }

  String getSafeWay(String lang) {
    if (lang == 'hi') return safeWayHi;
    if (lang == 'mr') return safeWayMr;
    return safeWayEn;
  }

  String getGain(String lang) {
    if (lang == 'hi') return gainHi;
    if (lang == 'mr') return gainMr;
    return gainEn;
  }
}

class SafetyGuidanceScreen extends StatefulWidget {
  final String currentLang;
  const SafetyGuidanceScreen({Key? key, required this.currentLang}) : super(key: key);

  @override
  State<SafetyGuidanceScreen> createState() => _SafetyGuidanceScreenState();
}

class _SafetyGuidanceScreenState extends State<SafetyGuidanceScreen> {
  final TtsService _tts = TtsService();

  final List<SafetyHazard> _hazards = const [
    SafetyHazard(
      id: 'cable_burn',
      titleEn: 'Never Burn Copper Cables!',
      titleHi: 'तारों और केबल्स को कभी न जलाएं!',
      titleMr: 'तारा व केबल्स कधीही जाळू नका!',
      dangerEn: 'Burning melts and vaporizes 12-15% of pure copper and releases carcinogenic dioxin fumes damaging your lungs.',
      dangerHi: 'तार जलाने से 15% तांबा भाप बनकर उड़ जाता है और निकलने वाला जहरीला धुआं फेफड़ों और आंखों को स्थायी नुकसान पहुंचाता है।',
      dangerMr: 'तारा जाळल्याने १५% तांबे नष्ट होते आणि विषारी धुरामुळे फुप्फुसांचे गंभीर आजार होतात.',
      safeWayEn: 'Sell directly with plastic sheathing to authorized recyclers with mechanical wire strippers.',
      safeWayHi: 'केबल्स को बिना जलाए सीधा अधिकृत रीसाइक्लर को बेचें। उनके पास छीलने की मशीनें हैं।',
      safeWayMr: 'केबल्स न जाळता थेट अधिकृत रीसायकलरला द्या. त्यांच्याकडे स्ट्रिपिंग मशीन असतात.',
      gainEn: 'Earn ₹480/kg full price vs only ₹390/kg for charred/oxidized copper.',
      gainHi: 'सीधा बेचकर ₹480/किलो पाएं, जबकि जली हुई तार का केवल ₹390/किलो मिलता है।',
      gainMr: 'थेट विक्रीतून ₹४८०/किलो मिळवा, जळालेल्या तांब्यासाठी फक्त ₹३९० मिळतात.',
      icon: Icons.local_fire_department,
    ),
    SafetyHazard(
      id: 'acid_pcb',
      titleEn: 'No Acid Leaching of Circuit Boards',
      titleHi: 'सर्किट बोर्ड को तेजाब (एसिड) में न धोएं',
      titleMr: 'सर्किट बोर्डवर आम्ल (ऍसिड) प्रक्रिया करू नका',
      dangerEn: 'Boiling PCBs in cyanide or nitric acid causes permanent chemical burns, blindness, and poisons groundwater.',
      dangerHi: 'तेजाब में सर्किट बोर्ड उबालने से त्वचा जलने, अंधापन और भूजल में सायनाइड घुलने का भारी खतरा होता है।',
      dangerMr: 'ऍसिड किंवा सायनाईडने बोर्ड धुतल्याने डोळ्यांना इजा आणि पिण्याचे पाणी विषारी होते.',
      safeWayEn: 'Certified hydrometallurgical refineries recover gold, silver, and palladium with zero toxin release.',
      safeWayHi: 'अधिकृत रीसाइक्लर को सौंपें जो सुरक्षित मशीनों से सोना, चांदी और पैलेडियम निकालते हैं।',
      safeWayMr: 'प्रमाणित रीसायकलरकडे द्या, जे आधुनिक तंत्रज्ञानाने सोने-चांदी वेगळे करतात.',
      gainEn: 'Direct sale fetches ₹220 - ₹260/kg upfront with zero medical expense risk.',
      gainHi: 'सीधे ₹220 से ₹260/किलो नकद पाएं और अस्पताल के भारी खर्चे से बचें।',
      gainMr: 'थेट ₹२२० ते ₹२६०/किलो रोख रक्कम मिळवा आणि आरोग्याची हानी टाळा.',
      icon: Icons.science,
    ),
    SafetyHazard(
      id: 'crt_implosion',
      titleEn: 'Do Not Smash CRT TV Screens',
      titleHi: 'पुराने टीवी और मॉनिटर (CRT) को न तोड़ें',
      titleMr: 'जुन्या टीव्हीच्या काचा (CRT) फोडू नका',
      dangerEn: 'CRT tubes are vacuum sealed. Smashing causes explosive implosion, flying glass shrapnel, and toxic lead dust.',
      dangerHi: 'सीआरटी ट्यूब में वैक्यूम होता है। हथौड़ा मारने पर यह बम की तरह फटती है और लेड (सीसा) का जहरीला पाउडर उड़ता है।',
      dangerMr: 'सीआरटी टीव्ही फोडल्याने काचेचे तुकडे उडतात आणि शिशाची विषारी धूळ पसरते.',
      safeWayEn: 'Deliver CRT intact to authorized dismantlers equipped with lead-glass separator furnaces.',
      safeWayHi: 'कांच को बिना तोड़े पूरा का पूरा रीसाइक्लर तक पहुंचाएं।',
      safeWayMr: 'टीव्ही अखंड स्वरूपात अधिकृत केंद्रावर जमा करा.',
      gainEn: 'Earn ₹32/kg for intact units without cuts or injuries.',
      gainHi: 'सुरक्षित पूरा सेट देने पर ₹32/किलो पूरा भाव पाएं।',
      gainMr: 'अखंड सेट दिल्यास ₹३२/किलो खात्रीशीर भाव मिळतो.',
      icon: Icons.tv_off,
    ),
    SafetyHazard(
      id: 'battery_puncture',
      titleEn: 'Never Puncture or Hammer Batteries',
      titleHi: 'बैटरी पर कभी हथौड़ा या कील न मारें',
      titleMr: 'बॅटरीवर हातोडा मारू नका किंवा कापू नका',
      dangerEn: 'Lithium-ion cells catch fire instantly when punctured, reaching 800°C and releasing toxic hydrofluoric gas.',
      dangerHi: 'लिथियम बैटरी में छेद होने पर 800 डिग्री की भयंकर आग लगती है जो पानी से भी नहीं बुझती।',
      dangerMr: 'लिथियम बॅटरी फुटल्यास प्रचंड आग लागते आणि विषारी वायू बाहेर पडतो.',
      safeWayEn: 'Tape exposed metal terminals with insulation tape and keep in dry, cool cardboard boxes.',
      safeWayHi: 'बैटरी के सिरों पर सेलोटेप लगाएं और सूखी जगह पर रखें।',
      safeWayMr: 'बॅटरीच्या टोकांवर इन्सुलेशन टेप लावा आणि कोरड्या जागी ठेवा.',
      gainEn: 'Get premium ₹140 - ₹165/kg for intact Li-ion packs.',
      gainHi: 'सुरक्षित बैटरी का ₹140 से ₹165/किलो तक बेहतरीन दाम पाएं।',
      gainMr: 'सुरक्षित बॅटऱ्यांसाठी ₹१४० ते ₹१६५/किलो उत्तम दर मिळवा.',
      icon: Icons.battery_alert,
    ),
  ];

  void _speakHazard(SafetyHazard h) {
    final title = h.getTitle(widget.currentLang);
    final danger = h.getDanger(widget.currentLang);
    final safeWay = h.getSafeWay(widget.currentLang);
    final gain = h.getGain(widget.currentLang);
    final text = "$title। $danger। $safeWay। $gain";
    _tts.speak(text, langCode: widget.currentLang);
  }

  @override
  Widget build(BuildContext context) {
    final title = widget.currentLang == 'hi'
        ? 'सुरक्षा एवं स्वास्थ्य नियम'
        : (widget.currentLang == 'mr' ? 'सुरक्षा व आरोग्य नियम' : 'Safety & Health Rules');

    return Scaffold(
      backgroundColor: const Color(0xFFF1F5F9),
      appBar: AppBar(
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: const Color(0xFF991B1B), // Crimson Red
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          // Banner Warning
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: const Color(0xFFFEF2F2),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFFF87171)),
            ),
            child: Row(
              children: [
                const Icon(Icons.warning_amber_rounded, color: Color(0xFFDC2626), size: 36),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    widget.currentLang == 'hi'
                        ? "आपकी सेहत सबसे अनमोल है! इन 4 खतरनाक तरीकों को तुरंत बंद करें और ज्यादा कमाई पाएं।"
                        : (widget.currentLang == 'mr'
                            ? "तुमचे आरोग्य सर्वात महत्त्वाचे आहे! या ४ घातक पद्धती टाळा आणि जास्त कमाई मिळवा."
                            : "Your health is priceless! Avoid these 4 dangerous informal practices and earn more formally."),
                    style: const TextStyle(
                      color: Color(0xFF991B1B),
                      fontWeight: FontWeight.bold,
                      fontSize: 13,
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // 4 Hazard Cards
          ..._hazards.map((h) {
            return Container(
              margin: const EdgeInsets.only(bottom: 16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(18),
                boxShadow: const [
                  BoxShadow(color: Colors.black12, blurRadius: 6, offset: Offset(0, 2)),
                ],
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Header Strip
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    decoration: const BoxDecoration(
                      color: Color(0xFFFEF2F2),
                      borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(18),
                        topRight: Radius.circular(18),
                      ),
                    ),
                    child: Row(
                      children: [
                        CircleAvatar(
                          backgroundColor: const Color(0xFFDC2626),
                          radius: 18,
                          child: Icon(h.icon, color: Colors.white, size: 20),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Text(
                            h.getTitle(widget.currentLang),
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF991B1B),
                            ),
                          ),
                        ),
                        IconButton(
                          icon: const Icon(Icons.volume_up, color: Color(0xFFDC2626)),
                          onPressed: () => _speakHazard(h),
                        ),
                      ],
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Danger section
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text("❌ ", style: TextStyle(fontSize: 14)),
                            Expanded(
                              child: Text(
                                h.getDanger(widget.currentLang),
                                style: const TextStyle(fontSize: 13, color: Color(0xFF475569)),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),
                        // Safe alternative section
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text("✅ ", style: TextStyle(fontSize: 14)),
                            Expanded(
                              child: Text(
                                h.getSafeWay(widget.currentLang),
                                style: const TextStyle(
                                  fontSize: 13,
                                  color: Color(0xFF0F172A),
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        // Financial gain badge
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          decoration: BoxDecoration(
                            color: const Color(0xFFECFDF5),
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(color: const Color(0xFF10B981)),
                          ),
                          child: Row(
                            children: [
                              const Icon(Icons.trending_up, color: Color(0xFF059669), size: 18),
                              const SizedBox(width: 8),
                              Expanded(
                                child: Text(
                                  h.getGain(widget.currentLang),
                                  style: const TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.bold,
                                    color: Color(0xFF065F46),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
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
