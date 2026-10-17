# Wedding Invitation — Minimalism Đỏ Đậm (Angular)

Dự án Angular standalone, responsive, dựa trên phong cách thiệp cưới đỏ đô, giấy kem và dấu sáp.

## Chạy

Yêu cầu Node.js tương thích Angular 21 (Node.js 20.19+, 22.12+ hoặc 24+).

```bash
npm install
npm start
```

Mở `http://localhost:4200/`.

Build production:

```bash
npm run build
```

## Chỉnh nội dung

Sửa `src/app/wedding-data.ts`:
- Tên cô dâu, chú rể, ngày cưới, gia đình, giờ tiệc, địa điểm và Google Maps.
- `coverImage` và `photos`: thay các SVG minh họa trong `public/assets/` bằng ảnh thực tế (jpg/webp).
- `giftQrGroom`, `giftQrBride`: trỏ tới QR ảnh trong `public/assets/`, ví dụ `assets/qr-groom.png`.
- `musicUrl`: đặt đường dẫn MP3, ví dụ `assets/music.mp3`, sẽ xuất hiện nút bật/tắt nhạc (không autoplay).

## Giới hạn bản demo

- RSVP và lời chúc hiện chỉ lưu vào **localStorage của từng trình duyệt**. Đây không phải giải pháp thu thập phản hồi giữa nhiều khách. Khi triển khai thực tế, cần backend hoặc Firebase/Supabase với xác thực, giới hạn spam và chính sách xử lý dữ liệu.
- Ảnh trong bản demo là **SVG minh họa**, không phải ảnh cưới thật.
- Ngày cưới/địa chỉ/tên người đều là mẫu. URL bản đồ chỉ mở tìm kiếm chung chứ chưa phải tọa độ địa điểm chính xác.
- QR chưa thiết lập để tránh hiển thị nhầm thông tin nhận tiền.
- Dự án không sao chép mã nguồn hay tài nguyên độc quyền của website tham khảo.
