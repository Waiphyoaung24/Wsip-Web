"use client";

export function SculptureFlowSection() {
  return (
    <>
      <div className="sculpture-flow-container">
        
        {/* Back Marquee */}
        <div className="sculpture-flow-marquee sculpture-flow-marquee--back select-none pointer-events-none">
          <div className="sculpture-flow-track">
            <div className="sculpture-flow-content">
             <span>Ignite the flame</span>
              <span>Enrich the vision</span>
            </div>
            <div className="sculpture-flow-content">
              <span>SCULPTED BEAUTY</span>
              <span>HAND-CARVED FORM</span>
            </div>
          </div>
        </div>

        {/* Center Image */}
        <img
          className="sculpture-flow-center-image"
          src="https://pngimg.com/uploads/sculpture/sculpture_PNG35.png"
          alt="Stone sculpture"
        />

        {/* Front Marquee */}
        <div className="sculpture-flow-marquee sculpture-flow-marquee--front select-none pointer-events-none">
          <div className="sculpture-flow-track">
            <div className="sculpture-flow-content">
              <span>LIVING STONE</span>
              <span>SCULPTURE GALLERY</span>
              <span>SHAPED BY HAND</span>
              <span>ART REDEFINED</span>
            </div>
            <div className="sculpture-flow-content">
              <span>LIVING STONE</span>
              <span>SCULPTURE GALLERY</span>
              <span>SHAPED BY HAND</span>
              <span>ART REDEFINED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section BELOW the hero */}
      <div className="sculpture-flow-content-section">
        <div className="sculpture-flow-content-wrapper">
          <div className="sculpture-flow-block">
            <h3>SCULPTED BRAND STORIES</h3>
            <p>
              We shape brands the way a sculptor shapes stone: with patience, precision, and a clear
              vision of what&apos;s hidden beneath the surface. From naming and identity to full
              visual systems, we carve out distinctive narratives that feel timeless yet current.
            </p>
          </div>
          <div className="sculpture-flow-block">
            <h3>DIGITAL SPACES IN MOTION</h3>
            <p>
              Our team blends interaction design, motion, and technology to craft digital
              experiences that feel alive. Websites, product interfaces, and immersive visuals are
              designed as modern galleries for your brand—fluid, expressive, and meticulously
              detailed.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}


