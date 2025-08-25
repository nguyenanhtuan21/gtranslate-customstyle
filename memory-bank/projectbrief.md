# Project Brief - GTranslate WordPress Plugin

## Tổng quan dự án
GTranslate là một WordPress plugin chuyên nghiệp cho phép dịch website sang nhiều ngôn ngữ sử dụng Google Translate. Plugin này cung cấp giải pháp đa ngôn ngữ hoàn chỉnh với khả năng tương thích SEO đầy đủ.

## Mục tiêu chính
- **Dịch website tự động**: Sử dụng Google Translate để dịch nội dung website
- **Đa ngôn ngữ SEO**: Tạo các phiên bản dịch có thể được index bởi search engines (phiên bản trả phí)
- **Trải nghiệm người dùng**: Cung cấp language selector dễ sử dụng với nhiều style khác nhau
- **Hiệu suất**: Giải pháp cloud-based không làm chậm website gốc

## Phạm vi dự án

### Phiên bản miễn phí
- Translation on-the-fly sử dụng Google Translate
- 103+ ngôn ngữ được hỗ trợ
- Multiple widget styles: Float, Dropdown, Flags, Globe, etc.
- Language selector shortcode và widget
- Tích hợp với WordPress menus
- Vanilla JavaScript (không dependencies)

### Phiên bản trả phí
- Translation Delivery Network (TDN)
- SEO-friendly URLs (sub-domains, sub-directories)
- Neural machine translations
- Manual translation editing
- URL slug translation
- Hreflang tags
- WooCommerce compatibility
- Analytics và dashboard

## Yêu cầu kỹ thuật
- **WordPress**: 2.8.1+
- **PHP**: Tương thích với các phiên bản PHP hiện tại
- **JavaScript**: Vanilla JS, lazy loading
- **Caching**: Tương thích với major caching plugins
- **CDN**: Optional CDN support cho assets

## Thành phần chính
1. **Main Plugin File**: gtranslate.php
2. **JavaScript Modules**: js/ directory với các widget styles
3. **Flag Assets**: flags/ directory với multiple sizes (16px, 24px, 32px, 48px, SVG)
4. **URL Addon**: url_addon/ cho paid features
5. **Configuration**: Settings panel trong WordPress admin

## Kiến trúc
- **Frontend**: JavaScript-based language switching
- **Backend**: PHP plugin architecture với WordPress hooks
- **Cloud Service**: GTranslate servers cho translation processing
- **Assets**: CDN-ready flag images và scripts

## Đối tượng người dùng
- Website owners muốn làm site đa ngôn ngữ
- Businesses cần international presence
- E-commerce sites (WooCommerce)
- Content creators với global audience

## Tính năng đặc biệt
- **Auto-switch**: Detect browser language và auto-redirect
- **RTL Support**: Right-to-left languages
- **Analytics**: Google Analytics integration
- **Lazy Loading**: Performance optimization
- **Floating Selector**: Persistent language selector
- **Menu Integration**: Seamless WordPress menu integration

## Trạng thái hiện tại
- **Version**: 3.0.9 (stable)
- **Active installations**: 800,000+ WordPress sites
- **Rating**: 4+ stars trên WordPress repository
- **Compatibility**: WordPress 6.8+
- **Maintenance**: Actively maintained và updated

## Mục tiêu phát triển
- Maintain compatibility với WordPress updates
- Improve translation quality
- Enhance SEO features
- Expand integration với popular plugins
- Performance optimizations
- Mobile experience improvements
