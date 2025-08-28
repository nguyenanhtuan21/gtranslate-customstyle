// CRITICAL: Execute IMMEDIATELY to prevent FOUC - before any other script

// BACKUP PLAN: Inject critical CSS IMMEDIATELY via document.write (fastest possible)
if (document.readyState === 'loading') {
    document.write('<style id="gt-critical-hide">html,body{visibility:hidden!important;overflow:hidden!important}#gt-emergency-loading{position:fixed!important;top:0!important;left:0!important;width:100vw!important;height:100vh!important;background:rgba(255,255,255,0.98)!important;z-index:2147483647!important;display:flex!important;align-items:center!important;justify-content:center!important;visibility:visible!important}.gt-emergency-spinner{width:50px!important;height:50px!important;border:3px solid rgba(0,0,0,0.1)!important;border-top:3px solid #4f46e5!important;border-radius:50%!important;animation:gt-emergency-spin 1s linear infinite!important}@keyframes gt-emergency-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}</style><div id="gt-emergency-loading"><div class="gt-emergency-spinner"></div></div>');
}

(function(){
    'use strict';
    
    // ALWAYS show loading first, then decide based on cookie
    var early_default = 'vi'; // Default language - adjust if needed
    
    // STEP 1: IMMEDIATELY hide content and show loading
    function injectEarlyLoading() {
        // CRITICAL: Inject CSS to hide content IMMEDIATELY
        var hideStyle = document.createElement('style');
        hideStyle.id = 'gt-early-hide-style';
        hideStyle.textContent = `
            html, body { 
                visibility: hidden !important; 
                overflow: hidden !important;
            }
            #gt-early-loading {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                background: rgba(255, 255, 255, 0.98) !important;
                backdrop-filter: blur(10px) !important;
                -webkit-backdrop-filter: blur(10px) !important;
                z-index: 2147483647 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                visibility: visible !important;
                opacity: 1 !important;
            }
            .gt-early-spinner {
                width: 60px !important;
                height: 60px !important;
                border: 4px solid rgba(0,0,0,0.1) !important;
                border-top: 4px solid #4f46e5 !important;
                border-radius: 50% !important;
                animation: gt-early-spin 1s linear infinite !important;
                position: relative !important;
            }
            .gt-early-spinner::after {
                content: "" !important;
                position: absolute !important;
                top: -4px !important;
                left: -4px !important;
                right: -4px !important;
                bottom: -4px !important;
                border: 2px solid transparent !important;
                border-top: 2px solid rgba(79,70,229,0.3) !important;
                border-radius: 50% !important;
                animation: gt-early-spin-reverse 1.5s linear infinite !important;
            }
            @keyframes gt-early-spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes gt-early-spin-reverse {
                0% { transform: rotate(360deg); }
                100% { transform: rotate(0deg); }
            }
        `;
        document.head.appendChild(hideStyle);
        
        // IMMEDIATELY create and inject loading HTML
        var loadingHTML = '<div id="gt-early-loading"><div class="gt-early-spinner"></div></div>';
        
        // Inject loading HTML IMMEDIATELY - even before body exists
        if (document.body) {
            document.body.insertAdjacentHTML('afterbegin', loadingHTML);
        } else {
            // If body doesn't exist yet, inject as soon as it does
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'childList') {
                        var body = document.querySelector('body');
                        if (body && !document.getElementById('gt-early-loading')) {
                            body.insertAdjacentHTML('afterbegin', loadingHTML);
                            observer.disconnect();
                        }
                    }
                });
            });
            observer.observe(document.documentElement, { childList: true, subtree: true });
            
            // Fallback: Try again after tiny delay
            setTimeout(function() {
                if (document.body && !document.getElementById('gt-early-loading')) {
                    document.body.insertAdjacentHTML('afterbegin', loadingHTML);
                }
            }, 1);
        }
        
        console.log('GTranslate: CRITICAL - Early loading injected IMMEDIATELY');
    }
    
    // STEP 2: Check cookie and sessionStorage to decide what to do
    function checkCookieAndDecide() {
        // PRIORITY 1: Check if we're navigating from translated page
        var preserveLang = sessionStorage.getItem('gt_preserve_lang');
        var wasNavigating = sessionStorage.getItem('gt_navigating_from_translated');
        
        if (preserveLang && wasNavigating) {
            console.log('GTranslate: Navigation detected - preserving language: ' + preserveLang);
            // Keep loading active for navigation restoration
            waitForDOMAndShowLoading(preserveLang);
            return;
        }
        
        // PRIORITY 2: Check cookie for existing translation
    var early_cookie_check = document.cookie.match('(^|;) ?googtrans=([^;]*)(;|$)');
        var shouldShowLoading = false;
        var detectedLang = null;
        
        console.log('GTranslate: Checking cookie...', document.cookie);
        
        if (early_cookie_check && early_cookie_check[2] && early_cookie_check[2] !== '/auto/auto') {
            detectedLang = early_cookie_check[2].split('/')[2];
            
            // Only show loading if language is different from default
            if (detectedLang && detectedLang !== early_default) {
                shouldShowLoading = true;
                console.log('GTranslate: Cookie detected with language: ' + detectedLang + ' (different from default: ' + early_default + ')');
            } else {
                console.log('GTranslate: Cookie detected but language is default: ' + detectedLang);
            }
        } else {
            console.log('GTranslate: No translation cookie found');
        }
        
        if (!shouldShowLoading) {
            // No need for loading - hide ALL loading and show content immediately
            console.log('GTranslate: No loading needed - hiding all loading elements');
            hideAllLoading();
            return;
        }
        
        // Need loading - wait for DOM then show proper loading
        console.log('GTranslate: Loading needed - continuing with translation');
        waitForDOMAndShowLoading(detectedLang);
    }
    
    // NEW: Function to hide ALL loading elements (including header-injected)
    function hideAllLoading() {
        console.log('GTranslate: hideAllLoading called');
        
        // Try multiple times to find header-injected elements (they might not be ready yet)
        var attempts = 0;
        var maxAttempts = 10;
        
        function tryHideHeaderLoading() {
            attempts++;
            console.log('GTranslate: Attempt ' + attempts + ' to find header elements');
            
            // Remove header-injected loading FIRST
            var instantLoading = document.getElementById('gt-instant-loading');
            var instantHide = document.getElementById('gt-instant-hide');
            
            console.log('GTranslate: Found elements - loading:', !!instantLoading, 'hide:', !!instantHide);
            
            if (instantLoading) {
                instantLoading.style.opacity = '0';
                instantLoading.style.transition = 'opacity 0.3s ease';
                setTimeout(function() {
                    if (instantLoading.parentNode) {
                        instantLoading.parentNode.removeChild(instantLoading);
                    }
                }, 300);
                console.log('GTranslate: Removed header-injected loading element');
            }
            
            if (instantHide) {
                instantHide.remove();
                console.log('GTranslate: Removed header-injected hide style');
            }
            
            // If we found elements or reached max attempts, stop trying
            if ((instantLoading || instantHide) || attempts >= maxAttempts) {
                console.log('GTranslate: Finished hiding header elements after ' + attempts + ' attempts');
                // Also call the original hideEarlyLoading for other elements
                hideEarlyLoading();
                return;
            }
            
            // Try again after a short delay
            setTimeout(tryHideHeaderLoading, 10);
        }
        
        // Start trying immediately
        tryHideHeaderLoading();
    }
    
    // STEP 3: Hide early loading and show content
    function hideEarlyLoading() {
        // Remove all hide styles (including header-injected ones)
        var hideStyle = document.getElementById('gt-early-hide-style');
        if (hideStyle) {
            hideStyle.remove();
        }
        
        var criticalHide = document.getElementById('gt-critical-hide');
        if (criticalHide) {
            criticalHide.remove();
        }
        
        // IMPORTANT: Also check for header-injected loading
        var instantHide = document.getElementById('gt-instant-hide');
        if (instantHide) {
            instantHide.remove();
            console.log('GTranslate: Removed header-injected hide style');
        }
        
        // Show html and body
        if (document.documentElement) {
            document.documentElement.style.visibility = 'visible';
            document.documentElement.style.overflow = '';
        }
        if (document.body) {
            document.body.style.visibility = 'visible';
            document.body.style.overflow = '';
        }
        
        // Remove all loading elements (including header-injected ones)
        var earlyLoading = document.getElementById('gt-early-loading');
        if (earlyLoading) {
            earlyLoading.remove();
        }
        
        var emergencyLoading = document.getElementById('gt-emergency-loading');
        if (emergencyLoading) {
            emergencyLoading.remove();
        }
        
        // IMPORTANT: Also check for header-injected loading
        var instantLoading = document.getElementById('gt-instant-loading');
        if (instantLoading) {
            instantLoading.style.opacity = '0';
            instantLoading.style.transition = 'opacity 0.3s ease';
            setTimeout(function() {
                if (instantLoading.parentNode) {
                    instantLoading.parentNode.removeChild(instantLoading);
                }
            }, 300);
            console.log('GTranslate: Removed header-injected loading element');
        }
        
        console.log('GTranslate: Early loading hidden - showing content');
    }
    
    // STEP 4: Show proper loading for translation
    function waitForDOMAndShowLoading(targetLang) {
            function showPriorityLoading() {
                // Ensure body exists
            if (!document.body) {
                    setTimeout(showPriorityLoading, 10);
                    return;
                }
                
            // Remove early hide style and show body
            var hideStyle = document.getElementById('gt-early-hide-style');
            if (hideStyle) {
                hideStyle.remove();
            }
                document.body.style.visibility = 'visible';
                
            // Create proper loading overlay
            var loadingHTML = `
                <div id="gt-early-loading">
                    <div class="gt-early-spinner"></div>
                </div>
            `;
            
            // Add loading HTML to body
            var loadingDiv = document.createElement('div');
            loadingDiv.innerHTML = loadingHTML;
            document.body.appendChild(loadingDiv.firstElementChild);
            
            console.log('GTranslate: Priority loading displayed for language: ' + targetLang);
                
                // Setup monitoring to hide when translation complete
                setTimeout(function() {
                monitorTranslationProgress(targetLang);
            }, 100);
        }
        
        // Execute immediately or wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', showPriorityLoading);
        } else {
            showPriorityLoading();
        }
    }
    
    // STEP 5: Monitor translation progress
    function monitorTranslationProgress(targetLang) {
                    var startTime = Date.now();
        var checkInterval = 200; // Increased interval for better stability
        var maxWaitTime = 8000; // Increased max wait time
        var minWaitTime = 1000; // Increased minimum wait time
        var stableCheckCount = 0; // Count stable translation checks
        var requiredStableChecks = 3; // Require 3 stable checks before hiding
        
        console.log('GTranslate: Starting translation monitoring for ' + targetLang);
                    
                    function checkPriorityTranslation() {
                        var currentTime = Date.now();
                        var elapsedTime = currentTime - startTime;
                        
            // Wait minimum time before checking
            if (elapsedTime < minWaitTime) {
                console.log('GTranslate: Waiting minimum time... ' + elapsedTime + 'ms');
                            setTimeout(checkPriorityTranslation, checkInterval);
                            return;
                        }
                        
            // Check if translation is complete using multiple methods
            var translationStatus = checkTranslationComplete();
            
            console.log('GTranslate: Translation check - ' + 
                'Elements: ' + translationStatus.translatedElements + 
                ', Visible: ' + Math.round(translationStatus.visibleHeight) + 'px' +
                ', Progress: ' + Math.round(translationStatus.progress * 100) + '%' +
                ', Time: ' + elapsedTime + 'ms');
            
            if (translationStatus.isComplete) {
                stableCheckCount++;
                console.log('GTranslate: Translation appears complete (' + stableCheckCount + '/' + requiredStableChecks + ')');
                
                if (stableCheckCount >= requiredStableChecks) {
                    // Translation is stable and complete
                    hideTranslationLoading();
                    console.log('GTranslate: Translation confirmed complete for ' + targetLang + ' in ' + elapsedTime + 'ms');
                    return;
                }
            } else {
                // Reset stable count if translation not complete
                stableCheckCount = 0;
            }
            
            // Timeout check
            if (elapsedTime >= maxWaitTime) {
                console.log('GTranslate: Translation timeout reached (' + maxWaitTime + 'ms) - hiding loading');
                hideTranslationLoading();
                return;
            }
            
            // Continue monitoring
            setTimeout(checkPriorityTranslation, checkInterval);
        }
        
        // Start monitoring
        setTimeout(checkPriorityTranslation, checkInterval);
    }
    
    // Enhanced function to check translation completion
    function checkTranslationComplete() {
                        var viewportHeight = window.innerHeight;
                        var translatedElements = document.querySelectorAll('font[style*="vertical-align: inherit"]');
                        var visibleHeight = 0;
        var totalTextElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, a, li, td, th').length;
                        
        // Calculate visible translated content
                        translatedElements.forEach(function(el) {
                            var rect = el.getBoundingClientRect();
            if (rect.top < viewportHeight && rect.bottom > 0) {
                                visibleHeight += Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
                            }
                        });
                        
        // Check if Google Translate widget is fully loaded
        var googleTranslateLoaded = document.querySelector('.goog-te-combo') !== null;
        
        // CRITICAL FIX: Detect current language to determine completion logic
        var currentLang = 'vi'; // Default language
        try {
            var cookieMatch = document.cookie.match('(^|;) ?googtrans=([^;]*)(;|$)');
            if (cookieMatch && cookieMatch[2]) {
                var langParts = cookieMatch[2].split('/');
                if (langParts.length >= 3) {
                    currentLang = langParts[2];
                }
            }
        } catch (e) {
            console.log('GTranslate: Error detecting current language:', e);
        }
        
        var isDefaultLanguage = currentLang === 'vi' || currentLang === 'auto';
        
        // DIFFERENT LOGIC for default vs foreign language
        var isComplete;
        
        if (isDefaultLanguage) {
            // DEFAULT LANGUAGE: Complete when translated elements are REMOVED
            var hasNoTranslatedElements = translatedElements.length === 0;
            var contentVisible = document.body && document.body.style.visibility !== 'hidden';
            
            isComplete = googleTranslateLoaded && hasNoTranslatedElements && contentVisible;
            
            console.log('GTranslate: DEFAULT LANGUAGE detection - ' +
                       'Elements: ' + translatedElements.length + 
                       ' (should be 0), GoogleLoaded: ' + googleTranslateLoaded +
                       ', ContentVisible: ' + contentVisible);
        } else {
            // FOREIGN LANGUAGE: Complete when translated elements are PRESENT
            var hasTranslatedElements = translatedElements.length > 0;
            var hasSignificantContent = visibleHeight > (viewportHeight * 0.3);
            var hasMinimumElements = translatedElements.length >= Math.min(5, totalTextElements * 0.1);
            
            isComplete = hasTranslatedElements && 
                        hasSignificantContent && 
                        hasMinimumElements && 
                        googleTranslateLoaded;
                        
            console.log('GTranslate: FOREIGN LANGUAGE detection - ' +
                       'Elements: ' + translatedElements.length + 
                       ', Visible: ' + Math.round(visibleHeight) + 'px' +
                       ', GoogleLoaded: ' + googleTranslateLoaded);
        }
        
        return {
            isComplete: isComplete,
            translatedElements: translatedElements.length,
            visibleHeight: visibleHeight,
            progress: isDefaultLanguage ? 
                     (translatedElements.length === 0 ? 1 : 0) : // Default: complete when no elements
                     Math.min(1, visibleHeight / (viewportHeight * 0.5)), // Foreign: progress by coverage
            totalTextElements: totalTextElements,
            googleTranslateLoaded: googleTranslateLoaded,
            isDefaultLanguage: isDefaultLanguage,
            currentLang: currentLang
        };
    }
    
    // Keep old function for backward compatibility
    function getVisibleTranslatedContent() {
        return checkTranslationComplete().visibleHeight;
    }
    
    // Hide translation loading
    function hideTranslationLoading() {
        var earlyLoading = document.getElementById('gt-early-loading');
        if (earlyLoading) {
            earlyLoading.style.opacity = '0';
            earlyLoading.style.transition = 'opacity 0.3s ease';
            setTimeout(function() {
                if (earlyLoading.parentNode) {
                    earlyLoading.parentNode.removeChild(earlyLoading);
                }
            }, 300);
        }
        
        // Also check for header-injected loading
        var instantLoading = document.getElementById('gt-instant-loading');
        if (instantLoading) {
            instantLoading.style.opacity = '0';
            instantLoading.style.transition = 'opacity 0.3s ease';
            setTimeout(function() {
                if (instantLoading.parentNode) {
                    instantLoading.parentNode.removeChild(instantLoading);
                }
            }, 300);
            console.log('GTranslate: Translation complete - removed header-injected loading');
        }
        
        // Remove hide styles
        var instantHide = document.getElementById('gt-instant-hide');
        if (instantHide) {
            instantHide.remove();
        }
        
        // Show content
        if (document.documentElement) {
            document.documentElement.style.visibility = 'visible';
            document.documentElement.style.overflow = '';
        }
        if (document.body) {
            document.body.style.visibility = 'visible';
            document.body.style.overflow = '';
        }
    }
    
    // CRITICAL: Execute IMMEDIATELY - no delays
    injectEarlyLoading();
    
    // Also inject loading via direct DOM manipulation for maximum speed
    if (document.documentElement) {
        document.documentElement.style.visibility = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    }
    
    // Check cookie immediately - no delay
    checkCookieAndDecide();
})();

// CONDITIONAL NAVIGATION HANDLER - Performance optimized cho 3 luồng
(function(){
    var navigationReloadPending = false;
    var navigationTimeout = null;
    
    // CRITICAL: Function to check if user is using translation
    function isUsingTranslation() {
        // Method 1: Check cookie (fastest)
        var cookieCheck = document.cookie.match('(^|;) ?googtrans=([^;]*)(;|$)');
        if (cookieCheck && cookieCheck[2] && cookieCheck[2] !== '/auto/auto') {
            var cookieLang = cookieCheck[2].split('/')[2];
            if (cookieLang && cookieLang !== 'vi') { // Use early_default
                return { isTranslated: true, lang: cookieLang, source: 'cookie' };
            }
        }
        
        // Method 2: Check sessionStorage for navigation state
        var preserveLang = sessionStorage.getItem('gt_preserve_lang');
        if (preserveLang && preserveLang !== 'vi') {
            return { isTranslated: true, lang: preserveLang, source: 'session' };
        }
        
        // Method 3: Check for Google Translate elements (slowest, fallback)
        if (document.querySelector('font[style*="vertical-align: inherit"]')) {
            return { isTranslated: true, lang: 'unknown', source: 'dom' };
        }
        
        return { isTranslated: false, lang: 'vi', source: 'default' };
    }
    
    function showNavigationLoading() {
        // Priority: Use header loading first
        var instantLoading = document.getElementById('gt-instant-loading');
        if (instantLoading) {
            instantLoading.style.display = 'flex';
            instantLoading.style.opacity = '1';
            console.log('GTranslate Base: Using header loading for navigation');
            return;
        }
        
        // Fallback: Use page loading
        var pageLoading = document.getElementById('gt-page-loading');
        if (pageLoading) {
            pageLoading.classList.add('active');
            console.log('GTranslate Base: Using page loading for navigation');
            return;
        }
        
        // Emergency: Create lightweight loading
        var emergencyLoading = document.createElement('div');
        emergencyLoading.id = 'gt-emergency-nav-loading';
        emergencyLoading.innerHTML = `
            <div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,0.95);z-index:999999;display:flex;align-items:center;justify-content:center">
                <div style="width:50px;height:50px;border:3px solid rgba(0,0,0,0.1);border-top:3px solid #4f46e5;border-radius:50%;animation:gt-nav-spin 1s linear infinite"></div>
            </div>
            <style>@keyframes gt-nav-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}</style>
        `;
        document.body.appendChild(emergencyLoading);
        console.log('GTranslate Base: Created emergency navigation loading');
    }
    
    function handleNavigationReload(source, event) {
        // PERFORMANCE GATE: Chỉ proceed nếu user đang dùng translation
        var translationState = isUsingTranslation();
        
        if (!translationState.isTranslated) {
            console.log('GTranslate Base: User using default language (' + 
                       translationState.lang + ') - skipping navigation reload for performance');
            return; // EXIT EARLY - No performance impact cho default users
        }
        
        // Prevent duplicate reloads
        if (navigationReloadPending) {
            console.log('GTranslate Base: Navigation reload already pending, skipping ' + source);
            return;
        }
        
        navigationReloadPending = true;
        console.log('GTranslate Base: Navigation reload triggered by ' + source + 
                   ' for translated user (' + translationState.lang + ', detected via ' + translationState.source + ')');
        
        // Show loading IMMEDIATELY - chỉ cho translated users
        showNavigationLoading();
        
        // Mark navigation state
        sessionStorage.setItem('gt_navigating', '1');
        sessionStorage.setItem('gt_navigation_source', source);
        sessionStorage.setItem('gt_preserve_lang', translationState.lang);
        sessionStorage.setItem('gt_preserve_cookie', document.cookie);
        
        // Clear any existing timeout
        if (navigationTimeout) {
            clearTimeout(navigationTimeout);
        }
        
        // Reload with minimal delay để loading có thời gian hiển thị
        navigationTimeout = setTimeout(function() {
            location.reload();
        }, 50);
    }
    
    // CONDITIONAL EVENT LISTENERS - Lightweight check first
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            // Quick check trước khi proceed
            var quickCheck = document.cookie.includes('googtrans') || 
                           sessionStorage.getItem('gt_preserve_lang');
            
            if (quickCheck) {
                handleNavigationReload('pageshow-bfcache', event);
            } else {
                console.log('GTranslate Base: bfcache detected but no translation - performance mode');
            }
        }
    });
    
    window.addEventListener('popstate', function(event) {
        // Quick check trước khi proceed
        var quickCheck = document.cookie.includes('googtrans') || 
                       sessionStorage.getItem('gt_preserve_lang');
        
        if (quickCheck) {
            handleNavigationReload('popstate', event);
        } else {
            console.log('GTranslate Base: popstate detected but no translation - performance mode');
        }
    });
    
    // Cleanup - lightweight cho tất cả users
    window.addEventListener('beforeunload', function() {
        navigationReloadPending = false;
        if (navigationTimeout) {
            clearTimeout(navigationTimeout);
            navigationTimeout = null;
        }
        
        // Mark navigation state for translated users only
        var translationState = isUsingTranslation();
        if (translationState.isTranslated) {
            sessionStorage.setItem('gt_navigating_from_translated', '1');
            sessionStorage.setItem('gt_preserve_lang', translationState.lang);
            sessionStorage.setItem('gt_preserve_cookie', document.cookie);
        }
    });
})();

(function(){

    var gt = window.gtranslateSettings || {};
    gt = gt[document.currentScript.getAttribute('data-gt-widget-id')] || gt;

    if(gt.default_language == null) {
        console.log('gtranslateSettings is not properly initialized');
        return;
    }

    var lang_array_english = {"af":"Afrikaans","sq":"Albanian","am":"Amharic","ar":"Arabic","hy":"Armenian","az":"Azerbaijani","eu":"Basque","be":"Belarusian","bn":"Bengali","bs":"Bosnian","bg":"Bulgarian","ca":"Catalan","ceb":"Cebuano","ny":"Chichewa","zh-CN":"Chinese (Simplified)","zh-TW":"Chinese (Traditional)","co":"Corsican","hr":"Croatian","cs":"Czech","da":"Danish","nl":"Dutch","en":"English","eo":"Esperanto","et":"Estonian","tl":"Filipino","fi":"Finnish","fr":"French","fy":"Frisian","gl":"Galician","ka":"Georgian","de":"German","el":"Greek","gu":"Gujarati","ht":"Haitian Creole","ha":"Hausa","haw":"Hawaiian","iw":"Hebrew","hi":"Hindi","hmn":"Hmong","hu":"Hungarian","is":"Icelandic","ig":"Igbo","id":"Indonesian","ga":"Irish","it":"Italian","ja":"Japanese","jw":"Javanese","kn":"Kannada","kk":"Kazakh","km":"Khmer","ko":"Korean","ku":"Kurdish (Kurmanji)","ky":"Kyrgyz","lo":"Lao","la":"Latin","lv":"Latvian","lt":"Lithuanian","lb":"Luxembourgish","mk":"Macedonian","mg":"Malagasy","ms":"Malay","ml":"Malayalam","mt":"Maltese","mi":"Maori","mr":"Marathi","mn":"Mongolian","my":"Myanmar (Burmese)","ne":"Nepali","no":"Norwegian","ps":"Pashto","fa":"Persian","pl":"Polish","pt":"Portuguese","pa":"Punjabi","ro":"Romanian","ru":"Russian","sm":"Samoan","gd":"Scottish Gaelic","sr":"Serbian","st":"Sesotho","sn":"Shona","sd":"Sindhi","si":"Sinhala","sk":"Slovak","sl":"Slovenian","so":"Somali","es":"Spanish","su":"Sundanese","sw":"Swahili","sv":"Swedish","tg":"Tajik","ta":"Tamil","te":"Telugu","th":"Thai","tr":"Turkish","uk":"Ukrainian","ur":"Urdu","uz":"Uzbek","vi":"Vietnamese","cy":"Welsh","xh":"Xhosa","yi":"Yiddish","yo":"Yoruba","zu":"Zulu"};
    var lang_array_native = {"af":"Afrikaans","sq":"Shqip","am":"\u12a0\u121b\u122d\u129b","ar":"\u0627\u0644\u0639\u0631\u0628\u064a\u0629","hy":"\u0540\u0561\u0575\u0565\u0580\u0565\u0576","az":"Az\u0259rbaycan dili","eu":"Euskera","be":"\u0411\u0435\u043b\u0430\u0440\u0443\u0441\u043a\u0430\u044f \u043c\u043e\u0432\u0430","bn":"\u09ac\u09be\u0982\u09b2\u09be","bs":"Bosanski","bg":"\u0411\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438","ca":"Catal\u00e0","ceb":"Cebuano","ny":"Chichewa","zh-CN":"\u7b80\u4f53\u4e2d\u6587","zh-TW":"\u7e41\u9ad4\u4e2d\u6587","co":"Corsu","hr":"Hrvatski","cs":"\u010ce\u0161tina\u200e","da":"Dansk","nl":"Nederlands","en":"English","eo":"Esperanto","et":"Eesti","tl":"Filipino","fi":"Suomi","fr":"Fran\u00e7ais","fy":"Frysk","gl":"Galego","ka":"\u10e5\u10d0\u10e0\u10d7\u10e3\u10da\u10d8","de":"Deutsch","el":"\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac","gu":"\u0a97\u0ac1\u0a9c\u0ab0\u0abe\u0aa4\u0ac0","ht":"Kreyol ayisyen","ha":"Harshen Hausa","haw":"\u014clelo Hawai\u02bbi","iw":"\u05e2\u05b4\u05d1\u05b0\u05e8\u05b4\u05d9\u05ea","hi":"\u0939\u093f\u0928\u094d\u0926\u0940","hmn":"Hmong","hu":"Magyar","is":"\u00cdslenska","ig":"Igbo","id":"Bahasa Indonesia","ga":"Gaeilge","it":"Italiano","ja":"\u65e5\u672c\u8a9e","jw":"Basa Jawa","kn":"\u0c95\u0ca8\u0ccd\u0ca8\u0ca1","kk":"\u049a\u0430\u0437\u0430\u049b \u0442\u0456\u043b\u0456","km":"\u1797\u17b6\u179f\u17b6\u1781\u17d2\u1798\u17c2\u179a","ko":"\ud55c\uad6d\uc5b4","ku":"\u0643\u0648\u0631\u062f\u06cc\u200e","ky":"\u041a\u044b\u0440\u0433\u044b\u0437\u0447\u0430","lo":"\u0e9e\u0eb2\u0eaa\u0eb2\u0ea5\u0eb2\u0ea7","la":"Latin","lv":"Latvie\u0161u valoda","lt":"Lietuvi\u0173 kalba","lb":"L\u00ebtzebuergesch","mk":"\u041c\u0430\u043a\u0435\u0434\u043e\u043d\u0441\u043a\u0438 \u0458\u0430\u0437\u0438\u043a","mg":"Malagasy","ms":"Bahasa Melayu","ml":"\u0d2e\u0d32\u0d2f\u0d3e\u0d33\u0d02","mt":"Maltese","mi":"Te Reo M\u0101ori","mr":"\u092e\u0930\u093e\u0920\u0940","mn":"\u041c\u043e\u043d\u0433\u043e\u043b","my":"\u1017\u1019\u102c\u1005\u102c","ne":"\u0928\u0947\u092a\u093e\u0932\u0940","no":"Norsk bokm\u00e5l","ps":"\u067e\u069a\u062a\u0648","fa":"\u0641\u0627\u0631\u0633\u06cc","pl":"Polski","pt":"Portugu\u00eas","pa":"\u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40","ro":"Rom\u00e2n\u0103","ru":"\u0420\u0443\u0441\u0441\u043a\u0438\u0439","sm":"Samoan","gd":"G\u00e0idhlig","sr":"\u0421\u0440\u043f\u0441\u043a\u0438 \u0458\u0435\u0437\u0438\u043a","st":"Sesotho","sn":"Shona","sd":"\u0633\u0646\u068c\u064a","si":"\u0dc3\u0dd2\u0d82\u0dc4\u0dbd","sk":"Sloven\u010dina","sl":"Sloven\u0161\u010dina","so":"Afsoomaali","es":"Espa\u00f1ol","su":"Basa Sunda","sw":"Kiswahili","sv":"Svenska","tg":"\u0422\u043e\u04b7\u0438\u043a\u04e3","ta":"\u0ba4\u0bae\u0bbf\u0bb4\u0bcd","te":"\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41","th":"\u0e44\u0e17\u0e22","tr":"T\u00fcrk\u00e7e","uk":"\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430","ur":"\u0627\u0631\u062f\u0648","uz":"O\u2018zbekcha","vi":"Ti\u1ebfng Vi\u1ec7t","cy":"Cymraeg","xh":"isiXhosa","yi":"\u05d9\u05d9\u05d3\u05d9\u05e9","yo":"Yor\u00f9b\u00e1","zu":"Zulu"};

    var default_language = gt.default_language;
    var languages = gt.languages||Object.keys(lang_array_english);
    var url_structure = gt.url_structure||'none';
    var custom_domains = gt.custom_domains||{};

    var horizontal_position = gt.horizontal_position||'inline';
    var vertical_position = gt.vertical_position||null;

    var native_language_names = gt.native_language_names||false;
    var detect_browser_language = gt.detect_browser_language||false;
    var wrapper_selector = gt.wrapper_selector||'.gtranslate_wrapper';

    var custom_css = gt.custom_css||'';
    var lang_array = native_language_names && lang_array_native || lang_array_english;

    var u_class = '.gt_raw_link-'+Array.from('base'+wrapper_selector).reduce(function(h,c){return 0|(31*h+c.charCodeAt(0))},0).toString(36);

    var widget_code = '<!-- GTranslate: https://gtranslate.com -->';
    var widget_css = custom_css;

    // helper functions
    function get_lang_href(lang) {
        var href = '#';

        if(url_structure == 'sub_directory') {
            var gt_request_uri = (document.currentScript.getAttribute('data-gt-orig-url') || (location.pathname.startsWith('/'+current_lang+'/') && '/'+location.pathname.split('/').slice(2).join('/') || location.pathname)) + location.search + location.hash;
            href = (lang == default_language) && location.protocol+'//'+location.hostname+gt_request_uri || location.protocol+'//'+location.hostname+'/'+lang+gt_request_uri;
        } else if(url_structure == 'sub_domain') {
            var gt_request_uri = (document.currentScript.getAttribute('data-gt-orig-url') || location.pathname) + location.search + location.hash;
            var domain = document.currentScript.getAttribute('data-gt-orig-domain') || location.hostname;
            if(typeof custom_domains == 'object' && custom_domains[lang])
                href = (lang == default_language) && location.protocol+'//'+domain+gt_request_uri || location.protocol+'//'+custom_domains[lang]+gt_request_uri;
            else
                href = (lang == default_language) && location.protocol+'//'+domain+gt_request_uri || location.protocol+'//'+lang+'.'+domain.replace(/^www\./, '')+gt_request_uri;
        }

        return href;
    }

    widget_css += "a.glink{text-decoration:none}a.glink.gt-current-lang{font-weight:bold}";
    
    // Enhanced CSS for smooth navigation and loading states
    widget_css += "body:not(.gtranslate-ready){opacity:0.3;transition:opacity 0.3s ease}body.gtranslate-ready{opacity:1}body.gt-navigating{opacity:0.7;transition:opacity 0.2s ease}";
    
    // Full page skeleton loading CSS with enhanced styling
    widget_css += "#gt-page-loading{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,0.95);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);z-index:999999;display:none;align-items:center;justify-content:center;transition:opacity 0.3s ease}#gt-page-loading.active{display:flex;opacity:1}#gt-page-loading.hiding{opacity:0}";
    
    // Enhanced spinner with better animation
    widget_css += ".gt-spinner{width:60px;height:60px;border:4px solid rgba(0,0,0,0.1);border-top:4px solid #4f46e5;border-radius:50%;animation:gt-spin 1s linear infinite;position:relative}.gt-spinner::after{content:'';position:absolute;top:-4px;left:-4px;right:-4px;bottom:-4px;border:2px solid transparent;border-top:2px solid rgba(79,70,229,0.3);border-radius:50%;animation:gt-spin-reverse 1.5s linear infinite}";
    
    // Navigation loading indicator
    widget_css += ".gt-nav-indicator{position:fixed;top:0;left:0;width:100%;height:3px;background:linear-gradient(90deg,transparent,#4f46e5,transparent);z-index:999998;display:none;animation:gt-nav-progress 1.5s ease-in-out infinite}.gt-navigating .gt-nav-indicator{display:block}";
    
    // Instant loading spinner for navigation (same style as header loading)
    widget_css += ".gt-instant-spinner{width:60px!important;height:60px!important;border:4px solid rgba(0,0,0,0.1)!important;border-top:4px solid #4f46e5!important;border-radius:50%!important;animation:gt-instant-spin 1s linear infinite!important;position:relative!important}.gt-instant-spinner::after{content:''!important;position:absolute!important;top:-4px!important;left:-4px!important;right:-4px!important;bottom:-4px!important;border:2px solid transparent!important;border-top:2px solid rgba(79,70,229,0.3)!important;border-radius:50%!important;animation:gt-instant-spin-reverse 1.5s linear infinite!important}";
    
    // Keyframe animations
    widget_css += "@keyframes gt-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes gt-spin-reverse{0%{transform:rotate(360deg)}100%{transform:rotate(0deg)}}@keyframes gt-nav-progress{0%{transform:translateX(-100%)}50%{transform:translateX(0%)}100%{transform:translateX(100%)}}@keyframes gt-instant-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes gt-instant-spin-reverse{0%{transform:rotate(360deg)}100%{transform:rotate(0deg)}}";

    var current_lang = document.querySelector('html').getAttribute('lang')||default_language;
    
    if(url_structure == 'none') {
        var googtrans_matches = document.cookie.match('(^|;) ?googtrans=([^;]*)(;|$)');
        current_lang = googtrans_matches && googtrans_matches[2].split('/')[2] || current_lang;
    }

    if(!lang_array[current_lang])
        current_lang = default_language;

    if(url_structure == 'none') {
        widget_code += '<div id="google_translate_element2"></div>';
        widget_code += '<div id="gt-page-loading"><div class="gt-skeleton-container"><div class="gt-skeleton-header"></div><div class="gt-skeleton-content"><div class="gt-skeleton-main"><div class="gt-skeleton-item large"></div><div class="gt-skeleton-item medium" style="width:85%"></div><div class="gt-skeleton-item" style="width:90%"></div><div class="gt-skeleton-item" style="width:75%"></div><div class="gt-skeleton-item medium" style="width:95%"></div><div class="gt-skeleton-item" style="width:80%"></div><div class="gt-skeleton-item" style="width:70%"></div><div class="gt-skeleton-item large"></div><div class="gt-skeleton-item" style="width:85%"></div><div class="gt-skeleton-item" style="width:92%"></div></div><div class="gt-skeleton-sidebar"><div class="gt-skeleton-widget"><div class="gt-skeleton-item small"></div><div class="gt-skeleton-item small" style="width:70%"></div><div class="gt-skeleton-item small" style="width:85%"></div></div><div class="gt-skeleton-widget"><div class="gt-skeleton-item small"></div><div class="gt-skeleton-item small" style="width:60%"></div><div class="gt-skeleton-item small" style="width:75%"></div><div class="gt-skeleton-item small" style="width:80%"></div></div><div class="gt-skeleton-widget"><div class="gt-skeleton-item small"></div><div class="gt-skeleton-item small" style="width:90%"></div></div></div></div></div></div>';

        widget_css += "div.skiptranslate,#google_translate_element2{display:none!important}";
        widget_css += "body{top:0!important}";
        widget_css += "font font{background-color:transparent!important;box-shadow:none!important;position:initial!important}";
    }

    var add_css = document.createElement('style');
    add_css.classList.add('gtranslate_css');
    add_css.textContent = widget_css;
    document.head.appendChild(add_css);

    var add_code = document.createElement('div');
    add_code.innerHTML = widget_code;
    document.body.appendChild(add_code);

    // Always add spinner loading HTML regardless of url_structure
    if(!document.getElementById('gt-page-loading')) {
        var spinnerHTML = generateSpinnerLoading();
        var spinnerDiv = document.createElement('div');
        spinnerDiv.innerHTML = spinnerHTML;
        document.body.appendChild(spinnerDiv);
    }
    
    // Add navigation progress indicator
    if(!document.querySelector('.gt-nav-indicator')) {
        var navIndicator = document.createElement('div');
        navIndicator.className = 'gt-nav-indicator';
        document.body.appendChild(navIndicator);
    }
    
    // Cookie detection now handled at top of file with priority loading
    
    function generateSpinnerLoading(){return '<div id="gt-page-loading"><div class="gt-spinner"></div></div>'}

    document.querySelectorAll('a[data-gt-lang]:not(.nturl)').forEach(function(e){
        var lang = e.getAttribute('data-gt-lang');
        e.href = get_lang_href(lang);
        if(e.innerText.trim() != lang_array[lang]) e.title = lang_array[lang];
        e.classList.add('glink', 'nturl', 'notranslate', u_class.substring(1));
    });

    if(current_lang != default_language) {
        document.querySelectorAll(u_class+'.gt-current-lang').forEach(function(e){e.classList.remove('gt-current-lang')});
        document.querySelectorAll(u_class+'[data-gt-lang="'+current_lang+'"]').forEach(function(e){e.classList.add('gt-current-lang');});

        document.querySelectorAll(u_class+'.gt-current-wrapper').forEach(function(e){
            var current_el = document.querySelector(u_class+'[data-gt-lang="'+current_lang+'"]');
            if(!current_el)return;

            e.href = current_el.href;
            e.setAttribute('data-gt-lang', current_lang);
            e.innerHTML = current_el.innerHTML;
        });
    }

    if(url_structure == 'none') {
        function get_current_lang() {var keyValue = document.cookie.match('(^|;) ?googtrans=([^;]*)(;|$)');return keyValue ? keyValue[2].split('/')[2] : null;}
        function fire_event(element,event){try{if(document.createEventObject){var evt=document.createEventObject();element.fireEvent('on'+event,evt)}else{var evt=document.createEvent('HTMLEvents');evt.initEvent(event,true,true);element.dispatchEvent(evt)}}catch(e){}}
        function load_tlib(){if(!window.gt_translate_script){window.gt_translate_script=document.createElement('script');gt_translate_script.src='https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit2';document.body.appendChild(gt_translate_script);}}
        
        // OPTIMIZED CONTENT MONITORING
        function startContentMonitoring(){
            // FALLBACK: Dùng gt-instant-loading HOẶC gt-page-loading
            var instantLoading = document.getElementById('gt-instant-loading');
            var pageLoading = document.getElementById('gt-page-loading');
            
            // Nếu không có loading nào thì return
            if(!instantLoading && !pageLoading) {
                console.log('GTranslate Base: No loading elements found - skipping monitoring');
                return;
            }
            
            var startTime = Date.now();
            var checkInterval = 100; // Tăng frequency
            
            // NETWORK DETECTION - Chỉ slow 4G trở lên
            var baseTimeout = 3000;
            var slowTimeout = 6000; // Cho slow 4G
            var maxWaitTime = baseTimeout;
            
            var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            if(connection) {
                if(connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' || connection.effectiveType === '3g') {
                    // Bỏ qua 2G/3G - chỉ dùng base timeout
                    maxWaitTime = baseTimeout;
                    console.log('GTranslate: 2G/3G detected - using base timeout: ' + maxWaitTime + 'ms');
                } else if(connection.downlink && connection.downlink < 2) {
                    // Slow 4G detection based on downlink speed
                    maxWaitTime = slowTimeout;
                    checkInterval = 150;
                    console.log('GTranslate: Slow 4G detected - extended timeout: ' + maxWaitTime + 'ms');
                }
            }
            
            // Fallback: Detect slow loading từ page performance
            if(performance && performance.timing) {
                var pageLoadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                if(pageLoadTime > 3000) { // Page load > 3s = slow network
                    maxWaitTime = slowTimeout;
                    console.log('GTranslate: Slow page load detected (' + pageLoadTime + 'ms) - extending timeout');
                }
            }
            
            var minWaitTime = 200; // Giảm min wait
            var stableCheckCount = 0;
            var requiredStableChecks = 1; // Chỉ cần 1 lần check
            var progressiveTimeout = false;
            
            function checkTranslationProgress(){
                var currentTime = Date.now();
                var elapsedTime = currentTime - startTime;
                
                if(elapsedTime < minWaitTime) {
                    setTimeout(checkTranslationProgress, checkInterval);
                    return;
                }
                
                // SIMPLIFIED DETECTION
                var translatedElements = document.querySelectorAll('font[style*="vertical-align: inherit"]');
                var googleTranslateLoaded = document.querySelector('.goog-te-combo') !== null;
                var googleTranslateScript = document.querySelector('script[src*="translate.google.com"]') !== null;
                
                // Multiple completion criteria với fallbacks
                var basicComplete = translatedElements.length > 0 && googleTranslateLoaded;
                var hasGoogleElements = document.querySelector('.goog-te-banner-frame') !== null || 
                                       document.querySelector('#google_translate_element2') !== null;
                
                var isComplete = basicComplete || (googleTranslateScript && hasGoogleElements);
                
                console.log('GTranslate Base: Elements:' + translatedElements.length + 
                           ', GoogleLoaded:' + googleTranslateLoaded + 
                           ', HasElements:' + hasGoogleElements +
                           ', Time:' + elapsedTime + 'ms');
                
                if(isComplete) {
                    stableCheckCount++;
                    if(stableCheckCount >= requiredStableChecks) {
                        hideInstantLoading();
                        return;
                    }
                } else {
                    stableCheckCount = 0;
                    
                    // PROGRESSIVE TIMEOUT - chỉ cho slow 4G
                    if(elapsedTime > (maxWaitTime * 0.7) && !progressiveTimeout && connection && connection.downlink < 2) {
                        if(googleTranslateScript && !googleTranslateLoaded) {
                            maxWaitTime += 3000; // Thêm 3s cho slow 4G
                            progressiveTimeout = true;
                            console.log('GTranslate: Slow 4G script loading - extending timeout to ' + maxWaitTime + 'ms');
                        }
                    }
                }
                
                // Final timeout
                if(elapsedTime >= maxWaitTime) {
                    console.log('GTranslate Base: Timeout reached (' + maxWaitTime + 'ms) - showing content');
                    hideInstantLoading();
                    return;
                }
                
                setTimeout(checkTranslationProgress, checkInterval);
            }
            
            function hideInstantLoading() {
                // Ẩn TẤT CẢ loading elements
                var instantLoading = document.getElementById('gt-instant-loading');
                if(instantLoading) {
                    instantLoading.style.opacity = '0';
                    instantLoading.style.transition = 'opacity 0.3s ease';
                    setTimeout(function(){
                        if(instantLoading.parentNode) {
                            instantLoading.parentNode.removeChild(instantLoading);
                        }
                    }, 300);
                    console.log('GTranslate Base: Removed gt-instant-loading');
                }
                
                // CRITICAL: Cũng ẩn gt-page-loading
                var pageLoading = document.getElementById('gt-page-loading');
                if(pageLoading) {
                    pageLoading.classList.remove('active');
                    console.log('GTranslate Base: Hidden gt-page-loading');
                }
                
                var instantHide = document.getElementById('gt-instant-hide');
                if(instantHide) {
                    instantHide.remove();
                }
                
                // Show content
                if(document.documentElement) {
                    document.documentElement.style.visibility = 'visible';
                    document.documentElement.style.overflow = '';
                }
                if(document.body) {
                    document.body.style.visibility = 'visible';
                    document.body.style.overflow = '';
                }
                
                document.body.classList.add('gtranslate-ready');
                document.body.classList.remove('gt-navigating');
            }
            
            setTimeout(checkTranslationProgress, checkInterval);
        }
        
        // LUỒNG 1: Language Selection Enhanced
        window.doGTranslate = function(lang_pair){
            if(lang_pair.value)lang_pair=lang_pair.value;
            if(lang_pair=='')return;
            var lang=lang_pair.split('|')[1];
            if(get_current_lang() == null && lang == lang_pair.split('|')[0])return;
            
            // Show loading ngay khi user chọn language
            var pageLoading=document.getElementById('gt-page-loading');
            if(pageLoading)pageLoading.classList.add('active');
            
            var instantLoading = document.getElementById('gt-instant-loading');
            if(instantLoading) {
                instantLoading.style.display = 'flex';
                instantLoading.style.opacity = '1';
            }
            
            document.body.classList.remove('gtranslate-ready');
            var teCombo;var sel=document.getElementsByTagName('select');
            for(var i=0;i<sel.length;i++)if(sel[i].className.indexOf('goog-te-combo')!=-1){teCombo=sel[i];break;}
            if(document.getElementById('google_translate_element2')==null||document.getElementById('google_translate_element2').innerHTML.length==0||teCombo.length==0||teCombo.innerHTML.length==0){
                setTimeout(function(){doGTranslate(lang_pair)},500)
            }else{
                teCombo.value=lang;
                fire_event(teCombo,'change');
                fire_event(teCombo,'change');
                startContentMonitoring()
            }
        }
        
        window.googleTranslateElementInit2=function(){new google.translate.TranslateElement({pageLanguage:default_language,autoDisplay:false},'google_translate_element2')};

        // LUỒNG 2: Navigation Interceptor (Internal Links)
        function setupNavigationInterceptor() {
            document.addEventListener('click', function(e) {
                var link = e.target.closest('a');
                if(!link) return;
                
                // Check if it's internal link and not language selector
                var href = link.getAttribute('href');
                if(!href) return;
                
                var isInternal = href.startsWith('/') || href.startsWith(window.location.origin) || (!href.includes('://'));
                var isLanguageSelector = link.hasAttribute('data-gt-lang') || link.classList.contains('glink') || link.classList.contains('gtranslate') || link.closest('.gtranslate_wrapper');
                var isExternal = href.startsWith('http') && !href.startsWith(window.location.origin);
                var isAnchor = href.startsWith('#');
                var isMailto = href.startsWith('mailto:') || href.startsWith('tel:');
                
                if(isInternal && !isLanguageSelector && !isExternal && !isAnchor && !isMailto) {
                    var current_translated_lang = get_current_lang();
                    
                    // LUỒNG 2: Chỉ intercept nếu user đang ở translated language
                    if(current_translated_lang && current_translated_lang !== default_language) {
                        e.preventDefault();
                        
                        console.log('GTranslate: Intercepting navigation to maintain translation state: ' + current_translated_lang);
                        
                        // Show loading IMMEDIATELY
                        var instantLoading = document.getElementById('gt-instant-loading');
                        if (!instantLoading) {
                            // Create instant loading if not exists
                            var loadingHTML = '<div id="gt-instant-loading"><div style="position: relative;"><div class="gt-instant-spinner"></div></div></div>';
                            document.body.insertAdjacentHTML('afterbegin', loadingHTML);
                        } else {
                            instantLoading.style.display = 'flex';
                            instantLoading.style.opacity = '1';
                        }
                        
                        // Show regular loading
                        var pageLoading = document.getElementById('gt-page-loading');
                        if(pageLoading) {
                            pageLoading.classList.add('active');
                        }
                        
                        // Add navigation class for CSS transitions
                        document.body.classList.add('gt-navigating');
                        document.body.classList.remove('gtranslate-ready');
                        
                        // CRITICAL: Store current language AND cookie for next page
                        sessionStorage.setItem('gt_preserve_lang', current_translated_lang);
                        sessionStorage.setItem('gt_navigating_from_translated', '1');
                        sessionStorage.setItem('gt_preserve_cookie', document.cookie);
                        
                        console.log('GTranslate: Stored navigation data - Lang: ' + current_translated_lang + ', Cookie: ' + document.cookie);
                        
                        // Navigate after short delay to show loading
                        setTimeout(function() {
                            window.location.href = href;
                        }, 50);
                    }
                    // Else: Default language users - no interception, natural navigation
                }
            }, true); // Use capture phase for better interception
        }

        // Enhanced page initialization for translated state
        function initializeTranslatedPage() {
            var preserveLang = sessionStorage.getItem('gt_preserve_lang');
            var wasNavigating = sessionStorage.getItem('gt_navigating_from_translated');
            var preserveCookie = sessionStorage.getItem('gt_preserve_cookie');
            
            if(preserveLang && wasNavigating) {
                console.log('GTranslate: Restoring translation state after navigation: ' + preserveLang);
                console.log('GTranslate: Preserved cookie: ' + preserveCookie);
                
                // CRITICAL: Restore cookie first if it was lost
                if (preserveCookie && !document.cookie.includes('googtrans')) {
                    console.log('GTranslate: Cookie lost during navigation - restoring...');
                    // Extract googtrans cookie from preserved cookie string
                    var cookieMatch = preserveCookie.match(/googtrans=([^;]*)/);
                    if (cookieMatch) {
                        document.cookie = 'googtrans=' + cookieMatch[1] + '; path=/';
                        console.log('GTranslate: Cookie restored: googtrans=' + cookieMatch[1]);
                    }
                }
                
                // Clear session flags
                sessionStorage.removeItem('gt_preserve_lang');
                sessionStorage.removeItem('gt_navigating_from_translated');
                sessionStorage.removeItem('gt_preserve_cookie');
                
                // Ensure loading is shown
                var pageLoading = document.getElementById('gt-page-loading');
                if(pageLoading) {
                    pageLoading.classList.add('active');
                }
                
                // Apply translation immediately
                load_tlib();
                window.gt_translate_script.onload = function() {
                    setTimeout(function() {
                        console.log('GTranslate: Applying preserved translation: ' + default_language + '|' + preserveLang);
                        doGTranslate(default_language + '|' + preserveLang);
                        
                        // Update language selector UI
                        document.querySelectorAll(u_class+'.gt-current-lang').forEach(function(e){e.classList.remove('gt-current-lang')});
                        document.querySelectorAll(u_class+'[data-gt-lang="'+preserveLang+'"]').forEach(function(e){e.classList.add('gt-current-lang')});
                    }, 100);
                };
            } else if(current_lang != default_language) {
            // Show loading for existing translation from cookie
                console.log('GTranslate: Found existing translation from cookie: ' + current_lang);
            var pageLoading = document.getElementById('gt-page-loading');
            if(pageLoading) pageLoading.classList.add('active');
            load_tlib();
        } else {
            document.querySelectorAll(u_class).forEach(function(e){e.addEventListener('pointerenter',load_tlib)});
                // Mark as ready if no translation needed
                setTimeout(function() {
                    document.body.classList.add('gtranslate-ready');
                }, 100);
            }
        }

        // Initialize navigation interceptor and page state
        setupNavigationInterceptor();
        initializeTranslatedPage();

        document.querySelectorAll(u_class).forEach(function(e){e.addEventListener('click', function(evt) {
            evt.preventDefault();
            // LUỒNG 1: Show loading for language selection
            var pageLoading = document.getElementById('gt-page-loading');
            if(pageLoading) pageLoading.classList.add('active');
            
            var instantLoading = document.getElementById('gt-instant-loading');
            if(instantLoading) {
                instantLoading.style.display = 'flex';
                instantLoading.style.opacity = '1';
            }
            
            document.querySelectorAll(u_class+'.gt-current-lang').forEach(function(e){e.classList.remove('gt-current-lang')});
            e.classList.add('gt-current-lang');
            var lang = e.getAttribute('data-gt-lang');
            
            if(url_structure == 'none') {
                doGTranslate(default_language+'|'+lang);
            } else {
                // For sub-domain/sub-directory, redirect but show loading first
                var href = e.href;
                setTimeout(function() {
                    location.href = href;
                }, 100); // Small delay to show skeleton
            }

            document.querySelectorAll(u_class+'.gt-current-wrapper').forEach(function(e){
                var current_el = document.querySelector(u_class+'[data-gt-lang="'+lang+'"]');
                if(!current_el)return;

                e.href = current_el.href;
                e.setAttribute('data-gt-lang', lang);
                e.innerHTML = current_el.innerHTML;
            });
        })});
    }

    if(detect_browser_language && window.localStorage && window.navigator && localStorage.getItem('gt_autoswitch') == null && !/bot|spider|slurp|facebook/i.test(navigator.userAgent)) {
        var accept_language = (navigator.language||navigator.userLanguage).toLowerCase();
        switch(accept_language) {
            case 'zh':
            case 'zh-cn':var preferred_language = 'zh-CN';break;
            case 'zh-tw':
            case 'zh-hk':var preferred_language = 'zh-TW';break;
            case 'he':var preferred_language = 'iw';break;
            default:var preferred_language = accept_language.substr(0,2);break;
        }

        if(current_lang == default_language && preferred_language != default_language && languages.includes(preferred_language)) {
            // Show spinner loading for auto-switch
            var pageLoading = document.getElementById('gt-page-loading');
            if(pageLoading) pageLoading.classList.add('active');
            
            if(url_structure == 'none') {
                load_tlib();
                window.gt_translate_script.onload=function(){
                    doGTranslate(default_language+'|'+preferred_language);
                    document.querySelectorAll(u_class+'.gt-current-lang').forEach(function(e){e.classList.remove('gt-current-lang')});
                    document.querySelector(u_class+'[data-gt-lang="'+preferred_language+'"]').classList.add('gt-current-lang');
                };
            } else {
                // For sub-domain/sub-directory auto-switch
                setTimeout(function() {
                    document.querySelectorAll(u_class+'[data-gt-lang="'+preferred_language+'"]').forEach(function(e){location.href=e.href});
                }, 100);
            }
        }

        localStorage.setItem('gt_autoswitch', 1);
    }
})();