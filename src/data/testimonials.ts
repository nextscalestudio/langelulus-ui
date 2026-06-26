interface Testimonial {
  id: string
  author: string
  avatar?: string
  rating: number
  quote: string
  product: string
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    author: 'Nguyễn Minh Anh',
    rating: 5,
    quote:
      'Mùi hương quyến rũ, bền lâu suốt cả ngày. Tôi nhận được rất nhiều lời khen từ đồng nghiệp. Đây là lọ nước hoa yêu thích nhất của tôi từ trước đến nay.',
    product: 'Rose Oud Elixir',
  },
  {
    id: '2',
    author: 'Trần Thị Hương',
    rating: 5,
    quote:
      'Đóng gói sang trọng, mùi hương tinh tế như một buổi sáng mùa đông. Tôi đã mua làm quà tặng và người nhận rất vui thích.',
    product: 'Midnight Jasmine',
  },
  {
    id: '3',
    author: 'Lê Văn Khoa',
    rating: 4,
    quote:
      'Nước hoa nam tính nhưng không quá nặng, rất phù hợp cho môi trường công sở. Chất lượng vượt trội so với mức giá. Sẽ mua lại khi hết.',
    product: 'Cedar & Vetiver',
  },
  {
    id: '4',
    author: 'Phạm Thu Trang',
    rating: 5,
    quote:
      'Lần đầu thử Langelulus và tôi hoàn toàn bị chinh phục. Mùi hương gợi lên hình ảnh khu vườn hoa rực rỡ giữa buổi chiều hè.',
    product: 'Garden Bloom',
  },
  {
    id: '5',
    author: 'Đỗ Quang Huy',
    rating: 5,
    quote:
      'Đặt hàng lần thứ ba rồi. Mỗi lần mở nắp là một trải nghiệm mới. Mùi hương chuyển tầng rất khéo léo từ đầu đến cuối.',
    product: 'Amber Noir',
  },
]
