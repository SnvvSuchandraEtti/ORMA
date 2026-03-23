'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  title: string
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [showModal, setShowModal] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)

  if (!images.length) return null

  const openModal = (idx: number) => {
    setModalIndex(idx)
    setShowModal(true)
  }

  const goNext = () => setModalIndex(i => (i + 1) % images.length)
  const goPrev = () => setModalIndex(i => (i - 1 + images.length) % images.length)

  return (
    <>
      {/* Gallery Grid */}
      <div className="relative rounded-xl overflow-hidden">
        {images.length >= 5 ? (
          /* 5-image Airbnb grid */
          <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px] md:h-[480px]">
            {/* Main image */}
            <div
              className="col-span-2 row-span-2 relative cursor-pointer"
              onClick={() => openModal(0)}
            >
              <Image
                src={images[0]}
                alt={`${title} - image 1`}
                fill
                className="object-cover hover:brightness-90 transition-all"
                sizes="50vw"
                unoptimized
                priority
              />
            </div>
            {/* 4 smaller images */}
            {images.slice(1, 5).map((img, i) => (
              <div
                key={i}
                className="relative cursor-pointer"
                onClick={() => openModal(i + 1)}
              >
                <Image
                  src={img}
                  alt={`${title} - image ${i + 2}`}
                  fill
                  className="object-cover hover:brightness-90 transition-all"
                  sizes="25vw"
                  unoptimized
                />
              </div>
            ))}
          </div>
        ) : (
          /* Simple carousel for < 5 images */
          <div className="relative h-[360px] md:h-[480px] cursor-pointer" onClick={() => openModal(modalIndex)}>
            <Image
              src={images[modalIndex]}
              alt={`${title} - image ${modalIndex + 1}`}
              fill
              className="object-cover"
              sizes="100vw"
              unoptimized
              priority
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); goPrev() }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goNext() }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105"
                >
                  <ChevronRight size={18} />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setModalIndex(idx) }}
                      className={`w-2 h-2 rounded-full ${idx === modalIndex ? 'bg-white' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Show all photos button */}
        {images.length > 1 && (
          <button
            onClick={() => openModal(0)}
            className="absolute bottom-4 right-4 flex items-center gap-2 bg-white text-[#222222] text-sm font-semibold px-4 py-2.5 rounded-lg border border-[#222222] hover:bg-gray-50 transition-colors shadow"
            aria-label="Show all photos"
          >
            <Expand size={16} />
            Show all photos
          </button>
        )}
      </div>

      {/* Fullscreen Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4">
            <button
              onClick={() => setShowModal(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              aria-label="Close gallery"
            >
              <X size={20} />
            </button>
            <span className="text-white text-sm">
              {modalIndex + 1} / {images.length}
            </span>
            <div className="w-10" />
          </div>

          {/* Main image */}
          <div className="relative flex-1">
            <Image
              src={images[modalIndex]}
              alt={`${title} - image ${modalIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
              unoptimized
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-2 p-4 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setModalIndex(idx)}
                className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden ${
                  idx === modalIndex ? 'ring-2 ring-white' : 'opacity-60'
                }`}
              >
                <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" unoptimized />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
