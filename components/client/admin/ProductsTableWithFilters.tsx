"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { MdSearch, MdEdit, MdDelete, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import { createClient } from '@/utils/supabase/client';
import Toast from '@/components/ui/Toast';
import { useRouter } from 'next/navigation';

interface ProductsTableWithFiltersProps {
  initialProducts: any[];
}

export function ProductsTableWithFilters({ initialProducts }: ProductsTableWithFiltersProps) {
  const router = useRouter();
  const supabase = createClient();
  const [products, setProducts] = useState(initialProducts);
  
  // Filters and Sort State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateSort, setDateSort] = useState("Newest First");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Delete State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{id: string, name: string} | null>(null);
  
  // Toast State
  const [toast, setToast] = useState({ message: '', show: false, error: false });

  const showToast = (msg: string, isError = false) => {
    setToast({ message: msg, show: true, error: isError });
    setTimeout(() => setToast({ message: '', show: false, error: false }), 4000);
  };

  // Filter and Sort Logic
  const filteredProducts = products.filter(product => {
    const searchLower = searchTerm.toLowerCase();
    const nameMatch = (product.name || '').toLowerCase().includes(searchLower);
    const codeMatch = (product.product_code || '').toLowerCase().includes(searchLower);
    
    let statusMatch = true;
    if (statusFilter !== "All") {
      statusMatch = (product.status || 'draft').toLowerCase() === statusFilter.toLowerCase();
    }
    
    return (nameMatch || codeMatch) && statusMatch;
  }).sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateSort === "Newest First" ? dateB - dateA : dateA - dateB;
  });

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, dateSort]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = async () => {
    if (!productToDelete) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productToDelete.id);
        
      if (error) throw error;
      
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from('activity_logs').insert({
        user_id: user?.id,
        type: 'Product Deleted',
        description: `Admin deleted product "${productToDelete.name}"`
      });

      setProducts(products.filter(p => p.id !== productToDelete.id));
      showToast(`Product "${productToDelete.name}" deleted successfully.`);
    } catch (err: any) {
      showToast(err.message || 'Error deleting product', true);
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'published':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'hidden':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'draft':
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  return (
    <>
      {toast.show && <Toast message={toast.message} error={toast.error} show={toast.show} />}
      
      <div className="flex flex-col gap-6 mb-6 w-full">
        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-6 lg:col-span-6">
            <Input 
              leftElement={<MdSearch className="text-[#2C3829]/50 text-xl" />}
              placeholder="Search by name or code..." 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:col-span-3 lg:col-span-3">
            <Select 
              label="Status"
              value={statusFilter}
              onChange={(val) => setStatusFilter(val)}
              options={[
                { value: 'All', label: 'All Statuses' },
                { value: 'Published', label: 'Published' },
                { value: 'Draft', label: 'Draft' },
                { value: 'Hidden', label: 'Hidden' }
              ]}
            />
          </div>
          <div className="md:col-span-3 lg:col-span-3">
            <Select 
              label="Sort By"
              value={dateSort}
              onChange={(val) => setDateSort(val)}
              options={[
                { value: 'Newest First', label: 'Newest First' },
                { value: 'Oldest First', label: 'Oldest First' }
              ]}
            />
          </div>
        </div>
      </div>

      {/* Products List Section */}
      <section className="mt-6">
        <Card className="!rounded-xl !p-0 border border-[#d6c3b3]/30 overflow-hidden">
          
          {/* Mobile View: Cards */}
          <div className="md:hidden divide-y divide-[#d6c3b3]/30">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => {
                const primaryImage = product.images?.[0]?.url || '/placeholder-image.png';
                
                return (
                  <div key={product.id} className="p-6 flex flex-col gap-3">
                    <div className="flex gap-4">
                      <div className="w-20 h-24 shrink-0 rounded-lg overflow-hidden bg-[#FAF7F2] border border-[#d6c3b3]/30">
                        <img src={primaryImage} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <span className="font-medium text-[#2C3829] font-body-md leading-tight break-words flex-1 min-w-[120px]">
                              {product.name}
                            </span>
                            <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(product.status)}`}>
                              {product.status || 'Draft'}
                            </span>
                          </div>
                          <span className="text-[#2C3829]/60 font-jost text-xs font-medium tracking-widest uppercase mt-1 block">
                            {product.product_code || 'No Code'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-jost font-semibold text-[#2C3829] text-sm">
                            ₹{product.discounted_price || product.original_price || 0}
                          </span>
                          
                          {/* Actions Mobile */}
                          <div className="flex gap-2">
                            <Link href={`/admin/products/edit/${product.id}`}>
                              <button 
                                className="w-9 h-9 rounded-full bg-[#2C3829] flex items-center justify-center hover:opacity-90 transition-opacity text-white"
                                aria-label={`Edit ${product.name}`}
                              >
                                <MdEdit className="text-lg" />
                              </button>
                            </Link>
                            <button 
                                onClick={() => {
                                  setProductToDelete({ id: product.id, name: product.name });
                                  setIsDeleteModalOpen(true);
                                }}
                                className="w-9 h-9 rounded-full bg-[#2C3829] flex items-center justify-center hover:opacity-90 transition-opacity text-white"
                                aria-label={`Delete ${product.name}`}
                              >
                                <MdDelete className="text-lg" />
                              </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-[#2C3829]/60 font-body-md">
                No products found matching your filters.
              </div>
            )}
          </div>

          {/* Desktop View: Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[350px]">Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((product) => {
                    const primaryImage = product.images?.[0]?.url || '/placeholder-image.png';
                    const categoryName = product.category?.name || 'Uncategorized';
                    const dateAdded = new Date(product.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    });
                    
                    return (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-16 shrink-0 rounded-md overflow-hidden bg-[#FAF7F2] border border-[#d6c3b3]/30">
                              <img src={primaryImage} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-[#2C3829] font-body-md line-clamp-1">
                                {product.name}
                              </span>
                              <span className="text-[#2C3829]/50 font-jost text-[11px] font-bold tracking-widest uppercase mt-0.5">
                                {product.product_code || 'No Code'}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-[#2C3829]/70 font-body-md">
                          {categoryName}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(product.status)}`}>
                            {product.status || 'Draft'}
                          </span>
                        </TableCell>
                        <TableCell className="font-jost font-semibold text-[#2C3829]">
                          ₹{product.discounted_price || product.original_price || 0}
                        </TableCell>
                        <TableCell className="text-[#2C3829]/60 font-jost text-sm">
                          {dateAdded}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-end">
                            <Link href={`/admin/products/edit/${product.id}`}>
                              <button 
                                className="w-9 h-9 rounded-full bg-[#2C3829] flex items-center justify-center hover:opacity-90 transition-opacity text-white"
                                aria-label={`Edit ${product.name}`}
                              >
                                <MdEdit className="text-lg" />
                              </button>
                            </Link>
                              <button 
                                onClick={() => {
                                  setProductToDelete({ id: product.id, name: product.name });
                                  setIsDeleteModalOpen(true);
                                }}
                                className="w-9 h-9 rounded-full bg-[#2C3829] flex items-center justify-center hover:opacity-90 transition-opacity text-white"
                                aria-label={`Delete ${product.name}`}
                              >
                                <MdDelete className="text-lg" />
                              </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-[#2C3829]/60 font-body-md py-10">
                      No products found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#d6c3b3]/30 bg-[#2C3829]/5">
            <span className="font-label-sm text-[#2C3829]/60 text-center sm:text-left">
              Showing {filteredProducts.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg border border-[#d6c3b3]/50 text-[#2C3829] hover:bg-[#d6c3b3]/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <MdChevronLeft className="text-xl" />
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg border border-[#d6c3b3]/50 text-[#2C3829] hover:bg-[#d6c3b3]/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <MdChevronRight className="text-xl" />
              </button>
            </div>
          </div>
        </Card>
      </section>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Delete Product"
        message={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
        confirmLabel="Delete Product"
        icon={<MdDelete />}
        onConfirm={handleDelete}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setProductToDelete(null);
        }}
        isLoading={isDeleting}
      />
    </>
  );
}
