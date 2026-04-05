document.addEventListener('DOMContentLoaded', () => {

    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const menuOverlay = document.getElementById('menu-overlay');
    const body = document.body;

    const openMenu = () => {
        menuOverlay.classList.add('active');
        body.classList.add('menu-open');
    };

    const closeMenu = () => {
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    };

    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);


    const profileTrigger = document.getElementById('profile-trigger');
    const profileClose = document.getElementById('profile-close');
    const profileOverlay = document.getElementById('profile-overlay');

    const openProfile = (e) => {
        if (e) e.preventDefault();
        profileOverlay.classList.add('active');
        body.classList.add('menu-open');
    };

    const closeProfile = () => {
        profileOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    };

    if (profileTrigger) profileTrigger.addEventListener('click', openProfile);
    if (profileClose) profileClose.addEventListener('click', closeProfile);

    
    profileOverlay.addEventListener('click', (e) => {
        if (e.target === profileOverlay) closeProfile();
    });

    document.querySelectorAll('.menu-item a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


    const initVisitorCounter = async () => {
        const visitorCountElement = document.getElementById('visitor-count');
        if (!visitorCountElement) return;

        // Using CounterAPI for global counting
        // Namespace: bahez-profile, Key: visits
        const namespace = 'bahez-profile';
        const key = 'visits';
        const hasIncremented = sessionStorage.getItem('bahez_profile_incremented');
        
        // If already incremented this session, just get the count. Otherwise, increment it.
        const action = hasIncremented ? 'get' : 'up';
        const apiUrl = `https://api.counterapi.dev/v1/${namespace}/${key}/${action}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('API Response Error');
            
            const data = await response.json();
            const count = data.count;

            // Update UI
            visitorCountElement.textContent = count.toLocaleString();
            
            // Mark as incremented for this session
            if (!hasIncremented) {
                sessionStorage.setItem('bahez_profile_incremented', 'true');
            }
            
            // Keep a local copy just in case
            localStorage.setItem('bahez_profile_last_count', count);

        } catch (error) {
            console.error('Global Visitor Counter failed, using local fallback:', error);
            
            // Fallback to local storage if API fails
            let localCount = parseInt(localStorage.getItem('bahez_profile_last_count')) || 0;
            if (!hasIncremented) {
                localCount++;
                localStorage.setItem('bahez_profile_last_count', localCount);
                sessionStorage.setItem('bahez_profile_incremented', 'true');
            }
            visitorCountElement.textContent = localCount.toLocaleString();
        }
    };

    initVisitorCounter();
});
