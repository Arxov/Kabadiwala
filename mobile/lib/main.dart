import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'core/database/database.dart';
import 'features/home/home_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final db = AppDatabase();
  runApp(MyApp(database: db));
}

class MyApp extends StatelessWidget {
  final AppDatabase database;
  
  const MyApp({Key? key, required this.database}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'E-Waste Connect',
      theme: ThemeData(
        primarySwatch: Colors.green,
        # FIX: Removed fontFamily: 'AppIcons' which caused all text to render as wingdings/symbols
        scaffoldBackgroundColor: const Color(0xFFF5F5F5),
      ),
      localizationsDelegates: const [
        AppLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: const [
        Locale('hi', ''), // Hindi
        Locale('mr', ''), // Marathi
        Locale('en', ''), // English
      ],
      home: const HomeScreen(),
    );
  }
}
