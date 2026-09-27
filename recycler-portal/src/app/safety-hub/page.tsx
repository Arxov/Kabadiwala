'use client';

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';

interface SafetyHazard {
  id: string;
  emoji: string;
  titleEn: string;
  titleHi: string;
  titleMr: string;
  dangerEn: string;
  dangerHi: string;
  dangerMr: string;
  financialLossEn: string;
  financialLossHi: string;
  financialLossMr: string;
  safeMethodEn: string;
  safeMethodHi: string;
  safeMethodMr: string;
  formalGainEn: string;
  formalGainHi: string;
  formalGainMr: string;
}

const HAZARDS: SafetyHazard[] = [
  {
    id: 'cable_burn',
    emoji: '🔥',
    titleEn: '1. Never Burn Copper Cables in Open Fires',
    titleHi: '1. तारों और केबल्स को कभी आग में न जलाएं!',
    titleMr: '1. तांब्याच्या तारा चुकूनही आगीत जाळू नका!',
    dangerEn: 'Burning PVC and insulation releases cancer-causing dioxins and hydrochloric acid gas that permanently scar lungs and eyes. Inhaling this smoke shortens life expectancy drastically.',
    dangerHi: 'तार जलाने से निकलने वाला काला जहरीला धुआं (डाइऑक्सिन) फेफड़ों, गले और आंखों को गंभीर नुकसान पहुंचाता है। इससे कैंसर और दमे जैसी जानलेवा बीमारियां होती हैं।',
    dangerMr: 'तारा जाळल्याने निघणारा विषारी धूर फुफ्फुसे आणि डोळ्यांना कायमचे नुकसान करतो. यामुळे कर्करोगाचा मोठा धोका निर्माण होतो.',
    financialLossEn: 'Open burning oxidizes copper and vaporizes up to 15% of the pure metal. Burnt black copper is downgraded by buyers to only ₹390/kg.',
    financialLossHi: 'आग में 15% तांबा जलकर राख हो जाता है! जली हुई काली तार का भाव केवल ₹390/किलो मिलता है।',
    financialLossMr: 'आगीत १५% तांबे जळून नष्ट होते आणि काळ्या तांब्याला फक्त ₹३९०/किलो भाव मिळतो.',
    safeMethodEn: 'Deliver unburnt cables intact to authorized recyclers. They feed cables into automated cold wire-stripping granulators that cleanly peel insulation.',
    safeMethodHi: 'तारों को बिना जलाए अधिकृत रीसाइक्लर को दें। उनके पास तार छीलने की मशीनें हैं।',
    safeMethodMr: 'तारा न जाळता थेट अधिकृत रिसायकलर्सना द्या. त्यांच्याकडे स्वयंचलित मशिन आहेत.',
    formalGainEn: 'Earn ₹480/kg clean bright copper rate — an instant +₹90/kg surplus with zero smoke and zero effort.',
    formalGainHi: 'पूरी साफ तांबे की कीमत ₹480/किलो पाएं! यानी बिना मेहनत प्रति किलो ₹90 ज्यादा मुनाफा।',
    formalGainMr: 'स्वच्छ तांब्याचा पूर्ण भाव ₹४८०/किलो मिळवा — प्रति किलो ₹९० जास्त नफा!',
  },
  {
    id: 'acid_pcb',
    emoji: '🧪',
    titleEn: '2. Stop Acid Leaching & Cyanide Baths on PCBs',
    titleHi: '2. सर्किट बोर्ड (PCB) पर कभी तेजाब या साइनाइड न डालें!',
    titleMr: '2. सर्किट बोर्डवर कधीही ॲसिड किंवा सायनाईड टाकू नका!',
    dangerEn: 'Boiling circuit boards in nitric and hydrochloric acid in open pots releases lethal nitrogen dioxide gas. Backyard sewer disposal poisons municipal drinking water tables for generations.',
    dangerHi: 'कड़ाही में तेजाब उबालने से जहरीली गैस निकलती है और तेजाब के छींटों से शरीर की चमड़ी जल जाती है। नाली में फेंका गया तेजाब पूरे इलाके का पीने का पानी जहरीला कर देता है।',
    dangerMr: 'उकळत्या ॲसिडमुळे त्वचेचे गंभीर भाजणे होते आणि विषारी धूर हवेत पसरतो. नालीत सोडलेले ॲसिड परिसरातील पाणी दूषित करते.',
    financialLossEn: 'Crude acid extracts only 30% of the gold, while all palladium, silver, and rare earths are permanently dissolved and dumped down the drain.',
    financialLossHi: 'हाथ के तेजाब से केवल 30% सोना निकलता है, जबकि पैलेडियम, चांदी और कीमती धातुएं पूरी तरह बर्बाद हो जाती हैं।',
    financialLossMr: 'ॲसिडने फक्त ३०% सोने निघते, तर पॅलॅडियम आणि इतर मौल्यवान धातू वाहून जातात.',
    safeMethodEn: 'Collect motherboards and server cards intact. Certified refineries use closed-loop hydrometallurgy with zero liquid effluent and sealed scrubbers.',
    safeMethodHi: 'पीसीबी को बिना तोड़े बेचें। अधिकृत रिफाइनरी में बंद मशीनों द्वारा बिना किसी प्रदूषण के धातु निकाली जाती है।',
    safeMethodMr: 'पीसीबी न तोडता अखंड विका. बंद हायड्रोमेटलर्जी रिफायनरीत ९८% धातू सुरक्षितपणे मिळतात.',
    formalGainEn: 'Earn ₹220/kg to ₹450/kg for intact populated boards without endangering your skin or family health.',
    formalGainHi: 'पूरे बोर्ड का ₹220 से ₹450/किलो पक्का भाव पाएं, बिना किसी खतरे या तेजाब के खर्च के।',
    formalGainMr: 'अखंड बोर्डसाठी ₹२२० ते ₹४५०/किलो खात्रीशीर भाव मिळवा, आरोग्याची कोणतीही हानी न होता.',
  },
  {
    id: 'crt_smash',
    emoji: '💥',
    titleEn: '3. Do Not Smash CRT TV Screens & Monitors with Hammers',
    titleHi: '3. पुराने टीवी और मॉनिटर के शीशे (CRT) को हथौड़े से न फोड़ें!',
    titleMr: '3. जुन्या टीव्ही आणि मॉनिटरच्या काचा हातोड्याने फोडू नका!',
    dangerEn: 'CRT glass tubes are vacuum-sealed. Hammering causes an explosive inward implosion that fires high-velocity glass shrapnel into eyes. The funnel glass is loaded with toxic lead and barium phosphor dust.',
    dangerHi: 'सीआरटी ट्यूब के अंदर शून्य (वैक्यूम) होता है। हथौड़ा मारते ही कांच अंदर की तरफ फटता है और टुकड़े आंखों में घुस जाते हैं। इसका लेड पाउडर सांस के साथ फेफड़ों में चला जाता है।',
    dangerMr: 'सीआरटी व्हॅक्यूम ट्यूब फुटल्याने काचेचे तुकडे डोळ्यांत जातात आणि लेड पावडरमुळे मेंदू व फुफ्फुसांना विषबाधा होते.',
    financialLossEn: 'Informal scrap yards reject broken, mixed glass because contaminated lead glass cannot be accepted by standard glass cullet recyclers.',
    financialLossHi: 'टूटा हुआ कांच कोई नहीं खरीदता! कबाड़ी उसे कचरा मानकर फेंक देते हैं, जिससे आपका पूरा नुकसान होता है।',
    financialLossMr: 'फुटलेली काच भंगारवाला घेत नाही, त्यामुळे पूर्ण नुकसान होते.',
    safeMethodEn: 'Deliver complete intact television monitors. Authorized facilities use specialized heated diamond-wire cutters to safely separate leaded neck glass from non-leaded face plates.',
    safeMethodHi: 'पूरा टीवी अधिकृत सेंटर पर दें। वहां हीरे के कटर से कांच को बिना फोड़े सुरक्षित अलग किया जाता है।',
    safeMethodMr: 'अखंड टीव्ही अधिकृत केंद्रात द्या. तेथे विशेष डायमंड कटरने लेड सुरक्षित वेगळे केले जाते.',
    formalGainEn: 'Earn ₹12/kg to ₹18/kg for intact CRT monitors plus full value for the internal copper deflection yoke coils.',
    formalGainHi: 'साबुत टीवी का ₹12 से ₹18/किलो और अंदर के तांबे के कॉइल का ₹480/किलो पूरा भाव पाएं।',
    formalGainMr: 'अखंड टीव्हीचा ₹१२ ते ₹१८/किलो आणि आतील तांब्याच्या कॉइलचा पूर्ण ₹४८०/किलो भाव मिळवा.',
  },
  {
    id: 'battery_puncture',
    emoji: '⚠️',
    titleEn: '4. Never Puncture, Crush, or Short-Circuit Lithium Batteries',
    titleHi: '4. लिथियम बैटरी को कभी न फोड़ें, न दबाएं और न ही तार से शॉर्ट करें!',
    titleMr: '4. लिथियम बॅटरीला छिद्र पाडू नका किंवा हातोड्याने चेपू नका!',
    dangerEn: 'Damaging mobile and laptop batteries creates an internal short-circuit that triggers thermal runaway fires exceeding 800°C within seconds. These fires release toxic hydrofluoric acid gas and cannot be put out with water.',
    dangerHi: 'मोबाइल या लैपटॉप की बैटरी फटने पर 800 डिग्री की भयंकर आग लगती है जो पानी से भी नहीं बुझती। इसके जहरीले धुएं से सांस रुक जाती है।',
    dangerMr: 'लिथियम बॅटरी फाटल्यास ८००°C ची भयानक आग लागते आणि विषारी वायू बाहेर पडतो जो पाण्यातही विझत नाही.',
    financialLossEn: 'A ruptured or swollen battery is hazardous cargo that cannot be transported or sold, resulting in complete financial loss and danger of house fires.',
    financialLossHi: 'जली या फूटी हुई बैटरी कोई नहीं लेता, और गोदाम या झोपड़ी में आग लगने का भारी खतरा रहता है।',
    financialLossMr: 'फुटलेली बॅटरी कोणीही घेत नाही आणि घरात आग लागण्याचा मोठा धोका असतो.',
    safeMethodEn: 'Insulate exposed battery terminals with non-conductive tape. Store in dry, cool sand containers and hand over intact in specialized safety boxes.',
    safeMethodHi: 'बैटरी के सिरों (टर्मिनल्स) पर टेप लगाएं और सूखी जगह पर रखें। अधिकृत रीसाइक्लर को साबुत सौंपें।',
    safeMethodMr: 'बॅटरीच्या टोकांवर इन्सुलेशन टेप लावा आणि कोरड्या जागी ठेवा. अधिकृत रिसायकलर्सना सुपूर्द करा.',
    formalGainEn: 'Earn ₹140/kg to ₹180/kg clean rate for intact Li-ion batteries under the Battery Waste Management Rules 2022.',
    formalGainHi: 'साबुत बैटरी का ₹140 से ₹180/किलो सीधा बैंक में या नकद पाएं।',
    formalGainMr: 'अखंड बॅटरीसाठी ₹१४० ते ₹१८०/किलो रोख किंवा बँक खात्यात थेट मिळवा.',
  },
];

export default function SafetyHubPage() {
  const [lang, setLang] = useState<'hi' | 'mr' | 'en'>('hi');
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const handleSpeak = (hazard: SafetyHazard) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Text-to-speech not supported on this browser.');
      return;
    }

    window.speechSynthesis.cancel();

    if (speakingId === hazard.id) {
      setSpeakingId(null);
      return;
    }

    let textToSpeak = '';
    let voiceLang = 'hi-IN';

    if (lang === 'hi') {
      textToSpeak = `${hazard.titleHi}। ${hazard.dangerHi}। ${hazard.financialLossHi}। ${hazard.safeMethodHi}। ${hazard.formalGainHi}`;
      voiceLang = 'hi-IN';
    } else if (lang === 'mr') {
      textToSpeak = `${hazard.titleMr}। ${hazard.dangerMr}। ${hazard.financialLossMr}। ${hazard.safeMethodMr}। ${hazard.formalGainMr}`;
      voiceLang = 'mr-IN';
    } else {
      textToSpeak = `${hazard.titleEn}. ${hazard.dangerEn}. ${hazard.financialLossEn}. ${hazard.safeMethodEn}. ${hazard.formalGainEn}`;
      voiceLang = 'en-IN';
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = voiceLang;
    utterance.rate = 0.9; // Slightly slower for low-literacy clarity
    utterance.pitch = 1.0;

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(hazard.id);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navigation />

      {/* Hero Header */}
      <section className="pt-8 pb-10 border-b border-slate-800 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold mb-2">
                <span>Occupational Health &amp; Safety</span>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                <span>Zero Backyard Hazards</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {lang === 'hi'
                  ? 'कचरा बीनने वाले साथियों के लिए सुरक्षा एवं स्वास्थ्य गाइड'
                  : lang === 'mr'
                  ? 'कचरा वेचणाऱ्या बांधवांसाठी सुरक्षा आणि आरोग्य मार्गदर्शन'
                  : 'Informal Waste Collector Occupational Health & Safety Hub'}
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                {lang === 'hi'
                  ? 'जानलेवा घरेलू तरीकों को बंद करें और अधिकृत रीसाइक्लर के साथ जुड़कर ज्यादा पैसा और बेहतर स्वास्थ्य पाएं।'
                  : lang === 'mr'
                  ? 'धोकादायक घरगुती पद्धती थांबवा आणि अधिकृत रिसायकलर्सशी जोडून जास्त नफा आणि चांगले आरोग्य मिळवा.'
                  : 'Practical, pictorial vernacular guidance educating informal waste workers against toxic cable burning, PCB acid baths, CRT implosion, and battery fires.'}
              </p>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center space-x-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  window.speechSynthesis?.cancel();
                  setSpeakingId(null);
                  setLang('hi');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  lang === 'hi'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                हिंदी
              </button>
              <button
                type="button"
                onClick={() => {
                  window.speechSynthesis?.cancel();
                  setSpeakingId(null);
                  setLang('mr');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  lang === 'mr'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                मराठी
              </button>
              <button
                type="button"
                onClick={() => {
                  window.speechSynthesis?.cancel();
                  setSpeakingId(null);
                  setLang('en');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  lang === 'en'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Hazards List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HAZARDS.map((hazard) => {
            const isPlaying = speakingId === hazard.id;

            return (
              <div
                key={hazard.id}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-7 shadow-2xl flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div>
                  {/* Card Title & Audio Button */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl p-2 rounded-2xl bg-slate-950 border border-slate-800 flex-shrink-0">
                        {hazard.emoji}
                      </span>
                      <h3 className="text-lg font-black text-white leading-tight">
                        {lang === 'hi' ? hazard.titleHi : lang === 'mr' ? hazard.titleMr : hazard.titleEn}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSpeak(hazard)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 flex-shrink-0 transition-all ${
                        isPlaying
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      <span>{isPlaying ? '⏹️' : '🔊'}</span>
                      <span>
                        {isPlaying
                          ? lang === 'hi'
                            ? 'रोकें'
                            : lang === 'mr'
                            ? 'थांबवा'
                            : 'Stop'
                          : lang === 'hi'
                          ? 'आवाज़ सुनें'
                          : lang === 'mr'
                          ? 'ऐका'
                          : 'Hear Audio'}
                      </span>
                    </button>
                  </div>

                  {/* Danger Breakdown */}
                  <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 mb-3 space-y-2">
                    <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs">
                      <span>⚠️</span>
                      <span>
                        {lang === 'hi'
                          ? 'स्वास्थ्य और पर्यावरण का गंभीर खतरा:'
                          : lang === 'mr'
                          ? 'आरोग्य आणि पर्यावरणाचा मोठा धोका:'
                          : 'Health & Environmental Catastrophe:'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {lang === 'hi' ? hazard.dangerHi : lang === 'mr' ? hazard.dangerMr : hazard.dangerEn}
                    </p>
                  </div>

                  {/* Financial Loss */}
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30 mb-3 text-xs text-amber-200">
                    <span className="font-bold block mb-0.5">
                      {lang === 'hi'
                        ? '📉 अनौपचारिक तरीके से आर्थिक नुकसान:'
                        : lang === 'mr'
                        ? '📉 अनधिकृत पद्धतीने होणारे आर्थिक नुकसान:'
                        : '📉 Financial Exploitation / Value Loss:'}
                    </span>
                    <span>
                      {lang === 'hi'
                        ? hazard.financialLossHi
                        : lang === 'mr'
                        ? hazard.financialLossMr
                        : hazard.financialLossEn}
                    </span>
                  </div>

                  {/* Clean Alternative & Profit Gain */}
                  <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
                    <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                      <span>✅</span>
                      <span>
                        {lang === 'hi'
                          ? 'कबाड़ीवाला कनेक्ट सुरक्षित और मुनाफे का तरीका:'
                          : lang === 'mr'
                          ? 'कबाडीवाला कनेक्ट सुरक्षित आणि फायदेशीर पद्धत:'
                          : 'Clean Safe Formal Alternative:'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {lang === 'hi' ? hazard.safeMethodHi : lang === 'mr' ? hazard.safeMethodMr : hazard.safeMethodEn}
                    </p>
                    <div className="text-xs font-bold text-emerald-300 pt-1">
                      {lang === 'hi' ? hazard.formalGainHi : lang === 'mr' ? hazard.formalGainMr : hazard.formalGainEn}
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-500">
                  <span>CPCB Occupational Guideline</span>
                  <span className="text-emerald-400 font-semibold">100% Legal &amp; Safe</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Safety Equipment & Free Tool Lending Program */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              SPCB / Recycler Supported Welfare
            </span>
            <h3 className="text-2xl font-black text-white tracking-tight mt-1">
              Free Safety Gear &amp; Tool Lending Library
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Authorized dismantlers provide informal collectors with safety equipment and mechanical tools at zero deposit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-2xl mb-2 block">✂️</span>
              <h4 className="font-bold text-white text-sm">Mechanical Cable Stripper</h4>
              <p className="text-slate-400 mt-1">
                Hand-cranked rotary stripper that cleanly peels wire jackets in seconds without fire.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-2xl mb-2 block">🧤</span>
              <h4 className="font-bold text-white text-sm">Heavy Nitrile Cut-Proof Gloves</h4>
              <p className="text-slate-400 mt-1">
                Protects hands from sharp PCB soldering pins, shattered glass, and battery acid leaks.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-2xl mb-2 block">🧲</span>
              <h4 className="font-bold text-white text-sm">Insulating Battery Tape &amp; Box</h4>
              <p className="text-slate-400 mt-1">
                Non-conductive terminal wraps and flame-retardant sand boxes for safe Li-ion storage.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <span className="text-2xl mb-2 block">🥽</span>
              <h4 className="font-bold text-white text-sm">Polycarbonate Eye Protection</h4>
              <p className="text-slate-400 mt-1">
                Shields eyes from vacuum implosion glass splinters and metallic dust particles.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
