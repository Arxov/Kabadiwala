import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    
    return Scaffold(
      appBar: AppBar(
        title: Text('E-Waste Connect'),
        actions: [
          IconButton(
            icon: const Icon(Icons.language),
            onPressed: () {
              // Language switcher logic here
            },
          )
        ],
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _buildActionTile(
                context, 
                title: l10n.priceBoard, 
                icon: Icons.monetization_on, 
                color: Colors.green.shade100,
                onTap: () {}
              ),
              const SizedBox(height: 16),
              _buildActionTile(
                context, 
                title: l10n.newLot, 
                icon: Icons.camera_alt, 
                color: Colors.blue.shade100,
                onTap: () {}
              ),
              const SizedBox(height: 16),
              _buildActionTile(
                context, 
                title: l10n.findRecycler, 
                icon: Icons.search, 
                color: Colors.orange.shade100,
                onTap: () {}
              ),
              const SizedBox(height: 16),
              _buildActionTile(
                context, 
                title: l10n.myEarnings, 
                icon: Icons.account_balance_wallet, 
                color: Colors.purple.shade100,
                onTap: () {}
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildActionTile(BuildContext context, {required String title, required IconData icon, required Color color, required VoidCallback onTap}) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        height: 120,
        decoration: BoxDecoration(
          color: color,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 48, color: Colors.black87),
            const SizedBox(height: 8),
            Text(
              title, 
              style: const TextStyle(
                fontSize: 24, 
                fontWeight: FontWeight.bold,
                color: Colors.black87
              )
            ),
          ],
        ),
      ),
    );
  }
}
