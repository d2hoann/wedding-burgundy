/** Chỉnh mọi thông tin thiệp tại đây. */
export const WEDDING = {
  groom: 'Hoàng Long',
  bride: 'Bảo Ngọc',
  groomFamily: { father: 'Ông Nguyễn Văn Minh', mother: 'Bà Trần Thị Hoa', address: 'Hà Nội' },
  brideFamily: { father: 'Ông Lê Văn Bình', mother: 'Bà Phạm Thị Lan', address: 'Hà Nội' },
  weddingISO: '2026-12-20T17:30:00+07:00',
  dateLabel: 'CHỦ NHẬT · 20 THÁNG 12 NĂM 2026',
  day: '20', month: '12', year: '2026',
  ceremonyTime: '17:30', receptionTime: '18:00',
  venue: 'Trung tâm Tiệc cưới Tràng An',
  address: 'Hà Nội, Việt Nam (địa chỉ minh họa)',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=trung+tam+tiec+cuoi+Ha+Noi',
  coverImage: 'assets/couple.svg',
  photos: ['assets/couple.svg', 'assets/photo-2.svg', 'assets/photo-3.svg'],
  // Đổi thành QR thật của hai người trước khi đăng thiệp.
  giftQrGroom: '',
  giftQrBride: '',
  musicUrl: ''
} as const;
