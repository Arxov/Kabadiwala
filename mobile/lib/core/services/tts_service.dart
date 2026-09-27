import 'package:flutter_tts/flutter_tts.dart';

class TtsService {
  static final TtsService _instance = TtsService._internal();
  factory TtsService() => _instance;
  TtsService._internal();

  final FlutterTts _flutterTts = FlutterTts();
  bool _isInitialized = false;

  Future<void> init() async {
    if (_isInitialized) return;
    try {
      await _flutterTts.setSpeechRate(0.45); // Slower speech rate for clarity for low-literacy users
      await _flutterTts.setVolume(1.0);
      await _flutterTts.setPitch(1.0);
      _isInitialized = true;
    } catch (e) {
      // Gracefully handle environments without TTS engine
      print("TTS initialization notice: $e");
    }
  }

  Future<void> speak(String text, {String langCode = 'hi'}) async {
    try {
      await init();
      String ttsLang = 'hi-IN';
      if (langCode == 'mr') {
        ttsLang = 'mr-IN';
      } else if (langCode == 'en') {
        ttsLang = 'en-IN';
      }
      await _flutterTts.setLanguage(ttsLang);
      await _flutterTts.stop();
      await _flutterTts.speak(text);
    } catch (e) {
      print("TTS Speak fallback: $text");
    }
  }

  Future<void> stop() async {
    try {
      await _flutterTts.stop();
    } catch (e) {
      // Ignored
    }
  }

  Future<void> speakPrice({
    required String categoryName,
    required double price,
    required double minPrice,
    required double maxPrice,
    required String langCode,
  }) async {
    String text;
    if (langCode == 'hi') {
      text = "$categoryName का आज का भाव है ₹${price.toInt()} प्रति किलो। आज का न्यूनतम भाव ₹${minPrice.toInt()} और उच्चतम भाव ₹${maxPrice.toInt()} है।";
    } else if (langCode == 'mr') {
      text = "$categoryName चा आजचा भाव आहे ₹${price.toInt()} रुपये प्रति किलो. आजचा किमान दर ₹${minPrice.toInt()} आणि कमाल दर ₹${maxPrice.toInt()} रुपये आहे.";
    } else {
      text = "Today's rate for $categoryName is ₹${price.toInt()} per kilogram. Market range is ₹${minPrice.toInt()} to ₹${maxPrice.toInt()}.";
    }
    await speak(text, langCode: langCode);
  }

  Future<void> speakValueEstimate({
    required String categoryName,
    required double weight,
    required double minVal,
    required double maxVal,
    required String langCode,
  }) async {
    String text;
    if (langCode == 'hi') {
      text = "$weight किलो $categoryName का अनुमानित मूल्य ₹${minVal.toInt()} से ₹${maxVal.toInt()} के बीच है।";
    } else if (langCode == 'mr') {
      text = "$weight किलो $categoryName ची अंदाजे किंमत ₹${minVal.toInt()} ते ₹${maxVal.toInt()} रुपयांपर्यंत आहे.";
    } else {
      text = "Estimated value for $weight kilograms of $categoryName is between ₹${minVal.toInt()} and ₹${maxVal.toInt()}.";
    }
    await speak(text, langCode: langCode);
  }
}
