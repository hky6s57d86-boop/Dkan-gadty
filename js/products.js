/**
 * ==========================================================
 *  ملف المنتجات
 * ==========================================================
 *  لإضافة منتج جديد: انسخي أحد العناصر بالأسفل وعدّلي بياناته.
 *  لحذف منتج: احذفي العنصر بالكامل من القائمة.
 *
 *  حقول كل منتج:
 *  - id          : رقم أو رمز فريد للمنتج (لا يتكرر)
 *  - name        : اسم المنتج
 *  - category    : تصنيف المنتج، استخدمي أحد المفاتيح التالية فقط:
 *                  "kids"    ملابس الأطفال
 *                  "women"   الملابس النسائية
 *                  "burqa"   البراقع
 *                  "women_products" مستلزمات نسائيه
 *                  "incense_fragrances" الدخون والمعطرات
 *                  "prayer"  جلال الصلاة
 *                  "other"   منتجات أخرى
 *  - description : وصف مختصر (اختياري، يمكن تركه "")
 *  - price       : السعر كرقم (مثال: 85) - أو اتركيه null إن كان السعر عند الطلب
 *  - image       : مسار صورة المنتج داخل مجلد assets/products (مثال: "assets/products/thobe-1.jpg")
 *                  إن لم تتوفر الصورة بعد، اتركيه "" وسيظهر بديل أنيق تلقائيًا
 *  - available   : true إذا كان متوفرًا، false إذا كان غير متوفر حاليًا
 * ==========================================================
 */

const PRODUCTS = [
  {
    id: "kids-Green",
    name: "فستان بناتي بلون أخضر سيج فاتح",
    category: "kids",
    description: "فستان مزين بنقشة ورود وردية ناعمة، مع كشكشة أنيقة حول الرقبة وقصة واسعة ومريحة تمنحه مظهرًا لطيفًا وناعمًا.",
    price: 20,
    image: "assets/products/فستان اخضر.jpeg",
    available: true,
  },
  {
    id: "kids-offwhite",
    name: "فستان بناتي بلون كريمي فاتح",
    category: "kids",
    description: "فستان مزين بنقشة ورود موف ناعمة، بقصة مريحة وتفاصيل أنثوية جميلة، مناسب للمناسبات واللبس اليومي.",
    price: 20,
    image: "assets/products/فستان بيج.jpeg",
    available: true,
  },
  {
    id: "women-1",
    name: "ثوب نسائي مطرّز",
    category: "women",
    description: "ثوب شعبي فاخر بتطريز يدوي على الأكمام والياقة.",
    price: 320,
    image: "",
    available: true,
  },
  {
    id: "women-2",
    name: "درعة تراثية",
    category: "women",
    description: "درعة واسعة بقماش مريح وألوان دافئة تراثية.",
    price: 210,
    image: "",
    available: true,
  },
  {
    id: "burqa-1",
    name: "برقع تراثي كلاسيكي",
    category: "burqa",
    description: "برقع مصنوع يدويًا بتصميم أصيل.",
    price: null,
    image: "",
    available: true,
  },
  {
    id: "cream-1",
    name: "كريم شعر كينروزا ابو وردة",
    category: "women_products",
    description: "لشعر صحي ولامع",
    price: 15,
    image: "assets/products/كريم شعر.jpeg",
    available: true,
  },
  {
    id: "Lipstick",
    name: "روج سحري",
    category: "women_products",
    description: "روج سحري يعمل على ملئ الشفتين بلون كثيف ومخملي جذاب",
    price: 3,
    image: "assets/products/الروج السحري.jpeg",
    available: true,
  },
  {
    id: "bukhoor-1",
    name: "بخور عود فاخر",
    category: "incense_fragrances",
    description: "بخور عود معتّق برائحة فواحة تدوم طويلًا.",
    price: 30,
    image: "assets/products/بخور.jpeg",
    available: true,
  },
  {
    id: "perfume-2",
    name: "معطر جو ومفارش",
    category: "incense_fragrances",
    description: "عطر فواح يمنح منزلك احساسا منعشا مستوحى من جمال عطور الطبيعة .",
    price: 50,
    image: "assets/products/معطر.jpeg",
    available: true,
  },
  {
    id: "prayer-1",
    name: "شرشف صلاة",
    category: "prayer",
    description: "شرشف صلاة خفيف ومريح بقماش ناعم غير شفاف.",
    price: 70,
    image: "assets/products/جلال.jpeg",
    available: true,
  },
  {
    id: "prayer-2",
    name: "طقم صلاة مطرّز",
    category: "prayer",
    description: "طقم صلاة بتطريز بسيط على الأطراف.",
    price: 90,
    image: "",
    available: false,
  },
  {
    id: "other-1",
    name: "مبخرة نحاسية تراثية",
    category: "other",
    description: "مبخرة يدوية بنقوش تراثية أصيلة.",
    price: 150,
    image: "",
    available: true,
  },
  {
    id: "other-2",
    name: "مسبحة خشبية",
    category: "other",
    description: "مسبحة مصنوعة من الخشب الطبيعي.",
    price: 40,
    image: "",
    available: true,
  },
];

// أيقونات SVG بسيطة تُستخدم كبديل أنيق عند عدم توفر صورة حقيقية للمنتج
const CATEGORY_ICONS = {
  kids: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 14c0-4 4-8 10-8s10 4 10 8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M14 22 L22 14 L32 20 L42 14 L50 22 L44 30 L44 52 H20 L20 30 Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/><circle cx="32" cy="34" r="3" stroke="currentColor" stroke-width="2"/></svg>`,
  women: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 8c-9 0-14 6-14 14 0 6 3 10 3 10l-9 26h40l-9-26s3-4 3-10c0-8-5-14-14-14Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M25 30c2 3 5 4 7 4s5-1 7-4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  burqa: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 26c0-9 6-16 14-16s14 7 14 16" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M14 26h36c0 12-6 20-18 20S14 38 14 26Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M24 26c0 6 3 10 8 10s8-4 8-10" stroke="currentColor" stroke-width="1.8"/></svg>`,
  women_products: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 10c10 10 16 18 16 27a16 16 0 0 1-32 0c0-9 6-17 16-27Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M32 24v22M25 34c2 4 10 4 14 0M24 42c3 3 13 3 16 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  incense_fragrances: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 50h28l-4-14H22Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M28 36c-2-6 2-8 1-13M36 36c2-6-2-8-1-13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M32 30c-3-5 1-8 0-14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  prayer: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 10 20 22v8h24v-8Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M16 30h32v10c0 8-7 14-16 14s-16-6-16-14Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/></svg>`,
  other: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="18" stroke="currentColor" stroke-width="2.2"/><path d="M32 22v20M22 32h20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
};
