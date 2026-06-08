export const PRICE = "$4.99";
export const OLD_PRICE = "$9.99";
export const CHECKOUT_URL = "PASTE_CHECKOUT_LINK_HERE";

// Upload these image files manually to public/images/sage-clog/ before production launch.
export const product = {
  name: "Crochet Baby Clog Pattern, Structured Sage Green Shoes Tutorial PDF Download",
  shortName: "Baby Clog Pattern PDF",
  brand: "dyasse shop",
  price: PRICE,
  oldPrice: OLD_PRICE,
  checkoutUrl: CHECKOUT_URL,
  route: "/sage-baby-clog-pattern",
  seoTitle: "Crochet Baby Clog Pattern PDF | Structured Sage Green Baby Shoes Tutorial",
  seoDescription:
    "Premium digital crochet pattern for structured sage green baby clogs with 7-hole toe detail, pivoting strap, diagrams, and sizes 0–9 months.",
  language: "English",
  skillLevel: "Confident beginner to intermediate / intermediate",
  sizes: [
    { label: "0–3 months", sole: "approx. 3.75 in / 9.5 cm sole" },
    { label: "3–6 months", sole: "approx. 4.25 in / 10.8 cm sole" },
    { label: "6–9 months", sole: "approx. 4.75 in / 12 cm sole" }
  ],
  heroBullets: [
    "Main pattern + diagrams companion included",
    "Sizes 0–3M, 3–6M, 6–9M",
    "Structured shape, clean edging, and photo-inspired finishing",
    "Instant digital download — no physical item shipped"
  ],
  gallery: [
    {
      src: "/images/sage-clog/hero-pair.jpg",
      alt: "Pair of sage green crochet baby clogs with rounded ventilated toes on cream fabric",
      caption: "Rounded ventilated toe"
    },
    {
      src: "/images/sage-clog/baby-wearing.jpg",
      alt: "Baby wearing handmade sage green structured crochet baby clogs",
      caption: "Boutique baby gift styling"
    },
    {
      src: "/images/sage-clog/strap-demo.jpg",
      alt: "Side view of sage crochet baby clog showing pivoting strap and wooden button",
      caption: "Pivoting button strap"
    },
    {
      src: "/images/sage-clog/macro-button.jpg",
      alt: "Close-up of wooden button and dense sage crochet X-stitch texture",
      caption: "Dense X-stitch texture"
    },
    {
      src: "/images/sage-clog/ipad-pattern.jpg",
      alt: "iPad mockup displaying the crochet baby clog PDF pattern and diagrams",
      caption: "PDF pattern + diagrams"
    }
  ],

  funnelFixes: [
    {
      step: "01",
      title: "Sharper above-the-fold promise",
      text: "Price, instant access, product format, and finished-result benefit are visible before the first scroll."
    },
    {
      step: "02",
      title: "Objection handling in sequence",
      text: "The page clarifies digital-only delivery, skill level, sizes, materials, diagrams, and baby-safety notes before checkout."
    },
    {
      step: "03",
      title: "Stronger purchase bridge",
      text: "A value stack, launch price, repeated CTAs, social proof, and sticky mobile bar keep the next action obvious."
    }
  ],
  makeCards: [
    "Rounded toe dome with 7-hole front",
    "Ridged platform-style sole",
    "Pivoting heel strap",
    "Wooden button details",
    "Compact X-stitch texture",
    "Boutique baby gift finish"
  ],
  inside: [
    "Step-by-step written instructions in English",
    "Main pattern manuscript",
    "Diagrams & charts companion",
    "Gauge, sizing, materials, abbreviations",
    "Sole foundation and double sole join",
    "Toe box construction with centered 7-hole layout",
    "Heel cup and corded opening edge",
    "Pivoting strap and button assembly",
    "Finishing, blocking, troubleshooting, and QA checklist"
  ],

  process: [
    {
      step: "Step 1",
      title: "Download the PDF",
      text: "Open the main pattern and diagrams companion on your phone, tablet, or printout."
    },
    {
      step: "Step 2",
      title: "Build the sole and toe",
      text: "Follow the structured foundation, rounded canopy, and centered ventilation layout."
    },
    {
      step: "Step 3",
      title: "Finish the boutique details",
      text: "Add the corded rim, pivoting strap, wooden buttons, blocking, and final QA checks."
    }
  ],
  materials: [
    "Premium 100% cotton yarn, sage or olive green",
    "2.5 mm hook recommended",
    "15–20 mm wooden buttons",
    "Stitch markers",
    "Tapestry needle",
    "Scissors",
    "Optional EVA foam support"
  ],

  valueStack: [
    "Main written PDF pattern in English",
    "Diagrams/charts companion for visual support",
    "Three baby sizes from 0–9 months",
    "Structured sole, toe, strap, and finishing instructions",
    "Gauge, materials, abbreviations, troubleshooting, and QA checklist",
    "Instant digital access after checkout"
  ],
  reviews: [
    { quote: "These are adorable. I haven't started this project but I am looking forward to it.", author: "Sandra" },
    {
      quote: "Seller was very helpful in getting pattern to me. I can’t wait to make this pattern. This is so adorable.",
      author: "Stephanie"
    },
    { quote: "Making new baby shoes for my great grandson.", author: "Beverley" },
    { quote: "Great and easy to follow pattern.", author: "Karen" },
    { quote: "Darling pattern easy to read instructions. Perfect for baby gift.", author: "Sharon" },
    { quote: "Very comprehensive pattern to follow.", author: "Kimberley" }
  ],
  faqs: [
    {
      question: "Is this a finished pair of baby clogs?",
      answer:
        "No. This is a digital crochet pattern PDF only. Finished clogs, yarn, buttons, and physical materials are not included."
    },
    {
      question: "What skill level is this pattern?",
      answer:
        "It is best for confident beginners to intermediate crocheters who are comfortable with basic crochet stitches and following structured instructions."
    },
    { question: "What sizes are included?", answer: "0–3 months, 3–6 months, and 6–9 months." },
    { question: "What language is the pattern written in?", answer: "English, using US crochet terminology." },
    { question: "Do I get diagrams?", answer: "Yes. The download includes the main pattern plus a diagrams/charts companion." },
    {
      question: "Can I sell finished clogs made from this pattern?",
      answer:
        "Yes, finished handmade items may be sold in small quantities with credit to dyasse shop as the designer. The pattern file itself may not be copied, shared, resold, uploaded, or redistributed."
    },
    {
      question: "Is this suitable as a baby shower gift project?",
      answer:
        "Yes. The design is ideal for handmade baby gifts, provided all buttons are sewn securely and inspected before use."
    }
  ]
};

export const isPlaceholderCheckout = CHECKOUT_URL === "PASTE_CHECKOUT_LINK_HERE";
export const ctaHref = isPlaceholderCheckout ? "#checkout" : CHECKOUT_URL;
