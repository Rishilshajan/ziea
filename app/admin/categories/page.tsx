import React from 'react';
import { MdAdd, MdAddCircleOutline } from 'react-icons/md';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import CategoryCardActions from '@/components/client/admin/CategoryCardActions';

export default function CategoriesPage() {
  return (
    <main className="pt-24 pb-32 md:pl-8 lg:pl-12 pr-4 md:pr-12 max-w-7xl mx-auto min-h-screen">
      {/* Page Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="font-cormorant text-5xl md:text-6xl text-primary mb-2 font-bold italic">Categories</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            Manage the organizational structure of your collections. Curate natural fiber experiences through tactile navigation.
          </p>
        </div>
        <Button className="self-start md:self-auto shadow-[0px_2px_16px_rgba(44,56,41,0.08)]">
          <MdAdd className="text-xl" />
          Add Category
        </Button>
      </section>

      {/* Category Grid (Bento-inspired) */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Category Card 1 */}
        <Card className="!bg-[#eee0d6] !rounded-[16px] p-6 flex flex-col justify-between group relative overflow-hidden h-[280px] hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start z-10">
            <div>
              <h2 className="font-headline-md text-2xl text-primary mb-1">Essential Linens</h2>
              <span className="bg-surface/60 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary">
                24 Products
              </span>
            </div>
            <CategoryCardActions categoryId="cat_1" categoryName="Essential Linens" />
          </div>
          <div className="absolute right-0 bottom-0 w-48 h-48 rounded-tl-[80px] overflow-hidden translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
            <img 
              className="w-full h-full object-cover" 
              alt="Premium beige linen fabric draped elegantly" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbZw7v7gX6z-auhIJU6r_hqwfxRJGdTWODqe4674OtEoB5iutx97Nd5ONnXGYsZda15vOZlZ-c3MzW3XT6OWFOStlaT6RznH0dDZtEE_gkxJghSWV4ocwKOsahPixzwN-buGAtVVFCn4g_8y3i7VeANr8MhUALYG5tNLzL5gvHrVBomWM68B3k0pAg-fRKkPKvTL8msOqlMWdLd3_Y7xxXJjvc7DUw7kDql7YKOhVgDfuolJazCZq8rIdCMjKApOPPl0L6rT9x90w"
            />
          </div>
        </Card>

        {/* Category Card 2 */}
        <Card className="!bg-[#f9ebe1] !rounded-[16px] p-6 flex flex-col justify-between group relative overflow-hidden h-[280px] hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start z-10">
            <div>
              <h2 className="font-headline-md text-2xl text-primary mb-1">Petal Silk</h2>
              <span className="bg-surface/60 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary">
                12 Products
              </span>
            </div>
            <CategoryCardActions categoryId="cat_2" categoryName="Petal Silk" />
          </div>
          <div className="absolute right-0 bottom-0 w-52 h-52 rounded-tl-[100px] overflow-hidden translate-x-6 translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
            <img 
              className="w-full h-full object-cover" 
              alt="Soft blush pink silk fabric flowing gently" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjhkjUSrabgfvJHaob2oJRrjWFJSXSEURGV5G3OtGU9cReBbfAmu6KvK7oHf1oGlT88wRETdMspxAEj36GKy88dn2tNPYisDMsDEUUDf85szY8RC53fdtUOxv1mTGu91U4ho1cMxHJcie7CUULYO6OWUE34c4dERvUCud93Ar8PrwlUTpQpzNdL0cIQNi4sbyYNZSer4Z0dYFkKr3TqXkTdi-znw1zaEInckhJUlJryGN0dIFiKhbHX6B4uxEEk_UcEddT-lphZzc"
            />
          </div>
        </Card>

        {/* Category Card 3 */}
        <Card className="!bg-[#eee0d6] !rounded-[16px] p-6 flex flex-col justify-between group relative overflow-hidden h-[280px] hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start z-10">
            <div>
              <h2 className="font-headline-md text-2xl text-primary mb-1">Morning Mist</h2>
              <span className="bg-surface/60 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary">
                18 Products
              </span>
            </div>
            <CategoryCardActions categoryId="cat_3" categoryName="Morning Mist" />
          </div>
          <div className="absolute right-0 bottom-0 w-48 h-48 rounded-tl-[80px] overflow-hidden translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
            <img 
              className="w-full h-full object-cover" 
              alt="Soft grey organic cotton fabric resting on a wooden chair" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCK9yyJK-SasLPWbn-Rv_eRX7ChGe7yoSxYMd4SLF0_TX5G8whDs7YvbB87MAXoJGeq3t6s3PB-0bEfct1oYOSvcZG6z5CkYeM6JjA4CoYOaJtbLbEumzsFcSWjmrHXIvy3qYUKHP7trkaIWRYHPiXZVyQ75E32H3p618diGuKjU7I9AE6nFZIEB1GUxyWk0Zh8RShzO6pkD7FRnHRe3O5QHQ0Touu1kAZObfe2ApnY8RBkut0AIFu7tYan-IZs2N-r7p8ftdueQvo"
            />
          </div>
        </Card>

        {/* Category Card 4 (Add Placeholder) */}
        <button className="border-2 border-dashed border-outline-variant rounded-[16px] p-6 flex flex-col items-center justify-center gap-4 hover:bg-surface-container-low transition-colors group h-[280px] focus:outline-none focus:ring-2 focus:ring-primary/50">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <MdAddCircleOutline className="text-[32px]" />
          </div>
          <div className="text-center">
            <h3 className="font-headline-md text-xl text-primary font-medium">New Category</h3>
            <p className="text-sm text-on-surface-variant">Create a new segment for your store</p>
          </div>
        </button>

        {/* Category Card 5 */}
        <Card className="!bg-[#f3e6dc] !rounded-[16px] p-6 flex flex-col justify-between group relative overflow-hidden h-[280px] hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start z-10">
            <div>
              <h2 className="font-headline-md text-2xl text-primary mb-1">Deep Forest</h2>
              <span className="bg-surface/60 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary">
                31 Products
              </span>
            </div>
            <CategoryCardActions categoryId="cat_5" categoryName="Deep Forest" />
          </div>
          <div className="absolute right-0 bottom-0 w-56 h-56 rounded-tl-[120px] overflow-hidden translate-x-8 translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
            <img 
              className="w-full h-full object-cover" 
              alt="Dense, lush tropical leaves in shades of deep emerald and forest green" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmCKHQLoKhom8jSDaB0z2vlb-20d4jFwvMo7YaYoneFYFeSYFNgNt1HMsa4GzRY072_xNZyU5_E31co_4OqfbeE3oZaeuKNNBSPrMm46UIRQWxTRW8WHDyEJhfEG7rvpMhLI7MsdENESVSlJhheb53Y5yoD_XW2Kc5JUnrUV7vRWbVMQ6l1M89X7H4_fx2ShT_iCzjmqYAOsbneGsTK5wywQbod8I0-PfccsqnPjFPCCu3tyYT5zfgQUjx2ebzRZBWYF6dci0E45k"
            />
          </div>
        </Card>

        {/* Category Card 6 */}
        <Card className="!bg-[#eee0d6] !rounded-[16px] p-6 flex flex-col justify-between group relative overflow-hidden h-[280px] hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start z-10">
            <div>
              <h2 className="font-headline-md text-2xl text-primary mb-1">Warm Ochre</h2>
              <span className="bg-surface/60 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary">
                9 Products
              </span>
            </div>
            <CategoryCardActions categoryId="cat_6" categoryName="Warm Ochre" />
          </div>
          <div className="absolute right-0 bottom-0 w-48 h-48 rounded-tl-[80px] overflow-hidden translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500">
            <img 
              className="w-full h-full object-cover" 
              alt="Earthy terracotta-toned fabric folded neatly" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDKH0tTmM1WRr-7HJUEZX9jE1ZB7EAx2YEShfPPJV_Rgd0w_OBSz3JS9YXpbuNaZVDJvB8bw4ViB2UtkqrCjwuIuRncQIiZcK87snbXgTEVfyLeaEH957gP2i5oFYawn_WCjjGTH-wbGF9RNLx4D0Ebrs_QA6N0r3fTZw9hRZ1uuHr3jsiDtl5Ls9KNbKuhQsRaP0bgW3sX_5ewGpQjaKc3-bVGhFVg1F8jx6G1TQb8Anc3vIvSB_VpR0Ea6oK5kmm5cFn9SH8xlw"
            />
          </div>
        </Card>

      </section>

      {/* Stats Overview */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-primary/5 shadow-sm">
          <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] block mb-2">Total Categories</span>
          <span className="text-4xl font-headline-md text-primary">05</span>
          <div className="mt-4 h-1 w-24 bg-primary/20 rounded-full">
            <div className="h-full w-full bg-primary rounded-full"></div>
          </div>
        </div>
        <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-primary/5 shadow-sm">
          <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] block mb-2">Active Products</span>
          <span className="text-4xl font-headline-md text-primary">94</span>
          <div className="mt-4 h-1 w-24 bg-primary/20 rounded-full">
            <div className="h-full w-3/4 bg-primary rounded-full"></div>
          </div>
        </div>
        <div className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-primary/5 shadow-sm">
          <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] block mb-2">Uncategorized</span>
          <span className="text-4xl font-headline-md text-secondary">00</span>
          <div className="mt-4 h-1 w-24 bg-secondary/20 rounded-full">
            <div className="h-full w-0 bg-secondary rounded-full"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
