"use client";

// Layout tokens for the "Who We Are" section
const SECTION_WRAPPER = "w-full px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 mb-20";
const SECTION_CONTAINER = "flex items-start justify-center";
const WHO_TITLE_CLASSES =
  "text-white text-center text-2xl sm:text-3xl md:text-[38px] font-light pt-8 sm:pt-[45px] pb-0 mb-4 sm:mb-6 md:mb-8 lg:mb-10";
const WHO_SUBTITLE_CONTAINER_CLASSES =
  "flex items-center justify-center min-h-[200px] sm:min-h-[250px] md:min-h-[300px] mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-4 sm:px-6 md:px-8";
const WHO_SUBTITLE_TEXT_CLASSES =
  "text-white text-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl max-w-4xl leading-relaxed font-light";
const WHO_SCULPTURE_MARGIN_CLASSES =
  "mt-6 sm:mt-8 md:mt-10 lg:mt-12";

export function SculptureFlowSection() {
  return (
    <>
      <section className={SECTION_CONTAINER}>
        <div className={SECTION_WRAPPER}>
          <h1 className={WHO_TITLE_CLASSES}>Who We Are</h1>
          <div className={WHO_SUBTITLE_CONTAINER_CLASSES}>
            <p className={WHO_SUBTITLE_TEXT_CLASSES}>
              WISP Studio is a Bangkok-based creative collective operating at
              the intersection of strategic brand design and innovative visual
              technology.
            </p>
          </div>
          <div className="h-50"></div>
          <div className={WHO_SCULPTURE_MARGIN_CLASSES}>
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
          </div>
        </div>
      </section>

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


