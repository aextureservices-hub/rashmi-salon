import { useEffect } from 'react';
import { P } from '../../utils/palette';
import { servicesData } from '../../utils/data';

interface Service {
  name: string;
  price: string;
}

interface CategoryBlockProps {
  category: string;
  services: Service[];
}

export function MenuCard() {

  const mid = Math.ceil(servicesData.length / 2);
  const leftCol  = servicesData.slice(0, mid);
  const rightCol = servicesData.slice(mid);

  useEffect(() => {
    const id = 'rb-google-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500;600&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  const CategoryBlock = ({ category, services }: CategoryBlockProps) => (
    <div className="rb-category">
      <div className="rb-cat-header">
        <span className="rb-cat-title">{category}</span>
        <div className="rb-cat-divider" />
      </div>
      <ul className="rb-list">
        {services.map((item: Service) => (
          <li className="rb-item" key={item.name}>
            <span className="rb-name">{item.name}</span>
            <span className="rb-price">{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <style>{`
        .rb-wrapper {
          width: 100%;
          padding: 70px 5%;
          background:
            radial-gradient(circle at top left, ${P.glow} 0%, transparent 30%),
            radial-gradient(circle at bottom right, ${P.glowGold} 0%, transparent 30%),
            ${P.bg};
          display: flex;
          justify-content: center;
          box-sizing: border-box;
        }
        .rb-card {
          width: 100%;
          max-width: 1180px;
          border-radius: 34px;
          overflow: hidden;
          border: 1px solid ${P.borderMid};
          background: linear-gradient(145deg, rgba(46,22,40,0.96), rgba(28,15,26,0.98));
          box-shadow: 0 20px 60px rgba(0,0,0,0.45), 0 0 40px ${P.glowGold};
          position: relative;
        }
        .rb-header {
          padding: 60px 50px 40px;
          border-bottom: 1px solid ${P.border};
          text-align: center;
        }
        .rb-subtitle {
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: ${P.textGoldMuted};
          margin-bottom: 10px;
        }
        .rb-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 54px;
          font-weight: 600;
          line-height: 1;
          background: ${P.gradGold};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .rb-divider {
          width: 70px;
          height: 2px;
          border-radius: 999px;
          background: ${P.gradGold};
          margin: 18px auto 0;
        }
        .rb-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }
        .rb-column {
          padding: 50px 50px 60px;
          display: flex;
          flex-direction: column;
          gap: 44px;
        }
        .rb-column:first-child {
          border-right: 1px solid ${P.border};
        }
        .rb-category {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .rb-cat-header {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .rb-cat-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 22px;
          font-weight: 600;
          white-space: nowrap;
          background: ${P.gradGold};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .rb-cat-divider {
          flex: 1;
          height: 1px;
          background: ${P.border};
          border-radius: 999px;
        }
        .rb-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .rb-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 14px 18px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015));
          border: 1px solid rgba(212,169,106,0.12);
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .rb-item:hover {
          transform: translateY(-3px);
          border-color: ${P.borderHot};
          box-shadow: 0 10px 24px rgba(0,0,0,0.25);
        }
        .rb-name {
          color: ${P.text};
          font-family: 'Jost', sans-serif;
          font-size: 15px;
          font-weight: 400;
          letter-spacing: 0.2px;
        }
        .rb-price {
          font-family: 'Jost', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: ${P.textGold};
          white-space: nowrap;
        }
        @media (max-width: 900px) {
          .rb-grid { grid-template-columns: 1fr; }
          .rb-column:first-child { border-right: none; border-bottom: 1px solid ${P.border}; }
          .rb-column { padding: 40px 34px 50px; }
          .rb-header { padding: 50px 34px 34px; }
          .rb-title { font-size: 46px; }
        }
        @media (max-width: 640px) {
          .rb-wrapper { padding: 24px 12px 50px; }
          .rb-card { border-radius: 28px; }
          .rb-column { padding: 30px 18px 40px; gap: 36px; }
          .rb-header { padding: 36px 18px 28px; }
          .rb-title { font-size: 38px; }
          .rb-subtitle { font-size: 10px; letter-spacing: 2px; }
          .rb-cat-title { font-size: 18px; }
          .rb-item { padding: 12px 14px; border-radius: 14px; }
          .rb-name { font-size: 13px; }
          .rb-price { font-size: 13px; }
        }
        @media (max-width: 420px) {
          .rb-column { padding: 24px 14px 36px; }
          .rb-title { font-size: 32px; }
          .rb-cat-title { font-size: 16px; }
        }
      `}</style>

      <section className="rb-wrapper" aria-label="Services Menu">
        <div className="rb-card">

          <div className="rb-header">
            <div className="rb-subtitle">Premium Beauty Studio</div>
            <div className="rb-title">Our Services</div>
            <div className="rb-divider" />
          </div>

          <div className="rb-grid">
            <div className="rb-column">
              {leftCol.map((cat) => (
                <CategoryBlock
                  key={cat.category}
                  category={cat.category}
                  services={cat.services}
                />
              ))}
            </div>
            <div className="rb-column">
              {rightCol.map((cat) => (
                <CategoryBlock
                  key={cat.category}
                  category={cat.category}
                  services={cat.services}
                />
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}