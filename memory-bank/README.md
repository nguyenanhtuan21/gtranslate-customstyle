# GTranslate WordPress Plugin - Memory Bank

## Giới thiệu
Memory Bank này chứa toàn bộ thông tin về dự án GTranslate WordPress Plugin - một plugin dịch website chuyên nghiệp với 800,000+ active installations.

## Cấu trúc Memory Bank

### 📋 Core Files (Required)

1. **[projectbrief.md](./projectbrief.md)**
   - Tổng quan dự án và mục tiêu chính
   - Phạm vi phiên bản free vs paid
   - Yêu cầu kỹ thuật và kiến trúc tổng thể
   - Đối tượng người dùng và tính năng đặc biệt

2. **[productContext.md](./productContext.md)**
   - Vấn đề giải quyết và thách thức kỹ thuật
   - Giải pháp độc đáo của GTranslate
   - User experience goals và competitive advantages
   - Success metrics và product evolution

3. **[systemPatterns.md](./systemPatterns.md)**
   - Kiến trúc plugin và component relationships
   - Core design patterns (Widget, Shortcode, Hook System)
   - Data flow patterns cho free vs paid versions
   - Performance, security, và integration patterns

4. **[techContext.md](./techContext.md)**
   - Technology stack và WordPress integration
   - Development setup và file structure
   - Technical constraints và dependencies
   - Security considerations và performance optimization

5. **[activeContext.md](./activeContext.md)**
   - Current work focus và immediate context
   - Recent discoveries và next steps
   - Active decisions và current challenges
   - Monitoring areas và documentation status

6. **[progress.md](./progress.md)**
   - What works (core functionality, architecture, features)
   - What's left to build (documentation, analysis tasks)
   - Current status và known issues
   - Development metrics và quality assurance

### 🔧 Project Intelligence

**[../.cursorrules](../.cursorrules)**
- Project-specific patterns và development standards
- WordPress plugin architecture guidelines
- Performance considerations và security patterns
- Integration patterns và best practices

## Project Summary

### 🎯 What is GTranslate?
GTranslate là một WordPress plugin cho phép dịch website sang 103+ ngôn ngữ sử dụng Google Translate. Plugin cung cấp:

- **Free Version**: On-the-fly translation với Google Translate widget
- **Paid Version**: SEO-friendly translation proxy với cached results
- **Multiple Styles**: Float, Dropdown, Flags, Globe, Popup widgets
- **WordPress Integration**: Native widget, shortcode, và menu integration

### 🏗️ Technical Architecture
```
WordPress Plugin
├── Core Plugin (gtranslate.php) - 2,700+ lines
├── JavaScript Modules (js/) - 12 modular files
├── Asset Management (flags/) - 444+ flag images
├── URL Addon (url_addon/) - Paid features
└── Configuration System - WordPress Options API
```

### 📊 Key Metrics
- **Active Installations**: 800,000+ WordPress sites
- **Supported Languages**: 103+ languages
- **WordPress Compatibility**: 2.8.1 to 6.8+
- **Performance Impact**: < 100ms additional load time
- **Browser Support**: IE9+ với graceful degradation

### 🔄 Translation Flow

**Free Version:**
```
User clicks language → JavaScript detects → Google Translate Widget → Page translation
```

**Paid Version:**
```
User clicks language → Redirect to subdomain → Translation Proxy → Cached translated page
```

### 🎨 Widget Styles
- **Float**: Floating language selector
- **Dropdown**: Simple dropdown menu
- **Flags**: Flag-based selectors
- **Globe**: Globe với language flags
- **Popup**: Modal language selector

## Development Context

### 🛠️ Technology Stack
- **Backend**: PHP 7.0+ (WordPress compatible)
- **Frontend**: Vanilla JavaScript (no dependencies)
- **Translation**: Google Translate API
- **Assets**: WordPress asset system
- **Storage**: WordPress Options API

### 🚀 Performance Features
- **Lazy Loading**: JavaScript modules load on demand
- **CDN Support**: Optional CDN for global asset delivery
- **Cache Compatibility**: Works với major caching plugins
- **Asset Optimization**: Multiple flag sizes và minified code

### 🔒 Security Implementation
- Input sanitization với WordPress functions
- CSRF protection với nonce verification
- Capability checks for admin functionality
- XSS prevention với proper output escaping

## Integration Points

### WordPress APIs Used
- **Widget API**: Custom widget creation
- **Shortcode API**: `[gtranslate]` và `[gt-link]` shortcodes
- **Menu API**: Navigation menu integration
- **Options API**: Configuration storage
- **Hook System**: Actions và filters

### Plugin Compatibility
- **WooCommerce**: E-commerce integration
- **Yoast SEO**: SEO compatibility (paid)
- **Caching Plugins**: LiteSpeed, W3TC, WP Rocket, etc.
- **Major Themes**: 99%+ theme compatibility

## Current Status

### ✅ Production Ready
- Stable version 3.0.9
- 800,000+ active installations
- 4+ star rating on WordPress repository
- Active maintenance và support

### 📈 Metrics
- **Code Quality**: Production-ready, well-structured
- **Performance**: Optimized for minimal impact
- **Compatibility**: Tested với major themes và plugins
- **Security**: Following WordPress best practices

### 🔍 Areas for Improvement
- Modern JavaScript features adoption
- Enhanced mobile experience
- Better accessibility compliance
- Expanded developer documentation

## How to Use This Memory Bank

### For Development
1. Start với **projectbrief.md** để understand overall goals
2. Review **systemPatterns.md** để understand architecture
3. Check **techContext.md** for implementation details
4. Use **.cursorrules** for coding standards

### For Maintenance
1. Update **activeContext.md** với current work
2. Track progress trong **progress.md**
3. Document discoveries trong appropriate files
4. Keep **.cursorrules** updated với new patterns

### For Analysis
1. **productContext.md** for market position
2. **systemPatterns.md** for technical architecture
3. **progress.md** for current status
4. **activeContext.md** for immediate context

## Memory Bank Maintenance

### Update Triggers
- Major version releases
- Significant feature additions
- Architecture changes
- Performance improvements
- Security updates

### Review Schedule
- **Weekly**: activeContext.md updates
- **Monthly**: progress.md review
- **Quarterly**: Full documentation review
- **Yearly**: Architecture assessment

---

*Memory Bank initialized: January 2025*  
*Last updated: January 2025*  
*Next review: February 2025*
