"use client";

import React, { useState } from 'react';
import { MdOutlineBrandingWatermark, MdEdit } from 'react-icons/md';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function BrandingClient({ initialSections }: { initialSections: any[] }) {
  const router = useRouter();
  const [sections] = useState(initialSections);

  return (
    <>
      <div className="flex items-center justify-between mb-8 border-b border-[#d6c3b3]/30 pb-6">
        <div>
          <h1 className="font-jost text-3xl text-[#2C3829] font-bold">Branding</h1>
          <p className="font-body-md text-[#2C3829]/70 mt-1">Manage images for your platform's main sections</p>
        </div>
      </div>

      {sections.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-6 text-center w-full">
          <div className="w-32 h-32 mb-6 flex items-center justify-center rounded-full bg-[#FAF7F2] border-2 border-dashed border-[#d6c3b3]">
            <MdOutlineBrandingWatermark className="text-[#2C3829] text-6xl" />
          </div>
          <h3 className="font-jost text-3xl text-[#2C3829] mb-2 font-semibold">No Branding Sections Found</h3>
          <p className="font-jost text-[#2C3829]/70 mb-8 max-w-sm">
            Please ensure the database has been seeded with the default branding sections.
          </p>
        </div>
      ) : (
        <section>
          {/* Mobile View: Horizontal Cards */}
          <div className="md:hidden">
            <Card className="!rounded-xl !p-0 border border-[#d6c3b3]/30 overflow-hidden">
              <div className="divide-y divide-[#d6c3b3]/30">
                {sections.map((section) => {
                  const images = section.images || [];
                  const coverImage = images.length > 0 ? images[0].url : null;
                  return (
                    <div key={section.id} className="p-6 flex items-center justify-between gap-4">
                      <div className="flex gap-4 items-center">
                        <div className="w-20 h-24 shrink-0 rounded-lg overflow-hidden bg-[#FAF7F2] border border-[#d6c3b3]/30 flex items-center justify-center">
                          {coverImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img 
                              src={coverImage} 
                              alt={section.section_name} 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <MdOutlineBrandingWatermark className="text-[#2C3829]/30 text-2xl" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h2 className="font-medium text-[#2C3829] font-body-md line-clamp-2 leading-tight">
                            {section.section_name}
                          </h2>
                        </div>
                      </div>
                      {/* Actions Mobile */}
                      <div className="flex gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={(e: React.MouseEvent) => { e.preventDefault(); router.push(`/admin/branding/edit/${section.id}`); }}
                          className="w-9 h-9 rounded-full bg-[#2C3829] flex items-center justify-center hover:opacity-90 transition-opacity text-white"
                        >
                          <MdEdit className="text-lg" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Desktop View: Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section) => {
              const images = section.images || [];
              const coverImage = images.length > 0 ? images[0].url : null;
              
              return (
                <Card key={section.id} className="bg-white border border-[#d6c3b3]/30 shadow-sm !rounded-[16px] overflow-hidden hover:shadow-lg transition-shadow group flex flex-col h-[320px]">
                  {/* Image Section (Top Half) */}
                  <div className="relative w-full h-[240px] bg-surface-variant overflow-hidden shrink-0">
                    {coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={section.section_name}
                        src={coverImage}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-[#2C3829]/40 bg-[#FAF7F2]">
                        <MdOutlineBrandingWatermark className="text-4xl mb-2 opacity-50" />
                        <span className="font-label-sm uppercase tracking-wider text-xs">No images</span>
                      </div>
                    )}
                  </div>

                  {/* Content Section (Bottom Half) */}
                  <div className="flex justify-between items-center p-5 flex-1 bg-white">
                    <div>
                      <h2 className="font-jost text-xl text-[#2C3829] font-semibold mb-1">{section.section_name}</h2>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="auth-primary"
                        onClick={(e: React.MouseEvent) => { e.preventDefault(); router.push(`/admin/branding/edit/${section.id}`); }}
                        className="!p-0 !w-9 !h-9 flex items-center justify-center !min-w-[2.25rem] !rounded-full"
                      >
                        <MdEdit className="text-lg" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}
