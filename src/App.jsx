import React from 'react';
import './App.css';

function App() {
  // Dữ liệu mẫu cho Làng Nón Chuông
  const craftData = {
    villageName: "Làng Nón Chuông",
    subtitle: "Hương Sắc Giao Thời",
    story: "Giữa nhịp sống hiện đại, những giá trị văn hóa truyền thống đang dần trở nên xa lạ. Làng nón Chuông, với lịch sử hàng trăm năm, không chỉ là nơi sản xuất ra những chiếc nón che nắng che mưa, mà còn là nơi lưu giữ hồn quê Việt. Từng vòng nón, từng mũi kim đều chứa đựng sự tỉ mỉ và tâm huyết của người nghệ nhân.",
    storyEn: "Amidst modern life, traditional cultural values are gradually becoming unfamiliar. Chuong conical hat village, with hundreds of years of history, is not only a place producing hats for sun and rain but also a place preserving the Vietnamese rural soul.",
    items: [
      { id: 1, icon: "👒", title: "Nón lá mini", desc: "Được đan tay tỉ mỉ từ nghệ nhân làng Chuông." },
      { id: 2, icon: "🎨", title: "Bộ màu vẽ", desc: "Màu acrylic an toàn, thỏa sức sáng tạo." },
      { id: 3, icon: "🖌️", title: "Cọ vẽ & Phụ kiện", desc: "Bộ dụng cụ đầy đủ để bạn tự tay trang trí." },
      { id: 4, icon: "📸", title: "Photocard Nghệ nhân", desc: "Câu chuyện và chữ ký của nghệ nhân." }
    ]
  };

  return (
    <div className="app-container">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-bg-pattern"></div>
        <h1 className="hero-logo-text">Chạm Thức</h1>
        <div className="hero-subtitle">{craftData.subtitle}</div>
        <h2 className="hero-village-name">{craftData.villageName}</h2>
        <p style={{ maxWidth: '600px', fontSize: '1.2rem', zIndex: 1, color: 'var(--color-accent)' }}>
          Đánh thức giác quan, trải nghiệm văn hóa Việt qua từng hộp khám phá.
        </p>
        
        <div className="scroll-indicator">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--color-gold)'}}>
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="video-section">
        <h2 className="section-title">Chạm Vào Thời Gian</h2>
        <div className="video-wrapper">
          {/* Thay thế div này bằng thẻ iframe khi có link Youtube thực tế */}
          <div className="video-placeholder">
            <span>[Video Câu chuyện Nghệ nhân]</span>
          </div>
        </div>
        <p style={{ marginTop: '2rem', fontStyle: 'italic', color: '#666' }}>
          *Mã QR độc quyền đưa bạn gặp gỡ nghệ nhân đằng sau tác phẩm.
        </p>
      </section>

      {/* STORY SECTION */}
      <section className="story-section">
        <div className="story-container">
          <h2 className="section-title" style={{color: 'var(--color-accent)'}}>Tinh Hoa Hội Tụ</h2>
          <p className="story-text">{craftData.story}</p>
          <p className="story-text" style={{ fontStyle: 'italic', opacity: 0.8 }}>{craftData.storyEn}</p>
        </div>
      </section>

      {/* BOX CONTENTS SECTION */}
      <section className="box-section">
        <h2 className="section-title">Hộp Khám Phá Có Gì?</h2>
        <p>Tự tay hoàn thiện tác phẩm truyền thống mang dấu ấn của riêng bạn.</p>
        
        <div className="items-grid">
          {craftData.items.map(item => (
            <div key={item.id} className="item-card">
              <div className="item-icon">{item.icon}</div>
              <h3 className="item-title">{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <h2 className="section-title" style={{color: 'var(--color-accent)'}}>Mở Văn Hóa</h2>
        <p>Sưu tầm trọn bộ 5 hộp khám phá "Hương Sắc Giao Thời"</p>
        <button className="cta-button">Khám Phá Ngay</button>
      </section>

      <footer>
        &copy; 2026 Chạm Thức Project by Ngũ Sắc Team.
      </footer>
    </div>
  );
}

export default App;
