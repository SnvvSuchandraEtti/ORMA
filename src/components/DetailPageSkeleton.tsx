import React from 'react'

export default function DetailPageSkeleton() {
  return (
    <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      {/* Title & Meta Skeleton */}
      <div className="mb-6">
        <div className="h-8 bg-gray-200 rounded-md w-3/4 mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>

      {/* Hero Image Gallery Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden mb-10">
        <div className="md:col-span-2 bg-gray-200 h-full"></div>
        <div className="hidden md:grid grid-rows-2 gap-2">
          <div className="bg-gray-200 h-full"></div>
          <div className="bg-gray-200 h-full"></div>
        </div>
        <div className="hidden md:grid grid-rows-2 gap-2">
          <div className="bg-gray-200 h-full"></div>
          <div className="bg-gray-200 h-full"></div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left Column */}
        <div className="flex-1">
          {/* Host Info */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-[#3D3D3D]">
            <div>
              <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          </div>

          {/* Key Features */}
          <div className="py-6 border-b border-gray-200 dark:border-[#3D3D3D] space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded bg-gray-200 flex-shrink-0"></div>
                <div>
                  <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-64"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="py-6 border-b border-gray-200 dark:border-[#3D3D3D]">
            <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>

        {/* Right Column - Sticky Widget */}
        <div className="md:w-[33%] lg:w-[320px]">
          <div className="sticky top-28 bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#3D3D3D] rounded-xl p-6 shadow-sm">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-14 bg-gray-200 rounded-lg w-full mb-4"></div>
            <div className="h-12 bg-gray-200 rounded-lg w-full mb-6"></div>
            <div className="space-y-4 border-b border-gray-200 dark:border-[#3D3D3D] pb-4 mb-4">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
            <div className="flex justify-between pt-2">
              <div className="h-5 bg-gray-200 rounded w-24"></div>
              <div className="h-5 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
