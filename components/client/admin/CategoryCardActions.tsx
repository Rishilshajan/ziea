"use client";

import React, { useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import ConfirmationModal from '@/components/ui/ConfirmationModal';

interface CategoryCardActionsProps {
  categoryId: string;
  categoryName: string;
}

export default function CategoryCardActions({ categoryId, categoryName }: CategoryCardActionsProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    // In a real app, this would route to an edit form or open a modal
    console.log(`Edit category ${categoryId}`);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate API call for deletion
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Deleted category ${categoryId}`);
    setIsDeleting(false);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="flex gap-2">
        <button 
          onClick={handleEdit}
          className="w-10 h-10 rounded-full bg-surface/80 flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-300"
          aria-label={`Edit ${categoryName}`}
        >
          <MdEdit className="text-xl" />
        </button>
        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsDeleteModalOpen(true);
          }}
          className="w-10 h-10 rounded-full bg-surface/80 flex items-center justify-center hover:bg-error hover:text-white transition-colors duration-300"
          aria-label={`Delete ${categoryName}`}
        >
          <MdDelete className="text-xl" />
        </button>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Delete Category"
        message={`Are you sure you want to delete the "${categoryName}" category? This action cannot be undone.`}
        confirmLabel="Delete"
        icon={<MdDelete />}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
        isLoading={isDeleting}
      />
    </>
  );
}
