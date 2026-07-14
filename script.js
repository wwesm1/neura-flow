(function () {
    "use strict";

    /* ===== Icon helper ===== */
    function svg(pathHtml, size) { size = size || 20; return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' + pathHtml + '</svg>'; }
    var ICONS = {
        mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><path d="M12 19v3"/>',
        bolt: '<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/>',
        users: '<circle cx="9" cy="8" r="3.2"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17.5" cy="9" r="2.7"/><path d="M15.2 12.5A5.5 5.5 0 0 1 21.5 19"/>',
        trending: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
        workflow: '<rect x="3" y="4" width="6" height="6" rx="1.4"/><rect x="15" y="4" width="6" height="6" rx="1.4"/><rect x="9" y="15" width="6" height="6" rx="1.4"/><path d="M9 7h4a2 2 0 0 1 2 2v.5"/><path d="M12 13.5V10"/>',
        bot: '<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V4"/><circle cx="12" cy="3" r="1.4"/><circle cx="9" cy="14" r="1.2"/><circle cx="15" cy="14" r="1.2"/><path d="M9 18h6"/>',
        check: '<path d="M20 6 9 17l-5-5"/>',
        arrowRight: '<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>',
        quote: '<path d="M7 8a4 4 0 0 0-4 4v4h6v-6H6a2 2 0 0 1 2-2V8z" fill="currentColor" stroke="none"/><path d="M17 8a4 4 0 0 0-4 4v4h6v-6h-3a2 2 0 0 1 2-2V8z" fill="currentColor" stroke="none"/>',
        star: '<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.1 6.5L12 17.3l-5.8 3.2L7.3 14 2.5 9.4l6.6-.9L12 2.5z" fill="currentColor" stroke="none"/>',
        chev: '<path d="M6 9l6 6 6-6"/>'
    };

    /* ===== Reveal on scroll ===== */
    function initReveal() {
        var els = document.querySelectorAll('.reveal');
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        els.forEach(function (el, i) {
            el.style.transitionDelay = Math.min(i % 6, 5) * 70 + 'ms';
            obs.observe(el);
        });
    }

    /* ===== Navbar scroll state ===== */
    var navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 24) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    /* ===== Mobile menu ===== */
    var navToggle = document.getElementById('navToggle');
    var mobileMenu = document.getElementById('mobileMenu');
    navToggle.addEventListener('click', function () {
        var isOpen = mobileMenu.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        navToggle.innerHTML = isOpen
            ? svg('<path d="M6 6l12 12"/><path d="M18 6L6 18"/>', 24)
            : svg('<path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/>', 24);
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
            mobileMenu.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.innerHTML = svg('<path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/>', 24);
        });
    });

    /* ===== Ripple effect ===== */
    document.addEventListener('click', function (e) {
        var btn = e.target.closest('.rippleable');
        if (!btn) return;
        var rect = btn.getBoundingClientRect();
        var ripple = document.createElement('span');
        var size = Math.max(rect.width, rect.height);
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        btn.appendChild(ripple);
        setTimeout(function () { ripple.remove(); }, 650);
    });

    /* ===== Trusted-by marquee ===== */
    var COMPANIES = ["Vantage", "Northwind", "Orbital", "Fluxo", "Heliox", "Aster & Co", "Lumen Labs", "Nimbus"];
    var track = document.getElementById('marqueeTrack');
    var doubled = COMPANIES.concat(COMPANIES);
    track.innerHTML = doubled.map(function (c) { return '<span>' + c + '</span>'; }).join('');

    /* ===== Features ===== */
    var FEATURES = [
        { icon: 'mic', title: 'AI Meeting Summaries', desc: 'Every call is transcribed, summarized, and turned into action items automatically — no note-taking required.' },
        { icon: 'bolt', title: 'Smart Automation', desc: 'Trigger multi-step workflows from a single event. NeuraFlow handles the repetitive work between decisions.' },
        { icon: 'users', title: 'Team Collaboration', desc: 'Shared context, live cursors, and threaded discussions keep everyone aligned without another status meeting.' },
        { icon: 'trending', title: 'Predictive Analytics', desc: 'Forecast delivery dates and spot at-risk projects days before they slip, based on real team velocity.' },
        { icon: 'workflow', title: 'Workflow Builder', desc: 'Drag-and-drop your team\'s exact process. No code, no rigid templates — just the way you actually work.' },
        { icon: 'bot', title: 'AI Assistant', desc: 'Ask questions in plain language and get answers pulled from your docs, tasks, and past conversations.' }
    ];
    var featuresGrid = document.getElementById('featuresGrid');
    featuresGrid.innerHTML = FEATURES.map(function (f) {
        return '<div class="fcard glass rounded-2xl reveal">' +
            '<div class="fcard-icon">' + svg(ICONS[f.icon], 20) + '</div>' +
            '<h3>' + f.title + '</h3><p>' + f.desc + '</p>' +
            '</div>';
    }).join('');

    /* ===== Showcase ===== */
    var TABS = [
        {
            id: 'summaries', label: 'Meeting Summaries', icon: 'mic',
            title: 'Every meeting, distilled in seconds.',
            desc: 'NeuraFlow joins your calls, transcribes in real time, and surfaces decisions and owners the moment the meeting ends.',
            stats: [{ v: '12s', l: 'Avg. summary time' }, { v: '98.4%', l: 'Accuracy' }]
        },
        {
            id: 'automation', label: 'Automation', icon: 'bolt',
            title: 'Workflows that run themselves.',
            desc: 'Connect triggers to actions across your stack. When a deal closes, NeuraFlow updates the roadmap, notifies the team, and drafts the kickoff doc.',
            stats: [{ v: '9.2', l: 'Hours saved / week' }, { v: '40k+', l: 'Active automations' }]
        },
        {
            id: 'assistant', label: 'AI Assistant', icon: 'bot',
            title: 'Ask anything about your work.',
            desc: 'The assistant reads across your docs, tasks, and meeting notes so you get a direct answer instead of another search.',
            stats: [{ v: '<1s', l: 'Response time' }, { v: '12+', l: 'Context sources' }]
        }
    ];
    var activeTab = 0;
    var showcaseTabs = document.getElementById('showcaseTabs');
    var showcaseText = document.getElementById('showcaseText');
    var showcaseInner = document.getElementById('showcaseInner');

    function renderTabs() {
        showcaseTabs.innerHTML = TABS.map(function (t, i) {
            return '<button class="tab-btn ' + (i === activeTab ? 'active' : '') + ' glass" data-i="' + i + '" aria-pressed="' + (i === activeTab) + '">' +
                svg(ICONS[t.icon], 16) + ' ' + t.label +
                '</button>';
        }).join('');
        showcaseTabs.querySelectorAll('.tab-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                activeTab = parseInt(btn.dataset.i, 10);
                render();
            });
        });
    }

    function renderText() {
        var t = TABS[activeTab];
        showcaseText.innerHTML =
            '<h3>' + t.title + '</h3><p>' + t.desc + '</p>' +
            '<div class="showcase-stats">' +
            t.stats.map(function (s) { return '<div><p class="val grad-text">' + s.v + '</p><p class="lbl">' + s.l + '</p></div>'; }).join('') +
            '</div>' +
            '<a href="#pricing" class="showcase-link">Explore ' + t.label + ' ' + svg(ICONS.arrowRight, 16) + '</a>';
    }

    function renderPanel() {
        var content = '';
        if (activeTab === 0) {
            var lines = ["Alex approved the Q3 budget", "Priya to send updated timeline by Fri", "Design review moved to next sprint"];
            content = lines.map(function (line, i) {
                return '<div class="sc-row glass" style="animation-delay:' + (i * 0.12) + 's;">' +
                    svg(ICONS.check, 16) + ' <span style="font-size:.9rem;color:rgba(255,255,255,.85);">' + line + '</span>' +
                    '</div>';
            }).join('');
        } else if (activeTab === 1) {
            var steps = ["Trigger", "Condition", "Action"];
            content = '<div class="sc-flow">' + steps.map(function (s, i) {
                return (i > 0 ? svg(ICONS.arrowRight, 16) + '<span style="color:rgba(161,161,170,.5);"></span>' : '') +
                    '<div class="sc-step glass" style="animation-delay:' + (i * 0.15) + 's;"><div class="sc-step-icon"></div><p>' + s + '</p></div>';
            }).join('') + '</div>';
        } else {
            content =
                '<div class="sc-chat glass user">What\'s blocking the Aurora launch?</div>' +
                '<div class="sc-chat glass-strong ai">Two items: QA sign-off (due tomorrow) and the pricing page copy, assigned to Jo — still in draft.</div>';
        }
        showcaseInner.innerHTML = content;
    }

    function render() { renderTabs(); renderText(); renderPanel(); }
    render();

    /* ===== Stats counters ===== */
    var STATS = [
        { target: 48000, suffix: '+', label: 'Teams onboarded', decimals: 0 },
        { target: 9.4, suffix: 'M', label: 'Hours automated', decimals: 1 },
        { target: 98, suffix: '%', label: 'Summary accuracy', decimals: 0 },
        { target: 4.9, suffix: '/5', label: 'Average rating', decimals: 1 }
    ];
    var statsGrid = document.getElementById('statsGrid');
    statsGrid.innerHTML = STATS.map(function (s, i) {
        return '<div class="reveal"><p class="stat-num grad-text" data-target="' + s.target + '" data-decimals="' + s.decimals + '" data-suffix="' + s.suffix + '">0</p><p class="stat-lbl">' + s.label + '</p></div>';
    }).join('');

    function animateCounter(el) {
        var target = parseFloat(el.dataset.target);
        var decimals = parseInt(el.dataset.decimals, 10);
        var suffix = el.dataset.suffix;
        var duration = 1800;
        var start = performance.now();
        function tick(now) {
            var progress = Math.min((now - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var val = target * eased;
            el.textContent = val.toFixed(decimals) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target.toFixed(decimals) + suffix;
        }
        requestAnimationFrame(tick);
    }
    var counterObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });
    statsGrid.querySelectorAll('.stat-num').forEach(function (el) { counterObs.observe(el); });

    /* ===== Testimonials ===== */
    var TESTIMONIALS = [
        { name: 'Maya Chen', role: 'VP of Operations, Vantage', quote: 'NeuraFlow cut our meeting follow-up time by more than half. Action items just appear where they need to.', initials: 'MC' },
        { name: 'Daniel Ortiz', role: 'Head of Product, Fluxo', quote: 'The workflow builder replaced four separate tools. Our team finally works from one source of truth.', initials: 'DO' },
        { name: 'Sarah Kim', role: 'COO, Northwind', quote: 'Predictive analytics flagged a delivery risk two weeks before we would have caught it manually.', initials: 'SK' },
        { name: 'James Whitfield', role: 'Engineering Lead, Heliox', quote: 'The AI assistant genuinely understands our codebase context — it\'s like onboarding a very fast teammate.', initials: 'JW' }
    ];
    var testimonialsGrid = document.getElementById('testimonialsGrid');
    testimonialsGrid.innerHTML = TESTIMONIALS.map(function (t) {
        var stars = '';
        for (var i = 0; i < 5; i++) { stars += svg(ICONS.star, 14); }
        return '<div class="tcard glass rounded-2xl reveal">' +
            '<span class="quote-icon">' + svg(ICONS.quote, 26) + '</span>' +
            '<p class="quote">"' + t.quote + '"</p>' +
            '<div class="tcard-foot">' +
            '<div class="avatar">' + t.initials + '</div>' +
            '<div><p class="tcard-name">' + t.name + '</p><p class="tcard-role">' + t.role + '</p></div>' +
            '<div class="stars">' + stars + '</div>' +
            '</div>' +
            '</div>';
    }).join('');

    /* ===== Pricing ===== */
    var PRICING = [
        {
            name: 'Starter', price: '0', period: 'forever', desc: 'For individuals getting organized.',
            features: ['Up to 3 projects', '20 AI meeting summaries / mo', 'Basic automations', 'Community support'],
            cta: 'Start Free', highlight: false
        },
        {
            name: 'Pro', price: '24', period: 'per user / mo', desc: 'For growing teams that move fast.',
            features: ['Unlimited projects', 'Unlimited meeting summaries', 'Advanced workflow builder', 'Predictive analytics', 'Priority support'],
            cta: 'Start Free Trial', highlight: true
        },
        {
            name: 'Enterprise', price: 'Custom', period: 'billed annually', desc: 'For organizations that need control.',
            features: ['Everything in Pro', 'SSO & advanced security', 'Dedicated success manager', 'Custom integrations', '99.9% uptime SLA'],
            cta: 'Contact Sales', highlight: false
        }
    ];
    var pricingGrid = document.getElementById('pricingGrid');
    pricingGrid.innerHTML = PRICING.map(function (p) {
        return '<div class="pcard ' + (p.highlight ? 'highlight glass-strong' : 'glass') + ' reveal">' +
            (p.highlight ? '<span class="pcard-badge">Most Popular</span>' : '') +
            '<h3>' + p.name + '</h3><p class="pdesc">' + p.desc + '</p>' +
            '<div class="price"><span class="amt">' + (p.price !== 'Custom' ? '$' + p.price : p.price) + '</span><span class="period">' + p.period + '</span></div>' +
            '<ul>' + p.features.map(function (f) { return '<li>' + svg(ICONS.check, 16) + '<span>' + f + '</span></li>'; }).join('') + '</ul>' +
            '<a href="#" class="btn ' + (p.highlight ? 'btn-primary' : 'btn-ghost') + ' btn-full rippleable">' + p.cta + '</a>' +
            '</div>';
    }).join('');

    /* ===== FAQ ===== */
    var FAQS = [
        { q: 'How does NeuraFlow summarize meetings?', a: 'NeuraFlow joins your calendar and calls (Zoom, Meet, Teams), transcribes the conversation in real time, and uses AI to extract decisions, owners, and deadlines — delivered to your workspace within seconds of the call ending.' },
        { q: 'Can I import my existing projects and tasks?', a: 'Yes. NeuraFlow includes one-click importers for Asana, Trello, Jira, and Notion, plus a CSV importer for anything else. Your history, assignees, and due dates carry over automatically.' },
        { q: 'Is my data secure?', a: 'NeuraFlow is SOC 2 Type II certified and encrypts data in transit and at rest. Enterprise plans include SSO, audit logs, and configurable data residency.' },
        { q: 'Do I need to write code to build automations?', a: 'No. The workflow builder is fully visual — drag triggers, conditions, and actions onto a canvas. Advanced users can optionally add custom scripts for edge cases.' },
        { q: 'What happens after my free trial ends?', a: 'You\'ll be prompted to choose a plan before any charge occurs. If you do nothing, your account automatically moves to the free Starter plan — no surprise billing.' },
        { q: 'Can I cancel anytime?', a: 'Yes, cancel from your billing settings at any time. You\'ll retain access through the end of your current billing period, and you can export your data whenever you like.' }
    ];
    var faqList = document.getElementById('faqList');
    faqList.innerHTML = FAQS.map(function (item, i) {
        return '<div class="faq-item glass rounded-2xl reveal ' + (i === 0 ? 'open' : '') + '" data-i="' + i + '">' +
            '<button class="faq-q" aria-expanded="' + (i === 0) + '">' +
            '<span>' + item.q + '</span><span class="faq-chev">' + svg(ICONS.chev, 20) + '</span>' +
            '</button>' +
            '<div class="faq-panel"><p>' + item.a + '</p></div>' +
            '</div>';
    }).join('');

    function setPanelHeight(item, open) {
        var panel = item.querySelector('.faq-panel');
        if (open) { panel.style.maxHeight = panel.scrollHeight + 'px'; }
        else { panel.style.maxHeight = '0px'; }
    }
    faqList.querySelectorAll('.faq-item').forEach(function (item) {
        setPanelHeight(item, item.classList.contains('open'));
        item.querySelector('.faq-q').addEventListener('click', function () {
            var willOpen = !item.classList.contains('open');
            faqList.querySelectorAll('.faq-item').forEach(function (other) {
                other.classList.remove('open');
                other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
                setPanelHeight(other, false);
            });
            if (willOpen) {
                item.classList.add('open');
                item.querySelector('.faq-q').setAttribute('aria-expanded', 'true');
                setPanelHeight(item, true);
            }
        });
    });

    /* ===== Footer year ===== */
    document.getElementById('copyrightYear').textContent = '© ' + new Date().getFullYear() + ' NeuraFlow, Inc. All rights reserved.';

    /* ===== Init reveal after DOM is populated ===== */
    initReveal();
})();