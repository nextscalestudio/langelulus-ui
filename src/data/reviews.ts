import type { Review } from '@/types'

const reviews: Review[] = [
  // p1 - Blue Horizon
  {
    id: 'r1',
    productId: 'p1',
    author: 'Minh Tuấn',
    rating: 5,
    comment: 'Blue Horizon là mùi hương tôi tìm kiếm bấy lâu. Biển cả, gió, và sự tự do — tất cả trong một chai nhỏ. Đồng nghiệp liên tục hỏi tôi dùng nước hoa gì.',
    createdAt: '2024-02-10T14:30:00Z',
  },
  {
    id: 'r2',
    productId: 'p1',
    author: 'David Nguyen',
    rating: 5,
    comment: 'Mùi hương marine nhưng không hề nhân tạo. Cedarwood ở nền giúp hương lưu rất lâu — tôi vẫn còn ngửi thấy trên áo sau 8 tiếng. Tuyệt vời.',
    createdAt: '2024-03-05T09:15:00Z',
  },
  {
    id: 'r3',
    productId: 'p1',
    author: 'Hùng Phát',
    rating: 4,
    comment: 'Mùi rất tươi và nam tính. Phù hợp cho mùa hè và đi làm. Tôi chỉ ước hương lưu thêm 1-2 tiếng nữa, nhưng nhìn chung rất hài lòng.',
    createdAt: '2024-04-18T16:45:00Z',
  },

  // p2 - Honey Jasmine
  {
    id: 'r4',
    productId: 'p2',
    author: 'Thanh Tâm',
    rating: 5,
    comment: 'Honey Jasmine là mùi hương của mùa hè — nhài và mật ong kết hợp hoàn hảo, ngọt ngào mà không ngấy. Bạn bè tôi ai cũng thích.',
    createdAt: '2024-01-22T11:00:00Z',
  },
  {
    id: 'r5',
    productId: 'p2',
    author: 'Anh Thư',
    rating: 5,
    comment: 'Tôi đã thử nhiều nước hoa hoa nhài nhưng Honey Jasmine khác hẳn — nó ấm áp và thật hơn. Nền đàn hương giữ hương suốt cả ngày. Hoàn hảo.',
    createdAt: '2024-02-28T08:30:00Z',
  },

  // p3 - Silent Moss
  {
    id: 'r6',
    productId: 'p3',
    author: 'Linh Chi',
    rating: 5,
    comment: 'Silent Moss mang lại cảm giác bình yên tuyệt vời. Tôi xịt mỗi sáng và cảm giác như được hít thở không khí rừng trước khi bắt đầu ngày làm việc. Unisex thực sự.',
    createdAt: '2024-03-20T13:00:00Z',
  },
  {
    id: 'r7',
    productId: 'p3',
    author: 'Tuấn Anh',
    rating: 4,
    comment: 'Mùi green và mossy rất tự nhiên, không hề nhân tạo. Phù hợp cho nam lẫn nữ. Tôi dùng hàng ngày đi làm — lịch sự và dễ chịu.',
    createdAt: '2024-04-01T10:20:00Z',
  },
  {
    id: 'r8',
    productId: 'p3',
    author: 'Mai Lan',
    rating: 4,
    comment: 'Hương thơm rất thú vị — vetiver và rêu tạo ra cảm giác depth không ngờ. Lưu hương khá tốt với giá tiền này. Sẽ mua lại.',
    createdAt: '2024-04-25T15:10:00Z',
  },

  // p4 - Midnight Bamboo
  {
    id: 'r9',
    productId: 'p4',
    author: 'Hoa Liên',
    rating: 5,
    comment: 'Midnight Bamboo vừa bí ẩn vừa tinh tế. Mùi tre kết hợp với trầm hương và amber — hoàn toàn độc đáo. Chồng tôi cũng thích. Cả hai đều xịt.',
    createdAt: '2024-02-14T17:00:00Z',
  },
  {
    id: 'r10',
    productId: 'p4',
    author: 'Thu Hằng',
    rating: 4,
    comment: 'Hương thơm phương Đông nhưng hiện đại. Tiêu đen mở đầu rất ấn tượng. Lưu hương 8+ tiếng trên da tôi. Xứng đáng với giá tiền.',
    createdAt: '2024-03-30T12:30:00Z',
  },

  // p5 - Rose Velvet
  {
    id: 'r11',
    productId: 'p5',
    author: 'Ngọc Hân',
    rating: 5,
    comment: 'Rose Velvet nhẹ nhàng mà vẫn có chiều sâu. Tôi mua cho mẹ và cho bản thân — cả hai đều yêu thích. Hương hoa hồng thật, không hề hóa chất.',
    createdAt: '2024-04-10T09:00:00Z',
  },
  {
    id: 'r12',
    productId: 'p5',
    author: 'Bảo Trâm',
    rating: 5,
    comment: 'Đây là nước hoa hoa hồng tôi tìm kiếm từ lâu. Không quá ngọt, không quá đậm — balance hoàn hảo. Nhận được nhiều lời khen mỗi khi dùng.',
    createdAt: '2024-05-02T11:45:00Z',
  },

  // p6 - Woody Amber
  {
    id: 'r13',
    productId: 'p6',
    author: 'Việt Hoàng',
    rating: 5,
    comment: 'Woody Amber là mùi hương mùa thu của tôi. Ấm áp, sâu lắng, và lưu hương cực tốt. Mỗi lần đeo ai cũng quay lại hỏi mình dùng gì.',
    createdAt: '2024-01-30T20:00:00Z',
  },
  {
    id: 'r14',
    productId: 'p6',
    author: 'Minh Đức',
    rating: 5,
    comment: 'Amber và nghệ tây kết hợp thật xuất sắc — sang trọng mà không cầu kỳ. Đây là lần thứ hai tôi mua chai này. Sẽ còn mua nữa.',
    createdAt: '2024-02-20T19:15:00Z',
  },
  {
    id: 'r15',
    productId: 'p6',
    author: 'Quang Khải',
    rating: 4,
    comment: 'Mùi hương đàn ông theo nghĩa tốt nhất — ấm, ổn định, tự tin. Lưu hương rất bền. Trừ một sao vì tôi muốn thêm lựa chọn 100ml.',
    createdAt: '2024-03-15T18:30:00Z',
  },

  // p7 - Root Man
  {
    id: 'r16',
    productId: 'p7',
    author: 'Tùng Lâm',
    rating: 5,
    comment: 'Root Man là nước hoa đi làm hoàn hảo. Sang trọng, lịch sự, chuyên nghiệp. Tôi nhận được nhiều lời khen hơn từ khi dùng chai này.',
    createdAt: '2024-05-15T08:00:00Z',
  },
  {
    id: 'r17',
    productId: 'p7',
    author: 'Trung Hiếu',
    rating: 5,
    comment: 'Mineral accord rất độc đáo — tôi chưa gặp mùi hương nào có nốt khoáng chất thuyết phục như vậy. Oải hương ở tim hương rất êm. Mua ngay không hối hận.',
    createdAt: '2024-06-01T07:30:00Z',
  },

  // p8 - Lily's Secret
  {
    id: 'r18',
    productId: 'p8',
    author: 'Gia Hân',
    rating: 5,
    comment: "Lily's Secret thuần khiết và tinh tế đúng như tên gọi. Hoa loa kèn trắng rất tự nhiên. Đây là quà tặng tôi tặng cho em gái và cô ấy rất yêu thích.",
    createdAt: '2024-01-05T21:00:00Z',
  },
  {
    id: 'r19',
    productId: 'p8',
    author: 'Khánh Linh',
    rating: 5,
    comment: 'Mùi hương trắng và trong trẻo như ý nghĩa của nó. Tôi xịt mỗi sáng để bắt đầu ngày mới — nhẹ nhàng, tươi mát và nữ tính hoàn toàn.',
    createdAt: '2024-02-02T20:15:00Z',
  },
  {
    id: 'r20',
    productId: 'p8',
    author: 'Kiều Oanh',
    rating: 4,
    comment: 'Hương thơm đẹp nhưng lưu khá ngắn — cần xịt lại sau 4-5 tiếng. Tuy nhiên mùi hương khi tồn tại thì rất đáng yêu. Muguet và iris blend hoàn hảo.',
    createdAt: '2024-03-10T19:45:00Z',
  },

  // p9 - Mist Theory
  {
    id: 'r21',
    productId: 'p9',
    author: 'Bảo Long',
    rating: 5,
    comment: 'Mist Theory là mùi hương khác với tất cả những gì tôi từng dùng. Lạnh lẽo, bí ẩn, và rất thu hút. Không thể xếp vào một "nhóm hương" cụ thể — đó chính là điểm mạnh của nó.',
    createdAt: '2024-04-12T22:00:00Z',
  },
  {
    id: 'r22',
    productId: 'p9',
    author: 'Thảo Nguyên',
    rating: 5,
    comment: 'Unisex thực sự — tôi và bạn trai đều dùng và cả hai đều hợp. Vetiver và hạt tiêu đen ở nền rất tinh tế. Lưu hương suốt 8 tiếng.',
    createdAt: '2024-05-20T21:30:00Z',
  },
  {
    id: 'r23',
    productId: 'p9',
    author: 'Minh Nhật',
    rating: 4,
    comment: 'Cold water accord mở đầu rất ấn tượng. Hương phát triển qua các giai đoạn rất thú vị — mỗi giờ có một cảm giác khác nhau. Trừ một sao vì giá hơi cao với tôi.',
    createdAt: '2024-06-08T20:00:00Z',
  },
]

export default reviews

export function getReviewsByProductId(id: string): Review[] {
  return reviews.filter((r) => r.productId === id)
}
