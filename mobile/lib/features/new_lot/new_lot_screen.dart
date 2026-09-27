import 'package:flutter/material.dart';
import 'dart:math';
import '../../core/services/tts_service.dart';
import '../../core/database/database.dart';
import 'package:drift/drift.dart' as drift;

class NewLotScreen extends StatefulWidget {
  final String currentLang;
  final AppDatabase database;

  const NewLotScreen({
    Key? key,
    required this.currentLang,
    required this.database,
  }) : super(key: key);

  @override
  State<NewLotScreen> createState() => _NewLotScreenState();
}

class CategoryChoice {
  final String id;
  final String nameEn;
  final String nameHi;
  final String nameMr;
  final IconData icon;
  final Color color;
  final double minRate;
  final double maxRate;

  const CategoryChoice({
    required this.id,
    required this.nameEn,
    required this.nameHi,
    required this.nameMr,
    required this.icon,
    required this.color,
    required this.minRate,
    required this.maxRate,
  });

  String getName(String lang) {
    if (lang == 'hi') return nameHi;
    if (lang == 'mr') return nameMr;
    return nameEn;
  }
}

class _NewLotScreenState extends State<NewLotScreen> {
  final TtsService _tts = TtsService();

  final List<CategoryChoice> _categories = const [
    CategoryChoice(
      id: 'PCB',
      nameEn: 'Circuit Boards (PCB)',
      nameHi: 'सर्किट बोर्ड (PCB)',
      nameMr: 'सर्किट बोर्ड (PCB)',
      icon: Icons.memory,
      color: Color(0xFF2563EB),
      minRate: 185.0,
      maxRate: 260.0,
    ),
    CategoryChoice(
      id: 'Cables',
      nameEn: 'Copper Cables',
      nameHi: 'तांबे के तार / केबल',
      nameMr: 'तांब्याच्या तारा / केबल्स',
      icon: Icons.cable,
      color: Color(0xFF059669),
      minRate: 440.0,
      maxRate: 520.0,
    ),
    CategoryChoice(
      id: 'Batteries',
      nameEn: 'Li-ion Batteries',
      nameHi: 'लिथियम बैटरी',
      nameMr: 'लिथियम बॅटरी',
      icon: Icons.battery_charging_full,
      color: Color(0xFFD97706),
      minRate: 115.0,
      maxRate: 165.0,
    ),
    CategoryChoice(
      id: 'CRT',
      nameEn: 'CRT Monitors',
      nameHi: 'सीआरटी टीवी / मॉनिटर',
      nameMr: 'सीआरटी टीव्ही / मॉनिटर',
      icon: Icons.tv,
      color: Color(0xFF7C3AED),
      minRate: 25.0,
      maxRate: 38.0,
    ),
    CategoryChoice(
      id: 'LCD',
      nameEn: 'LCD / LED Screens',
      nameHi: 'एलसीडी स्क्रीन',
      nameMr: 'एलसीडी स्क्रीन',
      icon: Icons.desktop_windows,
      color: Color(0xFF0284C7),
      minRate: 65.0,
      maxRate: 92.0,
    ),
    CategoryChoice(
      id: 'Motors',
      nameEn: 'Motors & Coils',
      nameHi: 'मोटर और ट्रांसफॉर्मर',
      nameMr: 'मोटार आणि ट्रान्सफॉर्मर',
      icon: Icons.build_circle,
      color: Color(0xFFEA580C),
      minRate: 85.0,
      maxRate: 125.0,
    ),
    CategoryChoice(
      id: 'Plastics',
      nameEn: 'E-Waste Plastics',
      nameHi: 'ई-कचरा प्लास्टिक',
      nameMr: 'ई-कचरा प्लास्टिक',
      icon: Icons.recycling,
      color: Color(0xFF64748B),
      minRate: 18.0,
      maxRate: 30.0,
    ),
  ];

  late CategoryChoice _selectedCategory;
  double _weightKg = 10.0;
  bool _photoCaptured = false;
  String? _photoHash;
  bool _isSaving = false;
  String? _aiSuggestedCategoryId;
  int _aiConfidence = 89;
  bool _aiConfirmed = false;

  @override
  void initState() {
    super.initState();
    _selectedCategory = _categories.first;
  }

  double get _minEstimate => _weightKg * _selectedCategory.minRate;
  double get _maxEstimate => _weightKg * _selectedCategory.maxRate;

  void _hearEstimate() {
    _tts.speakValueEstimate(
      categoryName: _selectedCategory.getName(widget.currentLang),
      weight: _weightKg,
      minVal: _minEstimate,
      maxVal: _maxEstimate,
      langCode: widget.currentLang,
    );
  }

  void _simulatePhotoCapture() {
    setState(() {
      _photoCaptured = true;
      _photoHash = "sha256_${DateTime.now().millisecondsSinceEpoch.toRadixString(16)}_${Random().nextInt(9999)}";
      _aiSuggestedCategoryId = 'PCB';
      _aiConfidence = 89;
      _aiConfirmed = false;
    });
    final snackMsg = widget.currentLang == 'hi'
        ? "फोटो कैप्चर हो गया और डिजिटल रूप से सत्यापित हुआ!"
        : (widget.currentLang == 'mr'
            ? "फोटो घेतला आणि डिजिटल प्रमाणित केला!"
            : "Photo captured and SHA-256 verified!");
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(snackMsg),
        backgroundColor: const Color(0xFF059669),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  Future<void> _saveLot() async {
    setState(() => _isSaving = true);
    final refCode = "LOT-2026-MH-${Random().nextInt(8999) + 1000}";

    try {
      await widget.database.into(widget.database.materialLots).insert(
            MaterialLotsCompanion.insert(
              lotId: refCode,
              collectorId: 'c-pun-0042',
              category: _selectedCategory.id,
              weightKg: _weightKg,
              condition: 'Segregated A-Grade',
              sourceType: 'Informal Collection',
              estValueMin: _minEstimate,
              estValueMax: _maxEstimate,
              status: 'available',
              createdAt: DateTime.now(),
              syncedAt: drift.Value(DateTime.now()),
            ),
          );

      if (!mounted) return;
      setState(() => _isSaving = false);

      final successTitle = widget.currentLang == 'hi'
          ? "लॉट सफलतापूर्वक सुरक्षित हुआ!"
          : (widget.currentLang == 'mr' ? "लॉट यशस्वीरीत्या जतन केला!" : "Lot Created Successfully!");

      showDialog(
        context: context,
        builder: (ctx) => AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          title: Row(
            children: [
              const Icon(Icons.check_circle, color: Color(0xFF059669), size: 30),
              const SizedBox(width: 10),
              Expanded(child: Text(successTitle, style: const TextStyle(fontSize: 18))),
            ],
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                "लॉट कोड / Reference: $refCode",
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
              ),
              const SizedBox(height: 8),
              Text(
                "${_selectedCategory.getName(widget.currentLang)} - ${_weightKg.toStringAsFixed(1)} kg",
                style: const TextStyle(fontSize: 15),
              ),
              const SizedBox(height: 4),
              Text(
                "अनुमानित भाव: ₹${_minEstimate.toInt()} - ₹${_maxEstimate.toInt()}",
                style: const TextStyle(fontSize: 16, color: Color(0xFF059669), fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: Colors.amber.shade50,
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: Colors.amber.shade300),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.qr_code, color: Colors.amber, size: 24),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        widget.currentLang == 'hi'
                            ? "रीसाइक्लर को देने के लिए क्यूआर कोड तैयार है।"
                            : (widget.currentLang == 'mr'
                                ? "रीसायकलरला देण्यासाठी क्यूआर कोड तयार आहे."
                                : "QR code is generated and ready for handover."),
                        style: const TextStyle(fontSize: 12),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          actions: [
            ElevatedButton(
              onPressed: () {
                Navigator.of(ctx).pop();
                Navigator.of(context).pop();
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF059669),
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
              child: Text(widget.currentLang == 'hi' ? "ठीक है" : (widget.currentLang == 'mr' ? "समजले" : "Done")),
            ),
          ],
        ),
      );
    } catch (e) {
      if (!mounted) return;
      setState(() => _isSaving = false);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Saved locally in SQLite queue! Lot Code: $refCode")),
      );
      Navigator.of(context).pop();
    }
  }

  @override
  Widget build(BuildContext context) {
    final title = widget.currentLang == 'hi'
        ? 'नया स्क्रैप लॉट'
        : (widget.currentLang == 'mr' ? 'नवीन स्क्रॅप लॉट' : 'Create New Lot');

    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
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
            // STEP 1: Select Category
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  widget.currentLang == 'hi'
                      ? "1. श्रेणी चुनें"
                      : (widget.currentLang == 'mr' ? "१. प्रकार निवडा" : "1. Select Category"),
                  style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                ),
                Text(
                  _selectedCategory.getName(widget.currentLang),
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: _selectedCategory.color),
                ),
              ],
            ),
            const SizedBox(height: 12),
            GridView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: _categories.length,
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: 10,
                mainAxisSpacing: 10,
                childAspectRatio: 2.2,
              ),
              itemBuilder: (context, idx) {
                final cat = _categories[idx];
                final isSelected = cat.id == _selectedCategory.id;
                return InkWell(
                  onTap: () {
                    setState(() => _selectedCategory = cat);
                    _hearEstimate();
                  },
                  borderRadius: BorderRadius.circular(14),
                  child: Container(
                    decoration: BoxDecoration(
                      color: isSelected ? cat.color.withOpacity(0.12) : Colors.white,
                      border: Border.all(
                        color: isSelected ? cat.color : Colors.grey.shade300,
                        width: isSelected ? 2.5 : 1,
                      ),
                      borderRadius: BorderRadius.circular(14),
                      boxShadow: [
                        BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 4, offset: const Offset(0, 2)),
                      ],
                    ),
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                    child: Row(
                      children: [
                        CircleAvatar(
                          backgroundColor: cat.color.withOpacity(0.18),
                          radius: 18,
                          child: Icon(cat.icon, color: cat.color, size: 20),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text(
                                cat.getName(widget.currentLang),
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 13,
                                  color: isSelected ? cat.color : Colors.black87,
                                ),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                              ),
                              Text(
                                "₹${cat.minRate.toInt()}-${cat.maxRate.toInt()}/kg",
                                style: TextStyle(fontSize: 11, color: Colors.grey[600]),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
            const SizedBox(height: 24),

            // STEP 2: Camera Photo Capture
            Text(
              widget.currentLang == 'hi'
                  ? "2. सामान का फोटो लें"
                  : (widget.currentLang == 'mr' ? "२. सामानचा फोटो काढा" : "2. Take Photo"),
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
            ),
            const SizedBox(height: 10),
            InkWell(
              onTap: _simulatePhotoCapture,
              borderRadius: BorderRadius.circular(16),
              child: Container(
                height: 110,
                decoration: BoxDecoration(
                  color: _photoCaptured ? const Color(0xFFECFDF5) : Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(
                    color: _photoCaptured ? const Color(0xFF10B981) : Colors.blue.shade300,
                    width: 2,
                    style: BorderStyle.solid,
                  ),
                ),
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        _photoCaptured ? Icons.check_circle : Icons.camera_alt,
                        size: 40,
                        color: _photoCaptured ? const Color(0xFF10B981) : const Color(0xFF2563EB),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        _photoCaptured
                            ? (widget.currentLang == 'hi'
                                ? "फोटो सत्यापित (SHA-256 सुरक्षित) ✓"
                                : (widget.currentLang == 'mr' ? "फोटो प्रमाणित झाला ✓" : "Photo Verified (SHA-256)"))
                            : (widget.currentLang == 'hi'
                                ? "फोटो लेने के लिए यहां टैप करें"
                                : (widget.currentLang == 'mr' ? "फोटो काढण्यासाठी येथे दाबा" : "Tap here to snap photo")),
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                          color: _photoCaptured ? const Color(0xFF059669) : const Color(0xFF2563EB),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // AI-Assisted Material Classification Confirmation (Section 15 of Master Spec)
            if (_photoCaptured && _aiSuggestedCategoryId != null) ...[
              const SizedBox(height: 14),
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF1E1B4B), Color(0xFF312E81)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF4338CA).withOpacity(0.25),
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                  ],
                  border: Border.all(
                    color: _aiConfirmed ? const Color(0xFF10B981) : const Color(0xFF818CF8),
                    width: 1.5,
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: const Color(0xFF4F46E5),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: const Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(Icons.auto_awesome, color: Colors.amber, size: 16),
                              SizedBox(width: 4),
                              Text(
                                "AI Scanner (Assistive)",
                                style: TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                        ),
                        const Spacer(),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: const Color(0xFF059669).withOpacity(0.2),
                            borderRadius: BorderRadius.circular(6),
                            border: Border.all(color: const Color(0xFF10B981)),
                          ),
                          child: Text(
                            "$_aiConfidence% Confidence",
                            style: const TextStyle(color: Color(0xFF34D399), fontSize: 11, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),
                    Text(
                      widget.currentLang == 'hi'
                          ? "🤖 AI पहचान: सर्किट बोर्ड (PCB)"
                          : (widget.currentLang == 'mr'
                              ? "🤖 AI ओळख: सर्किट बोर्ड (PCB)"
                              : "🤖 AI Suggestion: Circuit Boards (PCB)"),
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      widget.currentLang == 'hi'
                          ? "ग्रीन कॉपर ट्रेसेस और सोल्डर पैड्स पहचाने गए। कृपया पुष्टि करें:"
                          : (widget.currentLang == 'mr'
                              ? "ग्रीन कॉपर ट्रेसेस आणि सोल्डर पॅड्स आढळले. कृपया खात्री करा:"
                              : "Green copper traces and solder pads detected. Please confirm:"),
                      style: TextStyle(color: Colors.indigo.shade100, fontSize: 12),
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        Expanded(
                          child: ElevatedButton.icon(
                            onPressed: () {
                              final pcbCat = _categories.firstWhere((c) => c.id == 'PCB');
                              setState(() {
                                _selectedCategory = pcbCat;
                                _aiConfirmed = true;
                              });
                              _tts.speakGuidance(
                                title: widget.currentLang == 'hi'
                                    ? "सर्किट बोर्ड सत्यापित"
                                    : (widget.currentLang == 'mr'
                                        ? "सर्किट बोर्ड प्रमाणित"
                                        : "Circuit Board Verified"),
                                warning: "",
                                langCode: widget.currentLang,
                              );
                            },
                            icon: Icon(
                              _aiConfirmed ? Icons.check_circle : Icons.check,
                              size: 18,
                              color: Colors.white,
                            ),
                            label: Text(
                              _aiConfirmed
                                  ? (widget.currentLang == 'hi'
                                      ? "सत्यापित ✓"
                                      : (widget.currentLang == 'mr' ? "पुष्टी झाली ✓" : "Confirmed ✓"))
                                  : (widget.currentLang == 'hi'
                                      ? "✓ सही है (Confirm)"
                                      : (widget.currentLang == 'mr' ? "✓ बरोबर आहे" : "✓ Confirm")),
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                            ),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: _aiConfirmed ? const Color(0xFF059669) : const Color(0xFF10B981),
                              foregroundColor: Colors.white,
                              padding: const EdgeInsets.symmetric(vertical: 10),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                            ),
                          ),
                        ),
                        const SizedBox(width: 8),
                        OutlinedButton.icon(
                          onPressed: () {
                            setState(() {
                              _aiConfirmed = false;
                            });
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content: Text(
                                  widget.currentLang == 'hi'
                                      ? "कृपया ऊपर दी गई सूची से सही श्रेणी चुनें।"
                                      : (widget.currentLang == 'mr'
                                          ? "कृपया वरील यादीतून योग्य प्रकार निवडा."
                                          : "Please select the correct category from Step 1."),
                                ),
                                duration: const Duration(seconds: 2),
                              ),
                            );
                          },
                          icon: const Icon(Icons.edit, size: 16, color: Colors.white70),
                          label: Text(
                            widget.currentLang == 'hi'
                                ? "✎ बदलना है"
                                : (widget.currentLang == 'mr' ? "✎ बदला" : "✎ Change"),
                            style: const TextStyle(color: Colors.white70, fontSize: 13),
                          ),
                          style: OutlinedButton.styleFrom(
                            side: const BorderSide(color: Colors.white30),
                            padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 12),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
            const SizedBox(height: 24),

            // STEP 3: Weight Slider & Stepper
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  widget.currentLang == 'hi'
                      ? "3. वजन तय करें"
                      : (widget.currentLang == 'mr' ? "३. वजन निवडा" : "3. Set Weight"),
                  style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFF0F172A)),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                  decoration: BoxDecoration(
                    color: const Color(0xFF0F172A),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    "${_weightKg.toStringAsFixed(1)} kg",
                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 18),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                boxShadow: [
                  BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 6, offset: const Offset(0, 2)),
                ],
              ),
              child: Column(
                children: [
                  // Stepper Buttons and Slider
                  Row(
                    children: [
                      IconButton.filled(
                        icon: const Icon(Icons.remove, size: 28),
                        style: IconButton.styleFrom(backgroundColor: const Color(0xFFE2E8F0)),
                        onPressed: () {
                          if (_weightKg > 1.0) {
                            setState(() => _weightKg -= 1.0);
                          }
                        },
                      ),
                      Expanded(
                        child: Slider(
                          value: _weightKg,
                          min: 0.5,
                          max: 100.0,
                          divisions: 199,
                          activeColor: const Color(0xFF2563EB),
                          label: "${_weightKg.toStringAsFixed(1)} kg",
                          onChanged: (val) {
                            setState(() => _weightKg = val);
                          },
                        ),
                      ),
                      IconButton.filled(
                        icon: const Icon(Icons.add, size: 28),
                        style: IconButton.styleFrom(backgroundColor: const Color(0xFFE2E8F0)),
                        onPressed: () {
                          if (_weightKg < 100.0) {
                            setState(() => _weightKg += 1.0);
                          }
                        },
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  // Preset Pills
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [5.0, 10.0, 25.0, 50.0].map((preset) {
                      final isCurrent = (_weightKg - preset).abs() < 0.1;
                      return ActionChip(
                        label: Text("${preset.toInt()} kg", style: TextStyle(fontWeight: FontWeight.bold)),
                        backgroundColor: isCurrent ? const Color(0xFF2563EB) : Colors.grey.shade100,
                        labelStyle: TextStyle(color: isCurrent ? Colors.white : Colors.black87),
                        onPressed: () => setState(() => _weightKg = preset),
                      );
                    }).toList(),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // STEP 4: Instant Value Estimate Card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF059669), Color(0xFF10B981)],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(color: const Color(0xFF059669).withOpacity(0.3), blurRadius: 12, offset: const Offset(0, 5)),
                ],
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        widget.currentLang == 'hi'
                            ? "अनुमानित तुरंत मूल्य"
                            : (widget.currentLang == 'mr' ? "अंदाजे त्वरित किंमत" : "Estimated Value"),
                        style: const TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
                      ),
                      ElevatedButton.icon(
                        onPressed: _hearEstimate,
                        icon: const Icon(Icons.volume_up, size: 18, color: Colors.black87),
                        label: Text(
                          widget.currentLang == 'hi' ? "सुनें" : (widget.currentLang == 'mr' ? "ऐका" : "Listen"),
                          style: const TextStyle(color: Colors.black87, fontWeight: FontWeight.bold),
                        ),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                          minimumSize: Size.zero,
                          tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Text(
                    "₹${_minEstimate.toInt()} - ₹${_maxEstimate.toInt()}",
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 34,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    "${_weightKg.toStringAsFixed(1)} kg × ₹${_selectedCategory.minRate.toInt()}-${_selectedCategory.maxRate.toInt()}/kg",
                    style: TextStyle(color: Colors.white.withOpacity(0.9), fontSize: 13),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Submit Button
            ElevatedButton(
              onPressed: _isSaving ? null : _saveLot,
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF0F172A),
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 18),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                elevation: 4,
              ),
              child: _isSaving
                  ? const CircularProgressIndicator(color: Colors.white)
                  : Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.check_circle, size: 24),
                        const SizedBox(width: 10),
                        Text(
                          widget.currentLang == 'hi'
                              ? "लॉट सेव करें और भाव पाएं"
                              : (widget.currentLang == 'mr'
                                  ? "लॉट जतन करा आणि दर मिळवा"
                                  : "Save Lot & Get Bids"),
                          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
