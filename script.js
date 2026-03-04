document.addEventListener("DOMContentLoaded", function () {

    // --- LOGIKA NAVIGASI TABS ---
    window.switchPage = function(pageId) {

        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.remove('active');
        });

        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active-tab');
            btn.classList.remove('text-white');
        });

        const page = document.getElementById('page-' + pageId);
        if (page) page.classList.add('active');

        const activeBtn = document.getElementById('btn-' + pageId);
        if (activeBtn) {
            activeBtn.classList.add('active-tab');
            activeBtn.classList.add('text-white');
        }
    };

    // Initialize first tab
    switchPage('ramadhan');

    // --- LOGIKA COUNTER ZIKIR ---
    let count = 0;
    const target = 33;

    const countDisplay = document.getElementById('count-display');
    const notification = document.getElementById('notification');
    const progressRing = document.getElementById('progress-ring');
    const targetDisplay = document.getElementById('target-display');
    const addBtn = document.getElementById('add-btn');

    if (!countDisplay) return; // cegah error jika bukan di halaman zikir

    targetDisplay.innerText = target;

    window.incrementCounter = function() {
        count++;
        updateUI();
        checkTarget();
        triggerRipple();
    }

    window.resetCounter = function() {
        count = 0;
        updateUI();
        hideNotification();
    }

    function updateUI() {
        countDisplay.innerText = count;
        const percentage = Math.min((count / target) * 100, 100);
        if (progressRing) {
            progressRing.style.height = percentage + '%';
        }
    }

    function checkTarget() {
        if (count > 0 && count % target === 0) {
            showNotification();
        }
    }

    function showNotification() {
        if (notification) {
            notification.classList.add('show');
            setTimeout(hideNotification, 3000);
        }
    }

    function hideNotification() {
        if (notification) {
            notification.classList.remove('show');
        }
    }

    function triggerRipple() {
        countDisplay.style.transform = "scale(1.2)";
        setTimeout(() => {
            countDisplay.style.transform = "scale(1)";
        }, 100);
    }

    document.addEventListener('keydown', function (event) {
        const zikirPage = document.getElementById('page-zikir');
        if (zikirPage && zikirPage.classList.contains('active')) {

            if (event.code === 'Space') {
                event.preventDefault();
                incrementCounter();
                if (addBtn) {
                    addBtn.classList.add('scale-95');
                    setTimeout(() => addBtn.classList.remove('scale-95'), 100);
                }
            }

            if (event.code === 'KeyR') {
                resetCounter();
            }
        }
    });

});