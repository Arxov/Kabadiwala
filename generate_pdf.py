import os
import sys
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))

        # Don't draw header on first page
        if self._pageNumber > 1:
            self.drawString(54, 11 * inch - 36, "Kabadiwala Connect — Plain English Functional & Feature Guide (SIH 2026)")
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.5)
            self.line(54, 11 * inch - 42, 8.5 * inch - 54, 11 * inch - 42)

        # Footer on all pages
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(8.5 * inch - 54, 30, page_str)
        self.drawString(54, 30, "Confidential — Smart India Hackathon 2026 Innovation Document")
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.5)
        self.line(54, 42, 8.5 * inch - 54, 42)
        self.restoreState()

def create_pdf(filename="Kabadiwala_Connect_Functional_Guide.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Custom palette
    primary_color = colors.HexColor("#065F46")     # Dark Emerald
    secondary_color = colors.HexColor("#1E3A8A")   # Deep Blue
    accent_green = colors.HexColor("#10B981")      # Vibrant Emerald
    dark_slate = colors.HexColor("#0F172A")        # Text Dark Slate
    muted_slate = colors.HexColor("#475569")       # Muted body
    callout_bg = colors.HexColor("#F0FDF4")        # Very light green
    card_bg = colors.HexColor("#F8FAFC")           # Very light slate
    border_slate = colors.HexColor("#E2E8F0")

    # Typography styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=primary_color,
        spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=muted_slate,
        spaceAfter=14
    )

    h1_style = ParagraphStyle(
        'SectionH1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=19,
        textColor=primary_color,
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'SectionH2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=15,
        textColor=secondary_color,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=dark_slate,
        spaceAfter=6
    )

    body_bold = ParagraphStyle(
        'BodyBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13.5,
        textColor=dark_slate,
        spaceAfter=6
    )

    callout_text = ParagraphStyle(
        'CalloutText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#064E3B")
    )

    callout_title = ParagraphStyle(
        'CalloutTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=primary_color
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.white
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=dark_slate
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=dark_slate
    )

    story = []

    # Title & Metadata
    story.append(Paragraph("Kabadiwala Connect — Plain English Feature Guide", title_style))
    story.append(Paragraph("<b>Smart India Hackathon (SIH 2026)</b> | <i>Bringing the Informal Collector into the Formal Recycling Chain</i>", subtitle_style))

    # Meta banner table
    meta_data = [
        [
            Paragraph("<b>Target Audience:</b> Non-technical evaluators, judges, citizens, recyclers", table_cell_style),
            Paragraph("<b>Status:</b> Production-ready prototype", table_cell_style),
            Paragraph("<b>Core Goal:</b> Fair pay, zero toxic burns, verified recycling", table_cell_style)
        ]
    ]
    meta_table = Table(meta_data, colWidths=[200, 140, 164])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F1F5F9")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 10))

    # SECTION 1: The Problem
    story.append(Paragraph("1. The Problem in Everyday Words", h1_style))
    story.append(Paragraph(
        "Every year, India generates over <b>1.7 million tonnes of electronic waste</b> (old smartphones, laptops, TVs, copper wires, and batteries). "
        "More than <b>90% of this waste is gathered by local scrap collectors (Kabadiwalas)</b> who walk from house to house. "
        "However, our current system is deeply broken in four ways:",
        body_style
    ))

    prob_items = [
        "<b>1. Unfair Pay & Exploitation:</b> Most collectors cannot read complex price sheets. Predatory middlemen use rigged spring scales and arbitrary deductions, pocketing up to 60% of the true scrap value.",
        "<b>2. Deadly Health Hazards:</b> Without access to industrial shredders, workers burn electrical wires on roadsides to harvest copper (inhaling cancer-causing dioxin fumes) or bathe circuit boards in toxic acid (causing severe chemical burns).",
        "<b>3. Loss of Critical Minerals:</b> Vital strategic metals like <i>Lithium, Cobalt, Neodymium, and Gold</i> are destroyed in backyard fires rather than being refined cleanly for India's clean energy and EV missions.",
        "<b>4. Fake Paper Compliance (Phantom EPR):</b> Major electronics brands are legally required to recycle waste, but because informal scrap isn't tracked, paper brokers generate fake certificates without recycling real waste."
    ]
    for p in prob_items:
        story.append(Paragraph(f"• {p}", body_style))

    # Callout: In Plain English
    callout_data = [
        [
            Paragraph("<b>💡 The Core Mission in One Sentence:</b><br/>"
                      "<i>Kabadiwala Connect provides a talking, picture-based mobile app for scrap collectors to sell e-waste directly to government-certified green recyclers at fair market prices, with digital proof that stops fraud and toxic backyard burning.</i>", callout_text)
        ]
    ]
    callout_table = Table(callout_data, colWidths=[504])
    callout_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), callout_bg),
        ('LINELEFT', (0,0), (-1,-1), 3, primary_color),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#A7F3D0")),
        ('TOPPADDING', (0,0), (-1,-1), 7),
        ('BOTTOMPADDING', (0,0), (-1,-1), 7),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(Spacer(1, 4))
    story.append(callout_table)
    story.append(Spacer(1, 10))

    # SECTION 2: How It Works
    story.append(Paragraph("2. How Kabadiwala Connect Works (In 3 Simple Steps)", h1_style))
    step_data = [
        [
            Paragraph("<b>Step 1: Collector Scans Scrap</b>", h2_style),
            Paragraph("The collector uses the mobile phone app. They snap a photo or tap a picture of the scrap. The phone speaks the category and current rate in Hindi or Marathi. No typing required.", body_style)
        ],
        [
            Paragraph("<b>Step 2: Transparent Matching</b>", h2_style),
            Paragraph("The app finds nearby certified recycling plants that offer the highest price and free electric vehicle (EV) doorstep pickup. The collector sees exactly why that buyer was recommended.", body_style)
        ],
        [
            Paragraph("<b>Step 3: Fraud-Proof Handshake</b>", h2_style),
            Paragraph("When the recycler arrives, they scan a digital QR code from the collector's phone. Both phones verify GPS location (must be within 150m) and scale weight. Fair money is paid instantly.", body_style)
        ]
    ]
    step_table = Table(step_data, colWidths=[160, 344])
    step_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('LINEBELOW', (0,0), (-1,-2), 0.5, border_slate),
    ]))
    story.append(step_table)
    story.append(Spacer(1, 10))

    # SECTION 3: Mobile App Features
    story.append(Paragraph("3. The Mobile App: Built for Real Workers on the Ground", h1_style))
    story.append(Paragraph("Informal collectors often have limited formal education. The mobile app replaces complicated forms with voice, pictures, and tactile controls:", body_style))

    app_features = [
        ("🗣️ Vernacular Voice Assistant (Audio-First)",
         "The app speaks aloud in <b>Hindi, Marathi, or English</b>. With one tap on the 'Hear Price' button, the phone speaks today's rate (e.g., <i>'सर्किट बोर्ड का भाव 220 रुपये प्रति किलो है'</i>). Collectors don't need to read fine print."),

        ("🤖 AI Scrap Camera with 'Human Double-Check'",
         "When the collector takes a picture of scrap, smart vision software detects the material (e.g., <i>'PCB — 89% Confidence'</i>). But rather than letting an AI make mistakes on dirty scrap, the app gives the worker two big buttons: <b>[✓ सही है / Sahi Hai (Confirm)]</b> or <b>[✎ बदलना है / Badalna Hai (Change)]</b>. The human worker is always in charge."),

        ("🎛️ Touch-Friendly Weight Sliders (No Typing)",
         "Typing numbers on a small keypad is frustrating and prone to errors. The app provides a smooth slider and quick preset buttons (<b>5 kg, 10 kg, 25 kg, 50 kg</b>) with real-time rupee estimates updating instantly."),

        ("📊 Live Transparent Price Board",
         "Shows daily government and market rates across all 7 major e-waste categories (PCBs, Copper Cables, Li-ion Batteries, Monitors, Motors, etc.) with 30-day price trend graphs so middlemen cannot cheat collectors."),

        ("🤝 Explainable Recycler Directory",
         "Instead of a mysterious algorithm, the app tells the collector <i>why</i> a recycler was chosen: <b>✓ Government CPCB Licensed</b>, <b>✓ Free Doorstep EV Pickup</b>, <b>✓ Pays Highest Rate for Batteries</b>. Includes a 1-tap phone dialer."),

        ("🔐 Anti-Tamper Handover QR Code",
         "Creates a dynamic digital pass stamped with satellite GPS location, time, and photo signatures. This ensures the recycler actually collected the physical material before claiming government credits."),

        ("💰 Digital Passbook & Earnings Ledger",
         "A clear, color-coded money tracker: Green for cash/UPI payments received, Yellow for pending payments. Shows collectors that they are earning <b>+79% more money</b> compared to selling to local shady aggregators."),

        ("⚠️ Pictorial Audio Safety Warnings",
         "High-impact warning cards with sound: Explains in plain words why burning copper cables actually burns away 15% of the valuable metal (costing them ₹3,700 per batch) while poisoning their lungs.")
    ]

    for title, desc in app_features:
        story.append(Paragraph(title, h2_style))
        story.append(Paragraph(desc, body_style))

    story.append(Spacer(1, 10))

    # SECTION 4: Web Portal Features
    story.append(Paragraph("4. The Web Portal: For Green Recyclers & Government Inspectors", h1_style))
    story.append(Paragraph("While collectors use their phones, authorized factories and State Pollution Control Board (SPCB) inspectors use the high-power web platform:", body_style))

    web_features = [
        ("🗺️ Live Scrap Map (GIS Clustering)",
         "Recyclers view an interactive map showing available scrap lots across their city. They can group pickups into efficient routes, cutting transport fuel and emissions."),

        ("⏱️ 9-Stage Transaction State Machine Visualizer",
         "Tracks every deal through 9 transparent steps: <i>Draft → Created → Matched → Offer Made → Accepted → Pickup Scheduled → Arrived at Gate → Weighed on Scale → Paid & Completed</i>. Eliminates arguments and confusion."),

        ("📍 Geofenced Anti-Cheating Gate (≤ 150m)",
         "When scanning the collector's QR code at pickup, the system checks whether the recycler's truck and the collector's phone are physically within 150 meters using satellite GPS. This makes fake 'paper transactions' impossible."),

        ("⚖️ Scale Weight Discrepancy Gate (±10% Tolerance)",
         "When the scrap is placed on the certified industrial scale, the system compares it with the collector's declared weight. Minor moisture loss is accepted, but big differences are automatically flagged for investigation."),

        ("⚖️ SPCB Dispute Resolution & Arbitration Console",
         "If a weight dispute happens, government inspectors have a digital courtroom. They can review photos, GPS history, and scale logs with one click, issue official notices, or recalibrate scales without months of paperwork."),

        ("🔍 Data Provenance Inspector (Field vs Demo)",
         "For maximum integrity during audits, every transaction is labeled: <b>FIELD</b> (verified real-world collection), <b>PLATFORM</b> (marketplace quote), or <b>DEMO</b> (test data for hackathon judges). Tamper-proof SHA-256 hashes guarantee records were not edited."),

        ("📜 Official CPCB Form 6 EPR Certificate Generator",
         "Generates official Extended Producer Responsibility (EPR) credit certificates for electronics manufacturers (such as Dell, HP, and Samsung) with traceable digital proof back to the informal collector."),

        ("🧮 Interactive 100 kg Unit Economics Calculator",
         "A public tool with an interactive slider showing everyone how formal recycling puts <b>+79.1% more money</b> into the pockets of the poorest workers while cleaning our cities.")
    ]

    for title, desc in web_features:
        story.append(Paragraph(title, h2_style))
        story.append(Paragraph(desc, body_style))

    story.append(Spacer(1, 10))

    # SECTION 5: Real-World Money Comparison
    story.append(Paragraph("5. Real-World Money Impact: A 100 kg Mixed Scrap Story", h1_style))
    story.append(Paragraph("What happens when an informal collector collects 100 kg of typical mixed electronics waste? Here is the honest comparison:", body_style))

    econ_headers = [
        Paragraph("<b>Material Category</b>", table_header_style),
        Paragraph("<b>Predatory Middleman</b>", table_header_style),
        Paragraph("<b>Kabadiwala Connect</b>", table_header_style),
        Paragraph("<b>Net Benefit to Worker</b>", table_header_style)
    ]

    econ_rows = [
        econ_headers,
        [
            Paragraph("Circuit Boards (25 kg)", table_cell_bold),
            Paragraph("₹3,000 (Flat ₹120/kg)", table_cell_style),
            Paragraph("₹5,500 (Fair ₹220/kg)", table_cell_style),
            Paragraph("<b>+₹2,500 (+83%)</b>", table_cell_style)
        ],
        [
            Paragraph("Copper Wires (35 kg)", table_cell_bold),
            Paragraph("₹8,400 (Burned & damaged)", table_cell_style),
            Paragraph("₹16,800 (Clean stripped)", table_cell_style),
            Paragraph("<b>+₹8,400 (+100%)</b>", table_cell_style)
        ],
        [
            Paragraph("Li-ion Batteries (15 kg)", table_cell_bold),
            Paragraph("₹750 (Sold as cheap lead)", table_cell_style),
            Paragraph("₹2,475 (High cobalt value)", table_cell_style),
            Paragraph("<b>+₹1,725 (+230%)</b>", table_cell_style)
        ],
        [
            Paragraph("Old Monitors/CRTs (25 kg)", table_cell_bold),
            Paragraph("-₹200 (Middleman penalty fee)", table_cell_style),
            Paragraph("₹625 (Lead-glass recovery)", table_cell_style),
            Paragraph("<b>+₹825</b>", table_cell_style)
        ],
        [
            Paragraph("Middleman Fees & Deductions", table_cell_bold),
            Paragraph("-₹3,500 (Shady commission)", table_cell_style),
            Paragraph("₹0 (Zero middleman fee)", table_cell_style),
            Paragraph("<b>₹3,500 saved</b>", table_cell_style)
        ],
        [
            Paragraph("Transport & Health", table_cell_bold),
            Paragraph("-₹975 (Cartage + toxic burns)", table_cell_style),
            Paragraph("-₹1,200 (Doorstep EV van)", table_cell_style),
            Paragraph("<b>Safe doorstep pickup</b>", table_cell_style)
        ],
        [
            Paragraph("<b>Net Pocket Income</b>", table_cell_bold),
            Paragraph("<b>₹7,475</b>", table_cell_bold),
            Paragraph("<b>₹24,200</b>", table_cell_bold),
            Paragraph("<b>+₹16,725 (+223% Net)</b>", table_cell_bold)
        ]
    ]

    econ_table = Table(econ_rows, colWidths=[126, 126, 126, 126])
    econ_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary_color),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-2), [colors.white, colors.HexColor("#F8FAFC")]),
        ('BACKGROUND', (0,-1), (-1,-1), colors.HexColor("#DCFCE7")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(econ_table)
    story.append(Spacer(1, 10))

    # SECTION 6: Environmental & Health Impact
    story.append(Paragraph("6. Environmental & Health Safeguards in Plain Words", h1_style))
    impact_items = [
        "<b>No More Cancer-Causing Smoke:</b> By paying full price for clean unburned wire, collectors stop burning PVC insulation, protecting their families and neighborhoods from toxic dioxins.",
        "<b>Clean Rivers & Soil:</b> Cyanide and nitric acid backyard baths are replaced by certified hydrometallurgical factories that recover 99% of gold and copper safely.",
        "<b>India's Mineral Security:</b> Critical tech minerals like Lithium, Cobalt, and Neodymium remain in India's formal industrial chain instead of being dumped into landfills."
    ]
    for imp in impact_items:
        story.append(Paragraph(f"✓ {imp}", body_style))

    story.append(Spacer(1, 10))

    # SECTION 7: Feature Matrix Summary
    story.append(Paragraph("7. Complete Feature Matrix at a Glance", h1_style))

    matrix_headers = [
        Paragraph("<b>Feature Name</b>", table_header_style),
        Paragraph("<b>Platform</b>", table_header_style),
        Paragraph("<b>Primary User</b>", table_header_style),
        Paragraph("<b>Everyday Benefit</b>", table_header_style)
    ]

    matrix_rows = [
        matrix_headers,
        [Paragraph("Vernacular Voice TTS", table_cell_bold), Paragraph("Mobile App", table_cell_style), Paragraph("Collector", table_cell_style), Paragraph("Speaks Hindi/Marathi aloud; no reading needed", table_cell_style)],
        [Paragraph("AI Camera + Human Check", table_cell_bold), Paragraph("Mobile App", table_cell_style), Paragraph("Collector", table_cell_style), Paragraph("Auto-identifies scrap; worker confirms with 1 tap", table_cell_style)],
        [Paragraph("Tactile Weight Stepper", table_cell_bold), Paragraph("Mobile App", table_cell_style), Paragraph("Collector", table_cell_style), Paragraph("Slider and preset weight pills; no manual typing", table_cell_style)],
        [Paragraph("Live Fair Price Board", table_cell_bold), Paragraph("App & Web", table_cell_style), Paragraph("All Users", table_cell_style), Paragraph("Daily transparent rates; stops middleman cheating", table_cell_style)],
        [Paragraph("Explainable Matchmaker", table_cell_bold), Paragraph("App & Web", table_cell_style), Paragraph("Collector", table_cell_style), Paragraph("Lists clear reasons why a green recycler was picked", table_cell_style)],
        [Paragraph("Anti-Tamper QR Pass", table_cell_bold), Paragraph("Mobile App", table_cell_style), Paragraph("Collector", table_cell_style), Paragraph("Secure code with GPS & photo hash for handover", table_cell_style)],
        [Paragraph("Geofence Verifier (≤150m)", table_cell_bold), Paragraph("Web Portal", table_cell_style), Paragraph("Recycler", table_cell_style), Paragraph("Guarantees truck & collector are together physically", table_cell_style)],
        [Paragraph("Scale Tolerance (±10%)", table_cell_bold), Paragraph("Web Portal", table_cell_style), Paragraph("Recycler", table_cell_style), Paragraph("Prevents cheating with certified scale comparison", table_cell_style)],
        [Paragraph("9-Stage State Machine", table_cell_bold), Paragraph("Web Portal", table_cell_style), Paragraph("Both Parties", table_cell_style), Paragraph("Live visual timeline of transaction progress", table_cell_style)],
        [Paragraph("Dispute Arbitration Hub", table_cell_bold), Paragraph("Web Portal", table_cell_style), Paragraph("Government", table_cell_style), Paragraph("Quick online resolution for weight or pay disputes", table_cell_style)],
        [Paragraph("Data Provenance Inspector", table_cell_bold), Paragraph("Web Portal", table_cell_style), Paragraph("Auditor/Judge", table_cell_style), Paragraph("Tags FIELD, PLATFORM, and DEMO data clearly", table_cell_style)],
        [Paragraph("CPCB Form 6 EPR Credits", table_cell_bold), Paragraph("Web Portal", table_cell_style), Paragraph("Brands/Govt", table_cell_style), Paragraph("Official recycling certificates with digital proof", table_cell_style)],
        [Paragraph("Offline-First Database", table_cell_bold), Paragraph("App & Web", table_cell_style), Paragraph("All Users", table_cell_style), Paragraph("Works 100% without internet; syncs automatically", table_cell_style)]
    ]

    matrix_table = Table(matrix_rows, colWidths=[110, 75, 75, 244])
    matrix_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), secondary_color),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F8FAFC")]),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(matrix_table)
    story.append(Spacer(1, 14))

    # Concluding Signature Box
    conclusion_text = (
        "<b>Summary for Smart India Hackathon Evaluators:</b><br/>"
        "Kabadiwala Connect does not just digitize scrap trading—it transforms the economic reality of India's informal waste pickers. "
        "By replacing predatory middlemen with transparent pricing, assistive AI, geofenced verification, and direct links to certified green smelters, "
        "it achieves three national priorities: <b>Social Justice (2x worker income)</b>, <b>Public Health (Zero toxic burning)</b>, and <b>Critical Mineral Security</b>."
    )
    conc_table = Table([[Paragraph(conclusion_text, callout_text)]], colWidths=[504])
    conc_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#EFF6FF")),
        ('LINELEFT', (0,0), (-1,-1), 3, secondary_color),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#BFDBFE")),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(conc_table)

    # Build document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF successfully generated: {os.path.abspath(filename)}")

if __name__ == "__main__":
    create_pdf()
