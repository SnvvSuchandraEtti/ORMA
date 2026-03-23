'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import { useFocusTrap } from '@/hooks/useFocusTrap'

interface ImageGalleryProps {
  images: string[]
  title: string
}

const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxNiAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTAiIGZpbGw9IiNlNWU1ZTUiLz48L3N2Zz4='

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [showModal, setShowModal] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const thumbnailContainerRef = useRef<HTMLDivElement | null>(null)
  const modalContainerRef = useRef<HTMLDivElement | null>(null)
  useFocusTrap(modalContainerRef, showModal)


  const openModal = (idx: number) => {
    setModalIndex(idx)
    setShowModal(true)
  }

  const goTo = useCallback(
    (idx: number) => {
      setIsFading(true)
      setModalIndex(idx)
    },
    []
  )

  const goNext = useCallback(() => {
    setIsFading(true)
    setModalIndex((i) => (i + 1) % images.length)
  }, [images.length])

  const goPrev = useCallback(() => {
    setIsFading(true)
    setModalIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  /* Keyboard navigation */
  useEffect(() => {
    if (!showModal || images.length <= 1) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowModal(false)
      if (event.key === 'ArrowRight') goNext()
      if (event.key === 'ArrowLeft') goPrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showModal, images.length, goNext, goPrev])

  /* Lock body scroll when modal open */
  useEffect(() => {
    if (!showModal) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [showModal])

  /* Crossfade timing */
  useEffect(() => {
    if (!showModal) return
    setIsFading(true)

    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current)
    fadeTimeoutRef.current = setTimeout(() => setIsFading(false), 250)

    return () => {
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current)
    }
  }, [modalIndex, showModal])

  /* Auto-scroll thumbnail strip */
  useEffect(() => {
    if (!showModal || !thumbnailContainerRef.current) return
    const el = thumbnailContainerRef.current.children[modalIndex] as HTMLElement | undefined
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [modalIndex, showModal])

  /* Preload adjacent images in modal */
  useEffect(() => {
    if (!showModal) return
    const nextIdx = (modalIndex + 1) % images.length
    const prevIdx = (modalIndex - 1 + images.length) % images.length
    ;[images[nextIdx], images[prevIdx]].forEach((url) => {
      const img = new window.Image()
      img.src = url
    })
  }, [modalIndex, showModal, images])

  const dotWindow = useMemo(() => images.slice(0, 10), [images])

  /* Touch swipe in modal */
  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = null
    touchStartX.current = event.targetTouches[0].clientX
  }

  const onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = event.targetTouches[0].clientX
  }

  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 48

    if (distance > minSwipeDistance) goNext()
    if (distance < -minSwipeDistance) goPrev()
  }

  /* ---------- Grid cell helper ---------- */
  const gridCell = (img: string, idx: number, extraClass: string, sizes: string, isPriority: boolean) => (
    <div
      key={img + idx}
      className={`relative cursor-pointer overflow-hidden rounded-[12px] ${extraClass}`}
      onClick={() => openModal(idx)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && openModal(idx)}
    >
      <Image
        src={img}
        alt={`${title} - image ${idx + 1}`}
        fill
        className="object-cover transition duration-300 hover:brightness-[0.92]"
        sizes={sizes}
        priority={isPriority}
        loading={isPriority ? undefined : 'lazy'}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
      />
    </div>
  )

  if (!images || !images.length) return null

  return (
    <>
      {/* ──────────────── Gallery Grid ──────────────── */}
      <div className="relative">
        {images.length >= 5 ? (
          /* 5+ images: 1 large left + 4 smaller right */
          <div className="grid h-[360px] gap-2 overflow-hidden rounded-2xl md:h-[500px] grid-cols-[2fr_1fr_1fr] grid-rows-2">
            {gridCell(images[0], 0, 'col-span-1 row-span-2', '(max-width: 1024px) 100vw, 50vw', true)}
            {images.slice(1, 5).map((img, i) =>
              gridCell(img, i + 1, '', '(max-width: 1024px) 50vw, 25vw', false)
            )}
          </div>
        ) : images.length >= 3 ? (
          /* 3-4 images: 2x2 grid */
          <div className="grid h-[360px] gap-2 overflow-hidden rounded-2xl md:h-[500px] grid-cols-2 grid-rows-2">
            {images.map((img, idx) =>
              gridCell(img, idx, '', '(max-width: 1024px) 50vw, 33vw', idx === 0)
            )}
            {images.length === 3 && <div className="hidden md:block" />}
          </div>
        ) : (
          /* 1-2 images */
          <div className={`grid h-[360px] gap-2 overflow-hidden rounded-2xl md:h-[500px] ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {images.map((img, idx) =>
              gridCell(
                img,
                idx,
                '',
                images.length === 1 ? '100vw' : '(max-width: 1024px) 100vw, 50vw',
                idx === 0
              )
            )}
          </div>
        )}

        {/* "Show all photos" button */}
        {images.length > 1 && (
          <button
            onClick={() => openModal(0)}
            className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg border border-[#222222] bg-white px-4 py-2.5 text-sm font-semibold text-[#222222] shadow transition-colors hover:bg-gray-50"
            aria-label="Show all photos"
          >
            <Expand size={16} />
            Show all {images.length} photos
          </button>
        )}
      </div>

      {/* ──────────────── Fullscreen Modal ──────────────── */}
      {showModal && (
        <div ref={modalContainerRef} className="fixed inset-0 z-50 flex flex-col bg-black/95" role="dialog" aria-modal="true" aria-label="Image gallery">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 md:px-8">
            <button
              onClick={() => setShowModal(false)}
              className="flex h-10 items-center justify-center gap-2 rounded-full bg-white/10 px-3 text-sm text-white transition-colors hover:bg-white/20"
              aria-label="Close gallery"
            >
              <X size={20} />
              <span className="hidden md:block">Close</span>
            </button>
            <span className="text-sm font-medium text-white tabular-nums">
              {modalIndex + 1} / {images.length}
            </span>
            {/* Spacer to center-align nothing — keeps header balanced */}
            <div className="w-20" />
          </div>

          {/* Main image area */}
          <div
            className="relative flex flex-1 items-center justify-center px-4 md:px-12"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative h-[68vh] w-full max-w-6xl overflow-hidden rounded-2xl">
              <Image
                key={images[modalIndex]}
                src={images[modalIndex]}
                alt={`${title} - image ${modalIndex + 1}`}
                fill
                className={`object-contain transition-opacity duration-300 ease-in-out ${isFading ? 'opacity-80' : 'opacity-100'}`}
                sizes="100vw"
                priority
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
            {images.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="flex items-center justify-center gap-1.5 py-2">
              {dotWindow.map((_, idx) => (
                <button
                  key={`dot-${idx}`}
                  type="button"
                  onClick={() => goTo(idx)}
                  className={`h-2 w-2 rounded-full transition-all duration-200 ${idx === modalIndex ? 'scale-125 bg-white' : 'bg-white/40 hover:bg-white/60'}`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Thumbnail strip */}
          <div ref={thumbnailContainerRef} className="flex gap-2 overflow-x-auto px-4 pb-5 pt-2 md:px-8">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
                  idx === modalIndex ? 'ring-2 ring-white ring-offset-1 ring-offset-black opacity-100' : 'opacity-50 hover:opacity-80'
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="80px"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
