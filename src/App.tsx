import React, { useState, useEffect } from "react";
import { 
  Search, 
  Moon, 
  Sun, 
  Compass, 
  Heart, 
  BookOpen, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink, 
  Github, 
  Twitter, 
  Instagram, 
  Music, 
  Volume2, 
  VolumeX, 
  PenTool, 
  Plus, 
  Trash2, 
  ArrowUpRight, 
  Feather,
  Info
} from "lucide-react";

// Structure of Poet
interface Verse {
  urdu: string;
  roman: string;
  english: string;
}

interface Poet {
  id: string;
  name: string;
  urduName: string;
  photo: string;
  fallbackInitials: string;
  link: string;
  years: string;
  origin: string;
  category: string;
  description: string;
  famousVerses: Verse[];
  isClassic: boolean;
}

// Initial 12 pre-loaded famous Poets
const INITIAL_POETS: Poet[] = [
  {
    id: "1",
    name: "Mirza Ghalib",
    urduName: "مرزا غالب",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Ghalib.jpg/300px-Ghalib.jpg",
    fallbackInitials: "غ",
    link: "https://allpoetry.com/Mirza-Ghalib",
    years: "1797 - 1869",
    origin: "Agra / Delhi",
    category: "Philosophical",
    description: "The supreme undisputed master of Urdu ghazals. His revolutionary verses capture deep existentialism, philosophical questions, and deep mystical longing.",
    famousVerses: [
      {
        urdu: "ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے\nبہت نکلے مرے ارمان لیکن پھر بھی کم نکلے",
        roman: "Hazaaron khwahishein aisi ke har khwahish pe dam nikle\nBahut nikle mere armaan lekin phir bhi kam nikle",
        english: "Thousands of desires, each so strong that it takes away my breath\nMany of my yearnings were fulfilled, yet many remain incomplete."
      },
      {
        urdu: "دلِ ناداں تجھے ہوا کیا ہے\nآخر اس درد کی دوا کیا ہے",
        roman: "Dil-e-naadaan tujhe hua kya hai\nAakhir is dard ki dawa kya hai",
        english: "O foolish heart, what has suddenly happened to you?\nWhat, after all, is the ultimate remedy for this sweet pain?"
      }
    ],
    isClassic: true
  },
  {
    id: "2",
    name: "Allama Iqbal",
    urduName: "علامہ اقبال",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Allama_Iqbal.jpg/300px-Allama_Iqbal.jpg",
    fallbackInitials: "اق",
    link: "https://allpoetry.com/Allama-Iqbal",
    years: "1877 - 1938",
    origin: "Sialkot / Lahore",
    category: "Philosophical",
    description: "The visionary 'Poet-Philosopher of the East'. He popularized the magical concept of 'Khudi' (self-determination, confidence, and self-respect) to inspire the masses.",
    famousVerses: [
      {
        urdu: "خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے\nخدا بندے سے خود پوچھے بتا تیری رضا کیا ہے",
        roman: "Khudi ko kar buland itna ke har taqdeer se pehle\nKhuda bande se khud pooche bata teri raza kya hai",
        english: "Elevate your selfhood to such height that before writing your destiny,\nGod Himself shall ask thee: Speak! what is your command?"
      },
      {
        urdu: "ستاروں سے آگے جہاں اور بھی ہیں\nابھی عشق کے امتحاں اور بھی ہیں",
        roman: "Sitaaron se aage jahaaan aur bhi hain\nAbhi ishq ke imtihaan aur bhi hain",
        english: "Beyond the shining stars lie worlds yet to explore;\nThere are still other arduous trials of love left to confront."
      }
    ],
    isClassic: true
  },
  {
    id: "3",
    name: "Amir Khusro",
    urduName: "امیر خسرو",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Amir_Khusro.jpg/300px-Amir_Khusro.jpg",
    fallbackInitials: "خ",
    link: "https://allpoetry.com/Amir-Khusro",
    years: "1253 - 1325",
    origin: "Patiali / Delhi",
    category: "Sufiyana",
    description: "Beloved Persian/Urdu Sufi giant and musician. Honored as the 'father of Qawwali' and the father of early Hindustani music cultures.",
    famousVerses: [
      {
        urdu: "خسرو دریا پریم کا، الٹی واکی دھار\nجو اترا سو ڈوب گیا، جو ڈوبا سو پار",
        roman: "Khusro darya prem ka, ulti wa ki dhaar\nJo utra so doob gaya, jo dooba so paar",
        english: "The river of love flows in strange reverse directions;\nOne who enters safely drowns, and one who drowns gets across!"
      },
      {
        urdu: "گوری سووے سیج پر، مکھ پر ڈارے کیس\nچل خسرو گھر اپنے، سانجھ بھیی چہو دیس",
        roman: "Gori sove sej par, mukh par daare kes\nChal Khusro ghar aapne, saanjh bhayi chahu des",
        english: "The fair maiden sleeps on the couch, tresses over her face;\nDepart home now, O Khusro, twilight has blanketed all four corners."
      }
    ],
    isClassic: true
  },
  {
    id: "4",
    name: "Faiz Ahmed Faiz",
    urduName: "فیض احمد فیض",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Faiz_Ahmed_Faiz.jpg/300px-Faiz_Ahmed_Faiz.jpg",
    fallbackInitials: "ف",
    link: "https://allpoetry.com/Faiz-Ahmed-Faiz",
    years: "1911 - 1984",
    origin: "Sialkot / Lahore",
    category: "Revolutionary",
    description: "A legendary Marxist, rebel and romantic. Faiz masterfully wove the language of timeless romantic romance with radical social justice themes.",
    famousVerses: [
      {
        urdu: "مجھ سے پہلی سی محبت مرے محبوب نہ مانگ\nمیں نے سمجھا تھا کہ تو ہے تو درخشاں ہے حیات",
        roman: "Mujh se pehli si mohabbat mere mehboob na maang\nMaine samjha tha ke tu hai to darakhshaan hai hayaat",
        english: "Do not demand from me that first love we shared, my beloved;\nI had once imagined that life was radiant solely because of your presence."
      },
      {
        urdu: "بول کہ لب آزاد ہیں تیرے\nبول زباں اب تک تیری ہے",
        roman: "Bol ke lab aazaad hain tere\nBol zabaan ab tak teri hai",
        english: "Speak, for your lips are free;\nSpeak, for your tongue is still your own."
      }
    ],
    isClassic: true
  },
  {
    id: "5",
    name: "Jaun Elia",
    urduName: "جون ایلیا",
    photo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Jaun_Elia.jpeg",
    fallbackInitials: "ج",
    link: "https://allpoetry.com/Jaun-Elia",
    years: "1931 - 2002",
    origin: "Amroha / Karachi",
    category: "Melancholic",
    description: "An absolute nihilistic renegade. Jaun Elia is worshipped by millions of modern youngsters for his intense, dolorously sarcastic, and raw psychological ghazals.",
    famousVerses: [
      {
        urdu: "شاید مجھے کسی سے محبت نہیں ہوئی\nلیکن یقین سب کو دلاتا رہا ہوں میں",
        roman: "Shayad mujhe kisi se mohabbat nahi hui\nLekin yaqeen sab ko dilata raha hoon mein",
        english: "Perhaps I have never truly fallen in love with anyone;\nYet, I kept assuring everyone that I did."
      },
      {
        urdu: "کیا ستم ہے کہ ہم دونوں کو\nایک دوسرے کو یاد کرنا ہے",
        roman: "Kya sitam hai ke hum dono ko\nEk doosre ko yaad karna hai",
        english: "What absolute irony and agony it is, that both of us\nAre destined to only remember each other."
      }
    ],
    isClassic: true
  },
  {
    id: "6",
    name: "Parveen Shakir",
    urduName: "پروین شاکر",
    photo: "https://upload.wikimedia.org/wikipedia/en/e/e6/ParveenShakir.gif",
    fallbackInitials: "پ",
    link: "https://allpoetry.com/Parveen-Shakir",
    years: "1952 - 1994",
    origin: "Karachi",
    category: "Romantic",
    description: "A legendary queen who brought delicate feminine sensibilities, deep self-exploration, and pure emotional romance to contemporary Urdu ghazals.",
    famousVerses: [
      {
        urdu: "کوبہ کو پھیل گئی بات شناسائی کی\nاس نے خوشبو کی طرح میری پذیرائی کی",
        roman: "Koo-ba-koo phail gayi baat shanaasai ki\nUs ne khushboo ki tarah meri paziraai ki",
        english: "The murmur of our growing acquaintance echoed in every street;\nHe welcomed and cherished me just like a delicate fragrance."
      },
      {
        urdu: "وہ تو خوشبو ہے ہواؤں میں بکھر جائے گا\nمسئلہ پھول کا ہے پھول کدھر جائے گا",
        roman: "Wo to khushboo hai hawaon mein bikhar jayega\nMasla phool ka hai phool کدھر جائے گا",
        english: "He is like a subtle scent, destined to disperse into the winds;\nThe worry is for the loyal flower — where will the flower go?"
      }
    ],
    isClassic: true
  },
  {
    id: "7",
    name: "Ahmad Faraz",
    urduName: "احمد فراز",
    photo: "https://upload.wikimedia.org/wikipedia/commons/6/62/Ahmad_Faraz.jpg",
    fallbackInitials: "ا",
    link: "https://allpoetry.com/Ahmad-Faraz",
    years: "1931 - 2008",
    origin: "Kohat / Peshawar",
    category: "Romantic",
    description: "Universally loved for his beautiful, flowing, and deeply emotional romantic dictions. His ghazals are the crown jewel of modern Mushaira settings.",
    famousVerses: [
      {
        urdu: "اب کے ہم بچھڑے تو شاید کبھی خوابوں میں ملیں\nجس طرح سوکھے ہوئے پھول کتابوں میں ملیں",
        roman: "Ab ke hum bichhde to shayad kabhi khwaabon mein milein\nJis tarah sookhe hue phool kitaabon mein milein",
        english: "If we part ways this time, we might only ever meet in dreams,\nJust like dried-up rose petals are found between the pages of old books."
      },
      {
        urdu: "سنا ہے لوگ اسے آنکھ بھر کے دیکھتے ہیں\nسو اس کے شہر میں کچھ دن ٹھہر کے دیکھتے ہیں",
        roman: "Suna hai log use aankh bhar ke dekhte hain\nSo us ke sheher mein kuch din theher ke dekhte hain",
        english: "I hear that people gaze at her with open, mesmerized eyes;\nSo, let us stay in her city for a few days and witness this ourselves."
      }
    ],
    isClassic: true
  },
  {
    id: "8",
    name: "Bahadur Shah Zafar",
    urduName: "بہادر شاہ ظفر",
    photo: "https://upload.wikimedia.org/wikipedia/commons/2/23/The_last_Mughal_Emperor_Bahadur_Shah_Zafar.jpg",
    fallbackInitials: "ظ",
    link: "https://allpoetry.com/Bahadur-Shah-Zafar",
    years: "1775 - 1862",
    origin: "Delhi / Rangoon",
    category: "Classical",
    description: "The last historical Mughal Emperor. Facing tragic exile in Burma, his mournful classical verses reflect sorrow, longing, and imperial nostalgia.",
    famousVerses: [
      {
        urdu: "عمرِ دراز مانگ کے لائے تھے چار دن\nدو آرزو میں کٹ گئے دو انتظار میں",
        roman: "Umr-e-daraaz maang ke laaye the chaar din\nDo aarzoo mein kat gaye do intezaar mein",
        english: "I was blessed with a lifetime of mere four short days;\nTwo were consumed in wishing, and two passed away in waiting."
      },
      {
        urdu: "کتنا ہے بد نصیب ظفر دفن کے لیے\nدو گز زمین भी نہ ملی کوئے یار میں",
        roman: "Kitna hai bad-naseeb zafar dafn ke liye\nDo gaz zameen bhi na mili koo-e-yaar mein",
        english: "How unfortunate is Zafar! For his final burial,\nHe could not secure even two yards of earth in his beloved's homeland."
      }
    ],
    isClassic: true
  },
  {
    id: "9",
    name: "Mir Taqi Mir",
    urduName: "میر تقی میر",
    photo: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Mir_Taqi_Mir.jpg",
    fallbackInitials: "م",
    link: "https://allpoetry.com/Mir-Taqi-Mir",
    years: "1723 - 1810",
    origin: "Agra / Lucknow",
    category: "Classical",
    description: "Hailed as the 'Khuda-e-Sukhan' (Grandmaster of Poetry). Mir shaped Urdu literature through pristine simplicity, heartbreak, and unmatched grace.",
    famousVerses: [
      {
        urdu: "پتہ پتہ بوٹا بوٹا حال ہمارا جانے ہے\nجانے نہ جانے گل ہی نہ جانے باغ تو سارا جانے ہے",
        roman: "Patta patta boota boota haal humara jaane hai\nJaane na jaane gul hi na jaane baagh to saara jaane hai",
        english: "Every single leaf and every bud knows my quiet suffering;\nOnly the blooming rose stays unaware, while the entire forest sings of my state."
      },
      {
        urdu: "میرؔ ان نیم باز آنکھوں میں\nساری مستی شراب کی سی ہے",
        roman: "Mir un neembaz aankhon mein\nSaari masti sharaab ki si hai",
        english: "O Mir, in those half-closed, dreamy eyes of theirs,\nAll the intoxication matches that of premium wine."
      }
    ],
    isClassic: true
  },
  {
    id: "10",
    name: "Rahat Indori",
    urduName: "راحت اندوری",
    photo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Dr._Rahat_Indori%2C_2016.png",
    fallbackInitials: "ر",
    link: "https://allpoetry.com/Rahat-Indori",
    years: "1950 - 2020",
    origin: "Indore",
    category: "Revolutionary",
    description: "The modern firebrand Mushaira magician. Loved for his booming voice, fearlessness, satirical brilliance, and intense contemporary relevance.",
    famousVerses: [
      {
        urdu: "سبھی کا خون ہے شامل یہاں کی مٹی میں\nکسی کے باپ کا ہندوستاں تھوڑی ہے",
        roman: "Sabhi ka khoon hai shaamil yahaan ki mitti mein\nKisi ke baap ka hindustaan thodi hai",
        english: "Everyone's blood lies mingled deep in this sacred soil;\nThis beloved homeland does not solely belong to any single lineage."
      },
      {
        urdu: "اگر خلاف ہیں ہونے دو جان تھوڑی ہے\nیہ سب دھواں ہے کوئی آسمان تھوڑی ہے",
        roman: "Agar khilaaf hain hone do jaan thodi hai\nYeh sab dhuaan hai koi aasmaan thodi hai",
        english: "If they stand against you, let them be, this is not the end of your soul;\nThis opposition is mere rising smoke, not the unbudging sky."
      }
    ],
    isClassic: false
  },
  {
    id: "11",
    name: "Sahir Ludhianvi",
    urduName: "ساحر لدھیانوی",
    photo: "https://upload.wikimedia.org/wikipedia/commons/5/52/LudhianviPortrait.jpg",
    fallbackInitials: "س",
    link: "https://allpoetry.com/Sahir-Ludhianvi",
    years: "1921 - 1980",
    origin: "Ludhiana / Mumbai",
    category: "Revolutionary",
    description: "The intellectual giant who elevated Hindi/Urdu cinema lyrics to peak literature. Sahir was a champion of humanism and deep political critique.",
    famousVerses: [
      {
        urdu: "وہ افسانہ جسے انجام تک لانا نہ ہو ممکن\nاسے اک خوبصورت موڑ دے کر چھوڑنا اچھا",
        roman: "Wo afsaana jise anjaam tak laana na ho mumkin\nUse ik khoobsurat mod dekar chhodna achha",
        english: "A tale that is impossible to guide towards a meaningful conclusion;\nIt is best to leave it behind after giving it a beautiful, dramatic twist."
      },
      {
        urdu: "تنگ آ چکے ہیں کشمکشِ زندگی سے ہم\nٹھکرا نہ دیں جہاں کو کہیں بے دلی سے ہم",
        roman: "Tang aa chuke hain kashmakash-e-zindagi se hum\nThukra na dein jahaan ko kahin be-dili se hum",
        english: "We have grown utterly weary of life's relentless struggles;\nLest we reject this entire world in our profound listlessness."
      }
    ],
    isClassic: true
  },
  {
    id: "12",
    name: "Jigar Moradabadi",
    urduName: "جگر مرادآبادی",
    photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Jigar_Moradabadi.jpg/300px-Jigar_Moradabadi.jpg",
    fallbackInitials: "جگ",
    link: "https://allpoetry.com/Jigar-Moradabadi",
    years: "1890 - 1960",
    origin: "Moradabad / Gonda",
    category: "Romantic",
    description: "Famous for his outstanding musical ghazal rhythm and intense charm. Jigar captures both ecstatic romance and mystical intoxication beautifully.",
    famousVerses: [
      {
        urdu: "یہ عشق نہیں آساں بس اتنا سمجھ لیجے\nاک آگ کا دریا ہے اور ڈوب کے جانا ہے",
        roman: "Yeh ishq nahi aasaan bas itna samajh lijiye\nIk aag ka darya hai aur doob ke jaana hai",
        english: "This path of love is not easy, understand just this much far;\nIt is a turbulent river of fire, and one must plunge and drown to cross it."
      },
      {
        urdu: "جان کر من جملہ خاصان مے خانہ مجھے\nمدتوں رویا کریں گے جام و پیمانہ مجھے",
        roman: "Jaan kar min jumla khaasan-e-may-khana mujhe\nMuddaton roya karenge jaam-o-paimana mujhe",
        english: "Knowing me as one of the elite souls of the tavern of love,\nThe drinking cups and wine glasses will weep for me for ages."
      }
    ],
    isClassic: true
  }
];

// Beautiful quotes to render in different sections
const GULSHAN_QUOTES = [
  { urdu: "اردو ہے جس کا نام ہمیں جانتے ہیں داغؔ\nسارے جہاں میں دھوم ہماری زباں کی ہے", translation: "Only we know what Urdu is, O Dagh!\nThe reputation of our language spreads across the entire map." },
  { urdu: "بات کرنی مجھے مشکل کبھی ایسی تو نہ تھی\nجیسی اب ہے کہ کسی بات پہ بات آتی ہے", translation: "To speak a word was never quite so difficult as it has become now,\nWhen everything spoken leads to complex dialogues." },
  { urdu: "جہاں میں نکتہ رساں سرمہ سلیمانی کریں\nہم سے سخن فہم بات سن کے ثنا خوانی کریں", translation: "In a world of fine critics, our pure verses echo\nTo make those who appreciate true art sing in glorious praise." }
];

export default function App() {
  const [poets, setPoets] = useState<Poet[]>(() => {
    const saved = localStorage.getItem("gulshan_custom_poets");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return [...INITIAL_POETS, ...parsed];
      } catch (e) {
        return INITIAL_POETS;
      }
    }
    return INITIAL_POETS;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("gulshan_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("gulshan_dark_theme");
    return saved === "true" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [activePoet, setActivePoet] = useState<Poet | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  // Custom Diary state
  const [showDiaryForm, setShowDiaryForm] = useState(false);
  const [newPoetName, setNewPoetName] = useState("");
  const [newPoetUrdu, setNewPoetUrdu] = useState("");
  const [newPoetYears, setNewPoetYears] = useState("");
  const [newPoetDesc, setNewPoetDesc] = useState("");
  const [newPoetCategory, setNewPoetCategory] = useState("Romantic");
  const [newPoetUrduShayari, setNewPoetUrduShayari] = useState("");
  const [newPoetRomanShayari, setNewPoetRomanShayari] = useState("");
  const [newPoetEngShayari, setNewPoetEngShayari] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Sound generator simulation (ambient rain / string sitar focus mode)
  const [isAmbientOn, setIsAmbientOn] = useState(false);
  const [ambientVolume, setAmbientVolume] = useState(0.5);

  // Style state hooks
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("gulshan_dark_theme", String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("gulshan_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Add customized client poet
  const handleCreatePoet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPoetName.trim() || !newPoetDesc.trim()) {
      setErrorMessage("Please fill at least the Poet's Name and Description.");
      return;
    }

    const newPoet: Poet = {
      id: "custom_" + Date.now(),
      name: newPoetName,
      urduName: newPoetUrdu || "شاعر",
      photo: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=200", // generic antique parchment look or book
      fallbackInitials: newPoetName.substring(0, 2).toUpperCase(),
      link: "https://allpoetry.com/",
      years: newPoetYears || "Contemporary",
      origin: "Independent Pen",
      category: newPoetCategory,
      description: newPoetDesc,
      famousVerses: [
        {
          urdu: newPoetUrduShayari || "ہوا ہے غیب سے یہ سخن مجھ پر\nدل کی دھڑکنیں اب غزل بنی ہیں",
          roman: newPoetRomanShayari || "Hua hai ghaib se yeh sukhan mujh par\nDil ki dhadkanein ab ghazal bani hain",
          english: newPoetEngShayari || "This beautiful verse descended upon me from the heavens;\nThe heartbeats of my soul are transformed into a ghazal."
        }
      ],
      isClassic: false
    };

    const currentCustom = localStorage.getItem("gulshan_custom_poets");
    let customList = [];
    if (currentCustom) {
      try {
        customList = JSON.parse(currentCustom);
      } catch (err) {}
    }
    customList.push(newPoet);
    localStorage.setItem("gulshan_custom_poets", JSON.stringify(customList));

    setPoets([...INITIAL_POETS, ...customList]);
    
    // Reset form
    setNewPoetName("");
    setNewPoetUrdu("");
    setNewPoetYears("");
    setNewPoetDesc("");
    setNewPoetUrduShayari("");
    setNewPoetRomanShayari("");
    setNewPoetEngShayari("");
    setShowDiaryForm(false);
    setErrorMessage("");
  };

  const deleteCustomPoet = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const currentCustom = localStorage.getItem("gulshan_custom_poets");
    if (currentCustom) {
      try {
        let customList: Poet[] = JSON.parse(currentCustom);
        customList = customList.filter(p => p.id !== id);
        localStorage.setItem("gulshan_custom_poets", JSON.stringify(customList));
        setPoets([...INITIAL_POETS, ...customList]);
        setFavorites(favorites.filter(favId => favId !== id));
      } catch (err) {}
    }
  };

  // Filter logic
  const filteredPoets = poets.filter(poet => {
    const matchesSearch = 
      poet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poet.urduName.includes(searchQuery) ||
      poet.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || poet.category === selectedCategory;
    const matchesFavorites = !favoritesOnly || favorites.includes(poet.id);

    return matchesSearch && matchesCategory && matchesFavorites;
  });

  // Extract distinct categories available
  const categoriesList = ["All", "Romantic", "Philosophical", "Revolutionary", "Sufiyana", "Melancholic", "Classical"];

  return (
    <div className="min-h-screen transition-colors duration-300 ease-in-out bg-stone-50 dark:bg-zinc-950 text-stone-800 dark:text-gray-100 flex flex-col antialiased">
      
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* STICKY TOP HEADER */}
      <header id="appbar" className="sticky top-0 z-40 bg-white/95 dark:bg-zinc-900/95 border-b border-stone-200 dark:border-zinc-800 shadow-sm backdrop-blur transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 bg-gradient-to-tr from-emerald-800 to-emerald-600 rounded-xl flex items-center justify-center text-amber-300 shadow-lg font-cinzel-dec text-xl tracking-wider select-none">
              گل
            </div>
            <div>
              <h1 id="brand-title" className="text-xl sm:text-2xl font-cinzel font-bold tracking-widest text-emerald-800 dark:text-amber-400">
                GULSHAN-E-URDU-BOL
              </h1>
              <p className="text-xs sm:text-sm font-nastaliq text-stone-500 dark:text-stone-400 select-none -mt-1 tracking-wider text-right">
                گلشنِ اردو بول — The Garden of Legendary Shayari
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* AMBIENT MUSIC COMPONENT TOGGLE */}
            <button
              onClick={() => setIsAmbientOn(!isAmbientOn)}
              title="Serene Ambient Sound"
              className={`p-2.5 rounded-full border transition-all flex items-center space-x-1.5 ${
                isAmbientOn 
                ? "bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-400" 
                : "border-stone-200 dark:border-zinc-800 text-stone-500 dark:text-zinc-400 hover:bg-stone-100 dark:hover:bg-zinc-800"
              }`}
            >
              {isAmbientOn ? (
                <>
                  <Volume2 className="w-5 h-5 animate-pulse" />
                  <span className="text-xs font-semibold hidden md:inline">Zem Zen</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-5 h-5" />
                  <span className="text-xs hidden md:inline font-stone-400 text-stone-400 dark:text-zinc-500">Silence</span>
                </>
              )}
            </button>

            {/* DARK / LIGHT STYLE TRIGGER */}
            <button
              id="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-700 text-stone-700 dark:text-amber-400 rounded-full transition-all border border-stone-200 dark:border-zinc-700 shadow-inner"
              aria-label="Toggle Theme Mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* AMBIENT GENERATOR SIMULATOR AUDIO CONTROL STRIP */}
      {isAmbientOn && (
        <div className="bg-emerald-50/90 dark:bg-emerald-950/20 border-b border-emerald-100 dark:border-emerald-900/40 py-2.5 px-4 transform transition-all duration-300">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-stone-600 dark:text-emerald-300 text-xs">
            <div className="flex items-center space-x-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="font-medium">Playing: Sitar-Flute Mystical Forest Loop (Simulated Ambient Resonance)</span>
            </div>
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <Music className="w-4 h-4 text-emerald-500 shrink-0" />
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05"
                value={ambientVolume}
                onChange={(e) => setAmbientVolume(parseFloat(e.target.value))}
                className="w-full sm:w-32 accent-emerald-600 dark:accent-emerald-400 h-1 bg-stone-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
              />
              <span className="font-mono text-[10px] w-6">{Math.round(ambientVolume * 100)}%</span>
            </div>
          </div>
        </div>
      )}

      {/* HERO BANNER SHOWCASE */}
      <section id="hero" className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 border-b border-stone-200 dark:border-zinc-900 bg-stone-100/50 dark:bg-zinc-900/30 overflow-hidden text-center sm:text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800-400">
              <Feather className="w-3.5 h-3.5 mr-1" />
              Celebrating Classical Language & Poetry
            </span>
            <h1 className="text-3xl sm:text-5xl font-cinzel font-bold text-stone-900 dark:text-stone-100 leading-tight">
              Where Poetry Speaks to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-emerald-700 dark:from-amber-300 dark:to-emerald-400">Restless Soul</span>
            </h1>
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl font-light">
              Step into the fragrant garden (“Gulshan”) of Urdu literature. Discover classical and revolutionary Shayari masters, search distinct categories, and read immortal couplets of world-renowned Urdu legends.
            </p>

            <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start pt-2">
              <a 
                href="#poets-directory" 
                className="px-6 py-3 bg-emerald-800 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white rounded-lg font-medium transition-all transform hover:-translate-y-0.5 shadow-md flex items-center space-x-2"
              >
                <span>Explore Poets</span>
                <Compass className="w-4 h-4" />
              </a>
              <button 
                onClick={() => setShowDiaryForm(true)}
                className="px-6 py-3 bg-amber-50 border border-amber-200 hover:bg-amber-100 dark:bg-zinc-800 dark:border-zinc-700 dark:hover:bg-zinc-700 text-amber-800 dark:text-amber-300 rounded-lg font-medium transition-all flex items-center space-x-2"
              >
                <PenTool className="w-4 h-4" />
                <span>Write Your Own</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center py-4">
            {/* Poet quote spotlight card */}
            <div className="w-full max-w-md bg-stone-50 dark:bg-zinc-900 rounded-2xl border-2 border-stone-200/60 dark:border-zinc-800 p-6 sm:p-7 relative shadow-xl overflow-hidden group">
              <div className="absolute top-0 left-0 w-2.5 h-full bg-gradient-to-b from-amber-400 to-emerald-600" />
              <div className="absolute -right-12 -bottom-12 w-32 h-32 text-emerald-900/5 dark:text-emerald-100/5 pointer-events-none select-none font-nastaliq text-[140px] leading-none">
                ع
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-widest text-amber-600 font-bold dark:text-amber-400 flex items-center">
                  <BookOpen className="w-3.5 h-3.5 mr-1" /> Poet spotlights
                </span>
                <span className="text-stone-400 text-xs">Featured couplet</span>
              </div>

              <blockquote className="space-y-4">
                <p className="font-nastaliq text-right text-xl sm:text-2xl leading-relaxed text-emerald-900 dark:text-emerald-400 py-3 block rtl font-semibold leading-loose">
                  {GULSHAN_QUOTES[0].urdu}
                </p>
                <div className="border-t border-stone-100 dark:border-zinc-800 pt-3">
                  <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 italic font-serif">
                     - {GULSHAN_QUOTES[0].translation}
                  </p>
                  <cite className="block text-right text-xs mt-2 font-cinzel font-bold text-stone-700 dark:text-amber-400 bg-amber-500/10 dark:bg-amber-500/5 px-2 py-0.5 rounded inline-block float-right">
                    DAAGH DEHLVI
                  </cite>
                </div>
              </blockquote>
            </div>
          </div>

        </div>
      </section>

      {/* DICTIONARY MAIN DIRECTORY */}
      <main id="poets-directory" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* INTERACTIVE CONTROLS BAR */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-stone-200 dark:border-zinc-800 p-5 md:p-6 shadow-sm space-y-4 md:space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            {/* Search Box */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 dark:text-zinc-500" />
              <input
                id="search-input"
                type="text"
                placeholder="Search poets by name, category, or bio (e.g. Mirza Ghalib, Romantic)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-stone-100 dark:bg-zinc-800 text-stone-800 dark:text-stone-100 rounded-xl border border-stone-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-700 dark:focus:ring-amber-500 transition-all text-sm font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Bookmarked Filter Toggles */}
            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => setFavoritesOnly(!favoritesOnly)}
                className={`py-2.5 px-4 rounded-xl text-sm font-medium border flex items-center space-x-2 transition-all ${
                  favoritesOnly 
                  ? "bg-amber-100 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-400" 
                  : "border-stone-200 dark:border-zinc-800 hover:bg-stone-50 dark:hover:bg-zinc-800 text-stone-600 dark:text-stone-300"
                }`}
              >
                <Heart className={`w-4.5 h-4.5 ${favoritesOnly ? "fill-current text-rose-500" : ""}`} />
                <span>Favorites ({favorites.length})</span>
              </button>

              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setFavoritesOnly(false);
                }}
                className="py-2.5 px-3 rounded-xl text-xs hover:bg-stone-100 dark:hover:bg-zinc-800 border border-stone-200 dark:border-zinc-800 text-stone-500 dark:text-stone-400 transition-all"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Attractive category cards display */}
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block mb-3 font-cinzel">Filter By Poetry Style:</span>
            <div className="flex flex-wrap gap-2">
              {categoriesList.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`py-2 px-4 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                      isSelected
                        ? "bg-emerald-800 text-amber-200 dark:bg-amber-400 dark:text-zinc-950 shadow-md transform scale-105"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* POET CARD DIRECTORY GRID */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-stone-900 dark:text-stone-100">
                Poets Directory
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-zinc-400">
                Found {filteredPoets.length} master wordsmiths matching details
              </p>
            </div>
            
            <button
              onClick={() => setShowDiaryForm(!showDiaryForm)}
              className="py-2 px-4 bg-emerald-800 hover:bg-emerald-700 text-white dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-zinc-950 rounded-xl text-xs font-bold transition-all flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add Poet</span>
            </button>
          </div>

          {/* EMPTY STATE */}
          {filteredPoets.length === 0 ? (
            <div className="text-center p-12 bg-white dark:bg-zinc-900 rounded-3xl border border-stone-200 dark:border-zinc-800 shadow-sm space-y-4">
              <Compass className="w-12 h-12 text-stone-300 mx-auto animate-bounce" />
              <h4 className="text-lg font-cinzel font-bold text-stone-700 dark:text-stone-300">No Poets Match Your Search</h4>
              <p className="text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto">
                We couldn't find anyone matching "{searchQuery}" in category "{selectedCategory}". Try adjusting your keywords or clearing the filters.
              </p>
              <button 
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setFavoritesOnly(false);
                }}
                className="px-5 py-2.5 bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-all hover:bg-emerald-700"
              >
                Show All Poets
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPoets.map((poet) => {
                const isFav = favorites.includes(poet.id);
                return (
                  <div
                    key={poet.id}
                    className="group bg-white dark:bg-zinc-900 rounded-2xl border border-stone-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
                  >
                    
                    {/* Top Accent Band */}
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-800 via-amber-500 to-emerald-600 dark:from-emerald-950 dark:via-amber-400 dark:to-emerald-800" />
                    
                    {/* Card Content Header */}
                    <div className="p-5 sm:p-6 space-y-4 flex-1">
                      
                      <div className="flex items-start justify-between">
                        
                        {/* Circular Poet Image */}
                        <div className="relative shrink-0 mr-4">
                          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-300 dark:border-amber-400 bg-stone-100 shadow-md group-hover:scale-105 transition-all duration-300">
                            <img
                              src={poet.photo}
                              alt={poet.name}
                              className="w-full h-full object-cover object-top"
                              onError={(e) => {
                                // Fallback calligraphic element
                                e.currentTarget.style.display = "none";
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  const fallback = document.createElement("div");
                                  fallback.className = "w-full h-full flex items-center justify-center bg-gradient-to-tr from-emerald-900 to-emerald-700 text-amber-200 text-3xl font-nastaliq p-1";
                                  fallback.innerText = poet.fallbackInitials;
                                  parent.appendChild(fallback);
                                }
                              }}
                            />
                          </div>
                          <span className="absolute -bottom-1.5 -right-1.5 bg-stone-100 dark:bg-zinc-800 text-[10px] py-0.5 px-2 rounded-full border border-stone-200 dark:border-zinc-700 font-serif shadow-sm">
                            {poet.years}
                          </span>
                        </div>

                        {/* Title and Badge details */}
                        <div className="flex-1 space-y-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="inline-block bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded">
                              {poet.category}
                            </span>
                            
                            {/* Favorite Heart Toggler */}
                            <button
                              onClick={() => toggleFavorite(poet.id)}
                              className="p-1 text-stone-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                              title="Favorite this poet"
                            >
                              <Heart className={`w-4.5 h-4.5 ${isFav ? "fill-current text-rose-500 dark:text-rose-400" : ""}`} />
                            </button>
                          </div>

                          <h3 className="text-lg font-cinzel font-bold text-stone-900 dark:text-stone-100 truncate group-hover:text-emerald-800 dark:group-hover:text-amber-400 transition-colors">
                            {poet.name}
                          </h3>
                          <p className="text-sm font-nastaliq text-emerald-900/80 dark:text-emerald-400 font-semibold rtl text-right">
                            {poet.urduName}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 line-clamp-3 pt-1">
                        {poet.description}
                      </p>

                      {/* Small Quick-peek Verses showcase inside Card */}
                      <div className="bg-stone-50 dark:bg-zinc-800/50 rounded-xl p-3 border border-stone-150 dark:border-zinc-800 select-none">
                        <span className="text-[9px] font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block mb-1">Kalaam Snippet:</span>
                        <p className="text-xs font-nastaliq text-right text-emerald-900 dark:text-emerald-300 line-clamp-1 italic font-semibold">
                          {poet.famousVerses[0]?.urdu || "شعر دستیاب نہیں ہے"}
                        </p>
                      </div>

                    </div>

                    {/* Action buttons footer */}
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 flex items-center space-x-2 border-t border-stone-100 dark:border-zinc-800/80 mt-auto bg-stone-50/50 dark:bg-zinc-950/25">
                      
                      {/* On-site reads custom modal launcher */}
                      <button
                        onClick={() => setActivePoet(poet)}
                        className="flex-1 py-2.5 px-3 bg-stone-100 hover:bg-emerald-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-emerald-800 dark:text-amber-300 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-1.5 border border-stone-200 dark:border-zinc-700"
                        title="Read famous Shayari couplets here"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Read Shayari</span>
                      </button>

                      {/* External AllPoetry directory URL */}
                      <a
                        href={poet.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 bg-emerald-850 hover:bg-emerald-700 text-white dark:bg-emerald-850 dark:hover:bg-emerald-800 rounded-xl text-xs font-semibold transition-all flex items-center justify-center space-x-1 shadow-sm border border-emerald-900/30"
                        title="View extensive catalogue on AllPoetry"
                      >
                        <span>Full Bio</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>

                      {/* Custom delete option for user added poets */}
                      {!poet.isClassic && (
                        <button
                          onClick={(e) => deleteCustomPoet(poet.id, e)}
                          className="p-2.5 text-stone-400 hover:text-rose-600 dark:hover:text-red-400 bg-stone-100 hover:bg-rose-50 dark:bg-zinc-800 dark:hover:bg-red-950/20 rounded-xl transition-all border border-stone-200 dark:border-zinc-700"
                          title="Delete from custom list"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* DIARY FORM: ADD POET BOX */}
        {showDiaryForm && (
          <div className="bg-gradient-to-tr from-stone-50 to-amber-50/50 dark:from-zinc-900 dark:to-emerald-950/10 rounded-2xl border-2 border-dashed border-amber-300 dark:border-emerald-800 p-6 md:p-8 shadow-md">
            <div className="max-w-2xl mx-auto space-y-6">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <PenTool className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h3 className="text-lg sm:text-xl font-cinzel font-bold text-stone-900 dark:text-stone-150">
                    Add Custom Poet or Your Own Pen Name
                  </h3>
                </div>
                <button
                  onClick={() => setShowDiaryForm(false)}
                  className="p-1 px-2 hover:bg-stone-200 dark:hover:bg-zinc-800 text-stone-400 rounded-lg text-xs font-bold"
                >
                  Hide Form
                </button>
              </div>

              <p className="text-xs text-stone-500 dark:text-zinc-400">
                Are you a budding Shayer or want to add an unlisted poet? Fill their credentials to generate a custom card loaded with your poetry locally.
              </p>

              {errorMessage && (
                <div className="p-3 bg-red-50 text-red-700 border border-red-300 rounded-xl text-xs dark:bg-rose-950/20 dark:text-rose-300 dark:border-rose-900">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleCreatePoet} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1.5">Poet Name (English) *</label>
                    <input
                      type="text"
                      placeholder="e.g. Faiz Anwar"
                      value={newPoetName}
                      onChange={(e) => setNewPoetName(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-stone-800 dark:text-stone-100 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1.5">Poet Name (Urdu script)</label>
                    <input
                      type="text"
                      placeholder="e.g. فیض انور"
                      value={newPoetUrdu}
                      onChange={(e) => setNewPoetUrdu(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-stone-800 dark:text-stone-100 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-700 text-right"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1.5">Years Active / Lifespan</label>
                    <input
                      type="text"
                      placeholder="e.g. 1995 - Present"
                      value={newPoetYears}
                      onChange={(e) => setNewPoetYears(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-stone-800 dark:text-stone-100 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1.5">Genre Style</label>
                    <select
                      value={newPoetCategory}
                      onChange={(e) => setNewPoetCategory(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-stone-800 dark:text-stone-100 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    >
                      <option value="Romantic">Romantic (Rumaani)</option>
                      <option value="Philosophical">Philosophical (Falsafiyana)</option>
                      <option value="Revolutionary">Revolutionary (Inqilaabi)</option>
                      <option value="Sufiyana">Sufiyana (Sufi)</option>
                      <option value="Melancholic">Melancholic (Haseen-o-Gham)</option>
                      <option value="Classical">Classical (Qadeem)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-1.5">Short Bio / Description *</label>
                  <textarea
                    placeholder="Write a brief overview of the poet's unique literary style, history, contributions, or your personal vision."
                    value={newPoetDesc}
                    onChange={(e) => setNewPoetDesc(e.target.value)}
                    rows={2}
                    className="w-full p-2.5 rounded-lg border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-stone-800 dark:text-stone-100 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-700"
                  />
                </div>

                {/* Optional Custom Couplet Section */}
                <div className="bg-stone-100/70 dark:bg-zinc-950/40 p-4 rounded-xl space-y-3.5 border border-stone-200 dark:border-zinc-800">
                  <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-400 tracking-widest block">Insert Famous Couplet (Sher)</span>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-stone-500 mb-1">Urdu Script Couplet</label>
                    <textarea
                      placeholder="ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے..."
                      value={newPoetUrduShayari}
                      onChange={(e) => setNewPoetUrduShayari(e.target.value)}
                      rows={2}
                      className="w-full p-2 bg-white dark:bg-zinc-800 text-stone-800 dark:text-stone-100 text-xs rounded border border-stone-200 dark:border-zinc-700 text-right"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-stone-500 mb-1">Romanized English Script</label>
                      <input
                        type="text"
                        placeholder="Hazaaron khwahishein aisi..."
                        value={newPoetRomanShayari}
                        onChange={(e) => setNewPoetRomanShayari(e.target.value)}
                        className="w-full p-2 bg-white dark:bg-zinc-800 text-stone-800 dark:text-stone-100 text-xs rounded border border-stone-200 dark:border-zinc-700"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-stone-500 mb-1">English Translation</label>
                      <input
                        type="text"
                        placeholder="Thousands of desires, so strong..."
                        value={newPoetEngShayari}
                        onChange={(e) => setNewPoetEngShayari(e.target.value)}
                        className="w-full p-2 bg-white dark:bg-zinc-800 text-stone-800 dark:text-stone-100 text-xs rounded border border-stone-200 dark:border-zinc-700"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowDiaryForm(false)}
                    className="px-4 py-2 bg-stone-200 dark:bg-zinc-800 text-stone-700 dark:text-zinc-300 rounded-lg text-xs font-semibold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-800 text-white rounded-lg text-xs font-bold shadow hover:bg-emerald-700 dark:bg-amber-400 dark:text-zinc-950 dark:hover:bg-amber-300 transition-all"
                  >
                    Generate Poet Card
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </main>

      {/* COMPACT POETRY INSPIRATION DESK */}
      <section className="bg-emerald-950 text-amber-250 py-10 px-4 sm:px-6 lg:px-8 border-t border-emerald-900 select-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-cinzel font-bold text-amber-400 flex items-center justify-center md:justify-start">
              <Feather className="w-5 h-5 mr-1.5 shrink-0" /> Poet of the Moment Musing
            </h3>
            <p className="text-xs text-stone-350 max-w-lg font-light leading-relaxed">
              "To know Mirza Ghalib is to feel both light and fire simultaneously, while Jaun Elia is the companion in our cold, quiet winters of solitude."
            </p>
          </div>
          
          <div className="p-4 bg-emerald-900/40 rounded-xl border border-emerald-800 shrink-0 text-center md:text-right">
            <span className="text-[9px] uppercase font-bold text-amber-400 tracking-widest block mb-1">Random Musings</span>
            <p className="text-sm font-nastaliq text-amber-200/90 font-medium italic rtl text-right">
              دلِ ناداں تجھے ہوا کیا ہے؟ آخر اس درد کی دوا کیا ہے؟
            </p>
            <p className="text-[10px] text-stone-400 mt-1 font-cinzel">Mirza Asadullah Khan Ghalib</p>
          </div>
        </div>
      </section>

      {/* FOOTER & SOCIALS */}
      <footer id="app-footer" className="bg-stone-900 text-stone-400 py-12 px-4 sm:px-6 lg:px-8 border-t border-stone-800 text-sm">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 bg-amber-400 rounded-lg flex items-center justify-center text-zinc-950 font-cinzel font-bold text-sm">
                  G
                </div>
                <h4 className="text-base font-cinzel font-bold text-stone-100 tracking-widest">
                  GULSHAN-E-URDU-BOL
                </h4>
              </div>
              <p className="text-xs text-stone-400 max-w-sm font-light leading-relaxed">
                Celebrating the timeless aesthetic of classic and revolutionary Urdu Shayari. Designed to connect poetry seekers with world-class works, digital biographies, and deep calligraphic formatting.
              </p>
              
              {/* SOCIAL MEDIA CONNECTIONS */}
              <div className="flex items-center space-x-4 pt-1.5">
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-stone-800 hover:bg-amber-400 hover:text-zinc-950 rounded-full text-stone-400 transition-colors"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-stone-800 hover:bg-amber-400 hover:text-zinc-950 rounded-full text-stone-400 transition-colors"
                  aria-label="Instagram Page"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-stone-800 hover:bg-amber-400 hover:text-zinc-950 rounded-full text-stone-400 transition-colors"
                  aria-label="GitHub Repository"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>

            </div>

            <div className="md:col-span-3 space-y-3">
              <h5 className="text-xs font-bold text-stone-200 uppercase tracking-widest font-cinzel">Quick Styles</h5>
              <ul className="space-y-1.5 text-xs font-light">
                {categoriesList.slice(1).map((cat) => (
                  <li key={cat}>
                    <button 
                      onClick={() => {
                        setSelectedCategory(cat);
                        document.getElementById("poets-directory")?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="hover:text-amber-300 transition-colors"
                    >
                      {cat} Poetry
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-4 space-y-3">
              <h5 className="text-xs font-bold text-stone-200 uppercase tracking-widest font-cinzel">Urdu Calligraphy Credits</h5>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Featured Nastaliq font renderings provided dynamically via Google Fonts Noto family. Bio citations aggregated through Mirza-Ghalib, Faiz & Iqbal poetry collections on Wikipedia and AllPoetry archives.
              </p>
              <div className="p-3 bg-stone-800/60 rounded-xl flex items-center space-x-2.5 border border-stone-800 text-[11px]">
                <Info className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Bookmark this page to save your created custom poets and favorite collections.</span>
              </div>
            </div>

          </div>

          <div className="border-t border-stone-800 pt-6 text-center text-xs text-stone-500 font-light flex flex-col sm:flex-row justify-between items-center gap-3">
            <p>© {new Date().getFullYear()} GULSHAN-E-URDU-BOL. All Urdu poetry and copyrights belong to their corresponding literary trustees and publishers.</p>
            <p>Made in traditional Indo-Persian aesthetic</p>
          </div>

        </div>
      </footer>

      {/* IMMERSIVE COMPREHENSIVE SHAYARI VIEW MODAL */}
      {activePoet && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            
            {/* Dark blur background */}
            <div 
              className="fixed inset-0 bg-stone-900/80 dark:bg-black/90 backdrop-blur-sm transition-opacity" 
              aria-hidden="true"
              onClick={() => setActivePoet(null)}
            />

            {/* Modal positioning trick */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            {/* Modal main card */}
            <div className="inline-block align-bottom bg-white dark:bg-zinc-900 rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border border-stone-200 dark:border-zinc-800 animate-in fade-in zoom-in-95 duration-200">
              
              <div className="bg-gradient-to-tr from-emerald-950 to-emerald-900 text-stone-100 p-6 sm:p-8 relative">
                <div className="absolute -right-10 -bottom-10 w-40 h-40 text-amber-400/5 select-none pointer-events-none font-nastaliq text-[180px] leading-none">
                  {activePoet.fallbackInitials}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 text-[9px] font-bold tracking-widest bg-amber-400 text-zinc-950 rounded-full font-serif uppercase inline-block">
                    {activePoet.category} Poetry
                  </span>
                  
                  <button
                    onClick={() => setActivePoet(null)}
                    className="p-1 px-2.5 bg-white/10 hover:bg-white/20 text-stone-100 rounded-lg text-sm font-semibold transition-all"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-300 shadow bg-stone-850 shrink-0">
                    <img 
                      src={activePoet.photo} 
                      alt={activePoet.name} 
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const fallback = document.createElement("div");
                          fallback.className = "w-full h-full flex items-center justify-center bg-gradient-to-tr from-stone-900 to-stone-700 text-amber-200 text-2xl font-nastaliq";
                          fallback.innerText = activePoet.fallbackInitials;
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-white leading-normal">
                      {activePoet.name}
                    </h3>
                    <p className="text-sm font-nastaliq text-amber-300 font-semibold rtl text-left">
                      {activePoet.urduName} ({activePoet.years})
                    </p>
                  </div>
                </div>
              </div>

              {/* Verses Container */}
              <div className="p-6 sm:p-8 space-y-8 bg-stone-50 dark:bg-zinc-900/60 transition-colors">
                
                {activePoet.famousVerses.map((verse, index) => {
                  const verseText = `${verse.urdu}\n\n[Transliteration]\n${verse.roman}\n\n[English Translation]\n${verse.english}`;
                  return (
                    <div 
                      key={index} 
                      className="space-y-4 border-b border-stone-200 dark:border-zinc-800/80 pb-6 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-center justify-between text-xs text-amber-700 dark:text-amber-400 font-bold tracking-widest font-mono">
                        <span>Sher #{index + 1}</span>
                        <div className="flex items-center space-x-2">
                          
                          {/* Copy code helper */}
                          <button
                            onClick={() => handleCopyText(verse.urdu, index)}
                            className="p-1 px-2.5 bg-stone-100 hover:bg-amber-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-stone-600 dark:text-zinc-300 rounded flex items-center space-x-1.5 transition-colors text-[10px]"
                            title="Copy Urdu Verses"
                          >
                            {copiedIndex === index ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400 animate-bounce" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Urdu</span>
                              </>
                            )}
                          </button>

                          {/* Quick Tweet button */}
                          <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${verse.urdu}"\n— ${activePoet.name} \nEnjoy exquisite Urdu poetry on Gulshan-E-Urdu-Bol!`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 px-2 bg-stone-100 hover:bg-emerald-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-stone-650 rounded text-[10px] flex items-center space-x-1"
                          >
                            <Share2 className="w-3 h-3" />
                            <span>Tweet</span>
                          </a>
                        </div>
                      </div>

                      {/* CALLIGRAPHIC URDU PRINTING */}
                      <p className="font-nastaliq text-right text-2xl sm:text-3xl leading-loose text-emerald-950 dark:text-emerald-350 pr-4 block rtl font-bold tracking-wide select-all leading-relaxed bg-amber-500/5 p-4 rounded-xl border border-amber-500/10 dark:border-amber-400/5 select-none">
                        {verse.urdu}
                      </p>

                      <div className="space-y-2.5 pl-2 border-l-2 border-amber-400 dark:border-amber-500/50">
                        {/* Roman Transliterers */}
                        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 italic font-medium leading-relaxed">
                          {verse.roman}
                        </p>
                        
                        {/* English translation translationists */}
                        <p className="text-xs dark:text-stone-400 text-stone-500 font-serif leading-relaxed">
                          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">Translation</span>
                          {verse.english}
                        </p>
                      </div>

                    </div>
                  );
                })}

              </div>

              {/* Modal footer controls */}
              <div className="bg-stone-100 dark:bg-zinc-950 px-6 py-4 sm:px-8 flex items-center justify-between text-xs text-stone-500 dark:text-zinc-400">
                <span className="font-light">Lives in: {activePoet.origin}</span>
                <a
                  href={activePoet.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-4 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center space-x-1"
                >
                  <span>More on AllPoetry</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
