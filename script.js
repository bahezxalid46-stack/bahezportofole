document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    /* ===== Header shadow on scroll ===== */
    const header = document.getElementById('header');
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ===== Drawer menu ===== */
    const drawer = document.getElementById('drawer');
    const menuToggle = document.getElementById('menu-toggle');
    const openMenu = () => {
        body.classList.add('drawer-open', 'no-scroll');
        drawer.setAttribute('aria-hidden', 'false');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.getElementById('menu-close').focus();
    };
    const closeMenu = () => {
        if (!body.classList.contains('drawer-open')) return;
        body.classList.remove('drawer-open', 'no-scroll');
        drawer.setAttribute('aria-hidden', 'true');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
    };
    menuToggle.addEventListener('click', openMenu);
    document.getElementById('menu-close').addEventListener('click', closeMenu);
    document.getElementById('drawer-backdrop').addEventListener('click', closeMenu);
    drawer.querySelectorAll('.drawer-nav a').forEach(a => a.addEventListener('click', closeMenu));

    /* ===== Profile modal ===== */
    const profile = document.getElementById('profile-overlay');
    const openProfile = () => { profile.classList.add('active'); body.classList.add('no-scroll'); };
    const closeProfile = () => {
        if (!profile.classList.contains('active')) return;
        profile.classList.remove('active'); body.classList.remove('no-scroll');
    };
    document.getElementById('profile-trigger').addEventListener('click', openProfile);
    document.getElementById('profile-close').addEventListener('click', closeProfile);
    profile.addEventListener('click', e => { if (e.target === profile) closeProfile(); });

    /* ===== SmartMeter info modal ===== */
    const smk = document.getElementById('smk-overlay');
    const smkCard = document.getElementById('smk-card');
    const openSmk = () => { smk.classList.add('active'); body.classList.add('no-scroll'); document.getElementById('smk-close').focus(); };
    const closeSmk = () => {
        if (!smk.classList.contains('active')) return;
        smk.classList.remove('active'); body.classList.remove('no-scroll'); smkCard.focus();
    };
    smkCard.addEventListener('click', openSmk);
    smkCard.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSmk(); } });
    document.getElementById('smk-close').addEventListener('click', closeSmk);
    smk.addEventListener('click', e => { if (e.target === smk) closeSmk(); });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') { closeMenu(); closeProfile(); closeSmk(); }
    });

    /* ===== Reveal on scroll ===== */
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ===== Active nav link ===== */
    const navLinks = document.querySelectorAll('.nav a, .drawer-nav a');
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

    /* ===== Footer year ===== */
    document.getElementById('year').textContent = new Date().getFullYear();

    /* ===== Language switch (English / Kurdish) ===== */
    const ckb = {
        'nav.about': 'دەربارە', 'nav.services': 'خزمەتگوزاری', 'nav.work': 'کارەکان', 'nav.skills': 'تواناکان', 'nav.contact': 'پەیوەندی', 'nav.cta': 'با قسە بکەین',
        'hero.badge': 'ئامادەم بۆ پڕۆژەی نوێ',
        'hero.t1': 'کۆدێک کە', 'hero.t2': 'هێندەی تۆ', 'hero.t3': 'کار دەکات.',
        'hero.sub': 'من بەهێزم — گەشەپێدەری وێب، وێبسایتی خێرا، ئەپی وێب و سیستەمی بەڕێوەبردن بۆ کار و بازرگانییەکانی کوردستان و عێراق دروست دەکەم.',
        'hero.cta1': 'دەستپێکردنی پڕۆژە', 'hero.cta2': 'کارەکانم ببینە',
        'hero.p1': 'وەڵامدانەوە لە ماوەی ١ ڕۆژدا', 'hero.p2': 'نرخی ڕوون پێش دەستپێکردن', 'hero.p3': 'چاککردنەوەی بێبەرامبەر دوای تەواوبوون',
        'hero.chip': 'خێرا و مۆدێرن', 'hero.role': 'گەشەپێدەری وێب · حاجیاوا',
        'about.kicker': 'بۆچی لەگەڵ من کار بکەیت', 'about.t1': 'گرفتی کەمتر.', 'about.t2': 'ئەنجامی ڕوونتر.',
        'about.sub': 'زۆرێک لە کارەکان هێشتا بە ئێکسڵ، کاغەز و گرووپی واتسئاپ بەڕێوە دەچن. من ئەوانە دەگۆڕم بە سیستەمێکی ڕێکوپێک کە لەسەر شێوازی کارکردنی خۆت دروست کراوە.',
        'why.1t': 'یەک سیستەم، نەک دە شیت', 'why.1p': 'فرۆشتن، کۆگا و کڕیاران لە یەک شوێندا — لەسەر مۆبایلەکەت.',
        'why.2t': 'نرخی ڕوون، پێشوەختە', 'why.2p': 'کار، نرخ و کات پێش دەستپێکردن ڕێکدەکەوین.',
        'why.3t': 'چاککردنەوەی بێبەرامبەر', 'why.3p': 'ئەگەر شتێک تێکچوو دوای تەواوبوون، بە خۆڕایی چاکی دەکەمەوە.',
        'why.4t': 'هەمووی هی خۆتە', 'why.4p': 'سۆرس کۆد، دۆمەین و ئەکاونتەکان — هەمووی دەدرێتە دەستی خۆت.',
        'why.5t': 'کوردی، عەرەبی و ئینگلیزی', 'why.5p': 'ڕاست بۆ چەپ بە دروستی دیزاین کراوە.',
        'why.ctaT': 'بیرۆکەیەکت هەیە؟', 'why.ctaP': 'پێم بڵێ — یەکەم گفتوگۆ بێبەرامبەرە.',
        'svc.kicker': 'خزمەتگوزارییەکان', 'svc.t1': 'هەموو ئەوەی پێویستتە', 'svc.t2': 'بۆ ئۆنلاین بوون.',
        'svc.1t': 'دروستکردنی وێبسایت', 'svc.1p': 'خێرا لەسەر مۆبایل، لە گووگڵ دەدۆزرێتەوە، بەو زمانەی کڕیارەکانت دەیخوێننەوە.', 'svc.1e': '٢–٤ هەفتە',
        'svc.2t': 'ئەپی وێب', 'svc.2p': 'کارەکانی خۆت لە سۆفتوێرێکدا کە تیمەکەت لەسەر هەر ئامێرێک بەکاری بهێنێت.', 'svc.2e': '٦–١٢ هەفتە',
        'svc.3t': 'سیستەمی بەڕێوەبردن', 'svc.3p': 'فرۆشتن، کۆگا، کارمەند و داواکاری لە یەک شوێندا.', 'svc.3e': '٦–١٢ هەفتە',
        'svc.4t': 'فرۆشگای ئۆنلاین', 'svc.4p': 'بەرهەمەکانت ئۆنلاین بە ڕێکخستنی ئاسانی داواکارییەکان.', 'svc.4e': '٤–٨ هەفتە',
        'svc.5t': 'ئۆتۆمەیشن و سکریپت', 'svc.5p': 'ئامرازی پایسۆن کە کارە دووبارە و بێزارکەرەکان بۆت دەکات.', 'svc.5e': '١–٣ هەفتە',
        'svc.6t': 'پشتگیری و چاککردنەوە', 'svc.6p': 'نوێکردنەوە، باکئەپ و چاککردنەوە بۆ ئەوەی سایتەکەت بە باشی کار بکات.', 'svc.6e': 'مانگانە',
        'work.kicker': 'کارە هەڵبژێردراوەکان', 'work.t1': 'ئەو پڕۆژانەی', 'work.t2': 'شانازییان پێوە دەکەم.',
        'work.1p': 'بزوێنەرێکی خێرا بۆ خوێندنەوە و بەدواداچوونی داتای مەتەر.', 'work.2p': 'داشبۆردێکی ڕاستەوخۆ کە داتا دەکات بە چارتی ڕوون.',
        'skills.kicker': 'تواناکان', 'skills.t1': 'ئەو ئامرازانەی', 'skills.t2': 'پێیان کار دەکەم.',
        'contact.kicker': 'پەیوەندی', 'contact.t1': 'با پێکەوە', 'contact.t2': 'شتێکی نایاب دروست بکەین.',
        'contact.sub': 'نامەیەکم بۆ بنێرە — زۆربەی کات لە ماوەی یەک ڕۆژی کاردا وەڵام دەدەمەوە.', 'contact.email': 'ئیمەیڵم بۆ بنێرە',
        'footer.visitors': 'سەردانکەران',
        'profile.bio': 'گەشەپێدەرێکی وێبی بە تامەزرۆ کە ئەزموونی دیجیتاڵی مۆدێرن و خێرا دروست دەکات. گرنگی بە وردی و دیزاینی پاک دەدات و بیرۆکە ئاڵۆزەکان دەکات بە چارەسەری جوان.'
    };

    Object.assign(ckb, {
        'svc.6p': 'نوێکردنەوە، باکئەپ، پاراستنی ئەمنی و چاککردنەوە بۆ ئەوەی سایتەکەت بە باشی کار بکات.',
        'proc.kicker': 'چۆن کار دەکەم', 'proc.t1': 'لە بیرۆکەوە بۆ بڵاوکردنەوە،', 'proc.t2': 'هەنگاو بە هەنگاو.',
        'proc.1t': 'گفتوگۆ', 'proc.1p': 'باس لە ئامانج، بەکارهێنەران و بودجەکەت دەکەین.',
        'proc.2t': 'دیزاین', 'proc.2p': 'پلان و دیزاینێکی ڕوون کە پێش کۆدنووسین پەسەندی دەکەیت.',
        'proc.3t': 'دروستکردن و پاراستن', 'proc.3p': 'کۆدی پاک و خێرا لەگەڵ داتابەیسێکی پارێزراو.',
        'proc.4t': 'بڵاوکردنەوە و پشتگیری', 'proc.4p': 'سایتەکە دەخەینە سەر هێڵ، هەموو شتێک دەدەمە دەستت و لە پشتتم.',
        'form.name': 'ناوت', 'form.msg': 'باسی پڕۆژەکەتم بۆ بکە...', 'form.send': 'ناردنی نامە'
    });

    const ar = {
        'nav.about': 'نبذة', 'nav.services': 'الخدمات', 'nav.work': 'الأعمال', 'nav.skills': 'المهارات', 'nav.contact': 'تواصل', 'nav.cta': 'لنتحدث',
        'hero.badge': 'متاح لمشاريع جديدة',
        'hero.t1': 'برمجيات تعمل', 'hero.t2': 'بجدٍّ', 'hero.t3': 'مثلك تماماً.',
        'hero.sub': 'أنا بەهێز — مطوّر ويب أبني مواقع سريعة وتطبيقات ويب وأنظمة إدارة للشركات في كوردستان والعراق.',
        'hero.cta1': 'ابدأ مشروعك', 'hero.cta2': 'شاهد أعمالي',
        'hero.p1': 'رد خلال يوم واحد', 'hero.p2': 'سعر واضح قبل البدء', 'hero.p3': 'إصلاحات مجانية بعد الإطلاق',
        'hero.chip': 'سريع وحديث', 'hero.role': 'مطوّر ويب · حاجياوا',
        'about.kicker': 'لماذا تعمل معي', 'about.t1': 'متاعب أقل.', 'about.t2': 'نتائج أوضح.',
        'about.sub': 'كثير من الشركات ما زالت تعمل بملفات إكسل والورق ومجموعات واتساب. أستبدل ذلك ببرنامج منظّم مبني حول طريقة عملك الفعلية.',
        'why.1t': 'نظام واحد بدل عشرة جداول', 'why.1p': 'المبيعات والمخزون والعملاء في مكان واحد — على هاتفك.',
        'why.2t': 'سعر واضح مسبقاً', 'why.2p': 'نتفق على العمل والسعر والموعد قبل البدء.',
        'why.3t': 'إصلاحات مجانية بعد الإطلاق', 'why.3p': 'إذا تعطّل شيء بعد الإطلاق، أصلحه بدون تكلفة.',
        'why.4t': 'كل شيء ملكك', 'why.4p': 'الكود المصدري والدومين والحسابات — تُسلَّم لك.',
        'why.5t': 'كوردي، عربي وإنجليزي', 'why.5p': 'تصميم من اليمين لليسار بشكل صحيح.',
        'why.ctaT': 'لديك فكرة؟', 'why.ctaP': 'أخبرني عنها — المحادثة الأولى مجانية.',
        'svc.kicker': 'الخدمات', 'svc.t1': 'كل ما تحتاجه', 'svc.t2': 'لتكون على الإنترنت.',
        'svc.1t': 'تطوير المواقع', 'svc.1p': 'سريع على الهاتف، يظهر في جوجل، وباللغات التي يقرأها عملاؤك.', 'svc.1e': '٢–٤ أسابيع',
        'svc.2t': 'تطبيقات الويب', 'svc.2p': 'عملياتك الخاصة في برنامج يستخدمه فريقك على أي جهاز.', 'svc.2e': '٦–١٢ أسبوعاً',
        'svc.3t': 'أنظمة الإدارة', 'svc.3p': 'المبيعات والمخزون والموظفون والطلبات في مكان واحد.', 'svc.3e': '٦–١٢ أسبوعاً',
        'svc.4t': 'المتاجر الإلكترونية', 'svc.4p': 'منتجاتك على الإنترنت مع طلبات يسهل على فريقك متابعتها.', 'svc.4e': '٤–٨ أسابيع',
        'svc.5t': 'الأتمتة والسكربتات', 'svc.5p': 'أدوات بايثون تنجز عنك الأعمال المتكررة والمملة.', 'svc.5e': '١–٣ أسابيع',
        'svc.6t': 'الدعم والصيانة', 'svc.6p': 'تحديثات ونسخ احتياطي وتأمين وإصلاحات ليبقى موقعك يعمل بسلاسة.', 'svc.6e': 'شهرياً',
        'work.kicker': 'أعمال مختارة', 'work.t1': 'مشاريع', 'work.t2': 'أفتخر بها.',
        'work.1p': 'محرك عالي الأداء لقراءة بيانات العدادات ومتابعتها.', 'work.2p': 'لوحة تحكم لحظية تحوّل البيانات إلى رسوم واضحة.',
        'proc.kicker': 'كيف أعمل', 'proc.t1': 'من الفكرة إلى الإطلاق،', 'proc.t2': 'خطوة بخطوة.',
        'proc.1t': 'النقاش', 'proc.1p': 'نتحدث عن أهدافك ومستخدميك وميزانيتك.',
        'proc.2t': 'التصميم', 'proc.2p': 'خطة وتصميم واضحان توافق عليهما قبل البرمجة.',
        'proc.3t': 'البناء والتأمين', 'proc.3p': 'كود نظيف وسريع مع قاعدة بيانات آمنة.',
        'proc.4t': 'الإطلاق والدعم', 'proc.4p': 'نطلق الموقع، أسلّمك كل شيء، وأبقى للدعم.',
        'skills.kicker': 'المهارات', 'skills.t1': 'الأدوات', 'skills.t2': 'التي أعمل بها.',
        'contact.kicker': 'تواصل', 'contact.t1': 'لنبنِ معاً', 'contact.t2': 'شيئاً رائعاً.',
        'contact.sub': 'أرسل لي رسالة — عادةً أرد خلال يوم عمل واحد.', 'contact.email': 'راسلني',
        'form.name': 'اسمك', 'form.msg': 'أخبرني عن مشروعك...', 'form.send': 'إرسال الرسالة',
        'footer.visitors': 'الزوار',
        'profile.bio': 'مطوّر ويب شغوف يبني تجارب رقمية حديثة وعالية الأداء. يركّز على الدقة والتصميم النظيف، ويحوّل الأفكار المعقدة إلى حلول أنيقة.'
    };

    const extra = {
        ckb: {
            'nav.home': 'سەرەکی', 'nav.exp': 'ئەزموون', 'menu.label': 'مێنیو',
            'exp.kicker': 'ئەزموون', 'exp.t1': 'گەشتەکەم', 'exp.t2': 'تا ئێستا.', 'exp.sub': 'هەر پڕۆژەیەک شتێکی نوێی فێر کردم — ئەمانە قۆناغە گرنگەکانن.', 'exp.now': 'ئێستا',
            'exp.1t': 'گەشەپێدەری فول-ستاکی سەربەخۆ', 'exp.1p': 'دروستکردنی وێبسایت، ئەپی وێب و سیستەمی بەڕێوەبردن بۆ کڕیاران لە سەرانسەری کوردستان.',
            'exp.2t': 'پڕۆژەکانی SmartMeter و Analytics', 'exp.2p': 'دیزاین و دروستکردنی ئەپی پڕ لە داتا بە Node.js، React و MySQL.',
            'exp.3t': 'دەستپێکردنی ڕێگای گەشەپێدانی وێب', 'exp.3p': 'فێربوونی HTML، CSS، JavaScript، PHP و Python و دروستکردنی یەکەم پڕۆژە ڕاستەقینەکان.',
            'footer.sub': 'گەشەپێدەری فول-ستاکی وێب', 'footer.tagline': 'وێبسایت و سیستەمی پارێزراو، خێرا و فرەزمان — دیزاین و دروستکراو لەلایەن بەهێزەوە.',
            'footer.navigate': 'ڕێنیشاندان', 'footer.capabilities': 'تواناکان', 'footer.explore': 'هەموو خزمەتگوزارییەکان', 'footer.chat': 'چات لە واتسئاپ',
            'footer.contactMe': 'پەیوەندیم پێوە بکە', 'footer.rights': 'هەموو مافەکان پارێزراون.'
        },
        ar: {
            'nav.home': 'الرئيسية', 'nav.exp': 'الخبرة', 'menu.label': 'القائمة',
            'exp.kicker': 'الخبرة', 'exp.t1': 'رحلتي', 'exp.t2': 'حتى الآن.', 'exp.sub': 'كل مشروع علّمني شيئاً جديداً — هذه أهم المحطات.', 'exp.now': 'الآن',
            'exp.1t': 'مطوّر فول ستاك مستقل', 'exp.1p': 'بناء مواقع وتطبيقات ويب وأنظمة إدارة لعملاء في أنحاء كوردستان.',
            'exp.2t': 'مشاريع SmartMeter و Analytics', 'exp.2p': 'تصميم وبناء تطبيقات غنية بالبيانات باستخدام Node.js و React و MySQL.',
            'exp.3t': 'بداية طريق تطوير الويب', 'exp.3p': 'تعلّمت HTML و CSS و JavaScript و PHP و Python وبنيت أول مشاريعي الحقيقية.',
            'footer.sub': 'مطوّر ويب فول ستاك', 'footer.tagline': 'مواقع وأنظمة آمنة وسريعة ومتعددة اللغات — من تصميم وتطوير بەهێز.',
            'footer.navigate': 'التنقل', 'footer.capabilities': 'القدرات', 'footer.explore': 'استكشف الخدمات', 'footer.chat': 'تحدث عبر واتساب',
            'footer.contactMe': 'تواصل معي', 'footer.rights': 'جميع الحقوق محفوظة.'
        }
    };
    Object.assign(ckb, extra.ckb);
    Object.assign(ar, extra.ar);

    Object.assign(ckb, {
        'work.1p': 'ژمێرەرێکی زیرەکی کارەبا بۆ کوردستان: پسوولەکەت بەپێی نرخی فەرمی حیساب دەکات، ئامێرەکانی ماڵ بەدوادا دەچێت، پسوولە بە کامێرا سکان دەکات و سەرفیاتی مانگانەت بە چارت پیشان دەدات.',
        'exp.2t': 'پڕۆژەی Smart Meter لەگەڵ BHM Team', 'exp.2p': 'دیزاین و دروستکردنی ژمێرەری کارەبا بە PHP، MySQL و JavaScript.',
        'smk.info': 'زانیاری', 'smk.more': 'زانیاری — زیاتر بزانە', 'smk.kicker': 'زانیاری پڕۆژە',
        'smk.sub': 'ژمێرەر و ڕێنمایی کارەبای کوردستان — لەلایەن BHM Team ـەوە دروستکراوە، تیمێکی سێ کەسی لە گەشەپێدەران، بۆ ئەوەی هاوڵاتیان بە ئاسانی و خێرایی تێچووی کارەباکەیان بزانن.',
        'smk.s1': 'جۆری بەشداربوو', 'smk.s2': 'پلیکانەی نرخی ماڵان', 'smk.s3': 'زمان', 'smk.s4': 'خشتەی داتابەیس',
        'smk.fTitle': 'تایبەتمەندییەکان', 'smk.tTitle': 'دروستکراوە بە',
        'smk.f1t': 'ژمێرەری پسوولە', 'smk.f1p': 'تێچووی ڕۆژانە، هەفتانە، مانگانە و ساڵانە بەپێی نرخی فەرمی — ماڵان (٧٢–٣٥٠ دینار بۆ هەر یەکەیەک)، بازرگانی، پیشەسازی، میری و کشتوکاڵی.',
        'smk.f2t': 'گۆڕینی ئەمپێر بۆ وات', 'smk.f2p': 'ئەمپێر بگۆڕە بۆ وات لەسەر 220V، 180V یان 110V و ڕاستەوخۆ بینێرە بۆ ژمێرەر.',
        'smk.f3t': 'ماڵەکەم', 'smk.f3p': 'ئامێرەکانی ماڵەکەت زیاد بکە و کۆی تێچووی مانگانە، kWh و کۆی ئەمپێر بەراورد بە سنووری 40A ببینە.',
        'smk.f4t': 'پسوولە و چارت', 'smk.f4p': 'پسوولە مانگانەکان لەسەر کێرڤێکی دینامیکی ببینە، و پسوولەی کاغەز بە کامێرا سکان بکە (OCR).',
        'smk.f5t': 'ئاگادارکردنەوەی زیرەک', 'smk.f5p': 'ئاگادار دەکرێیتەوە کاتێک سەرفیات لە ٤٠٠، ٨٠٠، ١٢٠٠ یان ١٦٠٠ kWh تێدەپەڕێت، یان ئەمپێر دەگاتە ٤٠.',
        'smk.f6t': 'ڕێنمایی، مێژوو و پرسیار', 'smk.f6p': 'ڕێنمایی کردەیی بۆ کەمکردنەوەی پسوولە، مێژووی حیسابەکان و وەڵامی پرسیارە باوەکان.',
        'smk.f7t': 'ڕێکخستنی تایبەت', 'smk.f7p': 'کوردی، عەرەبی و ئینگلیزی، دۆخی تاریک/ڕووناک، ڕەنگی دڵخواز و داگرتنی ئەنجام وەک وێنە.',
        'smk.f8t': 'ئەکاونت و پاراستن', 'smk.f8p': 'ئەکاونتی بەکارهێنەر لەگەڵ پاراستن لە تاقیکردنەوەی پاسۆرد (Brute-Force) و پاراستنی ڕێکخستنەکانی سێرڤەر.'
    });

    Object.assign(ar, {
        'work.1p': 'حاسبة كهرباء ذكية لكوردستان: تحسب فاتورتك حسب التعرفة الرسمية، تتابع أجهزة المنزل، تمسح الفاتورة بالكاميرا وتعرض استهلاكك الشهري برسوم بيانية.',
        'exp.2t': 'مشروع Smart Meter مع BHM Team', 'exp.2p': 'تصميم وبناء حاسبة الكهرباء باستخدام PHP و MySQL و JavaScript.',
        'smk.info': 'معلومات', 'smk.more': 'معلومات — اعرف المزيد', 'smk.kicker': 'معلومات المشروع',
        'smk.sub': 'حاسبة ودليل كهرباء كوردستان — من تطوير BHM Team، فريق من ثلاثة مطوّرين، ليعرف المواطنون تكلفة الكهرباء بسهولة وسرعة.',
        'smk.s1': 'أنواع المشتركين', 'smk.s2': 'شرائح تعرفة المنازل', 'smk.s3': 'لغات', 'smk.s4': 'جداول قاعدة البيانات',
        'smk.fTitle': 'المميزات', 'smk.tTitle': 'التقنيات المستخدمة',
        'smk.f1t': 'حاسبة الفاتورة', 'smk.f1p': 'التكلفة اليومية والأسبوعية والشهرية والسنوية حسب التعرفة الرسمية — منازل (٧٢–٣٥٠ دينار للوحدة)، تجاري، صناعي، حكومي وزراعي.',
        'smk.f2t': 'تحويل الأمبير إلى واط', 'smk.f2p': 'حوّل الأمبير إلى واط على 220V أو 180V أو 110V وأرسل النتيجة مباشرة إلى الحاسبة.',
        'smk.f3t': 'منزلي', 'smk.f3p': 'أضف أجهزة منزلك وشاهد التكلفة الشهرية و kWh ومجموع الأمبير مقارنة بحد 40A.',
        'smk.f4t': 'الفواتير والرسوم', 'smk.f4p': 'تابع الفواتير الشهرية على منحنى ديناميكي، وامسح الفاتورة الورقية بالكاميرا (OCR).',
        'smk.f5t': 'تنبيهات ذكية', 'smk.f5p': 'تنبيه عند تجاوز الاستهلاك 400 أو 800 أو 1200 أو 1600 kWh، أو وصول الحمل إلى 40 أمبير.',
        'smk.f6t': 'نصائح، سجل وأسئلة', 'smk.f6p': 'نصائح عملية لتقليل الفاتورة، سجل الحسابات، وإجابات الأسئلة الشائعة.',
        'smk.f7t': 'إعدادات شخصية', 'smk.f7p': 'كوردي وعربي وإنجليزي، الوضع الداكن/الفاتح، لون مخصص وتصدير النتائج كصورة.',
        'smk.f8t': 'الحسابات والأمان', 'smk.f8p': 'حسابات مستخدمين مع حماية من هجمات تخمين كلمة المرور وحماية إعدادات الخادم.'
    });

    const dicts = { ckb, ar };
    const i18nEls = document.querySelectorAll('[data-i18n]');
    const phEls = document.querySelectorAll('[data-i18n-ph]');
    const en = {};
    i18nEls.forEach(el => { en[el.dataset.i18n] = el.textContent; });
    phEls.forEach(el => { en[el.dataset.i18nPh] = el.placeholder; });
    dicts.en = en;
    const langBtns = document.querySelectorAll('.lang-switch button');

    const setLang = (lang) => {
        const dict = dicts[lang] || en;
        i18nEls.forEach(el => { const v = dict[el.dataset.i18n] || en[el.dataset.i18n]; if (v) el.textContent = v; });
        phEls.forEach(el => { const v = dict[el.dataset.i18nPh] || en[el.dataset.i18nPh]; if (v) el.placeholder = v; });
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
        langBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
        localStorage.setItem('bahez_lang', lang);
    };
    langBtns.forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
    const savedLang = localStorage.getItem('bahez_lang');
    if (savedLang && dicts[savedLang] && savedLang !== 'en') setLang(savedLang);

    /* ===== Scroll progress + back to top ===== */
    const progress = document.getElementById('scroll-progress');
    const toTop = document.getElementById('to-top');
    const onScrollExtras = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
        toTop.classList.toggle('show', window.scrollY > 600);
    };
    window.addEventListener('scroll', onScrollExtras, { passive: true });
    onScrollExtras();

    /* ===== Contact form (opens the visitor's email app, no server needed) ===== */
    document.getElementById('contact-form').addEventListener('submit', e => {
        e.preventDefault();
        const f = e.target;
        const subject = encodeURIComponent('New project from ' + f.name.value.trim());
        const bodyText = encodeURIComponent(f.message.value.trim() + '\n\n— ' + f.name.value.trim());
        window.location.href = `mailto:bahezxalid46@gmail.com?subject=${subject}&body=${bodyText}`;
    });

    /* ===== Visitor counter (Abacus — free, no account needed) =====
       CounterAPI v1 was shut down (HTTP 410), so we use abacus.jasoncameron.dev.
       Each browser tab/session is counted once; refreshing the same tab does not add a visit. */
    const initVisitorCounter = async () => {
        const el = document.getElementById('visitor-count');
        if (!el) return;
        const base = 'https://abacus.jasoncameron.dev';
        const ns = 'bahez-khalid-profile', key = 'visits';
        const counted = sessionStorage.getItem('bahez_visit_counted');
        try {
            const res = await fetch(`${base}/${counted ? 'get' : 'hit'}/${ns}/${key}`);
            let value;
            if (res.status === 404) value = 0; // key not created yet
            else if (!res.ok) throw new Error('HTTP ' + res.status);
            else value = (await res.json()).value;
            el.textContent = Number(value).toLocaleString();
            sessionStorage.setItem('bahez_visit_counted', '1');
            localStorage.setItem('bahez_profile_last_count', value);
        } catch (err) {
            console.error('Visitor counter failed:', err);
            const last = parseInt(localStorage.getItem('bahez_profile_last_count'));
            el.textContent = Number.isFinite(last) ? last.toLocaleString() : '—';
        }
    };
    initVisitorCounter();

    /* ===== DevTools & Source Protection ===== */
    // 1. Disable right-click context menu
    document.addEventListener('contextmenu', e => e.preventDefault());

    // 2. Disable DevTools & View-Source keyboard shortcuts
    document.addEventListener('keydown', e => {
        const k = (e.key || '').toUpperCase();
        if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'K'].includes(k)) ||
            (e.metaKey && e.altKey && ['I', 'J', 'C', 'U'].includes(k)) ||
            ((e.ctrlKey || e.metaKey) && ['U', 'S'].includes(k))
        ) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }, true);

    // 3. Detect if DevTools is opened and clear page DOM (so Elements tab is empty)
    let savedBody = null;
    const checkDevTools = () => {
        const threshold = 160;
        const isOpen = (window.outerWidth - window.innerWidth > threshold) ||
                       (window.outerHeight - window.innerHeight > threshold);
        if (isOpen) {
            if (!savedBody) {
                savedBody = document.body.innerHTML;
                document.body.innerHTML = '';
                console.clear();
            }
        } else if (savedBody !== null) {
            location.reload();
        }
    };
    window.addEventListener('resize', checkDevTools);
    setInterval(checkDevTools, 500);
});
