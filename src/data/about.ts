import type { Perfumer, Certification, PhilosophyPrinciple } from '@/types'

export const storyContent = {
  headingVi: "Câu chuyện L'ANGELULUS",
  headingEn: "The L'ANGELULUS Story",
  foundedYear: 2019,
  foundedCity: 'Hà Nội',
  paragraphsVi: [
    "L'ANGELULUS được thành lập năm 2019 tại Hà Nội bởi những người yêu hương thơm với niềm tin rằng nước hoa không chỉ là một phụ kiện — đó là ngôn ngữ của cảm xúc. Chúng tôi bắt đầu từ một căn phòng nhỏ ở phố cổ, nơi những chai nước hoa đầu tiên được pha chế bằng tay với sự tỉ mỉ và đam mê tuyệt đối.",
    "Cảm hứng của chúng tôi đến từ những loài thực vật bản địa Việt Nam — mùi hương của hoa sen trên hồ Tây, vị ngọt của trầm hương Khánh Hòa, và sự thanh thoát của bạch đàn Đà Lạt. Những nguyên liệu này được kết hợp với kỹ thuật pha chế nước hoa đương đại của phương Tây để tạo nên những tác phẩm hương thơm mang đậm bản sắc Việt.",
    "Ngày nay, L'ANGELULUS đã trở thành điểm đến tin cậy cho những tín đồ nước hoa trên khắp Việt Nam. Sứ mệnh của chúng tôi không thay đổi: mang đến cho mỗi khách hàng một mùi hương riêng biệt — một mùi hương kể câu chuyện của chính họ.",
  ],
  paragraphsEn: [
    "L'ANGELULUS was founded in 2019 in Hanoi by fragrance lovers who believed that perfume is not merely an accessory — it is the language of emotion. We began in a small room in the Old Quarter, where the first bottles were hand-blended with meticulous care and absolute passion.",
    "Our inspiration comes from Vietnam's indigenous botanicals — the scent of lotus on West Lake, the sweetness of Khanh Hoa oud, and the crisp clarity of Dalat eucalyptus. These materials are combined with contemporary Western perfumery technique to create fragrance compositions deeply rooted in Vietnamese identity.",
    "Today, L'ANGELULUS has become a trusted destination for fragrance lovers across Vietnam. Our mission remains unchanged: to give every customer a singular scent — one that tells their own story.",
  ],
}

export const philosophyPrinciples: PhilosophyPrinciple[] = [
  {
    id: 'pp1',
    number: 1,
    titleVi: 'Chân thực',
    titleEn: 'Authenticity',
    descriptionVi:
      'Chúng tôi không sử dụng các con đường tắt tổng hợp. Mỗi mùi hương được tạo ra từ nguyên liệu thiên nhiên được chọn lọc kỹ càng, đảm bảo tính nguyên bản và chất lượng vượt trội trong từng chai nước hoa.',
    descriptionEn:
      'We take no synthetic shortcuts. Every fragrance is crafted from carefully selected natural materials, guaranteeing authenticity and superior quality in every bottle.',
  },
  {
    id: 'pp2',
    number: 2,
    titleVi: 'Hài hòa',
    titleEn: 'Harmony',
    descriptionVi:
      'Chúng tôi cân bằng giữa nghệ thuật pha chế nước hoa phương Tây và cảm thức thẩm mỹ phương Đông. Sự kết hợp này tạo nên những mùi hương vừa tinh tế theo chuẩn mực quốc tế, vừa gần gũi với tâm hồn Việt.',
    descriptionEn:
      'We balance the craft of Western perfumery with Eastern sensibility. This union produces fragrances that are both internationally refined and intimately familiar to the Vietnamese spirit.',
  },
  {
    id: 'pp3',
    number: 3,
    titleVi: 'Bền vững',
    titleEn: 'Longevity',
    descriptionVi:
      'Nguyên liệu của chúng tôi được thu mua có đạo đức, bao bì được thiết kế tối giản để giảm thiểu rác thải. Chúng tôi cam kết rằng vẻ đẹp không cần phải đánh đổi bằng môi trường.',
    descriptionEn:
      'Our ingredients are ethically sourced and our packaging is kept minimal to reduce waste. We are committed to the belief that beauty need not come at the cost of the environment.',
  },
  {
    id: 'pp4',
    number: 4,
    titleVi: 'Cảm xúc',
    titleEn: 'Emotion',
    descriptionVi:
      'Mỗi mùi hương kể một câu chuyện cá nhân. Chúng tôi tạo ra những tác phẩm không chỉ để mặc — mà để cảm nhận, để nhớ, và để trở thành một phần không thể tách rời trong hành trình của bạn.',
    descriptionEn:
      'Every fragrance tells a personal story. We create compositions not merely to wear — but to feel, to remember, and to become an inseparable part of your journey.',
  },
]

export const perfumers: Perfumer[] = [
  {
    id: 'pf1',
    name: 'Nguyễn Anh Khoa',
    roleVi: 'Trưởng nhà sáng tác hương',
    roleEn: 'Lead Perfumer',
    bioVi:
      'Với 12 năm kinh nghiệm, Anh Khoa là linh hồn sáng tạo đằng sau những dòng hương đặc trưng nhất của L\'ANGELULUS. Ông chuyên về các dòng hương gỗ và phương Đông, lấy cảm hứng từ rừng già và trầm hương Việt Nam.',
    bioEn:
      "With 12 years of experience, Anh Khoa is the creative soul behind L'ANGELULUS's most iconic fragrance lines. He specialises in woody and oriental compositions, drawing inspiration from Vietnam's ancient forests and native oud.",
    image: '/images/placeholders/perfumer-1.jpg',
    specialties: ['Woody', 'Oriental'],
    yearsExp: 12,
  },
  {
    id: 'pf2',
    name: 'Trần Minh Châu',
    roleVi: 'Nhà sáng tác hương',
    roleEn: 'Perfumer',
    bioVi:
      'Minh Châu mang đến sự tươi mát và tinh tế trong từng tác phẩm với 7 năm chuyên môn về hương hoa và tươi mát. Bộ sưu tập của cô phản ánh vẻ đẹp của những khu vườn hoa truyền thống Việt Nam.',
    bioEn:
      'Minh Châu brings freshness and refinement to every creation with 7 years of expertise in floral and fresh compositions. Her collections reflect the beauty of traditional Vietnamese flower gardens.',
    image: '/images/placeholders/perfumer-2.jpg',
    specialties: ['Floral', 'Fresh'],
    yearsExp: 7,
  },
  {
    id: 'pf3',
    name: 'Lê Phương Linh',
    roleVi: 'Nhà sáng tác hương trẻ',
    roleEn: 'Junior Perfumer',
    bioVi:
      'Phương Linh là giọng nói mới nhất trong đội ngũ sáng tác với 3 năm chuyên về hương gourmand và aquatic. Cô mang đến góc nhìn trẻ trung, táo bạo cho những dòng hương đương đại.',
    bioEn:
      'Phương Linh is the newest creative voice on the team with 3 years specialising in gourmand and aquatic compositions. She brings a youthful, daring perspective to contemporary fragrance lines.',
    image: '/images/placeholders/perfumer-3.jpg',
    specialties: ['Gourmand', 'Aquatic'],
    yearsExp: 3,
  },
]

export const certifications: Certification[] = [
  {
    id: 'cert1',
    nameVi: 'ISO 22716:2007 — GMP Mỹ phẩm',
    nameEn: 'ISO 22716:2007 — GMP Cosmetics',
    issuerVi: 'Tổ chức Tiêu chuẩn hóa Quốc tế (ISO)',
    issuerEn: 'International Organization for Standardization (ISO)',
    year: 2021,
    descriptionVi: 'Tiêu chuẩn thực hành sản xuất tốt dành cho ngành mỹ phẩm, đảm bảo quy trình sản xuất an toàn và chất lượng nhất quán.',
    descriptionEn: 'Good Manufacturing Practice standard for the cosmetics industry, ensuring safe production processes and consistent quality.',
  },
  {
    id: 'cert2',
    nameVi: 'ECOCERT Hữu cơ',
    nameEn: 'ECOCERT Organic',
    issuerVi: 'ECOCERT — Tổ chức chứng nhận hữu cơ quốc tế',
    issuerEn: 'ECOCERT — International Organic Certification Body',
    year: 2022,
    descriptionVi: 'Chứng nhận nguồn gốc nguyên liệu hữu cơ, khẳng định cam kết của chúng tôi với nông nghiệp bền vững và nguyên liệu tự nhiên.',
    descriptionEn: 'Certification of organic ingredient sourcing, affirming our commitment to sustainable agriculture and natural materials.',
  },
  {
    id: 'cert3',
    nameVi: 'Vietnam REACH — An toàn hóa chất',
    nameEn: 'Vietnam REACH — Chemical Safety',
    issuerVi: 'Bộ Công Thương Việt Nam',
    issuerEn: 'Ministry of Industry and Trade of Vietnam',
    year: 2020,
    descriptionVi: 'Tuân thủ quy định an toàn hóa chất của Việt Nam, đảm bảo tất cả thành phần được kiểm tra và an toàn cho người tiêu dùng.',
    descriptionEn: 'Compliance with Vietnam chemical safety regulations, ensuring all ingredients are tested and safe for consumers.',
  },
  {
    id: 'cert4',
    nameVi: 'Tuân thủ IFRA',
    nameEn: 'IFRA Compliance',
    issuerVi: 'Hiệp hội Nước hoa Quốc tế (IFRA)',
    issuerEn: 'International Fragrance Association (IFRA)',
    year: 2019,
    descriptionVi: 'Đáp ứng tiêu chuẩn an toàn hương liệu quốc tế do IFRA ban hành, bảo vệ sức khỏe người tiêu dùng và đảm bảo chất lượng toàn cầu.',
    descriptionEn: 'Meeting international fragrance safety standards issued by IFRA, protecting consumer health and ensuring global quality.',
  },
]

export const catalogueInfo = {
  titleVi: "Danh mục sản phẩm L'ANGELULUS 2025",
  titleEn: "L'ANGELULUS Product Catalogue 2025",
  descriptionVi:
    'Tải xuống danh mục đầy đủ với tất cả các mùi hương, thông số kỹ thuật và bảng giá. Cập nhật mới nhất năm 2025 với hơn 50 tác phẩm hương thơm.',
  descriptionEn:
    'Download the complete catalogue with all fragrances, technical specs, and pricing. Latest 2025 edition featuring over 50 fragrance compositions.',
  pdfUrl: '/downloads/langelulus-catalogue-2025.pdf',
  coverImage: '/images/placeholders/catalogue-cover.jpg',
}

export const aboutSubPages = [
  {
    slug: 'story',
    titleVi: 'Câu chuyện',
    titleEn: 'Our Story',
    descriptionVi: 'Hành trình từ một căn phòng nhỏ ở Hà Nội đến thương hiệu nước hoa Việt Nam được yêu thích.',
    descriptionEn: 'The journey from a small room in Hanoi to a beloved Vietnamese perfume brand.',
    href: '/about/story',
  },
  {
    slug: 'philosophy',
    titleVi: 'Triết lý thương hiệu',
    titleEn: 'Brand Philosophy',
    descriptionVi: 'Bốn nguyên tắc cốt lõi định hình mọi quyết định sáng tạo của chúng tôi.',
    descriptionEn: 'The four core principles that shape every creative decision we make.',
    href: '/about/philosophy',
  },
  {
    slug: 'perfumers',
    titleVi: 'Nhà sáng tác hương',
    titleEn: 'Our Perfumers',
    descriptionVi: 'Gặp gỡ những nghệ nhân tài hoa đứng sau mỗi tác phẩm hương thơm của L\'ANGELULUS.',
    descriptionEn: "Meet the talented artisans behind every L'ANGELULUS fragrance composition.",
    href: '/about/perfumers',
  },
  {
    slug: 'certifications',
    titleVi: 'Chứng nhận',
    titleEn: 'Certifications',
    descriptionVi: 'Những chứng nhận quốc tế khẳng định cam kết của chúng tôi với chất lượng và an toàn.',
    descriptionEn: 'International certifications affirming our commitment to quality and safety.',
    href: '/about/certifications',
  },
  {
    slug: 'catalogue',
    titleVi: 'Catalogue',
    titleEn: 'Catalogue',
    descriptionVi: 'Tải xuống danh mục sản phẩm đầy đủ với thông số kỹ thuật và bảng giá năm 2025.',
    descriptionEn: 'Download the complete product catalogue with technical specifications and 2025 pricing.',
    href: '/about/catalogue',
  },
]
