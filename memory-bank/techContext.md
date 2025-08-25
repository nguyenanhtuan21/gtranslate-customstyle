# Technical Context - GTranslate WordPress Plugin

## Technology Stack

### Core Technologies
- **Backend**: PHP 7.0+ (WordPress compatible)
- **Frontend**: Vanilla JavaScript (ES5+ compatible)
- **Translation Engine**: Google Translate API
- **Asset Management**: WordPress asset system
- **Storage**: WordPress options API
- **Caching**: Compatible với major WordPress caching plugins

### WordPress Integration
- **Minimum WordPress**: 2.8.1+
- **Tested up to**: WordPress 6.8+
- **Plugin API**: WordPress Plugin API 2.0+
- **Widget API**: WordPress Widget API
- **Shortcode API**: WordPress Shortcode API
- **Menu System**: WordPress Navigation Menu API

### JavaScript Architecture
```javascript
// Vanilla JavaScript - no dependencies
// Modular loading system
// Cross-browser compatibility (IE9+)
// Mobile-responsive design
// Performance optimized
```

### Asset Structure
```
flags/
├── 16/    - 16px flag images (PNG)
├── 24/    - 24px flag images (PNG)
├── 32/    - 32px flag images (PNG)
├── 48/    - 48px flag images (PNG)
└── svg/   - Vector flag images (SVG)

js/
├── base.js      - Core functionality
├── dropdown.js  - Dropdown widget
├── float.js     - Floating selector
├── flags.js     - Flag widgets
├── globe.js     - Globe widget
├── popup.js     - Popup modal
└── [others].js  - Specific widget types
```

## Development Setup

### Local Development
```bash
# WordPress development environment
# Plugin installed in wp-content/plugins/gtranslate/
# PHP development server hoặc local WordPress stack
# Browser developer tools for JavaScript debugging
```

### File Structure
```
gtranslate/
├── gtranslate.php           - Main plugin file
├── readme.txt               - WordPress repository readme
├── gt_logo.svg             - Plugin logo
├── gtranslate-notices.css  - Admin notices styling
├── js/                     - JavaScript modules
├── flags/                  - Flag image assets
└── url_addon/              - Paid features addon
    ├── config.php          - Configuration
    ├── gtranslate.php      - Proxy functionality
    └── gtranslate-email.php - Email translation
```

### Configuration Management
```php
// WordPress Options API
$data = get_option('GTranslate');
update_option('GTranslate', $data);

// Configuration structure
array(
    'default_language' => 'en',
    'widget_look' => 'dropdown',
    'flag_size' => 16,
    'languages' => array('en', 'es', 'fr', 'de'),
    'enable_cdn' => false,
    'pro_version' => false,
    // ... more options
)
```

## Technical Constraints

### WordPress Compatibility
- **Multisite support**: Full compatibility
- **Theme compatibility**: Works với all standard themes
- **Plugin conflicts**: Detection và handling of conflicting plugins
- **Caching plugins**: Special handling cho major caching solutions
- **Security plugins**: Compatible với security hardening

### Browser Support
- **Modern browsers**: Chrome, Firefox, Safari, Edge
- **Legacy support**: Internet Explorer 9+
- **Mobile browsers**: iOS Safari, Chrome Mobile
- **JavaScript requirements**: ES5 minimum
- **Fallback handling**: Graceful degradation khi JavaScript disabled

### Performance Requirements
- **Page load impact**: < 100ms additional load time
- **Asset size**: Optimized images và minified JavaScript
- **Network requests**: Minimized external requests
- **Memory usage**: Efficient PHP memory utilization
- **Database queries**: Optimized WordPress queries

## Dependencies

### Required Dependencies
- **WordPress Core**: 2.8.1+
- **PHP**: 5.6+ (recommended 7.4+)
- **JavaScript**: Browser với ES5 support
- **cURL**: For server communication (paid features)

### Optional Dependencies
- **CDN**: GTranslate CDN for assets
- **Google Analytics**: For translation analytics
- **WooCommerce**: Enhanced e-commerce features
- **Yoast SEO**: SEO integration (paid)

### External Services
- **Google Translate**: Free translation service
- **GTranslate Servers**: Paid translation proxy
- **CDN Network**: Optional asset delivery
- **Analytics Service**: Usage tracking

## Security Considerations

### Input Validation
```php
// All user inputs sanitized
$input = sanitize_text_field($_POST['input']);
$html = wp_kses_post($_POST['html_content']);
```

### Authentication & Authorization
```php
// Capability checks
if (!current_user_can('manage_options')) {
    wp_die('Insufficient permissions');
}

// Nonce verification
wp_verify_nonce($_POST['nonce'], 'gtranslate_action');
```

### Data Security
- **No sensitive data storage**: Configuration only
- **Encrypted communication**: HTTPS for all external requests
- **XSS prevention**: Output escaping
- **CSRF protection**: WordPress nonce system

### Privacy Compliance
- **GDPR ready**: No personal data collection (free version)
- **Cookie usage**: Minimal, functional cookies only
- **Third-party services**: Clear disclosure of Google Translate usage
- **Data processing**: Transparent về translation data handling

## Performance Optimization

### Asset Loading
```javascript
// Lazy loading implementation
function loadGTranslateAssets() {
    if (!window.gtranslateLoaded) {
        // Load required scripts dynamically
        loadScript(scriptUrl, callback);
    }
}
```

### Caching Strategy
```php
// Cache plugin integration
add_action('litespeed_cache_excludes', function($excludes) {
    $excludes[] = 'gtranslate';
    return $excludes;
});

// Object caching support
$cached_data = wp_cache_get('gtranslate_config');
```

### Database Optimization
```php
// Efficient option storage
// Minimal database queries
// Proper indexing utilization
// Batch operations when possible
```

## API Integration

### Google Translate Integration
```javascript
// Google Translate Widget API
google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'es,fr,de',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
});
```

### WordPress APIs Used
- **Plugin API**: Hooks và filters
- **Widget API**: Custom widget creation
- **Shortcode API**: Content embedding
- **Options API**: Configuration storage
- **Enqueue API**: Asset management
- **AJAX API**: Dynamic functionality

## Deployment Considerations

### WordPress Repository
- **SVN repository**: WordPress.org plugin directory
- **Asset optimization**: Compressed images và minified code
- **Version tagging**: Semantic versioning
- **Update mechanism**: WordPress automatic updates

### CDN Deployment
```php
// Optional CDN for assets
$cdn_base = 'https://cdn.gtranslate.net/';
$asset_url = $enable_cdn ? $cdn_base . $asset_path : $local_url;
```

### Server Requirements
- **Shared hosting**: Compatible với basic shared hosting
- **VPS/Dedicated**: Full feature support
- **Cloud platforms**: AWS, Google Cloud, Azure compatible
- **CDN support**: CloudFlare, MaxCDN, others

## Monitoring & Debugging

### Debug Mode
```php
// Debug logging
if (defined('WP_DEBUG') && WP_DEBUG) {
    error_log('GTranslate: ' . $debug_message);
}

// Debug output
if ($debug_mode) {
    echo '<pre>' . print_r($debug_data, true) . '</pre>';
}
```

### Error Handling
```javascript
// JavaScript error handling
try {
    // Translation logic
} catch (error) {
    console.warn('GTranslate error:', error);
    // Fallback behavior
}
```

### Analytics Integration
```javascript
// Google Analytics tracking
if (typeof ga !== 'undefined') {
    ga('send', 'event', 'GTranslate', 'language_change', language);
}
```

## Future Technical Considerations

### Modern JavaScript
- **ES6+ features**: Gradual adoption với polyfills
- **Module system**: Transition to ES6 modules
- **Build process**: Webpack/Rollup integration
- **TypeScript**: Potential migration for better maintainability

### Performance Improvements
- **Service Workers**: Offline translation caching
- **WebAssembly**: High-performance translation processing
- **HTTP/2**: Optimized asset delivery
- **Progressive Enhancement**: Better mobile experience

### API Evolution
- **REST API**: WordPress REST API integration
- **GraphQL**: Potential GraphQL support
- **Headless WordPress**: Compatibility với headless setups
- **Modern frameworks**: React/Vue integration options
